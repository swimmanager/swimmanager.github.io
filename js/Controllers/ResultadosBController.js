app.controller('ResultadosBCtrl', function ($scope, $http, $state, LoadingGif) { // ejemplo
    LoadingGif.deactivate();
    LoadingGif.activate();
    $scope.$state = $state;
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
                                    LoadingGif.deactivate();
                                }, function (response) {
                                    console.error(response);
                                });
                            });
                        }, function (response) {
                            console.error(response);
                        });
                        /*
                        Conector.resultados.getbyEd($http,edicion._id).then(function (response) {
                                    edicion.atletas = response.data._items;
                                }, function (response) {
                                    console.error(response);
                                });*/

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
        $scope.getAllAtletas();
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
                        PopUp.successChangePage("Resultado Borrado", "Resultados", $state);
                    }, function (response) {
                        console.error(response); // Deberia haber un mejor manejo aqui
                    });
            } else {}
        });
    };

    $scope.patchTime = function (id, etag, time) {
        var auth = "Nata2015:__Swim__2015";
        swal({
            title: "Nuevo Valor!",
            text: "Nuevo tiempo:",
            type: "input",
            inputValue: time,
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: "Tiempo"
        }, function (inputValue) {
            if (inputValue === false) return false;
            if (inputValue === "") {
                swal.showInputError("Debe Escribir algo");
                return false;
            }
            Conector.resultados.update($http, {
                    TiempoRealizado: inputValue
                }, Base64.encode(auth), id, etag)
                .then(function (response) {
                    PopUp.successChangePage("Tiempo Actualizado", "Resultados", $state);

                }, function (response) {
                    console.error(response); // Deberia haber un mejor manejo aqui
                });

        });

    };
    $scope.getEdiciones = function () {
        var index = document.getElementById("idTorneos").selectedIndex - 1;
        Conector.ediciones.getAllbyTorneo($http, $scope.torneos[index]._id).then(function (response) {
            $scope.ediciones = response.data._items;
        }, function (response) {
            console.error(response);
        });

    };

    $scope.getAllAtletas = function () {
        Conector.atletas.getonlyName($http).then(function (response) {
            console.log(response);
            $scope.atletas = response.data._items;
            console.log($scope.atletas);
        }, function (response) {
            console.error(response);
        });
    };




});