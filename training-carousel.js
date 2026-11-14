(function () {
  'use strict';
  var root = document.querySelector('[data-training-carousel]');
  if (!root) return;
  var slides = Array.prototype.slice.call(root.querySelectorAll('.training-slide'));
  var pages = Array.prototype.slice.call(root.querySelectorAll('[data-carousel-page]'));
  var photos = root.querySelector('.training-carousel-photos');
  var play = root.querySelector('[data-carousel-play]');
  var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var current = 0;
  var paused = motion.matches;
  var hovered = false;
  var inView = false;
  var timer = null;
  function sync() {
    window.clearTimeout(timer);
    timer = null;
    var running = !paused && !hovered && !document.hidden && inView;
    photos.setAttribute('aria-live', paused ? 'polite' : 'off');
    play.textContent = paused ? '播放轮播' : '暂停轮播';
    play.setAttribute('aria-label', paused ? '播放照片轮播，每 2.5 秒切换' : '暂停照片轮播');
    if (running) timer = window.setTimeout(function () { show(current + 1); }, 2500);
  }
  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach(function (slide, i) { slide.hidden = i !== current; });
    pages.forEach(function (button, i) {
      if (i === current) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    });
    sync();
  }
  function manual(index) { paused = true; show(index); }
  root.querySelector('[data-carousel-controls]').hidden = false;
  root.querySelector('[data-carousel-prev]').addEventListener('click', function () { manual(current - 1); });
  root.querySelector('[data-carousel-next]').addEventListener('click', function () { manual(current + 1); });
  pages.forEach(function (button, i) { button.addEventListener('click', function () { manual(i); }); });
  play.addEventListener('click', function () { paused = !paused; sync(); });
  root.addEventListener('pointerenter', function (event) { if (event.pointerType !== 'touch') { hovered = true; sync(); } });
  root.addEventListener('pointerleave', function () { hovered = false; sync(); });
  // 键盘进入后暂停，除非用户主动点播放；避免阅读或操作时突然换图。
  root.addEventListener('focusin', function (event) { if (event.target !== play) { paused = true; sync(); } });
  root.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); manual(current + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  var touchStart = null;
  photos.addEventListener('pointerdown', function (event) { if (event.pointerType === 'touch') touchStart = { x: event.clientX, y: event.clientY }; });
  photos.addEventListener('pointerup', function (event) {
    if (!touchStart) return;
    var x = event.clientX - touchStart.x;
    var y = event.clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(x) > 45 && Math.abs(x) > Math.abs(y) * 1.5) manual(current + (x < 0 ? 1 : -1));
  });
  photos.addEventListener('pointercancel', function () { touchStart = null; });
  document.addEventListener('visibilitychange', sync);
  if (motion.addEventListener) motion.addEventListener('change', function () { if (motion.matches) paused = true; sync(); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      inView = entries[0].isIntersecting;
      if (inView) slides.forEach(function (slide) { slide.querySelector('img').loading = 'eager'; });
      sync();
    }, { threshold: 0.25 }).observe(root);
  } else { inView = true; }
  show(0);
}());
