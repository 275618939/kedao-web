define(['controllers/controllers', 'services/productService', 'services/commonService', 'services/paramService'],
    function (controllers) {

        /*服务信息管理*/
        controllers.controller('ProductManagerCtrl', ['$scope', 'ProductService', 'CommonService',
            function ($scope, productService, commonService) {

                $scope.onClassShow = function () {
                    $("#add-service-type").modal('show');
                }
                //关闭服务类别信息
                $scope.onServiceClose = function () {
                    $("#add-service-type").modal('hide');
                }
                $scope.onProductClose = function () {
                    $("#add-service-info").modal('hide');
                }
                $scope.onUpdateShow = function () {
                    $("#update-service-info").modal('show');
                }
                $scope.onUpdateClose = function () {
                    $("#update-service-info").modal('hide');
                }
                //查询服务信息
                $scope.classItemInfo = 0;
                $scope.loadService = function () {
                    var promise = productService.queryClassfyInfo();
                    promise.then(function (data) {
                        $scope.classItems = data.value;
                        //增加添加服务选项
                        var addServiceItem = {id: 99, name: "点击添加服务类别"};
                        $scope.classItems.push(addServiceItem);
                    });
                };
                $scope.loadService();
                //查询产品信息
                $scope.productItemInfo = 0;
                $scope.selectClassfyInfo = function () {
                    if ($scope.classItemInfo == 99) {
                        $scope.onClassShow();
                        return;
                    }
                    var promise = productService.queryProductInfo($scope.classItemInfo);
                    promise.then(function (data) {
                        $scope.productItems = data.value;
                    });
                };
                //创建服务信息
                $scope.onProductCreate = function () {
                    var name = $("#productName").val();
                    var price = $("#productPrice").val();
                    var retain = $("#productRetain").val();
                    if (null == $scope.classItemInfo || $scope.classItemInfo == "undefined") {
                         Ewin.alert("请选择一个服务类别!");
                        return;
                    }
                    if (name.trim() == "" || name == null) {
                         Ewin.alert("请输入会员卡名！");
                        return;
                    }
                    if (isNaN(price) || price == null || price <= 0) {
                         Ewin.alert("请输入正确的价格！");
                        return;
                    }
                    if (isNaN(retain) || retain == null || retain < 0) {
                        retain = 0;
                    }
                    var data = {
                        classifyId: $scope.classItemInfo,
                        name: name,
                        price: commonService.getFen(price),
                        retain: commonService.getFen(retain)
                    };
                    var promise = productService.productCreate(data);
                    promise.then(function (data) {
                        if (data.state != 1) {
                             Ewin.alert(data.desc)
                            return;
                        }
                        //关闭添加面板
                        $scope.onProductClose();
                        //刷新服务信息
                        $scope.selectClassfyInfo();
                    });
                };
                //创建服务类别信息
                $scope.onClassCreate = function () {
                    var name = $("#className").val();
                    if (name.trim() == "" || name == null) {
                         Ewin.alert("请输入服务类别名称！");
                        return;
                    }
                    var data = {
                        name: name
                    };
                    var promise = productService.classfyCreate(data);
                    promise.then(function (data) {
                        if (data.state != 1) {
                             Ewin.alert(data.desc)
                            return;
                        }
                        //关闭添加面板
                        $scope.onServiceClose();
                        //刷新服务类别
                        $scope.loadService();
                    });
                };
                //更新服务信息
                $scope.onUpdateProductQuery = function (data) {
                    $scope.onUpdateShow();
                    $("#updateProductName").val(data.name);
                    $("#updateProductPrice").val(commonService.getYuan(data.price));
                    $("#updateProductRetain").val(commonService.getYuan(data.retain));
                    $("#productId").val(data.id);
                }
                //更新服务
                $scope.onProductUpdate = function () {
                    var name = $("#updateProductName").val();
                    var price = $("#updateProductPrice").val();
                    var retain = $("#updateProductRetain").val();
                    var productId = $("#productId").val();
                    if (productId == null) {
                         Ewin.alert("请选择一个服务！");
                        return;
                    }
                    if (name.trim() == "" || name == null) {
                         Ewin.alert("请输入会员卡名！");
                        return;
                    }
                    if (isNaN(price) || price == null || price <= 0) {
                         Ewin.alert("请输入正确的价格！");
                        return;
                    }
                    if (isNaN(retain) || retain == null || retain < 0) {
                        retain = 0;
                    }
                    var data = {
                        id: productId,
                        classifyId: $scope.classItemInfo,
                        name: name,
                        price: commonService.getFen(price),
                        retain: commonService.getFen(retain)
                    };
                    Ewin.confirm({message: "确认要修改吗？"}).on(function (e) {
                        if (!e) {
                            return;
                        }
                        var promise = productService.productUpdate(data);
                        promise.then(function (data) {
                            if (data.state != 1) {
                                 Ewin.alert(data.desc)
                                return;
                            }
                            //关闭更新面板
                            $scope.onUpdateClose();
                            //刷新服务信息
                            $scope.selectClassfyInfo();
                            //window.location.href = ".html";
                        });
                    });

                };
                //删除服务
                $scope.onProductDelete = function (data) {
                    Ewin.confirm({message: "确认要删除选择的数据吗？"}).on(function (e) {
                        if (!e) {
                            return;
                        }
                        // Ewin.alert("ok");
                        var data = {
                            id: data.id,
                            classifyId: data.classifyId
                        };
                        var promise = productService.productDelete(data);
                        promise.then(function (data) {
                            if (data.state != 1) {
                                 Ewin.alert(data.desc)
                                return;
                            }
                            //刷新服务信息
                            $scope.selectClassfyInfo();
                        });
                    });
                    /*  if (confirm("确定删除该服务吗?")) {
                     var data = {
                     id: data.id,
                     classifyId: data.classifyId
                     };
                     var promise = productService.productDelete(data);
                     promise.then(function (data) {
                     if (data.state != 1) {
                      Ewin.alert(data.desc)
                     return;
                     }
                     //刷新服务信息
                     $scope.selectClassfyInfo();
                     });
                     }*/


                };


            }
        ]);


    });

