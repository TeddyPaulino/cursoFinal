(function() {
    
    const editarTipoMonedaInput = document.querySelector('#editartipoMoneda');
    const editarTipoTransaccionInput = document.querySelector('#editarTipoTransaccion');
    const editarComisionInput = document.querySelector('#editarComision');
    const idComision = document.querySelector('#idComision');
    
    document.addEventListener('DOMContentLoaded', () => {
        const parametrosURL = new URLSearchParams(window.location.search);

        const idComision = parseInt(parametrosURL.get('id'));
       
          obtenerComision(idComision);

        llenarSelectTiporTransaccion();
        llenarSelectTipoMoneda();
        

        //   // Sumir el formulario
          const editarFormularioComision = document.querySelector('#editarFormularioComision');
          editarFormularioComision.addEventListener( 'submit', validarComision);

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

            editarTipoTransaccionInput.appendChild(optionElement);
        });
        })
    }

    function llenarSelectTipoMoneda() {
         // Realizar la solicitud para obtener los datos desde PHP
         fetch('http://localhost:3000/selectTipoMoneda.php')
         .then(response => response.json())
         .then(respuesta => {
             // Agregar cada opción al select
             respuesta.forEach(option => {
             const optionElement = document.createElement('option');
             optionElement.value = option.id;
             optionElement.textContent = option.nombre;
 
             editarTipoMonedaInput.appendChild(optionElement);
         });
         })
    }
     
    function obtenerComision(idComision) {
        try {
          fetch(`http://localhost:3000/cargarDatosComisionActualizar.php?idComision=${idComision}`)
            .then(respuesta => respuesta.json())
            .then(resultado => mostrarComision(resultado))
            
        }catch( error ) {
            console.log( error );
        }
    }

    function mostrarComision(comisiones) {
        console.log(comisiones)
        comisiones.forEach(comisione => {
            
            const { id, tipo_transaccion_id, tipo_moneda_id, comision_dia} = comisione;
            editarTipoMonedaInput.value = tipo_moneda_id;
            editarTipoTransaccionInput.value = tipo_transaccion_id;
            editarComisionInput.value = comision_dia;
            idComision.value = id;           
        });

    }

    function validarComision(e) {
        e.preventDefault();

        const tipoTransaccion = editarTipoTransaccionInput.value;
        const monedaMoneda = editarTipoMonedaInput.value;
        const comision = editarComisionInput.value;
        const id = idComision;

        if ( tipoTransaccion === '' || monedaMoneda === '' || comision === '' || id === '' ) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Tdos los campos son obligatorios...!",
                
              });
            
            return;
        } 

            const comisionCobrar = {
                tipoTransaccion: editarTipoTransaccionInput.value,
                moneda: editarTipoMonedaInput.value,
                comision: editarComisionInput.value,
                id: parseInt(idComision.value)
            }
              

            console.log(comisionCobrar)

        agregarActualizacionComision(comisionCobrar);
        
    }

    async function agregarActualizacionComision(comisionCobrar) {
        let idComision = comisionCobrar.id;


            let data = new FormData(editarFormularioComision);

            console.log(data)

            fetch(`http://localhost:3000/actualizarComision.php?idComision=${idComision}`, {
            
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
                window.location.href = 'listaComision.html';
            },3000)   
        }
        
        editarFormularioComision.reset();
    

})();

    