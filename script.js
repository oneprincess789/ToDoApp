/*global angular*/
angular.module('toDoApp', ['ngRoute', 'firebase'])
    .config(function ($routeProvider) {
        'use strict';
        $routeProvider
            .when('/api', {
                templateUrl: 'index.html',
                controller: 'homeController'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
