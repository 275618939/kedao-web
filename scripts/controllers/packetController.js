define(['controllers/controllers', 'services/packetService', 'services/commonService', 'services/paramService'],
    function (controllers) {
        //创建套餐信息
        controllers.controller('PacketCreateCtrl', ['$scope', 'PacketService', 'CommonService', 'ParamService',
            function ($scope, packetService, commonService, paramService) {

                //创建套餐信息
                $scope.onCreate = function () {
                    var name = $("#name").val();
                    var discount = $("#discount").val();
                    var money = $("#money").val();
                    var given = $("#given").val();
                    var retain = $("#retain").val();
                    if (name.trim() == "" || name == null) {
                        alert("请输入套餐名！");
                        return;
                    }
                    if (isNaN(discount) || discount > 10 || discount < 0) {
                        alert("请输入正确的折扣！");
                        return;
                    }
                    if (isNaN(money)) {
                        money = 0;
                    }
                    if (isNaN(given)) {
                        given = 0;
                    }
                    if (isNaN(retain) || retain == null || retain.trim().length <= 0) {
                        retain = 0;
                    }
                    var data = {
                        name: name,
                        discount:commonService.getDiscount(discount),
                        money: commonService.getFen(money),
                        given: commonService.getFen(given),
                        retain: commonService.getFen(retain)
                    };
                    var promise = packetService.packetCreate(data);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            alert(data.desc)
                            return;
                        }
                        window.location.href = "hair-packet-list.html?query=true";
                    });
                };
                //选择权限
                $scope.selectPowerAction = function () {
                    //$scope.powerInfo;
                    //console.log($scope.powerInfo.id);
                };


            }
        ]);
        /*加载套餐信息*/
        controllers.controller('PacketListCtrl', ['$scope', 'PacketService', 'ParamService',
            function ($scope, packetService, paramService) {
                $scope.query = paramService.getValue("query");
                if (null != $scope.query && $scope.query == true) {
                    $scope.load();
                }
                $scope.currentPage = 0;
                $scope.dataLen = -1;
                $scope.load = function () {
                    var promise = packetService.getPacketList($scope.currentPage);
                    promise.then(function (data) {
                        $scope.packetItems = data.value;
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

        /*显示套餐详情信息*/
        controllers.controller('StaffDetailCtrl', ['$scope', 'PacketService', 'CommonService', 'ParamService',
            function ($scope, packetService, commonService, paramService) {
                $scope.id = paramService.getValue("id");
                $scope.name = paramService.getValue("name");
                $scope.discount = paramService.getValue("discount");
                $scope.money = paramService.getValue("money");
                $scope.given = paramService.getValue("given");
                $scope.retain = paramService.getValue("retain");
                //更新套餐
                $scope.onUpdate = function () {
                    var name = $("#name").val();
                    var discount = $("#discount").val();
                    var money = $("#money").val();
                    var given = $("#given").val();
                    var retain = $("#retain").val();
                    if (name.trim() == "" || name == null) {
                        alert("请输入套餐名！");
                        return;
                    }
                    if (isNaN(discount) || discount > 10 || discount < 0) {
                        alert("请输入正确的折扣！");
                        return;
                    }
                    if (isNaN(money)) {
                        money = 0;
                    }
                    if (isNaN(given)) {
                        given = 0;
                    }
                    if (isNaN(discount) || discount > 100 || discount < 0) {
                        alert("请输入正确的提成！");
                        return;
                    }

                    if (isNaN(retain) || retain == null || retain.trim().length <= 0) {
                        retain = 0;
                    }
                    var data = {
                        id: $scope.id,
                        name: name,
                        discount: commonService.getDiscount(discount),
                        money: commonService.getFen(money),
                        given: parseInt(commonService.getFen(given)),
                        retain: parseInt(commonService.getFen(retain))
                    };
                    var promise = packetService.packetUpdate(data);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            alert(data.desc)
                            return;
                        }
                        window.location.href = "hair-packet-list.html?query=true";
                    });
                };


            }]);


    });

