// ===== PANEL LATERAL =====

// ===== CALENDARIO =====
var CAL = [
  { n: "Tomate", e: "🍅", s: [4, 5], c: [7, 8, 9, 10] },
  { n: "Pimiento", e: "🫑", s: [5, 6], c: [8, 9, 10] },
  { n: "Pepino", e: "🥒", s: [5], c: [7, 8] },
  { n: "Calabacin", e: "🫛", s: [5], c: [6, 7, 8, 9] },
  { n: "Lechuga", e: "🥬", s: [3, 4, 8, 9], c: [5, 6, 10, 11] },
  { n: "Zanahoria", e: "🥕", s: [3, 4, 7, 8], c: [6, 7, 10, 11] },
  { n: "Cebolla", e: "🧅", s: [3, 4], c: [7, 8] },
  { n: "Ajo", e: "🧄", s: [10, 11], c: [6, 7] },
  { n: "Puerro", e: "🌱", s: [2, 3], c: [10, 11, 12, 1, 2] },
  { n: "Espinaca", e: "🌿", s: [3, 4, 8, 9], c: [5, 6, 10, 11] },
  { n: "Acelga", e: "🌿", s: [4, 5, 8], c: [6, 7, 8, 10, 11] },
  { n: "Judia verde", e: "🫘", s: [5], c: [7, 8, 9] },
  { n: "Guisante", e: "🫛", s: [2, 3], c: [5, 6] },
  { n: "Brocoli", e: "🥦", s: [6, 7], c: [10, 11, 12] },
  { n: "Patata", e: "🥔", s: [4], c: [7, 8, 9, 10] },
  { n: "Maiz", e: "🌽", s: [5], c: [8, 9] },
  { n: "Rabano", e: "🌱", s: [3, 4, 9], c: [4, 5, 10] },
  { n: "Remolacha", e: "🫙", s: [4, 5], c: [7, 8, 9] },
  { n: "Nabo", e: "🌱", s: [8, 9], c: [10, 11] },
  { n: "Fresa", e: "🍓", s: [9, 10], c: [5, 6] },
  { n: "Frambuesa", e: "🫐", s: [12, 1, 2], c: [6, 7, 9, 10] },
  { n: "Arandano", e: "🫐", s: [2, 3], c: [7, 8] },
  { n: "Mora", e: "🫐", s: [12, 1], c: [8, 9] },
  { n: "Manzano", e: "🍎", s: [12, 1, 2], c: [8, 9, 10] },
  { n: "Peral", e: "🍐", s: [12, 1, 2], c: [8, 9, 10] },
  { n: "Cerezo", e: "🍒", s: [12, 1, 2], c: [6] },
  { n: "Ciruelo", e: "🍑", s: [12, 1, 2], c: [7, 8, 9] },
  { n: "Nogal", e: "🌰", s: [12, 1, 2], c: [9, 10] },
  { n: "Membrillo", e: "🍋", s: [12, 1, 2], c: [10] },
  { n: "Higuera", e: "🌿", s: [4, 5], c: [6, 8, 9] },
  { n: "Melocotonero", e: "🍑", s: [12, 1, 2], c: [7, 8] },
  { n: "Almendro", e: "🌸", s: [12, 1, 2], c: [8, 9] },
  { n: "Albahaca", e: "🌿", s: [5], c: [6, 7, 8, 9] },
  { n: "Perejil", e: "🌿", s: [3, 4, 8], c: [5, 6, 7, 9, 10, 11] },
  { n: "Cilantro", e: "🌿", s: [3, 4, 8, 9], c: [4, 5, 9, 10] },
  { n: "Manzanilla", e: "🌼", s: [3, 4], c: [6, 7] },
  { n: "Oregano", e: "🌿", s: [4, 5], c: [6, 7, 8] },
  { n: "Lavanda", e: "💜", s: [4, 5], c: [6, 7] },
  { n: "Girasol", e: "🌻", s: [5], c: [9] },
  { n: "Tulipan", e: "🌷", s: [10, 11], c: [3, 4, 5] },
  { n: "Narciso", e: "🌼", s: [10, 11], c: [2, 3, 4] },
  { n: "Gladiolo", e: "🌸", s: [4, 5], c: [8, 9] }
];
var MESES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

