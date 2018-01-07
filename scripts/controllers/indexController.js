define(['controllers/controllers', 'services/memberService', 'services/productService', 'services/commonService'],
    function (controllers) {

        /*消费*/
        controllers.controller('IndexConsumeCtrl', ['$scope', 'MemberService', 'ProductService', 'CommonService',
            function ($scope, memberService, productService, commonService) {
                //初始化消费项目信息
                $('.select2').select2();
                //$("#phone").val(commonService.defualt_consumer_name);
                $("#discount").val("不打折")
                //查询消费类别信息
                $scope.classItemInfo = 0;
                $scope.queryClassfyInfo = function () {
                    var promise = productService.queryClassfyInfo();
                    promise.then(function (data) {
                        $scope.classItems = data.value;
                    });
                };
                $scope.queryClassfyInfo();
                //查询消费服务信息
                $scope.productItemInfo = 0;
                $scope.selectClassfyInfo = function () {
                    var promise = productService.queryProductInfo($scope.classItemInfo);
                    promise.then(function (data) {
                        $scope.productItems = data.value;
                    });
                };
                $scope.selectProductInfo = function () {
                    //服务信息
                    $scope.productItem = JSON.parse($scope.productItemInfo)
                    $("#cunsumeMoney").val(commonService.getYuan($scope.productItem.price));
                };
                //查询会员信息
                $scope.queryMemberInfo = function () {
                    var phone = $("#phone").val();
                    if (isNaN(phone) || (phone.length != 11)) {
                        alert("手机号码为11位数字！请正确填写！");
                        return;
                    }
                    var promise = memberService.queryMemberInfo(phone);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            alert(data.desc);
                            return;
                        }
                        if (data.value == null || data.value == "undefined") {
                            alert("会员不存在!");
                            return;
                        }
                        //会员信息
                        $scope.memberInfo = data.value;
                        var money = data.value.money;
                        $("#money").text(commonService.getYuan(data.value.money));
                        $("#given").text(commonService.getYuan(data.value.given));
                        $("#discount").val(commonService.getDiscountConvert(data.value.discount));

                    });

                };
                //用户消费
                $scope.onConsumeInfo = function () {
                    var payType = $("#payType").val();
                    var money = $("#cunsumeMoney").val();
                    var given = $("#cunsumeGiven").val();
                    if (payType == null || payType == "undefined") {
                        alert("请选择一种支付方式!");
                        return;
                    }
                    if (null == $scope.productItem || $scope.productItem.id == "undefined") {
                        alert("请选择一个消费项目!");
                        return;
                    }
                    if (money == null || money.trim() == "" || money == "undefined") {
                        alert("消费金额不能为空!");
                        return;
                    }
                    if (money > commonService.max_money) {
                        alert("消费金额不合法!");
                        return;
                    }
                    if (given = !null && given.trim() != "" && given != "undefined") {
                        if (given > commonService.max_money) {
                            alert("消费赠送金额不合法!");
                            return;
                        }
                    } else {
                        given = 0;
                    }
                    var memberId = commonService.defualt_consumer_id;
                    if (null != $scope.memberInfo && $scope.memberInfo.id != "undefined") {
                        memberId = $scope.memberInfo.id;
                    }
                    var data = {
                        id: memberId,
                        payType: payType,
                        productId: $scope.productItem.id,
                        money: commonService.getFen(money),
                        given: commonService.getFen(given)
                    };
                    var promise = memberService.memberConsume(data);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            alert(data.desc);
                            return;
                        }
                        alert("消费成功");

                    });


                };


            }]);


    });

