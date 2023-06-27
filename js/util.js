$(document).ready(function () {

    var inventario; // Variable global para almacenar los datos del JSON

    // Cargar el archivo JSON
    $.getJSON('../data/productos.json', function (data) {
        inventario = data;
    });
    
    // Función para imprimir los productos en tarjetas
    function imprimirProductos(productos) {
        $("#productos-container").empty();

        $.each(productos, function (index, producto) {
            var productoHtml = '<div class="producto">' +
                '<h3 class="title-product">' + producto.nombre + '</h3>' +
                '<img class="img-product" src="' + producto.imagen + '" alt="">' +
                    '<div class="data-product"' +
                        '<p>Precio: S/.' + producto.precio + '</p>' +
                        '<p>Marca: ' + producto.marca + '</p>' +
                        '<p>Tipo: ' + producto.tipo + '</p>' +
                    '</div>' +
                '</div>';

            $("#productos-container").append(productoHtml);
        });
    }

    // Mostrar todos los productos al cargar la página
    imprimirProductos(inventario);

    // Manejar el evento de cambio en el filtro de tipo
    $("#tipo").change(function () {
        var tipoSeleccionado = $(this).val();

        if (tipoSeleccionado === "todos") {
            imprimirProductos(inventario);
        } else {
            var productosFiltrados = inventario.filter(function (producto) {
                return producto.tipo === tipoSeleccionado;
            });

            imprimirProductos(productosFiltrados);
        }
    });
});
