const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/license/license');

function isValidProduct(req, res, next) {
    if (req.params.productName) return next();
    next(new Error('Invalid License'));
}

function validLicense(license) {
    const hasDateStart = typeof license.date_start == 'string' && license.date_start.trim() != '';
    const hasDateEnd = typeof license.date_end == 'string' && license.date_end.trim() != '';    
    const hasVendor = typeof license.vendor == 'string' && license.vendor.trim() != '';
    const hasProductname = typeof license.productName == 'string' && license.productName.trim() != '';
    const hasClient = typeof license.client == 'string' && license.client.trim() != '';
    const hasParticulars = typeof license.particulars == 'string' && license.particulars.trim() != '';
    const hasSupport = typeof license.on_site == 'string';
    const hasSupportStart = typeof license.support_date_start == 'string' && license.support_date_start.trim() != '';
    const hasSupportEnd = typeof license.support_date_end == 'string' && license.support_date_end.trim() != '';
    const hasManDays = !isNaN(license.man_days);
    const hasRemManDays = !isNaN(license.remaining_man_days);
    const hasHC = typeof license.quarterly_hc == 'boolean';
    const hasRemarks = typeof license.remarks == 'string';
    return hasDateStart && hasDateEnd && hasVendor && hasProductname && hasClient && hasParticulars && hasSupport && hasSupportStart && hasSupportEnd && hasManDays && hasRemManDays && hasHC && hasRemarks;
}

router.get('/', (req, res) => {
    queries.getAll().then(licenses => {
        res.json(licenses);
        console.log('GETTING ALL LICENSES');
    })
});

router.get('/:productName', isValidProduct, (req, res) => {
    queries.getOne(req.params.productName).then(license => {
        if(license) {
            res.json(license);
            console.log('Getting List by Product License');
        } else {
            next();
        }
    });
});

router.post('/', (req, res, next) => {
    if(validLicense(req.body)) {
        queries.create(req.body).then(license => {
            res.json({
                'create license': 'license created'
            }); //malabo error
            res.json(license[0]);
        });
    } else {
        next(new Error('Invalid License'));
    }
});

router.put('/:productName', (req, res, next) => {
    queries.update(req.params.productName, req.body).then(license => {
        res.json({
            'update license': 'license updated'
        });
        res.json(license[0]);
    });
});

router.delete('/:productName', isValidProduct, (req, res, next) => {
    queries.delete(req.params.productName).then(() => {
        res.json({
            'delete license': 'license deleted'
        });
        res.json({
            deleted: true
        });
    });
});

module.exports = router;