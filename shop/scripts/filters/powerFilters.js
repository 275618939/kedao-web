define(['filters/filters', 'services/commonService'],
    function (filters) {
        filters.filter('PowerFilters', ['CommonService',
            function (commonService) {
                return function (input) {
                    return commonService.getPowerInfo(input);
                }
            }]);
    });
