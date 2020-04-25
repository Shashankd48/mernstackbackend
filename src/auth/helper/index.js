import { API } from "../../backend";

// Signup Method
export const signup = (user) => {
   return fetch(`${API}/signup`, {
      method: "POST",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
   })
      .then((response) => {
         return response.json();
      })
      .catch((err) => console.log(err));
};

// Signin Method
export const signin = (user) => {
   return fetch(`${API}/signin`, {
      method: "POST",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
   })
      .then((response) => {
         return response.json();
      })
      .catch((err) => console.log(err));
};

//  Signout method
export const signout = (next) => {
   // Delete JWT token
   if (typeof window !== "undefined") {
      localStorage.removeItem("jwt");
      next();

      //singout fron backend
      return fetch(`${API}/signout`, {
         method: "GET",
      })
         .then((response) => console.log("Signout Seccess"))
         .catch((err) => console.log(err));
   }
};

// Authentication of user
export const authenticate = (data, next) => {
   if (typeof window !== "undefined") {
      localStorage.setItem("jwt", JSON.stringify(data));
      next();
   }
};

//Check User still logged-In
export const isAuthenticated = () => {
   if (typeof window == "undefined") {
      return false;
   }
   if (localStorage.getItem("jwt")) {
      return JSON.parse(localStorage.getItem("jwt"));
   } else {
      return false;
   }
};
