// ===== PANEL LATERAL =====

// Normalización para comparaciones
function norm(s) {
  return (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

// ===== CALENDARIO =====
var CAL = [
  { n: "Tomate", e: "🍅", s: [4, 5], c: [7, 8, 9, 10] },
  { n: "Pimiento", e: "🫑", s: [5, 6], c: [8, 9, 10] },
  { n: "Pepino", e: "🥒", s: [5], c: [7, 8] },
  { n: "Calabacín", e: "🫛", s: [5], c: [6, 7, 8, 9] },
  { n: "Lechuga", e: "🥬", s: [3, 4, 8, 9], c: [5, 6, 10, 11] },
  { n: "Zanahoria", e: "🥕", s: [3, 4, 7, 8], c: [6, 7, 10, 11] },
  { n: "Cebolla", e: "🧅", s: [3, 4], c: [7, 8] },
  { n: "Ajo", e: "🧄", s: [10, 11], c: [6, 7] },
  { n: "Puerro", e: "🌱", s: [2, 3], c: [10, 11, 12, 1, 2] },
  { n: "Espinaca", e: "🌿", s: [3, 4, 8, 9], c: [5, 6, 10, 11] },
  { n: "Acelga", e: "🌿", s: [4, 5, 8], c: [6, 7, 8, 10, 11] },
  { n: "Judía verde", e: "🫘", s: [5], c: [7, 8, 9] },
  { n: "Guisante", e: "🫛", s: [2, 3], c: [5, 6] },
  { n: "Brócoli", e: "🥦", s: [6, 7], c: [10, 11, 12] },
  { n: "Patata", e: "🥔", s: [4], c: [7, 8, 9, 10] },
  { n: "Maíz", e: "🌽", s: [5], c: [8, 9] },
  { n: "Rábano", e: "🌱", s: [3, 4, 9], c: [4, 5, 10] },
  { n: "Remolacha", e: "🫙", s: [4, 5], c: [7, 8, 9] },
  { n: "Nabo", e: "🌱", s: [8, 9], c: [10, 11] },
  { n: "Fresa", e: "🍓", s: [9, 10], c: [5, 6] },
  { n: "Frambuesa", e: "🫐", s: [12, 1, 2], c: [6, 7, 9, 10] },
  { n: "Arándano", e: "🫐", s: [2, 3], c: [7, 8] },
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
  { n: "Orégano", e: "🌿", s: [4, 5], c: [6, 7, 8] },
  { n: "Lavanda", e: "💜", s: [4, 5], c: [6, 7] },
  { n: "Girasol", e: "🌻", s: [5], c: [9] },
  { n: "Tulipán", e: "🌷", s: [10, 11], c: [3, 4, 5] },
  { n: "Narciso", e: "🌼", s: [10, 11], c: [2, 3, 4] },
  { n: "Gladiolo", e: "🌸", s: [4, 5], c: [8, 9] }
];
var MESES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

function itemCal(p, tipo) {
  var bg = tipo === "c" ? "rgba(251,191,36,0.06)" : "rgba(74,222,128,0.06)";
  var border = tipo === "c" ? "rgba(251,191,36,0.2)" : "rgba(74,222,128,0.15)";
  var color = tipo === "c" ? "#fde68a" : "#86efac";
  var btn = document.createElement("button");
  btn.type = "button";
  btn.className = "alerta-tag";
  btn.style.cssText = "width:100%;text-align:left;background:" + bg + ";border:1px solid " + border + ";border-radius:8px;padding:8px 10px;margin-bottom:5px;display:flex;align-items:center;gap:8px;cursor:pointer";
  btn.innerHTML = "<span style='font-size:18px' aria-hidden='true'>" + p.e + "</span><span style='color:" + color + ";font-size:12.5px;font-weight:bold'>" + p.n + "</span>";
  btn.onclick = function () { cerrarPanel(); abrir(p.n); };
  return btn;
}

function cargarCalendario() {
  var el = document.getElementById("cal-contenido");
  if (!el) return;
  var mesActual = new Date().getMonth() + 1;
  var html = "<div style='margin-bottom:14px'><label style='color:#6b9c6b;font-size:11px;display:block;margin-bottom:6px'>Ver mes:</label><div id='meses-btns' style='display:flex;flex-wrap:wrap;gap:4px'></div></div><div id='cal-mes-contenido'></div>";
  el.innerHTML = html;
  var cont = document.getElementById("meses-btns");
  for (var m = 1; m <= 12; m++) {
    (function (mes) {
      var b = document.createElement("button");
      b.id = "mes-btn-" + mes;
      b.textContent = MESES[mes - 1].substring(0, 3);
      b.style.cssText = "background:rgba(255,255,255,0.04);border:1px solid rgba(134,239,172,0.15);border-radius:8px;padding:5px 9px;color:#6b9c6b;font-size:11px;cursor:pointer;font-family:Georgia,serif;min-height:32px";
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
    if (m === mes) { b.style.background = "rgba(74,222,128,0.25)"; b.style.borderColor = "rgba(74,222,128,0.5)"; b.style.color = "#4ade80"; b.style.fontWeight = "bold"; }
    else { b.style.background = "rgba(255,255,255,0.04)"; b.style.borderColor = "rgba(134,239,172,0.15)"; b.style.color = "#6b9c6b"; b.style.fontWeight = "normal"; }
  }
  var sembrar = CAL.filter(function (p) { return p.s && p.s.indexOf(mes) > -1; });
  var cosechar = CAL.filter(function (p) { return p.c && p.c.indexOf(mes) > -1; });
  var el = document.getElementById("cal-mes-contenido");
  if (!el) return;
  el.innerHTML = "<div style='font-size:14px;color:#86efac;font-weight:bold;margin-bottom:12px'>" + MESES[mes - 1] + "</div>";

  var divS = document.createElement("div");
  divS.style.marginBottom = "14px";
  divS.innerHTML = "<div style='color:#4ade80;font-size:12px;font-weight:bold;margin-bottom:8px'>🌱 Sembrar y plantar</div>";
  if (sembrar.length === 0) { divS.innerHTML += "<div style='color:#4a6b4a;font-size:12px;font-style:italic;padding:8px'>Poco que sembrar este mes en esta zona.</div>"; }
  else { sembrar.forEach(function (p) { divS.appendChild(itemCal(p, "s")); }); }
  el.appendChild(divS);

  var divC = document.createElement("div");
  divC.innerHTML = "<div style='color:#fbbf24;font-size:12px;font-weight:bold;margin-bottom:8px'>🍅 Cosechar y recolectar</div>";
  if (cosechar.length === 0) { divC.innerHTML += "<div style='color:#4a6b4a;font-size:12px;font-style:italic;padding:8px'>Sin cosechas destacadas este mes.</div>"; }
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
    var tabContent = document.getElementById(d);
    if (tabContent) tabContent.style.display = "none";
  });
  var activeContent = document.getElementById(id);
  if (activeContent) activeContent.style.display = "block";
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
  var feInput = document.getElementById("df-fecha");
  if (feInput) feInput.value = hoy;
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
  var selDiario = document.getElementById("df-planta");
  var selCom = document.getElementById("cf-planta");
  if (selDiario) selDiario.innerHTML = base;
  if (selCom) selCom.innerHTML = base;
}

// ===== DIARIO (Soporte local y en la nube) =====
async function cargarDiario() {
  var el = document.getElementById("lista-diario");
  if (!el) return;
  el.innerHTML = "<div style='color:#4a6b4a;text-align:center;padding:20px;font-style:italic'>Cargando diario...</div>";
  try {
    var d = [];
    var esLocal = false;
    if (typeof currentUser !== "undefined" && currentUser) {
      d = ordenarPorFecha(await fsGetMine("diario"));
    } else {
      esLocal = true;
      d = JSON.parse(localStorage.getItem("jardin_diario_local") || "[]");
      d.sort(function (a, b) {
        return new Date(b.fecha || 0).getTime() - new Date(a.fecha || 0).getTime();
      });
    }

    if (!d || d.length === 0) {
      el.innerHTML = "<div style='color:#6b9c6b;text-align:center;padding:20px;font-style:italic'>Sin entradas aún. ¡Escribe tu primera nota para empezar tu diario!"
        + (esLocal ? "<br><span style='font-size:11px;color:#4a6b4a;display:inline-block;margin-top:6px'>Guardado en este dispositivo (sin cuenta).</span>" : "")
        + "</div>";
      return;
    }

    var icons = { "siembra": "🌱", "riego": "💧", "abono": "🌿", "poda": "✂️", "cosecha": "🍅", "plaga": "🦠", "general": "📝" };
    var banner = esLocal ? "<div style='font-size:11px;color:#86efac;background:rgba(74,222,128,0.08);border:1px solid rgba(74,222,128,0.2);border-radius:8px;padding:6px 10px;margin-bottom:10px;text-align:center'>📱 Guardado en la memoria de este dispositivo</div>" : "";

    el.innerHTML = banner + d.map(function (x) {
      var pp = P.find(function (q) { return q.n === x.planta || norm(q.n) === norm(x.planta); });
      var em = x.emoji || (pp ? pp.e : "🌱");
      var ic = icons[x.tipo] || "📝";
      return "<div style='background:rgba(255,255,255,0.04);border:1px solid rgba(134,239,172,0.12);border-radius:10px;padding:12px;margin-bottom:8px'>"
        + "<div style='display:flex;align-items:center;gap:6px;margin-bottom:6px'>"
        + "<span style='font-size:18px'>" + em + "</span>"
        + "<span style='color:#86efac;font-size:12.5px;font-weight:bold'>" + x.planta + "</span>"
        + "<span style='font-size:10px;border-radius:6px;padding:2px 7px;background:rgba(74,222,128,0.15);color:#4ade80'>" + ic + " " + x.tipo + "</span>"
        + "<span style='color:#4a6b4a;font-size:11px;margin-left:auto'>" + (x.fecha || "") + "</span>"
        + "<button onclick=\"borrarD('" + x.id + "')\" title='Eliminar entrada' style='background:none;border:none;color:#f87171;font-size:13px;cursor:pointer;padding:2px 6px'>✕</button>"
        + "</div>"
        + "<div style='color:#a3c4a3;font-size:12px;line-height:1.5'>" + x.nota + "</div>"
        + "</div>";
    }).join("");
  } catch (e) {
    el.innerHTML = "<div style='color:#f87171;text-align:center;padding:20px'>Error al cargar el diario</div>";
  }
}

async function guardarDiario() {
  var pl = document.getElementById("df-planta").value;
  var fe = document.getElementById("df-fecha").value;
  var ti = document.getElementById("df-tipo").value;
  var no = document.getElementById("df-nota").value.trim();

  if (!pl || !fe || !no) { toast("Rellena todos los campos de la entrada", "error"); return; }
  var pp = P.find(function (q) { return q.n === pl || norm(q.n) === norm(pl); });
  var emoji = pp ? pp.e : "🌱";

  try {
    if (typeof currentUser !== "undefined" && currentUser) {
      await fsAdd("diario", { uid: currentUser.id, planta: pl, emoji: emoji, fecha: fe, tipo: ti, nota: no });
    } else {
      var arr = JSON.parse(localStorage.getItem("jardin_diario_local") || "[]");
      arr.unshift({
        id: "loc_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
        planta: pl,
        emoji: emoji,
        fecha: fe,
        tipo: ti,
        nota: no,
        created: { toMillis: function() { return Date.now(); } }
      });
      localStorage.setItem("jardin_diario_local", JSON.stringify(arr));
    }
    document.getElementById("df-nota").value = "";
    cargarDiario();
    toast(currentUser ? "📔 Entrada guardada en tu cuenta" : "📔 Entrada guardada en este dispositivo");
  } catch (e) {
    toast("Error al guardar la entrada", "error");
  }
}

async function borrarD(id) {
  if (!confirm("¿Deseas borrar esta entrada del diario?")) return;
  try {
    if (typeof currentUser !== "undefined" && currentUser) {
      await fsDel("diario", id);
    } else {
      var arr = JSON.parse(localStorage.getItem("jardin_diario_local") || "[]");
      arr = arr.filter(function (x) { return x.id !== id; });
      localStorage.setItem("jardin_diario_local", JSON.stringify(arr));
    }
    cargarDiario();
    toast("Entrada eliminada");
  } catch (e) {
    toast("Error al eliminar entrada", "error");
  }
}

// ===== FAVORITOS (Soporte local y en la nube) =====
async function cargarFavs() {
  var el = document.getElementById("lista-favs");
  if (!el) return;
  el.innerHTML = "<div style='color:#4a6b4a;text-align:center;padding:20px;font-style:italic'>Cargando favoritos...</div>";
  try {
    var d = [];
    var esLocal = false;
    if (typeof currentUser !== "undefined" && currentUser) {
      d = ordenarPorFecha(await fsGetMine("favoritos"));
    } else {
      esLocal = true;
      d = JSON.parse(localStorage.getItem("jardin_favs_local") || "[]");
    }

    if (!d || d.length === 0) {
      el.innerHTML = "<div style='color:#6b9c6b;text-align:center;padding:20px;font-style:italic'>Aún no tienes favoritos. Abre cualquier planta y pulsa «⭐ Añadir a favoritos»."
        + (esLocal ? "<br><span style='font-size:11px;color:#4a6b4a;display:inline-block;margin-top:6px'>Guardado en este dispositivo (sin cuenta).</span>" : "")
        + "</div>";
      return;
    }

    var banner = esLocal ? "<div style='font-size:11px;color:#86efac;background:rgba(74,222,128,0.08);border:1px solid rgba(74,222,128,0.2);border-radius:8px;padding:6px 10px;margin-bottom:10px;text-align:center'>📱 Favoritos guardados en este dispositivo</div>" : "";

    el.innerHTML = banner + d.map(function (x) {
      var safeName = x.planta.replace(/'/g, "\\'");
      return "<div class='fav-item' style='background:rgba(255,255,255,0.04);border:1px solid rgba(134,239,172,0.12);border-radius:10px;padding:10px 12px;margin-bottom:8px;display:flex;align-items:center;gap:10px;cursor:pointer' onclick=\"abrirFav('" + safeName + "')\">"
        + "<span style='font-size:24px' aria-hidden='true'>" + x.emoji + "</span>"
        + "<span style='color:#86efac;font-size:13.5px;flex:1;font-weight:bold'>" + x.planta + "</span>"
        + "<button onclick=\"event.stopPropagation();quitarFav('" + x.id + "', '" + safeName + "')\" title='Quitar de favoritos' style='background:none;border:none;color:#f87171;font-size:15px;cursor:pointer;padding:4px 8px'>✕</button>"
        + "</div>";
    }).join("");
  } catch (e) {
    el.innerHTML = "<div style='color:#f87171;text-align:center;padding:20px'>Error al cargar favoritos</div>";
  }
}

// Devuelve true si quedó como favorito, false si se quitó.
async function toggleFav(nombre, emoji, silent) {
  try {
    if (typeof currentUser !== "undefined" && currentUser) {
      var mine = await fsGetMine("favoritos");
      var existente = mine.find(function (f) { return norm(f.planta) === norm(nombre); });
      if (existente) {
        await fsDel("favoritos", existente.id);
        if (!silent && typeof toast === "function") toast("Quitada de favoritos");
        cargarFavs();
        return false;
      } else {
        await fsAdd("favoritos", { uid: currentUser.id, planta: nombre, emoji: emoji });
        if (!silent && typeof toast === "function") toast("⭐ Añadida a favoritos");
        cargarFavs();
        return true;
      }
    } else {
      // LocalStorage
      var arr = JSON.parse(localStorage.getItem("jardin_favs_local") || "[]");
      var idx = -1;
      for (var i = 0; i < arr.length; i++) {
        if (norm(arr[i].planta) === norm(nombre)) {
          idx = i;
          break;
        }
      }
      if (idx > -1) {
        arr.splice(idx, 1);
        localStorage.setItem("jardin_favs_local", JSON.stringify(arr));
        if (!silent && typeof toast === "function") toast("Quitada de favoritos");
        cargarFavs();
        return false;
      } else {
        arr.push({
          id: "loc_fav_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
          planta: nombre,
          emoji: emoji || "🌱",
          created: { toMillis: function() { return Date.now(); } }
        });
        localStorage.setItem("jardin_favs_local", JSON.stringify(arr));
        if (!silent && typeof toast === "function") toast("⭐ Añadida a favoritos en este dispositivo");
        cargarFavs();
        return true;
      }
    }
  } catch (e) {
    if (typeof toast === "function") toast("Error al gestionar favorito", "error");
    return false;
  }
}

async function quitarFav(id, nombre) {
  try {
    if (typeof currentUser !== "undefined" && currentUser) {
      await fsDel("favoritos", id);
    } else {
      var arr = JSON.parse(localStorage.getItem("jardin_favs_local") || "[]");
      arr = arr.filter(function (x) {
        if (id && x.id === id) return false;
        if (nombre && norm(x.planta) === norm(nombre)) return false;
        return true;
      });
      localStorage.setItem("jardin_favs_local", JSON.stringify(arr));
    }
    cargarFavs();
    if (typeof render === "function" && typeof quickFilter !== "undefined" && quickFilter === "favs") {
      render();
    }
    toast("Planta quitada de favoritos");
  } catch (e) {
    toast("Error al quitar favorito", "error");
  }
}

function abrirFav(nombre) {
  cerrarPanel();
  abrir(nombre);
}

// ===== COMUNIDAD =====
async function cargarCom() {
  var el = document.getElementById("lista-com");
  if (!el) return;
  el.innerHTML = "<div style='color:#4a6b4a;text-align:center;padding:20px;font-style:italic'>Cargando trucos y experiencias...</div>";
  try {
    var d = ordenarPorFecha(await fsGetAll("comentarios"));
    if (!d || d.length === 0) { el.innerHTML = "<div style='color:#4a6b4a;text-align:center;padding:20px;font-style:italic'>Sin comentarios aún. ¡Sé el primero en compartir un truco!</div>"; return; }
    el.innerHTML = d.map(function (x) {
      var fe = (x.created && x.created.toDate) ? x.created.toDate().toLocaleDateString("es-ES") : "";
      return "<div style='background:rgba(255,255,255,0.04);border:1px solid rgba(134,239,172,0.12);border-radius:10px;padding:12px;margin-bottom:8px'>"
        + "<div style='display:flex;align-items:center;gap:8px;margin-bottom:5px'>"
        + "<span style='color:#4ade80;font-size:12px;font-weight:bold'>" + x.autor + "</span>"
        + "<span style='color:#6b9c6b;font-size:11px'>sobre " + x.planta + "</span>"
        + "<span style='color:#4a6b4a;font-size:10px;margin-left:auto'>" + fe + "</span>"
        + "</div>"
        + "<div style='color:#a3c4a3;font-size:12px;line-height:1.5'>" + x.texto + "</div>"
        + "</div>";
    }).join("");
  } catch (e) { el.innerHTML = "<div style='color:#f87171;text-align:center;padding:20px'>Error al cargar comentarios</div>"; }
}

async function guardarCom() {
  var pl = document.getElementById("cf-planta").value;
  var au = document.getElementById("cf-autor").value.trim() || "Anónimo";
  var tx = document.getElementById("cf-texto").value.trim();
  if (typeof currentUser === "undefined" || !currentUser) { toast("Inicia sesión para compartir en comunidad", "error"); mostrarAuth(); return; }
  if (!pl || !tx) { toast("Selecciona una planta y escribe tu truco", "error"); return; }
  if (tx.length < 10) { toast("Escribe al menos 10 caracteres", "error"); return; }
  try {
    await fsAdd("comentarios", { uid: currentUser.id, planta: pl, autor: au, texto: tx });
    document.getElementById("cf-texto").value = ""; cargarCom(); toast("💬 Truco compartido con éxito");
  } catch (e) { toast("Error al compartir", "error"); }
}

// ===== TIEMPO =====
async function cargarTiempo() {
  var el = document.getElementById("tiempo-box");
  if (!el) return;
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
    if (lluvia > 0) consejo = "Hay previsión de lluvia hoy. No es necesario regar.";
    else if (temp > 25) consejo = "Temperaturas altas. Riega preferiblemente al atardecer o temprano.";
    else if (temp < 5) consejo = "Temperaturas bajas. Protege las plantas más sensibles a heladas.";
    else if (temp >= 5 && temp <= 15) consejo = "Temperatura ideal para trabajar la tierra y trasplantar.";
    else consejo = "Tiempo agradable para el cuidado del jardín.";

    var html = "<div style='background:rgba(74,222,128,0.08);border:1px solid rgba(134,239,172,0.2);border-radius:14px;padding:20px;text-align:center;margin-bottom:14px'>"
      + "<div style='font-size:52px'>" + getIco(cod) + "</div>"
      + "<div style='font-size:44px;color:#86efac;margin:8px 0'>" + temp + "°C</div>"
      + "<div style='color:#a3c4a3;font-size:14px'>" + getDesc(cod) + "</div>"
      + "<div style='color:#6b9c6b;font-size:12px;margin-top:8px'>Viento: " + viento + " km/h · Lluvia: " + lluvia + " mm</div>"
      + "</div>"
      + "<div style='background:rgba(251,191,36,0.1);border:1px solid rgba(251,191,36,0.3);border-radius:10px;padding:12px;color:#fde68a;font-size:12px;margin-bottom:14px'>" + consejo + "</div>";

    if (d.daily) {
      var dias = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
      html += "<div style='font-size:13px;color:#86efac;font-weight:bold;margin-bottom:8px'>Próximos 7 días</div>";
      html += "<div style='display:flex;flex-direction:column;gap:6px'>";
      for (var i = 0; i < 7; i++) {
        var fecha = new Date(d.daily.time[i]);
        var diaNom = dias[fecha.getDay()];
        var max = Math.round(d.daily.temperature_2m_max[i]);
        var min = Math.round(d.daily.temperature_2m_min[i]);
        var lluviaD = d.daily.precipitation_sum[i];
        var icoD = getIco(d.daily.weathercode[i]);
        html += "<div style='background:rgba(255,255,255,0.03);border:1px solid rgba(134,239,172,0.1);border-radius:8px;padding:8px 12px;display:flex;align-items:center;gap:10px'>"
          + "<span style='color:#6b9c6b;font-size:12px;width:32px'>" + diaNom + "</span>"
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

// ===== HUERTO EN LA NUBE (mapa + riego por cuenta) =====
async function cargarHuerto() {
  if (!currentUser) return;
  try {
    var doc = await db.collection("huerto").doc(currentUser.id).get();
    if (doc.exists) {
      var data = doc.data();
      if (data.mapa) { mapaData = data.mapa; localStorage.setItem("jardin_mapa", JSON.stringify(mapaData)); }
      if (data.riego) { riegoData = data.riego; localStorage.setItem("jardin_riego", JSON.stringify(riegoData)); }
    }
  } catch (e) { }
  if (typeof mostrarRecordatoriosRiego === "function") mostrarRecordatoriosRiego();
  var pmapa = document.getElementById("pmapa");
  if (pmapa && pmapa.style.display !== "none" && typeof cargarMapa === "function") cargarMapa();
}

async function guardarHuerto() {
  if (!currentUser) return;
  try {
    await db.collection("huerto").doc(currentUser.id).set({ mapa: mapaData, riego: riegoData }, { merge: true });
  } catch (e) { }
}

// ===== RECORDATORIOS DE RIEGO =====
var riegoData = JSON.parse(localStorage.getItem("jardin_riego") || "{}");

function guardarRiego(planta) {
  riegoData[planta] = new Date().toISOString().split("T")[0];
  localStorage.setItem("jardin_riego", JSON.stringify(riegoData));
  guardarHuerto();
}

function diasSinRegar(planta) {
  if (!riegoData[planta]) {
    // Buscar con normalización si es necesario
    var k = Object.keys(riegoData).find(function(key) { return norm(key) === norm(planta); });
    if (!k) return null;
    planta = k;
  }
  var ultimo = new Date(riegoData[planta]);
  var hoy = new Date();
  return Math.floor((hoy - ultimo) / (1000 * 60 * 60 * 24));
}

function mostrarRecordatoriosRiego() {
  var previo = document.getElementById("riego-reminder");
  if (previo) previo.remove();
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
  wrap.id = "riego-reminder";
  wrap.style.cssText = "background:rgba(96,165,250,0.08);border:1px solid rgba(96,165,250,0.25);border-radius:14px;padding:12px 16px;margin-top:10px";
  wrap.innerHTML = "<div style='font-size:12px;color:#60a5fa;font-weight:bold;margin-bottom:8px'>💧 Pendiente de regar</div>";
  var tags = document.createElement("div");
  tags.style.cssText = "display:flex;flex-wrap:wrap;gap:6px";
  alertas.slice(0, 6).forEach(function (a) {
    var sp = document.createElement("button");
    sp.type = "button";
    sp.className = "alerta-tag";
    sp.style.cssText = "background:rgba(96,165,250,0.1);border:1px solid rgba(96,165,250,0.25);border-radius:20px;padding:4px 12px;color:#93c5fd;font-size:11.5px";
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
  if (!el) return;
  el.innerHTML = "<div style='color:#4a6b4a;text-align:center;padding:20px;font-style:italic'>Cargando estadísticas...</div>";
  try {
    var diario = [];
    var favs = [];
    var coms = [];

    if (typeof currentUser !== "undefined" && currentUser) {
      diario = await fsGetMine("diario");
      favs = await fsGetMine("favoritos");
    } else {
      diario = JSON.parse(localStorage.getItem("jardin_diario_local") || "[]");
      favs = JSON.parse(localStorage.getItem("jardin_favs_local") || "[]");
    }

    try {
      coms = await fsGetAll("comentarios");
    } catch (e) { }

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
      var pp = P.find(function (x) { return x.n === topPlanta || norm(x.n) === norm(topPlanta); });
      html += "<div style='background:rgba(74,222,128,0.06);border:1px solid rgba(74,222,128,0.15);border-radius:10px;padding:12px;margin-bottom:12px;display:flex;align-items:center;gap:10px'>";
      html += "<span style='font-size:28px'>" + (pp ? pp.e : "🌱") + "</span>";
      html += "<div><div style='color:#86efac;font-size:12px;font-weight:bold'>Tu planta más cuidada</div><div style='color:#a3c4a3;font-size:13px'>" + topPlanta + " (" + porPlanta[topPlanta] + " entradas)</div></div></div>";
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
      html += "<div style='color:#6b9c6b;font-size:12px;text-align:center;font-style:italic;margin-top:10px'>Usa el diario y los favoritos para ver tus estadísticas aquí.</div>";
    }

    el.innerHTML = html;
  } catch (e) {
    el.innerHTML = "<div style='color:#f87171;text-align:center;padding:20px'>Error al cargar estadísticas</div>";
  }
}

// ===== MAPA DEL JARDÍN =====
var mapaData = JSON.parse(localStorage.getItem("jardin_mapa") || "{}");
var mapaSeleccionada = null;
var MAPA_FILAS = 8;
var MAPA_COLS = 10;

function cargarMapa() {
  var el = document.getElementById("mapa-contenido");
  if (!el) return;
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
      var pp = val ? P.find(function (x) { return x.n === val || norm(x.n) === norm(val); }) : null;
      var cell = document.createElement("div");
      cell.id = "mc-" + key;
      cell.title = val || "Vacío";
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
      var pp = P.find(function (x) { return x.n === n || norm(x.n) === norm(n); });
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

  var pp = P.find(function (x) { return x.n === planta || norm(x.n) === norm(planta); });
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
  guardarHuerto();
}

function limpiarMapa() {
  if (!confirm("¿Deseas borrar todo el mapa del jardín?")) return;
  mapaData = {};
  guardarMapa();
  cargarMapa();
}

