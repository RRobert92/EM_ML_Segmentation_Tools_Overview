# Segmentation in Electron Microscopy: A Tools Overview

*Chapter draft — Correlative Light and Electron Microscopy VI, Methods in Cell Biology, Elsevier*

*Draft started 2026-05-19. Focused chapter: segmentation methods across the EM landscape. Working title — refine before submission.*

---

## 1. Introduction

A modern electron microscopy experiment ends with a question that is easy to state and hard to answer: where, in this image, is the biological feature I care about? In single-particle cryo-EM the feature is a macromolecular complex. In cryo-electron tomography (cryo-ET) the same complex is now inside a cell, surrounded by membranes and other density. In volume electron microscopy (vEM) the feature is an organelle, a cell boundary, an axon. In correlative light and electron microscopy (CLEM) it is whichever structure was tagged in the light microscope, now to be located inside the electron image.

These are segmentation problems. The data are different — 2D micrographs, 3D tomograms, terabyte-scale volumes — and so are the labels, but the underlying task is the same: assign each voxel or pixel to a biological category. For most of the field's history, segmentation was either trivial (thresholded by hand on a clean image) or intractable (low signal-to-noise ratio, dense backgrounds, ambiguous boundaries). Machine learning has moved most of these problems from the second category to a third one: tractable but not solved, with a tool landscape that is large, fast-moving, and partly redundant.

This chapter is a map of that landscape. We catalogue the tools for SPA particle picking (§2), cryo-ET macromolecule localization (§3), membrane and organelle segmentation in tomograms (§4), organelle and cell segmentation in volume EM (§5), and segmentation as the substrate for CLEM registration (§6). §7 covers cross-cutting topics — foundation models, training data, validation. §8 is the outlook; §9 is a short conclusion. For each task we describe what makes it hard, which classes of tools currently address it, and when to reach for each.

### Why this chapter belongs in a CLEM volume

Modern CLEM rests on segmentation more directly than the term "correlative" suggests. Registration tools such as ec-CLEM and CLEM-Reg use segmented EM features — membranes, mitochondria, nuclei — as their substrate. Cellular cryo-CLEM experiments increasingly rely on cryo-ET membrane and organelle segmentation to anchor fluorescently tagged proteins in their structural context. Almost every quantitative claim about a vEM dataset — organelle counts, mitochondrial volumes, axon trajectories — is, at root, a claim about a segmentation output. A CLEM practitioner who understands the strengths and failure modes of current segmentation tools is making different experimental choices than one who treats segmentation as a downstream curiosity.

### Scope and conventions

The chapter covers segmentation across SPA cryo-EM, cryo-ET, volume EM (FIB-SEM, SBEM, ssTEM, array tomography), connectomics, and CLEM-relevant registration; the underlying knowledge base contains 79 actively maintained tools, of which roughly forty are discussed in the body and the remainder appear in Table 1. It is not a protocol or a software manual, and recommendations reflect practitioner consensus and problem structure rather than commercial endorsement — most will need revisiting within a decade. We write for two readers at once, a graduate student entering the field and an experienced practitioner choosing between tools, so each section opens in plain language and ends with one sentence of practical guidance. Acronyms used throughout are collected in Table 1.1.

The catalog underlying this chapter is also published as an open community resource. An interactive, searchable version of Table 1 — filterable by task, modality, approach, and availability — is hosted as a GitHub Pages site, and the underlying structured data (CC-BY-4.0) is available for reuse. The catalog accepts community contributions for new tools and corrections, so the resource will track the field beyond the publication date of this chapter. See the *Open Resource* note at the end of the chapter for citation and contribution details.

| Acronym | Meaning |
|---|---|
| SPA | Single-particle analysis — the cryo-EM workflow for purified macromolecular complexes |
| cryo-ET | Cryo-electron tomography |
| STA | Subtomogram averaging — aligning many copies of the same complex extracted from tomograms |
| SNR | Signal-to-noise ratio |
| vEM | Volume electron microscopy — umbrella for FIB-SEM, SBEM, ssTEM, array tomography |
| FIB-SEM | Focused-ion-beam scanning electron microscopy |
| SBEM | Serial block-face SEM |
| ssTEM | Serial-section transmission EM |
| CLEM | Correlative light and electron microscopy |
| CNN | Convolutional neural network |
| ViT | Vision transformer |
| SAM | Segment Anything Model — a foundation model for image segmentation |
| FFN | Flood-filling network — a connectomics segmentation method |
| iFLM | Integrated fluorescence light microscope (inside a cryo-FIB/SEM chamber) |

*Table 1.1 — Acronyms used throughout the chapter.*

---

## 2. SPA Particle Picking

Particle picking is the step that converts an SPA dataset from a directory of micrographs into a stack of cropped images ready for averaging. Each micrograph typically contains 50–1000 candidate particles embedded in vitreous ice, surrounded by carbon edges, ice contamination, and acquisition artefacts. The picker's job is to find the real particles and reject everything else. Errors propagate: missed particles lower the achievable resolution; false positives — junk averaged into 2D class images — bias the reconstruction.

Two features make this hard. First, the signal-to-noise ratio on a typical detector is roughly 0.05 per pixel; the particle is barely visible to the human eye. Second, the visible features depend on the particle's orientation, so a picker has to recognise a complex from every viewing angle without confusing it with the noise. Decades of method development have produced a layered toolkit of classical and ML approaches, and the field has converged on a small set of community defaults rather than a single best tool.

### 2.1 Template matching

