export const valida = (input)  => {
    const tipoInput = input.dataset.tipo
    if(validadores[tipoInput]){
        validadores[tipoInput](input)
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML = ""
    }else{
        input.parentElement.classList.add("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeError(tipoInput, input)

    }
}

const tipoErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
]

const mensajesError = {
    nombre : {
        valueMissing : "Este campo no puede estar vacio"
    },
    email : {
        valueMissing : "Este campo no puede estar vacio",
        typeMismatch : "Correo invalido"
    },
    password : {
        valueMissing : "Este campo no puede estar vacio",
        patternMismatch : "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales."
    },
    nacimiento : {
        valueMissing : "Este campo no puede estar vacio",
        customError : "Debes tener al menos 18 años de edad."
    },
    numero : {
        valueMissing : "Este campo no puede estar vacio",
        patternMismatch : "El formato requerido es 10 números"
    }
}

const validadores = {
    nacimiento: (input) => validarNacimiento(input)
}

const mostrarMensajeError = (tipo, input) => {
    let mensaje = ""
    tipoErrores.forEach( (error) => {
        if (input.validity[error]) {
            mensaje = mensajesError[tipo][error]
        }
    })
    return mensaje
}

const validarNacimiento = (input) => {
    const fechaCliente = new Date(input.value)
    let mensaje = ""
    if(!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad."
    }
    input.setCustomValidity(mensaje)

}

const mayorDeEdad = (fecha) => {
    const fechaActual = new Date()
    const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate())
    console.log(diferenciaFechas <= fechaActual);
    return diferenciaFechas <= fechaActual;
}