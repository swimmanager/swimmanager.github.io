app.controller('UsuariosCtrl', function ($scope, $http,$state) { // ejemplo
    //Schema
    $scope.userSelect = {
        "anvandarnamn": "",
        "losenord": "",
        "roll": "User"
    };
    $scope.loadUsuarios = function () {
        //Loading.show();
        var user = "Nata2015";
        var pass = "__Swim__2015";

        Conector.logInAdmin($http, $scope, user, pass).then(function () {
            if ($scope.auth) {
                console.log($scope.auth);
                Conector.usuarios.getAll($http, $scope.auth_p)
                    .then(function (response) {
                        $scope.users = response.data._items;
                        console.log($scope.users);
                        //Loading.hide();
                    }, function (response) {
                        console.error(response); // Deberia haber un mejor manejo aqui
                    });
            } else {
                console.log($scope.auth);
            }
        }, function (err) {
            console.error(err);
            window.location.replace("../index.html");
        });
    };

    $scope.addUsuario = function () {
        var auth = "Nata2015:__Swim__2015"; //login data
        Conector.usuarios.add($http, $scope.userMod, Base64.encode(auth)).
        then(function (response) {
            PopUp.successSamePage("Usuario Agregado",$state);
        }, function (response) {
            console.error(response); // Deberia haber un mejor manejo aqui
        });
    };

    $scope.patchUsername = function () {
        var auth = "Nata2015:__Swim__2015"; //login data

        var data = {
            anvandarnamn: $scope.userMod.anvandarnamn
        };

        var id = document.getElementById("idselector").selectedIndex;
        var currnt = $scope.users[id];

        Conector.usuarios.update($http, data, Base64.encode(auth), currnt._id, currnt._etag).
        then(function (response) {
                PopUp.successSamePage("Nombre de Usuario Cambiado",$state);
        }, function (response) {
            console.error(response); // Deberia haber un mejor manejo aqui
        });
    };

    $scope.patchPass = function () {
        var auth = "Nata2015:__Swim__2015"; //login data

        var data = {
            losenord: $scope.userMod.losenord
        };

        var id = document.getElementById("idselector").selectedIndex;
        var currnt = $scope.users[id];

        Conector.usuarios.update($http, data, Base64.encode(auth), currnt._id, currnt._etag).
        then(function (response) {
            PopUp.successSamePage("Contraseña Cambiada",$state);
        }, function (response) {
            console.error(response); // Deberia haber un mejor manejo aqui
        });
    };

    $scope.patchRol = function () {
        var auth = "Nata2015:__Swim__2015"; //login data

        var data = {
            roll: $scope.userMod.roll
        };

        var id = document.getElementById("idselector").selectedIndex;
        var currnt = $scope.users[id];

        Conector.usuarios.update($http, data, Base64.encode(auth), currnt._id, currnt._etag).
        then(function (response) {
            PopUp.successSamePage("Rol Cambiado",$state);
        }, function (response) {
            console.error(response); // Deberia haber un mejor manejo aqui
        });
    };


    $scope.deleteUsuario = function () {
        var auth = "Nata2015:__Swim__2015";
        PopUp.deleteConfirmation(function (response) {
            if (response === 1) {
                var id = document.getElementById("idselector").selectedIndex;
                var currnt = $scope.users[id];
                Conector.usuarios.delete($http, Base64.encode(auth), currnt._id, currnt._etag)
                    .then(function (response) {
                        PopUp.successSamePage("Usuario Borrado",$state);
                    }, function (response) {
                        console.error(response); // Deberia haber un mejor manejo aqui
                    });
            } else {}
        });
    };
});
