// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.
if (!localStorage.token) {
  location.replace("./index.html");
}
/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener("load", function () {
  /* ---------------- variables globales y llamado a funciones ---------------- */
  
  const btnCerrarSesion = document.querySelector("#closeApp");
  const urlUsuario = "http://localhost:8080/api/v1/usuario/me";
  const urlTarea = "http://localhost:8080/api/v1/tasks";

  const token = "Bearer " + this.localStorage.getItem("token");
  const formCrearTarea = this.document.querySelector(".nueva-tarea");
  const nuevaTarea = this.document.querySelector("#nuevaTarea");
  const contadorTareasFinalizadas = this.document.querySelector(
    ".cantidad-finalizadas"
  );
  let tareasPendientes = document.querySelector(".tareas-pendientes");
  let tareasTerminadas = document.querySelector(".tareas-terminadas");
  const spiner = document.querySelector(".oculto");
  let cantidadFinalizadas = document.querySelector(
    "#cantidad-finalizadas"
  );

  obtenerNombreUsuario();
  consultarTareas();

  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */
  btnCerrarSesion.addEventListener("click", function () {
    localStorage.clear();
    location.replace("./index.html");
  });
  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */
  function obtenerNombreUsuario() {
    const settings = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: token,
      },
    };

    fetch(urlUsuario, settings)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        usuario = data;
        showUserName(data.nombre + " " + data.apellido);
      });

    function showUserName(nombreCompleto) {
      const userText = document.querySelector(".user-info p");
      userText.innerText = nombreCompleto;
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

  function consultarTareas() {
    tareasPendientes.innerHTML = "";
    tareasTerminadas.innerHTML = "";

    const settings = {
      method: "GET",
      headers: {
        Authorization: token,
      },
    };
    
    fetch(urlTarea, settings)
    .then((response) => response.json())
    .then((data) => {
        let contador = 0;
        data.forEach((element) => {
          if (element.completed) {
            contador += 1;
          }
          renderizarTareas(element, contador);
        });
        let botonCambioEstado = document.querySelectorAll(".change");
        botonCambioEstado.forEach((element) => {
          element.addEventListener("click", (e) => {
            botonesCambioEstadoFn(e.target, true);
          });
        });
        let botonBorrarTarea = document.querySelectorAll(".borrar");
        botonBorrarTarea.forEach((element) => {
          element.addEventListener("click", (e) => {
            botonBorrarTareaFn(e.target.id);
          });
        });
        let botonRestaurarEstado = document.querySelectorAll(".incompleta");
        botonRestaurarEstado.forEach((element) => {
          element.addEventListener("click", (e) => {
            botonesCambioEstadoFn(e.target, false);
          });
        });
      });
  }

  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  formCrearTarea.addEventListener("submit", function (event) {
    event.preventDefault();

    spiner.classList.remove("oculto");
    setTimeout(() => {
      spiner.classList.add("oculto");
      crearTarea();
    }, 1000);

    function crearTarea() {
      const settings = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          description: nuevaTarea.value,
          completed: false,
        }),
      };

      fetch(urlTarea, settings)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          consultarTareas();
          formCrearTarea.reset();
        });
    }
  });

  /* ------------------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                            */
  /* ------------------------------------------------------------------------------------- */
  function renderizarTareas(listado, contador) {
    if (contador === 0) {
      cantidadFinalizadas.innerHTML = contador;
    }
    if (!listado.completed) {
      tareasPendientes.innerHTML += `
      <li class="tarea">
        <button class="change" id="${listado.id}" title='${
        listado.description
      }'>
            <i class="fa-regular fa-circle"></i>
        </button>
        <div class="descripcion">
            <p class="nombre">${listado.description}</p>
            <p class="timestamp">${listado.createdAt}</p>
        </div>
    </li>`;
    }
    if (listado.completed) {
      cantidadFinalizadas.innerHTML = contador;
      tareasTerminadas.innerHTML += `
        <li class="tarea">
            <div class="hecha">
                <i class="fa-regular fa-circle-check"></i>
            </div>
            <div class="descripcion">
                <p class="nombre">${listado.description}</p>
                <div class="cambio-estados">
                  <button class='incompleta fa-solid fa-rotate-left' title='${listado.description}' id="${listado.id}"></button>
                  <button class="borrar fa-regular fa-trash-can" id="${listado.id}"></button>
                </div>
            </div>
        </li>`;
    }
  }
  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function botonesCambioEstadoFn(tarea, estado) {
    const settings = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        description: tarea.title,
        completed: estado,
      }),
    };

    fetch(urlTarea + "/" + tarea.id, settings)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        consultarTareas();
      });
  }

  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTareaFn(id) {
    const settings = {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    };

    fetch(urlTarea + "/" + id, settings)
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        alert(data);
        consultarTareas();
      });
  }
});
