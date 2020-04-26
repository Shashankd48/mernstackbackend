import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper";

const Signin = () => {
   // store temparory form data before submitting to backend
   const [values, setValues] = useState({
      email: "aaa@g.com",
      password: "hello1",
      error: "",
      loading: false,
      didRedirect: false,
   });
   // Destructue values
   const { email, password, error, loading, didRedirect } = values;

   // Stroe JWT token information from local storage
   const { user } = isAuthenticated();

   // Get input field values name, email, password
   const handleChange = (name) => (event) => {
      setValues({ ...values, error: false, [name]: event.target.value });
   };

   // Submit form for signin
   const onSubmit = (event) => {
      event.preventDefault();
      setValues({ ...values, error: false, loading: false });
      signin({ email, password })
         .then((data) => {
            if (data.error) {
               setValues({ ...values, error: data.error, loading: false });
            } else {
               authenticate(data, () => {
                  setValues({
                     ...values,
                     loading: true,
                     didRedirect: true,
                  });
               });
            }
         })
         .catch(console.log("Signin request failed"));
   };

   // Redirect checker
   const performRedirect = () => {
      if (didRedirect) {
         if (user && user.rol === 1) {
            return <Redirect to="/admin/dashboard" />;
         } else {
            return <Redirect to="/user/dashboard" />;
         }
      }
      if (isAuthenticated()) {
         return <Redirect to="/" />;
      }
   };

   // Success Message method
   // FIXME: Design issue
   const loadingMessage = () => {
      return (
         loading && (
            <div className="alert alert-info">
               <h2>Loading...</h2>
            </div>
         )
      );
   };

   // ERROR: Message Method
   const errorMessage = () => {
      return (
         <div className="row mt-4">
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

   // FORM: Our actual form
   const signInForm = () => {
      return (
         <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
               <form action="">
                  <div className="form-group">
                     <label className="text-light">Email</label>
                     <input
                        className="form-control"
                        type="email"
                        value={email}
                        onChange={handleChange("email")}
                        required
                     />
                  </div>
                  <div className="form-group">
                     <label className="text-light">Password</label>
                     <input
                        className="form-control"
                        type="password"
                        value={password}
                        onChange={handleChange("password")}
                        required
                     />
                  </div>
                  <button
                     className="btn btn-success mt-2 form-control"
                     onClick={onSubmit}
                  >
                     Sign In
                  </button>
               </form>
            </div>
         </div>
      );
   };

   return (
      <Base title="Sign In Page" description="A page for user to sign in!">
         {loadingMessage()}
         {errorMessage()}
         {signInForm()}
         {performRedirect()}
      </Base>
   );
};

export default Signin;
