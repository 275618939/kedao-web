require.config({
    paths: {
        angular: 'vendor/angular',
        angularRoute: 'vendor/angular-route',
        jquery: 'vendor/jquery',
        'datatables.net': '../bower_components/dist/js/jquery.dataTables.min',
        'datatables.net-bs': '../bower_components/dist/js/dataTables.bootstrap',
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
        'datatables.net': {
            deps: ['jquery'],
            exports: 'datatables.net'
        },
        'datatables.net-bs': {
            deps: ['jquery'],
            exports: 'datatables.net-bs'
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
    waitSeconds: 1,
    deps: ['jquery']//先加载bootstrap文件
});
require([
        'angular', 'angularRoute',
        'app', 'domReady', 'jquery', 'datatables.net', 'datatables.net-bs', 'select', 'bootstrap', 'adminlte',
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
