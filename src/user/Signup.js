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
         <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
               <form action="">
                  <div className="form-group">
                     <label className="text-light">First Name</label>
                     <input
                        className="form-control"
                        type="text"
                        onChange={handleChange("name")}
                        value={name}
                     />
                  </div>

                  <div className="form-group">
                     <label className="text-light">Last Name</label>
                     <input
                        className="form-control"
                        type="text"
                        onChange={handleChange("lastname")}
                        value={lastname}
                     />
                  </div>

                  <div className="form-group">
                     <label className="text-light">Email</label>
                     <input
                        className="form-control"
                        type="email"
                        onChange={handleChange("email")}
                        value={email}
                     />
                  </div>

                  <div className="form-group">
                     <label className="text-light">Password</label>
                     <input
                        className="form-control"
                        type="password"
                        onChange={handleChange("password")}
                        value={password}
                     />
                  </div>

                  <button
                     className="btn btn-success mt-2 block form-control"
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
         <div className="row">
            <div className="col-md-6 offset-sm-3 text laft">
               <div
                  className="alert alert-success"
                  style={{ display: success ? "" : "none" }}
               >
                  New account was created successfully. Please{" "}
                  <Link to="/signin">Login here</Link>
               </div>
            </div>
         </div>
      );
   };

   // Error Message Method
   const errorMessage = () => {
      return (
         <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
               <div
                  className="alert alert-danger"
                  style={{ display: error ? "" : "none" }}
               >
                  {error}
               </div>
            </div>
         </div>
      );
   };

   return (
      <Base title="Sign up Page" description="A page for user to sign up!">
         {signUpForm()}

         {/* <p className="text-white text-center mt-2">{JSON.stringify(values)}</p> */}

         {successMessage()}
         {errorMessage()}
      </Base>
   );
};

export default Signup;
