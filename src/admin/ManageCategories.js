import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getCategory, deleteCategory } from "./helper/adminapicall";

const ManageCategories = () => {
   const [categories, setCategories] = useState([]);
   const { user, token } = isAuthenticated();

   const preload = () => {
      getCategory().then((data) => {
         if (data.error) {
            console.log(data.error);
         } else {
            setCategories(data);
         }
      });
   };

   useEffect(() => {
      preload();
   }, []);

   // Delete Category Method goes here
   const deleteThisCategory = (categoryId) => {
      deleteCategory(categoryId, user._id, token).then((data) => {
         if (data.error) {
            console.log(data.error);
         } else {
            preload();
         }
      });
   };
   return (
      <Base
         title="Manage categories here..."
         description="Update, Delete your category here."
         className="container pb-4"
      >
         <div className="card p-4">
            <div className="d-flex mb-3">
               <Link className="btn btn-info" to={`/admin/dashboard`}>
                  <span className="">Admin Home</span>
               </Link>
               <h4 className="text-center ml-5">
                  Total {categories.length} categories
               </h4>
            </div>

            {/*Conditional Rendering */}
            {categories.map((category, index) => {
               return (
                  <div key={category._id} className="row text-center mb-2 ">
                     <div className="col-6">
                        <h5 className="text-left">
                           <span>{index + 1}. </span>
                           {category.name}
                        </h5>
                     </div>
                     <div className="col-3">
                        <Link
                           className="btn btn-success"
                           to={`/admin/category/update/${category._id}`}
                        >
                           <span className="">Update</span>
                        </Link>
                     </div>
                     <div className="col-3">
                        <button
                           onClick={() => {
                              deleteThisCategory(category._id);
                           }}
                           className="btn btn-danger"
                        >
                           Delete
                        </button>
                     </div>
                  </div>
               );
            })}
         </div>
      </Base>
   );
};
export default ManageCategories;
