define(['controllers/controllers', 'services/memberService', 'services/packetService', 'services/productService', 'services/commonService', 'services/rechargeService', 'services/paramService', 'services/staffService'],
    function (controllers) {

        /*充值*/
        controllers.controller('RechargeManagerCtrl', ['$scope', 'MemberService', 'PacketService', 'CommonService', 'RechargeService', 'ParamService', 'StaffService',
            function ($scope, memberService, packetService, commonService, rechargeService, paramService, staffService) {

                //查询套餐信息
                $scope.packetItemInfo = null;
                $scope.queryPacketInfo = function () {
                    var promise = packetService.getPacketList();
                    promise.then(function (data) {
                        $scope.packetItems = data.value;
                    });
                };
                $scope.queryPacketInfo();
                //选择套餐信息
                $scope.selectPacketInfo = function () {
                    if (null == $scope.packetItemInfo) {
                        return;
                    }
                    $scope.packetItem = JSON.parse($scope.packetItemInfo)
                    if (null != $scope.packetItem && $scope.packetItem.money != "undefined") {
                        $("#rechargeMoney").val(commonService.getYuan($scope.packetItem.money));
                        $("#rechargeGiven").val(commonService.getYuan($scope.packetItem.given));
                        $("#rechargeDiscount").val(commonService.getDiscountConvert($scope.packetItem.discount));
                    }

                };
                //查询会员信息
                $scope.queryMemberInfo = function () {
                    var phone = $("#rechargePhone").val();
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
                        if (data.value == null || data.value == "undefined" || data.value == "") {
                            alert("会员不存在!");
                            $("#rechargePhone").val("")
                            return;
                        }
                        //会员信息
                        $scope.memberInfo = data.value;
                    });

                };
                $scope.onRechargeClose = function () {
                    $("#add-recharge").modal('hide');
                };
                //查询员工信息
                $scope.staffItemInfo = 0;
                $scope.queryStaffInfo = function () {
                    var promise = staffService.getShopStaffList(0);
                    promise.then(function (data) {
                        $scope.staffItems = data.value;
                    });
                };
                $scope.queryStaffInfo();
                //用户充值
                $scope.onRecharge = function () {
                    var payType = $("#rechargePayType").val();
                    var money = $("#rechargeMoney").val();
                    var given = $("#rechargeGiven").val();
                    if (null == $scope.memberInfo || $scope.memberInfo.id == "undefined") {
                        alert("请选择一个会员!");
                        return;
                    }
                    if (payType == null || payType == "undefined") {
                        alert("请选择一种支付方式!");
                        return;
                    }
                    if (null == $scope.packetItem || $scope.packetItem.id == "undefined") {
                        alert("请选择一个套餐!");
                        return;
                    }
                    if (money == null || money.trim() == "" || money == "undefined") {
                        alert("充值金额不能为空!");
                        return;
                    }
                    if (null == $scope.staffItemInfo || $scope.staffItemInfo == 0) {
                        alert("请选择一个服务员工!");
                        return;
                    }
                    if (money > commonService.max_money) {
                        alert("充值金额不合法!");
                        return;
                    }
                    try {
                        if (given != null && given.trim() != "" && given != "undefined") {
                            if (given > commonService.max_money) {
                                alert("充值赠送金额不合法!");
                                return;
                            }
                            given = parseInt(given);
                        } else {
                            given = 0;
                        }

                    } catch (error) {
                        given = 0;
                    }
                    var data = {
                        id: $scope.memberInfo.id,
                        payType: payType,
                        packetId: $scope.packetItem.id,
                        waiterId: $scope.staffItemInfo,
                        money: commonService.getFen(money),
                        given: commonService.getFen(given)
                    };
                    var promise = memberService.memberRecharge(data);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            alert(data.desc);
                            return;
                        }
                        $scope.onRechargeClose();
                        $scope.onQueryRechargeInfo();
                    });


                };

                //当前日期
                $scope.date = commonService.dateStringShort();
                $scope.currentPage = 0;
                $scope.dataLen = -1;
                $scope.queryId = paramService.getValue("queryId");
                if ($scope.queryId != null && $scope.queryId != "undefined") {
                    //查询用户充值记录信息
                    $scope.onQueryMemberRechargeInfo = function () {
                        var promise = rechargeService.queryMemberRechargeInfo($scope.queryId, $scope.date, $scope.currentPage);
                        promise.then(function (data) {
                            if (data.state != 1) {
                                $scope.rechargeItems = null;
                                return;
                            }
                            $scope.rechargeItems = data.value;
                            $scope.dataLen = $scope.rechargeItems.length;
                        });
                    }
                    $scope.onQueryMemberRechargeInfo();
                } else {
                    //查询当日充值记录
                    $scope.onQueryRechargeInfo = function () {
                        var promise = rechargeService.queryMyRechargeInfo($scope.date, $scope.currentPage);
                        promise.then(function (data) {
                            if (data.state != 1) {
                                $scope.rechargeItems = null;
                                return;
                            }
                            $scope.rechargeItems = data.value;
                            $scope.dataLen = $scope.rechargeItems.length;
                        });
                    };
                    $scope.onQueryRechargeInfo();
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
                        $scope.onQueryMemberRechargeInfo();
                    } else {
                        $scope.onQueryRechargeInfo();
                    }

                }


            }]);


    })
;

