const GAS_URL = "https://script.google.com/macros/s/AKfycbwsXshOze1AzVq4Q65VVOQBv1oOngYKBvtTTTjSoqjCzN_ew0ckUrjYrVGr0ikFXxAM/exec";

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
      document.getElementById("contenido").style.display = "block";
    } else {
      localStorage.removeItem("sessionToken");
      window.location.href = "index.html";
    }
  } catch (e) {
    console.error("Error al verificar sesión:", e);
    window.location.href = "index.html";
  }
}



function cerrarSesion() {
  localStorage.removeItem("sessionToken");
  window.location.href = "index.html";
}

document.addEventListener("click", (e) => {
  const slider = document.getElementById("slider");
  const menuBtn = document.querySelector(".menu-btn");

  if (
    slider.classList.contains("open") &&
    !slider.contains(e.target) &&
    !menuBtn.contains(e.target)
  ) {
    slider.classList.remove("open");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  verificarSesion();

  document.querySelectorAll(".menu-link").forEach(link => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();
      const file = link.getAttribute("data-html");
      const target = document.getElementById("contenido-principal");
      try {
        const res = await fetch(file);
        if (!res.ok) throw new Error("No se pudo cargar el archivo");
        const html = await res.text();
        target.innerHTML = html;
        toggleSlider();
      } catch (error) {
        target.innerHTML = `<p style="color:red;">Error al cargar el contenido.</p>`;
        console.error(error);
      }
    });
  });
});

function toggleSlider() {
  const slider = document.getElementById("slider");
  slider.classList.toggle("open");
}






