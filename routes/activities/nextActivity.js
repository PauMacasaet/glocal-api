const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/activities/nextActivity');

function isValidNextActivity(req, res, next) {
    if (req.params.nextActivity) return next();
    next(new Error('Invalid Next Activity'));
}

router.get('/', (req, res) => {
    queries
        .getAll()
        .then(activities => {
            res.json(activities);
            console.log('GETTING ALL ACTIVITIES');
    });
});

router.get('/:nextActivity', isValidNextActivity, (req, res) => {
    queries
        .getOne(req.params.nextActivity)
        .then(activity => {
            if(activity) {
                res.json(activity);
                console.log('Getting List by Next Activity');
            } else {
                next(new Error(404));
            }
    });
});

module.exports = router;