import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashboard from "./user/UserDashBoard";
import AdminDashboard from "./user/AdminDashBoard";
const Routes = () => {
   return (
      <Router>
         <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={Signin} />
            <AdminRoute
               path="/admin/dashboard"
               exact
               component={AdminDashboard}
            />
            <PrivateRoute
               path="/user/dashboard"
               exact
               component={UserDashboard}
            />
         </Switch>
      </Router>
   );
};

export default Routes;
