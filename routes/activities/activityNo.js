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
    const hasPointP = typeof activity.point_person == 'string' && activity.point_person.trim() != '';
    return hasTrackingNo && hasTimeIn && hasTimeOut && hasProductName && hasClient && hasAddres && hasType && hasPurpose && hasPerformed && hasNextActivity && hasEngineer && hasPointP;
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

router.post('/', (req, res, next) => {
    if(validActivity(req.body)) {
        if (req.body.typeOfActivity != 'Remote') {
            reports.create(req.body).then(() => {
                queries
                .create(req.body) // CREATING AN ACTIVTY AND SERVICE REPORT
                .then(report => {
                    if (report) {
                        res.json({
                            report,
                            message: 'Report Created'
                        });
                    } else {
                        next( new Error(404));
                    }
                });
            })
        } else {
            queries
            .create(req.body) // CREATING ACTIVITY ONLY WHEN REMOTE
            .then(activity => {
                if (activity) {
                    res.json({
                        activity,
                        message: 'Activity Created'
                    });
                } else {
                    next(new Error(404));
                }
            });    
        }
    } else {
        next(new Error('Invalid Activity'));
    }
});


router.put('/:activityNo', isValidActivityNo, (req, res, next) => {
    if(validActivity(req.body)) {  
        queries
        .update(req.params.activityNo, req.body)
        .then(report => {
            res.json({
                report,
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