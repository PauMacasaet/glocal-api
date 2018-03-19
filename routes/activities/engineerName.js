const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/activities/engineerName');

function isValidEngName(req, res, next) {
    if (req.params.engineerName) return next();
    next(new Error('Invalid Engineer Name'));
}

router.get('/', (req, res) => {
    queries.getAll().then(activities => {
        res.json(activities);
        console.log('GETTING ALL ACTIVITIES');
    })
});

router.get('/:engineerName', isValidEngName, (req, res) => {
    queries.getOne(req.params.engineerName).then(activity => {
        if(activity) {
            res.json(activity);
            console.log('Getting List by Engineer Name');
        } else {
            next();
        }
    });
});

module.exports = router;