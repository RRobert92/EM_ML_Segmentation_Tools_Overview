// Unit tests for search-core.js — run with: node scripts/test-search.js
// No test framework; tiny assert harness so it runs anywhere Node is present.
const fs = require("fs");
const path = require("path");
const SC = require("../assets/search-core.js");

const data = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "tools.json"), "utf8"));
const TOOLS = data.tools;

let pass = 0, fail = 0;
function ok(cond, msg) { if (cond) { pass++; } else { fail++; console.log("  ✗ FAIL: " + msg); } }

function names(list) { return list.map(t => t.name); }
function search(q, filters) {
  return names(SC.searchAndRank(TOOLS, {
    search: q || "",
    filters: filters || {},
    sort: { key: "name", asc: true }
  }));
}
function setFilters(obj) {
  const f = {};
  Object.keys(obj).forEach(k => { f[k] = new Set(obj[k]); });
  return f;
}

console.log("Running search-core tests against", TOOLS.length, "tools\n");

// 1. TARDIS must surface for each of its real tasks/synonyms
["tardis", "filament", "filaments", "microtubule", "membrane", "vEM"].forEach(q => {
  ok(search(q).includes("TARDIS-EM"), `"${q}" should return TARDIS-EM`);
});

// 2. Acronym/synonym expansion
ok(search("MT").includes("TARDIS-EM"), `"MT" should expand to microtubule -> TARDIS-EM`);
ok(search("cryoET").some(n => /TARDIS|MemBrain|DeepFinder/.test(n)), `"cryoET" (no hyphen) should match cryo-ET tools`);
ok(search("denoise").includes("Topaz-Denoise"), `"denoise" should match Topaz-Denoise`);
ok(search("subtomogram").length > 0, `"subtomogram" should expand to STA/cryo-ET tools`);

// 3. Exact-name / alias ranking: the named tool ranks first
ok(search("TARDIS")[0] === "TARDIS-EM", `exact "TARDIS" should rank TARDIS-EM first (got ${search("TARDIS")[0]})`);
ok(search("crYOLO")[0] === "crYOLO", `exact "crYOLO" should rank first`);
ok(search("napari-tardis-em")[0] === "TARDIS-EM", `alias should resolve to TARDIS-EM`);

// 4. Task filter (multi-valued) includes spanning tools
ok(search("", setFilters({ task: ["Filament segmentation"] })).includes("TARDIS-EM"),
  `Task filter 'Filament segmentation' should include TARDIS-EM`);
ok(search("", setFilters({ task: ["Membrane segmentation"] })).includes("TARDIS-EM"),
  `Task filter 'Membrane segmentation' should include TARDIS-EM`);
const memTools = search("", setFilters({ task: ["Membrane segmentation"] }));
["Ais", "MemBrain-seg", "TomoSegMemTV", "CryoVesNet"].forEach(n =>
  ok(memTools.includes(n), `Membrane task should include ${n}`));

// 5. Category filter (multi-valued) — TARDIS now appears under BOTH
ok(search("", setFilters({ category: ["Volume EM segmentation"] })).includes("TARDIS-EM"),
  `Category 'Volume EM segmentation' should now include TARDIS-EM`);
ok(search("", setFilters({ category: ["Cryo-ET segmentation"] })).includes("TARDIS-EM"),
  `Category 'Cryo-ET segmentation' should still include TARDIS-EM`);

// 6. Mutex Watershed cryo-ET modality was removed (chapter comment #60)
const mutex = TOOLS.find(t => t.name === "Mutex Watershed");
ok(!mutex.modalities.includes("cryo-et"), `Mutex Watershed should no longer be tagged cryo-et`);

// 7. AND semantics across tokens
const mc = search("membrane cryo-et");
ok(mc.includes("MemBrain-seg") && mc.includes("TARDIS-EM"), `"membrane cryo-et" should AND-match membrane cryo-ET tools`);
ok(!search("membrane spaghetti").length, `nonsense second token should yield no hits (strict AND)`);

// 8. Gibberish returns nothing
ok(search("zzzqqxnotathing").length === 0, `gibberish should return 0 results`);

// 9. Filter + search combine
const picks = search("transformer", setFilters({ task: ["SPA particle picking"] }));
ok(picks.includes("CryoTransformer"), `"transformer" within SPA picking should find CryoTransformer`);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
