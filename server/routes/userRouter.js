const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();


router.post('/register', 
  userController.register,
  (req, res) => res.status(200)
  );


router.post('/login', 
  userController.login,
  (req, res) => res.status(200)
  );
module.exports = router;