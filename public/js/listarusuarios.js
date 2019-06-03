$(document).ready(function () {
    alertify.set('notifier', 'position', 'top-right');

    //Mostrar información en el select
    showSystems();

});

function showSystems() {

    $.ajax({
        url: 'Sistemas/systemListSelect',
        type: 'POST',
        dataType: 'JSON',
        success: function (response) {

            var systems = jQuery.parseJSON(response.sistemasDTO);
            var $dropdown = $("select[name$='systemName']");
            for (var i = systems.length - 1; i >= 0; i--) {
                $dropdown.append($("<option />").val(systems[i].idSystem).text(systems[i].name));
            }

        },
        error: function () {
            alertify.error("Error al obtener el servicio para cargar lista de sistemas");
        }
    });
    return false;

}

//Para DataTable
//Funciones para obtener información de los select
$(document).on('change', '#systemName', function () {

    var id_system = $('select[name=systemName]').val();

    if (id_system != "0") {

        console.log("entra" + " " + id_system);

        tableUsuarios = $('#tableUsuarios').DataTable({
            destroy: true,
            responsive: {
                details: false
            },
            ajax: {
                url: 'ListarUsuarios/usersListTable',
                type: 'POST',
                data: ({id: id_system}),
                dataSrc: "",
            },
            columns: [

                {
                    data: null,
                    render: function (data, type, row) {

                        /*
                        if (data.enable == 1) {

                            var estado = "checkbox";

                        } else if (data.enable == 0) {

                            var estado = "";

                        }
                        */

                        return '<button id="btnUpdateSubModule" data-toggle="modal" data-target="#modalEditarSubModulo" class="btn btn-primary btn-sm buttonDt btn-ver"><i class="fa fa-search"></i></button>';

                    }
                },
                {
                    data: "idUser",
                    visible: false,
                    searchable: false
                },

                {data: "user"},
                {data: "perfil"}

            ],
            fixedColumns: true,
            language: {
                "url": "public/plugins/DataTables/Spanish.json",
            }
        });


    }

});





