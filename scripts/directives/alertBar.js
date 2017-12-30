define(['directives/directives'], function(directives) {
  directives.directive('alertBar', ['$parse', function(parse) {
    return {
      restrict: 'A',
      template : '<div class="alert alert-error alert-bar"' +
      'ng-show="errorMessage">' +
      '<button type="button" class="close" ng-click="hideAlert()">' +
      'x</button>' +
      '{{errorMessage}}</div>',
      link: function(scope, elem, attrs) {
        var alertMessageAttr = attrs['alertmessage'];
        scope.errorMessage = null;

        scope.$watch(alertMessageAttr, function(newVal){
          scope.errorMessage = newVal;
        });
        scope.hideAlert = function() {
          scope.errorMessage = null;
          //同时清除绑定变量上的错误信息。
          //这样做之后，当同样的错误再次出现时，alert bar会再次显示出来。
          $parse(alertMessageAttr).assign(scope, null);
        };
      }
    };
  }]);
});
