/* ============================================================
   1. PETA DAN BASEMAP
   ============================================================ */
const map = L.map('map', { zoomControl: true }).setView([3.5952, 98.6722], 12);

/* Splash screen: tampil 1,5 detik, lalu beri Leaflet ruang untuk menghitung ulang kanvasnya. */
const landingPage = document.getElementById('landingPage');
if (landingPage) {
  window.setTimeout(function () {
    landingPage.classList.add('is-leaving');
    window.setTimeout(function () {
      landingPage.hidden = true;
      map.invalidateSize();
    }, 600);
  }, 1500);
}

const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const terang = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  maxZoom: 20,
  attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>'
});

const satelit = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  maxZoom: 19,
  attribution: 'Imagery &copy; Esri'
});

/* ============================================================
   2. WARNA PER KATEGORI
   ============================================================ */
const kategoriWarna = {
  'Kesehatan':     '#b91c1c',
  'Pendidikan':    '#1d4ed8',
  'Ruang Terbuka': '#15803d',
  'Transportasi':  '#7c3aed'
};

/* ============================================================
   3. BACA DATA GEOJSON, BUAT MARKER, POPUP, DAN LAYER PER KATEGORI
   ============================================================ */
const grup = {};
const jumlah = {};
Object.keys(kategoriWarna).forEach(function (k) {
  grup[k] = L.layerGroup().addTo(map);
  jumlah[k] = 0;
});

const semuaFitur = [];

const geoLayer = L.geoJSON(dataFasilitas, {
  pointToLayer: function (f, latlng) {
    return L.circleMarker(latlng, {
      radius: 9,
      color: '#ffffff',
      weight: 2,
      fillColor: kategoriWarna[f.properties.kategori] || '#6b7280',
      fillOpacity: 1
    });
  },
  onEachFeature: function (f, layer) {
    const p = f.properties;
    layer.bindPopup(
      '<b>' + p.nama + '</b><br>' +
      'Kategori: ' + p.kategori + '<br>' +
      'Alamat: ' + p.alamat + '<br>' +
      '<small>Sumber: ' + p.sumber + '</small>'
    );
    layer.bindTooltip(p.nama, { direction: 'top', offset: [0, -8] });

    if (grup[p.kategori]) {
      grup[p.kategori].addLayer(layer);
      jumlah[p.kategori]++;
    }
    semuaFitur.push(layer);
  }
});

if (semuaFitur.length > 0) {
  map.fitBounds(geoLayer.getBounds().pad(0.1));
}

/* ============================================================
   4. LAYER CONTROL: 3 basemap + layer tematik per kategori
   ============================================================ */
const basemaps = {
  'OpenStreetMap': osm,
  'CARTO Terang': terang,
  'Citra satelit Esri': satelit
};

const overlays = {};
Object.keys(grup).forEach(function (k) {
  overlays[k + ' (' + jumlah[k] + ')'] = grup[k];
});

L.control.layers(basemaps, overlays, {
  collapsed: window.innerWidth < 600
}).addTo(map);

/* ============================================================
   5. SKALA DAN LEGENDA
   ============================================================ */
L.control.scale({ imperial: false }).addTo(map);

const legenda = L.control({ position: 'bottomright' });
legenda.onAdd = function () {
  const div = L.DomUtil.create('div', 'legend');
  let html = '<b>Legenda</b><br>';
  Object.keys(kategoriWarna).forEach(function (k) {
    html += '<span><i style="background:' + kategoriWarna[k] + '"></i>' + k + '</span><br>';
  });
  html += '<small>Lihat README untuk sumber data</small>';
  div.innerHTML = html;
  L.DomEvent.disableClickPropagation(div);
  return div;
};
legenda.addTo(map);

/* ============================================================
   6. MODE INTERAKSI: LIHAT DETAIL, UKUR JARAK, UKUR LUAS
   ============================================================ */
const info = document.getElementById('info');
const pesanMode = {
  lihat: 'Klik titik di peta untuk melihat detail.',
  jarak: 'Klik berurutan di peta untuk mengukur jarak.',
  luas:  'Klik minimal 3 titik di peta untuk mengukur luas.'
};

let mode = 'lihat';
let titikUkur = [];
const ukurLayer = L.layerGroup().addTo(map);

function fmtJarak(m) {
  return m >= 1000 ? (m / 1000).toFixed(2) + ' km' : Math.round(m) + ' m';
}

function fmtLuas(m2) {
  return m2 >= 1e6
    ? (m2 / 1e6).toFixed(2) + ' km²'
    : Math.round(m2).toLocaleString('id-ID') + ' m²';
}

function jarakTotal(titik) {
  let total = 0;
  for (let i = 1; i < titik.length; i++) {
    total += titik[i - 1].distanceTo(titik[i]);
  }
  return total;
}

