'use strict';

angular.module('mean.deliverystops').controller('DeliveryStopsController', ['$scope', '$stateParams', '$location', 'Global', 'DeliveryStops', function ($scope, $stateParams, $location, Global, DeliveryStops) {
    $scope.global = Global;

    $scope.create = function() {
        var deliverystop = new DeliveryStops({
            loc_code: this.loc_code,
            lib_name: this.lib_name,
            inst_name: this.inst_name,
            street: this.street,
            city: this.city,
            state: this.state,
            zip: this.zip,
            sort_code: this.sort_code,
            courier: this.courier
        });
        deliverystop.$save(function(response) {
            $location.path('deliverystops/' + response._id);
        });

        this.loc_code = '';
        this.lib_name = '';
    };

    $scope.remove = function(deliverystop) {
        if (deliverystop) {
            deliverystop.$remove();

            for (var i in $scope.deliverystops) {
                if ($scope.deliverystops[i] === deliverystop) {
                    $scope.deliverystops.splice(i, 1);
                }
            }
        }
        else {
            $scope.deliverystop.$remove();
            $location.path('deliverystops');
        }
    };

    $scope.update = function() {
        var deliverystop = $scope.deliverystop;
        if (!deliverystop.updated) {
            deliverystop.updated = [];
        }
        deliverystop.updated.push(new Date().getTime());

        deliverystop.$update(function() {
            $location.path('deliverystops/' + deliverystop._id);
        });
    };

    $scope.find = function() {
        DeliveryStops.query(function(deliverystops) {
            $scope.deliverystops = deliverystops;
        });
    };

    $scope.findOne = function() {
        DeliveryStops.get({
            deliverystopId: $stateParams.deliverystopId
        }, function(deliverystop) {
            $scope.deliverystop = deliverystop;
        });
    };
}]);