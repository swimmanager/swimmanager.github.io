/*global app, Conector, PopUp */
/*jslint browser: true*/
app.controller('EventosCtrl', function ($scope, $http, $state, LoadingGif, Auth) {
    LoadingGif.deactivate();
    LoadingGif.activate();
    $scope.eventos = {
        'Nombre': '',
        'Genero': 'Masculino',
        'Tipo': ''
    };
    $scope.estilo = {
        'Nombre': ''
    };

    //este array creo q se puede borrar
    $scope.listaEventos = ['Masculino', 'Femenino', 'Mixto'];

    $scope.loadEstilos = function () {
        Conector.eventotipos.getAll($http).
        then(function (response) {
            $scope.tiposAll = response.data._items;
            LoadingGif.deactivate();
            console.log(response);
        }, function (response) {
            console.error(response);
        });
    };

    $scope.loadEventos = function () {
        Conector.eventos.getAll($http).
        then(function (response) {
            $scope.eventosAll = response.data._items;
            LoadingGif.deactivate();
            console.log(response);
        }, function (response) {
            console.error(response);
        });
    };

    $scope.addEvento = function () {
        LoadingGif.activate();
        //login data
        console.log($scope.eventos);
        Conector.eventos.add($http, $scope.eventos, Auth.auth()).
        then(function (response) {
            LoadingGif.deactivate();
            //$scope.eventosAll.push($scope.eventos);
            PopUp.successSamePage("Evento Agregado", $state);
            console.log(response);
        }, function (response) {
            console.error(response);
        });
    };

    $scope.deleteEvento = function (pEvent) {
        //login data
        LoadingGif.activate();
        var index = $scope.eventosAll.indexOf(pEvent);
        var eventoBorrar = $scope.eventosAll[index];
        PopUp.deleteConfirmation(function (response) {
            if (response === 1) {
                LoadingGif.activate();
                Conector.eventos.delete($http, Auth.auth(), eventoBorrar._id, eventoBorrar._etag).
                then(function (response) {
                    $scope.eventosAll.splice(index, 1);
                    LoadingGif.deactivate();
                    PopUp.successSamePageNoReload("Evento Borrado");
                    console.log(response);
                }, function (response) {
                    console.error(response);
                });
            }
        });
    };

    $scope.updateEvento = function (pEvent) {
        //login data
        var index = $scope.eventosAll.indexOf(pEvent);
        var eventoUpdate = $scope.eventosAll[index];
        var eventoUpdateSend = {
            'Nombre': eventoUpdate.Nombre,
            'Genero': eventoUpdate.Genero,
            'Tipo': eventoUpdate.Tipo._id
        };
        console.log(eventoUpdate);
        Conector.eventos.update($http, eventoUpdateSend, Auth.auth(), eventoUpdate._id, eventoUpdate._etag).
        then(function (response) {
            PopUp.successSamePage("Evento Modificado", $state);
            console.log(response);
        }, function (response) {
            console.error(response);
        });
    };
    $scope.addEstilo = function () {
        //login data
        Conector.eventotipos.add($http, $scope.estilo, Auth.auth()).
        then(function (response) {
            PopUp.successSamePage("Estilo Agregado", $state);
            console.log(response);
        }, function (response) {
            console.error(response);
        });
    };

    $scope.deleteEstilo = function (index) {
        //login data
        var estiloBorrar = $scope.tiposAll[index];
        PopUp.deleteConfirmation(function (response) {
            if (response === 1) {
                Conector.eventotipos.delete($http, Auth.auth(), estiloBorrar._id, estiloBorrar._etag).
                then(function (response) {
                    $scope.tiposAll.splice(index, 1);
                    PopUp.successSamePageNoReload("Estilo Borrado");
                    console.log(response);
                }, function (response) {
                    console.error(response);
                });
            }
        });
    };

    $scope.updateEstilo = function (index) {
        //login data
        var estiloUpdate = $scope.tiposAll[index];
        var estiloUpdateSend = {
            'Nombre': estiloUpdate.Nombre
        };
        Conector.eventotipos.update($http, estiloUpdateSend, Auth.auth(), estiloUpdate._id, estiloUpdate._etag).
        then(function (response) {
            PopUp.successSamePage("Estilo Modificado", $state);
            console.log(response);
        }, function (response) {
            console.error(response);
        });
    };
});