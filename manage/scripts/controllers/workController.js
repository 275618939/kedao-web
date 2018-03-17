define(['controllers', 'services/workService', 'services/commonService', 'services/paramService'],
    function (controllers) {
        /*用户注册*/
        controllers.controller('RegisterCtrl', ['$scope', 'WorkService', 'CommonService',
            function ($scope, workService, commonService) {
                $scope.InterValObj; // timer变量，控制时间
                $scope.curCount = 0;	  // 当前剩余秒数
                $scope.count = 30;     // 倒计时长度
                $scope.codeLength = 6;// 验证码长度
                //注册
                $scope.onRegister = function () {
                    var phone = $("#phone").val();
                    var identifying = $("#identifying").val();
                    var password = $("#password").val();
                    if (isNaN(phone) || (phone.length != 11)) {
                        Ewin.alert("手机号码为11位数字！请正确填写！");
                        return;
                    }
                    if (!(/^1[0-9][0-9]\d{4,8}$/.test(phone))) {
                        $("#phone").focus();
                        Ewin.alert("请输入正确的手机号!");
                        return;
                    }
                    if (identifying.trim() == "" || identifying == null) {
                        Ewin.alert("请输入验证码！");
                        return;
                    }
                    if (password.trim() == "" || password == null) {
                        Ewin.alert("请输入密码！");
                        return;
                    }
                    //构造加密参数
                    var pass = $.md5(phone + password);
                    var data = {account: phone, verify: identifying, password: pass};
                    var promise = workService.userCreate(data);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            Ewin.alert(data.desc)
                            return;
                        }
                        //成功后调转到店创建页，提示用户新增店信息
                        window.location.href = "login.html?first=true";
                    });
                };
                //发送验证码
                $scope.sendCaptcha = function () {
                    var phone = $("#phone").val();
                    if (isNaN(phone) || (phone.length != 11)) {
                        Ewin.alert("手机号码为11位数字！请正确填写！");
                        return;
                    }
                    //发送请求道服务端
                    if (!(/^1[0-9][0-9]\d{4,8}$/.test(phone))) {
                        /*    if (!(/^1[0-9][0-9]\d{4,8}$/.test(phone))) {*/
                        $("#phone").focus();
                        Ewin.alert("请输入正确的手机号!");
                        return;
                    }
                    var promise = workService.sendVerify(phone);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            Ewin.alert(data.desc)
                            return;
                        }
                    });
                    $scope.curCount = $scope.count;
                    $("#captcha").css("background", "#b2b2b2");
                    $("#captcha").attr("disabled", "true");
                    $("#captcha").text("剩余:" + $scope.count);
                    $scope.InterValObj = window.setInterval($scope.setRemainTime, 1000); // 启动计时器，1秒执行一次
                };
                // timer处理函数
                $scope.setRemainTime = function () {
                    if ($scope.curCount == 0) {
                        window.clearInterval($scope.InterValObj);// 停止计时器
                        $("#captcha").removeAttr("disabled");// 启用按钮
                        $("#captcha").text("重新发送");
                        $("#captcha").css("background", "#61beec");
                    } else {
                        $scope.curCount--;
                        $("#captcha").text("剩余:" + $scope.curCount);
                    }
                };

            }]);
        //用户登录
        controllers.controller('LoginCtrl', ['$scope', 'WorkService', 'CommonService', 'ParamService',
            function ($scope, workService, commonService, paramService) {
                $scope.showIdentifying = {"show": false};
                $scope.first = paramService.getValue("first");
                //返回到上一步
                $scope.goBack = function () {
                    window.history.back();
                };
                $scope.goLogin = function () {
                    window.location.href = "login.html";
                };
                //忘记密码
                $scope.onForgetPass = function () {
                    var phone = $("#phone").val();
                    var identifying = $("#identifying").val();
                    if (isNaN(phone) || (phone.length != 11)) {
                        Ewin.alert("手机号码为11位数字！请正确填写！");
                        return;
                    }
                    //发送请求道服务端
                    if (!(/^1[0-9][0-9]\d{4,8}$/.test(phone))) {
                        $("#phone").focus();
                        Ewin.alert("请输入正确的手机号!");
                        return;
                    }
                    //构造加密参数
                    var data = {account: phone, verify: identifying,};
                    var promise = workService.forgetPass(data);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            Ewin.alert(data.desc)
                            return;
                        }
                        //跳转至密码重置页
                        window.location.href = "work-pass-reset.html";
                    });
                };
                //获得图片验证码
                $scope.onImageVerify = function (rimage) {
                    $scope.showIdentifying = {"show": true};
                    var phone = $("#phone").val();
                    if (isNaN(phone) || (phone.length != 11)) {
                        $("#phone").focus();
                        return;
                    }
                    //发送请求道服务端
                    if (!(/^1[0-9][0-9]\d{4,8}$/.test(phone))) {
                        $("#phone").focus();
                        return;
                    }
                    if (rimage == null || rimage.trim() == "" || rimage == "undefined") {
                        //获取图片验证码
                        var promise = workService.getImageVerify(phone);
                        promise.then(function (data) {
                            if (data.state != 1) {
                                return;
                            }
                            $("#img-identify").attr("src", "data:image/png;base64," + data.value);
                        });

                    } else {
                        $("#img-identify").attr("src", "data:image/png;base64," + rimage);
                    }
                };
                $(document).keypress(function (e) {
                    // 回车键事件
                    if (e.which == 13) {
                        $scope.onLogin();
                    }
                });
                //登录
                $scope.onLogin = function () {
                    var phone = $("#phone").val();
                    var password = $("#password").val();
                    var identifying = $("#identifying").val();
                    if (isNaN(phone) || (phone.length != 11)) {
                        Ewin.alert("手机号码为11位数字！请正确填写！");
                        return;
                    }
                    //发送请求道服务端
                    if (!(/^1[0-9][0-9]\d{4,8}$/.test(phone))) {
                        $("#phone").focus();
                        Ewin.alert("请输入正确的手机号!");
                        return;
                    }
                    if (password.trim() == "" || password == null) {
                        Ewin.alert("请输入密码！");
                        return;
                    }
                    //构造加密参数
                    var pass = phone + $.md5(phone + password);
                    if (identifying != null && identifying.trim().length > 0 && identifying != "undefined") {
                        pass += identifying.trim();
                    }
                    pass = $.md5(pass);
                    var data = {account: phone, verify: identifying, password: pass};
                    var promise = workService.userLogin(data);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            Ewin.alert(data.desc);
                            if (data.state == 15 && data.value != null && data.value.trim() != "") {
                                //显示验证码，重新输入验证码
                                $scope.onImageVerify(data.value);
                            }
                            return;
                        }
                        commonService.addDataByStorage("hair-sessionId", data.value);
                        window.location.href = "shop.html?first=" + $scope.first;
                    });

                };
            }
        ]);
        //用户更新密码
        controllers.controller('UpdatePassCtrl', ['$scope', 'WorkService', 'CommonService',
            function ($scope, workService, commonService) {
                $scope.showIdentifying = {"show": false};
                //返回到上一步
                $scope.goBack = function () {
                    window.history.back();
                };
                $scope.goLogin = function () {
                    window.location.href = "login.html";
                };
                $scope.goWorkLogin = function () {
                    window.location.href = "login.html";
                };
                //获得图片验证码
                $scope.onImageVerify = function (rimage) {
                    $scope.showIdentifying = {"show": true};
                    var phone = $("#phone").val();
                    if (isNaN(phone) || (phone.length != 11)) {
                        $("#phone").focus();
                        return;
                    }
                    //发送请求道服务端
                    if (!(/^1[0-9][0-9]\d{4,8}$/.test(phone))) {
                        $("#phone").focus();
                        return;
                    }
                    if (rimage == null || rimage.trim() == "" || rimage == "undefined") {
                        //获取图片验证码
                        var promise = workService.getImageVerify(phone);
                        promise.then(function (data) {
                            if (data.state != 1) {
                                return;
                            }
                            $("#img-identify").attr("src", "data:image/png;base64," + data.value);
                        });

                    } else {
                        $("#img-identify").attr("src", "data:image/png;base64," + rimage);
                    }
                };
                //更新密码
                $scope.onSetPwd = function () {
                    var phone = $("#phone").val();
                    var nowPassword = $("#nowPassword").val();
                    var password = $("#password").val();
                    var checkPassword = $("#checkPassword").val();
                    var identifying = $("#identifying").val();
                    if (isNaN(phone) || (phone.length != 11)) {
                        Ewin.alert("手机号码为11位数字！请正确填写！");
                        return;
                    }
                    //发送请求道服务端
                    if (!(/^1[0-9][0-9]\d{4,8}$/.test(phone))) {
                        $("#phone").focus();
                        Ewin.alert("请输入正确的手机号!");
                        return;
                    }
                    if (nowPassword.trim() == "" || nowPassword == null) {
                        Ewin.alert("请输入当前密码！");
                        return;
                    }
                    if (password.trim() == "" || password == null) {
                        Ewin.alert("请输入密码！");
                        return;
                    }
                    if (password != checkPassword) {
                        Ewin.alert("两次密码输入不一致！");
                        return;
                    }
                    if (identifying.trim() == "" || identifying == null) {
                        Ewin.alert("请输入验证码！");
                        return;
                    }
                    //构造加密参数
                    var newPass = $.md5(phone + password);
                    var oldPass = $.md5(phone + password + identifying);
                    var data = {account: phone, verify: identifying, newpwd: newPass, oldpwd: oldPass};
                    var promise = workService.setPass(data);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            Ewin.alert(data.desc)
                            if (data.state == 15 && data.value != null && data.value.trim() != "") {
                                //显示验证码，重新输入验证码
                                $scope.onImageVerify(data.value);
                            } else {
                                $scope.onImageVerify(null);
                            }
                            return;
                        }
                        window.history.back();
                    });

                };
                //重置密码
                $scope.onReSetPwd = function () {
                    var phone = $("#phone").val();
                    var password = $("#password").val();
                    var identifying = $("#identifying").val();
                    if (isNaN(phone) || (phone.length != 11)) {
                        Ewin.alert("手机号码为11位数字！请正确填写！");
                        return;
                    }
                    //发送请求道服务端
                    if (!(/^1[0-9][0-9]\d{4,8}$/.test(phone))) {
                        $("#phone").focus();
                        Ewin.alert("请输入正确的手机号!");
                        return;
                    }
                    if (password.trim() == "" || password == null) {
                        Ewin.alert("请输入密码！");
                        return;
                    }
                    if (identifying.trim() == "" || identifying == null) {
                        Ewin.alert("请输入验证码！");
                        return;
                    }
                    //构造加密参数
                    var newPass = $.md5(phone + password);
                    var data = {account: phone, verify: identifying, newpwd: newPass};
                    var promise = workService.resetPass(data);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            Ewin.alert(data.desc)
                            return;
                        }
                        window.location.href = "login.html";
                    });

                };
            }
        ]);


    });

