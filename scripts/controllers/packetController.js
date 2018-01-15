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
                        discount: commonService.getDiscount(discount),
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
        controllers.controller('PacketListCtrl', ['$scope', 'PacketService',
            function ($scope, packetService) {

                $scope.totalItems = 64;
                $scope.currentPage = 4;
                $scope.currentPage = 0;
                $scope.dataLen = -1;
                $scope.load = function () {
                    var promise = packetService.getPacketList($scope.currentPage);
                    promise.then(function (data) {
                        $scope.packetItems = data.value;
                    });
                };
                $scope.load();

                /* $scope.$watch('$packet-list', function () {
                 $('#packet-list').DataTable({
                 'paging': true,
                 'lengthChange': false,
                 'searching': false,
                 'ordering': true,
                 'info': true,
                 'autoWidth': false,
                 "emptyTable": "没有数据",
                 "processing": true,
                 "info": "数据 _START_ to _END_ of _TOTAL_",
                 "infoEmpty": "总数 0 第 0 到 0 页",
                 "columns": [
                 {"data": "name"},
                 {"data": "discount"},
                 {"data": "money"},
                 {"data": "given"},
                 {"data": "retain"}
                 ],
                 "language": {
                 "paginate": {
                 "last": "第一页",
                 "previous": "上一页",
                 "next": "下一页"

                 }
                 },
                 "data": $scope.packetItems,
                 //当处理大数据时，延迟渲染数据，有效提高Datatables处理能力
                 "deferRender": true,
                 "initComplete": function () {
                 $scope.load();
                 }
                 });
                 });*/


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

