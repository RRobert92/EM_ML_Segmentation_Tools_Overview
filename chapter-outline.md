# Chapter Outline: AI/ML Tools Across the Electron Microscopy Pipeline

*Book: Correlative Light and Electron Microscopy VI, Methods in Cell Biology, Elsevier*
*Drafted: 2026-05-18 — for approval before writing begins*

---

## Overall argument

The chapter makes three claims the reader should leave with:

1. AI and machine learning have penetrated every stage of the EM pipeline, but unevenly — segmentation and structural interpretation are deeply transformed; acquisition and tilt-series reconstruction remain mostly classical with ML components layered on top.
2. No single tool dominates end-to-end. Expert use means knowing which tool fits which problem class, not which is "best."
3. The next productive frontier is not more tools for solved problems — it is generalisation across modalities, in-situ reliability, and end-to-end integration of the pipeline.

---

## Proposed section structure

### 1. Introduction

**Goal:** Orient the reader to the scope, justify the review, justify its inclusion in *Correlative Light and Electron Microscopy VI*, and set the pipeline frame.

**Arguments to make:**
- EM has grown from a manual, specialist-intensive technique to one where automated or AI-assisted processing is now the norm at every stage. A working scientist entering the field today faces a catalogue of 216 tools cataloged for this chapter (~70 discussed in prose, the remainder in Table 1) — this chapter provides a map.
- **Why this chapter belongs in a CLEM volume.** CLEM is a consumer of the entire EM pipeline: the LM side identifies the target, but every claim drawn from a CLEM experiment depends on what happens downstream — efficient acquisition, faithful reconstruction, accurate segmentation, validated structural interpretation. AI/ML have reshaped most of these downstream steps, which in turn determines whether CLEM produces an interpretable result. A practitioner planning a CLEM experiment in 2026 needs to know what is now solved, what is still hard, and which tool to reach for at each step — that is what this chapter delivers.
- The pipeline frame: acquisition → preprocessing (motion, CTF, denoising) → picking/segmentation → reconstruction/alignment → post-processing → structural interpretation. Each stage has distinct bottlenecks; AI has addressed some but not others.
- Scope statement: SPA cryo-EM, cryo-ET and subtomogram averaging (STA), volume EM (FIB-SEM, SBEM, ssTEM, array tomography), and CLEM/cryo-CLEM. Connectomics and structural proteomics tools appear where their algorithmic challenges overlap with the rest of the pipeline (segmentation at scale, model building from density).
- What this chapter is not: a step-by-step protocol, a software manual, or an endorsement of specific commercial platforms.

**Glossary / abbreviations box (early in §1):** SPA (single-particle analysis), STA (subtomogram averaging), CTF (contrast transfer function), FSC (Fourier shell correlation), SNR (signal-to-noise ratio), vEM (volume EM), ssTEM (serial-section TEM), SBEM (serial block-face SEM), FIB-SEM (focused-ion-beam SEM), EER (electron-event representation), iFLM (integrated fluorescence light microscope), cryo-PFIB (plasma FIB at cryo). Brief one-line definitions for each, intended for the less-experienced reader and as a reference for the rest of the chapter.

**Figure 1 placement:** Pipeline diagram showing the five stages with relative time-cost per stage (qualitative, colour-coded — see *Figure notes* below for sourcing) and the approximate ML penetration at each stage. Key tool families annotated at the relevant stages.

**Audience conventions used throughout the chapter:**
- Each stage section opens with a plain-language paragraph describing what the step does and why it is hard, before any tool names appear.
- Each subsection ends with one sentence of practical guidance ("for most users, start with X").
- Acronyms are introduced once on first use and listed in the glossary; the prose does not assume reader familiarity beyond what was defined in §1.

---

### 2. Data Acquisition and On-the-Fly Quality Control

**Goal:** Describe how automation and ML have changed what happens at the microscope, without over-promising (most hardware control remains classical).

**Central problem to lead with:** Microscope time is the rarest and most expensive resource in structural EM. Manual acquisition wastes significant fractions of every session to user fatigue, poor-quality targets, and suboptimal grid areas.

**Subsections and exemplar tools:**

#### 2.1 Automated data collection

Classical automation is mature and well-established:
- **SerialEM** (Mastronarde 2005, *J Struct Biol*) — the open-source standard for SPA and cryo-ET on virtually all TEM platforms; the foundation on which most script-based smart acquisition is built.
- **EPU / Smart EPU** (Thermo Fisher, vendor) — commercial SPA acquisition on Krios/Glacios; "Smart EPU" adds vendor AI for hole selection and ice classification. Note vendor status; no peer-reviewed paper.
- **PACE-tomo** (Eisenstein 2023, *Nature Methods*) — beam-image-shift scheme for high-throughput cryo-ET; multiplies effective targets per stage move.
- **Hagen dose-symmetric tilt scheme** (Hagen 2017, *J Struct Biol*) — default tilt scheme for high-resolution STA.

