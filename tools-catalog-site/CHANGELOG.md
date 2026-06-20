# Changelog

All notable changes to the EM Segmentation Tools Open Catalog will be documented in this file. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] — 2026-06-20

### Added

- **Multi-valued `categories` and `tasks`** on every tool, with a controlled task vocabulary. Tools that span stages or targets now surface under every relevant filter instead of being pigeonholed into one. Singular `category`/`task` fields are retained (auto-derived) for display and back-compat.
- **Task filter** chip group on the site, alongside the existing category/modality/approach/availability filters.
- **Synonym- and acronym-aware search** with relevance ranking (`assets/search-core.js`): queries like "MT", "microtubule", "cryoET", or "membrane" now resolve to the right tools, and exact name/alias matches rank first. Shared by the site and the Node test suite.
- **No-git contribution path**: structured GitHub Issue Forms ("Add a new tool" / "Suggest a correction"), a converter (`scripts/issue_to_tool.py`), and a workflow that opens a PR once a maintainer applies the `approved` label.
- **CI**: `scripts/validate_tools.py` + `.github/workflows/validate.yml` (schema, JS syntax, search tests); `scripts/test-search.js` and `scripts/test-ui.js` test harnesses.

### Fixed

- **TARDIS-EM** was tagged only `Cryo-ET segmentation` and so was invisible under volume-EM / filament / membrane views; it now carries both segmentation categories and filament + membrane tasks across its real modalities.
- **Mutex Watershed** no longer carries an over-broad `cryo-et` modality tag (it is a vEM/connectomics method).

## [1.0.1] — 2026-05-19

### Added

- **arivis Pro** (ZEISS) and **Dragonfly** (Comet / Object Research Systems) added under General-purpose → Commercial platforms. Both are widely used vendor GUI platforms for volume-EM segmentation and quantification; included alongside Amira for parity in coverage of commercial tooling.

## [1.0.0] — 2026-05-19

Initial public release. Companion to *Kiewisz, R. (2026), Segmentation in Electron Microscopy: A Tools Overview*, Methods in Cell Biology.

### Added

- 79 tool entries spanning particle picking (SPA and cryo-ET), cryo-ET feature segmentation (membranes, filaments, vesicles, anchored complexes), volume-EM segmentation (organelles, connectomics), general-purpose foundation models, CLEM registration, denoising and missing-wedge preprocessing, and shared training infrastructure.
- Interactive single-page site at the repository root: full-text search, multi-axis filtering (category, modality, approach, availability), sortable columns, per-tool detail modal with citation/repo links, URL-state preservation so filtered views are shareable.
- Structured catalog data in `data/tools.json` under CC-BY-4.0.
- `README.md`, `CONTRIBUTING.md` (entry schema, review process, style guide for `when_to_use` and `limitations`), `LICENSE` (MIT for code, CC-BY-4.0 for data).

### Known follow-ups

- Several entries cite preprints that may have peer-reviewed versions by the time this resource is consumed: MemBrain-seg, TARDIS-EM, CLEM-Reg, Cellpose-SAM, CryoET Data Portal, BioImage Model Zoo. To be refreshed in a PATCH release once published.
- The catalog skews toward open-source academic tools and tools with peer-reviewed citations. Vendor and closed-source tools are included only when they are widely used.
- Modality coverage is uneven: SBEM and array tomography are underrepresented relative to FIB-SEM and cryo-ET. PRs adding such tools are welcome.
