const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});

// Simpan status agar tahu apakah pengguna sedang memilih menu
let isChoosing = true;

function sendMessage() {
  const message = userInput.value.trim();
  if (message === "") return;

  addMessage(message, "user");
  userInput.value = "";

  setTimeout(() => {
    const reply = getBotReply(message.toLowerCase());
    addMessage(reply, "bot");
  }, 500);
}

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("chat-message", sender);
  msg.innerHTML = text; // <== ubah dari textContent ke innerHTML
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}


// === MENU UTAMA ===
function showMenu() {
  return `
    <b>Selamat datang di Chatbot Akademik FTI UNSAP 👋</b><br>
    Silakan pilih informasi yang ingin kamu ketahui:<br><br>
    <span class="menu-item">1️⃣ Informasi Skripsi</span><br>
    <span class="menu-item">2️⃣ Informasi Kerja Praktek (KP)</span><br>
    <span class="menu-item">3️⃣ Jadwal Akademik</span><br>
    <span class="menu-item">4️⃣ Kontak Fakultas</span><br>
    <span class="menu-item">5️⃣ Layanan Fakultas</span><br><br>
    <i>Ketik angka (1-5) untuk memilih menu, atau ketik 'exit' untuk mengakhiri percakapan.</i>
  `;
}


function getBotReply(message) {
  // ==== CEK EXIT ====
  if (message === "exit" || message === "keluar" || message === "quit") {
    isChoosing = true;
    clearChat();
    return "Percakapan telah direset.\n\n" + showMenu();
  }

  // ==== MODE PILIH MENU ====
  if (isChoosing) {
    switch (message) {
      case "1":
        isChoosing = false;
        return handleSkripsi();
      case "2":
        isChoosing = false;
        return handleKP();
      case "3":
        isChoosing = false;
        return handleJadwal();
      case "4":
        isChoosing = false;
        return handleKontak();
      case "5":
        isChoosing = false;
        return handleLayanan();
      default:
        return "Pilihan tidak dikenali. Silakan pilih angka 1–5 atau ketik 'exit' untuk keluar.";
    }
  } else {
    // Setelah menjawab, tampilkan menu lagi
    isChoosing = true;
    return showMenu();
  }
}

// ==== RESPON SETIAP MENU ====
function handleSkripsi() {
  return `
    <b>📚 Informasi Skripsi</b><br><br>
    Berikut informasi umum mengenai Skripsi di Fakultas Teknologi Informasi UNSAP:<br><br>
    • <b>Syarat Pengajuan:</b><br>
    - Telah menempuh minimal <b>100 SKS</b>.<br>
    - Sudah lulus mata kuliah <b>Seminar Proposal</b>.<br>
    - Mendapat persetujuan dari Dosen Pembimbing Akademik.<br><br>
    • <b>Prosedur:</b><br>
    1. Mahasiswa mengajukan topik dan dosen pembimbing ke bagian akademik.<br>
    2. Setelah disetujui, mahasiswa dapat mulai menyusun proposal.<br>
    3. Proposal diseminarkan sebelum lanjut ke tahap penelitian utama.<br><br>
    • <b>Catatan:</b> Semua dokumen pendaftaran dapat diakses melalui portal akademik FTI UNSAP.<br><br>
    <i>Ketik apa saja untuk kembali ke menu utama atau 'exit' untuk keluar.</i>
  `;
}


function handleKP() {
  return `
    <b>🧑‍💼 Informasi Kerja Praktek (KP)</b><br><br>
    Berikut panduan umum mengenai pelaksanaan Kerja Praktek:<br><br>
    • <b>Syarat Pendaftaran:</b><br>
    - Telah menempuh minimal <b>90 SKS</b>.<br>
    - Sudah lulus mata kuliah dasar bidang konsentrasi.<br>
    - Disarankan diambil pada semester 6 atau 7.<br><br>
    • <b>Prosedur Pelaksanaan:</b><br>
    1. Mahasiswa mencari instansi atau perusahaan mitra.<br>
    2. Mengajukan surat pengantar KP ke fakultas.<br>
    3. Melaksanakan KP minimal selama 1 bulan atau sesuai ketentuan.<br>
    4. Menyusun laporan dan mengikuti seminar hasil KP.<br><br>
    • <b>Catatan:</b> Template laporan KP tersedia di portal akademik FTI UNSAP.<br><br>
    <i>Ketik apa saja untuk kembali ke menu utama atau 'exit' untuk keluar.</i>
  `;
}


function handleJadwal() {
  return `
    <b>📅 Jadwal Akademik</b><br><br>
    Berikut informasi umum terkait jadwal akademik FTI UNSAP:<br><br>
    • Jadwal perkuliahan dapat dilihat melalui portal akademik UNSAP.<br>
    • Setiap awal semester, fakultas mengeluarkan <b>kalender akademik</b> yang berisi:<br>
      - Awal dan akhir perkuliahan.<br>
      - Jadwal UTS dan UAS.<br>
      - Periode KRS dan KHS.<br>
      - Jadwal pengajuan KP dan Skripsi.<br><br>
    Untuk informasi terkini, kunjungi situs resmi atau papan pengumuman fakultas.<br><br>
    <i>Ketik apa saja untuk kembali ke menu utama atau 'exit' untuk keluar.</i>
  `;
}


function handleKontak() {
  return `
    <b>☎️ Kontak Fakultas Teknologi Informasi UNSAP</b><br><br>
    Anda dapat menghubungi fakultas melalui beberapa saluran berikut:<br><br>
    • <b>Telepon:</b> 0878-9278-91644<br>
    • <b>Email:</b> fti@unsap.ac.id<br>
    • <b>Alamat:</b> Jl. Pahlawan No. 1, Sumedang, Jawa Barat<br>
    • <b>Jam Layanan:</b> Senin – Jumat, pukul 08.00 – 16.00 WIB<br><br>
    Untuk pengajuan dokumen akademik atau administrasi, harap dilakukan pada jam kerja.<br><br>
    <i>Ketik apa saja untuk kembali ke menu utama atau 'exit' untuk keluar.</i>
  `;
}


function handleLayanan() {
  return `
    <b>🕐 Layanan Fakultas</b><br><br>
    Fakultas Teknologi Informasi UNSAP menyediakan berbagai layanan untuk mahasiswa:<br><br>
    • <b>Layanan Akademik:</b> Pengurusan KRS, KHS, dan transkrip nilai.<br>
    • <b>Layanan KP & Skripsi:</b> Pendaftaran, surat pengantar, dan bimbingan dosen.<br>
    • <b>Layanan Kemahasiswaan:</b> Organisasi, beasiswa, dan kegiatan kampus.<br>
    • <b>Layanan IT Support:</b> Bantuan teknis untuk akun portal, email UNSAP, atau sistem e-learning.<br><br>
    <b>Jam Operasional:</b> Senin – Jumat pukul 08.00 – 16.00 WIB.<br><br>
    <i>Ketik apa saja untuk kembali ke menu utama atau 'exit' untuk keluar.</i>
  `;
}

// === RESET CHATBOX ===
function clearChat() {
  chatBox.innerHTML = "";
}

// === TAMPILKAN MENU SAAT AWAL ===
window.onload = () => {
  addMessage(showMenu(), "bot");
};