Template matching is the classical baseline. The user supplies a 2D average, often from a small hand-picked dataset, and the algorithm cross-correlates it against each micrograph; peaks above a threshold become particles. RELION and cryoSPARC both include built-in implementations (Scheres, 2015), and Gautomatch is a long-standing GPU implementation widely used in practice but without a peer-reviewed publication. Template matching remains the appropriate first choice when a high-quality 2D average already exists — for example, when re-picking a known structure on a new dataset, or when the field has a published reference for the same complex.

The main failure mode is template bias, often called the *Einstein-from-noise* problem: a picker that correlates against a particular reference will preferentially find that reference even in pure noise, biasing the downstream reconstruction toward the starting model. Template-based pickers are therefore a reasonable starting point for known targets and a poor starting point for unknown ones.

### 2.2 Supervised CNN-based pickers

The dominant ML pickers in routine use today are convolutional neural networks trained on labelled micrographs. Three tools have separated themselves from the rest of the literature by combination of performance, generality, and community uptake.

**crYOLO** (Wagner et al., 2019) is a YOLO-architecture single-shot detector trained on a large pool of diverse SPA datasets. Its main practical advantage is its *general model* — a pre-trained network that works on most new datasets without any retraining. For a user starting on an unfamiliar specimen, crYOLO with the general model is usually the fastest path to a first round of particles. It also handles filaments natively, which most picker frameworks do not.

**Topaz** (Bepler et al., 2019) takes a different approach: positive–unlabelled (PU) learning. Instead of requiring complete labels — every particle in each training image marked — Topaz needs only a partial set of particle marks and learns from the assumption that the remaining unlabelled pixels are mostly background. This makes Topaz particularly robust on sparse, small, or non-globular particles where a human labeller is likely to miss particles, exactly the cases where crYOLO's fully supervised training struggles. Topaz is also less sensitive to particle density than crYOLO.

**EPicker** (Zhang et al., 2022) addresses a different design constraint: most pickers are tuned to one kind of object. EPicker uses an *accumulating model* that learns heterogeneous object categories — particles, vesicles, fibres — within one network, so a single trained model can handle several morphology classes without retraining. This is particularly valuable for cellular cryo-EM where the same dataset contains multiple object types of interest.

In day-to-day practice the three tools occupy distinct niches. crYOLO is the fastest start on standard SPA; Topaz handles cases where label density or particle morphology is the bottleneck; EPicker handles morphological heterogeneity in a single dataset.

### 2.3 On-the-fly and consensus picking

For sessions that need real-time feedback, Warp's *BoxNet* (Tegunov et al., 2019) provides integrated motion correction, CTF estimation, and on-the-fly particle picking, with picks ready to inspect within seconds of each micrograph being acquired. BoxNet is less accurate than crYOLO or Topaz on held-out benchmarks. Its tight integration with acquisition still makes it the natural choice when picks need to feed into a live 2D classification session.

When no single picker performs well on a difficult dataset, REPIC (Cameron et al., 2024) provides a principled ensemble: run several pickers (crYOLO, Topaz, EMAN2 NN-picker, etc.) and combine their outputs into a consensus set weighted by the agreement structure rather than a simple majority vote. REPIC's value is in the long tail — datasets where every individual picker has a high false-positive or false-negative rate, but the agreement of three pickers is reliable.

### 2.4 Foundation models, transformers, and few-shot pickers

Several recent tools attempt to reduce the per-dataset training burden that has shaped SPA pickers since the field moved past template matching.

CryoSegNet (Gyawali et al., 2024) augments a U-Net backbone with features from the Segment Anything Model (SAM) as a foundation; the authors report 7% and 14% improvements in downstream resolution compared with Topaz and crYOLO respectively on Cheng-lab benchmark datasets. CryoTransformer (Dhakal et al., 2024) replaces the CNN backbone with a transformer pretrained on *CryoPPP*, a large picking dataset assembled for the purpose; the gains are most visible on small particles and on datasets with strong orientational bias. UPicker (Wang et al., 2024) and Cryo-EMMAE (Cuevas-Saavedra et al., 2025) target the few-shot regime, learning to pick from as few as 5–10 labelled micrographs.

Benchmarks for this generation of pickers are not yet settled, and reported improvements over crYOLO and Topaz on author-curated test sets do not always reproduce on independent data. We return to the benchmarking problem in §7.

**Practical recommendation.** For most users on a new dataset, start with crYOLO's general model. Move to Topaz when label density or particle morphology causes crYOLO to underpick; use EPicker when several object morphologies need to be picked from one dataset. Reach for REPIC when no single picker reaches acceptable false-positive rates. The foundation-model and transformer pickers are worth tracking, but for a paper submitted in 2026 the safe choice remains crYOLO or Topaz.

---

## 3. Macromolecule Localization in Cryo-ET Tomograms

Cryo-electron tomography picking is the same algorithmic problem as SPA picking — find the molecule in the image — with three differences that change which tools are appropriate. The data is 3D rather than 2D, so the picker operates on a reconstructed tomogram (or, less commonly, on the unaligned tilt series). Particle counts are typically one to three orders of magnitude lower than in SPA, so methods that need millions of training examples are not options. And the geometry of a single-axis tilt series leaves a wedge of Fourier space unsampled, so isotropic features appear elongated along the beam axis. A picker must either learn to recognise this elongated appearance or correct for it before searching.

The community has developed two families of solutions: classical template matching adapted for the 3D and missing-wedge case, and supervised CNN-based localizers trained directly on labelled tomograms. A smaller third family — class-agnostic embedding methods — is beginning to address the case where no training data exists.

### 3.1 Template matching

Template matching in 3D works in principle exactly as in 2D: cross-correlate a known structure against the tomogram at every position and orientation, then threshold the resulting score map. The implementation is more demanding because the orientation search runs over the full SO(3) rotation group rather than a single 2D angle, but the algorithm is mature.

