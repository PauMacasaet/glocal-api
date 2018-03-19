const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

const engId = require('./routes/engineer/engId');
const department = require('./routes/engineer/department');
const name = require('./routes/engineer/name');
const isLead = require('./routes/engineer/isLead');

const principal = require('./routes/vendor/vendor');

const accountName = require('./routes/client/accountname');
const accountManager = require('./routes/client/accountmanager');

const productName = require('./routes/products/productName');
const productVendor = require('./routes/products/productVendor');

const contactPerson = require('./routes/contact person/contactp');
const contactClient = require('./routes/contact person/contactc');

const license = require('./routes/license/license');
const on_site = require('./routes/license/onsite');
const clientLicense = require('./routes/license/vendor');

const glocalid = require('./routes/case monitoring/glocalId');
const vendorcaseid = require('./routes/case monitoring/vendorCaseId');
const datecreated = require('./routes/case monitoring/dateCreated');
const dateraised = require('./routes/case monitoring/dateRaised');
const casetitle = require('./routes/case monitoring/caseTitle');
const casedesc = require('./routes/case monitoring/caseDesc');
const severity = require('./routes/case monitoring/severity');
const customerName = require('./routes/case monitoring/customerName');
const seLead = require('./routes/case monitoring/systemsEngineerLead');
const assignedAM = require('./routes/case monitoring/assignedAccountManager');
const assignedSE = require('./routes/case monitoring/assignedSystemsEngineer');
const caseStatus = require('./routes/case monitoring/case_status');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// use routes
app.use('/engineer', engId);
app.use('/department', department);
app.use('/name', name);
app.use('/isLead', isLead); 

app.use('/vendor', principal);

app.use('/client', accountName);
app.use('/accountmanager', accountManager);

app.use('/products', productName);
app.use('/productvendor', productVendor);

app.use('/contactp', contactPerson);
app.use('/contactc', contactClient);

app.use('/license', license);
app.use('/onsite', on_site);
app.use('/clientlicense', clientLicense);

app.use('/glocalid', glocalid);
app.use('/vendorcaseid', vendorcaseid);
app.use('/datecreated', datecreated);
app.use('/dateraised', dateraised);
app.use('/casetitle', casetitle);
app.use('/casedesc', casedesc);
app.use('/severity', severity);
app.use('/customerName', customerName);
app.use('/systemsEngineerLead', seLead);
app.use('/assignedAccountManager', assignedAM);
app.use('/assignedSystemsEngineer', assignedSE);
app.use('/caseStatus', caseStatus);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
