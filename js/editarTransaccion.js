(function() {
    
    const transaccionInput = document.querySelector('#editarTransaccion');
    const descripcionInput = document.querySelector('#editarDescripcion');
    const idInput = document.querySelector('#idTrassaccion');
    
    document.addEventListener('DOMContentLoaded', () => {
        const parametrosURL = new URLSearchParams(window.location.search);

        const idTransaccion = parseInt(parametrosURL.get('id'));

        obtenerTrasaccion(idTransaccion);
        console.log(idTransaccion)
          // Sumir el formulario
          const formularioEditarTipoTransaccion = document.querySelector('#formularioEditarTipoTransaccion');
          formularioEditarTipoTransaccion.addEventListener( 'submit', validarTipoTransaccion);

    })
   
    function obtenerTrasaccion(idTransaccion) {
        try {
          fetch(`http://localhost:3000/cargarDatosTransaccionActualizar.php?idTransaccion=${idTransaccion}`)
            .then(respuesta => respuesta.json())
            .then(resultado => mostrarTransaccion(resultado))
            
        }catch( error ) {
            console.log( error );
        }
    }

    function mostrarTransaccion(TipoTransacciones) {
        
        TipoTransacciones.forEach(tipoTransaccion => {
            
            const { id, nombre, descripcion } = tipoTransaccion;
            transaccionInput.value = nombre;
            descripcionInput.value = descripcion;
            idInput.value = id;           
        });

    }

    function validarTipoTransaccion(e) {
        e.preventDefault();

        const tipo_transaccion = transaccionInput.value;
        const descripcion = descripcionInput.value;
        const idTransaccion = idInput;

        if ( tipo_transaccion === '' || descripcion === '' || idTransaccion === '' ) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Tdos los campos son obligatorios...!",
                
              });
            
            return;
        } 

            const tipoTransaccion = {
                nombre: transaccionInput.value,
                descripcion: descripcionInput.value,
                id: parseInt(idInput.value)
            }
              

        agregarActualizacionRol(tipoTransaccion);
        
    }

    async function agregarActualizacionRol( tipoTransaccion ) {
        let idTransaccion = tipoTransaccion.id;
        console.log(idTransaccion)

            let data = new FormData(formularioEditarTipoTransaccion);

            console.log(data)

            fetch(`http://localhost:3000/actualizarTipoTransaccion.php?idTransaccion=${idTransaccion}`, {
            
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
                window.location.href = 'listaTipoTransaccion.html';
            },3000)   
        }
        
        formularioEditarTipoTransaccion.reset();
    

})();

    