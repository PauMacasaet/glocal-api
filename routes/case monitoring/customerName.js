const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/case monitoring/customerName');

function isValidCustomerN(req, res, next) {
    if (req.params.customer) return next();
    next(new Error('Invalid CustomerName'));
}

router.get('/', (req, res) => {
    queries
        .getAll()
        .then(cases => {
            res.json(cases);
            console.log('GETTING ALL CASES');
    });
});

router.get('/:customer', isValidCustomerN, (req, res) => {
    queries
        .getOne(req.params.customer)
        .then(case_mon => {
            if(case_mon) {
                res.json(case_mon);
                console.log('Getting List by Customer');
            } else {
                next(new Error(404));
            }
    });
});

module.exports = router;