**PyTOM-Match-Pick** (Chaillet et al., 2023) is the current open-source reference. It modernises the classical PyTOM template-matching pipeline (Hrabe et al., 2012) with GPU acceleration, missing-wedge-aware cross-correlation, and Python tooling, and is the recommended first pass when a high-quality reference structure is available — ribosomes, proteasomes, and other well-characterised abundant complexes. **Dynamo's** built-in template matching (Castaño-Díez et al., 2012) integrates naturally with the Dynamo STA workflow, particularly for geometrically constrained targets (helical, lattice, vesicle-embedded). **emClarity's** template matching (Himes et al., 2018) is the natural pair with the emClarity STA package and well-suited to high-resolution work on abundant targets where the picker output will feed directly into a sub-4 Å reconstruction.

Template matching's failure modes mirror those of its 2D counterpart but at higher stakes. The Einstein-from-noise problem applies (an inaccurate template will produce false positives that look like the reference), and reference quality matters more — a poor template produces a tomogram-load of false positives rather than a micrograph-load.

### 3.2 Supervised CNN-based localizers

Where SPA picking is dominated by detectors that find boxes, cryo-ET picking is dominated by per-voxel segmentation followed by clustering: the network produces a probability volume, and peaks in that volume become particle picks. Four tools cover most published work.

**DeepFinder** (Moebel et al., 2021) is the field's reference for ML cryo-ET picking. It uses a 3D U-Net trained on labelled tomograms and supports multi-class localisation — identifying ribosomes, proteasomes, and membrane proteins in a single pass. DeepFinder requires labelled training data per target class, a labelling-intensive setup that remains its principal limitation, but its accuracy on well-labelled cases is the de facto benchmark against which newer tools are measured.

**DeePiCt** (de Teresa-Trueba et al., 2023) extends this approach by training the same network to localise both macromolecules and their cellular context — organelles, membranes, nuclei — in one model. The argument is that particle identity often depends on context: a ribosome on the endoplasmic reticulum is biologically different from a free ribosome, and a picker that knows the organelle is more accurate than one that does not. DeePiCt is the natural choice when the goal is in-situ structural biology with cellular annotation rather than a bare particle list.

**DeepETPicker** (Liu et al., 2024) is a recent contribution that reduces the labelling burden of DeepFinder through a coarse-to-fine training strategy. The authors report the best overall accuracy on simulated benchmarks; in practice the more important gain is real labelling-time savings, and DeepETPicker is the natural choice when labels are the bottleneck.

**PickYOLO** (Genthe et al., 2023) adapts the YOLO single-shot detector to tomograms and reports inference times of 0.24–3.75 seconds per tomogram — orders of magnitude faster than DeepFinder. It is the natural choice when the dataset is large (hundreds of tilt series) and throughput matters more than the last few percent of accuracy.

### 3.3 Class-agnostic pickers and metric learning

The principal limitation of supervised CNN localizers is that they need labels per target class. **TomoTwin** (Rice et al., 2023) takes a different approach: it learns a metric-space embedding in which copies of any macromolecule cluster together, without ever being told which macromolecule. To pick a new target the user provides one or a few example positions; TomoTwin retrieves all similar voxel embeddings in the tomogram. This makes it the natural choice for discovery experiments where the target is novel or poorly characterised, and for re-picking known targets across datasets without retraining. TomoTwin's accuracy on well-characterised targets is below DeepFinder's; its value is generality.

### 3.4 Specialised pickers: membrane-bound proteins

Proteins embedded in membranes pose a distinct picking problem because their orientation is not arbitrary — they sit perpendicular to the membrane surface, and the picker should respect that constraint rather than search over all rotations. **MemBrain-pick** (Lamm et al., 2022) addresses this case directly: given a segmented membrane (typically from MemBrain-seg, §4), it picks complexes along the surface and preserves the membrane-normal orientation. This is the standard choice for receptor and channel localisation in cellular tomograms; it is also useful upstream of subtomogram averaging on membrane-bound targets, where a well-conditioned initial orientation distribution accelerates convergence.

**Practical recommendation.** When a high-quality reference structure exists, PyTOM-Match-Pick is the appropriate first pass; when one does not, DeepFinder or DeepETPicker if labels are available, TomoTwin if they are not. Reach for DeePiCt when cellular context matters for downstream interpretation, PickYOLO when throughput dominates, and MemBrain-pick when the target sits in a membrane.

---

## 4. Membrane, Organelle, and Feature Segmentation in Cryo-ET

Where picking returns a list of positions, segmentation returns a label per voxel. The shift in problem framing matters because the targets in a cellular tomogram — membranes, organelles, filaments, vesicles — are continuous structures rather than discrete copies of a template. The data also has the worst SNR in structural biology: a cellular cryo-ET tomogram has SNR roughly an order of magnitude below an SPA micrograph, and a membrane unambiguous to a trained human eye is a faint zigzag that classical edge-detectors miss.

Two practical consequences follow. First, denoising or missing-wedge correction as preprocessing markedly improves segmentation downstream, and most ML segmenters in the literature were trained on denoised input. Second, the segmentation literature has converged on a small set of out-of-the-box tools — one per common target class — rather than continuing to publish per-dataset networks.

### 4.1 Preprocessing as enabler

A note before discussing the segmenters: cryo-ET segmentation is rarely performed on raw tomograms. **cryo-CARE** (Buchholz et al., 2019), trained on even/odd frame splits, and **Topaz-Denoise** (Bepler et al., 2020), pretrained and applied directly, are the two denoisers in routine use, and most segmenters perform substantially better on their output than on the underlying reconstruction. **IsoNet** (Liu et al., 2022) and **DeepDeWedge** (Wiedemann et al., 2024) address a different problem — missing-wedge artefacts that elongate features along the beam axis — and improve segmentation accuracy on isotropy-sensitive targets such as vesicles and filaments without changing the underlying signal level.

