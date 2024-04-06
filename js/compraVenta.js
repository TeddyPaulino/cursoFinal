(function() {
    document.addEventListener('DOMContentLoaded', () => {
        llenarSelectTipoMoneda();   
        llenarSelectTipoTransaccion();     
    });
    // Funcion que llena el select en html
    function llenarSelectTipoTransaccion() {
        const tipoTransaccion = document.querySelector('#tipoTransaccion');
        console.log(tipoMoneda)
        // Realizar la solicitud para obtener los datos desde PHP
        fetch('http://localhost:3000/selectTipoTransaccion.php')
        .then(response => response.json())
        .then(respuesta => {
            // Agregar cada opción al select
            respuesta.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.id;
            optionElement.textContent = option.nombre;
            tipoTransaccion.appendChild(optionElement);
        });
        })
        // .catch(error => console.error('Error:', error));
    }

    // Funcion que llena el select en html
    function llenarSelectTipoMoneda() {
        const tipoMoneda = document.querySelector('#tipoMoneda');
        console.log(tipoMoneda)
        // Realizar la solicitud para obtener los datos desde PHP
        fetch('http://localhost:3000/selectTipoMoneda.php')
        .then(response => response.json())
        .then(respuesta => {
            // Agregar cada opción al select
            respuesta.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.id;
            optionElement.textContent = option.nombre;
            tipoMoneda.appendChild(optionElement);
        });
        })
        // .catch(error => console.error('Error:', error));
    }


})();