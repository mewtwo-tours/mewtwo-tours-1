const db = require('../models/listingModel');
const multer = require('multer'); //Lets us recieve images on express server
const fs = require('fs');
const util = require('util');
const unlikeFile = util.promisify(fs.unlink); //It is used to convert a method that returns responses using a callback function to return responses in a promise object
const { uploadFile, getFileStream } = require('../utils/s3');

const imageController = {};

imageController.getImage = async (req, res, next) => {

}
//uploades image key to db for later retrieval
imageController.uploadImage = async (req, res, next) => {

  const description  = "Hello everybody"
  const { image: key } = req.body;
  try{
    //  const file = req.file;
    // const result = await uploadFile(file); //Upload the file
    // await unlikeFile(file.path); //Delete the file after uploading it to s3
    
   
    const imageQueryString = 
    `INSERT INTO images 
    (description, listing_id, key) 
    VALUES ('${description}', '${res.locals.listing_id}', '${key}');`;

    await db.query(imageQueryString)
    return next();
  }
  catch(err){
    return next({
      log: 'imageController.uploadImage: ERROR: Error uploading image key to database',
      message: { err: `Error occurred in imageController.uploadImage. err log: ${err}` }
    });
  }
  
}


module.exports = imageController;