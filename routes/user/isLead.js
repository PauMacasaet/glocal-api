const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/user/isLead');

function isValidLead(req, res, next) {
    if (req.params.fullName) return next();
    next(new Error('Invalid SE LEAD'));
}

router.get('/', (req, res) => {
    queries
        .getAll()
        .then(engineers => {
            res.json(engineers);
            console.log('GETTING ALL SE Leads');
    });
});

router.get('/:fullName', isValidLead, (req, res) => {
    queries
      .getOne(req.params.fullName)
      .then(user => {
          if(user) {
              res.json(user);
              console.log('Getting user by fullname');
          } else {
              next();
          }
    });
  });

module.exports = router;