Brief mention (table): Leginon, Tomo5, JADAS, GridTape, ATUM, MultiSEM for respective niches.

#### 2.2 ML-driven smart acquisition

The shift from "collect everything, filter later" to "decide at the microscope":
- **SmartScope** (Bouvette 2022, *eLife*) — ML-guided multi-grid screening; reduces operator time per session.
- **SPACEtomo** (Eisenstein 2024, *Nature Methods*) — ML target selection for cryo-ET on lamellae; detects biological features (mitochondria, nuclei) to direct tilt-series positioning.
- **Ptolemy** (Kim 2023, *IUCrJ*) — drop-in ML hole-quality classifier for Leginon; illustrates how ML can slot into existing acquisition software.
- **AutoLamella** (Cleeve 2023, *J Struct Biol*) — open-source automated cryo-FIB lamella preparation; removes the operator bottleneck from in-situ sample prep.

Discuss how these tools change the operator's role: from hands-on collector to session designer and exception handler. Note the "garbage in, garbage out" principle — smart acquisition upstream reduces wasted compute downstream.

#### 2.3 On-the-fly quality control and real-time feedback

- **Warp** (Tegunov 2019, *Nature Methods*) — live motion correction, CTF estimation and on-the-fly BoxNet picking during acquisition; pairs with M downstream.
- **cryoSPARC Live** (Punjani 2017, *Nature Methods*) — real-time 2D class monitoring; the cryoSPARC ecosystem's answer to same problem.
- **MicAssess / Miffi** (Li 2020, *Structure*; Xu 2024, *J Struct Biol*) — ML micrograph classifiers; binary or multi-class rejection of unusable images. Contrast: MicAssess is simpler/faster; Miffi improves on Fourier-domain artefacts.

Key message: real-time QC tools pay for themselves by preventing the downstream cost of processing thousands of unusable micrographs.

#### 2.4 Fluorescence-guided cryo-CLEM acquisition

Brief treatment:
- Integrated FLM systems (Arctis iFLM, METEOR) for guided lamella milling.
- Registration tools at acquisition time: 3DCT, CorRelator.
- The unresolved problem: correlation accuracy on integrated systems is improving but remains the limiting factor for cryo-CLEM resolution.

---

### 3. Preprocessing of Micrographs and Movies

**Goal:** Describe what has and hasn't changed in the "pipe" between raw frames and usable images. Most of this stage is classical; the ML additions are specific and well-characterised. Tilt-series alignment and tomogram reconstruction were previously placed here but are conceptually closer to reconstruction and are treated in §5.

**Central problem to lead with:** Every downstream result is constrained by the quality of the preprocessed data. CTF errors and uncompensated beam-induced motion are the two most common sources of resolution loss that preprocessing is designed to minimise.

#### 3.1 Motion correction

- **MotionCor2 / MotionCor3** (Zheng 2017, *Nature Methods*) — the field's default GPU motion corrector; integrates into virtually every SPA pipeline. MotionCor3 adds EER support and improved tilt-series handling.
- **Bayesian polishing (RELION)** (Zivanov 2019, *IUCrJ*) — per-particle motion correction as a post-refinement step; essential for sub-3 Å resolution in RELION workflows.
- **Warp** — covers the same ground with a different implementation; mention integration advantage.
- **M** (Tegunov 2021, *Nature Methods*) — multi-particle per-frame refinement for cryo-ET; the tool that pushed STA toward sub-4 Å.

Note: motion correction is largely solved for SPA; cryo-ET frame-level correction on thick lamellae remains harder.

#### 3.2 CTF estimation

- **CTFFIND4** (Rohou 2015, *J Struct Biol*) — the open-source standard; reliable, fast, well-validated.
- **CTFFIND5** (Elferich 2024, *eLife*) — adds tilt-aware and phase-plate estimation; supersedes CTFFIND4 for lamella and tilted data.
- **Gctf** (Zhang 2016, *J Struct Biol*) — historically relevant GPU-accelerated alternative; per-particle defocus refinement.
- **novaCTF** (Turonova 2017, *J Struct Biol*) — 3D CTF correction for STA; required before pushing below ~20 Å in tomographic data.

Brief: Patch CTF (cryoSPARC) for users in a cryoSPARC-only pipeline.

#### 3.3 Denoising

Lead with the SNR problem in cryo-EM and why denoising is fundamentally different from medical imaging (cannot increase dose; noise is quantum-limited).

Organise by training paradigm — this is what differentiates approaches:

