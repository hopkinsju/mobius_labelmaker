'use strict';

//DeliveryStops service used for deliverystops REST endpoint
angular.module('mean.deliverystops').factory('DeliveryStops', ['$resource', function($resource) {
    return $resource('deliverystops/:deliverystopId', {
        deliverystopId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);