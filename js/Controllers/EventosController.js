//aunque no es un angular controller, mejor manejar los eventos en un archivo aparte
app.controller('EventosCtrl', function($scope, $http) { // ejemplo
      $scope.eventos = {
        'Nombre': '',
        'Genero': ''
      }
      $scope.listaEventos = ['Masculino','Femenino','Mixto'];
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
        Conector.eventos.add($http, $scope.eventos, Base64.encode(auth)).
        then(function(response) {
          $scope.eventosAll.push($scope.eventos);
          PopUp.successSamePage("Evento Agregado");
          console.log(response);
        }, function(response) {
          console.error(response);
        })
      }

      $scope.deleteEvento = function(index) {
        var auth = "Nata2015:__Swim__2015"; //login data
        var eventoBorrar = $scope.eventosAll[index];
        PopUp.deleteConfirmation(function(response) {
            if (response === 1) {
              Conector.eventos.delete($http, Base64.encode(auth), eventoBorrar._id, eventoBorrar._etag).
              then(function(response) {
                $scope.eventosAll.splice(index, 1);
                PopUp.successSamePage("Evento Borrado");
                console.log(response);
              }, function(response) {
                console.error(response);
              })
            }
          })
        }

        $scope.updateEvento=function(index){
          var auth = "Nata2015:__Swim__2015"; //login data
          var eventoUpdate = $scope.eventosAll[index];
          var eventoUpdateSend={
            'Nombre': eventoUpdate.Nombre,
            'Genero': eventoUpdate.Genero
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
      });