- **Topaz-Denoise** (Bepler 2020, *Nature Communications*) — pretrained self-supervised denoiser; works out-of-the-box on SPA micrographs and cryo-ET tomograms without any user data. The most practical first-line choice.
- **cryo-CARE** (Buchholz 2019, *IEEE ISBI*) — even/odd split Noise2Noise training; requires paired half-tomograms; sets the quality ceiling for cryo-ET denoising.
- **Noise2Void** (Krull 2019, *CVPR*) — self-supervised, no paired data needed; useful for legacy datasets.
- **IsoNet** (Liu 2022, *Nature Communications*) — self-supervised missing-wedge restoration; addresses a distinct artifact from noise per se.
- **DeepDeWedge** (Wiedemann 2024, *Nature Communications*) — simpler missing-wedge correction alternative to IsoNet.

Discuss what denoising should and should not be used for: visualization and segmentation preprocessing yes; structure determination no (risk of hallucinating features). Briefly note DenoisET (Peck 2025, *bioRxiv companion to AreTomoLive*) as the live-acquisition counterpart for cryo-ET denoising on the microscope; *preprint, refresh citation.*

*Practical recommendation:* For most users, start with Topaz-Denoise out of the box; move to cryo-CARE only when even/odd halves are available and the application is segmentation rather than refinement.

---

### 4. Particle Picking and Segmentation

**Goal:** The stage where ML has had the most dramatic impact, across both SPA picking and volume segmentation. Frame the discussion around the supervised → self-supervised → foundation-model trajectory.

**Central problem:** Locating biological objects — particles, membranes, organelles, neurons — in low-SNR, high-noise images is a detection problem where human labels are expensive and generalisation across datasets is hard.

#### 4.1 SPA particle picking

Organise by approach (not alphabetically):

**Template-based (classical baseline):**
- Template matching (RELION/cryoSPARC built-ins) — still the default when a high-quality 2D average is available; prone to template bias (Einstein-from-noise problem).

**Supervised ML (general models):**
- **crYOLO** (Wagner 2019, *Communications Biology*) — YOLO-based single-shot detector; general pre-trained model means zero training in most cases; first-line choice for most users. Filament support.
- **Topaz** (Bepler 2019, *Nature Methods*) — semi-supervised positive-unlabelled learning; excels when labels are sparse; handles small/non-globular particles that crYOLO misses.
- **EPicker** (Zhang 2022, *Nature Communications*) — accumulating model supports diverse morphologies (particles, vesicles, fibers) without retraining per type.

**Consensus and ensemble:**
- **REPIC** (Cameron 2024, *Communications Biology*) — principled voting ensemble across multiple pickers; use when single-picker false positive rate is too high.

**Emerging (few-shot / foundation):**
- Brief mention of CryoSegNet (SAM-augmented), CryoTransformer, UPicker — note that these are recent and benchmarks are not yet settled.

Key message: the "best" picker is dataset-dependent. For most datasets crYOLO with the general model is the fastest start; Topaz is worth the training effort when particle density is low or SNR is very poor.

#### 4.2 Macromolecule localisation in tomograms (cryo-ET picking)

Different from SPA picking: 3D context, fewer particles, missing-wedge artifacts.

- **DeepFinder** (Moebel 2021, *Nature Methods*) — multi-class localisation; the field's primary reference for in-tomogram ML picking; requires labelled training data per target.
- **TomoTwin** (Rice 2023, *Nature Methods*) — metric-learning embedding; class-agnostic, no retraining per particle; strong for novel targets and discovery.
- **DeePiCt** (de Teresa-Trueba 2023, *Nature Methods*) — combined organelle context + particle picking in one pipeline; useful when particle identity depends on cellular context.
- **MemBrain-pick** (Lamm 2022, *Comput Methods Programs Biomed*) — specifically for membrane-embedded proteins; preserves orientation along membrane.
- **PyTOM-Match-Pick** (Chaillet 2023, *Int J Mol Sci*) — classical template matching modernised; recommended when a known structure is available (ribosome, proteasome).

#### 4.3 Volume EM and tomogram segmentation

Distinguish the problem: in vEM (FIB-SEM, SBEM, ssTEM) the data volume is large and SNR is moderate; in cryo-ET, SNR is very low but resolution is higher. Tools are not always interchangeable.

**Cryo-ET membrane segmentation:**
- **MemBrain-seg** (Lamm 2024, *bioRxiv*) — out-of-the-box membrane segmentation; the current first-line choice; *preprint, refresh citation.*
- **TomoSegMemTV** (Martinez-Sanchez 2014, *J Struct Biol*) — classical baseline; parameter-tunable; no GPU required; useful when no training data is available.

