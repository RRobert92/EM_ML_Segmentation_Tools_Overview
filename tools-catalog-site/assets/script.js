// EM Segmentation Tools — Open Catalog
// Vanilla JS, no dependencies. Loads tools.json and renders an interactive
// searchable table with filter chips and a detail modal.

(function () {
  "use strict";

  var root = document.body;
  var TOOLS = [];
  var FILTERS = { category: new Set(), task: new Set(), modality: new Set(), type: new Set(), availability: new Set() };
  var SORT = { key: "name", asc: true };
  var SEARCH = "";

  function q(sel) { return document.querySelector(sel); }
  function qa(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }

  // -----------------------------------------------------------------------
  // Data loading
  // -----------------------------------------------------------------------

  function loadData() {
    fetch("data/tools.json")
      .then(function (res) { return res.json(); })
      .then(function (data) {
        TOOLS = data.tools || [];
        var c = q("#meta-tool-count");
        if (c) c.textContent = (data.tool_count || TOOLS.length) + " tools cataloged";
        initFilters();
        readURLState();
        render();
      })
      .catch(function (err) {
        var tbody = q("#tools-tbody");
        if (tbody) {
          tbody.innerHTML = '<tr><td colspan="7" style="padding:2rem;text-align:center;color:#a94442;">Could not load tools data: ' + escapeHtml(err.message) + '. If you are opening index.html directly with file://, serve the directory over HTTP instead (e.g. python3 -m http.server).</td></tr>';
        }
      });
  }

  // -----------------------------------------------------------------------
  // Filter chips
  // -----------------------------------------------------------------------

  function initFilters() {
    var counts = {
      category: countBy(TOOLS, function (t) { return SearchCore.toolCategories(t); }),
      task: countBy(TOOLS, function (t) { return SearchCore.toolTasks(t); }),
      modality: countBy(TOOLS, function (t) { return t.modalities; }),
      type: countBy(TOOLS, function (t) { return [t.type]; }),
      availability: countBy(TOOLS, function (t) { return [t.availability]; })
    };
    renderChipGroup("#filter-category", counts.category, "category");
    renderChipGroup("#filter-task", counts.task, "task");
    renderChipGroup("#filter-modality", counts.modality, "modality");
    renderChipGroup("#filter-type", counts.type, "type");
    renderChipGroup("#filter-availability", counts.availability, "availability");
  }

  function countBy(items, keyFn) {
    var m = new Map();
    items.forEach(function (item) {
      var keys = keyFn(item) || [];
      keys.forEach(function (k) {
        if (!k) return;
        m.set(k, (m.get(k) || 0) + 1);
      });
    });
    return m;
  }

  function renderChipGroup(selector, counts, filterKey) {
    var container = q(selector);
    if (!container) return;
    container.innerHTML = "";
    var sorted = Array.from(counts.entries()).sort(function (a, b) { return b[1] - a[1]; });
    sorted.forEach(function (entry) {
      var value = entry[0], n = entry[1];
      var btn = document.createElement("button");
      btn.className = "chip";
      btn.setAttribute("data-filter", filterKey);
      btn.setAttribute("data-value", value);
      btn.innerHTML = escapeHtml(prettyValue(value)) + ' <span class="count">' + n + '</span>';
      btn.title = fullName(value);
      btn.addEventListener("click", function () { toggleFilter(filterKey, value); });
      container.appendChild(btn);
    });
  }

  function prettyValue(v) {
    var map = {
      ml: "ML", classical: "Classical", hybrid: "Hybrid", infrastructure: "Infrastructure",
      spa: "SPA", "cryo-et": "cryo-ET", "fib-sem": "FIB-SEM", sbem: "SBEM", sstem: "ssTEM",
      vem: "vEM", em: "EM", clem: "CLEM", "cryo-clem": "cryo-CLEM", "cryo-fib": "cryo-FIB",
      "array-tomo": "array tomo", sem: "SEM", sta: "STA", ilm: "iFLM", lm: "LM",
      "all microscopy": "all microscopy", "cross-cutting": "cross-cutting"
    };
    return map[v] || v;
  }

  // Full-text expansion of an abbreviation, used for chip hover tooltips and the
  // glossary. Modality/approach keys expand; category/task values are already
  // full phrases and fall back to prettyValue.
  function fullName(v) {
    var map = {
      ml: "Machine learning", classical: "Classical (hand-engineered algorithm)",
      hybrid: "Hybrid (machine learning + classical)", infrastructure: "Infrastructure / dataset",
      spa: "Single-particle analysis", "cryo-et": "Cryo-electron tomography",
      sta: "Sub-tomogram averaging", "fib-sem": "Focused ion beam scanning electron microscopy",
      sbem: "Serial block-face scanning electron microscopy",
      sstem: "Serial-section transmission electron microscopy",
      vem: "Volume electron microscopy", sem: "Scanning electron microscopy",
      "array-tomo": "Array tomography", clem: "Correlative light and electron microscopy",
      "cryo-clem": "Cryo correlative light and electron microscopy",
      ilm: "Integrated fluorescence light microscopy", lm: "Light microscopy",
      em: "Electron microscopy (general)", "all microscopy": "All microscopy modalities"
    };
    return map[v] || prettyValue(v);
  }

  function toggleFilter(key, value) {
    var set = FILTERS[key];
    if (set.has(value)) set.delete(value);
    else set.add(value);
    updateChipsUI();
    writeURLState();
    render();
  }

  function updateChipsUI() {
    qa(".chip").forEach(function (chip) {
      var k = chip.getAttribute("data-filter");
      var v = chip.getAttribute("data-value");
      if (FILTERS[k] && FILTERS[k].has(v)) chip.classList.add("active");
      else chip.classList.remove("active");
    });
  }

  function clearFilters() {
    Object.keys(FILTERS).forEach(function (k) { FILTERS[k].clear(); });
    SEARCH = "";
    var s = q("#search");
    if (s) s.value = "";
    updateChipsUI();
    writeURLState();
    render();
  }

  // -----------------------------------------------------------------------
  // Filtering + search
  // -----------------------------------------------------------------------

  // Filtering, synonym-aware search, and relevance ranking all live in
  // assets/search-core.js (shared with the Node tests in scripts/test-search.js).

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------

  function render() {
    var sorted = SearchCore.searchAndRank(TOOLS, {
      search: SEARCH, filters: FILTERS, sort: SORT
    });

    var rc = q("#results-count");
    if (rc) rc.textContent = sorted.length + " of " + TOOLS.length + " tool" + (sorted.length === 1 ? "" : "s");

    var tbody = q("#tools-tbody");
    if (!tbody) return;
    tbody.innerHTML = "";

    if (sorted.length === 0) {
      var es = q("#empty-state"); if (es) es.hidden = false;
      var tt = q("#tools-table"); if (tt) tt.style.display = "none";
      return;
    }
    var es2 = q("#empty-state"); if (es2) es2.hidden = true;
    var tt2 = q("#tools-table"); if (tt2) tt2.style.display = "";

    var frag = document.createDocumentFragment();
    sorted.forEach(function (t) {
      var tr = document.createElement("tr");
      tr.setAttribute("data-idx", TOOLS.indexOf(t));

      var aliasesStr = "";
      if (t.aliases && t.aliases.length) {
        aliasesStr = '<span class="tool-aliases">' + escapeHtml(t.aliases.slice(0, 2).join(" · ")) + '</span>';
      }

      tr.innerHTML =
        '<td><span class="tool-name">' + escapeHtml(t.name) + '</span>' + aliasesStr + '</td>' +
        '<td>' + escapeHtml(SearchCore.toolCategories(t).join(", ")) + '</td>' +
        '<td>' + escapeHtml(SearchCore.toolTasks(t).join(", ")) + '</td>' +
        '<td class="modality-list">' + escapeHtml((t.modalities || []).map(prettyValue).join(", ") || "—") + '</td>' +
        '<td><span class="badge ' + escapeHtml(t.type) + '">' + escapeHtml(prettyValue(t.type)) + '</span></td>' +
        '<td><span class="badge ' + escapeHtml(String(t.availability).toLowerCase()) + '">' + escapeHtml(t.availability) + '</span></td>' +
        '<td>' + escapeHtml((t.citation && t.citation.short) || "—") + '</td>';
      tr.addEventListener("click", function () { openModal(t); });
      frag.appendChild(tr);
    });
    tbody.appendChild(frag);
    updateSortIndicators();
  }

  function updateSortIndicators() {
    qa("th.sortable").forEach(function (th) {
      th.classList.remove("sort-asc", "sort-desc");
      if (th.getAttribute("data-sort") === SORT.key) {
        th.classList.add(SORT.asc ? "sort-asc" : "sort-desc");
      }
    });
  }

  // -----------------------------------------------------------------------
  // Modal
  // -----------------------------------------------------------------------

  function openModal(t) {
    var dlg = q("#detail-modal");
    if (!dlg) return;
    var c = t.citation || {};
    var citeLine = [c.first_author, c.year, c.venue].filter(Boolean).join(", ");
    var doiLink = c.doi
      ? '<a href="https://doi.org/' + escapeHtml(c.doi) + '" target="_blank" rel="noopener">doi:' + escapeHtml(c.doi) + '</a>'
      : (c.url ? '<a href="' + escapeHtml(c.url) + '" target="_blank" rel="noopener">' + escapeHtml(c.url) + '</a>' : "");

    var sections = [];
    sections.push('<h2>' + escapeHtml(t.name) + '</h2>');
    sections.push(
      '<div class="modal-badges">' +
      '<span class="badge ' + escapeHtml(t.type) + '">' + escapeHtml(prettyValue(t.type)) + '</span>' +
      '<span class="badge ' + escapeHtml(String(t.availability).toLowerCase()) + '">' + escapeHtml(t.availability) + '</span>' +
      '</div>'
    );
    if (t.aliases && t.aliases.length) {
      sections.push('<p style="color:var(--text-dim);margin-top:-0.5rem;font-size:0.9rem;">Also known as: ' + escapeHtml(t.aliases.join(", ")) + '</p>');
    }
    sections.push('<h3>Category</h3><p>' + escapeHtml(SearchCore.toolCategories(t).join(", ")) + ' → ' + escapeHtml(SearchCore.toolTasks(t).join(", ")) + '</p>');
    if (t.modalities && t.modalities.length) {
      sections.push('<h3>Modalities</h3><p>' + escapeHtml((t.modalities || []).map(prettyValue).join(", ")) + '</p>');
    }
    if (t.when_to_use) sections.push('<h3>When to use</h3><p>' + escapeHtml(t.when_to_use) + '</p>');
    if (t.approach) sections.push('<h3>Approach</h3><p>' + escapeHtml(t.approach) + '</p>');
    if (t.architecture) sections.push('<h3>Architecture</h3><p>' + escapeHtml(t.architecture) + '</p>');
    if (t.training_paradigm) sections.push('<h3>Training paradigm</h3><p>' + escapeHtml(t.training_paradigm) + '</p>');
    if (t.training_data) sections.push('<h3>Training data</h3><p>' + escapeHtml(t.training_data) + '</p>');
    if (t.limitations) sections.push('<h3>Limitations</h3><p>' + escapeHtml(t.limitations) + '</p>');
    if (t.compute) sections.push('<h3>Compute</h3><p>' + escapeHtml(t.compute) + '</p>');

    sections.push('<h3>Citation</h3>');
    if (citeLine || doiLink) {
      sections.push('<p class="modal-cite">' + escapeHtml(citeLine) + (doiLink ? '<br>' + doiLink : "") + '</p>');
    } else {
      sections.push('<p class="modal-cite">No canonical peer-reviewed publication.</p>');
    }

    var links = [];
    if (t.repo && /^https?:\/\//.test(t.repo)) {
      links.push('<a class="repo-link" href="' + escapeHtml(t.repo) + '" target="_blank" rel="noopener">Repository ↗</a>');
    } else if (t.repo) {
      links.push('<p style="font-size:0.85rem;color:var(--text-dim);">Repository: ' + escapeHtml(t.repo) + '</p>');
    }
    if (links.length) {
      sections.push('<h3>Links</h3>');
      sections.push(links.join(""));
    }

    var body = q("#modal-body");
    if (body) body.innerHTML = sections.join("\n");
    if (typeof dlg.showModal === "function") dlg.showModal();
    else dlg.setAttribute("open", "");
  }

  function closeModal() {
    var dlg = q("#detail-modal");
    if (!dlg) return;
    if (typeof dlg.close === "function") dlg.close();
    else dlg.removeAttribute("open");
  }

  // -----------------------------------------------------------------------
  // URL state
  // -----------------------------------------------------------------------

  function writeURLState() {
    var p = new URLSearchParams();
    Object.keys(FILTERS).forEach(function (k) {
      var set = FILTERS[k];
      if (set.size > 0) p.set(k, Array.from(set).join(","));
    });
    if (SEARCH) p.set("q", SEARCH);
    var url = window.location.pathname + (p.toString() ? "?" + p.toString() : "");
    history.replaceState({}, "", url);
  }

  function readURLState() {
    var p = new URLSearchParams(window.location.search);
    ["category", "task", "modality", "type", "availability"].forEach(function (k) {
      var v = p.get(k);
      if (v) v.split(",").forEach(function (val) { FILTERS[k].add(val); });
    });
    var qparam = p.get("q");
    if (qparam) {
      SEARCH = qparam;
      var s = q("#search");
      if (s) s.value = qparam;
    }
    updateChipsUI();
  }

  // -----------------------------------------------------------------------
  // Utilities
  // -----------------------------------------------------------------------

  function escapeHtml(s) {
    if (s === null || s === undefined) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // -----------------------------------------------------------------------
  // Init — runs immediately. script.js is loaded with a plain <script src>
  // tag at the end of the body, so the DOM is parsed by the time we run.
  // -----------------------------------------------------------------------

  function init() {
    loadData();

    var searchInput = q("#search");
    if (searchInput) {
      var handleSearch = function () {
        SEARCH = searchInput.value.trim();
        writeURLState();
        render();
      };
      searchInput.addEventListener("input", handleSearch);
      searchInput.addEventListener("keyup", handleSearch);
      searchInput.oninput = handleSearch;
    }

    var clearBtn = q("#clear-filters");
    if (clearBtn) clearBtn.addEventListener("click", clearFilters);

    qa("th.sortable").forEach(function (th) {
      th.addEventListener("click", function () {
        var k = th.getAttribute("data-sort");
        if (SORT.key === k) SORT.asc = !SORT.asc;
        else { SORT.key = k; SORT.asc = true; }
        render();
      });
    });

    var closeBtn = q(".modal-close");
    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    var dlg = q("#detail-modal");
    if (dlg) {
      dlg.addEventListener("click", function (e) {
        if (e.target && e.target.id === "detail-modal") closeModal();
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
