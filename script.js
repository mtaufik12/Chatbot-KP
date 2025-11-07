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
  const div = document.createElement("div");
  div.className = "menu-buttons";
  div.innerHTML = buttons;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function initChat() {
  clearChat();
  addMessage(`Selamat datang di <strong>Chatbot Informasi Akademik FTI UNSAP</strong>! 👋<br><br>
        Saya siap membantu Anda mendapatkan informasi seputar:<br>
        • Jadwal Akademik<br>
        • Kerja Praktik (KP)<br>
        • Skripsi<br>
        • Informasi Umum Fakultas<br><br>
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
    <button class="menu-button" onclick="showSubMenu('layanan')">🏫 Layanan Fakultas</button>
  `;
  addMenu(buttons);
}


function showSubMenu(type) {
  if (type === "kalender") {
    addMessage("📅 Kalender Akademik");
    addMessage(`
      • UTS: Minggu ke-8 semester berjalan<br>
      • UAS: Minggu ke-16 semester berjalan<br>
      • Libur semester: sesuai pengumuman fakultas.
    `);
    addMenu(`<button class="menu-button" onclick="showMainMenu()">⬅️ Kembali</button>`);

  } else if (type === "krs") {
    addMessage("🧾 Informasi KRS (Kartu Rencana Studi)");
    addMessage(`
      • Pengisian KRS dilakukan di portal SIAKAD pada awal semester.<br>
      • Pastikan sudah melakukan konsultasi dengan dosen pembimbing akademik.<br>
      • Perubahan KRS hanya bisa dilakukan pada masa perbaikan KRS.
    `);
    addMenu(`<button class="menu-button" onclick="showMainMenu()">⬅️ Kembali</button>`);

  } else if (type === "skripsi") {
    addMessage("📚 Informasi Skripsi");
    addMenu(`
      <button class="menu-button" onclick="showContent('Syarat Skripsi', 'Minimal 120 SKS, IPK ≥ 2.00, dan sudah menyelesaikan KP.')">Syarat Skripsi</button>
      <button class="menu-button" onclick="showContent('Pendaftaran Skripsi', 'Isi formulir pendaftaran di fakultas dengan rekomendasi dosen pembimbing.')">Pendaftaran Skripsi</button>
      <button class="menu-button" onclick="showContent('Bimbingan Skripsi', 'Minimal 8 kali bimbingan dengan dosen pembimbing dan dicatat di kartu bimbingan.')">Bimbingan Skripsi</button>
      <button class="menu-button" onclick="showMainMenu()">⬅️ Kembali</button>
    `);

  } else if (type === "sempro") {
    addMessage("🗣️ Seminar Proposal (Sempro)");
    addMessage(`
      • Mahasiswa wajib menyelesaikan proposal dan disetujui pembimbing sebelum daftar sempro.<br>
      • Jadwal dan ruangan ditentukan oleh bagian akademik.<br>
      • Pakaian formal dan sopan wajib saat presentasi.
    `);
    addMenu(`<button class="menu-button" onclick="showMainMenu()">⬅️ Kembali</button>`);

  } else if (type === "kp") {
    addMessage("💼 Informasi Kerja Praktek (KP)");
    addMenu(`
      <button class="menu-button" onclick="showContent('Syarat KP', 'Minimal 90 SKS dan sudah lulus mata kuliah pendukung.')">Syarat KP</button>
      <button class="menu-button" onclick="showContent('Pendaftaran KP', 'Isi formulir KP di fakultas dan lampirkan proposal tempat KP.')">Pendaftaran KP</button>
      <button class="menu-button" onclick="showContent('Laporan KP', 'Laporan diserahkan maksimal 2 minggu setelah KP selesai.')">Laporan KP</button>
      <button class="menu-button" onclick="showMainMenu()">⬅️ Kembali</button>
    `);

  } else if (type === "surat") {
    addMessage("✉️ Surat & Administrasi Fakultas");
    addMessage(`
      • Surat keterangan aktif kuliah<br>
      • Surat izin penelitian<br>
      • Surat rekomendasi KP / Skripsi<br><br>
      Pengajuan dilakukan di bagian akademik dengan membawa KTM & bukti pembayaran UKT.
    `);
    addMenu(`<button class="menu-button" onclick="showMainMenu()">⬅️ Kembali</button>`);

  } else if (type === "wisuda") {
    addMessage("🎓 Informasi Wisuda");
    addMessage(`
      • Wisuda dilaksanakan 2 kali dalam setahun (Genap & Ganjil).<br>
      • Pendaftaran dilakukan setelah mahasiswa dinyatakan lulus sidang skripsi.<br>
      • Kelengkapan berkas: ijazah sementara, transkrip nilai, dan bukti pembayaran.
    `);
    addMenu(`<button class="menu-button" onclick="showMainMenu()">⬅️ Kembali</button>`);

  } else if (type === "siakad") {
    addMessage("💻 Sistem Informasi Akademik (SIAKAD)");
    addMessage(`
      • Digunakan untuk pengisian KRS, melihat nilai, dan mencetak KHS.<br>
      • Akses melalui portal <b>siakad.unsap.ac.id</b> menggunakan NIM dan password.<br>
      • Jika lupa password, hubungi bagian IT Support fakultas.
    `);
    addMenu(`<button class="menu-button" onclick="showMainMenu()">⬅️ Kembali</button>`);

  } else if (type === "layanan") {
    addMessage("🏫 Layanan Fakultas");
    addMessage(`
      • Layanan Akademik: KRS, KHS, Transkrip Nilai<br>
      • Layanan KP & Skripsi<br>
      • Layanan IT Support & Kemahasiswaan<br>
      • Jam Layanan: Senin–Jumat, 08.00–16.00 WIB
    `);
    addMenu(`<button class="menu-button" onclick="showMainMenu()">⬅️ Kembali</button>`);
  }
}



function showContent(title, text) {
  addMessage(`📄 <b>${title}</b><br>${text}`);
  addMenu(`<button class="menu-button" onclick="showMainMenu()">🏠 Menu Utama</button>`);
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
