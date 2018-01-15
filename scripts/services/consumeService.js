define(['services/services', 'services/commonService'],
    function (services) {
        services.factory('ConsumeService', ['$http', '$q', 'CommonService',
            function ($http, $q, commonService) {
                return {
                    /*最大显示条数*/
                    PAGE_MAX_SIZE: 100,
                    /*查询店月消费信息*/
                    queryMonthConsumeInfo: function (month) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getAppServerUrl() + "/app/consume/shop/"+month+"/0/" + this.PAGE_MAX_SIZE,
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
