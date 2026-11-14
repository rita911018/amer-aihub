(function () {
  'use strict';
  var key = 'aib-last-reading-v1';
  var conceptNames = { 'ai-what': 'AI 到底是什么', 'ai-other': 'AI 术语速查', 'ai-history': 'AI 76 年发展史', 'prompt-basics': '提示词五大方法' };
  function read(store) {
    try { var value = JSON.parse(localStorage.getItem(store) || '{}'); return value && typeof value === 'object' && !Array.isArray(value) ? value : {}; } catch (e) { return {}; }
  }
  function record(route, id) {
    if (route !== 'concept' && route !== 'practice') return;
    try { localStorage.setItem(key, JSON.stringify({ route: route, id: id, at: Date.now() })); } catch (e) {}
  }
  function render(scope) {
    var link = scope.querySelector('[data-learning-continue]');
    var note = scope.querySelector('[data-learning-resume-note]');
    var summary = scope.querySelector('[data-learning-summary]');
    if (!link || !window.AIBeginner) return;
    var api = window.AIBeginner;
    var progress = read('aib-concept-progress-v1');
    var completed = read('aib-concept-read');
    function concept(id) {
      if (!Object.prototype.hasOwnProperty.call(conceptNames, id)) return null;
      var entry = progress.chapters && progress.chapters[id];
      if ((!entry || !Number.isFinite(entry.percent) || entry.percent < 2) && !completed[id]) return null;
      if (!entry) entry = {};
      var percent = completed[id] ? 100 : Math.max(0, Math.min(100, entry.percent));
      return { id: id, route: '概念学习', title: conceptNames[id], done: !!completed[id] || percent === 100, suffix: '#resume', position: '读到 ' + percent + '%' + (typeof entry.title === 'string' && entry.title ? ' · ' + entry.title : '') };
    }
    function practice(id) {
      var chapter = api.chapters.find(function (item) { return item.id === id; });
      if (!chapter || (!api.readSectionCount(id) && api.getStatus(id) === 'unseen')) return null;
      var lastKey = api.lastSectionKey(id);
      var section = api.chapterSections(chapter).find(function (item) { return item.key === lastKey; });
      return { id: id, route: '上手学习', title: chapter.title, done: api.getStatus(id) === 'seen', suffix: section ? '#sec-' + id + '-' + section.key : '', position: section ? '上次读到「' + section.title + '」' : '接着上次的内容读' };
    }
    var latest = read(key);
    var target = latest.route === 'concept' ? concept(latest.id) : latest.route === 'practice' ? practice(latest.id) : null;
    // 旧进度没有跨路线时间：优先提供已有上手记录，否则接上概念记录，不编造时间。
    if (!target) target = practice(api.lastChapterId()) || concept(progress.last);
    if (summary) summary.hidden = true;
    if (!target) {
      link.href = '#quick-start';
      link.textContent = '5 分钟，写好一封邮件';
      if (note) note.hidden = true;
      return;
    }
    link.href = 'detail.html?type=learn&id=' + encodeURIComponent(target.id) + (target.done ? '' : target.suffix);
    link.textContent = (target.done ? '回顾 · ' : '继续 · ') + target.title;
    if (note) {
      note.textContent = target.route + ' · ' + (target.done ? '这一篇已读完，可再看一遍或选下一篇。' : target.position) + '（进度保存在当前浏览器）';
      note.hidden = false;
    }
  }
  window.AILearningEntry = { record: record, render: render };
  function refresh() { if (window.AIBeginner && document.querySelector('[data-learning-continue]')) window.AIBeginner.refreshHub(document); }
  window.addEventListener('pageshow', refresh);
  window.addEventListener('storage', refresh);
}());
