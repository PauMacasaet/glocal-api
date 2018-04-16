const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/stats/caseProductCount');


router.get('/resolved', (req, res, next) => {
    const {
        productName,
        customer,
        from, to
    } = req.query
    queries
        .getAllCaseProduct({
            productName,
            customer,
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

router.get('/open', (req, res, next) => { // summary page
    const {
        productName,
        from, to
    } = req.query
    queries
        .getAllOpenProduct({
            productName,
            from, to
        })
        .then(stats => {
            if (stats) {
                res.json(stats);
                console.log('GETTING ALL OPEN CASE COUNT BY PRODUCT');
            } else {
                next();
            }
            
    });
});

module.exports = router;