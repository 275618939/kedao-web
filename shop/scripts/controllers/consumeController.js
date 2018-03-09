define(['controllers/controllers', 'services/memberService', 'services/packetService', 'services/productService', 'services/commonService', 'services/consumeService', 'services/paramService', 'services/staffService'],
    function (controllers) {

        /*消费*/
        controllers.controller('ConsumeManagerCtrl', ['$scope', 'MemberService', 'ProductService', 'CommonService', 'ConsumeService', 'ParamService', 'StaffService',
            function ($scope, memberService, productService, commonService, consumeService, paramService, staffService) {
                //初始化消费项目信息
                $('.select2').select2();
                $("#discount").val("不打折");
                //查询员工信息
                $scope.staffItemInfo = 0;
                $scope.queryStaffInfo = function () {
                    var promise = staffService.getShopStaffList(0);
                    promise.then(function (data) {
                        $scope.staffItems = data.value;
                    });
                };
                $scope.queryStaffInfo();
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
                    /*   $scope.productItem = JSON.parse($scope.productItemInfo)
                     $("#cunsumeMoney").val(commonService.getYuan($scope.productItem.price));*/
                    var arr = JSON.parse("[" + $scope.productItemInfo + "]");
                    var money = 0;
                    arr.forEach(function (value, index, array) {
                        money += value.price;
                    });
                    $("#cunsumeMoney").val(commonService.getYuan(money));
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
                $scope.onConsumeClose = function () {
                    $("#add-consume").modal('hide');
                }
                //用户消费
                $scope.onConsumeInfo = function () {
                    var payType = $("#payType").val();
                    var money = $("#cunsumeMoney").val();
                    var given = $("#cunsumeGiven").val();
                    if (payType == null || payType == "undefined") {
                        alert("请选择一种支付方式!");
                        return;
                    }
                    if (null == $scope.staffItemInfo || $scope.staffItemInfo == 0) {
                        alert("请选择一个服务员工!");
                        return;
                    }
                    if ($scope.productItemInfo == null || $scope.productItemInfo == "undefined") {
                        alert("请选择一个消费项目!");
                        return;
                    }
                    var arr = JSON.parse($scope.productItemInfo);
                    if (arr.id == null || arr.id == "undefined") {
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
                    //记录选择的产品信息
                    //$scope.consumeProductItems = new Array();
                    //var productName = "";
                    //var maxProduct = 0;
                    //var arr = JSON.parse("[" + $scope.productItemInfo + "]");
                    //var arr = JSON.parse($scope.productItemInfo);
                    /* arr.forEach(function (value, index, array) {
                     var v = "{productId:" + value.id + ",waiterId:" + $scope.staffItemInfo + "}";
                     if (value.price > maxProduct) {
                     productName = value.name;
                     maxProduct = value.price;
                     }
                     $scope.consumeProductItems.push(v);
                     });
                     if ($scope.consumeProductItems.length <= 0) {
                     alert("请选择一个消费项目!");
                     return;
                     }*/
                    var memberId = commonService.defualt_consumer_id;
                    if (null != $scope.memberInfo && $scope.memberInfo.id != "undefined") {
                        memberId = $scope.memberInfo.id;
                    }
                    var data = {
                        id: memberId,
                        payType: payType,
                        productId: arr.id,
                        waiterId: $scope.staffItemInfo,
                        //items: "[" + $scope.consumeProductItems.toString() + "]",
                        money: commonService.getFen(money),
                        given: commonService.getFen(given)
                    };
                    var promise = memberService.memberConsume(data);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            alert(data.desc);
                            return;
                        }
                        $scope.onConsumeClose();
                        $scope.onQueryConsumeInfo();
                    });


                };

                //当前日期
                $scope.date = commonService.dateStringShort();
                $scope.currentPage = 0;
                $scope.dataLen = -1;
                $scope.queryId = paramService.getValue("queryId");
                if ($scope.queryId != null && $scope.queryId != "undefined") {
                    //查询用户消费记录信息
                    $scope.onQueryMemberConsumeInfo = function () {
                        var promise = consumeService.queryMemberConsumeInfo($scope.queryId, $scope.date, $scope.currentPage);
                        promise.then(function (data) {
                            if (data.state != 1) {
                                $scope.consumeItems = null;
                                return;
                            }
                            $scope.consumeItems = data.value;
                            $scope.dataLen = $scope.consumeItems.length;
                        });
                    }
                    $scope.onQueryMemberConsumeInfo();
                } else {

                    //查询当日消费记录
                    $scope.onQueryConsumeInfo = function () {
                        var promise = consumeService.queryMyConsumeInfo($scope.date, $scope.currentPage);
                        promise.then(function (data) {
                            if (data.state != 1) {
                                $scope.consumeItems = null;
                                return;
                            }
                            $scope.consumeItems = data.value;
                            $scope.dataLen = $scope.consumeItems.length;
                        });
                    };
                    $scope.onQueryConsumeInfo();
                }
                //翻月
                $scope.onNextMonth = function () {
                    $scope.date = commonService.dateNextMonthShort();
                    $scope.currentPage = 0;
                    $scope.onQueryInfo();
                }
                $scope.onUpMonth = function () {
                    $scope.date = commonService.dateUpMonthShort();
                    $scope.currentPage = 0;
                    $scope.onQueryInfo();
                }
                //翻页
                $scope.onNextPage = function () {
                    if ($scope.dataLen > 0) {
                        $scope.currentPage += 1;
                    }
                    $scope.onQueryInfo();
                }
                $scope.onUpPage = function () {
                    $scope.currentPage -= 1;
                    if ($scope.currentPage <= 0) {
                        $scope.currentPage = 0;
                    }
                    $scope.onQueryInfo();
                }
                $scope.onQueryInfo = function () {
                    if ($scope.queryId != null && $scope.queryId != "undefined") {
                        $scope.onQueryMemberConsumeInfo();
                    } else {
                        $scope.onQueryConsumeInfo();
                    }

                }

            }]);


    })
;

