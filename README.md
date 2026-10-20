# Kuis Islami Ceria

Kuis pilihan ganda bertema Islam untuk siswa TK sampai SD. Tanpa framework dan tanpa instalasi:
buka `index.html` di browser (atau pakai ekstensi *Live Server* di VS Code).

## Struktur folder

```
islamic-quiz/
├── index.html        kerangka halaman
├── song1.mp3         lagu latar
├── css/style.css     semua tampilan (warna ada di :root paling atas)
└── js/
    ├── data.js       SOAL, level, pengaturan, dan tulisan reaksi bintang
    ├── sprites.js    gambar hewan pixel (huruf = kotak warna)
    ├── effects.js    kertas warna-warni dan kembang api
    ├── song.js       pemutar musik (nyala/mati, volume, perkecil)
    └── app.js        logika (login, skor, bintang, kunci level)
```

## Level

| Level | Materi       | Tingkat |
|-------|--------------|---------|
| 1     | Akhlak       | Mudah   |
| 2     | Akhlak       | Sulit   |
| 3     | Akidah       | Mudah   |
| 4     | Akidah       | Sulit   |
| 5     | Sejarah Nabi | Mudah   |
| 6     | Sejarah Nabi | Sulit   |

## Cara kerja nilai

- Jumlah benar diubah jadi **1 sampai 5 bintang** (`toStars` di `app.js`).
- Minimal **3 bintang** untuk lulus dan membuka level berikutnya (`SETTINGS.passStars`).
- Makin banyak bintang, makin meriah: 1 bintang tanpa kertas warna, 4 bintang ada kembang api,
  5 bintang ada hujan bintang dan bulan (lihat `REACTIONS` di `data.js` dan `effects.js`).
- Poin = jumlah benar terbaik tiap level x `pointsPerCorrect`.

## Yang paling sering diubah

| Ingin mengubah...                  | Buka            | Bagian                      |
|------------------------------------|-----------------|-----------------------------|
| Soal, pilihan, kunci jawaban       | `js/data.js`    | `LEVELS`                    |
| Tulisan reaksi 1-5 bintang         | `js/data.js`    | `REACTIONS`                 |
| Batas lulus, poin per soal         | `js/data.js`    | `SETTINGS`                  |
| Warna                              | `css/style.css` | `:root` di baris paling atas|
| Bentuk/warna hewan                 | `js/sprites.js` | `SPRITES`                   |
| Kecepatan hewan berjalan           | `js/app.js`     | `buildDecorations`          |

## Aturan penulisan soal

- `answer` = nomor pilihan benar, dimulai dari 0 (`0` = pilihan pertama).
- `id` level berurutan (1, 2, 3, ...). `id` soal harus unik, contoh `"3-2"`.
- Urutan pilihan jawaban diacak setiap level dimulai.
- Akun lama tetap bisa dipakai, tetapi progres level lama tidak terbawa karena levelnya berubah.
