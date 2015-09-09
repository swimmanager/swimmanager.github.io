app.controller('ResultadosCtrl', function ($scope, $http) { // ejemplo
    //Schema
    $scope.userSelect = {
        "anvandarnamn": "",
        "losenord": "",
        "roll": "User"
    };

    $scope.idList = [{
        id: "inp0",
        idt: "int0"
    }];

    $scope.PruebasSelect = {
        _id: "",
        Nombre: "",
        Genero: ""
    };



    $scope.count = 1;

    $scope.load = function () {
        $scope.count = 1;
        Conector.torneos.getAll($http).then(function (response) {
            $scope.torneos = response.data._items;
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
        var index = document.getElementById("idTorneos").selectedIndex;
        Conector.ediciones.getAllbyTorneo($http, $scope.torneos[index]._id).then(function (response) {
            $scope.ediciones = response.data._items;
        }, function (response) {
            console.error(response);
        });

    };

    $scope.agregar = function () {

        $scope.idList.push({
            id: "inp" + $scope.count,
            idt: "int" + $scope.count
        });
        $scope.count += 1;
    };

    $scope.quitar = function (idx) {
        var index = $scope.idList.indexOf(idx);
        $scope.idList.splice(index, 1);
    };

    $scope.getAtletas = function () {
        var index = document.getElementById("idPrueba").selectedIndex;
        var genero = $scope.eventos[index].Genero;
        var req = genero === "Mixto" ? Conector.atletas.getonlyName($http) : Conector.atletas.getbyGeneroonlyName($http, genero);
        req.then(function (response) {
            $scope.atletas = response.data._items;
            console.log($scope.atletas);
        }, function (response) {
            console.error(response);
        });
    };

    $scope.tohidden = function (elem, id) {
        document.getElementById(id).value = elem._id;
    };

    $scope.guardar = function () {

        var data = [];
        var indexP = document.getElementById("idPrueba").selectedIndex;
        var prueba = $scope.eventos[indexP]._id;

        var indexE = document.getElementById("idEdiciones").selectedIndex;
        var edicion = $scope.ediciones[indexE]._id;



        $scope.idList.forEach(function (item) {
            data.push({
                Atleta: document.getElementById(item.id).value,
                Evento: prueba,
                Edicion: edicion,
                //Carril: -1,
                //Hit: -1,
                //TiempoRegistro: -1,
                //Puntos: 0,
                TiempoRealizado: document.getElementById(item.idt).value
            });
        });
        console.log(data);
        var auth = "Nata2015:__Swim__2015"; //login data
        Conector.resultados.add($http, data, Base64.encode(auth))
            .then(function (response) {
                //PopUp.showSuccess('Usuario Agregado Exitosamente');
                PopUp.successSamePageNoReload("Resultado Agregado");
                $scope.idList = [{
                    id: "inp0",
                    idt: "int0"
                }];
                $scope.count = 1;
            }, function (response) {
                console.error(response); // Deberia haber un mejor manejo aqui
            });
    };

});