The general principle is that these tools belong upstream of segmentation but not upstream of refinement: they aid feature detection but can hallucinate structure, so a denoised tomogram should never feed back into a structure determination chain.

### 4.2 Membrane segmentation

Membranes are the most common segmentation target in cellular cryo-ET. They organise the cell, they delimit organelles, and most downstream interpretation — receptor placement, vesicle counting, organelle-contact analysis — begins with a membrane segmentation.

**MemBrain-seg** (Lamm et al., 2024, *bioRxiv*) is the current first-line choice. It is a pretrained 3D U-Net distributed with a model that works out-of-the-box on diverse cellular tomograms — the user typically does not need to retrain. Accuracy is high enough to support downstream quantitative analysis — membrane curvature, organelle volume, protein density along the surface — and the model has become the de facto starting point for membrane work in the field. The chapter cites the preprint pending peer-reviewed publication.

**TomoSegMemTV** (Martínez-Sánchez et al., 2014) is the classical baseline. It uses a tensor-voting framework that detects membrane-like surfaces through local geometric coherence; it has no learned component and requires parameter tuning per dataset, but it runs without a GPU and produces predictable results. It remains useful when no training data is available, when MemBrain-seg's output needs an independent comparison, or when the local computing budget rules out modern GPU-bound tools.

### 4.3 Filaments, vesicles, and membrane-anchored complexes

Beyond membranes, three specific feature types are common enough to have dedicated tools.

**TARDIS-EM** (Kiewisz et al., 2024, *bioRxiv*) targets filaments in cellular cryo-ET, with microtubules as its primary application. Manual tracing of microtubules in a typical neuronal tomogram takes hours; TARDIS-EM reduces this to minutes while preserving the geometric properties — start, end, length — needed for quantitative analysis. The model handles both cryo-ET and plastic-section data, which is unusual in the literature. Cited as a preprint pending publication.

**CryoVesNet** (Khosrozadeh et al., 2025) is specialised for synaptic vesicles — small, abundant, round membrane-bound objects that conventional membrane segmenters miss because their geometry is locally too uniform to score well as "membrane." Quantitative analyses of synaptic vesicle pools and vesicle–membrane interactions now standardise on CryoVesNet output.

**PySeg** (Martínez-Sánchez et al., 2020) handles a different problem: template-free picking of complexes that are anchored to or embedded in membranes, without a known reference structure. The pipeline segments the membrane (typically with TomoSegMemTV or MemBrain-seg), models the surface as a graph, and identifies protein densities protruding from the membrane. It remains the workhorse for membrane-bound complex discovery in cellular cryo-ET, particularly for ribosome-on-ER and viral spike geometries.

### 4.4 Foundation models and integrated workflows

The last category of tools attempts to reduce per-task training entirely. **CryoSAM** (Zhao et al., 2024) adapts the Segment Anything Model (SAM) to cryo-ET and supports interactive segmentation of arbitrary features from one or a few user-provided points; it is particularly useful for rapid exploratory annotation in napari or ChimeraX, where a researcher wants to know whether a feature segments cleanly before committing to a per-task model.

**Ais** (Last et al., 2024) is not a single model but an integrated GUI that bundles training, annotation, and inference for cryo-ET segmentation into one workflow. It is appropriate when a lab wants to train custom segmentation models on local data and does not have command-line ML expertise; the trade-off is less control over the training pipeline than scripted alternatives.

Finally, **DeePiCt** (de Teresa-Trueba et al., 2023; see §3.2) doubles as an organelle and macromolecule segmenter when the goal is to label cellular context alongside particles in one pass. It is mentioned here for completeness but covered in §3 because its primary use is integrated picking-plus-context.

**Practical recommendation.** For most cellular cryo-ET segmentation tasks, denoise with cryo-CARE or Topaz-Denoise first, then reach for MemBrain-seg on membranes, TARDIS-EM on filaments, CryoVesNet on synaptic vesicles, and PySeg on membrane-anchored complexes. CryoSAM is the right tool for exploratory annotation on novel targets; Ais is the right entry point for labs training their own models without scripted infrastructure.

---

## 5. Volume EM Segmentation

Volume EM is the term for techniques that image biological samples slice by slice at nanometre resolution, producing 3D datasets that range from gigabytes to petabytes. Three acquisition modalities dominate: focused-ion-beam SEM (FIB-SEM), which mills and images alternately and produces near-isotropic voxels; serial block-face SEM (SBEM), which uses a diamond knife inside the SEM and produces anisotropic stacks with thicker z-spacing; and serial-section TEM (ssTEM) or array tomography, which produces sections imaged separately and aligned post-hoc. The three modalities differ in z-resolution, contrast, artefacts, and SNR, and segmentation tools often do not transfer cleanly between them.

Compared with cryo-ET, vEM has higher SNR (samples are heavy-metal stained for contrast) and dramatically more data — a typical FIB-SEM dataset is tens of gigabytes, and connectomics SBEM datasets reach the petabyte. The community's two largest practical questions are: what trained model can I run on my data without retraining, and how do I generate labels efficiently when retraining is needed.

### 5.1 Foundation architectures and "just train it" baselines

