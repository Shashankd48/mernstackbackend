const express = require('express');
const router = express.Router();
const { 
    getProductById, 
    createProduct, 
    getProduct, 
    photo,
    deleteProduct,
    updateProduct,
    getAllProducts,
    getAllUniqueCategory
} = require('../controllers/product');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const {getUserById} = require('../controllers/user');

// All of params
router.param('userId', getUserById);
router.param('productId', getProductById);

// all of actual routes
// CREATE: product route
router.post(
    '/product/create/:userId', 
    isSignedIn, 
    isAuthenticated, 
    isAdmin, 
    createProduct
);

// READ: route
router.get('/product/:productId', getProduct);
router.get('/product/photo/:productId', photo);

// DELETE: route
router.delete(
    'product/:productId/:userId', 
    isSignedIn, 
    isAuthenticated,
    isAdmin,
    deleteProduct
);

// UPDATE: route
router.put(
    'product/:productId/:userId', 
    isSignedIn, 
    isAuthenticated,
    isAdmin,
    updateProduct
);

// LISTING: route
router.get('/products', getAllProducts);

// GET-CATEGORY: route
router.get('/products/categories', getAllUniqueCategory);
module.exports = router;  