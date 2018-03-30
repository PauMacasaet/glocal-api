const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/license/license');
const query2 = require('../../db/queries/license/license2');

function isValidProduct(req, res, next) {
    if (req.params.productName) return next();
    next(new Error('Invalid License'));
}

function isValidId(req, res, next) {
    if (!isNaN(req.params.licenseId)) return next();
    next(new Error('Invalid License ID'));
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
    queries
        .getAll()
        .then(licenses => {
            res.json(licenses);
            console.log('GETTING ALL LICENSES');
    })
});

router.get('/:licenseId', isValidId, (req, res, next) => {
    queries
        .getOne(req.params.licenseId)
        .then(license => {
            if(license) {
                res.json(license);
                console.log('Getting List by License ID');
            } else {
                next();
            }
    });
});

router.get('/sort', (req, res, next) => {
    const { 
        client,
        vendor, 
        productName, 
        date_start, 
        date_end, 
        particulars, 
        accountManager
    } = req.query;
    queries.sortLicense({ 
        client,
        vendor, 
        productName, 
        date_start, 
        date_end, 
        particulars, 
        accountManager
    }).then(sorts => {
            if (sorts) {
                res.json(sorts);
                console.log('Sorting');
            } else {
                next();
            }
    });
})

router.get('/product/:productName', isValidProduct, (req, res, next) => {
    query2
        .getOne(req.params.productName)
        .then(license => {
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
        queries
            .create(req.body)
            .then(license => {
                res.json({
                    license,
                    message: 'license created'
                }); //malabo error
        });
    } else {
        next(new Error('Invalid License'));
    }
});

router.put('/:licenseId', isValidId, (req, res, next) => {
    if(validLicense(req.body)) {
        queries
            .update(req.params.licenseId, req.body)
            .then(license => {
                res.json({
                    license,
                    message: 'license updated'
                });
        });
    } else {
        next(new Error('Invalid Update'));
    }
});

router.delete('/:licenseId', isValidId, (req, res, next) => {
    queries
        .delete(req.params.licenseId)
        .then(() => {
            res.json({
                deleted: true,
                message: 'license deleted'
            });
    });
});

module.exports = router;