Where cryo-ET segmentation has converged on tool-per-target choices, vEM segmentation has a strong tradition of training fresh networks for each project. The two architectures that dominate this practice are the 3D U-Net (Çiçek et al., 2016) and **nnU-Net** (Isensee et al., 2021). The 3D U-Net underlies almost every vEM segmentation tool in production. nnU-Net wraps the U-Net family with automatic configuration of network depth, patch size, and training hyperparameters; its contribution is not a new architecture but the observation that careful, dataset-aware defaults can outperform most published task-specific models without manual tuning. For a project with labelled training data, nnU-Net is the appropriate first attempt and a strong baseline for any new method comparison.

Two other architectures cover cases where the segmentation target has predictable geometry. **Cellpose** (Stringer et al., 2021), originally developed for fluorescence cell segmentation, has been retrained and adapted across EM datasets and handles cell-like and round-object segmentation as well as any dedicated tool. **Stardist** (Schmidt et al., 2018) is optimised for convex or star-convex objects — nuclei, some organelles — and trains efficiently on small label sets. Both began in light microscopy and now operate in EM with appropriate retraining.

### 5.2 Out-of-the-box organelle segmenters

For specific organelle classes, the field has converged on a small number of pretrained models that work without retraining on most datasets.

**MitoNet** (Conrad et al., 2023), distributed as part of the Empanada pipeline, segments mitochondria across diverse vEM modalities — FIB-SEM, SBEM, ssTEM — without per-dataset retraining. It is the reference for multi-modality pretrained models in vEM, and the natural choice for any project where mitochondrial counts, volumes, or contact analyses are part of the readout.

**CellMap** (Heinrich et al., 2021), produced by the Janelia COSEM project and distributed through the OpenOrganelle portal, extends the same idea to most major organelles — ER, Golgi, lysosomes, endosomes, peroxisomes, microtubules — in whole-cell FIB-SEM datasets. CellMap is the standard benchmark for new whole-cell vEM segmentation work, and the OpenOrganelle portal hosts both the trained models and the annotated reference datasets, which has accelerated method development across the field.

**PlantSeg** (Wolny et al., 2020) addresses tissue-level cell segmentation in samples with thin boundaries — plant tissues being the original context, though the method extends to FIB-SEM of animal epithelia after retraining. It is the appropriate choice when the segmentation target is cell-cell boundaries rather than cell interiors.

### 5.3 EM-domain foundation models and interactive tools

The challenge that motivates the next family of tools is labelling cost. A vEM project may require thousands of labelled instances; manual annotation at this scale is prohibitive. Two recent directions reduce the burden.

**CEM500K** (Conrad et al., 2021) is not itself a tool but a large-scale, diverse EM pretraining dataset and a set of pretrained encoders trained on it. The argument is that an EM-trained representation transfers better to a new vEM task than an ImageNet-trained representation, and the empirical evidence supports this for segmentation tasks where labels are limited. CEM500K's models are now the standard backbone for fine-tuning vEM segmentation networks with small label sets.

**MicroSAM** (Archit et al., 2025) adapts the Segment Anything Model (SAM; Kirillov et al., 2023) for EM, with both 2D and volumetric interactive segmentation. The user clicks or draws on one slice; MicroSAM propagates the segmentation through the volume — internally via SAM 2 (Ravi et al., 2024) — and refines from minimal additional feedback. For exploratory annotation and label generation it has largely replaced manual tools at facilities that have adopted it; for production segmentation it is best used as a label generator feeding nnU-Net or a CEM500K-pretrained network rather than as an inference engine in its own right. **Cellpose-SAM** (Pachitariu et al., 2025, *bioRxiv*) takes the complementary approach of building a SAM-grade backbone into Cellpose's flow-based instance recognition; cited as a preprint pending publication.

**Ilastik** (Berg et al., 2019) predates the deep-learning era and remains useful as a no-deep-learning baseline. It uses an interactive random forest trained from user-drawn pixel labels and runs without a GPU. For small projects, fast prototypes, and exploratory segmentation where the data is too limited to motivate a 3D U-Net, Ilastik is the appropriate first attempt.

**CDeep3M** (Haberl et al., 2018) addresses the case where local GPU infrastructure is not available: it provides an AWS-deployable vEM segmentation pipeline. Its niche has narrowed as cloud-deployable alternatives have proliferated, but it remains the reference for that deployment model.

**Amira** (Thermo Fisher, no peer-reviewed paper) is the dominant commercial vEM analysis platform, with integrated segmentation, quantification, and visualisation. It is widely used in biomedical-imaging labs but is closed-source; cited by vendor URL rather than paper.

**Practical recommendation.** For mitochondria, reach for MitoNet; for whole-cell organelles in FIB-SEM, reach for CellMap. For new vEM segmentation with available labels, nnU-Net is the right baseline before any custom architecture. For labelling, use MicroSAM (or Cellpose-SAM where applicable) to generate training data, then train nnU-Net on a CEM500K-pretrained backbone. Ilastik remains useful for small, exploratory, or compute-constrained projects.

---

## 6. Segmentation for CLEM Registration

CLEM registration is the operation that places fluorescence localisations from a light-microscope image into the coordinate system of an electron-microscope image. The two images may be of the same sample at different times (room-temperature CLEM, where the sample is imaged in the LM, then fixed and imaged in the EM) or near-simultaneously (cryo-CLEM with integrated or near-integrated optics). Registration accuracy determines what biological claim a CLEM experiment can support: a 200 nm error means a fluorescent puncta can be assigned to a small cellular region; a 10 nm error means it can be assigned to a specific molecular complex.

