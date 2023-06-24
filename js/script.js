function mostrarResultados(resultados) {
    var searchResults = $('#searchResults');
    searchResults.empty();

    if (resultados.length === 0) {
        searchResults.text('No se han encontrado resultados');
    } else {
        for (var i = 0; i < resultados.length; i++) {
            var resultado = resultados[i];

            // Mostrar el nombre y el número del subtema
            // var resultItem = $('<div>').text(resultado.nombre + ' - ' + resultado.numero);
            let resultItem = " "

            // Agregar un evento de clic para mostrar la imagen en la ventana emergente
            resultItem.click((function (imagen) {
                return function () {
                    $('#imagePopup img').attr('src', imagen);
                    $('#imagePopup').fadeIn();
                };
            })(resultado.imagen));

            searchResults.append(resultItem);
        }
    }
}

// Función para realizar la búsqueda
function buscarTema() {
    var searchTerm = $('#searchInput').val().toLowerCase();
    var resultados = [];

    // Recorrer los temas y subtemas para encontrar coincidencias
    for (var i = 0; i < temasJSON.temasPrincipales.length; i++) {
        var tema = temasJSON.temasPrincipales[i];
        for (var j = 0; j < tema.subtemas.length; j++) {
            var subtema = tema.subtemas[j];
            if (subtema.nombre.toLowerCase().indexOf(searchTerm) !== -1) {
                resultados.push(subtema);
            }
        }
    }

    mostrarResultados(resultados);
}

// Limpiar los resultados y mostrar el mensaje inicial
function limpiarResultados() {
    $('#searchResults').empty().text('Listo para buscar!');
}

// Evento de cambio en el campo de búsqueda
$('#searchInput').on('input', function () {
    var searchTerm = $(this).val().trim();
    if (searchTerm !== '') {
        buscarTema();
    } else {
        limpiarResultados();
    }
});

// Evento de clic en la ventana emergente para cerrarla
$('#imagePopup').click(function () {
    $(this).fadeOut();
});