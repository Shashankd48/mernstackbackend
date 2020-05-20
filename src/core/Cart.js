import React, { useEffect, useState } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./reusableComponent/Card";
import { loadCart } from "./helper/cartHelper";

const Cart = () => {
   const [products, setProducts] = useState([]);
   const [reload, setReload] = useState(false);
   useEffect(() => {
      setProducts(loadCart());
   }, [reload]);
   const loadAllProducts = () => {
      return (
         <div>
            <h3 className="mb-4">Your Products 😊</h3>
            <div className="row">
               {products.map((product, index) => {
                  return (
                     <div className="col-md-6 col-sm-12 my-2" key={index}>
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
               })}
            </div>
         </div>
      );
   };
   const loadCheckout = () => {
      return (
         <div>
            <span className="mb-3">
               <h3>Checkout ✔</h3>
            </span>
         </div>
      );
   };
   return (
      <Base title="Your Cart 🛒" description="Ready to checkout">
         <div className="row text-center">
            <div className="col-md-6 col-sm-12">{loadAllProducts()}</div>
            <div className="col-md-6 col-sm-12">{loadCheckout()}</div>
         </div>
      </Base>
   );
};

export default Cart;