Three families of methods dominate. Landmark-based methods register using point correspondences (gold beads, fluorescent beads, or hand-picked features). Manual deformable methods let an expert place and adjust control points across large volumes. Deep-learning methods use segmented biological features — mitochondria, ER, nuclei — as a denser registration substrate, removing the need for explicit landmarks. Each is in fact a segmentation problem in disguise: classical landmark detection segments fiducial beads, manual deformable registration segments by hand, deep-learning methods segment organelles explicitly. The shift across the past decade has been from artificial landmarks toward biological features as the registration substrate, and modern CLEM registration is in practice a downstream consumer of the segmentation tools described in §4–§5.

Before discussing the tools that operate on already-acquired data, two acquisition-time correlation tools deserve mention: **3DCT** (Arnold et al., 2016) and **CorRelator** (Yang et al., 2021), which compute fluorescence-to-FIB and fluorescence-to-TEM correspondences at the microscope using fluorescent bead fiducials or hand-picked features. Both are widely used in cryo-CLEM workflows that target cryo-FIB lamella sites; their output is a coarse registration accurate to tens of nanometres — enough for milling, but not for high-resolution structural interpretation.

### 6.1 Landmark-based registration

**ec-CLEM** (Paul-Gilloteaux et al., 2017) is the long-standing community reference for landmark-based CLEM registration. Implemented inside the Icy bioimaging platform, it supports 2D and 3D registration at both room and cryogenic temperatures using user-supplied fiducial points or segmented landmark features. The pipeline is well-validated, well-documented, and integrates with most upstream LM and EM software. ec-CLEM is the appropriate first choice for any CLEM project that has clean fiducials, and it remains the baseline against which newer methods are compared.

### 6.2 Manual deformable registration at scale

For large vEM volumes — whole-tissue FIB-SEM, sectioned and remounted samples — registration must accommodate non-rigid deformations introduced by sectioning, mounting, and resin shrinkage. **BigWarp** (Bogovic et al., 2016) is the standard manual deformable tool: the user places control-point pairs across two images, and BigWarp computes a smooth deformation field that interpolates the correspondences. The tool runs on terabyte volumes inside the BigDataViewer framework and remains the only practical option for high-quality manual CLEM alignment of large vEM datasets. The cost is operator time; the benefit is that the human eye is hard to outperform for finding biologically meaningful correspondences in complex tissue.

### 6.3 Deep-learning registration using segmented features

The most active direction in CLEM registration moves the human out of the loop by using biological features as the registration substrate. **CLEM-Reg** (Krentzel et al., 2025) is the current open-source reference. It segments organelles — typically mitochondria, ER, or nuclei — in both modalities (using MicroSAM, MitoNet, or CellMap on the EM side, and matched LM-side segmenters), then registers the segmented features rather than the raw intensities. The advantage is that organelle segmentations are robust to the dramatic difference in contrast and resolution between LM and EM, in a way that intensity-based registration is not. CLEM-Reg works without landmark beads and is the first method in this family with broad community adoption. The chapter cites Krentzel et al., 2025, *Nature Methods*; verify year and venue at proof stage.

For projects where chromatin-stained nuclei are the only feature consistent across modalities, **DeepCLEM** (Seifert et al., 2020) provides automated 2D CLEM registration using chromatin signal as a fiducial. It is a specialised tool but the natural choice for cell-biology projects where DAPI or Hoechst is the LM channel used for registration.

### 6.4 Room-temperature CLEM with target relocation

Some CLEM workflows do not produce a single overlay image; instead they re-find a target identified in the LM inside a separately acquired vEM dataset. **CLEMSite** (Serra Lleti et al., 2023) addresses this case for FIB-SEM: given an LM-identified cell of interest, it autonomously navigates the FIB-SEM to that cell using a combination of low-magnification SEM imaging and learned feature recognition. This makes CLEMSite the appropriate choice for room-temperature volume CLEM screens where many cells must be re-found without operator intervention.

**Practical recommendation.** For most CLEM projects, the first decision is whether reliable fiducials are present. If yes, ec-CLEM is the appropriate starting point. If no, CLEM-Reg with organelle segmentation is the modern default. BigWarp handles large vEM volumes where deformable alignment by hand is acceptable. Reach for DeepCLEM when chromatin is the only consistent feature, and for CLEMSite when the workflow involves target relocation rather than overlay.

---

## 7. Cross-cutting Concerns

Four themes recur across the segmentation tasks discussed so far and do not belong to any single one of them. The first is the rise of foundation models adapted for EM. The second is the collective effort to build shared training data and pretraining substrates that make ML tools generalisable. The third is the question of label cost — the practical bottleneck in almost every project in §2–§6. The fourth is validation: the absence of community-accepted benchmarks for most segmentation tasks, which prevents the field from comparing tools honestly. We treat each briefly.

### 7.1 Foundation models in EM

A *foundation model* is a network trained on a large, diverse dataset such that its learned representation transfers to many downstream tasks without retraining the backbone. The Segment Anything Model (SAM; Kirillov et al., 2023) is the canonical example for image segmentation, and SAM 2 (Ravi et al., 2024) extends the architecture to video — and, by analogy, to 3D image stacks. Neither was trained on EM data.

The EM-adapted descendants discussed in earlier sections — **MicroSAM** (Archit et al., 2025; §5.3), **Cellpose-SAM** (Pachitariu et al., 2025; §5.3), **CryoSAM** (Zhao et al., 2024; §4.4) — fine-tune SAM-class backbones on EM data of varying breadth and specificity. They reduce per-task labelling burden and make interactive segmentation viable at scale, but they are not yet replacements for specialised pretrained models. MitoNet on mitochondria, CellMap on whole-cell organelles, and MemBrain-seg on cryo-ET membranes all outperform their SAM-adapted counterparts on their target tasks; the foundation models earn their place where a specialised model does not exist.

