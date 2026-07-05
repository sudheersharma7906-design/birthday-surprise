// Custom Cursor Trail Throttling
let lastMouseTime = 0;
document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastMouseTime > 50) {
    createHeartTrail(e.clientX, e.clientY);
    lastMouseTime = now;
  }
});

function createHeartTrail(x, y) {
  const trail = document.createElement('div');
  trail.className = 'heart-trail';
  trail.style.left = `${x}px`;
  trail.style.top = `${y}px`;
  
  // Random scale
  const scale = 0.5 + Math.random() * 0.8;
  trail.style.transform = `translate(-50%, -50%) scale(${scale})`;
  
  // Random red/pink shade
  const hue = 340 + Math.random() * 30; // 340 to 10
  trail.style.filter = `drop-shadow(0 0 5px hsla(${hue}, 100%, 60%, 0.5))`;
  
  document.body.appendChild(trail);
  setTimeout(() => {
    trail.remove();
  }, 1000);
}

// Falling Flower Petals System
const petalsContainer = document.getElementById('petals-container');
const petalShapes = [
  "M10 0 C 20 0, 30 10, 30 25 C 30 40, 15 50, 0 35 C -5 20, 0 0, 10 0 Z", // Basic petal
  "M15 0 Q 30 10 25 30 T 0 30 Q -10 10 15 0" // Cherry Blossom style
];

function spawnPetal() {
  const petal = document.createElement('div');
  petal.className = 'petal';
  
  const size = 10 + Math.random() * 15;
  petal.style.width = `${size}px`;
  petal.style.height = `${size}px`;
  
  petal.style.left = `${Math.random() * 100}vw`;
  petal.style.top = `-5%`;
  
  const duration = 6 + Math.random() * 8;
  petal.style.animationDuration = `${duration}s`;
  
  const delay = Math.random() * 5;
  petal.style.animationDelay = `-${delay}s`;
  
  // Custom rotation and path
  const shape = petalShapes[Math.floor(Math.random() * petalShapes.length)];
  petal.innerHTML = `<svg viewBox="-15 -10 50 60" style="width:100%; height:100%;"><path d="${shape}" fill="#ffd1dc" opacity="${0.6 + Math.random() * 0.4}"/></svg>`;
  
  petalsContainer.appendChild(petal);
  
  // Remove after animation completes
  setTimeout(() => {
    petal.remove();
  }, (duration) * 1000);
}

// Keep 30 petals active
for (let i = 0; i < 30; i++) {
  spawnPetal();
}
setInterval(spawnPetal, 400);

// Floating Clickable Hearts Background
const heartsBg = document.getElementById('floating-hearts-bg');
const sweetMessages = [
  "I Love You! ❤️",
  "You are beautiful! 🌸",
  "My heart belongs to you! 💞",
  "You make my world brighter! ☀️",
  "Forever and always! ♾️",
  "You're my princess! 👑",
  "So lucky to have you! 🍀",
  "Sending you a warm hug! 🤗"
];

function spawnFloatingHeart() {
  const heart = document.createElement('div');
  heart.className = 'bg-heart';
  
  const size = 20 + Math.random() * 40;
  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;
  heart.style.left = `${Math.random() * 95}vw`;
  
  const duration = 10 + Math.random() * 10;
  heart.style.animationDuration = `${duration}s`;
  
  // Hue shift (pink to red)
  const hue = 340 + Math.random() * 25;
  heart.style.backgroundColor = `hsl(${hue}, 90%, 65%)`;
  heart.style.opacity = `${0.08 + Math.random() * 0.12}`;
  
  // Click reveal message
  heart.addEventListener('click', (e) => {
    e.stopPropagation();
    // Play synth sound
    playSynthTone(523.25, 'triangle', 0.2); // C5 tone
    // Toast message
    showToast(sweetMessages[Math.floor(Math.random() * sweetMessages.length)]);
    // Bubble scale animation
    heart.style.transform = 'scale(2.5)';
    heart.style.opacity = '0';
    setTimeout(() => heart.remove(), 300);
  });
  
  heartsBg.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}

setInterval(spawnFloatingHeart, 1200);

function showToast(text) {
  // Remove existing toast if any
  const existing = document.querySelector('.heart-toast');
  if (existing) existing.remove();
  
  const toast = document.createElement('div');
  toast.className = 'heart-toast';
  toast.innerHTML = text;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

// 1. Password Verification
const correctPassword = "shivangi";
const altPassword = "1004"; // anniversary
const passwordOverlay = document.getElementById('password-overlay');
const passwordInput = document.getElementById('password-input');
const passwordBtn = document.getElementById('password-btn');
const passwordCard = document.getElementById('password-card');
const passwordError = document.getElementById('password-error');
const loadingScreen = document.getElementById('loading-screen');
const mainContent = document.getElementById('main-content');

passwordBtn.addEventListener('click', checkPassword);
passwordInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') checkPassword();
});

