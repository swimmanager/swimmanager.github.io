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

    $scope.loadOneAtleta = function () {
        var id = getUrlVars()["id"];
        Conector.atletas.getOneAll($http, id)
            .then(function (response) {
                $scope.atletaOne = response.data._items[0];
            }, function (response) {
                console.error(response); // Deberia haber un mejor manejo aqui
            });

    };
});