function itemCal(p, tipo) {
  var bg = tipo === "c" ? "rgba(251,191,36,0.06)" : "rgba(74,222,128,0.06)";
  var border = tipo === "c" ? "rgba(251,191,36,0.2)" : "rgba(74,222,128,0.15)";
  var color = tipo === "c" ? "#fde68a" : "#86efac";
  var div = document.createElement("div");
  div.style.cssText = "background:" + bg + ";border:1px solid " + border + ";border-radius:8px;padding:8px 10px;margin-bottom:5px;display:flex;align-items:center;gap:8px;cursor:pointer";
  div.innerHTML = "<span style='font-size:18px'>" + p.e + "</span><span style='color:" + color + ";font-size:12px'>" + p.n + "</span>";
  div.onclick = function () { cerrarPanel(); abrir(p.n); };
  return div;
}

function cargarCalendario() {
  var el = document.getElementById("cal-contenido");
  var mesActual = new Date().getMonth() + 1;
  var html = "<div style='margin-bottom:14px'><label style='color:#6b9c6b;font-size:11px;display:block;margin-bottom:6px'>Ver mes:</label><div id='meses-btns' style='display:flex;flex-wrap:wrap;gap:4px'></div></div><div id='cal-mes-contenido'></div>";
  el.innerHTML = html;
  var cont = document.getElementById("meses-btns");
  for (var m = 1; m <= 12; m++) {
    (function (mes) {
      var b = document.createElement("button");
      b.id = "mes-btn-" + mes;
      b.textContent = MESES[mes - 1].substring(0, 3);
      b.style.cssText = "background:rgba(255,255,255,0.04);border:1px solid rgba(134,239,172,0.15);border-radius:8px;padding:4px 8px;color:#6b9c6b;font-size:10px;cursor:pointer;font-family:Georgia,serif";
      b.onclick = function () { verMesCal(mes); };
      cont.appendChild(b);
    })(m);
  }
  verMesCal(mesActual);
}

function verMesCal(mes) {
  for (var m = 1; m <= 12; m++) {
    var b = document.getElementById("mes-btn-" + m);
    if (!b) continue;
    if (m === mes) { b.style.background = "rgba(74,222,128,0.25)"; b.style.borderColor = "rgba(74,222,128,0.5)"; b.style.color = "#4ade80"; }
    else { b.style.background = "rgba(255,255,255,0.04)"; b.style.borderColor = "rgba(134,239,172,0.15)"; b.style.color = "#6b9c6b"; }
  }
  var sembrar = CAL.filter(function (p) { return p.s.indexOf(mes) > -1; });
  var cosechar = CAL.filter(function (p) { return p.c.indexOf(mes) > -1; });
  var el = document.getElementById("cal-mes-contenido");
  el.innerHTML = "<div style='font-size:14px;color:#86efac;font-weight:bold;margin-bottom:12px'>" + MESES[mes - 1] + "</div>";

  var divS = document.createElement("div");
  divS.style.marginBottom = "14px";
  divS.innerHTML = "<div style='color:#4ade80;font-size:12px;font-weight:bold;margin-bottom:8px'>🌱 Sembrar y plantar</div>";
  if (sembrar.length === 0) { divS.innerHTML += "<div style='color:#4a6b4a;font-size:12px;font-style:italic;padding:8px'>Poco que sembrar este mes.</div>"; }
  else { sembrar.forEach(function (p) { divS.appendChild(itemCal(p, "s")); }); }
  el.appendChild(divS);

  var divC = document.createElement("div");
  divC.innerHTML = "<div style='color:#fbbf24;font-size:12px;font-weight:bold;margin-bottom:8px'>🍅 Cosechar y recolectar</div>";
  if (cosechar.length === 0) { divC.innerHTML += "<div style='color:#4a6b4a;font-size:12px;font-style:italic;padding:8px'>Nada que cosechar este mes.</div>"; }
  else { cosechar.forEach(function (p) { divC.appendChild(itemCal(p, "c")); }); }
  el.appendChild(divC);
}