function checkPassword() {
  const entered = passwordInput.value.trim().toLowerCase();
  if (entered === correctPassword || entered === altPassword) {
    // Correct
    playSynthTone(587.33, 'sine', 0.3); // D5 success tone
    passwordOverlay.style.opacity = '0';
    setTimeout(() => {
      passwordOverlay.style.display = 'none';
      startLoadingSequence();
    }, 800);
  } else {
    // Incorrect
    passwordError.innerText = "Oops! That's not the magic word 💖";
    passwordCard.classList.add('shake');
    playSynthTone(220, 'sawtooth', 0.25); // low fail tone
    setTimeout(() => {
      passwordCard.classList.remove('shake');
    }, 500);
  }
}

// 2. Loading Screen Logic
function startLoadingSequence() {
  loadingScreen.style.display = 'flex';
  initMusic(); // Play music immediately upon entry
  
  setTimeout(() => {
    // Fade out loading
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      // Show main site
      mainContent.style.display = 'block';
      setTimeout(() => {
        mainContent.style.opacity = '1';
        window.scrollTo(0, 0);
      }, 100);
    }, 1000);
  }, 5000); // 5 seconds
}

// 3. Audio & Music Box Synthesizer Engine
let audioCtx = null;
let currentSongIndex = 0;
let isPlaying = false;
let isMuted = false;

// Actual MP3 music file
const bgMusic = new Audio('assets/music/birthday_piano.mp3');
bgMusic.loop = true;

// Simulated playlist
const playlist = [
  { title: "Happy Birthday to You 🎹", freqList: [261.63, 261.63, 293.66, 261.63, 349.23, 329.63, 261.63, 261.63, 293.66, 261.63, 392.00, 349.23, 261.63, 261.63, 523.25, 440.00, 349.23, 329.63, 293.66, 466.16, 466.16, 440.00, 349.23, 392.00, 349.23] },
  { title: "Perfect – Ed Sheeran", freqList: [261.63, 293.66, 329.63, 349.23, 392.00, 440.00] },
  { title: "Until I Found You – Stephen Sanchez", freqList: [329.63, 349.23, 392.00, 440.00, 493.88, 523.25] },
  { title: "Photograph – Ed Sheeran", freqList: [261.63, 329.63, 392.00, 523.25, 493.88, 440.00] },
  { title: "Love Story – Taylor Swift", freqList: [293.66, 329.63, 392.00, 440.00, 587.33, 493.88] }
];

const musicPlayBtn = document.getElementById('music-play');
const musicMuteBtn = document.getElementById('music-mute');
const musicTitle = document.getElementById('music-title');
const vinylDisc = document.getElementById('vinyl-disc');

musicPlayBtn.addEventListener('click', toggleMusic);
musicMuteBtn.addEventListener('click', toggleMute);
document.getElementById('music-next').addEventListener('click', nextSong);
document.getElementById('music-prev').addEventListener('click', prevSong);

// Audio box synth sound
function playSynthTone(freq, type = 'sine', duration = 0.5, volume = 0.1) {
  if (isMuted) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    console.log("AudioContext blocked or failed", e);
  }
}

// Background melody player
let melodyInterval = null;
function startBackgroundMelody() {
  if (melodyInterval) clearInterval(melodyInterval);
  
  let noteIndex = 0;
  melodyInterval = setInterval(() => {
    if (!isPlaying || isMuted) return;
    const song = playlist[currentSongIndex];
    const notes = song.freqList;
    const freq = notes[noteIndex % notes.length];
    
    // Play arpeggio
    playSynthTone(freq, 'sine', 0.8, 0.08);
    // Double note for warmth
    setTimeout(() => {
      if (isPlaying && !isMuted) playSynthTone(freq * 1.5, 'triangle', 0.5, 0.03);
    }, 200);
    
    noteIndex++;
  }, 600);
}

function handleMusicPlayback() {
  // Clear any active synth intervals
  if (melodyInterval) {
    clearInterval(melodyInterval);
    melodyInterval = null;
  }
  
  if (!isPlaying) {
    bgMusic.pause();
    return;
  }
  
  // Sync mute state
  bgMusic.muted = isMuted;
  
  if (currentSongIndex === 0) {
    // Play user's high-quality MP3 track
    bgMusic.play().catch(err => {
      console.log("Audio play blocked by browser. Playing synth fallback.", err);
      // Fallback to synth if MP3 fails/blocked
      startBackgroundMelody();
    });
  } else {
    // Pause MP3 and play music box synth arpeggios
    bgMusic.pause();
    startBackgroundMelody();
  }
}

function initMusic() {
  isPlaying = true;
  musicPlayBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  vinylDisc.classList.add('vinyl-spin');
  musicTitle.innerText = playlist[currentSongIndex].title;
  handleMusicPlayback();
}

function toggleMusic() {
  if (isPlaying) {
    isPlaying = false;
    musicPlayBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    vinylDisc.classList.remove('vinyl-spin');
    bgMusic.pause();
    if (melodyInterval) {
      clearInterval(melodyInterval);
      melodyInterval = null;
    }
  } else {
    isPlaying = true;
    musicPlayBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    vinylDisc.classList.add('vinyl-spin');
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
    handleMusicPlayback();
  }
}

