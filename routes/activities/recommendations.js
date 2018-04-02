const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/activities/recommendations');

function isValidRecommendation(req, res, next) {
    if (req.params.recommendations) return next();
    next(new Error('Invalid Recommendation'));
}

router.get('/', (req, res) => {
    queries
        .getAll()
        .then(activities => {
            res.json(activities);
            console.log('GETTING ALL ACTIVITIES');
    });
});

router.get('/:recommendations', isValidRecommendation, (req, res) => {
    queries
        .getOne(req.params.recommendations)
        .then(activity => {
            if(activity) {
                res.json(activity);
                console.log('Getting List by Recommendations');
            } else {
                next(new Error(404));
            }
    });
});

module.exports = router;