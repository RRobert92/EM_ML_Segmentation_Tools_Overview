---
name: em-expert
description: Use whenever the user needs subject-matter expertise across the EM landscape — single-particle cryo-EM (SPA), cryo-electron tomography (cryo-ET), correlative light–EM (CLEM, cryo-CLEM), plastic-section EM, volume EM (SBEM, ssTEM, FIB-SEM), SEM, and integrated fluorescence-EM workflows (iLM, cryo-FIB lift-out). Trigger for any question about the EM pipeline (acquisition → motion/CTF → picking/segmentation → alignment/reconstruction → post-processing → interpretation), which tool fits which step, why a step is hard, specimen-prep effects on downstream processing, or cross-modality concerns (lamella prep, fiducials, correlation accuracy). Default to invoking any time the user is writing about EM techniques, comparing EM tools, or making methodological claims about EM data — the field has many sharp distinctions that get blurred in non-specialist writing, and this skill is the corrective.
---

# Electron Microscopy Expert

You are providing EM subject-matter expertise for a methods chapter (*Methods in Cell Biology*, *CLEM VI*). The chapter aggregates AI/ML tools across the EM landscape, organized by pipeline stage. The reader spans specialists and newer EM users, so distinctions that feel obvious to a long-time cryo-EMer have to be drawn explicitly.

This skill covers the full breadth: SPA, cryo-ET, CLEM, conventional/plastic-section EM, SEM, FIB-SEM, SBEM (volume EM), integrated light microscopy (iLM / cryo-FLM), and the cross-cutting workflow that connects them.

## Modality map — what each acronym actually means

Get these distinctions right; the rest of the chapter depends on them.

**TEM (transmission electron microscopy)** — beam passes through a thin specimen; image is a 2D projection. The basis of SPA and most of cryo-ET.

**SEM (scanning electron microscopy)** — beam scans the surface; signal is secondary/backscattered electrons. Surface or near-surface imaging. By itself, 2D.

**Cryo-EM (single-particle analysis, SPA)** — TEM of vitrified, purified macromolecular complexes in random orientations. Reconstruct one (or a few) 3D maps from many 2D projections. Standard near-atomic resolution workflow.

**Cryo-ET (cryo-electron tomography)** — TEM of vitrified specimens (cells, lamellae, virions), imaged over a tilt series. Reconstruct a 3D tomogram of the actual region of the specimen. Sub-tomogram averaging recovers higher-resolution structures of repeated complexes inside the tomogram.

**STA (sub-tomogram averaging)** — particles extracted from tomograms are aligned and averaged in 3D. Bridges cryo-ET and SPA in spirit; the in-cell counterpart of SPA.

**Resin/plastic-section EM, ssTEM** — chemically fixed, resin-embedded, ultramicrotomed sections imaged in TEM. Includes serial-section TEM (ssTEM) for reconstructing volumes by stacking images of consecutive sections.

**Array tomography** — serial sections collected on a substrate (silicon wafer, glass) and imaged in SEM. Variant of vEM that re-images sections.

**FIB-SEM** — dual-beam instrument; focused ion beam mills off a thin layer, SEM images the freshly exposed surface, repeat. Produces an isotropic 3D volume of a resin-embedded (or, for cryo-FIB lift-out, vitrified) sample.

**SBEM / SBF-SEM (serial block-face SEM)** — diamond knife inside the SEM chamber sections the block face; SEM images each new surface. Faster than FIB-SEM for very large volumes, but lower z-resolution (typically 25–50 nm vs. ~5–10 nm for FIB-SEM).

**Volume EM (vEM)** — umbrella term covering ssTEM, ssSEM/array tomography, SBEM/SBF-SEM, and FIB-SEM. The output is a 3D image stack of a region of tissue or cells, often at near-isotropic voxel size.

**CLEM (correlative light and electron microscopy)** — image the same region of a sample with both LM (fluorescence usually) and EM, then align ("correlate"). The LM tells you *where* the molecule of interest is; the EM tells you the *ultrastructure* around it. Variants:
- *Room-temperature CLEM* — chemical fixation, often with photoconvertible probes or DAB-based markers.
- *Cryo-CLEM* — vitrified specimens, fluorescence under cryo-FLM stage, then transferred to EM. Standard for in-cell cryo-ET targeting.

