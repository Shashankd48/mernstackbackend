import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
   const [name, setName] = useState();
   const [error, setError] = useState(false);
   const [success, setSuccess] = useState(false);

   //    Destructure states
   const { user, token } = isAuthenticated();
   //    Form
   const myCategoryForm = () => (
      <form>
         <div className="form-group">
            <h5 className="my-3">Enter the category</h5>
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
               Create Category
            </button>
         </div>
      </form>
   );

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
               Category created successfully.
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
      createCategory(user._id, token, { name }).then((data) => {
         if (data.error) {
            setError(true);
         } else {
            setError("");
            setSuccess(true);
            setName("");
         }
      });
   };

   return (
      <Base
         title="Create category here"
         description="Add a new category for new t-shirts"
         className="container-fluid mb-3"
      >
         <div className="col-md-6 offset-md-3 rounded col-sm-9 offset-sm-1">
            <div className="card py-3 px-5">
               {successMessage()}
               {errorMessage()}
               {myCategoryForm()}
               {goBack()}
            </div>
         </div>
      </Base>
   );
};
export default AddCategory;
