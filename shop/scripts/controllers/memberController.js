define(['controllers/controllers', 'services/memberService', 'services/packetService', 'services/productService', 'services/commonService', 'services/rechargeService', 'services/staffService'],
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
                $scope.onRechargeShow = function () {
                    $("#user-recharge").modal('show');
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
                        Ewin.alert("会员姓名不能为空！");
                        return;
                    }
                    if (isNaN(memberPhone) || (memberPhone.length != 11)) {
                        Ewin.alert("手机号码为11位数字！请正确填写！");
                        return;
                    }
                    if (!(/^1[0-9][0-9]\d{4,8}$/.test(memberPhone))) {
                        $("#phone").focus();
                        Ewin.alert("请输入正确的手机号!");
                        return;
                    }
                    if (memberPassword.trim() == "" || memberPassword == null) {
                        Ewin.alert("请输入密码！");
                        return;
                    }
                    if (memberPassword != memberCheckPassword) {
                        Ewin.alert("两次密码输入不一致！");
                        return;
                    }
                    var pass = memberPhone + $.md5(memberPhone + memberPassword);
                    pass = $.md5(pass);
                    var data = {cellNumber: memberPhone, name: memberName, password: pass, card: memberCard};
                    var promise = memberService.memberCreate(data);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            Ewin.alert(data.desc);
                            return;
                        }
                        $scope.onCreateClose();
                        $scope.onQueryMemberInfo();
                    });

                };

                //会员姓名
                $scope.oldName = "";

                //更新会员信息
                $scope.onUpdateMemberQuery = function (data) {
                    $scope.onUpdateShow();
                    $scope.oldName = data.name;
                    $("#updateMemberPhone").val(data.cellNumber);
                    $("#updateMemberName").val(data.name);
                    $("#updateMemberCard").val(data.card);
                    $("#memberId").val(data.id);
                }
                //会员消费信息
                $scope.onMemberConsumeQuery = function (data) {
                    $scope.onConsumeShow();
                    $("#memberId").val(data.id);
                    $scope.queryMemberInfo(data.cellNumber);
                }
                //会员充值信息
                $scope.onMemberRechargeQuery = function (data) {
                    $scope.onRechargeShow();
                    $("#memberId").val(data.id);
                    $("#rechargePhone").val(data.cellNumber);
                }
                //查询会员信息
                $scope.queryMemberInfo = function (phone) {
                    var promise = memberService.queryMemberInfo(phone);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            Ewin.alert(data.desc);
                            return;
                        }
                        if (data.value == null || data.value == "undefined" || data.value == "") {
                            Ewin.alert("会员不存在!");
                            return;
                        }
                        //会员信息
                        $scope.memberInfo = data.value;
                        $("#phone").val(phone);
                        $("#money").text(commonService.getYuan(data.value.money));
                        $("#given").text(commonService.getYuan(data.value.given));
                        $("#discount").val(commonService.getDiscountConvert(data.value.discount));

                    });

                };
                //查询最近关注的会员
                $scope.queryWxRecentInfo = function () {
                    var promise = memberService.queryWxRecent();
                    promise.then(function (data) {
                        if (data.state != 1) {
                            return;
                        }
                        //关注信息
                        $scope.wxRecentInfo = data.value;
                    });
                };
                $scope.queryWxRecentInfo();
                //绑定微信
                $scope.onMemberBind = function (id, openId) {
                    Ewin.confirm({message: "确认要绑定此用户吗？"}).on(function (e) {
                        if (!e) {
                            return;
                        }
                        var data = {id: id, openId: openId};
                        var promise = memberService.bindMember(data);
                        promise.then(function (data) {
                            if (data.state != 1) {
                                Ewin.alert(data.desc);
                                return;
                            }
                            //刷新最近绑定的会员
                            $scope.queryWxRecentInfo();
                        });
                    });

                };
                //更新会员
                $scope.onMemberUpdate = function () {
                    var memberPhone = $("#updateMemberPhone").val();
                    var memberName = $("#updateMemberName").val();
                    var memberCard = $("#updateMemberCard").val();
                    var memberId = $("#memberId").val();
                    if (memberId == commonService.defualt_consumer_id) {
                        Ewin.alert("默认会员无法修改");
                        return;
                    }
                    /*     var memberPassword = $("#updateMemberPassword").val();
                     var memberCheckPassword = $("#updateMemberCheckPassword").val();*/
                    if (memberName.trim() == "" || memberName == null) {
                        Ewin.alert("会员姓名不能为空！");
                        return;
                    }
                    if (isNaN(memberPhone) || (memberPhone.length != 11)) {
                        Ewin.alert("手机号码为11位数字！请正确填写！");
                        return;
                    }
                    if (!(/^1[0-9][0-9]\d{4,8}$/.test(memberPhone))) {
                        $("#phone").focus();
                        Ewin.alert("请输入正确的手机号!");
                        return;
                    }

                    /*      if (memberPassword.trim() == "" || memberPassword == null) {
                     Ewin.alert("请输入密码！");
                     return;
                     }
                     if (memberPassword != memberCheckPassword) {
                     Ewin.alert("两次密码输入不一致！");
                     return;
                     }*/
                    /*    var pass = memberPhone + $.md5(memberPhone + memberPassword);
                     pass = $.md5(pass);*/
                    var data = {
                        id: memberId,
                        cellNumber: memberPhone,
                        name: $scope.oldName,
                        newName: memberName,
                        card: memberCard
                    };
                    Ewin.confirm({message: "确认要修改吗？"}).on(function (e) {
                        if (!e) {
                            return;
                        }
                        memberService.memberNameUpdate(data);
                        //memberService.memberPhoneUpdate(data);
                        memberService.memberCardUpdate(data);
                        //关闭更新面板
                        $scope.onUpdateClose();
                        //刷新会员信息
                        $scope.onQueryMemberInfo();
                    });


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
                    var info = $("#searchPhone").val();
                    if (info === "" || info == null) {
                        Ewin.alert("请输入一个手机号或者姓名");
                        return false;
                    }
                    if (!isNaN(info)) {
                        //验证手机号活着会员名称
                        if (isNaN(info) || (info.length != 11)) {
                            Ewin.alert("手机号码为11位数字！请正确填写！");
                            return;
                        }
                        if (!(/^1[0-9][0-9]\d{4,8}$/.test(info))) {
                            $("#phone").focus();
                            Ewin.alert("请输入正确的手机号!");
                            return;
                        }
                        var promise = memberService.queryMemberInfo(info);
                        promise.then(function (data) {
                            if (data.state != 1) {
                                $scope.memberItems = null;
                                return;
                            }
                            var items = new Array();
                            items.push(data.value);
                            $scope.memberItems = items;
                        });
                    } else {
                        var promise = memberService.queryMemberInfoByName(encodeURIComponent(info));
                        promise.then(function (data) {
                            if (data.state != 1) {
                                $scope.memberItems = null;
                                return;
                            }
                            var items = new Array();
                            items.push(data.value);
                            $scope.memberItems = data.value;
                        });
                    }


                };

            }]);

        /*消费*/
        controllers.controller('MemberConsumeCtrl', ['$scope', 'MemberService', 'ProductService', 'CommonService', 'StaffService',
            function ($scope, memberService, productService, commonService, staffService) {
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
                    //$scope.productItem = JSON.parse($scope.productItemInfo);
                    var arr = JSON.parse("[" + $scope.productItemInfo + "]");
                    var money = 0;
                    arr.forEach(function (value, index, array) {
                        money += value.price;
                    });
                    var temp_money = 0;
                    if ($scope.memberInfo != null && $scope.memberInfo != "undefined") {
                        temp_money = (commonService.getYuan(money) * (commonService.getDiscountConvert($scope.memberInfo.discount) / 10.0)).toFixed(0);
                    } else {
                        temp_money = commonService.getYuan(money);
                    }
                    $("#cunsumeMoney").val(temp_money);
                };
                $scope.onConsumeClose = function () {
                    $("#user-consume").modal('hide');
                    $("#phone").val("");
                    $("#discount").val("");
                    $("#cunsumeMoney").val("");
                    $scope.memberInfo = null;
                    $scope.productItemInfo = 0;
                }
                //用户消费
                $scope.onConsumeInfo = function () {
                    var payType = $("#payType").val();
                    var money = $("#cunsumeMoney").val();
                    var given = $("#cunsumeGiven").val();
                    var memberId = $("#memberId").val();
                    if (memberId == null) {
                        Ewin.alert("请选择一个会员");
                        return;
                    }
                    if (payType == null || payType == "undefined") {
                        Ewin.alert("请选择一种支付方式!");
                        return;
                    }
                    if (null == $scope.staffItemInfo || $scope.staffItemInfo == 0) {
                        Ewin.alert("请选择一个服务员工!");
                        return;
                    }
                    if ($scope.productItemInfo == null || $scope.productItemInfo == "undefined") {
                        Ewin.alert("请选择一个消费项目!");
                        return;
                    }
                    var arr = JSON.parse($scope.productItemInfo);
                    if (arr.id == null || arr.id == "undefined") {
                        Ewin.alert("请选择一个消费项目!");
                        return;
                    }
                    if (money == null || money.trim() == "" || money == "undefined") {
                        Ewin.alert("消费金额不能为空!");
                        return;
                    }
                    if (money > commonService.max_money) {
                        Ewin.alert("消费金额不合法!");
                        return;
                    }
                    if (given = !null && given.trim() != "" && given != "undefined") {
                        if (given > commonService.max_money) {
                            Ewin.alert("消费赠送金额不合法!");
                            return;
                        }
                    } else {
                        given = 0;
                    }
                    //记录选择的产品信息
                    /*        $scope.consumeProductItems = new Array();
                     var productName = "";
                     var maxProduct = 0;
                     var arr = JSON.parse("[" + $scope.productItemInfo + "]");
                     arr.forEach(function (value, index, array) {
                     var v = "{productId:" + value.id + ",waiterId:" + $scope.staffItemInfo + "}";
                     if (value.price > maxProduct) {
                     productName = value.name;
                     maxProduct = value.price;
                     }
                     $scope.consumeProductItems.push(v);
                     });
                     if ($scope.consumeProductItems.length <= 0) {
                     Ewin.alert("请选择一个消费项目!");
                     return;
                     }*/
                    var data = {
                        id: memberId,
                        payType: payType,
                        productId: arr.id,
                        waiterId: $scope.staffItemInfo,
                        /*  items: "[" + $scope.consumeProductItems.toString() + "]",*/
                        money: commonService.getFen(money),
                        given: commonService.getFen(given)
                    };
                    var promise = memberService.memberConsume(data);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            Ewin.alert(data.desc);
                            return;
                        }
                        Ewin.alert("消费成功");
                        $scope.onConsumeClose();
                    });


                };


            }]);
        /*充值*/
        controllers.controller('MemberRechargeCtrl', ['$scope', 'MemberService', 'PacketService', 'ProductService', 'CommonService', 'StaffService',
            function ($scope, memberService, packetService, productService, commonService, staffService) {

                //查询员工信息
                $scope.staffItemInfo = 0;
                $scope.queryStaffInfo = function () {
                    var promise = staffService.getShopStaffList(0);
                    promise.then(function (data) {
                        $scope.staffItems = data.value;
                    });
                };
                $scope.queryStaffInfo();
                //查询会员卡信息
                $scope.packetItemInfo = null;
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
                $scope.onRechargeClose = function () {
                    $("#user-recharge").modal('hide');
                }
                //用户充值
                $scope.onRecharge = function () {
                    var payType = $("#rechargePayType").val();
                    var money = $("#rechargeMoney").val();
                    var given = $("#rechargeGiven").val();
                    var memberId = $("#memberId").val();
                    if (memberId == null) {
                        Ewin.alert("请选择一个会员");
                        return;
                    }
                    if (payType == null || payType == "undefined") {
                        Ewin.alert("请选择一种支付方式!");
                        return;
                    }
                    if (null == $scope.staffItemInfo || $scope.staffItemInfo == 0) {
                        Ewin.alert("请选择一个服务员工!");
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

                    } catch (error) {
                        given = 0;
                    }
                    var data = {
                        id: memberId,
                        payType: payType,
                        waiterId: $scope.staffItemInfo,
                        packetId: $scope.packetItem.id,
                        money: commonService.getFen(money),
                        given: commonService.getFen(given)
                    };
                    var promise = memberService.memberRecharge(data);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            Ewin.alert(data.desc);
                            return;
                        }
                        Ewin.alert("充值成功");
                        $scope.onRechargeClose();
                    });


                };


            }
        ]);


    })
;

