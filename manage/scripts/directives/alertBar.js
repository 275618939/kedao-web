define(['directives'], function(directives) {
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
          //ͬʱ����󶨱����ϵĴ�����Ϣ��
          //������֮�󣬵�ͬ���Ĵ����ٴγ���ʱ��alert bar���ٴ���ʾ������
          $parse(alertMessageAttr).assign(scope, null);
        };
      }
    };
  }]);
});