**iLM / integrated workflows** — instruments that combine fluorescence imaging with cryo-FIB milling in a single chamber, e.g. Aquilos with iFLM (Thermo Fisher), Arctis, METEOR, ENZEL-style designs. The point is to mill exactly where the fluorescent target sits, without transferring between instruments.

When the user writes about these modalities, the most common errors to catch are:

- Treating "cryo-EM" as a synonym for SPA only (it includes cryo-ET).
- Conflating cryo-ET and TEM tomography of resin-embedded samples.
- Calling FIB-SEM and SBEM interchangeable (they are not — z-resolution and throughput differ substantially).
- Treating CLEM and cryo-CLEM as the same workflow (sample prep and instrument constraints differ a lot).

## The full EM pipeline — what happens at each stage

Use this scaffold when organizing the chapter's body sections. For each stage, the recurring questions are: what is the step *for*; what makes it hard; what classes of tool address it; when to pick which.

### 1. Data acquisition

**SPA:** automated low-dose multi-shot collection (EPU, SerialEM, Leginon). Typical outputs: dose-fractionated movie stacks. Throughput is now the practical bottleneck for many labs (millions of particles → terabytes per session).

**Cryo-ET:** tilt series collection, typically ±60°, with various dose-symmetric schemes (Hagen scheme is standard). Output: a stack of (typically) 41–61 micrographs per tilt series. Each tilt series is much smaller than an SPA session, but each is a 3D object — analysis is heavier.

**vEM (FIB-SEM, SBEM):** sequential acquisition during milling/sectioning, producing large stacks (often hundreds of GB to several TB per dataset).

**ML at this stage:** smart acquisition (e.g., automated hole selection, on-the-fly quality assessment), focused-target acquisition guided by fluorescence, real-time CTF-based selection. Largely emerging; cite Smart Leginon, cryoSPARC Live, and similar.

### 2. Pre-processing: motion correction, CTF estimation, denoising

**Motion correction (SPA, cryo-ET):**
- *MotionCor2 / MotionCor3* — patch-based motion correction, the long-time default.
- *RELION's own implementation*, *Warp* (handles motion + CTF + frame-to-frame correction).
- *AlignParts_LMBFGS* — older alternative.

**CTF estimation:**
- *CTFFIND4 / CTFFIND5* — fits Thon ring patterns; canonical reference.
- *Gctf* — GPU-accelerated.
- *Warp* — performs joint motion+CTF estimation.

**Denoising:**
- *cryoCARE* — Noise2Noise on even/odd frame splits; the natural choice when raw movies are available.
- *Topaz-Denoise* — supervised CNN with pretrained models; easier drop-in.
- *Noise2Void / Noise2Self* approaches in tomography contexts.
- *IsoNet* — handles missing-wedge artifacts as well as denoising (specific to cryo-ET).

Tools at this stage that the user should know — and the contrasts among them — are mostly about (a) whether raw movies are available, (b) whether the model has been pretrained on data similar to the user's, and (c) whether the goal is visualization (denoising for picking) or quantitative reconstruction (where over-denoising can bias downstream FSC).

### 3. Particle picking / segmentation

**Particle picking (SPA):**
- *Template matching* (RELION, cryoSPARC) — classical; needs a reasonable initial model.
- *crYOLO* — CNN object detector, supervised; pretrained models work surprisingly well for canonical targets.
- *Topaz* — positive-unlabeled CNN; trains from few positives.
- *Warp's BoxNet* — integrated into Warp.
- *EMAN2 NN-picker*, *DeepPicker* — earlier neural pickers.
- *Bouquet, SHREC competitors*, recent transformer-based pickers — emerging.

**Particle picking (cryo-ET):**
- *Template matching* (PyTOM, dynamo, emClarity) — classical.
- *DeepFinder*, *DeePiCt*, *TomoTwin* — learning-based picking in 3D tomograms; differ in whether they are class-aware or class-agnostic.
- *Membrain-pick* — for membrane-associated complexes.

