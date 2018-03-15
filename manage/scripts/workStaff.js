require.config({
    paths: {
        angular: 'vendor/angular',
        angularRoute: 'vendor/angular-route',
        jquery: 'vendor/jquery',
        md5: 'vendor/jQuery.md5',
        chart: '../bower_components/dist/js/Chart',
        select: '../bower_components/dist/js/select2.min',
        bootstrap: 'vendor/bootstrap3.3.4',
        qrcode: 'vendor/qrcode.min',
        confirm: 'vendor/confirm',
        adminlte: '../bower_components/dist/js/adminlte.min',
        domReady: 'vendor/domReady'
    },
    shim: {
        jquery: {
            exports: 'jquery'
        },
        md5: {
            deps: ['jquery'],
            exports: 'md5'
        },
        qrcode: {
            deps: ['jquery'],
            exports: 'qrcode'
        },
        confirm: {
            deps: ['jquery'],
            exports: 'confirm'
        },
        chart: {
            exports: 'chart'
        },
        select: {
            deps: ['jquery'],
            exports: 'select'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'bootstrap'
        },
        adminlte: {
            deps: ['jquery', 'bootstrap'],
            exports: 'adminlte'
        },
        angular: {
            deps: ['jquery'],
            exports: 'angular'
        }, angularRoute: {
            deps: ['angular'],
            exports: 'angularRoute'
        }
    },
    deps: ['jquery', 'bootstrap', 'adminlte'],
    waitSeconds: 200,
    //deps:['angular'],//angular
    urlArgs: "bust=" + (new Date()).getTime()  //防止读取缓存，调试用
});
//
require([
        'angular', 'angularRoute',
        'app', 'domReady', 'jquery', 'md5', 'chart', 'select', 'bootstrap', 'adminlte', 'qrcode', 'confirm',
        'filters/intervalFilters',
        'filters/moneyFilters',
        'filters/powerFilters',
        'filters/sexFilters',
        'controllers/workStaffController',
        'controllers/commonController',
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
