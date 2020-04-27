const express = require('express');
const router = express.Router();

const {
    getCategoryById, 
    createCategory, 
    getCategory, 
    getAllCategory, 
    updateCategory,
    removeCategory
} = require('../controllers/category');

const {isAdmin, isAuthenticated, isSignedIn} = require('../controllers/auth');
const {getUserById} = require('../controllers/user');

// params
router.param('userId', getUserById);
router.param('categoryId', getCategoryById);

// Create Route
// actual routers goes here
router.post(
    '/category/create/:userId',
    isSignedIn, 
    isAuthenticated, 
    isAdmin,
    createCategory
);

// Read route
// GET: Category By Id
router.get(
    '/category/:categoryId',
    getCategory
)
// GET: All Categories
router.get(
    '/categories',
    getAllCategory
)

//Update Route
router.put(
    '/category/:categoryId/:userId',
    isSignedIn, 
    isAuthenticated, 
    isAdmin,
    updateCategory
) 

// Delete Route
router.delete(
    '/category/:categoryId/:userId',
    isSignedIn, 
    isAuthenticated, 
    isAdmin,
    removeCategory
) 
module.exports = router;
