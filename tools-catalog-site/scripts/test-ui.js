// DOM integration smoke test — run with: node scripts/test-ui.js
// Loads index.html + search-core.js + script.js under jsdom with a stubbed
// fetch, then asserts the page renders rows, builds the Task filter, and that
// searching surfaces the right tools (incl. the previously-broken TARDIS case).
const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const ROOT = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const toolsData = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "tools.json"), "utf8"));
const searchCoreSrc = fs.readFileSync(path.join(ROOT, "assets", "search-core.js"), "utf8");
const scriptSrc = fs.readFileSync(path.join(ROOT, "assets", "script.js"), "utf8");

let pass = 0, fail = 0;
function ok(c, m) { if (c) pass++; else { fail++; console.log("  ✗ FAIL: " + m); } }
const wait = (ms) => new Promise(r => setTimeout(r, ms));

(async function () {
  const dom = new JSDOM(html, { runScripts: "outside-only", pretendToBeVisual: true, url: "https://example.org/" });
  const { window } = dom;
  // stub fetch to serve the local tools.json
  window.fetch = () => Promise.resolve({ json: () => Promise.resolve(toolsData) });

  window.eval(searchCoreSrc);   // -> window.SearchCore
  window.eval(scriptSrc);       // -> IIFE runs init() -> loadData() (async)
  await wait(150);              // let the fetch microtask + render settle

  const doc = window.document;
  const rows = () => Array.from(doc.querySelectorAll("#tools-tbody tr"));
  const rowNames = () => rows().map(tr => tr.querySelector(".tool-name").textContent);

  // 1. Renders all tools on load
  ok(rows().length === toolsData.tools.length, `should render all ${toolsData.tools.length} rows (got ${rows().length})`);

  // 2. Task filter chips were built from the controlled vocab
  const taskChips = Array.from(doc.querySelectorAll("#filter-task .chip")).map(c => c.getAttribute("data-value"));
  ok(taskChips.includes("Filament segmentation"), "Task filter should include 'Filament segmentation' chip");
  ok(taskChips.includes("Membrane segmentation"), "Task filter should include 'Membrane segmentation' chip");
  ok(taskChips.length >= 10, `Task filter should have many chips (got ${taskChips.length})`);

  // 3. Tool-count + results-count populated
  ok(/84 tools/.test(doc.querySelector("#meta-tool-count").textContent), "meta tool count should read 84");

  // 4. Typing a synonym query surfaces TARDIS and ranks sensibly
  const search = doc.querySelector("#search");
  function type(v) {
    search.value = v;
    search.dispatchEvent(new window.Event("input", { bubbles: true }));
  }
  type("microtubule");
  ok(rowNames().includes("TARDIS-EM"), `searching "microtubule" should surface TARDIS-EM (rows: ${rowNames().slice(0,5)})`);

  type("membrane");
  ok(rowNames().includes("TARDIS-EM") && rowNames().includes("MemBrain-seg"), `"membrane" should surface TARDIS-EM + MemBrain-seg`);

  type("TARDIS");
  ok(rowNames()[0] === "TARDIS-EM", `exact "TARDIS" should rank first (got ${rowNames()[0]})`);

  type("zzzqqx");
  ok(rows().length === 0 && !doc.querySelector("#empty-state").hidden, "gibberish shows empty state");

  // 5. Clicking the Task 'Filament segmentation' chip filters to include TARDIS
  type("");
  const filChip = Array.from(doc.querySelectorAll("#filter-task .chip")).find(c => c.getAttribute("data-value") === "Filament segmentation");
  filChip.dispatchEvent(new window.Event("click", { bubbles: true }));
  await wait(20);
  ok(rowNames().includes("TARDIS-EM"), "Task=Filament segmentation should include TARDIS-EM");

  // 6. Contribute buttons present and point at the issue forms
  const addBtn = doc.querySelector('a.btn-primary');
  ok(addBtn && /issues\/new\?template=new-tool\.yml/.test(addBtn.href), "Add-a-tool button links to new-tool issue form");

  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
