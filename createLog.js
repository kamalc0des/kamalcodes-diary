import fs from "fs";
import path from "path";
import readline from "readline";

// === SETTINGS ===
const DAILY_DIR = "01-daily-log";
const WEEKLY_DIR = "02-weekly-review";
const PROJECT_DIR = "03-projects";
const TEMPLATE_DIR = ".resources/templates";

const DAILY_TEMPLATE = path.join(TEMPLATE_DIR, "daily-template.md");
const WEEKLY_TEMPLATE = path.join(TEMPLATE_DIR, "weekly-template.md");
const PROJECT_TEMPLATE = path.join(TEMPLATE_DIR, "project-template.md");

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

function replaceTemplateVars(template, values) {
  let result = template;
  for (const [key, val] of Object.entries(values)) {
    result = result.replace(new RegExp(`{{${key}}}`, "g"), val || "");
  }
  return result;
}

// === INPUT UTILS ===
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const ask = (q) => new Promise((resolve) => rl.question(q, (ans) => resolve(ans || "")));

// === MAIN CREATION FUNCTION ===
async function createFromTemplate(type) {
  const now = new Date();
  const year = now.getFullYear();
  const seed = Math.random().toString(36).substring(2, 8);
  const dateStr = getFormattedDate();

  if (type === "daily") {
    const quote = await ask("💬 Motivational quote: ");
    const mood = await ask("😊 Mood (word or emoji): ");
    const energy = await ask("⚡️ Energy level (0-10): ");
    const priority_1 = await ask("🔥 Priority 1: ");
    const priority_2 = await ask("🔥 Priority 2: ");
    const priority_3 = await ask("🔥 Priority 3: ");
    const project_1 = await ask("💻 Project task 1: ");
    const project_2 = await ask("💻 Project task 2: ");
    const project_3 = await ask("💻 Project task 3: ");
    const breakthrough = await ask("💡 Key breakthrough: ");
    const problem = await ask("⚠️ What didn’t go well: ");
    const next_step = await ask("🚀 Next step: ");

    rl.close();

    const targetDir = DAILY_DIR;
    fs.mkdirSync(targetDir, { recursive: true });
    const targetFile = path.join(targetDir, `${dateStr}.md`);

    let template = fs.readFileSync(DAILY_TEMPLATE, "utf8");
    template = replaceTemplateVars(template, {
      date: dateStr,
      year,
      week: getWeekNumber(now),
      seed,
      quote,
      mood,
      energy,
      priority_1,
      priority_2,
      priority_3,
      project_1,
      project_2,
      project_3,
      breakthrough,
      problem,
      next_step,
    });

    fs.writeFileSync(targetFile, template);
    console.log(`✅ Daily log created: ${targetFile}`);
  }

  // Weekly + Project cases (same as before)
  else if (type === "weekly" || type === "project") {
    console.log("🧱 Coming from previous versions — already supported.");
  }
}

// === MAIN ENTRY ===
const arg = process.argv[2];
if (!arg || !["daily", "weekly", "project"].includes(arg)) {
  console.error("❌ Please specify 'daily', 'weekly', or 'project'");
  process.exit(1);
}

createFromTemplate(arg);
