import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";
import logo from "../assets/logo1.png";
// Change color of menu text for current tab
const currentTab = (history, path) => {
   if (history.location.pathname === path) {
      return { color: "#ffc845" };
   } else {
      return { color: "#ffffff" };
   }
};

// This us navigation bar
const Menu = ({ history }) => {
   return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-nav p-0">
         <div className="container">
            <Link class="navbar-brand" style={currentTab(history, "/")} to="/">
               <div className="d-flex">
                  <img src={logo} alt="Logo" width="auto" />
                  <h3 className="text-white">LCO Store</h3>
               </div>
            </Link>
            <button
               class="navbar-toggler"
               type="button"
               data-toggle="collapse"
               data-target="#navbarNavAltMarkup"
               aria-controls="navbarNavAltMarkup"
               aria-expanded="false"
               aria-label="Toggle navigation"
            >
               <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
               <div class="navbar-nav ml-auto">
                  <Link
                     style={currentTab(history, "/")}
                     className="nav-item nav-link"
                     to="/"
                  >
                     Home
                  </Link>

                  <Link
                     style={currentTab(history, "/cart")}
                     className="nav-link nav-item"
                     to="/cart"
                  >
                     Cart
                  </Link>

                  {/*User Dashboard : conditinal rendering */}
                  {isAuthenticated() && isAuthenticated().user.rol === 0 && (
                     <Link
                        style={currentTab(history, "/user/dashboard")}
                        className="nav-item nav-link"
                        to="/user/dashboard"
                     >
                        Dashboard
                     </Link>
                  )}

                  {/*Admin Dashboard : conditinal rendering */}
                  {isAuthenticated() && isAuthenticated().user.rol === 1 && (
                     <Link
                        style={currentTab(history, "/admin/dashboard")}
                        className="nav-link"
                        to="/admin/dashboard"
                     >
                        Admin-Dashboard
                     </Link>
                  )}

                  {/*Signup and Signin fragment */}
                  {!isAuthenticated() && (
                     <Fragment>
                        <Link
                           style={currentTab(history, "/signup")}
                           className="nav-link"
                           to="/signup"
                        >
                           Sign Up
                        </Link>

                        <Link
                           style={currentTab(history, "/signin")}
                           className="nav-link"
                           to="/signin"
                        >
                           Sign In
                        </Link>
                     </Fragment>
                  )}

                  {/* Signout link goes here if Authenticated */}
                  {isAuthenticated() && (
                     <span
                        className="nav-link text-white"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                           signout(() => {
                              history.push("/");
                           });
                        }}
                     >
                        Signout
                     </span>
                  )}
               </div>
            </div>
         </div>
      </nav>
   );
};
export default withRouter(Menu);
