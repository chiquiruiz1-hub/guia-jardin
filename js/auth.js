// ===== AUTENTICACIÓN =====
var currentUser = null;

async function checkSession() {
  try {
    var r = await fetch(SBURL + "/auth/v1/user", {
      headers: { "apikey": SBKEY, "Authorization": "Bearer " + getToken() }
    });
    if (r.ok) {
      var d = await r.json();
      if (d.id) { currentUser = d; actualizarUI(); return; }
    }
  } catch (e) { }
  currentUser = null;
  actualizarUI();
}

function actualizarUI() {
  var ui = document.getElementById("user-info");
  var noui = document.getElementById("no-login-info");
  if (currentUser) {
    if (ui) { ui.style.display = "flex"; }
    if (noui) { noui.style.display = "none"; }
    var em = document.getElementById("user-email");
    if (em) em.textContent = "✓ " + currentUser.email;
  } else {
    if (ui) { ui.style.display = "none"; }
    if (noui) { noui.style.display = "flex"; }
  }
}

function mostrarAuth() {
  var o = document.getElementById("auth-overlay");
  if (o) { o.style.display = "flex"; }
}

function cerrarAuth() {
  var o = document.getElementById("auth-overlay");
  if (o) { o.style.display = "none"; }
}

function authTab(tab) {
  var tl = document.getElementById("tab-login");
  var tr = document.getElementById("tab-reg");
  var btn = document.getElementById("auth-btn");
  if (tab === "login") {
    tl.style.color = "#4ade80"; tl.style.borderBottom = "2px solid #4ade80";
    tr.style.color = "#6b9c6b"; tr.style.borderBottom = "2px solid transparent";
    btn.textContent = "Entrar";
  } else {
    tr.style.color = "#4ade80"; tr.style.borderBottom = "2px solid #4ade80";
    tl.style.color = "#6b9c6b"; tl.style.borderBottom = "2px solid transparent";
    btn.textContent = "Crear cuenta";
  }
  document.getElementById("auth-error").style.display = "none";
  document.getElementById("auth-ok").style.display = "none";
}

async function doAuth() {
  var email = document.getElementById("auth-email").value.trim();
  var pass = document.getElementById("auth-pass").value;
  var errEl = document.getElementById("auth-error");
  var okEl = document.getElementById("auth-ok");
  var btn = document.getElementById("auth-btn");
  var isReg = btn.textContent === "Crear cuenta";

  errEl.style.display = "none";
  okEl.style.display = "none";

  if (!email || !pass) { errEl.textContent = "Rellena email y contraseña"; errEl.style.display = "block"; return; }
  if (pass.length < 6) { errEl.textContent = "La contraseña debe tener al menos 6 caracteres"; errEl.style.display = "block"; return; }

  btn.textContent = isReg ? "Creando cuenta..." : "Entrando...";
  btn.disabled = true;

  try {
    var endpoint = isReg ? "/auth/v1/signup" : "/auth/v1/token?grant_type=password";
    var r = await fetch(SBURL + endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "apikey": SBKEY },
      body: JSON.stringify({ email: email, password: pass })
    });
    var d = await r.json();

    if (d.access_token) {
      localStorage.setItem("sb_token", d.access_token);
      currentUser = d.user;
      actualizarUI();
      cerrarAuth();
      if (isReg) {
        okEl.textContent = "Cuenta creada. Bienvenido/a!";
        okEl.style.display = "block";
      }
      cargarDiario();
    } else if (isReg && d.id) {
      okEl.textContent = "Cuenta creada. Revisa tu email para confirmar.";
      okEl.style.display = "block";
    } else {
      var msg = d.error_description || d.msg || "Error al iniciar sesión";
      if (msg.includes("Invalid login")) msg = "Email o contraseña incorrectos";
      if (msg.includes("already registered")) msg = "Este email ya está registrado. Usa Entrar.";
      errEl.textContent = msg;
      errEl.style.display = "block";
    }
  } catch (e) {
    errEl.textContent = "Error de conexión. Inténtalo de nuevo.";
    errEl.style.display = "block";
  }

  btn.textContent = isReg ? "Crear cuenta" : "Entrar";
  btn.disabled = false;
}

async function doLogout() {
  try {
    await fetch(SBURL + "/auth/v1/logout", {
      method: "POST",
      headers: { "apikey": SBKEY, "Authorization": "Bearer " + getToken() }
    });
  } catch (e) { }
  localStorage.removeItem("sb_token");
  currentUser = null;
  actualizarUI();
  cargarDiario();
  cargarFavs();
}
