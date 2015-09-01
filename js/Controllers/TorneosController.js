app.controller('TorneosCtrl', function($scope, $http) { // ejemplo
  //Schema
  $scope.torneo = {
    "Nombre": ""
  };
  $scope.edicion = {
    'Nombre': "",
    'Torneo': "",
    'fecha': ""
  }
  $scope.loadTorneos = function() {
    Conector.torneos.getAll($http)
      .then(function(response) {
        $scope.torneos = response.data._items;
        console.log($scope.torneos);
      }, function(response) {
        console.error(response);
      });
  }

  $scope.updateEdicion = function() {
      $scope.edicion.Nombre=$scope.edicionOne.Nombre;
      $scope.edicion.fecha=$scope.edicionOne.fecha;
      $scope.edicion.Torneo=$scope.edicionOne.Torneo;
      var auth = "Nata2015:__Swim__2015"; //login data

    Conector.ediciones.update($http,
      $scope.edicion,
      Base64.encode(auth),
      $scope.edicionOne._id,
      $scope.edicionOne._etag)
      .then(function(response) {
        PopUp.successChangePage("Edicion Modificada","TorneosOneView.html?id="+$scope.edicion.Torneo);
        console.log(response);
      }, function(response) {
        console.error(response);
      });
  }
  $scope.loadOneEdicion = function() {
    var id = getUrlVars()["id"];
    Conector.ediciones.getOne($http, id)
      .then(function(response) {
        $scope.edicionOne = response.data;
        $scope.edicionOne.fecha = new Date(parseInt($scope.edicionOne.fecha));
      }, function(response) {
        console.error(response);
      });
  }
  $scope.loadOneTorneo = function() {
    var id = getUrlVars()["id"];
    //Carga el nombre del torneo
    Conector.torneos.getOne($http, id)
      .then(function(response) {
        $scope.torneoOne = response.data;
        console.log(response);
      }, function(response) {
        console.error(response);
      });
    //Carga las ediciones del torneo
    Conector.ediciones.getAllbyTorneo($http, id)
      .then(function(response) {
        $scope.EdicionesTorneo = response.data._items;
        console.log(response);
      }, function(response) {
        console.error(response);
      });
  }

  $scope.addTorneo = function() {
    var auth = "Nata2015:__Swim__2015"; //login data
    console.log($scope.torneo);
    Conector.torneos.add($http, $scope.torneo, Base64.encode(auth)).
    then(function(response) {
      console.log(response);
      $scope.edicion.Torneo = response.data._id;
      Ediciones.addEdicion($http, $scope.edicion, auth);
    }, function(response) {
      console.error(response); // Deberia haber un mejor manejo aqui
    });
  }

  $scope.addEdicion = function() {
    var auth = "Nata2015:__Swim__2015"; //login data
    $scope.edicion.Torneo = $scope.torneoOne._id;
    Ediciones.addOtherEdicion($http, $scope.edicion, auth, $scope.EdicionesTorneo);
  }

  $scope.deleteEdicion = function(index) {
      var auth = "Nata2015:__Swim__2015"; //login data
      var edicionBorrar = $scope.EdicionesTorneo[index];
      PopUp.deleteConfirmation(function(response) {
        if (response === 1) {
          Ediciones.deleteEdicion($http, auth, edicionBorrar._id, edicionBorrar._etag, $scope.EdicionesTorneo, index);
        }
      });
    }
    //funcion que actualiza el torneo de la base
  $scope.updateTorneo = function() {
    var auth = "Nata2015:__Swim__2015";
    $scope.torneo.Nombre = $scope.torneoOne.Nombre;

    Conector.torneos.update($http, $scope.torneo, Base64.encode(auth), $scope.torneoOne._id, $scope.torneoOne._etag)
      .then(function(response) {
        PopUp.successChangePage("Torneo Modificado","TorneosAllView.html");
      }, function(response) {
        console.error(response); // Deberia haber un mejor manejo aqui
      });
  };

  //funcion que borra el torneo de la base
  $scope.deleteTorneo = function() {
    var auth = "Nata2015:__Swim__2015";
    PopUp.deleteConfirmation(function(response) {
      if (response === 1) {
        Conector.torneos.delete($http, Base64.encode(auth), $scope.torneoOne._id, $scope.torneoOne._etag)
          .then(function(response) {
            PopUp.successChangePage("Torneo Borrado","TorneosAllView.html");
          }, function(response) {
            console.error(response); // Deberia haber un mejor manejo aqui
          });
      }
    });
  };
});
