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
  
  sessionController.checkSession = async (req, res, next) => {
    if(req.cookies.ssid) {
      try {
        const decoded = jwt.verify(req.cookies.ssid, process.env.JWT_KEY);
        console.log(decoded);
        res.locals.token = decoded;
        return next();
      } catch (error) {
        return next(error);
      }
    }
    else res.status(500).send({isLoggedIn:false});
  
  };