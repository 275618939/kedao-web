require.config({
    waitSeconds: 200,
    paths: {
        angular: 'vendor/angular',
        angularRoute: 'vendor/angular-route',
        jquery: 'vendor/jquery',
        md5: 'vendor/jQuery.md5',
        qrcode: 'vendor/qrcode.min',
        jqprint: 'vendor/jquery.jqprint-0.3',
        migrate: 'vendor/jquery-migrate-1.2.1.min',
        confirm: 'vendor/confirm',
        chart: '../bower_components/dist/js/Chart',
        select: '../bower_components/dist/js/select2.min',
        bootstrap: 'vendor/bootstrap3.3.4',
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
        chart: {
            exports: 'chart'
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
        confirm: {
            deps: ['jquery'],
            exports: 'confirm'
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
    urlArgs: "bust=" + (new Date()).getTime()  //防止读取缓存，调试用
});
//
require([
        'angular', 'angularRoute',
        'app', 'domReady', 'jquery', 'md5', 'chart', 'select', 'bootstrap', 'adminlte', 'qrcode', 'confirm', 'jqprint', 'migrate',
        'filters/intervalFilters',
        'filters/moneyFilters',
        'filters/powerFilters',
        'filters/sexFilters',
        'controllers/staffController',
        'controllers/printController',
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
