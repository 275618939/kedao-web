define(['services', 'services/commonService'],
    function (services) {
        services.factory('RechargeService', ['$http', '$q', 'CommonService',
            function ($http, $q, commonService) {
                return {
                    /*最大显示条数*/
                    PAGE_MAX_SIZE: 100,
                    /*查询我的充值信息*/
                    queryMyRechargeInfo: function (month, page) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getAppServerUrl() + "/app/charge/shop/" + month + "/" + page + "/" + this.PAGE_MAX_SIZE + "?time=" + commonService.getDataString(),
                            method: "get",
                            data: {}
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*查询会员充值信息*/
                    queryMemberRechargeInfo: function (id, month, page) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getAppServerUrl() + "/app/charge/member/" + id + "/" + month + "/" + page + "/" + this.PAGE_MAX_SIZE + "?time=" + commonService.getDataString(),
                            method: "get",
                            data: {}
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*查询店月充值信息*/
                    queryMonthRechargeInfo: function (month) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getAppServerUrl() + "/app/charge/shop/" + month + "/0/" + this.PAGE_MAX_SIZE + "?time=" + commonService.getDataString(),
                            method: "get",
                            data: {}
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    }
                };
            }]);
    });
