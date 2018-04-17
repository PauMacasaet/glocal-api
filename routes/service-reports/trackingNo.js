const express = require('express');

const router = express.Router();

const reports = require('../../db/queries/service_reports/service_report_no');

function isValidTrackingNo(req, res, next) {
    if (!isNaN(req.params.trackingNo)) return next();
    next(new Error('Invalid SR No'));
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

router.get('/:trackingNo', isValidTrackingNo, (req, res, next) => {
    reports
        .getTracking(req.params.trackingNo)
        .then(report => {
            if(report) {
                res.json(report);
                console.log('Getting by SR NO');
            } else {
                next(new Error(404));
            }
        });
});

module.exports = router;