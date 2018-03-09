define(['filters/filters'],
  function(filters) {
    filters.filter('NameFilters', [
      function() {
        return function(input) {
          if(input==null||input.trim()==""){
             return "";
          }else{
            if(input.length>9){
              input=input.substring(0,9)+"...";
            }
            return input;
          }
        }
      }]);
  });
