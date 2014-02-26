'use strict';

//Setting up route
angular.module('mean').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

    // states for my app
    $stateProvider
      .state('all deliverystops', {
        url: '/deliverystops',
        templateUrl: 'views/deliverystops/list.html'
    })
      .state('create deliverystop', {
        url: '/deliverystops/create',
        templateUrl: 'views/deliverystops/create.html'
    })
      .state('edit deliverystop', {
        url: '/deliverystops/:deliverystopId/edit',
        templateUrl: 'views/deliverystops/edit.html'
    })
      .state('deliverystop by id', {
        url: '/deliverystops/:deliverystopId',
        templateUrl: 'views/deliverystops/view.html'
    })
      .state('home', {
        url: '/',
        templateUrl: 'views/index.html'
    });
}
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
}
]);
