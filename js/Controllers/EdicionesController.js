/*global  Conector, PopUp */
/*jslint browser: true*/
//aunque no es un angular controller, mejor manejar las ediciones en un archivo aparte
var Ediciones = {
    addEdicion: function ($http, data, $state, LoadingGif, Auth) {
        LoadingGif.activate();
        var d = new Date(data.fecha);
        data.fecha = d.valueOf();
        Conector.ediciones.add($http, data, Auth.auth())
            .then(function (response) {
                LoadingGif.deactivate();
                PopUp.successChangePage("Torneo Agregado", "TorneosView", $state);
            }, function (response) {
                console.log(response);
                LoadingGif.deactivate();
            });
    },
    addOtherEdicion: function ($http, data, ediciones, LoadingGif, Auth) {
        LoadingGif.activate();
        var d = new Date(data.fecha);
        data.fecha = d.valueOf();
        Conector.ediciones.add($http, data, Auth.auth())
            .then(function (response) {
                data.fecha = new Date(data.fecha);
                ediciones.push(data);
                LoadingGif.deactivate();
                PopUp.successSamePageNoReload("Edicion Agregada");
            }, function (response) {
                console.log(response);
                LoadingGif.deactivate();
            });
    },

    deleteEdicion: function ($http, id, etag, ediciones, index, LoadingGif, Auth) {
        LoadingGif.activate();
        Conector.ediciones.delete($http, Auth.auth(), id, etag)
            .then(function (response) {
                ediciones.splice(index, 1);
                LoadingGif.deactivate();
                PopUp.successSamePageNoReload("Torneo Borrado");
            }, function (response) {
                console.log(response);
                LoadingGif.deactivate();
            });
    }
};