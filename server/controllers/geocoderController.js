const db = require('../models/listingModel.js')
const geocoder = require('../utils/geocoder.js')

const geocoderController = {}

geocoderController.getLocation = async(req, res, next)=>{

  if(req.body.latitude && req.body.longitude) return next();//checks to see if front end already has coordinates

  try{
    //console.log("getlocation", req.body.street_address + " " + req.body.city + ", " + req.body.state)
    const geocoderResult = await geocoder.geocode(req.body.street_address + " " + req.body.city + ", " + req.body.state);
    const coords = {latitude: geocoderResult[0].latitude,
                    longitude: geocoderResult[0].longitude}
    res.locals.geocodeResult = coords
    //console.log("Geocoder", geocoderResult)
    //console.log("coords", coords)
    return next();

  } catch(err){
    return next({
      log: 'geocoderController.getLocation: ERROR: Error retrieving coordinates',
      message: { err: `Error occurred in geocoderController.getLocation. err log: ${err}` }
    });
  }
  
}

module.exports = geocoderController;