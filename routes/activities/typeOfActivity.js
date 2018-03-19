const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/activities/typeOfActivity');

function isValidTypeActivity(req, res, next) {
    if (req.params.typeOfActivity) return next();
    next(new Error('Invalid Activity Type'));
}

router.get('/', (req, res) => {
    queries.getAll().then(activities => {
        res.json(activities);
        console.log('GETTING ALL ACTIVITIES');
    })
});

router.get('/:typeOfActivity', isValidTypeActivity, (req, res) => {
    queries.getOne(req.params.typeOfActivity).then(activity => {
        if(activity) {
            res.json(activity);
            console.log('Getting List by Activity Type');
        } else {
            next();
        }
    });
});

module.exports = router;