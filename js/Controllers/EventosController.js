//aunque no es un angular controller, mejor manejar los eventos en un archivo aparte
var Eventos = {
  addEvento: function($http,data,auth) {
    console.log(data);
    Conector.eventos.add($http,data,Base64.encode(auth)).
      then(function(response) {
        console.error(response);
      },function(response) {
        console.error(response); // Deberia haber un mejor manejo aqui
      })
  }
}
