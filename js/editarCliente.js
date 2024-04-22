( function() {
    // const url = 'http://localhost:3000/actualizarCliente.php';

    const nombreInput = document.querySelector("#nombrecliente");
    const apellidoInput = document.querySelector("#apellidoCliente");
    const dirInput = document.querySelector('#direccionCliente');
    const telefonoInput = document.querySelector('#telefonoCliente');
    const tipoDocInput = document.querySelector('#tipoDocumentCliente');
    const documentoInput = document.querySelector('#cedulaCliente');
    const emailInput = document.querySelector('#emailCliente');
    const idInput = document.querySelector('#id');
    document.addEventListener('DOMContentLoaded', () => {
        const parametrosURL = new URLSearchParams(window.location.search);

        const id = parseInt(parametrosURL.get('id'));

        obtenerCliente(id);
        llenarSelectTipoDocumento();
          // Sumir el formulario
        const formularioCliente = document.querySelector('#formularioCliente');
        formularioCliente.addEventListener('submit', validarCliente);

    });

    function obtenerCliente(id) {
        try {
            fetch(`http://localhost:3000/cargarDatosActualizarCliente.php?id=${id}`)
              .then(respuesta => respuesta.json())
              .then(resultado => mostrarDatosCliente(resultado))
              
          }catch( error ) {
              console.log( error );
          }
    }

    function llenarSelectTipoDocumento(){
        // Realizar la solicitud para obtener los datos desde PHP
        fetch('http://localhost:3000/selectTipoDatos.php')
        .then(response => response.json())
        .then(respuesta => {
            // Agregar cada opción al select
            respuesta.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.id;
            optionElement.textContent = option.nombre;
            tipoDocInput.appendChild(optionElement);
        });
        })
    }

    function mostrarDatosCliente(clientes) {
        clientes.forEach(cliente =>{
            const {id, nombre, apellido, direccion, telefono,tipo_Documento_Id, documento, correo} = cliente;
            // const option = document.createElement('option');
            // option.value = tipo_Documento_Id
            nombreInput.value = nombre;
            apellidoInput.value = apellido;
            dirInput.value = direccion;
            telefonoInput.value = telefono;
            // tipoDocInput.value = tipo_Documento_Id
            console.log(tipoDocInput)
            documentoInput.value = documento;
            emailInput.value = correo;
            idInput.value = id;

        })
    }
     function validarCliente(e) {
        e.preventDefault();

        const nombre = nombreInput.value;
        const apellido = apellidoInput.value;
        const direccion = dirInput.value;
        const telefono = telefonoInput.value;
        const tipoDocumento = tipoDocInput.value;  
        const documento = documentoInput.value;
        const correo = emailInput.value;
        const id = parseInt(idInput.value);
        
        
        if (nombre === '' || apellido === '' || direccion === '' || telefono === '' || tipoDocumento === '' || documento === '' || correo === '' || id === '') {
            Swal.fire({
                icon: "error",
                title: 'Todos los campos son obligatorios...',
            });
        } else {
            const cliente = {
                nombre:  nombreInput.value,
                apellido:    apellidoInput.value,
                direccion:   dirInput.value,
                telefono:    telefonoInput.value,
                tipoDocumento:   tipoDocInput.value,  
                documento:   documentoInput.value,
                correo:  emailInput.value,
                id:  parseInt(idInput.value)

            }
              
            actualizarCliente(cliente) 
        }
        
    } 
            // window.location.href = 'index.html';
        //  }

    function actualizarCliente(cliente) {

        let idCliente = cliente.id;

        console.log(idCliente)
            let data = new FormData(formularioCliente);

            console.log(data)

            fetch(`http://localhost:3000/actualizarCliente.php?idCliente=${idCliente}`, {
            
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
                window.location.href = 'listaCliente.html';
            },3000)   
        }
        
        formularioCliente.reset();
    

        

})();