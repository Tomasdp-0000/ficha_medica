// Simulamos la base de datos de registros médicos
const registrosExistentes = [
    {
        rut: "12.345.678-9",
        nombres: "Juan Eduardo",
        apellidos: "Pérez Galaz",
        email: "juan.perez@example.com",
    },
    {
        rut: "4.765.432-1",
        nombres: "María Andrea",
        apellidos: "Gómez Morales",
        email: "maria.gomez@gmail.com",
    },
    {
        rut: "20.981.433-0",
        nombres: "Sofia Almendra",
        apellidos: "Soto Gallardo",
        email: "Sofia.almendra@gmail.com",
    },
];

const form = document.getElementById("fichaMedicaForm");
const guardarBtn = document.getElementById("guardarBtn");

// Lógica de validación del botón

form.addEventListener("input", () => {
    // Si todos los campos obligatorios son válidos
    if (form.checkValidity()) {
        // remueve el atributo 'disabled' del botón
        guardarBtn.removeAttribute("disabled");
    } else {
        // si no, vuelve a deshabilitarlo
        guardarBtn.setAttribute("disabled", "true");
    }
});

// Lógica de guardado del formulario
form.addEventListener("submit", (e) => {
    e.preventDefault();

    // El navegador validó los campos gracias a form.checkValidity()
    const datosFormulario = Object.fromEntries(new FormData(form));
    const rutIngresado = datosFormulario.rut;
    const emailIngresado = datosFormulario.email;

    const registroExistente = registrosExistentes.find(registro =>
        registro.rut === rutIngresado || registro.email === emailIngresado
    );

    if (registroExistente) {
        const confirmarSobrescritura = confirm(
            `El registro para ${registroExistente.nombres} ya existe. ¿Desea sobrescribirlo?`
        );
        if (confirmarSobrescritura) {
            console.log("Sobrescribiendo registro:", datosFormulario);
            alert("Registro sobrescrito exitosamente.");
        } else {
            console.log("Operación cancelada por el usuario.");
            alert("Operación de guardado cancelada.");
        }
    } else {
        console.log("Creando nuevo registro:", datosFormulario);
        alert("Nuevo registro guardado exitosamente.");
    }
});

// Lógica para la búsqueda de usuarios por apellido
const inputBuscar = document.getElementById("buscarApellido");
const botonBuscar = document.getElementById("buscarBtn");
const resultadosBusqueda = document.getElementById("resultadosBusqueda");

botonBuscar.addEventListener("click", () => {
    const apellidoABuscar = inputBuscar.value.toLowerCase().trim();

    if (!apellidoABuscar) {
        resultadosBusqueda.textContent = "Por favor, ingrese un apellido para buscar.";
        return;
    }

    const resultados = registrosExistentes.filter(registro =>
        registro.apellidos.toLowerCase().includes(apellidoABuscar)
    );

    if (resultados.length > 0) {
        let textoResultados = "Resultados encontrados:\n\n";
        resultados.forEach(registro => {
            textoResultados += `Nombre: ${registro.nombres} ${registro.apellidos}\n`;
            textoResultados += `Email: ${registro.email}\n`;
            textoResultados += `RUT: ${registro.rut}\n`;
            textoResultados += "------------------------\n";
        });
        resultadosBusqueda.textContent = textoResultados;
    } else {
        resultadosBusqueda.textContent = `No se encontraron usuarios con el apellido "${apellidoABuscar}".`;
    }
});

// Lógica para cerrar el formulario con el boton cerrar
const cerrarBtn = document.getElementById("cerrarBtn");
const formContainer = document.getElementById("mainFormContainer");

cerrarBtn.addEventListener("click", () => {
    formContainer.style.display = "none";
});