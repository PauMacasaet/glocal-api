const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/stats/caseClientCount');

router.get('/most', (req, res, next) => {
    const {
        from, to
    } = req.query
    queries
        .getMostCasesClient({
            from, to
        })
        .then(stats => {
            //if (stats) {
                res.json(stats);
                console.log('GETTING CUSTOMER WITH MOST CASES');
            //} 
            // else {
            //     next([]);
            // }
            
    });
});

router.get('/open', (req, res, next) => {
    const {
        customer,
        from, to
    } = req.query
    queries
        .getAllOpenCaseClient({
            customer,
            from, to
        })
        .then(stats => {
            //if (stats) {
                res.json(stats);
                console.log('GETTING ALL CASE COUNT BY CUSTOMER');
            //} else {
              //  next(new Error('Not Existing'));
            //}
            
    });
});

router.get('/resolved', (req, res, next) => {
    const {
        customer,
        from, to
    } = req.query
    queries
        .getAllResolvedCaseClient({
            customer,
            from, to
        })
        .then(stats => {
           // if (stats) {
                res.json(stats);
                console.log('GETTING ALL CASE COUNT BY CUSTOMER');
           // } else {
            //    next(new Error('Not Existing'));
            //}
            
    });
});

module.exports = router;