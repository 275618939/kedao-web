require.config({
    paths: {
        angular: 'vendor/angular',
        angularRoute: 'vendor/angular-route',
        jquery: 'vendor/jquery',
        jqueryMd5: 'vendor/jQuery.md5',
        qrcode: 'vendor/qrcode.min',
        confirm: 'vendor/confirm',
        domReady: 'vendor/domReady'
    },
    shim: {
        jquery: {
            exports: 'jquery'
        },
        qrcode: {
            deps: ['jquery'],
            exports: 'qrcode'
        },
        jqueryMd5: {
            deps: ['jquery'],
            exports: 'jqueryMd5'
        },
        confirm: {
            deps: ['jquery'],
            exports: 'confirm'
        },
        angular: {
            deps: ['jquery'],
            exports: 'angular'
        }, angularRoute: {
            deps: ['angular'],
            exports: 'angularRoute'
        }
    },
    waitSeconds: 200,
    //deps:['angular'],//angular
    urlArgs: "bust=" + (new Date()).getTime()  //防止读取缓存，调试用
});
//
require([
        'angular', 'angularRoute',
        'app', 'domReady', 'jquery', 'jqueryMd5', 'qrcode', 'confirm',
        'filters/intervalFilters',
        'controllers/workController',
        'controllers/commonController',
        'interceptors/requestInterceptors'
        /*  'directives/ngbkFocus'*/
        // Any individual controller, service, directive or filter file
        // that you add will need to be pulled in here.
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
