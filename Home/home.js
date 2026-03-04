// =========================
// Top tabbar + indicator
// =========================
const topTabs = document.querySelectorAll(".tab-link");
const indicator = document.querySelector(".indicator");

const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

function moveIndicator(element) {
  if (!indicator || !element) return;
  const rect = element.getBoundingClientRect();
  const containerRect = element.parentElement.getBoundingClientRect();
  indicator.style.width = rect.width + "px";
  indicator.style.left = (rect.left - containerRect.left) + "px";
}

topTabs.forEach((tab) => {
  tab.addEventListener("click", function () {
    topTabs.forEach((t) => t.classList.remove("active"));
    this.classList.add("active");
    moveIndicator(this);
    if (menu) menu.classList.remove("active");
    if (hamburger) hamburger.classList.remove("active");
  });
});

window.addEventListener("load", () => {
  moveIndicator(document.querySelector(".tab-link.active"));
  if (menu) menu.classList.remove("active");
  if (hamburger) hamburger.classList.remove("active");
});

window.addEventListener("resize", () => {
  moveIndicator(document.querySelector(".tab-link.active"));
});

// =========================
// Hamburger (mobile)
// =========================
if (hamburger && menu) {
  hamburger.addEventListener("click", () => {
    menu.classList.toggle("active");
    hamburger.classList.toggle("active");
  });
}

// =========================
// Information Slider
// =========================
const slider = document.querySelector('.info-slider');
const track = document.querySelector('.slider-track');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
let slides = document.querySelectorAll('.slide');
let currentIndex = 1;
let autoSlide;

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);
slides = document.querySelectorAll('.slide');
track.style.transform = `translateX(-${currentIndex * 100}%)`;

function updateSlide() {
  track.style.transition = "transform 0.5s ease";
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

nextBtn.addEventListener('click', () => {
  if (currentIndex >= slides.length - 1) return;
  currentIndex++;
  updateSlide();
  resetAutoSlide();
});

prevBtn.addEventListener('click', () => {
  if (currentIndex <= 0) return;
  currentIndex--;
  updateSlide();
  resetAutoSlide();
});

track.addEventListener('transitionend', () => {
  if (slides[currentIndex].isEqualNode(firstClone)) {
    track.style.transition = "none";
    currentIndex = 1;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }
  if (slides[currentIndex].isEqualNode(lastClone)) {
    track.style.transition = "none";
    currentIndex = slides.length - 2;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }
});

function startAutoSlide() {
  autoSlide = setInterval(() => {
    if (currentIndex >= slides.length - 1) return;
    currentIndex++;
    updateSlide();
  }, 5000);
}

function resetAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}

startAutoSlide();

let startX = 0;
slider.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
slider.addEventListener('touchend', e => {
  let endX = e.changedTouches[0].clientX;
  if (startX - endX > 50 && currentIndex < slides.length - 1) currentIndex++;
  else if (endX - startX > 50 && currentIndex > 0) currentIndex--;
  updateSlide();
  resetAutoSlide();
});

// =========================
// Circle
// =========================
document.querySelectorAll(".slice").forEach(slice => {
  slice.addEventListener("click", function () {
    document.querySelectorAll(".slice").forEach(s => s.classList.remove("active"));
    this.classList.add("active");
    document.querySelector(".center-box").style.opacity = 0;
  });
});

// =========================
// Project Cards
// =========================
function openExpanded(btn) {
  let container = btn.closest('.project-interactive-container');
  container.querySelector('.compact-view').classList.add('hidden');
  container.querySelector('.expanded-view').classList.remove('hidden');
}

function closeExpanded(btn) {
  let container = btn.closest('.project-interactive-container');
  container.querySelector('.expanded-view').classList.add('hidden');
  container.querySelector('.compact-view').classList.remove('hidden');
  let defaultTabBtn = container.querySelector('.expanded-view .left-tab');
  switchTab(defaultTabBtn, 1);
}

function switchTab(btn, tabNumber) {
  let container = btn.closest('.project-interactive-container');
  let expanded = container.querySelector('.expanded-view');
  let tabs = expanded.querySelectorAll('.tab-content');
  let buttons = expanded.querySelectorAll('.side-tab-btn');
  tabs.forEach(tab => tab.style.display = "none");
  buttons.forEach(b => b.classList.remove("active"));
  expanded.querySelector('.tab-' + tabNumber).style.display = "block";
  btn.classList.add("active");
}

const translations = {
  th: {
    'nav-home':'หน้าหลัก','nav-about':'เกี่ยวกับเรา','nav-academic':'วิชาการ',
    'nav-admission':'การรับสมัคร','nav-faculty':'คณาจารย์','nav-contact':'ติดต่อ',
    'footer-contact':'ติดต่อเรา','footer-address':'ที่อยู่'
  },
  en: {
    'nav-home':'Home','nav-about':'About','nav-academic':'Academic',
    'nav-admission':'Admission','nav-faculty':'Faculty','nav-contact':'Contact',
    'footer-contact':'Contact','footer-address':'Address'
  }
};

let currentLang = localStorage.getItem('lang') || 'th';
document.addEventListener('DOMContentLoaded', () => applyLang(currentLang, false));

function selectLang(lang) {
  if (lang === currentLang) return;
  currentLang = lang;
  localStorage.setItem('lang', lang);
  applyLang(lang, true);
}

function applyLang(lang, animate) {
  document.getElementById('btn-th').className = 'bubble ' + (lang==='th' ? 'on' : 'off');
  document.getElementById('btn-en').className = 'bubble ' + (lang==='en' ? 'on' : 'off');
  Object.entries(translations[lang]).forEach(([id, text]) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (animate) { el.style.opacity='0'; setTimeout(()=>{ el.textContent=text; el.style.opacity='1'; },150); }
    else el.textContent = text;
  });
}