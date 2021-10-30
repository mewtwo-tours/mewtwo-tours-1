const db = require('../models/listingModel.js')
const geocoder = require('../utils/geocoder.js')

const geocoderController = {}

geocoderController.getLocation = async(req, res, next)=>{
  try{
    console.log(req.body.location)
    const geocoderResult = await geocoder.geocode(req.body.location);
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