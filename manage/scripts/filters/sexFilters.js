define(['filters', 'services/commonService'],
    function (filters) {
        filters.filter('SexFilters', ['CommonService',
            function (commonService) {
                return function (input) {
                    if (input == 1) {
                        return "男";
                    } else if (input == 0) {
                        return "女";
                    } else {
                        return "未知";
                    }

                }
            }]);
    });
