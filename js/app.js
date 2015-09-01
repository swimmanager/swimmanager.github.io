    $(document).ready(function () {
        var i = 1;
        $("#add_row").click(function () {
            $('#addr' + i).html("<td>" + (i + 1) + "</td><td><input name='name" + i + "' type='text' placeholder='Name' class='form-control input-md'  /> </td><td><input  name='mail" + i + "' type='text' placeholder='Mail'  class='form-control input-md'></td><td><input  name='mobile" + i + "' type='text' placeholder='Mobile'  class='form-control input-md'></td>");

            $('#tab_logic').append('<tr id="addr' + (i + 1) + '"></tr>');
            i++;
        });
        $("#delete_row").click(function () {
            if (i > 1) {
                $("#addr" + (i - 1)).html('');
                i--;
            }
        });

    });


    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            vars[key] = value;
        });
        return vars;
    }


    var app = angular.module('SwimManager', ["ui.bootstrap"]);


    app.controller('AtletasCtrl', function ($scope, $http) { // ejemplo
        $scope.getallnombre = function () {
            Conector.atletas.getNombre($http)
                .then(function (response) {
                    $scope.atletas = response.data._items;
                }, function (response) {
                    console.error(response);
                });
        };

        $scope.atleta = {
            "Nombre": "",
            "Apellido1": "",
            "Apellido2": "",
            "Imagen": "",
            "Carrera": ""
        };



        var auth = "Nata2015:__Swim__2015";

        $scope.post = function (img) {

            var iurl = img.substr(img.indexOf(",") + 1, img.length); //esto le limpia unas basuras a la imagen
            //console.log(iurl); //esto esra para probar que sio agarro el base64 de la imagen
            //$("#wait").css("display", "block"); //mae esto es opcional fue que yo puse un gif que estaba oculto y le di display para que se viera mientras
            //se subia la imagen
            $.ajax({ //ya esto es usar el API de imgur
                url: "https://api.imgur.com/3/image",
                type: "POST",
                datatype: "json",
                data: {
                    'image': iurl,
                    'type': "base64",
                },
                success: function (response) {
                    //aca puede hacer console.log(response);
                    //para que vea lo q imgur responde

                    $scope.atleta.Imagen = response.data.link;
                },
                error: function (response) {
                    console.log(response);
                },
                complete: function () {
                    Conector.atletas.addNombre($http, $scope.atleta, Base64.encode(auth)).then(function (rep2) {

                        $scope.atletaB.Nombre = rep2.data._id;
                        $scope.atletaB.FechaNacimiento = $scope.atletaB.FechaNacimiento.toString();

                        Conector.atletas.addAll($http, $scope.atletaB, Base64.encode(auth)).then(function () {
                            sweetAlert("Registrado con exito");
                            window.location.href = "atletaV.html";

                        }, function (rrw) {
                            console.log(rrw);
                        });
                    });
                    //$("#wait").css("display", "none"); // ya aca se quitaba el gif de loading
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Client-ID " + "b789fe91a265f45"); //esto es q antes de enviar pide verificacion de que ud es usuario, puede hacerse una app en imgur y ya ellos le dan su ID
                }
            });
        };
        $scope.addAthleteFull = function () {
            var id = "";
            var reader = new FileReader();
            var archivo = $('#image')[0].files[0];
            reader.readAsDataURL(archivo); //esto convierte la imagen al formato que acepta imgur
            reader.onload = function (e) {
                $scope.post(e.target.result);
            };


        };
        $scope.deleteAthlete = function (id, etag) {
            var auth = "Nata2015:__Swim__2015";
            Conector.atletas.deleteNombre($http, Base64.encode(auth), id, etag)
                .then(function (response) {
                    //$scope.atletas = response.data._items;
                    console.log(response);
                }, function (response) {
                    console.error(response); // Deberia haber un mejor manejo aqui
                });
            console.log($scope.athlete);
        };


    });