define(['controllers/controllers', 'services/shopService', 'services/paramService'],
    function (controllers) {
        /*加载店信息*/
        controllers.controller('ShopListCtrl', ['$scope', 'ShopService', 'ParamService',
            function ($scope, shopService, paramService) {

                $scope.query = paramService.getValue("query");
                if (null != $scope.query && $scope.query == true) {
                    $scope.load();
                }
                $scope.currentPage = 0;
                $scope.dataLen = -1;
                $scope.load = function () {
                    var promise = shopService.getShopList($scope.currentPage);
                    promise.then(function (data) {
                        $scope.shopItems = data.value;
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
        ])
        ;

        /*显示店面详情信息*/
        controllers.controller('ShopDetailCtrl', ['$scope', 'ShopService', 'ParamService',
            function ($scope, shopService, paramService) {
                $scope.shopId = paramService.getValue("shopId");
                $scope.name = paramService.getValue("name");
                $scope.address = paramService.getValue("address");
                $scope.telephone = paramService.getValue("telephone");
                $scope.description = paramService.getValue("description");
                //创建店面
                $scope.onUpdate = function () {
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
                    var promise = shopService.shopUpdate(data);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            alert(data.desc)
                            return;
                        }
                        window.location.href = "hair-shop-list.html?query=true";
                    });
                };


            }]);


    });

