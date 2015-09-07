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
                $scope.atletaOne = response.data;
                $scope.atletaOne.FechaNacimiento = new Date($scope.atletaOne.FechaNacimiento);
                console.log(response);

            }, function (response) {
                console.error(response); // Deberia haber un mejor manejo aqui
            });

    };


    $scope.updateKey = function (imag, value) {
        var atletafull = {
            "Nombre": {
                "Nombre": $scope.atletaOne.Nombre.Nombre,
                "Apellido1": $scope.atletaOne.Nombre.Apellido1,
                "Apellido2": $scope.atletaOne.Nombre.Apellido2
            },
            "Carrera": $scope.atletaOne.Carrera._id,
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

        if (imag) {
            atletafull.Imagen = value;
        }

        Conector.atletas.update($http, atletafull, Base64.encode(auth), $scope.atletaOne._id, $scope.atletaOne._etag)
            .then(function (response) {
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
        swal({
            title: "¿Quiere Borrar este Atleta?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Aceptar",
            closeOnConfirm: false
        }, function () {
            console.log($scope.atletaOne);
            Conector.atletas.delete($http, Base64.encode(auth), $scope.atletaOne._id, $scope.atletaOne._etag, 0)
                .then(function (response) {
                    swal({
                        title: "Exito",
                        text: "Atleta Modificado",
                        type: "success",
                        showConfirmButton: true,
                        closeOnConfirm: true
                    }, function () {
                        window.location.replace("atletas.html");
                    });
                }, function (response) {
                    console.error(response); // Deberia haber un mejor manejo aqui
                });

        });

    };

});