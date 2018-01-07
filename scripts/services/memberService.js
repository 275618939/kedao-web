define(['services/services', 'services/commonService'],
    function (services) {
        services.factory('MemberService', ['$http', '$q', 'CommonService',
            function ($http, $q, commonService) {
                return {
                    /*查询会员信息*/
                    queryMemberInfo: function (phone) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getAppServerUrl() + "/app/member/cellNumber/"+phone,
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
                            data:  "id=" + data.id + "&payType=" + data.payType + "&productId=" + data.productId + "&money=" + data.money + "&given=" + data.given
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
