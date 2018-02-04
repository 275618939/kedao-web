/*店业务处理*/
define(['services/services', 'services/commonService'],
    function (services) {
        services.factory('StaffService', ['$http', '$q', 'CommonService',
            function ($http, $q, commonService) {
                return {
                    /*创建员工信息*/
                    staffCreate: function (data) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/app/shop/waiter",
                            method: "put",
                            data: "cellNumber=" + data.cellNumber + "&name=" + data.name + "&password=" + data.password + "&power=" + data.power
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
                            url: "http://" + commonService.getServerUrl() + "/app/shop/waiter",
                            method: "post",
                            data: "id=" + data.id + "&name=" + data.name + "&cellNumber=" + data.cellNumber
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*获取店员工信息*/
                    getShopStaffList: function (page) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/app/shop/waiter/" + page + "/" + commonService.getMessageCount() + "",
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
