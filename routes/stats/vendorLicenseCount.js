const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/stats/vendorLicenseCount');

router.get('/', (req, res, next) => {
    const {
        vendor
    } = req.query
    queries
        .getAllVendorLicense({
            vendor
        })
        .then(stats => {
            if (stats) {
                res.json(stats);
                console.log('GETTING ALL VENDOR LICENSE COUNT');
            } else {
                next();
            }
            
    });
});

module.exports = router;