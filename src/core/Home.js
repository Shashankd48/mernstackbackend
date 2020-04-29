import React, { useEffect, useState } from "react";
import "../styles.css";
// import { API } from "../backend";
import Base from "./Base";
import Card from "./reusableComponent/Card";
import { getProducts } from "./helper/coreapicalls";

const Home = () => {
   const [products, setProducts] = useState([]);
   const [error, setError] = useState(false);

   // Load Products to the sate
   const loadAllProducts = () => {
      getProducts().then((data) => {
         if (data.error) {
            setError(data.error);
         } else {
            setProducts(data);
         }
      });
   };
   useEffect(() => {
      loadAllProducts();
   }, []);
   return (
      <Base title="Home Page" description="Welcome to LCO T-shirt store!">
         <h1 className="text-white text-center mb-4">All From T-shirts</h1>
         <div className="row text-center">
            {products.map((product, index) => {
               return (
                  <div key={index} className="col-4 mb-4">
                     <Card product={product} />
                  </div>
               );
            })}
         </div>
      </Base>
   );
};

export default Home;
