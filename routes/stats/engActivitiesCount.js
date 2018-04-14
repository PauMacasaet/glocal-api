const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/stats/engActivitiesCount');


router.get('/', (req, res, next) => {
    const {
        engineer,
        from, to
    } = req.query
    queries
        .getAllEngActivities({
            engineer, 
            from, to
        })
        .then(stats => {
            if (stats) {
                res.json(stats);
                console.log('GETTING ALL SEVERITIES');
            } else {
                next();
            }
            
    });
});

module.exports = router;