// ===== TABS DEL PANEL =====
function pTab(btn, id) {
  document.querySelectorAll(".ptab").forEach(function (b) {
    b.style.color = "#6b9c6b";
    b.style.borderBottom = "2px solid transparent";
  });
  btn.style.color = "#4ade80";
  btn.style.borderBottom = "2px solid #4ade80";
  ["pdiario", "pfavs", "pcom", "pcal", "ptiempo", "pestats", "pmapa"].forEach(function (d) {
    document.getElementById(d).style.display = "none";
  });
  document.getElementById(id).style.display = "block";
  if (id === "pdiario") cargarDiario();
  if (id === "pfavs") cargarFavs();
  if (id === "pcom") cargarCom();
  if (id === "pcal") cargarCalendario();
  if (id === "ptiempo") cargarTiempo();
  if (id === "pestats") cargarStats();
  if (id === "pmapa") cargarMapa();
}

function abrirPanel() {
  var pl = document.getElementById("PL");
  var po = document.getElementById("PO");
  if (!pl || !po) return;
  pl.style.right = "0";
  po.style.display = "block";
  document.body.style.overflow = "hidden";
  poblarSelects();
  cargarDiario();
  var hoy = new Date().toISOString().split("T")[0];
  document.getElementById("df-fecha").value = hoy;
}

function cerrarPanel() {
  var pl = document.getElementById("PL");
  var po = document.getElementById("PO");
  if (!pl || !po) return;
  pl.style.right = "-500px";
  po.style.display = "none";
  document.body.style.overflow = "";
}

function poblarSelects() {
  var opts = P.map(function (p) { return "<option value=\"" + p.n + "\">" + p.e + " " + p.n + "</option>"; }).join("");
  var base = "<option value=\"\">-- Selecciona planta --</option>" + opts;
  document.getElementById("df-planta").innerHTML = base;
  document.getElementById("cf-planta").innerHTML = base;
}

// ===== DIARIO =====
async function cargarDiario() {
  var el = document.getElementById("lista-diario");
  el.innerHTML = "<div style='color:#4a6b4a;text-align:center;padding:20px;font-style:italic'>Cargando...</div>";
  try {
    var d = await sbGet("diario", currentUser ? "&user_id=eq." + currentUser.id : "");
    if (!d || d.length === 0) { el.innerHTML = "<div style='color:#4a6b4a;text-align:center;padding:20px;font-style:italic'>Sin entradas aun. Escribe tu primera nota!</div>"; return; }
    var icons = { "siembra": "🌱", "riego": "💧", "abono": "🌿", "poda": "✂️", "cosecha": "🍅", "plaga": "🦠", "general": "📝" };
    el.innerHTML = d.map(function (x) {
      var pp = P.find(function (q) { return q.n === x.planta; });
      var em = pp ? pp.e : "🌱";
      var ic = icons[x.tipo] || "📝";
      return "<div style='background:rgba(255,255,255,0.04);border:1px solid rgba(134,239,172,0.12);border-radius:10px;padding:12px;margin-bottom:8px'>"
        + "<div style='display:flex;align-items:center;gap:6px;margin-bottom:6px'>"
        + "<span style='font-size:18px'>" + em + "</span>"
        + "<span style='color:#86efac;font-size:12px;font-weight:bold'>" + x.planta + "</span>"
        + "<span style='font-size:10px;border-radius:6px;padding:2px 7px;background:rgba(74,222,128,0.15);color:#4ade80'>" + ic + " " + x.tipo + "</span>"
        + "<span style='color:#4a6b4a;font-size:11px;margin-left:auto'>" + x.fecha + "</span>"
        + "<button onclick=\"borrarD('" + x.id + "')\" style='background:none;border:none;color:#f87171;font-size:11px;cursor:pointer'>✕</button>"
        + "</div>"
        + "<div style='color:#a3c4a3;font-size:12px;line-height:1.5'>" + x.nota + "</div>"
        + "</div>";
    }).join("");
  } catch (e) { el.innerHTML = "<div style='color:#f87171;text-align:center;padding:20px'>Error al cargar</div>"; }
}

async function guardarDiario() {
  var pl = document.getElementById("df-planta").value;
  var fe = document.getElementById("df-fecha").value;
  var ti = document.getElementById("df-tipo").value;
  var no = document.getElementById("df-nota").value.trim();
  if (!pl || !fe || !no) { alert("Rellena todos los campos"); return; }
  var pp = P.find(function (q) { return q.n === pl; });
  var uid = currentUser ? currentUser.id : null;
  var ok = await sbPost("diario", { planta: pl, emoji: pp ? pp.e : "🌱", fecha: fe, tipo: ti, nota: no, user_id: uid });
  if (ok) { document.getElementById("df-nota").value = ""; cargarDiario(); }
  else alert("Error al guardar");
}

