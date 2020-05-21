import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getProducts, deleteProduct } from "./helper/adminapicall";

const ManageProducts = () => {
   const [products, setProducts] = useState([]);
   const { user, token } = isAuthenticated();

   const preload = () => {
      getProducts().then((data) => {
         if (data.error) {
            console.log(data.error);
         } else {
            setProducts(data);
         }
      });
   };

   useEffect(() => {
      preload();
   }, []);

   //    DELETE: Product
   const deleteThisProduct = (productId) => {
      deleteProduct(productId, user._id, token).then((data) => {
         if (data.error) {
            console.log(data.error);
         } else {
            preload();
         }
      });
   };
   return (
      <Base
         title="Manage products here"
         description="Update, Delete your products here."
         className="container pb-4"
      >
         <div className="card p-4">
            <div className="d-flex mb-3">
               <Link className="btn btn-info" to={`/admin/dashboard`}>
                  <span className="">Admin Home</span>
               </Link>
               <h4 className="text-center ml-5">
                  Total {products.length} products
               </h4>
            </div>

            {/*Conditional Rendering */}
            {products.map((product, index) => {
               return (
                  <div key={index} className="row text-center mb-2 ">
                     <div className="col-7">
                        <h5 className="text-left">
                           <span>{index + 1}. </span> {product.name}
                        </h5>
                     </div>

                     <div className="col-5 d-flex justify-content-around">
                        <div className="">
                           <Link
                              className="btn btn-success"
                              to={`/admin/product/update/${product._id}`}
                           >
                              <span className="">Update</span>
                           </Link>
                        </div>

                        <div className="">
                           <button
                              onClick={() => {
                                 deleteThisProduct(product._id);
                              }}
                              className="btn btn-danger"
                           >
                              Delete
                           </button>
                        </div>
                     </div>
                  </div>
               );
            })}
         </div>
      </Base>
   );
};

export default ManageProducts;