**vEM organelle and cell segmentation:**
- **nnU-Net** (Isensee 2021, *Nature Methods*) — the canonical "just train it" baseline whenever annotated data exist; auto-configures hyperparameters.
- **MitoNet / Empanada** (Conrad 2023, *Cell Systems*) — out-of-the-box mitochondria segmentation across diverse vEM modalities; the reference for multi-scale pretrained models in vEM.
- **CellMap / OpenOrganelle models** (Heinrich 2021, *Nature*) — whole-cell organelle segmentation; first-choice benchmark for new vEM segmentation work.

**Interactive and low-label-cost tools:**
- **MicroSAM (μSAM)** (Archit 2025, *Nature Methods*) — Segment Anything foundation model adapted for EM; interactive annotation acceleration; 3D propagation via SAM 2.
- **Ilastik** (Berg 2019, *Nature Methods*) — classical interactive ML (random forest); remains useful for small-data problems and as a no-deep-learning baseline.

**Filament segmentation:**
- **TARDIS-EM** (Kiewisz 2024, *bioRxiv*) — automated filament (microtubule) segmentation; *preprint, refresh citation.*

**Connectomics segmentation (brief):**
- **Flood-Filling Networks** (Januszewski 2018, *Nature Methods*) — highest-accuracy neuron segmentation; compute-intensive.
- **Local Shape Descriptors** (Sheridan 2023, *Nature Methods*) — ~FFN accuracy at much lower compute; practical for labs without large cluster access.

#### 4.4 CLEM registration

Brief treatment — this is acquisition-adjacent but logically fits here:
- **ec-CLEM** (Paul-Gilloteaux 2017, *Nature Methods*) — landmark-based CLEM registration baseline in Icy.
- **CLEM-Reg** (Krentzel 2025, *Nature Methods*) — deep-learning registration without explicit landmarks; uses organelle features.
- **BigWarp** (Bogovic 2016, *ISBI*) — manual deformable registration at TB scale.

State the problem honestly: CLEM registration accuracy remains the field's most persistent unsolved challenge at high resolution.

---

### 5. Tilt-Series Reconstruction, Particle Curation, Alignment, and Subtomogram Averaging

**Goal:** Show how SPA and STA pipelines have converged algorithmically while remaining distinct practically, and treat the bridging steps — tomogram reconstruction and particle curation — that connect picking to final refinement.

**Central problem:** Combining thousands to millions of noisy, low-contrast images of identical objects into a high-resolution 3D density map requires iterative alignment that is both computationally intensive and sensitive to initial model quality. Before that combination is possible, tilt-series must be aligned into tomograms (for cryo-ET) and particle sets must be cleaned of junk, contaminants, and minor heterogeneity classes.

#### 5.1 Tilt-series alignment and tomogram reconstruction

- **IMOD / etomo** (Kremer 1996, *J Struct Biol*) — the classical backbone; fiducial-based alignment; still required where high-quality gold fiducials are present.
- **AreTomo** (Zheng 2022, *J Struct Biol: X*) — fiducial-less GPU alignment; default for lamellae and high-throughput pipelines where fiducials are impractical.
- **AreTomo3 / AreTomoLive** (Peck 2025, *bioRxiv*) — on-the-fly preprocessing at the microscope. *Note: preprint; refresh citation before submission.*
- **RELION 5 tomography** (Burt 2024, *FEBS Open Bio*) — end-to-end cryo-ET in a single open-source package; integrates Blush-regularised refinement.

*Practical recommendation:* IMOD when gold fiducials are abundant and reproducibility matters; AreTomo (or its live variants) on lamellae and high-throughput pipelines.

#### 5.2 Particle curation and 2D/3D classification

A historically under-discussed but time-consuming step: separating real particles from junk (carbon edges, ice contamination, broken particles) and separating conformational/compositional classes before final refinement.

**2D classification:**
- **RELION 2D Class** and **cryoSPARC 2D Class** — the standard reference implementations; iterative ML-based class averaging without orientation refinement; still the field's default first triage step.
- **Cinderella / 2DAssess and related "good-class / bad-class" classifiers** — supervised CNN approaches that automate the eyes-on-classes step that consumes the most user time in routine SPA workflows; mention as a representative class of tools.

**3D classification and heterogeneous refinement:**
- **RELION 3D Class** — Bayesian discrete 3D classification; the workhorse for cleaning composition-heterogeneous datasets.
- **cryoSPARC heterogeneous refinement** — fast iterative 3D classification with reconstruction; commonly used as an alternative to RELION 3D Class within cryoSPARC pipelines.
- **3D Variability Analysis (3DVA)** is discussed in §6.3 (heterogeneity) but originates here as a curation tool — note the dual role.

**Subtomogram curation:**
- The same logic applies in cryo-ET: classification rounds in RELION 5 tomography or STOPGAP are used to remove false-positive picks, separate minor compositional classes, and triage geometry before final STA refinement.