function luasSferis(titik) {
  const R = 6378137;
  const rad = Math.PI / 180;
  let jumlahSuku = 0;
  for (let i = 0; i < titik.length; i++) {
    const a = titik[i];
    const b = titik[(i + 1) % titik.length];
    let dLng = b.lng - a.lng;
    if (dLng > 180) dLng -= 360;
    if (dLng < -180) dLng += 360;
    jumlahSuku += dLng * rad * (2 + Math.sin(a.lat * rad) + Math.sin(b.lat * rad));
  }
  return Math.abs(jumlahSuku * R * R / 2);
}

function gambarUkur() {
  ukurLayer.clearLayers();
  titikUkur.forEach(function (p) {
    L.circleMarker(p, {
      radius: 4, color: '#b45309', weight: 1,
      fillColor: '#fbbf24', fillOpacity: 1
    }).addTo(ukurLayer);
  });
  if (mode === 'jarak' && titikUkur.length >= 2) {
    L.polyline(titikUkur, { color: '#b45309', weight: 4, dashArray: '8 6' }).addTo(ukurLayer);
  }
  if (mode === 'luas' && titikUkur.length >= 3) {
    L.polygon(titikUkur, {
      color: '#15803d', weight: 3, fillColor: '#22c55e', fillOpacity: 0.25
    }).addTo(ukurLayer);
  }
}

document.querySelectorAll('button[data-mode]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    mode = btn.dataset.mode;
    titikUkur = [];
    ukurLayer.clearLayers();
    document.querySelectorAll('button[data-mode]').forEach(function (b) {
      const aktif = b === btn;
      b.classList.toggle('aktif', aktif);
      b.setAttribute('aria-pressed', aktif ? 'true' : 'false');
    });
    info.textContent = pesanMode[mode];
  });
});

map.on('click', function (e) {
  if (mode === 'jarak') {
    titikUkur.push(e.latlng);
    gambarUkur();
    if (titikUkur.length < 2) {
      info.textContent = 'Klik titik berikutnya untuk menghitung jarak.';
    } else {
      info.textContent = 'Jarak total: ' + fmtJarak(jarakTotal(titikUkur)) +
        ' dari ' + titikUkur.length + ' titik (garis lurus).';
    }
  } else if (mode === 'luas') {
    titikUkur.push(e.latlng);
    gambarUkur();
    if (titikUkur.length < 3) {
      info.textContent = 'Tambahkan ' + (3 - titikUkur.length) + ' titik lagi.';
    } else {
      info.textContent = 'Luas area: ' + fmtLuas(luasSferis(titikUkur)) +
        ' (' + titikUkur.length + ' titik).';
    }
  }
});

/* ============================================================
   7. LOKASI SAYA DAN FASILITAS TERDEKAT
   ============================================================ */
const userLayer = L.layerGroup().addTo(map);

document.getElementById('btnLokasi').addEventListener('click', function () {
  info.textContent = 'Mencari lokasi Anda...';
  map.locate({ setView: false, enableHighAccuracy: true, timeout: 10000 });
});

map.on('locationfound', function (e) {
  userLayer.clearLayers();

  L.circle(e.latlng, {
    radius: e.accuracy, color: '#0369a1', weight: 1,
    fillColor: '#0369a1', fillOpacity: 0.1
  }).addTo(userLayer);

  L.circleMarker(e.latlng, {
    radius: 7, color: '#ffffff', weight: 2,
    fillColor: '#0369a1', fillOpacity: 1
  }).addTo(userLayer).bindPopup('Lokasi Anda (akurasi ±' + Math.round(e.accuracy) + ' m)').openPopup();

  let terdekat = null;
  let jarakMin = Infinity;
  semuaFitur.forEach(function (layer) {
    if (!map.hasLayer(layer)) return;
    const d = e.latlng.distanceTo(layer.getLatLng());
    if (d < jarakMin) {
      jarakMin = d;
      terdekat = layer;
    }
  });

  if (terdekat) {
    const posisi = terdekat.getLatLng();
    L.polyline([e.latlng, posisi], {
      color: '#b45309', weight: 4, dashArray: '8 6'
    }).addTo(userLayer);
    terdekat.openPopup();
    map.fitBounds(L.latLngBounds([e.latlng, posisi]).pad(0.3));
    info.textContent = 'Fasilitas terdekat: ' + terdekat.feature.properties.nama +
      ', ' + fmtJarak(jarakMin) + ' (garis lurus, bukan jarak tempuh).';
  } else {
    info.textContent = 'Aktifkan minimal satu kategori pada Layer Control untuk mencari fasilitas terdekat.';
  }
});

map.on('locationerror', function () {
  info.textContent = 'Lokasi tidak dapat diakses. Izinkan akses lokasi pada browser, lalu coba lagi.';
});

/* ============================================================
   8. BERSIHKAN HASIL UKUR DAN LOKASI
   ============================================================ */
document.getElementById('btnBersihkan').addEventListener('click', function () {
  titikUkur = [];
  ukurLayer.clearLayers();
  userLayer.clearLayers();
  if (semuaFitur.length > 0) {
    map.fitBounds(geoLayer.getBounds().pad(0.1));
  }
  info.textContent = 'Peta dibersihkan. ' + pesanMode[mode];
});
