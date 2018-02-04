define(['controllers/controllers', 'services/memberService', 'services/packetService', 'services/productService', 'services/commonService', 'services/consumeService', 'services/paramService'],
    function (controllers) {

        /*初始化*/
        controllers.controller('IndexInitCtrl', ['$scope', 'MemberService', 'ProductService', 'CommonService', 'ParamService',
            function ($scope, memberService, productService, commonService, paramService) {
                $scope.first = paramService.getValue("first");
                //第一次进入系统
                if ($scope.first == true) {
                    //跳转到店管理页
                    //window.location.href = "shop.html?addShop=true";
                }


            }]);

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
        controllers.controller('IndexRechargeCtrl', ['$scope', 'MemberService', 'PacketService', 'ProductService', 'CommonService',
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
        /*添加会员*/
        controllers.controller('IndexMemberCtrl', ['$scope', 'MemberService', 'PacketService', 'ProductService', 'CommonService',
            function ($scope, memberService, packetService, productService, commonService) {

                $scope.onCreateClose = function () {
                    $("#user-create").modal('hide');
                }
                //添加会员
                $scope.onAddMember = function () {
                    var memberPhone = $("#memberPhone").val();
                    var memberName = $("#memberName").val();
                    var memberPassword = $("#memberPassword").val();
                    var memberCheckPassword = $("#memberCheckPassword").val();
                    var memberCard = $("#memberCard").val();
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
                        alert("充值成功");
                        $scope.onCreateClose();
                    });

                };


            }
        ]);
        /*消费统计*/
        controllers.controller('IndexStatisCtrl', ['$scope', 'MemberService', 'PacketService', 'ProductService', 'CommonService', 'ConsumeService',
            function ($scope, memberService, packetService, productService, commonService, consumeService) {

                //当前日期
                $scope.date = commonService.dateStringShort();
                var areaChartCanvas = $('#consumeChart').get(0).getContext('2d')
                var areaChart = new Chart(areaChartCanvas);
                $scope.areaChartData = {
                    labels: [],
                    datasets: [
                        {
                            label: '消费金额',
                            fillColor: 'rgba(60,141,188,0.9)',
                            strokeColor: 'rgba(60,141,188,0.8)',
                            pointColor: '#3b8bba',
                            pointStrokeColor: 'rgba(60,141,188,1)',
                            pointHighlightFill: '#fff',
                            pointHighlightStroke: 'rgba(60,141,188,1)',
                            data: []
                        }
                    ]
                }
                //查询当日消费记录
                $scope.onQueryConsumeInfo = function () {
                    var promise = consumeService.queryMonthConsumeInfo("2018-01");
                    promise.then(function (data) {
                        if (data.state != 1) {
                            return;
                        }
                        var len = data.value.length;
                        //设置消费信息
                        for (var i = 0; i < len; i++) {
                            $scope.areaChartData.labels.push(data.value[i].createdTime);
                            $scope.areaChartData.datasets[0].data.push(commonService.getYuan(data.value[i].money));
                        }
                        var areaChartOptions = {
                            //Boolean - If we should show the scale at all
                            showScale: true,
                            //Boolean - Whether grid lines are shown across the chart
                            scaleShowGridLines: false,
                            //String - Colour of the grid lines
                            scaleGridLineColor: 'rgba(0,0,0,.05)',
                            //Number - Width of the grid lines
                            scaleGridLineWidth: 1,
                            //Boolean - Whether to show horizontal lines (except X axis)
                            scaleShowHorizontalLines: true,
                            //Boolean - Whether to show vertical lines (except Y axis)
                            scaleShowVerticalLines: true,
                            //Boolean - Whether the line is curved between points
                            bezierCurve: true,
                            //Number - Tension of the bezier curve between points
                            bezierCurveTension: 0.3,
                            //Boolean - Whether to show a dot for each point
                            pointDot: false,
                            //Number - Radius of each point dot in pixels
                            pointDotRadius: 4,
                            //Number - Pixel width of point dot stroke
                            pointDotStrokeWidth: 1,
                            //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
                            pointHitDetectionRadius: 20,
                            //Boolean - Whether to show a stroke for datasets
                            datasetStroke: true,
                            //Number - Pixel width of dataset stroke
                            datasetStrokeWidth: 2,
                            //Boolean - Whether to fill the dataset with a color
                            datasetFill: true,
                            //String - A legend template
                            legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].lineColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
                            //Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
                            maintainAspectRatio: true,
                            //Boolean - whether to make the chart responsive to window resizing
                            responsive: true
                        }
                        //创建消费信息图表
                        areaChart.Line($scope.areaChartData, areaChartOptions)

                    });


                };

                $scope.onQueryConsumeInfo();


            }
        ]);


    })
;

