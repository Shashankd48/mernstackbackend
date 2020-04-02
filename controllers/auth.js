// working is inside the controller
const { check, validationResult } = require('express-validator');
const User = require('../models/user');

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
    res.json({
        message: "User Signout",
        isloggedIn: true
    });
};