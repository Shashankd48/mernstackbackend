import React, { useState, useEffect } from "react";
import ImageHelper from "../helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "../helper/cartHelper";

const Card = ({
   product,
   addToCart = true,
   removeFromCart = false,
   setReload = (f) => f,
   reload = undefined,
}) => {
   const [redirect, setRedirect] = useState(false);
   const [count, setCount] = useState(product.count);

   // Some default values for card
   var cardTitle = product ? product.name : "A Photo from pexels";
   var cardDescription = product
      ? product.description
      : "Lorem ipsum dolor sit amet.";
   var cardPrice = product ? product.price : "0.99";

   // Add to cart method
   const addThisItemToCart = () => {
      addItemToCart(product, () => setRedirect(true));
   };
   const getRedirect = (redirect) => {
      if (redirect) {
         return <Redirect to="/cart" />;
      }
   };
   const showAddToCart = (addToCart) => {
      return (
         addToCart && (
            <button
               onClick={addThisItemToCart}
               className="btn btn-outline-success"
            >
               Add to Cart
            </button>
         )
      );
   };
   const showRemoveFromCart = (removeFromCart) => {
      return (
         removeFromCart && (
            <button
               onClick={() => {
                  removeItemFromCart(product._id);
                  setReload(!reload);
               }}
               className="btn btn-outline-danger"
            >
               Remove
            </button>
         )
      );
   };

   return (
      <div className="card">
         <div className="rounded">
            <ImageHelper product={product} />
         </div>
         <div className="card-body text-left">
            {getRedirect(redirect)}

            <h5 className="card-title">{cardTitle} </h5>
            <p className="mt-1 text-wrap">{cardDescription}</p>
            <div className="row">
               <div className="col-md-6 col-sm-4">
                  <p className="text-success">
                     <b>Price: ${cardPrice}</b>
                  </p>
               </div>
               <div className="col-md-6 col-sm-8">
                  <div className="col-12">{showAddToCart(addToCart)}</div>
                  <div className="col-12">
                     {showRemoveFromCart(removeFromCart)}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Card;