*Practical recommendation:* In SPA, plan on 1–3 rounds of 2D classification followed by at least one round of 3D classification before pushing toward high-resolution refinement. In cryo-ET, 3D classification on initial subtomograms is the most common way to filter false picks from any of the ML pickers in §4.2.

#### 5.3 SPA refinement

- **RELION** (Kimanius 2021, *Biochemical Journal*) — the open-source standard; Bayesian polishing, CTF refinement, Blush regularisation in v5. RELION 5 is the current version.
- **cryoSPARC** (Punjani 2017, *Nature Methods*) — faster ab initio, non-uniform refinement (NU-refine), 3DFlex; often used in combination with RELION rather than as an alternative.
- **cisTEM** (Grant 2018, *eLife*) — GUI-driven pipeline with reproducibility guarantees; cisTEM 2 introduced ab initio.
- **Scipion** (de la Rosa-Trevin 2016, *J Struct Biol*) — workflow manager that wraps multiple backends; use when cross-tool comparison or provenance tracking matters.

*Practical recommendation:* RELION and cryoSPARC together cover ~90% of published SPA structures; cross-validation between the two has become a de facto community standard. Reach for cisTEM or Scipion when reproducibility, provenance, or limited compute is the dominant constraint.

#### 5.4 Subtomogram averaging

- **RELION 5 tomography** — the most integrated open-source option; connects directly to Warp preprocessing.
- **Dynamo** (Castano-Diez 2012, *J Struct Biol*) — MATLAB-based; strong for constrained geometries (helical, lattice, vesicle-embedded).
- **STOPGAP** (Wan 2024, *Acta Cryst D*) — mature, integrates with Warp/RELION; solid for cellular tomography.
- **nextPYP** (Liu 2023, *Nature Methods*) — cluster-scale cryo-ET with many tilt series; web-based interface.
- **M** — multi-particle per-frame refinement; the tool for pushing STA toward sub-4 Å.
- **emClarity** (Himes 2018, *Nature Methods*) — high-resolution STA with built-in CTF correction; strong on abundant targets.

*Practical recommendation:* RELION 5 tomography + M when high-resolution in-situ structure is the target; Dynamo when the geometry is known and constrained; nextPYP when the dataset is facility-scale (hundreds of tilt series).

---

### 6. Post-processing and Resolution Enhancement

**Goal:** The stage that produces the publication-ready map. ML has introduced tools that can substantially improve map quality from the same data — and introduced risks of over-interpretation.

**Central problem:** Even after optimal refinement, cryo-EM density maps contain noise, resolution anisotropy, and local quality variation. Post-processing converts raw reconstructions into interpretable density.

#### 6.1 Map sharpening

Lead with why sharpening matters (maps exit reconstruction over-smoothed; sharpening restores interpretable density gradients) and the risk of artefact amplification.

- **LocalDeBlur** (Ramirez-Aportela 2020, *Bioinformatics*) — model-independent local sharpening; useful when no atomic model is yet built.
- **LocScale** (Jakobi 2017, *eLife*) — model-guided local sharpening; physically motivated; standard once a model exists.
- **Phenix auto_sharpen / density modification** (Terwilliger 2018, *Acta Cryst D*) — parameter-light inside Phenix pipelines.
- **DeepEMhancer** (Sanchez-Garcia 2021, *Communications Biology*) — deep-learning sharpening; produces visually enhanced maps; note that density is network-predicted, not directly measured — interpret with caution.
- **EMReady** (He 2023, *Nature Communications*) — ML map conditioning at intermediate resolution (3–6 Å); often improves model-building density.
- **Blush regularisation (RELION 5)** (Kimanius 2024, *Nature Methods*) — data-driven regularisation inside refinement rather than post-hoc; prevents over-fitting for small/flexible particles.

#### 6.2 Local resolution estimation

- **ResMap** (Kucukelbir 2014, *Nature Methods*) — the canonical local-resolution method; standard citation.
- **MonoRes** (Vilas 2018, *Structure*) — parameter-free alternative; integrates with LocalDeBlur.
- Brief: blocres, 3DFSC (orientation bias, distinct from local resolution).

#### 6.3 Heterogeneity analysis

ML has enabled the field to move beyond discrete 2D class sorting toward continuous conformational landscapes. Frame the evolution:

- **cryoSPARC 3DVA** (Punjani 2021, *J Struct Biol*) — fast PCA-like variability analysis; the default first step in any cryoSPARC heterogeneity investigation.
- **cryoDRGN** (Zhong 2021, *Nature Methods*) — VAE-based continuous heterogeneity; generates conformational landscapes and movies; requires >50k particles to be reliable.
- **3DFlex** (Punjani 2023, *Nature Methods*) — explicit flow-field continuous heterogeneity within cryoSPARC; topology-preserving.
- **DynaMight** (Schwab 2024, *Nature Methods*) — per-particle displacement fields in RELION ecosystem; improves consensus refinement as side effect.
- **tomoDRGN** (Powell 2024, *Nature Methods*) — cryoDRGN adapted for subtomograms; continuous heterogeneity from cryo-ET data.

