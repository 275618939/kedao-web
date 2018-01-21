define(['controllers/controllers', 'services/memberService', 'services/packetService', 'services/productService', 'services/commonService', 'services/rechargeService'],
    function (controllers) {

        /*会员管理*/
        controllers.controller('MemberManagerCtrl', ['$scope', 'MemberService', 'PacketService', 'CommonService', 'RechargeService',
            function ($scope, memberService, packetService, commonService, rechargeService) {

                $scope.onCreateClose = function () {
                    $("#add-member").modal('hide');
                }
                $scope.onUpdateShow = function () {
                    $("#update-member").modal('show');
                }
                $scope.onConsumeShow = function () {
                    $("#user-consume").modal('show');
                }
                $scope.onUpdateClose = function () {
                    $("#update-member").modal('hide');
                }
                //添加会员
                $scope.onAddMember = function () {
                    var memberPhone = $("#memberPhone").val();
                    var memberName = $("#memberName").val();
                    var memberPassword = $("#memberPassword").val();
                    var memberCheckPassword = $("#memberCheckPassword").val();
                    var memberCard = $("#memberCard").val();
                    if (memberName.trim() == "" || memberName == null) {
                        alert("会员姓名不能为空！");
                        return;
                    }
                    if (isNaN(memberPhone) || (memberPhone.length != 11)) {
                        alert("手机号码为11位数字！请正确填写！");
                        return;
                    }
                    if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(memberPhone))) {
                        $("#phone").focus();
                        alert("请输入正确的手机号!");
                        return;
                    }
                    if (memberPassword.trim() == "" || memberPassword == null) {
                        alert("请输入密码！");
                        return;
                    }
                    if (memberPassword != memberCheckPassword) {
                        alert("两次密码输入不一致！");
                        return;
                    }
                    var pass = memberPhone + $.md5(memberPhone + memberPassword);
                    pass = $.md5(pass);
                    var data = {cellNumber: memberPhone, name: memberName, password: pass, card: memberCard};
                    var promise = memberService.memberCreate(data);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            alert(data.desc);
                            return;
                        }
                        $scope.onCreateClose();
                        $scope.onQueryMemberInfo();
                    });

                };

                //更新会员信息
                $scope.onUpdateMemberQuery = function (data) {
                    $scope.onUpdateShow();
                    $("#updateMemberPhone").val(data.cellNumber);
                    $("#updateMemberName").val(data.name);
                    $("#updateMemberCard").val(data.card);
                    $("#memberId").val(data.id);
                }
                //会员消费信息
                $scope.onMemberConsumeQuery = function (data) {
                    $scope.onConsumeShow();
                    $("#updateMemberPhone").val(data.cellNumber);
                    $("#updateMemberName").val(data.name);
                    $("#updateMemberCard").val(data.card);
                    $("#memberId").val(data.id);
                }


                //更新会员
                $scope.onMemberUpdate = function () {
                    var memberPhone = $("#updateMemberPhone").val();
                    var memberName = $("#updateMemberName").val();
                    var memberCard = $("#updateMemberCard").val();
                    var memberId = $("#memberId").val();
                    if (memberId == commonService.defualt_consumer_id) {
                        alert("默认会员无法修改");
                        return;
                    }
                    /*     var memberPassword = $("#updateMemberPassword").val();
                     var memberCheckPassword = $("#updateMemberCheckPassword").val();*/
                    if (memberName.trim() == "" || memberName == null) {
                        alert("会员姓名不能为空！");
                        return;
                    }
                    if (isNaN(memberPhone) || (memberPhone.length != 11)) {
                        alert("手机号码为11位数字！请正确填写！");
                        return;
                    }
                    if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(memberPhone))) {
                        $("#phone").focus();
                        alert("请输入正确的手机号!");
                        return;
                    }

                    /*      if (memberPassword.trim() == "" || memberPassword == null) {
                     alert("请输入密码！");
                     return;
                     }
                     if (memberPassword != memberCheckPassword) {
                     alert("两次密码输入不一致！");
                     return;
                     }*/
                    /*    var pass = memberPhone + $.md5(memberPhone + memberPassword);
                     pass = $.md5(pass);*/
                    var data = {
                        id: memberId,
                        cellNumber: memberPhone,
                        name: memberName,
                        card: memberCard
                    };
                    memberService.memberNameUpdate(data);
                    //memberService.memberPhoneUpdate(data);
                    memberService.memberCardUpdate(data);
                    //关闭更新面板
                    $scope.onUpdateClose();
                    //刷新会员信息
                    $scope.onQueryMemberInfo();

                };

                $scope.currentPage = 0;
                $scope.dataLen = -1;
                //查询会员信息
                $scope.onQueryMemberInfo = function () {
                    var promise = memberService.queryAllMemberInfo($scope.currentPage);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            $scope.memberItems = null;
                            return;
                        }
                        $scope.memberItems = data.value;
                        $scope.dataLen = $scope.memberItems.length;
                    });
                };
                $scope.onQueryMemberInfo();
                //翻页
                $scope.onNextPage = function () {
                    if ($scope.dataLen > 0) {
                        $scope.currentPage += 1;
                    }
                    $scope.onQueryMemberInfo();
                }
                $scope.onUpPage = function () {
                    $scope.currentPage -= 1;
                    if ($scope.currentPage <= 0) {
                        $scope.currentPage = 0;
                    }
                    $scope.onQueryMemberInfo();
                }
                //查询单个会员信息
                $scope.onQueryByMemberInfo = function () {
                    var memberPhone = $("#searchPhone").val();
                    if (isNaN(memberPhone) || (memberPhone.length != 11)) {
                        alert("手机号码为11位数字！请正确填写！");
                        return;
                    }
                    if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(memberPhone))) {
                        $("#phone").focus();
                        alert("请输入正确的手机号!");
                        return;
                    }
                    var promise = memberService.queryMemberInfo(memberPhone);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            $scope.memberItems = null;
                            return;
                        }
                        var items = new Array();
                        items.push(data.value);
                        $scope.memberItems = items;
                    });
                };

            }]);

        /*消费*/
        controllers.controller('MemberConsumeCtrl', ['$scope', 'MemberService', 'ProductService', 'CommonService',
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
                $scope.onConsumeClose = function () {
                    $("#user-consume").modal('hide');
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
                        $scope.onConsumeClose();
                    });


                };


            }]);
        /*充值*/
        controllers.controller('MemberRechargeCtrl', ['$scope', 'MemberService', 'PacketService', 'ProductService', 'CommonService',
            function ($scope, memberService, packetService, productService, commonService) {

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
                        if (data.value == null || data.value == "undefined") {
                            alert("会员不存在!");
                            return;
                        }
                        //会员信息
                        $scope.memberInfo = data.value;
                    });

                };
                $scope.onRechargeClose = function () {
                    $("#user-recharge").modal('hide');
                }
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
                        money: commonService.getFen(money),
                        given: commonService.getFen(given)
                    };
                    var promise = memberService.memberRecharge(data);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            alert(data.desc);
                            return;
                        }
                        alert("充值成功");
                        $scope.onRechargeClose();
                    });


                };


            }
        ]);


    })
;

