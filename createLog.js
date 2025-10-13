import fs from "fs";
import path from "path";

// === SETTINGS ===
const DAILY_DIR = "01-daily-log";
const WEEKLY_DIR = "02-weekly-review";
const TEMPLATE_DIR = ".resources/templates";
const DAILY_TEMPLATE = path.join(TEMPLATE_DIR, "daily-template.md");
const WEEKLY_TEMPLATE = path.join(TEMPLATE_DIR, "weekly-template.md");

// === HELPERS ===
function getFormattedDate() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  return `${year}-${month}-${day}`;
}

function getWeekNumber(date) {
  const firstThursday = new Date(date.getFullYear(), 0, 4);
  const dayOfWeek = (date.getDay() + 6) % 7;
  const firstThursdayDayOfWeek = (firstThursday.getDay() + 6) % 7;
  const diff =
    (date - firstThursday) / 86400000 + (firstThursdayDayOfWeek - dayOfWeek);
  return String(1 + Math.floor(diff / 7)).padStart(2, "0");
}

// Replace placeholders like {{date}}, {{year}}, {{week}}, {{seed}}
function replaceTemplateVars(template, values) {
  return template
    .replace(/{{date}}/g, values.date)
    .replace(/{{year}}/g, values.year)
    .replace(/{{week}}/g, values.week)
    .replace(/{{seed}}/g, values.seed);
}

function createFromTemplate(type) {
  const now = new Date();
  const year = now.getFullYear();
  const seed = Math.random().toString(36).substring(2, 8); // random 6-char id

  if (type === "daily") {
    const dateStr = getFormattedDate();
    const targetDir = DAILY_DIR;
    const targetFile = path.join(targetDir, `${dateStr}.md`);
    fs.mkdirSync(targetDir, { recursive: true });

    let template = fs.readFileSync(DAILY_TEMPLATE, "utf8");
    template = replaceTemplateVars(template, {
      date: dateStr,
      year,
      week: getWeekNumber(now),
      seed,
    });

    fs.writeFileSync(targetFile, template);
    console.log(`✅ Daily log created: ${targetFile}`);
  }

  if (type === "weekly") {
    const week = getWeekNumber(now);
    const targetDir = WEEKLY_DIR;
    const targetFile = path.join(targetDir, `week-${week}-${year}.md`);
    fs.mkdirSync(targetDir, { recursive: true });

    let template = fs.readFileSync(WEEKLY_TEMPLATE, "utf8");
    template = replaceTemplateVars(template, {
      date: getFormattedDate(),
      year,
      week,
      seed,
    });

    fs.writeFileSync(targetFile, template);
    console.log(`✅ Weekly recap created: ${targetFile}`);
  }
}

// === MAIN ===
const arg = process.argv[2];
if (!arg || !["daily", "weekly"].includes(arg)) {
  console.error("❌ Please specify 'daily' or 'weekly'");
  process.exit(1);
}

createFromTemplate(arg);
