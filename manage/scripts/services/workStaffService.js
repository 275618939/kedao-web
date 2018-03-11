/*店业务处理*/
define(['services', 'services/commonService'],
    function (services) {
        services.factory('WorkStaffService', ['$http', '$q', 'CommonService',
            function ($http, $q, commonService) {
                return {
                    /*创建员工信息*/
                    staffCreate: function (data) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/business/waiter",
                            method: "put",
                            data: "shopId=" + data.shopId + "&cellNumber=" + data.cellNumber + "&name=" + data.name + "&password=" + data.password + "&power=" + data.power
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*更新员工信息*/
                    staffUpdate: function (data) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/business/waiter",
                            method: "post",
                            data: "id=" + data.id + "&name=" + data.name + "&shopId=" + data.shopId + "&power=" + data.power
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*获取店员工信息*/
                    getShopStaffList: function (shopId, page) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/business/waiter/" + shopId + "/" + page + "/" + commonService.getMessageCount() + "?time=" + commonService.getDataString(),
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
