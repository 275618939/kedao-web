define(['controllers/controllers', 'services/workStaffService', 'services/commonService', 'services/paramService', 'services/shopService',],
    function (controllers) {
        //员工信息
        controllers.controller('StaffManagerCtrl', ['$scope', 'WorkStaffService', 'CommonService', 'ParamService', 'ShopService',
            function ($scope, staffService, commonService, paramService, shopService) {

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
                //初始化信息
                $scope.shopItemInfo = 0;
                $scope.queryShopInfo = function () {
                    var promise = shopService.getShopList(0);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            $scope.shopItems = null;
                            return;
                        }
                        $scope.shopItems = data.value;
                    });
                };
                $scope.queryShopInfo();
                $scope.selectShopInfo = function () {
                    $scope.onQueryStaffInfo();
                };
                //创建员工信息
                $scope.onCreate = function () {
                    var name = $("#name").val();
                    var phone = $("#phone").val();
                    var password = $("#password").val();
                    var checkPassword = $("#checkPassword").val();
                    if (name.trim() == "" || name == null) {
                        alert("请输入员工姓名！");
                        return;
                    }
                    if (isNaN(phone) || (phone.length != 11)) {
                        alert("手机号码为11位数字！请正确填写！");
                        return;
                    }
                    if (!(/^1[0-9][0-9]\d{4,8}$/.test(phone))) {
                        $("#telephone").focus();
                        alert("请输入正确的手机号!");
                        return;
                    }
                    if (password.trim() == "" || password == null) {
                        alert("请输入密码！");
                        return;
                    }
                    if (password != checkPassword) {
                        alert("两次密码输入不一致！");
                        return;
                    }
                    if ($scope.shopItemInfo == null || $scope.shopItemInfo == "undefined") {
                        alert("请选择一个店!");
                        return;
                    }
                    if ($scope.powerInfo == null || $scope.powerInfo == "undefined") {
                        alert("请选择员工权限！");
                        return;
                    }
                    var pass = phone + $.md5(phone + password);
                    pass = $.md5(pass);
                    var data = {
                        shopId: $scope.shopItemInfo,
                        cellNumber: phone,
                        name: name,
                        password: pass,
                        power: $scope.powerInfo
                    };
                    var promise = staffService.staffCreate(data);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            alert(data.desc)
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
                    /*         $("#updatePhone").val(data.cellNumber);*/
                    $("#staffId").val(data.id);
                }
                //更新员工
                $scope.onUpdateStaff = function () {
                    var name = $("#updateName").val();
                    //var phone = $("#updatePhone").val();
                    var staffId = $("#staffId").val();
                    if (name.trim() == "" || name == null) {
                        alert("员工名称不能为空！");
                        return;
                    }
                    /*if (isNaN(phone) || (phone.length != 11)) {
                        alert("手机号码为11位数字！请正确填写！");
                        return;
                    }
                    if (!(/^1[0-9][0-9]\d{4,8}$/.test(phone))) {
                        $("#phone").focus();
                        alert("请输入正确的手机号!");
                        return;
                    }*/
                    if ($scope.shopItemInfo == null || $scope.shopItemInfo == "undefined") {
                        alert("请选择一个店!");
                        return;
                    }
                    if ($scope.powerInfo == null || $scope.powerInfo == "undefined") {
                        alert("请选择店员权限!");
                        return;
                    }
                    var data = {
                        id: staffId,
                        shopId: $scope.shopItemInfo,
                        power: $scope.powerInfo,
                        name: name
                    };
                    staffService.staffUpdate(data);
                    //关闭更新面板
                    $scope.onUpdateClose();
                    //刷新会员信息
                    $scope.onQueryStaffInfo();

                };

                //查询会员信息
                $scope.onQueryStaffInfo = function () {
                    var promise = staffService.getShopStaffList($scope.shopItemInfo, $scope.currentPage);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            $scope.staffItems = null;
                            return;
                        }
                        $scope.staffItems = data.value;
                        $scope.dataLen = $scope.staffItems.length;
                    });
                };
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


    });

