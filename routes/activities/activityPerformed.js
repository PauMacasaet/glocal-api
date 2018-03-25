const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/activities/activityPerformed');

function isValidActPerformed(req, res, next) {
    if (req.params.activityPerformed) return next();
    next(new Error('Invalid Activity Performed'));
}

router.get('/', (req, res) => {
    queries
        .getAll()
        .then(activities => {
            res.json(activities);
            console.log('GETTING ALL ACTIVITIES');
    });
});

router.get('/:activityPerformed', isValidActPerformed, (req, res) => {
    queries
        .getOne(req.params.activityPerformed)
        .then(activity => {
            if(activity) {
                res.json(activity);
                console.log('Getting List by Activity Performed');
            } else {
                next();
            }
    });
});

module.exports = router;