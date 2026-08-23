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
    var delta = (Math.random() - 0.5) * 1.0;
    o2Current = Math.min(93, Math.max(79, o2Current + delta));
    var display = o2Current.toFixed(1);
    var pct     = ((o2Current - 79) / (93 - 79) * 100).toFixed(1);
    if (o2ValueEl) o2ValueEl.textContent = display;
    if (o2BarEl)   o2BarEl.style.setProperty('--pct', pct + '%');
    if (o2PulseEl) { pulseOn = !pulseOn; o2PulseEl.style.opacity = pulseOn ? '1' : '0.2'; }
  }

  if (o2ValueEl || o2BarEl) { updateO2(); setInterval(updateO2, 1800); }

  /* ── Mobile Hamburger ──────────────────────────────────────── */
  var menuBtn   = document.getElementById('mobile-menu-btn');
  var mobileNav = document.querySelector('.os-mobile-nav');

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('open');
      menuBtn.classList.toggle('open', isOpen);
      menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
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

  /* ── Active Nav ────────────────────────────────────────────── */
  var navSections = ['#os-why', '#os-system', '#os-catalog', '#os-contact'];
  var navLinks    = document.querySelectorAll('.nav-link[data-nav]');

  if (navLinks.length && 'IntersectionObserver' in window) {
    var observedSections = [];
    navSections.forEach(function (id) {
      var el = document.querySelector(id);
      if (el) observedSections.push(el);
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) updateActiveNav(entry.target.id);
      });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });

    observedSections.forEach(function (el) { observer.observe(el); });

    function updateActiveNav(sectionId) {
      navLinks.forEach(function (link) {
        link.classList.toggle('active', link.getAttribute('data-nav') === '#' + sectionId);
      });
    }
  }

  /* ── Quote Store (localStorage) ────────────────────────────── */
  var QUOTE_KEY = 'os_quote_v1';

  function loadQuote() {
    try { return JSON.parse(localStorage.getItem(QUOTE_KEY) || '{}'); }
    catch (e) { return {}; }
  }

  function saveQuote() {
    try { localStorage.setItem(QUOTE_KEY, JSON.stringify(quoteItems)); }
    catch (e) {}
  }

  var quoteItems = loadQuote();

  /* ── Quote Panel DOM refs ───────────────────────────────────── */
  var quotePanel      = document.querySelector('.quote-panel');
  var openQuoteBtn    = document.getElementById('open-quote-panel');
  var openQuoteMobile = document.getElementById('open-quote-panel-mobile');
  var closeQuoteBtn   = document.getElementById('close-quote');
  var closeBackdrop   = document.getElementById('close-quote-backdrop');
  var quoteBadge      = document.getElementById('quote-badge');
  var quoteBadgeMob   = document.getElementById('quote-badge-mobile');
  var quotePanelBody  = document.getElementById('quote-panel-body');
  var quotePanelCount = document.getElementById('quote-panel-count');
  var clearQuoteBtn   = document.getElementById('clear-quote');

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
  if (clearQuoteBtn)   clearQuoteBtn.addEventListener('click', function () {
    quoteItems = {};
    saveQuote();
    syncUI();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeQuotePanel();
  });

  /* ── Quote mutations ────────────────────────────────────────── */
  function addItem(id, name, sku, image) {
    if (quoteItems[id]) {
      quoteItems[id].qty += 1;
    } else {
      quoteItems[id] = { id: id, name: name, sku: sku || '', image: image || '', qty: 1 };
    }
    saveQuote();
    syncUI();
  }

  function removeItem(id) {
    delete quoteItems[id];
    saveQuote();
    syncUI();
  }

  function changeQty(id, delta) {
    if (!quoteItems[id]) return;
    var next = quoteItems[id].qty + delta;
    if (next < 1) { removeItem(id); return; }
    quoteItems[id].qty = next;
    saveQuote();
    syncUI();
  }

  /* ── Sync badge + panel ─────────────────────────────────────── */
  function syncUI() {
    var items = Object.values(quoteItems);
    var total = items.reduce(function (s, i) { return s + i.qty; }, 0);

    // Badge
    [quoteBadge, quoteBadgeMob].forEach(function (el) {
      if (!el) return;
      el.textContent = total;
      el.style.display = total > 0 ? '' : 'none';
    });

    // Footer count
    if (quotePanelCount) {
      quotePanelCount.textContent = total + ' item' + (total !== 1 ? 's' : '') + ' in your quote';
    }

    // Panel body
    if (!quotePanelBody) return;

    if (items.length === 0) {
      quotePanelBody.innerHTML =
        '<div class="qp-empty">' +
        '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">' +
        '<path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>' +
        '<rect x="9" y="3" width="6" height="4" rx="1"/>' +
        '</svg>' +
        '<p>Your quote list is empty.</p>' +
        '<span>Browse equipment and add products to build your quote.</span>' +
        '</div>';
      return;
    }

    quotePanelBody.innerHTML = items.map(function (item) {
      var img = item.image
        ? '<img src="/images/' + esc(item.image) + '" alt="' + esc(item.name) + '">'
        : '<div class="qp-img-placeholder"></div>';

      return '<div class="qp-item" data-id="' + esc(item.id) + '">' +
        '<div class="qp-img">' + img + '</div>' +
        '<div class="qp-info">' +
          '<div class="qp-name">' + esc(item.name) + '</div>' +
          (item.sku ? '<div class="qp-sku font-mono">' + esc(item.sku) + '</div>' : '') +
          '<div class="qp-qty">' +
            '<button class="qp-qty-btn" data-qty-minus="' + esc(item.id) + '" aria-label="Decrease">&#8722;</button>' +
            '<span class="qp-qty-val">' + item.qty + '</span>' +
            '<button class="qp-qty-btn" data-qty-plus="' + esc(item.id) + '" aria-label="Increase">&#43;</button>' +
          '</div>' +
        '</div>' +
        '<button class="qp-remove" data-remove="' + esc(item.id) + '" aria-label="Remove">&times;</button>' +
        '</div>';
    }).join('');

    // Mark add-to-quote buttons already in list
    syncAddButtons();
  }

  function syncAddButtons() {
    document.querySelectorAll('[data-add-quote]').forEach(function (btn) {
      var id = btn.getAttribute('data-add-quote');
      if (quoteItems[id]) {
        btn.classList.add('in-quote');
        btn.setAttribute('title', 'In quote (' + quoteItems[id].qty + ')');
      } else {
        btn.classList.remove('in-quote');
        btn.removeAttribute('title');
      }
    });
  }

  /* ── Add-to-quote click ─────────────────────────────────────── */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-add-quote]');
    if (!btn) return;

    var id    = btn.getAttribute('data-add-quote');
    var name  = btn.getAttribute('data-name')  || 'Product';
    var sku   = btn.getAttribute('data-sku')   || '';
    var image = btn.getAttribute('data-image') || '';

    addItem(id, name, sku, image);

    // Animate button
    var orig = btn.textContent;
    btn.classList.add('just-added');
    btn.textContent = '✓ Added';
    setTimeout(function () {
      btn.classList.remove('just-added');
      btn.textContent = quoteItems[id] ? '✓ In list' : orig;
    }, 1200);
  });

  /* ── Qty / Remove clicks (delegated from panel body) ───────── */
  document.addEventListener('click', function (e) {
    var minus  = e.target.closest('[data-qty-minus]');
    var plus   = e.target.closest('[data-qty-plus]');
    var remove = e.target.closest('[data-remove]');

    if (minus)  changeQty(minus.getAttribute('data-qty-minus'), -1);
    if (plus)   changeQty(plus.getAttribute('data-qty-plus'),    1);
    if (remove) removeItem(remove.getAttribute('data-remove'));
  });

  /* ── Init on page load ──────────────────────────────────────── */
  syncUI();

  /* ── Sidebar / Mobile layout ────────────────────────────────── */
  function handleLayout() {
    var sidebar   = document.querySelector('.os-sidebar');
    var mobileHdr = document.querySelector('.os-mobile-header');
    var isMobile  = window.innerWidth <= 768;
    if (sidebar)   sidebar.style.display   = isMobile ? 'none' : '';
    if (mobileHdr) mobileHdr.style.display = isMobile ? 'flex' : 'none';
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

  /* ── Product Quote Modal (detail page) ──────────────────────── */
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

  function openPQ()  { if (!pqModal) return; pqModal.classList.add('open');    pqBackdrop.classList.add('open');    document.body.style.overflow = 'hidden'; }
  function closePQ() { if (!pqModal) return; pqModal.classList.remove('open'); pqBackdrop.classList.remove('open'); document.body.style.overflow = ''; }

  if (pqOpen)     pqOpen.addEventListener('click', openPQ);
  if (pqClose)    pqClose.addEventListener('click', closePQ);
  if (pqDone)     pqDone.addEventListener('click', closePQ);
  if (pqBackdrop) pqBackdrop.addEventListener('click', closePQ);

  if (pqForm) {
    pqForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (pqError)  pqError.style.display = 'none';
      if (pqSubmit) { pqSubmit.disabled = true; pqSubmit.textContent = 'Sending…'; }

      fetch('/Catalog/ProductQuote', { method: 'POST', body: new FormData(pqForm) })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (data.success) {
            pqBody.style.display = 'none';
            if (pqSuccess) pqSuccess.style.display = 'flex';
          } else {
            if (pqError) { pqError.textContent = (data.errors || ['Something went wrong.']).join(' '); pqError.style.display = 'block'; }
            if (pqSubmit) { pqSubmit.disabled = false; pqSubmit.textContent = 'Submit Request'; }
          }
        })
        .catch(function () {
          if (pqError) { pqError.textContent = 'Network error. Please try again.'; pqError.style.display = 'block'; }
          if (pqSubmit) { pqSubmit.disabled = false; pqSubmit.textContent = 'Submit Request'; }
        });
    });
  }

  /* ── Utility ───────────────────────────────────────────────── */
  function esc(str) {
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

})();