Advise clearly: heterogeneity tools require large datasets and careful validation; continuous landscapes can be artefactual in small datasets. 3DVA first, then deeper analysis if warranted.

---

### 7. Structural Interpretation: Model Building, Validation, and Analysis

**Goal:** Show how AlphaFold and related tools have transformed model building, while stressing that experimental map fitting and validation remain essential.

**Central problem:** A density map is not a structure. Converting a cryo-EM map into an atomic model requires tracing the polypeptide chain, placing side chains, and refining geometry — a process that was bottlenecked by manual expert time until recently.

#### 7.1 Structure prediction as a prior

- **AlphaFold 3** (Abramson 2024, *Nature*) — starting models for map fitting, multi-chain assemblies, ligand placement; has effectively eliminated the cold-start problem for most proteins. Discuss the change in workflow: now a cryo-EM analysis typically starts with AF3 prediction, then fits into density.
- Note what AF3 does not do: it provides a predicted structure, not a map-fitted model; fitting and validation are still essential.

#### 7.2 AI-assisted de novo model building

- **ModelAngelo** (Jamali 2024, *Nature*) — ML-guided automated model building directly from cryo-EM maps; the current first-pass standard for high-resolution maps. Works without a sequence if density is sufficient.
- **CryoREAD** (Wang 2023, *Nature Methods*) — specialised for nucleic acid structures.
- **DeepMainmast** (Terashi 2024, *Nature Methods*) — integrates AF2 priors with de novo tracing; handles multi-chain assembly.
- **DiffModeler** (Wang 2024, *Nature Methods*) — diffusion-based; for low-resolution (5–10 Å) large complexes where other builders fail.

#### 7.3 Refinement and editing

- **Coot** (Emsley 2010, *Acta Cryst D*) — essential post-ModelAngelo/post-AF3 for error correction and ligand fitting; will not go away.
- **ISOLDE** (Croll 2018, *Acta Cryst D*) — MD-guided real-space rebuilding; particularly valuable at lower resolution (4+ Å) where gradient-based refinement gets stuck.
- **Phenix real_space_refine** (Afonine 2018, *Acta Cryst D*) — standard geometry refinement before PDB deposition.

#### 7.4 Map-model validation

- **EMRinger** (Barad 2015, *Nature Methods*) — side-chain–density correlation; required by most journals.
- **Q-score / MapQ** (Pintilie 2020, *Nature Methods*) — per-residue map quality; standard publication metric.
- **DAQ-score** (Terashi 2022, *Nature Methods*) — ML-based; detects mis-modelled residues at intermediate resolution where Q-score is less informative.

#### 7.5 Visualisation

- **ChimeraX** (Pettersen 2021, *Protein Science*) — the default cryo-EM visualisation platform; gateway to ISOLDE, ArtiaX (cryo-ET), and growing ML plugin ecosystem.
- **MoBIE** (Pape 2023, *Nature Methods*) — large-scale vEM/CLEM data sharing and exploration; essential for multi-modality datasets.
- **webKnossos** (Boergens 2017, *Nature Methods*) — collaborative vEM annotation at scale.

---

### 8. Cross-cutting Concerns

**Goal:** Address the themes that don't belong to a single stage but shape the whole field.

Keep this section concise — it should not repeat material from the stage walk-throughs, and forward-looking themes (training data, foundation models) are consolidated in §9.

#### 8.1 Compute infrastructure

- GPU requirements have become the de facto minimum for ML-based tools; note the cost barrier for lower-resourced labs.
- Cloud options and national EM facilities as partial mitigations.
- Brief: SLURM-based cluster pipelines (nextPYP, Scipion) versus local workstations.
- **ZeroCostDL4Mic** — Colab-based fine-tuning that lowers the GPU barrier for labs without local infrastructure; a practical mitigation worth naming here rather than in the outlook.

#### 8.2 Reproducibility and workflow management

- **Scipion** — provenance tracking and multi-software pipelines; the standard answer for consortium-scale reproducibility.
- **TOMOMAN** (Khavnekar 2024, *IUCrJ*) — facility-scale cryo-ET preprocessing management.
- The broader problem: most ML tools in the field lack standardised benchmarks, making cross-paper comparisons unreliable. This is itself a gap (revisited in §9.2).

---

### 9. Outlook and Future Directions

**Goal:** Be specific. Generic statements about "more AI" are not useful. This section absorbs the forward-looking material previously placed in §8.3 (training data) and §8.4 (foundation models) so that the chapter has a single forward-looking voice.

**Identified gaps from the knowledge base and field analysis:**

