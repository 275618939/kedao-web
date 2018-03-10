define(['controllers', 'services/shopService', 'services/paramService'],
    function (controllers) {
        /*店信息管理*/
        controllers.controller('ShopManagerCtrl', ['$scope', 'ShopService', 'ParamService',
            function ($scope, shopService, paramService) {


                $scope.onShopShow = function () {
                    $("#add-shop").modal('show');
                }
                $scope.onShopClose = function () {
                    $("#add-shop").modal('hide');
                }
                $scope.onUpdateShow = function () {
                    $("#update-shop").modal('show');
                }
                $scope.onUpdateClose = function () {
                    $("#update-shop").modal('hide');
                }
                $scope.addShop = paramService.getValue("addShop");
                $scope.query = paramService.getValue("query");
                $scope.currentPage = 0;
                $scope.dataLen = -1;
                if (null != $scope.query && $scope.query == true) {
                    $scope.load();
                }
                if ($scope.addShop == true) {
                    //添加店
                    $scope.onShopShow();

                }
                $scope.load = function () {
                    var promise = shopService.getShopList($scope.currentPage);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            $scope.shopItems = null;
                            return;
                        }
                        $scope.shopItems = data.value;
                        $scope.dataLen = $scope.shopItems.length;
                    });
                };
                $scope.load();
                //翻页
                $scope.onNextPage = function () {
                    if ($scope.dataLen > 0) {
                        $scope.currentPage += 1;
                    }
                    $scope.load();
                }
                $scope.onUpPage = function () {
                    $scope.currentPage -= 1;
                    if ($scope.currentPage <= 0) {
                        $scope.currentPage = 0;
                    }
                    $scope.load();
                }

                //新增店面
                $scope.onCreate = function () {
                    //店名
                    var name = $("#name").val();
                    //店描述信息
                    var description = $("#description").val();
                    //店地址信息
                    var address = $("#address").val();
                    //电话信息
                    var telephone = $("#telephone").val();
                    if (name.trim() == "" || name == null) {
                        alert("请输入店名！");
                        return;
                    }
                    if (address.trim() == "" || address == null) {
                        alert("请输入店地址信息！");
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
                        id: $scope.shopId,
                        name: name,
                        description: description,
                        address: address,
                        telephone: telephone
                    };
                    var promise = shopService.shopCreate(data);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            alert(data.desc)
                            return;
                        }
                        //用户第一次添加店
                        if ($scope.addShop == true) {

                        }
                        $scope.onShopClose();
                        $scope.load();

                    });
                };
                //更新服务信息
                $scope.onUpdateQuery = function (data) {
                    $scope.onUpdateShow();
                    $("#updateName").val(data.name);
                    $("#updateDescription").val(data.description);
                    $("#updateAddress").val(data.address);
                    $("#updateTelephone").val(data.telephone);
                    $("#shopId").val(data.id);
                }

                //更新店面
                $scope.onUpdate = function () {
                    //店名
                    var name = $("#updateName").val();
                    //店描述信息
                    var description = $("#updateDescription").val();
                    //店地址信息
                    var address = $("#updateAddress").val();
                    //电话信息
                    var telephone = $("#updateTelephone").val();
                    var shopId = $("#shopId").val();
                    if (shopId.trim() == "" || shopId == null) {
                        alert("请选择一个店");
                        return;
                    }
                    if (name.trim() == "" || name == null) {
                        alert("请输入店名！");
                        return;
                    }
                    if (address.trim() == "" || address == null) {
                        alert("请输入店地址信息！");
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
                        id: shopId,
                        name: name,
                        description: description,
                        address: address,
                        telephone: telephone
                    };
                    Ewin.confirm({message: "确认要修改吗？"}).on(function (e) {
                        if (!e) {
                            return;
                        }
                        var promise = shopService.shopUpdate(data);
                        promise.then(function (data) {
                            if (data.state != 1) {
                                alert(data.desc)
                                return;
                            }
                            $scope.onUpdateClose();
                            $scope.load();

                        });
                    });

                };


            }
        ])
        ;


    });

