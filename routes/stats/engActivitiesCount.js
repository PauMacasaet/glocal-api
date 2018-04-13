const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/stats/engActivitiesCount');


router.get('/', (req, res, next) => {
    const {
        engineer
    } = req.query
    queries
        .getAllEngActivities({
            engineer
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