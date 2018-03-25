const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/activities/timeIn');

function isValidTimeIn(req, res, next) {
    if (req.params.timeIn) return next();
    next(new Error('Invalid Time In'));
}

router.get('/', (req, res) => {
    queries
        .getAll()
        .then(activities => {
            res.json(activities);
            console.log('GETTING ALL ACTIVITIES');
    })
});

router.get('/:timeIn', isValidTimeIn, (req, res) => {
    queries
        .getOne(req.params.timeIn)
        .then(activity => {
            if(activity) {
                res.json(activity);
                console.log('Getting List by Time In');
            } else {
                next();
            }
    });
});

module.exports = router;