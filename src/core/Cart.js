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
            <h1>This section is load products</h1>
            {products.map((product, index) => {
               return (
                  <Card
                     key={product._id}
                     product={product}
                     addToCart={false}
                     removeFromCart={true}
                     setReload={setReload}
                     reload={reload}
                  />
               );
            })}
         </div>
      );
   };
   const loadCheckout = () => {
      return (
         <div>
            <h1>This section is for checkout</h1>
         </div>
      );
   };
   return (
      <Base title="Cart Page" description="Ready to checkout">
         <div className="row text-center">
            <div className="col-6">{loadAllProducts()}</div>
            <div className="col-6">{loadCheckout()}</div>
         </div>
      </Base>
   );
};

export default Cart;
