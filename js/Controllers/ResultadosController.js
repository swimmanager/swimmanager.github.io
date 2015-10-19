/*global app, Conector,PopUp */
/*jslint browser: true*/
app.controller('ResultadosCtrl', function ($scope, $http, $state, LoadingGif, Auth) { // ejemplo
    //Schema
    LoadingGif.deactivate();
    LoadingGif.activate();
    $scope.userSelect = {
        "anvandarnamn": "",
        "losenord": "",
        "roll": "User"
    };

    $scope.idList = [{
        id: "inp0",
        idthou: 00,
        idtmin: 00,
        idtsec: 00,
        idtmil: 00
    }];

    $scope.PruebasSelect = {
        _id: "",
        Nombre: "",
        Genero: ""
    };



    $scope.count = 1;

    $scope.load = function () {
        if (!Auth.state()) {
            PopUp.InvalidLogin($state);
            LoadingGif.deactivate();
            return;
        }
        $scope.count = 1;
        Conector.torneos.getAll($http).then(function (response) {
            $scope.torneos = response.data._items;
            LoadingGif.deactivate();
        }, function (response) {
            console.error(response);
        });
        Conector.eventos.getAll($http).then(function (response) {
            $scope.eventos = response.data._items;
        }, function (response) {
            console.error(response);
        });
    };

    $scope.getEdiciones = function () {
        var index = document.getElementById("idTorneo").selectedIndex;
        //console.log(document.getElementById("idTorneo").selectedIndex);
        LoadingGif.activate();
        Conector.ediciones.getAllbyTorneo($http, $scope.torneos[index]._id).then(function (response) {
            //console.log(index);
            //console.log(response.data._items);
            $scope.ediciones = response.data._items;
            LoadingGif.deactivate();
        }, function (response) {
            console.error(response);
        });

    };

    $scope.agregar = function () {

        $scope.idList.push({
            id: "inp" + $scope.count,
            idthou: 0,
            idtmin: 00,
            idtsec: 00,
            idtmil: 00
        });
        $scope.count += 1;
    };


    $scope.quitar = function (idx) {
        var index = $scope.idList.indexOf(idx);
        $scope.idList.splice(index, 1);
    };

    $scope.getAtletas = function () {
        var index = document.getElementById("idPrueba").value;
        var genero = JSON.parse(index).Genero;
        //var index = document.getElementById("idPrueba").selectedIndex;
        //var genero = $scope.eventos[index].Genero;
        var req = genero === "Mixto" ? Conector.atletas.getonlyName($http) : Conector.atletas.getbyGeneroonlyName($http, genero);
        req.then(function (response) {
            $scope.atletas = response.data._items;
            //console.log($scope.atletas);
        }, function (response) {
            console.error(response);
        });
    };

    $scope.tohidden = function (elem, id) {
        document.getElementById(id).value = elem._id;
    };

    $scope.getTimeFormat = function (hour, minute, second, mili) {
        var time = hour;
        if (minute.length < 2) {
            time = time + ":0" + minute;
        } else {
            time = time + ":" + minute
        }
        if (second.length < 2) {
            time = time + ":0" + second;
        } else {
            time = time + ":" + second
        }
        if (mili.length < 2) {
            time = time + ".0" + mili;
        } else {
            time = time + "." + mili
        }
        return time;

    }
    $scope.guardar = function () {

        $scope.loading = true;
        var data = [];
        var prueba = document.getElementById("idPrueba").value;
        prueba = JSON.parse(prueba)._id;
        var edicion = document.getElementById("idEdicion").value;
        $scope.idList.forEach(function (item) {
            //console.log(item);
            data.push({
                Atleta: document.getElementById(item.id).value,
                Evento: prueba,
                Edicion: edicion,
                TiempoRealizado: $scope.getTimeFormat(
                    document.getElementById(item.idthou).value,
                    document.getElementById(item.idtmin).value,
                    document.getElementById(item.idtsec).value,
                    document.getElementById(item.idtmil).value)
            });
        });
        //console.log(data);
        Conector.resultados.add($http, data, Auth.auth())
            .then(function (response) {
                PopUp.successSamePageNoReload("Resultado Agregado");
                $scope.idList = [{
                    id: "inp0",
                    idthou: 00,
                    idtmin: 00,
                    idtsec: 00,
                    idtmil: 00
              }];
                $scope.loading = false;
                $scope.count = 1;
            }, function (response) {
                console.error(response); // Deberia haber un mejor manejo aqui
            });
    };

});
