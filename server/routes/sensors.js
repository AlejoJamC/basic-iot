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
var logger = require('../utils/logger').logger;
var Sensor = require('../models/sensors').Sensor;

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

    // Set the Sensor properties that came from the POST data
    sensor.firstName = req.body.firstName;
    sensor.lastName = req.body.lastName;
    sensor.email = req.body.email;
    sensor.password = req.body.password;
    sensor.status = req.body.status;

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
        sensor.firstName = req.body.firstName;
        sensor.lastName = req.body.lastName;
        sensor.password = req.body.password;
        sensor.status = req.body.status;

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

// ENDPOINT: /sensors/:id METHOD: PATCH
exports.patchSensor = function(req, res) {
    Sensor.findById(req.params.id, function(err, sensor) {
        // Check for errors and show message
        if (err) {
            logger.error(err);
            return res.json(err);
        }

        sensor.status = req.body.status;

        sensor.save(function(err) {
            // Check for errors and show message
            if (err) {
                logger.error(err);
                return res.json({ message: 'Error trying to change sensor status', data: err });
            }
            var message = '';
            if (sensor.enabled === true) {
                message = 'Sensor enabled successfully';
            } else {
                message = 'Sensor disbled successfully';
            }
            // success
            res.status(200).json({ message: message, data: sensor });
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