const { Order, ProductCart } = require("../models/order");

// middleware for Order
exports.getOrderById = (req, res) => {
   Order.findById(id)
      .populate("products.product", "name price")
      .exec((err, order) => {
         if (err) {
            return res.status(400).json({
               error: "No order found in DB",
            });
         }
         res.order = order;
         next();
      });
};

// CREATE: ORDER ROUTES
exports.createOrder = (req, res) => {
   req.body.order.user = req.profile;
   const order = new Order(req.body.order);
   order.save((err, order) => {
      if (err) {
         return res.status(400).json({
            error: "Failed to save your order in DB",
         });
      }
      console.log("ORDER CREATED");
      res.json(order);
   });
};

// GET: ALL ORDERS
exports.getAllOrders = (req, res) => {
   Order.find()
      .populate("user", "_id, name, ")
      .exec((err, order) => {
         if (err) {
            return res.status(400).json({
               error: "No order found in DB",
            });
         }
         res.json(order);
      });
};

// GET: ORDER SATUS
exports.getOrderStatus = (req, res) => {
   res.json(Order.schema.path("status").enumValues);
};
// UPDATE: ORDER SATUS
exports.updateStatus = (req, res) => {
   Order.update(
      { _id: req.body.orderId },
      { $set: { status: req.body.status } },
      (err, order) => {
         if (err) {
            return res.status(400).json({
               error: "Cannot update order Status",
            });
         }
         res.json(order);
      }
   );
};
