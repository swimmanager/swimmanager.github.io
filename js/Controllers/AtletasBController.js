/*global app, Conector, Base64, $,getUrlVars, swal */
/*jslint browser: true*/
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
        var id = getUrlVars().id;
        Conector.atletas.getOneAll($http, id)
            .then(function (response) {
                $scope.atletaOne = response.data._items[0];
                $scope.atletaOne.FechaNacimiento = new Date($scope.atletaOne.FechaNacimiento);
                console.log(response);

            }, function (response) {
                console.error(response); // Deberia haber un mejor manejo aqui
            });

    };


    $scope.updateAthlete = function () {
        if ($('#image').val() === "") {
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
                        "Peso": $scope.atletaOne.Peso,
                        "Estatura": $scope.atletaOne.Estatura,
                        "Carne": $scope.atletaOne.Carne,
                        "Correo": $scope.atletaOne.Correo,
                        "FechaNacimiento": $scope.atletaOne.FechaNacimiento.valueOf(),
                        "Beneficiario": {
                            "Nombre": $scope.atletaOne.Beneficiario.Nombre,
                            "Cedula": $scope.atletaOne.Beneficiario.Cedula
                        }
                    };

                    Conector.atletas.updateAll($http, atletafull, Base64.encode(auth), $scope.atletaOne._id, $scope.atletaOne._etag)
                        .then(function (response) {
                            window.location.href = "atletas.html";
                        }, function (response) {
                            console.error(response); // Deberia haber un mejor manejo aqui
                        });
                }, function (response) {
                    console.error(response); // Deberia haber un mejor manejo aqui
                });

        } else {
            var reader = new FileReader();
            var archivo = $('#image')[0].files[0];
            reader.readAsDataURL(archivo);
            reader.onload = function (e) {
                var img = e.target.result;
                var iurl = img.substr(img.indexOf(",") + 1, img.length);
                $.ajax({ //ya esto es usar el API de imgur
                    url: "https://api.imgur.com/3/image",
                    type: "POST",
                    datatype: "json",
                    data: {
                        'image': iurl,
                        'type': "base64",
                    },
                    success: function (response) {
                        var atleta = {
                            "Nombre": $scope.atletaOne.Nombre.Nombre,
                            "Apellido1": $scope.atletaOne.Nombre.Apellido1,
                            "Apellido2": $scope.atletaOne.Nombre.Apellido2,
                            "Carrera": $scope.atletaOne.Nombre.Carrera,
                            "Imagen": response.data.link
                        };
                        Conector.atletas.updateNombre($http, atleta, Base64.encode(auth), $scope.atletaOne.Nombre._id, $scope.atletaOne.Nombre._etag).then(function (response) {
                            //$scope.atletas = response.data._items;

                            var atletafull = {
                                "Cedula": $scope.atletaOne.Cedula,
                                "Telefonos": $scope.atletaOne.Telefonos,
                                "Genero": $scope.atletaOne.Genero,
                                "Lateralidad": $scope.atletaOne.Lateralidad,
                                "TipoSangre": $scope.atletaOne.TipoSangre,
                                "Peso": $scope.atletaOne.Peso,
                                "Estatura": $scope.atletaOne.Estatura,
                                "Beneficiario": {
                                    "Nombre": $scope.atletaOne.Beneficiario.Nombre,
                                    "Cedula": $scope.atletaOne.Beneficiario.Cedula
                                }
                            };

                            Conector.atletas.updateAll($http, atletafull, Base64.encode(auth), $scope.atletaOne._id, $scope.atletaOne._etag)
                                .then(function (response) {
                                    window.location.href = "atletas.html"
                                }, function (response) {
                                    console.error(response); // Deberia haber un mejor manejo aqui
                                });
                        }, function (response) {
                            console.error(response); // Deberia haber un mejor manejo aqui
                        });
                    },
                    error: function (response) {
                        console.log(response);
                    },

                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Client-ID " + "b415538ff4bcf10"); //esto es q antes de enviar pide verificacion de que ud es usuario, puede hacerse una app en imgur y ya ellos le dan su ID
                    }
                });

            };
        }




    };



    $scope.deleteAthlete = function () {
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
                    window.location.href = "atletas.html";
                }, function (response) {
                    console.error(response); // Deberia haber un mejor manejo aqui
                });

            }, function (response) {
                console.error(response); // Deberia haber un mejor manejo aqui
            });

        });

    };

});
