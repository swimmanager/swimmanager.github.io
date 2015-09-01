var PopUp = {
  successChangePage: function(action, page) {
    swal({
      title: "Exito",
      text: action,
      type: "success",
      showConfirmButton: true,
      closeOnConfirm: true
    }, function() {
        window.location.replace(page);
    });
  },

  successSamePage:function(action){
    swal({
      title: "Exito",
      text: action,
      type: "success",
      showConfirmButton: true,
      closeOnConfirm: true
    });

  },
  deleteConfirmation: function(callback) {
    swal({
      title: "Seguro desea borrarlo?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Si, Borrar!",
      cancelButtonText: "No",
      closeOnConfirm: true,
      closeOnCancel: true
    }, function(isConfirm) {
      if (isConfirm) {
        var response=1;
        callback(response);
      }
    });
  }
}
