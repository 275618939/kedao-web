/*店业务处理*/
define(['services/services', 'services/commonService'],
    function (services) {
        services.factory('PacketService', ['$http', '$q', 'CommonService',
            function ($http, $q, commonService) {
                return {
                    /*创建套餐信息*/
                    packetCreate: function (data) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/business/packet",
                            method: "put",
                            data: "discount=" + data.discount + "&name=" + data.name + "&money=" + data.money + "&given=" + data.given + "&retain=" + data.retain
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*更新套餐信息*/
                    packetUpdate: function (data) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/business/packet",
                            method: "post",
                            data: "id=" + data.id + "&discount=" + data.discount + "&name=" + data.name + "&money=" + data.money + "&given=" + data.given + "&retain=" + data.retain
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*获取套餐信息*/
                    getPacketList: function (page) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/business/packet",
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
