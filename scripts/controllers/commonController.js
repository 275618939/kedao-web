define(['controllers/controllers','services/commonService'],
  function(controllers) {
    controllers.controller('CommonCtrl', ['$scope', 'CommonService',
      function($scope,commonService) {

          //返回到上一步
          $scope.goBack =function(){
              window.history.back();
          };
          $scope.refresh =function(){
              window.location.reload();
          };
          $scope.goLogin =function(){
              window.location.href="login.html";
          };
          $scope.goUser =function(){
              window.location.href="users.html";
          };
          $scope.goIndex =function(){
              var userId= commonService.getCookie("sys_userId");
              var userName= commonService.getCookie("sys_userName");
              window.location.href="http://"+commonService.getServerUrl()+"/app/entry?uid="+userId+"&name="+userName;
          };

    }]);
});

