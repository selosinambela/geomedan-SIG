# GeoMedan SIG

Peta web interaktif untuk mengeksplorasi 15 fasilitas publik dan ruang terbuka di Kota Medan. Proyek ini dibuat sebagai penerapan SIG Web berbasis Leaflet, dengan fokus pada akses informasi fasilitas, interaksi peta, dan keterkaitannya dengan SDG 9 serta SDG 11.

## Tujuan

Informasi lokasi fasilitas publik sering tersebar dan sulit dibandingkan secara spasial. Peta ini menyajikan lokasi fasilitas kesehatan, pendidikan, transportasi, dan ruang terbuka dalam satu antarmuka agar pengguna dapat melihat persebaran, memeriksa atribut, mengukur area atau jarak, serta menemukan fasilitas aktif yang paling dekat dari lokasinya.

## Kesesuaian dengan SDG

- **SDG 9 — Industri, Inovasi, dan Infrastruktur:** memanfaatkan peta web dan data spasial terbuka sebagai media informasi digital yang ringan dan mudah diakses.
- **SDG 11 — Kota dan Permukiman Berkelanjutan:** membantu visualisasi akses terhadap layanan kesehatan, pendidikan, transportasi, dan ruang terbuka kota.

## Fitur

| Area | Implementasi |
| --- | --- |
| Basemap | OpenStreetMap, CARTO Terang, dan Esri World Imagery |
| Data tematik | 15 titik GeoJSON: kesehatan (4), pendidikan (4), ruang terbuka (4), dan transportasi (3) |
| Informasi fitur | Marker, tooltip nama, dan popup berisi kategori, alamat, serta sumber data |
| Kontrol peta | Layer control, legenda, skala, dan tombol zoom Leaflet |
| Analisis sederhana | Pengukuran jarak garis lurus dan luas area menggunakan titik klik pengguna |
| Lokasi pengguna | Geolokasi berbasis izin browser dan pencarian fasilitas aktif terdekat |
| Pengalaman pengguna | Splash screen ringkas, tema editorial responsif, fokus keyboard, dan layout aman pada lebar 375 px |

## Kesesuaian terhadap rubrik proyek

| Kriteria | Hasil pada proyek |
| --- | --- |
| Peta tampil dan stabil | Leaflet 1.9.4 memuat peta dasar dari penyedia tile yang dipilih pengguna. |
| Data spasial terikat | Semua fasilitas berada di `data.js` sebagai GeoJSON dan memiliki popup informatif. |
| Interaktivitas | Tersedia pengaturan layer, event klik, pengukuran jarak/luas, dan geolokasi. |
| Desain dan aksesibilitas | Kontras warna, legenda, atribusi, label ARIA, status live, serta tampilan responsif disediakan. |
| Dokumentasi dan publikasi | README ini menjelaskan penggunaan, sumber data, dan proses deploy GitHub Pages. |

## Struktur proyek

```text
geomedan-SIG/
├── index.html     # Struktur halaman dan dependensi eksternal
├── style.css      # Tema editorial, responsivitas, dan komponen Leaflet
├── script.js      # Peta, layer, popup, pengukuran, dan geolokasi
├── data.js        # Salinan GeoJSON siap-pakai untuk browser tanpa server
├── data/
│   └── fasilitas-medan.geojson  # Data spasial mandiri berformat GeoJSON
└── README.md      # Dokumentasi proyek
```

## Menjalankan secara lokal

1. Clone repositori ini atau unduh seluruh berkasnya.
2. Buka `index.html` melalui browser modern. Koneksi internet diperlukan untuk font, Leaflet, dan tile basemap.
3. Untuk menguji geolokasi secara lebih konsisten, jalankan melalui server lokal, misalnya ekstensi Live Server di VS Code.

## Cara menggunakan

1. Pilih basemap atau aktif/nonaktifkan kategori melalui **Layer Control** di kanan atas peta.
2. Klik sebuah titik untuk membaca detail fasilitas pada popup.
3. Pilih **Ukur jarak** lalu klik beberapa lokasi pada peta untuk memperoleh total jarak garis lurus.
4. Pilih **Ukur luas** lalu klik sedikitnya tiga titik untuk memperoleh estimasi luas area.
5. Pilih **Lokasi saya dan terdekat**, izinkan akses lokasi pada browser, lalu peta akan menampilkan fasilitas aktif yang paling dekat.
6. Gunakan **Bersihkan** untuk menghapus hasil pengukuran dan lokasi sementara.

## Data dan batasan

- `data/fasilitas-medan.geojson` adalah berkas data spasial mandiri berformat standar GeoJSON. `data.js` memuat salinan data yang sama agar aplikasi tetap dapat dibuka langsung tanpa permintaan `fetch` atau server lokal.
- Data memuat 15 fasilitas pilihan di Kota Medan, bukan inventaris lengkap seluruh fasilitas kota.
- Koordinat disimpan dalam format GeoJSON `[longitude, latitude]` dan setiap fitur mencantumkan sumber serta tanggal pengambilan pada propertinya.
- Jarak yang ditampilkan adalah garis lurus, bukan estimasi rute jalan atau waktu tempuh.
- Hasil luas adalah perhitungan geodesik sederhana dari titik klik; bukan ukuran legal atau survei lapangan.
- Ketelitian lokasi bergantung pada perangkat, browser, dan izin pengguna.

## Privasi dan keamanan

Tombol geolokasi tidak aktif otomatis: browser hanya diminta mengakses lokasi setelah pengguna menekan **Lokasi saya dan terdekat**. Lokasi digunakan di dalam sesi peta untuk visualisasi dan pencarian terdekat, tidak dikirim ke server aplikasi ini, serta tidak disimpan oleh kode proyek.

## Sumber dan atribusi

- Data fasilitas: Google Maps dan OpenStreetMap, sebagaimana dicatat pada setiap fitur di `data.js`.
- Basemap: [OpenStreetMap](https://www.openstreetmap.org/copyright), [CARTO](https://carto.com/attributions), dan Esri World Imagery.
- Library peta: [Leaflet 1.9.4](https://leafletjs.com/).

## Deploy ke GitHub Pages

Setelah berkas diunggah ke branch `main`:

1. Buka **Settings** → **Pages** pada repositori GitHub.
2. Pada **Build and deployment**, pilih **Deploy from a branch**.
3. Pilih branch `main` dan folder `/(root)`, lalu simpan.
4. Setelah proses deploy selesai, peta akan tersedia di:

   `https://selosinambela.github.io/geomedan-SIG/`

## Pengujian singkat

- Pastikan tiga basemap dapat dipilih.
- Pastikan tiap kategori pada Layer Control dapat diaktifkan dan dinonaktifkan.
- Klik beberapa marker untuk memeriksa popup dan tooltip.
- Uji mode jarak, luas, dan tombol bersihkan.
- Uji geolokasi pada halaman HTTPS/GitHub Pages dan berikan izin browser.
- Periksa tampilan pada lebar 375 px.

## Pembuat

Vaidon Shello Sinambela · NIM 241712052
Pengembangan SIG Web
