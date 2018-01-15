define(['services/services', 'services/commonService'],
    function (services) {
        services.factory('MemberService', ['$http', '$q', 'CommonService',
            function ($http, $q, commonService) {
                return {
                    /*查询会员信息*/
                    queryMemberInfo: function (phone) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getAppServerUrl() + "/app/member/cellNumber/" + phone,
                            method: "get",
                            data: {}
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*会员消费*/
                    memberConsume: function (data) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getAppServerUrl() + "/app/consume",
                            method: "post",
                            data: "id=" + data.id + "&payType=" + data.payType + "&productId=" + data.productId + "&money=" + data.money + "&given=" + data.given
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*会员充值*/
                    memberRecharge: function (data) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getAppServerUrl() + "/app/charge",
                            method: "post",
                            data: "id=" + data.id + "&payType=" + data.payType + "&packetId=" + data.packetId + "&money=" + data.money + "&given=" + data.given
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*添加会员*/
                    memberCreate: function (data) {
                        var deferred = $q.defer();
                        var info = "cellNumber=" + data.cellNumber + "&name=" + data.name;
                        if (data.password != null && data.password.trim() != "" && data.password != "undefined") {
                            info += "&password=" + data.password;
                        }
                        if (data.card != null && data.card.trim() != "" && data.card != "undefined") {
                            info += "&card=" + data.card;
                        }
                        $http({
                            url: "http://" + commonService.getAppServerUrl() + "/app/member",
                            method: "put",
                            data: info
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
