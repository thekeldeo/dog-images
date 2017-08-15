'use strict';

/**
 * @ngdoc overview
 * @name techkidsWeb
 * @description
 * # techkidsWeb
 *
 * Main module of the application.
 */
angular
    .module('dogApp', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.bootstrap',
        'ngCookies'
    ])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/dog-images', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/404', {
                templateUrl: 'views/404.html'
            })
            .otherwise({
                redirectTo: '/404'
            });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        $locationProvider.hashPrefix('!');

    }])
    .controller('indexCtrl', function ($rootScope) {
        $rootScope.filter = '';
    })
    .run(['$rootScope', '$location', '$anchorScroll', '$routeParams', function ($rootScope, $location, $anchorScroll, $routeParams, $window) {
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            $rootScope.isCollapsed = true;
        });
        $rootScope.$on('$routeChangeSuccess', function (newRoute, oldRoute) {
            $location.hash($routeParams.scrollTo);
            $anchorScroll();
        });
    }]);


