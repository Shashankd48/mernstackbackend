// contains routes
var express = require('express')
var router = express.Router()
const {signout, signup, signin, isSignedIn} = require('../controllers/auth');
const { check, validationResult } = require('express-validator');

// signup route
router.post(
    '/signup',
    [
        check('name','Name should be at least 3 char').isLength({ min: 3}),
        check('email','Email is required').isEmail(),
        check('password','Password should be at least 6 char').isLength({ min: 6 })
    ], 
    signup
);

// signin route
router.post(
    '/signin', 
    [
        check('email','Email is required').isEmail(),
        check('password','Password field is required').isLength({ min: 6 })
    ],
    signin
);

// signout route
router.get('/signout', signout)

router.get('/testroute', isSignedIn, (req,res) => {
    
    res.json(req.auth);
});

module.exports = router;