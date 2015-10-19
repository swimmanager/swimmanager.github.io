/*global app, Conector, PopUp*/
/*jslint browser: true*/
app.factory("Auth", function () {
    return {
        state: function () {
            return localStorage.getItem("~ht~") !== null;
        },
        logIn: function (user, pass, $http, callback) {
            var scope = {};
            Conector.logIn($http, scope, user, pass).then(function () {
                //console.log("i");
                if (scope.auth === true) {
                    localStorage.setItem("~ht~", scope.auth_p);
                }
                callback();
            });
        },
        logOut: function (callback) {
            localStorage.removeItem("~ht~");
            callback();
        },
        auth: function () {
            return localStorage.getItem("~ht~");
        }
    };
});

app.controller('authbar', function ($scope, $http, $state, LoadingGif, Auth) { // ejemplo
    var check = function () {
        $scope.authstate = Auth.state();
    };
    var validate = function () {
        check();
        LoadingGif.deactivate();
        if ($scope.authstate) {
            PopUp.successSamePageNoReload("Autenticación Exitosa");
        } else {
            PopUp.errorSamePage("Credenciales Invalidas");
        }
    };
    $scope.user = undefined;
    $scope.pass = undefined;
    $scope.logIn = function () {
        LoadingGif.activate();
        Auth.logIn($scope.user, $scope.pass, $http, validate);
    };
    $scope.logOut = function () {
        Auth.logOut(check);
        $state.go("Home", null, {
            reload: true
        });
    };
    check();
});
