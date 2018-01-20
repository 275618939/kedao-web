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

            }]);


    })
;

