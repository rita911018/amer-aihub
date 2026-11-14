/* 亚玛芬 AI 知识库 · 全局搜索（共享脚本）
   依赖：页面顶栏需存在 #searchInput / #searchDrop / #searchWrap */
(function(){
  var SEARCH_INDEX = [
    /* 页面 */
    { t:'AI 新手入门', d:'四个轻量章节：认识、边界、表达与分工', tag:'板块', href:'learn.html' },
    { t:'录播回放', d:'公司内部 AI 培训回放：Copilot 高阶培训 / 财务专场', tag:'板块', href:'video.html' },
    { t:'AI 工具与资源', d:'工具 / 课程 / 博主 / 论文 四类资源导航', tag:'板块', href:'resources.html' },
    { t:'学习进度', d:'查看概念学习和上手学习共 8 项内容的状态与最近阅读位置', tag:'功能', href:'progress.html' },
    /* 学习模块 */
    { t:'看清 AI：怎么工作、怎么帮你、怎么坑你', d:'写邮件、整理材料，从日常任务认识 AI 的用法与边界', tag:'入门', href:'detail.html?type=learn&id=ai-basics' },
    { t:'5 分钟写好一封邮件', d:'复制虚构会议通知模板，尝试、检查、再改进，零基础第一次上手', tag:'马上试试', href:'learn.html#quick-start' },
    { t:'不知道选哪个 AI 工具', d:'写邮件、整理长材料、学习提问，按任务选三个起点', tag:'推荐起点', href:'resources.html#resource-start' },
    { t:'AI 会说错，重要内容要自己核实', d:'它说得再肯定，也不代表是真的。数字、日期、人名和出处，发出去前都要查一遍。', tag:'入门', href:'detail.html?type=learn&id=ai-boundaries' },
    { t:'话怎么说它才懂', d:'把它当入职第一天的新同事：给背景、别给形容词', tag:'入门', href:'detail.html?type=learn&id=ai-prompting' },
    { t:'哪些活能交给它', d:'先看事情能不能查清，再看答错会不会惹麻烦。', tag:'入门', href:'detail.html?type=learn&id=ai-delegation' },
    /* 录播 */
    { t:'Copilot 高阶培训录播', d:'公司内部 Copilot 进阶培训回放', tag:'回放', href:'https://amersportsonline.sharepoint.com/sites/amersportsaicommunity/SitePages/Copilot%E9%AB%98%E9%98%B6%E5%9F%B9%E8%AE%85%E5%BD%95%E6%92%AD.aspx', ext:1 },
    { t:'Copilot 财务专场培训', d:'面向财务场景的 Copilot 专场培训回放', tag:'回放', href:'https://amersportsonline.sharepoint.com/sites/amersportsaicommunity/SitePages/Copilot%E8%B4%A2%E5%8A%A1%E4%B8%93%E5%9C%BA%E5%9F%B9%E8%AE%AD.aspx', ext:1 },
    { t:'TapNow 生成图像教学', d:'公司内部 AI 图像生成实操教学录播', tag:'回放', href:'https://amersportsonline-my.sharepoint.com/:v:/g/personal/rita_sun_amersports_com/IQBVMjw-6gbrTqMem3EcmhPAAcswJ_X2vSgdAUYe4ct8U1E?e=cd5Q95&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxWaWV3IjoiU2hhcmVEaWFsb2ctTGluayIsInJlZmVycmFsQXBwUGxhdGZvcm0iOiJXZWIiLCJyZWZlcnJhbE1vZGUiOiJ2aWV3In19', ext:1 },
    /* 工具与资源 */
    { t:'小A 2.0 · 公司内部问答助手', d:'间接采购S2P、供应商创建与变更、费用报销、项目预算、Ariba、BIT和IT服务。新版引擎会理解上下文并在回答前检查', tag:'内部问答', href:'https://portal.amersports.cn/portal/indexs', ext:1 },
    { t:'AI 工具', d:'通用助手、资料研究与安全提醒', tag:'资源分类', href:'resources.html#tools' },
    { t:'新手课程与视频', d:'提示词、背景模板与日常 AI 使用方法', tag:'资源分类', href:'resources.html#courses' },
    { t:'创作者与播客', d:'产品、技术与工作方式的长期观察', tag:'资源分类', href:'resources.html#creators' },
    { t:'阅读与报告', d:'官方研究、行业报告与经典论文', tag:'资源分类', href:'resources.html#reading' },
    { t:'ChatGPT', d:'OpenAI 通用 AI 助手', tag:'工具', href:'https://chatgpt.com/', ext:1 },
    { t:'Claude', d:'Anthropic 长文、写作与代码助手', tag:'工具', href:'https://claude.ai/', ext:1 },
    { t:'Microsoft 365 Copilot', d:'公司官方办公工具，用公司账号登录，写邮件、整理材料、起草内容', tag:'公司办公', href:'https://m365.cloud.microsoft/chat', ext:1 },
    { t:'Gemini', d:'Google 多模态 AI 助手', tag:'工具', href:'https://gemini.google.com/', ext:1 },
    { t:'DeepSeek', d:'中文问答、推理与代码助手', tag:'工具', href:'https://chat.deepseek.com/', ext:1 },
    { t:'Gemini Notebook（原 NotebookLM）', d:'围绕资料做摘要、问答与研究整理', tag:'工具', href:'https://notebooklm.google.com/', ext:1 },
    { t:'豆包', d:'字节跳动旗下中文 AI 助手，支持问答、写作与多模态创作', tag:'国内工具', href:'https://www.doubao.com/', ext:1 },
    { t:'智谱清言（GLM）', d:'智谱旗下中文 AI 助手，支持对话、文档与办公任务', tag:'国内工具', href:'https://chatglm.cn/', ext:1 },
    { t:'Kimi', d:'适合长材料阅读、搜索研究和知识工作', tag:'国内工具', href:'https://www.kimi.com/', ext:1 },
    { t:'千问', d:'阿里旗下 AI 助手，支持问答、搜索、文档和多模态任务', tag:'国内工具', href:'https://www.qianwen.com/', ext:1 },
    { t:'腾讯元宝', d:'支持日常问答、联网搜索、文件阅读和内容整理', tag:'国内工具', href:'https://yuanbao.tencent.com/', ext:1 },
    { t:'Perplexity', d:'附带来源链接的 AI 搜索与公开资料研究工具', tag:'搜索工具', href:'https://www.perplexity.ai/', ext:1 },
    { t:'AI for Everyone', d:'吴恩达面向非技术背景学习者的 AI 通识课程', tag:'课程', href:'https://www.coursera.org/learn/ai-for-everyone', ext:1 },
    { t:'提示词入门：把要求说清楚', d:'Anthropic 团队的 25 分钟提示词实操视频', tag:'新手视频', href:'https://www.youtube.com/watch?v=ysPbXH0LpIE', ext:1 },
    { t:'提示词补充阅读（微信原文）', d:'中文提示词学习文章，点击进入微信原文', tag:'提示词', href:'https://mp.weixin.qq.com/s/YW_dqTJCauDg_7Kql-ZrXw', ext:1 },
    { t:'给 AI 一份个人背景说明', d:'Tiago Forte 演示怎样制作可重复使用的 AI 背景模板', tag:'新手视频', href:'https://www.youtube.com/watch?v=_K_F_icxtrI', ext:1 },
    { t:'日常工作怎样用大模型', d:'Andrej Karpathy 用实例讲常见用法、边界与检查方法', tag:'新手视频', href:'https://www.youtube.com/watch?v=EWvNQjAaOHw', ext:1 },
    { t:'NotebookLM 从零上手', d:'导入资料、总结、提问和整理的完整新手演示', tag:'工具视频', href:'https://www.youtube.com/watch?v=uSVBfyHBiDU', ext:1 },
    { t:'屏幕演示：AI 工作流怎么搭', d:'Rowan Cheung 展示多个 AI 工具如何配合完成任务', tag:'实操视频', href:'https://www.youtube.com/watch?v=4aOeju76me4', ext:1 },
    { t:'吴恩达：怎样用 AI 更快做出成果', d:'用更短的尝试与反馈周期改进工作', tag:'方法视频', href:'https://www.youtube.com/watch?v=RNJCfif1dPY', ext:1 },
    { t:'用 Obsidian 和 Claude 整理笔记', d:'让 AI 帮忙归类、连接和重新利用笔记', tag:'工具视频', href:'https://www.youtube.com/watch?v=d7Pb73dbcIM', ext:1 },
    { t:'Deep Dive into LLMs like ChatGPT', d:'原有的大模型训练与生成原理长课', tag:'原理视频', href:'https://www.youtube.com/watch?v=7xTGNNLPyMI', ext:1 },
    { t:'Andrej Karpathy', d:'大模型技术讲解与工程实践', tag:'创作者', href:'https://www.youtube.com/@AndrejKarpathy', ext:1 },
    { t:'Peter Yang', d:'AI 产品与创作者经济', tag:'创作者', href:'https://creatoreconomy.so/', ext:1 },
    { t:'Lenny’s Podcast / Newsletter', d:'产品、增长与 AI 实践访谈', tag:'播客与通讯', href:'https://www.lennysnewsletter.com/', ext:1 },
    { t:'Simon Willison', d:'大模型工具、开发实践与风险观察', tag:'技术博客', href:'https://simonwillison.net/', ext:1 },
    { t:'One Useful Thing', d:'Ethan Mollick 的 AI 工作与教育观察', tag:'通讯', href:'https://www.oneusefulthing.org/', ext:1 },
    { t:'宝玉的分享', d:'中文提示词、AI 产品和真实工作流分享', tag:'中文创作者', href:'https://www.baoyu.ai/', ext:1 },
    { t:'机器之心', d:'中文 AI 行业、产品与研究资讯', tag:'中文内容', href:'https://www.jiqizhixin.com/', ext:1 },
    { t:'Zara Zhang', d:'AI 产品、学习方法和动手项目分享', tag:'创作者', href:'https://zarazhang.com/', ext:1 },
    { t:'Andrew Ng / The Batch', d:'吴恩达团队的 AI 教育与每周行业解读', tag:'通讯', href:'https://www.deeplearning.ai/the-batch/', ext:1 },
    { t:'Latent Space', d:'AI 产品、模型与工程从业者访谈', tag:'播客', href:'https://www.latent.space/podcast', ext:1 },
    { t:'No Priors', d:'AI 创业、产品与行业趋势访谈', tag:'播客', href:'https://www.youtube.com/@NoPriorsPodcast', ext:1 },
    { t:'Practical AI', d:'关注真实应用和可落地方法的 AI 播客', tag:'播客', href:'https://practicalai.show/', ext:1 },
    { t:'执行变便宜以后，野心成了瓶颈', d:'AI 降低执行成本之后，怎样把目标想得更大', tag:'Onepod 播客', href:'https://onepod.site/p/AacXwsVEFi4kNBkWSeUccvahnSb/', ext:1 },
    { t:'AI 不会取代设计师，而会把设计门槛抬得更高', d:'AI 加快制作之后，理解用户和做判断更重要', tag:'Onepod 播客', href:'https://onepod.site/p/ELkSwD6YeixT3rkmhLTcvl4AnRc/', ext:1 },
    { t:'AI 是 50 年的一夜成功', d:'Kevin Kelly 回看 AI 的长期积累，适合建立入门认知', tag:'Onepod 播客', href:'https://onepod.site/p/Vz1WwGXr5ifL1RkhChIcAyrHnzd/', ext:1 },
    { t:'把 AI 看成互联网量级，而非一夜替代所有工作', d:'理解 AI 的落地节奏、任务变化和工作影响', tag:'Onepod 播客', href:'https://onepod.site/p/VQ6gwNRIuixjrQkZSeSc7NBEnXe/', ext:1 },
    { t:'AI 悖论：越自动化，工作反而可能越多', d:'自动化节省时间，也会让团队做更多原来做不起的事', tag:'Onepod 播客', href:'https://onepod.site/p/ESD3woCOfiDo8mkg6o4cP4KPnVh/', ext:1 },
    { t:'AI 在校园里的真实使用情况', d:'学生怎样借助 AI 学习，同时保留自己的思考', tag:'Onepod 播客', href:'https://onepod.site/p/UQudwg5xYiSaY4kYVaXckbVlnad/', ext:1 },
    { t:'如何搭建个人 AI OS？', d:'把常用资料、任务与 AI 工作方式整理成个人系统', tag:'Onepod 播客', href:'https://onepod.site/p/Siu8wGaP0iJQpnk02Ioc0lVYnJd/', ext:1 },
    { t:'Building Effective Agents', d:'Anthropic 的 Agent 设计研究', tag:'官方研究', href:'https://www.anthropic.com/research/building-effective-agents', ext:1 },
    { t:'Stanford AI Index', d:'AI 技术、产业、政策与社会影响报告', tag:'行业报告', href:'https://hai.stanford.edu/ai-index', ext:1 },
    { t:'Google The Keyword AI', d:'Google 官方 AI 产品与研究动态', tag:'官方动态', href:'https://blog.google/technology/ai/', ext:1 },
    { t:'Every · AI & I', d:'AI 产品、写作与知识工作实践', tag:'专栏', href:'https://every.to/ai-and-i', ext:1 },
    { t:'Attention Is All You Need', d:'提出 Transformer 架构的经典论文', tag:'经典论文', href:'https://arxiv.org/abs/1706.03762', ext:1 },
    /* 精选站点（新窗口直达原站） */
    { t:'AI 日报', d:'AI 行业每日精选动态（新窗口直达原站）', tag:'精选站点', href:'https://aihot.virxact.com/daily', ext:1 },
    { t:'WaytoAGI · AI 知识库', d:'高质量 AI 知识库与导航（新窗口直达原站）', tag:'精选站点', href:'https://www.waytoagi.com/zh', ext:1 },
    /* 新概念 / 行业动态 */
    { t:'具身智能（Embodied AI）', d:'人形机器人 + VLA 模型，让 AI 操控物理世界', tag:'行业动态', href:'resources.html#reading' },
    { t:'推理模型（Reasoning Model）', d:'OpenAI o 系列 / DeepSeek-R1 · 慢思考范式', tag:'新概念', href:'detail.html?type=learn&id=ai-basics' }
  ];

  // 规范化：去空格 + 标点 + 转小写，便于模糊匹配
  function norm(s){
    return String(s==null?'':s).toLowerCase().replace(/[\s\p{P}\p{S}]+/gu,'');
  }
  // 字符子序列匹配（兜底）
  function fuzzy(text, q){
    if(!q) return true;
    var ti=0;
    for(var i=0;i<q.length;i++){
      var c=q[i];
      while(ti<text.length && text[ti]!==c) ti++;
      if(ti>=text.length) return false;
      ti++;
    }
    return true;
  }

  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;'); }

  var openTimer = null;
  var closeTimer = null;

  function openDrop(){
    if(closeTimer){ clearTimeout(closeTimer); closeTimer = null; }
    var drop = document.getElementById('searchDrop');
    if(!drop) return;
    // Force reflow to restart enter animation
    void drop.offsetHeight;
    drop.classList.add('is-open');
  }

  function closeDrop(){
    var drop = document.getElementById('searchDrop');
    if(!drop) return;
    drop.classList.remove('is-open');
    // After transition ends, clear inner HTML for accessibility
    closeTimer = setTimeout(function(){
      if(!drop.classList.contains('is-open')) drop.innerHTML = '';
    }, 280);
  }

  function render(list){
    var drop = document.getElementById('searchDrop');
    if(!drop) return;
    if(!list.length){
      drop.innerHTML = '<div class="search-empty">没有找到相关结果，试试更短或更模糊的关键词</div>';
      openDrop();
      return;
    }
    var html = '';
    for(var i=0;i<list.length;i++){
      var it = list[i];
      html += '<a class="search-item" href="' + it.href + '"' + (it.ext?' target="_blank" rel="noopener noreferrer"':'') + '>' +
        '<span class="si-tag">' + esc(it.tag) + '</span><span class="si-body"><b>' + esc(it.t) + '</b><small>' + esc(it.d) + '</small></span></a>';
    }
    drop.innerHTML = html;
    openDrop();
  }

  function doSearch(raw){
    raw = (raw||'').trim();
    if(!raw){ closeDrop(); return; }
    var q = norm(raw);
    var res = [];
    // 第一轮：规范化后的子串包含
    for(var i=0;i<SEARCH_INDEX.length;i++){
      var it = SEARCH_INDEX[i];
      var hay = norm(it.t) + ' ' + norm(it.d) + ' ' + norm(it.tag);
      if(hay.indexOf(q)>-1){ res.push(it); if(res.length>=8) break; }
    }
    // 第二轮：模糊（子序列）兜底
    if(res.length<8){
      var seen = {};
      for(var j=0;j<res.length;j++) seen[res[j].href] = 1;
      for(var k=0;k<SEARCH_INDEX.length;k++){
        var it2 = SEARCH_INDEX[k];
        if(seen[it2.href]) continue;
        var hay2 = norm(it2.t) + ' ' + norm(it2.d) + ' ' + norm(it2.tag);
        if(fuzzy(hay2, q)){ res.push(it2); if(res.length>=8) break; }
      }
    }
    render(res);
  }

  function init(){
    var input = document.getElementById('searchInput');
    var wrap = document.getElementById('searchWrap');
    var drop = document.getElementById('searchDrop');
    if(!input || !drop) return;

    input.addEventListener('input', function(){ doSearch(this.value); });
    input.addEventListener('focus', function(){ if(this.value) doSearch(this.value); });
    document.addEventListener('click', function(e){
      if(wrap && !wrap.contains(e.target)) closeDrop();
    });
    document.addEventListener('keydown', function(e){
      if((e.metaKey || e.ctrlKey) && e.key.toLowerCase()==='k'){ e.preventDefault(); input.focus(); }
      if(e.key==='Escape'){ closeDrop(); input.blur(); }
    });
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
