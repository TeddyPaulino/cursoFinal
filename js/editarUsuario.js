(function() {
    const url = 'http://localhost:3000/actualizarRol.php';

    const nombreInput = document.querySelector('#editarNombre');
    const apellidoInput = document.querySelector('#editarApellido');
    const correoInput = document.querySelector('#editarCorreo');
    const usuarioInput = document.querySelector('#editarUsuario');
    const claveInput = document.querySelector('#editarClave');
    const rolInput = document.querySelector('#editarRol');
    const idInput = document.querySelector('#id');
    
    document.addEventListener('DOMContentLoaded', () => {
        const parametrosURL = new URLSearchParams(window.location.search);

        const idUsuario = parseInt(parametrosURL.get('id'));
        console.log(idUsuario)
        obtenerUsuario(idUsuario);
        llenarSelectRol();

          // Sumir el formulario
          const formularioEditar = document.querySelector('#formularioEditar');
          formularioEditar.addEventListener( 'submit', validarUsuario);

    })

    function llenarSelectRol() {
        
        // Realizar la solicitud para obtener los datos desde PHP
        fetch('http://localhost:3000/selectRol.php')
        .then(response => response.json())
        .then(respuesta => {
            // Agregar cada opción al select
            respuesta.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.id;
            optionElement.textContent = option.nombre;
            rolInput.appendChild(optionElement);
        });
        })
    }
   
    function obtenerUsuario(idUsuario) {
        try {
          fetch(`http://localhost:3000/cargarDatosUsuarioActualizar.php?idUsuario=${idUsuario}`)
            .then(respuesta => respuesta.json())
            .then(resultado => mostrarUsuario(resultado))
            
        }catch( error ) {
            console.log( error );
        }
    }

    function mostrarUsuario(usuarios) {
        console.log(usuarios)
        usuarios.forEach(usuario => {
            
            const { id, nombre, apellido, correo, nombre_usuario, clave, rol_Id } = usuario;
            nombreInput.value = nombre
            apellidoInput.value = apellido;
            correoInput.value = correo;
            usuarioInput.value = nombre_usuario;
            claveInput.value = clave;
            rolInput.value = rol_Id;
            idInput.value = id;           
        });

    }

    function validarUsuario(e) {
        e.preventDefault();

        const nombre = nombreInput.value;
        const apellido = apellidoInput.value;
        const correo = correoInput.value;
        const usuario = usuarioInput.value;
        const clave = claveInput.value;
        const rol = rolInput.value;

        if ( nombre === '' || apellido === '' || correo === '' || usuario === '' || clave === '' || rol === '' ) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Tdos los campos son obligatorios...!",
                
              });
            
            return;
        } 
            const user = {
                nombre: nombreInput.value,
                apellido: apellidoInput.value,
                correo: correoInput.value,
                usuario: usuarioInput.value,
                clave: claveInput.value,
                rol: rolInput.value,
                id: parseInt(idInput.value)
            }
              

        agregarActualizacionUsuario(user);
        
    }

    async function agregarActualizacionUsuario( user ) {
        let idUsuario = user.id;
        console.log(idUsuario)


            let data = new FormData(formularioEditar);

            console.log(data)

            fetch(`http://localhost:3000/actualizarUsuario.php?idUsuario=${idUsuario}`, {
            
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
                window.location.href = 'listaUsuario.html';
            },3000)   
        }
        
        formularioEditar.reset();
      

})();

    