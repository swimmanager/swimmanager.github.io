app.controller('EventosCtrl', function($scope, $http) { // ejemplo
      $scope.eventos = {
        'Nombre': '',
        'Genero': 'Masculino',
        'Tipo':''
      }
      $scope.estilo = {
        'Nombre': ''
      }

      //este array creo q se puede borrar
      $scope.listaEventos = ['Masculino','Femenino','Mixto'];



      $scope.loadData=function(){
          $scope.loadEstilos();
          $scope.loadEventos();
      }

      $scope.loadEstilos = function() {
        Conector.eventotipos.getAll($http).
        then(function(response) {
          $scope.tiposAll = response.data._items;
          console.log(response);
        }, function(response) {
          console.error(response);
        })
      }

      $scope.loadEventos = function() {
        Conector.eventos.getAll($http).
        then(function(response) {
          $scope.eventosAll = response.data._items;
          console.log(response);
        }, function(response) {
          console.error(response);
        })
      }

      $scope.addEvento = function() {
        var auth = "Nata2015:__Swim__2015"; //login data
        console.log($scope.eventos);
        Conector.eventos.add($http, $scope.eventos, Base64.encode(auth)).
        then(function(response) {
          //$scope.eventosAll.push($scope.eventos);
          PopUp.successSamePage("Evento Agregado");
          console.log(response);
        }, function(response) {
          console.error(response);
        })
      }

      $scope.deleteEvento = function(pEvent) {
        var auth = "Nata2015:__Swim__2015"; //login data
        var index=$scope.eventosAll.indexOf(pEvent);
        var eventoBorrar = $scope.eventosAll[index];
        console.log(eventoBorrar);
        PopUp.deleteConfirmation(function(response) {
            if (response === 1) {
              Conector.eventos.delete($http, Base64.encode(auth), eventoBorrar._id, eventoBorrar._etag).
              then(function(response) {
                $scope.eventosAll.splice(index, 1);
                PopUp.successSamePageNoReload("Evento Borrado");
                console.log(response);
              }, function(response) {
                console.error(response);
              })
            }
          })
        }

        $scope.updateEvento=function(pEvent){
          var auth = "Nata2015:__Swim__2015"; //login data
          var index=$scope.eventosAll.indexOf(pEvent);
          var eventoUpdate = $scope.eventosAll[index];
          var eventoUpdateSend={
            'Nombre': eventoUpdate.Nombre,
            'Genero': eventoUpdate.Genero,
            'Tipo':eventoUpdate.Tipo._id
          }
          console.log(eventoUpdate);
          Conector.eventos.update($http, eventoUpdateSend,Base64.encode(auth), eventoUpdate._id, eventoUpdate._etag).
          then(function(response) {
            PopUp.successSamePage("Evento Modificado");
            console.log(response);
          }, function(response) {
            console.error(response);
          })
        }
        $scope.addEstilo = function() {
          var auth = "Nata2015:__Swim__2015"; //login data
          Conector.eventotipos.add($http, $scope.estilo, Base64.encode(auth)).
          then(function(response) {
            //$scope.eventosAll.push($scope.eventos);
            PopUp.successSamePage("Estilo Agregado");
            console.log(response);
          }, function(response) {
            console.error(response);
          })
        }

        $scope.deleteEstilo = function(index) {
          var auth = "Nata2015:__Swim__2015"; //login data
          var estiloBorrar = $scope.tiposAll[index];
          PopUp.deleteConfirmation(function(response) {
              if (response === 1) {
                Conector.eventotipos.delete($http, Base64.encode(auth), estiloBorrar._id, estiloBorrar._etag).
                then(function(response) {
                  $scope.tiposAll.splice(index, 1);
                  PopUp.successSamePageNoReload("Estilo Borrado");
                  console.log(response);
                }, function(response) {
                  console.error(response);
                })
              }
            })
          }

        $scope.updateEstilo=function(index){
            var auth = "Nata2015:__Swim__2015"; //login data
            var estiloUpdate = $scope.tiposAll[index];
            var estiloUpdateSend={
              'Nombre': estiloUpdate.Nombre
            }
            Conector.eventotipos.update($http, estiloUpdateSend,Base64.encode(auth), estiloUpdate._id, estiloUpdate._etag).
            then(function(response) {
              PopUp.successSamePage("Estilo Modificado");
              console.log(response);
            }, function(response) {
              console.error(response);
            })
          }
      });
