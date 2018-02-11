define(['controllers/controllers', 'services/commonService', 'services/userService', 'services/workService'],
    function (controllers) {
        controllers.controller('CommonCtrl', ['$scope', 'CommonService', 'UserService', 'WorkService',
            function ($scope, commonService, userService, workService) {
                //返回到上一步
                $scope.goBack = function () {
                    window.history.back();
                };
                $scope.refresh = function () {
                    window.location.reload();
                };
                $scope.goLogin = function () {
                    window.location.href = "login.html";
                };
                $scope.goWorkLogin = function () {
                    window.location.href = "work-login.html";
                };
                $scope.goUser = function () {
                    window.location.href = "users.html";
                };
                $scope.goIndex = function () {
                    var userId = commonService.getCookie("sys_userId");
                    var userName = commonService.getCookie("sys_userName");
                    window.location.href = "http://" + commonService.getServerUrl() + "/app/entry?uid=" + userId + "&name=" + userName;
                };
                //登出
                $scope.onLogout = function () {
                    userService.userLogout();
                    commonService.delCookie("hair-sessionId");
                    window.location.href = "login.html";
                };

                //wrok登出
                $scope.onWorkLogout = function () {
                    workService.userLogout();
                    commonService.delCookie("hair-sessionId");
                    window.location.href = "../login.html";
                };


            }]);
    });

