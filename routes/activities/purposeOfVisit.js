const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/activities/purposeOfVisit');

function isValidPurpose(req, res, next) {
    if (req.params.purposeOfVisit) return next();
    next(new Error('Invalid Purpose of Visit'));
}

router.get('/', (req, res) => {
    queries
        .getAll()
        .then(activities => {
            res.json(activities);
            console.log('GETTING ALL ACTIVITIES');
    });
});

router.get('/:purposeOfVisit', isValidPurpose, (req, res) => {
    queries
        .getOne(req.params.purposeOfVisit)
        .then(activity => {
            if(activity) {
                res.json(activity);
                console.log('Getting List by Purpose Of Visit');
            } else {
                next(new Error(404));
            }
    });
});

module.exports = router;