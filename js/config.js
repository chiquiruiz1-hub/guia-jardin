// ===== CONFIGURACIÓN DE SUPABASE =====
// IMPORTANTE: En producción, estas claves deben estar en variables de entorno
// La clave "anon" es pública y segura para el cliente (con RLS activado en Supabase)
var SBURL = "https://reeaclyyhwukhwbnfacv.supabase.co";
var SBKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlZWFjbHl5aHd1a2h3Ym5mYWN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2MzkyMjYsImV4cCI6MjA5MTIxNTIyNn0.bY4mSUz_OwfIgofqTYYZBNIYX9WzR5p6NxE28bnbB-g";

// ===== HELPERS DE SUPABASE =====
function sbH() {
  return {
    "Content-Type": "application/json",
    "apikey": SBKEY,
    "Authorization": "Bearer " + getToken()
  };
}

async function sbGet(t, f) {
  var r = await fetch(SBURL + "/rest/v1/" + t + "?order=created_at.desc&limit=50" + (f || ""), { headers: sbH() });
  return await r.json();
}

async function sbPost(t, d) {
  var r = await fetch(SBURL + "/rest/v1/" + t, {
    method: "POST",
    headers: Object.assign({}, sbH(), { "Prefer": "return=minimal" }),
    body: JSON.stringify(d)
  });
  return r.ok;
}

async function sbDel(t, id) {
  var r = await fetch(SBURL + "/rest/v1/" + t + "?id=eq." + id, { method: "DELETE", headers: sbH() });
  return r.ok;
}

function getToken() {
  return localStorage.getItem("sb_token") || SBKEY;
}

function getUserFilter() {
  if (currentUser) return "&user_id=eq." + currentUser.id;
  return "";
}

function getAuthHeaders() {
  var token = getToken();
  return { "Content-Type": "application/json", "apikey": SBKEY, "Authorization": "Bearer " + token };
}
