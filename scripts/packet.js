
require.config({
    paths: {
        angular: 'vendor/angular',
        angularRoute: 'vendor/angular-route',
        jquery: 'vendor/jquery',
        iscroll: 'vendor/iscroll-lite',
        play: 'vendor/play',
        touchslider: 'vendor/jquery.touchslider.min',
        iosOverlay: 'vendor/iosOverlay',
        domReady: 'vendor/domReady'
    },
    shim: {
        jquery: {
            exports: 'jquery'
        },
        iosOverlay: {
            deps: ['jquery'],
            exports: 'iosOverlay'
        },
        touchslider: {
            deps: ['jquery'],
            exports: 'touchslider'
        },
        play: {
            deps: ['jquery'],
            exports: 'play'
        },
        iscroll: {
            deps: ['jquery'],
            exports: 'iscroll'
        },
        angular: {
            deps: ['jquery'],
            exports: 'angular'
        }, angularRoute: {
            deps: ['angular'],
            exports: 'angularRoute'
        }
    }
});
require([
        'angular', 'angularRoute',
        'app', 'domReady', 'jquery', "iscroll", "touchslider", "play", "iosOverlay",
        'filters/intervalFilters',
        'filters/moneyFilters',
        'filters/discountFilters',
        'controllers/packetController',
        'interceptors/requestInterceptors'
    ],
    function (angular, angularRoute, app, domReady) {
        'use strict';
        app.config(['$httpProvider', '$routeProvider',
            function ($httpProvider, $routeProvider) {
                $httpProvider.interceptors.push('RequestInterceptors');
            }
        ]);

        domReady(function () {
            angular.bootstrap(document, ['zhwApp']);
            // The following is required if you want AngularJS Scenario tests to work
            $('html').addClass('ng-app: zhwApp');
        });
    }
);
