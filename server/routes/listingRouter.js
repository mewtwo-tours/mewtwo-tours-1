const express = require('express');
const multer = require('multer'); //Lets us recieve images on express server
const upload = multer({ dest: 'uploads/' }); // specifying the destination for all the files uploaded to the server

const listingController = require('../controllers/listingController');
const imageController = require('../controllers/imageController');
const geocoderController = require('../controllers/geocoderController')

const router = express.Router();

//base route returns listings based on location 
router.post('/get',
  geocoderController.getLocation, 
  listingController.getListings,
  (req, res) => res.status(200).json(res.locals.listings)
  );

  
/*
1) add listing to database, returning listing id
2) save listing id to locals
3) upload image to S3, returning key
3) add image key and listing id to images table on database

*/
router.post('/',
  geocoderController.getLocation,
  listingController.postListing,
  // upload.single('image'), //Accept a single file with the name 'image'. The single file will be stored in req.file 
  imageController.uploadImage,
  (req, res) => {
    res.status(200);
  });

module.exports = router;