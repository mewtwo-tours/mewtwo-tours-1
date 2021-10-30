const db = require('../models/listingModel');

const listingController = {};

listingController.generateUser = async (req, res, next) => {
  const { email, name, teamName} = req.query;

  try{
    const SQLQueryString = `INSERT INTO public.user_list (user_name, email, team_name) VALUES ('${name}', '${email}', '${teamName}');`;
    await db.query(SQLQueryString);
    next();
} catch(err){
  return next({
    log: 'SQLController.generateUser: ERROR: Error adding user',
    message: { err: `Error occurred in SQLController.generateUser. err log: ${err}` }
  });
}
};

module.exports = listingController;