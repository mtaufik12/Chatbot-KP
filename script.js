const chatBody = document.getElementById("chatBody");
const chatbotBox = document.getElementById("chatbotBox");
const chatToggle = document.getElementById("chatToggle");
const resetBtn = document.getElementById("resetBtn");
const homeBtn = document.getElementById("homeBtn");
const closeBtn = document.getElementById("closeBtn");

// === POPUP CONTROL ===
chatToggle.addEventListener("click", () => {
  chatbotBox.style.display = "flex";
  chatToggle.style.display = "none";
});

closeBtn.addEventListener("click", () => {
  chatbotBox.style.display = "none";
  chatToggle.style.display = "block";
});

// === CHAT LOGIC ===
function addMessage(text, sender = "bot") {
  const msgDiv = document.createElement("div");
  msgDiv.className = `message ${sender}`;

  // Ambil waktu saat ini (format 24 jam)
  const now = new Date();
  const time = now.getHours().toString().padStart(2, "0") + "." + now.getMinutes().toString().padStart(2, "0");

  // Struktur HTML pesan
  if (sender === "bot") {
    msgDiv.innerHTML = `
      <div class="bot-avatar">🤖</div>
      <div class="bubble">
        ${text}
        <div class="msg-time">${time}</div>
      </div>
    `;
  } else {
    msgDiv.innerHTML = `
      <div class="bubble user-bubble">
        ${text}
        <div class="msg-time">${time}</div>
      </div>
    `;
  }

  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}


