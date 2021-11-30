$(document).ready(function () {
    console.log("hola desde jquery");
    zonas();
    value();
});

function zonas() {

    var json = JSON.stringify({ tipo: "listarZonas" });
    $.ajax({
        type: "POST",
        url: "https://aveonline.co/api/nal/v1.0/turboBoy/",
        data: json,
        success: function (Respuesta) {
            let select = '';
            $.each(Respuesta.ciudades, function (indexInArray, valueOfElement) { 
                select += `<option value="${valueOfElement.zonaId}">${valueOfElement.nombre}</option>`; 
            });
            $("#zonas").html(select);
        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    });
}

function value() {
    $("#zonas").change(function () {
        let val = $(this).val();
        $.ajax({
            type: "GET",
            url: "https://production.turboboy.co/api/v2/cities-by-zone?zone_id=" + val,
            success: function (Respuesta) {
                let select = '';
                $.each(Respuesta, function (indexInArray, valueOfElement) { 
                    select += `<option value="${indexInArray}">${indexInArray}</option>`; 
                });
                $("#ciudades").html(select);
            }
        });
    });
}