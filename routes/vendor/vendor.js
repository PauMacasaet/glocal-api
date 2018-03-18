const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/vendor/vendor');

function isValidVendor(req, res, next) {
    if (req.params.principal) return next();
    next(new Error('Invalid Vendor'));
}

function validVendor(vendor) {
    const hasPrincipal = typeof vendor.principal == 'string' && vendor.principal.trim() != '';
    return hasPrincipal;
}

router.get('/', (req, res) => {
    queries.getAll().then(vendors => {
        res.json(vendors);
        console.log('GETTING ALL ENGINEERS');
    })
});

router.get('/:principal', isValidVendor, (req, res) => {
    queries.getOne(req.params.principal).then(vendor => {
        if(vendor) {
            res.json(vendor);
            console.log('Getting Vendors by Principal');
        } else {
            next();
        }
    });
});

router.post('/', (req, res, next) => {
    if(validVendor(req.body)) {
        queries.create(req.body).then(vendor => {
            res.json({
                'create vendor': 'vendor created'
            }); //malabo error
            res.json(vendor[0]);
        });
    } else {
        next(new Error('Invalid Vendor'));
    }
});

router.put('/:principal', (req, res, next) => {
    queries.update(req.params.principal, req.body).then(vendor => {
        res.json({
            'update vendor': 'vendor updated'
        });
        res.json(vendor[0]);
    });
});

router.delete('/:principal', isValidVendor, (req, res, next) => {
    queries.delete(req.params.principal).then(() => {
        res.json({
            'delete vendor': 'vendor deleted'
        });
        res.json({
            deleted: true
        });
    });
});

module.exports = router;