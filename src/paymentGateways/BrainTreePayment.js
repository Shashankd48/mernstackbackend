import React, { useEffect, useState } from "react";
import { getMeToken, processPayment } from "./BrainTreePaymentHelper";
import { loadCart, emptyCart } from "../core/helper/cartHelper";
import { Link } from "react-router-dom";
import { createOrder } from "../core/helper/orderHelper";
import DropIn from "braintree-web-drop-in-react";
import { isAuthenticated } from "../auth/helper";

export default function BrainTreePayment({
   products,
   setReload = (f) => f,
   reload = undefined,
}) {
   const [info, setInfo] = useState({
      loading: false,
      success: false,
      clientToken: null,
      error: "",
      instance: {},
   });

   //    getting userId and Token from isAuthenticated
   const userId = isAuthenticated() && isAuthenticated().user._id;
   const token = isAuthenticated() && isAuthenticated().token;

   //    Geting token
   const gettingToken = (userId, token) => {
      getMeToken(userId, token).then((response) => {
         console.log("BrainTree", response);
         if (response.error) {
            setInfo({ ...info, error: response.error });
         } else {
            const clientToken = response.clientToken;
            setInfo({ clientToken });
         }
      });
   };

   useEffect(() => {
      gettingToken(userId, token);
   }, []);

   // Purchase operation
   const onPurchase = () => {
      setInfo({ loading: true });
      let nonce;
      let getNonce = info.instance
         .requestPaymentMethod()
         .then((data) => {
            nonce = data.nonce;
            const paymentData = {
               paymentMethodNonce: nonce,
               amount: getAmount(),
            };
            processPayment(userId, token, paymentData)
               .then((response) => {
                  setInfo({
                     ...info,
                     success: response.success,
                     loading: false,
                  });
                  const orderData = {
                     products: products,
                     transaction_id: response.transaction_id,
                     amount: response.transaction.amount,
                  };
                  createOrder(userId, token, orderData);
                  emptyCart(() => {
                     console.log("Did we got a crash");
                  });
                  // TODO: force reload
                  setReload(!reload);
                  console.log("PAYMENT SUCCESS");
               })
               .catch((error) => {
                  setInfo({ loading: false, success: false });
                  console.log("PAYMENT FAILED");
               });
         })
         .catch();
   };
   const getAmount = () => {
      let amount = 0;
      products.map((product) => {
         amount = amount + product.price;
      });
      return amount;
   };
   const showBrainTreeDropIn = () => {
      return (
         <div>
            {info.clientToken !== null && products.length > 0 ? (
               <div className="px-3 brainTreeDropIn">
                  <DropIn
                     options={{ authorization: info.clientToken }}
                     onInstance={(instance) => (info.instance = instance)}
                  />
                  <button
                     onClick={() => {
                        onPurchase();
                     }}
                     className="mt-3 btn-block btn btn-outline-dark"
                  >
                     Make Payment
                  </button>
               </div>
            ) : (
               <div>
                  <p>Please Login or add something to cart</p>
               </div>
            )}
         </div>
      );
   };
   return <div>{showBrainTreeDropIn()}</div>;
}
