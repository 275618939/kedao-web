define(['interceptors/interceptors', 'services/commonService'],
    function (interceptors) {
        interceptors.factory('RequestInterceptors', ['$log', '$q', '$rootScope', 'CommonService',
            function ($log, $q, $rootScope, commonService) {
                return {
                    requestError: function (config) {
                        $log.debug('requestError:log is here to show you that this is a regular factory with injection');
                        return config;
                    },
                    request: function (config) {
                        $rootScope.loading = true;
                        $log.debug('$request:log is here to show you that this is a regular factory with injection');
                        // config.headers["TOKEN"] = $rootScope.user.token;
                        //alert("request:"+ $rootScope.sessionId);
                        //$rootScope.sessionId="e10adc3949ba59abbe56e057f20f883e";
                        if ($rootScope.sessionId == null) {
                            $rootScope.sessionId = commonService.getCookie("hair-sessionId");
                            //$rootScope.sessionId="e10adc3949ba59abbe56e057f20f883e";
                        }
                        config.headers["Session-Id"] = $rootScope.sessionId;
                        config.headers["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";
                        config.headers["Accept"] = "*/*";
                        return config;
                    },
                    response: function (response) {
                        $rootScope.loading = false;
                        $log.debug('response:log is here to show you that this is a regular factory with injection');
                        // config.headers["TOKEN"] = $rootScope.user.token;
                        var data = response.data;
                        if (data.state == 99) {
                            //window.location.href="erro1.html?info="+data.desc;
                        }
                        if (data.state == 3) {
                            //用户需重新登录
                            window.location.href = "hair-login.html";
                        }
                        return response;
                    },
                    responseError: function (response) {
                        //var data = response.data;
                        var state = response.state;
                        if (state == 502) {
                            alert("服务器链接失败!");
                        }
                        /* if(data!=null&&data!=""){
                         $log.debug('response:log is here to show you that this is a regular factory with injection');
                         alert(data["errorCode"]);
                         if(data["errorCode"] == "500999"){
                         //$rootScope.user = {token:""};
                         // $rootScope.$emit("userIntercepted","notLogin",response);
                         }
                         if(data["errorCode"] == "500998"){
                         //$rootScope.$emit("userIntercepted","sessionOut",response);
                         }
                         }*/
                        return response;
                    }
                };
            }]);
    });
