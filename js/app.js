// ===== LÓGICA PRINCIPAL DE LA APP =====
var filtro = "Todas", busq = "";
var quickFilter = "todas";
var ultimoElementoEnfocado = null;

// Normalización para búsquedas y comparaciones sin tildes ni mayúsculas
function norm(s) {
  return (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

// ===== TOAST (notificación discreta) =====
function toast(msg, tipo) {
  var t = document.getElementById("toast-jardin");
  if (!t) {
    t = document.createElement("div");
    t.id = "toast-jardin";
    t.style.cssText = "position:fixed;bottom:96px;left:50%;transform:translateX(-50%) translateY(20px);background:#14321e;border:1px solid rgba(74,222,128,0.4);border-radius:24px;padding:11px 20px;color:#86efac;font-family:Georgia,serif;font-size:13px;z-index:900;box-shadow:0 6px 20px rgba(0,0,0,0.4);opacity:0;transition:opacity .25s ease,transform .25s ease;pointer-events:none;max-width:90vw;text-align:center";
    document.body.appendChild(t);
  }
  if (tipo === "error") { t.style.borderColor = "rgba(248,113,113,0.5)"; t.style.color = "#fca5a5"; }
  else { t.style.borderColor = "rgba(74,222,128,0.4)"; t.style.color = "#86efac"; }
  t.textContent = msg;
  requestAnimationFrame(function () {
    t.style.opacity = "1";
    t.style.transform = "translateX(-50%) translateY(0)";
  });
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(function () {
    t.style.opacity = "0";
    t.style.transform = "translateX(-50%) translateY(20px)";
  }, 2600);
}

function init() {
  var ce = document.getElementById("CT");
  if (!ce) return;
  ce.innerHTML = "";
  CATS.forEach(function (c) {
    var b = document.createElement("button");
    b.className = "cat-btn" + (c === "Todas" ? " active" : "");
    b.textContent = c;
    b.onclick = function () {
      document.querySelectorAll(".cat-btn").forEach(function (x) { x.classList.remove("active"); });
      b.classList.add("active");
      filtro = c;
      render();
    };
    ce.appendChild(b);
  });
  render();
}

function filtrar() {
  busq = document.getElementById("SI").value;
  render();
}

function setQuickFilter(qf) {
  quickFilter = qf;
  document.querySelectorAll(".qf-btn").forEach(function (b) {
    if (b.getAttribute("data-qf") === qf) {
      b.classList.add("active");
    } else {
      b.classList.remove("active");
    }
  });
  render();
}

// Búsqueda jerárquica y ponderada
function calcularScoreBusqueda(p, nb) {
  if (!nb) return 1;
  var np = norm(p.n);
  var cp = norm(p.c);
  var dp = norm(p.desc);

  // 1. Coincidencia EXACTA en el nombre (siempre primera)
  if (np === nb) return 10000;

  // 2. Nombre empieza por el término buscado
  if (np.indexOf(nb) === 0) return 5000;

  // 3. Palabra exacta en el nombre
  var palabras = np.split(/[\s/-]+/);
  if (palabras.indexOf(nb) > -1) return 3500;

  // 4. Subcadena en el nombre
  var idxNom = np.indexOf(nb);
  if (idxNom > -1) return 2000 - idxNom;

  // 5. Coincidencia en la categoría
  if (cp === nb) return 800;
  if (cp.indexOf(nb) > -1) return 600;

  // 6. Coincidencia en la descripción principal como palabra o frase
  var idxDesc = dp.indexOf(nb);
  if (idxDesc > -1) {
    var reWord = new RegExp("(^|[^a-z0-9])" + nb + "([^a-z0-9]|$)", "i");
    if (reWord.test(dp)) return 300;
    return 150;
  }

  // No coincide en nombre, categoría ni descripción directa
  return 0;
}

function obtenerFavoritosSet() {
  var set = {};
  try {
    var loc = JSON.parse(localStorage.getItem("jardin_favs_local") || "[]");
    loc.forEach(function (f) { if (f && f.planta) set[norm(f.planta)] = true; });
  } catch (e) { }
  return set;
}

function obtenerPlantasMesSet() {
  var mes = new Date().getMonth() + 1;
  var set = {};
  if (typeof CAL !== "undefined") {
    CAL.forEach(function (item) {
      if ((item.s && item.s.indexOf(mes) > -1) || (item.c && item.c.indexOf(mes) > -1)) {
        set[norm(item.n)] = true;
      }
    });
  }
  return set;
}

function render() {
  var dc = { "Facil": "#4ade80", "Fácil": "#4ade80", "Moderado": "#facc15", "Dificil": "#f87171", "Difícil": "#f87171" };
  var nb = norm(busq);
  var favsSet = (quickFilter === "favs") ? obtenerFavoritosSet() : null;
  var mesSet = (quickFilter === "mes") ? obtenerPlantasMesSet() : null;

  var candidatos = [];
  for (var i = 0; i < P.length; i++) {
    var p = P[i];

    // Filtro de categoría
    var coincideCat = (filtro === "Todas" || norm(p.c) === norm(filtro));
    if (!coincideCat) continue;

    // Filtros rápidos
    if (quickFilter === "faciles") {
      var dNorm = norm(p.d);
      if (dNorm !== "facil") continue;
    } else if (quickFilter === "mes") {
      if (!mesSet[norm(p.n)]) continue;
    } else if (quickFilter === "favs") {
      if (!favsSet[norm(p.n)]) continue;
    }

    // Puntuación de búsqueda
    var score = calcularScoreBusqueda(p, nb);
    if (score > 0) {
      candidatos.push({ planta: p, score: score, index: i });
    }
  }

  // Ordenación: si hay búsqueda, ordenar por puntuación descendente
  if (nb) {
    candidatos.sort(function (a, b) {
      if (b.score !== a.score) return b.score - a.score;
      return a.index - b.index;
    });
  }

  var lista = candidatos.map(function (c) { return c.planta; });

  var countEl = document.getElementById("CN");
  if (countEl) {
    if (lista.length === 0) {
      countEl.textContent = "No se han encontrado plantas";
    } else if (lista.length === 1) {
      countEl.textContent = "1 planta encontrada";
    } else {
      countEl.textContent = lista.length + " plantas encontradas";
    }
  }

  var gridEl = document.getElementById("GR");
  if (!gridEl) return;

  if (lista.length === 0) {
    gridEl.innerHTML = "<div style='grid-column:1/-1;text-align:center;padding:40px 16px;color:#6b9c6b;font-style:italic'>No hay plantas que coincidan con la selección actual.</div>";
    return;
  }

  gridEl.innerHTML = lista.map(function (p) {
    var col = dc[p.d] || "#888";
    var safeName = p.n.replace(/'/g, "\\'");
    var btnId = "btn-planta-" + norm(p.n).replace(/[^a-z0-9]/g, "-");
    return '<button type="button" class="plant-card" id="' + btnId + '" onclick="abrir(\'' + safeName + '\')" aria-label="' + p.n + ' (' + p.c + ', dificultad ' + p.d + ')">'
      + '<span class="emoji" aria-hidden="true">' + p.e + '</span>'
      + '<span class="name">' + p.n + '</span>'
      + '<span class="cat-label">' + p.c + '</span>'
      + '<span class="dif badge" style="background:' + col + '22;color:' + col + ';border:1px solid ' + col + '44">' + p.d + '</span>'
      + '</button>';
  }).join("");
}

function abrir(nombre) {
  ultimoElementoEnfocado = document.activeElement;
  var p = null;
  for (var i = 0; i < P.length; i++) {
    if (P[i].n === nombre || norm(P[i].n) === norm(nombre)) {
      p = P[i];
      break;
    }
  }
  if (!p) return;

  var dc = { "Facil": "#4ade80", "Fácil": "#4ade80", "Moderado": "#facc15", "Dificil": "#f87171", "Difícil": "#f87171" };
  var col = dc[p.d] || "#888";
  var datos = [
    { icon: "📏", label: "Profundidad", val: p.dat.p },
    { icon: "↔️", label: "Espaciado", val: p.dat.s },
    { icon: "💧", label: "Riego", val: p.dat.r },
    { icon: "☀️", label: "Sol", val: p.dat.sol },
    { icon: "⏰", label: "Cosecha/Floración", val: p.dat.co }
  ].filter(function (d) { return d.val; });

  var html = "";
  html += '<div class="modal-header">';
  html += '<span class="modal-emoji" aria-hidden="true">' + p.e + '</span>';
  html += '<div><h2 class="modal-name" id="modal-plant-name">' + p.n + '</h2>';
  html += '<span class="badge" style="background:' + col + '22;border:1px solid ' + col + '44;color:' + col + '">' + p.d + '</span>';
  html += ' <span style="color:#6b9c6b;font-size:11px">' + p.c + '</span>';
  var dias = (typeof diasSinRegar === "function") ? diasSinRegar(p.n) : null;
  var regarTxt = dias === null ? "💧 Regar hoy" : (dias === 0 ? "💧 Regada hoy ✓" : "💧 Regar hoy");
  html += '</div><div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap">';
  html += '<button type="button" id="btn-fav-modal" onclick="toggleFavModal()" style="background:none;border:1px solid rgba(251,191,36,0.35);border-radius:20px;padding:6px 14px;color:#fbbf24;font-size:12px;cursor:pointer">⭐ Añadir a favoritos</button>';
  html += '<button type="button" id="btn-regar-modal" onclick="regarModal()" style="background:none;border:1px solid rgba(96,165,250,0.35);border-radius:20px;padding:6px 14px;color:#60a5fa;font-size:12px;cursor:pointer">' + regarTxt + '</button>';
  html += '</div></div>';
  html += '<p class="modal-desc">' + p.desc + '</p>';

  if (p.po) {
    html += '<div class="epoca-box" style="background:rgba(251,191,36,0.1);border-color:rgba(251,191,36,0.4);margin-bottom:10px">';
    html += '<span style="font-size:22px;flex-shrink:0" aria-hidden="true">✂️</span>';
    html += '<div><div class="epoca-title" style="color:#fbbf24">Poda — cuándo y cómo</div>';
    html += '<div style="color:#fbbf24;font-size:11px;font-weight:bold;margin-bottom:4px">' + p.po.cu + '</div>';
    html += '<div class="epoca-text">' + p.po.co + '</div></div></div>';
  }

  html += '<div class="epoca-box"><span style="font-size:22px;flex-shrink:0" aria-hidden="true">🗓️</span>';
  html += '<div><div class="epoca-title">Cuándo plantar en ' + ciudadUsuario + '</div>';
  html += '<div class="epoca-text">' + p.ep + '</div></div></div>';

  html += '<div class="datos-grid">';
  datos.forEach(function (d) {
    html += '<div class="dato"><div class="dato-icon" aria-hidden="true">' + d.icon + '</div>';
    html += '<div class="dato-label">' + d.label + '</div>';
    html += '<div class="dato-val">' + d.val + '</div></div>';
  });
  html += '</div>';

  if (p.pa && p.pa.length > 0) {
    html += '<div class="pasos-title">Pasos para plantar</div>';
    p.pa.forEach(function (paso, i) {
      html += '<div class="paso" onclick="this.classList.toggle(\'active\');var a=this.querySelector(\'.paso-arr\');if(a)a.textContent=this.classList.contains(\'active\')?\'▲\':\'▼\'">';
      html += '<div class="paso-header">';
      html += '<span class="paso-num">' + (i + 1) + '</span>';
      html += '<span class="paso-tit">' + paso.t + '</span>';
      html += '<span class="paso-arr" aria-hidden="true">▼</span></div>';
      html += '<p class="paso-desc">' + paso.d + '</p></div>';
    });
  }

  html += '<div class="tips-grid">';
  if (p.co && p.co.length > 0) {
    html += '<div class="tips green"><h4>💡 Consejos</h4><ul>';
    p.co.forEach(function (c) { html += '<li>' + c + '</li>'; });
    html += '</ul></div>';
  }
  if (p.er && p.er.length > 0) {
    html += '<div class="tips red"><h4>⚠️ Errores a evitar</h4><ul>';
    p.er.forEach(function (e) { html += '<li>' + e + '</li>'; });
    html += '</ul></div>';
  }
  html += '</div>';

  if (p.enf && p.enf.length > 0) {
    html += '<div style="margin-top:16px">';
    html += '<div style="color:#f87171;font-size:15px;font-weight:bold;margin-bottom:10px">🦠 Plagas y enfermedades</div>';
    p.enf.forEach(function (en) {
      html += '<div style="background:rgba(248,113,113,0.06);border:1px solid rgba(248,113,113,0.2);border-radius:12px;padding:12px 14px;margin-bottom:8px">';
      html += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">';
      html += '<span style="font-size:18px" aria-hidden="true">' + en.e + '</span>';
      html += '<span style="color:#fca5a5;font-size:13px;font-weight:bold">' + en.n + '</span></div>';
      html += '<div style="margin-bottom:5px"><span style="color:#f87171;font-size:10px;text-transform:uppercase;letter-spacing:1px">Síntomas: </span>';
      html += '<span style="color:#fecaca;font-size:12px;line-height:1.5">' + en.s + '</span></div>';
      html += '<div><span style="color:#4ade80;font-size:10px;text-transform:uppercase;letter-spacing:1px">Tratamiento: </span>';
      html += '<span style="color:#a3c4a3;font-size:12px;line-height:1.5">' + en.c + '</span></div></div>';
    });
    html += '</div>';
  }

  html += '<button type="button" class="btn-cerrar" onclick="cerrar()">✕ Cerrar ficha</button>';

  var ov = document.getElementById("OV");
  var md = document.getElementById("MD");
  if (!ov || !md) return;

  md.innerHTML = html;
  ov.classList.add("open");
  ov.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  actualizarBtnFav(p.n);

  setTimeout(function () {
    var closeBtn = md.querySelector(".btn-cerrar");
    if (closeBtn) closeBtn.focus();
    else md.focus();
  }, 50);
}

// Marca el estado real del botón de favoritos (con cuenta o local)
async function actualizarBtnFav(nombre) {
  var btn = document.getElementById("btn-fav-modal");
  if (!btn) return;
  if (typeof currentUser !== "undefined" && currentUser) {
    try {
      var mine = await fsGetMine("favoritos");
      var esFav = mine.some(function (f) { return norm(f.planta) === norm(nombre); });
      pintarBtnFav(btn, esFav);
      return;
    } catch (e) { }
  }
  // Almacenamiento local si no hay cuenta
  try {
    var loc = JSON.parse(localStorage.getItem("jardin_favs_local") || "[]");
    var esFavLocal = loc.some(function (f) { return norm(f.planta) === norm(nombre); });
    pintarBtnFav(btn, esFavLocal);
  } catch (e) {
    pintarBtnFav(btn, false);
  }
}

function pintarBtnFav(btn, esFav) {
  if (!btn) return;
  if (esFav) {
    btn.textContent = "⭐ En favoritos";
    btn.style.background = "rgba(251,191,36,0.18)";
    btn.style.borderColor = "rgba(251,191,36,0.6)";
  } else {
    btn.textContent = "⭐ Añadir a favoritos";
    btn.style.background = "none";
    btn.style.borderColor = "rgba(251,191,36,0.35)";
  }
}

// Marca la planta abierta como regada hoy
function regarModal() {
  var nm = document.getElementById("modal-plant-name") || document.querySelector(".modal-name");
  if (!nm) return;
  var nombre = nm.textContent.trim();
  guardarRiego(nombre);
  var btn = document.getElementById("btn-regar-modal");
  if (btn) {
    btn.textContent = "💧 Regada hoy ✓";
    btn.style.background = "rgba(96,165,250,0.18)";
    btn.style.borderColor = "rgba(96,165,250,0.6)";
  }
  toast("💧 Riego registrado para " + nombre);
}

function cerrar(e) {
  if (!e || e.target === document.getElementById("OV") || !e.target) {
    var ov = document.getElementById("OV");
    if (ov) {
      ov.classList.remove("open");
      ov.setAttribute("aria-hidden", "true");
    }
    document.body.style.overflow = "";
    if (ultimoElementoEnfocado && typeof ultimoElementoEnfocado.focus === "function") {
      try { ultimoElementoEnfocado.focus(); } catch (err) { }
    }
  }
}

async function toggleFavModal() {
  var nm = document.getElementById("modal-plant-name") || document.querySelector(".modal-name");
  if (!nm) return;
  var nombre = nm.textContent.trim();
  var p = P.find(function (x) { return x.n === nombre || norm(x.n) === norm(nombre); });
  if (!p) return;
  var btn = document.getElementById("btn-fav-modal");
  var añadido = await toggleFav(p.n, p.e, true);
  pintarBtnFav(btn, añadido);
  toast(añadido ? "⭐ Añadida a favoritos" : "Quitada de favoritos");
  if (quickFilter === "favs") {
    render();
  }
}

// ===== CIUDAD / UBICACIÓN =====
var ciudadUsuario = "Burgos";
var ciudadLat = 42.34;
var ciudadLon = -3.70;

var ciudadesCoords = {
  "burgos": { lat: 42.34, lon: -3.70 }, "madrid": { lat: 40.42, lon: -3.70 },
  "barcelona": { lat: 41.38, lon: 2.17 }, "valencia": { lat: 39.47, lon: -0.38 },
  "sevilla": { lat: 37.39, lon: -5.99 }, "tarragona": { lat: 41.12, lon: 1.24 },
  "zaragoza": { lat: 41.65, lon: -0.87 }, "bilbao": { lat: 43.26, lon: -2.93 },
  "malaga": { lat: 36.72, lon: -4.42 }, "alicante": { lat: 38.35, lon: -0.48 },
  "murcia": { lat: 37.98, lon: -1.13 }, "granada": { lat: 37.18, lon: -3.60 },
  "cordoba": { lat: 37.89, lon: -4.78 }, "valladolid": { lat: 41.65, lon: -4.72 },
  "salamanca": { lat: 40.97, lon: -5.66 }, "palencia": { lat: 42.01, lon: -4.53 },
  "santander": { lat: 43.46, lon: -3.81 }, "logrono": { lat: 42.47, lon: -2.44 },
  "pamplona": { lat: 42.82, lon: -1.64 }, "san sebastian": { lat: 43.32, lon: -1.98 },
  "vitoria": { lat: 42.85, lon: -2.67 }, "oviedo": { lat: 43.36, lon: -5.85 },
  "gijon": { lat: 43.54, lon: -5.66 }, "vigo": { lat: 42.23, lon: -8.71 },
  "coruna": { lat: 43.37, lon: -8.40 }, "pontevedra": { lat: 42.43, lon: -8.64 },
  "lugo": { lat: 43.01, lon: -7.55 }, "ourense": { lat: 42.34, lon: -7.86 },
  "lleida": { lat: 41.61, lon: 0.62 }, "girona": { lat: 41.98, lon: 2.82 },
  "toledo": { lat: 39.86, lon: -4.03 }, "albacete": { lat: 38.99, lon: -1.86 },
  "cuenca": { lat: 40.07, lon: -2.13 }, "guadalajara": { lat: 40.63, lon: -3.17 },
  "ciudad real": { lat: 38.99, lon: -3.92 }, "badajoz": { lat: 38.88, lon: -6.97 },
  "caceres": { lat: 39.47, lon: -6.37 }, "merida": { lat: 38.92, lon: -6.34 },
  "huelva": { lat: 37.26, lon: -6.95 }, "jaen": { lat: 37.77, lon: -3.79 },
  "almeria": { lat: 36.84, lon: -2.46 }, "cadiz": { lat: 36.53, lon: -6.30 },
  "castellon": { lat: 39.99, lon: -0.05 }, "palma": { lat: 39.57, lon: 2.65 },
  "ibiza": { lat: 38.91, lon: 1.43 }, "menorca": { lat: 39.95, lon: 3.83 },
  "tenerife": { lat: 28.29, lon: -16.62 }, "las palmas": { lat: 28.12, lon: -15.43 },
  "ceuta": { lat: 35.89, lon: -5.32 }, "melilla": { lat: 35.29, lon: -2.94 }
};

function elegirCiudad(btn) {
  document.getElementById("ciudad-input").value = btn.textContent;
}

function confirmarCiudad() {
  var ciudad = document.getElementById("ciudad-input").value.trim();
  if (!ciudad) { ciudad = "Burgos"; }
  guardarCiudad(ciudad);
}

function saltarCiudad() {
  guardarCiudad("Burgos");
}

function guardarCiudad(ciudad) {
  ciudadUsuario = ciudad;
  var clave = norm(ciudad);
  var coords = ciudadesCoords[clave];
  if (coords) {
    ciudadLat = coords.lat;
    ciudadLon = coords.lon;
  } else {
    buscarCoordsCiudad(ciudad);
  }
  localStorage.setItem("jardin_ciudad", ciudad);
  localStorage.setItem("jardin_lat", ciudadLat);
  localStorage.setItem("jardin_lon", ciudadLon);
  actualizarCiudadUI();
  document.getElementById("bienvenida-overlay").style.display = "none";
}

async function buscarCoordsCiudad(ciudad) {
  try {
    var r = await fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + encodeURIComponent(ciudad) + "&count=1&language=es&format=json");
    var d = await r.json();
    if (d.results && d.results.length > 0) {
      ciudadLat = d.results[0].latitude;
      ciudadLon = d.results[0].longitude;
      localStorage.setItem("jardin_lat", ciudadLat);
      localStorage.setItem("jardin_lon", ciudadLon);
    }
  } catch (e) { }
}

function actualizarCiudadUI() {
  var badge = document.getElementById("ciudad-badge");
  if (badge) badge.textContent = "📍 " + ciudadUsuario;
  var header = document.getElementById("ciudad-header");
  if (header) header.textContent = "Adaptada a " + ciudadUsuario;
}

function cargarCiudadGuardada() {
  var ciudad = localStorage.getItem("jardin_ciudad");
  var lat = localStorage.getItem("jardin_lat");
  var lon = localStorage.getItem("jardin_lon");
  if (ciudad) {
    ciudadUsuario = ciudad;
    if (lat) ciudadLat = parseFloat(lat);
    if (lon) ciudadLon = parseFloat(lon);
    actualizarCiudadUI();
    document.getElementById("bienvenida-overlay").style.display = "none";
  }
}

function cambiarCiudad() {
  document.getElementById("ciudad-input").value = ciudadUsuario;
  document.getElementById("bienvenida-overlay").style.display = "flex";
}

// ===== ALERTAS DE COSECHA/SIEMBRA Y TAREAS DEL MES =====
var TAREAS_MES = [
  "Protege plantas sensibles del frío intenso y planifica los semilleros.", // Enero
  "Inicia semilleros protegidos (pimientos, tomates) y realiza podas de invierno.", // Febrero
  "Prepara la tierra con compost, siembra guisantes, espinacas y zanahorias.", // Marzo
  "Siembra lechugas y acelgas, vigila las heladas tardías y siembra patatas.", // Abril
  "Trasplanta tomates, pimientos y calabacines al exterior tras las últimas heladas.", // Mayo
  "Entutora tomates, acolcha el suelo para retener humedad y vigila el riego.", // Junio
  "Riega al atardecer o temprano, cosecha con frecuencia para estimular frutos.", // Julio
  "Mantén el riego constante para evitar estrés hídrico y siembra hortalizas de otoño.", // Agosto
  "Cosecha hortalizas y frutales maduros; reduce riegos y siembra verduras de invierno.", // Septiembre
  "Planta ajos y bulbos de primavera (tulipanes, narcisos); recoge hojas para compost.", // Octubre
  "Limpia bancales, protege raíces con acolchado (mulch) y planta árboles en reposo.", // Noviembre
  "Poda árboles de hoja caduca en reposo invernal y revisa protecciones contra heladas." // Diciembre
];

function mostrarAlertas() {
  var el = document.getElementById("alertas-cosecha");
  if (!el) return;
  var mes = new Date().getMonth() + 1;
  var cosechar = (typeof CAL !== "undefined") ? CAL.filter(function (p) { return p.c && p.c.indexOf(mes) > -1; }) : [];
  var sembrar = (typeof CAL !== "undefined") ? CAL.filter(function (p) { return p.s && p.s.indexOf(mes) > -1; }) : [];
  var tareaMes = TAREAS_MES[mes - 1] || "Cuida y mantén la humedad adecuada en el jardín.";

  el.innerHTML = "";
  var wrap = document.createElement("div");
  wrap.style.cssText = "background:rgba(15,26,15,0.95);border:1px solid rgba(134,239,172,0.22);border-radius:14px;padding:14px 16px;box-shadow:0 4px 16px rgba(0,0,0,0.3)";

  var html = "<div style='display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:6px;margin-bottom:10px'>"
    + "<div style='font-size:13px;color:#86efac;font-weight:bold'>📅 " + MESES[mes - 1] + " en " + ciudadUsuario + "</div>"
    + "<div style='font-size:11px;color:#6b9c6b;font-style:italic'>Sugerencias de temporada</div>"
    + "</div>";

  // Tarea recomendada del mes
  html += "<div style='background:rgba(74,222,128,0.06);border:1px solid rgba(74,222,128,0.18);border-radius:10px;padding:8px 12px;margin-bottom:12px;display:flex;align-items:center;gap:8px'>"
    + "<span style='font-size:18px;flex-shrink:0' aria-hidden='true'>💡</span>"
    + "<div style='font-size:12px;color:#c8e6c9;line-height:1.4'><strong style='color:#86efac'>Tarea recomendada:</strong> " + tareaMes + "</div>"
    + "</div>";

  wrap.innerHTML = html;

  var inner = document.createElement("div");
  inner.style.cssText = "display:flex;flex-wrap:wrap;gap:12px";

  if (cosechar.length > 0) {
    var dc = document.createElement("div");
    dc.style.cssText = "flex:1;min-width:140px";
    dc.innerHTML = "<div style='color:#fbbf24;font-size:10px;text-transform:uppercase;letter-spacing:1px;font-weight:bold;margin-bottom:6px'>🍅 Cosechar ahora (" + cosechar.length + ")</div>";
    var tags = document.createElement("div");
    tags.style.cssText = "display:flex;flex-wrap:wrap;gap:5px";
    cosechar.slice(0, 8).forEach(function (p) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "alerta-tag";
      btn.style.cssText = "background:rgba(251,191,36,0.12);border:1px solid rgba(251,191,36,0.3);border-radius:20px;padding:4px 11px;color:#fde68a;font-size:11.5px";
      btn.textContent = p.e + " " + p.n;
      btn.setAttribute("aria-label", "Ver ficha de " + p.n + " para cosecha");
      btn.onclick = function () { abrir(p.n); };
      tags.appendChild(btn);
    });
    dc.appendChild(tags);
    inner.appendChild(dc);
  }

  if (sembrar.length > 0) {
    var ds = document.createElement("div");
    ds.style.cssText = "flex:1;min-width:140px";
    ds.innerHTML = "<div style='color:#4ade80;font-size:10px;text-transform:uppercase;letter-spacing:1px;font-weight:bold;margin-bottom:6px'>🌱 Sembrar ahora (" + sembrar.length + ")</div>";
    var tags2 = document.createElement("div");
    tags2.style.cssText = "display:flex;flex-wrap:wrap;gap:5px";
    sembrar.slice(0, 8).forEach(function (p) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "alerta-tag";
      btn.style.cssText = "background:rgba(74,222,128,0.1);border:1px solid rgba(74,222,128,0.25);border-radius:20px;padding:4px 11px;color:#86efac;font-size:11.5px";
      btn.textContent = p.e + " " + p.n;
      btn.setAttribute("aria-label", "Ver ficha de " + p.n + " para siembra");
      btn.onclick = function () { abrir(p.n); };
      tags2.appendChild(btn);
    });
    ds.appendChild(tags2);
    inner.appendChild(ds);
  }

  wrap.appendChild(inner);
  el.appendChild(wrap);
  el.style.display = "block";
}

