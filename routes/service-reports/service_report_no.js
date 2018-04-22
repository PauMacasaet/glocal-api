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

function validServiceReport(service) {
    const hasTrackingNo = !isNaN(service.trackingNo);
    const hasTimeIn = typeof service.timeIn == 'string' && service.timeIn.trim() != '';
    const hasTimeOut = typeof service.timeOuts == 'string' && service.timeOuts.trim() != '';
    const hasProductName = typeof service.productName == 'string' && service.productName.trim() != '';
    const hasClient = typeof service.client == 'string' && service.client.trim() != '';
    const hasAddres = typeof service.addres == 'string' && service.addres.trim() != '';
    const hasType = typeof service.typeOfActivity == 'string' && service.typeOfActivity.trim() != '';
    const hasPurpose = typeof service.purposeOfVisit == 'string' && service.purposeOfVisit.trim() != '';
    const hasPerformed = typeof service.activityPerformed == 'string' && service.activityPerformed.trim() != '';
    const hasNextActivity = typeof service.nextActivity == 'string' && service.nextActivity.trim() != '';
    const hasEngineer = Array.isArray(service.assignedSystemsEngineer);
    const hasPointP = typeof service.point_person == 'string' && service.point_person.trim() != '';
    return hasTrackingNo && hasTimeIn && hasTimeOut && hasProductName && hasClient && hasAddres && hasType && hasPurpose && hasPerformed && hasNextActivity && hasEngineer && hasPointP;
}

router.get('/', (req, res, next) => {
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

router.get('/:sr_number', isValidSRNo, (req, res, next) => {
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


router.put('/:activityNo/:sr_number', isValidSRNo, isValidActivityNo, (req, res, next) => {
    if(validServiceReport(req.body)) {
        if (req.body.typeOfActivity != 'Remote') {
            reports.update(req.params.sr_number, req.body).then(() => {
                queries
                .update(req.params.activityNo, req.body)
                .then(report => {
                    res.json({
                        report,
                        message: 'Report Updated'
                    });
                });
            });
        } 
    } else {
        next(new Error('Invalid Update'));
    }
});

router.delete('/:activityNo/:sr_number', isValidSRNo, (req, res, next) => {
    reports
        .delete(req.params.sr_number)
        .then(() => {
            queries.delete(req.params.activityNo).then(() => {
                res.json({
                    deleted: true,
                    message: 'Report Deleted'
                });
            });
    });
});

module.exports = router;