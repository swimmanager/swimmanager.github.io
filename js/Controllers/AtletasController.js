/*global app, Conector, $,PopUp */
/*jslint browser: true*/
app.controller('AtletasCtrl', function ($scope, $http, $state, LoadingGif, Auth) { // ejemplo
    LoadingGif.deactivate();
    LoadingGif.activate();
    $scope.$state = $state;
    ////console.log($scope);

    $scope.getallnombre = function () {
        Conector.atletas.getBasic($http)
            .then(function (response) {
                //console.log(response);
                $scope.atletas = response.data._items;
                //LoadingGif.deactivate();
                LoadingGif.deactivate();
            }, function (response) {
                console.error(response);
            });
    };

    $scope.init = function () {
        if (!Auth.state()) {
            PopUp.InvalidLogin($state);
            LoadingGif.deactivate();
            return;
        }
        LoadingGif.activate();
        Conector.carreras.getAll($http).then(function (response) {
            $scope.carreras = response.data._items;
            //LoadingGif.deactivate();
            LoadingGif.deactivate();
        }, function (resp) {
            console.error(resp);
        });


    };

    $scope.post = function (img) {
        LoadingGif.activate();

        var iurl = img.substr(img.indexOf(",") + 1, img.length); //esto le limpia unas basuras a la imagen

        $.ajax({ //ya esto es usar el API de imgur
            url: "https://api.imgur.com/3/image",
            type: "POST",
            datatype: "json",
            data: {
                'image': iurl,
                'type': "base64",
            },
            success: function (response) {
                //aca puede hacer //console.log(response);
                //para que vea lo q imgur responde

                $scope.atleta.Imagen = response.data.link.replace("http", "https");
            },
            error: function (response) {
                //console.log(response);
            },
            complete: function () {
                if ($('#beneficiario').val() === "") {
                    $scope.atleta.Beneficiario.Nombre = "";
                }
                Conector.atletas.add($http, $scope.atleta, Auth.auth()).then(function (response) {
                    LoadingGif.deactivate();
                    PopUp.successChangePage("Atleta Creado", "atletas.html");
                }, function (err) {
                    LoadingGif.deactivate();
                    console.error(err);
                });

            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("authorization", "Client-ID " + "b415538ff4bcf10"); //esto es q antes de enviar pide verificacion de que ud es usuario, puede hacerse una app en imgur y ya ellos le dan su ID
            }
        });
    };

    $scope.addAthleteFull = function () {
        LoadingGif.activate();
        var reader = new FileReader();
        var archivo = $('#image')[0].files[0];
        //Para poder crear atleta sin fecha de nacimiento
        if ($scope.atleta.FechaNacimiento) {
            $scope.atleta.FechaNacimiento = $scope.atleta.FechaNacimiento.valueOf();
        } else {
            $scope.atleta.FechaNacimiento = 0;
        }
        if (archivo) {
            reader.readAsDataURL(archivo); //esto convierte la imagen al formato que acepta imgur
            reader.onload = function (e) {
                $scope.post(e.target.result);
            };
        } else {
            Conector.atletas.add($http, $scope.atleta, Auth.auth()).then(function (response) {
                LoadingGif.deactivate();
                PopUp.successChangePage("Atleta Creado", "AtletasView", $state);

            }, function (err) {
                LoadingGif.deactivate();
                console.error(err);
            });

        }



    };



});