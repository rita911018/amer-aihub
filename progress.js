(function () {
  'use strict';
  var api = window.AIBeginner;
  if (!api) return;
  var conceptItems = [
    { id: 'ai-what', title: 'AI 到底是什么' },
    { id: 'ai-other', title: 'AI 术语速查' },
    { id: 'ai-history', title: 'AI 76 年发展史' },
    { id: 'prompt-basics', title: '提示词五大方法' }
  ];
  function read(key, fallback) {
    try { var value = JSON.parse(localStorage.getItem(key) || 'null'); return value && typeof value === 'object' ? value : fallback; } catch (error) { return fallback; }
  }
  function status(percent, complete) {
    return complete ? '已完成' : percent > 0 ? '学习中' : '未开始';
  }
  function card(item) {
    var article = document.createElement('article');
    article.className = 'progress-card';
    article.setAttribute('data-status', item.complete ? 'complete' : item.percent > 0 ? 'started' : 'unstarted');
    article.innerHTML = '<div class="progress-card-top"><span>' + item.route + '</span><b>' + status(item.percent, item.complete) + '</b></div>' +
      '<h3>' + item.title + '</h3>' +
      '<p>' + item.note + '</p>' +
      '<div class="progress-card-meter" role="progressbar" aria-label="' + item.title + '进度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + item.percent + '"><i style="width:' + item.percent + '%"></i></div>' +
      '<div class="progress-card-foot"><span>' + item.percent + '%</span><a href="' + item.href + '">' + (item.complete ? '复习' : item.percent > 0 ? '继续学习' : '开始学习') + ' →</a></div>';
    return article;
  }
  function render() {
    if (typeof api.refreshHub === 'function') api.refreshHub(document);
    var conceptRead = read('aib-concept-read', {});
    var conceptProgress = read('aib-concept-progress-v1', { chapters: {} });
    var conceptChapters = conceptProgress.chapters || {};
    var concepts = conceptItems.map(function (item) {
      var entry = conceptChapters[item.id] || {};
      var complete = !!conceptRead[item.id];
      var percent = complete ? 100 : Math.max(0, Math.min(99, Number(entry.percent) || 0));
      return { id:item.id, route:'概念学习', title:item.title, complete:complete, percent:percent, note:percent ? (entry.title ? '上次读到：' + entry.title : '已有阅读记录') : '还没有开始', href:'detail.html?type=learn&id=' + item.id + (percent > 0 && !complete ? '#resume' : '') };
    });
    var practices = api.chapters.map(function (chapter) {
      var complete = api.getStatus(chapter.id) === 'seen';
      var readCount = api.readSectionCount(chapter.id);
      var total = api.totalSectionCount(chapter.id);
      var percent = complete ? 100 : total ? Math.round(readCount / total * 100) : 0;
      var last = api.lastSectionKey(chapter.id);
      var section = api.chapterSections(chapter).filter(function (part) { return part.key === last; })[0];
      return { id:chapter.id, route:'上手学习', title:chapter.title, complete:complete, percent:percent, note:section ? '上次读到：' + section.title : '还没有开始', href:'detail.html?type=learn&id=' + chapter.id + (last && !complete ? '#sec-' + chapter.id + '-' + last : '') };
    });
    var conceptMount = document.querySelector('[data-progress-concept]');
    var practiceMount = document.querySelector('[data-progress-practice]');
    conceptMount.replaceChildren.apply(conceptMount, concepts.map(card));
    practiceMount.replaceChildren.apply(practiceMount, practices.map(card));
    var all = concepts.concat(practices);
    var completeCount = all.filter(function (item) { return item.complete; }).length;
    var percent = Math.round(all.reduce(function (sum, item) { return sum + item.percent; }, 0) / all.length);
    document.querySelector('[data-progress-completed]').textContent = completeCount;
    document.querySelector('[data-progress-percent]').textContent = percent + '%';
    document.querySelector('[data-progress-fill]').style.width = percent + '%';
    document.querySelector('[data-progress-bar]').setAttribute('aria-valuenow', String(percent));
    document.querySelector('[data-concept-completed]').textContent = concepts.filter(function (item) { return item.complete; }).length + ' / 4 已完成';
    document.querySelector('[data-practice-completed]').textContent = practices.filter(function (item) { return item.complete; }).length + ' / 4 已完成';
    var recent = read('aib-last-reading-v1', {});
    var recentItem = all.filter(function (item) { return item.id === recent.id && item.route === (recent.route === 'concept' ? '概念学习' : '上手学习'); })[0];
    var continueLink = document.querySelector('[data-progress-continue]');
    var summary = document.querySelector('[data-progress-summary]');
    if (recentItem) {
      continueLink.href = recentItem.href;
      continueLink.textContent = (recentItem.complete ? '复习：' : '继续：') + recentItem.title;
      summary.textContent = recentItem.complete ? '最近学习的内容已经完成，可以复习或选择下一项。' : recentItem.note + '。';
    } else if (percent > 0) {
      var unfinished = all.filter(function (item) { return !item.complete; })[0];
      continueLink.href = unfinished.href;
      continueLink.textContent = '继续：' + unfinished.title;
      summary.textContent = '选择一项继续，不要求按顺序完成。';
    }
  }
  document.querySelector('[data-progress-reset]').addEventListener('click', function () {
    if (!confirm('确定清除当前浏览器里的全部学习进度吗？')) return;
    ['amersports-ai-beginner-progress-v1','aib-concept-read','aib-concept-progress-v1','aib-last-reading-v1'].forEach(function (key) { try { localStorage.removeItem(key); } catch (error) {} });
    location.reload();
  });
  render();
  window.addEventListener('pageshow', render);
  window.addEventListener('storage', function () { location.reload(); });
}());
