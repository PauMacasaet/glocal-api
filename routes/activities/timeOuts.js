const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/activities/timeOuts');

function isValidTimeOut(req, res, next) {
    if (req.params.timeOuts) return next();
    next(new Error('Invalid Time Out'));
}

router.get('/', (req, res) => {
    queries
        .getAll()
        .then(activities => {
            res.json(activities);
            console.log('GETTING ALL ACTIVITIES');
    });
});

router.get('/:timeOuts', isValidTimeOut, (req, res) => {
    queries
        .getOne(req.params.timeOuts)
        .then(activity => {
            if(activity) {
                res.json(activity);
                console.log('Getting List by Time Out');
            } else {
                next();
            }
    });
});

module.exports = router;