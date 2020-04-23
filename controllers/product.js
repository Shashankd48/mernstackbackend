const Product = require('../models/product')

exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
    .populate('category')
    .exce((err, product) => {
        if(err){
            return res.status(400).json({
                error: "Product not found"
            })
        }
        req.product = product;
        next();
    });
};