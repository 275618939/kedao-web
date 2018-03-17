require.config({
    waitSeconds: 200,
    paths: {
        angular: 'vendor/angular',
        angularRoute: 'vendor/angular-route',
        jquery: 'vendor/jquery',
        qrcode: 'vendor/qrcode.min',
        jqprint: 'vendor/jquery.jqprint-0.3',
        migrate: 'vendor/jquery-migrate-1.2.1.min',
        confirm: 'vendor/confirm',
        jqueryMd5: 'vendor/jQuery.md5',
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
        migrate: {
            deps: ['jquery'],
            exports: 'migrate'
        },
        jqprint: {
            deps: ['jquery'],
            exports: 'jqprint'
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
    urlArgs: "bust=" + (new Date()).getTime()  //∑¿÷π∂¡»°ª∫¥Ê£¨µ˜ ‘”√
});
//
require([
        'angular', 'angularRoute',
        'app', 'domReady', 'jquery', 'jqueryMd5', 'qrcode', 'confirm', 'jqprint', 'migrate',
        'filters/intervalFilters',
        'controllers/userController',
        'controllers/commonController',
        'controllers/printController',
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
