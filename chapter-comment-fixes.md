# Chapter comment resolutions — paste-ready fixes

**Document:** AI-based toolkits for Correlative Microscopy approaches (Google Doc)
**Prepared:** 2026-06-20 · Worked through P1 → P3, one comment at a time.

How to use this: each entry gives the comment, the anchor to find it in the Doc, and a **Fix** you can paste (or a decision to make). Citations were verified against the source where noted. A few items depend on the Doc's exact current wording or table layout — those are flagged **[confirm in Doc]**. Where your latest `chapter-draft.md` already solves a comment, it's marked **[already in your draft]** with the sentence to paste.

---

# P1 — Fix first

## Factual corrections

### [#60] Gunar — "Mutex Watershed" (modality)
**Comment:** Mutex Watershed is a vEM/connectomics method; listing cryo-ET as a primary modality is unusual — move it to connectomics/vEM or change modality to FIB-SEM/SBEM/ssTEM/vEM.
**Fix:** Done in the catalog data (`tools.json`) — cryo-ET removed; it now reads FIB-SEM, SBEM, ssTEM. **Apply the same fix in Table 1 §3.2:** change the Mutex Watershed modality cell from `cryo-ET, FIB-SEM, SBEM, ssTEM` to **`FIB-SEM, SBEM, ssTEM`**. (It already sits correctly under Volume EM segmentation → Connectomics, so no move needed.)

### [#9 / #47] Müller-Reichert & Gunar — "(SPA) particle picking (n=18)" / "18"
**Comment:** The plot shows 19 tools but the label says 18.
**Fix:** **19 is correct.** The catalog has 19 SPA particle-picking tools (confirmed in Table 1 §1.1). Change the figure label and any in-text "18" to **19**. The figure (`figure-1-tools-by-task-and-approach.png`) needs the SPA count regenerated to 19 — I can regenerate it if you point me to the plotting script.

### [#32] Gunar — "can produce near-isotropic voxel resolution"
**Comment:** Most FIB-SEM data is in fact not that well resolved in z; this needs sophisticated milling.
**Fix:** Qualify the claim. Replace the FIB-SEM clause with:
> "…focused-ion-beam SEM (FIB-SEM), which mills and images alternately and **can reach near-isotropic voxels (≈5–10 nm) when milling is carefully controlled, though in routine practice z-resolution is often coarser**;"

This keeps FIB-SEM's defining advantage over SBEM while conceding Gunar's practical point.

### [#16] Gunar — "beam axis"
**Comment:** tilt axis?
**Fix:** Neither "beam axis" nor "tilt axis" is quite right here — the missing wedge elongates features along the **direction of the electron beam (the z / optical axis)**, which arises *because* the tilt range around the tilt axis is incomplete. Reword to remove ambiguity:
> "…so isotropic features appear elongated **along the beam direction (the z-axis)**, a consequence of the incomplete tilt range."

Keep "beam direction"; the elongation is along the beam, not along the tilt axis.

## Citations (verified)

### [#12] Gunar — "Einstein-from-noise problem"
**Comment:** Cite the PNAS paper (10.1073/pnas.1314449110).
**Fix — verified:** Add **(Henderson, 2013)**. Full reference:
> Henderson, R. (2013). Avoiding the pitfalls of single particle cryo-electron microscopy: Einstein from noise. *PNAS* 110(45), 18037–18041. doi:10.1073/pnas.1314449110

Insert at first mention of "the *Einstein-from-noise* problem" in §2.1.

### [#38 / #39 / #63] Müller-Reichert & Gunar — "Thermo Fisher" / Amira citation
**Comment:** Amira needs a correct/proper reference, not just the vendor.
**Fix — verified (the reference TMR supplied is correct):**
> Stalling, D., Westerhoff, M., & Hege, H.-C. (2005). Amira: A Highly Interactive System for Visual Data Analysis. In C. D. Hansen & C. R. Johnson (Eds.), *The Visualization Handbook* (ch. 38, pp. 749–767). Academic Press (Elsevier).

Use this as Amira's citation in Table 1 §4.2 (replacing "vendor; no peer-reviewed paper") and in prose §5.3. Keep the vendor URL as a secondary note. This is the canonical academic citation for Amira regardless of the current Thermo Fisher branding.

