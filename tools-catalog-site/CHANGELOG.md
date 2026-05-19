# Changelog

All notable changes to the EM Segmentation Tools Open Catalog will be documented in this file. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
