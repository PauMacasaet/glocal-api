const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/activities/engid');

function isValidEngID(req, res, next) {
    if (req.params.engid) return next();
    next(new Error('Invalid Engineer ID'));
}

router.get('/', (req, res) => {
    queries
        .getAll()
        .then(activities => {
            res.json(activities);
            console.log('GETTING ALL ACTIVITIES');
    });
});

router.get('/:engid', isValidEngID, (req, res) => {
    queries
        .getOne(req.params.engid)
        .then(activity => {
            if(activity) {
                res.json(activity);
                console.log('Getting List by Engineer ID');
            } else {
                next();
            }
    });
});

module.exports = router;