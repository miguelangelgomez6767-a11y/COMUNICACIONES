// Interacciones de Comunicaciones en Acción
const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    menuToggle.textContent = "☰";
  });
});

// Filtro de evidencias por integrante.
const filterButtons = document.querySelectorAll(".filter-button");
const evidenceCards = document.querySelectorAll(".evidence-card");
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.toggle("active", item === button));
    const filter = button.dataset.filter;
    evidenceCards.forEach(card => {
      card.classList.toggle("is-hidden", filter !== "todos" && card.dataset.owner !== filter);
    });
  });
});

// Vista previa de imágenes seleccionadas desde el dispositivo.
document.querySelectorAll(".image-upload").forEach(input => {
  input.addEventListener("change", event => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Selecciona un archivo de imagen, por favor.");
      input.value = "";
      return;
    }
    const target = document.getElementById(input.dataset.target);
    const reader = new FileReader();
    reader.onload = () => {
      target.src = reader.result;
      target.hidden = false;
      target.previousElementSibling?.classList.add("preview-added");
      const card = input.closest(".evidence-card");
      const imageBox = card.querySelector(".evidence-image");
      imageBox.style.backgroundImage = `url("${reader.result}")`;
      imageBox.style.backgroundSize = "cover";
      imageBox.style.backgroundPosition = "center";
      imageBox.querySelector(".placeholder-art").style.display = "none";
    };
    reader.readAsDataURL(file);
  });
});

// Reflexiones iniciales: reemplazar o ampliar con experiencias reales de cada aprendiz.
const reflections = {
  reflection1: {
    name: "REFLEXIÓN · INTEGRANTE 1",
    text: "Durante este trimestre aprendí que comunicarme de manera asertiva significa expresar mis ideas con claridad y respeto, pero también escuchar y considerar otros puntos de vista. Comprendí que el trabajo en equipo requiere diálogo, responsabilidad y disposición para llegar a acuerdos. En mi formación como tecnólogo en ADSO, aplicaré este aprendizaje al explicar mis propuestas, preguntar cuando tenga dudas y recibir recomendaciones para mejorar.",
    commitment: "MI COMPROMISO: escuchar antes de responder y comunicar mis ideas con respeto."
  },
  reflection2: {
    name: "REFLEXIÓN · INTEGRANTE 2",
    text: "Este proceso me ayudó a reconocer que la comunicación no se limita a las palabras: los gestos, el tono de voz y la forma de escribir también transmiten mensajes. Aprendí que escuchar activamente y confirmar la información puede prevenir confusiones. En los proyectos de software quiero aplicar lo aprendido al documentar tareas, participar en reuniones y expresar mis desacuerdos de manera constructiva.",
    commitment: "MI COMPROMISO: verificar que los mensajes sean claros y escuchar diferentes opiniones."
  },
  reflection3: {
    name: "REFLEXIÓN · INTEGRANTE 3",
    text: "Mi aprendizaje más significativo fue comprender que una buena comunicación fortalece la colaboración y ayuda a resolver conflictos sin faltar al respeto. También entendí que pedir ayuda, recibir retroalimentación y reconocer los aportes de los demás hacen parte del aprendizaje. Como futuro tecnólogo en ADSO, procuraré mantener una actitud abierta, respetuosa y responsable al trabajar con compañeros y clientes.",
    commitment: "MI COMPROMISO: recibir la retroalimentación como una oportunidad para mejorar."
  }
};

const reflectionTabs = document.querySelectorAll(".reflection-tab");
const reflectionName = document.querySelector("#reflectionName");
const reflectionText = document.querySelector("#reflectionText");
const reflectionCommitment = document.querySelector("#reflectionCommitment");
const editorSelect = document.querySelector("#reflectionEditorSelect");
const editorText = document.querySelector("#reflectionEditorText");
const editorCommitment = document.querySelector("#reflectionEditorCommitment");
const editorStatus = document.querySelector("#editorStatus");
let activeReflection = "reflection1";

function showReflection(key) {
  activeReflection = key;
  const data = reflections[key];
  reflectionName.textContent = data.name;
  reflectionText.textContent = data.text;
  reflectionCommitment.textContent = data.commitment;
  reflectionTabs.forEach(tab => {
    const selected = tab.dataset.reflection === key;
    tab.classList.toggle("active", selected);
    tab.setAttribute("aria-selected", String(selected));
  });
  editorSelect.value = key;
  editorText.value = data.text;
  editorCommitment.value = data.commitment.replace(/^MI COMPROMISO:\s*/i, "");
  editorStatus.textContent = "";
}

reflectionTabs.forEach(tab => {
  tab.addEventListener("click", () => showReflection(tab.dataset.reflection));
});
editorSelect.addEventListener("change", () => showReflection(editorSelect.value));

document.querySelector("#updateReflection").addEventListener("click", () => {
  const key = editorSelect.value;
  const text = editorText.value.trim();
  const commitment = editorCommitment.value.trim();
  if (!text) {
    editorStatus.textContent = "Escribe una reflexión antes de actualizarla.";
    editorText.focus();
    return;
  }
  reflections[key] = {
    name: `REFLEXIÓN · ${key === "reflection1" ? "INTEGRANTE 1" : key === "reflection2" ? "INTEGRANTE 2" : "INTEGRANTE 3"}`,
    text,
    commitment: commitment ? `MI COMPROMISO: ${commitment}` : "MI COMPROMISO: seguir fortaleciendo mis habilidades comunicativas."
  };
  showReflection(key);
  editorStatus.textContent = "Reflexión actualizada en la página. Recuerda guardar el texto en el archivo HTML o JavaScript para conservarlo al cerrar.";
});

showReflection("reflection1");
