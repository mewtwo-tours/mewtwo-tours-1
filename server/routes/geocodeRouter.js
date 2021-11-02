const express = require('express');
const db = require('../models/listingModel');
const geocoderController = require('../controllers/geocoderController')
const router = express.Router();


router.get('/', geocoderController.getLocation, (req, res) => {
  return res.status(200).send(res.locals.geocodeResult)
});

router.post('/', geocoderController.getLocation, (req, res) => {
  return res.status(200).send(res.locals.geocodeResult)
});


module.exports = router;