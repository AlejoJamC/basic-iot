/**
 * Copyright (c) 2017-present, Alejandro Mantilla <@AlejoJamC>.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree or translated in the assets folder.
 */

/**
 * Environment variables.
 */
require('dotenv').config();

/**
 * Module dependencies.
 */
var express = require('express'),
    bodyParser = require('body-parser'),
    favicon = require('serve-favicon'),
    jade = require('jade'),
    methodOverride = require('method-override'),
    moment = require('moment'),
    path = require('path'),
    session = require('express-session'),
    passport = require('passport'),

    logger = require('./utils/logger').Logger,
    morgan = require('morgan'),

    routes = require('./routes/api'),

    port = process.env.APP_ENV,

    mongoDB = require('./utils/mongodb');

// MongoDB connection
mongoDB.SetupMongoDB(process.env.APP_ENV, process.env.APP_ENV);

// Express app instance
var app = express();

// Load configuration, package and environment to the new express app.
// Port.
app.set('port', port);

// Config views and template engine.
app.set('view engine', 'jade');

// Favicon path.
app.use(favicon(__dirname + '/public/img/favicon.ico'));

// Logger.
app.use(morgan('dev'));

// Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
app.use(methodOverride());

// Set Header 'X-Prowered-By'
logger.info('Uparki.com - El poder de compartir | API');
app.use(function (req, res, next) {
    res.set('X-Powered-By', 'Uparki.com - El poder de compartir');
    next();
});

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Import static files.
app.use(express.static(path.join(__dirname, 'public')));

// Session.
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: '3f1l 4 73g 0t d33n yll43r u s1ht d43r n4c u f1'
}));

// Use the passport package in our application
app.use(passport.initialize());

// Local variables.
// Current year.
app.locals.currentYear = moment().year();
global.ENVIRONMENT = environment;

// Path to our public directory
app.use(express.static(__dirname + '/public'));

//ROUTER
//Create our Express router
var router = express.Router();

// Setup all routes on express router
routes.SetupRouter(router);

// Register all our routes with a prefix: /api or /v1
// This poject is created to be hosted in a subdomain dedicated to authentication and authorization
// Example of an URL with the prefix: auth.happyauth.com/v0
app.use(config.version, router);

// Start the server
app.listen(port);
logger.info('API running on http://localhost:' + port + config.version + '/');