function toggleMute() {
  if (isMuted) {
    isMuted = false;
    musicMuteBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    bgMusic.muted = false;
  } else {
    isMuted = true;
    musicMuteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    bgMusic.muted = true;
  }
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  musicTitle.innerText = playlist[currentSongIndex].title;
  playSynthTone(440, 'sine', 0.15);
  if (isPlaying) handleMusicPlayback();
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
  musicTitle.innerText = playlist[currentSongIndex].title;
  playSynthTone(330, 'sine', 0.15);
  if (isPlaying) handleMusicPlayback();
}

// 4. Welcome Screen button scrolls to Quiz
const welcomeBtn = document.getElementById('welcome-btn');
welcomeBtn.addEventListener('click', () => {
  document.getElementById('quiz-section').scrollIntoView({ behavior: 'smooth' });
});

// 5. Quiz Section Data & Logic
const quizData = [
  {
    question: "Where did we first meet?",
    options: ["A local cafe ☕", "A beautiful library 📚", "On a sunny beach 🌊", "In college hallway 🏫"],
    correct: 3
  },
  {
    question: "What is our absolute favorite food?",
    options: ["Delicious Pizza 🍕", "Yummy Noodles 🍜", "Spicy Tacos 🌮", "Creamy Pasta 🍝"],
    correct: 1
  },
  {
    question: "Who said 'I love you' first?",
    options: ["Definitely Me! 🙋‍♂️", "You, sweetie! 🙋‍♀️", "We said it at the same time! 💞", "Our pets did 🐶"],
    correct: 2
  },
  {
    question: "Where is our dream travel destination?",
    options: ["Romantic Paris 🗼", "Tropical Maldives 🏝️", "To visit a foreign country ✈️", "Historical Kyoto ⛩️"],
    correct: 2
  }
];

let currentQuizIndex = 0;
const quizProgressText = document.getElementById('quiz-progress');
const quizQuestionText = document.getElementById('quiz-question-text');
const quizOptionsDiv = document.getElementById('quiz-options');
const lockedWrapper = document.getElementById('locked-wrapper');

function loadQuizQuestion() {
  const current = quizData[currentQuizIndex];
  quizProgressText.innerText = `Question ${currentQuizIndex + 1} of ${quizData.length}`;
  quizQuestionText.innerText = current.question;
  quizOptionsDiv.innerHTML = '';
  
  current.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt-btn';
    btn.innerText = opt;
    btn.addEventListener('click', () => handleQuizAnswer(idx, btn));
    quizOptionsDiv.appendChild(btn);
  });
}

// Load first question on load
loadQuizQuestion();

function handleQuizAnswer(selectedIdx, btnElement) {
  const current = quizData[currentQuizIndex];
  if (selectedIdx === current.correct) {
    btnElement.classList.add('correct');
    // Disable all options
    document.querySelectorAll('.quiz-opt-btn').forEach(btn => btn.style.pointerEvents = 'none');
    playSynthTone(523.25, 'sine', 0.25); // chime
    
    setTimeout(() => {
      currentQuizIndex++;
      if (currentQuizIndex < quizData.length) {
        loadQuizQuestion();
      } else {
        // Quiz completed! Unlock
        unlockSurprise();
      }
    }, 1000);
  } else {
    btnElement.classList.add('wrong');
    playSynthTone(180, 'sawtooth', 0.3); // low buzz
    // Shake button
    setTimeout(() => {
      btnElement.classList.remove('wrong');
    }, 600);
  }
}

function unlockSurprise() {
  // Fire confetti
  confetti({
    particleCount: 150,
    spread: 80,
    origin: { y: 0.6 }
  });
  
  // Play grand harp chord
  const chord = [261.63, 329.63, 392.00, 523.25, 659.25];
  chord.forEach((freq, i) => {
    setTimeout(() => playSynthTone(freq, 'sine', 1.5, 0.05), i * 80);
  });
  
  // Remove locks
  lockedWrapper.classList.remove('locked-content');
  lockedWrapper.classList.add('unlocked-content');
  
  // Clean up quiz heading or change it to complete
  const header = document.querySelector('#quiz-section .section-header');
  header.innerHTML = `<h2><i class="fa-solid fa-heart-circle-check" style="color:var(--color-love-red);"></i> Unlocked!</h2><p>You have unlocked my heart. Scroll down for your surprises...</p>`;
  
  document.querySelector('.quiz-card').innerHTML = `
    <div style="text-align:center; padding: 40px 0;">
      <h3 style="font-family:var(--font-handwritten); font-size:2.5rem; color:var(--color-rose-gold); margin-bottom:15px;">Congratulations, My Love!</h3>
      <p style="font-size:1.1rem; opacity:0.8;">You got every single answer right. But then again, you always know me best. ❤️</p>
      <i class="fa-solid fa-arrow-down-long" style="font-size: 2rem; color:var(--color-love-red); margin-top:30px; animation: heartbeat 1.5s infinite;"></i>
    </div>
  `;
  
  // Scroll down smoothly to love letter
  setTimeout(() => {
    document.getElementById('love-letter-section').scrollIntoView({ behavior: 'smooth' });
  }, 1500);
}

// 6. Envelope Love Letter Opening
const envelopeWrapper = document.getElementById('envelope-wrapper');
const letterTextDiv = document.getElementById('letter-text');
const envelopeHeart = document.getElementById('envelope-heart');
const letterCloseBtn = document.getElementById('letter-close-btn');

