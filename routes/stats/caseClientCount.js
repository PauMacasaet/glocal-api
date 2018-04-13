const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/stats/caseClientCount');


router.get('/', (req, res, next) => {
    const {
        customer
    } = req.query
    queries
        .getAllCaseClient({
            customer
        })
        .then(stats => {
            if (stats) {
                res.json(stats);
                console.log('GETTING ALL CASE COUNT BY CUSTOMER');
            } else {
                next();
            }
            
    });
});

module.exports = router;