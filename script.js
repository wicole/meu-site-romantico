// ===== CARROSSEL =====
const carouselContainer = document.querySelector('.carousel-container');
const carouselItems = document.querySelectorAll('.carousel-item');
const hearts = document.querySelectorAll('.heart');
let currentIndex = 0;
const totalItems = carouselItems.length;

function updateCarousel(index) {
  carouselContainer.style.transform = `translateX(-${index * 100}%)`;
  hearts.forEach((heart, i) => {
    heart.classList.toggle('active', i === index);
  });
}

hearts.forEach((heart, i) => {
  heart.addEventListener('click', () => {
    currentIndex = i;
    updateCarousel(currentIndex);
  });
});

// Auto-play
setInterval(() => {
  currentIndex = (currentIndex + 1) % totalItems;
  updateCarousel(currentIndex);
}, 4000); // troca a cada 4 segundos

updateCarousel(currentIndex); // inicializa

// ===== CONTADOR =====
const timer = document.getElementById('timer');

function atualizarContador() {
  const inicio = new Date(2025, 4, 30); // mês 0-based: 4 = maio
  const agora = new Date();

  // Calcular meses completos
  let meses = (agora.getFullYear() - inicio.getFullYear()) * 12 + (agora.getMonth() - inicio.getMonth());

  // Se ainda não passou o dia 30 do mês atual, não conta esse mês
  if (agora.getDate() < 30) {
    meses--;
  }

  // Último dia 30
  let ultimoDia30 = new Date(inicio);
  ultimoDia30.setMonth(inicio.getMonth() + meses);

  // Calcular dias desde o último dia 30
  let diffMs = agora - ultimoDia30;
  let dias = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Calcular horas e minutos desde a meia-noite
  let horas = agora.getHours();
  let minutos = agora.getMinutes();

  timer.textContent = `${meses} meses, ${dias} dias, ${horas}h, ${minutos}m`;
}

// Inicializa e atualiza a cada minuto
atualizarContador();
setInterval(atualizarContador, 60000);

const audio = document.getElementById('audio');
const playBtn = document.querySelector('.play-btn');
const progressBar = document.getElementById('progress');
const currentTimeElem = document.getElementById('current-time');
const durationElem = document.getElementById('duration');
const coverImg = document.querySelector('.cover');
const musicButtons = document.querySelectorAll('.music-btn');

function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function loadMusic(src, cover) {
  audio.src = src;
  coverImg.src = cover;
  audio.play();
  playBtn.textContent = '⏸';
}

musicButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const src = btn.getAttribute('data-src');
    const cover = btn.getAttribute('data-cover');
    loadMusic(src, cover);
  });
});

playBtn.addEventListener('click', () => {
  if(audio.paused) {
    audio.play();
    playBtn.textContent = '⏸';
  } else {
    audio.pause();
    playBtn.textContent = '▶';
  }
});

audio.addEventListener('loadedmetadata', () => {
  durationElem.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = `${progressPercent}%`;
  currentTimeElem.textContent = formatTime(audio.currentTime);
});
