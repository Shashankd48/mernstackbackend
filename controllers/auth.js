// working is inside the controller

const User = require('../models/user');

exports.signup = (req, res) => {
    console.log("REQ BODY", req.body);
    res.json({
        message: "Signup route works!",
    })
};

exports.signout = (req, res) => {
    res.json({
        message: "User Signout",
        isloggedIn: true
    });
};