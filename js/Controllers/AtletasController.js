app.controller('AtletasCtrl', function ($scope, $http) { // ejemplo
    $scope.loading = true;
    $scope.getallnombre = function () {
        Conector.atletas.getBasic($http)
            .then(function (response) {
                console.log(response);
                $scope.atletas = response.data._items;
                $scope.loading = false;
            }, function (response) {
                console.error(response);
            });
    };

    $scope.init = function () {
        $scope.loading = true;
        Conector.carreras.getAll($http).then(function (response) {
            $scope.carreras = response.data._items;
            $scope.loading = false;
        }, function (resp) {
            console.error(resp);
        });


    };

    var auth = "Nata2015:__Swim__2015";

    $scope.post = function (img) {
        //console.log($scope);
        $scope.loading = true;

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

                $scope.atleta.Imagen = response.data.link.replace("http", "https");
            },
            error: function (response) {
                console.log(response);
            },
            complete: function () {
                $scope.atleta.FechaNacimiento = $scope.atleta.FechaNacimiento.valueOf();
                Conector.atletas.add($http, $scope.atleta, Base64.encode(auth)).then(function (response) {
                    $scope.loading = false;
                    swal({
                        title: "Exito",
                        text: "Atleta Modificado",
                        type: "success",
                        showConfirmButton: true,
                        closeOnConfirm: true
                    }, function () {
                        window.location.replace("atletas.html");
                    });
                }, function (err) {
                    $scope.loading = false;
                    console.error(err);
                });

            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Client-ID " + "b415538ff4bcf10"); //esto es q antes de enviar pide verificacion de que ud es usuario, puede hacerse una app en imgur y ya ellos le dan su ID
            }
        });
    };

    $scope.addAthleteFull = function () {
        $scope.loading = true;
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