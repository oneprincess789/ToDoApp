/*global angular*/
angular.module('toDoApp', ['ngRoute'])
    .config(function ($routeProvider) {
        'use strict';
        $routeProvider
            .when('/home', {
                templateUrl: 'index.html',
                controller: 'homeController'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
