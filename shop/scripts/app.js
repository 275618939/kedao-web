// The app/scripts/app.js file, which defines our AngularJS app
define(['angular', 'angularRoute', 'controllers/controllers',
    'services/services', 'interceptors/interceptors', 'filters/filters',
    'directives/directives'], function (angular) {
    return angular.module('zhwApp', ['ngRoute', 'controllers', 'services', 'interceptors',
        'filters', 'directives']);
});
