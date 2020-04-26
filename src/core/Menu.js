import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";

// Change color of menu text for current tab
const currentTab = (history, path) => {
   if (history.location.pathname === path) {
      return { color: "#2ecc72" };
   } else {
      return { color: "#ffffff" };
   }
};

// This us navigation bar
const Menu = ({ history }) => {
   return (
      <div>
         <ul className="nav nav-tabs bg-dark">
            <li className="nav-item">
               <Link
                  style={currentTab(history, "/")}
                  className="nav-link"
                  to="/"
               >
                  Home
               </Link>
            </li>

            <li className="nav-item">
               <Link
                  style={currentTab(history, "/cart")}
                  className="nav-link"
                  to="/cart"
               >
                  Cart
               </Link>
            </li>

            {/*User Dashboard : conditinal rendering */}
            {isAuthenticated() && isAuthenticated().user.rol === 0 && (
               <li className="nav-item">
                  <Link
                     style={currentTab(history, "/user/dashboard")}
                     className="nav-link"
                     to="/user/dashboard"
                  >
                     Dashboard
                  </Link>
               </li>
            )}

            {/*Admin Dashboard : conditinal rendering */}
            {isAuthenticated() && isAuthenticated().user.rol === 1 && (
               <li className="nav-item">
                  <Link
                     style={currentTab(history, "/admin/dashboard")}
                     className="nav-link"
                     to="/admin/dashboard"
                  >
                     Admin-Dashboard
                  </Link>
               </li>
            )}

            {/*Signup and Signin fragment */}
            {!isAuthenticated() && (
               <Fragment>
                  <li className="nav-item">
                     <Link
                        style={currentTab(history, "/signup")}
                        className="nav-link"
                        to="/signup"
                     >
                        Sign Up
                     </Link>
                  </li>

                  <li className="nav-item">
                     <Link
                        style={currentTab(history, "/signin")}
                        className="nav-link"
                        to="/signin"
                     >
                        Sign In
                     </Link>
                  </li>
               </Fragment>
            )}

            {/* Signout link goes here if Authenticated */}
            {isAuthenticated() && (
               <li className="nav-item">
                  <span
                     className="nav-link text-warning"
                     style={{ cursor: "pointer" }}
                     onClick={() => {
                        signout(() => {
                           history.push("/");
                        });
                     }}
                  >
                     Signout
                  </span>
               </li>
            )}
         </ul>
      </div>
   );
};
export default withRouter(Menu);
