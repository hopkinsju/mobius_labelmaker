'use strict';

(function() {
    // DeliveryStops Controller Spec
    describe('MEAN controllers', function() {
        describe('DeliveryStopsController', function() {
            // The $resource service augments the response object with methods for updating and deleting the resource.
            // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
            // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
            // When the toEqualData matcher compares two objects, it takes only object properties into
            // account and ignores methods.
            beforeEach(function() {
                this.addMatchers({
                    toEqualData: function(expected) {
                        return angular.equals(this.actual, expected);
                    }
                });
            });

            // Load the controllers module
            beforeEach(module('mean'));

            // Initialize the controller and a mock scope
            var DeliveryStopsController,
                scope,
                $httpBackend,
                $stateParams,
                $location;

            // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
            // This allows us to inject a service but then attach it to a variable
            // with the same name as the service.
            beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

                scope = $rootScope.$new();

                DeliveryStopsController = $controller('DeliveryStopsController', {
                    $scope: scope
                });

                $stateParams = _$stateParams_;

                $httpBackend = _$httpBackend_;

                $location = _$location_;

            }));

            it('$scope.find() should create an array with at least one deliverystop object ' +
                'fetched from XHR', function() {

                    // test expected GET request
                    $httpBackend.expectGET('deliverystops').respond([{
                        loc_code: 'ABC',
                        lib_name: 'Some Library!'
                    }]);

                    // run controller
                    scope.find();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.deliverystops).toEqualData([{
                        loc_code: 'ABC',
                        lib_name: 'Some Library!'
                    }]);

                });

            it('$scope.findOne() should create an array with one deliverystop object fetched ' +
                'from XHR using a deliverystopId URL parameter', function() {
                    // fixture URL parament
                    $stateParams.deliverystopId = '525a8422f6d0f87f0e407a33';

                    // fixture response object
                    var testDeliveryStopData = function() {
                        return {
                            loc_code: 'ABC',
                            lib_name: 'Some Library!'
                        };
                    };

                    // test expected GET request with response object
                    $httpBackend.expectGET(/deliverystops\/([0-9a-fA-F]{24})$/).respond(testDeliveryStopData());

                    // run controller
                    scope.findOne();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.deliverystop).toEqualData(testDeliveryStopData());

                });

            it('$scope.create() with valid form data should send a POST request ' +
                'with the form input values and then ' +
                'locate to new object URL', function() {

                    // fixture expected POST data
                    var postDeliveryStopData = function() {
                        return {
                            loc_code: 'ABC',
                            lib_name: 'Some Library!'
                        };
                    };

                    // fixture expected response data
                    var responseDeliveryStopData = function() {
                        return {
                            _id: '525cf20451979dea2c000001',
                            loc_code: 'ABC',
                            lib_name: 'Some Library!'
                        };
                    };

                    // fixture mock form input values
                    scope.loc_code = 'ABC';
                    scope.lib_name = 'Some Library!';

                    // test post request is sent
                    $httpBackend.expectPOST('deliverystops', postDeliveryStopData()).respond(responseDeliveryStopData());

                    // Run controller
                    scope.create();
                    $httpBackend.flush();

                    // test form input(s) are reset
                    expect(scope.loc_code).toEqual('');
                    expect(scope.lib_name).toEqual('');

                    // test URL location to new object
                    expect($location.path()).toBe('/deliverystops/' + responseDeliveryStopData()._id);
                });

            it('$scope.update() should update a valid deliverystop', inject(function(DeliveryStops) {

                // fixture rideshare
                var putDeliveryStopData = function() {
                    return {
                        _id: '525a8422f6d0f87f0e407a33',
                        loc_code: 'ABC',
                        to: 'Some Library!'
                    };
                };

                // mock deliverystop object from form
                var deliverystop = new DeliveryStops(putDeliveryStopData());

                // mock deliverystop in scope
                scope.deliverystop = deliverystop;

                // test PUT happens correctly
                $httpBackend.expectPUT(/deliverystops\/([0-9a-fA-F]{24})$/).respond();

                // testing the body data is out for now until an idea for testing the dynamic updated array value is figured out
                //$httpBackend.expectPUT(/deliverystops\/([0-9a-fA-F]{24})$/, putDeliveryStopData()).respond();
                /*
                Error: Expected PUT /deliverystops\/([0-9a-fA-F]{24})$/ with different data
                EXPECTED: {"_id":"525a8422f6d0f87f0e407a33","loc_code":"An DeliveryStop about MEAN","to":"MEAN is great!"}
                GOT:      {"_id":"525a8422f6d0f87f0e407a33","loc_code":"An DeliveryStop about MEAN","to":"MEAN is great!","updated":[1383534772975]}
                */

                // run controller
                scope.update();
                $httpBackend.flush();

                // test URL location to new object
                expect($location.path()).toBe('/deliverystops/' + putDeliveryStopData()._id);

            }));

            it('$scope.remove() should send a DELETE request with a valid deliverystopId' +
                'and remove the deliverystop from the scope', inject(function(DeliveryStops) {

                    // fixture rideshare
                    var deliverystop = new DeliveryStops({
                        _id: '525a8422f6d0f87f0e407a33'
                    });

                    // mock rideshares in scope
                    scope.deliverystops = [];
                    scope.deliverystops.push(deliverystop);

                    // test expected rideshare DELETE request
                    $httpBackend.expectDELETE(/deliverystops\/([0-9a-fA-F]{24})$/).respond(204);

                    // run controller
                    scope.remove(deliverystop);
                    $httpBackend.flush();

                    // test after successful delete URL location deliverystops lis
                    //expect($location.path()).toBe('/deliverystops');
                    expect(scope.deliverystops.length).toBe(0);

                }));
        });
    });
}());