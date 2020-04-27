import { API } from "../../backend";

// Category Calls
// CREATE: Category
export const createCategory = (userId, token, category) => {
   return fetch(`${API}/category/create/${userId}`, {
      method: "POST",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
   })
      .then((response) => {
         return response.json();
      })
      .catch((err) => console.log(err));
};

// Get: All Category
export const getCategory = () => {
   return fetch(`${API}/categories`, {
      method: "GET",
   })
      .then((response) => {
         return response.json();
      })
      .catch((err) => console.log(err));
};

// DELETE: A Category
export const deleteCategory = (categoryId, userId, token) => {
   return fetch(`${API}/category/${categoryId}/${userId}`, {
      method: "DELETE",
      headers: {
         Accept: "application/json",
         Authorization: `Bearer ${token}`,
      },
   })
      .then((response) => {
         return response.json();
      })
      .catch((err) => console.log(err));
};

// GET: A Category
export const getCategoryById = (categoryId) => {
   return fetch(`${API}/category/${categoryId}`, {
      method: "GET",
   })
      .then((response) => {
         return response.json();
      })
      .catch((err) => console.log(err));
};

// UPDATE: A Category
export const updateCategory = (categoryId, userId, token, newName) => {
   return fetch(`${API}/category/${categoryId}/${userId}`, {
      method: "PUT",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newName),
   })
      .then((response) => {
         return response.json();
      })
      .catch((err) => console.log(err));
};

// Product Calls
export const createProduct = (userId, token, product) => {
   return fetch(`${API}/product/create/${userId}`, {
      method: "POST",
      headers: {
         Accept: "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: product,
   })
      .then((response) => {
         return response.json();
      })
      .catch((err) => console.log(err));
};

// GET: All Product
export const getProducts = () => {
   return fetch(`${API}/products`, {
      method: "GET",
   })
      .then((response) => {
         return response.json();
      })
      .catch((err) => console.log(err));
};

// DELETE: A Product
export const deleteProduct = (productId, userId, token) => {
   return fetch(`${API}/product/${productId}/${userId}`, {
      method: "DELETE",
      headers: {
         Accept: "application/json",
         Authorization: `Bearer ${token}`,
      },
   })
      .then((response) => {
         return response.json();
      })
      .catch((err) => console.log(err));
};

// GET: A Product
export const getProductById = (productId) => {
   return fetch(`${API}/product/${productId}`, {
      method: "GET",
   })
      .then((response) => {
         return response.json();
      })
      .catch((err) => console.log(err));
};

// UPDATE: A Product
export const updateProduct = (productId, userId, token, product) => {
   return fetch(`${API}/product/${productId}/${userId}`, {
      method: "PUT",
      headers: {
         Accept: "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: product,
   })
      .then((response) => {
         return response.json();
      })
      .catch((err) => console.log(err));
};
