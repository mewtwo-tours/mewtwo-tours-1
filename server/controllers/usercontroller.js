const db = require('../models/listingModel');
const bcrypt = require('bcrypt')

const userController = {};


userController.login = async (req, res, next) => {
 

  try{
    
    const { email, password } = req.body.data;
    //query the database for the email, if email exists then continue
    const login =  await db.query(`SELECT * FROM users WHERE email = ${email}`)

    if(login.rows.length > 0){
          const user = login.rows[0];
          //compare versus db pw
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if(err){
              throw err;
            }
            if(isMatch){
              //we grab the information we want off the db and add it to locals to use later
              res.locals.userinfo = {
                userid : user.id,
                user_name : user.name,
                email
              }
              return next();
            } else {
                throw 'Invalid Username or Password';
            }
          })
    } else {
        throw 'Invalid Username or Password';
      }
  }

  catch(err){
    return next({
      log: 'userController.login: ERROR: Error logging in.',
      message: { err: `Error occurred in userController.login. err log: ${err}` },
    });
  }
  
};

userController.register = async (req, res, next) => {
  
  try {
    const  {name, email, password} = req.body.data;
    const hashedPassWord = await bcrypt.hash(password, 10)
    const newUser = await db.query(
      `INSERT INTO Users (name, email, password) VALUES ($1,$2,$3) RETURNING *`, [name, email, hashedPassWord]      
    );
    return next(); 
  }
  catch(err){
    return next({
      log: 'userController.register: ERROR: Error adding user',
      message: { err: `Error occurred in userController.register. err log: ${err}` },
    });
  }

}