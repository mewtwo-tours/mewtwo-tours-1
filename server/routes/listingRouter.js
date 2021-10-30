const express = require('express');

const listingController = require('../controllers/listingController');
const imageController = require('../controllers/imageController');

const router = express.Router();

//base route returns listings based on location 
router.get('/', 
  listingController.getListings,
  (req, res) => res.status(200).json(res.locals.listings)
  );

//adds new listing, routing to upload image first then pass along url
router.post('/', 
  imageController.uploadImage,
  listingController.postListing,
  (req, res) => {
    res.status(200);
  });
module.exports = router;