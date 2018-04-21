const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/activities/glocal');

function isValidTrackingNo(req, res, next) {
    if (!isNaN(req.params.trackingNo)) return next();
    next(new Error('Invalid Tracking No'));
}

router.get('/', (req, res) => {
    queries
        .getAll()
        .then(activities => {
            if (activities) {
                res.json(activities);
                console.log('GETTING ALL ACTIVITIES'); 
            } else {
                next(new Error(404));
            }
    });
});

router.get('/:trackingNo', isValidTrackingNo, (req, res) => {
    queries
        .getOne(req.params.trackingNo)
        .then(activity => {
            if(activity) {
                res.json(activity);
                console.log('Getting List by TrackingNo');
            } else {
                next(new Error(404));
            }
    });
});

module.exports = router;