A separate line of work uses self-supervised vision transformers as frozen feature extractors. **DINOv2** (Oquab et al., 2023) is the most widely adopted; linear probes on DINOv2 features perform competitively with end-to-end-trained specialists on several recent EM segmentation benchmarks, with much lower per-task data demand. The field has not yet produced a truly EM-native foundation backbone of comparable scale; the substrate for one is being built (§7.2).

### 7.2 Training data and pretraining substrates

ML tools are only as good as their training data. The community's collective response to the data-availability problem over the past five years has been to build shared, diverse, annotated resources rather than continuing to train one-off networks per project.

**CEM500K** (Conrad et al., 2021), discussed in §5, is the canonical example for vEM: a curated 500,000-image dataset spanning multiple modalities and tissues, along with pretrained encoders that now form the standard backbone for fine-tuning vEM segmentation. The **CryoET Data Portal** (Ermel et al., 2024, *bioRxiv*), maintained by the Chan Zuckerberg Imaging Institute, plays the analogous role for cryo-electron tomography: open access to thousands of curated tilt series and tomograms with growing annotation coverage. **BioImage Model Zoo** (Ouyang et al., 2022, *bioRxiv*) is the cross-community model-sharing infrastructure for bioimage analysis, including but not limited to EM, and provides a common format for distributing trained networks across communities. Both the CryoET Data Portal and the Model Zoo are cited as preprints; refresh before submission.

These resources are not yet sufficient — annotation breadth is still uneven, and large modalities (SBEM in particular) are underrepresented relative to FIB-SEM — but they are the substrate on which the next generation of EM segmentation tools will be built.

### 7.3 Label-cost economics

The recurring practical observation through §2–§6 is that labels are the binding constraint. Modern segmentation networks have, in most cases, enough architectural capacity for the task; what they lack is labelled data of the right kind. The field has developed three complementary responses.

The first is interactive tools that turn an expert's pointing and clicking into dense pixel labels: MicroSAM, Cellpose-SAM, and Ilastik exemplify this approach. The second is self-supervised pretraining, where unlabelled EM data is used to learn representations that transfer with small labelled fine-tuning sets — CEM500K and DINOv2 are the substrates. The third is few-shot and foundation methods that operate directly on minimal labels — TomoTwin and Cryo-EMMAE for picking, CryoSAM for tomogram segmentation, UPicker for SPA. A practitioner planning a new segmentation project should think carefully about which response best matches the label budget before choosing a tool, because the algorithmic differences between picker classes are usually smaller than the differences in labelling regime.

For labs without GPU infrastructure, **ZeroCostDL4Mic** (von Chamier et al., 2021) provides Colab-hosted retraining of common segmentation networks, which lowers the entry cost for fine-tuning further. It is not a state-of-the-art training framework, but it is the appropriate first step for a lab that wants to apply a published model to local data without setting up cluster compute.

### 7.4 Validation and the benchmarking problem

The most awkward issue in the segmentation literature is that most tools report their accuracy on author-curated test sets, and cross-paper comparisons rarely reproduce on independent data. This is the *benchmarking-poverty* problem flagged in §2.4: a new picker claims 7% improvement over crYOLO on one benchmark, a different new picker claims 12% improvement on a different benchmark, and the practitioner has no principled way to compare the two.

Three things are missing. First, community-curated benchmark suites with held-out test data — analogous to ImageNet for natural-image classification — for the major segmentation tasks (SPA picking, cryo-ET membrane segmentation, vEM organelle segmentation). The CryoET Data Portal is building one for cryo-ET picking; equivalent efforts for vEM are still nascent. Second, calibrated uncertainty estimates: a segmentation that reports per-voxel confidence, well-calibrated against held-out data, would let a practitioner combine outputs from multiple tools and quantify disagreement honestly. Third, reporting standards that require any new segmenter to be compared on at least one community benchmark in addition to author data.

None of these are technically difficult; all of them require coordination across labs that compete for the same publication slots. The field's progress on this problem is real but slow.

**Practical recommendation.** When evaluating a new segmentation tool, do not trust accuracy numbers from the authors' own test set; rerun the tool on data you understand. When choosing between an interactive labelling tool and a fully automated segmenter, count the time cost of labels honestly — most projects underestimate it and end up choosing a model that needs more data than the project can produce.

---

## 8. Outlook

A landscape chapter should leave the reader with a clear sense of where the field stands and where it is moving. We close with three takes: what segmentation tasks the field has largely solved, what remains hard, and where the next productive moves are likely.

### 8.1 What is largely solved

Four tasks now have community-default tools that work well enough that further methodological work is unlikely to change practice.

SPA particle picking on standard specimens is one. crYOLO's general model, Topaz with a few labelled micrographs, and the consensus options behind them mean that an average new SPA dataset can be picked within an hour without specialist input. Mitochondrial segmentation in vEM is another: MitoNet runs out-of-the-box on FIB-SEM, SBEM, and ssTEM with accuracy adequate for quantitative analysis, and replacing it would require a meaningful improvement that none of the recent entrants has demonstrated. Membrane segmentation in cryo-ET is similarly close to solved for routine cases — MemBrain-seg produces publication-quality output on cellular tomograms, and TomoSegMemTV covers the no-GPU baseline. The U-Net family of architectures, finally, is the practical foundation for almost every project where labels are available; nnU-Net's automatic configuration removes most of the residual architecture-design work that used to consume early-career researchers.

This list is short on purpose. Many other segmentation tasks have one or two community-default tools, but the *task itself* is not closed — comparing pickers on novel specimens still produces meaningful method-development questions. *Solved* means the practitioner can apply the standard tool and move on.

### 8.2 What remains hard

Three problems recur across the chapter and have not yet had their breakthrough.

