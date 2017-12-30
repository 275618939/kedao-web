define(['services/services', 'services/commonService'],
    function (services) {
        services.factory('UserService', ['$http', '$q', 'CommonService',
            function ($http, $q, commonService) {
                return {
                    downCourse: 2,
                    collectCourse: 3,
                    secrecyOpen: 0,
                    secrecyClose: 1,
                    /*创建店面*/
                    shopCreate: function (data) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/business/shop",
                            method: "put",
                            data: "name=" + data.name + "&description=" + data.description + "&address=" + data.address + "&telephone=" + data.telephone + "&longitude =" + data.longitude + "&latitude =" + data.latitude
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*用户登录*/
                    userLogin: function (data) {
                        var deferred = $q.defer();
                        var info;
                        if (data.verify == null || data.verify.trim() == "" || data.verify == "undefined") {
                            info = "account=" + data.account + "&password=" + data.password;
                        } else {
                            info = "account=" + data.account + "&verify=" + data.verify + "&password=" + data.password;
                        }
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/business/worker/login",
                            method: "POST",
                            data: info
                            //data: "account=" + data.account + "&verify=" + data.verify + "&password=" + data.password
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*用户注册*/
                    userCreate: function (data) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/business/worker/register",
                            method: "post",
                            data: "account=" + data.account + "&verify=" + data.verify + "&password=" + data.password
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*获取图片验证码*/
                    getImageVerify: function (account) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/business/image/verify/" + account,
                            method: "get"
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*用户发送验证码*/
                    sendVerify: function (mobile) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/business/sms/verify",
                            method: "post",
                            data: "account=" + mobile
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*用户忘记密码*/
                    forgetPass: function (data) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/business/worker/forget",
                            method: "post",
                            data: "account=" + data.account + "&verify=" + data.verify
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*用户设置密码*/
                    setPass: function (data) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/business/worker/setpwd",
                            method: "post",
                            data: "account=" + data.account + "&verify=" + data.verify + "&newpwd=" + data.newpwd
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
