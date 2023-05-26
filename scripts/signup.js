import { validarTexto, normalizarTexto, validarEmail, normalizarEmail, validarContrasenia, compararContrasenias } from "./utils.js";

window.addEventListener('load', function() {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const inputNombre = document.querySelector('#inputNombre');
    const inputApellido = document.querySelector('#inputApellido');
    const inputEmail = document.querySelector('#inputEmail');
    const inputContrasena = document.querySelector('#inputPassword');
    const inputContrasenaRepetida = document.querySelector('#inputPasswordRepetida');
    // console.log(inputNombre.value);





    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    window.addEventListener('submit', function(event) {
        event.preventDefault();
        validarDatosIngreso();


        function validarDatosIngreso() {
            if (validarTexto(inputNombre) && validarTexto(inputApellido) && validarEmail(inputEmail) && validarContrasenia(inputContrasena) && compararContrasenias(inputContrasena, inputContrasenaRepetida)) {
                console.log("bien");
            } else {
                console.log("mal");
            }
        }
        // console.log(inputNombre.value);
        const validInputNombre = document.querySelector('#inputNombre').value;
        const validInputApellido = document.querySelector('#inputApellido').value;
        const validInputEmail = document.querySelector('#inputEmail').value;
        const validInputContrasena = document.querySelector('#inputPassword').value;
        // console.log(validInputNombre);


    });

    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarRegister(settings) {





    };


});