/*global app, Conector, PopUp */
/*jslint browser: true*/
app.controller('UsuariosCtrl', function ($scope, $http, $state, LoadingGif, Auth) { // ejemplo
    //Schema
    LoadingGif.deactivate();
    LoadingGif.activate();
    $scope.userSelect = {
        "anvandarnamn": "",
        "losenord": "",
        "roll": "User"
    };
    $scope.loadUsuarios = function () {
        //Loading.show();


        Conector.logInAdminB($http, $scope, Auth.auth()).then(function () {
            if ($scope.Auth.auth()) {
                Conector.usuarios.getAll($http, $scope.Auth.auth())
                    .then(function (response) {
                        $scope.users = response.data._items;
                        LoadingGif.deactivate();
                    }, function (response) {
                        console.error(response); // Deberia haber un mejor manejo aqui
                    });
            } else {
                console.log($scope.Auth.auth());
            }
        }, function (err) {
            console.error(err);
            LoadingGif.deactivate();
            PopUp.InvalidLogin();
        });
    };

    $scope.addUsuario = function () {
        //login data
        Conector.usuarios.add($http, $scope.userMod, Auth.auth()).
        then(function (response) {
            PopUp.successSamePage("Usuario Agregado", $state);
        }, function (response) {
            console.error(response); // Deberia haber un mejor manejo aqui
        });
    };

    $scope.patchUsername = function () {
        //login data

        var data = {
            anvandarnamn: $scope.userMod.anvandarnamn
        };

        var id = document.getElementById("idselector").selectedIndex;
        var currnt = $scope.users[id];

        Conector.usuarios.update($http, data, Auth.auth(), currnt._id, currnt._etag).
        then(function (response) {
            PopUp.successSamePage("Nombre de Usuario Cambiado", $state);
        }, function (response) {
            console.error(response); // Deberia haber un mejor manejo aqui
        });
    };

    $scope.patchPass = function () {
        //login data

        var data = {
            losenord: $scope.userMod.losenord
        };

        var id = document.getElementById("idselector").selectedIndex;
        var currnt = $scope.users[id];

        Conector.usuarios.update($http, data, Auth.auth(), currnt._id, currnt._etag).
        then(function (response) {
            PopUp.successSamePage("Contraseña Cambiada", $state);
        }, function (response) {
            console.error(response); // Deberia haber un mejor manejo aqui
        });
    };

    $scope.patchRol = function () {
        //login data

        var data = {
            roll: $scope.userMod.roll
        };

        var id = document.getElementById("idselector").selectedIndex;
        var currnt = $scope.users[id];

        Conector.usuarios.update($http, data, Auth.auth(), currnt._id, currnt._etag).
        then(function (response) {
            PopUp.successSamePage("Rol Cambiado", $state);
        }, function (response) {
            console.error(response); // Deberia haber un mejor manejo aqui
        });
    };


    $scope.deleteUsuario = function () {

        PopUp.deleteConfirmation(function (response) {
            if (response === 1) {
                var id = document.getElementById("idselector").selectedIndex;
                var currnt = $scope.users[id];
                Conector.usuarios.delete($http, Auth.auth(), currnt._id, currnt._etag)
                    .then(function (response) {
                        PopUp.successSamePage("Usuario Borrado", $state);
                    }, function (response) {
                        console.error(response); // Deberia haber un mejor manejo aqui
                    });
            } else {}
        });
    };
});