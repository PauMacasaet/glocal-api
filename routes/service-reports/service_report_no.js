const express = require('express');

const router = express.Router();

const reports = require('../../db/queries/service_reports/service_report_no');

function isValidSRNo(req, res, next) {
    if (!isNaN(req.params.sr_number)) return next();
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

module.exports = router;