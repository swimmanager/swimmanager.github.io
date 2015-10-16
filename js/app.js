function getUrlVars() {
    var vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}


var app = angular.module('SwimManager', ["ui.bootstrap", "ui.router"])

.config(function ($stateProvider, $urlRouterProvider) {
    //Pagina por defecto

    $urlRouterProvider.otherwise('/Home');

    $stateProvider
        .state('Home', {
            url: '/Home',
            templateUrl: 'pages/Home.html'
                //controller: "HomeCtrl"
        })

    //////////atletas/////////////////////
    .state('AtletasView', {
            url: '/AtletasView',
            templateUrl: 'pages/Atletas/atletas.html',
            controller: "AtletasCtrl"
        })
        .state('AtletasView.One', {
            url: '/One/:idAtleta',
            templateUrl: 'pages/Atletas/AtletaOne.html',
            controller: "AtletasBCtrl"
        })
        .state('AtletasView.Add', {
            url: '/Add',
            templateUrl: 'pages/Atletas/AtletaCreate.html',
            controller: "AtletasCtrl"
        })

    .state('AtletasView.Edit', {
            url: '/Edit/:idAtleta',
            templateUrl: 'pages/Atletas/AtletaUpdate.html',
            controller: "AtletasBCtrl"
        })
        /////carreras//////////
        .state('AtletasView.Carreras', {
            url: '/Carreras',
            templateUrl: 'pages/Otras/Carreras.html',
            controller: "CarrerasCtrl"
        })
        ////////torneos//////////////////////////
        .state('TorneosView', {
            url: '/TorneosView',
            templateUrl: 'pages/Torneos/TorneosAllView.html',
            controller: "TorneosCtrl"
        })

    .state('TorneosView.Add', {
        url: '/Add',
        templateUrl: 'pages/Torneos/TorneosCreate.html',
        controller: "TorneosCtrl"
    })

    .state('TorneosView.Update', {
            url: '/Update/:idTorneo',
            templateUrl: 'pages/Torneos/TorneosUpdate.html',
            controller: "TorneosCtrl"
        })
        ///////ediciones////////////////
        .state('TorneosView.One', {
            url: '/One/:idTorneo',
            templateUrl: 'pages/Torneos/TorneosOneView.html',
            controller: "TorneosCtrl"
        })
        .state('TorneosView.One.Add', {
            url: '/Add',
            templateUrl: 'pages/Torneos/EdicionAdd.html',
            controller: "TorneosCtrl"
        })
        .state('TorneosView.One.Edit', {
            url: '/Edit',
            templateUrl: 'pages/Torneos/EdicionEdit.html',
            controller: "TorneosCtrl"
        })

    //////////////eventos//////////////////////////
    .state('EventosTab', {
        url: '/EventosTab',
        templateUrl: 'pages/Eventos/EventosTab.html'
    })

    .state('EventosTab.Add', {
        url: '/Add',
        templateUrl: 'pages/Eventos/EventosAdd.html',
        controller: "EventosCtrl"
    })

    .state('EventosTab.Edit', {
        url: '/Edit',
        templateUrl: 'pages/Eventos/EventosEdit.html',
        controller: "EventosCtrl"
    })

    .state('EventosTab.Estilos', {
            url: '/Estilos',
            templateUrl: 'pages/Eventos/Estilos.html',
            controller: "EventosCtrl"
        })
        ///////////////////////////////////////////////

    /////Resultados/////
    .state('Resultados', {
        url: '/Resultados',
        templateUrl: 'pages/Resultados/resultadosV.html',
        controller: "ResultadosBCtrl"
    })

    .state('Resultados.Add', {
            url: '/Add',
            templateUrl: 'pages/Resultados/resultados.html',
            controller: "ResultadosCtrl"
        })
        ////////////////////

    .state('Usuarios', {
        url: '/Usuarios',
        templateUrl: 'pages/Otras/Usuarios.html',
        controller: "UsuariosCtrl"
    });
});
app.factory("LoadingGif", function () {
    return {
        s: new SpriteSpinner($(".sprite-spinner")[0], {
            interval: 50
        }),
        state: false,
        activate: function () {
            console.log(this);
            this.state = true;
            this.s.start();
        },
        deactivate: function () {
            this.s.stop();
            this.state = false;
            console.error("apagar");
        }
    };
});
app.controller('Base', function ($scope, LoadingGif) { // ejemplo
    $scope.loading = LoadingGif;
    //LoadingGif.deactivate();
    console.log($scope.loading.state);
    $scope.load = function () {
        console.log($scope.loading);
    };
});