# GeoMedan SIG

**[Buka peta interaktif](https://selosinambela.github.io/geomedan-SIG/)**

GeoMedan SIG adalah peta web interaktif yang menampilkan 31 fasilitas publik dan ruang terbuka di Kota Medan. Peta ini dirancang untuk memudahkan pengunjung mengeksplorasi sebaran lokasi, membaca informasi fasilitas, dan melakukan analisis spasial sederhana.

## Mengapa peta ini dibuat?

Informasi fasilitas publik sering tersebar di berbagai sumber dan sulit dibandingkan berdasarkan lokasi. GeoMedan SIG menyatukan fasilitas kesehatan, pendidikan, transportasi, dan ruang terbuka dalam satu peta yang mudah digunakan.

Peta ini mendukung:

- **SDG 9 — Industri, Inovasi, dan Infrastruktur**, melalui pemanfaatan peta web dan data spasial terbuka.
- **SDG 11 — Kota dan Permukiman Berkelanjutan**, melalui visualisasi akses terhadap layanan dan ruang terbuka kota.

## Yang dapat dilakukan

| Fitur | Kegunaan |
| --- | --- |
| Sidebar eksplorasi | Melihat statistik, daftar fasilitas, dan kontrol peta dalam satu panel yang responsif. |
| Pencarian cepat | Cari fasilitas berdasarkan nama atau alamat. |
| Filter kategori | Aktifkan/nonaktifkan kategori dengan jumlah data yang tampil secara langsung. |
| Daftar fasilitas | Klik item pada daftar untuk memusatkan peta dan membuka detail lokasi. |
| Pilih basemap | Bandingkan konteks lokasi dengan OpenStreetMap, CARTO Terang, atau citra Esri. |
| Tampilkan kategori | Aktifkan atau sembunyikan fasilitas kesehatan, pendidikan, ruang terbuka, dan transportasi. |
| Baca detail lokasi | Klik titik pada peta untuk melihat nama, kategori, alamat, dan sumber data. |
| Ukur jarak | Hitung total jarak garis lurus dari beberapa titik yang diklik. |
| Ukur luas | Perkirakan luas area dari sedikitnya tiga titik yang diklik. |
| Cari fasilitas terdekat | Gunakan lokasi perangkat untuk menemukan fasilitas yang paling dekat dari kategori yang sedang aktif. |

## Cara menggunakan peta

1. Gunakan sidebar untuk mencari nama/alamat atau menyaring kategori fasilitas.
2. Klik item pada daftar atau titik di peta untuk membuka informasi lokasi.
3. Pilih **Ukur jarak** atau **Ukur luas**, lalu klik peta sesuai kebutuhan.
4. Pilih **Lokasi saya** dan berikan izin lokasi pada browser untuk melihat fasilitas terdekat.
5. Pilih **Bersihkan peta** untuk menghapus hasil pengukuran dan lokasi sementara.

## Cakupan data

Data mencakup 31 fasilitas pilihan di Kota Medan:

- 8 fasilitas kesehatan
- 5 fasilitas pendidikan
- 14 ruang terbuka
- 4 fasilitas transportasi

Data spasial tersedia dalam [GeoJSON](./data/fasilitas-medan.geojson). Koordinat memakai urutan standar GeoJSON: `[longitude, latitude]`.

## Catatan penggunaan

- Data bersumber dari objek nyata yang dipetakan di OpenStreetMap dan dicocokkan dengan nama/alamat pada situs resmi lembaga terkait; data ini bukan inventaris resmi seluruh fasilitas di Kota Medan.
- Jarak yang dihitung adalah garis lurus, bukan rute jalan atau waktu tempuh.
- Luas area merupakan perkiraan geodesik berdasarkan titik yang dipilih pengguna.
- Akurasi lokasi pengguna bergantung pada perangkat, browser, dan izin yang diberikan.

## Privasi

Lokasi perangkat hanya diminta setelah tombol **Lokasi saya** dipilih. Lokasi tersebut digunakan sementara dalam sesi peta untuk mencari fasilitas terdekat; aplikasi ini tidak menyimpannya.

## Sumber dan atribusi

- Data fasilitas: [OpenStreetMap](https://www.openstreetmap.org/) melalui objek peta terbuka; setiap popup menyediakan tautan ke objek atau pencarian OpenStreetMap terkait. Nama dan alamat fasilitas dipertahankan dari sumber publik lembaga/instansi terkait.
- Unduh dan tinjau data lokal: [data/fasilitas-medan.geojson](./data/fasilitas-medan.geojson).
- Basemap: [OpenStreetMap](https://www.openstreetmap.org/copyright), [CARTO](https://carto.com/attributions), dan Esri World Imagery.
- Peta dibangun dengan [Leaflet 1.9.4](https://leafletjs.com/).

## Pembuat

Vaidon Shello Sinambela · NIM 241712052
Pengembangan SIG Web
