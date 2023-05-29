import {
  validarTexto,
  normalizarTexto,
  validarEmail,
  normalizarEmail,
  validarContrasenia,
  compararContrasenias,
} from "./utils.js";

window.addEventListener("load", function () {
  /* ---------------------- obtenemos variables globales ---------------------- */
  const inputNombre = document.querySelector("#inputNombre");
  const inputApellido = document.querySelector("#inputApellido");
  const inputEmail = document.querySelector("#inputEmail");
  const inputContrasena = document.querySelector("#inputPassword");
  const inputContrasenaRepetida = document.querySelector(
    "#inputPasswordRepetida"
  );
  const url = "http://localhost:8080/api/v1/usuario";

  /* -------------------------------------------------------------------------- */
  /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
  /* -------------------------------------------------------------------------- */
  window.addEventListener("submit", function (event) {
    event.preventDefault();
    validarDatosIngreso();

    function validarDatosIngreso() {
      if (
        validarTexto(inputNombre) &&
        validarTexto(inputApellido) &&
        validarEmail(inputEmail) &&
        validarContrasenia(inputContrasena) &&
        compararContrasenias(inputContrasena, inputContrasenaRepetida)
      ) {
        console.log("datos ingresados correctamente");
        const formData = {};
        formData.nombre = inputNombre.value;
        formData.apellido = inputApellido.value;
        formData.email = inputEmail.value;
        formData.password = inputContrasena.value;
        realizarRegister(formData);
        const registroCorrecto = document.querySelector("#registroCorrecto");
        registroCorrecto.style.display = "block";
        registroCorrecto.textContent = "Registro exitoso";
      } else {
        console.log("algun dato no fue ingresado correctamente");
        const errorCampo = document.querySelector("#errorCampo");
        // errorCampo.textContent = mensaje;
        errorCampo.style.display = "block";
        if (!validarContrasenia(inputContrasena)) {
          errorCampo.textContent =
            "La contraseña debe tener de 6 a 20 caracteres, al menos 1 letra minuscula, al menos 1 letra mayuscula y al menos 1 numero";
        }
        if (!compararContrasenias(inputContrasena, inputContrasenaRepetida)) {
          errorCampo.textContent = "La contraseña no coincide.";
        }
        if (!validarTexto(inputNombre) || !validarTexto(inputApellido)) {
          errorCampo.textContent = "Ingrese un nombre o apellido válido.";
        }
        if (!validarEmail(inputEmail)) {
          errorCampo.textContent = "Ingrese un correo electrónico válido.";
        }
      }
    }
  });

  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
  /* -------------------------------------------------------------------------- */
  function realizarRegister(formData) {

    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    fetch(url + "/auth/registro", settings)
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta del servidor:", data);
        // Hacer algo con la respuesta del servidor

        // Guardar los datos en el localStorage
        localStorage.setItem("nombre", formData.nombre);
        localStorage.setItem("apellido", formData.apellido);
        localStorage.setItem("email", formData.email);

        // Redirigir a la página mis-tareas.html
        // window.location.href = "index.html";
      })
      .catch((error) => {
        console.error("Error:", error);
        // Manejar el error en caso de que ocurra
      });
  }
});
