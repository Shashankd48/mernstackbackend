const express = require('express');
const router = express.Router();
const {getProductById} = require('../controllers/product');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const {getUserById} = require('../controllers/user');

// All of params
router.param('userId', getUserById);
router.param('productId', getProductById);

// all of actual routes

module.exports = router;  