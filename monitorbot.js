let cantidadClientes = 0;
let cantidadRepartidores = 0;

async function verificarNuevosDatos() {
  await verificarFuente('https://script.google.com/macros/s/AKfycbxMbnEaBACzaWruBKj2HwXv69d7JjmIoToUBoKG8xSsJXPsWfA3DSSdmKLTv7MKS3skdg/exec', 'Clientes');
  await verificarFuente('https://script.google.com/macros/s/AKfycbyHMpaLc7qdPHNZdjPcxz7bwjIeFoV_wOMRGVm33oPKiSO1NWbVAta6Rsd-YGdxjlPmeg/exec', 'Repartidores');
}

async function verificarFuente(url, tipo) {
  try {
    const res = await fetch(url);
    const datos = await res.json();
    if (tipo === 'Clientes') {
      if (cantidadClientes === 0) {
        cantidadClientes = datos.length;
      } else if (datos.length > cantidadClientes) {
        const nuevo = datos[datos.length - 1];
        mostrarNotificacion(`🟢 Nuevo cliente: ${nuevo.nombre}`);
        cantidadClientes = datos.length;
      }
    }
    if (tipo === 'Repartidores') {
      if (cantidadRepartidores === 0) {
        cantidadRepartidores = datos.length;
      } else if (datos.length > cantidadRepartidores) {
        const nuevo = datos[datos.length - 1];
        mostrarNotificacion(`🛵 Nuevo repartidor: ${nuevo.nombre}`);
        cantidadRepartidores = datos.length;
      }
    }
  } catch (error) {
    console.error(`Error en ${tipo}:`, error);
  }
}

function mostrarNotificacion(mensaje) {
  const noti = document.getElementById("notificacion");
  noti.textContent = mensaje;
  noti.classList.add("visible");
  setTimeout(() => noti.classList.remove("visible"), 5000);
}

setInterval(verificarNuevosDatos, 10000);
