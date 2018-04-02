const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/products/productVendor');

function isValidVendor(req, res, next) {
    if (req.params.vendor) return next();
    next(new Error('Invalid Vendor'));
}

router.get('/', (req, res) => {
    queries
        .getAll()
        .then(products => {
            res.json(products);
            console.log('GETTING ALL PRODUCTS')
    });
});

router.get('/:vendor', isValidVendor, (req, res) => {
    queries
        .getOne(req.params.vendor)
        .then(product => {
            if(product) {
                res.json(product);
                console.log('Getting Products by Vendor');
            } else {
                next(new Error(404));
            }
    });
});

module.exports = router;