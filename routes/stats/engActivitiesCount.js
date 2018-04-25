const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/stats/engActivitiesCount');


router.get('/', (req, res, next) => {
    const {
        engineer,
        customer,
        from, to
    } = req.query
    queries
        .getAllEngActivities({
            engineer, 
            customer,
            from, to
        })
        .then(stats => {
            //if (stats) {
                res.json(stats);
                console.log('GETTING ALL ENG ACTIVITIES');
            //} else {
            //    next(new Error('Not Existing'));
            //}
            
    });
});

module.exports = router;