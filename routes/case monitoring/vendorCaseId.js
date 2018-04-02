const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/case monitoring/vendorCaseId');

function isValidVendorId(req, res, next) {
    if (req.params.vendorCaseId) return next();
    next(new Error('Invalid Vendor ID'));
}

router.get('/', (req, res) => {
    queries.getAll().then(cases => {
        res.json(cases);
        console.log('GETTING ALL CASES');
    });
});

router.get('/:vendorCaseId', isValidVendorId, (req, res) => {
    queries
        .getOne(req.params.vendorCaseId)
        .then(case_mon => {
            if(case_mon) {
                res.json(case_mon);
                console.log('Getting List by VendorCaseID');
            } else {
                next(new Error(404));
            }
    });
});

module.exports = router;