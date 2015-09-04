var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');

// var MongoClient = require('mongodb').MongoClient;
var browserify = require('browserify');
var watchify = require('watchify');
var fs = require('fs');
var colors = require('colors');
var notifier = require('node-notifier');

var config = require('./data/config');

var app = express();

// view engine setup
var env = new nunjucks.Environment(
  new nunjucks.FileSystemLoader(__dirname + '/views'),
  {
    dev: true,
    autoescape: true
  }
);
env.express(app);

app.use(favicon());
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);


// =====================================
// ROUTES
// =====================================

require('./routes/index')(app);

// =====================================
// =====================================


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error.html', {
            message: err.message,
            error: err
        });
    });
}

// ===================================================================
//                          BROWSERIFY
// ===================================================================

var b = browserify({ cache: {}, packageCache: {}, fullPaths: false });
var w = watchify(b, { 'opts.basedir': __dirname + '/public/js/modules/' });
// add our master _site file
w.add(__dirname + '/public/js/modules/site.js');
// create the bundled file

function bundleAssets(cb) {
  w.bundle( function(err, output) {
    if(err) {
      console.error('There was an issue running browserify!');
      console.error(err.message.red);
      if(config.development) {
        notifier.notify({
          'title': 'Browserify Build Failed',
          'message': err.message
        });
      }
      return cb && callback(err);
    }

    // write our new file to the public/js folder
    fs.writeFile(__dirname + '/public/js/_site.js', output, function (err) {
      if(err) {
        console.error('There was an error saving the freshly-bundled front end code.');
        console.error(err);
        return cb && callback(err);
      }
      console.log('Rebundled assets - '.green + Date().gray);
      return cb && cb(null);
    });
  });
}

w.on('update', function(ids) {
  bundleAssets();
});

bundleAssets();




module.exports = app;
