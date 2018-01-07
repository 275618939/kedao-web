
require.config({
    paths: {
        angular: 'vendor/angular',
        angularRoute:'vendor/angular-route',
        jquery: 'vendor/jquery',
        select:'../bower_components/dist/js/select2.min',
        domReady: 'vendor/domReady'

    },
    shim: {
        jquery: {
            exports: 'jquery'
        },
        select: {
            deps: [ 'jquery'],
            exports: 'select'
        },
        angular: {
            deps: [ 'jquery'],
            exports: 'angular'
        }, angularRoute: {
            deps: [ 'angular'],
            exports: 'angularRoute'
        }
    }
});
//
require([
        'angular','angularRoute',
        'app', 'domReady','select',
        'filters/intervalFilters',
        'controllers/indexController',
        'controllers/commonController',
        'interceptors/requestInterceptors'
    ],
    function (angular,angularRoute,app, domReady) {
        'use strict';
        app.config(['$httpProvider','$routeProvider',
            function($httpProvider,$routeProvider) {
                $httpProvider.interceptors.push('RequestInterceptors');
            }
        ]);

        domReady(function() {
            angular.bootstrap(document, ['zhwApp']);
            // The following is required if you want AngularJS Scenario tests to work
            $('html').addClass('ng-app: zhwApp');
        });
    }
);
