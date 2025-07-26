const GAS_URL = "https://script.google.com/macros/s/AKfycbwsXshOze1AzVq4Q65VVOQBv1oOngYKBvtTTTjSoqjCzN_ew0ckUrjYrVGr0ikFXxAM/exec";

// Tiempo máximo de inactividad en milisegundos (30 segundos)
const TIEMPO_MAX_INACTIVIDAD = 60 * 1000;

let temporizadorInactividad;

async function verificarSesion() {
  const token = localStorage.getItem("sessionToken");
  if (!token) {
    window.location.href = "index.html";
    return;
  }

  try {
    const response = await fetch(`${GAS_URL}?checkSession=1&session=${token}`);
    const resultado = await response.json();

    if (resultado.status === "OK") {
      const contenido = document.getElementById('contenido');
      if (contenido) contenido.style.display = 'block';

      const divUsuario = document.getElementById("usuarioNombre");
      if (divUsuario && resultado.nombre) {
        divUsuario.textContent = "👤 " + resultado.nombre;
      }

      iniciarDeteccionInactividad(); // Inicia el temporizador al entrar

    } else {
      cerrarSesion();
    }
  } catch (error) {
    console.error("Error al verificar sesión:", error);
    cerrarSesion();
  }
}

function cerrarSesion() {
  localStorage.removeItem("sessionToken");
  window.location.href = "index.html";
}

function iniciarDeteccionInactividad() {
  document.addEventListener("mousemove", reiniciarTemporizador);
  document.addEventListener("keydown", reiniciarTemporizador);
  document.addEventListener("click", reiniciarTemporizador);
  document.addEventListener("touchstart", reiniciarTemporizador);

  reiniciarTemporizador(); // Empieza el contador
}

function reiniciarTemporizador() {
  clearTimeout(temporizadorInactividad);
  temporizadorInactividad = setTimeout(() => {
    alert("Sesión finalizada por inactividad");
    cerrarSesion();
  }, TIEMPO_MAX_INACTIVIDAD);
}

document.addEventListener("DOMContentLoaded", verificarSesion);