async function borrarD(id) {
  if (!confirm("Borrar esta entrada?")) return;
  await sbDel("diario", id);
  cargarDiario();
}

// ===== FAVORITOS =====
async function cargarFavs() {
  var el = document.getElementById("lista-favs");
  el.innerHTML = "<div style='color:#4a6b4a;text-align:center;padding:20px;font-style:italic'>Cargando...</div>";
  try {
    var d = await sbGet("favoritos", currentUser ? "&user_id=eq." + currentUser.id : "");
    if (!d || d.length === 0) { el.innerHTML = "<div style='color:#4a6b4a;text-align:center;padding:20px;font-style:italic'>Sin favoritos. Abre una planta y pulsa el boton Favorito</div>"; return; }
    el.innerHTML = d.map(function (x) {
      return "<div style='background:rgba(255,255,255,0.04);border:1px solid rgba(134,239,172,0.12);border-radius:10px;padding:10px 12px;margin-bottom:8px;display:flex;align-items:center;gap:10px;cursor:pointer' onclick=\"abrirFav('" + x.planta + "')\">"
        + "<span style='font-size:24px'>" + x.emoji + "</span>"
        + "<span style='color:#86efac;font-size:13px;flex:1'>" + x.planta + "</span>"
        + "<button onclick=\"event.stopPropagation();quitarFav('" + x.id + "')\" style='background:none;border:none;color:#f87171;font-size:14px;cursor:pointer'>✕</button>"
        + "</div>";
    }).join("");
  } catch (e) { el.innerHTML = "<div style='color:#f87171;text-align:center;padding:20px'>Error al cargar</div>"; }
}

async function toggleFav(nombre, emoji) {
  try {
    var uid_filter = currentUser ? "&user_id=eq." + currentUser.id : "";
    var d = await sbGet("favoritos", "&planta=eq." + encodeURIComponent(nombre) + uid_filter);
    if (d && d.length > 0) {
      await sbDel("favoritos", d[0].id);
      alert("Quitado de favoritos");
    } else {
      var uid = currentUser ? currentUser.id : null;
      await sbPost("favoritos", { planta: nombre, emoji: emoji, user_id: uid });
      alert("Anadido a favoritos!");
    }
  } catch (e) { alert("Error al guardar favorito"); }
}

async function quitarFav(id) {
  await sbDel("favoritos", id);
  cargarFavs();
}

function abrirFav(nombre) {
  cerrarPanel();
  abrir(nombre);
}

// ===== COMUNIDAD =====
async function cargarCom() {
  var el = document.getElementById("lista-com");
  el.innerHTML = "<div style='color:#4a6b4a;text-align:center;padding:20px;font-style:italic'>Cargando...</div>";
  try {
    var d = await sbGet("comentarios");
    if (!d || d.length === 0) { el.innerHTML = "<div style='color:#4a6b4a;text-align:center;padding:20px;font-style:italic'>Sin comentarios. Se el primero en compartir un truco!</div>"; return; }
    el.innerHTML = d.map(function (x) {
      var fe = new Date(x.created_at).toLocaleDateString("es-ES");
      return "<div style='background:rgba(255,255,255,0.04);border:1px solid rgba(134,239,172,0.12);border-radius:10px;padding:12px;margin-bottom:8px'>"
        + "<div style='display:flex;align-items:center;gap:8px;margin-bottom:5px'>"
        + "<span style='color:#4ade80;font-size:12px;font-weight:bold'>" + x.autor + "</span>"
        + "<span style='color:#4a6b4a;font-size:11px'>sobre " + x.planta + "</span>"
        + "<span style='color:#4a6b4a;font-size:10px;margin-left:auto'>" + fe + "</span>"
        + "</div>"
        + "<div style='color:#a3c4a3;font-size:12px;line-height:1.5'>" + x.texto + "</div>"
        + "</div>";
    }).join("");
  } catch (e) { el.innerHTML = "<div style='color:#f87171;text-align:center;padding:20px'>Error al cargar</div>"; }
}

async function guardarCom() {
  var pl = document.getElementById("cf-planta").value;
  var au = document.getElementById("cf-autor").value.trim() || "Anonimo";
  var tx = document.getElementById("cf-texto").value.trim();
  if (!pl || !tx) { alert("Selecciona una planta y escribe tu truco"); return; }
  if (tx.length < 10) { alert("Escribe al menos 10 caracteres"); return; }
  var ok = await sbPost("comentarios", { planta: pl, autor: au, texto: tx });
  if (ok) { document.getElementById("cf-texto").value = ""; cargarCom(); }
  else alert("Error al guardar");
}

