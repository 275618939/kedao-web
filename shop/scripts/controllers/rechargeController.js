define(['controllers/controllers', 'services/memberService', 'services/packetService', 'services/productService', 'services/commonService', 'services/rechargeService', 'services/paramService', 'services/staffService'],
    function (controllers) {

        /*充值*/
        controllers.controller('RechargeManagerCtrl', ['$scope', 'MemberService', 'PacketService', 'CommonService', 'RechargeService', 'ParamService', 'StaffService',
            function ($scope, memberService, packetService, commonService, rechargeService, paramService, staffService) {


                //套餐信息
                $scope.packetItemInfo = null;
                //发型师
                $scope.staffItemInfo = null;
                //助理
                $scope.minorStaffItemInfo = null;
                //查询会员卡信息
                $scope.queryPacketInfo = function () {
                    var promise = packetService.getPacketList();
                    promise.then(function (data) {
                        $scope.packetItems = data.value;
                    });
                };
                $scope.queryPacketInfo();
                //选择会员卡信息
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
                //选择发型师信息
                $scope.selectStaffItemInfo = function () {
                    if (null == $scope.staffItemInfo) {
                        return;
                    }
                    if ($("#rechargeMoney").val() <= 0) {
                        Ewin.alert("请选择一个会员卡套餐!");
                        return;
                    }
                    //todo 验证提成金额
                    //var temp_retain = $("#rechargeMoney").val() * commonService.getRetainConvert($scope.packetItem.majorRetain) * commonService.getRetainConvert($scope.staffItemInfo.grade);
                    //$("#majorRetain").val(temp_retain.toFixed(2));
					 var temp_retain = commonService.getFen(String($("#rechargeMoney").val())) * $scope.packetItem.majorRetain * $scope.staffItemInfo.grade / 10000;
					temp_retain=Number(temp_retain.toFixed(0));
                    $("#majorRetain").val(commonService.getYuan(temp_retain));
                };
                //选择助理信息
                $scope.selectMajorRetainInfo = function () {
                    if (null == $scope.minorStaffItemInfo) {
                        return;
                    }
                    if ($("#rechargeMoney").val() <= 0) {
                        Ewin.alert("请选择一个会员卡套餐!");
                        return;
                    }
                    //todo 验证提成金额
                    //var temp_retain = $("#rechargeMoney").val() * commonService.getRetainConvert($scope.packetItem.minorRetain) * commonService.getRetainConvert($scope.minorStaffItemInfo.grade);
                    //$("#minorRetain").val(temp_retain.toFixed(2));
					var temp_retain = commonService.getFen(String($("#rechargeMoney").val())) * $scope.packetItem.minorRetain * $scope.minorStaffItemInfo.grade / 10000;
					temp_retain=Number(temp_retain.toFixed(0));
                    $("#minorRetain").val(commonService.getYuan(temp_retain));
                };
                //查询会员信息
                $scope.queryMemberInfo = function () {
                    var phone = $("#rechargePhone").val();
                    if (isNaN(phone) || (phone.length != 11)) {
                        Ewin.alert("手机号码为11位数字！请正确填写！");
                        return;
                    }
                    var promise = memberService.queryMemberInfo(phone);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            Ewin.alert(data.desc);
                            return;
                        }
                        if (data.value == null || data.value == "undefined" || data.value == "") {
                            Ewin.alert("会员不存在!");
                            $("#rechargePhone").val("")
                            return;
                        }
                        //会员信息
                        $scope.memberInfo = data.value;
                        $("#userName").text(data.value.name);
                        $("#money").text(commonService.getYuan(data.value.money));
                        $("#given").text(commonService.getYuan(data.value.given));
                    });

                };
                $scope.onRechargeClose = function () {
                    $("#add-recharge").modal('hide');
                };
                //查询员工信息
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
                    var majorRetain = $("#majorRetain").val();
                    var minorRetain = $("#minorRetain").val();
                    if (null == $scope.memberInfo || $scope.memberInfo.id == "undefined") {
                        Ewin.alert("请选择一个会员!");
                        return;
                    }
                    if (payType == null || payType == "undefined") {
                        Ewin.alert("请选择一种支付方式!");
                        return;
                    }
                    if (null == $scope.packetItem || $scope.packetItem.id == "undefined") {
                        Ewin.alert("请选择一个会员卡!");
                        return;
                    }
                    if (money == null || money.trim() == "" || money == "undefined") {
                        Ewin.alert("充值金额不能为空!");
                        return;
                    }
                    if (null == $scope.staffItemInfo) {
                        Ewin.alert("请选择一个发型师!");
                        return;
                    }
                    if (money > commonService.max_money) {
                        Ewin.alert("充值金额不合法!");
                        return;
                    }
                    try {
                        if (given != null && given.trim() != "" && given != "undefined") {
                            if (given > commonService.max_money) {
                                Ewin.alert("充值赠送金额不合法!");
                                return;
                            }
                            given = parseInt(given);
                        } else {
                            given = 0;
                        }
                        if (null == majorRetain) {
                            majorRetain = 0;
                        }
                        if (null == minorRetain) {
                            minorRetain = 0;
                        }

                    } catch (error) {
                        given = 0;
                    }
                    var data = {
                        id: $scope.memberInfo.id,
                        payType: payType,
                        packetId: $scope.packetItem.id,
                        packetName: $scope.packetItem.name,
                        majorWaiterId: $scope.staffItemInfo.id,
                        majorWaiterName: $scope.staffItemInfo.name,
                        majorRetain: commonService.getFen(majorRetain),
                        minorWaiterId: $scope.minorStaffItemInfo.id,
                        minorWaiterName: $scope.minorStaffItemInfo.name,
                        minorRetain: commonService.getFen(minorRetain),
                        money: commonService.getFen(money),
                        given: commonService.getFen(given)
                    };
                    var promise = memberService.memberRecharge(data);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            Ewin.alert(data.desc);
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

