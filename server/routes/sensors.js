/**
 * Copyright (c) 2017-present, Alejandro Mantilla <@AlejoJamC>.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree or translated in the assets folder.
 */

/**
 * Module dependencies.
 */
var async = require('async');
var logger = require('../utils/logger').logger;
var Sensor = require('../models/sensors').Sensor;
var Watcherman = require('../models/watchermen').Watcherman;

var dweetClient = require('node-dweetio');
var dweetio = new dweetClient();

var twilioClient = require('twilio');
var TwilioAccountSid = process.env.TWILIO_TOKEN_SID;
var twilioAuthToken = process.env.TWILIO_TOKEN_AUTH;
var twilio = new twilioClient(TwilioAccountSid, twilioAuthToken);

// ENDPOINT: /sensors METHOD: GET
exports.getSensors = function(req, res) {
    // Use the 'Sensor' model to find all sensors
    Sensor.find(function(err, sensors) {
        // Check for errors and show message
        if (err) {
            logger.error(err);
            return res.json({ message: 'Error trying to list sensors', data: err });
        }
        // success
        res.status(200).json(sensors);
    });
};

// ENDPOINT: /sensors/:id METHOD: GET
exports.getSensorById = function(req, res) {
    // Use the 'Sensor' model to find all sensors
    Sensor.findById(req.params.id, function(err, sensor) {
        // Check for errors and show message
        if (err) {
            logger.error(err);
            return res.json({ message: 'Error trying to get the sensor information', data: err });
        }
        // success
        res.status(200).json(sensor);
    });
};

// ENDPOINT: /sensors METHOD: POST
exports.postSensor = function(req, res) {
    // Create a new instance of the Sensor model
    var sensor = new Sensor();

    var name = req.body.name;
    var clientId = req.body.clientId;

    // Parse values to float with 2 decimals
    var values = {};
    var humidity  = Number(req.body.values.humidity).toFixed(2);
    var temperature = Number(req.body.values.temperature).toFixed(2);

    values.humidity = humidity;
    values.temperature = temperature;

    // Set the Sensor properties that came from the POST data
    sensor.name = name;
    sensor.values = values;
    sensor.clientId = clientId;

    // Calling dweet.io platform
    dweetio.dweet_for(clientId, {'humidity': humidity, 'temperature': temperature}, function(err, dweet){
        logger.info('published in https://dweet.io successfully'); // "my-thing"
        logger.info(dweet.thing); // "my-thing"
        logger.info(dweet.content); // The content of the dweet
        logger.info(dweet.created); // The create date of the dweet

    });

    sensor.save(function(err) {
        // Check for errors and show message
        if (err) {
            logger.error(err);
            return res.json({ message: 'Error trying to create a new sensor', data: err });
        }
        //Success
        res.status(200).json({ message: 'Sensor created successfully!', data: sensor });
    });
};

// ENDPOINT: /sensors/:id METHOD: PUT
exports.putSensor = function(req, res) {
    Sensor.findById(req.params.id, function(err, sensor) {
        // Check for errors and show message
        if (err) {
            logger.error(err);
            return res.json(err);
        }

        // Set the Sensor properties that came from the PUT data
        sensor.name = req.body.name;
        sensor.values = req.body.values;
        sensor.clientId = req.body.clientId;

        sensor.save(function(err) {
            // Check for errors and show message
            if (err) {
                logger.error(err);
                return res.json({ message: 'Error trying to update sensor information', data: err });
            }
            // success
            res.status(200).json({ message: 'Sensor updated successfully', data: sensor });
        });
    });
};

// ENDPOINT: /sensors/:id METHOD: DELETE
exports.deleteSensor = function(req, res) {
    Sensor.findByIdAndRemove(req.params.id, function(err) {
        // Check for errors and show message
        if (err) {
            logger.error(err);
            return res.json({ message: 'Error trying to delete sensor information', data: err });
        }
        // success
        res.status(200).json({ message: 'Sensor deleted successfully!' });
    });
};