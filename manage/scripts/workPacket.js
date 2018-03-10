require.config({
    paths: {
        angular: 'vendor/angular',
        angularRoute: 'vendor/angular-route',
        jquery: 'vendor/jquery',
        select: '../bower_components/dist/js/select2.min',
        bootstrap: 'vendor/bootstrap3.3.4',
        qrcode: 'vendor/qrcode.min',
        confirm: 'vendor/confirm',
        adminlte: '../bower_components/dist/js/adminlte.min',
        /*      'ui.bootstrap': 'vendor/ui-bootstrap-tpls.min',*/
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
        }/*,
         'ui.bootstrap': {
         deps: ['angular', 'bootstrap'],
         exports: 'ui.bootstrap'
         }*/
    },
    deps: ['bootstrap']//先加载bootstrap文件
});
require([
        'angular', 'angularRoute',
        'app', 'domReady', 'jquery', 'select', 'bootstrap', 'adminlte', 'qrcode', 'confirm',
        'filters/intervalFilters',
        'filters/moneyFilters',
        'filters/discountFilters',
        'controllers/workPacketController',
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
