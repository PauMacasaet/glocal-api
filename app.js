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

const productName = require('./routes/products/productName');
const productVendor = require('./routes/products/productVendor');

const license = require('./routes/license/license');
const on_site = require('./routes/license/onsite');
const clientLicense = require('./routes/license/vendor');

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

app.use('/products', productName);
app.use('/productvendor', productVendor);

app.use('/license', license);
app.use('/onsite', on_site);
app.use('/clientlicense', clientLicense);

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
