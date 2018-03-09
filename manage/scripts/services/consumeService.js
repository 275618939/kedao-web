define(['services', 'services/commonService'],
    function (services) {
        services.factory('ConsumeService', ['$http', '$q', 'CommonService',
            function ($http, $q, commonService) {
                return {
                    /*最大显示条数*/
                    PAGE_MAX_SIZE: 100,
                    /*查询我的消费信息*/
                    queryMyConsumeInfo: function (month, page) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getAppServerUrl() + "/app/consume/shop/" + month + "/" + page + "/" + this.PAGE_MAX_SIZE + "?time=" + commonService.getDataString(),
                            method: "get",
                            data: {}
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*查询会员消费信息*/
                    queryMemberConsumeInfo: function (id, month, page) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getAppServerUrl() + "/app/consume/member/" + id + "/" + month + "/" + page + "/" + this.PAGE_MAX_SIZE + "?time=" + commonService.getDataString(),
                            method: "get",
                            data: {}
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*查询店月消费信息*/
                    queryMonthConsumeInfo: function (month) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getAppServerUrl() + "/app/consume/shop/" + month + "/0/" + this.PAGE_MAX_SIZE + "?time=" + commonService.getDataString(),
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