### [#29] Müller-Reichert — "Kiewisz et al., 2024/2025"
**Comment:** Give one reference here.
**Fix:** Use the single bioRxiv v2 entry already in your reference list:
> Kiewisz et al. (2024). TARDIS-EM. *bioRxiv* (preprint, v2). doi:10.1101/2024.12.19.629196

Drop the "2024/2025" dual form; cite **Kiewisz et al., 2024** throughout, and refresh to the peer-reviewed version at proof stage if it appears.

### [#57] Müller-Reichert — "George 2021" (CASSPER)
**Comment:** Give the reference in the style used throughout the paper.
**Fix:** "George 2021" is the **CASSPER** citation (Table 1 §1.1) — the style (Surname Year) already matches the rest, so in-text it's fine as **(George et al., 2021)**. The real gap is that CASSPER is **missing from `chapter-references.md`**. Add the full entry:
> George, B., et al. (2021). CASSPER … *Communications Biology*. **[confirm volume/DOI]**

I could not fully verify CASSPER's bibliographic record from the project files — confirm the venue/DOI before submission (it is commonly cited as *Communications Biology*, 2021).

### [#58] Gunar — "Zhang" (year missing)
**Comment:** Year missing.
**Fix:** This is **Gautomatch** (K. Zhang, MRC-LMB), which has **no peer-reviewed paper and no publication year** — that's why the year is blank. Don't invent one. Cite it as software:
> Zhang, K. *Gautomatch* [software]. MRC Laboratory of Molecular Biology. https://www.mrc-lmb.cam.ac.uk/kzhang/

(If the "Zhang" you flagged is instead **EPicker**, that one is **Zhang et al., 2022**, *Nat. Commun.*, doi:10.1038/s41467-022-29994-y. **[confirm which Zhang in the Doc]**)

