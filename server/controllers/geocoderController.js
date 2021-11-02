const db = require('../models/listingModel.js')
const geocoder = require('../utils/geocoder.js')

const geocoderController = {}

geocoderController.getLocation = async(req, res, next)=>{

  if(req.body.latitude && req.body.latitude) return next();
  try{
    console.log(req.body.main.street_address+ " " + req.body.main.city + ", " + req.body.main.state)
    const geocoderResult = await geocoder.geocode(req.body.main.street_address+ " " + req.body.main.city + ", " + req.body.main.state);
    const coords = {latitude: geocoderResult[0].latitude,
                    longitude: geocoderResult[0].longitude}
    res.locals.geocodeResult = coords
    //console.log(coords)
  }catch(err){
    console.log("geocoderController Get Location: ", err)
    next(err)
  }
  next()
}

module.exports = geocoderController;