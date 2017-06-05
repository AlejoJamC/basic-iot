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
var User = require('../models/users').User;

// ENDPOINT: /users METHOD: GET
exports.getUsers = function(req, res) {
    // Use the 'User' model to find all users
    User.find(function(err, users) {
        // Check for errors and show message
        if (err) {
            logger.error(err);
            return res.json({ message: 'Error trying to list users', data: err });
        }
        // success
        res.status(200).json(users);
    });
};

// ENDPOINT: /users/:id METHOD: GET
exports.getUserById = function(req, res) {
    // Use the 'User' model to find all users
    User.findById(req.params.id, function(err, user) {
        // Check for errors and show message
        if (err) {
            logger.error(err);
            return res.json({ message: 'Error trying to get the user information', data: err });
        }
        // success
        res.status(200).json(user);
    });
};

// ENDPOINT: /login METHOD: GET
exports.getLogin = function(req, res) {
    // Use the 'User' model to find all users
    User.findById(req.user._id, function(err, user) {
        // Check for errors and show message
        if (err) {
            logger.error(err);
            return res.json({ message: 'Error trying to login this user', data: err });
        }
        // success
        res.status(200).json({ message: "Login authenticated successfully", data: user });
    });
};

// ENDPOINT: /users METHOD: POST
exports.postUser = function(req, res) {
    // Create a new instance of the User model
    var user = new User();

    // Set the User properties that came from the POST data
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.status = req.body.status;

    user.save(function(err) {
        // Check for errors and show message
        if (err) {
            logger.error(err);
            return res.json({ message: 'Error trying to create a new user', data: err });
        }
        //Success
        res.status(200).json({ message: 'User created successfully!', data: user });
    });
};

// ENDPOINT: /users/:id METHOD: PUT
exports.putUser = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        // Check for errors and show message
        if (err) {
            logger.error(err);
            return res.json(err);
        }

        // Set the User properties that came from the PUT data
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.password = req.body.password;
        user.status = req.body.status;

        user.save(function(err) {
            // Check for errors and show message
            if (err) {
                logger.error(err);
                return res.json({ message: 'Error trying to update user information', data: err });
            }
            // success
            res.status(200).json({ message: 'User updated successfully', data: user });
        });
    });
};

// ENDPOINT: /users/:id METHOD: PATCH
exports.patchUser = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        // Check for errors and show message
        if (err) {
            logger.error(err);
            return res.json(err);
        }

        user.status = req.body.status;

        user.save(function(err) {
            // Check for errors and show message
            if (err) {
                logger.error(err);
                return res.json({ message: 'Error trying to change user status', data: err });
            }
            var message = '';
            if (user.enabled === true) {
                message = 'User enabled successfully';
            } else {
                message = 'User disbled successfully';
            }
            // success
            res.status(200).json({ message: message, data: user });
        });
    });
};

// ENDPOINT: /users/:id METHOD: DELETE
exports.deleteUser = function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err) {
        // Check for errors and show message
        if (err) {
            logger.error(err);
            return res.json({ message: 'Error trying to delete user information', data: err });
        }
        // success
        res.status(200).json({ message: 'User deleted successfully!' });
    });
};