/*global app, Conector, Base64, $,getUrlVars, swal */
/*jslint browser: true*/
app.controller('AtletasBCtrl', function ($scope, $http) {
    //Schema

    var auth = "Nata2015:__Swim__2015";



    $scope.loadOneAtleta = function () {
        $scope.loading = true;

        var id = getUrlVars().id;

        Conector.carreras.getAll($http).then(function (response) {
            $scope.carreras = response.data._items;
            $scope.loading = false;
        }, function (resp) {
            console.error(resp);
        });

        Conector.atletas.getOne($http, id)
            .then(function (response) {
                console.log(response.data);
                $scope.atletaOne = response.data;
                $scope.atletaOne.FechaNacimiento = new Date($scope.atletaOne.FechaNacimiento);
                if ($scope.atletaOne.Beneficiario === undefined) {

                    $scope.atletaUpdate = {
                        "Nombre": {
                            "Nombre": $scope.atletaOne.Nombre.Nombre,
                            "Apellido1": $scope.atletaOne.Nombre.Apellido1,
                            "Apellido2": $scope.atletaOne.Nombre.Apellido2
                        },
                        "Carrera": $scope.atletaOne.Carrera,
                        "Cedula": $scope.atletaOne.Cedula,
                        "Telefonos": $scope.atletaOne.Telefonos,
                        "Genero": $scope.atletaOne.Genero,
                        "Lateralidad": $scope.atletaOne.Lateralidad,
                        "TipoSangre": $scope.atletaOne.TipoSangre,
                        "Peso": $scope.atletaOne.Peso,
                        "Estatura": $scope.atletaOne.Estatura,
                        "Carne": $scope.atletaOne.Carne,
                        "Correo": $scope.atletaOne.Correo,
                        "FechaNacimiento": $scope.atletaOne.FechaNacimiento,
                        "Beneficiario": {
                            "Nombre": "",
                            "Cedula": ""
                        }
                    };

                } else {
                    $scope.atletaUpdate = $scope.atletaOne;


                }
                console.log($scope.atletaUpdate);


            }, function (response) {
                console.error(response); // Deberia haber un mejor manejo aqui
            });

    };


    $scope.updateKey = function (imag, value) {
        console.log($scope.atletaOne);


        var atletafull = {
            "Nombre": {
                "Nombre": $scope.atletaUpdate.Nombre.Nombre,
                "Apellido1": $scope.atletaUpdate.Nombre.Apellido1,
                "Apellido2": $scope.atletaUpdate.Nombre.Apellido2
            },
            "Carrera": $scope.atletaUpdate.Carrera._id,
            "Cedula": $scope.atletaUpdate.Cedula,
            "Telefonos": $scope.atletaUpdate.Telefonos,
            "Genero": $scope.atletaUpdate.Genero,
            "Lateralidad": $scope.atletaUpdate.Lateralidad,
            "TipoSangre": $scope.atletaUpdate.TipoSangre,
            "Peso": $scope.atletaUpdate.Peso,
            "Estatura": $scope.atletaUpdate.Estatura,
            "Carne": $scope.atletaUpdate.Carne,
            "Correo": $scope.atletaUpdate.Correo,
            "FechaNacimiento": $scope.atletaUpdate.FechaNacimiento.valueOf(),
            "Beneficiario": {
                "Nombre": $scope.atletaUpdate.Beneficiario.Nombre,
                "Cedula": $scope.atletaUpdate.Beneficiario.Cedula
            }
        };



        if (imag) {
            atletafull.Imagen = value;
        }

        Conector.atletas.update($http, atletafull, Base64.encode(auth), $scope.atletaOne._id, $scope.atletaOne._etag)
            .then(function (response) {
                $scope.loading = false;
                swal({
                    title: "Exito",
                    text: "Atleta Modificado",
                    type: "success",
                    showConfirmButton: true,
                    closeOnConfirm: true
                }, function () {
                    window.location.replace("AtletaOne.html?id=" + $scope.atletaOne._id);
                });

            }, function (response) {
                console.error(response); // Deberia haber un mejor manejo aqui
            });
    };


    $scope.updateAthlete = function () {
        $scope.loading = true;
        if ($('#image').val() === "") {
            $scope.updateKey(false);
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
                        $scope.updateKey(true, response.data.link.replace("http", "https"));
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
        PopUp.deleteConfirmation(function (response) {
            if (response === 1) {
                $scope.loading = true;
                Conector.atletas.delete($http, Base64.encode(auth), $scope.atletaOne._id, $scope.atletaOne._etag, 0)
                    .then(function (response) {
                        $scope.loading = false;
                        PopUp.successChangePage("Atleta Borrado", "atletas.html");
                        console.log(response);
                    }, function (response) {
                        console.error(response);
                    })
            }
        })

    };

});