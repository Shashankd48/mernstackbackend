import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
const AdminDashboard = () => {
   const {
      user: { name, email },
   } = isAuthenticated();

   // Left Section
   const adminLeftSide = () => {
      return (
         <div className="card admin-nav">
            <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
            <ul className="list-group">
               <li className="list-group-item">
                  <Link
                     to="/admin/create/category"
                     className="nav-link admin-link"
                  >
                     Create Categories
                  </Link>
               </li>

               <li className="list-group-item">
                  <Link to="/admin/category" className="nav-link admin-link">
                     Manage Categories
                  </Link>
               </li>

               <li className="list-group-item">
                  <Link
                     to="/admin/create/product"
                     className="nav-link admin-link"
                  >
                     Add New Products
                  </Link>
               </li>

               <li className="list-group-item">
                  <Link to="/admin/products" className="nav-link admin-link">
                     Manage Products
                  </Link>
               </li>

               <li className="list-group-item">
                  <Link to="/admin/orders" className="nav-link admin-link">
                     Manage Orders
                  </Link>
               </li>
            </ul>
         </div>
      );
   };

   //Right Section
   const adminRightSide = () => {
      return (
         <div className="card mb-4">
            <h4 className="card-header">Admin Information</h4>
            <ul className="list-group">
               <li className="list-group-item">
                  <span className="badge badge-success mr-2 p-2">Name : </span>
                  <b>{name}</b>
               </li>

               <li className="list-group-item">
                  <span className="badge badge-info mr-2 p-2">Email : </span>
                  <b>{email}</b>
               </li>

               <li className="list-group-item">
                  <span className="badge badge-danger mr-2 p-2">
                     Privilege :{" "}
                  </span>{" "}
                  <b>Admin</b>
               </li>
            </ul>
         </div>
      );
   };
   return (
      <Base
         title="Welcome to admin area"
         description="Manage all of your products here..."
         className="container p-4"
      >
         <div className="row">
            <div className="col-md-4 col-sm-6 mb-4">{adminLeftSide()}</div>
            <div className="col-md-8 col-sm-6 mb-4">{adminRightSide()}</div>
         </div>
      </Base>
   );
};
export default AdminDashboard;
