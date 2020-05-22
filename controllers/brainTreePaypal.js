const braintree = require("braintree");

var gateway = braintree.connect({
   environment: braintree.Environment.Sandbox,
   merchantId: "4cdxgmkwrgxbjr8s",
   publicKey: "xy22cfqbhfhjtxg4",
   privateKey: "e06e9002f4c3ece8650c031e8e0a4f9d",
});

// Generate token from braintree
exports.getPaymentToken = (req, res) => {
   gateway.clientToken.generate({}, function (err, response) {
      if (err) {
         res.status(500).send(err);
      } else {
         res.send(response);
      }
   });
};

// Process Payment and take charges
exports.processPayment = (req, res) => {
   let nonceFromTheClient = req.body.paymentMethodNonce;
   let amountFromClient = req.body.amount;
   gateway.transaction.sale(
      {
         amount: amountFromClient,
         paymentMethodNonce: nonceFromTheClient,
         options: {
            submitForSettlement: true,
         },
      },
      function (err, result) {
         if (err) {
            res.status(500).json(err);
         } else {
            res.status(200).json(result);
         }
      }
   );
};