// ===== INICIALIZACIÓN PRINCIPAL =====
document.addEventListener("DOMContentLoaded", function () {
  var siEl = document.getElementById("SI");
  if (siEl) siEl.value = "";

  if (typeof plantasExtra !== "undefined") {
    plantasExtra.forEach(function (p) { P.push(p); });
  }
  if (typeof plantasArboles !== "undefined") {
    plantasArboles.forEach(function (p) { P.push(p); });
  }
  if (typeof plantasHuerto !== "undefined") {
    plantasHuerto.forEach(function (p) { P.push(p); });
  }
  if (typeof plantasVarias !== "undefined") {
    plantasVarias.forEach(function (p) { P.push(p); });
  }

  // Recalcular categorías con las nuevas plantas
  P.forEach(function (p) {
    var yaExiste = CATS.some(function (c) { return norm(c) === norm(p.c); });
    if (!yaExiste) CATS.push(p.c);
  });

  init();
  cargarCiudadGuardada();
  mostrarAlertas();

  // Botón panel principal
  var btnMain = document.getElementById("btn-panel-main");
  if (btnMain) {
    btnMain.addEventListener("click", function () {
      var pl = document.getElementById("PL");
      var po = document.getElementById("PO");
      if (pl && po) {
        pl.style.right = "0";
        po.style.display = "block";
        document.body.style.overflow = "hidden";
        poblarSelects();
        cargarDiario();
        var fecha = document.getElementById("df-fecha");
        if (fecha) fecha.value = new Date().toISOString().split("T")[0];
      }
    });
  }

  // Botones de ciudad
  document.querySelectorAll(".btn-ciudad").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var ci = document.getElementById("ciudad-input");
      if (ci) ci.value = btn.getAttribute("data-ciudad");
    });
  });

  // Botón entrar al jardín
  var btnEntrar = document.getElementById("btn-entrar-jardin");
  if (btnEntrar) {
    btnEntrar.addEventListener("click", function () {
      var ci = document.getElementById("ciudad-input");
      var ciudad = ci ? ci.value.trim() : "Burgos";
      if (!ciudad) ciudad = "Burgos";
      guardarCiudad(ciudad);
    });
  }

  // Botón saltar ciudad
  var btnSaltar = document.getElementById("btn-saltar-ciudad");
  if (btnSaltar) {
    btnSaltar.addEventListener("click", function () {
      guardarCiudad("Burgos");
    });
  }

  // Enter en campo ciudad
  var ci = document.getElementById("ciudad-input");
  if (ci) ci.addEventListener("keydown", function (e) { if (e.key === "Enter") confirmarCiudad(); });

  // Auth: enter en campos
  ["auth-email", "auth-pass"].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener("keydown", function (e) { if (e.key === "Enter") doAuth(); });
  });

  if (typeof checkSession === "function") checkSession();
  if (typeof instalarPWA === "function") instalarPWA();
  setTimeout(poblarSelects, 500);
  setTimeout(mostrarRecordatoriosRiego, 1000);

  // Cerrar modal / panel con la tecla Escape
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    var ov = document.getElementById("OV");
    var pl = document.getElementById("PL");
    if (ov && ov.classList.contains("open")) { cerrar(); return; }
    if (pl && pl.style.right === "0px") { cerrarPanel(); return; }
  });
});

