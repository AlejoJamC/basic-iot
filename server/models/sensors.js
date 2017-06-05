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
 * Define 'Sensor' schema.
 */
var SensorSchema = new mongoose.Schema({
    name: String,
    values: mongoose.Schema.Types.Mixed,
    userId: mongoose.Schema.Types.ObjectId,
    clienteId: mongoose.Schema.Types.ObjectId
}, {
    timestamps: true
});

/**
 * Expose 'Sensor'.
 */
module.exports.Sensor = mongoose.model('Sensor', SensorSchema);