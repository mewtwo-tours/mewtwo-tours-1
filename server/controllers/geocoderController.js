const db = require('../models/listingModel.js')
const geocoder = require('../utils/geocoder.js')

geocoderController.test = async(req, res, next)=>{
  try{
    const geocoderResult = await geocoder.geocode(req.body.address);
  }catch(err){

  }
}