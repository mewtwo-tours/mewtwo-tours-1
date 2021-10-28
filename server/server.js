//basic imports
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cors = require('cors');

// Routers
//http://localhost:3434/

//direct controller imports
//const sessionController = require('./controllers/sessionController');
//const cookieController = require('./controllers/cookieController');

//route imports
const listingRouter = require('./routes/listingRouter');


//db connection


app.use(cors());
app.use(express.json());
app.use(cookieParser());

// server test route
app.use('/testRoute', (req, res) => {
  //test stuff here
  console.log('TEST ROUTE HIT')
  res.send('hello')
});

// listings route
app.use('/listings', listingRouter);

// //signup route
// app.use('/register', signupRouter);


// //check login route
// app.use('/checkLogin', sessionController.isLoggedIn, (req, res) => {
//   return res.status(299).send('user is logged in');
// });

// //serve index.html - NOTE - THIS ROUTE NEVER ACTUALLY HITS (react router serves up the page??)
// app.get('/', (req, res) => {
//   //return res.status(201).sendFile(path.join(__dirname, '.././index.html'));
// });

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
