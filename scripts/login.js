import {
  validarTexto,
  normalizarTexto,
  validarEmail,
  normalizarEmail,
  validarContrasenia,
} from "./utils.js";

window.addEventListener("load", function () {
  /* ---------------------- obtenemos variables globales ---------------------- */
  const inputEmail = document.querySelector("#inputEmail");
  const inputContrasena = document.querySelector("#inputPassword");

  const form = document.querySelector("form");
  const url = "http://localhost:8080/api/v1/usuario";

  /* -------------------------------------------------------------------------- */
  /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
  /* -------------------------------------------------------------------------- */
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = {};
    formData.email = inputEmail.value;
    formData.password = inputContrasena.value;

    console.log(formData);

    realizarLogin(formData);
  });

  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 2: Realizar el login [POST]                    */
  /* -------------------------------------------------------------------------- */
  function realizarLogin(formData) {
    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    fetch(url + "/auth/login", settings)
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta del servidor:", data);
        // Hacer algo con la respuesta del servidor

        // Guardar los datos en el localStorage
        localStorage.setItem("id", data.id);
        localStorage.setItem("nombre", data.nombre);
        localStorage.setItem("apellido", data.apellido);
        localStorage.setItem("email", data.email);

        // Redirigir a la página mis-tareas.html
        window.location.href = "mis-tareas.html";
      })
      .catch((error) => {
        console.error("Error:", error);
        // Manejar el error en caso de que ocurra
      });
  }
});
