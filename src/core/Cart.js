import React, { useEffect, useState } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./reusableComponent/Card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "../paymentGateways/StripeCheckout";
import { Link } from "react-router-dom";
import BrainTreePayment from "../paymentGateways/BrainTreePayment";

const Cart = () => {
   const [products, setProducts] = useState([]);
   const [reload, setReload] = useState(false);

   useEffect(() => {
      setProducts(loadCart());
   }, [reload]);

   // Cart Products goes here
   const loadAllProducts = (products) => {
      return (
         <div>
            <h3 className="mb-4">
               Your Products <span>😊</span>
            </h3>
            <div className="row">
               {products !== undefined ? (
                  products.map((product, index) => {
                     return (
                        <div
                           className="col-lg-6 col-md-12 col-sm-12 my-3"
                           key={index}
                        >
                           <Card
                              key={product._id}
                              product={product}
                              addToCart={false}
                              removeFromCart={true}
                              setReload={setReload}
                              reload={reload}
                           />
                        </div>
                     );
                  })
               ) : (
                  <i className="fas fa-h1"></i>
               )}
            </div>
         </div>
      );
   };
   const showTotalAmount = () => {
      let amount = 0;
      if (products !== undefined) {
         products.map((product) => {
            amount = amount + product.price;
         });
      }
      return (
         <p className="text-success my-1">
            <b> Total amount to be paid {amount} $</b>
         </p>
      );
   };
   const loadCheckout = () => {
      return (
         <div className="card py-4 mb-4">
            <span className="mb-3">
               <h3>
                  Checkout <span>✔</span>
               </h3>
            </span>
            {products.length > 0 ? showTotalAmount() : ""}
            <BrainTreePayment products={products} setReload={setReload} />
            <StripeCheckout products={products} setReload={setReload} />
         </div>
      );
   };
   return (
      <Base
         title="Your Cart 🛒"
         description="Ready to checkout"
         className="container"
      >
         <div>
            <div className="row text-center">
               <div className="col-md-7 col-sm-12 card py-4 cartProducts mb-4">
                  {products.length > 0 ? (
                     loadAllProducts(products)
                  ) : (
                     <div className="card py-1 cartEmpty">
                        <h4>Your cart is empty ❕</h4>
                        <Link to="/">
                           <button className="btn btn-warning mt-2">
                              Continue Shopping
                           </button>
                        </Link>
                     </div>
                  )}
               </div>
               <div className="col-md-5 col-sm-12">{loadCheckout()}</div>
            </div>
         </div>
      </Base>
   );
};

export default Cart;
