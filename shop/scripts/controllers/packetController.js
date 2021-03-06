define(['controllers/controllers', 'services/packetService', 'services/commonService', 'services/paramService'],
    function (controllers) {

        /*会员卡信息管理*/
        controllers.controller('PacketManagerCtrl', ['$scope', 'PacketService', 'CommonService',
            function ($scope, packetService, commonService) {
                $scope.create = {"show": true};
                $scope.update = {"show": false};
                $scope.title = "新增会员卡";
                //关闭会员卡信息
                $scope.onClose = function () {
                    $("#packet-add").modal('hide');
                }
                $scope.onShow = function () {
                    $("#packet-add").modal('show');
                }

                $scope.onUpdateShow = function () {
                    $("#packet-update").modal('show');
                }
                $scope.onUpdateClose = function () {
                    $("#packet-update").modal('hide');
                }
                //查询会员卡信息
                $scope.load = function () {
                    var promise = packetService.getPacketList($scope.currentPage);
                    promise.then(function (data) {
                        $scope.packetItems = data.value;
                    });
                };
                $scope.load();
                //创建会员卡信息
                $scope.onCreate = function () {
                    $scope.create = {"show": true};
                    $scope.update = {"show": false};
                    var name = $("#name").val();
                    var discount = $("#discount").val();
                    var money = $("#money").val();
                    var given = $("#given").val();
                    var majorRetain = $("#majorRetain").val();
                    var minorRetain = $("#minorRetain").val();
                    if (name.trim() == "" || name == null) {
                        Ewin.alert("请输入会员卡名！");
                        return;
                    }
                    if (isNaN(discount) || discount > 10 || discount < 0) {
                        Ewin.alert("请输入正确的折扣！");
                        return;
                    }
                    if (isNaN(money)) {
                        money = 0;
                    }
                    if (isNaN(given)) {
                        given = 0;
                    }
                    if (isNaN(majorRetain) || majorRetain == null) {
                        majorRetain = 0;
                    }
                    if (isNaN(minorRetain) || minorRetain == null) {
                        minorRetain = 0;
                    }
                    var data = {
                        name: name,
                        discount: commonService.getDiscount(discount),
                        money: commonService.getFen(money),
                        given: commonService.getFen(given),
                        majorRetain: majorRetain,
                        minorRetain: minorRetain
                    };
                    var promise = packetService.packetCreate(data);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            Ewin.alert(data.desc)
                            return;
                        }
                        //关闭添加面板
                        $scope.onClose();
                        //todo 脏数据更新
                        window.location.href = "packet.html";
                    });
                };
                //更新会员卡信息
                $scope.onUpdateQuery = function (data) {
                    $scope.onUpdateShow();
                    $("#packetName").val(data.name);
                    $("#packetDiscount").val(commonService.getDiscountConvert(data.discount));
                    $("#packetMoney").val(commonService.getYuan(data.money));
                    $("#packetGiven").val(commonService.getYuan(data.given));
                    $("#packetMajorRetain").val(data.majorRetain);
                    $("#packetMinorRetain").val(data.minorRetain);
                    $("#packetId").val(data.id);
                }
                //更新会员卡
                $scope.onUpdate = function (data) {
                    var name = $("#packetName").val();
                    var discount = $("#packetDiscount").val();
                    var money = $("#packetMoney").val();
                    var given = $("#packetGiven").val();
                    var packetMajorRetain = $("#packetMajorRetain").val();
                    var packetMinorRetain = $("#packetMinorRetain").val();
                    var packetId = $("#packetId").val();
                    if (packetId == null) {
                        Ewin.alert("请选择一个会员卡！");
                        return;
                    }
                    if (name.trim() == "" || name == null) {
                        Ewin.alert("请输入会员卡名！");
                        return;
                    }
                    if (isNaN(discount) || discount > 10 || discount < 0) {
                        Ewin.alert("请输入正确的折扣！");
                        return;
                    }
                    if (isNaN(money)) {
                        money = 0;
                    }
                    if (isNaN(given)) {
                        given = 0;
                    }
                    if (isNaN(discount) || discount > 100 || discount < 0) {
                        Ewin.alert("请输入正确的提成！");
                        return;
                    }
                    if (isNaN(packetMajorRetain) || packetMajorRetain == null) {
                        packetMajorRetain = 0;
                    }
                    if (isNaN(packetMinorRetain) || packetMinorRetain == null) {
                        packetMinorRetain = 0;
                    }
                    var info = {
                        id: packetId,
                        name: name,
                        discount: commonService.getDiscount(discount),
                        money: commonService.getFen(money),
                        given: parseInt(commonService.getFen(given)),
                        majorRetain: packetMajorRetain,
                        minorRetain: packetMinorRetain
                    };
                    Ewin.confirm({message: "确认要修改吗？"}).on(function (e) {
                        if (!e) {
                            return;
                        }
                        var promise = packetService.packetUpdate(info);
                        promise.then(function (data) {
                            if (data.state != 1) {
                                Ewin.alert(data.desc)
                                return;
                            }
                            window.location.href = "packet.html";
                        });
                    });

                };


                /*
                 $scope.totalItems = 64;
                 $scope.currentPage = 4;
                 $scope.currentPage = 0;
                 $scope.dataLen = -1;
                 $scope.$watch('$packet-list', function () {
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

        /*显示会员卡详情信息*/
        controllers.controller('StaffDetailCtrl', ['$scope', 'PacketService', 'CommonService', 'ParamService',
            function ($scope, packetService, commonService, paramService) {
                $scope.id = paramService.getValue("id");
                $scope.name = paramService.getValue("name");
                $scope.discount = paramService.getValue("discount");
                $scope.money = paramService.getValue("money");
                $scope.given = paramService.getValue("given");
                $scope.retain = paramService.getValue("retain");
                //更新会员卡
                $scope.onUpdate = function () {
                    var name = $("#name").val();
                    var discount = $("#discount").val();
                    var money = $("#money").val();
                    var given = $("#given").val();
                    var retain = $("#retain").val();
                    if (name.trim() == "" || name == null) {
                        Ewin.alert("请输入会员卡名！");
                        return;
                    }
                    if (isNaN(discount) || discount > 10 || discount < 0) {
                        Ewin.alert("请输入正确的折扣！");
                        return;
                    }
                    if (isNaN(money)) {
                        money = 0;
                    }
                    if (isNaN(given)) {
                        given = 0;
                    }
                    if (isNaN(discount) || discount > 100 || discount < 0) {
                        Ewin.alert("请输入正确的提成！");
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
                            Ewin.alert(data.desc)
                            return;
                        }
                        window.location.href = "hair-packet-list.html?query=true";
                    });
                };


            }]);


    });

