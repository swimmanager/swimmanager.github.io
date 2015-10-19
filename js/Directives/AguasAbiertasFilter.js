app.filter('aguasFilter', function() {
  return function(items, search) {
    var result = [];
    if (search) {
      angular.forEach(items, function(value) {
        if (value.Tipo.Nombre === 'Aguas Abiertas') {
          result.push(value);
        }
      });
      return result;
    }

    else{
      angular.forEach(items, function(value) {
        if (value.Tipo.Nombre != 'Aguas Abiertas') {
          result.push(value);
        }
      });
      return result;
    }

  }
});
