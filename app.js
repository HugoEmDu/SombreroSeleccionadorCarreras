/**
 * app.js — Lógica del Sombrero Seleccionador Vocacional UTN FRRE
 */

// ─── Configuración ────────────────────────────────────────────────────────────
const CONFIG = {
  questionsPerGame: 9,        // Preguntas por partida
  storageKey: "sombreroStats", // Clave localStorage para estadísticas
};

// ─── Datos de carreras ─────────────────────────────────────────────────────────
const CAREERS = {
  sistemas: {
    name: "Ingeniería en Sistemas de Información",
    emoji: "💻",
    color: "#4A90E2",
    tagline: "El mundo digital te espera",
    banner: "video estandarte/ISI_Estandarte.mp4",
    image: "img/carrera_sistemas.jpg",
    description: (second) =>
      `El Sombrero ve en vos una mente lógica que disfruta resolver acertijos con código y hacer que las cosas funcionen solas. Te fascina la tecnología y tenés potencial para crear los sistemas del futuro.`,
    utnFact: "🎓 En UTN FRRE, los egresados en Sistemas trabajan desde Silicon Valley hasta empresas locales creando soluciones que usan millones de personas. La carrera dura 5 años y es 100% en Resistencia.",
    link: "https://www.frre.utn.edu.ar/isi/",
  },
  quimica: {
    name: "Ingeniería Química",
    emoji: "⚗️",
    color: "#7AC74F",
    tagline: "La materia no guarda secretos para vos",
    banner: "video estandarte/IQ_Estandarte.mp4",
    image: "img/carrera_quimica.jpg",
    description: (second) =>
      `El Sombrero nota en vos una curiosidad insaciable por entender cómo y por qué los materiales se transforman. Tu meticulosidad y fascinación por los experimentos son el combustible perfecto para esta carrera.`,
    utnFact: "🎓 UTN FRRE forma Ingenieros Químicos que trabajan en industrias de alimentos, petroquímica, farmacéutica y medioambiente en todo el NEA. La carrera dura 5 años.",
    link: "https://www.frre.utn.edu.ar/iq/",
  },
  electromecanica: {
    name: "Ingeniería Electromecánica",
    emoji: "⚙️",
    color: "#E8A838",
    tagline: "Las máquinas no tienen secretos para vos",
    banner: "video estandarte/IEM_Estandarte.mp4",
    image: "img/carrera_electromecanica.jpg",
    description: (second) =>
      `El Sombrero percibe que sos de los que abren las cosas para entender cómo funcionan. Te atrae el trabajo manual combinado con el cálculo, y disfrutás cuando una máquina vuelve a la vida gracias a vos.`,
    utnFact: "🎓 Los Ingenieros Electromecánicos de UTN FRRE están presentes en plantas industriales, empresas de energía y mantenimiento de maquinaria en todo el norte argentino. 5 años de carrera.",
    link: "https://www.frre.utn.edu.ar/iem/",
  },
  mecatronica: {
    name: "Ingeniería Mecatrónica",
    emoji: "🤖",
    color: "#9B59B6",
    tagline: "Mitad ingeniero, mitad mago tecnológico",
    banner: "video estandarte/IME_Estandarte.mp4",
    image: "img/carrera_mecatronica.jpg",
    description: (second) =>
      `El Sombrero ve en vos a alguien que quiere lo mejor de tres mundos: mecánica, electrónica y programación. Te apasiona que las máquinas piensen, y soñás con construir robots o sistemas que se muevan solos.`,
    utnFact: "🎓 Mecatrónica en UTN FRRE es una de las carreras más nuevas y demandadas del mercado: robótica, automatización industrial, vehículos autónomos. 5 años en Resistencia.",
    link: "https://www.frre.utn.edu.ar/im/",
  },
  administracion_rural: {
    name: "Licenciatura en Administración Rural",
    emoji: "🌾",
    color: "#27AE60",
    tagline: "El campo necesita mentes organizadas como la tuya",
    banner: "video estandarte/LAR_Estandarte.mp4",
    image: "img/carrera_administracion_rural.jpg",
    description: (second) =>
      `El Sombrero nota en vos a alguien con los pies en la tierra (literalmente) y cabeza para los números. Te interesa organizar, producir y liderar proyectos en contacto con la naturaleza y la gente del campo.`,
    utnFact: "🎓 UTN FRRE forma Licenciados en Administración Rural preparados para gestionar establecimientos agropecuarios, agronegocios y proyectos rurales en el Chaco y todo el NEA. Carrera de 4 años.",
    link: "https://www.frre.utn.edu.ar/lar/",
  },
};

