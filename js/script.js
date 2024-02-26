console.log("holiwi");

$(document).ready(function () {
    var laminasData; // Variable global para almacenar los datos del JSON

    // Cargar el archivo JSON
    $.getJSON('../data/laminas.json', function (data) {
        laminasData = data;
    });

    // Capturar el evento de búsqueda
    $('#searchResults').on('input', function () {
        var busqueda = $(this).val().toLowerCase();

        if (busqueda.length > 0) {
            mostrarLoader();
            setTimeout(function () {
                var resultados = buscarLaminas(busqueda);
                mostrarResultados(resultados);
            }, 1000);

        } else {
            limpiarResultados();
        }
    });

    // Mostrar el loader mientras se realiza la búsqueda
    function mostrarLoader() {
        $('#loader').show();
        //   $('#resultados').empty();
        $('#errorBusqueda').hide();
        $('#msjReady').hide();
    }

    // Buscar láminas según la búsqueda
    function buscarLaminas(busqueda) {
        var resultados = [];

        laminasData.laminas.forEach(function (lamina) {
            lamina.temas.forEach(function (tema) {
                if (tema.nombre.toLowerCase().includes(busqueda) || tema.autor.toLowerCase().includes(busqueda)) {
                    resultados.push(tema);
                }
            });
        });

        return resultados;
    }

    // Mostrar los resultados en el HTML
    function mostrarResultados(resultados) {
        var resultadosContainer = $('#laminasResult');
        resultadosContainer.empty();


        var colores = ['#FFDEDF', '#FFF89D', '#DBEFFF', '#C5FFC1']; // Arreglo de colores

        // Obtener un índice aleatorio dentro del rango de índices del arreglo de colores
        var indiceAleatorio = Math.floor(Math.random() * colores.length);


        if (resultados.length > 0) {
            resultados.forEach(function (tema) {
                var divLamina = $('<div>', {
                    class: 'list-lamina boton',
                    style: 'background-color: ' + colores[indiceAleatorio],
                    click: function () {
                        mostrarPopup(tema.imagen);
                    }
                });

                var numberContainer = $('<div>', {
                    class: 'number-container'
                });

                var numberProduct = $('<p>', {
                    class: 'number-product',
                    text: tema.numero
                });

                numberContainer.append(numberProduct);

                var descriptionProduct = $('<div>', {
                    class: 'description-product'
                });

                var textListPrincipal = $('<p>', {
                    class: 'text-list-principal',
                    html: '<strong>' + tema.nombre + '</strong>'
                });

                var description = $('<p>', {
                    class: 'description',
                    text: tema.autor
                });

                descriptionProduct.append(textListPrincipal, $('<br>'), description);

                var imgPopup = $('<div>', {
                    id: 'popup'
                });

                var closePopup = $('<p>', {
                    id: 'close-popup',
                    text: 'x'
                });

                var img = $('<img>', {
                    id: 'popup-imagen',
                    src: tema.imagen,
                    alt: 'Imagen'
                });

                imgPopup.append(closePopup, img);

                divLamina.append(numberContainer, descriptionProduct, imgPopup);
                resultadosContainer.append(divLamina);
            });

            $('#loader').hide();
            $('#msjReady').hide();
            $('#errorBusqueda').hide();
        } else {
            limpiarResultados();
            $('#loader').hide();
            $('#msjReady').hide();
            $('#errorBusqueda').show();
        }
    }

    // Mostrar ventana emergente con la imagen de la lámina
    // function mostrarPopup(imagen) {
    //     $('#popup-imagen').attr('src', imagen);
    //     $('#popup').fadeIn();   
    // }

    // // Cerrar ventana emergente al hacer clic en "x"
    // $(document).on('click', '#close-popup', function () {
    //     $('#popup').fadeOut();
    // });

    // Limpiar los resultados y mostrar "Listo para buscar"
    function limpiarResultados() {
        $('#laminasResult').empty();
        $('#msjReady').show();
        $('#errorBusqueda').hide();
    }
});