define(['services/services', 'services/commonService'],
    function (services) {
        services.factory('ProductService', ['$http', '$q', 'CommonService',
            function ($http, $q, commonService) {
                return {
                    /*添加产品类别*/
                    classfyCreate: function (data) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getAppServerUrl() + "/app/classify",
                            method: "put",
                            data: "name=" + data.name
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*添加产品信息*/
                    productCreate: function (data) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getAppServerUrl() + "/app/product",
                            method: "put",
                            data: "classifyId=" + data.classifyId + "&name=" + data.name + "&price=" + data.price + "&retain=" + data.retain
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*更新产品信息*/
                    productUpdate: function (data) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getAppServerUrl() + "/app/product",
                            method: "post",
                            data: "id=" + data.id + "&classifyId=" + data.classifyId + "&name=" + data.name + "&price=" + data.price + "&retain=" + data.retain
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*删除产品信息*/
                    productDelete: function (data) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getAppServerUrl() + "/app/product/" + data.classifyId + "/" + data.id,
                            method: "delete",
                            data: {}
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*查询产品类别信息*/
                    queryClassfyInfo: function () {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getAppServerUrl() + "/app/classify" + "?time=" + commonService.getDataString(),
                            method: "get",
                            data: {}
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*查询产品服务信息*/
                    queryProductInfo: function (classId) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getAppServerUrl() + "/app/product/" + classId + "?time=" + commonService.getDataString(),
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