const letterMessage = `Dear Love Shivangi,

Today is not just another day.

Today is the day the most beautiful person came into this world.

Thank you for making my life brighter, happier, and full of unforgettable memories.

Happy Birthday ❤️`;

let typingInterval = null;

envelopeWrapper.addEventListener('click', (e) => {
  if (e.target.closest('#letter-close-btn')) return; // ignore close clicks here
  if (!envelopeWrapper.classList.contains('open')) {
    playSynthTone(349.23, 'sine', 0.25); // F4
    envelopeWrapper.classList.add('open');
    setTimeout(startLetterTyping, 1200);
  }
});

letterCloseBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  envelopeWrapper.classList.remove('open');
  if (typingInterval) clearInterval(typingInterval);
  letterTextDiv.textContent = '';
  playSynthTone(293.66, 'sine', 0.2); // D4
});

function startLetterTyping() {
  letterTextDiv.textContent = '';
  let index = 0;
  if (typingInterval) clearInterval(typingInterval);
  
  typingInterval = setInterval(() => {
    if (index < letterMessage.length) {
      letterTextDiv.textContent += letterMessage[index];
      // Play a soft typewriter clicking sound
      if (index % 3 === 0) playSynthTone(800, 'triangle', 0.02, 0.005);
      index++;
    } else {
      clearInterval(typingInterval);
      // Fire tiny confetti burst on letter completion
      confetti({
        particleCount: 20,
        spread: 30,
        origin: { y: 0.3, x: 0.5 }
      });
    }
  }, 50);
}

const birthDate = new Date('2006-07-30T00:00:00');

