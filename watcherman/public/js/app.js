function cargarDatos() {
    $.get('/watchermen', function (data) {
            $('#watchermen_list > tbody').empty();
            $.each(data, function (index, w) {
                var icon = 'glyphicon-remove';
                if (w.sms) {
                    icon = 'glyphicon-ok';
                }

                $('#watchermen_list tbody').append(
                    '<tr>' +
                    '<td>' + w.mobile + '</td>' +
                    '<td><span class="glyphicon ' + icon + '"></span></td>' +
                    '<td >' +
                    '<button onclick="eliminarSupervisor(\'' +  w._id + '\');" ' +
                    'class="btn btn-danger glyphicon glyphicon-remove">' +
                    '</button>' +
                    '</td>' +
                    '</tr>'
                );
            });
        }
    );
}

function guardarSupervisor() {
    var watcherman = {};
    watcherman.mobile = $('#mobile').val();
    $.ajax({
        url: '/watchermen',
        type: 'post',
        dataType: 'json',
        success: function (data) {},
        data: watcherman
    });
    $('#mobile').val('');
    $('#watchermen_list > tbody').empty();
    cargarDatos();
}

function eliminarSupervisor(id) {
    $.ajax({
        url: '/watchermen/' + id,
        type: 'delete',
        dataType: 'json',
        success: function (data) {},
        data: {}
    });
    $('#watchermen_list > tbody').empty();
    cargarDatos();
}

jQuery(document).ready(function () {
    cargarDatos();
});
