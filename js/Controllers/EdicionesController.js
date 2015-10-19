/*global  Conector, PopUp */
/*jslint browser: true*/
//aunque no es un angular controller, mejor manejar las ediciones en un archivo aparte
var Ediciones = {
    addEdicion: function ($http, data, $state, xLoadingGif, auth) {
        xLoadingGif.activate();
        var d = new Date(data.fecha);
        data.fecha = d.valueOf();
        Conector.ediciones.add($http, data, auth)
            .then(function (response) {
                xLoadingGif.deactivate();
                PopUp.successChangePage("Torneo Agregado", "TorneosView", $state);
            }, function (response) {
                //console.log(response);
                xLoadingGif.deactivate();
            });
    },
    addOtherEdicion: function ($http, data, ediciones, xLoadingGif, auth) {
        xLoadingGif.activate();
        var d = new Date(data.fecha);
        data.fecha = d.valueOf();
        Conector.ediciones.add($http, data, auth)
            .then(function (response) {
                data.fecha = new Date(data.fecha);
                ediciones.push(data);
                xLoadingGif.deactivate();
                PopUp.successSamePageNoReload("Edicion Agregada");
            }, function (response) {
                //console.log(response);
                xLoadingGif.deactivate();
            });
    },

    deleteEdicion: function ($http, id, etag, ediciones, index, xLoadingGif, auth) {
        xLoadingGif.activate();
        Conector.ediciones.delete($http, auth, id, etag)
            .then(function (response) {
                ediciones.splice(index, 1);
                xLoadingGif.deactivate();
                PopUp.successSamePageNoReload("Torneo Borrado");
            }, function (response) {
                //console.log(response);
                xLoadingGif.deactivate();
            });
    }
};
