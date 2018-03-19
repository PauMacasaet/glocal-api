const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/activities/client');

function isValidClient(req, res, next) {
    if (req.params.client) return next();
    next(new Error('Invalid Client'));
}

router.get('/', (req, res) => {
    queries.getAll().then(activities => {
        res.json(activities);
        console.log('GETTING ALL ACTIVITIES');
    })
});

router.get('/:client', isValidClient, (req, res) => {
    queries.getOne(req.params.client).then(activity => {
        if(activity) {
            res.json(activity);
            console.log('Getting List by Client');
        } else {
            next();
        }
    });
});

module.exports = router;