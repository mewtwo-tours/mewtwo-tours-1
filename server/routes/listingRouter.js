const express = require('express');
const db = require('../models/listingModel');

const listingController = require('../controllers/listingController');

const router = express.Router();

//base route returns listings based on location 
router.get('/', listingController.generateUser, 
(req, res) => res.status(200).json("Nada"));

//adds new listing
router.post('/', 
  (req, res) => {
    console.log('end of middleware cycle');
    return res.status(200).send("Good Job!");
  });

module.exports = router;