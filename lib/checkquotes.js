const fs = require('fs');
const path = require('path');

// 1. 读取文件内容
const filePath = path.join(__dirname, 'quotes-data.ts');
let content = fs.readFileSync(filePath, 'utf8');

console.log("🔍 开始检测数据质量...\n");

// 2. 语法预检：检查括号匹配
const openBrackets = (content.match(/\[/g) || []).length;
const closeBrackets = (content.match(/\]/g) || []).length;

if (openBrackets !== closeBrackets) {
    console.error(`❌ 语法错误：中括号不匹配！(左括号: ${openBrackets}, 右括号: ${closeBrackets})`);
    console.error("💡 请检查代码中是否有多余的 '[' 或漏掉的 ']'。\n");
}

// 3. 提取数据进行逻辑分析
// 使用正则表达式匹配 quote_content 的内容
const quoteRegex = /"quote_content":\s*"([^"]+)"/g;
const sourceRegex = /"quote_source":\s*"([^"]+)"/g;

let match;
const quotes = [];
const contents = new Set();
const duplicates = [];
const sources = new Set();

while ((match = quoteRegex.exec(content)) !== null) {
    const text = match[1];
    if (contents.has(text)) {
        duplicates.push(text);
    } else {
        contents.add(text);
    }
    quotes.push(text);
}

// 4. 输出结果汇总
console.log(`📊 统计信息：`);
console.log(`- 总格言数：${quotes.length} 条`);
console.log(`- 唯一格言数：${contents.size} 条`);

if (duplicates.length > 0) {
    console.warn(`\n⚠️  发现重复内容 (${duplicates.length} 处)：`);
    duplicates.forEach((text, i) => {
        console.warn(`   ${i + 1}. ${text.substring(0, 20)}...`);
    });
} else {
    console.log(`✅ 未发现重复格言。`);
}

// 5. 建议的出处规范化检查
const sourceVariations = {
    "《心经》": "《般若波罗蜜多心经》",
    "《维摩诘经》": "《维摩诘所说经》"
};

console.log(`\n🧐 出处名称规范检查：`);
let sourceMatch;
let foundIssues = false;
while ((sourceMatch = sourceRegex.exec(content)) !== null) {
    const s = sourceMatch[1];
    if (sourceVariations[s]) {
        console.warn(`⚠️  建议统一：发现 "${s}"，建议改为 "${sourceVariations[s]}"`);
        foundIssues = true;
    }
}
if (!foundIssues) console.log(`✅ 出处名称已规范。`);

console.log("\n🚀 检测完成！");