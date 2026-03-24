/* ============================================
   Pullely Consulting — Shared Components
   Supports EN (root), DE (/de/), FR (/fr/)
   ============================================ */

(function () {
  const lang = document.documentElement.lang || 'en';
  const isDE = lang === 'de';
  const isFR = lang === 'fr';

  // Detect if running on GitHub Pages subfolder (e.g. /pullely-consulting/)
  var base = '/';
  var ghMatch = window.location.pathname.match(/^(\/[^\/]+\.github\.io\/[^\/]+|\/pullely-consulting)\//i);
  if (!ghMatch) ghMatch = window.location.pathname.match(/^(\/pullely-consulting)\b/i);
  if (window.location.hostname.includes('github.io')) {
    base = '/' + window.location.pathname.split('/')[1] + '/';
  }

  // Path prefixes
  const prefix = isDE ? base + 'de/' : isFR ? base + 'fr/' : base;

  // Language switcher links
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const pagePart = currentPage === '' ? '' : currentPage;

  // Detect active page
  const path = window.location.pathname;
  function isActive(page) {
    if (page === 'index.html' || page === '') {
      return path === prefix || path === prefix + 'index.html' || path === '/' || path === '/de/' || path === '/fr/';
    }
    return path.includes(page);
  }

  // --- Translations ---
  const t = {
    en: {
      links: [
        { href: base, label: 'Home', page: 'index.html' },
        { href: base + 'about.html', label: 'Our Team', page: 'about.html' },
        { href: base + 'services.html', label: 'Services', page: 'services.html' },
        { href: base + 'contact.html', label: 'Contact', page: 'contact.html' },
      ],
      cta: 'Book Now',
      footerDesc: 'Your bridge between Swiss innovation and Indian growth. We facilitate cross-border trade and business development between Switzerland and India.',
      pages: 'Pages',
      getInTouch: 'Get in Touch',
      location: 'Zurich, Switzerland',
      home: 'Home', team: 'Our Team', services: 'Services', contact: 'Contact', book: 'Book Now',
      imprint: 'Imprint', privacy: 'Privacy Policy',
      rights: 'All rights reserved.',
    },
    de: {
      links: [
        { href: base + 'de/', label: 'Startseite', page: 'index.html' },
        { href: base + 'de/about.html', label: '\u00dcber uns', page: 'about.html' },
        { href: base + 'de/services.html', label: 'Leistungen', page: 'services.html' },
        { href: base + 'de/contact.html', label: 'Kontakt', page: 'contact.html' },
      ],
      cta: 'Termin buchen',
      footerDesc: 'Ihre Br\u00fccke zwischen Schweizer Innovation und indischem Wachstum. Wir erleichtern den grenz\u00fcberschreitenden Handel zwischen der Schweiz und Indien.',
      pages: 'Seiten',
      getInTouch: 'Kontakt',
      location: 'Z\u00fcrich, Schweiz',
      home: 'Startseite', team: '\u00dcber uns', services: 'Leistungen', contact: 'Kontakt', book: 'Termin buchen',
      imprint: 'Impressum', privacy: 'Datenschutz',
      rights: 'Alle Rechte vorbehalten.',
    },
    fr: {
      links: [
        { href: base + 'fr/', label: 'Accueil', page: 'index.html' },
        { href: base + 'fr/about.html', label: '\u00c9quipe', page: 'about.html' },
        { href: base + 'fr/services.html', label: 'Services', page: 'services.html' },
        { href: base + 'fr/contact.html', label: 'Contact', page: 'contact.html' },
      ],
      cta: 'Prendre RDV',
      footerDesc: 'Votre pont entre l\'innovation suisse et la croissance indienne. Nous facilitons le commerce transfrontalier entre la Suisse et l\'Inde.',
      pages: 'Pages',
      getInTouch: 'Contact',
      location: 'Zurich, Suisse',
      home: 'Accueil', team: '\u00c9quipe', services: 'Services', contact: 'Contact', book: 'Prendre RDV',
      imprint: 'Mentions l\u00e9gales', privacy: 'Politique de confidentialit\u00e9',
      rights: 'Tous droits r\u00e9serv\u00e9s.',
    }
  };

  const c = t[lang] || t.en;
  const ctaHref = prefix + 'appointments.html';

  // Language dropdown
  var currentLangLabel = lang === 'de' ? 'DE' : lang === 'fr' ? 'FR' : 'EN';
  var langs = [
    { code: 'en', label: 'English', short: 'EN', flag: '\uD83C\uDDEC\uD83C\uDDE7', prefix: base },
    { code: 'de', label: 'Deutsch', short: 'DE', flag: '\uD83C\uDDE8\uD83C\uDDED', prefix: base + 'de/' },
    { code: 'fr', label: 'Fran\u00e7ais', short: 'FR', flag: '\uD83C\uDDEB\uD83C\uDDF7', prefix: base + 'fr/' },
  ];

  var currentFlag = langs.filter(function(l) { return l.code === lang; })[0].flag;
  var langDropdown =
    '<div class="nav__lang-wrap">' +
      '<div class="nav__lang-btn">' + currentFlag + ' ' + currentLangLabel + '</div>' +
      '<div class="nav__lang-drop">' +
        langs.map(function(l) {
          return '<a href="' + l.prefix + pagePart + '"' + (l.code === lang ? ' class="active"' : '') + '>' + l.flag + ' ' + l.label + '</a>';
        }).join('') +
      '</div>' +
    '</div>';

  // --- Navigation ---
  var nav = document.getElementById('nav');
  if (nav) {
    nav.innerHTML =
      '<div class="nav__inner">' +
        '<a href="' + prefix + '" class="nav__logo"><img src="' + (isDE || isFR ? '../' : '') + 'images/logo-option2.svg" alt="Pullely Consulting" class="nav__logo-img"></a>' +
        '<nav class="nav__links" id="navLinks">' +
          c.links.map(function(l) {
            return '<a href="' + l.href + '" class="nav__link' + (isActive(l.page) ? ' nav__link--active' : '') + '">' + l.label + '</a>';
          }).join('') +
          langDropdown +
          '<a href="' + ctaHref + '" class="nav__cta">' + c.cta + '</a>' +
        '</nav>' +
        '<button class="nav__hamburger" id="hamburger" aria-label="Menu">' +
          '<span></span><span></span><span></span>' +
        '</button>' +
      '</div>';
  }

  // --- Footer ---
  var footer = document.getElementById('footer');
  if (footer) {
    var year = new Date().getFullYear();
    footer.innerHTML =
      '<div class="container">' +
        '<div class="footer__grid">' +
          '<div>' +
            '<div class="footer__brand"><img src="' + (isDE || isFR ? '../' : '') + 'images/logo-option2.svg" alt="Pullely Consulting" style="height:36px;"></div>' +
            '<p class="footer__desc">' + c.footerDesc + '</p>' +
          '</div>' +
          '<div>' +
            '<h4>' + c.pages + '</h4>' +
            '<ul class="footer__links">' +
              '<li><a href="' + prefix + '">' + c.home + '</a></li>' +
              '<li><a href="' + prefix + 'about.html">' + c.team + '</a></li>' +
              '<li><a href="' + prefix + 'services.html">' + c.services + '</a></li>' +
              '<li><a href="' + prefix + 'contact.html">' + c.contact + '</a></li>' +
              '<li><a href="' + prefix + 'appointments.html">' + c.book + '</a></li>' +
            '</ul>' +
          '</div>' +
          '<div>' +
            '<h4>' + c.getInTouch + '</h4>' +
            '<ul class="footer__links">' +
              '<li>info@pullely-consulting.com</li>' +
              '<li>' + c.location + '</li>' +
              '<li><a href="https://www.linkedin.com/in/sanoj-pullely" target="_blank" rel="noopener">LinkedIn</a></li>' +
            '</ul>' +
          '</div>' +
        '</div>' +
        '<div class="footer__bottom">' +
          '<span>&copy; ' + year + ' Pullely Consulting. ' + c.rights + '</span>' +
          '<div class="footer__legal">' +
            '<a href="' + prefix + 'impressum.html">' + c.imprint + '</a>' +
            '<a href="' + prefix + 'privacy.html">' + c.privacy + '</a>' +
          '</div>' +
        '</div>' +
      '</div>';
  }
})();
