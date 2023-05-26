/* ---------------------------------- texto --------------------------------- */


function validarTexto(texto) {
    if (/^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/.test(texto.value)) {
        return true;
    }
    return false;
};

function normalizarTexto(texto) {

}
// La cual hace match con las siguientes reglas:
// - Una o mas palabras separadas con por lo menos un espacio
// - Cada palabra debe cumplir las siguientes reglas:
// - Los caracteres permitidos mas de una vez en cada palabra son[A - Za - zÑñÁáÉéÍíÓóÚú] letras mayusculas y minúsculas, incluidos las vocales con tilde y las Ñ)
// Los únicos símbolos permitidos son el apóstrofo y el guión['\-] y estos se permiten a lo sumo una vez {0,1}
// - Asumiendo que cada palabra debe empezar y terminar con una letra la expresion lleva el cuantificador + .En caso de permitirse empezar y / o terminar con los símbolos permitidos los cuantificadores deberían cambiarse por * (cero o más)

/* ---------------------------------- email --------------------------------- */
function validarEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
        return true;
    }
    return false;
};

function normalizarEmail(email) {

}

// Descripcion de las reglas aceptadas: https://lineadecodigo.com/javascript/validar-el-email-con-javascript/

/* -------------------------------- password -------------------------------- */
function validarContrasenia(contrasenia) {
    if (/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,50})$/.test(contrasenia.value)) {
        return true;
    }
    return false;
};

// La cual hace match con las siguientes reglas:
// - de 6 a 20 caracteres
// - al menos 1 letra minuscula
// - al menos 1 letra mayuscula
// - al menos 1 numero

function compararContrasenias(contrasenia_1, contrasenia_2) {
    if (contrasenia_1.value === contrasenia_2.value) {
        return true;
    }
    return false;
}


export { validarTexto, normalizarTexto, validarEmail, normalizarEmail, validarContrasenia, compararContrasenias };