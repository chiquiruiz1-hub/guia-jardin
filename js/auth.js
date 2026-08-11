// ===== AUTENTICACIÓN (Firebase) =====
var currentUser = null;

// Escucha el estado de sesión. Se dispara al cargar y en cada login/logout.
function checkSession() {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      currentUser = { id: user.uid, uid: user.uid, email: user.email };
    } else {
      currentUser = null;
    }
    actualizarUI();
    // Recargar datos que dependen del usuario
    if (typeof cargarDiario === "function") cargarDiario();
    if (typeof cargarFavs === "function") cargarFavs();
    if (typeof cargarHuerto === "function") cargarHuerto();
  });
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
    if (isReg) {
      await auth.createUserWithEmailAndPassword(email, pass);
    } else {
      await auth.signInWithEmailAndPassword(email, pass);
    }
    // onAuthStateChanged se encarga de currentUser, la UI y recargar los datos.
    cerrarAuth();
    if (typeof toast === "function") toast(isReg ? "🌱 Cuenta creada. ¡Bienvenido/a!" : "✓ Sesión iniciada");
  } catch (e) {
    var msg = "Error al iniciar sesión";
    var code = e && e.code ? e.code : "";
    if (code === "auth/invalid-credential" || code === "auth/wrong-password" || code === "auth/user-not-found") msg = "Email o contraseña incorrectos";
    else if (code === "auth/email-already-in-use") msg = "Este email ya está registrado. Usa Entrar.";
    else if (code === "auth/weak-password") msg = "La contraseña debe tener al menos 6 caracteres";
    else if (code === "auth/invalid-email") msg = "Email no válido";
    else if (code === "auth/network-request-failed") msg = "Error de conexión. Inténtalo de nuevo.";
    errEl.textContent = msg;
    errEl.style.display = "block";
  }

  btn.textContent = isReg ? "Crear cuenta" : "Entrar";
  btn.disabled = false;
}

async function doLogout() {
  try {
    await auth.signOut();
    // onAuthStateChanged actualiza la UI y limpia los datos.
    if (typeof toast === "function") toast("Sesión cerrada");
  } catch (e) { }
}
