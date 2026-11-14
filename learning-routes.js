(function () {
  'use strict';
  var tabs = document.querySelector('[data-route-tabs]');
  if (!tabs) return;
  var buttons = Array.prototype.slice.call(tabs.querySelectorAll('[data-route-tab]'));
  var panels = { practice: document.getElementById('learning-hub'), concept: document.getElementById('concept-panel') };
  function select(route) {
    buttons.forEach(function (button) {
      var active = button.getAttribute('data-route-tab') === route;
      button.setAttribute('aria-selected', String(active));
      button.setAttribute('aria-expanded', String(active));
      button.tabIndex = active ? 0 : -1;
    });
    Object.keys(panels).forEach(function (key) { panels[key].hidden = key !== route; });
    panels[route].querySelectorAll('.reveal').forEach(function (card) { card.classList.add('in-view'); });
  }
  function fromHash(scroll) {
    var id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch (e) { return; }
    var target = document.getElementById(id);
    if (!target) return;
    var route = panels.concept.contains(target) ? 'concept' : panels.practice.contains(target) ? 'practice' : null;
    if (!route) return;
    select(route);
    // 仅导航深链接需要定位；路线按钮原地切换，不修改 URL、不滚动。
    if (scroll) target.scrollIntoView({ block: 'start', behavior: 'auto' });
  }
  buttons.forEach(function (button, index) {
    button.addEventListener('click', function () { select(button.getAttribute('data-route-tab')); });
    button.addEventListener('keydown', function (event) {
      var next;
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') next = (index + 1) % buttons.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = buttons.length - 1;
      else return;
      event.preventDefault();
      select(buttons[next].getAttribute('data-route-tab'));
      buttons[next].focus({ preventScroll: true });
    });
  });
  tabs.hidden = false;
  select('practice');
  fromHash(false);
  window.addEventListener('hashchange', function () { fromHash(true); });
  document.addEventListener('click', function (event) {
    var link = event.target.closest('a[href]');
    if (!link) return;
    var url = new URL(link.href, location.href);
    if (url.origin === location.origin && url.pathname === location.pathname && url.hash && url.hash === location.hash) {
      fromHash(true);
    }
  });
}());
