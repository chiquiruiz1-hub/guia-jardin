// ===== PWA - MANIFEST Y SERVICE WORKER =====
function instalarPWA() {
  var manifest = {
    name: "Guia de Jardin",
    short_name: "Jardin",
    description: "Guia completa de jardineria adaptada a tu ciudad",
    start_url: "/",
    display: "standalone",
    background_color: "#0f1a0f",
    theme_color: "#0f1a0f",
    icons: [
      { src: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌱</text></svg>", sizes: "192x192", type: "image/svg+xml" },
      { src: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌱</text></svg>", sizes: "512x512", type: "image/svg+xml" }
    ]
  };
  var blob = new Blob([JSON.stringify(manifest)], { type: "application/json" });
  var url = URL.createObjectURL(blob);
  document.getElementById("manifest-placeholder").setAttribute("href", url);

  if ("serviceWorker" in navigator) {
    var sw = "self.addEventListener('fetch',function(e){e.respondWith(fetch(e.request).catch(function(){return caches.match(e.request);}));});self.addEventListener('install',function(e){e.waitUntil(caches.open('jardin-v1').then(function(c){return c.addAll(['/']);}));});";
    var swBlob = new Blob([sw], { type: "application/javascript" });
    var swUrl = URL.createObjectURL(swBlob);
    navigator.serviceWorker.register(swUrl).catch(function () { });
  }
}

var deferredPrompt = null;
window.addEventListener("beforeinstallprompt", function (e) {
  e.preventDefault();
  deferredPrompt = e;
  mostrarBotonInstalar();
});

function mostrarBotonInstalar() {
  var btn = document.getElementById("btn-instalar");
  if (btn) btn.style.display = "flex";
}

function instalarApp() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function () { deferredPrompt = null; });
  }
}
