define(['filters/filters'],
    function(filters) {
      filters.filter('NumberNullFilters', [
        function() {
          return function(input) {

            if(input==null||input.trim()==""){
              return 0;
            }else{
              return input;
            }

          }
        }]);
    });
