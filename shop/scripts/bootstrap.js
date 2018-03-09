define(['angular', 'domReady','require','app'], function(angular, domReady) {
    domReady(function() {
        angular.bootstrap(document, ['zhwApp']);
    });
});