function updateCountdown() {
  const now = new Date();
  const diffMs = now - birthDate;
  
  // Total Days calculations
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  document.getElementById('days-banner').innerText = `${totalDays} Days of You 💖`;
  
  // Live grid breakdown
  let years = now.getFullYear() - birthDate.getFullYear();
  let months = now.getMonth() - birthDate.getMonth();
  let days = now.getDate() - birthDate.getDate();
  
  if (days < 0) {
    months--;
    // Get last day of previous month
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }
  
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  
  document.getElementById('ticker-years').innerText = String(years).padStart(2, '0');
  document.getElementById('ticker-months').innerText = String(months).padStart(2, '0');
  document.getElementById('ticker-days').innerText = String(days).padStart(2, '0');
  document.getElementById('ticker-hours').innerText = String(hours).padStart(2, '0');
  document.getElementById('ticker-minutes').innerText = String(minutes).padStart(2, '0');
  document.getElementById('ticker-seconds').innerText = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// 8. Polaroid Memories Lightbox
const memoryData = [
  {
    date: "Oct 24, 2025",
    place: "Festive Night Out",
    title: "Under the Lights",
    story: "Standing next to you under the night sky, everything else became a blur. You looked absolutely stunning in black, and I couldn't take my eyes off you. A night to remember forever."
  },
  {
    date: "Dec 31, 2025",
    place: "New Year's Eve",
    title: "Mirror Magic",
    story: "Getting ready together and taking this quick mirror selfie. The way you leaned in and smiled made me realize how incredibly lucky I am to have you as my partner. Cheers to another year together."
  },
  {
    date: "Feb 14, 2026",
    place: "Valentine's Day Dinner",
    title: "Our Valentine Date",
    story: "A beautiful dinner date. Holding you close, celebrating our love, and looking forward to a lifetime of Valentine dates with you by my side."
  },
  {
    date: "April 12, 2026",
    place: "The Glass Lounge",
    title: "Through the Looking Glass",
    story: "Capturing this beautiful moment in the circular mirror. Your profile is so graceful, and every picture of us together is my new favorite memory."
  }
];

const lightbox = document.getElementById('lightbox');
const lightboxVisual = document.getElementById('lightbox-visual');
const lightboxDate = document.getElementById('lightbox-date');
const lightboxPlace = document.getElementById('lightbox-place');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxStory = document.getElementById('lightbox-story');

function openMemory(index) {
  const data = memoryData[index];
  const polaroids = document.querySelectorAll('.polaroid');
  const targetPolaroid = polaroids[index];
  const targetImg = targetPolaroid.querySelector('img').cloneNode(true);
  
  lightboxVisual.innerHTML = '';
  lightboxVisual.appendChild(targetImg);
  
  lightboxDate.innerText = data.date;
  lightboxPlace.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${data.place}`;
  lightboxTitle.innerText = data.title;
  lightboxStory.innerText = data.story;
  
  lightbox.style.display = 'flex';
  playSynthTone(392.00, 'sine', 0.25); // G4
}

function closeMemory() {
  lightbox.style.display = 'none';
  playSynthTone(329.63, 'sine', 0.2); // E4
}

// 9. Timeline scroll observer
const timelineItems = document.querySelectorAll('.timeline-item');
const observerOptions = {
  root: null,
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      playSynthTone(523.25, 'sine', 0.05, 0.02); // very soft chime
    }
  });
}, observerOptions);

timelineItems.forEach(item => observer.observe(item));

// 10. Reasons why I love you slider
const sliderInner = document.getElementById('slider-inner');
const slides = document.querySelectorAll('.slide-card');
const prevArrow = document.getElementById('slider-prev');
const nextArrow = document.getElementById('slider-next');
const dotsContainer = document.getElementById('slider-dots');

let currentSlideIndex = 0;

// Create dots
slides.forEach((_, index) => {
  const dot = document.createElement('div');
  dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
  dot.addEventListener('click', () => goToSlide(index));
  dotsContainer.appendChild(dot);
});

function updateSlider() {
  sliderInner.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
  
  // Update dots
  const dots = document.querySelectorAll('.slider-dot');
  dots.forEach((dot, index) => {
    if (index === currentSlideIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function goToSlide(index) {
  currentSlideIndex = index;
  updateSlider();
  playSynthTone(349.23, 'sine', 0.15); // F4
}

prevArrow.addEventListener('click', () => {
  currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
  updateSlider();
  playSynthTone(349.23, 'sine', 0.15);
});

nextArrow.addEventListener('click', () => {
  currentSlideIndex = (currentSlideIndex + 1) % slides.length;
  updateSlider();
  playSynthTone(392.00, 'sine', 0.15);
});

// 11. Open When letters overlay
const openWhenDialog = document.getElementById('openwhen-dialog');
const openWhenTitle = document.getElementById('openwhen-title');
const openWhenText = document.getElementById('openwhen-text');

const openWhenMessages = [
  "My Love, if you are reading this, I wish I could hold you close right now. Take a deep breath. Whatever is making you sad will pass, and I am right here with you. You are incredibly strong. Smile for me, please? ❤️",
  "Hey beautiful, miss me? Close your eyes and wrap your arms around yourself. That's a hug from me to you. I'm counting down the hours until I get to hold you for real. You're always in my thoughts! 🥺💞",
  "Take a deep breath... count to ten. I know you're mad, but remember I love you to pieces. Let's talk it out when you feel ready. I promise to listen, understand, and make you laugh. Hugs! 😤❤️",
  "Yay! Your happiness is my absolute favorite thing. I hope your smile is lighting up the whole room right now. Thank you for filling my life with so much joy and laughter. Let's celebrate! 🥳💕",
  "Hey, sit back, relax your shoulders, and breathe. You are doing amazing, and everything will be okay. Don't carry the weight of the world. I'm right here to support you. Let's grab some coffee and relax! ☕🌸",
  "Just in case you forgot: You are the most beautiful, caring, intelligent, and wonderful person I've ever met. I am so deeply in love with you, and my feelings grow stronger every single day. You are my world! ❤️👑"
];

function openLetter(index) {
  const cards = document.querySelectorAll('.openwhen-card');
  const cardTitle = cards[index].querySelector('h3').innerText;
  
  openWhenTitle.innerText = cardTitle;
  openWhenText.innerText = openWhenMessages[index];
  openWhenDialog.style.display = 'flex';
  
  playSynthTone(392.00, 'sine', 0.3); // G4
}

function closeLetter() {
  openWhenDialog.style.display = 'none';
  playSynthTone(329.63, 'sine', 0.2); // E4
}

// 12. Secret Gift Box Opening & Carousel
const giftBoxWrapper = document.getElementById('gift-box-wrapper');
const giftRevealContainer = document.getElementById('gift-reveal-container');
const giftItemVisual = document.getElementById('gift-item-visual');
const giftItemTitle = document.getElementById('gift-item-title');
const giftItemDesc = document.getElementById('gift-item-desc');
const giftPrevBtn = document.getElementById('gift-prev-btn');
const giftNextBtn = document.getElementById('gift-next-btn');

const giftsData = [
  {
    title: "A Romantic Promise Ring",
    desc: "A sparkling promise to keep loving you, showing my commitment to make you happy forever and build our future together.",
    svg: `<svg viewBox="0 0 100 100">
      <circle cx="50" cy="55" r="25" fill="none" stroke="#ffd700" stroke-width="5"/>
      <polygon points="50,22 62,35 50,48 38,35" fill="#e0f7fa" stroke="#00e5ff" stroke-width="2"/>
      <circle cx="50" cy="35" r="4" fill="#ffffff"/>
      <!-- sparkles -->
      <line x1="28" y1="20" x2="33" y2="25" stroke="#ffd700" stroke-width="2" stroke-linecap="round"/>
      <line x1="72" y1="20" x2="67" y2="25" stroke="#ffd700" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },
  {
    title: "Heart Chocolate Box",
    desc: "Sweet and creamy heart chocolates because you bring so much sweetness into my life. Every bite is as sweet as your smile.",
    svg: `<svg viewBox="0 0 100 100">
      <path d="M50 80 C 50 80, 15 50, 15 32 C 15 15, 38 12, 50 28 C 62 12, 85 15, 85 32 C 85 50, 50 80, 50 80 Z" fill="#d32f2f" stroke="#b71c1c" stroke-width="3"/>
      <!-- chocolate details -->
      <circle cx="35" cy="35" r="6" fill="#5d4037"/>
      <circle cx="65" cy="35" r="6" fill="#3e2723"/>
      <circle cx="50" cy="55" r="7" fill="#795548"/>
      <!-- decorative lines -->
      <path d="M30 35 Q 35 30 40 35" fill="none" stroke="#fff" stroke-width="1.5"/>
      <path d="M60 35 Q 65 30 70 35" fill="none" stroke="#ffd700" stroke-width="1.5"/>
    </svg>`
  },
  {
    title: "A Fluffy Teddy Bear",
    desc: "A warm, cuddly teddy bear to keep you company and hold tight when I'm not physically there. He represents my hugs for you.",
    svg: `<svg viewBox="0 0 100 100">
      <!-- Ears -->
      <circle cx="30" cy="35" r="12" fill="#8d6e63"/>
      <circle cx="70" cy="35" r="12" fill="#8d6e63"/>
      <circle cx="30" cy="35" r="7" fill="#d7ccc8"/>
      <circle cx="70" cy="35" r="7" fill="#d7ccc8"/>
      <!-- Head -->
      <circle cx="50" cy="52" r="24" fill="#a1887f" stroke="#8d6e63" stroke-width="2"/>
      <!-- Muzzle -->
      <circle cx="50" cy="58" r="8" fill="#d7ccc8"/>
      <polygon points="50,54 53,58 47,58" fill="#3e2723"/>
      <!-- Eyes -->
      <circle cx="42" cy="46" r="3" fill="#212121"/>
      <circle cx="58" cy="46" r="3" fill="#212121"/>
      <!-- Heart on bear -->
      <path d="M50 78 C 50 78, 42 70, 42 66 C 42 62, 47 62, 50 64 C 53 62, 58 62, 58 66 C 58 70, 50 78, 50 78 Z" fill="#ff5252"/>
    </svg>`
  },
  {
    title: "Unlimited Free Date Coupon",
    desc: "Redeemable at any time for one romantic dinner date, movie outing, or cozy getaway of your choice. Valid forever! 🎟️",
    svg: `<svg viewBox="0 0 100 100">
      <rect x="15" y="25" width="70" height="50" rx="8" fill="#ffeb3b" stroke="#fbc02d" stroke-width="3"/>
      <circle cx="15" cy="50" r="8" fill="#140d21"/>
      <circle cx="85" cy="50" r="8" fill="#140d21"/>
      <text x="50" y="48" font-family="var(--font-sans)" font-size="6" font-weight="700" fill="#f57f17" text-anchor="middle">DATE COUPON</text>
      <text x="50" y="60" font-family="var(--font-handwritten)" font-size="10" font-weight="700" fill="#d84315" text-anchor="middle">Valid Forever ❤️</text>
      <line x1="28" y1="35" x2="72" y2="35" stroke="#fbc02d" stroke-dasharray="3,3"/>
      <line x1="28" y1="65" x2="72" y2="65" stroke="#fbc02d" stroke-dasharray="3,3"/>
    </svg>`
  }
];

