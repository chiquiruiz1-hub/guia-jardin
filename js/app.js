// ===== LÓGICA PRINCIPAL DE LA APP =====
var filtro = "Todas", busq = "";

function init() {
  var ce = document.getElementById("CT");
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

function render() {
  var dc = { "Facil": "#4ade80", "Moderado": "#facc15", "Dificil": "#f87171" };
  var lista = P.filter(function (p) {
    var mc = filtro === "Todas" || p.c === filtro;
    function norm(s) { return (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }
    var nb = norm(busq);
    if (!busq) { return mc; }
    var enNombre = norm(p.n).indexOf(nb) > -1;
    var enCat = norm(p.c).indexOf(nb) > -1;
    var enDesc = norm(p.desc).indexOf(nb) > -1;
    var enEnf = false;
    if (p.enf) { p.enf.forEach(function (e) { if (norm(e.n).indexOf(nb) > -1 || norm(e.s).indexOf(nb) > -1 || norm(e.c).indexOf(nb) > -1) enEnf = true; }); }
    var enPasos = false;
    if (p.pa) { p.pa.forEach(function (paso) { if (norm(paso.t).indexOf(nb) > -1 || norm(paso.d).indexOf(nb) > -1) enPasos = true; }); }
    var mb = enNombre || enCat || enDesc || enEnf || enPasos;
    return mc && mb;
  });
  document.getElementById("CN").textContent = lista.length + " plantas encontradas";
  document.getElementById("GR").innerHTML = lista.map(function (p) {
    var col = dc[p.d] || "#888";
    return '<div class="plant-card" onclick="abrir(\'' + p.n.replace(/'/g, "\\'") + '\')">'
      + '<div class="emoji">' + p.e + '</div>'
      + '<div class="name">' + p.n + '</div>'
      + '<div class="cat-label">' + p.c + '</div>'
      + '<span class="dif badge" style="background:' + col + '22;color:' + col + ';border:1px solid ' + col + '44">' + p.d + '</span>'
      + '</div>';
  }).join("");
}

function abrir(nombre) {
  var p = null;
  for (var i = 0; i < P.length; i++) { if (P[i].n === nombre) { p = P[i]; break; } }
  if (!p) return;
  var dc = { "Facil": "#4ade80", "Moderado": "#facc15", "Dificil": "#f87171" };
  var col = dc[p.d] || "#888";
  var datos = [
    { icon: "📏", label: "Profundidad", val: p.dat.p },
    { icon: "↔️", label: "Espaciado", val: p.dat.s },
    { icon: "💧", label: "Riego", val: p.dat.r },
    { icon: "☀️", label: "Sol", val: p.dat.sol },
    { icon: "⏰", label: "Cosecha/Floracion", val: p.dat.co }
  ].filter(function (d) { return d.val; });

  var html = "";
  html += '<div class="modal-header">';
  html += '<span class="modal-emoji">' + p.e + '</span>';
  html += '<div><div class="modal-name">' + p.n + '</div>';
  html += '<span class="badge" style="background:' + col + '22;border:1px solid ' + col + '44;color:' + col + '">' + p.d + '</span>';
  html += ' <span style="color:#4a6b4a;font-size:11px">' + p.c + '</span>';
  html += '</div><div style="margin-top:8px"><button id="btn-fav-modal" onclick="toggleFavModal()" style="background:none;border:1px solid rgba(251,191,36,0.35);border-radius:20px;padding:5px 14px;color:#fbbf24;font-size:12px;cursor:pointer">⭐ Añadir a favoritos</button></div></div>';
  html += '<p class="modal-desc">' + p.desc + '</p>';

  if (p.po) {
    html += '<div class="epoca-box" style="background:rgba(251,191,36,0.1);border-color:rgba(251,191,36,0.4);margin-bottom:10px">';
    html += '<span style="font-size:22px;flex-shrink:0">✂️</span>';
    html += '<div><div class="epoca-title" style="color:#fbbf24">Poda - cuando y como</div>';
    html += '<div style="color:#fbbf24;font-size:11px;font-weight:bold;margin-bottom:4px">' + p.po.cu + '</div>';
    html += '<div class="epoca-text">' + p.po.co + '</div></div></div>';
  }

  html += '<div class="epoca-box"><span style="font-size:22px;flex-shrink:0">🗓️</span>';
  html += '<div><div class="epoca-title">Cuando plantar en ' + ciudadUsuario + '</div>';
  html += '<div class="epoca-text">' + p.ep + '</div></div></div>';

  html += '<div class="datos-grid">';
  datos.forEach(function (d) {
    html += '<div class="dato"><div class="dato-icon">' + d.icon + '</div>';
    html += '<div class="dato-label">' + d.label + '</div>';
    html += '<div class="dato-val">' + d.val + '</div></div>';
  });
  html += '</div>';

  html += '<div class="pasos-title">Pasos para plantar</div>';
  p.pa.forEach(function (paso, i) {
    html += '<div class="paso" onclick="this.classList.toggle(\'active\');this.querySelector(\'.paso-arr\').textContent=this.classList.contains(\'active\')?\'▲\':\'▼\'">';
    html += '<div class="paso-header">';
    html += '<span class="paso-num">' + (i + 1) + '</span>';
    html += '<span class="paso-tit">' + paso.t + '</span>';
    html += '<span class="paso-arr">▼</span></div>';
    html += '<p class="paso-desc">' + paso.d + '</p></div>';
  });

  html += '<div class="tips-grid">';
  html += '<div class="tips green"><h4>💡 Consejos</h4><ul>';
  p.co.forEach(function (c) { html += '<li>' + c + '</li>'; });
  html += '</ul></div>';
  html += '<div class="tips red"><h4>⚠️ Errores a evitar</h4><ul>';
  p.er.forEach(function (e) { html += '<li>' + e + '</li>'; });
  html += '</ul></div></div>';

  if (p.enf && p.enf.length > 0) {
    html += '<div style="margin-top:16px">';
    html += '<div style="color:#f87171;font-size:15px;font-weight:bold;margin-bottom:10px">🦠 Plagas y enfermedades</div>';
    p.enf.forEach(function (en) {
      html += '<div style="background:rgba(248,113,113,0.06);border:1px solid rgba(248,113,113,0.2);border-radius:12px;padding:12px 14px;margin-bottom:8px">';
      html += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">';
      html += '<span style="font-size:18px">' + en.e + '</span>';
      html += '<span style="color:#fca5a5;font-size:13px;font-weight:bold">' + en.n + '</span></div>';
      html += '<div style="margin-bottom:5px"><span style="color:#f87171;font-size:10px;text-transform:uppercase;letter-spacing:1px">Síntomas: </span>';
      html += '<span style="color:#fecaca;font-size:12px;line-height:1.5">' + en.s + '</span></div>';
      html += '<div><span style="color:#4ade80;font-size:10px;text-transform:uppercase;letter-spacing:1px">Tratamiento: </span>';
      html += '<span style="color:#a3c4a3;font-size:12px;line-height:1.5">' + en.c + '</span></div></div>';
    });
    html += '</div>';
  }

  html += '<button class="btn-cerrar" onclick="cerrar()">✕ Cerrar</button>';
  document.getElementById("MD").innerHTML = html;
  document.getElementById("OV").classList.add("open");
  document.body.style.overflow = "hidden";
}

function cerrar(e) {
  if (!e || e.target === document.getElementById("OV")) {
    document.getElementById("OV").classList.remove("open");
    document.body.style.overflow = "";
  }
}

function toggleFavModal() {
  var nombre = document.querySelector(".modal-name").textContent;
  var p = P.find(function (x) { return x.n === nombre; });
  if (p) toggleFav(p.n, p.e);
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
  "málaga": { lat: 36.72, lon: -4.42 }, "malaga": { lat: 36.72, lon: -4.42 },
  "alicante": { lat: 38.35, lon: -0.48 }, "murcia": { lat: 37.98, lon: -1.13 },
  "granada": { lat: 37.18, lon: -3.60 }, "córdoba": { lat: 37.89, lon: -4.78 },
  "cordoba": { lat: 37.89, lon: -4.78 }, "valladolid": { lat: 41.65, lon: -4.72 },
  "salamanca": { lat: 40.97, lon: -5.66 }, "palencia": { lat: 42.01, lon: -4.53 },
  "santander": { lat: 43.46, lon: -3.81 }, "logroño": { lat: 42.47, lon: -2.44 },
  "logrono": { lat: 42.47, lon: -2.44 }, "pamplona": { lat: 42.82, lon: -1.64 },
  "san sebastián": { lat: 43.32, lon: -1.98 }, "san sebastian": { lat: 43.32, lon: -1.98 },
  "vitoria": { lat: 42.85, lon: -2.67 }, "oviedo": { lat: 43.36, lon: -5.85 },
  "gijón": { lat: 43.54, lon: -5.66 }, "gijon": { lat: 43.54, lon: -5.66 },
  "vigo": { lat: 42.23, lon: -8.71 }, "coruña": { lat: 43.37, lon: -8.40 },
  "pontevedra": { lat: 42.43, lon: -8.64 }, "lugo": { lat: 43.01, lon: -7.55 },
  "ourense": { lat: 42.34, lon: -7.86 }, "lleida": { lat: 41.61, lon: 0.62 },
  "girona": { lat: 41.98, lon: 2.82 }, "toledo": { lat: 39.86, lon: -4.03 },
  "albacete": { lat: 38.99, lon: -1.86 }, "cuenca": { lat: 40.07, lon: -2.13 },
  "guadalajara": { lat: 40.63, lon: -3.17 }, "ciudad real": { lat: 38.99, lon: -3.92 },
  "badajoz": { lat: 38.88, lon: -6.97 }, "cáceres": { lat: 39.47, lon: -6.37 },
  "caceres": { lat: 39.47, lon: -6.37 }, "mérida": { lat: 38.92, lon: -6.34 },
  "merida": { lat: 38.92, lon: -6.34 }, "huelva": { lat: 37.26, lon: -6.95 },
  "jaén": { lat: 37.77, lon: -3.79 }, "jaen": { lat: 37.77, lon: -3.79 },
  "almería": { lat: 36.84, lon: -2.46 }, "almeria": { lat: 36.84, lon: -2.46 },
  "cádiz": { lat: 36.53, lon: -6.30 }, "cadiz": { lat: 36.53, lon: -6.30 },
  "castellón": { lat: 39.99, lon: -0.05 }, "castellon": { lat: 39.99, lon: -0.05 },
  "palma": { lat: 39.57, lon: 2.65 }, "ibiza": { lat: 38.91, lon: 1.43 },
  "menorca": { lat: 39.95, lon: 3.83 }, "tenerife": { lat: 28.29, lon: -16.62 },
  "las palmas": { lat: 28.12, lon: -15.43 }, "ceuta": { lat: 35.89, lon: -5.32 },
  "melilla": { lat: 35.29, lon: -2.94 }
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
  var clave = ciudad.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
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

// ===== ALERTAS DE COSECHA/SIEMBRA =====
function mostrarAlertas() {
  var el = document.getElementById("alertas-cosecha");
  if (!el) return;
  var mes = new Date().getMonth() + 1;
  var cosechar = CAL.filter(function (p) { return p.c.indexOf(mes) > -1; });
  var sembrar = CAL.filter(function (p) { return p.s.indexOf(mes) > -1; });
  if (cosechar.length === 0 && sembrar.length === 0) { el.style.display = "none"; return; }
  el.innerHTML = "";
  var wrap = document.createElement("div");
  wrap.style.cssText = "background:rgba(15,26,15,0.95);border:1px solid rgba(134,239,172,0.2);border-radius:14px;padding:14px 16px";
  wrap.innerHTML = "<div style='font-size:12px;color:#86efac;font-weight:bold;margin-bottom:10px'>📅 Este mes — " + MESES[mes - 1] + "</div>";
  var inner = document.createElement("div");
  inner.style.cssText = "display:flex;flex-wrap:wrap;gap:12px";

  if (cosechar.length > 0) {
    var dc = document.createElement("div");
    dc.style.cssText = "flex:1;min-width:140px";
    dc.innerHTML = "<div style='color:#fbbf24;font-size:10px;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px'>🍅 Cosechar ahora</div>";
    var tags = document.createElement("div");
    tags.style.cssText = "display:flex;flex-wrap:wrap;gap:4px";
    cosechar.slice(0, 8).forEach(function (p) {
      var sp = document.createElement("span");
      sp.style.cssText = "background:rgba(251,191,36,0.1);border:1px solid rgba(251,191,36,0.25);border-radius:20px;padding:3px 10px;color:#fde68a;font-size:11px;cursor:pointer";
      sp.textContent = p.e + " " + p.n;
      sp.onclick = function () { abrir(p.n); };
      tags.appendChild(sp);
    });
    dc.appendChild(tags);
    inner.appendChild(dc);
  }

  if (sembrar.length > 0) {
    var ds = document.createElement("div");
    ds.style.cssText = "flex:1;min-width:140px";
    ds.innerHTML = "<div style='color:#4ade80;font-size:10px;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px'>🌱 Sembrar ahora</div>";
    var tags2 = document.createElement("div");
    tags2.style.cssText = "display:flex;flex-wrap:wrap;gap:4px";
    sembrar.slice(0, 8).forEach(function (p) {
      var sp = document.createElement("span");
      sp.style.cssText = "background:rgba(74,222,128,0.08);border:1px solid rgba(74,222,128,0.2);border-radius:20px;padding:3px 10px;color:#86efac;font-size:11px;cursor:pointer";
      sp.textContent = p.e + " " + p.n;
      sp.onclick = function () { abrir(p.n); };
      tags2.appendChild(sp);
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
  document.getElementById("SI").value = "";
  if (typeof plantasExtra !== "undefined") {
    plantasExtra.forEach(function (p) { P.push(p); });
  }
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

  checkSession();
  instalarPWA();
  setTimeout(poblarSelects, 500);
  setTimeout(mostrarRecordatoriosRiego, 1000);
});
