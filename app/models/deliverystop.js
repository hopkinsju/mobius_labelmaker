'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * DeliveryStop Schema
 */
var DeliveryStopSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    edited: {
        type: Date,
        default: Date.now
    },
    loc_code: {
        type: String,
        default: '',
        trim: true
    },
    inst_name: {
        type: String,
        default: '',
        trim: true
    },
    lib_name: {
        type: String,
        default: '',
        trim: true
    },
    street: {
        type: String,
        default: '',
        trim: true
    },
    city: {
        type: String,
        default: '',
        trim: true
    },
    state: {
        type: String,
        default: '',
        trim: true
    },
    zip: {
        type: String,
        default: '',
        trim: true
    },
    sort_code: {
        type: String,
        default: '',
        trim: true
    },
    courier: {
        type: String,
        default: '',
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
DeliveryStopSchema.path('loc_code').validate(function(loc_code) {
    return loc_code.length;
}, 'loc_code cannot be blank');

/**
 * Statics
 */
DeliveryStopSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('DeliveryStop', DeliveryStopSchema);
