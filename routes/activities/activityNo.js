const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/activities/activityNo');

function isValidActivityNo(req, res, next) {
    if (!isNaN(req.params.activityNo)) return next();
    next(new Error('Invalid Activity No'));
}

function validActivity(activity) {
    const hasTrackingNo = !isNaN(activity.trackingNo);
    const hasTimeIn = typeof activity.timeIn == 'string' && activity.timeIn.trim() != '';
    const hasTimeOut = typeof activity.timeOuts == 'string' && activity.timeOuts.trim() != '';
    const hasProductName = typeof activity.productName == 'string' && activity.productName.trim() != '';
    const hasClient = typeof activity.client == 'string' && activity.client.trim() != '';
    const hasAddres = typeof activity.addres == 'string' && activity.addres.trim() != '';
    const hasType = typeof activity.typeOfActivity == 'string' && activity.typeOfActivity.trim() != '';
    const hasPurpose = typeof activity.purposeOfVisit == 'string' && activity.purposeOfVisit.trim() != '';
    const hasPerformed = typeof activity.activityPerformed == 'string' && activity.activityPerformed.trim() != '';
    const hasNextActivity = typeof activity.nextActivity == 'string' && activity.nextActivity.trim() != '';
    const hasEngineer = Array.isArray(activity.assignedSystemsEngineer);
    return hasTrackingNo && hasTimeIn && hasTimeOut && hasProductName && hasClient && hasAddres && hasType && hasPurpose && hasPerformed && hasNextActivity && hasEngineer;
}

router.get('/', (req, res) => {
    queries
        .getAll()
        .then(activities => {
            res.json(activities);
            console.log('GETTING ALL ACTIVITIES');
    });
});

router.get('/:activityNo', isValidActivityNo, (req, res) => {
    queries
        .getOne(req.params.activityNo)
        .then(activity => {
            if(activity) {
                res.json(activity);
                console.log('Getting List by Activity No');
            } else {
                next();
            }
    });
});

router.post('/', (req, res, next) => {
    if(validActivity(req.body)) {
        queries
            .create(req.body)
            .then(activity => {
                res.json({
                    activity,
                    message: 'Activity Created'
                });
        });
    } else {
        next(new Error('Invalid Activity'));
    }
});

router.put('/:activityNo', isValidActivityNo, (req, res, next) => {
    if(validActivity(req.body)) {
        queries
            .update(req.params.activityNo, req.body)
            .then(activity => {
                res.json({
                    activity,
                    message: 'Activity Updated'
            });
        });
    } else {
        next(new Error('Invalid Update'));
    }
    
    //if (err) return next(new Error('Invalid Update'));

});

router.delete('/:activityNo', isValidActivityNo, (req, res, next) => {
    queries
        .delete(req.params.activityNo)
        .then(() => {
            res.json({
                deleted: true,
                message: 'Activity Deleted'
            });
    });
});

module.exports = router;