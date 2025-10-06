document.addEventListener("DOMContentLoaded", () => { // Esperar a que el DOM esté completamente cargado
  const form = document.querySelector("form"); // Seleccionar el formulario

  // Diccionario provincias -> código
  const provincias = { // Mapa de códigos de provincia a nombres
    "01": "Azuay",
    "02": "Bolívar",
    "03": "Cañar",
    "04": "Carchi",
    "05": "Cotopaxi",
    "06": "Chimborazo",
    "07": "El Oro",
    "08": "Esmeraldas",
    "09": "Guayas",
    "10": "Imbabura",
    "11": "Loja",
    "12": "Los Ríos",
    "13": "Manabí",
    "14": "Morona Santiago",
    "15": "Napo",
    "16": "Pastaza",
    "17": "Pichincha",
    "18": "Tungurahua",
    "19": "Zamora Chinchipe",
    "20": "Galápagos",
    "21": "Sucumbíos",
    "22": "Orellana",
    "23": "Santo Domingo",
    "24": "Santa Elena"
  };

  form.addEventListener("submit", (event) => { // Manejar el evento de envío del formulario
    event.preventDefault(); // Prevenir el envío por defecto para validar primero
 
    document.querySelectorAll(".error").forEach(e => e.textContent = ""); // Limpiar mensajes de error previos


    // Obtener valores
    const nombre = form.querySelector("input[placeholder='Ingrese nombre']").value.trim(); 
    const edad = form.querySelector("input[placeholder='Ingrese edad']").value.trim();
    const cedula = form.querySelector("input[placeholder='Ingrese cedula']").value.trim();
    const provinciaInput = document.getElementById("provincia").value.trim();
    const genero = form.querySelector("#genero").value;
    const email = form.querySelector("input[type='email']").value.trim();
    const ciudad = form.querySelector("input[placeholder='Ingrese ciudad']").value.trim();
    const telefono = form.querySelector("input[placeholder='Ingrese teléfono']").value.trim();
    const direccion = form.querySelector("input[placeholder='Ingrese dirección']").value.trim();

    let valido = true; // Bandera para seguimiento de validación

    //valido = false; // Forzar error para pruebas


    // Validaciones de cada campo
    if (!/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombre) || nombre.length < 3 || nombre.length > 50) {
      document.getElementById("error-nombre").textContent = "Error: Ingrese datos válidos"; // Mensaje de error
      valido = false; 
    }


    if (isNaN(edad) || edad < 18) {
      document.getElementById("error-edad").textContent = "Error: Debe ser mayor a 17 años"; // Mensaje de error
      valido = false;
    }

    if (isNaN(edad) || edad > 100) {
      document.getElementById("error-edad").textContent = "Error: Ingrese edad válida"; // Mensaje de error
      valido = false;
    }
    

    if (!genero) {
      document.getElementById("error-genero").textContent = "Error: Seleccione un género."; // Mensaje de error
      valido = false;
    }

    if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      document.getElementById("error-email").textContent = "Error: Correo inválido."; // Mensaje de error
      valido = false;
    }

    if (ciudad.length < 4) {
      document.getElementById("error-ciudad").textContent = "Error: Ingrese ciudad válida"; // Mensaje de error
      valido = false;
    }

    if (!/^\d{10}$/.test(telefono) || !telefono.startsWith("09")) { 
      document.getElementById("error-telefono").textContent = "Error: Ingrese un número de teléfono válido";  // Mensaje de error
      valido = false; 
    }

    if (direccion.length < 5) {
      document.getElementById("error-direccion").textContent = "Error: Ingrese dirección válida"; // Mensaje de error
      valido = false;
    }


    // Validar que se seleccione provincia válida
    const codigoProvincia = Object.keys(provincias).find(cod =>  // Buscar código que coincida con entrada
      provinciaInput.startsWith(cod) || provinciaInput.includes(provincias[cod]) // Coincidencia por código o nombre
    );

    if (!codigoProvincia) { 
      document.getElementById("error-provincia").textContent = "Error: Debe seleccionar una provincia válida."; // Mensaje de error
      valido = false;
    }

    // Validar cédula (10 dígitos y coincidencia con provincia)
    if (!/^\d{10}$/.test(cedula)) {
      document.getElementById("error-cedula").textContent = "Error: Digite 10 digitos"; // Mensaje de error
      valido = false;
    } else if (codigoProvincia && !cedula.startsWith(codigoProvincia)) { // Verificar coincidencia con código de provincia
      document.getElementById("error-cedula").textContent = 
        `Error: La cédula debe empezar con: (${codigoProvincia}) para la provincia: (${provincias[codigoProvincia]})`; // Mensaje de error
      valido = false;
    }

    // Si todo es válido, enviar el formulario
    if (valido) {
      alert("Registro exitoso"); // Mensaje de éxito
      form.submit(); // Enviar el formulario
    }
  });
});
