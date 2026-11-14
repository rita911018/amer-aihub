(function () {
  'use strict';

  var STORAGE_KEY = 'amersports-ai-beginner-progress-v1';
  var STATUS_UNSEEN = 'unseen';
  var STATUS_STARTED = 'in-progress';
  var STATUS_SEEN = 'seen';
  var claimTriageDemoCount = 0;

  var chapters = [
    {
      id: 'ai-basics',
      number: '01',
      title: '看清 AI：怎么工作、怎么帮你、怎么坑你',
      image: { webp: 'images/ai-xiaoa-ch01.webp', fallback: 'images/ai-xiaoa-ch01.png', width: 1200, height: 800, alt: '小A站在固定软件按钮与自然语言结果之间，展示软件使用方式的变化', caption: '从学软件的规则，到直接说清楚你要什么' },
      sections: [
        {
          title: '先把要做的事说清楚，不必先背术语',
          paragraphs: ['很多软件要先学菜单、按钮和操作步骤。比如做一张数据透视表，你可能得先找入口，再设置字段。', 'AI 助手多了一种用法：**先用日常语言说清楚你想做什么**。写邮件、整理文字这类任务，通常不必先学一堆操作。复杂任务仍可能需要合适的工具、权限和检查。', '先记住下面两点。'],
          bullets: [
            { term: '先说目标，再补背景', explain: '像给同事交代工作一样，告诉它给谁看、要什么结果、有哪些限制。回答不合适，也可能是资料不足或工具能力不够，不一定是你不会问。' },
            { term: '语气肯定，不代表内容准确', explain: 'AI 有时会提示不确定，有时也会把错误说得很流畅。软件不报错也不等于结果正确，**重要数字、日期和结论要回到资料核对**。' },
          ],
          demo: {
            type: 'shift',
            title: '同一件事，两种做法',
            hint: '拿「把一小时会议录音整理成纪要」举例，看两边差在哪。',
            task: '把一小时的会议录音，整理成能发出去的纪要',
            sides: [
              {
                era: 'past', eraLabel: '过去 · 你学软件的规则',
                how: '你得自己会',
                steps: ['把录音听一遍，边听边记', '打开文档，自己想用什么结构', '手动分出决定、行动项、负责人', '调格式、对齐、加编号', '通读一遍，改错别字'],
                cost: '大约 40 分钟', note: '而且你得本来就知道纪要该长什么样',
              },
              {
                era: 'now', eraLabel: '现在 · 软件听你的话',
                how: '你说清楚就行',
                steps: ['把转写文字贴进去', '说一句：请整理成决定、行动项、负责人和待确认事项', '读一遍，核对事实和责任人', '不满意就说哪里不对，让它改'],
                cost: '大约 5 分钟', note: '但核对那一步不能省，它可能编',
              },
            ],
            punchline: '左边那 40 分钟里，打字只占一小部分。大头是**你得先知道纪要该长什么样**。右边把这一部分省了，但结果得自己核实。',
          },
        },
        {
          title: 'AI 不只是搜索引擎',
          paragraphs: ['先记住一个区别：**搜索负责帮你找到原文，AI 负责根据已有内容组织答案。**你是要查事实，还是要处理材料，选的工具不一样。', '搜索像图书管理员，会把原文和出处找给你；AI 更像读过很多资料的助手，会直接组织出一段答案，但这段答案不等于已经查证。'],
          bullets: [
            { term: '给了链接，也要点开看', explain: '现在不少 AI 能联网搜索。它给出链接，说明有资料可查；但资料可能过期、片面或本身就有错，关键数字仍要回原文确认。' },
            { term: '用关键词而不是整句话搜', explain: '搜索框里塞一整句口语化问题，结果往往很泛。挑出 2–4 个核心词，加引号锁定精确词组，再用减号去掉无关词，命中率会高很多。' },
            { term: '先看前 3 条再决定是否继续翻', explain: '多数问题的答案就藏在首页前几条。搜不到想要的，先换关键词、再换搜索引擎；别在第 10 页之后死磕，那通常意味着方向就错了。' },
            { term: '善用 site:、filetype:、时间筛选', explain: '想找某个官网的内容，前面加 site:xxx.com；想要 PDF/表格，加 filetype:pdf；想要最近一年的，加时间筛选。三个小工具能把一大半无关结果挡在外面。' },
          ],
          quickGuide: [
            { action: '查今天的天气、新闻、股价、营业时间', tool: '搜索 / AI 联网', reason: '要的是此刻的事实，不能只靠模型记忆。' },
            { action: '解释看不懂的概念、名词或已有材料', tool: '问 AI', reason: 'AI 擅长顺着追问，把复杂内容换成人话。' },
            { action: '改写、润色、翻译、起名字、出主意', tool: '问 AI', reason: '这类任务没有唯一标准答案，是 AI 的强项。' },
            { action: '核实重要事实、法规、药量或数据', tool: '先搜索，再用 AI', reason: '先找到原始出处，再让 AI 帮忙理解或表达。' },
          ],
          memoryRisks: [
            { title: '它可能记串', body: '相似的作者、书名、案例或数字可能被混在一起，而且它说错时仍然很肯定。' },
            { title: '它的知识有截止日期', body: '模型训练完成后的新事件未必知道；即使联网，也要检查资料日期。' },
            { title: '它直接给结论，不等于有出处', body: '流畅答案没有天然可追溯性，重要内容要找到并打开原文。' },
          ],
        },
        {
          title: 'AI 可以帮你做什么',
          paragraphs: ['下面 8 个场景都是新手常见用法，点开看看可以怎么向 AI 交代。'],
          bullets: [],
          scenes: [
            { icon: 'notes', title: '一小时录音，变成会议纪要', input: '周会一小时的录音转写，两千多字，话题跳来跳去，中间还夹着闲聊', assist: '整理成决定、行动项、负责人', confirm: '事实对不对、责任人有没有搞错，确认了再发。', example: '可以和 AI 说：请把这段记录整理为决定、行动项、负责人和待确认事项。' },
            { icon: 'audience', title: '同一份材料，讲给不同人听', input: '总部发下来的 30 页季度报告，你只需要讲清其中和我们区相关的三页', assist: '按不同对象重讲一遍重点', confirm: '数字有没有讲错、对象和内容配不配。', example: '可以和 AI 说：请分别用给管理者和给新同事看的方式，讲清这份材料的三个重点。' },
            { icon: 'draft', title: '一个想法，写成邮件或汇报', input: '要说什么、给谁看、什么语气，你心里都想好了，就是一直没落成字', assist: '写成邮件、汇报或沟通稿初稿', confirm: '事实、语气，还有对外能不能这么说。', example: '可以和 AI 说：请把这个主题写成一封简洁邮件，先给结论，再列三项行动。' },
            { icon: 'repeat', title: '重复工作，先做出模板', input: '每周都要做一遍的库存汇总，步骤年年不变，就是费时间；手上有上两周做好的样例', assist: '先做一个模板或草稿出来', confirm: '规则、边界、异常情况都过一遍再用。', example: '可以和 AI 说：请根据这些重复步骤，起草一个可复用模板，并标出需要人工确认的位置。' },
            { icon: 'compare', title: '多份文件，快速找出差异', input: '同一份方案的两个版本，改动散在不同段落里', assist: '按新增、删除、改写三类列出差异', confirm: '有没有漏项，哪一版才是最终版本。', example: '可以和 AI 说：请比较这两个版本，按新增、删除和改写列出差异，并标出需要我确认的冲突。' },
            { icon: 'organize', title: '杂乱资料，整理成清楚结构', input: '一批格式不一的笔记、清单或文字记录', assist: '归类、去重并整理成统一结构', confirm: '分类是否合理，原始信息有没有被改错。', example: '可以和 AI 说：请把这些资料按主题归类，合并重复内容，保留原意，并列出无法判断的项目。' },
            { icon: 'feedback', title: '一堆反馈，归纳出常见问题', input: '用户评论、访谈记录或门店反馈', assist: '归纳高频主题、典型问题和不同意见', confirm: '少数意见有没有被忽略，原话是否被曲解。', example: '可以和 AI 说：请把这些反馈按主题归类，列出高频问题、代表性原话和仍有分歧的地方。' },
            { icon: 'summary', title: '一份长材料，提炼重点和待确认事项', input: '一份篇幅很长、信息密集的报告或通知', assist: '提炼重点、行动项和需要追问的内容', confirm: '关键条件、日期和责任人是否来自原文。', example: '可以和 AI 说：请提炼这份材料的五个重点、行动项和待确认问题，每一项注明原文依据。' },
          ],
        },
        {
          title: '大模型怎样一步步生成回答',
          paragraphs: ['你打完一句话，AI 开始回答。这中间它到底在干什么？', '它会把你输入的内容和自己正在写的内容，都切成一个个小片段，这些片段叫 **Token**。Token 不一定等于一个完整的汉字或英文单词：一个词可能被拆成几块，一小段标点也可能单独算一块。', '每写下一块时，它会看着**前面的上下文**，从多个高概率候选里挑一个最可能接得上的 Token；接上后再继续挑下一块。整篇回答就是这样一步步长出来的。因为每一步都有不止一个合理候选，**同一句 Prompt 也可能得到不同但合理的回答**。'],
          bullets: [
            { term: '它依据什么接着写', explain: '模型训练时学到了语言和知识中的规律，也会参考当前提供的材料。**如果你没提供报表，它也没通过获批工具查到数据，就不能把生成的销售数字当事实。**' },
            { term: '表达顺畅，不等于事实可靠', explain: '它往往能组织出像样的解释，但语言流畅和事实准确是两回事。读起来再顺，也要检查关键结论有没有依据。' },
            { term: '没有依据时，可能补出不存在的信息', explain: '资料不足时，AI 可能承认不知道，也可能生成错误数字或不存在的出处。可以要求它标注缺失信息，但**这不能代替你核实原文**。' },
            { term: '算数要看它用的是什么方法', explain: 'AI 直接生成计算答案时可能出错，也可能做对；有些工具能运行代码、公式或计算器来实际计算。处理报表时，请它展示公式、数据范围和计算过程，再用原表抽查。**调用了计算工具，也仍可能选错数据或公式。**' },
          ],
        },
        {
          title: '别默认它记得所有事，关键背景要再确认',
          paragraphs: ['AI 作答时能参考的资料，可以想成手边的一张工作桌，这叫“上下文”。**关掉网页不等于对话记录被清空。**重新打开原对话，通常可以继续；新对话是否带上之前的信息，要看产品的记忆、项目资料和相关设置。', '不同产品能处理的内容长度不同。长对话可能被截断、压缩或重新检索，AI 也可能忽略重要条件，并不一定严格按“最早的先丢掉”处理。发现它前后矛盾时，先确认关键要求，再决定要不要开新对话。'],
          bullets: [
            { term: '常用背景存一份，开始前确认', explain: '把项目是什么、给谁看、有哪些限制写成一段可复用说明。即使工具有记忆，也要确认它记住的是否仍然正确。不要把敏感资料存入未经批准的外部服务。' },
            { term: '重要要求单独列出来', explain: '不要把最关键的限制埋在长材料里。可以放在开头，生成前再请它复述。这样更容易检查，但不能保证它完全不遗漏。' },
            { term: '跑题时先纠正，必要时再开新对话', explain: '指出哪里不对，并重申关键条件。如果仍然混乱，把已确认的结论整理成简短交接说明，再开新对话继续。' },
          ],
          demo: {
            type: 'context-window',
            title: '用一张小桌子，理解资料遗漏的风险',
            hint: '这是只保留 4 条信息的简化演示。真实产品可能采用摘要或检索，不一定按同样方式丢弃内容。',
            capacity: 4,
            turns: [
              { role: '你', text: '我们在做秋冬新品的门店培训方案。' },
              { role: '你', text: '重点是跑鞋，别提滑雪装备。' },
              { role: 'AI', text: '好的，聚焦跑鞋。建议分三个模块……' },
              { role: '你', text: '培训对象是店长，不是导购。' },
              { role: 'AI', text: '已调整为店长视角，增加了排班和陈列。' },
              { role: '你', text: '时间只有半天，砍掉一半内容。' },
              { role: 'AI', text: '好的，压缩到半天，保留核心三节……' },
              { role: '你', text: '再帮我加一段开场。' },
              { role: 'AI', text: '开场建议先讲滑雪系列的市场表现……' },
            ],
            consequence: '这个简化演示里，“别提滑雪装备”被移出了可用资料，后面的回答因此跑题。真实使用中，跑题也可能来自误解或忽略条件，先请它复述要求再检查。',
          },
        },
      ],
      takeaway: {
        title: '这一章带走什么',
        template: '看清 AI：怎么工作、怎么帮你、怎么坑你\n\nAI 可以帮你写作、整理和解释材料；有的产品还能搜索或调用计算工具。生成得流畅，不等于内容已经核实。\n\n一、重要事实回原文核对\n数字、日期、人名和出处，要检查来源；计算结果要检查数据范围、公式和过程。\n\n二、关键背景主动确认\n关闭网页不等于删除对话。能否跨对话记忆取决于产品和设置，不要默认它记得全部要求。\n\n三、先做低风险的小事\n用公开或虚构材料练习，涉及公司资料先确认权限。正式使用前，自己检查事实、表达和遗漏。',
        supplementalResource: {
          label: 'AI 热词',
          description: '补充资料：集中查看常见 AI 术语，需要时再查，不必一次记完。',
          href: 'https://my.feishu.cn/wiki/Zt1swZ2kAiuOmjkAp6wcl57jn9e',
        },
      },
    },
    {
      id: 'ai-boundaries',
      number: '02',
      title: 'AI 会说错，重要内容要自己核实',
      description: '它说得再肯定，也不代表是真的。数字、日期、人名和出处，发出去前都要查一遍。',
      image: { webp: 'images/ai-xiaoa-ch02.webp', fallback: 'images/ai-xiaoa-ch02.png', width: 1200, height: 800, alt: '小 A 对着一份材料逐条核对的插画', caption: '发出去之前，先自己过一遍' },
      sections: [
        {
          title: '它会编，而且编的时候看不出来',
          paragraphs: ['这类现象通常叫“幻觉”。模型不是故意骗人：资料不足时，它有时会承认不知道，有时也会生成看似合理但并不准确的内容。不能只凭语气判断真假。'],
          bullets: [
            { term: '像那种从不说「我不知道」的同事', explain: '你问他上季度北区增长多少，他不会说「我查一下」，他会很自信地给你一个数。听起来特别合理，但可能是编的。' },
            { term: '最要命的是没有破绽', explain: '它胡说时的语气、流畅度、自信程度，和说真话时一模一样。你没法从「听起来怎么样」判断真假，只能回去核。' },
            { term: '越精确的东西越要小心', explain: '数字、日期、人名、引用、条文这几类最容易出问题。反过来，让它润色一段话、换个说法、起个名字，编不出什么大事。' },
          ],
          demo: {
            type: 'hallucination-spotter-inline',
            title: 'AI 写的内容，哪些能直接用？',
            hint: '同一段 AI 汇报，逐句判断：有依据就保留，关键事实要核验，夸大或无依据的说法要修改。',
            claims: [
              { text: '原始表显示本月销量为 12,400 件。', category: '可以保留', why: '这个数字在你给它的表里，回原表一对就能确认。' },
              { text: '本月同比增长 18%。', category: '需要核验', why: '看着像从表里算出来的，但你给的表里未必有去年同期。这类数字必须自己算一遍。' },
              { text: '增长完全由新活动带来。', category: '需要修改', why: '「完全由」是它接上去的因果判断，材料里没有排除促销、季节、竞品关店。要么补证据，要么改成推测。' },
            ],
          },
        },
        {
          title: '一段话里混着三种东西',
          paragraphs: ['AI 写出来的一段话，看着是连贯的一整段，其实里面混着性质完全不同的三种内容。分不开，你就会把它猜的当成查证过的。'],
          bullets: [
            { term: '事实：材料里能找到的', explain: '「北区上季度增长 12%」，这句要么在你给的表里，要么不在。不在就是它编的。' },
            { term: '推论：它自己接上去的', explain: '「说明新店选址策略见效」，听起来像结论，其实是它顺着写下来的。增长可能来自促销、季节、竞品关店，它一个都没排除。' },
            { term: '观点：它给的建议', explain: '「建议明年加倍开店」，这是判断不是发现。可以参考，但不能当成数据支持的结论。' },
            { term: '最危险的是中间那句', explain: '事实好核，观点一看就是建议，唯独推论最容易被当成结论用进汇报里。看到「说明」「意味着」「因此」这些词，停一下。' },
          ],
        },
        {
          title: '这 5 类信息必须认真核实',
          paragraphs: ['不用推翻整段回答，也不用逐字查完。先把下面五类信息圈出来，看到就停一下。'],
          bullets: [
            { term: '数字', explain: '包括容量、比例、版本号和阈值。' },
            { term: '时间线', explain: '包括发布时间和功能更新时间。' },
            { term: '设置项、接口名与参数', explain: '名字很容易写得像真实界面，实际却不存在。' },
            { term: '冷门材料里的细节', explain: '公开网页上往往找不到第二份材料可以对照。' },
            { term: '有没有某个功能', explain: '材料没提到时，AI 容易用经验把空白补上。' },
          ],
        },
        {
          title: '让 AI 的回答过三道检查',
          paragraphs: ['下面三句话可以接在任何回答后面。它们不能保证答案正确，但能先把最值得核对的地方分出来。'],
          copyPrompts: [
            {
              id: 'source-trace',
              title: '请它把每条判断指回原始材料',
              summary: '先看每个结论能不能在材料里找到。',
              prompt: '请把刚才回答中的每条判断逐条列出，并标明它来自我提供材料的哪一段。引用对应原句。找不到直接依据，就写“未找到依据”，不要补出处。',
            },
            {
              id: 'fresh-check',
              title: '换一种问法重新回答同一件事',
              summary: '两次回答不一致的地方，最值得先查。',
              prompt: '请先放下刚才的结论，换一种问法重新检查这份材料。把新答案和上一版逐条对照，只列出两次不一致的地方。',
            },
            {
              id: 'fact-or-inference',
              title: '把能确认的内容与推测分开',
              summary: '确认材料写了什么，也看清 AI 自己补了什么。',
              prompt: '请把剩下的判断分成“材料直接写明”和“根据材料推测”两栏。每条推测写清依据和还缺哪份信息。没有依据的内容标为“待确认”。',
            },
          ],
        },
        {
          title: '什么时候必须打开原文核对',
          paragraphs: [
            '先看一句话用错后会发生什么，再看它是不是说得太肯定，让你想直接照做。错了后果越大，越要离开对话，亲眼看原始材料。',
            '凡是你不确定的，标上**待确认**，不要编。',
          ],
          bullets: [
            { term: '先找会改变行动的句子', explain: '付款、签字、提交材料、公开转述或替别人作决定，都要核对。' },
            { term: '再写清用错一次的后果', explain: '会多付什么、漏掉什么条件、承担什么责任，或者让谁跟着做错。' },
            { term: '指定真正要打开的原始材料', explain: '看当前版本协议、官方公告、账单字段或原始数据，不能只看搜索摘要和另一段 AI 回答。' },
            { term: '把没有出处的完整说法单独标出', explain: '语气很确定、细节很完整，却找不到原文位置的内容，统一留在待核对区。' },
          ],
          demo: {
            type: 'evidence-check-inline',
            title: '哪一版更适合继续核实？',
            versions: [
              { label: '版本 A', text: '销量上涨，说明营销活动有效，下个月应该加大投放。', usable: false, feedback: '版本 A 把因果推测直接写成结论。先改写，再回到销量和营销数据核实。' },
              { label: '版本 B', text: '本月销量上升，但暂时不能确定是不是营销活动带来的。补充渠道和成本数据后，再决定是否加大投放。', usable: true, feedback: '版本 B 更适合作为核实起点，因为它分开了事实和推测。但“销量上升”仍要对照原始数据，不能直接发布。' },
            ],
          },
        },
      ],
      takeaway: {
        title: '这一章带走什么',
        items: null,
        template: '防幻觉，记住三步\n\n1. 先圈出五类容易出错的信息\n数字、时间线、设置项和参数、冷门材料细节，以及材料没有提到的功能。\n\n2. 让 AI 的回答过三道检查\n逐条找原文、换一种问法复查，再把能确认的内容和推测分开。\n\n3. 后果大，就打开原文\n要付款、签字、提交或公开发布的内容，亲眼看原始材料。\n\n凡是不确定的，标上待确认，不要编。',
      },
    },
    {
      id: 'ai-prompting',
      number: '03',
      title: '话怎么说它才懂',
      description: '把它当一个聪明、但完全不了解你的新同事。',
      image: { webp: 'images/ai-xiaoa-ch03.webp', fallback: 'images/ai-xiaoa-ch03.png', width: 1200, height: 800, alt: '小A把四块信息拼成一张清晰的任务说明卡片', caption: '把目标、背景、格式和边界说清楚' },
      sections: [
        {
          title: '把它当需要交代背景的新同事',
          paragraphs: ['可以把 AI 想成学习很快的新同事：它未必认识你的老板，也不知道项目口径和材料格式，除非你在当前对话、项目资料或产品记忆中提供过。', '新对话能否沿用过去信息取决于产品功能和设置。重要背景不要靠猜，开始前主动确认最稳妥。'],
          bullets: [
            { term: '你得先把背景给够', explain: '你不会对新人说「写个材料」就走开。你会告诉他给谁看、什么场合、有什么忌讳。对它也一样。' },
            { term: '「写专业一点」是句废话', explain: '新同事不知道我们这儿「专业」长什么样。是要严谨克制，还是要有点热度？是能用行业黑话，还是要说人话？你不说，他只能猜。' },
            { term: '关掉重开，得重讲一遍', explain: '不是他记性差，是又换了个第一天上班的人。常用背景存成一段，每次贴一遍。' },
          ],
          promptTemplates: [
            {
              id: 'learn',
              title: '学习新事物',
              description: '适合快速弄懂陌生概念，同时检查自己是不是真的理解。',
              prompt: '我想学习的是：【填写概念或问题】。\n\n请分两层解释：\n1. 新手层：用生活化类比和一个具体例子，让没有基础的人也能听懂；\n2. 专业解释层：用准确术语说明核心机制、适用边界和常见误解。\n\n最后请整理：\n- 新手说法与专业术语的对应关系；\n- 我最可能理解错的地方；\n- 3 个自测问题，用于检查我是否真正理解。',
            },
          ],
        },
        {
          title: '四要素：像给同事派活一样交代',
          paragraphs: ['不用背什么咒语。你平时怎么给人派活，就怎么跟它说——把四样东西说全，返工次数会明显下降。'],
          bullets: [
            { term: '目标：为什么做、什么算成功', explain: '「下周三给区域经理开会用」。说了目标，它才知道该突出什么、省略什么。' },
            { term: '背景：给谁看、有什么材料、有什么忌讳', explain: '「这是上季度数据，只能用这里面的，别引用外部数字」。背景越具体，它猜得越少。' },
            { term: '任务：具体让它做什么', explain: '「提炼三个重点」，而不是「看一下」。动词要明确。' },
            { term: '输出要求：多长、什么格式、什么语气', explain: '「两百字以内、先给结论、不要小标题」。不说这条，它默认给你写三千字。' },
          ],
          promptFormula: {
            shortcut: '背景 + 要求 + 限制',
            explanation: '这是一个简化公式：目标和背景说明为什么做、在什么情境下做；要求要落成具体任务；限制放进输出要求，和长度、格式、语气、不能做什么一起说清。',
          },
          promptExamples: [
            {
              id: 'regional-review',
              title: '区域经营复盘',
              summary: '你手上有一组季度经营数据，需要让管理层快速看清变化、风险和下一步重点。',
              elements: [
                { label: '目标', value: '让区域管理层快速看清本季度变化、风险和下一步重点。' },
                { label: '背景', value: '只使用我提供的季度数据；读者是区域管理层，时间有限。' },
                { label: '任务', value: '识别 3 个驱动因素、2 个风险和 3 项下一步行动，并标出缺少证据的判断。' },
                { label: '输出要求', value: '先给结论，再用短句分块呈现；语气克制、可直接用于经营会议。' },
              ],
              constraints: ['只使用提供的季度数据，不补写外部数字或因果关系。', '证据不足时明确写“待确认”，不要把推测写成结论。'],
              prompt: '目标：让区域管理层在两分钟内看清本季度经营变化、主要风险和下一步重点。\n背景：以下是本季度区域经营数据，读者是区域管理层。只使用我提供的季度数据，不引用外部数字，也不要补写材料中没有的因果关系。\n任务：基于数据识别 3 个主要驱动因素、2 个风险和 3 项下一步行动。每个判断都注明对应数据；如果材料不足以支持判断，请标为“缺少证据 / 待确认”。\n输出要求：先给 3 句执行摘要，再按“驱动因素 / 风险 / 下一步行动 / 待确认信息”四部分呈现。使用简洁、克制、管理层可直接阅读的语言，总长度控制在 450 字以内。',
            },
            {
              id: 'meeting-follow-up',
              title: '跨部门会后确认邮件',
              summary: '你刚开完一场跨部门会议，需要把已经确认的决定、负责人、截止时间和待确认问题发给所有人。',
              elements: [
                { label: '目标', value: '让参会人对已确认事项、负责人和截止时间形成一致理解。' },
                { label: '背景', value: '输入是跨部门会议记录，可能包含重复、口语和未决问题。' },
                { label: '任务', value: '整理决策、负责人、截止时间和待确认问题，指出记录中的冲突或缺口。' },
                { label: '输出要求', value: '生成邮件主题、简短正文和行动清单；语气专业、中性。' },
              ],
              constraints: ['不要补写会议记录中没有的承诺、负责人或日期。', '有冲突或缺失时标为“待确认”，不要自行裁决。'],
              prompt: '目标：让所有参会人在会后对已经确认的决定、负责人、截止时间和待确认问题形成一致理解。\n背景：下面是跨部门会议记录，内容可能重复、口语化，也可能存在负责人或日期缺失。\n任务：先梳理已经确认的决策，再提取每项行动的负责人和截止时间，最后列出仍未解决的问题。若两处记录冲突，请并列指出；不要补写记录中没有的承诺、负责人或日期。\n输出要求：生成一封专业、中性、简洁的会后确认邮件，包括：1）清晰的邮件主题；2）不超过 120 字的正文；3）行动清单，字段为事项、负责人、截止时间、状态；4）待确认问题。缺失内容统一标注“待确认”。',
            },
          ],
        },
        {
          title: '给背景，别给形容词',
          paragraphs: ['这是最省力也最容易忽略的一条。多数人第一版不满意，问题都出在这儿。'],
          bullets: [
            { term: '不要只说“专业一点”', explain: '“专业一点”“高级一点”“口语化一点”，每个人理解都不同，AI 只能猜。' },
            { term: '把读者、语气和长度说清楚', explain: '例如：“给管理层看，不用行业黑话，语气克制，控制在一页。”' },
            { term: '有范例，就直接发给 AI 看', explain: '把以前做得好的材料贴给 AI，让它参考结构和语气，比抽象描述更有效。' },
          ],
          promptTemplates: [
            {
              id: 'imitate',
              title: '模仿新事物',
              description: '把优秀范例拆成可迁移的方法，而不是只学表面风格。',
              prompt: '我想拆解的优秀范例是：【粘贴产品页面、方案、流程说明、数据看板或其他成品】。\n我想学会的是：【填写你希望从中学会什么】。\n\n请先用一句话说明它解决了什么问题，再分析：\n1. 它的服务对象是谁，目标是什么；\n2. 它采用了什么结构或流程；\n3. 哪些关键选择拉开了质量差距；\n4. 它的完成标准是什么；\n5. 哪些是可迁移规律，哪些只是案例特有细节。\n\n最后输出：3～5 条可复用规律、一份可以照着执行的操作清单，以及一个最值得先尝试的小练习。',
            },
          ],
        },
        {
          title: '说不清要什么？让它来问你',
          paragraphs: ['新手最大的卡点其实不是不会提问，而是自己都还没想清楚要什么。这时候硬憋一个 prompt，只会得到一堆对谁都成立、但对你没用的万金油答案。', '破法很简单：反过来，让它先问你。'],
          bullets: [
            { term: '一句开场白就够', explain: '「我想做 X，但还没想清楚。先别急着给方案，先问我 5 个问题，问完再动手。」' },
            { term: '为什么有用', explain: '专家和新手的区别，就在于知道该问什么问题。让 AI 来问，等于借它的问题清单——它问的每一个，都在帮你砍掉一批不合适的方案。' },
            { term: '举个例子', explain: '你说「想做个店长培训方案，还没想清楚」，它会问你：培训谁、多少人、线上还是线下、有多少时间、要解决什么具体问题、怎么算成功。这六个问题，你自己一开始想不全。' },
            { term: '什么时候用', explain: '写东西、做方案、教学设计、做选择——凡是你脑子里还是一团的时候，都先让它问一轮。' },
          ],
          promptTemplates: [
            {
              id: 'socratic',
              title: '苏格拉底式提问',
              description: '先把真正的问题问清楚，再讨论判断和下一步。',
              prompt: '我的困惑是：【尽量具体描述发生了什么、你怎么理解，以及你卡在哪里】。\n先不要给建议。请通过最多 6 个问题，帮我找到真正值得回答的问题。\n\n请遵守这些规则：\n1. 每次只问一个问题，根据我的回答决定下一问；\n2. 优先区分可验证的事实、我对事实的解释，以及我希望实现的目标；\n3. 检查关键词是否含糊、我默认了哪些前提、证据来自哪里，以及是否存在相反解释；\n4. 每次提问前，用一句话说明上一条回答让你更新了什么判断；\n5. 只问可能改变结论的问题，信息足够时立即停止。\n\n停止后请总结：已确认事实、仍未验证的假设、最可能改变结论的关键变量，以及一个准确具体的新问题。等我确认这个新问题后，再给建议。',
            },
          ],
        },
        {
          title: '别这么问',
          paragraphs: ['前面讲了该怎么做，这里是反过来的清单。这几个坑几乎人人都踩过。'],
          bullets: [
            { term: '一口气问五件事', explain: '它会挑着答，漏掉几个，而且每个都答得浅。一次问一件，比一次问五件跑得快、答得也准。' },
            { term: '把它当搜索引擎问实时数据', explain: '「今年双十一大促几号开始」——它多半会编一个日期给你。这类问题去搜索。' },
            { term: '连续追问却不给新信息', explain: '「不对，重写」「还是不行，再来」——它没有新信息，只会换个说法再错一遍。要给具体差在哪。' },
            { term: '问「你觉得我这个方案好吗」', explain: '它倾向于顺着你说。要真实反馈就换成「帮我挑三个漏洞」或者「站在反对方立场论证一遍」。' },
            { term: '一次性把 50 页材料全塞进去', explain: '关键信息容易被淹没在中间。先说清楚你要从里面拿什么，或者分段给。' },
            { term: '让它猜受众', explain: '「写个介绍」——写给客户、写给同事、写给老板，是三份完全不同的东西。' },
          ],
        },
      ],
      takeaway: {
        title: '跟 AI 说清楚，记住这四件事',
        items: null,
        template: '想让 AI 少返工，先把事情交代清楚。\n\n1. 说清楚你要做什么\n别只说“帮我写一份汇报”。告诉它这份汇报要解决什么问题。\n\n2. 说清楚给谁看\n写给老板、同事和客户，重点和语气都不一样。\n\n3. 说清楚最后要交什么\n多长、什么格式、先说什么、哪些内容不能写，都提前讲明白。\n\n4. 有范例就直接给它看\n把你满意的旧材料贴过去，让它照着结构和语气来。\n\n自己还没想清楚时，可以直接这样说\n我想做____，现在还没想清楚。先问我 5 个问题，等我回答完再给方案。',
      },
    },
    {
      id: 'ai-delegation',
      number: '04',
      title: '哪些活能交给它',
      description: '先看事情能不能查清，再看答错会不会惹麻烦。',
      image: { webp: 'images/ai-xiaoa-ch05.webp', fallback: 'images/ai-xiaoa-ch05.png', width: 1200, height: 800, alt: '小A把任务卡片分到自动处理、协助处理和人工判断的三个区域', caption: '把任务放进合适的协作通道' },
      sections: [
        {
          title: '先看两件事',
          paragraphs: ['把工作交给 AI 前，先问自己两句。第一句，这件事能不能查出一个明确答案？第二句，答错了会不会惹麻烦？看完这两点，就知道 AI 能做到哪一步。'],
          bullets: [],
          quadrant: {
            xLabel: '这件事能查出明确答案吗？',
            yLabel: '答错了会不会惹麻烦？',
            cells: [
              {
                tone: 'go', axis: '没有唯一答案 · 改一下就行', title: '可以先让 AI 做',
                desc: '适合先做一版，你一眼就能判断合不合适。',
                examples: ['给一次活动起 10 个名字', '把一段通知改成更礼貌的邮件', '把散乱笔记整理成待办清单', '从一份长报告里提炼 3 个要点'],
              },
              {
                tone: 'warn', axis: '有明确答案 · 改一下就行', title: '查过再用',
                desc: 'AI 可以先整理，用之前回到原文核对。',
                examples: ['从原始表格提取销售额并汇总', '整理会议日期、负责人和截止时间', '核对人名、职位和引用出处', '汇总公开网页上的最新产品信息'],
              },
              {
                tone: 'stop', axis: '有明确答案 · 答错会出事', title: '一项一项核对',
                desc: '每个数字、日期和条款都要对原始资料，核不清就不用。',
                examples: ['核对合同里的付款条件和违约条款', '检查财务报表、预算和成本数字', '确认库存、订单和交付数量', '核实法规版本和合规要求'],
              },
              {
                tone: 'stop', axis: '没有唯一答案 · 答错会出事', title: 'AI 给建议，你来决定',
                desc: 'AI 可以帮你列选项，最后由你拍板。',
                examples: ['决定给供应商怎样的正式承诺', '撰写会影响员工的绩效评价', '决定定价、折扣和预算取舍', '制定组织调整和人员安排'],
              },
            ],
          },
        },
        {
          title: '要你签字的，它只能打底',
          paragraphs: ['最后这条是底线，跟前面的判断无关：不管一件事多简单、它做得多好，只要最后是你署名，责任就是你的。'],
          bullets: [
            { term: '谁发出去谁负责，工具不背锅', explain: '这跟你套模板写材料、用实习生的初稿是一个道理——署名的人对结果负责。「这是 AI 写的」不是一个能用的解释。' },
            { term: '猴掌的教训', explain: '有个老寓言：一只猴掌能实现你的愿望，它精确实现了每个愿望的字面含义，却带来灾难——因为愿望本身有歧义。外包了「怎么做」没问题，外包了「做什么」才是危险的。' },
            { term: '验证那一步，省不得', explain: '你可以把整理、改写、打底全交出去，省下的时间正好用来做只有你能做的那部分：判断这个结论对不对、这个口径能不能对外、这个风险要不要提。' },
          ],
        },
      ],
      exercise: {
        type: 'delegation-sort',
        title: '任务分拣台',
        instruction: '把任务放进合适的那一栏，再看看判断理由对不对得上。',
        tasks: [{ text: '把销售表格统一格式', lane: 'AI' }, { text: '根据数据分析异常原因', lane: '人机协作' }, { text: '决定下月跨部门优先级', lane: '人负责' }],
      },
      takeaway: {
        title: '把工作交给 AI，记住三步',
        items: null,
        template: '先让 AI 做能检查的部分\n整理、改写、列清单和写初稿，可以先交给它。\n\n有明确答案，就回原文核对\n数字、日期、人名和条款，用之前都要查一遍。\n\n会影响钱、承诺或人，就由你决定\nAI 可以提供选项，不能替你拍板。需要你署名的内容，只让它打底。',
      },
    },
  ];

  // 「小白三千问」：四章主线之外的常见问题速查。
  // 只放内部原创问答，不列外部工具与站点（那些统一由 resources.html 承接）。
  // 凡涉及公司政策、可用工具、数据口径，一律指向 IT 与合规，不在这里下结论。
  var faqGroups = [
    {
      id: 'start_now',
      label: '马上能用',
      intro: '不用背提示词，照着做就能开始的 8 件小事',
      items: [
        { q: '我今天就想试一次，拿什么任务练手最好', a: '挑一件你本来就会做、但有点烦的事：整理会议记录、把一段通知改顺、从长文里找重点。这样你看得出它有没有做对，也不会因为一次结果不好就把它判死刑。', tip: '第一次别拿重要对外材料练手，先用一份旧材料或内部草稿。' },
        { q: '会议纪要怎么让它整理', a: '把转写或笔记贴进去，直接说：「请整理成四部分：已经决定的事、待办事项、负责人、还没确定的问题。不要补充原文没有的信息。」它给完后，重点核对人名、时间和谁答应做什么。', tip: '录音转文字经常听错人名；发出去前，负责人与截止时间一定回到原记录确认。' },
        { q: '一段话写得乱，怎么让它帮我改', a: '先告诉它别改事实，再说想怎么变。比如：「下面这段是给门店同事的通知。不要新增信息，帮我改得更短、更清楚，语气友好，控制在 150 字内。」这样它知道什么能动、什么不能动。', tip: '不喜欢结果时，直接指出一句：太正式、太长，或者第二段不像我说话。具体一点，它就改得准一点。' },
        { q: '长文看不完，怎么让它先帮我抓重点', a: '把材料给它，再说：「请只根据这份材料，告诉我三件最重要的事、我需要做什么、还有哪些地方没说清。每一条后面标出原文依据。」这样你先看地图，再决定哪些地方要细读。', tip: '它标了依据也要自己打开确认，尤其是数字、日期和规定。' },
        { q: '我不知道该怎么问，能让它带着我问吗', a: '完全可以。直接说：「我想做一份新品培训方案，但脑子还乱。先不要给方案，先问我 5 个最关键的问题；我答完你再开始。」AI 不一定替你想出正确答案，但很适合帮你把问题理顺。', tip: '它问完后，如果有问题你答不上来，正好说明这里需要你去找人、找资料或做决定。' },
        { q: '它给的第一版不满意，是不是只能重新来', a: '不用。把它当成同事的初稿，直接圈出问题继续改。你可以说：「保留第一段，第二段太空，补一个具体例子；最后改成三个要点。」一次只提两三条修改，通常比整篇推倒重来快。', tip: '只说“重写”没有方向；说清“哪里不好、要改成什么样”才有用。' },
        { q: '能不能让它帮我做选择', a: '可以让它把选择摆清楚，但别让它替你拍板。比如：「帮我比较 A、B 两个方案，按成本、时间、风险和对门店的影响列成表；再分别站在支持和反对的角度挑漏洞。」最后哪个更合适，要结合你知道的实际情况决定。', tip: '涉及钱、人员、承诺或对外口径时，AI 的建议只能当参考。' },
        { q: '每次用完，花 30 秒检查什么', a: '检查四样就够：数字对不对、日期对不对、人名和负责人对不对、有没有把你没说过的话补进去。对外发的内容再加一项：这句话由我们说出去合不合适。', tip: '觉得“它写得挺像那么回事”时，反而更该检查；流畅不等于真实。' },
      ],
    },
    {
      id: 'usage',
      label: '会用篇',
      intro: '上手就会遇到的十个问题',
      items: [
        { q: '第一次用 AI 从哪开始', a: '从你手上最烦的一件小事开始。挑一件有现成材料、结果好检查的活，比如把一段会议记录整理成纪要。先看它做得怎么样，再决定要不要交更重的活。', tip: '别一上来就问它「你能做什么」，直接把活给它更快。' },
        { q: '第一句话该怎么问', a: '把四要素说全：目标、背景、任务、输出要求。比如「我要给区域经理做周度汇报，这是原始数据，请提炼三个重点，两百字以内」。四要素齐了，返工次数会明显下降，这一点在「把需求说清楚」那章有展开。' },
        { q: '怎么让它答得更好', a: '给它更多背景，而不是更多形容词。说清楚给谁看、什么场合、要多长、有什么不能提，比说「写得专业一点」有用得多。也可以让它先复述一遍你的要求，确认理解一致再动手。', tip: '把你觉得写得好的旧材料贴给它，让它照着这个风格来。' },
        { q: '答得不对怎么办', a: '别急着重开一轮，直接告诉它哪里不对。指出具体问题「第二段的数字不在我给的表里」，比说「不行，重写」有效得多。改三轮还是不对，多半是要求没说清，回去补背景。' },
        { q: '每次都要重说背景吗', a: '不一定。同一个对话通常会沿用前文；新对话是否记得过去，取决于产品有没有记忆、项目资料以及相关设置。重要任务开始前，最好让它复述关键背景，缺的再补。', tip: '给自己留一张「项目背景卡」。即使工具有记忆，也可以用它快速核对背景有没有记错。' },
        { q: '能不能上传文件', a: '多数助手可以，但先确认两件事。一是这个工具在公司是否被批准使用，二是文件里有没有不能外传的内容。具体口径以公司 IT 与合规政策为准，使用前请先确认。' },
        { q: '用中文问还是英文问', a: '你更顺手的那个就行，现在主流模型的中文都不弱。要产出英文材料就直接用英文提要求，别中文写完再让它翻译，绕一道容易走味。', tip: '可以中文说要求、指定输出英文，这样最省事。' },
        { q: '什么时候该换人做', a: '三种情况直接自己上：需要你签字负责的、要靠内部人际判断的、你自己都说不清要什么的。还有一种是改了五六轮还不如自己写，那就自己写。AI 是加速器，不是替你拿主意的人。' },
        { q: '为什么同样的问题，每次答案都不一样', a: '因为生成有随机性：它不是查数据库返回固定答案，而是每次按概率从多个都合理的说法里挑一个，所以措辞、详略甚至结论都可能不同。想要稳定，就把背景和输出要求固定下来（比如指定格式、要求严格依据材料），或者让它分两步走：先给思路，你确认了再成文。涉及事实的判断别靠"多问几次对比"，直接回原文核对。', tip: '同一个对话里它会沿用之前的话，换个新对话语气和答案都可能变样，这正常，不是它"忘了你"。' },
        { q: '同一句话问不同的 AI，答案打架，信谁', a: '不要靠“多数模型都这么说”来判断。不同产品使用的资料、工具和生成方式可能不同。事实问题优先查看能否提供可打开的原始来源；观点问题可以把不同回答当作参考，再结合实际判断。', tip: '出现分歧可能是问题没有定论、资料不同或背景不足。补充背景有时会减少分歧，但不会保证答案一致。' },
      ],
    },
    {
      id: 'concepts',
      label: '概念扫盲',
      intro: '常听到的词，用人话讲一遍',
      items: [
        { q: 'Token 是什么', a: '模型处理文字的最小单位，可以理解成字词的碎片。它把你的话切成 Token，再根据上下文一步步预测下一个最可能的 Token。长度限制和计费算的都是 Token 数，不是字数。' },
        { q: '上下文和上下文窗口', a: '上下文是模型本次回答时可以参考的信息；上下文窗口是一次能处理的信息容量。对话太长时，产品可能截断、压缩或重新检索旧内容，模型也可能忽略条件，所以不一定简单地“最早内容先被挤掉”。', tip: '发现答非所问时，先让它复述关键要求；仍然混乱，再整理已确认内容并开启新对话。' },
        { q: '幻觉到底是什么', a: '它一本正经地编出不存在的内容，数字、引文、人名、出处都可能是假的。原因是它的目标是生成像答案的文本，不是逐条查证。输出流畅不代表已经查证，这一点在「看清边界」那章有展开。' },
        { q: '大模型是什么', a: '一个从海量文本里学到语言和知识模式的程序。它不是去数据库里查，而是根据上下文一步步预测下一个最可能的 Token。所以它擅长组织和表达，不天然擅长精确事实。' },
        { q: 'Agent 和聊天差在哪', a: 'Agent = 模型 + 目标 + 工具 + 执行与检查循环。聊天是你问一句它答一句，Agent 是你给一个目标，它自己分步骤、调工具、检查结果。省事的代价是你要更早把验收标准说清楚。' },
        { q: 'RAG 是什么', a: '让模型先去指定资料里检索，再根据查到的内容作答，相当于开卷考试。好处是能明显减少瞎编，还能给出处。前提是资料本身对、且是新的，垃圾进照样垃圾出。' },
        { q: '多模态是什么', a: '指它不只能读文字，还能看图、听音频、读表格和截图。实际用处是你可以直接把 PPT 截图、白板照片丢给它，让它整理成文字。但识别不等于理解，图里的关键数字仍要自己核一遍。' },
        { q: 'Prompt 就是提示词吗', a: '是，就是你发过去的那段话。别把它想成咒语，本质是一次任务交代，跟你给同事派活是一回事。目标、背景、任务、输出要求这四样说全，效果就出来了。' },
        { q: '跟它聊天算训练它吗', a: '一般不算。训练是厂商提前用海量数据把模型做出来，你日常的每次对话只是在使用这个已经做好的模型。但输入内容是否被留存，取决于产品设置和合同条款，以公司 IT 与合规政策为准。' },
        { q: 'AI 能生成图片和 PPT 吗，为什么图里的文字总是乱码', a: '能。现在的模型大多能画图、能做演示稿初稿。但"画图"本质是在拼像素，它没有真正学过排版和拼写，所以图里的大段文字经常笔画错乱、单词拼错——这是当前技术的通病，不是你操作有问题。要图文都准的成品，正确姿势是分工：配图让 AI 生成，文字内容单独让 AI 写好，再人工放进 PPT 或设计模板里。', tip: '需要图里出现准确文字（比如海报口号）时，先让 AI 只出画面，文字留空或用绘图工具后期加，成功率更高。' },
      ],
    },
    {
      id: 'myths',
      label: '祛魅打假',
      intro: '传得最广的八个误会',
      items: [
        { q: 'AI 会取代我的工作吗', a: '短期更可能被取代的是任务，不是岗位。它能接走整理、改写、初稿这类环节，需要担责、协调、拍板的部分还在你手上。真正的差距会先出现在会用的人和不会用的人之间。', tip: '把你一周的活列出来，标出重复环节，先从那几件下手。' },
        { q: '它是真的懂我意思吗', a: '模型处理信息的方式和人不同，我们不能因为回答像人就断定它拥有人的理解方式。它会根据上下文生成回答，有时也会主动追问；要求模糊时，仍可能猜错你的意思。' },
        { q: '它说得自信就是对的吗', a: '不是。语气只是表达方式，不能当作准确度信号。AI 有时会表达不确定，但也可能把错误说得很肯定。数字、日期、引用和人名要回原始材料核对。' },
        { q: 'AGI 是不是快来了', a: '没有可靠答案，业内分歧很大，谁给你一个确切时间表都要打问号。对日常工作更实际的判断是：能力在变强，但需要人负责的那部分不会自动消失。与其押时间点，不如把手上的活先跑顺。' },
        { q: '它在偷偷学我的数据吗', a: '不同产品差别很大，企业版和个人版的条款通常不一样，不能一概而论。稳妥做法是默认「贴进去的东西可能会被别人看到」，据此决定贴什么。具体口径以公司 IT 与合规政策为准。' },
        { q: '越贵的模型越好吗', a: '不一定，要看活的类型。更强的推理适合复杂分析和多步骤任务；更快更浅的模型做整理、改写、翻译完全够用，还不用等。常见的浪费是用重武器去打调格式这种小活。', tip: '先用轻的试一次，不满意再换重的，比反过来省时间。' },
        { q: '它能预测未来帮我决策吗', a: '它不能可靠地预知未来。它可以基于你提供的数据和假设做分析，帮你列选项、找反面论据和推演情景；结果受资料、方法和假设限制，结论与责任仍然是你的。' },
        { q: '提示词咒语有用吗', a: '有用的部分不是咒语，是它逼着你把要求说清楚了。「你是资深顾问」这类开场作用有限，真正起效的是背景、约束和输出格式。与其背模板，不如练四要素：目标、背景、任务、输出要求。' },
      ],
    },
    {
      id: 'cost_safety',
      label: '花钱与安全',
      intro: '花多少钱，哪些信息要特别谨慎',
      items: [
        { q: '免费版够用吗', a: '日常整理、改写、答疑这类活，免费版通常够。会卡住的是长材料、复杂多步任务和使用次数限制。公司具体可用哪些工具、免费还是付费，以公司 IT 与合规政策为准，使用前请先确认。' },
        { q: '付费版贵在哪', a: '一般买三样：更强的推理、更大的上下文容量、更稳定的响应和额度。对普通用户最能感知的，往往是不用排队和能处理更长的材料。值不值，看你每周真正卡在这三点上的次数。' },
        { q: '为什么有时候特别慢', a: '常见三个原因：使用高峰排队、你的材料太长要处理的 Token 多、模型在做多步推理。不急就等一等，急的话把材料截短、任务拆小，通常立刻变快。', tip: '一次只问一件事，比一口气问五件跑得快，答得也更准。' },
        { q: '公司数据能贴进去吗', a: '取决于数据分级和你用的是哪个工具，不能一概而论。通用原则是：公开信息随便用，内部信息只在公司批准的工具里用，敏感信息不要贴。具体口径以公司 IT 与合规政策为准，使用前请先确认。' },
        { q: '哪些内容不要随便输入 AI 工具', a: '个人信息、健康信息、密码密钥、连接串以及未公开业务数据都需要特别谨慎。能否使用取决于数据分级、工具是否获批和公司政策；不要自行判断“应该没事”，不确定时先问 IT 或合规。' },
        { q: '生成的内容能直接发吗', a: '不能。把它当成同事交上来的初稿：事实要核、口径要对、语气要合场合，对外材料尤其如此。涉及法律、财务和人事影响的内容，发出去前必须有人复核并签字。' },
        { q: '把屏幕截图直接丢给它，和贴文字一样安全吗', a: '更要想一想。截图往往带着你没注意到的额外信息：收件人列表、文件路径、旁边开着的其他文档、模糊可见的人名和账号。它读图能力越强，越等于你把整块屏幕都交代了出去。贴之前默认一条原则：截图里出现的每一个字，都按"能不能贴成文字"的标准来判断。', tip: '敏感内容真要处理，先裁剪只留需要的区域，比整屏截图安全得多。' },
      ],
    },
  ];

  var aliases = Object.assign(Object.create(null), {
    // 2026-08-30：原第 2 章「哪些能信」和第 4 章「怎么验」合并。
    // 判断什么不能信和怎么核，本来就是一件事的两面，拆开会让读者
    // 看完前一章不知道下一步该做什么。旧链接指到合并后的章节。
    'ai-verification': 'ai-boundaries',
    'ai-what': 'ai-basics',
    'ai-history': 'ai-basics',
    'prompt-basics': 'ai-prompting',
    'ai-other': 'ai-basics',
  });

  var chapterById = Object.create(null);
  for (var chapterIndex = 0; chapterIndex < chapters.length; chapterIndex += 1) {
    chapterById[chapters[chapterIndex].id] = chapters[chapterIndex];
  }

  // 把一章拆成显式小节，用于本次会话阅读记录与「上次读到哪」。
  // 顺序必须和 renderChapter 里 DOM 的实际顺序一致。
  var sectionListCache = Object.create(null);

  function chapterSections(chapter) {
    if (!chapter) return [];
    var cached = safeOwnGet(sectionListCache, chapter.id);
    if (cached) return cached;
    var list = [];
    for (var index = 0; index < chapter.sections.length; index += 1) {
      list.push({ key: 'c' + index, title: chapter.sections[index].title });
    }
    // 案例/练习/自测都是可选块，只有真存在时才进目录，
    // 否则侧栏会列出页面上根本没有的小节。
    if (chapter.caseStudy) list.push({ key: 'case', title: '工作案例' });
    if (chapter.exercise) list.push({ key: 'ex', title: '动手练一练' });
    if (chapter.quickCheck) list.push({ key: 'qc', title: '快速想一想' });
    list.push({ key: 'ta', title: '带走要点' });
    sectionListCache[chapter.id] = list;
    return list;
  }

  function sectionKeySet(chapter) {
    var set = Object.create(null);
    var list = chapterSections(chapter);
    for (var index = 0; index < list.length; index += 1) set[list[index].key] = true;
    return set;
  }

  function sectionTitle(chapterId, key) {
    var list = chapterSections(safeOwnGet(chapterById, chapterId));
    for (var index = 0; index < list.length; index += 1) {
      if (list[index].key === key) return list[index].title;
    }
    return '';
  }

  var memoryState = null;

  function emptyState() {
    return Object.create(null);
  }

  function isPlainObject(value) {
    if (!value || Object.prototype.toString.call(value) !== '[object Object]') return false;
    var prototype = Object.getPrototypeOf(value);
    return prototype === Object.prototype || prototype === null;
  }

  // 学习状态形状（v2）：
  //   s    章节状态       { [chapterId]: 'in-progress' | 'seen' }
  //   p    小节阅读进度   { [chapterId]: { r: [sectionKey], last: sectionKey } }
  //   last 上次停留的章节 chapterId
  // 写入 localStorage：进度保存在本机浏览器，关闭标签页、重启电脑后回来
  // 仍能「接着读 / 上次读到哪」；纯本地存储，不上传、不建账号和学习档案。
  function sanitizeState(value) {
    var clean = emptyState();
    clean.s = Object.create(null);
    clean.p = Object.create(null);
    clean.last = null;
    if (!isPlainObject(value)) return clean;
    // v1 是扁平的 { [chapterId]: status }，读到旧数据时平滑升级。
    var legacy = !isPlainObject(value.s);
    var statusSource = legacy ? value : value.s;
    var progressSource = isPlainObject(value.p) ? value.p : null;
    for (var index = 0; index < chapters.length; index += 1) {
      var id = chapters[index].id;
      var status = safeOwnGet(statusSource, id);
      if (status === STATUS_STARTED || status === STATUS_SEEN) clean.s[id] = status;
      var progress = progressSource ? safeOwnGet(progressSource, id) : null;
      if (!isPlainObject(progress)) continue;
      var keys = sectionKeySet(chapters[index]);
      var read = [];
      if (Array.isArray(progress.r)) {
        for (var readIndex = 0; readIndex < progress.r.length; readIndex += 1) {
          var key = progress.r[readIndex];
          if (typeof key === 'string' && keys[key] === true && read.indexOf(key) < 0) read.push(key);
        }
      }
      var lastKey = typeof progress.last === 'string' && keys[progress.last] === true ? progress.last : null;
      if (read.length || lastKey) clean.p[id] = { r: read, last: lastKey };
    }
    if (isKnownChapter(value.last)) clean.last = value.last;
    return clean;
  }

  function readState() {
    if (memoryState !== null) return memoryState;
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      memoryState = sanitizeState(raw ? JSON.parse(raw) : {});
    } catch (error) {
      memoryState = sanitizeState(null);
    }
    return memoryState;
  }

  function writeState(state) {
    memoryState = sanitizeState(state);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(memoryState));
      return true;
    } catch (error) {
      return false;
    }
  }

  function isKnownChapter(id) {
    return typeof id === 'string' && Object.prototype.hasOwnProperty.call(chapterById, id);
  }

  function safeOwnGet(object, key) {
    if (!object || (typeof object !== 'object' && typeof object !== 'function') || typeof key !== 'string') return undefined;
    try {
      return Object.prototype.hasOwnProperty.call(object, key) ? object[key] : undefined;
    } catch (error) {
      return undefined;
    }
  }

  function getStatus(id) {
    if (!isKnownChapter(id)) return STATUS_UNSEEN;
    return safeOwnGet(readState().s, id) || STATUS_UNSEEN;
  }

  function markStarted(id) {
    if (!isKnownChapter(id)) return STATUS_UNSEEN;
    var state = readState();
    if (state.s[id] !== STATUS_SEEN && state.s[id] !== STATUS_STARTED) {
      state.s[id] = STATUS_STARTED;
      writeState(state);
    }
    return getStatus(id);
  }

  function markSeen(id) {
    if (!isKnownChapter(id)) return STATUS_UNSEEN;
    var state = readState();
    if (state.s[id] !== STATUS_SEEN) {
      state.s[id] = STATUS_SEEN;
      writeState(state);
    }
    return getStatus(id);
  }

  // 记录「读到了哪个小节」。第一次读到正文第二节（或任意非首节）时，
  // 才把整章置为「学习中」——避免一打开页面就全部亮起状态。
  function markSectionRead(id, key) {
    if (!isKnownChapter(id)) return;
    var chapter = safeOwnGet(chapterById, id);
    if (sectionKeySet(chapter)[key] !== true) return;
    if (window.AILearningEntry) window.AILearningEntry.record('practice', id);
    var state = readState();
    var entry = safeOwnGet(state.p, id);
    if (!isPlainObject(entry)) {
      entry = { r: [], last: null };
      state.p[id] = entry;
    }
    var changed = false;
    if (entry.r.indexOf(key) < 0) {
      entry.r.push(key);
      changed = true;
    }
    if (entry.last !== key) {
      entry.last = key;
      changed = true;
    }
    if (state.last !== id) {
      state.last = id;
      changed = true;
    }
    if (entry.r.length >= 2 && state.s[id] !== STATUS_SEEN && state.s[id] !== STATUS_STARTED) {
      state.s[id] = STATUS_STARTED;
      changed = true;
    }
    if (changed) writeState(state);
  }

  function readSectionCount(id) {
    var entry = safeOwnGet(readState().p, id);
    return isPlainObject(entry) && Array.isArray(entry.r) ? entry.r.length : 0;
  }

  function totalSectionCount(id) {
    return chapterSections(safeOwnGet(chapterById, id)).length;
  }

  function lastSectionKey(id) {
    var entry = safeOwnGet(readState().p, id);
    return isPlainObject(entry) && typeof entry.last === 'string' ? entry.last : null;
  }

  function lastChapterId() {
    var last = readState().last;
    return isKnownChapter(last) ? last : null;
  }

  // 本次浏览是否已经动过任何一章。决定 learn.html 走「首次视图」还是「回访视图」。
  function touchedCount() {
    var count = 0;
    for (var index = 0; index < chapters.length; index += 1) {
      if (getStatus(chapters[index].id) !== STATUS_UNSEEN || readSectionCount(chapters[index].id) > 0) count += 1;
    }
    return count;
  }

  function hasSessionHistory() {
    return touchedCount() > 0;
  }

  // 回访时「继续」优先回到上次停留的那一章；否则给第一个没看完的章节。
  function resumeChapterId() {
    var last = lastChapterId();
    if (last && getStatus(last) !== STATUS_SEEN) return last;
    return nextIncomplete();
  }

  function nextIncomplete() {
    for (var index = 0; index < chapters.length; index += 1) {
      if (getStatus(chapters[index].id) !== STATUS_SEEN) return chapters[index].id;
    }
    return null;
  }

  // 目录与进度页统一使用 未开始 / 学习中 / 已完成。
  // 打开页面不等于开始学习，状态只在读到实际内容后变化。
  function statusCopy(status) {
    if (status === STATUS_SEEN) return '已完成';
    if (status === STATUS_STARTED) return '学习中';
    return '未开始';
  }

  function seenCount() {
    var count = 0;
    for (var index = 0; index < chapters.length; index += 1) {
      if (getStatus(chapters[index].id) === STATUS_SEEN) count += 1;
    }
    return count;
  }

  function actionCopy(status) {
    if (status === STATUS_SEEN) return '复习';
    if (status === STATUS_STARTED) return '继续学习';
    return '开始学习';
  }

  function cardChapterId(card) {
    var explicit = typeof card.getAttribute === 'function' ? card.getAttribute('data-chapter-id') : null;
    if (isKnownChapter(explicit)) return explicit;
    var href = typeof card.getAttribute === 'function' ? card.getAttribute('href') || '' : '';
    var match = /[?&]id=([^&#]+)/.exec(href);
    if (!match) return null;
    try {
      var candidate = decodeURIComponent(match[1]);
      return isKnownChapter(candidate) ? candidate : null;
    } catch (error) {
      return null;
    }
  }

  function returnScrollBehavior() {
    try {
      if (typeof window !== 'undefined' && typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'auto';
    } catch (error) {
      return 'smooth';
    }
    return 'smooth';
  }

  function updateSessionSummary(scope) {
    if (!scope || typeof scope.querySelector !== 'function') return;
    var currentSeenCount = seenCount();
    var countNode = scope.querySelector('[data-learning-seen-count]');
    if (countNode) {
      countNode.textContent = String(currentSeenCount);
      return;
    }
    var summaryNode = scope.querySelector('[data-learning-summary]');
    if (summaryNode) summaryNode.textContent = '已看 ' + currentSeenCount + ' / ' + chapters.length;
  }

  function copyToolTemplate(button) {
    var card = null;
    if (button && typeof button.closest === 'function') {
      card = button.closest('.learning-tool-card') || button.closest('.lesson-takeaway');
    }
    if (!card || typeof card.querySelector !== 'function') return;
    var source = card.querySelector('[data-template-content]');
    var feedback = card.querySelector('[data-copy-feedback]');
    if (!source || !feedback) return;
    if (button.disabled) return;

    var templateText = source.textContent || '';
    var copyToken = (button.__learningCopyToken || 0) + 1;
    var settled = false;
    button.__learningCopyToken = copyToken;
    button.disabled = true;
    if (typeof button.setAttribute === 'function') button.setAttribute('aria-busy', 'true');
    feedback.textContent = '';

    function showCopyFallback(card, value) {
      var fallback = card.querySelector('[data-copy-fallback]');
      if (!fallback) {
        var ownerDocument = card.ownerDocument || (typeof document !== 'undefined' ? document : null);
        if (!ownerDocument || typeof ownerDocument.createElement !== 'function' || typeof card.appendChild !== 'function') return;
        fallback = ownerDocument.createElement('textarea');
        fallback.className = 'tool-copy-fallback';
        fallback.readOnly = true;
        fallback.setAttribute('readonly', '');
        fallback.setAttribute('data-copy-fallback', '');
        fallback.setAttribute('aria-label', '手动复制模板');
        card.appendChild(fallback);
      }
      fallback.value = value;
      fallback.hidden = false;
      try {
        if (typeof fallback.focus === 'function') fallback.focus();
        if (typeof fallback.select === 'function') fallback.select();
        else if (typeof fallback.setSelectionRange === 'function') fallback.setSelectionRange(0, value.length);
      } catch (error) {
        try {
          if (typeof fallback.setSelectionRange === 'function') fallback.setSelectionRange(0, value.length);
        } catch (selectionError) {}
      }
    }

    function hideCopyFallback() {
      var fallback = card.querySelector('[data-copy-fallback]');
      if (fallback) fallback.hidden = true;
    }

    function announce(message) {
      if (typeof setTimeout === 'function') {
        setTimeout(function () {
          if (button.__learningCopyToken === copyToken) feedback.textContent = message;
        }, 0);
      } else if (button.__learningCopyToken === copyToken) {
        feedback.textContent = message;
      }
    }

    function finishCopy(succeeded) {
      if (settled || button.__learningCopyToken !== copyToken) return;
      settled = true;
      if (succeeded) hideCopyFallback();
      else showCopyFallback(card, templateText);
      announce(succeeded ? '已复制' : '请手动复制');
      button.disabled = false;
      if (typeof button.removeAttribute === 'function') button.removeAttribute('aria-busy');
      else if (typeof button.setAttribute === 'function') button.setAttribute('aria-busy', 'false');
    }

    try {
      if (typeof navigator === 'undefined' || !navigator.clipboard || typeof navigator.clipboard.writeText !== 'function') {
        finishCopy(false);
        return;
      }
      var result = navigator.clipboard.writeText(templateText);
      if (result && typeof result.then === 'function') {
        result.then(function () { finishCopy(true); }, function () { finishCopy(false); });
      } else {
        finishCopy(true);
      }
    } catch (error) {
      finishCopy(false);
    }
  }

  function bindCopyTools(scope) {
    if (!scope || typeof scope.querySelectorAll !== 'function') return;
    var buttons = scope.querySelectorAll('[data-copy-template]');
    for (var index = 0; index < buttons.length; index += 1) {
      (function (button) {
        if (!button || typeof button.addEventListener !== 'function' ||
          (typeof button.getAttribute === 'function' && button.getAttribute('data-copy-bound') === 'true')) return;
        if (typeof button.setAttribute === 'function') button.setAttribute('data-copy-bound', 'true');
        button.addEventListener('click', function () { copyToolTemplate(button); });
      }(buttons[index]));
    }
  }

  function setHidden(node, hidden) {
    if (!node) return;
    node.hidden = !!hidden;
  }

  // 目录页有两套视图：
  //   首次视图  —— 本次浏览还没动过任何一章：不摆 0/6 空进度，直接给一个起点。
  //   回访视图  —— 至少动过一章：给「接着读第 N 章」、总进度和上次停留位置。
  function renderHubHeader(scope, repeat) {
    if (!scope || typeof scope.querySelector !== 'function') return;
    var summary = scope.querySelector('[data-learning-summary]');
    var firstHint = scope.querySelector('[data-learning-first-hint]');
    var resumeNote = scope.querySelector('[data-learning-resume-note]');
    setHidden(summary, !repeat);
    setHidden(firstHint, repeat);

    var continueLink = scope.querySelector('[data-learning-continue]');
    var resumeId = repeat ? resumeChapterId() : chapters[0].id;
    if (continueLink && typeof continueLink.setAttribute === 'function') {
      if (resumeId) {
        continueLink.setAttribute('href', 'detail.html?type=learn&id=' + encodeURIComponent(resumeId));
        var resumeChapter = safeOwnGet(chapterById, resumeId);
        continueLink.textContent = repeat
          ? '接着读 · 第 ' + Number(resumeChapter.number) + ' 章 ' + resumeChapter.title
          : '从第 1 章开始';
      } else {
        continueLink.setAttribute('href', 'detail.html?type=learn&id=' + encodeURIComponent(chapters[0].id));
        continueLink.textContent = '四章都看完了，再看一遍';
      }
    }

    if (!resumeNote) return;  // 这行提示已从页面移除，保留分支以兼容旧结构
    var lastId = lastChapterId();
    var lastKey = lastId ? lastSectionKey(lastId) : null;
    if (repeat && lastId && lastKey) {
      var lastChapter = safeOwnGet(chapterById, lastId);
      resumeNote.textContent = '上次读到「' + lastChapter.title + ' · ' + sectionTitle(lastId, lastKey) + '」。';
      setHidden(resumeNote, false);
    } else {
      setHidden(resumeNote, true);
    }
  }

  // 路线选择区的概念卡片：状态徽章 + 进度文字（上次读到 X%） + CTA 文案
  // 三者同步：未开始 → 静态 / 学习中 → 显示进度百分比 + 小节名 / 已完成 → 100%。
  // 进度来源：detail.html 写入的 aib-concept-progress-v1（{percent, section, title}）。
  function initRouteCards(scope) {
    if (!scope || typeof scope.querySelectorAll !== 'function') return;
    var cards = scope.querySelectorAll('.concept-card');
    if (!cards.length) return;

    // 拉取两个 storage
    var readMap = {};
    var progressState = { chapters: {} };
    try { readMap = JSON.parse(localStorage.getItem('aib-concept-read') || '{}') || {}; } catch(readError) {}
    try { progressState = JSON.parse(localStorage.getItem('aib-concept-progress-v1') || '{}') || { chapters: {} }; } catch(progressError) {}

    function cardId(card) {
      var byAttr = cardChapterId(card);
      if (byAttr) return byAttr;
      var rawHref = typeof card.getAttribute === 'function' ? card.getAttribute('href') || '' : '';
      var rawMatch = /[?&]id=([^&#]+)/.exec(rawHref);
      if (!rawMatch) return '';
      try { return decodeURIComponent(rawMatch[1]); } catch(idError) { return rawMatch[1]; }
    }

    for (var index = 0; index < cards.length; index += 1) {
      var card = cards[index];
      var id = cardId(card);
      var entry = id && progressState && progressState.chapters ? safeOwnGet(progressState.chapters, id) : null;
      var percent = entry && typeof entry.percent === 'number' ? entry.percent : 0;
      var sectionTitle = entry && typeof entry.title === 'string' ? entry.title : '';
      var seen = !!(id && readMap[id]);

      // 状态文字 + 颜色
      var status = seen ? 'seen' : (percent >= 2 ? 'started' : '');
      var statusText = seen ? '已完成' : (percent >= 2 ? '学习中' : '未开始');
      var statusNode = typeof card.querySelector === 'function' ? card.querySelector('.concept-card-status') : null;
      if (statusNode) statusNode.textContent = statusText;

      // 底部进度：按优先级展示
      // 1) 已完成（100% / readMap=true）→ 「已完成 · 选读 · 约 X 分钟」
      // 2) 进度 ≥ 2% → 「上次读到 X% · 章节名」或仅百分比
      // 3) 未开始 → 保持 HTML 默认说明
      var progressNode = typeof card.querySelector === 'function' ? card.querySelector('.concept-card-progress') : null;
      if (progressNode) {
        var fallbackText = progressNode.getAttribute('data-default-text') || progressNode.textContent || '';
        if (seen) {
          // 已完成：替换为完成状态
          progressNode.textContent = '已完成 · ' + fallbackText;
          progressNode.setAttribute('data-progress-state', 'seen');
        } else if (percent >= 2) {
          // 学习中：百分比 + 章节名（如果有）
          var shown = '上次读到 ' + percent + '%';
          if (sectionTitle) shown += ' · ' + sectionTitle;
          progressNode.textContent = shown;
          progressNode.setAttribute('data-progress-state', 'started');
        } else {
          // 未开始：恢复默认
          progressNode.textContent = fallbackText;
          progressNode.setAttribute('data-progress-state', '');
        }
      }

      // CTA 文字
      var actionNode = typeof card.querySelector === 'function' ? card.querySelector('.concept-card-action') : null;
      var actionText = seen ? '复习 →' : (percent >= 2 ? '继续学习 →' : '开始学习 →');
      if (actionNode) actionNode.textContent = actionText;

      // href：上次未完成的章节带上 #resume 锚点，回到当时位置
      if (typeof card.setAttribute === 'function') {
        card.setAttribute('data-status', status);
        if (id && percent >= 2 && percent < 100 && !seen) {
          card.setAttribute('href', 'detail.html?type=learn&id=' + encodeURIComponent(id) + '#resume');
        }
      }
    }
  }

  function initHub(root) {
    var scope = root || (typeof document !== 'undefined' ? document : null);
    if (!scope || typeof scope.querySelectorAll !== 'function') return false;
    var repeat = hasSessionHistory();
    var cards = scope.querySelectorAll('.learning-card');
    for (var index = 0; index < cards.length; index += 1) {
      var card = cards[index];
      var id = cardChapterId(card);
      if (!id) continue;
      var status = getStatus(id);
      if (typeof card.setAttribute === 'function') card.setAttribute('data-status', status);
      var statusNode = typeof card.querySelector === 'function' ? card.querySelector('.learning-status') : null;
      if (statusNode) statusNode.textContent = statusCopy(status);
      var actionNode = typeof card.querySelector === 'function' ? card.querySelector('.learning-card-action') : null;
      if (actionNode) actionNode.textContent = actionCopy(status);

      var progressNode = typeof card.querySelector === 'function' ? card.querySelector('[data-card-progress]') : null;
      if (progressNode) {
        var read = readSectionCount(id);
        var total = totalSectionCount(id);
        progressNode.textContent = read > 0 ? read + ' / ' + total + ' 节' : total + ' 节';
        progressNode.setAttribute('data-read', String(read));
        progressNode.setAttribute('data-total', String(total));
        progressNode.style.setProperty('--card-progress', total > 0 ? (read / total) : 0);
      }

      // 回访时直接告诉用户「上次读到哪」，不用点进去才想起自己读到哪。
      var lastreadNode = typeof card.querySelector === 'function' ? card.querySelector('[data-card-lastread]') : null;
      if (!lastreadNode && typeof card.insertBefore === 'function' && typeof card.createElement !== 'function') {
        var footNode = card.querySelector('.learning-card-foot');
        var ownerDoc = card.ownerDocument || (typeof document !== 'undefined' ? document : null);
        if (footNode && ownerDoc && typeof ownerDoc.createElement === 'function') {
          lastreadNode = ownerDoc.createElement('span');
          lastreadNode.className = 'learning-card-lastread';
          lastreadNode.setAttribute('data-card-lastread', '');
          lastreadNode.hidden = true;
          card.insertBefore(lastreadNode, footNode);
        }
      }
      if (lastreadNode) {
        var cardLastKey = lastSectionKey(id);
        if (status !== STATUS_SEEN && readSectionCount(id) > 0 && cardLastKey) {
          lastreadNode.textContent = '上次读到「' + sectionTitle(id, cardLastKey) + '」';
          lastreadNode.hidden = false;
        } else {
          lastreadNode.hidden = true;
        }
      }

      // 首次视图给第一章一个明确起点，避免六张同权重的卡片让人不知从哪开始。
      if (card.classList) {
        if (!repeat && index === 0) card.classList.add('learning-card-suggested');
        else card.classList.remove('learning-card-suggested');
      }
      var suggestNode = typeof card.querySelector === 'function' ? card.querySelector('[data-card-suggest]') : null;
      setHidden(suggestNode, repeat || index !== 0);
    }

    initRouteCards(scope);
    renderHubHeader(scope, repeat);
    updateSessionSummary(scope);
    if (window.AILearningEntry) window.AILearningEntry.render(scope);
    bindCopyTools(scope);

    var hash = typeof window !== 'undefined' && window.location ? window.location.hash : '';
    var returnedId = hash.indexOf('#chapter-') === 0 ? hash.slice(9) : '';
    if (isKnownChapter(returnedId)) {
      for (var cardIndex = 0; cardIndex < cards.length; cardIndex += 1) {
        if (cardChapterId(cards[cardIndex]) !== returnedId) continue;
        var returnedCard = cards[cardIndex];
        if (returnedCard.classList) returnedCard.classList.add('chapter-return-highlight');
        if (typeof returnedCard.scrollIntoView === 'function') {
          returnedCard.scrollIntoView({ block: 'center', behavior: returnScrollBehavior() });
        }
        if (typeof returnedCard.focus === 'function') returnedCard.focus({ preventScroll: true });
        if (typeof setTimeout === 'function') {
          setTimeout(function () {
            if (returnedCard.classList) returnedCard.classList.remove('chapter-return-highlight');
          }, 1800);
        }
        break;
      }
    }
    return true;
  }

  // 「小白三千问」：分组标签 + 折叠问答。纯本地内容，无状态、无计分。
  function initFaq(root) {
    var scope = root || (typeof document !== 'undefined' ? document : null);
    if (!scope || typeof scope.querySelector !== 'function') return false;
    var mount = scope.querySelector('[data-faq-mount]');
    if (!mount) return false;
    var ownerDocument = mount.ownerDocument || (typeof document !== 'undefined' ? document : null);
    if (!ownerDocument || typeof ownerDocument.createElement !== 'function') return false;
    clearNode(mount);

    var tabs = element(ownerDocument, 'div', 'faq-tabs');
    tabs.setAttribute('role', 'tablist');
    tabs.setAttribute('aria-label', '小白三千问分组');
    var panels = element(ownerDocument, 'div', 'faq-panels');
    var buttons = [];
    var panelNodes = [];

    function activate(activeIndex) {
      for (var index = 0; index < buttons.length; index += 1) {
        var active = index === activeIndex;
        buttons[index].setAttribute('aria-selected', active ? 'true' : 'false');
        buttons[index].setAttribute('tabindex', active ? '0' : '-1');
        panelNodes[index].hidden = !active;
      }
    }

    for (var groupIndex = 0; groupIndex < faqGroups.length; groupIndex += 1) {
      (function (group, currentIndex) {
        var panelId = 'faq-panel-' + group.id;
        var tabId = 'faq-tab-' + group.id;

        var button = element(ownerDocument, 'button', 'faq-tab');
        button.setAttribute('type', 'button');
        button.setAttribute('role', 'tab');
        button.setAttribute('id', tabId);
        button.setAttribute('aria-controls', panelId);
        button.appendChild(element(ownerDocument, 'span', 'faq-tab-label', group.label));
        button.appendChild(element(ownerDocument, 'span', 'faq-tab-count', String(group.items.length) + ' 问'));
        button.addEventListener('click', function () { activate(currentIndex); });
        button.addEventListener('keydown', function (event) {
          var step = event.key === 'ArrowRight' ? 1 : (event.key === 'ArrowLeft' ? -1 : 0);
          if (!step) return;
          event.preventDefault();
          var nextIndex = (currentIndex + step + buttons.length) % buttons.length;
          activate(nextIndex);
          buttons[nextIndex].focus();
        });
        tabs.appendChild(button);
        buttons.push(button);

        var panel = element(ownerDocument, 'div', 'faq-panel');
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('id', panelId);
        panel.setAttribute('aria-labelledby', tabId);
        panel.appendChild(element(ownerDocument, 'p', 'faq-panel-intro', group.intro));
        var list = element(ownerDocument, 'div', 'faq-list');
        for (var itemIndex = 0; itemIndex < group.items.length; itemIndex += 1) {
          var item = group.items[itemIndex];
          var details = element(ownerDocument, 'details', 'faq-item');
          var summary = element(ownerDocument, 'summary', 'faq-question');
          summary.appendChild(element(ownerDocument, 'span', 'faq-question-text', item.q));
          details.appendChild(summary);
          details.appendChild(element(ownerDocument, 'p', 'faq-answer', item.a));
          if (item.tip) {
            var tip = element(ownerDocument, 'p', 'faq-tip');
            tip.appendChild(element(ownerDocument, 'span', 'faq-tip-label', '实操'));
            tip.appendChild(ownerDocument.createTextNode(item.tip));
            details.appendChild(tip);
          }
          list.appendChild(details);
        }
        panel.appendChild(list);
        panels.appendChild(panel);
        panelNodes.push(panel);
      }(faqGroups[groupIndex], groupIndex));
    }

    mount.appendChild(tabs);
    mount.appendChild(panels);
    activate(0);
    return true;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function resolveTarget(target) {
    if (target && typeof target === 'object' && ('innerHTML' in target || typeof target.appendChild === 'function')) return target;
    if (typeof document === 'undefined') return null;
    if (typeof target === 'string' && typeof document.querySelector === 'function') return document.querySelector(target);
    if (typeof document.getElementById === 'function') return document.getElementById('learningExperience');
    return null;
  }

  function renderMovedNotice(target) {
    target.innerHTML = '<section class="lesson-moved" aria-labelledby="lessonMovedTitle">' +
      '<p class="lesson-kicker">AI 工具与资源</p>' +
      '<h1 id="lessonMovedTitle">该内容已移至 AI 工具与资源</h1>' +
      '<p>AI 公司、主流模型与外部学习资源现在统一收纳在资源页。</p>' +
      '<a class="lesson-primary-action" href="resources.html">前往 AI 工具与资源</a>' +
      '</section>';
  }

  function canonicalizeLearningUrl(originalId, resolvedId) {
    if (originalId === resolvedId || typeof history === 'undefined' || typeof location === 'undefined') return;
    try {
      var replaceState = history.replaceState;
      if (typeof replaceState !== 'function') return;
      var url = new URL(location.href);
      url.searchParams.set('type', 'learn');
      url.searchParams.set('id', resolvedId);
      replaceState.call(history, history.state || null, '', url.pathname + url.search + url.hash);
    } catch (error) {}
  }

  function clearNode(node) {
    if (typeof node.replaceChildren === 'function') node.replaceChildren();
    else if ('textContent' in node) node.textContent = '';
  }

  function element(ownerDocument, name, className, text) {
    var node = ownerDocument.createElement(name);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = String(text);
    return node;
  }

  function interactionFieldset(ownerDocument, legendText, className) {
    var fieldset = element(ownerDocument, 'fieldset', 'lesson-interaction' + (className ? ' ' + className : ''));
    fieldset.appendChild(element(ownerDocument, 'legend', '', legendText));
    return fieldset;
  }

  function interactionButton(ownerDocument, text, hook, value) {
    var button = element(ownerDocument, 'button', 'lesson-choice', text);
    button.setAttribute('type', 'button');
    button.setAttribute(hook, '');
    if (value !== undefined) button.setAttribute('data-choice-value', String(value));
    return button;
  }

  function setChoiceState(group, activeButton) {
    for (var index = 0; index < group.length; index += 1) {
      var selected = group[index] === activeButton;
      group[index].setAttribute('aria-pressed', selected ? 'true' : 'false');
      if (group[index].classList) group[index].classList.toggle('is-selected', selected);
    }
  }

  function dispatchExerciseAttempt(root, message) {
    if (!root) return;
    root.setAttribute('data-exercise-attempted', 'true');
    var feedback = typeof root.querySelector === 'function' ? root.querySelector('.lesson-feedback') : null;
    if (feedback) feedback.textContent = message;
    var ownerDocument = root.ownerDocument || (typeof document !== 'undefined' ? document : null);
    try {
      var view = ownerDocument && ownerDocument.defaultView;
      var event = view && typeof view.CustomEvent === 'function'
        ? new view.CustomEvent('learning-exercise-attempt', { bubbles: true, detail: { message: message } })
        : { type: 'learning-exercise-attempt', detail: { message: message } };
      if (event && typeof root.dispatchEvent === 'function') root.dispatchEvent(event);
    } catch (error) {}
  }

  function appendCapabilityScenes(ownerDocument, root, scenes) {
    var grid = element(ownerDocument, 'div', 'lesson-scene-grid');
    for (var sceneIndex = 0; sceneIndex < scenes.length; sceneIndex += 1) {
      (function (scene, currentSceneIndex) {
        var card = element(ownerDocument, 'article', 'lesson-scene-card');
        card.setAttribute('data-scene-card', String(currentSceneIndex));
        var sceneButton = element(ownerDocument, 'button', 'lesson-scene-toggle');
        sceneButton.setAttribute('type', 'button');
        sceneButton.setAttribute('data-scene-toggle', String(currentSceneIndex));
        sceneButton.setAttribute('data-seen', 'false');
        sceneButton.setAttribute('aria-expanded', 'false');
        var panelId = 'lesson-scene-panel-' + currentSceneIndex;
        sceneButton.setAttribute('aria-controls', panelId);
        var icon = element(ownerDocument, 'span', 'lesson-scene-icon');
        icon.setAttribute('data-scene-icon', scene.icon);
        icon.setAttribute('aria-hidden', 'true');
        sceneButton.appendChild(icon);
        sceneButton.appendChild(element(ownerDocument, 'span', 'lesson-scene-title', scene.title));
        var sceneChevron = svgEl(ownerDocument, 'svg', { viewBox: '0 0 24 24', 'aria-hidden': 'true', class: 'lesson-scene-cue' });
        sceneChevron.appendChild(svgEl(ownerDocument, 'path', { d: 'M6 9l6 6 6-6' }));
        sceneButton.appendChild(sceneChevron);
        var panel = element(ownerDocument, 'div', 'lesson-scene-panel');
        panel.setAttribute('id', panelId);
        panel.setAttribute('data-scene-panel', String(currentSceneIndex));
        panel.hidden = currentSceneIndex !== 0;
        if (currentSceneIndex === 0) sceneButton.setAttribute('aria-expanded', 'true');
        var details = element(ownerDocument, 'dl', 'lesson-scene-details');
        // 用第二人称问句代替「输入材料 / AI 协助 / 人要确认」这类抽象名词，
        // 新手不用先建立一套术语模型才看得懂这张卡。
        var labels = ['你给它什么', '它帮你做到哪一步', '你必须自己检查什么'];
        var values = [scene.input, scene.assist, scene.confirm];
        for (var detailIndex = 0; detailIndex < labels.length; detailIndex += 1) {
          details.appendChild(element(ownerDocument, 'dt', '', labels[detailIndex]));
          details.appendChild(element(ownerDocument, 'dd', '', values[detailIndex]));
        }
        panel.appendChild(details);
        var sceneExample = element(ownerDocument, 'p', 'lesson-scene-example');
        sceneExample.textContent = scene.example;
        panel.appendChild(sceneExample);
        sceneButton.addEventListener('click', function () {
          sceneButton.setAttribute('data-seen', 'true');
          var expanded = sceneButton.getAttribute('aria-expanded') !== 'true';
          sceneButton.setAttribute('aria-expanded', expanded ? 'true' : 'false');
          panel.hidden = !expanded;

        });
        card.appendChild(sceneButton);
        card.appendChild(panel);
        grid.appendChild(card);
      }(scenes[sceneIndex], sceneIndex));
    }
    root.appendChild(grid);
  }

  // ===================== 小节级演示组件 =====================
  // 全部用 HTML/SVG 手写，不引外部图片：可点、可动、改文案不用重新导图，
  // 且自动契合蓝白无渐变基线，移动端也不会糊。

  function svgEl(ownerDocument, name, attrs) {
    var node = ownerDocument.createElementNS('http://www.w3.org/2000/svg', name);
    for (var key in attrs) {
      if (Object.prototype.hasOwnProperty.call(attrs, key)) node.setAttribute(key, String(attrs[key]));
    }
    return node;
  }

  // 用 fieldset/legend 承载，屏幕阅读器能把整组控件当成一个有名字的整体；
  // 每个演示自带一个 polite 区域播报操作结果。
  function demoShell(ownerDocument, root, demo, extraClass) {
    // kind: 'hands-on'（默认，黄色，可点）或 'note'（青色，只读的小知识）
    var kind = demo.kind === 'note' ? 'note' : 'hands-on';
    var wrap = element(ownerDocument, 'fieldset', 'lesson-demo lesson-interaction ' + extraClass);
    wrap.setAttribute('data-demo-kind', kind);
    var legend = element(ownerDocument, 'legend', 'lesson-demo-title', demo.title || (kind === 'note' ? '小知识' : '动手试试'));
    wrap.appendChild(legend);
    if (demo.hint) wrap.appendChild(element(ownerDocument, 'p', 'lesson-demo-hint', demo.hint));
    var live = element(ownerDocument, 'p', 'lesson-demo-live sr-only');
    live.setAttribute('aria-live', 'polite');
    live.setAttribute('data-demo-live', '');
    wrap.appendChild(live);
    root.appendChild(wrap);
    return wrap;
  }

  function demoAnnounce(wrap, message) {
    var live = wrap.querySelector('[data-demo-live]');
    if (live && live.textContent !== message) live.textContent = message;
  }

  // 1) 同心圆：AI ⊃ 生成式 AI ⊃ 大模型，Agent 外接。点任意一层看说明。
  function renderConcentricDemo(ownerDocument, root, demo) {
    var wrap = demoShell(ownerDocument, root, demo, 'lesson-demo-concentric');
    var stage = element(ownerDocument, 'div', 'lesson-concentric-stage');

    var svg = svgEl(ownerDocument, 'svg', { viewBox: '0 0 360 300', role: 'img', 'aria-label': 'AI、生成式 AI、大模型的包含关系，以及外接的 Agent' });
    var rings = [
      { key: 'ai', r: 118, cx: 150, cy: 150, label: 'AI', ly: 52 },
      { key: 'genai', r: 84, cx: 150, cy: 168, label: '生成式 AI', ly: 108 },
      { key: 'llm', r: 46, cx: 150, cy: 190, label: '大模型', ly: 186 },
    ];
    var shapes = {};
    for (var i = 0; i < rings.length; i += 1) {
      var ring = rings[i];
      var circle = svgEl(ownerDocument, 'circle', { cx: ring.cx, cy: ring.cy, r: ring.r, 'data-ring': ring.key, class: 'lesson-ring' });
      svg.appendChild(circle);
      shapes[ring.key] = circle;
      var text = svgEl(ownerDocument, 'text', { x: ring.cx, y: ring.ly, 'data-ring-label': ring.key, class: 'lesson-ring-label' });
      text.textContent = ring.label;
      svg.appendChild(text);
    }
    // Agent 画在圈外，并用一条连线接到大模型——表示外接，不是包含
    var agentBox = svgEl(ownerDocument, 'rect', { x: 244, y: 214, width: 104, height: 44, rx: 10, 'data-ring': 'agent', class: 'lesson-ring lesson-ring-agent' });
    svg.appendChild(agentBox);
    shapes.agent = agentBox;
    var link = svgEl(ownerDocument, 'path', { d: 'M196 190 H244', class: 'lesson-ring-link' });
    svg.appendChild(link);
    var agentText = svgEl(ownerDocument, 'text', { x: 296, y: 241, 'data-ring-label': 'agent', class: 'lesson-ring-label' });
    agentText.textContent = 'Agent';
    svg.appendChild(agentText);
    stage.appendChild(svg);

    var panel = element(ownerDocument, 'div', 'lesson-concentric-panel');
    var panelTitle = element(ownerDocument, 'h4', 'lesson-concentric-title', '');
    var panelBody = element(ownerDocument, 'p', 'lesson-concentric-body', '');
    var panelExample = element(ownerDocument, 'p', 'lesson-concentric-example', '');
    panel.appendChild(panelTitle);
    panel.appendChild(panelBody);
    panel.appendChild(panelExample);
    stage.appendChild(panel);
    wrap.appendChild(stage);

    var buttons = element(ownerDocument, 'div', 'lesson-demo-buttons');
    var active = null;
    function select(key) {
      active = key;
      for (var ringKey in shapes) {
        if (Object.prototype.hasOwnProperty.call(shapes, ringKey)) {
          shapes[ringKey].setAttribute('data-active', ringKey === key ? 'true' : 'false');
        }
      }
      var labels = svg.querySelectorAll('[data-ring-label]');
      for (var li = 0; li < labels.length; li += 1) {
        labels[li].setAttribute('data-active', labels[li].getAttribute('data-ring-label') === key ? 'true' : 'false');
      }
      var chips = buttons.querySelectorAll('button');
      for (var ci = 0; ci < chips.length; ci += 1) {
        chips[ci].setAttribute('aria-pressed', chips[ci].getAttribute('data-ring-btn') === key ? 'true' : 'false');
      }
      var item = null;
      for (var ii = 0; ii < demo.layers.length; ii += 1) if (demo.layers[ii].key === key) item = demo.layers[ii];
      if (!item) return;
      demoAnnounce(wrap, '已选 ' + item.name + '：' + item.title);
      panelTitle.textContent = item.title;
      panelBody.textContent = item.body;
      panelExample.textContent = item.example || '';
      panelExample.hidden = !item.example;
    }

    for (var bi = 0; bi < demo.layers.length; bi += 1) {
      (function (layer) {
        var button = element(ownerDocument, 'button', 'lesson-demo-chip', layer.name);
        button.setAttribute('type', 'button');
        button.setAttribute('data-ring-btn', layer.key);
        button.addEventListener('click', function () { select(layer.key); });
        buttons.appendChild(button);
      }(demo.layers[bi]));
    }
    wrap.appendChild(buttons);

    for (var si = 0; si < demo.layers.length; si += 1) {
      (function (layer) {
        var target = shapes[layer.key];
        if (!target) return;
        target.setAttribute('tabindex', '0');
        target.setAttribute('role', 'button');
        target.addEventListener('click', function () { select(layer.key); });
        target.addEventListener('keydown', function (event) {
          if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); select(layer.key); }
        });
      }(demo.layers[si]));
    }
    select(demo.layers[0].key);
    return wrap;
  }

  // 2) 可点时间轴：五个节点，点一个讲清「这一步解决了什么、还差什么」
  function renderTimelineDemo(ownerDocument, root, demo) {
    var wrap = demoShell(ownerDocument, root, demo, 'lesson-demo-timeline');
    var track = element(ownerDocument, 'ol', 'lesson-timeline-track');
    var panel = element(ownerDocument, 'div', 'lesson-timeline-panel');
    var pYear = element(ownerDocument, 'p', 'lesson-timeline-era', '');
    var pTitle = element(ownerDocument, 'h4', 'lesson-timeline-title', '');
    var pSolved = element(ownerDocument, 'p', 'lesson-timeline-line', '');
    var pGap = element(ownerDocument, 'p', 'lesson-timeline-line', '');
    panel.appendChild(pYear);
    panel.appendChild(pTitle);
    panel.appendChild(pSolved);
    panel.appendChild(pGap);

    var nodeButtons = [];
    function select(index) {
      for (var i = 0; i < nodeButtons.length; i += 1) {
        nodeButtons[i].setAttribute('aria-pressed', i === index ? 'true' : 'false');
        nodeButtons[i].parentNode.setAttribute('data-state', i < index ? 'past' : (i === index ? 'current' : 'future'));
      }
      var node = demo.nodes[index];
      demoAnnounce(wrap, '已选 ' + node.name + '。');
      pYear.textContent = node.era;
      pTitle.textContent = node.name;
      clearNode(pSolved);
      pSolved.appendChild(element(ownerDocument, 'strong', '', '解决了：'));
      pSolved.appendChild(ownerDocument.createTextNode(node.solved));
      clearNode(pGap);
      pGap.appendChild(element(ownerDocument, 'strong', '', '还差什么：'));
      pGap.appendChild(ownerDocument.createTextNode(node.gap));
    }

    for (var i = 0; i < demo.nodes.length; i += 1) {
      (function (node, index) {
        var item = element(ownerDocument, 'li', 'lesson-timeline-node');
        var button = element(ownerDocument, 'button', 'lesson-timeline-button');
        button.setAttribute('type', 'button');
        button.appendChild(element(ownerDocument, 'span', 'lesson-timeline-dot', ''));
        button.appendChild(element(ownerDocument, 'span', 'lesson-timeline-name', node.name));
        button.addEventListener('click', function () { select(index); });
        item.appendChild(button);
        track.appendChild(item);
        nodeButtons.push(button);
      }(demo.nodes[i], i));
    }
    wrap.appendChild(track);
    wrap.appendChild(panel);
    select(demo.nodes.length - 1);
    return wrap;
  }

  // 3) 接话茬打字机：逐词生成，每步亮出候选和概率条。
  //    可以自动播，也可以自己挑词——挑个低概率的，句子会当场跑偏，
  //    这是让人「亲眼看见它在猜」最有效的方式。
  function renderTypewriterDemo(ownerDocument, root, demo) {
    var wrap = demoShell(ownerDocument, root, demo, 'lesson-demo-typewriter');

    var screen = element(ownerDocument, 'div', 'lesson-type-screen');
    var prompt = element(ownerDocument, 'p', 'lesson-type-prompt');
    prompt.appendChild(element(ownerDocument, 'span', 'lesson-type-tag', '你输入'));
    prompt.appendChild(ownerDocument.createTextNode(demo.prompt));
    screen.appendChild(prompt);
    var output = element(ownerDocument, 'p', 'lesson-type-output');
    var outputTag = element(ownerDocument, 'span', 'lesson-type-tag lesson-type-tag-ai', '它生成');
    output.appendChild(outputTag);
    var outputText = element(ownerDocument, 'span', 'lesson-type-text', '');
    output.appendChild(outputText);
    var caret = element(ownerDocument, 'span', 'lesson-type-caret', '');
    caret.setAttribute('aria-hidden', 'true');
    output.appendChild(caret);
    screen.appendChild(output);
    wrap.appendChild(screen);

    var stepLabel = element(ownerDocument, 'p', 'lesson-type-steplabel', '');
    wrap.appendChild(stepLabel);
    var candidates = element(ownerDocument, 'div', 'lesson-type-candidates');
    wrap.appendChild(candidates);

    var verdict = element(ownerDocument, 'p', 'lesson-type-verdict');
    wrap.appendChild(verdict);

    var actions = element(ownerDocument, 'div', 'lesson-demo-buttons');
    var autoButton = element(ownerDocument, 'button', 'lesson-demo-action', '自动生成');
    autoButton.setAttribute('type', 'button');
    var resetButton = element(ownerDocument, 'button', 'lesson-demo-chip', '重来一次');
    resetButton.setAttribute('type', 'button');
    actions.appendChild(autoButton);
    actions.appendChild(resetButton);
    wrap.appendChild(actions);

    if (demo.repeatedPrompt && Array.isArray(demo.repeatedAnswers) && demo.repeatedAnswers.length === 3) {
      var repeated = element(ownerDocument, 'section', 'lesson-repeat-answer');
      repeated.setAttribute('data-repeated-answer-demo', '');
      repeated.appendChild(element(ownerDocument, 'h4', 'lesson-repeat-title', '同一句 Prompt，合理答案也可能不同'));
      repeated.appendChild(element(ownerDocument, 'p', 'lesson-repeat-explanation', demo.repeatExplanation));
      repeated.appendChild(element(ownerDocument, 'p', 'lesson-repeat-prompt-label', '固定 Prompt'));
      var repeatedPrompt = element(ownerDocument, 'p', 'lesson-repeat-prompt', demo.repeatedPrompt);
      repeatedPrompt.setAttribute('data-repeated-prompt', '');
      repeated.appendChild(repeatedPrompt);
      var repeatedMeta = element(ownerDocument, 'p', 'lesson-repeat-meta', '回答 1 / 3');
      repeatedMeta.setAttribute('data-repeated-answer-meta', '');
      repeated.appendChild(repeatedMeta);
      var repeatedOutput = element(ownerDocument, 'p', 'lesson-repeat-output', demo.repeatedAnswers[0]);
      repeatedOutput.setAttribute('data-repeated-answer', '');
      repeated.appendChild(repeatedOutput);
      var repeatedNote = element(ownerDocument, 'p', 'lesson-repeat-note', demo.stabilityNote || '范例、格式和限制能提高稳定性，但不能保证逐字一致。');
      repeatedNote.setAttribute('data-stability-note', '');
      repeated.appendChild(repeatedNote);
      var repeatedAdvance = element(ownerDocument, 'button', 'lesson-demo-action', '查看下一个回答（2 / 3）');
      repeatedAdvance.setAttribute('type', 'button');
      repeatedAdvance.setAttribute('data-repeated-answer-next', '');
      repeated.appendChild(repeatedAdvance);
      repeated.appendChild(element(ownerDocument, 'p', 'lesson-repeat-summary', demo.repeatSummary));
      var repeatedIndex = 0;
      repeatedAdvance.addEventListener('click', function () {
        if (repeatedIndex >= demo.repeatedAnswers.length - 1) {
          repeatedIndex = 0;
          repeatedMeta.textContent = '回答 1 / ' + demo.repeatedAnswers.length;
          repeatedOutput.textContent = demo.repeatedAnswers[0];
          repeatedAdvance.textContent = '查看下一个回答（2 / ' + demo.repeatedAnswers.length + '）';
          demoAnnounce(wrap, '已回到回答 1，可以重新比较三个不同答案。');
          dispatchExerciseAttempt(wrap, '你重新开始比较同一句 Prompt 的不同合理答案。');
          return;
        }
        repeatedIndex += 1;
        repeatedMeta.textContent = '回答 ' + (repeatedIndex + 1) + ' / ' + demo.repeatedAnswers.length;
        repeatedOutput.textContent = demo.repeatedAnswers[repeatedIndex];
        if (repeatedIndex >= demo.repeatedAnswers.length - 1) {
          repeatedAdvance.textContent = '重新查看三个回答';
        } else {
          repeatedAdvance.textContent = '查看下一个回答（' + (repeatedIndex + 2) + ' / ' + demo.repeatedAnswers.length + '）';
        }
        demoAnnounce(wrap, '已显示回答 ' + (repeatedIndex + 1) + '，内容与前一个不同，但都符合固定 Prompt。');
        dispatchExerciseAttempt(wrap, '你比较了同一句 Prompt 的不同合理答案。');
      });
      wrap.appendChild(repeated);
    }

    var stepIndex = 0;
    var chosen = [];
    var timer = null;

    // 候选按钮每步重建，焦点要还回新一批的第一个；
    // 生成结束就落到「重来一次」，键盘用户不会被甩出这个演示。
    function restoreFocus() {
      var target = candidates.querySelector('.lesson-type-candidate') || resetButton;
      try {
        if (target && typeof target.focus === 'function') target.focus({ preventScroll: true });
      } catch (error) {}
    }

    function renderStep() {
      clearNode(candidates);
      outputText.textContent = chosen.join('');
      resetButton.hidden = chosen.length === 0;
      if (stepIndex >= demo.steps.length) {
        stepLabel.textContent = '生成结束。整句话是一个词一个词猜出来的，没有任何一步是去查资料。';
        caret.hidden = true;
        autoButton.disabled = true;
        var offTrack = false;
        for (var ci = 0; ci < chosen.length; ci += 1) if (demo.steps[ci] && chosen[ci] !== demo.steps[ci].options[0].word) offTrack = true;
        var verdictText = offTrack
          ? (demo.verdictOffTrack || '你挑了概率低的那个，句子就歪到别处去了。它不会拦你，因为它本来就只是在挑「下一个像样的词」。')
          : (demo.verdictSmooth || '每一步都挑了概率最高的，所以读起来很顺。但「顺」只说明它挑得稳，不说明这句话是真的。');
        clearNode(verdict);
        var verdictParas = String(verdictText).split('\n\n');
        for (var vIndex = 0; vIndex < verdictParas.length; vIndex += 1) {
          var vPara = element(ownerDocument, 'p', vIndex ? 'lesson-type-verdict-more' : '');
          appendEmphasisText(ownerDocument, vPara, verdictParas[vIndex]);
          verdict.appendChild(vPara);
        }
        verdict.hidden = false;
        return;
      }
      caret.hidden = false;
      verdict.hidden = true;
      var step = demo.steps[stepIndex];
      stepLabel.textContent = '第 ' + (stepIndex + 1) + ' 步 · 它在这几个词里挑一个接上去';
      for (var i = 0; i < step.options.length; i += 1) {
        (function (option) {
          var button = element(ownerDocument, 'button', 'lesson-type-candidate');
          button.setAttribute('type', 'button');
          button.appendChild(element(ownerDocument, 'span', 'lesson-type-word', option.word));
          var bar = element(ownerDocument, 'span', 'lesson-type-bar');
          bar.style.setProperty('--p', String(option.p / 100));
          button.appendChild(bar);
          button.appendChild(element(ownerDocument, 'span', 'lesson-type-prob', option.p + '%'));
          button.addEventListener('click', function () {
            chosen.push(option.word);
            stepIndex += 1;
            renderStep();
            restoreFocus();
            demoAnnounce(wrap, '已选「' + option.word + '」（' + option.p + '%）。' + (stepIndex >= demo.steps.length ? '生成结束。' : '继续挑下一个词。'));
            dispatchExerciseAttempt(wrap, '你亲手挑了一个词。它每一步都是这么干的。');
          });
          candidates.appendChild(button);
        }(step.options[i]));
      }
    }

    autoButton.addEventListener('click', function () {
      if (timer) return;
      timer = setInterval(function () {
        if (stepIndex >= demo.steps.length) {
          clearInterval(timer);
          timer = null;
          return;
        }
        chosen.push(demo.steps[stepIndex].options[0].word);
        stepIndex += 1;
        renderStep();
      }, 620);
      dispatchExerciseAttempt(wrap, '看完了一次逐词生成。');
    });
    resetButton.addEventListener('click', function () {
      if (timer) { clearInterval(timer); timer = null; }
      stepIndex = 0;
      chosen = [];
      autoButton.disabled = false;
      renderStep();
    });

    renderStep();
    return wrap;
  }

  // 4) 上下文窗口：不断加消息，最早的被挤出去变灰。
  //    比讲「上下文窗口有上限」有效得多——你能看见它把哪句话丢了。
  function renderContextWindowDemo(ownerDocument, root, demo) {
    var wrap = demoShell(ownerDocument, root, demo, 'lesson-demo-context');

    var meta = element(ownerDocument, 'p', 'lesson-context-meta');
    wrap.appendChild(meta);

    var deskFrame = element(ownerDocument, 'div', 'lesson-context-desk');
    deskFrame.setAttribute('data-capacity', String(demo.capacity));
    wrap.appendChild(deskFrame);

    var actions = element(ownerDocument, 'div', 'lesson-demo-buttons');
    var addButton = element(ownerDocument, 'button', 'lesson-demo-action', '再聊一轮');
    addButton.setAttribute('type', 'button');
    var resetButton = element(ownerDocument, 'button', 'lesson-demo-chip', '新开一个对话');
    resetButton.setAttribute('type', 'button');
    actions.appendChild(addButton);
    actions.appendChild(resetButton);
    wrap.appendChild(actions);

    var verdict = element(ownerDocument, 'p', 'lesson-context-verdict');
    wrap.appendChild(verdict);

    var turnIndex = 0;
    function render() {
      clearNode(deskFrame);
      var visible = demo.turns.slice(0, turnIndex);
      var dropped = Math.max(0, visible.length - demo.capacity);
      for (var i = 0; i < visible.length; i += 1) {
        var card = element(ownerDocument, 'div', 'lesson-context-card');
        card.setAttribute('data-state', i < dropped ? 'forgotten' : 'kept');
        card.appendChild(element(ownerDocument, 'span', 'lesson-context-role', visible[i].role));
        card.appendChild(element(ownerDocument, 'span', 'lesson-context-text', visible[i].text));
        if (i < dropped) card.appendChild(element(ownerDocument, 'span', 'lesson-context-badge', '已被挤出'));
        deskFrame.appendChild(card);
      }
      if (!visible.length) {
        deskFrame.appendChild(element(ownerDocument, 'p', 'lesson-context-empty', '桌上还什么都没有。点「再聊一轮」开始。'));
      }
      resetButton.hidden = visible.length === 0;
      meta.textContent = '桌面能摊开 ' + demo.capacity + ' 条 · 目前 ' + visible.length + ' 条'
        + (dropped ? ' · 最早的 ' + dropped + ' 条已经掉下去了' : '');
      addButton.disabled = turnIndex >= demo.turns.length;
      if (dropped > 0) {
        verdict.textContent = demo.consequence;
        verdict.hidden = false;
      } else {
        verdict.hidden = true;
      }
    }

    addButton.addEventListener('click', function () {
      if (turnIndex >= demo.turns.length) return;
      turnIndex += 1;
      render();
      demoAnnounce(wrap, meta.textContent);
      if (turnIndex > demo.capacity) dispatchExerciseAttempt(wrap, '你看见它把最早那条挤下去了。');
    });
    resetButton.addEventListener('click', function () {
      turnIndex = 0;
      render();
      verdict.hidden = true;
    });

    render();
    return wrap;
  }

  // 5) 同一件事，两种做法：左边是过去 40 年的软件（你学它的规则），
  //    右边是现在的 AI（它听你的话）。点任一边展开完整步骤。
  function renderShiftDemo(ownerDocument, root, demo) {
    var wrap = demoShell(ownerDocument, root, demo, 'lesson-demo-shift');
    var task = element(ownerDocument, 'p', 'lesson-shift-task');
    task.appendChild(element(ownerDocument, 'span', 'lesson-shift-tasklabel', '同一件事'));
    task.appendChild(ownerDocument.createTextNode(demo.task));
    wrap.appendChild(task);

    var grid = element(ownerDocument, 'div', 'lesson-shift-grid');
    for (var i = 0; i < demo.sides.length; i += 1) {
      (function (side) {
        var card = element(ownerDocument, 'article', 'lesson-shift-card');
        card.setAttribute('data-era', side.era);
        card.appendChild(element(ownerDocument, 'p', 'lesson-shift-era', side.eraLabel));
        card.appendChild(element(ownerDocument, 'h4', 'lesson-shift-how', side.how));
        var list = element(ownerDocument, 'ol', 'lesson-shift-steps');
        for (var si = 0; si < side.steps.length; si += 1) {
          list.appendChild(element(ownerDocument, 'li', '', side.steps[si]));
        }
        card.appendChild(list);
        var cost = element(ownerDocument, 'p', 'lesson-shift-cost');
        cost.appendChild(element(ownerDocument, 'strong', '', side.cost));
        cost.appendChild(ownerDocument.createTextNode(' · ' + side.note));
        card.appendChild(cost);
        grid.appendChild(card);
      }(demo.sides[i]));
    }
    wrap.appendChild(grid);

    var punch = element(ownerDocument, 'p', 'lesson-shift-punch');
    appendEmphasisText(ownerDocument, punch, demo.punchline);
    wrap.appendChild(punch);
    return wrap;
  }

  // 6) 上下文窗口对照：不同模型的桌子大小差很多。
  //    条形按相对长度画，让「差一个数量级」这件事看得见，而不是只读数字。
  function renderContextScaleDemo(ownerDocument, root, demo) {
    var wrap = demoShell(ownerDocument, root, demo, 'lesson-demo-scale');

    var max = 0;
    for (var i = 0; i < demo.models.length; i += 1) {
      if (demo.models[i].tokens > max) max = demo.models[i].tokens;
    }

    var list = element(ownerDocument, 'ul', 'lesson-scale-list');
    for (var index = 0; index < demo.models.length; index += 1) {
      var model = demo.models[index];
      var item = element(ownerDocument, 'li', 'lesson-scale-item');
      var nameNode = element(ownerDocument, 'span', 'lesson-scale-name');
      var modelNames = model.names || [model.name];
      for (var nameIndex = 0; nameIndex < modelNames.length; nameIndex += 1) {
        nameNode.appendChild(element(ownerDocument, 'span', 'lesson-scale-chip', modelNames[nameIndex]));
      }
      item.appendChild(nameNode);
      item.appendChild(element(ownerDocument, 'span', 'lesson-scale-value', model.label));
      var barWrap = element(ownerDocument, 'span', 'lesson-scale-bar');
      barWrap.style.setProperty('--w', String(model.tokens / max));
      item.appendChild(barWrap);
      item.appendChild(element(ownerDocument, 'span', 'lesson-scale-note', model.note));
      list.appendChild(item);
    }
    wrap.appendChild(list);

    if (demo.footnote) {
      var footParas = String(demo.footnote).split('\n\n');
      for (var footIndex = 0; footIndex < footParas.length; footIndex += 1) {
        var foot = element(ownerDocument, 'p', footIndex === 0 ? 'lesson-scale-foot' : 'lesson-scale-foot lesson-scale-foot-more');
        appendEmphasisText(ownerDocument, foot, footParas[footIndex]);
        wrap.appendChild(foot);
      }
    }
    return wrap;
  }

  // 7) 幻觉判断：三句话逐句判定「能用 / 要核 / 要改」，选完给理由。
  function renderClaimTriageDemo(ownerDocument, root, demo) {
    var wrap = demoShell(ownerDocument, root, demo, 'lesson-demo-triage');
    var options = ['可以保留', '需要核验', '需要修改'];
    var settled = 0;
    var completionAnnounced = false;
    var currentComplete = false;
    var demoId = 'lesson-triage-' + String(claimTriageDemoCount += 1);
    var instruction = element(ownerDocument, 'p', 'lesson-triage-instruction', '请逐句判断：有依据就保留，关键事实要核验，夸大或无依据的说法要修改。');
    instruction.setAttribute('data-triage-instruction', '');
    wrap.appendChild(instruction);

    for (var index = 0; index < demo.claims.length; index += 1) {
      (function (claim, claimIndex) {
        var card = element(ownerDocument, 'div', 'lesson-triage-card');
        card.setAttribute('data-claim-index', String(claimIndex));
        card.appendChild(element(ownerDocument, 'p', 'lesson-triage-text', claim.text));

        var row = element(ownerDocument, 'div', 'lesson-triage-row');
        var feedback = element(ownerDocument, 'p', 'lesson-triage-feedback');
        var feedbackId = demoId + '-feedback-' + String(claimIndex);
        feedback.setAttribute('id', feedbackId);
        feedback.setAttribute('data-triage-feedback', '');
        feedback.hidden = true;
        var answered = false;

        for (var optIndex = 0; optIndex < options.length; optIndex += 1) {
          (function (option) {
            var button = element(ownerDocument, 'button', 'lesson-triage-choice', option);
            button.setAttribute('type', 'button');
            button.setAttribute('data-claim-index', String(claimIndex));
            button.setAttribute('data-choice-value', option);
            button.setAttribute('aria-pressed', 'false');
            button.setAttribute('aria-controls', feedbackId);
            button.addEventListener('click', function () {
              var right = option === claim.category;
              if (right !== answered) {
                settled += right ? 1 : -1;
                answered = right;
              }
              currentComplete = settled === demo.claims.length;
              if (!currentComplete) completionAnnounced = false;
              var siblings = row.querySelectorAll('button');
              for (var si = 0; si < siblings.length; si += 1) {
                siblings[si].setAttribute('aria-pressed', siblings[si] === button ? 'true' : 'false');
              }
              card.setAttribute('data-state', right ? 'right' : 'retry');
              feedback.hidden = false;
              clearNode(feedback);
              if (right) {
                feedback.appendChild(element(ownerDocument, 'b', '', claim.category + ' · '));
                feedback.appendChild(ownerDocument.createTextNode(claim.why));
                if (currentComplete) {
                  demoAnnounce(wrap, feedback.textContent + ' 三句都判完了。');
                  if (!completionAnnounced) {
                    completionAnnounced = true;
                    dispatchExerciseAttempt(wrap, '三句都判完了。');
                  }
                } else {
                  demoAnnounce(wrap, feedback.textContent);
                }
              } else {
                feedback.appendChild(ownerDocument.createTextNode('你选了「' + option + '」。先别直接用：请再看一眼这句话有没有原始依据、关键数字或过强因果。'));
                demoAnnounce(wrap, feedback.textContent);
              }
            });
            row.appendChild(button);
          }(options[optIndex]));
        }
        card.appendChild(row);
        card.appendChild(feedback);
        wrap.appendChild(card);
      }(demo.claims[index], index));
    }
    return wrap;
  }

  // 两版对照：识别哪一种写法更适合作为后续核实的起点。
  function renderVersionPickDemo(ownerDocument, root, demo) {
    var wrap = element(ownerDocument, 'section', 'lesson-demo lesson-demo-versions');
    var heading = element(ownerDocument, 'h3', 'lesson-version-heading', demo.title);
    heading.setAttribute('id', 'lesson-version-heading');
    wrap.setAttribute('aria-labelledby', 'lesson-version-heading');
    wrap.appendChild(heading);
    var versionOptions = element(ownerDocument, 'div', 'lesson-version-options');

    for (var index = 0; index < demo.versions.length; index += 1) {
      (function (version) {
        var card = element(ownerDocument, 'button', 'lesson-version-choice');
        card.setAttribute('type', 'button');
        card.setAttribute('data-version-choice', version.label);
        card.setAttribute('data-result', version.usable ? 'right' : 'wrong');
        card.setAttribute('aria-pressed', 'false');
        card.appendChild(element(ownerDocument, 'span', 'lesson-version-label', version.label));
        card.appendChild(element(ownerDocument, 'span', 'lesson-version-text', version.text));
        card.addEventListener('click', function () {
          setChoiceState(versionOptions.querySelectorAll('[data-version-choice]'), card);
          feedback.textContent = version.feedback;
          feedback.setAttribute('data-state', version.usable ? 'right' : 'wrong');
          dispatchExerciseAttempt(wrap, version.feedback);
        });
        versionOptions.appendChild(card);
      }(demo.versions[index]));
    }
    wrap.appendChild(versionOptions);
    var feedback = element(ownerDocument, 'p', 'lesson-version-feedback');
    feedback.setAttribute('aria-live', 'polite');
    wrap.appendChild(feedback);
    root.appendChild(wrap);
    return wrap;
  }

  var demoRenderers = Object.assign(Object.create(null), {
    shift: renderShiftDemo,
    'hallucination-spotter-inline': renderClaimTriageDemo,
    'evidence-check-inline': renderVersionPickDemo,
    'context-scale': renderContextScaleDemo,
    concentric: renderConcentricDemo,
    timeline: renderTimelineDemo,
    'context-window': renderContextWindowDemo,
  });

  // 信任四象限：两个判断维度（有没有标准答案 × 错了代价多大）交叉成四格。
  // 比「问自己三个问题」这类流程式判断更好用——看一眼就能定位。
  function appendTrustQuadrant(ownerDocument, root, quadrant) {
    var wrap = element(ownerDocument, 'div', 'lesson-quadrant');
    wrap.setAttribute('aria-label', '把工作交给 AI 前的四种处理方法');

    var axes = element(ownerDocument, 'p', 'lesson-quadrant-axes');
    axes.appendChild(element(ownerDocument, 'span', 'lesson-quadrant-axis', quadrant.xLabel));
    axes.appendChild(element(ownerDocument, 'span', 'lesson-quadrant-axis', quadrant.yLabel));
    wrap.appendChild(axes);

    var grid = element(ownerDocument, 'div', 'lesson-quadrant-grid');
    for (var index = 0; index < quadrant.cells.length; index += 1) {
      var cell = quadrant.cells[index];
      var card = element(ownerDocument, 'article', 'lesson-quadrant-cell');
      card.setAttribute('data-tone', cell.tone);
      card.appendChild(element(ownerDocument, 'p', 'lesson-quadrant-axislabel', cell.axis));
      card.appendChild(element(ownerDocument, 'h3', 'lesson-quadrant-title', cell.title));
      card.appendChild(element(ownerDocument, 'p', 'lesson-quadrant-desc', cell.desc));
      if (Array.isArray(cell.examples) && cell.examples.length) {
        card.appendChild(element(ownerDocument, 'p', 'lesson-quadrant-examples-label', '具体例子'));
        var examples = element(ownerDocument, 'ul', 'lesson-quadrant-examples');
        for (var exampleIndex = 0; exampleIndex < cell.examples.length; exampleIndex += 1) {
          examples.appendChild(element(ownerDocument, 'li', 'lesson-quadrant-example', cell.examples[exampleIndex]));
        }
        card.appendChild(examples);
      }
      grid.appendChild(card);
    }
    wrap.appendChild(grid);
    root.appendChild(wrap);
    return wrap;
  }

  function appendBoundaryComparison(ownerDocument, root, sectionData) {
    var comparison = element(ownerDocument, 'div', 'lesson-boundary-compare');
    comparison.setAttribute('aria-label', '按任务选择搜索或 AI');
    for (var compareIndex = 0; compareIndex < sectionData.compare.length; compareIndex += 1) {
      var compareItem = sectionData.compare[compareIndex];
      var card = element(ownerDocument, 'article', 'lesson-boundary-card');
      card.setAttribute('data-boundary-role', compareItem.role);
      card.appendChild(element(ownerDocument, 'p', 'lesson-boundary-role', compareItem.role));
      card.appendChild(element(ownerDocument, 'h3', '', compareItem.title));
      card.appendChild(element(ownerDocument, 'p', '', compareItem.description));
      comparison.appendChild(card);
    }
    root.appendChild(comparison);
  }

  function appendFlowSteps(ownerDocument, root, steps, explanations) {
    var flow = element(ownerDocument, 'ol', 'lesson-model-flow');
    flow.setAttribute('aria-label', '大模型生成内容的五个步骤');
    for (var index = 0; index < steps.length; index += 1) {
      var item = element(ownerDocument, 'li', '');
      var button = element(ownerDocument, 'button', 'lesson-flow-step');
      button.setAttribute('type', 'button');
      button.setAttribute('data-flow-step', String(index));
      button.setAttribute('aria-expanded', 'false');
      button.appendChild(element(ownerDocument, 'span', 'lesson-flow-number', String(index + 1)));
      button.appendChild(element(ownerDocument, 'span', '', steps[index]));
      var explanation = element(ownerDocument, 'p', 'lesson-flow-explanation', explanations[index]);
      explanation.setAttribute('data-flow-explanation', String(index));
      explanation.hidden = true;
      (function (flowButton, flowExplanation, stepName) {
        flowButton.addEventListener('click', function () {
          var expanded = flowButton.getAttribute('aria-expanded') !== 'true';
          flowButton.setAttribute('aria-expanded', expanded ? 'true' : 'false');
          flowExplanation.hidden = !expanded;
          dispatchExerciseAttempt(root, stepName + '：' + flowExplanation.textContent);
        });
      }(button, explanation, steps[index]));
      item.appendChild(button);
      item.appendChild(explanation);
      flow.appendChild(item);
    }
    root.appendChild(flow);
  }

  function renderTokenPrediction(exercise, root) {
    var ownerDocument = root.ownerDocument;
    var fieldset = interactionFieldset(ownerDocument, '“请把月度数据整理成一份……”下一个 Token 可能是什么？');
    fieldset.appendChild(element(ownerDocument, 'p', 'lesson-interaction-note', '模型会给多个候选分配概率，再继续生成；这里没有考试式的唯一操作。'));
    var options = element(ownerDocument, 'div', 'lesson-choice-row');
    for (var index = 0; index < exercise.candidates.length; index += 1) {
      (function (candidate) {
        var button = interactionButton(ownerDocument, candidate.label + ' · ' + candidate.probability + '%', 'data-token-option', candidate.label);
        button.setAttribute('aria-pressed', 'false');
        button.addEventListener('click', function () {
          setChoiceState(options.querySelectorAll('[data-token-option]'), button);
          dispatchExerciseAttempt(root, candidate.label + ' 是一个候选。概率表示模型此刻的预测倾向，不代表事实已经核验。');
        });
        options.appendChild(button);
      }(exercise.candidates[index]));
    }
    fieldset.appendChild(options);
    root.appendChild(fieldset);

    var conceptMap = element(ownerDocument, 'div', 'lesson-concept-map');
    conceptMap.appendChild(element(ownerDocument, 'h3', '', '四个概念怎么连接'));
    conceptMap.appendChild(element(ownerDocument, 'p', '', '依次点开节点：前三个表示范围与能力关系，Agent 则是在模型外加入行动机制。'));
    var nodeList = element(ownerDocument, 'div', 'lesson-concept-nodes');
    nodeList.setAttribute('role', 'group');
    nodeList.setAttribute('aria-label', 'AI、生成式 AI、大模型与 Agent 的关系');
    var scopeTrack = element(ownerDocument, 'div', 'lesson-concept-scope');
    scopeTrack.setAttribute('data-concept-scope', '');
    var agentBranch = element(ownerDocument, 'div', 'lesson-agent-branch');
    agentBranch.setAttribute('data-agent-branch', '');
    for (var nodeIndex = 0; nodeIndex < exercise.relationshipNodes.length; nodeIndex += 1) {
      (function (relationshipNode, currentNodeIndex) {
        var nodeItem = element(ownerDocument, 'div', 'lesson-concept-node-item');
        var nodeButton = interactionButton(ownerDocument, relationshipNode.label, 'data-concept-node', relationshipNode.label);
        nodeButton.className += ' lesson-concept-node';
        nodeButton.setAttribute('aria-pressed', 'false');
        nodeButton.addEventListener('click', function () {
          setChoiceState(nodeList.querySelectorAll('[data-concept-node]'), nodeButton);
          dispatchExerciseAttempt(root, relationshipNode.label + '：' + relationshipNode.explanation);
        });
        nodeItem.appendChild(nodeButton);
        if (currentNodeIndex < 3) {
          if (currentNodeIndex > 0) {
            var linkText = currentNodeIndex === 1 ? exercise.relationshipLabels.scope : exercise.relationshipLabels.foundation;
            var scopeLink = element(ownerDocument, 'span', 'lesson-concept-link', linkText);
            scopeLink.setAttribute('data-concept-link', currentNodeIndex === 1 ? 'scope' : 'foundation');
            scopeTrack.appendChild(scopeLink);
          }
          scopeTrack.appendChild(nodeItem);
        } else {
          agentBranch.appendChild(element(ownerDocument, 'p', 'lesson-agent-connector', '外接机制'));
          agentBranch.appendChild(nodeItem);
          var agentRelation = element(ownerDocument, 'p', 'lesson-agent-relation');
          agentRelation.setAttribute('data-agent-relation', '');
          agentRelation.textContent = exercise.relationshipLabels.agent;
          agentBranch.appendChild(agentRelation);
        }
      }(exercise.relationshipNodes[nodeIndex], nodeIndex));
    }
    nodeList.appendChild(scopeTrack);
    nodeList.appendChild(agentBranch);
    conceptMap.appendChild(nodeList);

    var judgment = exercise.relationshipJudgment;
    var judgmentFieldset = interactionFieldset(ownerDocument, judgment.statement, 'lesson-concept-judgment');
    judgmentFieldset.setAttribute('data-concept-judgment-group', '');
    judgmentFieldset.appendChild(element(ownerDocument, 'p', 'lesson-interaction-note', '选一个判断，立即看解释；不计分，可以重试。'));
    var judgmentOptions = element(ownerDocument, 'div', 'lesson-choice-row');
    for (var judgmentIndex = 0; judgmentIndex < judgment.options.length; judgmentIndex += 1) {
      (function (option) {
        var judgmentButton = interactionButton(ownerDocument, option, 'data-concept-judgment', option);
        judgmentButton.setAttribute('aria-pressed', 'false');
        judgmentButton.addEventListener('click', function () {
          setChoiceState(judgmentOptions.querySelectorAll('[data-concept-judgment]'), judgmentButton);
          var lead = option === judgment.answer ? '不对，理解到位。' : '这个说法容易混淆能力边界。';
          dispatchExerciseAttempt(root, lead + judgment.explanation);
        });
        judgmentOptions.appendChild(judgmentButton);
      }(judgment.options[judgmentIndex]));
    }
    judgmentFieldset.appendChild(judgmentOptions);
    conceptMap.appendChild(judgmentFieldset);
    root.appendChild(conceptMap);
    appendFlowSteps(ownerDocument, root, exercise.steps, exercise.stepExplanations);
  }

  function renderEvidenceSpotter(exercise, root) {
    var ownerDocument = root.ownerDocument;
    var categories = ['可以保留', '需要核验', '需要修改'];
    for (var index = 0; index < exercise.claims.length; index += 1) {
      (function (claim, claimIndex) {
        var fieldset = interactionFieldset(ownerDocument, '判断 ' + (claimIndex + 1) + '：' + claim.text);
        var options = element(ownerDocument, 'div', 'lesson-choice-row');
        for (var categoryIndex = 0; categoryIndex < categories.length; categoryIndex += 1) {
          (function (category) {
            var button = interactionButton(ownerDocument, category, 'data-claim-choice', category);
            button.setAttribute('data-claim-index', String(claimIndex));
            button.setAttribute('aria-pressed', 'false');
            button.addEventListener('click', function () {
              setChoiceState(options.querySelectorAll('[data-claim-choice]'), button);
              var explanation = claim.category === '可以保留'
                ? '原始材料直接支持这句话，可以保留并带上来源。'
                : claim.category === '需要核验'
                  ? '精确数字或时效信息要回到原始来源核验。'
                  : '材料不足以支持这个强因果结论，需要改成谨慎表达。';
              dispatchExerciseAttempt(root, (category === claim.category ? '思路一致。' : '可以换个角度再看。') + explanation);
            });
            options.appendChild(button);
          }(categories[categoryIndex]));
        }
        fieldset.appendChild(options);
        root.appendChild(fieldset);
      }(exercise.claims[index], index));
    }
  }

  function renderDelegationSorter(exercise, root) {
    var ownerDocument = root.ownerDocument;
    var lanes = ['AI', '人机协作', '人负责'];
    for (var index = 0; index < exercise.tasks.length; index += 1) {
      (function (task, taskIndex) {
        var fieldset = interactionFieldset(ownerDocument, '任务 ' + (taskIndex + 1) + '：' + task.text);
        var options = element(ownerDocument, 'div', 'lesson-choice-row lesson-lane-row');
        for (var laneIndex = 0; laneIndex < lanes.length; laneIndex += 1) {
          (function (lane) {
            var button = interactionButton(ownerDocument, lane, 'data-sort-choice', lane);
            button.setAttribute('data-task-index', String(taskIndex));
            button.setAttribute('aria-pressed', 'false');
            button.addEventListener('click', function () {
              setChoiceState(options.querySelectorAll('[data-sort-choice]'), button);
              var explanation = task.lane === 'AI'
                ? '这项工作目标明确、结果容易检查，适合先让 AI 加速。'
                : task.lane === '人机协作'
                  ? 'AI 可以提供分析线索，人要结合业务语境判断。'
                  : '这项工作涉及优先级与责任，需要由人主导。';
              dispatchExerciseAttempt(root, (lane === task.lane ? '这个分工很合适。' : '还可以重新分工。') + explanation);
            });
            options.appendChild(button);
          }(lanes[laneIndex]));
        }
        fieldset.appendChild(options);
        root.appendChild(fieldset);
      }(exercise.tasks[index], index));
    }
  }

  function renderPromptBuilder(exercise, root) {
    var ownerDocument = root.ownerDocument;
    var fieldset = interactionFieldset(ownerDocument, '填写四要素，拼出你的工作 brief', 'lesson-prompt-builder');
    var formGrid = element(ownerDocument, 'div', 'lesson-prompt-fields');
    var preview = element(ownerDocument, 'pre', 'lesson-prompt-preview');
    var hasAnnouncedInput = false;
    preview.setAttribute('data-prompt-preview', '');

    function updatePreview() {
      var lines = [];
      var fields = formGrid.querySelectorAll('[data-prompt-field]');
      var hasMeaningfulInput = false;
      for (var fieldIndex = 0; fieldIndex < fields.length; fieldIndex += 1) {
        lines.push(fields[fieldIndex].getAttribute('data-prompt-field') + '：' + fields[fieldIndex].value);
        if (fields[fieldIndex].value.trim()) hasMeaningfulInput = true;
      }
      preview.textContent = lines.join('\n');
      if (!hasAnnouncedInput && hasMeaningfulInput) {
        hasAnnouncedInput = true;
        dispatchExerciseAttempt(root, '任务说明已开始拼装，你可以继续补充和调整。');
      }
    }

    for (var index = 0; index < exercise.fields.length; index += 1) {
      var label = element(ownerDocument, 'label', 'lesson-prompt-field');
      label.appendChild(element(ownerDocument, 'span', '', exercise.fields[index]));
      var input = index === 1 || index === 2 ? element(ownerDocument, 'textarea', '') : element(ownerDocument, 'input', '');
      if (input.tagName === 'INPUT') input.setAttribute('type', 'text');
      input.setAttribute('data-prompt-field', exercise.fields[index]);
      input.setAttribute('placeholder', '写下' + exercise.fields[index]);
      input.addEventListener('input', updatePreview);
      label.appendChild(input);
      formGrid.appendChild(label);
    }
    fieldset.appendChild(formGrid);
    fieldset.appendChild(element(ownerDocument, 'p', 'lesson-interaction-note', '实时拼装结果（你的输入只会作为文字显示）'));
    fieldset.appendChild(preview);
    var reference = element(ownerDocument, 'details', 'lesson-exercise-reference');
    reference.appendChild(element(ownerDocument, 'summary', '', '看看一个完整示例'));
    reference.appendChild(element(ownerDocument, 'p', '', exercise.reference));
    fieldset.appendChild(reference);
    root.appendChild(fieldset);
  }

  function renderClaimClassifier(exercise, root) {
    var ownerDocument = root.ownerDocument;
    var kinds = ['事实', '推论', '观点'];
    for (var index = 0; index < exercise.claims.length; index += 1) {
      (function (claim, claimIndex) {
        var fieldset = interactionFieldset(ownerDocument, '句子 ' + (claimIndex + 1) + '：' + claim.text);
        var options = element(ownerDocument, 'div', 'lesson-choice-row');
        for (var kindIndex = 0; kindIndex < kinds.length; kindIndex += 1) {
          (function (kind) {
            var button = interactionButton(ownerDocument, kind, 'data-claim-kind', kind);
            button.setAttribute('data-claim-index', String(claimIndex));
            button.setAttribute('aria-pressed', 'false');
            button.addEventListener('click', function () {
              setChoiceState(options.querySelectorAll('[data-claim-kind]'), button);
              dispatchExerciseAttempt(root, (kind === claim.kind ? '分类合理。' : '可以再对照定义。') + '接下来请为这句话主动选择证据。');
            });
            options.appendChild(button);
          }(kinds[kindIndex]));
        }
        fieldset.appendChild(options);

        if (claimIndex === 1) {
          var evidenceTitle = element(ownerDocument, 'p', 'lesson-evidence-label', '关键归因：连接一条最合适的证据');
          fieldset.appendChild(evidenceTitle);
          var evidenceOptions = element(ownerDocument, 'div', 'lesson-choice-row lesson-evidence-options');
          evidenceOptions.setAttribute('role', 'group');
          evidenceOptions.setAttribute('aria-label', '为关键归因句选择证据');
          for (var evidenceIndex = 0; evidenceIndex < exercise.evidenceOptions.length; evidenceIndex += 1) {
            (function (evidenceOption) {
              var evidenceButton = interactionButton(ownerDocument, evidenceOption, 'data-evidence-choice', evidenceOption);
              evidenceButton.setAttribute('data-claim-index', String(claimIndex));
              evidenceButton.setAttribute('aria-pressed', 'false');
              evidenceButton.addEventListener('click', function () {
                setChoiceState(evidenceOptions.querySelectorAll('[data-evidence-choice]'), evidenceButton);
                dispatchExerciseAttempt(root, (evidenceOption === claim.evidence ? '证据连接合理。' : '这条证据还不能完整支持句子。') + '建议连接：' + claim.evidence + '。');
              });
              evidenceOptions.appendChild(evidenceButton);
            }(exercise.evidenceOptions[evidenceIndex]));
          }
          fieldset.appendChild(evidenceOptions);
        }
        root.appendChild(fieldset);
      }(exercise.claims[index], index));
    }

    var versionFieldset = interactionFieldset(ownerDocument, '比较两个版本：哪一个更适合直接进入下一步工作？', 'lesson-version-compare');
    var versionOptions = element(ownerDocument, 'div', 'lesson-version-options');
    for (var versionIndex = 0; versionIndex < exercise.versions.length; versionIndex += 1) {
      (function (version) {
        var versionCard = element(ownerDocument, 'div', 'lesson-version-card');
        versionCard.appendChild(element(ownerDocument, 'b', '', version.label));
        versionCard.appendChild(element(ownerDocument, 'p', '', version.text));
        var versionButton = interactionButton(ownerDocument, '选择' + version.label, 'data-version-choice', version.label);
        versionButton.setAttribute('aria-pressed', 'false');
        versionButton.addEventListener('click', function () {
          setChoiceState(versionOptions.querySelectorAll('[data-version-choice]'), versionButton);
          dispatchExerciseAttempt(root, (version.usable ? '这个版本更可用。' : '这个版本还需要补充。') + version.explanation);
        });
        versionCard.appendChild(versionButton);
        versionOptions.appendChild(versionCard);
      }(exercise.versions[versionIndex]));
    }
    versionFieldset.appendChild(versionOptions);
    root.appendChild(versionFieldset);
  }

  function renderWorkflowSorter(exercise, root) {
    var ownerDocument = root.ownerDocument;
    var steps = [];
    for (var index = 0; index < exercise.shuffleOrder.length; index += 1) {
      var sourceIndex = exercise.shuffleOrder[index];
      steps.push({
        key: String(sourceIndex),
        text: exercise.steps[sourceIndex].text,
        owner: exercise.steps[sourceIndex].owner,
        checkpoint: Boolean(exercise.steps[sourceIndex].checkpoint),
        userOwner: null,
        userCheckpoint: null,
      });
    }
    var fieldset = interactionFieldset(ownerDocument, '排列月度汇报步骤，并检查分工与人工检查点', 'lesson-workflow-builder');
    var list = element(ownerDocument, 'ol', 'lesson-workflow-list');
    var recommendedOrder = exercise.steps.map(function (step) { return step.text; });
    fieldset.appendChild(list);
    root.appendChild(fieldset);

    function renderList(focusKey, focusAction) {
      clearNode(list);
      for (var stepIndex = 0; stepIndex < steps.length; stepIndex += 1) {
        (function (step, currentIndex) {
          var item = element(ownerDocument, 'li', 'lesson-workflow-step');
          item.setAttribute('data-step-key', step.key);
          var copy = element(ownerDocument, 'div', 'lesson-workflow-copy');
          copy.appendChild(element(ownerDocument, 'b', '', step.text));
          item.appendChild(copy);
          var actions = element(ownerDocument, 'div', 'lesson-workflow-actions');
          var up = interactionButton(ownerDocument, '上移', 'data-workflow-move', 'up');
          var down = interactionButton(ownerDocument, '下移', 'data-workflow-move', 'down');
          up.setAttribute('data-step-key', step.key);
          down.setAttribute('data-step-key', step.key);
          up.setAttribute('data-focus-action', 'up');
          down.setAttribute('data-focus-action', 'down');
          up.disabled = currentIndex === 0;
          down.disabled = currentIndex === steps.length - 1;
          function move(direction, button) {
            var targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
            if (targetIndex < 0 || targetIndex >= steps.length) return;
            var swap = steps[targetIndex];
            steps[targetIndex] = steps[currentIndex];
            steps[currentIndex] = swap;
            renderList(step.key, button.getAttribute('data-focus-action'));
            var currentOrder = steps.map(function (orderedStep) { return orderedStep.text; });
            var orderMatches = currentOrder.join('\n') === recommendedOrder.join('\n');
            dispatchExerciseAttempt(root, (orderMatches ? '顺序合理。' : '当前顺序还可以再调整。') + '稳定工作流要让输入、分析、核验和交付依次衔接。');
          }
          up.addEventListener('click', function () { move('up', up); });
          down.addEventListener('click', function () { move('down', down); });
          actions.appendChild(up);
          actions.appendChild(down);

          var owners = ['AI', '人机协作', '人负责'];
          var ownerGroup = element(ownerDocument, 'div', 'lesson-workflow-owner');
          ownerGroup.setAttribute('role', 'group');
          ownerGroup.setAttribute('aria-label', step.text + ' · 分工');
          ownerGroup.appendChild(element(ownerDocument, 'span', 'lesson-workflow-question', '这一步谁负责？'));
          for (var ownerIndex = 0; ownerIndex < owners.length; ownerIndex += 1) {
            (function (owner) {
              var ownerButton = interactionButton(ownerDocument, owner, 'data-workflow-owner', owner);
              ownerButton.setAttribute('data-step-key', step.key);
              ownerButton.setAttribute('aria-label', step.text + ' · 分工：' + owner);
              ownerButton.setAttribute('aria-pressed', step.userOwner === owner ? 'true' : 'false');
              if (step.userOwner === owner && ownerButton.classList) ownerButton.classList.add('is-selected');
              ownerButton.addEventListener('click', function () {
                step.userOwner = owner;
                setChoiceState(ownerGroup.querySelectorAll('[data-workflow-owner]'), ownerButton);
                dispatchExerciseAttempt(root, '已选择责任分工。再判断是否需要人工检查点，然后核对这一环节。');
              });
              ownerGroup.appendChild(ownerButton);
            }(owners[ownerIndex]));
          }
          actions.appendChild(ownerGroup);

          var checkpointGroup = element(ownerDocument, 'div', 'lesson-workflow-checkpoints');
          checkpointGroup.setAttribute('role', 'group');
          checkpointGroup.setAttribute('aria-label', step.text + ' · 人工检查点');
          checkpointGroup.appendChild(element(ownerDocument, 'span', 'lesson-workflow-question', '需要人工检查吗？'));
          var checkpointChoices = [{ label: '需要', value: true }, { label: '不需要', value: false }];
          for (var checkpointIndex = 0; checkpointIndex < checkpointChoices.length; checkpointIndex += 1) {
            (function (choice) {
              var checkpointButton = interactionButton(ownerDocument, choice.label, 'data-workflow-checkpoint', choice.value ? 'true' : 'false');
              checkpointButton.setAttribute('data-step-key', step.key);
              checkpointButton.setAttribute('aria-label', step.text + ' · 人工检查点：' + choice.label);
              checkpointButton.setAttribute('aria-pressed', step.userCheckpoint === choice.value ? 'true' : 'false');
              if (step.userCheckpoint === choice.value && checkpointButton.classList) checkpointButton.classList.add('is-selected');
              checkpointButton.addEventListener('click', function () {
                step.userCheckpoint = choice.value;
                setChoiceState(checkpointGroup.querySelectorAll('[data-workflow-checkpoint]'), checkpointButton);
                dispatchExerciseAttempt(root, '已选择检查点设置。完成责任分工后，可以核对这一环节。');
              });
              checkpointGroup.appendChild(checkpointButton);
            }(checkpointChoices[checkpointIndex]));
          }
          actions.appendChild(checkpointGroup);

          var result = element(ownerDocument, 'p', 'lesson-workflow-result');
          result.setAttribute('data-workflow-result', '');
          result.hidden = true;
          var checkButton = interactionButton(ownerDocument, '核对这一环节', 'data-workflow-check', step.key);
          checkButton.setAttribute('data-step-key', step.key);
          checkButton.addEventListener('click', function () {
            if (step.userOwner === null || step.userCheckpoint === null) {
              dispatchExerciseAttempt(root, '先选择责任分工与是否需要人工检查，再核对建议。');
              return;
            }
            var ownerMatches = step.userOwner === step.owner;
            var checkpointMatches = step.userCheckpoint === step.checkpoint;
            result.hidden = false;
            result.textContent = '建议：' + step.owner + '负责；' + (step.checkpoint ? '设置人工检查点。' : '无需单独设置人工检查点。');
            dispatchExerciseAttempt(root, (ownerMatches && checkpointMatches ? '你的设置与建议一致。' : '可以对照建议继续调整。') + result.textContent);
          });
          actions.appendChild(checkButton);
          actions.appendChild(result);
          item.appendChild(actions);
          list.appendChild(item);
        }(steps[stepIndex], stepIndex));
      }
      if (focusKey !== undefined && focusAction) {
        var focusTarget = list.querySelector('[data-step-key="' + focusKey + '"][data-focus-action="' + focusAction + '"]');
        try {
          if (focusTarget && typeof focusTarget.focus === 'function') focusTarget.focus({ preventScroll: true });
        } catch (error) {}
      }
    }
    renderList();

    var orderCheck = interactionButton(ownerDocument, '核对步骤顺序', 'data-workflow-check-order', 'order');
    orderCheck.addEventListener('click', function () {
      var currentOrder = steps.map(function (orderedStep) { return orderedStep.text; });
      var orderMatches = currentOrder.join('\n') === recommendedOrder.join('\n');
      dispatchExerciseAttempt(root, orderMatches ? '步骤顺序合理，接下来核对每一步的分工与检查点。' : '顺序还可以调整：先收集输入，再分析、核验、形成初稿并由人确定交付。');
    });
    fieldset.appendChild(orderCheck);
  }

  var exerciseRenderers = {
    'token-and-concepts': renderTokenPrediction,
    'hallucination-spotter': renderEvidenceSpotter,
    'delegation-sort': renderDelegationSorter,
    'prompt-builder': renderPromptBuilder,
    'evidence-check': renderClaimClassifier,
    'workflow-builder': renderWorkflowSorter,
  };

  // 正文里允许用 **强调** 标出关键句。只支持这一种标记，
  // 用 createTextNode 逐段拼装，不走 innerHTML，避免引入注入面。
  function appendEmphasisText(ownerDocument, target, text) {
    var parts = String(text).split('**');
    for (var index = 0; index < parts.length; index += 1) {
      if (!parts[index]) continue;
      if (index % 2 === 1) target.appendChild(element(ownerDocument, 'strong', 'lesson-emphasis', parts[index]));
      else target.appendChild(ownerDocument.createTextNode(parts[index]));
    }
    return target;
  }

  function appendParagraphs(ownerDocument, target, paragraphs) {
    for (var index = 0; index < paragraphs.length; index += 1) {
      var paragraph = element(ownerDocument, 'p', '');
      appendEmphasisText(ownerDocument, paragraph, paragraphs[index]);
      target.appendChild(paragraph);
    }
  }

  // bullets 支持两种写法：
  //   '一句话'                       —— 旧写法，仍然可用
  //   { term: '短语', explain: '两三句展开' } —— 新写法，避免只给结论不给解释
  function appendBulletList(ownerDocument, target, items) {
    var list = element(ownerDocument, 'ul', 'lesson-bullets');
    for (var index = 0; index < items.length; index += 1) {
      var item = items[index];
      if (isPlainObject(item)) {
        var richItem = element(ownerDocument, 'li', 'lesson-bullet-rich');
        // 术语前加一个记号，纯文字堆叠读起来不舒服也分不出层级
        var bulletMark = svgEl(ownerDocument, 'svg', { viewBox: '0 0 20 20', 'aria-hidden': 'true', class: 'lesson-bullet-icon' });
        bulletMark.appendChild(svgEl(ownerDocument, 'circle', { cx: 10, cy: 10, r: 8.5 }));
        bulletMark.appendChild(svgEl(ownerDocument, 'path', { d: 'M6.4 10.2l2.5 2.5 4.7-5.1' }));
        richItem.appendChild(bulletMark);
        richItem.appendChild(element(ownerDocument, 'b', 'lesson-bullet-term', item.term));
        var explain = element(ownerDocument, 'span', 'lesson-bullet-explain', '');
        appendEmphasisText(ownerDocument, explain, item.explain);
        richItem.appendChild(explain);
        list.appendChild(richItem);
      } else {
        list.appendChild(element(ownerDocument, 'li', '', item));
      }
    }
    target.appendChild(list);
    return list;
  }

  function appendQuickGuide(ownerDocument, target, items) {
    var wrapper = element(ownerDocument, 'div', 'lesson-quick-guide');
    wrapper.setAttribute('data-quick-guide', '');
    var guideHeading = element(ownerDocument, 'h3', 'lesson-structured-title', '实用速查 · 什么事找谁办');
    guideHeading.setAttribute('id', 'lesson-quick-guide-title');
    wrapper.appendChild(guideHeading);

    var table = element(ownerDocument, 'table', 'lesson-quick-guide-table');
    table.setAttribute('aria-labelledby', 'lesson-quick-guide-title');
    var labels = ['你想干什么', '找谁', '为什么'];
    var head = element(ownerDocument, 'thead', '');
    var headRow = element(ownerDocument, 'tr', '');
    for (var labelIndex = 0; labelIndex < labels.length; labelIndex += 1) {
      var headingCell = element(ownerDocument, 'th', '', labels[labelIndex]);
      headingCell.setAttribute('scope', 'col');
      headRow.appendChild(headingCell);
    }
    head.appendChild(headRow);
    table.appendChild(head);

    function appendDataCell(row, label, value, className, dataAttribute) {
      var cell = element(ownerDocument, 'td', className || '');
      cell.setAttribute('data-label', label);
      if (dataAttribute) cell.setAttribute(dataAttribute, '');
      var visualLabel = element(ownerDocument, 'span', 'lesson-quick-guide-label', label);
      visualLabel.setAttribute('data-quick-guide-label', '');
      visualLabel.setAttribute('aria-hidden', 'true');
      cell.appendChild(visualLabel);
      cell.appendChild(element(ownerDocument, 'span', 'lesson-quick-guide-value', value));
      row.appendChild(cell);
    }

    var body = element(ownerDocument, 'tbody', '');
    for (var itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
      var item = items[itemIndex];
      var row = element(ownerDocument, 'tr', '');
      appendDataCell(row, labels[0], item.action);
      appendDataCell(row, labels[1], item.tool, 'lesson-quick-guide-tool', 'data-quick-guide-tool');
      appendDataCell(row, labels[2], item.reason);
      body.appendChild(row);
    }
    table.appendChild(body);
    wrapper.appendChild(table);
    target.appendChild(wrapper);
  }

  function appendOrderedInsights(ownerDocument, target, items, options) {
    target.appendChild(element(ownerDocument, 'h3', 'lesson-structured-title', options.heading));
    var list = element(ownerDocument, 'ol', 'lesson-insight-list');
    list.setAttribute(options.listAttribute, '');
    for (var index = 0; index < items.length; index += 1) {
      var item = element(ownerDocument, 'li', 'lesson-insight-card');
      item.setAttribute(options.itemAttribute, '');
      item.appendChild(element(ownerDocument, 'h4', 'lesson-insight-title', items[index].title));
      item.appendChild(element(ownerDocument, 'p', 'lesson-insight-body', items[index].body));
      list.appendChild(item);
    }
    target.appendChild(list);
  }

  function appendSupplementalResource(ownerDocument, target, resource) {
    var card = element(ownerDocument, 'aside', 'lesson-supplemental-resource');
    card.setAttribute('aria-label', '补充资料');
    card.appendChild(element(ownerDocument, 'p', 'lesson-supplemental-label', '补充资料'));
    var copy = element(ownerDocument, 'div', 'lesson-supplemental-copy');
    copy.appendChild(element(ownerDocument, 'p', 'lesson-supplemental-description', resource.description));
    var link = element(ownerDocument, 'a', 'lesson-supplemental-link', resource.label + ' →');
    link.setAttribute('href', resource.href);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    copy.appendChild(link);
    card.appendChild(copy);
    target.appendChild(card);
  }

  function appendPromptFormula(ownerDocument, target, formula) {
    var formulaCard = element(ownerDocument, 'aside', 'lesson-prompt-formula');
    formulaCard.setAttribute('data-prompt-formula', '');
    formulaCard.appendChild(element(ownerDocument, 'p', 'lesson-prompt-formula-label', '参考公式怎么对应'));
    formulaCard.appendChild(element(ownerDocument, 'p', 'lesson-prompt-formula-shortcut', formula.shortcut));
    formulaCard.appendChild(element(ownerDocument, 'p', 'lesson-prompt-formula-explanation', formula.explanation));
    target.appendChild(formulaCard);
  }

  function appendPromptCards(ownerDocument, target, cards, options) {
    if (!Array.isArray(cards) || !cards.length) return;
    var group = element(ownerDocument, 'div', 'lesson-prompt-card-group');
    group.setAttribute(options.groupAttribute, '');
    group.appendChild(element(ownerDocument, 'h3', 'lesson-structured-title', options.heading));
    for (var cardIndex = 0; cardIndex < cards.length; cardIndex += 1) {
      var data = cards[cardIndex];
      var card = element(ownerDocument, 'article', 'learning-tool-card lesson-prompt-card');
      card.setAttribute(options.cardAttribute, data.id);
      if (options.contextual) {
        card.className += ' lesson-prompt-theme-' + data.id;
        var hero = element(ownerDocument, 'div', 'lesson-prompt-card-hero');
        hero.className = 'lesson-prompt-card-hero lesson-prompt-theme-' + data.id;
        var heroCopy = element(ownerDocument, 'div', 'lesson-prompt-card-hero-copy');
        heroCopy.appendChild(element(ownerDocument, 'h4', 'lesson-prompt-card-title', data.title));
        heroCopy.appendChild(element(ownerDocument, 'p', 'lesson-prompt-card-summary', data.description));
        hero.appendChild(heroCopy);
        var art = element(ownerDocument, 'img', 'lesson-prompt-card-art');
        art.setAttribute('src', 'images/ai-xiaoa-ch03.webp');
        art.setAttribute('alt', '小 A 把零散信息拼成清晰任务说明的插画');
        art.setAttribute('width', '1200');
        art.setAttribute('height', '800');
        hero.appendChild(art);
        card.appendChild(hero);
      } else {
        card.appendChild(element(ownerDocument, 'h4', 'lesson-prompt-card-title', data.title));
        card.appendChild(element(ownerDocument, 'p', 'lesson-prompt-card-summary', data.summary));
      }
      if (!options.simple && Array.isArray(data.elements)) {
        var mapping = element(ownerDocument, 'dl', 'lesson-prompt-elements');
        for (var elementIndex = 0; elementIndex < data.elements.length; elementIndex += 1) {
          var promptElement = data.elements[elementIndex];
          var elementWrap = element(ownerDocument, 'div', 'lesson-prompt-element');
          elementWrap.setAttribute('data-prompt-element', promptElement.label);
          elementWrap.appendChild(element(ownerDocument, 'dt', '', promptElement.label));
          elementWrap.appendChild(element(ownerDocument, 'dd', '', promptElement.value));
          mapping.appendChild(elementWrap);
        }
        card.appendChild(mapping);
      }
      if (!options.simple && Array.isArray(data.constraints) && data.constraints.length) {
        card.appendChild(element(ownerDocument, 'p', 'lesson-prompt-constraints-title', '限制'));
        var constraints = element(ownerDocument, 'ul', 'lesson-prompt-constraints');
        for (var constraintIndex = 0; constraintIndex < data.constraints.length; constraintIndex += 1) {
          constraints.appendChild(element(ownerDocument, 'li', '', data.constraints[constraintIndex]));
        }
        card.appendChild(constraints);
      }
      var prompt = element(ownerDocument, 'pre', 'lesson-prompt-template', data.prompt);
      prompt.setAttribute('data-template-content', '');
      var actions = element(ownerDocument, 'div', 'learning-tool-actions lesson-prompt-actions');
      var copy = element(ownerDocument, 'button', 'learning-tool-copy', '复制 Prompt');
      copy.setAttribute('type', 'button');
      copy.setAttribute('data-copy-template', '');
      copy.setAttribute('aria-label', '复制' + data.title + ' Prompt');
      var feedback = element(ownerDocument, 'span', 'tool-copy-feedback');
      feedback.setAttribute('data-copy-feedback', '');
      feedback.setAttribute('aria-live', 'polite');
      actions.appendChild(copy);
      actions.appendChild(feedback);
      if (options.simple) {
        card.appendChild(prompt);
        card.appendChild(actions);
      } else {
        var promptDetails = element(ownerDocument, 'details', 'lesson-prompt-details');
        promptDetails.appendChild(element(ownerDocument, 'summary', '', '查看并复制完整 Prompt'));
        promptDetails.appendChild(prompt);
        promptDetails.appendChild(actions);
        card.appendChild(promptDetails);
      }
      group.appendChild(card);
    }
    target.appendChild(group);
  }

  // 左栏始终列出四章，并在当前章下展开稳定锚点对应的小节目录。
  function renderLearningPath(ownerDocument, resolvedId) {
    if (!ownerDocument || typeof ownerDocument.createElement !== 'function' || !isKnownChapter(resolvedId)) return null;
    var path = element(ownerDocument, 'aside', 'learning-path-rail');
    path.setAttribute('data-learning-path', 'left');
    path.setAttribute('aria-label', 'AI 新手入门章节目录');
    path.appendChild(element(ownerDocument, 'h2', 'learning-path-title', '学习目录'));

    var back = element(ownerDocument, 'a', 'learning-path-return');
    back.setAttribute('href', 'learn.html#chapter-' + encodeURIComponent(resolvedId));
    back.style.display = 'inline-flex';
    back.style.alignItems = 'center';
    back.style.gap = '6px';
    back.style.padding = '8px 12px';
    back.style.borderRadius = '8px';
    back.style.background = '#EDF2F8';
    back.style.color = '#2563EB';
    back.style.fontSize = '13px';
    back.style.fontWeight = '700';
    back.style.textDecoration = 'none';
    back.style.marginBottom = '14px';
    back.style.transition = 'background-color 180ms ease';
    back.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex:none"><path d="M15 18l-6-6 6-6"/></svg><span>返回学习目录</span>';
    path.appendChild(back);

    var list = element(ownerDocument, 'ol', 'learning-path-list');
    for (var index = 0; index < chapters.length; index += 1) {
      var chapter = chapters[index];
      var item = element(ownerDocument, 'li', 'learning-path-item');
      item.setAttribute('data-learning-path-item', chapter.id);
      var link = element(ownerDocument, 'a', 'learning-path-link');
      link.setAttribute('href', 'detail.html?type=learn&id=' + encodeURIComponent(chapter.id));
      var identity = element(ownerDocument, 'span', 'learning-path-identity');
      identity.appendChild(element(ownerDocument, 'span', 'learning-path-number', chapter.number));
      identity.appendChild(element(ownerDocument, 'span', 'learning-path-name', chapter.title));
      if (chapter.id === resolvedId) {
        link.setAttribute('aria-current', 'page');
        identity.appendChild(element(ownerDocument, 'span', 'learning-path-current', '当前'));
      }
      link.appendChild(identity);
      item.appendChild(link);
      if (chapter.id === resolvedId) {
        var sublist = element(ownerDocument, 'ol', 'learning-path-sublist');
        sublist.setAttribute('aria-label', chapter.title + '小标题');
        var currentSections = chapterSections(chapter);
        for (var sectionIndex = 0; sectionIndex < currentSections.length; sectionIndex += 1) {
          var section = currentSections[sectionIndex];
          var subitem = element(ownerDocument, 'li', 'learning-path-subitem');
          var sublink = element(ownerDocument, 'a', 'learning-path-sublink', section.title);
          sublink.setAttribute('href', '#' + sectionAnchorId(chapter.id, section.key));
          subitem.appendChild(sublink);
          sublist.appendChild(subitem);
        }
        item.appendChild(sublist);
      }
      list.appendChild(item);
    }
    path.appendChild(list);
    path.addEventListener('click', function (event) {
      var link = event.target.closest('.learning-path-sublink');
      if (!link) return;
      var target = ownerDocument.getElementById((link.getAttribute('href') || '').slice(1));
      var details = target && target.closest('details.lesson-optional-section');
      if (details) details.open = true;
    });
    return path;
  }

  function sectionAnchorId(chapterId, key) {
    return 'sec-' + chapterId + '-' + key;
  }

  function tagLessonSection(node, chapterId, key) {
    if (!node || typeof node.setAttribute !== 'function') return node;
    node.setAttribute('id', sectionAnchorId(chapterId, key));
    node.setAttribute('data-lesson-section', key);
    node.setAttribute('tabindex', '-1');
    return node;
  }

  // 小节读过的判定：标题滚进视口上半部分即算读过。
  // 没有 IntersectionObserver 的浏览器退化为 scroll 采样，两者行为一致。
  /* ScrollSpy 高亮当前目录小节 */
  function updatePathHighlight(chapterId, key) {
    if (!chapterId || !key) return;
    var anchorId = sectionAnchorId(chapterId, key);
    var pathRail = document.querySelector('.learning-path-rail');
    if (!pathRail) return;
    var sublinks = pathRail.querySelectorAll('.learning-path-sublink');
    for (var i = 0; i < sublinks.length; i++) {
      var li = sublinks[i].closest('.learning-path-subitem');
      if (!li) continue;
      var href = sublinks[i].getAttribute('href') || '';
      if (href === '#' + anchorId) {
        li.classList.add('is-active');
        sublinks[i].style.fontWeight = '700';
        sublinks[i].style.color = '#2563EB';
        sublinks[i].style.fontSize = '14.5px';
      } else {
        li.classList.remove('is-active');
        sublinks[i].style.fontWeight = '';
        sublinks[i].style.color = '';
        sublinks[i].style.fontSize = '';
      }
    }
  }

  function observeLessonSections(article, chapterId, onRead) {
    if (!article || typeof article.querySelectorAll !== 'function') return;
    var nodes = article.querySelectorAll('[data-lesson-section]');
    if (!nodes.length) return;

    function markVisible(node) {
      var key = node.getAttribute('data-lesson-section');
      if (key) onRead(key);
      updatePathHighlight(chapterId, key);
    }

    if (typeof window !== 'undefined' && typeof window.IntersectionObserver === 'function') {
      var observer = new window.IntersectionObserver(function (entries) {
        for (var index = 0; index < entries.length; index += 1) {
          if (entries[index].isIntersecting) markVisible(entries[index].target);
        }
      }, { rootMargin: '0px 0px -55% 0px', threshold: 0 });
      for (var observeIndex = 0; observeIndex < nodes.length; observeIndex += 1) observer.observe(nodes[observeIndex]);
      return;
    }

    if (typeof window === 'undefined' || typeof window.addEventListener !== 'function') return;
    var sample = function () {
      var limit = (window.innerHeight || 0) * 0.45;
      for (var index = 0; index < nodes.length; index += 1) {
        if (typeof nodes[index].getBoundingClientRect !== 'function') continue;
        if (nodes[index].getBoundingClientRect().top <= limit) markVisible(nodes[index]);
      }
    };
    window.addEventListener('scroll', sample, { passive: true });
    sample();
  }

  function createLessonNav(ownerDocument, chapter, resolvedId, bottom) {
    var nav = element(ownerDocument, 'nav', bottom ? 'lesson-nav lesson-nav-bottom' : 'lesson-nav');
    nav.setAttribute('aria-label', bottom ? '本章底部导航' : '学习导航');
    var back = element(ownerDocument, 'a', '', '← 返回学习目录');
    back.setAttribute('href', 'learn.html#chapter-' + encodeURIComponent(resolvedId));
    nav.appendChild(back);
    return nav;
  }

  function renderUnknownNotice(target) {
    var ownerDocument = target.ownerDocument || (typeof document !== 'undefined' ? document : null);
    if (!ownerDocument || typeof ownerDocument.createElement !== 'function') return false;
    clearNode(target);
    var section = element(ownerDocument, 'section', 'lesson-moved');
    section.appendChild(element(ownerDocument, 'h1', '', '暂未找到这一章'));
    section.appendChild(element(ownerDocument, 'p', '', '可以返回学习路径，从四个入门章节中重新选择。'));
    var back = element(ownerDocument, 'a', 'lesson-primary-action', '← 返回学习目录');
    back.setAttribute('href', 'learn.html');
    section.appendChild(back);
    target.appendChild(section);
    return true;
  }

  function renderChapter(id, target) {
    var container = resolveTarget(target);
    if (!container) return false;
    if (id === 'ai-companies' || id === 'ai-models') {
      renderMovedNotice(container);
      return true;
    }

    var alias = safeOwnGet(aliases, id);
    var resolvedId = typeof alias === 'string' ? alias : id;
    var chapter = safeOwnGet(chapterById, resolvedId);
    if (!chapter) return renderUnknownNotice(container);
    canonicalizeLearningUrl(id, resolvedId);
    // 这里刻意不再调用 markStarted：打开页面 ≠ 学习中。
    // 章节状态由 markSectionRead 在真正读过 2 个小节后才升为「读到一半」。
    var wasVisited = readSectionCount(resolvedId) > 0;
    var resumeKey = lastSectionKey(resolvedId);
    var alreadySeen = getStatus(resolvedId) === STATUS_SEEN;
    var hostCard = container.parentNode;
    if (hostCard && typeof hostCard.className === 'string' && hostCard.className.split(/\s+/).indexOf('learning-detail-card') < 0) {
      hostCard.className += ' learning-detail-card';
    }
    // 学习详情页要用全站宽度，而不是单栏阅读页的 860px。
    var readingShell = hostCard && hostCard.parentNode ? hostCard.parentNode : null;
    if (readingShell && readingShell.classList && readingShell.classList.contains('reading-shell')) {
      readingShell.classList.add('learning-reading-shell');
    }
    var ownerDocument = container.ownerDocument || (typeof document !== 'undefined' ? document : null);
    if (!ownerDocument || typeof ownerDocument.createElement !== 'function') return false;
    clearNode(container);

    var previousId = null;
    var nextId = null;
    for (var index = 0; index < chapters.length; index += 1) {
      if (chapters[index].id !== resolvedId) continue;
      if (chapters[index - 1]) previousId = chapters[index - 1].id;
      if (chapters[index + 1]) nextId = chapters[index + 1].id;
      break;
    }

    var layout = element(ownerDocument, 'div', 'learning-detail-layout');
    layout.appendChild(renderLearningPath(ownerDocument, resolvedId));
    var article = element(ownerDocument, 'article', 'lesson');
    article.setAttribute('data-chapter-id', resolvedId);

    var header = element(ownerDocument, 'header', 'lesson-header');
    header.appendChild(element(ownerDocument, 'p', 'lesson-kicker', '第 ' + Number(chapter.number) + ' 章 · 共 ' + chapterSections(chapter).length + ' 节'));
    header.appendChild(element(ownerDocument, 'h1', '', chapter.title));
    if (chapter.description) header.appendChild(element(ownerDocument, 'p', '', chapter.description));
    article.appendChild(header);

    // 回到读过的章节时，给一个明确的续读入口，但不自动滚动——
    // 自动跳转会让人失去位置感，把选择权留给用户。
    var resumeBanner = null;
    if (alreadySeen || (wasVisited && resumeKey)) {
      resumeBanner = element(ownerDocument, 'aside', 'lesson-resume');
      resumeBanner.setAttribute('data-lesson-resume', '');
      var resumeText = element(ownerDocument, 'p', 'lesson-resume-text');
      if (alreadySeen) {
        resumeText.textContent = '这一章已经完成。';
      } else {
        resumeText.textContent = '上次读到「' + sectionTitle(resolvedId, resumeKey) + '」。';
      }
      resumeBanner.appendChild(resumeText);
      var resumeActions = element(ownerDocument, 'div', 'lesson-resume-actions');
      if (alreadySeen) {
        var toTakeaway = element(ownerDocument, 'a', 'lesson-resume-link', '直接看要点');
        toTakeaway.setAttribute('href', '#' + sectionAnchorId(resolvedId, 'ta'));
        resumeActions.appendChild(toTakeaway);
      }
      if (resumeKey) {
        var toResume = element(ownerDocument, 'a', 'lesson-resume-link', alreadySeen ? '回到上次位置' : '跳到那里');
        toResume.setAttribute('href', '#' + sectionAnchorId(resolvedId, resumeKey));
        resumeActions.appendChild(toResume);
      }
      var fromTop = element(ownerDocument, 'button', 'lesson-resume-dismiss', '从头读起');
      fromTop.setAttribute('type', 'button');
      resumeActions.appendChild(fromTop);
      resumeBanner.appendChild(resumeActions);
      article.appendChild(resumeBanner);
      fromTop.addEventListener('click', function () {
        resumeBanner.hidden = true;
      });
    }

    // 章首图可选。矢量图优先：它和本章内容直接相关，改文案不用重新导图。
    if (chapter.heroSvg) {
      var heroFigure = element(ownerDocument, 'figure', 'lesson-figure lesson-figure-svg');
      var heroImg = element(ownerDocument, 'img', '');
      heroImg.setAttribute('src', chapter.heroSvg.src);
      heroImg.setAttribute('alt', chapter.heroSvg.alt);
      heroImg.setAttribute('loading', 'eager');
      heroFigure.appendChild(heroImg);
      if (chapter.heroSvg.caption) {
        var heroCap = element(ownerDocument, 'figcaption', '', chapter.heroSvg.caption);
        heroCap.setAttribute('aria-hidden', 'true');
        heroFigure.appendChild(heroCap);
      }
      article.appendChild(heroFigure);
    }
    if (chapter.image) {
      var figure = element(ownerDocument, 'figure', 'lesson-figure');
      var picture = element(ownerDocument, 'picture', '');
      var source = element(ownerDocument, 'source', '');
      source.setAttribute('srcset', chapter.image.webp);
      source.setAttribute('type', 'image/webp');
      var image = element(ownerDocument, 'img', '');
      image.setAttribute('src', chapter.image.fallback);
      image.setAttribute('alt', chapter.image.alt);
      image.setAttribute('width', String(chapter.image.width));
      image.setAttribute('height', String(chapter.image.height));
      image.setAttribute('loading', 'eager');
      picture.appendChild(source);
      picture.appendChild(image);
      figure.appendChild(picture);
      var figcaption = element(ownerDocument, 'figcaption', '', chapter.image.caption);
      figcaption.setAttribute('aria-hidden', 'true');
      figure.appendChild(figcaption);
      article.appendChild(figure);
    }

    var content = element(ownerDocument, 'div', 'lesson-content');
    var readingGuide = element(ownerDocument, 'p', 'lesson-reading-guide', '先看前两节和“本章要点”就能掌握核心；更多案例和原理按需展开。');
    article.appendChild(readingGuide);
    for (var sectionIndex = 0; sectionIndex < chapter.sections.length; sectionIndex += 1) {
      var sectionData = chapter.sections[sectionIndex];
      var optionalDetails = null;
      if (sectionIndex >= 2) {
        optionalDetails = element(ownerDocument, 'details', 'lesson-optional-section');
        var optionalSummary = element(ownerDocument, 'summary', '');
        optionalSummary.appendChild(element(ownerDocument, 'span', 'lesson-optional-label', '按需展开'));
        optionalSummary.appendChild(ownerDocument.createTextNode(sectionData.title));
        optionalDetails.appendChild(optionalSummary);
      }
      var section = element(ownerDocument, 'section', 'lesson-core-section');
      tagLessonSection(section, resolvedId, 'c' + sectionIndex);
      section.appendChild(element(ownerDocument, 'h2', '', sectionData.title));
      appendParagraphs(ownerDocument, section, sectionData.paragraphs);
      if (Array.isArray(sectionData.bullets)) appendBulletList(ownerDocument, section, sectionData.bullets);
      if (Array.isArray(sectionData.quickGuide)) appendQuickGuide(ownerDocument, section, sectionData.quickGuide);
      if (Array.isArray(sectionData.memoryRisks)) {
        appendOrderedInsights(ownerDocument, section, sectionData.memoryRisks, {
          heading: '“凭记忆回答”会带来三个问题',
          listAttribute: 'data-memory-risks',
          itemAttribute: 'data-memory-risk',
        });
      }
      if (Array.isArray(sectionData.verificationHabits)) {
        appendOrderedInsights(ownerDocument, section, sectionData.verificationHabits, {
          heading: '三个核验习惯，今天就能用',
          listAttribute: 'data-verification-habits',
          itemAttribute: 'data-verification-habit',
        });
      }
      if (sectionData.supplementalResource) appendSupplementalResource(ownerDocument, section, sectionData.supplementalResource);
      if (sectionData.promptFormula) appendPromptFormula(ownerDocument, section, sectionData.promptFormula);
      if (Array.isArray(sectionData.promptExamples)) {
        appendPromptCards(ownerDocument, section, sectionData.promptExamples, {
          heading: '两个工作 Prompt 示例',
          groupAttribute: 'data-prompt-examples',
          cardAttribute: 'data-prompt-example',
          simple: true,
        });
      }
      if (Array.isArray(sectionData.copyPrompts)) {
        appendPromptCards(ownerDocument, section, sectionData.copyPrompts, {
          heading: '直接复制这段话',
          groupAttribute: 'data-copy-prompts',
          cardAttribute: 'data-copy-prompt',
          simple: true,
        });
      }
      if (Array.isArray(sectionData.promptTemplates)) {
        appendPromptCards(ownerDocument, section, sectionData.promptTemplates, {
          heading: '可直接复用的情境 Prompt',
          groupAttribute: 'data-prompt-templates',
          cardAttribute: 'data-prompt-template',
          contextual: true,
        });
      }
      if (Array.isArray(sectionData.scenes)) appendCapabilityScenes(ownerDocument, section, sectionData.scenes);
      if (Array.isArray(sectionData.compare)) appendBoundaryComparison(ownerDocument, section, sectionData);
      if (sectionData.quadrant) appendTrustQuadrant(ownerDocument, section, sectionData.quadrant);
      // 小节级演示：每个小节都该有可看可玩的东西，正文只是骨架。
      var sectionDemos = [sectionData.demo, sectionData.demo2];
      for (var demoIndex = 0; demoIndex < sectionDemos.length; demoIndex += 1) {
        if (!sectionDemos[demoIndex]) continue;
        var demoRenderer = safeOwnGet(demoRenderers, sectionDemos[demoIndex].type);
        if (typeof demoRenderer === 'function') demoRenderer(ownerDocument, section, sectionDemos[demoIndex]);
      }
      if (optionalDetails) {
        optionalDetails.appendChild(section);
        content.appendChild(optionalDetails);
      } else {
        content.appendChild(section);
      }
    }
    article.appendChild(content);

    if (chapter.historyTimeline) {
      var historyDetails = element(ownerDocument, 'details', 'lesson-history');
      historyDetails.appendChild(element(ownerDocument, 'summary', '', chapter.historyTimeline.title));
      renderTimelineDemo(ownerDocument, historyDetails, chapter.historyTimeline);
      article.appendChild(historyDetails);
    }

    if (chapter.caseStudy) {
      var caseSection = element(ownerDocument, 'section', 'lesson-case');
      tagLessonSection(caseSection, resolvedId, 'case');
      caseSection.appendChild(element(ownerDocument, 'p', 'lesson-section-label', '工作案例'));
      caseSection.appendChild(element(ownerDocument, 'h2', '', chapter.caseStudy.title));
      caseSection.appendChild(element(ownerDocument, 'p', '', chapter.caseStudy.situation));
      var lesson = element(ownerDocument, 'p', '');
      lesson.appendChild(element(ownerDocument, 'strong', '', '关键启发：'));
      lesson.appendChild(ownerDocument.createTextNode(chapter.caseStudy.lesson));
      caseSection.appendChild(lesson);
      article.appendChild(caseSection);
    }

    var exerciseSection = null, feedback = null, revealExercise = null;
    if (chapter.exercise) {
      exerciseSection = element(ownerDocument, 'section', 'lesson-exercise');
      tagLessonSection(exerciseSection, resolvedId, 'ex');
      exerciseSection.setAttribute('data-exercise-type', chapter.exercise.type);
      exerciseSection.appendChild(element(ownerDocument, 'p', 'lesson-section-label', '2–5 分钟小练习'));
      exerciseSection.appendChild(element(ownerDocument, 'h2', '', chapter.exercise.title));
      exerciseSection.appendChild(element(ownerDocument, 'p', '', chapter.exercise.instruction));
      feedback = element(ownerDocument, 'div', 'lesson-feedback');
      feedback.setAttribute('aria-live', 'polite');
      exerciseSection.appendChild(feedback);
      var renderer = safeOwnGet(exerciseRenderers, chapter.exercise.type);
      if (typeof renderer === 'function') renderer(chapter.exercise, exerciseSection);
      var exerciseHelp = interactionFieldset(ownerDocument, '需要一点提示吗？', 'lesson-exercise-help');
      var exerciseReference = element(ownerDocument, 'p', 'lesson-exercise-reference', '先看任务目标，再对照材料、责任边界与证据。可以反复尝试，不必追求一次答对。');
      exerciseReference.setAttribute('data-exercise-reference', '');
      exerciseReference.hidden = true;
      exerciseHelp.appendChild(exerciseReference);
      revealExercise = element(ownerDocument, 'button', 'lesson-secondary-action', '查看参考思路');
      revealExercise.setAttribute('type', 'button');
      revealExercise.setAttribute('data-exercise-reveal', '');
      exerciseHelp.appendChild(revealExercise);
      exerciseSection.appendChild(exerciseHelp);
      article.appendChild(exerciseSection);
    }

    if (chapter.quickCheck) {
      var checkSection = element(ownerDocument, 'section', 'lesson-check');
      tagLessonSection(checkSection, resolvedId, 'qc');
      checkSection.appendChild(element(ownerDocument, 'p', 'lesson-section-label', '快速想一想'));
      checkSection.appendChild(element(ownerDocument, 'h2', '', '不计分，对照思路就好'));
      for (var checkIndex = 0; checkIndex < chapter.quickCheck.length; checkIndex += 1) {
        var check = chapter.quickCheck[checkIndex];
        var details = element(ownerDocument, 'details', 'lesson-check-item');
        details.appendChild(element(ownerDocument, 'summary', '', check.question));
        var answer = element(ownerDocument, 'p', '');
        answer.appendChild(element(ownerDocument, 'strong', '', check.answer));
        details.appendChild(answer);
        details.appendChild(element(ownerDocument, 'p', '', check.explanation));
        checkSection.appendChild(details);
      }
      article.appendChild(checkSection);
    }

    var takeaway = element(ownerDocument, 'aside', 'lesson-takeaway');
    tagLessonSection(takeaway, resolvedId, 'ta');
    takeaway.appendChild(element(ownerDocument, 'p', 'lesson-section-label', '这一章你带走什么'));
    takeaway.appendChild(element(ownerDocument, 'h2', '', chapter.takeaway.title));
    if (chapter.takeaway.items) appendBulletList(ownerDocument, takeaway, chapter.takeaway.items);
    var template = element(ownerDocument, 'pre', 'lesson-template', chapter.takeaway.template);
    template.setAttribute('tabindex', '0');
    template.setAttribute('data-template-content', '');
    takeaway.appendChild(template);
    if (chapter.takeaway.supplementalResource) {
      appendSupplementalResource(ownerDocument, takeaway, chapter.takeaway.supplementalResource);
    }
    if (resolvedId === 'ai-delegation' || resolvedId === 'ai-prompting' || resolvedId === 'ai-boundaries') {
      var takeawayActions = element(ownerDocument, 'div', 'lesson-takeaway-actions');
      var copyButton = element(ownerDocument, 'button', 'lesson-secondary-action', '复制模板');
      copyButton.setAttribute('type', 'button');
      copyButton.setAttribute('data-copy-template', '');
      copyButton.setAttribute('data-lesson-copy', '');
      var copyFeedback = element(ownerDocument, 'span', 'tool-copy-feedback');
      copyFeedback.setAttribute('data-copy-feedback', '');
      copyFeedback.setAttribute('aria-live', 'polite');
      takeawayActions.appendChild(copyButton);
      takeawayActions.appendChild(copyFeedback);
      takeaway.appendChild(takeawayActions);
    }
    article.appendChild(takeaway);

    var liveStatus = element(ownerDocument, 'p', 'lesson-status-live');
    liveStatus.setAttribute('aria-live', 'polite');
    liveStatus.setAttribute('data-lesson-status', '');
    article.appendChild(liveStatus);
    var nextActionRef = null;
    function setNextLocked(locked) {
      if (!nextActionRef) return;
      nextActionRef.setAttribute('data-next-locked', locked ? 'true' : 'false');
      nextActionRef.setAttribute('aria-disabled', locked ? 'true' : 'false');
      nextActionRef.textContent = locked ? '下一章（先确认完成）' : '下一章';
    }
    var actions = element(ownerDocument, 'div', 'lesson-actions');
    var seenButton = element(ownerDocument, 'button', '', getStatus(resolvedId) === STATUS_SEEN ? '已完成' : '标记为已完成');
    seenButton.setAttribute('type', 'button');
    seenButton.setAttribute('data-mark-seen', '');
    if (getStatus(resolvedId) === STATUS_SEEN) seenButton.setAttribute('aria-pressed', 'true');
    actions.appendChild(seenButton);
    if (previousId) {
      var previousAction = element(ownerDocument, 'a', 'lesson-secondary-action', '上一章');
      previousAction.setAttribute('href', 'detail.html?type=learn&id=' + encodeURIComponent(previousId));
      actions.appendChild(previousAction);
    }
    if (nextId) {
      var nextAction = element(ownerDocument, 'a', 'lesson-primary-action', '下一章');
      nextAction.setAttribute('href', 'detail.html?type=learn&id=' + encodeURIComponent(nextId));
      actions.appendChild(nextAction);
      // 要先确认「我看完了」才能进下一章。链接始终可见（不是分数门槛，
      // 只是一次完成确认），但在确认前点击会把你带回上面那个按钮。
      nextActionRef = nextAction;
      setNextLocked(getStatus(resolvedId) !== STATUS_SEEN);
      nextAction.addEventListener('click', function (event) {
        if (nextAction.getAttribute('data-next-locked') !== 'true') return;
        event.preventDefault();
        liveStatus.textContent = '先点上面的「标记为已完成」，再进入下一章。';
        try {
          if (typeof seenButton.scrollIntoView === 'function') seenButton.scrollIntoView({ block: 'center', behavior: returnScrollBehavior() });
          if (typeof seenButton.focus === 'function') seenButton.focus({ preventScroll: true });
        } catch (error) {}
      });
    }
    var returnAction = element(ownerDocument, 'a', '', '返回学习路径');
    returnAction.setAttribute('href', 'learn.html#chapter-' + encodeURIComponent(resolvedId));
    actions.appendChild(returnAction);
    article.appendChild(actions);
    article.appendChild(createLessonNav(ownerDocument, chapter, resolvedId, true));
    layout.appendChild(article);
    container.appendChild(layout);
    bindCopyTools(article);

    function enableCompletion(message) {
      seenButton.disabled = false;
      if (feedback && feedback.textContent !== message) feedback.textContent = message;
      if (liveStatus.textContent !== message) liveStatus.textContent = message;
    }

    // 练习不再单独堆在章末，所以小节里的演示互动同样算「有意义的推进」，
    // 玩过任意一个演示就可以确认看完。
    article.addEventListener('learning-exercise-attempt', function (event) {
      // 只解锁「我看完了」，不把提示写到章末状态条——那句话该留在演示里
      seenButton.disabled = false;
    });

    observeLessonSections(article, resolvedId, function (key) {
      var before = readSectionCount(resolvedId);
      markSectionRead(resolvedId, key);
      if (readSectionCount(resolvedId) === before) return;
      // 读到最后一节（带走要点）也算一次有意义的推进，允许标记看完。
      if (key === 'ta' && seenButton.disabled) {
        enableCompletion('已读到本章要点。可以标记为已完成，也可以回上面再做一次练习。');
      }
    });
    if (revealExercise) revealExercise.addEventListener('click', function () {
      exerciseReference.hidden = false;
      enableCompletion('已查看参考思路。你可以继续尝试，也可以标记为已完成。');
      revealExercise.disabled = true;
      var moveFocusToCompletion = function () {
        try {
          if (typeof seenButton.scrollIntoView === 'function') seenButton.scrollIntoView({ block: 'center', behavior: 'auto' });
        } catch (error) {}
        try {
          if (typeof seenButton.focus === 'function') seenButton.focus({ preventScroll: true });
        } catch (error) {}
      };
      try {
        if (typeof setTimeout === 'function') setTimeout(moveFocusToCompletion, 0);
        else moveFocusToCompletion();
      } catch (error) {
        moveFocusToCompletion();
      }
    });
    if (exerciseSection) exerciseSection.addEventListener('learning-exercise-attempt', function (event) {
      var message = event && event.detail && event.detail.message
        ? event.detail.message
        : '已完成一次练习尝试。你可以继续调整，也可以标记为已完成。';
      enableCompletion(message);
    });
    var checkItems = chapter.quickCheck ? checkSection.querySelectorAll('details') : [];
    for (var itemIndex = 0; itemIndex < checkItems.length; itemIndex += 1) {
      checkItems[itemIndex].addEventListener('toggle', function (event) {
        if (event.currentTarget.open) enableCompletion('已查看快速自测思路，你可以继续尝试或标记为已完成。');
      });
    }
    seenButton.addEventListener('click', function () {
      // 主动标记看完时补齐小节进度，让目录页和续读状态保持同一口径。
      var allSections = chapterSections(chapter);
      for (var sectionKeyIndex = 0; sectionKeyIndex < allSections.length; sectionKeyIndex += 1) {
        markSectionRead(resolvedId, allSections[sectionKeyIndex].key);
      }
      markSeen(resolvedId);
      setNextLocked(false);
      seenButton.textContent = '已完成';
      seenButton.setAttribute('aria-pressed', 'true');
      liveStatus.textContent = '本章已完成。你可以继续下一章，也可以随时返回学习路径。';
    });
    return true;
  }

  window.AIBeginner = {
    chapters: chapters,
    aliases: aliases,
    faqGroups: faqGroups,
    getStatus: getStatus,
    markStarted: markStarted,
    markSeen: markSeen,
    markSectionRead: markSectionRead,
    chapterSections: chapterSections,
    readSectionCount: readSectionCount,
    totalSectionCount: totalSectionCount,
    lastSectionKey: lastSectionKey,
    lastChapterId: lastChapterId,
    hasSessionHistory: hasSessionHistory,
    resumeChapterId: resumeChapterId,
    nextIncomplete: nextIncomplete,
    initHub: initHub,
    refreshHub: function (root) { memoryState = null; return initHub(root); },
    initFaq: initFaq,
    initRouteCards: initRouteCards,
    renderChapter: renderChapter,
    renderTokenPrediction: renderTokenPrediction,
    renderEvidenceSpotter: renderEvidenceSpotter,
    renderDelegationSorter: renderDelegationSorter,
    renderPromptBuilder: renderPromptBuilder,
    renderClaimClassifier: renderClaimClassifier,
    renderWorkflowSorter: renderWorkflowSorter,
  };
}());
