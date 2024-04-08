(function() {
    document.addEventListener('DOMContentLoaded', () => {
        llenarSelectTipoMoneda();   
        llenarSelectTipoTransaccion();
              
    });



    let montoRecibidoInput = document.querySelector('#montoRecibido');
    const numeroDocumento = document.querySelector('#numeroDocumento');

    const tasaInput = document.querySelector('#ultimaTasa')

    const comisionInput = document.querySelector('#ultimaComision');

    

    document.addEventListener('change', obtenerTasaDia);
    document.addEventListener('change', obtenerTasaDia);
    document.addEventListener('change', obtenerComision);
    numeroDocumento.addEventListener('blur', obtenerCliente)

    montoRecibidoInput.addEventListener('blur', calcularVentaCompra);
    tasaInput.addEventListener('blur', calcularVentaCompra);
    comisionInput.addEventListener('blur', calcularCambioDivisa);


    // Funcion que llena el select en html
    function llenarSelectTipoTransaccion() {
        const tipoTransaccion = document.querySelector('#tipoTransaccion')
        
        // Realizar la solicitud para obtener los datos desde PHP
        fetch('http://localhost:3000/selectTipoTransaccion.php')
        .then(response => response.json())
        .then(respuesta => {
            // Agregar cada opción al select
            respuesta.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.id;
            console.log(optionElement)
            optionElement.textContent = option.nombre;
            tipoTransaccion.appendChild(optionElement);

            
        });
        })
        // .catch(error => console.error('Error:', error));
    }

    // Funcion que llena el select en html
    function llenarSelectTipoMoneda() {
        const tipoMoneda = document.querySelector('#tipoMoneda');
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

    // Funcion que obtiene la ultima tasa del dia
    function obtenerTasaDia() {
       
        let tipoTransaccion = document.querySelector('#tipoTransaccion').value;

        console.log(tipoTransaccion)

        let tipoMoneda = document.querySelector('#tipoMoneda').value;
        console.log(tipoMoneda)
        fetch('http://localhost:3000/obtenerTasaDia.php?tipoTransaccion=' + tipoTransaccion + '&tipoMoneda=' + tipoMoneda)
        .then(response => response.json())
        .then(resultado => {
            console.log(resultado)
            tasaInput.value = parseFloat(resultado.tasa_dia);

            calcularVentaCompra(parseFloat(tasaInput.value))
            

            // document.querySelector('#ultimaTasa').value = resultado.tasa_dia

        })
        // .catch(error => console.error('Error:', error));
    }

    // obtenerTasaDia();


    // Funcion que obtiene la ultima comision
    function obtenerComision() {
        let tipoTransaccion = document.querySelector('#tipoTransaccion').value;

        console.log(tipoTransaccion)

        let tipoMoneda = document.querySelector('#tipoMoneda').value;
       

        fetch('http://localhost:3000/obtenerComision.php?tipoTransaccion=' + tipoTransaccion + '&tipoMoneda=' + tipoMoneda)
        .then(response => response.json())
        .then(resultado => {
            console.log(resultado)
            comisionInput.value = parseFloat(resultado.comision_dia);

            calcularVentaCompra(parseFloat(comisionInput.value))
        
            // document.querySelector('#ultimaComision').value = resultado.comision_dia

        })
        // .catch(error => console.error('Error:', error));
    }

    // obtenerComision();
    
    function obtenerCliente(e) {
        const documento = e.target.value;

        console.log(documento)
        
        if (documento.trim() === '') {
            Swal.fire({
                icon: "error",
                title: 'Debes de ingresar el numero de documento',
            });
        } else {
            fetch('http://localhost:3000/obtenerCliente.php?numeroDocumento=' + documento)
        .then(response => response.json())
        .then(resultado => {
            console.log(resultado)

            document.querySelector('#nombreCliente').value = resultado.nombre_apellido

        })
        // .catch(error => console.error('Error:', error));
        }
    }

    // obtenerCliente()

    function validarMonto(e) {
        const montoRecibido = parseFloat(e.target.value);

        montoRecibidoInput = montoRecibido

        // console.log(montoRecibidoInput);
        
        calcularVentaCompra(montoRecibidoInput.value)
    }
    
    function calcularCambioDivisa( monto, tasa) {
         
        return monto * tasa
        
        
     
    }

    // function calcularComision(comision) {
    //     console.log(comision)
    // }

    function calcularVentaCompra( ) {
        
        const monto = parseFloat(montoRecibidoInput.value);
        const tasa = parseFloat(tasaInput.value);
        const comision = parseFloat(comisionInput.value);
        console.log(monto)
        console.log(tasa)
        console.log(comision)
        // let montoCambiar = calcularCambioDivisa(monto, tasa)
        // console.log(montoCambiar)
    }

    

})();