let currentGiftIndex = 0;

giftBoxWrapper.addEventListener('click', () => {
  if (!giftBoxWrapper.classList.contains('open')) {
    giftBoxWrapper.classList.add('open');
    playSynthTone(293.66, 'sine', 0.3); // open box sound
    
    // Confetti burst from box
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7, x: 0.5 }
      });
      // Show reveal card
      giftBoxWrapper.style.display = 'none';
      giftRevealContainer.style.display = 'block';
      loadGiftItem();
    }, 1200);
  }
});

function loadGiftItem() {
  const current = giftsData[currentGiftIndex];
  giftItemVisual.innerHTML = current.svg;
  giftItemTitle.innerText = current.title;
  giftItemDesc.innerText = current.desc;
  
  // Play soft chime
  playSynthTone(523.25, 'sine', 0.2);
}

giftPrevBtn.addEventListener('click', () => {
  currentGiftIndex = (currentGiftIndex - 1 + giftsData.length) % giftsData.length;
  loadGiftItem();
});

giftNextBtn.addEventListener('click', () => {
  currentGiftIndex = (currentGiftIndex + 1) % giftsData.length;
  loadGiftItem();
});

// 13. Cake Candle Blowing Logic
const cakeBtn = document.getElementById('cake-btn');
const candles = document.querySelectorAll('.candle');
const micHintText = document.getElementById('mic-hint');
let candlesBlown = false;

// Audio Mic detection fallback
let micStream = null;
let micAudioContext = null;
let micAnalyser = null;
let micBuffer = null;

cakeBtn.addEventListener('click', () => {
  if (!candlesBlown) {
    blowCandles();
  }
});

// Auto-request microphone for blowing
async function setupMicBlow() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    micStream = stream;
    micAudioContext = new (window.AudioContext || window.webkitAudioContext)();
    micAnalyser = micAudioContext.createAnalyser();
    const source = micAudioContext.createMediaStreamSource(stream);
    
    source.connect(micAnalyser);
    micAnalyser.fftSize = 256;
    const bufferLength = micAnalyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    micHintText.innerHTML = `<i class="fa-solid fa-microphone"></i> Mic active! Blow into your microphone to blow the candles out!`;
    
    function checkBlowVolume() {
      if (candlesBlown) return;
      micAnalyser.getByteFrequencyData(dataArray);
      
      // Calculate average volume
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
      }
      const average = sum / bufferLength;
      
      // Blow threshold
      if (average > 65) {
        blowCandles();
        // stop mic
        stream.getTracks().forEach(track => track.stop());
      } else {
        requestAnimationFrame(checkBlowVolume);
      }
    }
    
    checkBlowVolume();
  } catch (err) {
    console.log("Mic blow not allowed or supported.", err);
    micHintText.innerText = "Microphone access denied. You can click the button to blow candles!";
  }
}

