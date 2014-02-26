'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    DeliveryStop = mongoose.model('DeliveryStop');

//Globals
var user;
var deliverystop;

//The tests
describe('<Unit Test>', function() {
    describe('Model DeliveryStop:', function() {
        beforeEach(function(done) {
            user = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            user.save(function() {
                deliverystop = new DeliveryStop({
                    loc_code: 'Delivery Stop Loc Code',
                    lib_name: 'Delivery Stop Library Name',
                    user: user
                });

                done();
            });
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return deliverystop.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without loc_code', function(done) {
                deliverystop.loc_code = '';

                return deliverystop.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        afterEach(function(done) {
            DeliveryStop.remove({});
            User.remove({});
            done();
        });
        after(function(done) {
            DeliveryStop.remove().exec();
            User.remove().exec();
            done();
        });
    });
});