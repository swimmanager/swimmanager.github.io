//aunque no es un angular controller, mejor manejar las ediciones en un archivo aparte
var Ediciones = {
    addEdicion: function ($http, data, auth) {
        var d = new Date(data.fecha);
        data.fecha = d.valueOf();
        Conector.ediciones.add($http, data, Base64.encode(auth)).
        then(function (response) {
            console.log(response);
            PopUp.successChangePage("Torneo Agregado", "./TorneosAllView.html")
        }, function (response) {
            console.log(response);
        });
    },
    addOtherEdicion: function ($http, data, auth, ediciones) {
        var d = new Date(data.fecha);
        data.fecha = d.valueOf();
        Conector.ediciones.add($http, data, Base64.encode(auth)).
        then(function (response) {
            data.fecha = new Date(data.fecha);
            ediciones.push(data);
            PopUp.successSamePage("Edicion Agregada");
        }, function (response) {
            console.log(response);
        });
    },

    deleteEdicion: function ($http, auth, id, etag, ediciones, index) {
        Conector.ediciones.delete($http, Base64.encode(auth), id, etag).
        then(function (response) {
            console.log(response);
            ediciones.splice(index, 1);
            PopUp.successSamePage("Torneo Borrado");
        }, function (response) {
            console.log(response);
        });
    }
}