### [#59] Gunar — "citation unverified"
**Comment:** What does this mean?
**Fix:** It's a placeholder for catalog entries that had no confirmed citation. Two tools carry it — resolve both:
- **Gautomatch** → cite as software (see #58 above).
- **Ariadne / 3dEMtrace** → a commercial connectomics service with no peer-reviewed paper; cite by vendor URL (ariadne.ai). Mark availability **Vendor**.

Then remove the "citation unverified" string everywhere it appears.

### [#11] Gunar — "(Lucas et al., 2021)" (citation consistency)
**Comment:** Why cite a paper here but not for the previous software? All or none. Ref is also in the table.
**Fix:** Make in-text citation consistent: give the author–year citation at **first mention of every named tool** in prose (you already do for most). The earlier RELION/cryoSPARC reference-based picking should also carry its citation — **(Scheres, 2015)** — at first mention, matching the cisTEM 2DTM **(Lucas et al., 2021)** treatment. Rule: every tool named in the body gets one author–year cite at first mention; the table repeats the short key. No tool is cited in the table but not the prose, or vice-versa.

## Terminology the senior author insists on

### [#33 / #36] Müller-Reichert — "ss" → "ser-sec" (throughout)
**Comment:** Don't use the "ss" abbreviation — "historically forbidden"; change to "ser-sec" throughout (#36: "ser-secTEM — change throughout the manuscript!!").
**Fix:** He feels strongly (the "ss" string is a sensitivity for a German group), so the clean resolution is to **avoid the bare "ss" abbreviation entirely**: spell out **"serial-section TEM"** on first use and use **"ser-secTEM"** as the abbreviation thereafter. Global find/replace `ssTEM` → `ser-secTEM` (and check the acronym table, Table 1.1, and all table cells/figure labels). Note for your awareness: `ssTEM` is the community-standard abbreviation, so if you'd rather keep it you'd be pushing back on the editor — given it's his volume, complying is the low-friction call.

## Tables & numbering

### [#26 / #65] Müller-Reichert & Gunar — "Tab. 2.1 – 2.2" / "why table 7? should be 14?"
**Comment:** Fix the table numbering; a table labelled 7 appears where 14 is expected.
**Fix:** The Doc's per-section tables have drifted out of sequence. Adopt one rule: **number tables sequentially in order of first appearance** (Table 1, 2, 3 …), or keep the single master "Table 1" with sub-sections §1.1–§7.1 as in `chapter-table1.md`. The master-table scheme is cleaner for a tool catalog and removes the renumbering problem entirely. **[confirm in Doc]** — send me the Doc's current list of table headings and I'll give you the exact old→new number mapping.

### [#6] Müller-Reichert — "(Table 1)" in the introduction *(re-opened, #3/#5/#8)*
**Comment:** Don't give table numbers in the introduction; do it in the main text.
**Fix:** In the intro, refer to the catalog without the number — e.g., "an interactive, searchable catalog (see the *Open Resource* note)" — and place the explicit "(Table 1)" / "(Table N)" pointers at the first relevant mention inside each body section. This is the reopened thread, so it's an active decision: recommend **accept** (drop numbers from the intro).

### [#64] Gunar — "Table 10. CLEM registration" (single-tool table)
**Comment:** If there's only one tool, does a separate table make sense? Integrate into a later one.
**Fix:** Yes — merge it. The deep-learning/segmentation-driven CLEM table holds only **CLEM-Reg**; fold §5.1, §5.2, §5.3 into a **single "CLEM registration" table** (landmark, deformable, segmentation-driven, and acquisition-time correlation as grouped rows). Matches the master-table structure in `chapter-table1.md`.

### [#62] Gunar — "Table 8" (add more)
**Comment:** Add more here according to your website and my comments above.
**Fix:** Expand this table to match the catalog. **[confirm which section Table 8 maps to in the Doc]** — once you tell me (likely Volume EM or General-purpose), I'll list the catalog rows that are missing from it so the table and the website agree.

---

# P2 — Substantive (clarity & domain judgment)

## Define / clarify terms

### [#20 / #21] Gunar — "STA"
**Comment:** What does STA mean?
**Fix [already in your draft]:** Your acronym table (Table 1.1) defines it. Ensure the **first prose use** spells it out: "subtomogram averaging (STA)". If the Doc lacks the acronym table, paste this row: *STA — Subtomogram averaging: aligning and averaging many copies of the same complex extracted from tomograms.*

### [#49] Gunar — "iFLM"
**Comment:** Explain.
**Fix:** Spell out at first use: "**integrated fluorescence light microscope (iFLM)** — a fluorescence imager built into the cryo-FIB/SEM chamber, used to position lamella milling on a fluorescent target without transferring the sample." (Your Table 1.1 already has the short gloss.)

### [#51] Gunar — "GAN-style methods"
**Comment:** What does this mean?
**Fix — this is a correction, not just a definition.** IsoNet and DeepDeWedge are **not GANs**. IsoNet is a self-supervised U-Net trained with an iterative refinement scheme; DeepDeWedge uses a Noise2Noise-style self-supervised objective. Replace "the GAN-style methods that dominate IsoNet and DeepDeWedge" (§8.3) with:
> "…in place of the **self-supervised CNN inpainting** used by IsoNet and DeepDeWedge."

This fixes an inaccurate architecture claim and removes the undefined term in one move.

### [#17] Gunar — "SO(3) rotation group"
**Comment:** This is not understandable.
**Fix:** Define inline in plain language (§3.1):
> "…the orientation search runs over **all possible 3D rotations of the template (the SO(3) rotation group)** rather than a single in-plane angle…"

### [#13 / #23] Gunar — "YOLO-architecture" / "adapts the YOLO"
**Comment:** I don't know what that means; and earlier it was crYOLO, not YOLO.
**Fix:** Define YOLO at first use (§2.2, crYOLO):
> "**crYOLO** (Wagner et al., 2019) is built on YOLO ('You Only Look Once'), a fast single-shot CNN object detector from computer vision that finds all particles in one forward pass."

Then in §3 keep the distinction explicit: "**PickYOLO** adapts the same YOLO detector (not crYOLO) to 3D tomograms." That resolves #23.

### [#15] Gunar — "CryoPPP"
**Comment:** Explain what this is.
**Fix [partly in your draft]:** Expand to: "…pretrained on **CryoPPP, a large public cryo-EM particle-picking dataset of labelled micrographs spanning many protein types**, assembled to train and benchmark pickers."

### [#27] Müller-Reichert — "hallucinate"
**Comment:** Produce false information?
**Fix:** Keep the term but gloss it on first use (§4.1): "…can **hallucinate structure — introduce features not supported by the underlying data —**…". (See #28, which is the same sentence.)

## Scientific challenges to answer

### [#14] Gunar — "crYOLO's fully supervised training"
**Comment:** The previous paragraph didn't establish that this tool is fully supervised.
**Fix:** State the training paradigm where crYOLO is introduced (§2.2), so the later phrase is grounded:
> "crYOLO is **fully supervised** — training requires manually labelled particles — but its pre-trained *general model* removes that requirement for most standard targets."

### [#28] Gunar — "denoised tomogram should never feed back into a structure determination chain"
**Comment:** I don't understand — you denoise to determine the structure, so it's always fed in.
**Fix:** The point is a specific one about *high-resolution averaging*, not all structure work. Reword §4.1:
> "These tools belong upstream of segmentation and visualisation, but not inside **high-resolution averaging**. A learned denoiser can introduce features not present in the data and breaks the independence of the half-maps that FSC resolution estimates rely on. Denoise to *see* the tomogram and to *pick and segment* it — but run the final subtomogram averaging on the original, un-denoised data."

### [#25] Gunar — "worst SNR"
**Comment:** Can you really make this statement? There's always something worse.
**Fix:** Replace the superlative (§4):
> "…**among the lowest signal-to-noise of any structural-biology data — roughly an order of magnitude below an SPA micrograph**…"

### [#24] Gunar — "TomoTwin's accuracy … is below DeepFinder's; its value is generality"
**Comment:** Why not always use it then? What are the downsides?
**Fix:** Make the trade-off explicit (§3.3):
> "The trade-off is accuracy. On a well-characterised target with good training labels, a supervised localizer (DeepFinder, DeepETPicker) is more precise. Reach for TomoTwin when the target is novel, labels are unavailable, or you need to re-pick across datasets without retraining — not when a labelled, well-benchmarked target is already in hand."

### [#0] Gunar — "These are all segmentation problems"
**Comment:** Not necessarily — sometimes people compare phenotypes without segmenting.
**Fix:** Soften the universal claim (§1):
> "Most of these are, at root, **segmentation problems** — though not every analysis needs explicit segmentation; some phenotypic comparisons work directly on image statistics."

### [#50] Gunar — "No widely adopted tool currently does this"
**Comment:** Isn't ec-CLEM calculating something like an error map?
**Fix:** Scope the claim to *segmentation* (§8.2) and concede the registration point:
> "No widely adopted **segmentation** tool currently reports well-calibrated per-voxel confidence. (Registration is further ahead here — ec-CLEM, for example, already reports a predicted registration error from its fiducials.)"

### [#18] Gunar — "but the algorithm is mature"
**Comment:** Says who? Use more scientific justification (widely used / highly cited).
**Fix:** Replace the assertion (§3.1):
> "…but **3D template matching is long-established and remains in wide production use** (PyTOM, Dynamo, emClarity)."

### [#19] Gunar — "high-quality reference structure is available"
**Comment:** You mean there is a good PDB structure?
**Fix:** Clarify (§3.1): "…when a high-quality reference structure is available — **an accurate atomic model or prior density map of the target, e.g. a PDB or EMDB entry for the complex**…"

### [#37] Gunar — "EM" (works on LM too)
**Comment:** It also works on LM (phase contrast, per their website) — maybe write "microscopy data"?
**Fix:** Where a tool that also handles light microscopy is described as "EM", broaden to "microscopy data" or list both modalities explicitly. **[confirm which tool in the Doc]** — likely a general-purpose tool (Cellpose-class) or TARDIS-EM (whose modalities already include LM). Send me the sentence and I'll reword it precisely.

## Content to add

### [#48] Gunar — "What remains hard to achieve?" (metadata standards)
**Comment:** Metadata standards for EM data are missing — without machine-readable preparation metadata, generalisation is hopeless.
**Fix:** Strong point; add a short paragraph in §7.2 (training data):
> "A subtler gap is **metadata**. EM preparation is enormously diverse — organism, fixation, resin, heavy-metal stain, section thickness — and the same organelle looks different across protocols. Without machine-readable preparation-and-acquisition metadata attached to training data, a model cannot know which preparation it is seeing, and cross-dataset generalisation suffers accordingly. Standardised structured metadata is as important to EM machine learning as the images themselves, and is currently the least-developed part of the shared-data substrate."

### [#2] Gunar — missing segmentation tools (Imaris, Aivia, ZEN)
**Comment:** Imaris (Bitplane), Aivia (Leica), ZEN (Zeiss) are missing — all have built-in AI segmentation, some on the microscope.
**Fix:** Add all three to §4.2 Commercial platforms (alongside Amira, arivis Pro, Dragonfly):
- **Imaris** (Oxford Instruments / Bitplane) — AI-assisted 3D segmentation and analysis; strong in LM/vEM. Vendor.
- **Aivia** (Leica) — deep-learning microscopy image analysis with pixel/instance segmentation. Vendor.
- **ZEN Intellesis** (Zeiss) — machine-learning segmentation built into ZEN, usable on-instrument. Vendor.

Want me to add these three to `tools.json` (and the table) so the website and chapter match? Say the word and I'll do it with the multi-valued tags.

### [#44] Müller-Reichert — "projects." (general Amira comment)
**Comment:** Add a general comment about Amira here.
**Fix:** Add to §5.3:
> "Amira (Stalling et al., 2005) is the long-standing commercial workhorse for vEM visualisation, segmentation, and quantification; its breadth and polish keep it in wide use despite being closed-source, and recent versions add deep-learning-assisted segmentation."

### [#45] Müller-Reichert — "For large vEM volumes — whole-tissue FIB-SEM, sectioned and remounted samples,"
**Comment:** I don't get this point; something is wrong here.
**Fix:** Rewrite the sentence (§6.2):
> "Large vEM volumes — whole-tissue FIB-SEM, or samples that were physically sectioned and remounted — need registration that can absorb the **non-rigid deformations introduced by sectioning, mounting, and resin shrinkage**."

### [#52] Müller-Reichert — "the per-paper rate of method churn"
**Comment:** I'm not sure I get the point — what do you want to say?
**Fix:** Reword (§9): "…**new methods continue to appear and supersede one another at a rapid pace**." (Drop the "per-paper rate of method churn" phrasing.)

### [#34] Müller-Reichert — "tomography" (serial sections + SEM is a different story)
**Comment:** Serial sections for antibody staining imaged by SEM is a different workflow; list it as a separate (4th) point, not together with serial TEM.
**Fix:** Where you enumerate the vEM modalities, split **array tomography / serial-section SEM (immuno-EM, SEM imaging)** out from **ssTEM (ser-secTEM)** as its own item, noting the different use (antibody staining, SEM as the imaging step). **[confirm exact list location in Doc]** — point me to it and I'll write the 4-item version.

### [#35] Müller-Reichert — section breaks (anchor not found / range comment)
**Comment:** In some sections above I deleted the section break; we should keep them throughout. My mistake — go back to the original.
**Fix:** Manual Doc edit — restore the section/page breaks between major sections that were removed, so the layout is consistent throughout. (Formatting only; nothing to rewrite. I can't restore Doc breaks from here, but flagging it so it isn't missed.)

---

# P3 — Polish & author discretion

### [#61] Gunar — "SPA, STA" (acronym list)
**Comment:** With this many abbreviations, a list of acronyms would be very handy.
**Fix [already in your draft]:** `chapter-draft.md` has **Table 1.1 — Acronyms**. If the Doc doesn't, paste it in near the end of the introduction. This single addition also answers the "define this" comments (#20/21 STA, #49 iFLM, etc.). High-leverage — do this one early.

### [#10] Gunar — "Gautomatch" (highlight software names)
**Comment:** Highlight all software packages (colour/underline) so the names stand out from the prose.
**Fix (decision):** Worth doing but high-effort and a house-style choice. Lightweight option: render every tool name in **bold** at first mention (you already bold many). Avoid colour/underline in a print chapter — Elsevier typesetting will strip it. Recommend: consistent **bold on first mention**, plain thereafter. *Your call on whether to apply throughout.*

### [#22] Gunar — "a tomogram-load of false positives rather than a micrograph-load"
**Comment:** Nobody will get this joke — rephrase.
**Fix:** Plain version (§3.1):
> "…a poor template produces false positives **throughout the 3D volume, not just across a 2D micrograph — a larger error burden in cryo-ET than in SPA**."

### [#1] Gunar — "tractable but not solved"
**Comment:** Too ambiguous — can segmentation ever be "solved"?
**Fix:** Tighten (§1):
> "…into a third category: **routinely tractable, though not fully automated — the tools work well on common cases and still fail on hard ones**."

### [#30] Gunar — "dedicated tools." (list use-cases first)
**Comment:** Maybe list the use-cases first, then the text (filaments / vesicles / …).
**Fix (optional structure):** Open §4.3 with a one-line list — "Three feature types have dedicated tools: **filaments**, **synaptic vesicles**, and **membrane-anchored complexes**." — then the per-tool prose. Improves skimmability; purely a structural preference.

### [#31] Gunar — "filaments" (actin / intermediate filaments)
**Comment:** Mention if/how it applies to other filaments (actin, IF).
**Fix:** Add to the TARDIS-EM paragraph (§4.3):
> "TARDIS-EM is trained primarily on microtubules; extension to actin and intermediate filaments is a natural direction but is not yet validated." (Consistent with its stated limitations.)

### [#43] Müller-Reichert — "s" (plurals in recommendations)
**Comment:** Always give the plural in your recommendations.
**Fix (style):** In the **Practical recommendation** blocks, phrase so more than one tool can apply — "reach for **these tools**", "the appropriate **choices** are…" — rather than implying a single mandated tool. **[confirm exact spots in Doc]**; it's a light pass over the recommendation sentences.

### [#42 / #46] Müller-Reichert — example references in the recommendation sections
**Comment:** Wouldn't it be nice to add some references/examples in the recommendation sections? (He notes: "might be too much work.")
**Fix (decision):** Optional. Adding one example citation per practical-recommendation block (a paper that used the recommended tool) raises authority but is real work and risks turning recommendations into a literature review. Recommend: **defer** for now, or add only where a canonical example is obvious. Your call — TMR himself flagged it as maybe-too-much.

---

# Admin

### [#54] Müller-Reichert — "Acknowledgements"
**Comment:** Any acknowledgements from your side?
**Fix:** Add an Acknowledgements section — funding sources, facilities, and anyone who contributed but isn't an author. Needs your input (grants, core facilities). Tell me what to include and I'll draft it.

### [#53] Gunar — "calibrated uncertainty" — **no action** (he likes the term; keep it).
### [#55 / #56] Müller-Reichert / you — company affiliation — **resolved** by your reply (not required).

---

# Coverage check — all 66 comments

Every comment ID is accounted for:

- **P1 (16):** #6, #9, #11, #12, #16, #26, #29, #32, #33, #36, #38, #39, #47, #57, #58, #59, #60, #62, #63, #64, #65
- **P2 (19):** #0, #2, #13, #14, #15, #17, #18, #19, #20, #21, #23, #24, #25, #27, #28, #34, #35, #37, #44, #45, #48, #49, #50, #51, #52
- **P3 (8):** #1, #10, #22, #30, #31, #42, #43, #46, #61
- **Admin / no-action (5):** #54 (acknowledgements, needs you); #53, #55, #56 (no action)
- **Resolve/reopen markers folded into their threads:** #3/#4/#5/#7/#8 → the *(Table 1)* intro-numbering thread (#6); #40/#41 → the Amira/Thermo Fisher citation thread (#38/#39).

**Open questions for you (where I need the Doc's exact text/layout):** the table renumbering map (#26/#62/#65), which tool the "EM → microscopy" note is on (#37), the serial-section list location (#34), and the plural-recommendation spots (#43). Point me at those and I'll finish them precisely.
