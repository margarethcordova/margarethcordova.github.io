// Función para buscar y mostrar los resultados
function buscar() {
    var busqueda = $('#busqueda').val().toLowerCase();
    var resultados = $('#resultados');
    resultados.empty();

    var encontrados = false;

    if (busqueda === '') {
        resultados.text('Resultados aquí');
        return;
    }

    temas.forEach(function (tema) {
        var nombreTema = tema.nombre.toLowerCase();
        var subtemasEncontrados = tema.subtemas.filter(function (subtema) {
            var nombreSubtema = subtema.nombre.toLowerCase();
            return nombreSubtema.includes(busqueda);
        });

        if (nombreTema.includes(busqueda) || subtemasEncontrados.length > 0) {
            encontrados = true;

            var temaHTML = $('<div>').addClass('tema').text(tema.nombre);
            resultados.append(temaHTML);

            subtemasEncontrados.forEach(function (subtema) {
                var subtemaHTML = $('<div>').addClass('subtema').text(subtema.nombre);
                temaHTML.append(subtemaHTML);

                subtemaHTML.click(function () {
                    mostrarImagen(subtema);
                });
            });
        }
    });

    if (!encontrados) {
        resultados.text('Error');
    }
}

// Función para mostrar la imagen en una ventana popup
function mostrarImagen(subtema) {
    var popupHTML = $('<div>').addClass('popup');
    var imagenHTML = $('<img>').attr('src', subtema.imagen);
    popupHTML.append(imagenHTML);

    // Mostrar el popup (aquí puedes usar una librería como jQuery UI Dialog para hacerlo más elegante)
    alert('Se muestra la imagen correspondiente al subtema: ' + subtema.nombre);
}

// Manejador del evento de búsqueda
$('#busqueda').keyup(function () {
    buscar();
});

// Datos en formato JSON
var temas = [
    {
        "nombre": "Tema 1",
        "subtemas": [
            {
                "nombre": "Subtema 1.1",
                "numero": 1,
                "imagen": "1.png"
            },
            {
                "nombre": "Subtema 1.2",
                "numero": 2,
                "imagen": "ruta/imagen2.jpg"
            }
        ]
    },
    {
        "nombre": "Tema 2",
        "subtemas": [
            {
                "nombre": "Subtema 2.1",
                "numero": 3,
                "imagen": "ruta/imagen3.jpg"
            },
            {
                "nombre": "Subtema 2.2",
                "numero": 4,
                "imagen": "ruta/imagen4.jpg"
            }
        ]
    }
];
