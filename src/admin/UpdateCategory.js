import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { getCategoryById, updateCategory } from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
   const [name, setName] = useState();
   const [error, setError] = useState(false);
   const [success, setSuccess] = useState(false);

   const getCategoryName = () => {
      getCategoryById(match.params.categoryId).then((data) => {
         if (data.error) {
            setName("");
         } else {
            setName(data.name);
         }
      });
   };
   useEffect(() => {
      getCategoryName();
   }, []);
   //    Destructure states
   const { user, token } = isAuthenticated();

   // Back Button
   const goBack = () => {
      return (
         <div className="mt-2">
            <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">
               Back
            </Link>
         </div>
      );
   };

   // Success Message
   const successMessage = () => {
      if (success) {
         return (
            <h5 className="text-success my-2">
               Category updated successfully.
            </h5>
         );
      }
   };

   // Success Message
   const errorMessage = () => {
      if (error) {
         return (
            <h5 className="text-danger my-2">Failed to create category.</h5>
         );
      }
   };

   // Handle changes in input
   const handleChange = (event) => {
      setError("");
      setName(event.target.value);
   };

   //    Form Submit Button
   const onSubmit = (event) => {
      event.preventDefault();
      setError("");
      setSuccess(false);

      //   Backend request fired
      updateCategory(match.params.categoryId, user._id, token, { name }).then(
         (data) => {
            if (data.error) {
               setError(true);
            } else {
               setError("");
               setSuccess(true);
               setName("");
            }
         }
      );
   };

   //   Form Goes here
   const myCategoryForm = () => (
      <form className="mt-3">
         <div className="form-group">
            <p className="lead">Enter new category name here</p>
            <input
               type="text"
               className="form-control my-3"
               placeholder="For Ex. Summer"
               autoFocus
               required
               onChange={handleChange}
               value={name}
            />
            <button onClick={onSubmit} className="btn btn-outline-info">
               Update Category
            </button>
         </div>
      </form>
   );
   return (
      <Base
         title="Create category here"
         description="Add a new category for new t-shirts"
         className="container bg-info p-4"
      >
         <div className="row bg-white rounded">
            <div className="col-md-8 offset-md-2">
               {successMessage()}
               {errorMessage()}
               {myCategoryForm()}
               {goBack()}
            </div>
         </div>
      </Base>
   );
};
export default UpdateCategory;
