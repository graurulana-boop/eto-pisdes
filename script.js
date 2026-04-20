const rainLayer = document.getElementById('rain-layer');
const mainText = document.getElementById('main-text');
const mainTextInput = document.getElementById('main-text-content');
const mainTextColor = document.getElementById('main-text-color');
const rainWordsInput = document.getElementById('rain-words');
const rainColor1Input = document.getElementById('rain-color-1');
const rainColor2Input = document.getElementById('rain-color-2');

const settingsPanel = document.getElementById('settings-panel');
const openSettingsBtn = document.getElementById('settings-open');
const closeSettingsBtn = document.getElementById('settings-close');

const audio = document.getElementById('bg-audio');
const musicToggle = document.getElementById('music-toggle');
const previewBtn = document.getElementById('preview-btn');
const musicSelect = document.getElementById('music-select');

const musicMap = {
  piano:
    'https://cdn.pixabay.com/download/audio/2021/10/30/audio_99ea167fac.mp3?filename=happy-birthday-to-you-piano-version-13976.mp3',
  kids:
    'https://cdn.pixabay.com/download/audio/2022/03/15/audio_70447857c5.mp3?filename=happy-birthday-song-for-kids-112166.mp3'
};

let rainWords = ['HAPPY', 'BIRTHDAY', 'LOVE'];
let rainColors = ['#ff4fcf', '#a67dff'];

function renderMainText() {
  const words = mainTextInput.value
    .split('|')
    .map((word) => word.trim())
    .filter(Boolean);
  mainText.textContent = words.length ? words.join(' ') : 'HAPPY BIRTHDAY TO YOU';
  mainText.style.color = mainTextColor.value;
}

function createRainWord() {
  const el = document.createElement('span');
  el.className = 'rain-word';
  el.textContent = rainWords[Math.floor(Math.random() * rainWords.length)];
  el.style.left = `${Math.random() * 100}vw`;
  el.style.fontSize = `${16 + Math.random() * 24}px`;
  el.style.animationDuration = `${4 + Math.random() * 7}s`;
  el.style.color = rainColors[Math.floor(Math.random() * rainColors.length)];
  rainLayer.appendChild(el);
  setTimeout(() => el.remove(), 12000);
}

function toggleAudio() {
  if (audio.paused) {
    audio.play().then(() => {
      musicToggle.textContent = '⏸';
    }).catch(() => {
      musicToggle.textContent = '▶';
    });
  } else {
    audio.pause();
    musicToggle.textContent = '▶';
  }
}

openSettingsBtn.addEventListener('click', () => {
  settingsPanel.classList.remove('hidden');
  settingsPanel.setAttribute('aria-hidden', 'false');
});

closeSettingsBtn.addEventListener('click', () => {
  settingsPanel.classList.add('hidden');
  settingsPanel.setAttribute('aria-hidden', 'true');
});

musicToggle.addEventListener('click', toggleAudio);
previewBtn.addEventListener('click', toggleAudio);

musicSelect.addEventListener('change', () => {
  const value = musicSelect.value;
  if (musicMap[value]) {
    audio.src = musicMap[value];
    audio.load();
  }
});

mainTextInput.addEventListener('input', renderMainText);
mainTextColor.addEventListener('input', renderMainText);

rainWordsInput.addEventListener('input', () => {
  rainWords = rainWordsInput.value
    .split('|')
    .map((word) => word.trim())
    .filter(Boolean);
  if (!rainWords.length) rainWords = ['HAPPY', 'BIRTHDAY'];
});

function updateRainColors() {
  rainColors = [rainColor1Input.value, rainColor2Input.value];
}

rainColor1Input.addEventListener('input', updateRainColors);
rainColor2Input.addEventListener('input', updateRainColors);

document.querySelectorAll('.preset[data-color]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.preset').forEach((el) => el.classList.remove('active'));
    button.classList.add('active');
    rainColor1Input.value = button.dataset.color;
    updateRainColors();
  });
});

for (let i = 0; i < 14; i += 1) {
  setTimeout(createRainWord, i * 180);
}
setInterval(createRainWord, 200);

renderMainText();

