require.config({
    waitSeconds: 200,
    paths: {
        angular: 'vendor/angular',
        angularRoute: 'vendor/angular-route',
        jquery: 'vendor/jquery',
        qrcode: 'vendor/qrcode.min',
        confirm: 'vendor/confirm',
        jqprint: 'vendor/jquery.jqprint-0.3',
        migrate: 'vendor/jquery-migrate-1.2.1.min',
        select: '../bower_components/dist/js/select2.min',
        bootstrap: 'vendor/bootstrap3.3.4',
        adminlte: '../bower_components/dist/js/adminlte.min',
        domReady: 'vendor/domReady'
    },
    shim: {
        jquery: {
            exports: 'jquery'
        },
        select: {
            deps: ['jquery'],
            exports: 'select'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'bootstrap'
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
    deps: ['bootstrap']//先加载bootstrap文件
});
require([
        'angular', 'angularRoute',
        'app', 'domReady', 'jquery', 'select', 'bootstrap', 'adminlte', 'qrcode', 'confirm', 'jqprint', 'migrate',
        'filters/intervalFilters',
        'filters/moneyFilters',
        'filters/discountFilters',
        'controllers/printController',
        'controllers/productController',
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
