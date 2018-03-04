/*店业务处理*/
define(['services/services', 'services/commonService'],
    function (services) {
        services.factory('ShopService', ['$http', '$q', 'CommonService',
            function ($http, $q, commonService) {
                return {
                    /*创建店面*/
                    shopCreate: function (data) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/business/shop",
                            method: "PUT",
                            data: "id=" + data.id + "&name=" + data.name + "&description=" + data.description + "&address=" + data.address + "&telephone=" + data.telephone
                            //data: "id=" + data.id + "&name=" + data.name + "&description=" + data.description + "&address=" + data.address + "&telephone=" + data.telephone + "&longitude =" + data.longitude + "&latitude =" + data.latitude
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*更新店面*/
                    shopUpdate: function (data) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/business/shop",
                            method: "post",
                            data: "id=" + data.id + "&name=" + data.name + "&description=" + data.description + "&address=" + data.address + "&telephone=" + data.telephone
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*获取店信息*/
                    getShopList: function (page) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/business/shop/" + page + "/" + commonService.getMessageCount() + "?time=" + commonService.getDataString(),
                            method: "get",
                            data: {}
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    getDownName: function (url) {
                        var index = url.lastIndexOf("/");
                        var str = url.substring(index + 1, url.length);
                        return str;
                    }

                };
            }]);
    });