// Set up mic detection after surprise unlock
setupMicBlow();

function blowCandles() {
  candlesBlown = true;
  
  // Add blown class to all candles
  candles.forEach(c => c.classList.add('blown'));
  playSynthTone(220, 'sine', 0.5, 0.2); // wind blowing sound
  
  // Play fireworks sound effect
  const fireworksSound = new Audio('assets/music/fireworks.mp3');
  fireworksSound.volume = 0.6;
  if (!isMuted) {
    fireworksSound.play().catch(err => console.log("Sound play blocked", err));
  }
  
  cakeBtn.style.display = 'none';
  micHintText.innerHTML = `<h3><i class="fa-solid fa-wand-magic-sparkles" style="color:var(--color-gold);"></i> Sparkles!</h3>`;
  
  // Confetti explosion
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 }
  });
  
  // Dynamic fireworks triggers
  startFireworksDisplay();
  
  // Show birthday pop up modal (like welcome screen style)
  setTimeout(() => {
    const bdayPopup = document.getElementById('birthday-popup-overlay');
    bdayPopup.style.display = 'flex';
    
    // Show bottom toast pop up
    const toast = document.getElementById('bottom-bday-toast');
    toast.style.bottom = '25px';
    toast.style.opacity = '1';
    
    playSynthTone(587.33, 'sine', 0.3); // success chord
  }, 1000);
}

// Handler to close birthday popup and transition to proposal
document.getElementById('bday-popup-close-btn').addEventListener('click', () => {
  document.getElementById('birthday-popup-overlay').style.display = 'none';
  
  // Hide bottom toast pop up
  const toast = document.getElementById('bottom-bday-toast');
  toast.style.bottom = '-150px';
  toast.style.opacity = '0';
  
  // Scroll to proposal section
  document.getElementById('proposal-section').scrollIntoView({ behavior: 'smooth' });
  startProposalTyping();
});

// 14. Starry Night Canvas Background & Typing Ending
const starsCanvas = document.getElementById('stars-canvas');
const ctxStars = starsCanvas.getContext('2d');

let stars = [];

function resizeStarsCanvas() {
  starsCanvas.width = starsCanvas.offsetWidth;
  starsCanvas.height = starsCanvas.offsetHeight;
  initStars();
}

function initStars() {
  stars = [];
  const count = Math.floor((starsCanvas.width * starsCanvas.height) / 8000);
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * starsCanvas.width,
      y: Math.random() * starsCanvas.height,
      radius: 0.5 + Math.random() * 1.5,
      alpha: Math.random(),
      speed: 0.01 + Math.random() * 0.03
    });
  }
}

function animateStars() {
  ctxStars.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
  stars.forEach(star => {
    star.alpha += star.speed;
    if (star.alpha > 1 || star.alpha < 0) {
      star.speed = -star.speed;
    }
    ctxStars.beginPath();
    ctxStars.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctxStars.fillStyle = `rgba(255, 209, 220, ${Math.max(0, star.alpha)})`;
    ctxStars.fill();
  });
  requestAnimationFrame(animateStars);
}

window.addEventListener('resize', resizeStarsCanvas);
resizeStarsCanvas();
animateStars();

// Proposal Scene Typing
const finalMessage = `You have reached the end...

But this is only the beginning of our journey.

I promise to keep making you smile.

Happy Birthday,
My Love Shivangi ❤️`;

const finalTextTyping = document.getElementById('final-text-typing');
const proposalTriggerBtn = document.getElementById('proposal-trigger-btn');
let finalTypingInterval = null;

function startProposalTyping() {
  finalTextTyping.textContent = '';
  proposalTriggerBtn.style.display = 'none';
  
  let index = 0;
  if (finalTypingInterval) clearInterval(finalTypingInterval);
  
  finalTypingInterval = setInterval(() => {
    if (index < finalMessage.length) {
      finalTextTyping.textContent += finalMessage[index];
      if (index % 3 === 0) playSynthTone(600, 'sine', 0.03, 0.003);
      index++;
    } else {
      clearInterval(finalTypingInterval);
      // Show final surprise button
      proposalTriggerBtn.style.display = 'inline-block';
      // Pulse animation
      proposalTriggerBtn.style.animation = 'heartbeat 1.5s infinite';
    }
  }, 70);
}

// One Last Click opens Proposal Modal
proposalTriggerBtn.addEventListener('click', () => {
  document.getElementById('proposal-modal').style.display = 'flex';
  playSynthTone(587.33, 'sine', 0.3); // success D5 tone
});

