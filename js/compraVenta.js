(function() {
    document.addEventListener('DOMContentLoaded', () => {
        llenarSelectTipoMonedaDestino(); 
        llenarSelectTipoMonedaOrigen()  
        llenarSelectTipoTransaccion();
              
    });

    const formulario = document.querySelector('#formulario');
    formulario.addEventListener('submit', agregarRegistro);

    const montoRecibidoInput = document.querySelector('#montoRecibido');
    

    const tasaInput = document.querySelector('#ultimaTasa');

    const comisionInput = document.querySelector('#ultimaComision');
    const totalComisionInput = document.querySelector('#totalComision');
    const montoEntregarInput = document.querySelector('#montoEntregar');
    const numeroDocumento = document.querySelector('#numeroDocumento');
    const nombreCliente = document.querySelector('#nombreCliente');
    

    document.addEventListener('change', obtenerTasaDia);
    document.addEventListener('change', obtenerTasaDia);
    document.addEventListener('change', obtenerComision);
    numeroDocumento.addEventListener('blur', obtenerCliente)

    montoRecibidoInput.addEventListener('blur', calcularVentaCompra);
    tasaInput.addEventListener('blur', calcularVentaCompra);
    comisionInput.addEventListener('blur', calcularCambioDivisa);
    totalComisionInput.addEventListener('blur', calcularVentaCompra);
    montoEntregarInput.addEventListener('blur', calcularVentaCompra);
    
    // const nombreUsuario = document.querySelector("$usuarioLabel").innerText;
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
    function llenarSelectTipoMonedaOrigen() {
        const monedaOrigen = document.querySelector('#monedaOrigen');
        // Realizar la solicitud para obtener los datos desde PHP
        fetch('http://localhost:3000/selectTipoMoneda.php')
        .then(response => response.json())
        .then(respuesta => {
            // Agregar cada opción al select
            respuesta.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.id;
            optionElement.textContent = option.nombre;
            monedaOrigen.appendChild(optionElement);
        });
        })
        // .catch(error => console.error('Error:', error));
    }

    // Funcion que llena el select en html
    function llenarSelectTipoMonedaDestino() {
        const monedaDestino = document.querySelector('#monedaDestino');
        // Realizar la solicitud para obtener los datos desde PHP
        fetch('http://localhost:3000/selectTipoMoneda.php')
        .then(response => response.json())
        .then(respuesta => {
            // Agregar cada opción al select
            respuesta.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.id;
            optionElement.textContent = option.nombre;
            monedaDestino.appendChild(optionElement);
        });
        })
        // .catch(error => console.error('Error:', error));
    }

    // Funcion que obtiene la ultima tasa del dia
    function obtenerTasaDia(e) {
        const tipoTransaccion = document.querySelector('#tipoTransaccion').value;
        const monedaOrigen = document.querySelector('#monedaOrigen').value;
        const monedaDestino = document.querySelector('#monedaDestino').value;
        
        fetch('http://localhost:3000/obtenerTasaDia.php?tipoTransaccion=' + tipoTransaccion + '&monedaOrigen=' + monedaOrigen + '&monedaDestino=' + monedaDestino )
        .then(response => response.json())
        .then(resultado => {
            console.log(resultado) 
            tasaInput.value = parseFloat(resultado.tasa_dia);

            calcularVentaCompra(parseFloat(tasaInput.value))
           
            
        })
        // .catch(error => console.error('Error:', error));
    }

    // Funcion que obtiene la ultima comision
    function obtenerComision() {
        const tipoTransaccion = document.querySelector('#tipoTransaccion').value;

        console.log(tipoTransaccion)

        const monedaOrigen = document.querySelector('#monedaOrigen').value;
        // const monedaDestino = document.querySelector('#monedaDestino').value;
       

        fetch('http://localhost:3000/obtenerComision.php?tipoTransaccion=' + tipoTransaccion + '&monedaOrigen=' + monedaOrigen)
        .then(response => response.json())
        .then(resultado => {
            console.log(resultado)
            comisionInput.value = parseFloat(resultado.comision_dia);

            calcularVentaCompra(parseFloat(comisionInput.value))
        
        })
        // .catch(error => console.error('Error:', error));
    }

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

            if (resultado.success === false) {
                Swal.fire({
                    icon: "error",
                    title: resultado.message,
                });
            } else {
                
                nombreCliente.value = resultado.nombre_apellido;
            }

        })
        // .catch(error => console.error('Error:', error));
        }
    }

    function validarMonto(e) {
        const montoRecibido = parseFloat(e.target.value);

        montoRecibidoInput = montoRecibido
        
        calcularVentaCompra(montoRecibidoInput.value)
    }
    
    function calcularCambioDivisa( monto, tasa, tipoTransaccion  ) {
         
        if (tipoTransaccion === '1') {
            return monto * tasa;
        } else {
            return monto / tasa;

            
        }  
    }

    function calcularComision(monto, comision, tipoTransaccion) {

        if (tipoTransaccion === '1') {

            return monto * comision;
        } else {
            return monto * comision;
        }
    }

    function calcularMontoEntregar(montoCambiar, totalComision, tipoTransaccion) {
        if (tipoTransaccion === '1') {
            return montoCambiar - totalComision;
        } else {
            return montoCambiar - totalComision;
        }
    }

    function calcularVentaCompra( ) {
        const tipoTransaccion = document.querySelector('#tipoTransaccion').value;
        const monto = parseFloat(montoRecibidoInput.value);
        const tasa = parseFloat(tasaInput.value);
        const comision = parseFloat(comisionInput.value).toFixed(3);
        let totalComision;
        let montoCambiar = calcularCambioDivisa(monto, tasa, tipoTransaccion);
        console.log(montoCambiar)
        if (tipoTransaccion === '1') {
           totalComision = calcularComision(monto, comision, tipoTransaccion);
           totalComisionInput.value = totalComision;
          
        } else {
            totalComision = calcularComision(monto, comision, tipoTransaccion);
            console.log(totalComision);
            totalComisionInput.value = totalComision.toFixed(2);
           
        }
        let montoEntregar = calcularMontoEntregar(montoCambiar, totalComision, tipoTransaccion);
        montoEntregarInput.value = montoEntregar.toFixed(2);
        console.log(montoEntregar);
        
        // let montoCambiar = calcularCambioDivisa(monto, tasa)
        // console.log(montoCambiar)
    }

    function agregarRegistro(e) {
        e.preventDefault();
        
        const transaccionSelect = document.querySelector('#tipoTransaccion').value;
        const monedaOrigen = document.querySelector('#monedaOrigen').value;
        const monedaDestino = document.querySelector('#monedaDestino').value;

        if (transaccionSelect === '' || monedaOrigen === '' || montoRecibidoInput.value === '' ||
        monedaDestino === '' || tasaInput.value === '' || comisionInput.value === '' ||
        totalComisionInput.value === '' || montoEntregarInput.value === '' || numeroDocumento.value === '' || 
         nombreCliente.value === '' ) {
            Swal.fire({
                icon: "error",
                title: 'Todos los campos son obligatorios...',
            });
        
        } else {
            let data = new FormData(formulario);

            console.log(data)

            fetch('http://localhost:3000/agregarTransaccion.php', {
            
            method: 'POST',
            body: data
            
            })
            .then(response => response.json())
            .then(respuesta => {
                const id = respuesta.id;

                window.location.href = `ticket.php?id=${id}`;
                if (respuesta.success === false) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: respuesta.message,
                        
                    });
                } else {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Transaccion creada correctamente...",
                        showConfirmButton: false,
                        timer: 3000,

                        

                    });
                }  
                // Redireccionar al usuario a la página de ticket con el ID de la transacción
               
            }) 
            
        }
        

        formulario.reset();
        
    }
    

})();