// ─── Frases del Sombrero ───────────────────────────────────────────────────────
const HAT_TRANSITIONS = [
  "Mmmm... interesante elección...",
  "Ya veo hacia dónde vas...",
  "¡Ajá! El sombrero lo registra todo...",
  "Curioso, muy curioso...",
  "El sombrero nunca se equivoca... o casi nunca...",
  "Esto revela mucho sobre tu carácter...",
  "Cada respuesta me habla de tu verdadero yo...",
  "Sigo leyendo tu mente...",
  "¡Casi terminamos! El destino se acerca...",
];

// ─── Estado del juego ─────────────────────────────────────────────────────────
let state = {
  questions: [],
  current: 0,
  scores: { sistemas: 0, quimica: 0, electromecanica: 0, mecatronica: 0, administracion_rural: 0 },
  selectedAnswers: [],
};

// ─── Videos ───────────────────────────────────────────────────────────────────
const VIDEOS = {
  bienvenida: "video/Bienvenida.mp4",
  proceso: "video/Proceso.mp4",
  transiciones: [
    "video/Transicion1.mp4",
    "video/Transicion2.mp4",
    "video/Transicion3.mp4",
    "video/Transicion4.mp4",
    "video/Transicion5.mp4",
  ],
  resultado: {
    sistemas:           "video/Sistemas.mp4",
    quimica:            "video/Quimica.mp4",
    electromecanica:    "video/Electromecanica.mp4",
    mecatronica:        "video/Mecatronica.mp4",
    administracion_rural: "video/LAR.mp4",
  },
};

/**
 * Reproduce un video en el overlay y llama a `onEnd` al terminar o al saltar.
 */
function playVideo(src, onEnd, keepOverlay = false) {
  const overlay = document.getElementById("video-screen");
  const video   = document.getElementById("main-video");
  const skipBtn = document.getElementById("btn-skip-video");

  // Limpiar listener anterior
  video.onended = null;
  skipBtn.onclick = null;

  video.src = src;
  overlay.classList.add("active");
  overlay.setAttribute("aria-hidden", "false");
  
  // Asegurar que el video sea visible (fade in)
  video.style.opacity = "1";

  video.play().catch(() => {
    // Si autoplay falla (poco probable porque el usuario ya interactuó), saltar directo
    finishVideo();
  });

  function finishVideo() {
    video.onended = null;
    skipBtn.onclick = null;

    if (keepOverlay) {
      // Fade out solo el video
      video.style.opacity = "0";
      setTimeout(() => {
        video.pause();
        video.src = "";
        onEnd();
      }, 400); // 400ms para coincidir con la transición CSS
    } else {
      overlay.classList.remove("active");
      overlay.setAttribute("aria-hidden", "true");

      // Esperar a que termine la transición CSS (600ms)
      setTimeout(() => {
        video.pause();
        video.src = "";
        onEnd();
      }, 600);
    }
  }

  video.onended = finishVideo;
  skipBtn.onclick = finishVideo;
}

// ─── Utilidades ───────────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getTopCareers() {
  const sorted = Object.entries(state.scores).sort((a, b) => b[1] - a[1]);
  return sorted;
}

// ─── Estadísticas ─────────────────────────────────────────────────────────────
function loadStats() {
  try {
    return JSON.parse(localStorage.getItem(CONFIG.storageKey)) || {
      sistemas: 0, quimica: 0, electromecanica: 0, mecatronica: 0, administracion_rural: 0, total: 0,
    };
  } catch {
    return { sistemas: 0, quimica: 0, electromecanica: 0, mecatronica: 0, administracion_rural: 0, total: 0 };
  }
}

function saveStats(careerKey) {
  const stats = loadStats();
  stats[careerKey] = (stats[careerKey] || 0) + 1;
  stats.total = (stats.total || 0) + 1;
  localStorage.setItem(CONFIG.storageKey, JSON.stringify(stats));
}