#### 9.1 What the field has solved (or largely solved)

- SPA picking and preprocessing at high throughput (crYOLO, Topaz, MotionCor2/3, CTFFIND4/5)
- SPA structure determination pipeline (RELION/cryoSPARC)
- Model building at high resolution with AF3 + ModelAngelo
- Mitochondria and some organelle segmentation in vEM (MitoNet)

This subsection closes Claim 1 from §1: ML has unevenly but deeply penetrated the pipeline. The list above is the "deep" end.

#### 9.2 What remains hard

**Generalisation of in-cell tools:** Most ML pickers/segmenters train on one organism or one preparation. Tools that generalise across specimen types without retraining (TomoTwin, MicroSAM) exist but are not yet end-to-end reliable for publication-grade work.

**CLEM registration at high resolution:** The accuracy gap between fluorescence and EM resolution has not closed. Registration errors of 50–200 nm remain the norm for cryo-CLEM; what is needed is better correlation, not just better tools.

**Integrated end-to-end pipelines:** The pipeline still has handoffs between incompatible formats (star files, mrc, hdf5) and incompatible communities (SPA vs. cryo-ET vs. vEM). True integration — where a user defines a biological question and the software selects and runs tools — does not exist.

**Validation of ML-derived structures:** DeepEMhancer, EMReady 2, and density-modification tools can produce visually convincing maps from poor data. The field lacks agreed metrics for when a map has been enhanced versus hallucinated.

**Benchmark-poverty:** Most ML tools in the field lack standardised, community-accepted benchmarks. Cross-paper comparisons of pickers, segmenters, and heterogeneity tools are unreliable because each paper reports on its own held-out data.

**Low-throughput modalities:** SBEM and array tomography have fewer than 15 ML tools in the catalog; most vEM-specific tools are FIB-SEM-trained and do not transfer. CLEM specifically has 16 tools — sparse given the complexity of the problem.

This subsection closes Claim 3 from §1: the productive frontier is not more tools for solved problems but generalisation, in-situ reliability, validation, and end-to-end integration.

#### 9.3 Training data and shared infrastructure (the substrate for what comes next)

ML tools trained on one specimen, resolution, or instrument often fail to generalise. The field's response has been to build shared data and model resources rather than to keep training one-off networks:

- **CEM500K** (Conrad 2021, *eLife*) — first large-scale diverse EM pretraining dataset; enabled transfer learning in vEM segmentation.
- **CZII CryoET Data Portal** (Ermel 2024, *bioRxiv*) — growing open cryo-ET dataset with annotations; critical for training generalised pickers. *Preprint; refresh before submission.*
- **BioImage Model Zoo** (Ouyang 2022, *bioRxiv*) — model-sharing infrastructure across imaging communities; cross-community pretrained models. *Preprint.*

These resources are not yet sufficient — annotation breadth and modality coverage are still uneven — but they are the substrate for the next generation of tools described in §9.4.

#### 9.4 Where the next breakthroughs are likely

- **Foundation models for EM.** SAM, MicroSAM, CryoSAM, and Cellpose-SAM are first-generation domain adaptations. A truly EM-domain pretrained vision transformer (not just DINOv2 fine-tuned) could unify picking, segmentation, and quality assessment across modalities. CEM500K and the CZII portal are building the substrate.
- **Diffusion models for structure completion.** CryoFM shows the paradigm; expect this to extend to missing-wedge completion, in-cell density map completion, and low-resolution map enhancement without the hallucination risk of current GANs.
- **Autonomous acquisition.** SPACEtomo and SmartScope have demonstrated the concept; the next step is closed-loop acquisition that adjusts the collection strategy in real time based on live reconstruction quality.
- **In-situ structural biology.** The convergence of cryo-FIB, cryo-ET, and STA is enabling near-atomic resolution structures in native cellular context. The bottleneck is lamella throughput — AutoLamella and related tools are the current frontier.
- **Tools that know what they don't know.** Honest uncertainty quantification — particularly for ML map sharpening and ML model-building — is the validation problem of §9.2 stated as a research direction. Calibrated confidence outputs would also reduce the benchmark-poverty problem by making per-dataset claims comparable.

This subsection closes Claim 2 from §1: no single tool dominates end-to-end, and the future is less about consolidation than about generalisation and trustworthy uncertainty.

---

### 10. Conclusion

Short — two to three paragraphs.

**Para 1:** The EM pipeline now has an ML-augmented tool at every stage. For most steps there are mature, validated options that a working scientist can reach for without specialised machine-learning expertise.

**Para 2:** The deeper contribution of ML is not replacing the scientist but compressing time: hours of manual picking, days of manual model building, weeks of manual segmentation can now be reduced to minutes in favourable cases. The bottleneck has shifted from computation to experimental throughput and biological interpretation.