// ===== TIEMPO =====
async function cargarTiempo() {
  var el = document.getElementById("tiempo-box");
  try {
    var r = await fetch("https://api.open-meteo.com/v1/forecast?latitude=" + ciudadLat + "&longitude=" + ciudadLon + "&current=temperature_2m,precipitation,weathercode,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum&timezone=auto&forecast_days=7");
    var d = await r.json();
    var c = d.current;
    var temp = Math.round(c.temperature_2m);
    var lluvia = c.precipitation;
    var viento = Math.round(c.windspeed_10m);
    var cod = c.weathercode;

    function getIco(code) {
      if (code === 0) return "☀️";
      if (code <= 3) return "⛅";
      if (code <= 48) return "🌫️";
      if (code <= 67) return "🌧️";
      if (code <= 77) return "❄️";
      if (code <= 82) return "🌦️";
      return "⛈️";
    }
    function getDesc(code) {
      if (code === 0) return "Despejado";
      if (code <= 3) return "Parcialmente nublado";
      if (code <= 48) return "Niebla";
      if (code <= 67) return "Lluvia";
      if (code <= 77) return "Nieve";
      if (code <= 82) return "Chubascos";
      return "Tormenta";
    }

    var consejo = "";
    if (lluvia > 0) consejo = "Hay lluvia hoy. No es necesario regar.";
    else if (temp > 25) consejo = "Hace calor. Riega al atardecer.";
    else if (temp < 5) consejo = "Temperatura muy baja. Protege las plantas sensibles.";
    else if (temp >= 5 && temp <= 15) consejo = "Temperatura ideal para trabajar en el jardin.";
    else consejo = "Tiempo agradable para el jardin.";

    var html = "<div style='background:rgba(74,222,128,0.08);border:1px solid rgba(134,239,172,0.2);border-radius:14px;padding:20px;text-align:center;margin-bottom:14px'>"
      + "<div style='font-size:52px'>" + getIco(cod) + "</div>"
      + "<div style='font-size:44px;color:#86efac;margin:8px 0'>" + temp + "°C</div>"
      + "<div style='color:#a3c4a3;font-size:14px'>" + getDesc(cod) + "</div>"
      + "<div style='color:#6b9c6b;font-size:12px;margin-top:8px'>Viento: " + viento + " km/h · Lluvia: " + lluvia + " mm</div>"
      + "</div>"
      + "<div style='background:rgba(251,191,36,0.1);border:1px solid rgba(251,191,36,0.3);border-radius:10px;padding:12px;color:#fde68a;font-size:12px;margin-bottom:14px'>" + consejo + "</div>";

    if (d.daily) {
      var dias = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
      html += "<div style='font-size:13px;color:#86efac;font-weight:bold;margin-bottom:8px'>Proximos 7 dias</div>";
      html += "<div style='display:flex;flex-direction:column;gap:6px'>";
      for (var i = 0; i < 7; i++) {
        var fecha = new Date(d.daily.time[i]);
        var diaNom = dias[fecha.getDay()];
        var max = Math.round(d.daily.temperature_2m_max[i]);
        var min = Math.round(d.daily.temperature_2m_min[i]);
        var lluviaD = d.daily.precipitation_sum[i];
        var icoD = getIco(d.daily.weathercode[i]);
        html += "<div style='background:rgba(255,255,255,0.03);border:1px solid rgba(134,239,172,0.1);border-radius:8px;padding:8px 12px;display:flex;align-items:center;gap:10px'>"
          + "<span style='color:#6b9c6b;font-size:12px;width:28px'>" + diaNom + "</span>"
          + "<span style='font-size:18px'>" + icoD + "</span>"
          + "<span style='color:#86efac;font-size:13px;font-weight:bold;flex:1'>" + max + "°</span>"
          + "<span style='color:#4a6b4a;font-size:12px'>" + min + "°</span>"
          + (lluviaD > 0 ? "<span style='color:#60a5fa;font-size:11px'>" + lluviaD + "mm</span>" : "")
          + "</div>";
      }
      html += "</div>";
    }
    html += "<p style='color:#4a6b4a;font-size:11px;text-align:center;margin-top:10px'>" + ciudadUsuario + " · Open-Meteo</p>";
    el.innerHTML = html;
  } catch (e) {
    el.innerHTML = "<div style='color:#f87171;text-align:center;padding:20px'>No se pudo cargar el tiempo</div>";
  }
}

