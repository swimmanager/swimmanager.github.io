/*global swal */
/*jslint browser: true*/
var PopUp = {
    successChangePage: function (action, page, $state) {
        swal({
            title: "Exito",
            text: action,
            type: "success",
            showConfirmButton: true,
            closeOnConfirm: true
        }, function () {
            $state.go(page, null, {
                reload: true
            });
        });
    },
    InvalidLogin: function ($state) {
        swal({
            title: "Error",
            text: "Ud. no esta autorizado para estar aqui",
            type: "error",
            showConfirmButton: true,
            closeOnConfirm: true
        }, function () {
            $state.go("Home", null, {
                reload: true
            });
        });
    },
    successChangePageParam: function (action, callback) {
        swal({
            title: "Exito",
            text: action,
            type: "success",
            showConfirmButton: true,
            closeOnConfirm: true
        }, function (isConfirm) {
            if (isConfirm) {
                var response = 1;
                callback(response);
            }
        });
    },
    successChangePageImage: function (action, page, $state, param) {
        swal({
            title: "Exito",
            text: action,
            type: "success",
            showConfirmButton: true,
            closeOnConfirm: true
        }, function () {
            $state.go(page, {
                idAtleta: param
            }, {
                reload: true
            });
        });
    },

    errorSamePage: function (action) {
        swal({
            title: 'Error',
            text: action,
            type: 'error'
        });
    },
    successSamePageNoReload: function (action) {
        swal({
            title: "Exito",
            text: action,
            type: "success"
        });
    },

    successSamePage: function (action) {
        swal({
            title: "Exito",
            text: action,
            type: "success",
            showConfirmButton: true,
            closeOnConfirm: true
        }, function () {
            window.location.reload();
        });

    },

    deleteConfirmation: function (callback) {
        swal({
            title: "Seguro desea borrarlo?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Si, Borrar!",
            cancelButtonText: "No",
            closeOnConfirm: true,
            closeOnCancel: true
        }, function (isConfirm) {
            if (isConfirm) {
                var response = 1;
                callback(response);
            }
        });
    }
};
