const jwt = require('jsonwebtoken')

const sessionController = {}

sessionController.setSSIDCookie = async (req, res, next) => {

  //destructuring the data we got from login
   const {
    userid,
    user_name,
    email
  } = res.locals.userinfo

  const payload = {
    userid,
    user_name,
    email
  }

  //sign the jwt
  const token = jwt.sign(
    payload, 
    process.env.JWT_KEY,
    {
      expiresIn: '1d',
    }

  )
     
    console.log('jwt', token)
    //add jwt to httponly cookie
    res.cookie("ssid", token, {httpOnly: true});
    return next();
  }
  