// ===== RECORDATORIOS DE RIEGO =====
var riegoData = JSON.parse(localStorage.getItem("jardin_riego") || "{}");

function guardarRiego(planta) {
  riegoData[planta] = new Date().toISOString().split("T")[0];
  localStorage.setItem("jardin_riego", JSON.stringify(riegoData));
}

function diasSinRegar(planta) {
  if (!riegoData[planta]) return null;
  var ultimo = new Date(riegoData[planta]);
  var hoy = new Date();
  return Math.floor((hoy - ultimo) / (1000 * 60 * 60 * 24));
}

function mostrarRecordatoriosRiego() {
  var alertas = [];
  P.forEach(function (p) {
    var dias = diasSinRegar(p.n);
    if (dias !== null && dias >= 3) {
      alertas.push({ planta: p.n, emoji: p.e, dias: dias });
    }
  });
  if (alertas.length === 0) return;
  var el = document.getElementById("alertas-cosecha");
  if (!el) return;
  var wrap = document.createElement("div");
  wrap.style.cssText = "background:rgba(96,165,250,0.08);border:1px solid rgba(96,165,250,0.25);border-radius:14px;padding:12px 16px;margin-top:10px";
  wrap.innerHTML = "<div style='font-size:12px;color:#60a5fa;font-weight:bold;margin-bottom:8px'>💧 Pendiente de regar</div>";
  var tags = document.createElement("div");
  tags.style.cssText = "display:flex;flex-wrap:wrap;gap:6px";
  alertas.slice(0, 6).forEach(function (a) {
    var sp = document.createElement("span");
    sp.style.cssText = "background:rgba(96,165,250,0.1);border:1px solid rgba(96,165,250,0.25);border-radius:20px;padding:4px 12px;color:#93c5fd;font-size:11px;cursor:pointer";
    sp.textContent = a.emoji + " " + a.planta + " (" + a.dias + "d)";
    sp.onclick = function () { abrir(a.planta); };
    tags.appendChild(sp);
  });
  wrap.appendChild(tags);
  el.appendChild(wrap);
}

