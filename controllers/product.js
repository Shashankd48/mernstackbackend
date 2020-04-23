const Product = require('../models/product')
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

// middleware
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

// Actual CONTROLLERS
// CREATE: Product
exports.createProduct = (req, res) => {
    // form object
    let form = new formidable.IncomingForm();

    // for files actual file extentions
    form.keepExtensions = true;

    // parsing form
    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error: 'Problem with Image'
            })
        }

        // destructure the fields
        const { name,description, price, category, stock } = fields;
        
        if ( !name || !description || !price || !category || !stock) {
            return res.status(400).json({
                error: "Please include all fields"
            })
        }

        // TODO restriction on field
        let product = new Product(fields);

        // Handling file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error : "File size too big!"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type
        }

        // save to the db
        product.save((err, product) => {
            if(err){
                res.status(400).json({
                    error: "Saving tshirt in DB failed"
                })
            }
            res.json(product)
        })
    })
};

// GET: Product 
exports.getProduct = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product)
}

// MIDDLEWARE: getProduct
exports.photo = (req, res, next) => {
    // check if photo field has some data or not
    if(req.product.photo.data){
        res.set('Content-Type', req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}

// DELETE: product
exports.deleteProduct = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if(err){
            return res.status(400).json({
                error: `Failed to delete the Product ${deletedProduct}`
            })
        }
        res.json({
            message: `Product deleted successfully! ${deletedProduct}`
        })
    })
}

// UPDATE: product
exports.updateProduct = (req, res) => {
    // form object
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    // parsing form
    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error: 'Problem with Image'
            })
        }
        // Updation goes here
        let product = req.product;
        // update new fields and extend them using lodash
        product = _.extend(product, fields);

        // Handling file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error : "File size too big!"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type
        }

        // save to the db
        product.save((err, product) => {
            if(err){
                res.status(400).json({
                    error: "Updation of product failed"
                })
            }
            res.json(product)
        })
    })
}

// LISTING: product
exports.getAllProducts = (req, res) => {
    // for user defined limit
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    // '-'photo: negative sign mins that don't select this field
    Product.find()
     .select("-photo")
     .sort([[sortBy, "asc"]])
     .limit(limit)
     .exec((err, products) => {
        if(err){
            return res.status(400).json({
                error: "No product found!"
            })
        }
        res.json(products);
    })
}