(function() {
    
    const selectTipoTransaccionInput = document.querySelector('#editarSelectTransaccion');
    const selectMonedaOrigenInput = document.querySelector('#editarMonedaOrigen');
    const selectMonedaDestinoInput = document.querySelector('#editarMonedaDestino');
    const tasaInput = document.querySelector('#editarTasaDia');
    const idTasa = document.querySelector('#idTasa');
    
    document.addEventListener('DOMContentLoaded', () => {
        const parametrosURL = new URLSearchParams(window.location.search);

        const idTasa = parseInt(parametrosURL.get('id'));
        console.log(idTasa);

          obtenerTasa(idTasa);

        llenarSelectTiporTransaccion();
        llenarSelectMonedaOrigen();
        llenarSelectMonedaDestino();

        //   // Sumir el formulario
          const formularioEditarTasa = document.querySelector('#formularioEditarTasa');
          formularioEditarTasa.addEventListener( 'submit', validarTasa);

    })
    function llenarSelectTiporTransaccion() {
        fetch('http://localhost:3000/selectTipoTransaccion.php')
        .then(response => response.json())
        .then(respuesta => {
            // Agregar cada opción al select
            respuesta.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.id;
            optionElement.textContent = option.nombre;

            selectTipoTransaccionInput.appendChild(optionElement);
        });
        })
    }

    function llenarSelectMonedaOrigen() {
         // Realizar la solicitud para obtener los datos desde PHP
         fetch('http://localhost:3000/selectTipoMoneda.php')
         .then(response => response.json())
         .then(respuesta => {
             // Agregar cada opción al select
             respuesta.forEach(option => {
             const optionElement = document.createElement('option');
             optionElement.value = option.id;
             optionElement.textContent = option.nombre;
 
             selectMonedaOrigenInput.appendChild(optionElement);
         });
         })
    }
     
    function llenarSelectMonedaDestino() {
        // Realizar la solicitud para obtener los datos desde PHP
        fetch('http://localhost:3000/selectTipoMoneda.php')
        .then(response => response.json())
        .then(respuesta => {
            // Agregar cada opción al select
            respuesta.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.id;
            optionElement.textContent = option.nombre;

            selectMonedaDestinoInput.appendChild(optionElement);
        });
        })
    }
   
    function obtenerTasa(idTasa) {
        try {
          fetch(`http://localhost:3000/cargarDatosTasaActualizar.php?idTasa=${idTasa}`)
            .then(respuesta => respuesta.json())
            .then(resultado => mostrarTasa(resultado))
            
        }catch( error ) {
            console.log( error );
        }
    }

    function mostrarTasa(tasas) {
        console.log(tasas)
        tasas.forEach(tasa => {
            
            const { id, tipo_moneda_id, tasa_dia, tipo_transaccion_id, tipo_moneda_id_destino } = tasa;
            selectTipoTransaccionInput.value = tipo_transaccion_id;
            selectMonedaOrigenInput.value = tipo_moneda_id;
            selectMonedaDestinoInput.value = tipo_moneda_id_destino;
            tasaInput.value = tasa_dia;
            idTasa.value = id;           
        });

    }

    function validarTasa(e) {
        e.preventDefault();

        const tipoTransaccion = selectTipoTransaccionInput.value;
        const monedaOrgien = selectMonedaOrigenInput.value;
        const monedaDestino = selectMonedaDestinoInput.value;
        const tasa = tasaInput.value;
        const id = idTasa;

        if ( tipoTransaccion === '' || monedaOrgien === '' || monedaDestino === '' || tasa === ''  || id === '' ) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Tdos los campos son obligatorios...!",
                
              });
            
            return;
        } 

            const tasas = {
                tipoTransaccion: selectTipoTransaccionInput.value,
                monedaOrigen: selectMonedaOrigenInput.value,
                monedaDestino: selectMonedaDestinoInput.value,
                tasa: tasaInput.value,
                id: parseInt(idTasa.value)
            }
              

            console.log(tasas)

        agregarActualizacionRol(tasas);
        
    }

    async function agregarActualizacionRol(tasas) {
        let idTasa = tasas.id;


            let data = new FormData(formularioEditarTasa);

            console.log(data)

            fetch(`http://localhost:3000/actualizarTasa.php?idTasa=${idTasa}`, {
            
            method: 'POST',
            body: data
            
            })
            .then(response => response.json())
            .then(respuesta => {

                if (respuesta.success === false) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: 'No se pudo actualizar registro...',
                        
                    });
                } else {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: 'Registro actualizado correctamente',
                        showConfirmButton: false,
                        

                    });
                }    
            })
            setTimeout(() => {
                window.location.href = 'listaTasa.html';
            },3000)   
        }
        
        formularioEditarTasa.reset();
    

})();

    