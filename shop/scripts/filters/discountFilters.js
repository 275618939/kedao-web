define(['filters/filters', 'services/commonService'],
    function (filters) {
        filters.filter('DiscountFilters', ['CommonService',
            function (commonService) {
                return function (input) {
                    return commonService.getDiscountConvert(input);
                }
            }]);
    });
