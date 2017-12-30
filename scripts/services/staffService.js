/*店业务处理*/
define(['services/services', 'services/commonService'],
    function (services) {
        services.factory('StaffService', ['$http', '$q', 'CommonService',
            function ($http, $q, commonService) {
                return {
                    /*更新员工信息*/
                    staffCreate: function (data) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/business/staff",
                            method: "put",
                            data: "shopId=" + data.shopId + "&name=" + data.name + "&cellNumber=" + data.cellNumber + "&power=" + data.power
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
                            url: "http://" + commonService.getServerUrl() + "/business/staff",
                            method: "post",
                            data: "id=" + data.id + "&shopId=" + data.shopId + "&name=" + data.name + "&cellNumber=" + data.cellNumber + "&power=" + data.power
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*获取员工信息*/
                    getStaffList: function (shopId, page) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/business/staff/" + shopId + "/" + page + "/" + commonService.getMessageCount() + "",
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
