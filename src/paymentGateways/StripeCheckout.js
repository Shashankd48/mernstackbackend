import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { emptyCart, loadCart } from "../core/helper/cartHelper";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
export default function StripeCheckout({
   products,
   setReaload = (f) => f,
   reload = undefined,
}) {
   const [data, setData] = useState({
      laoding: false,
      success: false,
      error: "",
      address: "",
   });
   const token = isAuthenticated() && isAuthenticated().token;
   const userId = isAuthenticated() && isAuthenticated().user._id;
   const getFinalPrice = () => {
      let amount = 0;
      products.map((p) => {
         amount = amount + p.price;
      });
      return amount;
   };
   const makePayment = (token) => {
      //
   };
   const showStripeButton = () => {
      return isAuthenticated() ? (
         <StripeCheckoutButton
            stripeKey=""
            token={makePayment}
            amount={getFinalPrice() * 100}
            name="Buy T-shirt"
            billingAddress
            shippingAddress
         >
            <button className="btn btn-info">Pay with stripe</button>
         </StripeCheckoutButton>
      ) : (
         <Link to="/signin">
            <button className="btn btn-warning">Sign in</button>
         </Link>
      );
   };

   return (
      <div>
         <h4 className="text-center my-3">Stripe Checkout 💳 </h4>

         <p className="text-success">Amount to be paid {getFinalPrice()} $</p>
         {showStripeButton()}
      </div>
   );
}
