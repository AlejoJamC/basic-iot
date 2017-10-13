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
var express         = require('express'),
    bodyParser      = require('body-parser'),
    coockieParser   = require('cookie-parser'),
    errorhandler    = require('errorhandler'),
    favicon         = require('serve-favicon'),
    hbs             = require('express-hbs'),
    methodOverride  = require('method-override'),
    moment          = require('moment'),
    path            = require('path'),
    session         = require('express-session'),

    logger          = require('./utils/logger').logger,
    webRoutes       = require('./routes/web'),

    environment     = process.env.APP_ENV,
    port            = process.env.APP_PORT;

// Express app instance.
var app = express();

// Load configuration package and environment to the new express app.
// Port.
app.set('port', port);

// Configure view template engine.
// Using `.hbs` for extensions and find partials in `views/partials`.
app.engine('hbs', hbs.express4({
    partialsDir: __dirname + '/views/partials',
    layoutsDir: __dirname + '/views/layouts'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// Favicon path.
app.use(favicon(__dirname + '/public/favicon.ico'));

// Logger.
// TODO: Arreglar el error entre wiston y morgan
//app.use(morgan('combined', { 'stream': logger.stream }));
//app.use(morgan('dev'));

// Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
app.use(methodOverride());

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Import static files.
// Landing files
app.use(express.static(path.join(__dirname, 'public')));
// Coockies
app.use(coockieParser());

// Session.
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: '3f1l 4 73g 0t d33n yll43r u s1ht d43r n4c u f1'
}));

// Local variables.
// Current year.
app.locals.currentYear = moment().year();
app.locals.currentEnvironment = environment;

// Setup all routes on express router
webRoutes.SetupWebRouter(app);

// Error handler available environment
var env = process.env.NODE_ENV || environment;
if ('development' === env){
    app.use(errorhandler());
}

app.listen(app.get('port'), function(){
    logger.info('Basic-IoT form running at  http://localhost:' + port + '/');
});