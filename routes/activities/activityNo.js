const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/activities/activityNo');
const reports = require('../../db/queries/service_reports/service_report_no');

function isValidActivityNo(req, res, next) {
    if (!isNaN(req.params.activityNo)) return next();
    next(new Error('Invalid Activity No'));
}

function isValidSRNo(req, res, next) {
    if (!isNaN(req.params.sr_number)) return next();
    next(new Error('Invalid SR No'));
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

router.get('/', (req, res, next) => {
    queries
        .getAll()
        .then(activities => {
            if(activities) {
                res.json(activities);
                console.log('GETTING ALL ACTIVITIES');
            } else {
                next();
            }
            
    });
});

router.get('/service-reports', (req, res, next) => {
    reports
        .getAll()
        .then(reports => {
            if(reports) {
                res.json(reports);
                console.log('GETTING ALL REPORTS');
            } else {
                next();
            }
        }); 
});

router.get('/:activityNo', isValidActivityNo, (req, res, next) => {
    queries
        .getOne(req.params.activityNo)
        .then(activity => {
            if(activity) {
                res.json(activity);
                console.log('Getting List by Activity No');
            } else {
                next(new Error(404));
            }
    });
});

router.get('/service-reports/:sr_number', isValidSRNo, (req, res, next) => {
    reports
        .getOne(req.params.sr_number)
        .then(report => {
            if(report) {
                res.json(report);
                console.log('Getting by SR NO');
            } else {
                next(new Error(404));
            }
        });
});



router.post('/', (req, res, next) => {
    if(validActivity(req.body)) {
        if (req.body.typeOfActivity != 'Remote') {
            reports
                .create(req.body)
                .then(reports => {
                    res.json({reports});
                });
        };
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