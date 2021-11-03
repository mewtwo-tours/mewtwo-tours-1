const db = require('../models/listingModel');

const listingController = {};

listingController.getListings = async (req, res, next) => {
  
  const longitude = req.body.longitude || res.locals.geocodeResult.longitude;
  const latitude = req.body.latitude || res.locals.geocodeResult.latitude;
  const  radius = 10 // currently mocked 

  //define box around search point, converting miles into degrees
  // 69 miles = ~ 1 degree
  const upperLat = latitude + (radius/69);
  const lowerLat = latitude - (radius/69);
  const upperLong = longitude + radius/(Math.abs(Math.cos(Math.PI*latitude/180))*69);
  const lowerLong = longitude - radius/(Math.abs(Math.cos(Math.PI*latitude/180))*69);

  try{
    //select all columns from listings where query location is between the upper and lower bounds
    const listingQueryString = `
      SELECT * 
      FROM listings
      JOIN images ON images.listing_id = listings.id
      WHERE listings.longitude between ${lowerLong} and ${upperLong}  
      and listings.latitude between ${lowerLat} and ${upperLat}
      ORDER BY images.listing_id;`

    const listings = await db.query(listingQueryString);
    //const listings = await db.query('SELECT * FROM listings')
    
    res.locals.listings = listings;
    
    return next();
  } catch(err){
    return next({
      log: 'listingController.getListings: ERROR: Error fethcing listings',
      message: { err: `Error occurred in listingController.getListings. err log: ${err}` }
    });
  }
};

listingController.postListing = async (req, res, next) => {

  const { 
    title, 
    description, 
    street_address, 
    city, 
    state, 
    upvote, 
    // posted_by  <------ mocking user data for now
  } = req.body.main;

  const posted_by = "f8aad8fe-3b83-11ec-aeff-e504b5473cf2"
  //get string for values to add to image table
  const imageInfo = res.locals.imageInfo;
  const { latitude, longitude } = res.locals.geocodeResult;
  try{

    //using auto-generated uuids for listings
    const listingQueryString = 
      `INSERT INTO listings 
      (title, description, street_address, city, state, 
        latitude, longitude, upvote, posted_by) 
      VALUES (
        '${title}',  
        '${description}', 
        '${street_address}', 
        '${city}', 
        '${state}', 
        '${latitude}', 
        '${longitude}', 
        '${upvote}', 
        '${posted_by}'
        ) returning id;`;

    const listings = await db.query(listingQueryString)
    res.locals.listing_id = listings.rows[0];
    
    return next();
  } catch(err){
    return next({
      log: 'listingController.postListing: ERROR: Error posting a listing',
      message: { err: `Error occurred in listingController.postListing. err log: ${err}` }
    });
  }
};

listingController.getOneListing = async (req, res, next) => {
  const { listing_id } = req.query;

  try{
    //select all columns from specified listing based on id
    //////////POTENTIAL TO OPTIMIZE BY NOT REFETCHING DATA 
    const listingQueryString = `
      SELECT * FROM listings
      WHERE listings.id=${listing_id};`;

    const imageQueryString = `
      SELECT * FROM images
      WHERE images.listing_id=${listing_id};`;
      
    const commentsQueryString = `
      SELECT * FROM comments
      WHERE comments.listing_id=${listing_id};`;
      
    const listing = await db.query(listingQueryString);
    const images = await db.query(imageQueryString);
    const comments = await db.query(commentsQueryString);

    res.locals.listings = listings;
    res.locals.images = images;
    res.locals.comments = comments;
    
    return next();
  } catch(err){
    return next({
      log: 'listingController.getOneListing: ERROR: Error fethcing listing',
      message: { err: `Error occurred in listingController.getOneListing. err log: ${err}` }
    });
  }
};
module.exports = listingController;