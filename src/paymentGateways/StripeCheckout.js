import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { emptyCart, loadCart } from "../core/helper/cartHelper";
import { Link } from "react-router-dom";
import { API } from "../backend";
import StripeCheckoutButton from "react-stripe-checkout";
import { createOrder } from "../core/helper/orderHelper";

export default function StripeCheckout({
   products,
   setReload = (f) => f,
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

   // gettotal ammount to be paied
   const getFinalAmount = () => {
      let amount = 0;
      if (products !== undefined) {
         products.map((product) => {
            amount = amount + product.price;
         });
      }
      return amount;
   };

   // makePayement API calll
   const makePayment = (token) => {
      const body = {
         token,
         products,
         finalAmount: getFinalAmount(),
      };
      const headers = {
         "Content-Type": "application/json",
      };
      return fetch(`${API}/stripepayment`, {
         method: "POST",
         headers,
         body: JSON.stringify(body),
      })
         .then((response) => {
            console.log(response);
            const { status } = response;
            console.log("STATUS: ", status);
            // emptyCart();
         })
         .catch((error) => console.log(error));
   };
   // Show stripe button
   const showStripeButton = () => {
      return isAuthenticated() ? (
         products.length > 0 ? (
            <StripeCheckoutButton
               stripeKey={process.env.REACT_APP_PUBLISHABLE_KEY}
               token={makePayment}
               amount={getFinalAmount() * 100}
               name="LCO Store checkout"
               shippingAddress
               billingAddress
            >
               <button className="btn-block btn btn-outline-info">Pay with stripe</button>
            </StripeCheckoutButton>
         ) : (
            ""
         )
      ) : (
         <Link to="/signin">
            <button className="btn btn-warning">Sign In</button>
         </Link>
      );
   };
   return (
      <div className="px-3">
         <div className="mt-3">{showStripeButton()} </div>
      </div>
   );
}
