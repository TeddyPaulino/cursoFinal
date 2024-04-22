(function() {
    const url = 'http://localhost:3000/actualizarRol.php';

    const nombreInput = document.querySelector('#nombreEditar');
    const descripcionInput = document.querySelector('#descripcionEditar');
    const idInput = document.querySelector('#idRol');
    
    document.addEventListener('DOMContentLoaded', () => {
        const parametrosURL = new URLSearchParams(window.location.search);

        const idRol = parseInt(parametrosURL.get('id'));

          obtenerRol(idRol);

          // Sumir el formulario
          const formularioUsuario = document.querySelector('#formularioEditar');
          formularioUsuario.addEventListener( 'submit', validarRol);

    })
   
    function obtenerRol(idRol) {
        try {
          fetch(`http://localhost:3000/cargarDatosRolActualizar.php?idRol=${idRol}`)
            .then(respuesta => respuesta.json())
            .then(resultado => mostrarRol(resultado))
            
        }catch( error ) {
            console.log( error );
        }
    }

    function mostrarRol(roles) {
        console.log(roles)
        roles.forEach(rol => {
            
            const { id, nombre, descripcion } = rol;
            nombreInput.value = nombre;
            descripcionInput.value = descripcion;
            idInput.value = id;           
        });

    }

    function validarRol(e) {
        e.preventDefault();

        const nombre = nombreInput.value;
        const descripcion = descripcionInput.value;
        const idRol = idInput;

        if ( nombre === '' || descripcion === '' || idRol === '' ) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Tdos los campos son obligatorios...!",
                
              });
            
            return;
        } 

            const rol = {
                nombre: nombreInput.value,
                descripcion: descripcionInput.value,
                id: parseInt(idInput.value)
            }
              

        agregarActualizacionRol(rol);
        
    }

    async function agregarActualizacionRol( rol ) {
        let idRol = rol.id;


            let data = new FormData(formularioEditar);

            console.log(data)

            fetch(`http://localhost:3000/actualizarRol.php?idRol=${idRol}`, {
            
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
                window.location.href = 'listaRolUsuario.html';
            },3000)   
        }
        
        formularioEditar.reset();
    

})();

    