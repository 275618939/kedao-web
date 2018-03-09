define(['filters/filters'],
  function(filters) {
    filters.filter('IntervalFilters', [
      function() {
        return function(input) {
          input=Math.round(input/60);
          return input;
        }
      }]);
  });
