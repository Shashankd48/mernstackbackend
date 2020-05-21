import React, { useEffect, useState } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./reusableComponent/Card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "../paymentGateways/StripeCheckout";

const Cart = () => {
   const [products, setProducts] = useState([]);
   const [reload, setReload] = useState(false);

   useEffect(() => {
      setProducts(loadCart());
   }, [reload]);

   // Cart Products goes here
   const loadAllProducts = () => {
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
                  <i class="fas fa-h1    "></i>
               )}
            </div>
         </div>
      );
   };
   const loadCheckout = () => {
      return (
         <div>
            <span className="mb-3">
               <h3>
                  Checkout <span>✔</span>
               </h3>
            </span>
            <StripeCheckout products={products} setReload={setReload} />
         </div>
      );
   };
   return (
      <Base
         title="Your Cart 🛒"
         description="Ready to checkout"
         className="container mb-4"
      >
         <div className="row text-center" style={{ minHeight: "200px" }}>
            <div className="col-md-7 col-sm-12">{loadAllProducts()}</div>
            <div className="col-md-5 col-sm-12">{loadCheckout()}</div>
         </div>
      </Base>
   );
};

export default Cart;
