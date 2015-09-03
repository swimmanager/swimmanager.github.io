app.controller('ResultadosBCtrl', function ($scope, $http) { // ejemplo

    $scope.torneos = [];

    $scope.loadT = function () {
        Conector.torneos.getAll($http).then(function (response) {
            $scope.torneos = response.data._items;
            $scope.torneos.forEach(function (torneo) {
                Conector.ediciones.getAllbyTorneo($http, [torneo._id]).then(function (response) {
                    torneo.ediciones = response.data._items;
                    torneo.ediciones.forEach(function (edicion) {
                        Conector.eventos.getAll($http).then(function (response) {
                            edicion.eventos = response.data._items;
                            edicion.eventos.forEach(function (evento) {
                                Conector.resultados.getbyIds($http, edicion._id, evento._id).then(function (response) {
                                    evento.atletas = response.data._items;
                                }, function (response) {
                                    console.error(response);
                                });
                            });
                        }, function (response) {
                            console.error(response);
                        });
                    });
                }, function (response) {
                    console.error(response);
                });
            });
            console.log($scope.torneos);
        }, function (response) {
            console.error(response);
        });
        console.log($scope.torneos);
    };

    $scope.deleteR = function (id, etag) {
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
                Conector.resultados.delete($http, Base64.encode(auth), id, etag)
                    .then(function (response) {
                        swal({
                            title: "Exito",
                            text: "Usuario Borrado",
                            type: "success",
                            showConfirmButton: true,
                            closeOnConfirm: true
                        }, function () {
                            window.location.replace("./resultadosV.html");
                        });
                    }, function (response) {
                        console.error(response); // Deberia haber un mejor manejo aqui
                    });
            } else {}
        });
    };

    $scope.patchTime = function (id, etag) {
        var auth = "Nata2015:__Swim__2015";
        swal({
            title: "Nuevo Valor!",
            text: "Nuevo tiempo:",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: "Tiempo"
        }, function (inputValue) {
            if (inputValue === false) return false;
            if (inputValue === "") {
                swal.showInputError("Debe Escribir algo");
                return false
            }
            Conector.resultados.update($http, {
                    TiempoRealizado: inputValue
                }, Base64.encode(auth), id, etag)
                .then(function (response) {
                    swal({
                        title: "Exito",
                        text: "Tiempo Actualizado",
                        type: "success",
                        showConfirmButton: true,
                        closeOnConfirm: true
                    }, function () {
                        window.location.replace("./resultadosV.html");
                    });
                }, function (response) {
                    console.error(response); // Deberia haber un mejor manejo aqui
                });

        });

    };




});