const GAS_URL = "https://script.google.com/macros/s/AKfycbwsXshOze1AzVq4Q65VVOQBv1oOngYKBvtTTTjSoqjCzN_ew0ckUrjYrVGr0ikFXxAM/exec";

function mostrarLoader() {
  document.getElementById("loader").style.display = "flex";
}

function ocultarLoader() {
  document.getElementById("loader").style.display = "none";
}

// FUNCIÓN DE LOGIN
function validar() {
  const usuario = document.getElementById("usuario").value.trim();
  const clave = document.getElementById("clave").value.trim();
  const mensaje = document.getElementById("mensaje");

  mensaje.textContent = "";
  mostrarLoader();

  fetch(GAS_URL, {
    method: "POST",
    body: new URLSearchParams({ usuario, clave })
  })
    .then(res => res.json())
    .then(data => {
      ocultarLoader();
      if (data.status === "OK") {
        localStorage.setItem("sessionToken", data.token);
        mensaje.textContent = "Acceso concedido...";
        setTimeout(() => {
          window.location.href = "main.html";
        }, 1000);
      } else if (data.status === "DENEGADO") {
        mensaje.textContent = "No tienes permisos para acceder.";
      } else {
        mensaje.textContent = data.mensaje || "Error en la autenticación.";
      }
    })
    .catch(() => {
      ocultarLoader();
      mensaje.textContent = "Error de conexión.";
    });
}
