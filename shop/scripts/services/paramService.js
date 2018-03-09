define(['services/services'],
    function(services) {
        services.factory('ParamService', ['$http','$q',
            function($http,$q) {
                return {
                    getValue: function(name) {
                        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                        var r = window.location.search.substr(1).match(reg);
                        if (r != null)
                            return decodeURIComponent(r[2]);
                           /* return decodeURIComponent(r[2]);*/
                        return null;
                      /*  var str = window.location.search;
                        if (str.indexOf(name) != -1) {
                            var pos_start = str.indexOf(name) + name.length + 1;
                            var pos_end = str.indexOf("&", pos_start);
                            if (pos_end == -1) {
                                return str.substring(pos_start);
                            } else {
                                return str.substring(pos_start, pos_end)
                            }
                        } else {
                            return "没有这个name值";
                        }*/
                    }
                };
            }]);
    });
