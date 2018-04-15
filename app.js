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
const caseStatus = require('./routes/case monitoring/case_status');
const nextId = require('./routes/case monitoring/nextId');
const userSE = require('./routes/case monitoring/userSE');
const severity_dash = require('./routes/case monitoring/severity_dash');

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
const assignedSystemsEngineer = require('./routes/activities/assignedSE');


const totalCases = require('./routes/stats/totalCases');
const severityCount = require('./routes/stats/severityCount');
const engActivitiesCount = require('./routes/stats/engActivitiesCount');
const caseClientCount = require('./routes/stats/caseClientCount');
const caseProductCount = require('./routes/stats/caseProductCount');
const vendorLicenseCount = require('./routes/stats/vendorLicenseCount');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
app.use(cors({
  origin: 'https://iris-glocal.now.sh', 
  //origin: 'http://localhost:8001',
  credentials: true
}));

// USE THESE ROUTES

//authentication
app.use(
  '/auth', 
  auth
);
// /signup, /login, /:userid for update

//users
app.use(
  '/user', 
  authMiddleWare.ensureLoggedIn, 
  user
); 
//authMiddleWare.ensureLoggedIn, /:userid, /name/:fullName
app.use(
  '/position', 
  authMiddleWare.ensureLoggedIn,
  position
); 
// /systemEngineer, /systemEngineer/:fullName, /manager, /manager/:fullName
app.use(
  '/isLead',
  authMiddleWare.ensureLoggedIn,
  isLead
); 
// /:fullName

//vendor
app.use(
  '/vendor', 
  authMiddleWare.ensureLoggedIn,
  principal
);
// /:principal

//client
app.use(
  '/client', 
  authMiddleWare.ensureLoggedIn,
  accountName
);
// /:accountName
app.use(
  '/account-manager',
  authMiddleWare.ensureLoggedIn,
  accountManager
);


//products
app.use(
  '/products', 
  authMiddleWare.ensureLoggedIn,
  productName
);
// /:productName
app.use(
  '/productVendor', 
  authMiddleWare.ensureLoggedIn,
  productVendor
);
// /:vendor

//contact_person
app.use(
  '/contactp', 
  authMiddleWare.ensureLoggedIn,
  contactPerson
);
// /:personName
app.use(
  '/contactc',
  authMiddleWare.ensureLoggedIn, 
  contactClient
);
// /:client

//license
app.use(
  '/license', 
  authMiddleWare.ensureLoggedIn,
  license
);
// /:licenseId, /product/:productName
app.use(
  '/onSite', 
  authMiddleWare.ensureLoggedIn,
  on_site
);
// /:on_site
app.use(
  '/clientLicense', 
  authMiddleWare.ensureLoggedIn,
  clientLicense
);
// /:client

//case_monitoring
app.use(
  '/glocalId', 
  authMiddleWare.ensureLoggedIn,  
  glocalid
);
// 
app.use(
  '/vendorCaseId', 
  authMiddleWare.ensureLoggedIn,
  vendorcaseid
);
// /:vendorCaseId
app.use(
  '/dateCreated', 
  authMiddleWare.ensureLoggedIn,
  datecreated
);
// /:dateCreated
app.use(
  '/dateRaised', 
  authMiddleWare.ensureLoggedIn,
  dateraised
);
// /:dateCreated
app.use(
  '/caseTitle', 
  authMiddleWare.ensureLoggedIn,
  casetitle
);
// /:caseTitle
app.use(
  '/caseDesc', 
  authMiddleWare.ensureLoggedIn,
  casedesc
);
// /:caseDescription
app.use(
  '/severity', 
  authMiddleWare.ensureLoggedIn,
  severity
);
// /:severity
app.use(
  '/customerName', 
  authMiddleWare.ensureLoggedIn,
  customerName
);
// /:customer
app.use(
  '/systemsEngineerLead', 
  authMiddleWare.ensureLoggedIn,
  seLead
);
// /:systemsEngineerLead
app.use(
  '/caseStatus', 
  authMiddleWare.ensureLoggedIn,
  caseStatus
);
// /:caseStatus
app.use(
  '/nextId', 
  authMiddleWare.ensureLoggedIn,
  nextId
);

app.use(
  '/userSE',
  authMiddleWare.ensureLoggedIn,
  userSE
);

app.use(
  '/managerDashboard',
  authMiddleWare.ensureLoggedIn,
  severity_dash
);

//activities
app.use(
  '/activityNo', 
  //authMiddleWare.ensureLoggedIn,
  activityNo
);
// /:activityNo
app.use(
  '/timeIn', 
  authMiddleWare.ensureLoggedIn,
  timeIn
);
// /:timeIn
app.use(
  '/timeOut', 
  authMiddleWare.ensureLoggedIn,
  timeOuts
);
// /:timeOuts
app.use(
  '/activityClient', 
  authMiddleWare.ensureLoggedIn,
  activityClient
);
// /:client
app.use(
  '/address', 
  authMiddleWare.ensureLoggedIn,
  addres
);
// /:addres
app.use(
  '/typeOfActivity', 
  authMiddleWare.ensureLoggedIn,
  typeOfActivity
);
// /:typeOfActivity
app.use(
  '/purposeOfVisit', 
  authMiddleWare.ensureLoggedIn,
  purpose
);
// /:purposeOfVisit
app.use(
  '/activityPerformed', 
  authMiddleWare.ensureLoggedIn,
  activityPerformed
);
// /:activityPerformed
app.use(
  '/recommendations', 
  authMiddleWare.ensureLoggedIn,
  recommendations
);
// /:recommendations
app.use(
  '/lastUpdate', 
  authMiddleWare.ensureLoggedIn,
  lastUpdate
);

app.use(
  '/engActivities', 
  authMiddleWare.ensureLoggedIn,
  engActivities
);
// /:assignedSystemsEngineer
app.use(
  '/tracking', 
  authMiddleWare.ensureLoggedIn,
  tracking
);
// /:trackingNo
app.use(
  '/assignedSystemsEngineer', 
  authMiddleWare.ensureLoggedIn,
  assignedSystemsEngineer
);
// /:assignedSystemsEngineer

//stats
app.use(
  '/total-cases', 
  authMiddleWare.ensureLoggedIn,
  totalCases
);
// /:case_status

app.use(
  '/severity-count',
  authMiddleWare.ensureLoggedIn,
  severityCount
);

app.use(
  '/eng-activities-count',
  authMiddleWare.ensureLoggedIn,
  engActivitiesCount
);

app.use(
  '/case-client-count',
  authMiddleWare.ensureLoggedIn,
  caseClientCount
);

app.use(
  '/case-product-count',
  authMiddleWare.ensureLoggedIn,
  caseProductCount
);

app.use(
  '/vendor-license-count',
  authMiddleWare.ensureLoggedIn,
  vendorLicenseCount
);

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