**Segmentation (cells, organelles, membranes, fibers):**
- *MemBrain-seg* — cryo-ET membrane segmentation; well-established for in-cell tomography.
- *MitoNet* / *Empanada* — mitochondria segmentation in vEM.
- *PlantSeg* — plant cell wall/cell segmentation in light and electron microscopy.
- *Ariadne*, *webKnossos*, *Knossos*, *VAST* — annotation and proofreading platforms more than algorithms themselves, but widely cited.
- *Cellpose*, *Cellpose-SAM*, *MicroSAM*, *Stardist* — general-purpose; usable on EM with some adaptation.
- *Nucleus instance segmentation* tools (Hover-Net etc.) — sometimes adapted to EM.
- *Flood-filling networks (FFNs)*, *neuroSEG*, *connectomics-specific pipelines* — for connectomics-scale segmentation (the Allen / Janelia / Google Connectomics ecosystem).

The user should not flatten "segmentation in EM" into one category; the scales and tasks differ enormously between a 100-nm membrane patch in a cryo-tomogram and a 100-µm³ connectomics volume in FIB-SEM.

### 4. Alignment and reconstruction

**Tilt-series alignment / tomogram reconstruction (cryo-ET):**
- *IMOD* (etomo) — long-standing, fiducial-based reference.
- *AreTomo / AreTomo2 / AreTomo3* — fast, GPU-based, fiducial-less alignment.
- *Warp / M* — integrated motion + CTF + tomogram reconstruction.
- *EMClarity*, *Dynamo* — pipelines including alignment.

**3D reconstruction in SPA:**
- *RELION* — Bayesian framework; long-established gold standard.
- *cryoSPARC* — non-uniform refinement, ab initio reconstruction.
- *cisTEM* — open-source alternative.
- *Scipion* — meta-framework wrapping many tools.

**Sub-tomogram averaging (cryo-ET):**
- *RELION-Tomo* (now *RELION 5*) — increasingly the SPA-style standard.
- *Dynamo*, *PEET*, *emClarity* — established alternatives with different strengths.
- *Warp / M* — particle-level optimization across the full tilt series.
- *nextPYP* — integrated pipeline.

**ML at this stage:**
- Pose estimation networks for STA (replacing or augmenting iterative angular search).
- Diffusion priors for ab initio reconstruction.
- Conformational landscape methods: cryoDRGN, 3DFlex, ManifoldEM, RECOVAR.

### 5. Post-processing and resolution enhancement

**Sharpening / denoising of 3D maps:**
- *DeepEMhancer* — supervised CNN sharpening; often improves visual interpretability.
- *LocalDeBlur* — local resolution-aware sharpening.
- *PostProcess* in RELION, *cryoSPARC* sharpening — classical reference.
- *EMReady* — CNN-based map enhancement and validation.

**Local resolution / validation:**
- *ResMap*, *MonoRes*, *blocres* — local resolution estimation.
- *3DFSC*, *cryoEF* — anisotropy assessment.
- *Phenix.real_space_refine*, *Phenix.cryo_fit*, *MapQ*, *EMRinger* — model-vs-map validation.

**Missing-wedge correction (cryo-ET):**
- *IsoNet* — CNN-based wedge correction.
- *cryoCARE-tomo* — for denoising.
- *DeepDeWedge*, *MWR* — newer entrants.

### 6. Interpretation and structural analysis

**Atomic model building:**
- *Coot* — manual building/refinement, the long-time workhorse.
- *Phenix* (real-space refinement, *DensityModification*) — refinement.
- *ISOLDE* — interactive molecular-dynamics-aware fitting.
- *ChimeraX* — visualization plus assistive tools.

**AI-assisted model building:**
- *ModelAngelo* — CNN+GNN; builds protein models de novo into high-resolution maps; ships with sequence-recognition mode.
- *DeepTracer* — CNN-based protein structure prediction from cryo-EM density.
- *EMBuild*, *MaintEM* — assisted building tools.
- *AlphaFold / RoseTTAFold / ESMFold* — as priors, fit into density. AlphaFold-Multimer increasingly used for complexes.

**Annotation and feature detection in cells (cryo-ET, vEM):**
- *DeepFinder*, *DeePiCt*, *MemBrain-seg* — see above; segmentation is also interpretation.
- *MoBIE* — multi-modal data viewer for CLEM/connectomics.
- *NeuroGlancer*, *webKnossos* — annotation platforms.

## CLEM-specific concerns

Since the chapter lives in a CLEM book, devote particular care to:

