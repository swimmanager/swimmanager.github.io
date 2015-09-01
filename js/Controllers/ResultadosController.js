app.controller('ResultadosCtrl', function ($scope, $http) { // ejemplo
    //Schema
    $scope.userSelect = {
        "anvandarnamn": "",
        "losenord": "",
        "roll": "User"
    };

    $scope.idList = [{
        id: "inp0",
        idt: "int0"
    }];

    $scope.load = function () {
        Conector.torneos.getAll($http).then(function (response) {
            $scope.torneos = response.data._items;
        }, function (response) {
            console.error(response);
        });
        Conector.eventos.getAll($http).then(function (response) {
            $scope.eventos = response.data._items;
        }, function (response) {
            console.error(response);
        });
    };

    $scope.loadUsuarios = function () {
        //Loading.show();
        var user = "Nata2015";
        var pass = "__Swim__2015";

        Conector.logInAdmin($http, $scope, user, pass).then(function () {
            if ($scope.auth) {
                Conector.usuarios.getAll($http)
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
            //PopUp.showSuccess('Usuario Agregado Exitosamente');
            swal({
                title: "Exito",
                text: "Usuario Agregado",
                type: "success",
                showConfirmButton: true,
                closeOnConfirm: true
            }, function () {
                window.location.replace("Usuarios.html");
            });
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
            //PopUp.showSuccess('Usuario Agregado Exitosamente');
            swal({
                title: "Exito",
                text: "Nombre de Usuario Cambiado",
                type: "success",
                showConfirmButton: true,
                closeOnConfirm: true
            }, function () {
                window.location.replace("Usuarios.html");
            });
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
            //PopUp.showSuccess('Usuario Agregado Exitosamente');
            swal({
                title: "Exito",
                text: "Contraseña Cambiada",
                type: "success",
                showConfirmButton: true,
                closeOnConfirm: true
            }, function () {
                window.location.replace("Usuarios.html");
            });
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
            //PopUp.showSuccess('Usuario Agregado Exitosamente');
            swal({
                title: "Exito",
                text: "Rol Cambiado",
                type: "success",
                showConfirmButton: true,
                closeOnConfirm: true
            }, function () {
                window.location.replace("Usuarios.html");
            });
        }, function (response) {
            console.error(response); // Deberia haber un mejor manejo aqui
        });
    };


    //funcion que borra el torneo de la base
    $scope.deleteUsuario = function () {
        var auth = "Nata2015:__Swim__2015";
        swal({
            title: "Seguro desea borrarlo?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Si, Borrar!",
            cancelButtonText: "No",
            closeOnConfirm: false,
            closeOnCancel: true
        }, function (isConfirm) {
            if (isConfirm) {
                var id = document.getElementById("idselector").selectedIndex;
                var currnt = $scope.users[id];
                Conector.usuarios.delete($http, Base64.encode(auth), currnt._id, currnt._etag)
                    .then(function (response) {
                        swal({
                            title: "Exito",
                            text: "Usuario Borrado",
                            type: "success",
                            showConfirmButton: true,
                            closeOnConfirm: true
                        }, function () {
                            window.location.replace("Usuarios.html");
                        });
                    }, function (response) {
                        console.error(response); // Deberia haber un mejor manejo aqui
                    });
            } else {}
        });
    };
});