**Generalisation across specimens.** Most ML pickers and segmenters are trained on a narrow distribution — one organism, one preparation, one instrument. Their accuracy degrades on data that is far from their training distribution, often without warning. Class-agnostic tools (TomoTwin, MicroSAM) reduce but do not eliminate the problem, and there is no widely accepted protocol for evaluating whether a model will generalise to a new dataset before time is invested in running it.

**CLEM registration at high resolution.** Cryo-CLEM registration errors of tens of nanometres are routine; bringing the error below 10 nm — the scale at which a fluorescent puncta can be assigned to a specific complex rather than a region — remains unsolved. CLEM-Reg is the most plausible direction (using organelle segmentation as the substrate), but the limiting factor is now the resolution and chromatic correction of integrated optics rather than the registration software. Better iFLM hardware is likely to matter more than better registration code over the next five years.

**Validation and uncertainty quantification.** We discussed the benchmarking problem in §7.4. A segmentation tool that reported per-voxel confidence well-calibrated against held-out data would solve more than one issue: it would let practitioners combine tools, defend their results in publication, and triage segmentation outputs without resampling. No widely adopted tool currently does this.

Beyond these three, a longer list of specific problems remains: SBEM segmentation is underrepresented in pretrained models; filament tracing across long volumes still requires expert proofreading; fully automated cryo-CLEM pipelines that close the loop from fluorescence to structural interpretation do not exist. Each is more tractable than the three above, but each will require sustained method-development effort.

### 8.3 Where the next breakthroughs are likely

Four directions are most likely to produce real changes in practice over the next decade.

**EM-native foundation models.** The substrate for one is being built: CEM500K, the CryoET Data Portal, and the BioImage Model Zoo are accumulating the data and infrastructure required to train a true EM-domain foundation model — not a SAM adaptation, but a vision transformer pretrained on millions of EM images across modalities. The first such model that is broadly distributed will probably absorb several of the specialised pickers and segmenters discussed in §4–§5 into a single backbone.

**Diffusion models for restoration and completion.** Diffusion has reshaped image generation in adjacent fields; its application inside EM segmentation is still early. The opportunity is to use a diffusion prior for missing-wedge completion and resolution restoration with calibrated uncertainty, in place of the GAN-style methods that dominate IsoNet and DeepDeWedge. The principal advantage would be that the uncertainty is interpretable, which partially solves the validation problem in §8.2.

**Active learning and human-in-the-loop labelling.** The label-cost problem in §7.3 will not be solved by foundation models alone. The most efficient labelling regimes will probably combine an interactive foundation model (MicroSAM-class) with an active-learning loop that asks the human for labels where the model's uncertainty is highest. None of the current tools implements this cleanly, but the components exist.

**Closed-loop CLEM workflows.** The pieces are in place: integrated iFLM, automated cryo-FIB milling (AutoLamella), on-the-fly cryo-ET acquisition (SPACEtomo), real-time membrane and organelle segmentation. What is missing is an integration layer that turns the LM-tagged region of interest into a structural interpretation without operator intervention. Building that integration is engineering rather than ML research, but the result would be the biggest practical change for CLEM users in this chapter's scope.

---

## 9. Conclusion

Segmentation in electron microscopy has moved, within a decade, from a specialist craft requiring hours of expert input per dataset to a routine step performed by community-default tools in minutes. The transition is not complete — many tasks remain hard, and the per-paper rate of method churn shows no sign of slowing. But a working scientist beginning a new EM project in 2026 has, for almost every common segmentation task, at least one tool that can be applied without specialised ML expertise.

What has changed is not just the speed of segmentation but the shape of the labour. Algorithm design is no longer the bottleneck for most projects; the bottlenecks are now training data, validation, and the integration of segmentation outputs into downstream analysis. This shift has consequences for how labs allocate time: a junior researcher whose first instinct is to train a new picker will, in most cases, achieve more by spending the same time generating labels for an existing one. The next decade's productive moves are likely to be in shared data infrastructure, calibrated uncertainty, and end-to-end automation — particularly for CLEM workflows, where the closed loop from fluorescence localisation to structural interpretation remains an open problem.

For the CLEM practitioner specifically, the practical message is that segmentation is no longer a downstream concern. Modern registration tools rely on it directly, quantitative analyses of vEM and cryo-ET data depend on its accuracy, and decisions made at experimental design — which fluorescent tag, which contrast protocol, which acquisition modality — change which segmentation tools become available downstream. Treating segmentation as a planning variable rather than a post-acquisition step is the single change in practice that will most reliably improve the quality of CLEM results over the next several years.

---

## Open Resource

The 79-tool catalog underlying this chapter is published as an open community resource. The interactive searchable site — filterable by category, task, modality, approach, and availability — is at:

> **https://USERNAME.github.io/em-segmentation-tools/**  *(update with the repository URL once published).*

The repository hosts the same data behind Table 1 in structured JSON (CC-BY-4.0 licensed) along with the static site that renders it. New tools, corrections, and updates can be submitted through pull requests against the repository; see `CONTRIBUTING.md` for the entry schema and review process. The data file is intended for downstream reuse — surveys, benchmark assembly, training-data curation — and the site itself is rebuilt whenever the data changes, so the resource will continue to track the field beyond the publication date of this chapter.

Suggested citation for the open resource:

> EM Segmentation Tools Open Catalog (2026). v1.0.0. Companion to *Kiewisz, R. (2026), Methods in Cell Biology*.

---

*End of chapter prose. Remaining work: consolidated reference list, Table 1 (selected tools with citations and "when to use"), and figure planning. The open-resource files are in `tools-catalog-site/` in the project workspace and are ready to push to a public GitHub repository.*
