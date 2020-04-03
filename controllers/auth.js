// working is inside the controller
const { check, validationResult } = require('express-validator');
const User = require('../models/user');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

exports.signup = (req, res) => {
    // checking user data
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
            parameter: errors.array()[0].param
        })
    }

    const user = new User(req.body);
    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                err: "Not able to save user in DB"
            })
        }
        res.json({
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            id: user._id
        });
    })
};

exports.signout = (req, res) => {
    res.clearCookie('token');
    res.json({
        message: "User Signout successfully",
    });
};

exports.signin = (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
            parameter: errors.array()[0].param
        })
    }

    // find just one query from the database tshirt
    User.findOne({ email }, (err, user) => {
        
        // Check email exist or not
        if(err || !user){
            return res.status(400).json({
                error: "User email does not exist"
            })
        }

        // Now email exist and check password
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email or password do not match"
            })
        }

        //Autherization successful create a token and put that into browser cookie
        const token = jwt.sign({ id: user._id}, process.env.SECRET);

        res.cookie('token', token, {expire: new Date() + 9999});

        // send response to front end
        const {_id, name, email, rol} = user;
        return res.json({
            token,
            user: {_id, name, email, rol}
        });
    });
}

// protected route
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
});

// custome middlewares
exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth.id;
    if(!checker){
        console.log('Auth error')
        return res.status(403).json({
            error: "ACCESS DENIED"
        });
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if(req.profile.rol === 0){
        return res.status(403).json({
            error: "You are not ADMIN, ACCESS DENIED!!!"
        })
    }
    next();
}