/**
 * Copyright (c) 2017-present, Alejandro Mantilla <@AlejoJamC>.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree or translated in the assets folder.
 */

/**
 * Module dependencies
 */
var express = require('express');
var mainRouter = express.Router();
var logger = require('../utils/logger').logger;
var request = require('request');

/* GET Index page. */
mainRouter.get('/', function (req, res) {
    // Basic error validator
    var error = '';
    // Error
    if (typeof req.query.error !== 'undefined') {
        error = req.query.error;
    }
    res.render('form', {
        title: 'Formulario de registro para supervisores | IoT',
        level: '',
        isHome: true,
        layout: 'template.hbs',
        error: error
    });
});

/* GET LIst of Watcherman. */
mainRouter.get('/watchermen', function (req, res) {
    // Basic error validator
    var error = '';
    // Error
    if (typeof req.query.error !== 'undefined') {
        error = req.query.error;
    }

    // Request options
    var options = {
        url: process.env.WEB_SERVICE + '/watchermen',
        headers: {
            'Authorization': 'Bearer ' + process.env.BEARER_KEY,
            'Content-Type': 'application/json'
        },
        method: 'GET'
    };

    // Sending customer creation method
    request.get(options, function (err, httpResponse, body) {
        if(err){
            logger.error('Error getting watchermen list: ' + err);
        }
        //Success
        body = JSON.parse(body);
        //logger.info(typeof body);
        //logger.info(body);
        res.json(body);
    });
});

/* POST New Watcherman. */
mainRouter.post('/watchermen', function (req, res) {
    // Basic error validator
    var error = '';
    // Error
    if (typeof req.query.error !== 'undefined') {
        error = req.query.error;
    }

    // Request options
    var options = {
        url: process.env.WEB_SERVICE + '/watchermen',
        headers: {
            'Authorization': 'Bearer ' + process.env.BEARER_KEY,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        json: {
            'mobile' : req.body.mobile,
            'sms' : true,
            'voice': false,
            'status': true
        }
    };

    // Sending customer creation method
    request.post(options, function (err, httpResponse, body) {
        if(err){
            logger.error('Error saving watchermen: ' + err);
        }
        res.send('ok');
    });
});

/* DELETE Watcherman by Id. */
mainRouter.delete('/watchermen/:id', function (req, res) {
    var watchermanId = req.params.id;
    // Basic error validator
    var error = '';
    // Error
    if (typeof req.query.error !== 'undefined') {
        error = req.query.error;
    }

    // Validate id
    if (typeof req.params.id === 'undefined') {
        error = 'El Id del supervisor es obligatorio';
    }

    // Request options
    var options = {
        url: process.env.WEB_SERVICE + '/watchermen/' + watchermanId,
        headers: {
            'Authorization': 'Bearer ' + process.env.BEARER_KEY,
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        json: {}
    };

    // Sending customer creation method
    request.delete(options, function (err, httpResponse, body) {
        if(err){
            logger.error('Error removing watchermen: ' + err);
        }
        res.send('ok');
    });
});


module.exports = mainRouter;