function exportCSV() {
  const stats = loadStats();
  const rows = [
    ["Carrera", "Resultados", "Porcentaje"],
    ...Object.keys(CAREERS).map((k) => [
      CAREERS[k].name,
      stats[k] || 0,
      stats.total ? ((((stats[k] || 0) / stats.total) * 100).toFixed(1) + "%") : "0%",
    ]),
    ["TOTAL", stats.total || 0, "100%"],
  ];
  const csv = rows.map((r) => r.join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `sombrero-estadisticas-${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Pantallas ────────────────────────────────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// ─── Inicio del juego ─────────────────────────────────────────────────────────
function startGame() {
  state.questions = shuffle(QUESTION_POOL).slice(0, CONFIG.questionsPerGame);
  state.current = 0;
  state.scores = { sistemas: 0, quimica: 0, electromecanica: 0, mecatronica: 0, administracion_rural: 0 };
  state.selectedAnswers = [];

  // Reproducir video de bienvenida antes de mostrar el quiz
  playVideo(VIDEOS.bienvenida, () => {
    showScreen("quiz-screen");
    renderQuestion();
  });
}

// ─── Renderizar pregunta ───────────────────────────────────────────────────────
function renderQuestion() {
  const q = state.questions[state.current];
  const total = state.questions.length;
  const idx = state.current;

  // Progreso
  const progressBar = document.getElementById("progress-bar");
  const progressText = document.getElementById("progress-text");
  const hatSay = document.getElementById("hat-say");
  const questionText = document.getElementById("question-text");
  const optionsList = document.getElementById("options-list");

  progressBar.style.width = `${((idx) / total) * 100}%`;
  progressText.textContent = `Pregunta ${idx + 1} de ${total}`;
  hatSay.textContent = idx === 0 ? "¡El sombrero está listo! Primera pregunta..." : HAT_TRANSITIONS[idx - 1] || "El sombrero delibera...";

  // Actualizar video lateral para usar el video de "proceso" en bucle
  const sideVideo = document.getElementById("quiz-side-video");
  if (!sideVideo.src.endsWith(VIDEOS.proceso)) {
    sideVideo.src = VIDEOS.proceso;
  }

  // Animación de entrada
  const card = document.getElementById("question-card");
  card.classList.remove("slide-in");
  void card.offsetWidth; // reflow
  card.classList.add("slide-in");

  questionText.textContent = q.text;

  // Opciones (shuffled)
  const shuffledOptions = shuffle(q.options);
  optionsList.innerHTML = "";
  shuffledOptions.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.id = `option-${i}`;
    btn.textContent = opt.text;
    btn.addEventListener("click", () => selectOption(opt, btn));
    optionsList.appendChild(btn);
  });
}

// ─── Seleccionar opción ────────────────────────────────────────────────────────
function selectOption(opt, btn) {
  // Deshabilitar todos
  document.querySelectorAll(".option-btn").forEach((b) => {
    b.disabled = true;
    b.classList.remove("selected");
  });
  btn.classList.add("selected");

  // Acumular pesos
  Object.entries(opt.weights).forEach(([career, weight]) => {
    state.scores[career] += weight;
  });
  state.selectedAnswers.push(opt.text);

  // Avanzar después de un pequeño delay
  setTimeout(() => {
    state.current++;
    if (state.current < state.questions.length) {
      renderQuestion();
    } else {
      // Última pregunta: reproducir transición antes del resultado
      const transicion = VIDEOS.transiciones[Math.floor(Math.random() * VIDEOS.transiciones.length)];
      playVideo(transicion, showResult, false);
    }
  }, 700);
}

// ─── Mostrar resultado ────────────────────────────────────────────────────────
function showResult() {
  const top = getTopCareers();
  const [firstKey, firstScore] = top[0];
  const [secondKey, secondScore] = top[1];

  const career = CAREERS[firstKey];
  const secondCareer = CAREERS[secondKey];

  // Guardar estadísticas
  saveStats(firstKey);

  // Rellenar resultado (antes de mostrar la pantalla)
  document.getElementById("result-emoji").textContent = career.emoji;
  document.getElementById("result-career-name").textContent = career.name;
  document.getElementById("result-tagline").textContent = career.tagline;
  document.getElementById("result-description").textContent = career.description(secondKey);
  document.getElementById("result-second").textContent =
    `✨ También tenés mucho de... ${secondCareer.emoji} ${secondCareer.name}`;
  document.getElementById("result-utn-fact").textContent = career.utnFact;
  document.getElementById("result-link").href = career.link;

  // Estandarte de la carrera (video que termina en imagen)
  const bannerVideo = document.getElementById("result-banner-video");
  const bannerImg = document.getElementById("result-banner-img");
  
  bannerVideo.src = career.banner;
  bannerVideo.style.display = "block";
  bannerImg.src = career.image;
  bannerImg.style.display = "none";
  
  bannerVideo.onended = () => {
    bannerVideo.style.display = "none";
    bannerImg.style.display = "block";
  };

  // Reproducir video de la carrera ganadora, luego mostrar la pantalla
  playVideo(VIDEOS.resultado[firstKey], () => {
    // Barra de scores
    renderScoreBar(top);
    // Color de acento dinámico
    document.getElementById("result-card").style.setProperty("--accent", career.color);
    // Lanzar confetti mágico
    launchParticles(career.color);
    showScreen("result-screen");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ─── Barra de puntajes ────────────────────────────────────────────────────────
function renderScoreBar(top) {
  const container = document.getElementById("score-bars");
  container.innerHTML = "";
  const maxScore = top[0][1] || 1;

  top.forEach(([key, score]) => {
    const career = CAREERS[key];
    const pct = Math.round((score / maxScore) * 100);
    const row = document.createElement("div");
    row.className = "score-row";
    row.innerHTML = `
      <span class="score-label">${career.emoji} ${career.name.split(" ").slice(-2).join(" ")}</span>
      <div class="score-track">
        <div class="score-fill" style="width: 0%; background: ${career.color}" data-pct="${pct}"></div>
      </div>
      <span class="score-num">${score}pts</span>
    `;
    container.appendChild(row);
  });

  // Animar barras
  setTimeout(() => {
    document.querySelectorAll(".score-fill").forEach((el) => {
      el.style.width = el.dataset.pct + "%";
    });
  }, 100);
}

// ─── Partículas mágicas ────────────────────────────────────────────────────────
function launchParticles(color) {
  const container = document.getElementById("particles");
  container.innerHTML = "";
  const symbols = ["⭐", "✨", "🌟", "💫", "⚡", "🔮"];
  for (let i = 0; i < 30; i++) {
    const p = document.createElement("span");
    p.className = "particle";
    p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    p.style.left = Math.random() * 100 + "vw";
    p.style.animationDelay = Math.random() * 2 + "s";
    p.style.fontSize = (Math.random() * 20 + 14) + "px";
    container.appendChild(p);
  }
  setTimeout(() => { container.innerHTML = ""; }, 4000);
}

// ─── Panel de estadísticas ─────────────────────────────────────────────────────
function showStats() {
  const stats = loadStats();
  const panel = document.getElementById("stats-panel");
  const total = stats.total || 0;

  panel.innerHTML = `
    <h3>📊 Estadísticas acumuladas (${total} partidas)</h3>
    <table class="stats-table">
      <thead><tr><th>Carrera</th><th>Resultados</th><th>%</th></tr></thead>
      <tbody>
        ${Object.keys(CAREERS).map((k) => `
          <tr>
            <td>${CAREERS[k].emoji} ${CAREERS[k].name}</td>
            <td>${stats[k] || 0}</td>
            <td>${total ? (((stats[k] || 0) / total) * 100).toFixed(1) + "%" : "0%"}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
    <button class="btn-secondary" id="btn-export-csv" onclick="exportCSV()">📥 Exportar CSV</button>
    <button class="btn-secondary" id="btn-close-stats" onclick="document.getElementById('stats-panel').classList.add('hidden')">✕ Cerrar</button>
  `;
  panel.classList.remove("hidden");
}

// ─── Event listeners ──────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-start").addEventListener("click", startGame);
  document.getElementById("btn-restart").addEventListener("click", () => {
    showScreen("intro-screen");
  });
  document.getElementById("btn-restart-quiz").addEventListener("click", startGame);
  document.getElementById("btn-stats").addEventListener("click", showStats);
});
