# Changelog

All notable changes to the EM Segmentation Tools Open Catalog will be documented in this file. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.2] — 2026-06-28

### Changed

- **Modality nomenclature: `ssTEM` → `serTEM`.** Renamed the serial-section TEM modality throughout the catalog to avoid the bare "ss" abbreviation. This touches the display label and glossary, the internal modality key (`sstem` → `sertem`) across all `data/tools.json` entries, the search synonym set (`assets/search-core.js`), the `ALLOWED_MODS` validator, the issue→tool mapping (`scripts/issue_to_tool.py`), and the "Add a new tool" issue template. Bookmarked URLs using `?modality=sstem` no longer resolve — use `?modality=sertem`.

## [1.2.1] — 2026-06-21

### Added

- Three recent foundation models (chapter review follow-up), filed under General-purpose → Foundation / general segmentation with the shared foundation-segmenter modality set:
  - **SAM 3** (Carion et al., Meta, 2025; arXiv 2511.16719) — adds promptable concept segmentation (text noun-phrase + image-exemplar prompts) over SAM 2's interactive masks; the March 2026 **SAM 3.1** point-release (faster real-time video) is captured as an alias/note rather than a separate entry. Honest EM caveat recorded: open-vocabulary text prompts do not cover EM-specific structures, so zero-shot prompting on (cryo-)EM is unreliable; custom SAM License with gated checkpoints.
  - **DINOv3** (Siméoni et al., Meta, 2025; arXiv 2508.10104) — self-supervised ViT successor to DINOv2 (LVD-1689M, up to ~7B params, "Gram anchoring") used as a frozen dense-feature backbone; custom DINOv3 License (gated). Catalog now 89 tools.

## [1.2.0] — 2026-06-20

### Added

- Three commercial AI-segmentation platforms flagged as missing in chapter review (comment #2): **Imaris** (Oxford Instruments — trainable AI Segmentation + Labkit ML), **Aivia** (Leica Microsystems — deep-learning segmentation/tracking), and **ZEN Intellesis** (ZEISS — ML segmentation across optical/electron/ion microscopes). All filed under General-purpose → Commercial platform, availability Vendor; vendor facts verified June 2026. Catalog now 87 tools.
- **Abbreviations glossary** on the site: an expandable legend under the filters explaining every modality acronym (SPA, cryo-ET, STA, FIB-SEM, SBEM, ssTEM, array tomography, vEM, SEM, CLEM, cryo-CLEM, iFLM, LM) and the approach types; filter chips also gain hover tooltips with their full names.
- **Post-processing category** added to the controlled vocabulary (validator, contribution form, schema docs) for map-enhancement tools that are not segmenters.

### Changed

- **Modality tags normalised for consistency and accuracy** (chapter review follow-up). General/foundation segmenters (Cellpose, Cellpose-SAM, MicroSAM, SAM, SAM 2, Stardist, nnU-Net, Ilastik, DINOv2) now share one modality set so siblings match; the 3D-only 3D U-Net keeps the volume subset. The generic Noise2* denoisers (Noise2Noise, Noise2Self, Noise2Void) are likewise harmonised; cryo-specific denoisers were left unchanged.
- **Redundant umbrella/catch-all modality tags removed**: `vem` is dropped wherever a specific constituent (FIB-SEM/SBEM/ssTEM/array tomography) is already listed; the generic `em` tag and stray `all microscopy` tags were removed except on genuinely universal platforms (BioImage Model Zoo, ZeroCostDL4Mic). Affected EMPIAR, EMDB, Amira, arivis Pro, Dragonfly, Imaris, ZEN Intellesis, Aivia, Synaptic partner detection, CellMap/OpenOrganelle.
- **TARDIS-EM** modalities broadened to the full EM imaging set (it is general for any EM data), replacing the catch-all `em`/`vem` tags.

### Fixed

- **DeepEMhancer** was mis-tagged as `General-purpose` → `Foundation / general segmentation`; it is a map-sharpening / post-processing tool and does not segment. Moved to the new **Post-processing** category with a `Map sharpening / post-processing` task.
- **EMDB** and **EMPIAR** no longer carry a contradictory `all microscopy` tag alongside their specific modalities (EMDB gains `sta`).
- **PlantSeg** modality `clem` corrected to `lm` (it is a light-microscopy tool, not a correlative one).
- **EMAN2 NN-picker** no longer carries `cryo-et` (the NN-picker is the SPA boxer; tomogram segmentation is a separate entry).
- **SAM / SAM 2** inconsistency resolved (stray `ilm` on SAM; mismatched `cryo-et`).

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
