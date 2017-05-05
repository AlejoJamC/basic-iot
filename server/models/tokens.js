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
var mongoose = require('mongoose');

/**
 * Define 'Token' schema.
 */
var TokenSchema = new mongoose.Schema({
    value       : {
        type : String,
        required : true
    },
    userId      : {
        type : String,
        required : true
    },
    clientId    : {
        type: String,
        required: true
    }
}, {
    timestamps  : true
});

/**
 * Expose 'Token'.
 */
module.exports.Token = mongoose.model('Token', TokenSchema);