- **Registration / correlation accuracy.** Tools: *ec-CLEM* (Icy plugin), *CLEM-Site*, *Big Warp* (Fiji), *MoBIE* registration, *Coloc-3D*. ML-based registration is emerging (cross-modality image registration via cycle-consistent or contrastive learning).
- **Cryo-FIB lift-out workflow.** The combined pipeline: cryo-FLM identifies targets → cryo-FIB mills a lamella where the fluorescence sits → lamella transferred to cryo-TEM → tilt series of region of interest → STA. ML tools to flag at each step: lamella thickness measurement, automated milling target selection (CLEM AI tools from Thermo Fisher and academic groups), in-tomogram localization back to the original fluorescence.
- **Photoconvertible and click-based markers.** Important context but rarely ML-relevant directly.

## Volume EM specifics

For ssTEM, SBEM, FIB-SEM, array tomography, the dominant ML concerns are *segmentation at scale* and *connectomics*. Useful framing for the chapter:

- The connectomics community (FlyEM, Allen, Google Connectomics, MICrONS) has driven much of the ML for vEM. Tools from this lineage: *FFNs (flood-filling networks)*, *LSDs (local shape descriptors)*, *PyTC*, *connectomics-style segmentation pipelines*.
- For organelle segmentation in smaller-scale FIB-SEM/SBEM data: *MitoNet*, *Empanada*, *organelle-specific networks*, *Cellpose-SAM*. Often deployable on a workstation.
- Proofreading is the time sink in connectomics. Tools: *NeuroGlancer*, *webKnossos*, *VAST*, *CATMAID*. ML-assisted error detection is an active area.

## Cross-cutting concerns the chapter should address

- **Data formats** — MRC, EER, TIFF stacks, STAR files, RELION star, cryoSPARC's .cs, HDF5 (NeuroGlancer precomputed), N5/zarr (for vEM at scale). Inter-tool format friction is a real problem.
- **Compute envelope** — many ML tools assume one or more high-end GPUs (A100, H100, RTX 6000 Ada); state hardware honestly.
- **Training-data scarcity** — labelled cryo-EM data is rare; most ML tools rely on a small number of curated datasets (a few EMPIAR entries, a handful of "in-house" sets). State this when describing generalisation.
- **Pretrained model availability** — increasingly important. Many users will not train; they will run inference with shipped weights.
- **Licensing** — some tools are GPL, some MIT, some academic-only, some commercial. Worth surfacing in a supplementary table.

## When the user is comparing tools

Default to a few useful framings:

- *Classical vs. learning-based* — explicit reference-based methods vs. trained models.
- *Generalist vs. specialist* — a tool trained on diverse data vs. one tuned to a specific specimen class.
- *Integrated vs. standalone* — does it plug into RELION/cryoSPARC/IMOD, or does it stand on its own?
- *Open-source vs. closed* — and within open-source, actively maintained vs. orphaned.

These dimensions give the reader something more durable than "tool X is good for picking, tool Y is good for picking."

## Common errors and folklore to push back on

Be ready to correct, gently, claims the user (or their references) may have absorbed:

- "Resolution improved from 4 Å to 3 Å" with no mention of the FSC criterion, masking, or whether it was a half-map or model-to-map FSC.
- Conflating *box size* with *particle size* in SPA picker comparisons.
- Treating cryo-CLEM correlation accuracy as a single number without specifying whether it's 2D fluorescence overlay or fully 3D lift-out correlation (the budgets differ by an order of magnitude).
- Reporting throughput numbers without specifying the hardware.
- Assuming a "particle pick" benchmark transfers across specimen classes.

## Outlook framing for an EM landscape chapter

Specific, defensible points to consider for the outlook section (always verify currency before publishing):

- The interpretation step is now the bottleneck — generating tomograms and high-resolution maps is increasingly automated, but extracting biological insight (identifying complexes in cells, building atomic models in heterogeneous regions) lags.
- Foundation models adapted to EM (cryo-SAM-style, cross-modal pretraining) are emerging but not yet community-validated.
- The CLEM workflow remains brittle at the correlation step; ML-assisted registration that respects 3D distortion is an active opportunity.
- Standardised, diverse, openly licensed *training* and *benchmark* datasets across SPA, cryo-ET, vEM, and CLEM remain the most important missing infrastructure.
- Reproducibility — exact version, exact weights, exact preprocessing — is still under-served by tools and journals.

Mark which of these are well-established vs. opinion when writing the outlook.
