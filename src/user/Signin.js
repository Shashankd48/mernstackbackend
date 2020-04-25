import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";

const Signin = () => {
   const signInForm = () => {
      return (
         <div className="row mb-5">
            <div className="col-md-6 offset-sm-3 text-left">
               <form action="">
                  <div className="form-group">
                     <label className="text-light">Email</label>
                     <input
                        className="form-control"
                        type="email"
                        name="email"
                        id=""
                     />
                  </div>
                  <div className="form-group">
                     <label className="text-light">Password</label>
                     <input
                        className="form-control"
                        type="password"
                        name="password"
                        id=""
                     />
                  </div>
                  <button className="btn btn-success block form-control">
                     Sign In
                  </button>
               </form>
            </div>
         </div>
      );
   };
   return (
      <Base title="Sign In Page" description="A page for user to sign in!">
         {signInForm()}
      </Base>
   );
};

export default Signin;
