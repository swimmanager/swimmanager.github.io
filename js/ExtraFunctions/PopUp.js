var PopUp = {
  successChangePage: function(action, page, $state) {
    swal({
      title: "Exito",
      text: action,
      type: "success",
      showConfirmButton: true,
      closeOnConfirm: true
    }, function() {
      $state.go(page, null, {
      reload: true
    });
    });
  },

  successChangePageParam: function(action,callback) {
    swal({
      title: "Exito",
      text: action,
      type: "success",
      showConfirmButton: true,
      closeOnConfirm: true
    },function(isConfirm) {
      if (isConfirm) {
        var response=1;
        callback(response);
      }
    });
  },

  successSamePageNoReload:function(action){
    swal({
      title: "Exito",
      text: action,
      type: "success",
      showConfirmButton: true,
      closeOnConfirm: true
    });
  },

  successSamePage:function(action,$state){
    swal({
      title: "Exito",
      text: action,
      type: "success",
      showConfirmButton: true,
      closeOnConfirm: true
    },function() {
      $state.go($state.current, null, {
        reload: true
      });
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
