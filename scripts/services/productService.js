define(['services/services', 'services/commonService'],
    function (services) {
        services.factory('ProductService', ['$http', '$q', 'CommonService',
            function ($http, $q, commonService) {
                return {
                    /*查询产品类别信息*/
                    queryClassfyInfo: function () {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getAppServerUrl() + "/app/classify",
                            method: "get",
                            data: {}
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*查询产品服务信息*/
                    queryProductInfo: function (classId) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getAppServerUrl() + "/app/product/"+classId,
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
