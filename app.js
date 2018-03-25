const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// ROUTE VARIABLES
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
//const assignedAM = require('./routes/case monitoring/assignedAccountManager');
//const assignedSE = require('./routes/case monitoring/assignedSystemsEngineer');
const caseStatus = require('./routes/case monitoring/case_status');
const nextId = require('./routes/case monitoring/nextId');

const activityNo = require('./routes/activities/activityNo');
const timeIn = require('./routes/activities/timeIn');
const timeOuts = require('./routes/activities/timeOuts');
const activityClient = require('./routes/activities/client');
const addres = require('./routes/activities/addres');
const typeOfActivity = require('./routes/activities/typeOfActivity');
const purpose = require('./routes/activities/purposeOfVisit');
const activityPerformed = require('./routes/activities/activityPerformed');
const recommendations = require('./routes/activities/recommendations');
const activityEngId = require('./routes/activities/engid');
const lastUpdate = require('./routes/activities/lastUpdate');
const engActivities = require('./routes/activities/engactivities');
const tracking = require('./routes/activities/glocal');

const totalCases = require('./routes/stats/totalCases');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// USE THESE ROUTES

//engineer
app.use('/engineer', engId);
app.use('/department', department);
app.use('/name', name);
app.use('/isLead', isLead); 

app.use('/vendor', principal);

//client
app.use('/client', accountName);
app.use('/accountManager', accountManager);

//products
app.use('/products', productName);
app.use('/productVendor', productVendor);

//contact_person
app.use('/contactp', contactPerson);
app.use('/contactc', contactClient);

//license
app.use('/license', license);
app.use('/onSite', on_site);
app.use('/clientLicense', clientLicense);

//case_monitoring
app.use('/glocalId', glocalid);
app.use('/vendorCaseId', vendorcaseid);
app.use('/dateCreated', datecreated);
app.use('/dateRaised', dateraised);
app.use('/caseTitle', casetitle);
app.use('/caseDesc', casedesc);
app.use('/severity', severity);
app.use('/customerName', customerName);
app.use('/systemsEngineerLead', seLead);
//app.use('/assignedAccountManager', assignedAM);
//app.use('/assignedSystemsEngineer', assignedSE);
app.use('/caseStatus', caseStatus);
app.use('/nextId', nextId);

//activities
app.use('/activityNo', activityNo);
app.use('/timeIn', timeIn);
app.use('/timeOut', timeOuts);
app.use('/activityClient', activityClient);
app.use('/address', addres);
app.use('/typeOfActivity', typeOfActivity);
app.use('/purposeOfVisit', purpose);
app.use('/activityPerformed', activityPerformed);
app.use('/recommendations', recommendations);
app.use('/engid', activityEngId);
app.use('/lastUpdate', lastUpdate);
app.use('/engActivities', engActivities);
app.use('/tracking', tracking);

//stats
app.use('/totalCases', totalCases);

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
