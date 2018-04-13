const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/stats/caseProductCount');


router.get('/', (req, res, next) => {
    const {
        productName
    } = req.query
    queries
        .getAllCaseProduct({
            productName
        })
        .then(stats => {
            if (stats) {
                res.json(stats);
                console.log('GETTING ALL CASE COUNT BY PRODUCT');
            } else {
                next();
            }
            
    });
});

module.exports = router;