// ===== ESTADÍSTICAS =====
async function cargarStats() {
  var el = document.getElementById("stats-contenido");
  el.innerHTML = "<div style='color:#4a6b4a;text-align:center;padding:20px;font-style:italic'>Cargando estadisticas...</div>";
  try {
    var diario = await sbGet("diario", currentUser ? "&user_id=eq." + currentUser.id : "");
    var favs = await sbGet("favoritos", currentUser ? "&user_id=eq." + currentUser.id : "");
    var coms = await sbGet("comentarios");

    var totalEntradas = diario ? diario.length : 0;
    var totalFavs = favs ? favs.length : 0;
    var totalComs = coms ? coms.length : 0;

    var porTipo = {};
    if (diario) diario.forEach(function (d) { porTipo[d.tipo] = (porTipo[d.tipo] || 0) + 1; });

    var porPlanta = {};
    if (diario) diario.forEach(function (d) { porPlanta[d.planta] = (porPlanta[d.planta] || 0) + 1; });
    var topPlanta = Object.keys(porPlanta).sort(function (a, b) { return porPlanta[b] - porPlanta[a]; })[0];

    var tipoIcons = { "siembra": "🌱", "riego": "💧", "abono": "🌿", "poda": "✂️", "cosecha": "🍅", "plaga": "🦠", "general": "📝" };

    var html = "";
    html += "<div style='display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px'>";
    html += "<div style='background:rgba(74,222,128,0.08);border:1px solid rgba(74,222,128,0.2);border-radius:10px;padding:14px;text-align:center'><div style='font-size:28px;color:#4ade80;font-weight:bold'>" + totalEntradas + "</div><div style='color:#6b9c6b;font-size:11px;margin-top:4px'>Entradas en el diario</div></div>";
    html += "<div style='background:rgba(251,191,36,0.08);border:1px solid rgba(251,191,36,0.2);border-radius:10px;padding:14px;text-align:center'><div style='font-size:28px;color:#fbbf24;font-weight:bold'>" + totalFavs + "</div><div style='color:#6b9c6b;font-size:11px;margin-top:4px'>Plantas favoritas</div></div>";
    html += "<div style='background:rgba(167,139,250,0.08);border:1px solid rgba(167,139,250,0.2);border-radius:10px;padding:14px;text-align:center'><div style='font-size:28px;color:#a78bfa;font-weight:bold'>" + totalComs + "</div><div style='color:#6b9c6b;font-size:11px;margin-top:4px'>Trucos en comunidad</div></div>";
    html += "<div style='background:rgba(96,165,250,0.08);border:1px solid rgba(96,165,250,0.2);border-radius:10px;padding:14px;text-align:center'><div style='font-size:28px;color:#60a5fa;font-weight:bold'>" + Object.keys(riegoData).length + "</div><div style='color:#6b9c6b;font-size:11px;margin-top:4px'>Plantas regadas</div></div>";
    html += "</div>";

    if (topPlanta) {
      var pp = P.find(function (x) { return x.n === topPlanta; });
      html += "<div style='background:rgba(74,222,128,0.06);border:1px solid rgba(74,222,128,0.15);border-radius:10px;padding:12px;margin-bottom:12px;display:flex;align-items:center;gap:10px'>";
      html += "<span style='font-size:28px'>" + (pp ? pp.e : "🌱") + "</span>";
      html += "<div><div style='color:#86efac;font-size:12px;font-weight:bold'>Tu planta mas cuidada</div><div style='color:#a3c4a3;font-size:13px'>" + topPlanta + " (" + porPlanta[topPlanta] + " entradas)</div></div></div>";
    }

    if (Object.keys(porTipo).length > 0) {
      html += "<div style='font-size:12px;color:#86efac;font-weight:bold;margin-bottom:8px'>Actividad por tipo</div>";
      var maxVal = Math.max.apply(null, Object.values(porTipo));
      Object.keys(porTipo).forEach(function (tipo) {
        var pct = Math.round((porTipo[tipo] / maxVal) * 100);
        html += "<div style='margin-bottom:6px'>";
        html += "<div style='display:flex;justify-content:space-between;margin-bottom:3px'><span style='color:#a3c4a3;font-size:11px'>" + (tipoIcons[tipo] || "📝") + " " + tipo + "</span><span style='color:#6b9c6b;font-size:11px'>" + porTipo[tipo] + "</span></div>";
        html += "<div style='background:rgba(255,255,255,0.05);border-radius:4px;height:6px'><div style='background:linear-gradient(90deg,#4ade80,#22c55e);height:6px;border-radius:4px;width:" + pct + "%'></div></div>";
        html += "</div>";
      });
    }

    if (totalEntradas === 0 && totalFavs === 0) {
      html += "<div style='color:#4a6b4a;font-size:12px;text-align:center;font-style:italic;margin-top:10px'>Usa el diario y los favoritos para ver tus estadisticas aqui</div>";
    }

    el.innerHTML = html;
  } catch (e) {
    el.innerHTML = "<div style='color:#f87171;text-align:center;padding:20px'>Error al cargar estadisticas</div>";
  }
}

// ===== MAPA DEL JARDÍN =====
var mapaData = JSON.parse(localStorage.getItem("jardin_mapa") || "{}");
var mapaSeleccionada = null;
var MAPA_FILAS = 8;
var MAPA_COLS = 10;

