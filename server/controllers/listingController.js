const db = require('../models/listingModel');

const listingController = {};

listingController.getListings = async (req, res, next) => {
  const { lattitude, longitude, radius } = req.query;

  //define box around search point, converting miles into degrees
  // 69 miles = ~ 1 degree
  const upperLat = lattitude + (radius/69);
  const lowerLat = lattitude - (radius/69);
  const upperLong = longitude + radius/(Math.abs(Math.cos(Math.PI*lattitude/180))*69);
  const lowerLong = longitude - radius/(Math.abs(Math.cos(Math.PI*lattitude/180))*69);

  try{
    //select all columns from listings where query location is between the upper and lower bounds
    const listingQueryString = `
      SELECT * FROM public.Listings
      WHERE Listings.longitude between '${upperLong}' and '${lowerLong}'
      and Listings.lattitude between '${upperLat}' and '${lowerLat}';`;
    const listings = await db.query(listingQueryString);

    //need to perform and inner join here to get discussion, picutes, etc
    const listingID = listings

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
    id,
    title, 
    description, 
    street_address, 
    city, 
    state, 
    lattitude, 
    longitude, 
    upvote, 
    posted_by 
  } = req.body.listing;

  //get string for values to add to image table
  const imageInfo = res.locals.imageInfo;

  try{
    const listingQueryString = 
      `INSERT INTO public.Listings 
      (id, title, description, street_address, city, state, 
      lattitude, longitude, upvote, posted_by) 
      VALUES (
        '${id}',
        '${title}',  
        '${description}', 
        '${street_address}', 
        '${city}', 
        '${state}', 
        '${lattitude}', 
        '${longitude}', 
        '${upvote}', 
        '${posted_by}'
        );`;

    const imageQueryString = 
      `INSERT INTO public.Images 
      (id, description, listing_id, url) 
      VALUES ${imageInfo};`;
    

    const listings = await db.query(listingQueryString)
    await db.query(imageQueryString);
    res.locals.listings = listings;
    
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
      SELECT * FROM public.Listings
      WHERE Listings.id=${listing_id};`;

    const imageQueryString = `
      SELECT * FROM public.Images
      WHERE Images.listing_id=${listing_id};`;
      
    const discussionQueryString = `
      SELECT * FROM public.Discussions
      WHERE Discussions.listing_id=${listing_id};`;
      
    const listing = await db.query(listingQueryString);
    const images = await db.query(imageQueryString);
    const discussions = await db.query(discussionQueryString);

    res.locals.listings = listings;
    res.locals.images = images;
    res.locals.discussions = discussions;
    
    return next();
  } catch(err){
    return next({
      log: 'listingController.getOneListing: ERROR: Error fethcing listing',
      message: { err: `Error occurred in listingController.getOneListing. err log: ${err}` }
    });
  }
};
module.exports = listingController;