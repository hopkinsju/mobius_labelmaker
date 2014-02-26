'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title': 'Delivery Stops',
        'link': 'deliverystops'
    }, {
        'title': 'Create New Delivery Stop',
        'link': 'deliverystops/create'
    }];
    
    $scope.isCollapsed = false;
}]);