const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/activities/addres');

function isValidAddress(req, res, next) {
    if (req.params.addres) return next();
    next(new Error('Invalid Address'));
}

router.get('/', (req, res) => {
    queries.getAll().then(activities => {
        res.json(activities);
        console.log('GETTING ALL ACTIVITIES');
    })
});

router.get('/:addres', isValidAddress, (req, res) => {
    queries.getOne(req.params.addres).then(activity => {
        if(activity) {
            res.json(activity);
            console.log('Getting List by Address');
        } else {
            next();
        }
    });
});

module.exports = router;