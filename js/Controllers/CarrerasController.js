app.controller('CarrerasCtrl', function ($scope, $http, $state, LoadingGif) { // ejemplo
    LoadingGif.deactivate();
    LoadingGif.activate();
    $scope.carrera = {
        'Nombre': ''
    };

    $scope.loadCarreras = function () {
        Conector.carreras.getAll($http).
        then(function (response) {
            $scope.carrerasAll = response.data._items;
            LoadingGif.deactivate();
        }, function (response) {
            console.error(response);

        });
    };

    $scope.addCarrera = function () {
        var auth = "Nata2015:__Swim__2015"; //login data
        LoadingGif.activate();
        Conector.carreras.add($http, $scope.carrera, Base64.encode(auth)).
        then(function (response) {
            //$scope.eventosAll.push($scope.eventos);
            LoadingGif.deactivate();
            PopUp.successSamePage("Carrera Agregada", $state);
            console.log(response);
        }, function (response) {
            console.error(response);
        })
    }

    $scope.deleteCarrera = function (index) {
        var auth = "Nata2015:__Swim__2015"; //login data
        var carreraBorrar = $scope.carrerasAll[index];
        PopUp.deleteConfirmation(function (response) {
            if (response === 1) {
                Conector.carreras.delete($http, Base64.encode(auth), carreraBorrar._id, carreraBorrar._etag).
                then(function (response) {
                    $scope.carrerasAll.splice(index, 1);
                    PopUp.successSamePageNoReload("Carrera Borrada");
                    console.log(response);
                }, function (response) {
                    console.error(response);
                })
            }
        })
    }

    $scope.updateCarrera = function (index) {
        var auth = "Nata2015:__Swim__2015"; //login data
        LoadingGif.activate();
        var carreraUpdate = $scope.carrerasAll[index];
        var carreraUpdateSend = {
            'Nombre': carreraUpdate.Nombre
        }
        Conector.carreras.update($http, carreraUpdateSend, Base64.encode(auth), carreraUpdate._id, carreraUpdate._etag).
        then(function (response) {
            LoadingGif.deactivate();
            PopUp.successSamePage("Carrera Modificada", $state);
            console.log(response);
        }, function (response) {
            console.error(response);
        })
    }
});