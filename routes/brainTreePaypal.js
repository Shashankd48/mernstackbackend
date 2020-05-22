const express = require("express");
const router = express.Router();
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const {
   processPayment,
   getPaymentToken,
} = require("../controllers/brainTreePaypal");

router.param("userId", getUserById);
// GET: Token routes
router.get(
   "/payment/gettoken/:userId",
   isSignedIn,
   isAuthenticated,
   getPaymentToken
);

//POST: Make payment with braintree paypa;
router.post(
   "/payment/braintree/:userId",
   isSignedIn,
   isAuthenticated,
   processPayment
);

module.exports = router;
