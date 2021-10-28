const express = require('express');
const db = require('../models/listingModel');

const listingController = require('../controllers/listingController');

const router = express.Router();

//base route returns listings based on location 
router.get('/', 
  listingController,
  (req, res) => res.status(200).json({})
  );

//adds new listing
router.post('/', 
  
  (req, res) => {
    console.log('end of middleware cycle');
    res.status(200);
  });
module.exports = router;