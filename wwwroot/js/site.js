/* ============================================================
   Oxygen Solutions — site.js
   ============================================================ */

(function () {
  'use strict';

  /* ── O2 Widget ─────────────────────────────────────────────── */
  var o2Current = 88.4;
  var o2ValueEl = document.getElementById('o2-value');
  var o2BarEl   = document.getElementById('o2-bar');
  var o2PulseEl = document.getElementById('o2-pulse');
  var pulseOn   = true;

  function updateO2() {
    // Drift ±0.5, clamped 79–93
    var delta = (Math.random() - 0.5) * 1.0;
    o2Current = Math.min(93, Math.max(79, o2Current + delta));

    var display = o2Current.toFixed(1);
    var pct     = ((o2Current - 79) / (93 - 79) * 100).toFixed(1);

    if (o2ValueEl) o2ValueEl.textContent = display;

    if (o2BarEl) {
      o2BarEl.style.setProperty('--pct', pct + '%');
    }

    // Toggle pulse dot
    if (o2PulseEl) {
      pulseOn = !pulseOn;
      o2PulseEl.style.opacity = pulseOn ? '1' : '0.2';
    }
  }

  if (o2ValueEl || o2BarEl) {
    updateO2();
    setInterval(updateO2, 1800);
  }

  /* ── Mobile Hamburger ──────────────────────────────────────── */
  var menuBtn   = document.getElementById('mobile-menu-btn');
  var mobileNav = document.querySelector('.os-mobile-nav');

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('open');
      menuBtn.classList.toggle('open', isOpen);
      menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close mobile nav when a link inside it is clicked
    mobileNav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        mobileNav.classList.remove('open');
        menuBtn.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Smooth Scroll ─────────────────────────────────────────── */
  document.addEventListener('click', function (e) {
    var link = e.target.closest('[data-scroll]');
    if (!link) return;

    var targetId = link.getAttribute('data-scroll');
    if (!targetId) return;

    var target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  /* ── Active Nav via IntersectionObserver ───────────────────── */
  var navSections = ['#os-why', '#os-system', '#os-catalog', '#os-contact'];
  var navLinks    = document.querySelectorAll('.nav-link[data-nav]');

  if (navLinks.length && 'IntersectionObserver' in window) {
    var observedSections = [];

    navSections.forEach(function (id) {
      var el = document.querySelector(id);
      if (el) observedSections.push(el);
    });

    var activeSection = null;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            activeSection = entry.target.id;
            updateActiveNav(activeSection);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    observedSections.forEach(function (el) {
      observer.observe(el);
    });

    function updateActiveNav(sectionId) {
      navLinks.forEach(function (link) {
        var target = link.getAttribute('data-nav');
        link.classList.toggle('active', target === '#' + sectionId);
      });
    }
  }

  /* ── Quote Panel ───────────────────────────────────────────── */
  var quotePanel      = document.querySelector('.quote-panel');
  var openQuoteBtn    = document.getElementById('open-quote-panel');
  var openQuoteMobile = document.getElementById('open-quote-panel-mobile');
  var closeQuoteBtn   = document.getElementById('close-quote');
  var closeBackdrop   = document.getElementById('close-quote-backdrop');
  var quoteBadge      = document.getElementById('quote-badge');
  var quoteBadgeMob   = document.getElementById('quote-badge-mobile');
  var quotePanelBody  = document.querySelector('.quote-panel-body');

  // Quote list state: { productId: { name, sku, image, qty } }
  var quoteItems = {};

  function openQuotePanel() {
    if (!quotePanel) return;
    quotePanel.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeQuotePanel() {
    if (!quotePanel) return;
    quotePanel.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (openQuoteBtn)    openQuoteBtn.addEventListener('click', openQuotePanel);
  if (openQuoteMobile) openQuoteMobile.addEventListener('click', openQuotePanel);
  if (closeQuoteBtn)   closeQuoteBtn.addEventListener('click', closeQuotePanel);
  if (closeBackdrop)   closeBackdrop.addEventListener('click', closeQuotePanel);

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeQuotePanel();
  });

  /* ── Add-to-Quote Buttons ──────────────────────────────────── */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-add-quote]');
    if (!btn) return;

    var id    = btn.getAttribute('data-add-quote');
    var name  = btn.getAttribute('data-name')  || 'Product';
    var sku   = btn.getAttribute('data-sku')   || '';
    var image = btn.getAttribute('data-image') || '';

    if (quoteItems[id]) {
      quoteItems[id].qty += 1;
    } else {
      quoteItems[id] = { id: id, name: name, sku: sku, image: image, qty: 1 };
    }

    renderQuotePanel();
    updateQuoteBadge();

    // Visual feedback on button
    var orig = btn.textContent;
    btn.textContent = 'Added';
    btn.disabled = true;
    setTimeout(function () {
      btn.textContent = orig;
      btn.disabled = false;
    }, 1200);
  });

  function updateQuoteBadge() {
    var total = Object.values(quoteItems).reduce(function (sum, item) {
      return sum + item.qty;
    }, 0);
    [quoteBadge, quoteBadgeMob].forEach(function (el) {
      if (!el) return;
      el.textContent = total;
      el.style.display = total > 0 ? '' : 'none';
    });
  }

  function renderQuotePanel() {
    if (!quotePanelBody) return;

    var items = Object.values(quoteItems);

    if (items.length === 0) {
      quotePanelBody.innerHTML =
        '<div class="quote-panel-empty">' +
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">' +
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" ' +
        'd="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>' +
        '</svg>' +
        '<p>No products added yet</p>' +
        '</div>';
      return;
    }

    var html = items.map(function (item) {
      var imgHtml = item.image
        ? '<img src="/images/' + escHtml(item.image) + '" alt="' + escHtml(item.name) + '">'
        : '';

      return '<div class="quote-panel-item" data-item-id="' + escHtml(item.id) + '">' +
        '<div class="quote-panel-item-img">' + imgHtml + '</div>' +
        '<div class="quote-panel-item-info">' +
        '<div class="quote-panel-item-name">' + escHtml(item.name) + '</div>' +
        '<div class="quote-panel-item-sku">' + escHtml(item.sku) + '</div>' +
        '</div>' +
        '<button class="quote-panel-item-remove" data-remove="' + escHtml(item.id) + '" ' +
        'aria-label="Remove ' + escHtml(item.name) + '">&times;</button>' +
        '</div>';
    }).join('');

    quotePanelBody.innerHTML = html;

    // Update footer count
    var footer = document.querySelector('.quote-panel-count');
    if (footer) {
      var total = items.reduce(function (s, i) { return s + i.qty; }, 0);
      footer.textContent = total + ' item' + (total !== 1 ? 's' : '') + ' in your quote request';
    }
  }

  // Remove from quote
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-remove]');
    if (!btn) return;

    var id = btn.getAttribute('data-remove');
    if (quoteItems[id]) {
      delete quoteItems[id];
      renderQuotePanel();
      updateQuoteBadge();
    }
  });

  /* ── Sidebar / Mobile Layout on Load + Resize ──────────────── */
  function handleLayout() {
    var sidebar    = document.querySelector('.os-sidebar');
    var mobileHdr  = document.querySelector('.os-mobile-header');
    var isMobile   = window.innerWidth <= 768;

    if (sidebar)   sidebar.style.display   = isMobile ? 'none' : '';
    if (mobileHdr) mobileHdr.style.display = isMobile ? 'flex' : 'none';

    // Close mobile nav on resize to desktop
    if (!isMobile && mobileNav) {
      mobileNav.classList.remove('open');
      if (menuBtn) menuBtn.classList.remove('open');
    }
  }

  handleLayout();

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleLayout, 120);
  });

  /* ── Product Quote Modal ───────────────────────────────────── */
  var pqBackdrop = document.getElementById('pq-backdrop');
  var pqModal    = document.getElementById('pq-modal');
  var pqOpen     = document.getElementById('open-product-quote');
  var pqClose    = document.getElementById('pq-close');
  var pqDone     = document.getElementById('pq-done');
  var pqForm     = document.getElementById('pq-form');
  var pqBody     = document.getElementById('pq-body');
  var pqSuccess  = document.getElementById('pq-success');
  var pqError    = document.getElementById('pq-error');
  var pqSubmit   = document.getElementById('pq-submit');

  function openPQ() {
    if (!pqModal) return;
    pqModal.classList.add('open');
    pqBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closePQ() {
    if (!pqModal) return;
    pqModal.classList.remove('open');
    pqBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (pqOpen)    pqOpen.addEventListener('click', openPQ);
  if (pqClose)   pqClose.addEventListener('click', closePQ);
  if (pqDone)    pqDone.addEventListener('click', closePQ);
  if (pqBackdrop) pqBackdrop.addEventListener('click', closePQ);

  if (pqForm) {
    pqForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (pqError) pqError.style.display = 'none';
      if (pqSubmit) { pqSubmit.disabled = true; pqSubmit.textContent = 'Sending…'; }

      var formData = new FormData(pqForm);

      fetch('/Catalog/ProductQuote', {
        method: 'POST',
        body: formData
      })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data.success) {
          pqBody.style.display = 'none';
          if (pqSuccess) pqSuccess.style.display = 'flex';
        } else {
          if (pqError) {
            pqError.textContent = (data.errors || ['Something went wrong.']).join(' ');
            pqError.style.display = 'block';
          }
          if (pqSubmit) { pqSubmit.disabled = false; pqSubmit.textContent = 'Submit Request'; }
        }
      })
      .catch(function () {
        if (pqError) {
          pqError.textContent = 'Network error. Please try again.';
          pqError.style.display = 'block';
        }
        if (pqSubmit) { pqSubmit.disabled = false; pqSubmit.textContent = 'Submit Request'; }
      });
    });
  }

  /* ── Utility ───────────────────────────────────────────────── */
  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

})();
