(function() {
    document.addEventListener('DOMContentLoaded', () => {
        llenarSelectTipoMoneda();        
    });

    const formularioTasa = document.querySelector('#formularioTasa');

    formularioTasa.addEventListener('submit', agregarTasa);

    // Funcion que llena el select en html
    function llenarSelectTipoMoneda() {
        const selectTasa = document.querySelector('#selectTasa');
        console.log(selectTasa)
        // Realizar la solicitud para obtener los datos desde PHP
        fetch('http://localhost:3000/selectTipoMoneda.php')
        .then(response => response.json())
        .then(respuesta => {
            // Agregar cada opción al select
            respuesta.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.id;
            optionElement.textContent = option.nombre;
            selectTasa.appendChild(optionElement);
        });
        })
        // .catch(error => console.error('Error:', error));
    }
    function agregarTasa() {
        const selectTasa = document.querySelector('#selectTasa').value;
        const tasaCompra = document.querySelector('#tasaCompra').value;
        const tasaVenta = document.querySelector('#tasaVenta').value;

        
    }

})();