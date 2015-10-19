/*global app, Conector, PopUp, Ediciones */
/*jslint browser: true*/
app.controller('TorneosCtrl', function ($scope, $http, $stateParams, $state, LoadingGif, Auth) { // ejemplo
    LoadingGif.deactivate();
    //LoadingGif.activate();
    $scope.loading = true;
    $scope.$state = $state;

    //Schema
    $scope.torneo = {
        "Nombre": ""
    };
    $scope.edicion = {
        'Nombre': "",
        'Torneo': "",
        'fecha': ""
    };
    $scope.gifinit = function () {
        if (!Auth.state()) {
            PopUp.InvalidLogin($state);
            LoadingGif.deactivate();
            return;
        };
    };

    $scope.loadTorneos = function () {
        LoadingGif.activate();
        Conector.torneos.getAll($http)
            .then(function (response) {
                $scope.torneos = response.data._items;
                LoadingGif.deactivate();
                //console.log($scope.torneos);
            }, function (response) {
                console.error(response);
            });
    };

    $scope.updateEdicion = function (index) {
        var edicionModificar = $scope.EdicionesTorneo[index];
        //console.log(edicionModificar);
        var edicionModificarSend = {
            'Nombre': edicionModificar.Nombre,
            'Torneo': edicionModificar.Torneo,
            'fecha': edicionModificar.fecha.valueOf()
        };

        //console.log(edicionModificarSend);
        Conector.ediciones.update($http,
                edicionModificarSend,
                Auth.auth(),
                edicionModificar._id,
                edicionModificar._etag)
            .then(function (response) {
                PopUp.successSamePage("Edicion Modificada");
            LoadingGif.deactivate();
                //console.log(response);
            }, function (response) {
                console.error(response);
            LoadingGif.deactivate();
            });
    };
    $scope.loadOneTorneo = function () {
        if (!Auth.state()) {
            PopUp.InvalidLogin($state);
            LoadingGif.deactivate();
            return;
        }

        //console.log($state.current.name);
        var id = $stateParams.idTorneo;
        //Carga el nombre del torneo
        Conector.torneos.getOne($http, id)
            .then(function (response) {
                $scope.torneoOne = response.data;
                //console.log(response);
                LoadingGif.deactivate();
            }, function (response) {
                LoadingGif.deactivate();
                console.error(response);
            });
        //Carga las ediciones del torneo 
        Conector.ediciones.getAllbyTorneo($http, id)
            .then(function (response) {
                $scope.EdicionesTorneo = response.data._items;
                for (var i = 0; i < $scope.EdicionesTorneo.length; i++) {
                    $scope.EdicionesTorneo[i].fecha = new Date($scope.EdicionesTorneo[i].fecha);
                }
                LoadingGif.deactivate();
                //console.log($scope.EdicionesTorneo);

            }, function (response) {
            LoadingGif.deactivate();
                console.error(response);
            });
    };

    $scope.addTorneo = function () {
        if (!Auth.state()) {
            PopUp.InvalidLogin($state);
            LoadingGif.deactivate();
            return;
        }
        //login data
        //console.log($scope.torneo);
        Conector.torneos.add($http, $scope.torneo, Auth.auth()).
        then(function (response) {
            //console.log(response);
            $scope.edicion.Torneo = response.data._id;
            Ediciones.addEdicion($http, $scope.edicion, $state, LoadingGif, Auth.auth());
            LoadingGif.deactivate();
        }, function (response) {
            console.error(response); // Deberia haber un mejor manejo aqui
            LoadingGif.deactivate();
        });
    };

    $scope.addEdicion = function () {
        if (!Auth.state()) {
            PopUp.InvalidLogin($state);
            LoadingGif.deactivate();
            return;
        }
        //login data
        $scope.edicion.Torneo = $scope.torneoOne._id;
        Ediciones.addOtherEdicion($http, $scope.edicion, $scope.EdicionesTorneo, LoadingGif, Auth.auth());
    };

    $scope.deleteEdicion = function (index) {
        if (!Auth.state()) {
            PopUp.InvalidLogin($state);
            LoadingGif.deactivate();
            return;
        }
        //login data
        var edicionBorrar = $scope.EdicionesTorneo[index];
        PopUp.deleteConfirmation(function (response) {
            if (response === 1) {
                Ediciones.deleteEdicion($http, edicionBorrar._id, edicionBorrar._etag, $scope.EdicionesTorneo, index, LoadingGif, Auth.auth());
            }
        });
    };
    //funcion que actualiza el torneo de la base
    $scope.updateTorneo = function () {
        if (!Auth.state()) {
            PopUp.InvalidLogin($state);
            LoadingGif.deactivate();
            return;
        }

        $scope.torneo.Nombre = $scope.torneoOne.Nombre;

        Conector.torneos.update($http, $scope.torneo, Auth.auth(), $scope.torneoOne._id, $scope.torneoOne._etag)
            .then(function (response) {
                PopUp.successChangePage("Torneo Modificado", "TorneosView", $state);
            }, function (response) {
                console.error(response); // Deberia haber un mejor manejo aqui
            });
    };

    //funcion que borra el torneo de la base
    $scope.deleteTorneo = function () {
        if (!Auth.state()) {
            PopUp.InvalidLogin($state);
            LoadingGif.deactivate();
            return;
        }

        PopUp.deleteConfirmation(function (response) {
            if (response === 1) {
                Conector.torneos.delete($http, Auth.auth(), $scope.torneoOne._id, $scope.torneoOne._etag)
                    .then(function (response) {
                        PopUp.successChangePage("Torneo Borrado", "TorneosView", $state);
                    }, function (response) {
                        console.error(response); // Deberia haber un mejor manejo aqui
                    });
            }
        });
    };
});
