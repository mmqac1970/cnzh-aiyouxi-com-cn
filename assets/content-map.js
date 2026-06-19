const contentMap = {
  site: "https://cnzh-aiyouxi.com.cn",
  primaryTag: "爱游戏",
  sections: [
    {
      id: "action-games",
      title: "动作游戏分区",
      tags: ["动作", "格斗", "冒险", "爱游戏"],
      keywords: ["拳皇", "街霸", "忍者", "战神"]
    },
    {
      id: "puzzle-games",
      title: "益智游戏分区",
      tags: ["益智", "解谜", "休闲", "爱游戏"],
      keywords: ["数独", "连连看", "消消乐", "推箱子"]
    },
    {
      id: "rpg-games",
      title: "角色扮演分区",
      tags: ["角色扮演", "剧情", "开放世界", "爱游戏"],
      keywords: ["勇者", "魔法", "王国", "传说"]
    },
    {
      id: "strategy-games",
      title: "策略游戏分区",
      tags: ["策略", "战棋", "模拟", "爱游戏"],
      keywords: ["三国", "帝国", "文明", "战术"]
    }
  ],
  filters: [
    { label: "全部", query: "" },
    { label: "动作", query: "action" },
    { label: "益智", query: "puzzle" },
    { label: "角色扮演", query: "rpg" },
    { label: "策略", query: "strategy" }
  ]
};

function searchContent(query) {
  if (!query || query.trim() === "") return [];
  const q = query.toLowerCase();
  const results = [];
  for (const section of contentMap.sections) {
    const matchTitle = section.title.toLowerCase().includes(q);
    const matchTag = section.tags.some(t => t.toLowerCase().includes(q));
    const matchKeyword = section.keywords.some(k => k.toLowerCase().includes(q));
    if (matchTitle || matchTag || matchKeyword) {
      results.push(section);
    }
  }
  return results;
}

function getSectionById(id) {
  return contentMap.sections.find(s => s.id === id) || null;
}

function getFilteredSections(filterQuery) {
  if (!filterQuery) return contentMap.sections;
  return contentMap.sections.filter(s =>
    s.tags.some(t => t.toLowerCase() === filterQuery.toLowerCase())
  );
}

function listAllTags() {
  const tagSet = new Set();
  for (const section of contentMap.sections) {
    for (const tag of section.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet);
}

function listAllKeywords() {
  const kwSet = new Set();
  for (const section of contentMap.sections) {
    for (const kw of section.keywords) {
      kwSet.add(kw);
    }
  }
  return Array.from(kwSet);
}

function countSectionsByTag(tag) {
  let count = 0;
  for (const section of contentMap.sections) {
    if (section.tags.includes(tag)) count++;
  }
  return count;
}

function suggestSections(input) {
  const q = input.toLowerCase();
  return contentMap.sections.filter(s => {
    const titleMatch = s.title.toLowerCase().includes(q);
    const tagMatch = s.tags.some(t => t.toLowerCase().includes(q));
    const keywordMatch = s.keywords.some(k => k.toLowerCase().includes(q));
    return titleMatch || tagMatch || keywordMatch;
  });
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    contentMap,
    searchContent,
    getSectionById,
    getFilteredSections,
    listAllTags,
    listAllKeywords,
    countSectionsByTag,
    suggestSections
  };
}