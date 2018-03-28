const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const authMiddleWare = require('./auth/middleware');

const auth = require('./auth/index');

// ROUTE VARIABLES
const user = require('./routes/user/user');
const position = require('./routes/user/position');
const isLead = require('./routes/user/isLead');

const principal = require('./routes/vendor/vendor');

const accountName = require('./routes/client/accountname');

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
const lastUpdate = require('./routes/activities/lastUpdate');
const engActivities = require('./routes/activities/engactivities');
const tracking = require('./routes/activities/glocal');

const totalCases = require('./routes/stats/totalCases');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
app.use(cors({
  origin: 'http://localhost:8000',
  credentials: true
}));

// USE THESE ROUTES

//authentication
app.use('/auth', auth);
// /signup, /login, /:userid for update

//users
app.use('/user',  user); 
//authMiddleWare.ensureLoggedIn, /:userid, /name/:fullName
app.use('/position', position); 
// /systemEngineer, /systemEngineer/:fullName, /manager, /manager/:fullName
app.use('/isLead', isLead); 
// /:fullName

//vendor
app.use('/vendor', principal);
// /:principal

//client
app.use('/client', accountName);
// /:accountName

//products
app.use('/products', productName);
// /:productName
app.use('/productVendor', productVendor);
// /:vendor

//contact_person
app.use('/contactp', contactPerson);
// /:personName
app.use('/contactc', contactClient);
// /:client

//license
app.use('/license', license);
// /:licenseId, /product/:productName
app.use('/onSite', on_site);
// /:on_site
app.use('/clientLicense', clientLicense);
// /:client

//case_monitoring
app.use('/glocalId', glocalid);
// /search?q=BPI for example, /filter?[fieldname]=[fieldvalue], /glocalId
app.use('/vendorCaseId', vendorcaseid);
// /:vendorCaseId
app.use('/dateCreated', datecreated);
// /:dateCreated
app.use('/dateRaised', dateraised);
// /:dateCreated
app.use('/caseTitle', casetitle);
// /:caseTitle
app.use('/caseDesc', casedesc);
// /:caseDescription
app.use('/severity', severity);
// /:severity
app.use('/customerName', customerName);
// /:customer
app.use('/systemsEngineerLead', seLead);
// /:systemsEngineerLead
app.use('/caseStatus', caseStatus);
// /:caseStatus
app.use('/nextId', nextId);

//activities
app.use('/activityNo', activityNo);
// /:activityNo
app.use('/timeIn', timeIn);
// /:timeIn
app.use('/timeOut', timeOuts);
// /:timeOuts
app.use('/activityClient', activityClient);
// /:client
app.use('/address', addres);
// /:addres
app.use('/typeOfActivity', typeOfActivity);
// /:typeOfActivity
app.use('/purposeOfVisit', purpose);
// /:purposeOfVisit
app.use('/activityPerformed', activityPerformed);
// /:activityPerformed
app.use('/recommendations', recommendations);
// /:recommendations
app.use('/lastUpdate', lastUpdate);
app.use('/engActivities', engActivities);
// /:assignedSystemsEngineer
app.use('/tracking', tracking);
// /:trackingNo

//stats
app.use('/totalCases', totalCases);
// /:case_status

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
