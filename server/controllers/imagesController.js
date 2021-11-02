const db = require('../models/listingModel');

const imageControllerSQL = {};

imageControllerSQL.getImage = async (req, res, next) => {
  const id = res.locals.token.id;
  try {
    const queryText = `SELECT imagefilename from DB_name WHERE id = ($1)`;
    const values = [id];
    const result = await db.query(queryText, values);
    res.locals.imageFileName = result;
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// we need to post image, we should probably store image with other information all together.

module.exports = imageControllerSQL;
