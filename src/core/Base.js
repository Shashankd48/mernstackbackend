import React from "react";
import Menu from "./Menu";
const Base = ({
   title = "My Title",
   description = "My Description",
   className = "p-4",
   children,
}) => {
   return (
      <div>
         <Menu />
         <div
            className="container-fluid"
            style={{ minHeight: "calc(100vh - 162px)" }}
         >
            <div className="jumbotron text-center">
               <h2 className="display-4">{title}</h2>
               <p className="lead">{description}</p>
            </div>
            <div className={className}>{children}</div>
         </div>

         <footer className="footer bg-footer mt-auto pt-3">
            <div className="container-fluid text-white text-center py-3">
               <p>
                  If you got any question, feel free to reach out!{" "}
                  <span
                     className="text-warning ml-2"
                     style={{ fontSize: "0.5rem !important" }}
                  >
                     Contact Us
                  </span>
               </p>
            </div>
            <div className="container text-center text-white mt-2">
               <p>Copyright learncodeonline.in © 2020 </p>
            </div>
         </footer>
      </div>
   );
};

export default Base;
