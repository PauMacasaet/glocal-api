const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/products/productName');

function isValidProduct(req, res, next) {
    if (req.params.productName) return next();
    next(new Error('Invalid Product'));
}

function validProduct(product) {
    const hasProductname = typeof product.productName == 'string' && product.productName.trim() != '';
    const hasVendor = typeof product.vendor == 'string' && product.vendor.trim() != '';
    return hasProductname && hasVendor;
}

router.get('/', (req, res) => {
    queries
        .getAll()
        .then(products => {
            res.json(products);
            console.log('GETTING ALL PRODUCTS');
    });
});

router.get('/:productName', isValidProduct, (req, res) => {
    queries
        .getOne(req.params.productName)
            .then(product => {
            if(product) {
                res.json(product);
                console.log('Getting Products by Name');
            } else {
                next();
            }
    });
});

router.post('/', (req, res, next) => {
    if(validProduct(req.body)) {
        queries
            .create(req.body)
            .then(product => {
                res.json({
                    product,
                    message: 'product created'
                }); //malabo error
        });
    } else {
        next(new Error('Invalid Product'));
    }
});

router.put('/:productName', isValidProduct, (req, res, next) => {
    if(validProduct(req.body)) {
        queries
            .update(req.params.productName, req.body)
            .then(product => {
                res.json({
                    product,
                    message: 'product updated'
                });
        });
    } else {
        next(new Error('Invalid Update'));
    }
});

router.delete('/:productName', isValidProduct, (req, res, next) => {
    queries
        .delete(req.params.productName)
        .then(() => {
            res.json({
                deleted: true,
                message: 'product deleted'
            });
    });
});

module.exports = router;