(function () {
    var app = angular.module('atletas', []);

    var pizarro = {
        nombre: 'Luis Diego Pizarro',
        cedula: '1-1567-123'
    };

    app.controller('atletaController', function () {
        this.atleta = pizarro;
    });


})();