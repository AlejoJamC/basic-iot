/**
 * Copyright (c) 2017-present, Alejandro Mantilla <@AlejoJamC>.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree or translated in the assets folder.
 */

/**
 * Module dependencies
 */
var express = require('express');
var logger = require('../utils/logger').logger;
var moment = require('moment');

/**
 * setupRouter
 *
 * @description Configure all routes on express router
 *
 * @param {express.Router}      router      The varaible router used by the server
 */
function SetupRouter() {

    // Create express router
    var router = express.Router();

    // logger for all request will first hits this middleware
    router.use(function (req, res, next) {
        var now = moment(new Date());

        var date = now.format("DD-MM-YYYY HH:mm");
        logger.info('%s %s %s', req.method, req.url, date);
        next();
    });

    /**
     *  Declare all routes
     */
    var authRoutes = require('./auth');
    var clientRoutes = require('./clients');
    var oauth2Routes = require('./oauth2');
    var sensorRoutes = require('./sensors');
    var userRoutes = require('./users');


    /**
     *  Document:  CLIENTS.JS
     *  Define routes where they are stored endpoints
     */
    // ENDPOINT: /clients
    router.route('/clients')
        .get(authRoutes.isAuthenticated, clientRoutes.getClientByIdClient)
        .post(authRoutes.isAuthenticated, clientRoutes.postClient);

    // ENDPOINT: /clients/:id
    router.route('/clients/:id')
        .delete(authRoutes.isAuthenticated, clientRoutes.deleteClient);
    /**
     * ====================================================================
     */


    /**
     *  Document:  OAUTH2.JS
     *  Create endpoint handlers for oauth2 authorize
     */
    // ENDPOINT: /oauth2/authorize
    router.route('/oauth2/authorize')
        .get(authRoutes.isAuthenticated, oauth2Routes.authorization)
        .post(authRoutes.isAuthenticated, oauth2Routes.decision);

    // ENDPOINT: /oauth2/token
    router.route('/oauth2/token')
        .post(authRoutes.isClientAuthenticated, oauth2Routes.token);
    /**
     * ====================================================================
     */


    /**
     *  Document:  SENSORS.JS
     *  Define routes where they are stored endpoints
     */
    // ENDPOINT: /sensors
    router.route('/sensors')
        .get(authRoutes.isAuthenticated, sensorRoutes.getSensors)
        .post(authRoutes.isAuthenticated, sensorRoutes.postSensor);

    // ENDPOINT: /sensors/:id
    router.route('/sensors/:id')
        .get(authRoutes.isAuthenticated, sensorRoutes.getSensorById)
        .put(authRoutes.isAuthenticated, sensorRoutes.putSensor)
        .delete(authRoutes.isAuthenticated, sensorRoutes.deleteSensor);
    /**
     * ====================================================================
     */


    /**
     *  Document:  USERS.JS
     *  Define routes where they are stored endpoints
     */
    // ENDPOINT: /users
    router.route('/users')
        .get(authRoutes.isAuthenticated, userRoutes.getUsers)
        .post(authRoutes.isAuthenticated, userRoutes.postUser);

    // ENDPOINT: /users/:id
    router.route('/users/:id')
        .get(authRoutes.isAuthenticated, userRoutes.getUserById)
        .put(authRoutes.isAuthenticated, userRoutes.putUser)
        .patch(authRoutes.isAuthenticated, userRoutes.patchUser)
        .delete(authRoutes.isAuthenticated, userRoutes.deleteUser);

    // ENDPOINT: /login
    router.route('/login')
        .get(authRoutes.isLoginAuthenticated, userRoutes.getLogin);
    /**
     * ====================================================================
     */

    // Export router entity
    return router;
}

// Export the function that initialize all routes
module.exports.SetupRouter = SetupRouter;