function addMenu(buttons) {
  const wrapper = document.createElement("div");
  wrapper.className = "menu-bot-wrapper";

  // Avatar bot di kiri
  const avatar = document.createElement("div");
  avatar.className = "bot-avatar";
  avatar.textContent = "🤖";

  // Tombol menu di kanan
  const menuDiv = document.createElement("div");
  menuDiv.className = "menu-buttons";
  menuDiv.innerHTML = buttons;

  // Gabungkan keduanya
  wrapper.appendChild(avatar);
  wrapper.appendChild(menuDiv);

  chatBody.appendChild(wrapper);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function showTyping() {
  const typingDiv = document.createElement("div");
  typingDiv.className = "message bot typing";
  typingDiv.id = "typingIndicator";
  typingDiv.innerHTML = `
    <div class="bot-avatar">🤖</div>
    <div class="bubble typing-bubble">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
  `;
  chatBody.appendChild(typingDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function hideTyping() {
  const typingDiv = document.getElementById("typingIndicator");
  if (typingDiv) typingDiv.remove();
}

function initChat() {
  clearChat();
  addMessage(`Selamat datang di <strong>Chatbot Informasi Akademik FTI UNSAP</strong>! 👋<br><br>
        Saya siap membantu Anda mendapatkan informasi seputar:<br>
        Silakan pilih menu di bawah ini:`);
  showMainMenu();
}

function showMainMenu() {
  
  const buttons = `
    <button class="menu-button" onclick="showSubMenu('kalender')">📅 Kalender Akademik</button>
    <button class="menu-button" onclick="showSubMenu('krs')">🧾 KRS</button>
    <button class="menu-button" onclick="showSubMenu('skripsi')">📘 Skripsi</button>
    <button class="menu-button" onclick="showSubMenu('sempro')">🗣️ Seminar Proposal</button>
    <button class="menu-button" onclick="showSubMenu('kp')">💼 Kerja Praktek (KP)</button>
    <button class="menu-button" onclick="showSubMenu('surat')">✉️ Surat & Administrasi</button>
    <button class="menu-button" onclick="showSubMenu('wisuda')">🎓 Wisuda</button>
    <button class="menu-button" onclick="showSubMenu('siakad')">💻 SIAKAD</button>
    <button class="menu-button" onclick="showSubMenu('fakultas')">🏫 Informasi Fakultas</button>
  `;
  addMenu(buttons);
}


function showSubMenu(type) {

  showTyping(); // tampilkan loading dulu
  setTimeout(() => {
    hideTyping(); // hapus animasi setelah delay
    
  if (type === "kalender") {
    addMessage("📅 <b>Kalender Akademik</b>");
  addMenu(`
    <button class="menu-button" onclick="showKalender('kalenderFTI')">📘 Kalender Akademik FTI</button>
    <button class="menu-button" onclick="showKalender('mulaiKuliah')">🎓 Mulai Kuliah Semester Depan</button>
    <button class="menu-button" onclick="showMainMenu()">⬅️ Kembali</button>
  `);

  } else if (type === "krs") {
    addMessage("🧾 Informasi KRS (Kartu Rencana Studi)");
    addMenu(`
    <button class="menu-button" onclick="showKRS('caraIsi')">🖊️ Cara Isi KRS</button>
    <button class="menu-button" onclick="showKRS('jadwal')">🗓️ Jadwal KRS Online</button>
    <button class="menu-button" onclick="showMainMenu()">⬅️ Kembali</button>
  `);

  } else if (type === "skripsi") {
    addMessage("📚 Informasi Skripsi");
    addMenu(`
    <button class="menu-button" onclick="showSkripsi('syarat')">📋 Syarat Pendaftaran Skripsi</button>
    <button class="menu-button" onclick="showSkripsi('pelaksanaan')">🧾 Pelaksanaan Skripsi</button>
    <button class="menu-button" onclick="showSkripsi('alur')">🔄 Alur Pelaksanaan Skripsi</button>
    <button class="menu-button" onclick="showMainMenu()">⬅️ Kembali</button>
  `);

  } else if (type === "sempro") {
    addMessage("🗣️ Seminar Proposal (Sempro)");
    addMenu(`
    <button class="menu-button" onclick="showSempro('syarat')">📋 Syarat Mengikuti Seminar Proposal</button>
    <button class="menu-button" onclick="showSempro('biaya')">💰 Biaya Seminar Proposal</button>
    <button class="menu-button" onclick="showMainMenu()">⬅️ Kembali</button>
  `);
    addMenu(`<button class="menu-button" onclick="showMainMenu()">⬅️ Kembali</button>`);

  } else if (type === "kp") {
    addMessage("💼 Informasi Kerja Praktek (KP)");
    addMenu(`
    <button class="menu-button" onclick="showKP('syarat')">📋 Syarat Kerja Praktek</button>
    <button class="menu-button" onclick="showKP('perusahaanSendiri')">🏢 KP di Perusahaan Sendiri</button>
    <button class="menu-button" onclick="showMainMenu()">⬅️ Kembali</button>
  `);

  } else if (type === "surat") {
    addMessage("✉️ Surat & Administrasi Fakultas");
    addMenu(`
    <button class="menu-button" onclick="showSurat('aktifKuliah')">📄 Surat Aktif Kuliah</button>
    <button class="menu-button" onclick="showSurat('cutiKuliah')">📝 Pengajuan Cuti Kuliah</button>
    <button class="menu-button" onclick="showSurat('pindahKuliah')">📚 Surat Pindah Kuliah</button>
  `);
    addMenu(`<button class="menu-button" onclick="showMainMenu()">⬅️ Kembali</button>`);

  } else if (type === "wisuda") {
    addMessage("🎓 Informasi Wisuda");
     addMenu(`
    <button class="menu-button" onclick="showWisuda('yudisium')">📋 Syarat Mengikuti Yudisium</button>
    <button class="menu-button" onclick="showWisuda('biaya')">💰 Biaya Wisuda</button>
    <button class="menu-button" onclick="showWisuda('jadwal')">🗓️ Jadwal Wisuda</button>
  `);
    addMenu(`<button class="menu-button" onclick="showMainMenu()">⬅️ Kembali</button>`);

  } else if (type === "siakad") {
    addMessage("💻 Sistem Informasi Akademik (SIAKAD)");
    addMenu(`
    <button class="menu-button" onclick="showSiakad('lupaPassword')">🔑 Lupa Password SIAKAD</button>
    <button class="menu-button" onclick="showSiakad('cetakKRSKHS')">🧾 Cara Mencetak KRS/KHS</button>
    <button class="menu-button" onclick="showSiakad('fitur')">⚙️ Fitur Portal Akademik</button>
    
  `);
    addMenu(`<button class="menu-button" onclick="showMainMenu()">⬅️ Kembali</button>`);

  } else if (type === "fakultas") {
    addMessage("🏫  Informasi Fakultas");
  addMessage(`
    <b>Jam Layanan TU FTI:</b><br>
    • Senin–Jumat: 08.30 – 15.30 WIB<br>
    • Istirahat: 11.30 – 13.00 WIB<br><br>

    <b>Alamat Universitas Sebelas April:</b><br>
    Jl. Angkrek Situ No.19, Kec. Sumedang Utara, Kabupaten Sumedang, Jawa Barat 45323<br><br>

    <b>Email Universitas Sebelas April:</b><br>
    info@unsap.ac.id<br><br>

    <b>Kontak Fakultas Teknologi Informasi (FTI):</b><br>
    • CS BAAK FTI UNSAP : +62 823-1948-9504<br>
    • CS Bagian Administrasi Umum FTI UNSAP : +62 823-1948-9510<br>
    • CS Prodi Informatika FTI UNSAP : +62 823-1948-9431<br>
    • CS Prodi Sistem Informasi FTI UNSAP : +62 823-1948-9481
  `);
  addMenu(`<button class="menu-button" onclick="showMainMenu()">⬅️ Kembali</button>`);
}
 }, 400); 
}

function showKalender(id) {

  showTyping(); // tampilkan loading dulu
  setTimeout(() => {
  hideTyping(); // hapus animasi setelah delay

  if (id === "kalenderFTI") {
    addMessage(`
      📘 <b>Kalender Akademik FTI</b><br>
      Kalender akademik FTI biasanya diterbitkan setiap 2 bulan setelah UAS dilaksanakan oleh pihak universitas.
    `);
  } 
  else if (id === "mulaiKuliah") {
    addMessage(`
      🎓 <b>Mulai Kuliah Semester Depan</b><br>
      Perkuliahan semester depan biasanya dimulai sekitar awal Februari untuk semester genap dan awal September untuk semester ganjil. 
      Namun, tanggal pastinya menyesuaikan kalender akademik yang diterbitkan universitas.
    `);
  }

  addMenu(`<button class="menu-button" onclick="showSubMenu('kalender')">⬅️ Kembali ke Kalender Akademik</button>`);
}, 400);
}

function showKRS(id) {
  
   showTyping(); // tampilkan loading dulu
  setTimeout(() => {
  hideTyping(); // hapus animasi setelah delay

  if (id === "caraIsi") {
    
    addMessage(`
      🖊️ <b>Cara Isi KRS</b><br>
      Pengisian KRS dilakukan secara online melalui portal SIAKAD UNSAP.<br><br>
      <strong>Langkah-langkah umum:</strong><br>
      1️⃣ Login ke portal SIAKAD dengan akun mahasiswa (unsap.ac.id).<br>
      2️⃣ Pilih menu <b>Perkuliahan</b> di bagian atas.<br>
      3️⃣ Pilih <b>Kartu Rencana Studi Online</b>.<br>
      4️⃣ Pilih mata kuliah sesuai semester dan jumlah SKS.<br>
      5️⃣ Klik <b>Simpan</b>.
    `);
  } 
  else if (id === "jadwal") {
    addMessage(`
      🗓️ <b>Jadwal KRS Online</b><br>
      Jadwal pengisian KRS biasanya dibuka 1–2 minggu sebelum perkuliahan dimulai.<br><br>
      Informasi jadwal resmi diumumkan melalui:<br>
      • Website universitas<br>
      • Papan pengumuman fakultas<br>
      • Grup WhatsApp resmi fakultas
    `);
  }

  addMenu(`<button class="menu-button" onclick="showSubMenu('krs')">⬅️ Kembali ke Menu KRS</button>`);
}, 400);
}

function showSkripsi(id) {
   showTyping(); // tampilkan loading dulu
  setTimeout(() => {
  hideTyping(); // hapus animasi setelah delay

  if (id === "syarat") {
    addMessage(`
      📋 <b>Syarat Pendaftaran Skripsi</b><br>
      Syarat umum pendaftaran skripsi di FTI UNSAP:<br><br>
      • Menyelesaikan minimal <b>140 SKS</b> sampai semester 7 (MK Skripsi).<br>
      • Menyelesaikan minimal <b>123 SKS</b> sampai semester 6 (MK Seminar Proposal Skripsi).<br>
      • Memiliki <b>IPK ≥ 2.5</b>.<br>
      • Lulus semua mata kuliah.<br>
      • Sesuai kesepakatan Fakultas Teknologi Informasi: <b>tidak ada nilai D atau E</b> untuk semua mata kuliah.<br>
      • Memiliki <b>Surat Keputusan (SK) Skripsi</b> yang berlaku pada semester berjalan.
    `);
  } 
  else if (id === "pelaksanaan") {
    addMessage(`
      🧾 <b>Pelaksanaan Skripsi</b><br>
      Proses pelaksanaan skripsi dilaksanakan dalam masa satu semester dimulai dari pembuatan <b>SK Skripsi</b> hingga tahap <b>Sidang Yudisium</b>.<br><br>
      Tahapan utama dalam penyusunan skripsi:<br>
      1️⃣ Pelaksanaan dan penyusunan laporan skripsi.<br>
      2️⃣ Sidang skripsi.<br>
      3️⃣ Sidang akademik/yudisium.
    `);
  } 
  else if (id === "alur") {
    addMessage(`
      🔄 <b>Alur Pelaksanaan Skripsi</b><br>
      1️⃣ Mahasiswa melakukan perwalian mata kuliah Skripsi melalui SIAKAD.<br>
      2️⃣ Mahasiswa mengumpulkan proposal skripsi yang sudah ditandatangani pembimbing ke program studi dan menunggu <b>SK Pembimbing</b>.<br>
      3️⃣ Mahasiswa melaksanakan proses bimbingan dan pengerjaan skripsi selama ±4 bulan sejak terbitnya SK pembimbing hingga selesai.<br><br>
      ⏳ Setelah seluruh tahapan selesai, mahasiswa mengikuti sidang skripsi dan sidang yudisium.
    `);
  }

  addMenu(`<button class="menu-button" onclick="showSubMenu('skripsi')">⬅️ Kembali ke Menu Skripsi</button>`);
}, 400);
}

function showSempro(id) {
  showTyping(); // tampilkan loading dulu
  setTimeout(() => {
  hideTyping(); // hapus animasi setelah delay

  if (id === "syarat") {
    addMessage(`
      📋 <b>Syarat Mengikuti Seminar Proposal</b><br>
      Berikut adalah syarat umum untuk mengikuti Seminar Proposal di FTI UNSAP:<br><br>
      • Menyelesaikan minimal <b>140 SKS</b> sampai semester 7 (MK Skripsi).<br>
      • Menyelesaikan minimal <b>123 SKS</b> sampai semester 6 (MK Seminar Proposal Skripsi).<br>
      • Memiliki <b>IPK ≥ 2.5</b>.<br>
      • Lulus semua mata kuliah.<br>
      • Tidak memiliki nilai <b>D</b> atau <b>E</b> sesuai kesepakatan Fakultas Teknologi Informasi.<br>
      • Telah memiliki <b>Surat Keputusan (SK) Skripsi</b> yang berlaku pada semester berjalan.
    `);
  } 
  else if (id === "biaya") {
    addMessage(`
      💰 <b>Biaya Seminar Proposal</b><br>
      Biaya seminar proposal dapat berbeda-beda tergantung kebijakan fakultas.<br><br>
      💡 Informasi resmi mengenai biaya dapat dikonfirmasi langsung ke bagian <b>Administrasi TU FTI</b> atau diumumkan melalui pengumuman fakultas.
    `);
  }

  addMenu(`<button class="menu-button" onclick="showSubMenu('sempro')">⬅️ Kembali ke Menu Seminar Proposal</button>`);
}, 400);
}

function showKP(id) {
   showTyping(); // tampilkan loading dulu
  setTimeout(() => {
  hideTyping(); // hapus animasi setelah delay
  if (id === "syarat") {
    addMessage(`
      📋 <b>Syarat Umum Kerja Praktek (KP)</b><br>
      Berikut adalah syarat umum pelaksanaan KP di Fakultas Teknologi Informasi (FTI):<br><br>
      • Mahasiswa aktif pada semester berjalan.<br>
      • Telah mengikuti semua mata kuliah semester 1 sampai 6.<br>
      • Minimal lulus <b>80%</b> dari keseluruhan jumlah SKS program studi.<br>
      • Memiliki <b>IPK > 2.00</b>.<br>
      • Mata kuliah <b>Kerja Praktek</b> diambil pada semester berjalan.
    `);
  } 
  else if (id === "perusahaanSendiri") {
    addMessage(`
      🏢 <b>Kerja Praktek di Perusahaan Sendiri</b><br>
      Diperbolehkan melakukan KP di perusahaan milik sendiri atau keluarga, dengan ketentuan:<br><br>
      • Bidang pekerjaan dan aktivitas harus relevan dengan program studi.<br>
      • Mahasiswa wajib mengajukan <b>Surat Izin KP</b> melalui fakultas.<br>
      • Melampirkan <b>Surat Keterangan Resmi</b> dari perusahaan tempat pelaksanaan KP.<br><br>
      ✅ Semua berkas harus diserahkan ke bagian akademik untuk diverifikasi sebelum pelaksanaan.
    `);
  }

  addMenu(`<button class="menu-button" onclick="showSubMenu('kp')">⬅️ Kembali ke Menu KP</button>`);
}, 400);
}

function showSurat(id) {

  showTyping(); // tampilkan loading dulu
  setTimeout(() => {
  hideTyping(); // hapus animasi setelah delay

  if (id === "aktifKuliah") {
    addMessage(`
      📄 <b>Surat Aktif Kuliah</b><br>
      Mahasiswa yang ingin meminta surat aktif kuliah perlu:<br><br>
      • Mengisi formulir <b>Aktif Kuliah</b> — formulir bisa diambil di staf <b>BAUM</b>.<br>
      • Jika surat digunakan untuk keperluan pribadi, tidak perlu membawa SK.<br>
      • Jika surat digunakan untuk <b>perusahaan atau dinas</b>, wajib membawa <b>SK Orang Tua</b>.<br><br>
      📌 Pastikan semua data terisi lengkap sebelum menyerahkan ke bagian BAUM.
    `);
  } 
  else if (id === "cutiKuliah") {
    addMessage(`
      📝 <b>Pengajuan Cuti Kuliah</b><br>
      Untuk mengajukan cuti kuliah, mahasiswa perlu:<br><br>
      1️⃣ Sudah <b>lunas SPP terakhir</b>.<br>
      2️⃣ Mengisi formulir pengajuan cuti (formulir bisa diambil di staf <b>BAUM</b>).<br>
      3️⃣ Melampirkan <b>Kartu Hasil Studi (KHS) terakhir</b>.<br><br>
      🕐 Proses pengajuan cuti dilakukan pada awal semester berjalan.
    `);
  } 
  else if (id === "pindahKuliah") {
    addMessage(`
      📚 <b>Prosedur Surat Pindah Kuliah</b><br>
      Untuk mengurus surat pindah kuliah, mahasiswa perlu:<br><br>
      1️⃣ Mengisi formulir permohonan pindah (formulir tersedia di staf <b>BAUM</b>).<br>
      2️⃣ Menyiapkan <b>Transkrip Nilai</b> (daftar nilai yang sudah ditempuh).<br>
      3️⃣ Menyerahkan <b>Kartu Tanda Mahasiswa (KTM)</b>.<br>
      4️⃣ Melampirkan fotokopi <b>SPP terakhir</b>.<br><br>
      📍 Semua dokumen dikumpulkan ke bagian BAUM untuk proses verifikasi.
    `);
  }

  addMenu(`<button class="menu-button" onclick="showSubMenu('surat')">⬅️ Kembali ke Menu Surat</button>`);
}, 400);
}

function showWisuda(id) {

  showTyping(); // tampilkan loading dulu
  setTimeout(() => {
  hideTyping();

  if (id === "yudisium") {
    addMessage(`
      📋 <b>Syarat Mengikuti Yudisium</b><br>
      Untuk dapat mengikuti yudisium dan wisuda di Fakultas Teknologi Informasi (FTI), mahasiswa harus memenuhi persyaratan berikut:<br><br>
      • Sudah lulus seluruh mata kuliah dan skripsi.<br>
      • Tidak memiliki tunggakan administrasi.<br>
      • Menyerahkan berkas kelulusan seperti <b>KHS, skripsi, pas foto, dan dokumen pendukung lainnya</b>.<br>
      • Melampirkan <b>Transkrip Nilai</b>.<br>
      • Mengisi <b>Formulir Pendaftaran Wisuda</b>.<br>
      • Menyertakan <b>Bukti Publikasi Ilmiah</b> (misal: jurnal, prosiding, atau repository kampus).
    `);
  } 
  else if (id === "biaya") {
    addMessage(`
      💰 <b>Biaya Wisuda</b><br>
      Biaya wisuda dapat bervariasi setiap periode pelaksanaan.<br><br>
      💡 Informasi resmi mengenai besaran biaya akan diumumkan menjelang jadwal wisuda melalui:<br>
      • Website resmi universitas<br>
      • Papan pengumuman fakultas<br>
      • Grup WhatsApp resmi mahasiswa FTI
    `);
  } 
  else if (id === "jadwal") {
    addMessage(`
      🗓️ <b>Jadwal Wisuda</b><br>
      Wisuda di Universitas Sains dan Aplikasi biasanya dilaksanakan <b>satu kali dalam setahun</b>.<br><br>
      📅 Jadwal pastinya diumumkan melalui:<br>
      • Website resmi universitas<br>
      • Media sosial kampus<br>
      • Papan pengumuman fakultas<br><br>
      ⏰ Pastikan untuk memantau pengumuman resmi agar tidak ketinggalan jadwal registrasi wisuda.
    `);
  }

  addMenu(`<button class="menu-button" onclick="showSubMenu('wisuda')">⬅️ Kembali ke Menu Wisuda</button>`);
}, 400);
}

function showSiakad(id) {

  showTyping(); // tampilkan loading dulu
  setTimeout(() => {
  hideTyping();

  if (id === "lupaPassword") {
    addMessage(`
      🔑 <b>Lupa Password SIAKAD</b><br>
      Jika kamu lupa password akun SIAKAD, silakan hubungi pihak BAAK dengan mengirimkan data berikut:<br><br>
      • <b>NIM</b><br>
      • <b>Nama Lengkap</b><br><br>
      Kirim ke kontak resmi BAAK:<br>
      📱 <b>CS BAAK FTI:</b> 0823-1948-9504<br><br>
      Admin akan membantu melakukan reset password.
    `);
  } 
  else if (id === "cetakKRSKHS") {
    addMessage(`
      🧾 <b>Cara Mencetak KRS atau KHS</b><br>
      Berikut langkah-langkah mencetak dokumen akademik melalui portal SIAKAD:<br><br>
      1️⃣ Login ke portal SIAKAD menggunakan akun mahasiswa.<br>
      2️⃣ Pilih menu <b>Laporan</b> di bagian atas.<br>
      3️⃣ Pilih <b>Kartu Rencana Studi (KRS)</b> atau <b>Kartu Hasil Studi (KHS)</b>.<br>
      4️⃣ Klik tombol <b>Tampilkan Laporan</b>.<br>
      5️⃣ Tekan <b>Cetak</b> untuk menyimpan atau print dokumen.<br><br>
      📌 Pastikan data KRS/KHS sudah disetujui dosen pembimbing sebelum dicetak.
    `);
  } 
  else if (id === "fitur") {
    addMessage(`
      ⚙️ <b>Fitur Portal Akademik (SIAKAD)</b><br>
      Melalui portal SIAKAD, mahasiswa dapat melakukan berbagai aktivitas akademik seperti:<br><br>
      • Mengisi dan mencetak <b>KRS/KHS</b>.<br>
      • Melihat <b>data mahasiswa</b> pribadi.<br>
      • Mengecek <b>jadwal kuliah</b> dan nilai.<br>
      • Melihat <b>status pembayaran</b> UKT.<br>
      • Mengakses <b>transkrip nilai</b> secara online.<br><br>
      🌐 Akses portal: <b>siakad.unsap.ac.id</b>
    `);
  }

  addMenu(`<button class="menu-button" onclick="showSubMenu('siakad')">⬅️ Kembali ke Menu SIAKAD</button>`);
}, 400);
}


function showContent(title, text) {
  showTyping(); // tampilkan loading dulu
  setTimeout(() => {
  hideTyping();

  addMessage(`📄 <b>${title}</b><br>${text}`);
  addMenu(`<button class="menu-button" onclick="showMainMenu()">🏠 Menu Utama</button>`);
}, 400);
}

function clearChat() {
  chatBody.innerHTML = "";
}

// === EVENT LISTENER ===
// Reset = hapus chat dan kembali ke menu utama
resetBtn.addEventListener("click", () => {
  clearChat();
  addMessage("🔄 Chat anda telah di-reset."); // 👉 pesan tambahan
  setTimeout(initChat, 400); // delay biar pesan muncul dulu
});

// Home = hanya kembali ke menu utama tanpa hapus chat
homeBtn.addEventListener("click", () => {
  addMessage("🏠 Kembali ke menu utama:");
  showMainMenu();
});

// === MULAI ===
window.onload = initChat;
