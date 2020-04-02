// contains routes
var express = require('express')
var router = express.Router()
const {signout, signup} = require('../controllers/auth');
const { check, validationResult } = require('express-validator');

router.post('/signup', [
    check('name','name should be at least 3 char').isLength({ min: 3}),
    check('email','email is required').isEmail(),
    check('password','password should be at least 6 char').isLength({ min: 6 })
], signup);

router.get('/signout', signout)

module.exports = router;