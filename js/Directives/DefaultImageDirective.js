app.directive('checkImage', function($http) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            attrs.$observe('ngSrc', function(ngSrc) {
                $http.get(ngSrc)
                .error(function(){
                    element.attr('src', '../../Img/defaultAtleta.png'); // set default image
                });
            });
        }
    };
});
