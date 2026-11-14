(function () {
  'use strict';

  var topbar = document.getElementById('topbar');
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  var navToggleText = navToggle && navToggle.querySelector('.sr-only');
  document.querySelectorAll('.nav-dropdown').forEach(function (dropdown, index) {
    var menu = dropdown.querySelector('.nav-dropdown-menu');
    var link = dropdown.querySelector('a');
    if (!menu || !link) return;
    menu.id = menu.id || 'nav-submenu-' + index;
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'nav-submenu-toggle';
    button.textContent = '＋';
    button.setAttribute('aria-label', '展开' + link.textContent + '子菜单');
    button.setAttribute('aria-controls', menu.id);
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', function () {
      var open = button.getAttribute('aria-expanded') !== 'true';
      dropdown.classList.toggle('is-open', open);
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', (open ? '收起' : '展开') + link.textContent + '子菜单');
      button.textContent = open ? '−' : '＋';
    });
    dropdown.insertBefore(button, menu);
  });

  function setNavState(isOpen) {
    var label = isOpen ? '关闭主导航' : '打开主导航';
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', label);
    }
    if (navToggleText) navToggleText.textContent = label;
    if (navLinks) navLinks.classList.toggle('is-open', isOpen);
  }

  function closeNav(restoreFocus) {
    setNavState(false);
    if (restoreFocus && navToggle) navToggle.focus();
  }

  function syncHeader() {
    if (topbar) topbar.classList.toggle('scrolled', window.scrollY > 8);
  }

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      if (!navLinks) return;
      setNavState(navToggle.getAttribute('aria-expanded') !== 'true');
    });
  }

  if (navLinks) {
    navLinks.addEventListener('click', function (event) {
      if (event.target instanceof Element && event.target.closest('a')) closeNav(false);
    });
  }

  window.addEventListener('resize', function () {
    if (window.innerWidth > 820) closeNav(false);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && navToggle && navToggle.getAttribute('aria-expanded') === 'true') {
      closeNav(true);
    }
  });

  setNavState(false);
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  // Reveal-on-scroll: only animate when the element actually enters the viewport
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal, .rv'));

  function revealAll() {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  if ('IntersectionObserver' in window) {
    // Auto stagger: siblings inside the same parent fade in one after another (60ms step)
    revealEls.forEach(function (el) {
      var parent = el.parentElement;
      if (!parent) return;
      var siblings = Array.prototype.slice.call(parent.children).filter(function (n) {
        return n.classList && (n.classList.contains('reveal') || n.classList.contains('rv'));
      });
      var idx = siblings.indexOf(el);
      if (idx > 0) el.style.setProperty('--d', (idx * 60) + 'ms');
    });

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px 80px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealAll();
  }
})();

/* 全局点击特效：左键点击任意位置，亮起一颗小五角星，无旋转、轻微胀大后淡出。
   纯装饰、不拦截点击，动画结束后自动移除；偏好减少动效时自动禁用。 */
(function () {
  'use strict';
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function spawn(x, y) {
    var ripple = document.createElement('span');
    ripple.className = 'click-ripple';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    document.body.appendChild(ripple);
    ripple.addEventListener('animationend', function () { ripple.remove(); });
    window.setTimeout(function () { if (ripple.parentNode) ripple.remove(); }, 800);
  }

  document.addEventListener('pointerdown', function (event) {
    if (event.button !== 0) return; // 仅左键
    spawn(event.clientX, event.clientY);
  }, { passive: true });
})();
