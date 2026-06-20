// search-core.js — pure, dependency-free search/ranking logic for the EM tools catalog.
// Usable in the browser (window.SearchCore) and in Node (require) so it can be unit-tested.
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.SearchCore = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  // ---------------------------------------------------------------------------
  // Synonym / acronym clusters. Every token in a cluster expands to the whole
  // cluster at search time, so "mt" finds "microtubule"/"filament", "cryoet"
  // finds "cryo-et"/"tomography", etc. Multi-word members are matched as
  // substrings against a hyphen-normalised haystack (see buildHaystack).
  // ---------------------------------------------------------------------------
  var CLUSTERS = [
    ["filament", "filaments", "microtubule", "microtubules", "mt", "mts",
      "actin", "intermediate filament", "cytoskeleton", "cytoskeletal", "fibre", "fiber"],
    ["membrane", "membranes", "membranous", "lipid", "bilayer"],
    ["organelle", "organelles", "vesicle", "vesicles", "mitochondria",
      "mitochondrion", "mito", "nucleus", "nuclei", "endosome", "lysosome"],
    ["spa", "single particle", "single-particle", "particle", "particles",
      "picking", "picker", "pick"],
    ["cryoet", "cryo-et", "cryo et", "tomography", "tomogram", "tomograms",
      "tomographic", "subtomogram", "sta", "subtomogram averaging"],
    ["vem", "volume em", "volumeem", "fibsem", "fib-sem", "fib sem", "sbem",
      "sstem", "serial section", "serial-section", "block face", "block-face", "array tomography"],
    ["connectomics", "connectome", "neuron", "neurons", "neurite", "synapse",
      "synaptic", "axon", "neuron tracing", "tracing"],
    ["denoise", "denoising", "denoised", "noise", "noise2noise", "noise2void", "low snr", "snr"],
    ["missing wedge", "missing-wedge", "missingwedge", "wedge"],
    ["foundation", "foundational", "sam", "segment anything", "generalist", "general purpose", "general-purpose"],
    ["clem", "correlative", "correlative light", "correlation", "registration",
      "register", "align", "alignment", "fiducial", "fiducials"],
    ["segmentation", "segment", "seg", "segmenting"],
    ["denoiser", "restoration", "restore"]
  ];

  // token -> Set of all expansion terms (including multi-word terms)
  var SYNONYM_MAP = (function () {
    var m = {};
    CLUSTERS.forEach(function (cluster) {
      cluster.forEach(function (member) {
        if (member.indexOf(" ") !== -1) return; // only single tokens are keys
        if (!m[member]) m[member] = {};
        cluster.forEach(function (other) { m[member][other] = true; });
      });
    });
    var out = {};
    Object.keys(m).forEach(function (k) { out[k] = Object.keys(m[k]); });
    return out;
  })();

  function norm(s) { return (s == null ? "" : String(s)).toLowerCase(); }

  function tokenize(str) {
    return norm(str)
      .split(/[^a-z0-9+]+/)
      .filter(function (t) { return t.length >= 2; });
  }

  // expansion terms for a single query token (itself + synonyms)
  function expandToken(tok) {
    var syn = SYNONYM_MAP[tok];
    if (!syn) return [tok];
    var seen = {}; seen[tok] = true;
    var out = [tok];
    syn.forEach(function (s) { if (!seen[s]) { seen[s] = true; out.push(s); } });
    return out;
  }

  // build a normalised haystack string for a field (original + hyphen->space)
  function buildHaystack(text) {
    var n = norm(text);
    return n + " " + n.replace(/-/g, " ");
  }

  // multi-valued helpers with back-compat fallback to the singular field
  function toolCategories(t) { return (t.categories && t.categories.length) ? t.categories : (t.category ? [t.category] : []); }
  function toolTasks(t) { return (t.tasks && t.tasks.length) ? t.tasks : (t.task ? [t.task] : []); }

  function intersects(filterSet, values) {
    for (var i = 0; i < values.length; i++) {
      if (filterSet.has ? filterSet.has(values[i]) : filterSet.indexOf(values[i]) !== -1) return true;
    }
    return false;
  }

  // filters: { category:Set, task:Set, modality:Set, type:Set, availability:Set }
  function matchesFilters(t, filters) {
    if (filters.category && filters.category.size && !intersects(filters.category, toolCategories(t))) return false;
    if (filters.task && filters.task.size && !intersects(filters.task, toolTasks(t))) return false;
    if (filters.modality && filters.modality.size && !intersects(filters.modality, t.modalities || [])) return false;
    if (filters.type && filters.type.size && !(filters.type.has ? filters.type.has(t.type) : filters.type.indexOf(t.type) !== -1)) return false;
    if (filters.availability && filters.availability.size && !(filters.availability.has ? filters.availability.has(t.availability) : filters.availability.indexOf(t.availability) !== -1)) return false;
    return true;
  }

  // weighted fields for relevance scoring
  function weightedFields(t) {
    var c = t.citation || {};
    return [
      { text: t.name, w: 100 },
      { text: (t.aliases || []).join(" "), w: 80 },
      { text: toolTasks(t).join(" "), w: 30 },
      { text: toolCategories(t).join(" "), w: 28 },
      { text: (t.modalities || []).join(" "), w: 18 },
      { text: t.when_to_use, w: 10 },
      { text: t.approach, w: 8 },
      { text: t.architecture, w: 6 },
      { text: t.limitations, w: 5 },
      { text: t.type, w: 4 },
      { text: [c.surname, c.short, c.venue].filter(Boolean).join(" "), w: 4 }
    ];
  }

  // Score a tool against a query. Returns 0 if any query token is unmatched
  // anywhere (AND semantics), otherwise a positive relevance score.
  function scoreTool(t, query) {
    var tokens = tokenize(query);
    if (!tokens.length) return 0;

    var fields = weightedFields(t).map(function (f) {
      return { hay: buildHaystack(f.text), w: f.w };
    });

    var total = 0;
    for (var i = 0; i < tokens.length; i++) {
      var terms = expandToken(tokens[i]);
      var tokenScore = 0;
      for (var fi = 0; fi < fields.length; fi++) {
        var matched = false;
        for (var ti = 0; ti < terms.length; ti++) {
          if (fields[fi].hay.indexOf(terms[ti]) !== -1) { matched = true; break; }
        }
        if (matched) tokenScore += fields[fi].w;
      }
      if (tokenScore === 0) return 0; // this token matched nothing -> not a hit
      total += tokenScore;
    }

    // decisive bonus for exact name / alias hit
    var nq = norm(query).trim();
    if (norm(t.name).trim() === nq) total += 1000;
    else if ((t.aliases || []).some(function (a) { return norm(a).trim() === nq; })) total += 600;
    else if (norm(t.name).indexOf(nq) === 0) total += 150; // name starts with query

    return total;
  }

  function getSortValue(t, key) {
    if (key === "citation.year") return (t.citation && t.citation.year) || 0;
    if (key === "modalities") return (t.modalities || []).join(", ");
    if (key === "category") return toolCategories(t).join(", ");
    if (key === "task") return toolTasks(t).join(", ");
    return t[key] || "";
  }

  // Main entry point. opts: { search, filters, sort:{key,asc} }
  // Returns an array of tools. When a search string is present, results are
  // filtered to hits and ordered by relevance (then name); otherwise ordered
  // by the requested sort.
  function searchAndRank(tools, opts) {
    opts = opts || {};
    var filters = opts.filters || {};
    var search = (opts.search || "").trim();
    var sort = opts.sort || { key: "name", asc: true };

    var filtered = tools.filter(function (t) { return matchesFilters(t, filters); });

    if (search) {
      var scored = [];
      for (var i = 0; i < filtered.length; i++) {
        var s = scoreTool(filtered[i], search);
        if (s > 0) scored.push({ t: filtered[i], s: s });
      }
      scored.sort(function (a, b) {
        if (b.s !== a.s) return b.s - a.s;
        return norm(a.t.name) < norm(b.t.name) ? -1 : 1;
      });
      return scored.map(function (x) { return x.t; });
    }

    var dir = sort.asc ? 1 : -1;
    return filtered.slice().sort(function (a, b) {
      var av = getSortValue(a, sort.key), bv = getSortValue(b, sort.key);
      av = typeof av === "string" ? av.toLowerCase() : av;
      bv = typeof bv === "string" ? bv.toLowerCase() : bv;
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return 0;
    });
  }

  return {
    CLUSTERS: CLUSTERS,
    SYNONYM_MAP: SYNONYM_MAP,
    tokenize: tokenize,
    expandToken: expandToken,
    toolCategories: toolCategories,
    toolTasks: toolTasks,
    matchesFilters: matchesFilters,
    scoreTool: scoreTool,
    searchAndRank: searchAndRank
  };
});
