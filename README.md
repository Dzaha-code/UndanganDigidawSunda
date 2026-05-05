# Undangan Jatukrami - Web Statis

Template undangan pernikahan digital kalayan tema tradisional Sunda. Diwangun nganggo HTML, CSS, sareng JavaScript murni — teu peryogi build tools, langsung tiasa di-deploy ka Vercel atanapi hosting statis naon waé.

## 📁 Struktur File

```
wedding-invitation/
├── index.html       # Struktur kontén undangan
├── styles.css       # Sadaya gaya/styling
├── script.js        # Interaktivitas (countdown, RSVP, dll.)
└── README.md        # File ieu
```

## ✨ Fitur

- ✅ **Cover/Opening** kalayan tombol "Buka Undangan"
- ✅ **Personalisasi nami tamu** via URL parameter (`?to=Pak+Asep`)
- ✅ **Countdown timer** dugi ka dinten H
- ✅ **Inpormasi acara** (Akad sareng Walimatul 'Urs)
- ✅ **Peta lokasi** (Google Maps embed)
- ✅ **Tombol "Save the Date"** ka Google Calendar
- ✅ **RSVP Form** (konfirmasi kahadiran)
- ✅ **Guest Book** (ucapan & du'a tamu)
- ✅ **Responsive design** (mobile-first)
- ✅ **Animasi scroll reveal** anu lemes
- ✅ **Tema tradisional Sunda** (emas, coklat, motif batik)

## 🛠️ Cara Modifikasi

### 1. Ganti Data Pengantén
Buka `index.html`, paluruh sareng ganti:
- `Wangi` & `Galih` — nami pangantén
- `Wangi Nurkhalisa` & `Galih Pratama` — nami lengkep
- `Bpk. H. Asep Saepudin` jsb. — nami kolot

### 2. Ganti Tanggal Acara
Buka `script.js`, baris ka-37:
```js
const weddingDate = new Date('2026-08-15T08:00:00+07:00').getTime();
```
Ganti tanggal sasuai acara anjeun (format: `YYYY-MM-DDTHH:MM:SS+07:00`).

Oge update tanggal di bagian `addToCalendar` (script.js baris ~62).

### 3. Ganti Lokasi Maps
Buka `index.html`, paluruh `<iframe src="https://www.google.com/maps/embed...`. 
Ganti URL nu di jero `src` ku embed code ti Google Maps lokasi anjeun:
1. Buka [Google Maps](https://maps.google.com)
2. Pilih lokasi → klik "Share" → "Embed a map" → salin HTML
3. Tempelkeun nilai `src` na

### 4. Tambahkeun Foto
Ganti `.photo-placeholder` div ku tag `<img>`:
```html
<div class="person-photo">
    <img src="path/foto-pangantén.jpg" alt="Wangi" style="width:100%;height:100%;object-fit:cover;">
</div>
```

### 5. Ganti Warna Tema
Buka `styles.css`, edit bagian `:root` di luhur:
```css
:root {
    --gold-primary: #c9a55c;  /* Warna emas utami */
    --brown-dark: #3d2817;    /* Warna coklat poék */
    /* ... */
}
```

### 6. Hubungkeun RSVP & Guestbook ka Backend
Ayeuna data RSVP & guestbook disimpen di `localStorage` (ngan kanggo demo). Pikeun produksi, gunakeun:

**Pilihan A — Google Sheets via Apps Script:**
1. Damel Google Sheets énggal
2. Extensions → Apps Script → tempelkeun script handler
3. Deploy salaku "Web app"
4. Salin URL ka `script.js`, ganti `'YOUR_GOOGLE_APPS_SCRIPT_URL'`

**Pilihan B — Firebase Firestore:**
- Daptarkeun project di [firebase.google.com](https://firebase.google.com)
- Pasang SDK, gunakeun `addDoc()` sareng `getDocs()`

**Pilihan C — Formspree / Web3Forms:**
- Layanan gratis pikeun nampi data form via email
- Cocok pikeun project sederhana

## 🚀 Deploy ka Vercel

### Cara 1 — Drag & Drop (Pang-gampangna)
1. Buka [vercel.com](https://vercel.com), login
2. Klik "Add New" → "Project" → "Browse"
3. Drag folder ieu ka layar
4. Klik "Deploy" — réngsé!

### Cara 2 — Via Git
1. Push folder ieu ka GitHub repo
2. Buka Vercel → "Add New" → "Project"
3. Pilih repo → klik "Deploy"
4. Tiap push ka GitHub bakal otomatis update web

### Cara 3 — Via Vercel CLI
```bash
npm i -g vercel
cd wedding-invitation
vercel
```

## 📱 Cara Bagikeun Undangan ka Tamu

Bikeun link kalayan parameter `?to=`:
```
https://undangan-anjeun.vercel.app/?to=Pak+Asep+Permana
https://undangan-anjeun.vercel.app/?to=Bu+Ratna+Komala
```

Nami tamu bakal otomatis muncul di bagian opening.

**Tip:** Gunakeun Excel/Google Sheets pikeun ngahasilkeun link batch:
```
=CONCATENATE("https://link.com/?to=", SUBSTITUTE(A1, " ", "+"))
```

## 🎵 Nambihkeun Musik Latar (Opsional)

1. Tempatkeun file `.mp3` di folder ieu (contona `music.mp3`)
2. Buka `script.js`, paluruh komentar `// Pikeun ngagunakeun audio...`
3. Uncomment sareng ganti path:
```js
const bgMusic = new Audio('music.mp3');
bgMusic.loop = true;
```

⚠️ **Catetan hak cipta:** Pastikeun musik nu dipake bébas hak cipta atanapi anjeun gaduh idin. Sumber gratis: [Pixabay Music](https://pixabay.com/music), [Free Music Archive](https://freemusicarchive.org).

## 🧩 Ide Pamekaran Salajengna

- [ ] Galeri foto prewedding (lightbox)
- [ ] Amplop digital (QR code rékening + e-wallet)
- [ ] Live streaming link (kanggo tamu nu teu tiasa hadir)
- [ ] Multi-bahasa (Sunda / Indonesia / Inggris toggle)
- [ ] Animasi GSAP atanapi parallax
- [ ] Dress code section
- [ ] Filter ucapan (kahadiran only / sadaya)

## 📄 Lisensi

Bébas dipake sareng dimodifikasi pikeun project pribadi atanapi tugas akademik.

---

Mugia janten kulawarga sakinah, mawaddah, warahmah. 🌸
