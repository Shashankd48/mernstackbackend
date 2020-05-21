import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ product, maxHeight = "100%", maxWidth = "100%" }) => {
   let imageUrl = product
      ? `${API}/product/photo/${product._id}`
      : "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
   return (
      <img
         src={imageUrl}
         alt="T-shirt"
         style={{ maxHeight: `${maxHeight}`, maxWidth: `${maxWidth}` }}
         className="rounded"
      />
   );
};
export default ImageHelper;
