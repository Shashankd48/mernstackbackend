const express = require('express');
const router = express.Router();
const { isSignedIn, isAdmin, isAuthenticated} = require('../controllers/auth');
const { getUserById, pushOrderInPurchaseList } = require('../controllers/user');
const { updateStock } = require('../controllers/product')
const { 
    getOrderById, 
    createOrder, 
    getAllOrders, 
    getOrderStatus, 
    updateStatus 
} = require('../controllers/order');

// params
router.param('userId', getUserById);
router.param('orderId', getOrderById)

// Actual routes
// CREATE: Order route
router.post(
    '/order/create/:userId', 
    isSignedIn, 
    isAuthenticated,
    pushOrderInPurchaseList,
    updateStock,
    createOrder
)

// READ: Order route
router.get(
    '/order/all/:userId',
    isSignedIn,
    isAuthenticated,
    isAdmin,
    getAllOrders
)

// READ: ORDERS
router.get(
    '/order/status/:userId',
    isSignedIn,
    isAuthenticated,
    isAdmin,
    getOrderStatus
)

// UPDATE: STATUS of ORDER
router.put(
    '/order/:orderId/status/:userId',
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateStatus
)
module.exports = router;