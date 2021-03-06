define(['controllers/controllers', 'services/staffService', 'services/commonService', 'services/paramService'],
    function (controllers) {
        //员工信息
        controllers.controller('StaffManagerCtrl', ['$scope', 'StaffService', 'CommonService', 'ParamService',
            function ($scope, staffService, commonService, paramService) {

                $scope.powers = commonService.powerInfo.powerOptions;
                $scope.powerInfo = commonService.defaultPower;
                $scope.onCreateClose = function () {
                    $("#add-staff").modal('hide');
                }
                $scope.onUpdateShow = function () {
                    $("#update-staff").modal('show');
                }
                $scope.onUpdateClose = function () {
                    $("#update-staff").modal('hide');
                }
                //创建员工信息
                $scope.onCreate = function () {
                    var name = $("#name").val();
                    var phone = $("#phone").val();
                    var grade = $("#grade").val();
                    var password = $("#password").val();
                    var checkPassword = $("#checkPassword").val();
                    if (name.trim() == "" || name == null) {
                        Ewin.alert("请输入店名！");
                        return;
                    }
                    if (isNaN(phone) || (phone.length != 11)) {
                        Ewin.alert("手机号码为11位数字！请正确填写！");
                        return;
                    }
                    if (!(/^1[0-9][0-9]\d{4,8}$/.test(phone))) {
                        $("#telephone").focus();
                        Ewin.alert("请输入正确的手机号!");
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
                    if (grade < 1 || grade > 100) {
                        Ewin.alert("员工职级范围是1～100！");
                        return;
                    }
                    var pass = phone + $.md5(phone + password);
                    pass = $.md5(pass);
                    var data = {
                        grade: grade,
                        cellNumber: phone,
                        name: name,
                        password: pass,
                        power: commonService.defaultClerkPower
                    };
                    var promise = staffService.staffCreate(data);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            Ewin.alert(data.desc)
                            return;
                        }
                        $scope.onCreateClose();
                        $scope.onQueryStaffInfo();
                    });
                };
                //选择权限
                $scope.selectPowerAction = function () {
                    //$scope.powerInfo;
                    //console.log($scope.powerInfo.id);
                };
                $scope.currentPage = 0;
                $scope.dataLen = -1;
                //更新员工信息
                $scope.onUpdateStaffQuery = function (data) {
                    $scope.onUpdateShow();
                    $("#updateName").val(data.name);
                    $("#updatePhone").val(data.cellNumber);
                    $("#staffId").val(data.id);
                    $("#updateGrade").val(data.grade);
                }
                //更新员工
                $scope.onUpdateStaff = function () {
                    var name = $("#updateName").val();
                    var phone = $("#updatePhone").val();
                    var staffId = $("#staffId").val();
                    var grade = $("#updateGrade").val();
                    if (name.trim() == "" || name == null) {
                        Ewin.alert("员工名称不能为空！");
                        return;
                    }
                    if (isNaN(phone) || (phone.length != 11)) {
                        Ewin.alert("手机号码为11位数字！请正确填写！");
                        return;
                    }
                    if (!(/^1[0-9][0-9]\d{4,8}$/.test(phone))) {
                        $("#phone").focus();
                        Ewin.alert("请输入正确的手机号!");
                        return;
                    }
                    if (grade < 1 || grade > 100) {
                        Ewin.alert("员工职级范围是1～100！");
                        return;
                    }
                    var data = {
                        grade: grade,
                        id: staffId,
                        power: commonService.defaultClerkPower,
                        cellNumber: phone,
                        name: name
                    };
                    Ewin.confirm({message: "确认要修改吗？"}).on(function (e) {
                        if (!e) {
                            return;
                        }
                        staffService.staffUpdate(data);
                        //关闭更新面板
                        $scope.onUpdateClose();
                        //刷新会员信息
                        $scope.onQueryStaffInfo();
                    });


                };

                //查询会员信息
                $scope.onQueryStaffInfo = function () {
                    var promise = staffService.getShopStaffList($scope.currentPage);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            $scope.staffItems = null;
                            return;
                        }
                        $scope.staffItems = data.value;
                        $scope.dataLen = $scope.staffItems.length;
                    });
                };
                $scope.onQueryStaffInfo();
                //翻页
                $scope.onNextPage = function () {
                    if ($scope.dataLen > 0) {
                        $scope.currentPage += 1;
                    }
                    $scope.onQueryStaffInfo();
                }
                $scope.onUpPage = function () {
                    $scope.currentPage -= 1;
                    if ($scope.currentPage <= 0) {
                        $scope.currentPage = 0;
                    }
                    $scope.onQueryStaffInfo();
                }


            }
        ]);


        /*显示员工详情信息*/
        controllers.controller('StaffDetailCtrl', ['$scope', 'StaffService', 'CommonService', 'ParamService',
            function ($scope, staffService, commonService, paramService) {
                $scope.id = paramService.getValue("id");
                $scope.shopId = paramService.getValue("shopId");
                $scope.name = paramService.getValue("name");
                $scope.cellNumber = paramService.getValue("cellNumber");
                $scope.powers = commonService.powerInfo.powerOptions;
                $scope.powerInfo = paramService.getValue("power");
                //更新员工
                $scope.onUpdate = function () {
                    //店名
                    var name = $("#name").val();
                    //电话信息
                    var telephone = $("#telephone").val();
                    if (name.trim() == "" || name == null) {
                        Ewin.alert("请输入店名！");
                        return;
                    }

                    if (isNaN(telephone) || (telephone.length != 11)) {
                        Ewin.alert("手机号码为11位数字！请正确填写！");
                        return;
                    }
                    var data = {
                        id: $scope.id,
                        name: name,
                        cellNumber: telephone,
                        shopId: $scope.shopId,
                        power: $scope.powerInfo
                    };
                    var promise = staffService.staffUpdate(data);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            Ewin.alert(data.desc)
                            return;
                        }
                        window.location.href = "hair-staff-list.html?shopId=" + $scope.shopId + "&query=true";
                    });
                };


            }]);


    });

