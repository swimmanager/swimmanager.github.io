app.controller('AtletasBCtrl', function ($scope, $http) {
    //Schema
    $scope.atletaFull = {
        "Peso": 0,
        "Beneficiario": {
            "Nombre": "",
            "Cedula": ""
        },
        "FechaNacimiento": "",
        "Nombre": {
            "_id": "",
            "Apellido2": "",
            "Apellido1": "",
            "Imagen": "",
            "Nombre": "",
            "Carrera": "",
            "_etag": ""
        },
        "TipoSangre": "",
        "Estatura": 0,
        "_etag": "",
        "_id": "",
        "Genero": "",
        "Correo": "",
        "Carne": "",
        "Cedula": "",
        "Lateralidad": "",
        "Telefonos": ""
    };
    var auth = "Nata2015:__Swim__2015";
    $scope.loadOneAtleta = function () {
        var id = getUrlVars()["id"];
        Conector.atletas.getOneAll($http, id)
            .then(function (response) {
                $scope.atletaOne = response.data._items[0];
                console.log(response);

            }, function (response) {
                console.error(response); // Deberia haber un mejor manejo aqui
            });

    };

    $scope.updateAthlete = function () {


        var atleta = {
            "Nombre": $scope.atletaOne.Nombre.Nombre,
            "Apellido1": $scope.atletaOne.Nombre.Apellido1,
            "Apellido2": $scope.atletaOne.Nombre.Apellido2,
            "Carrera": $scope.atletaOne.Nombre.Carrera
        };


        Conector.atletas.updateNombre($http, atleta, Base64.encode(auth), $scope.atletaOne.Nombre._id, $scope.atletaOne.Nombre._etag)
            .then(function (response) {
                //$scope.atletas = response.data._items;
                var atletafull = {
                    "Cedula": $scope.atletaOne.Cedula,
                    "Telefonos": $scope.atletaOne.Telefonos,
                    "Genero": $scope.atletaOne.Genero,
                    "Lateralidad": $scope.atletaOne.Lateralidad,
                    "TipoSangre": $scope.atletaOne.TipoSangre,
                    "Peso": $scope.Peso,
                    "Estatura": $scope.atletaOne.Estatura,
                    "Beneficiario": {
                        "Nombre": $scope.atletaOne.Beneficiario.Nombre,
                        "Cedula": $scope.atletaOne.Beneficiario.Cedula
                    }
                };
                Conector.atletas.updateAll($http, atletafull, Base64.encode(auth), $scope.atletaOne._id, $scope.atletaOne._etag)
                    .then(function (response) {
                        window.location.href = "atletaV.html"
                    }, function (response) {
                        console.error(response); // Deberia haber un mejor manejo aqui
                    });
            }, function (response) {
                console.error(response); // Deberia haber un mejor manejo aqui
            });

    };



    $scope.deleteAthlete = function () {
        var atleta = $scope.atletaOne[0];
        swal({
            title: "¿Quiere Borrar este Atleta?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Aceptar",
            closeOnConfirm: false
        }, function () {
            console.log($scope.atletaOne);
            Conector.atletas.deleteNombre($http, Base64.encode(auth), $scope.atletaOne.Nombre._id, $scope.atletaOne.Nombre._etag, 0).then(function (response) {
                Conector.atletas.deleteAll($http, Base64.encode(auth), $scope.atletaOne._id, $scope.atletaOne._etag, 0).then(function (response) {
                    swal("Borrado", "El atleta ha sido Borrado", "success");
                    window.location.href = "atletaV.html";
                }, function (response) {
                    console.error(response); // Deberia haber un mejor manejo aqui
                });

            }, function (response) {
                console.error(response); // Deberia haber un mejor manejo aqui
            });

        });

    };

});