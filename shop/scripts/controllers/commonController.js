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
                    window.location.href = "login.html";
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
                    commonService.deleteDataByStorage("hair-sessionId");
                    window.location.href = "login.html";
                };

                //wrok登出
                $scope.onWorkLogout = function () {
                    workService.userLogout();
                    commonService.delCookie("hair-sessionId");
                    window.location.href = "../login.html";
                };
                //初始化生成二维码
                $scope.qrcode = new QRCode(document.getElementById("qrcode"), {
                    text: "http://aiyunzhou.com/",
                    width: 300,
                    height: 300,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.H
                });
                $scope.onPrint = function () {
                    $("#qrcode-member").jqprint({
                        debug: false, //如果是true则可以显示iframe查看效果（iframe默认高和宽都很小，可以再源码中调大），默认是false
                        importCSS: true, //true表示引进原来的页面的css，默认是true。（如果是true，先会找$("link[media=print]")，若没有会去找$("link")中的css文件）
                        printContainer: true, //表示如果原来选择的对象必须被纳入打印（注意：设置为false可能会打破你的CSS规则）。
                        operaSupport: true//表示如果插件也必须支持歌opera浏览器，在这种情况下，它提供了建立一个临时的打印选项卡。默认是true
                    });
                }
                $scope.onQrcodeShow = function () {
                    var promise = userService.queryCompanyInfo();
                    promise.then(function (data) {
                        if (data.state != 1) {
                            return;
                        }
                        if (data.value.qrcode != null) {
                            $scope.qrcode.makeCode(data.value.qrcode);
                            $("#qrcode-member").modal('show');
                        }
                    });

                }


            }]);
    });

