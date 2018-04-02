const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/activities/assignedSE');

function isValidEngineer(req, res, next) {
    if(req.params.assignedSystemsEngineer) return next();
    next(new Error('Invalid Engineer'));
}

router.get('/', (req, res) => {
    queries
        .getAll()
        .then(activities => {
            res.json(activities);
            console.log('GETTING ALL ACTIVITIES');
    });
});

router.get('/:assignedSystemsEngineer', isValidEngineer, (req, res, next) => {
    queries
        .getOne(req.params.assignedSystemsEngineer)
        .then(activity => {
            if(activity) {
                res.json(activity);
                console.log('Getting List by Engineer Name');
            } else {
                next(new Error(404));
            }
    });
});

module.exports = router;