// Proposal Modal buttons
const proposalYes = document.getElementById('proposal-yes');
const proposalNo = document.getElementById('proposal-no');
const celebrationOverlay = document.getElementById('celebration-overlay');

// "NO" button escapes on hover or click! (classic cute easter egg)
function moveNoButton() {
  const container = proposalNo.parentElement;
  const rect = container.getBoundingClientRect();
  
  // Calculate a random position within container bounds
  const xMax = rect.width - proposalNo.offsetWidth - 20;
  const yMax = rect.height - proposalNo.offsetHeight - 20;
  
  const randomX = Math.max(10, Math.random() * xMax);
  const randomY = Math.max(10, Math.random() * yMax);
  
  proposalNo.style.left = `${randomX}px`;
  proposalNo.style.top = `${randomY}px`;
  
  // Play tiny squeak sound
  playSynthTone(880, 'triangle', 0.05, 0.05);
}

proposalNo.addEventListener('mouseover', moveNoButton);
proposalNo.addEventListener('click', moveNoButton);

proposalYes.addEventListener('click', () => {
  // Hide modal
  document.getElementById('proposal-modal').style.display = 'none';
  
  // Show celebration overlay
  celebrationOverlay.style.display = 'flex';
  
  // Play high pitched arpeggios
  const victoryChord = [523.25, 659.25, 783.99, 1046.50, 1318.51];
  victoryChord.forEach((freq, idx) => {
    setTimeout(() => playSynthTone(freq, 'sine', 1.8, 0.08), idx * 100);
  });
  
  // Confetti spray storm
  const duration = 15 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
  
  // Activate heavy fireworks
  enableGrandFireworks();
});

// 15. Fireworks Canvas Engine (Full Screen)
const fwCanvas = document.getElementById('fireworks-canvas');
const fwCtx = fwCanvas.getContext('2d');

let fwParticles = [];
let fireworksArray = [];
let fwInterval = null;
let fireworksActive = false;

function resizeFireworksCanvas() {
  fwCanvas.width = window.innerWidth;
  fwCanvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeFireworksCanvas);
resizeFireworksCanvas();

class Firework {
  constructor() {
    this.x = Math.random() * fwCanvas.width;
    this.y = fwCanvas.height;
    this.targetY = Math.random() * (fwCanvas.height * 0.5);
    this.speed = 4 + Math.random() * 4;
    this.angle = Math.atan2(this.targetY - this.y, this.targetX - this.x);
    this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
    this.size = 2 + Math.random() * 2;
    this.exploded = false;
  }
  
  update() {
    this.y -= this.speed;
    if (this.y <= this.targetY) {
      this.explode();
      this.exploded = true;
    }
  }
  
  draw() {
    fwCtx.beginPath();
    fwCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    fwCtx.fillStyle = this.color;
    fwCtx.fill();
  }
  
  explode() {
    // Play explosion soft pop tone
    playSynthTone(120 + Math.random() * 80, 'sine', 0.2, 0.05);
    
    const count = 30 + Math.floor(Math.random() * 40);
    for (let i = 0; i < count; i++) {
      fwParticles.push(new FireworkParticle(this.x, this.y, this.color));
    }
  }
}

class FireworkParticle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = 1 + Math.random() * 2;
    
    const angle = Math.random() * Math.PI * 2;
    const speed = 1 + Math.random() * 5;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    
    this.gravity = 0.06;
    this.alpha = 1;
    this.decay = 0.015 + Math.random() * 0.02;
  }
  
  update() {
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= this.decay;
  }
  
  draw() {
    fwCtx.save();
    fwCtx.globalAlpha = Math.max(0, this.alpha);
    fwCtx.beginPath();
    fwCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    fwCtx.fillStyle = this.color;
    fwCtx.fill();
    fwCtx.restore();
  }
}

function startFireworksDisplay() {
  if (fireworksActive) return;
  fireworksActive = true;
  fwCanvas.style.display = 'block';
  
  fwInterval = setInterval(() => {
    if (fireworksArray.length < 8) {
      fireworksArray.push(new Firework());
    }
  }, 400);
  
  animateFireworks();
}

function enableGrandFireworks() {
  // Faster, larger bursts
  clearInterval(fwInterval);
  fwCanvas.style.display = 'block';
  
  fwInterval = setInterval(() => {
    if (fireworksArray.length < 15) {
      fireworksArray.push(new Firework());
      // Extra particle bursts
      confetti({
        particleCount: 10,
        angle: Math.random() * 360,
        spread: 60,
        origin: { x: Math.random(), y: Math.random() * 0.5 }
      });
    }
  }, 200);
}

function animateFireworks() {
  fwCtx.fillStyle = 'rgba(20, 13, 33, 0.2)'; // trail effect
  fwCtx.fillRect(0, 0, fwCanvas.width, fwCanvas.height);
  
  fireworksArray.forEach((fw, idx) => {
    fw.update();
    fw.draw();
    if (fw.exploded) {
      fireworksArray.splice(idx, 1);
    }
  });
  
  fwParticles.forEach((p, idx) => {
    p.update();
    p.draw();
    if (p.alpha <= 0) {
      fwParticles.splice(idx, 1);
    }
  });
  
  requestAnimationFrame(animateFireworks);
}
