require.config({
    waitSeconds: 200,
    paths: {
        angular: 'vendor/angular',
        angularRoute: 'vendor/angular-route',
        jquery: 'vendor/jquery',
        iscroll: 'vendor/iscroll-lite',
        qrcode: 'vendor/qrcode.min',
        jqprint: 'vendor/jquery.jqprint-0.3',
        migrate: 'vendor/jquery-migrate-1.2.1.min',
        confirm: 'vendor/confirm',
        touchslider: 'vendor/jquery.touchslider.min',
        twitter: 'vendor/bootstrap',
        bootstrap: 'vendor/bootstrap3.3.4',
        jqueryMobile: 'vendor/jquery.mobile-1.4.5',
        domReady: 'vendor/domReady'

    },
    shim: {
        jquery: {
            exports: 'jquery'
        },
        touchslider: {
            deps: ['jquery'],
            exports: 'touchslider'
        },
        iscroll: {
            deps: ['jquery'],
            exports: 'iscroll'
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
        jqueryMobile: {
            deps: ['jquery'],
            exports: 'jqueryMobile'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'bootstrap'
        },
        angular: {
            deps: ['jquery'],
            exports: 'angular'
        }, angularRoute: {
            deps: ['angular'],
            exports: 'angularRoute'
        }
    }
    //deps:['bootstrap'],//�ȼ���bootstrap�ļ�
    /* urlArgs: "bust=" + (new Date()).getTime()  //��ֹ��ȡ���棬������*/
});
//
require([
        'angular', 'angularRoute',
        'app', 'domReady', 'jquery', "iscroll", "touchslider", 'qrcode', 'confirm', 'jqprint', 'migrate',
        'filters/intervalFilters',
        'controllers/userController',
        'controllers/printController',
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
                /*      $routeProvider.when('/', {
                 templateUrl: 'views/roo.html',
                 controller: 'IndexCtrl'
                 }).otherwise({
                 redirectTo: '/'
                 });*/
                /*  $routeProvider.when('/detail/:id', {
                 templateUrl: 'detailInfo.html'
                 /!*controller: 'IndexCtrl'*!/
                 }).otherwise({
                 redirectTo: '/'
                 });*/
            }
        ]);

        domReady(function () {
            angular.bootstrap(document, ['zhwApp']);
            // The following is required if you want AngularJS Scenario tests to work
            $('html').addClass('ng-app: zhwApp');
        });
    }
);
