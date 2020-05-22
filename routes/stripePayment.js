const express = require("express");
const router = express.Router();
const { makePayment } = require("../controllers/stripePayment");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

router.post("/stripepayment", makePayment);

module.exports = router;
