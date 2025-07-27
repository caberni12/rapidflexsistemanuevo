function toggleChatbox() {
  const chatbox = document.getElementById("chatbox");
  chatbox.classList.toggle("oculto");
}

function agregarMensaje(mensaje, esUsuario = false) {
  const chatBody = document.getElementById("chat-body");
  const p = document.createElement("p");
  p.textContent = (esUsuario ? "🧑: " : "🤖: ") + mensaje;
  chatBody.appendChild(p);
  chatBody.scrollTop = chatBody.scrollHeight;
}

async function procesarComando() {
  const input = document.getElementById("chat-input");
  const comando = input.value.toLowerCase();
  input.value = "";
  agregarMensaje(comando, true);

  if (comando.includes("ver clientes")) {
    const res = await fetch('https://script.google.com/macros/s/AKfycbxMbnEaBACzaWruBKj2HwXv69d7JjmIoToUBoKG8xSsJXPsWfA3DSSdmKLTv7MKS3skdg/exec');
    const datos = await res.json();
    const ultimos = datos.slice(-10).map((d, i) => `${i + 1}. ${d.nombre}`).join("\n");
    agregarMensaje(`Hay ${datos.length} clientes registrados.\nÚltimos 10:\n${ultimos}`);
  } else if (comando.includes("ver repartidores")) {
    const res = await fetch('https://script.google.com/macros/s/AKfycbyHMpaLc7qdPHNZdjPcxz7bwjIeFoV_wOMRGVm33oPKiSO1NWbVAta6Rsd-YGdxjlPmeg/exec');
    const datos = await res.json();
    const ultimos = datos.slice(-10).map((d, i) => `${i + 1}. ${d.nombre}`).join("\n");
    agregarMensaje(`Hay ${datos.length} repartidores registrados.\nÚltimos 10:\n${ultimos}`);
  } else if (comando.includes("último cliente")) {
    const res = await fetch('https://script.google.com/macros/s/AKfycbxMbnEaBACzaWruBKj2HwXv69d7JjmIoToUBoKG8xSsJXPsWfA3DSSdmKLTv7MKS3skdg/exec');
    const datos = await res.json();
    const ult = datos[datos.length - 1];
    agregarMensaje(`Último cliente: ${ult.nombre}, Tel: ${ult.telefono}`);
  } else if (comando.includes("último repartidor")) {
    const res = await fetch('https://script.google.com/macros/s/AKfycbyHMpaLc7qdPHNZdjPcxz7bwjIeFoV_wOMRGVm33oPKiSO1NWbVAta6Rsd-YGdxjlPmeg/exec');
    const datos = await res.json();
    const ult = datos[datos.length - 1];
    agregarMensaje(`Último repartidor: ${ult.nombre}, Tel: ${ult.telefono}`);
  } else {
    agregarMensaje("No entendí esa instrucción. Intenta: 'ver clientes', 'último repartidor'...");
  }
}
