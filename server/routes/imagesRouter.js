const express = require('express');
const multer = require('multer'); //Lets us recieve images on express server
const upload = multer({ dest: 'uploads/' }); // specifying the destination for all the files uploaded to the server
const router = express.Router();
const fs = require('fs');
const util = require('util');
const unlikeFile = util.promisify(fs.unlink); //It is used to convert a method that returns responses using a callback function to return responses in a promise object
const { uploadFile, getFileStream } = require('../utils/s3');


router.get('/show/:key', (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.pipe(res);
});


router.post(
  '/upload', (req, res) => {
    console.log("Hit")
    res.status(200).send("DSDSFSWV");
  }
);


// router.post(
//   '/upload',
//   upload.single('image'), //Accept a single file with the name 'image'. The single file will be stored in req.file
//   async (req, res) => {
//     console.log("Are you hitting here?")
//     const file = req.file;
//     const result = await uploadFile(file); //Upload the file
//     await unlikeFile(file.path); //Delete the file after uploading it to s3
//     //console.log(result);
//     const description = req.body.description;
//     return res.send({ imagePath: `/images/${result.key}` });
//   }
// );

router.get(
  '/getimage',
  (req, res) => {
    res.status(200).send(res.locals.imageFileName);
  }
);

module.exports = router;
