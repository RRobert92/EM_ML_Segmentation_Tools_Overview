# Figures

*Three figures for the segmentation chapter. Two are generated programmatically from the knowledge base (Figures 1 and 3); the third (Figure 2) is a representative-results panel that must be assembled from existing publications with permission. Captions are written to be self-contained — a reader who opens only the figure should be able to interpret it without the chapter body.*

*Generated 2026-05-19.*

---

## Figure 1 — Distribution of segmentation tools across tasks and computational approaches

**File:** `figure-1-tools-by-task-and-approach.png` (generated from `knowledge-base/tools-segmentation.json`).

**Caption.**
Distribution of segmentation tools across nine tasks in the electron microscopy pipeline. Each bar gives the number of actively maintained tools cataloged for this chapter; the colour breakdown shows the underlying computational approach (classical, machine-learning, or hybrid). The two largest task categories — single-particle analysis (SPA) particle picking (n=18) and cryo-electron tomography (cryo-ET) macromolecule localization (n=12) — are dominated by ML, with only a handful of classical template-matching tools remaining in active use. Specialised cryo-ET segmentation tasks (membrane, vesicle, filament) are sparsely populated despite their biological importance: each has only one to three dedicated tools. General-purpose segmentation tools (n=13), most of which originated in light microscopy or medical imaging and were retrained for EM, fill the gap when no task-specific tool exists. CLEM registration (n=3) is the smallest category and the only one where classical methods still outweigh ML, reflecting the historical role of fiducial beads and landmark-based alignment in correlative workflows. The figure makes two points visible at a glance: ML now dominates almost every segmentation task in EM, but the *number* of tools per task is highly uneven, and several biologically important targets remain underserved.

*Figure generated as an original schematic; no copyright issues.*

---

## Figure 2 — Representative segmentation results across the EM pipeline

**File:** to be assembled (`figure-2-representative-results.png`); panels sourced from existing publications with permission. **Not yet generated** — left as a layout specification.

**Layout suggestion.** A 2×3 grid showing six segmentation tasks side by side, with each panel paired with its input data above the output.

| Panel | Task | Suggested source |
|---|---|---|
| A | SPA particle picking (crYOLO on a representative micrograph) | Wagner et al., 2019, *Communications Biology* — Fig 2 or 3 |
| B | Cryo-ET macromolecule localization (DeepFinder or DeePiCt picks overlaid on a cellular tomogram) | de Teresa-Trueba et al., 2023, *Nature Methods* — Fig 2 |
| C | Cryo-ET membrane segmentation (MemBrain-seg output on a cellular cryo-ET volume) | Lamm et al., 2024 preprint — Fig 3 or 4 |
| D | Volume EM mitochondrial segmentation (MitoNet on a FIB-SEM volume slice) | Conrad et al., 2023, *Cell Systems* — Fig 1 or 2 |
| E | Whole-cell vEM organelle segmentation (CellMap / OpenOrganelle multi-class output) | Heinrich et al., 2021, *Nature* — Fig 1 or 2 |
| F | CLEM registration with organelle features (CLEM-Reg output overlaying LM and EM channels) | Krentzel et al., 2025, *Nature Methods* — Fig 2 |

**Caption (provisional, to be finalised once panels are sourced).**
Representative segmentation outputs across six tasks in the EM pipeline, illustrating the range of inputs, scales, and biological targets covered by the tools discussed in this chapter. (A) SPA particle picking on a 2D cryo-EM micrograph (crYOLO general model). (B) Macromolecule localization in a cryo-ET tomogram of a cellular volume (DeePiCt). (C) Membrane segmentation of a cellular cryo-ET volume (MemBrain-seg). (D) Mitochondrial segmentation in a FIB-SEM volume slice (MitoNet). (E) Multi-class whole-cell organelle segmentation in a FIB-SEM volume (CellMap, with ER in red, mitochondria in green, and nuclear envelope in blue). (F) Deep-learning CLEM registration overlaying a fluorescence channel onto an EM volume using organelle features as the registration substrate (CLEM-Reg). Scale bars: see individual sources. All panels adapted from the cited publications with permission.

*Reproduction permission required for each panel before submission — flag for editorial sign-off.*

---

## Figure 3 — Segmentation tools by modality and task

**File:** `figure-3-modality-task-heatmap.png` (generated from `knowledge-base/tools-segmentation.json`).

**Caption.**
Heatmap of segmentation tool counts by imaging modality (rows) and segmentation task (columns). A tool that operates on multiple modalities is counted in every row it supports; tools are counted only in their canonical task column to avoid double-counting tools that span tasks. Two field-level patterns are visible. First, the density distribution is highly uneven: SPA particle picking (n=18 on its own row) is the most populated single cell, followed by cryo-ET picking (12) and general segmentation across the volume-EM modalities (11–12 per row). Second, the cryo-CLEM row is empty: no segmentation tools in the catalogue are tagged primarily for cryo-CLEM data, despite cryo-CLEM being a major experimental modality in this volume. This reflects two facts of the field: (i) cryo-CLEM consumes tools developed for cryo-ET and for CLEM registration rather than having its own dedicated segmentation literature; and (ii) the dedicated CLEM segmentation tools that do exist (n=3) are tied to room-temperature workflows. The empty cryo-CLEM row is itself a finding — it identifies one of the chapter's outlook gaps (§8.2): closed-loop cryo-CLEM workflows require segmentation tools that are not yet built.

*Figure generated as an original schematic from the project knowledge base; no copyright issues.*

---

## Notes on figure preparation for submission

- **Resolution.** Both generated figures are 180 DPI PNG. For Elsevier *Methods in Cell Biology* the typical requirement is 300 DPI for raster figures or vector format (PDF/EPS) for figures with text. Regenerate at the publisher's required DPI before final submission, or export from matplotlib to PDF directly.
- **Colour blindness.** The colour palettes used (Figure 1: blue/grey/green; Figure 3: YlGnBu sequential) are colourblind-safe and print legibly in grayscale, but verify against the publisher's accessibility guidelines.
- **Figure 1 caption length.** The figure caption above is long by Elsevier standards (~250 words). The first sentence is the standalone summary; the rest can be cut if a tighter caption is required.
- **Figure 2 caption length.** The provisional caption (~150 words) is in the typical Elsevier range.
- **Permissions for Figure 2.** Each adapted panel requires explicit written permission from the publisher of the source paper. Most journals grant this for non-commercial educational use via RightsLink; budget two weeks for the permissions cycle.
