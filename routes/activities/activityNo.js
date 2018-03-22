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
    const hasContact = typeof activity.contactCustomer == 'string' && activity.contactCustomer.trim() != '';
    const hasAddres = typeof activity.addres == 'string' && activity.addres.trim() != '';
    const hasType = typeof activity.typeOfActivity == 'string' && activity.typeOfActivity.trim() != '';
    const hasPurpose = typeof activity.purposeOfVisit == 'string' && activity.purposeOfVisit.trim() != '';
    const hasPerformed = typeof activity.activityPerformed == 'string' && activity.activityPerformed.trim() != '';
    const hasNextActivity = typeof activity.nextActivity == 'string' && activity.nextActivity.trim() != '';
    const hasEngineer = Array.isArray(activity.assignedSystemsEngineer);
    return hasTrackingNo && hasTimeIn && hasTimeOut && hasProductName && hasClient && hasContact && hasAddres && hasType && hasPurpose && hasPerformed && hasNextActivity && hasEngineer;
}

router.get('/', (req, res) => {
    queries.getAll().then(activities => {
        res.json(activities);
        console.log('GETTING ALL ACTIVITIES');
    })
});

router.get('/:activityNo', isValidActivityNo, (req, res) => {
    queries.getOne(req.params.activityNo).then(activity => {
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
        queries.create(req.body).then(activity => {
            res.json({
                'Create Activity': 'Activity Created'
            }); //malabo error
            res.json(activity[0]);
        });
    } else {
        next(new Error('Invalid Activity'));
    }
});

router.put('/:activityNo', (req, res, next) => {
    queries.update(req.params.activityNo, req.body).then(activity => {
        res.json({
            'Update Activity': 'Activity Updated'
        });
        res.json(activity[0]);
    });
});

router.delete('/:activityNo', isValidActivityNo, (req, res, next) => {
    queries.delete(req.params.activityNo).then(() => {
        res.json({
            'Delete Activity': 'Activity Deleted'
        });
        res.json({
            deleted: true
        });
    });
});

module.exports = router;