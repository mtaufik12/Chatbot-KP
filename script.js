const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");


sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const message = userInput.value.trim();
  if (message === "") return;

  addMessage(message, "user");
  userInput.value = "";

  // Logika balasan sederhana
  const reply = getBotReply(message.toLowerCase());
  setTimeout(() => addMessage(reply, "bot"), 500);
}

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("chat-message", sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
// Variabel global untuk menyimpan konteks percakapan
let context = "";

function getBotReply(message) {
  message = message.toLowerCase().trim();

  // ==== BAGIAN 1: DETEKSI TOPIK ====
  if (message.includes("skripsi")) context = "skripsi";
  else if (message.includes("kp")) context = "kp";
  else if (message.includes("jadwal")) context = "jadwal";
  else if (message.includes("kontak")) context = "kontak";
  else if (message.includes("layanan")) context = "layanan";
  
  // ==== BAGIAN 2: RESPON BERDASARKAN TOPIK ====
  if (context === "skripsi") return handleSkripsi(message);
  if (context === "kp") return handleKP(message);
  if (context === "jadwal") return handleJadwal(message);
  if (context === "kontak") return handleKontak(message);
  if (context === "layanan") return handleLayanan(message);

  // ==== SALAM DAN UMUM ====
  if (message.includes("halo") || message.includes("hai"))
    return "Halo! Saya chatbot akademik FTI UNSAP. Mau tanya tentang apa?";
  
  if (message.includes("terima kasih") || message.includes("makasih")) {
    context = "";
    return "Sama-sama! Silakan tanya lagi kalau ada yang ingin diketahui.";
  }

  return "Maaf, saya belum paham pertanyaan Anda.";
}
function handleSkripsi(message) {
  if (message.includes("diajukan"))
    return "Skripsi dapat diajukan setelah mahasiswa menyelesaikan minimal 100 SKS dan mendapat persetujuan dosen pembimbing.";
  else if (message.includes("syarat"))
    return "Syarat skripsi: minimal 100 SKS dan sudah mengambil Seminar Proposal.";
  else
    return "Untuk pendaftaran skripsi, silakan konsultasi ke dosen pembimbing terlebih dahulu.";
}

function handleKP(message) {
  if (message.includes("pendaftaran"))
    return "Pendaftaran KP dilakukan melalui form fakultas setelah memenuhi syarat SKS.";
  else if (message.includes("syarat"))
    return "Syarat KP: minimal 90 SKS dan sudah lulus mata kuliah pendukung.";
  else
    return "Kerja Praktik (KP) dapat diambil pada semester 6 atau 7.";
}

function handleJadwal(message) {
  return "Jadwal kuliah dapat dilihat di portal akademik FTI UNSAP.";
}

function handleKontak(message) {
  return "Kontak FTI UNSAP: 0878-9278-91644, email: fti@unsap.ac.id.";
}

function handleLayanan(message) {
  return "Layanan fakultas dibuka Senin–Jumat pukul 08.00–16.00 WIB.";
}
