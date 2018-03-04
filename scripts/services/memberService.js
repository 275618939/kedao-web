define(['services/services', 'services/commonService'],
    function (services) {
        services.factory('MemberService', ['$http', '$q', 'CommonService',
            function ($http, $q, commonService) {
                return {
                    /*最大显示条数*/
                    PAGE_MAX_SIZE: 100,
                    /*查询会员信息*/
                    queryMemberInfo: function (phone) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getAppServerUrl() + "/app/member/cellNumber/" + phone + "?time=" + commonService.getDataString(),
                            method: "get",
                            data: {}
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*查询所有会员信息*/
                    queryAllMemberInfo: function (page) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getAppServerUrl() + "/app/member/list/" + page + "/" + this.PAGE_MAX_SIZE + "?time=" + commonService.getDataString(),
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
                            data: "id=" + data.id + "&payType=" + data.payType + "&productId=" + data.productId + "&money=" + data.money + "&given=" + data.given + "&waiterId=" + data.waiterId
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
                            data: "id=" + data.id + "&payType=" + data.payType + "&packetId=" + data.packetId + "&money=" + data.money + "&given=" + data.given + "&waiterId=" + data.waiterId
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*更新会员*/
                    memberNameUpdate: function (data) {
                        var deferred = $q.defer();
                        var info = "id=" + data.id + "&name=" + data.name;
                        $http({
                            url: "http://" + commonService.getAppServerUrl() + "/app/member/name",
                            method: "post",
                            data: info
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    memberPhoneUpdate: function (data) {
                        var deferred = $q.defer();
                        var info = "id=" + data.id + "&cellNumber=" + data.cellNumber;
                        $http({
                            url: "http://" + commonService.getAppServerUrl() + "/app/member/cellNumber",
                            method: "post",
                            data: info
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    memberCardUpdate: function (data) {
                        var deferred = $q.defer();
                        var info = "id=" + data.id + "&card=" + data.card;
                        $http({
                            url: "http://" + commonService.getAppServerUrl() + "/app/member/card",
                            method: "post",
                            data: info
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
                    },
                    /*查询最近关注的微信会员*/
                    queryWxRecent: function () {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getAppServerUrl() + "/app/weixin/recent" + "?time=" + commonService.getDataString(),
                            method: "get",
                            data: {}
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*绑定微信会员*/
                    bindMember: function (data) {
                        var deferred = $q.defer();
                        var info = "id=" + data.id + "&openId=" + data.openId;
                        $http({
                            url: "http://" + commonService.getAppServerUrl() + "/app/member/bind",
                            method: "post",
                            data: info
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*查询会员关注二维码*/
                    queryCompanyWxQrcode: function (id) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getAppServerUrl() + "/app/weixin/permanent" + "?time=" + commonService.getDataString(),
                            method: "get",
                            data: {}
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*查询会员关注二维码*/
                    queryWxQrcode: function (id) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getAppServerUrl() + "/app/weixin/qrcode/" + id + "?time=" + commonService.getDataString(),
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
