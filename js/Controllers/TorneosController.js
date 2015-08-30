app.controller('TorneosCtrl', function($scope, $http) { // ejemplo
  //Schema
  $scope.torneo = {
    "Nombre": ""
  };
  $scope.loadTorneos = function() {
    //Loading.show();
    Conector.torneos.getAll($http)
      .then(function(response) {
        $scope.torneos = response.data._items;
        console.log($scope.torneos);
        //Loading.hide();
      }, function(response) {
        console.error(response); // Deberia haber un mejor manejo aqui
      });
  }

  $scope.loadOneTorneo = function() {
    var id = getUrlVars()["id"];
    Conector.torneos.getOne($http, id)
      .then(function(response) {
        $scope.torneoOne = response.data;
        console.log(response);
      }, function(response) {
        console.error(response); // Deberia haber un mejor manejo aqui
      });

  }

  $scope.addTorneo = function() {
    var auth = "Nata2015:__Swim__2015"; //login data
    console.log($scope.torneo);
    Conector.torneos.add($http, $scope.torneo, Base64.encode(auth)).
    then(function(response) {
      //PopUp.showSuccess('Usuario Agregado Exitosamente');
      swal({
        title: "Exito",
        text: "Torneo Agregado",
        type: "success",
        showConfirmButton: true,
        closeOnConfirm: true
      }, function() {
        window.location.replace("TorneosAllView.html")
      });
    }, function(response) {
      console.error(response); // Deberia haber un mejor manejo aqui
    });
  }

  //funcion que actualiza el torneo de la base
  $scope.updateTorneo = function() {
    var auth = "Nata2015:__Swim__2015";
    $scope.torneo.Nombre = $scope.torneoOne.Nombre;

    Conector.torneos.update($http, $scope.torneo, Base64.encode(auth), $scope.torneoOne._id, $scope.torneoOne._etag)
      .then(function(response) {
        swal({
          title: "Exito",
          text: "Torneo Modificado",
          type: "success",
          showConfirmButton: true,
          closeOnConfirm: true
        }, function() {
          window.location.replace("TorneosAllView.html")
        });
      }, function(response) {
        console.error(response); // Deberia haber un mejor manejo aqui
      });
  };

  //funcion que borra el torneo de la base
  $scope.deleteTorneo = function() {
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
    }, function(isConfirm) {
      if (isConfirm) {
        Conector.torneos.delete($http, Base64.encode(auth), $scope.torneoOne._id, $scope.torneoOne._etag)
          .then(function(response) {
            swal({
              title: "Exito",
              text: "Torneo Borrado",
              type: "success",
              showConfirmButton: true,
              closeOnConfirm: true
            }, function() {
              window.location.replace("TorneosAllView.html")
            });
          }, function(response) {
            console.error(response); // Deberia haber un mejor manejo aqui
          });
      } else {}
    });
  };
});
