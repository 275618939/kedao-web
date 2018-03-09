define(['controllers/controllers', 'services/commonService', 'services/statService', 'services/paramService'],
    function (controllers) {

        /*日信息统计*/
        controllers.controller('StatDayManagerCtrl', ['$scope', 'CommonService', 'StatService',
            function ($scope, memberService, statService) {

                $scope.currentPage = 0;
                $scope.dataLen = -1;
                $scope.statType = 0;//0:充值，1:消费
                $scope.statTypeInfo = "充值";
                $scope.statStatus = false;
                //查询店日充值信息
                $scope.onQuerysShopChargeStatInfo = function () {
                    $scope.statType = 0;
                    $scope.statTypeInfo = "充值";
                    $scope.statStatus = false;
                    var promise = statService.querysShopChargeStatInfo($scope.currentPage);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            $scope.memberItems = null;
                            return;
                        }
                        $scope.statItems = data.value;
                        $scope.dataLen = $scope.statItems.length;
                    });
                };
                //查询店日充值信息
                $scope.onQuerysShopConsumeStatInfo = function () {
                    $scope.statType = 1;
                    $scope.statTypeInfo = "消费";
                    $scope.statStatus = true;
                    var promise = statService.querysShopConsumeStatInfo($scope.currentPage);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            $scope.memberItems = null;
                            return;
                        }
                        $scope.statItems = data.value;
                        $scope.dataLen = $scope.statItems.length;
                    });
                };
                $scope.onQuerysShopChargeStatInfo();
                //翻页
                $scope.onNextPage = function () {
                    if ($scope.dataLen > 0) {
                        $scope.currentPage += 1;
                    }
                    $scope.onQuery();
                }
                $scope.onUpPage = function () {
                    $scope.currentPage -= 1;
                    if ($scope.currentPage <= 0) {
                        $scope.currentPage = 0;
                    }
                    $scope.onQuery();
                }
                $scope.onQuery = function () {
                    if ($scope.statType == 0) {
                        $scope.onQuerysShopChargeStatInfo();

                    } else if ($scope.statType == 1) {
                        $scope.onQuerysShopConsumeStatInfo();

                    }

                }


            }]);
        /*月信息统计*/
        controllers.controller('StatMonthManagerCtrl', ['$scope', 'CommonService', 'StatService',
            function ($scope, memberService, statService) {

                $scope.currentPage = 0;
                $scope.dataLen = -1;
                $scope.statType = 0;//0:充值，1:消费
                $scope.statTypeInfo = "充值";
                $scope.statStatus = {"show": false};
                //查询店月充值信息
                $scope.onQueryMonthShopChargeStatInfo = function () {
                    $scope.statType = 0;
                    $scope.statTypeInfo = "充值";
                    $scope.statStatus = {"show": false};
                    var promise = statService.querysShopMonthChargeStatInfo($scope.currentPage);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            $scope.memberItems = null;
                            return;
                        }
                        $scope.statItems = data.value;
                        $scope.dataLen = $scope.statItems.length;
                    });
                };
                //查询店月充值信息
                $scope.onQueryMonthShopConsumeStatInfo = function () {
                    $scope.statType = 1;
                    $scope.statTypeInfo = "消费";
                    $scope.statStatus = {"show": true};
                    var promise = statService.querysShopMonthConsumeStatInfo($scope.currentPage);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            $scope.memberItems = null;
                            return;
                        }
                        $scope.statItems = data.value;
                        $scope.dataLen = $scope.statItems.length;
                    });
                };
                $scope.onQueryMonthShopChargeStatInfo();
                //翻页
                $scope.onNextPage = function () {
                    if ($scope.dataLen > 0) {
                        $scope.currentPage += 1;
                    }
                    $scope.onQuery();
                }
                $scope.onUpPage = function () {
                    $scope.currentPage -= 1;
                    if ($scope.currentPage <= 0) {
                        $scope.currentPage = 0;
                    }
                    $scope.onQuery();
                }
                $scope.onQuery = function () {
                    if ($scope.statType == 0) {
                        $scope.onQueryMonthShopChargeStatInfo();

                    } else if ($scope.statType == 1) {
                        $scope.onQueryMonthShopConsumeStatInfo();

                    }

                }


            }]);
        /*员工信息统计*/
        controllers.controller('StatStaffManagerCtrl', ['$scope', 'CommonService', 'StatService', 'ParamService',
            function ($scope, memberService, statService, paramService) {

                $scope.currentPage = 0;
                $scope.dataLen = -1;
                $scope.statTypeInfo = "消费";
                $scope.queryId = paramService.getValue("queryId");
                $scope.queryType = paramService.getValue("queryType"); //0:日，1:月
                //查询店员日统计信息
                $scope.onQueryDayStaffServiceInfo = function () {
                    var promise = statService.queryDayStaffServiceInfo($scope.queryId, $scope.currentPage);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            $scope.memberItems = null;
                            return;
                        }
                        $scope.statItems = data.value;
                        $scope.dataLen = $scope.statItems.length;
                    });
                };

                //查询店员月统计信息
                $scope.onQueryMonthStaffServiceInfo = function () {
                    var promise = statService.queryMonthStaffServiceInfo($scope.queryId, $scope.currentPage);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            $scope.memberItems = null;
                            return;
                        }
                        $scope.statItems = data.value;
                        $scope.dataLen = $scope.statItems.length;
                    });
                };
                $scope.onQueryInfo = function () {
                    if ($scope.queryType == 0) {
                        $scope.onQueryDayStaffServiceInfo();
                    } else if ($scope.queryType == 1) {
                        $scope.onQueryMonthStaffServiceInfo();
                    }
                }
                if ($scope.queryId != null && $scope.queryId != "undefined") {
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

            }]);


    })
;

