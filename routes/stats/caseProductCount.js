const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/stats/caseProductCount');


router.get('/', (req, res, next) => {
    const {
        productName,
        from, to
    } = req.query
    queries
        .getAllCaseProduct({
            productName,
            from, to
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