**Para 3:** The gaps are real. CLEM registration, generalisation across specimen types, end-to-end automation, and honest uncertainty quantification are open problems. The next decade will be defined not by more tools but by tools that know what they don't know.

---

## Tables proposed

**Table 1 (supplementary or main):** Selected tools across the pipeline — columns: Tool | Stage | Modality | Approach (classical / ML / hybrid) | When to use | Compute requirement | Availability (Open / Commercial / Vendor) | Citation. ~60–80 rows, selecting the most field-relevant tools. The chapter text will refer readers here for the full landscape. *Note:* the licensing column is collapsed to three buckets (Open / Commercial / Vendor) because most tools are "free for academic, paid commercial" or vendor-only, and a free-text License field would either be inaccurate or padded with footnotes.

**Table 2 (inline, optional):** Heterogeneity tools comparison — 3DVA vs. cryoDRGN vs. 3DFlex vs. DynaMight — when to use each, dataset size requirements.

---

## Figures

**Figure 1:** EM pipeline diagram (horizontal flow, five stages). Each stage box annotated with: (a) relative hands-on time cost (colour gradient or bar icon), (b) ML penetration (fraction of commonly used tools that are ML/hybrid), (c) 2–3 representative tool names. Right margin: callout that "216 tools cataloged; ~70 discussed in this chapter, the remainder in Table 1." *Generated as original schematic — no copyright issues.*
- *Sourcing for time costs:* values are illustrative (not measured); the figure caption will state this explicitly and reference published benchmarks where available (e.g., SmartScope's reported wall-clock savings, AutoLamella throughput, cryoSPARC/RELION benchmark timings). The qualitative ordering of stages is the load-bearing claim, not the absolute magnitudes.

**Figure 2:** Representative results panel — 2×3 or 3×2 grid showing outputs from different stages: (A) raw micrograph vs. denoised; (B) particle picks on a micrograph; (C) segmented tomogram slice; (D) vEM organelle segmentation; (E) cryo-EM density map with fitted model; (F) conformational landscape (cryoDRGN-style). *Adapted from existing publications with permission; source each panel individually.*

**Figure 3:** Landscape summary — heatmap: Modality (rows: SPA, cryo-ET, STA, FIB-SEM, SBEM, ssTEM, CLEM, cryo-CLEM) × Stage (columns: Acquisition, Preprocessing, Picking/Segmentation, Reconstruction, Post-processing, Interpretation). Cell value: number of tools (or ML fraction). Purpose: reveal gaps at a glance — CLEM rows will be visibly sparse.
- *Counting convention:* each tool is counted in its canonical stage only (per the `canonical_stage` field in the knowledge base). Multi-stage tools (Warp, RELION, cryoSPARC, IMOD, Scipion) carry an asterisk and the caption lists their secondary stages. Counting each occurrence would overstate coverage; counting only canonical stages would understate it — the asterisk-and-caption convention is the honest middle path.

---

## Citation discipline notes (for drafting phase)

- Do not cite any tool from the REVIEW-NEEDED list without first checking whether a peer-reviewed version now exists: AreTomo3, AreTomoLive, DenoisET, Cellpose-SAM, MemBrain-seg, TARDIS-EM, EMReady 2, BioImage Model Zoo, CZII CryoET Data Portal, PyTorch Connectomics.
- Gautomatch: widely used but no canonical peer-reviewed paper; mention only in passing or in table; do not include in numbered reference list without a verifiable citation.
- Vendor tools (EPU, Smart EPU, Tomo5, Latitude S, METEOR, Arctis iFLM, Amira, Ariadne / 3dEMtrace): note vendor status in text; cite by product name and vendor URL rather than paper; check with editor on acceptability.
- For each tool discussed in depth: verify first author, year, venue, DOI before prose is finalised. Do not write "Tool X (Smith et al., 2023)" without having checked the paper exists.
- **Anchor-tool convention for multi-stage tools.** Each multi-stage tool is introduced once, in full, on first appearance and back-referenced thereafter. Anchor assignments: Warp → §2.3 (on-the-fly QC); RELION → §5.3 (SPA refinement); cryoSPARC → §5.3; IMOD/etomo → §5.1 (tilt-series reconstruction); Scipion → §5.3 (mentioned again briefly in §8.2 for reproducibility); cryoSPARC Live → §2.3. Later mentions read "Warp (see §2.3)" rather than reintroducing the tool.
- **Specific citations flagged for verification before drafting the relevant sections.** CLEM-Reg (Krentzel 2025, *Nat Methods*) — verify year/venue. CellMap / OpenOrganelle (Heinrich 2021, *Nature*) — confirm the cited paper matches the model claim. ModelAngelo, ec-CLEM, MitoNet/Empanada — confirm canonical citation against the knowledge base before prose is locked.
