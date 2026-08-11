// ===== CONFIGURACIÓN DE FIREBASE =====
// La configuración web de Firebase es pública (va en el cliente).
// La seguridad real la dan las reglas de Firestore + Firebase Auth.
var firebaseConfig = {
  apiKey: "AIzaSyAuGfs-GpV3gsfmngbEJCkl6Joa9J_-7Ws",
  authDomain: "guia-jardin.firebaseapp.com",
  projectId: "guia-jardin",
  storageBucket: "guia-jardin.firebasestorage.app",
  messagingSenderId: "707422593152",
  appId: "1:707422593152:web:830c5f67bd3f32577e4665"
};

firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var db = firebase.firestore();

// ===== HELPERS DE FIRESTORE =====
// Devuelve todos los documentos de una colección (con su id).
async function fsGetAll(col) {
  var snap = await db.collection(col).get();
  return snap.docs.map(function (d) { var o = d.data(); o.id = d.id; return o; });
}

// Devuelve solo los documentos del usuario actual (campo uid).
async function fsGetMine(col) {
  if (!currentUser) return [];
  var snap = await db.collection(col).where("uid", "==", currentUser.id).get();
  return snap.docs.map(function (d) { var o = d.data(); o.id = d.id; return o; });
}

// Ordena por fecha de creación descendente (timestamp de Firestore).
function ordenarPorFecha(arr) {
  return arr.sort(function (a, b) {
    var ta = a.created && a.created.toMillis ? a.created.toMillis() : 0;
    var tb = b.created && b.created.toMillis ? b.created.toMillis() : 0;
    return tb - ta;
  });
}

// Crea un documento (añade marca de tiempo del servidor).
async function fsAdd(col, data) {
  data.created = firebase.firestore.FieldValue.serverTimestamp();
  await db.collection(col).add(data);
  return true;
}

// Borra un documento por id.
async function fsDel(col, id) {
  await db.collection(col).doc(id).delete();
  return true;
}
