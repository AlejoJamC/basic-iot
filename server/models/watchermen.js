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
var mongoose = require('mongoose');
var logger = require('../utils/logger').logger;

/**
 * Define 'Watcherman' schema.
 */
var WatchermanSchema = new mongoose.Schema({
    mobile: {
        type: String,
        required: true
    },
    sms: Boolean,
    voice: Boolean,
    status: Boolean
}, {
    timestamps: true
});

/**
 * Expose 'Watcherman'.
 */
module.exports.Watcherman = mongoose.model('Watcherman', WatchermanSchema);