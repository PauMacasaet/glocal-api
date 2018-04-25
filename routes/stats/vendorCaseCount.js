const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/stats/vendorCaseCount');

router.get('/', (req, res, next) => {
    const {
        vendor,
        from, to
    } = req.query
    queries
        .getAllVendorCases({
            vendor,
            from, to
        })
        .then(stats => {
           // if (stats) {
                res.json(stats);
                console.log('GETTING ALL VENDOR CASE COUNT');
          //  } else {
           //     next(new Error('Not Existing'));
           // }
            
    });
});

module.exports = router;