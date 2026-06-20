# Comment Resolution Plan
**Document:** AI-based toolkits for Correlative Microscopy approaches
**Generated:** 2026-06-20 · **Total comments:** 66 (Gunar Fabig 38 · Müller-Reichert 22 · Kiewisz 6 replies)

Three threads were **resolved then re-opened** and are live again: the two *(Table 1)* mentions and the *Thermo Fisher* reference. One thread is closed by your reply (company affiliation) — no action.

**Priority key**
- **P1 — Fix first:** factual errors, wrong/missing citations, table/figure numbering, senior-author must-dos.
- **P2 — Substantive:** clarity and domain judgment (define terms, answer scientific challenges, add content).
- **P3 — Polish / discretion:** phrasing, style, optional additions, items the authors themselves flagged as maybe-too-much-work.

**Three high-leverage moves that clear many comments at once**
- [ ] **Add an acronym list** (Gunar #61) → also resolves the "define this" flags for STA, iFLM, GAN-style, SO(3), YOLO, CryoPPP (#13, #15, #17, #20/21, #49, #51).
- [ ] **Global find/replace `ss` → `ser-sec`** (Müller-Reichert #33, #36 — he calls `ss` "historically forbidden," wants it changed throughout).
- [ ] **One table-renumbering pass** fixes #26, #65, and the intro-numbering question #6 in a single sweep.

---

## P1 — Fix first

### Factual corrections
- [ ] **Mutex Watershed is under the wrong modality** (Gunar #60). It's a vEM/connectomics graph-partitioning method; listing cryo-ET as primary is wrong. → Move to connectomics/vEM, or change modality to FIB-SEM/SBEM/ssTEM/vEM.
- [ ] **Figure tool count mismatch** (Müller-Reichert #9, Gunar #47): text says **18** SPA particle-picking tools, the plot shows **19**. Reconcile text ↔ figure.
- [ ] **FIB-SEM "near-isotropic voxel resolution" overclaims** (Gunar #32): most FIB-SEM is not well-resolved in z without sophisticated milling. → Soften / qualify.
- [ ] **"beam axis" likely should be "tilt axis"** (Gunar #16). Verify and correct.

### Citations (wrong / missing / placeholder)
- [ ] **Amira** → cite *Stalling, Westerhoff & Hege (2005), The Visualization Handbook, 749–767* — **not** Thermo Fisher (Müller-Reichert #38).
- [ ] **Thermo Fisher** references need proper sources (Müller-Reichert #39; Gunar #63) — thread #40/#41 **re-opened**.
- [ ] **Add the Einstein-from-noise paper** (Gunar #12): PNAS 10.1073/pnas.1314449110.
- [ ] **"George 2021"** → restyle to match the paper's citation format (Müller-Reichert #57).
- [ ] **"Zhang"** missing year (Gunar #58).
- [ ] **"Kiewisz et al., 2024/2025"** → give one reference, not both (Müller-Reichert #29).
- [ ] **Resolve "citation unverified" placeholders** (Gunar #59 asks what it means) — verify or remove.
- [ ] **Citation consistency** (Gunar #11): either cite all tools inline or none; check the Lucas et al. 2021 case and that refs match the table.

### Terminology the senior author insists on
- [ ] **`ss` → `ser-sec` throughout** (Müller-Reichert #33, #36). Also fix `ser-secTEM` usage.

### Tables & numbering
- [ ] **Renumber tables consistently** (Müller-Reichert #26 "Tab. 2.1–2.2"; Gunar #65 "Table 7 should be 14").
- [ ] **Intro table references** (Müller-Reichert #6, re-opened via #5/#8): decide whether to drop table numbers from the introduction and cite them in the main text instead. *Müller-Reichert #3 is still mulling it — confirm the call with him.*

---

## P2 — Substantive (clarity & domain judgment)

### Define / clarify terms (or fold into the acronym list)
- [ ] **STA** — spell out at first use (Gunar #20, #21).
- [ ] **iFLM** — explain (Gunar #49).
- [ ] **GAN-style methods** — explain (Gunar #51).
- [ ] **SO(3) rotation group** — rephrase in plain terms (Gunar #17).
- [ ] **YOLO-architecture** — explain; and keep **crYOLO vs YOLO** distinct (Gunar #13, #23).
- [ ] **CryoPPP** — say what it is (Gunar #15).
- [ ] **"hallucinate"** → consider "produce false information" (Müller-Reichert #27).

### Scientific challenges to answer
- [ ] **"crYOLO is fully supervised"** — the earlier paragraph didn't establish this (Gunar #14). Make the training paradigm explicit.
- [ ] **Denoising feedback claim** (Gunar #28): "denoised tomogram should never feed back into structure determination" reads as self-contradictory. → Clarify (likely: avoid for high-res averaging, fine for visualization/picking).
- [ ] **"worst SNR" overclaim** (Gunar #25) — soften or justify.
- [ ] **TomoTwin vs DeepFinder** (Gunar #24): if TomoTwin is less accurate, state its downsides and when to prefer it (generality).
- [ ] **"These are all segmentation problems"** (Gunar #0): not always — phenotype comparison may not need segmentation. Qualify.
- [ ] **ec-CLEM error estimation** (Gunar #50): "no widely adopted tool does this" — but ec-CLEM computes a predicted error / mapping. Verify and correct.
- [ ] **"the algorithm is mature"** (Gunar #18): back with a scientific justification (widely used / highly cited).
- [ ] **"high-quality reference structure"** (Gunar #19): clarify — do you mean a good PDB structure?
- [ ] **"EM" → "microscopy data"?** (Gunar #37): tool also works on LM (phase contrast). Broaden if true.

### Content to add
- [ ] **Metadata standards for EM** (Gunar #48): add a point that without machine-readable prep metadata (specimen, resin, heavy metals, organism), generalization is hopeless.
- [ ] **Missing segmentation tools** (Gunar #2): Imaris (Bitplane), Aivia (Leica), ZEN (Zeiss) — all have built-in AI segmentation.
- [ ] **Amira general comment** (Müller-Reichert #44): add a short general note on Amira.
- [ ] **Fix the broken sentence** at "For large vEM volumes — whole-tissue FIB-SEM, sectioned and remounted samples…" (Müller-Reichert #45: "something is wrong here").
- [ ] **"method churn" point** (Müller-Reichert #52): unclear what it's saying — rewrite the intent.
- [ ] **Serial-section + tomography** (Müller-Reichert #34): split into a separate 4th point (antibody staining + SEM), don't combine with serial TEM.
- [ ] **Section breaks** (Müller-Reichert #35): restore the breaks he deleted — revert to the original layout.

### Tables (content)
- [ ] **Table 8** — expand per the catalog site and Gunar's comments above (Gunar #62).
- [ ] **Table 10 (CLEM registration)** — if it's a single tool, fold it into a later table (Gunar #64).

---

## P3 — Polish & author discretion
- [ ] **Highlight software names** (color/underline) so packages stand out from the prose (Gunar #10). *High effort across the whole doc — decide if worth it.*
- [ ] **Rephrase the "tomogram-load of false positives" joke** — won't land (Gunar #22).
- [ ] **"tractable but not solved"** is ambiguous (Gunar #1) — tighten.
- [ ] **List use-cases first, then prose** in the segmentation section (Gunar #30).
- [ ] **Filaments** — note applicability to actin / intermediate filaments (Gunar #31).
- [ ] **Plurals in recommendations** (Müller-Reichert #43).
- [ ] **Example refs in recommendation sections** (Müller-Reichert #42, #46) — he notes this "might be too much work." Your call.

## Admin
- [ ] **Acknowledgements** (Müller-Reichert #54): add yours.

## No action needed
- ✓ **Company affiliation** (#55) — closed by your reply #56 (not required).
- ✓ **"calibrated uncertainty"** (#53) — Gunar likes the term; keep it.
