import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
   // store temparory form data before submitting to backend
   const [values, setValues] = useState({
      name: "",
      lastname: "",
      email: "",
      password: "",
      error: "",
      success: false,
   });
   // Destructure values
   const { name, lastname, email, password, error, success } = values;

   // Get input field values name, email, password
   const handleChange = (name) => (event) => {
      setValues({ ...values, error: false, [name]: event.target.value });
   };

   // Submit your Signup form
   const onSubmit = (event) => {
      event.preventDefault();
      setValues({ ...values, error: false });
      signup({ name, lastname, email, password })
         .then((data) => {
            if (data.error) {
               setValues({ ...values, error: data.error, success: false });
            } else {
               setValues({
                  ...values,
                  name: "",
                  lastname: "",
                  email: "",
                  password: "",
                  error: "",
                  success: true,
               });
            }
         })
         .catch(console.log("Error in Signup"));
   };

   // Form goes here
   const signUpForm = () => {
      return (
         <div className="col-md-6 offset-md-3 col-sm-8 offset-sm-2">
            <div className="card py-5 text-left px-5">
               <h3 className="text-center">
                  Sign Up <span>🔏</span>
               </h3>
               <form action="">
                  <div className="form-group">
                     <label>First Name</label>
                     <input
                        className="form-control"
                        type="text"
                        onChange={handleChange("name")}
                        value={name}
                     />
                  </div>

                  <div className="form-group">
                     <label>Last Name</label>
                     <input
                        className="form-control"
                        type="text"
                        onChange={handleChange("lastname")}
                        value={lastname}
                     />
                  </div>

                  <div className="form-group">
                     <label>Email</label>
                     <input
                        className="form-control"
                        type="email"
                        onChange={handleChange("email")}
                        value={email}
                     />
                  </div>

                  <div className="form-group">
                     <label>Password</label>
                     <input
                        className="form-control"
                        type="password"
                        onChange={handleChange("password")}
                        value={password}
                     />
                  </div>

                  <button
                     className="btn btn-success mt-2 form-control"
                     onClick={onSubmit}
                  >
                     Sign Up
                  </button>
               </form>
            </div>
         </div>
      );
   };

   // Success Message method
   const successMessage = () => {
      return (
         <div className="col-md-6 offset-md-3 text-left mt-3">
            <div
               className="alert alert-success"
               style={{ display: success ? "" : "none" }}
            >
               New account was created successfully. Please{" "}
               <Link to="/signin">Login here</Link>
            </div>
         </div>
      );
   };

   // Error Message Method
   const errorMessage = () => {
      return (
         <div className="col-md-6 offset-md-3 text-left mt-3">
            <div
               className="alert alert-danger"
               style={{ display: error ? "" : "none" }}
            >
               {error}
            </div>
         </div>
      );
   };

   return (
      <Base
         title="LCO T-shirt Store"
         description="Welcome to lco t-shirt, Create your account for free."
         className="p-0 pb-5"
      >
         {successMessage()}
         {errorMessage()}
         {signUpForm()}
      </Base>
   );
};

export default Signup;
