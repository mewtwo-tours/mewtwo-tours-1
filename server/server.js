//basic imports
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cors = require('cors');

//route imports
const listingRouter = require('./routes/listingRouter');
const geocodeRouter = require('./routes/geocodeRouter')
const imagesRouter = require('./routes/imagesRouter')

//db connection
app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use('/geocode', geocodeRouter);
app.use('/listings', listingRouter);
app.use('/images', imagesRouter)


app.get('/', (req, res) => {
  return res.send("ddd")
  //return res.status(201).sendFile(path.join(__dirname, '.././index.html'));
});

/**
 * 404 handler
 */
 app.use('*', (req,res) => {
  res.status(404).send('Not Found');
});

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error.',
    status: 400,
    message: { err: 'An unknown error occurred.' },
  };
  Object.assign(defaultErr, err);
  console.log(defaultErr.log);
  return res.status(defaultErr.status).json(defaultErr.message);
});

//listen on 3000
app.listen(3000, () => {
  console.log('Server listening on 3000');
});

module.exports = app;
