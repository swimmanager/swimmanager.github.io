/*global app, Conector, PopUp */
/*jslint browser: true*/
app.controller('CarrerasCtrl', function ($scope, $http, $state, LoadingGif, Auth) { // ejemplo
    LoadingGif.deactivate();
    LoadingGif.activate();
    $scope.carrera = {
        'Nombre': ''
    };

    $scope.loadCarreras = function () {
        if (!Auth.state()) {
            PopUp.InvalidLogin($state);
            LoadingGif.deactivate();
            return;
        }
        Conector.carreras.getAll($http).
        then(function (response) {
            $scope.carrerasAll = response.data._items;
            LoadingGif.deactivate();
        }, function (response) {
            console.error(response);

        });
    };

    $scope.addCarrera = function () {

        LoadingGif.activate();
        Conector.carreras.add($http, $scope.carrera, Auth.auth()).
        then(function (response) {
            //$scope.eventosAll.push($scope.eventos);
            LoadingGif.deactivate();
            PopUp.successSamePage("Carrera Agregada", $state);
            //console.log(response);
        }, function (response) {
            console.error(response);
        });
    };

    $scope.deleteCarrera = function (index) {

        var carreraBorrar = $scope.carrerasAll[index];
        PopUp.deleteConfirmation(function (response) {
            if (response === 1) {
                Conector.carreras.delete($http, Auth.auth(), carreraBorrar._id, carreraBorrar._etag).
                then(function (response) {
                    $scope.carrerasAll.splice(index, 1);
                    PopUp.successSamePageNoReload("Carrera Borrada");
                    //console.log(response);
                }, function (response) {
                    console.error(response);
                });
            }
        });
    };

    $scope.updateCarrera = function (index) {

        LoadingGif.activate();
        var carreraUpdate = $scope.carrerasAll[index];
        var carreraUpdateSend = {
            'Nombre': carreraUpdate.Nombre
        };
        Conector.carreras.update($http, carreraUpdateSend, Auth.auth(), carreraUpdate._id, carreraUpdate._etag).
        then(function (response) {
            LoadingGif.deactivate();
            PopUp.successSamePage("Carrera Modificada", $state);
            //console.log(response);
        }, function (response) {
            console.error(response);
        });
    };
});