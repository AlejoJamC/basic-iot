/**
 * Copyright (c) 2017-present, Alejandro Mantilla <@AlejoJamC>.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree or translated in the assets folder.
 */

/**
 * Module dependencies.
 */
var logger = require('../utils/logger').logger;
var Watcherman = require('../models/watchermen').Watcherman;

// ENDPOINT: /watchermen METHOD: GET
exports.getWatchermen = function(req, res) {
    // Use the 'Watcherman' model to find all watchermen
    Watcherman.find(function(err, watchermen) {
        // Check for errors and show message
        if (err) {
            logger.error(err);
            return res.json({ message: 'Error trying to list watchermen', data: err });
        }
        // success
        res.status(200).json(watchermen);
    });
};

// ENDPOINT: /watchermen/:id METHOD: GET
exports.getWatchermanById = function(req, res) {
    // Use the 'Watcherman' model to find all watchermen
    Watcherman.findById(req.params.id, function(err, watcherman) {
        // Check for errors and show message
        if (err) {
            logger.error(err);
            return res.json({ message: 'Error trying to get the watcherman information', data: err });
        }
        // success
        res.status(200).json(watcherman);
    });
};

// ENDPOINT: /watchermen METHOD: POST
exports.postWatcherman = function(req, res) {
    // Create a new instance of the Watcherman model
    var watcherman = new Watcherman();

    // Set the Watcherman properties that came from the POST data
    watcherman.mobile = req.body.mobile;
    watcherman.sms = req.body.sms;
    watcherman.voice = req.body.voice;
    watcherman.status = req.body.status;

    watcherman.save(function(err) {
        // Check for errors and show message
        if (err) {
            logger.error(err);
            return res.json({ message: 'Error trying to create a new watcherman', data: err });
        }
        //Success
        res.status(200).json({ message: 'Watcherman created successfully!', data: watcherman });
    });
};

// ENDPOINT: /watchermen/:id METHOD: PUT
exports.putWatcherman = function(req, res) {
    Watcherman.findById(req.params.id, function(err, watcherman) {
        // Check for errors and show message
        if (err) {
            logger.error(err);
            return res.json(err);
        }

        // Set the Watcherman properties that came from the PUT data
        watcherman.mobile = req.body.mobile;
        watcherman.sms = req.body.sms;
        watcherman.voice = req.body.voice;
        watcherman.status = req.body.status;

        watcherman.save(function(err) {
            // Check for errors and show message
            if (err) {
                logger.error(err);
                return res.json({ message: 'Error trying to update watcherman information', data: err });
            }
            // success
            res.status(200).json({ message: 'Watcherman updated successfully', data: watcherman });
        });
    });
};

// ENDPOINT: /watchermen/:id METHOD: PATCH
exports.patchWatcherman = function(req, res) {
    Watcherman.findById(req.params.id, function(err, watcherman) {
        // Check for errors and show message
        if (err) {
            logger.error(err);
            return res.json(err);
        }

        watcherman.status = req.body.status;

        watcherman.save(function(err) {
            // Check for errors and show message
            if (err) {
                logger.error(err);
                return res.json({ message: 'Error trying to change watcherman status', data: err });
            }
            var message = '';
            if (watcherman.enabled === true) {
                message = 'Watcherman enabled successfully';
            } else {
                message = 'Watcherman disbled successfully';
            }
            // success
            res.status(200).json({ message: message, data: watcherman });
        });
    });
};

// ENDPOINT: /watchermen/:id METHOD: DELETE
exports.deleteWatcherman = function(req, res) {
    Watcherman.findByIdAndRemove(req.params.id, function(err) {
        // Check for errors and show message
        if (err) {
            logger.error(err);
            return res.json({ message: 'Error trying to delete watcherman information', data: err });
        }
        // success
        res.status(200).json({ message: 'Watcherman deleted successfully!' });
    });
};