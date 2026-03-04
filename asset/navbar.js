(function () {

  var path = window.location.pathname;
  function isActive(href) {
    return path.includes(href.replace('../', '').replace('.html', ''));
  }

  var placeholder = document.getElementById('navbar-placeholder');
  if (placeholder) {
    placeholder.innerHTML = [
      '<header class="topbar">',
      '  <div class="logo"><a href="../Home/home.html"><img src="../asset/logo.png" alt="logo" class="logodeptabbar"></a></div>',
      '  <div class="hamburger" id="hamburger"><span></span><span></span><span></span></div>',
      '  <nav class="tab-container" id="menu">',
      '    <a href="../Home/home.html" class="tab-link' + (isActive('Home') ? ' active' : '') + '"><img src="../asset/Icon/Home.svg" class="icon"><span class="label">หน้าหลัก</span></a>',
      '    <a href="../About/about.html" class="tab-link' + (isActive('About') ? ' active' : '') + '"><img src="../asset/Icon/About.svg" class="icon"><span class="label">เกี่ยวกับเรา</span></a>',
      '    <a href="../Academic/academic.html" class="tab-link' + (isActive('Academic') ? ' active' : '') + '"><img src="../asset/Icon/Academic.svg" class="icon"><span class="label">วิชาการ</span></a>',
      '    <a href="../Admission/admission.html" class="tab-link' + (isActive('Admission') ? ' active' : '') + '"><img src="../asset/Icon/Admission.svg" class="icon"><span class="label">การรับสมัคร</span></a>',
      '    <a href="../Faculty/faculty.html" class="tab-link' + (isActive('Faculty') ? ' active' : '') + '"><img src="../asset/Icon/Faculty.svg" class="icon"><span class="label">คณาจารย์</span></a>',
      '    <a href="../Contact/contact.html" class="tab-link' + (isActive('Contact') ? ' active' : '') + '"><img src="../asset/Icon/Contact.svg" class="icon"><span class="label">ติดต่อ</span></a>',
      '    <div class="lang-toggle notranslate" translate="no">',
      '      <div id="btn-th" class="bubble on notranslate" translate="no" onclick="selectLang(\'th\')">TH</div>',
      '      <div id="btn-en" class="bubble off notranslate" translate="no" onclick="selectLang(\'en\')">EN</div>',
      '    </div>',
      '  </nav>',
      '</header>'
    ].join('\n');

    var hamburger = document.getElementById('hamburger');
    var menuEl = document.getElementById('menu');
    if (hamburger && menuEl) {
      hamburger.addEventListener('click', function () {
        menuEl.classList.toggle('active');
        hamburger.classList.toggle('active');
      });
    }
    document.querySelectorAll('.tab-link').forEach(function (tab) {
      tab.addEventListener('click', function () {
        document.querySelectorAll('.tab-link').forEach(function (t) { t.classList.remove('active'); });
        this.classList.add('active');
        if (menuEl) menuEl.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
      });
    });
  }

  window.googleTranslateElementInit = function () {
    new window.google.translate.TranslateElement({
      pageLanguage: 'th',
      includedLanguages: 'th,en',
      autoDisplay: false
    }, 'google_translate_element');
  };

  if (!document.getElementById('gt-script')) {
    var s = document.createElement('script');
    s.id = 'gt-script';
    s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    s.async = true;
    document.head.appendChild(s);
  }

  if (!document.getElementById('google_translate_element')) {
    var gtDiv = document.createElement('div');
    gtDiv.id = 'google_translate_element';
    gtDiv.style.display = 'none';
    document.body.appendChild(gtDiv);
  }

  var currentLang = localStorage.getItem('lang') || 'th';

  function updateButtons(lang) {
    var btnTh = document.getElementById('btn-th');
    var btnEn = document.getElementById('btn-en');
    if (btnTh) btnTh.className = 'bubble notranslate ' + (lang === 'th' ? 'on' : 'off');
    if (btnEn) btnEn.className = 'bubble notranslate ' + (lang === 'en' ? 'on' : 'off');
  }

  function triggerGoogleTranslate(lang) {
    var attempts = 0;
    var timer = setInterval(function () {
      attempts++;
      var select = document.querySelector('.goog-te-combo');
      if (select) {
        clearInterval(timer);
        select.value = lang === 'en' ? 'en' : 'th';
        select.dispatchEvent(new Event('change'));

        setTimeout(function () {
          select.value = lang === 'en' ? 'en' : 'th';
          select.dispatchEvent(new Event('change'));
          setTimeout(function () {
            if (typeof fixAIoT === 'function') fixAIoT();
          }, 1000);
        }, 300);
      }
      if (attempts > 50) clearInterval(timer);
    }, 100);
  }

  window.selectLang = function (lang) {
    if (lang === currentLang) return;
    currentLang = lang;
    localStorage.setItem('lang', lang);
    updateButtons(lang);
    triggerGoogleTranslate(lang);
  };

  window.addEventListener('load', function () {
    updateButtons(currentLang);
    if (currentLang === 'en') {
      setTimeout(function () { triggerGoogleTranslate('en'); }, 1500);
    }
  });

})();