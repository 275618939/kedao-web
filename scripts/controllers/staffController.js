define(['controllers/controllers', 'services/staffService', 'services/commonService', 'services/paramService'],
    function (controllers) {
        //创建员工信息
        controllers.controller('StaffCreateCtrl', ['$scope', 'StaffService', 'CommonService', 'ParamService',
            function ($scope, staffService, commonService, paramService) {

                $scope.shopId = paramService.getValue("shopId");
                if ($scope.shopId == null || $scope.shopId.trim().length <= 0 || $scope.shopId == "undefined") {
                    alert("请先选择店");
                    window.location.href = "hair-shop-list.html";
                    return
                }
                $scope.powers = commonService.powerInfo.powerOptions;
                $scope.powerInfo = commonService.defaultPower;
                //创建员工信息
                $scope.onCreate = function () {
                    //店名
                    var name = $("#name").val();
                    //电话信息
                    var telephone = $("#telephone").val();
                    if (name.trim() == "" || name == null) {
                        alert("请输入店名！");
                        return;
                    }
                    if (isNaN(telephone) || (telephone.length != 11)) {
                        alert("手机号码为11位数字！请正确填写！");
                        return;
                    }
                    //发送请求道服务端
                    if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(telephone))) {
                        $("#telephone").focus();
                        alert("请输入正确的手机号!");
                        return;
                    }
                    var data = {name: name, cellNumber: telephone, shopId: $scope.shopId, power: $scope.powerInfo};
                    var promise = staffService.staffCreate(data);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            alert(data.desc)
                            return;
                        }
                        window.location.href = "hair-staff-list.html?shopId=" + $scope.shopId + "&query=true";
                    });
                };
                //选择权限
                $scope.selectPowerAction = function () {
                    //$scope.powerInfo;
                    //console.log($scope.powerInfo.id);
                };


            }
        ]);
        /*加载员工信息*/
        controllers.controller('StaffListCtrl', ['$scope', 'StaffService', 'ParamService',
            function ($scope, staffService, paramService) {
                $scope.shopId = paramService.getValue("shopId");
                $scope.query = paramService.getValue("query");
                if (null != $scope.query && $scope.query == true) {
                    $scope.load();
                }
                $scope.currentPage = 0;
                $scope.dataLen = -1;
                $scope.load = function () {
                    var promise = staffService.getStaffList($scope.shopId, $scope.currentPage);
                    promise.then(function (data) {
                        $scope.staffItems = data.value;
                    });
                };
                $scope.load();
                $(window).scroll(function () {
                    var bot = 50; //bot是底部距离的高度
                    if ((bot + $(window).scrollTop()) >= ($(document).height() - $(window).height())) {
                        $scope.currentPage += 1;
                        if ($scope.dataLen <= 0) {
                            $scope.currentPage -= 1;
                            return;
                        }
                        $scope.load();
                    }
                });

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
                        alert("请输入店名！");
                        return;
                    }

                    if (isNaN(telephone) || (telephone.length != 11)) {
                        alert("手机号码为11位数字！请正确填写！");
                        return;
                    }
                    //发送请求道服务端
                    if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(telephone))) {
                        $("#telephone").focus();
                        alert("请输入正确的手机号!");
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
                            alert(data.desc)
                            return;
                        }
                        window.location.href = "hair-staff-list.html?shopId=" + $scope.shopId + "&query=true";
                    });
                };


            }]);


    });

