const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});

// Simpan status agar tahu apakah pengguna sedang memilih menu
let state = "main"

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
function showMainMenu() {
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

function showSkripsiMenu() {
  return `
    <b>📚 Sub-Menu Skripsi</b><br><br>
    1️⃣ Syarat Skripsi<br>
    2️⃣ Pendaftaran Skripsi<br>
    3️⃣ Bimbingan Skripsi<br>
    0️⃣ Kembali ke Menu Utama<br><br>
    <i>Ketik angka (0–3) untuk memilih.</i>
  `;
}

// === MENU KP ===
function showKPMenu() {
  return `
    <b>🧑‍💼 Sub-Menu Kerja Praktek (KP)</b><br><br>
    1️⃣ Syarat KP<br>
    2️⃣ Pendaftaran KP<br>
    3️⃣ Laporan KP<br>
    0️⃣ Kembali ke Menu Utama<br><br>
    <i>Ketik angka (0–3) untuk memilih.</i>
  `;
}


function getBotReply(message) {
  // ==== CEK EXIT ====
  if (message === "exit" || message === "keluar" || message === "quit") {
    state = "main";
    clearChat();
    setTimeout(() => addMessage(showMainMenu(), "bot"), 200);
    return "Percakapan telah direset. Menampilkan kembali menu utama...";
  }

  // ==== KEMBALI ====
  if (message === "0" || message === "back" || message === "kembali") {
    state = "main";
    return showMainMenu();
  }

  // ==== MODE PILIH MENU ====
 if (state === "main") {
  if (message === "1") {
    state = "skripsi";
    return showSkripsiMenu();
  } else if (message === "2") {
    state = "kp";
    return showKPMenu();
  } else if (message === "3") {
    state = "info";
    return handleJadwal() + "\n\nKetik 0 untuk kembali ke menu utama.";
  } else if (message === "4") {
    state = "info";
    return handleKontak() + "\n\nKetik 0 untuk kembali ke menu utama.";
  } else if (message === "5") {
    state = "info";
    return handleLayanan() + "\n\nKetik 0 untuk kembali ke menu utama.";
  } else {
    return "Pilihan tidak valid. Silakan pilih 1–5.";
  }
}

 if (state === "skripsi") {
    switch (message) {
      case "1":
        return `
          <b>📘 Syarat Skripsi:</b><br>
          • Minimal 100 SKS<br>
          • Sudah mengambil Seminar Proposal<br>
          • Disetujui oleh Dosen Pembimbing<br><br>
          <i>Ketik angka 1-3 untuk melanjutkan kepilihan lain, 0 untuk kembali ke Pilihan Utama.</i>
        `;
      case "2":
        return `
          <b>📝 Pendaftaran Skripsi:</b><br>
          Dilakukan melalui form fakultas dengan rekomendasi dari dosen pembimbing.<br><br>
          <i>Ketik angka 1-3 untuk melanjutkan kepilihan lain, 0 untuk kembali ke Pilihan Utama.</i>
        `;
      case "3":
        return `
          <b>👨‍🏫 Bimbingan Skripsi:</b><br>
          • Minimal 8 kali bimbingan.<br>
          • Dicatat dalam kartu bimbingan skripsi.<br><br>
          <i>Ketik angka 1-3 untuk melanjutkan kepilihan lain, 0 untuk kembali ke Pilihan Utama.</i>
        `;
      case "0":
        state = "main";
        return showMainMenu();
      default:
        return showSkripsiMenu();
    }
  }

  // ---- SUB-MENU KP ----
  if (state === "kp") {
    switch (message) {
      case "1":
        return `
          <b>📋 Syarat KP:</b><br>
          • Minimal 90 SKS.<br>
          • Sudah lulus mata kuliah pendukung.<br><br>
          <i>Ketik angka 1-3 untuk melanjutkan kepilihan lain, 0 untuk kembali ke Pilihan Utama.</i>
        `;
      case "2":
        return `
          <b>🧾 Pendaftaran KP:</b><br>
          Isi formulir KP di fakultas dan lampirkan proposal tempat KP.<br><br>
          <i>Ketik angka 1-3 untuk melanjutkan kepilihan lain, 0 untuk kembali ke Pilihan Utama.</i>
        `;
      case "3":
        return `
          <b>📅 Laporan KP:</b><br>
          Laporan disusun sesuai pedoman dan dikumpulkan maksimal 2 minggu setelah KP selesai.<br><br>
          <i>Ketik angka 1-3 untuk melanjutkan kepilihan lain, 0 untuk kembali ke Pilihan Utama.</i>
        `;
      case "0":
        state = "main";
        return showMainMenu();
      default:
        return showKPMenu();
    }
  }

if (state === "info") {
    if (message === "0" || message === "back" || message === "kembali") {
      state = "main";
      return showMainMenu();
    } else {
      state = "main";
      return `
        <i>Kamu kembali ke menu utama.</i><br><br>
        ${showMainMenu()}
      `;
    }
  }

  return showMainMenu();
}

// === MENU LAINNYA ===
function handleJadwal() {
  return `
    <b>📅 Jadwal Akademik</b><br>
    Jadwal kuliah dan kalender akademik dapat dilihat di portal FTI UNSAP.<br><br>
    <i>Ketik apa saja untuk kembali ke menu utama.</i>
  `;
}

function handleKontak() {
  return `
    <b>☎️ Kontak Fakultas Teknologi Informasi UNSAP</b><br>
    • Telepon: 0878-9278-91644<br>
    • Email: fti@unsap.ac.id<br>
    • Alamat: Jl. Pahlawan No. 1, Sumedang, Jawa Barat<br>
    • Jam Layanan: Senin–Jumat, 08.00–16.00 WIB<br><br>
    <i>Ketik apa saja untuk kembali ke menu utama.</i>
  `;
}

function handleLayanan() {
  return `
    <b>🕐 Layanan Fakultas</b><br>
    • Layanan Akademik: KRS, KHS, Transkrip Nilai<br>
    • Layanan KP & Skripsi<br>
    • Layanan IT Support & Kemahasiswaan<br><br>
    Jam Operasional: Senin–Jumat, 08.00–16.00 WIB<br><br>
    <i>Ketik apa saja untuk kembali ke menu utama.</i>
  `;
}

// === RESET CHATBOX ===
function clearChat() {
  chatBox.innerHTML = "";
}

// === MULAI ===
window.onload = () => {
  addMessage(showMainMenu(), "bot");
};
