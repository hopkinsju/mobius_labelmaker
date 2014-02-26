'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    DeliveryStop = mongoose.model('DeliveryStop'),
    _ = require('lodash');


/**
 * Find deliverystop by id
 */
exports.deliverystop = function(req, res, next, id) {
    DeliveryStop.load(id, function(err, deliverystop) {
        if (err) return next(err);
        if (!deliverystop) return next(new Error('Failed to load deliverystop ' + id));
        req.deliverystop = deliverystop;
        next();
    });
};

/**
 * Create an deliverystop
 */
exports.create = function(req, res) {
    var deliverystop = new DeliveryStop(req.body);
    deliverystop.user = req.user;

    deliverystop.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                deliverystop: deliverystop
            });
        } else {
            res.jsonp(deliverystop);
        }
    });
};

/**
 * Update an deliverystop
 */
exports.update = function(req, res) {
    var deliverystop = req.deliverystop;

    deliverystop = _.extend(deliverystop, req.body);

    deliverystop.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                deliverystop: deliverystop
            });
        } else {
            res.jsonp(deliverystop);
        }
    });
};

/**
 * Delete an deliverystop
 */
exports.destroy = function(req, res) {
    var deliverystop = req.deliverystop;

    deliverystop.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                deliverystop: deliverystop
            });
        } else {
            res.jsonp(deliverystop);
        }
    });
};

/**
 * Show an deliverystop
 */
exports.show = function(req, res) {
    res.jsonp(req.deliverystop);
};

/**
 * List of DeliveryStops
 */
exports.all = function(req, res) {
    DeliveryStop.find().sort('-created').populate('user', 'name username').exec(function(err, deliverystops) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(deliverystops);
        }
    });
};
