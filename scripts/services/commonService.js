define(['services/services'],
    function (services) {
        services.factory('CommonService', [
            function () {
                return {
                    weixin_expires_in: 7200 * 1000,//微信token有效期，单位毫秒
                    /*    weixin_appID:'wxfe49c636d485e4d9',
                     weixin_appsecret:'3e23328c96455dd6776a48eb8a55be28',*/
                    weixin_appID: 'wxcc0665a79fe9c691',
                    weixin_appsecret: '22470b2c0d6eba71c555c8dfaf2b4ad8',
                    OneDayValidity: 24 * 60 * 60 * 1000,//有效期1天
                    ThirtyDayValidity: 30 * 60 * 60 * 1000,//有效期30天
                    HxAllTime: 9,
                    defaultPower: 0x3f9f,
                    getPowerInfo: function (id) {
                        var len = this.powerInfo.powerOptions.length;
                        for (var j = 0; j < len; j++) {
                            if (id == this.powerInfo.powerOptions[j].id) {
                                return this.powerInfo.powerOptions[j].label;
                            }
                        }
                        return id;
                    },
                    powerInfo: {
                        "powerOptions": [
                            /*{
                                "id": 0xbf9b,
                                "label": "系统管理员"
                            },
                            {
                                "id": 0xb39b,
                                "label": "员工权限"
                            },*/
                            {
                                "id": 0xff7,
                                "label": "店长权限"
                            }/*,
                            {
                                "id": 0x0002,
                                "label": "店员信息维护"
                            },
                            {
                                "id": 0x0004,
                                "label": "服务维护"
                            },
                            {
                                "id": 0x0008,
                                "label": "套餐维护"
                            },
                            {
                                "id": 0x0010,
                                "label": "会员维护"
                            },
                            {
                                "id": 0x0020,
                                "label": "充值"
                            },
                            {
                                "id": 0x0040,
                                "label": "消费"
                            },
                            {
                                "id": 0x0080,
                                "label": "会员列表"
                            },
                            {
                                "id": 0x0100,
                                "label": "充值列表"
                            },
                            {
                                "id": 0x0200,
                                "label": "消费列表"
                            },
                            {
                                "id": 0x0400,
                                "label": "店统计"
                            },
                            {
                                "id": 0x0800,
                                "label": "店员统计"
                            },
                            {
                                "id": 0x1000,
                                "label": "工人维护"
                            },
                            {
                                "id": 0x2000,
                                "label": "公司维护"
                            },
                            {
                                "id": 0x8000,
                                "label": "权限控制"
                            }*/]
                    },
                    reportUrl: "http://" + window.location.host + ":9601/getScaleReportResult?json={'resultId':*}",
                    //添加cookie
                    addCookie: function (name, value, time) {
                        var exp = new Date();
                        //var duration=2 * 60 * 1000;
                        exp.setTime(exp.getTime() + time);
                        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
                    },
                    //获得cookie
                    getCookie: function (name) {
                        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
                        if (arr != null) return unescape(arr[2]);
                        return null;
                    },
                    //删除cookie
                    delCookie: function (name) {
                        var exp = new Date();
                        exp.setTime(exp.getTime() - 1);
                        var cval = this.getCookie(name);
                        if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
                    },
                    //返回服务器请求地址
                    getServerUrl: function () {
                        //return window.location.host;
                        //return "101.200.176.217";
                        return "business.aiyunzhou.com";
                    },
                    //返回显示消息条数
                    getMessageCount: function () {
                        return 5;
                    },
                    //current page
                    getCurrentPage: function () {
                        return 1;
                    },
                    //max Number
                    getMaxNumber: function () {
                        return 100;
                    },
                    //group Number
                    getGroup: function () {
                        return 4;
                    },
                    //获得随机字符串 "ABC".toLowerCase()//转小写  "abc".toUpperCase()//转大写
                    getRandomString: function (len) {
                        len = len || 32;
                        len = len || 32;
                        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
                        var maxPos = $chars.length;
                        var pwd = '';
                        for (i = 0; i < len; i++) {
                            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
                        }
                        return pwd;
                    },
                    getDiscount: function (money) {
                        var yuan = money * 10.0;
                        return yuan.toFixed(0);
                    },
                    getDiscountConvert: function (money) {
                        var yuan = money / 10.0;
                        return yuan.toFixed(1);
                    },
                    getFen: function (money) {
                        if (money <= 0) {
                            return money;
                        }
                        var data = 0;
                        var dotCount = 0; //小数点个数
                        var floatCount = 0; //小数点后数据位数
                        if (money == null)return -1;
                        money = money.toString();
                        var size = money.length;
                        for (var i = 0; i < size; i++) {
                            var c = money.charCodeAt(i);
                            if (c >= 0x30 && c <= 0x39) {
                                if (dotCount > 0) {
                                    floatCount++;
                                }
                                if (floatCount > 2)return -1;
                                data = data * 10 + (c - 0x30);
                            }
                            else if (c == 0x2e) {
                                dotCount++;
                                if (dotCount > 1)return -1;
                            }
                            else {
                                return -1;
                            }
                        }
                        for (var i = 2; i > floatCount; i--) {
                            data = data * 10;
                        }
                        return data;
                    },
                    getYuan: function (money) {

                        /* if (money < 0) return null;
                         var data = "";

                         data = String.fromCharCode(money % 10 + 0x30) + data;    //分
                         money /= 10;
                         data = String.fromCharCode(money % 10 + 0x30) + data;    //角
                         money /= 10;
                         data = '.' + data;
                         if (money > 0) {
                         while (money > 0) {
                         data = String.fromCharCode(money % 10 + 0x30) + data;
                         money /= 10;
                         }
                         } else {
                         data = '0' + data;
                         }
                         return data;*/

                        var yuan = money / 100.0;
                        return yuan.toFixed(0);
                    },
                    jsonSort: function (json, key) {
                        for (var j = 1, jl = json.length; j < jl; j++) {
                            var temp = json[j],
                                val = temp[key],
                                i = j - 1;
                            while (i >= 0 && json[i][key] > val) {
                                json[i + 1] = json[i];
                                i = i - 1;
                            }
                            json[i + 1] = temp;

                        }
                        return json;
                    },
                    sortByKey: function (array, key) {
                        return array.sort(function (a, b) {
                            var x = a[key];
                            var y = b[key];
                            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                        });
                    },
                    timeStamp2String: function (time) {
                        var datetime = new Date();
                        datetime.setTime(time);
                        var year = datetime.getFullYear();
                        var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
                        var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
                        var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
                        var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
                        var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
                        return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
                    },
                    timeStamp2StringShort: function (time) {
                        var datetime = new Date();
                        datetime.setTime(time);
                        var year = datetime.getFullYear();
                        var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
                        var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
                        var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
                        var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
                        var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
                        return year + "-" + month + "-" + date + " " + hour + ":" + minute;
                    },
                    strToTime: function (str) {
                        if (str.length != 8) {
                            return str;
                        }
                        var year = str.substring(0, 4);
                        var month = str.substring(4, 6);
                        var date = str.substring(6, 8);
                        return year + "-" + month + "-" + date;
                    },
                    getAge: function (str) {
                        if (str.length != 10) {
                            return str;
                        }
                        var userYear = str.substring(0, 4);
                        var datetime = new Date();
                        var nowYear = datetime.getFullYear();
                        var age = parseInt(nowYear) - parseInt(userYear);
                        return age;
                    },
                    strToShort: function (str) {
                        var shortTime = str.substring(0, 10);
                        return shortTime;
                    },
                    timeDiff: function (str) {
                        str = str.replace(" ", "");
                        var year = str.substring(0, 4);
                        var month = str.substring(5, 7) - 1;
                        var date = str.substring(8, 10);

                        var hour = str.substring(10, 12);
                        var minute = str.substring(13, 15);
                        var second = str.substring(16, 18);

                        var date1 = new Date(year, month, date, hour, minute, second);    //开始时间
                        var date2 = new Date();    //结束时间

                        var date3 = date2.getTime() - date1.getTime();  //时间差的毫秒数
                        //计算出相差天数
                        var days = Math.floor(date3 / (24 * 3600 * 1000));
                        var info;
                        if (days >= 1) {
                            info = "一天以前";
                            window.console.log("------------>>>diff:info=" + info);
                            return {type: 1, time: days, des: info};
                        }
                        //计算出小时数
                        var leave1 = date3 % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
                        var hours = Math.floor(leave1 / (3600 * 1000));
                        //计算相差分钟数
                        var leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
                        var minutes = Math.floor(leave2 / (60 * 1000));
                        if (hours >= 1) {
                            //计算相差分钟数
                            info = hours + "小时";
                            if (minutes > 0) {
                                info += minutes + "分";
                            }
                            info += "以前";
                            window.console.log("------------>>>diff:info=" + info);
                            return {type: 2, hours: hours, minutes: minutes, des: info};
                        } else {
                            info = minutes + "分以前";
                            window.console.log("------------>>>diff:info=" + info);
                            return {type: 3, minutes: minutes, des: info};
                        }

                    }

                };
            }]);
    });