function cargarMapa() {
  var el = document.getElementById("mapa-contenido");
  var html = "";
  html += "<div style='margin-bottom:12px'>";
  html += "<div style='color:#86efac;font-size:13px;font-weight:bold;margin-bottom:4px'>🗺️ Mi jardín / huerto</div>";
  html += "<div style='color:#6b9c6b;font-size:11px;margin-bottom:10px'>Pulsa una celda para asignar una planta.</div>";
  html += "</div>";

  html += "<div style='margin-bottom:10px'>";
  html += "<select id='mapa-select' style='width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(134,239,172,0.2);border-radius:8px;padding:8px;color:#e8f5e8;font-family:Georgia,serif;font-size:12px;outline:none;margin-bottom:6px'>";
  html += "<option value=''>-- Selecciona planta para colocar --</option>";
  P.forEach(function (p) { html += "<option value='" + p.n + "'>" + p.e + " " + p.n + "</option>"; });
  html += "</select>";
  html += "<div style='display:flex;gap:6px'>";
  html += "<button onclick='limpiarMapa()' style='flex:1;background:rgba(248,113,113,0.1);border:1px solid rgba(248,113,113,0.3);border-radius:8px;padding:6px;color:#f87171;font-size:11px;cursor:pointer'>🗑️ Limpiar todo</button>";
  html += "<button style='flex:1;background:rgba(74,222,128,0.1);border:1px solid rgba(74,222,128,0.3);border-radius:8px;padding:6px;color:#4ade80;font-size:11px;cursor:pointer'>💾 Guardado auto</button>";
  html += "</div></div>";

  el.innerHTML = html;

  var gridEl = document.createElement("div");
  gridEl.style.cssText = "overflow-x:auto";
  var grid = document.createElement("div");
  grid.id = "mapa-grid";
  grid.style.cssText = "display:grid;grid-template-columns:repeat(" + MAPA_COLS + ",1fr);gap:3px;min-width:280px";

  for (var f = 0; f < MAPA_FILAS; f++) {
    for (var c = 0; c < MAPA_COLS; c++) {
      var key = f + "-" + c;
      var val = mapaData[key];
      var pp = val ? P.find(function (x) { return x.n === val; }) : null;
      var cell = document.createElement("div");
      cell.id = "mc-" + key;
      cell.title = val || "Vacio";
      cell.style.cssText = "aspect-ratio:1;background:" + (pp ? "rgba(74,222,128,0.15)" : "rgba(255,255,255,0.03)") + ";border:1px solid rgba(134,239,172," + (pp ? "0.3" : "0.1") + ");border-radius:4px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:14px;transition:all .15s;user-select:none";
      cell.textContent = pp ? pp.e : "";
      (function (k) { cell.onclick = function () { clickCelda(k); }; })(key);
      grid.appendChild(cell);
    }
  }
  gridEl.appendChild(grid);
  el.appendChild(gridEl);

  // Leyenda
  var plantasMapa = {};
  Object.values(mapaData).forEach(function (v) { if (v) plantasMapa[v] = (plantasMapa[v] || 0) + 1; });
  if (Object.keys(plantasMapa).length > 0) {
    var leyenda = document.createElement("div");
    leyenda.style.cssText = "margin-top:12px";
    leyenda.innerHTML = "<div style='color:#86efac;font-size:11px;font-weight:bold;margin-bottom:6px'>Plantas en tu jardín:</div>";
    var tagsDiv = document.createElement("div");
    tagsDiv.style.cssText = "display:flex;flex-wrap:wrap;gap:4px";
    Object.keys(plantasMapa).forEach(function (n) {
      var pp = P.find(function (x) { return x.n === n; });
      var sp = document.createElement("span");
      sp.style.cssText = "background:rgba(74,222,128,0.1);border:1px solid rgba(74,222,128,0.2);border-radius:12px;padding:2px 8px;color:#86efac;font-size:10px";
      sp.textContent = (pp ? pp.e : "🌱") + " " + n + " x" + plantasMapa[n];
      tagsDiv.appendChild(sp);
    });
    leyenda.appendChild(tagsDiv);
    el.appendChild(leyenda);
  }
}

function clickCelda(key) {
  var sel = document.getElementById("mapa-select");
  var planta = sel ? sel.value : "";
  var celda = document.getElementById("mc-" + key);
  if (!celda) return;

  if (!planta) {
    if (mapaData[key]) {
      delete mapaData[key];
      celda.textContent = "";
      celda.style.background = "rgba(255,255,255,0.03)";
      celda.style.borderColor = "rgba(134,239,172,0.1)";
      celda.title = "Vacío";
      guardarMapa();
    }
    return;
  }

  var pp = P.find(function (x) { return x.n === planta; });
  if (!pp) return;
  mapaData[key] = planta;
  celda.textContent = pp.e;
  celda.style.background = "rgba(74,222,128,0.15)";
  celda.style.borderColor = "rgba(74,222,128,0.3)";
  celda.title = planta;
  guardarMapa();
}

function guardarMapa() {
  localStorage.setItem("jardin_mapa", JSON.stringify(mapaData));
}

function limpiarMapa() {
  if (!confirm("Borrar todo el mapa?")) return;
  mapaData = {};
  guardarMapa();
  cargarMapa();
}
