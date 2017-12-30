define(['filters/filters', 'services/commonService'],
    function (filters) {
        filters.filter('MoneyFilters', ['CommonService',
            function (commonService) {
                return function (input) {
                    return commonService.getYuan(input);
                }
            }]);
    });
