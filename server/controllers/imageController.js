const db = require('../models/listingModel');

const imageController = {};

imageController.getImage = async (req, res, next) => {

}

imageController.uploadImage = async (req, res, next) => {
    //get image data from request of body
    //connect to amazon S3 bucket
    //await upload to S3 bucket and receive URL
    //pass URL on to next middleware

    /*
    imageInfo should be an array of objects with the following keys:
    id, description, listing_id
    */

    //destructure images array from request body
    const { images } = req.body;

    //declare empty string to build values for future SQL query
    const imageInfo = '';
    
    try{
        //iterate through images array and add to string each field
        images.forEach(async (image, id) => {

            if(id !== 0) imageInfo += `, `; //logic to handle comma separator
            const url = await upload(file)////////////// need to make real function
            imageInfo += `('${image.id}', '${image.description}', '${image.listing_id}', '${url}')`;
                
        })
        
        res.locals.imageInfo = imageInfo;
        
        return next();
      } catch(err){
        return next({
          log: 'imageController.uploadImage: ERROR: Error uploading image',
          message: { err: `Error occurred in imageController.uploadImage. err log: ${err}` }
        });
      }
}

module.exports = imageController;