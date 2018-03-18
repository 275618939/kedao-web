/*店业务处理*/
define(['services', 'services/commonService'],
    function (services) {
        services.factory('WorkPacketService', ['$http', '$q', 'CommonService',
            function ($http, $q, commonService) {
                return {
                    /*创建会员卡信息*/
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
                    /*更新会员卡信息*/
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
                    /*获取会员卡信息*/
                    getPacketList: function () {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/business/packet" + "?time=" + commonService.getDataString(),
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
