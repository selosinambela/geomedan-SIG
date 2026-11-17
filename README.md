# GeoMedan SIG

**[Buka peta interaktif](https://selosinambela.github.io/geomedan-SIG/)**

GeoMedan SIG adalah peta web interaktif yang menampilkan 15 fasilitas publik dan ruang terbuka di Kota Medan. Peta ini dirancang untuk memudahkan pengunjung mengeksplorasi sebaran lokasi, membaca informasi fasilitas, dan melakukan analisis spasial sederhana.

## Mengapa peta ini dibuat?

Informasi fasilitas publik sering tersebar di berbagai sumber dan sulit dibandingkan berdasarkan lokasi. GeoMedan SIG menyatukan fasilitas kesehatan, pendidikan, transportasi, dan ruang terbuka dalam satu peta yang mudah digunakan.

Peta ini mendukung:

- **SDG 9 — Industri, Inovasi, dan Infrastruktur**, melalui pemanfaatan peta web dan data spasial terbuka.
- **SDG 11 — Kota dan Permukiman Berkelanjutan**, melalui visualisasi akses terhadap layanan dan ruang terbuka kota.

## Yang dapat dilakukan

| Fitur | Kegunaan |
| --- | --- |
| Pilih basemap | Bandingkan konteks lokasi dengan OpenStreetMap, CARTO Terang, atau citra Esri. |
| Tampilkan kategori | Aktifkan atau sembunyikan fasilitas kesehatan, pendidikan, ruang terbuka, dan transportasi. |
| Baca detail lokasi | Klik titik pada peta untuk melihat nama, kategori, alamat, dan sumber data. |
| Ukur jarak | Hitung total jarak garis lurus dari beberapa titik yang diklik. |
| Ukur luas | Perkirakan luas area dari sedikitnya tiga titik yang diklik. |
| Cari fasilitas terdekat | Gunakan lokasi perangkat untuk menemukan fasilitas yang paling dekat dari kategori yang sedang aktif. |

## Cara menggunakan peta

1. Gunakan **Layer Control** di kanan atas untuk memilih basemap atau mengatur kategori fasilitas.
2. Klik salah satu titik untuk membuka informasi fasilitas.
3. Pilih **Ukur jarak** atau **Ukur luas**, lalu klik peta sesuai kebutuhan.
4. Pilih **Lokasi saya dan terdekat** dan berikan izin lokasi pada browser untuk melihat fasilitas terdekat.
5. Pilih **Bersihkan** untuk menghapus hasil pengukuran dan lokasi sementara.

## Cakupan data

Data mencakup 15 fasilitas pilihan di Kota Medan:

- 4 fasilitas kesehatan
- 4 fasilitas pendidikan
- 4 ruang terbuka
- 3 fasilitas transportasi

Data spasial tersedia dalam [GeoJSON](./data/fasilitas-medan.geojson). Koordinat memakai urutan standar GeoJSON: `[longitude, latitude]`.

## Catatan penggunaan

- Data ini ditujukan untuk eksplorasi informasi, bukan inventaris resmi seluruh fasilitas di Kota Medan.
- Jarak yang dihitung adalah garis lurus, bukan rute jalan atau waktu tempuh.
- Luas area merupakan perkiraan geodesik berdasarkan titik yang dipilih pengguna.
- Akurasi lokasi pengguna bergantung pada perangkat, browser, dan izin yang diberikan.

## Privasi

Lokasi perangkat hanya diminta setelah tombol **Lokasi saya dan terdekat** dipilih. Lokasi tersebut digunakan sementara dalam sesi peta untuk mencari fasilitas terdekat; aplikasi ini tidak menyimpannya.

## Sumber dan atribusi

- Data fasilitas: Google Maps dan OpenStreetMap; sumber serta tanggal pengambilan juga dicatat pada atribut setiap fitur.
- Basemap: [OpenStreetMap](https://www.openstreetmap.org/copyright), [CARTO](https://carto.com/attributions), dan Esri World Imagery.
- Peta dibangun dengan [Leaflet 1.9.4](https://leafletjs.com/).

## Pembuat

Vaidon Shello Sinambela · NIM 241712052
Pengembangan SIG Web
