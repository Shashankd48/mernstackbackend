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
      <Base
         title="Awesome T-shirts explore now."
         description="Welcome to LCO T-shirt store!, Get awesome t-shirt at best price."
      >
         <h3 className="text-center mb-4">All From T-shirts</h3>
         <div className="container">
            <div className="row text-center">
               {products.map((product, index) => {
                  return (
                     <div
                        key={index}
                        className="col-lg-4 col-md-6 col-sm-6 mb-4 px-4"
                     >
                        <Card product={product} />
                     </div>
                  );
               })}
            </div>
         </div>
      </Base>
   );
};

export default Home;
