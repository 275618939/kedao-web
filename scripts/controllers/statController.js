define(['controllers/controllers', 'services/commonService', 'services/statService'],
    function (controllers) {

        /*日信息统计*/
        controllers.controller('StatDayManagerCtrl', ['$scope', 'CommonService', 'StatService',
            function ($scope, memberService, statService) {

                $scope.currentPage = 0;
                $scope.dataLen = -1;
                $scope.statType = 0;//0:充值，1:消费
                $scope.statTypeInfo = "充值";
                //查询店日充值信息
                $scope.onQuerysShopChargeStatInfo = function () {
                    $scope.statType = 0;
                    $scope.statTypeInfo = "充值";
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
                //查询店月充值信息
                $scope.onQueryMonthShopChargeStatInfo = function () {
                    $scope.statType = 0;
                    $scope.statTypeInfo = "充值";
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


    })
;

