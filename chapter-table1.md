# Table 1 — Selected Tools for Segmentation in Electron Microscopy

*Companion table to the chapter, organised hierarchically by task. To find a tool: pick the section that matches what you want to do, then choose within it. Each row gives the tool, the modalities it supports, its computational approach (ML / Classical / Hybrid / Infrastructure), when it is the appropriate choice, its availability (Open / Commercial / Vendor), and a short citation key. Full bibliographic records are in `chapter-references.md`.*

*Total entries: 82. Within each subsection, ML tools come first, then hybrid, then classical, sorted alphabetically. Generated 2026-05-19.*

---

## Contents

**§1 Particle picking — locating macromolecules in images**

- §1.1 SPA particle picking (in 2D micrographs) — 19 tools
- §1.2 Cryo-ET macromolecule localization (in 3D tomograms) — 12 tools

**§2 Cryo-ET segmentation — labelling features inside tomograms**

- §2.1 Membrane segmentation — 3 tools
- §2.2 Filaments, vesicles, and specific features — 2 tools

**§3 Volume EM segmentation — labelling features inside vEM volumes**

- §3.1 Organelle segmentation — 4 tools
- §3.2 Connectomics — neurons and synapses (not covered in chapter body) — 6 tools

**§4 General-purpose segmentation tools (use across modalities)**

- §4.1 Foundation architectures and pretrained backbones — 11 tools
- §4.2 Commercial platforms — 1 tool

**§5 CLEM registration**

- §5.1 Landmark-based and manual deformable — 2 tools
- §5.2 Deep-learning / segmentation-driven — 1 tool
- §5.3 Acquisition-time correlation and target relocation — 4 tools

**§6 Preprocessing for segmentation — denoising and missing-wedge correction**

- §6.1 Denoising of cryo-ET tomograms — 8 tools
- §6.2 Missing-wedge correction — 3 tools

**§7 Training data and infrastructure**

- §7.1 Pretraining datasets, archives, and shared infrastructure — 6 tools

---

## §1 Particle picking — locating macromolecules in images

### §1.1 SPA particle picking (in 2D micrographs)

    | Tool | Modality | Approach | When to use | Availability | Citation |
    |---|---|---|---|---|---|
    | CASSPER | SPA | ML | When ice/contamination masking is itself useful (downstream quality filtering). | Open | George 2021 |
    | Cryo-EMMAE | SPA | ML | When you have novel specimens with no labels; reported to converge with as few as 5 micrographs. | Open | Cuevas-Saavedra 2025 |
    | crYOLO | SPA | ML | First-line SPA picker on commodity GPU; general model means no training in many cases. Filament picking supported via dedicated mode. | Open | Wagner 2019 |
    | CryoSegNet | SPA | ML | When seeking SAM-augmented picking; reported 7% / 14% resolution improvement over Topaz / crYOLO on Cheng-lab tests. | Open | Gyawali 2024 |
    | CryoTransformer | SPA | ML | When a transformer-class model with large pretraining (CryoPPP) is desired; reported FSC improvements over crYOLO/Topaz on Cheng-lab benchmark. | Open | Dhakal 2024 |
    | DeepCryoPicker | SPA | ML | Historical entry; minimally maintained. | Open | Al-Azzawi 2020 |
    | DeepPicker | SPA | ML | Historical baseline; rarely first choice today. | Open | Wang 2016 |
    | DRPnet | SPA | ML | Heatmap-based picking when regression-style outputs are preferred. | Open | Nguyen 2021 |
    | EMAN2 NN-picker | cryo-ET, SPA | ML | If already in EMAN2 workflow and want interactive training. | Open | Bell 2018 |
    | EPicker | SPA | ML | When picking diverse object types (particles, vesicles, fibers) with a single accumulating model. | Open | Zhang 2022 |
    | PIXER | SPA | ML | Historical baseline showing semantic-segmentation framing predates CASSPER. | Open | Zhang 2019 |
    | REPIC | SPA | ML | When you have run multiple pickers and want a principled consensus rather than majority vote. | Open | Cameron 2024 |
    | Topaz | SPA | ML | When you have sparse labels and want a picker that explicitly handles partial annotation noise; small/non-globular particles where bounding boxes f... | Open | Bepler 2019 |
    | UPicker | SPA | ML | When labelled data is scarce and large pools of unlabelled micrographs exist. | Open | Wang 2024 |
    | Warp / BoxNet | cryo-ET, SPA | ML | Real-time on-the-fly picking integrated with motion correction and CTF; in the cryo-ET version, BoxNet variants apply to 2D projections. | Open | Tegunov 2019 |
    | APPLE-picker | SPA | Classical | When you want a no-training picker with predictable behavior; baseline for SPA picking comparison. | Open | Heimowitz 2018 |
    | cisTEM 2DTM | SPA, cryo-ET | Classical | The modern reference for 2D template matching at high resolution. Use when you have an atomic model of the target and want statistically rigorous d... | Open | Lucas 2021 |
    | Gautomatch | SPA | Classical | When templates available and GPU CC desired; long the default first-pass picker before crYOLO/Topaz era. | Open | Zhang, citation unverified |
    | Reference-based auto-picking (RELION / cryoSPARC) | SPA | Classical | Use when a high-quality 2D class average from the same or a closely related sample is already available — for example, when re-picking a known stru... | Open | Scheres 2015 |

### §1.2 Cryo-ET macromolecule localization (in 3D tomograms)

| Tool | Modality | Approach | When to use | Availability | Citation |
|---|---|---|---|---|---|
| CryoSAM | cryo-ET | ML | Cryo-ET segmentation tasks with very few labels; rapid exploratory annotation in napari/ChimeraX. | Open | Zhao 2024 |
| DeepETPicker | cryo-ET | ML | Faster alternative to DeepFinder with reduced labelling burden; reported best overall accuracy on simulated and real test sets. | Open | Liu 2024 |
| DeepFinder | cryo-ET | ML | Multi-class macromolecule localisation in cellular cryo-ET when retraining on labelled tomograms is feasible. | Open | Moebel 2021 |
| DeePiCt | cryo-ET | ML | When you need both organelle context (membranes, nuclei, mitochondria) and particle picks in one pipeline. | Open | de Teresa-Trueba 2023 |
| EMAN2 tomogram CNN segmentation | cryo-ET | ML | Quick interactive segmentation of features in EMAN2; baseline for in-tomogram ML. | Open | Chen 2017 |
| MemBrain-pick | cryo-ET | ML | Specifically for membrane-embedded proteins where orientation along the membrane is needed. | Open | Lamm 2022 |
| PickYOLO | cryo-ET | ML | When throughput matters; reported 0.24-3.75 s/tomogram inference. | Open | Genthe 2023 |
| TomoTwin | cryo-ET | ML | When you want class-agnostic picking without retraining per particle, or to discover unknown macromolecules in cellular tomograms. | Open | Rice 2023 |
| Dynamo template matching | cryo-ET | Classical | Within Dynamo workflows for subtomogram averaging; especially with strong geometric priors (vesicle, filament). | Open | Castano-Diez 2012 |
| emClarity template matching | cryo-ET | Classical | When in the emClarity STA workflow; particularly strong on high-resolution targets like ribosomes. | Open | Himes 2018 |
| PySeg | cryo-ET | Classical | Workhorse for template-free picking of membrane-embedded/anchored complexes (ribosomes-on-ER, viral spikes, synaptic clefts) in cellular cryo-ET. | Open | Martinez-Sanchez 2020 |
| PyTOM-Match-Pick | cryo-ET | Classical | When a high-quality template is available (e.g., ribosome) and classical TM with explicit angular sampling is preferred. | Open | Chaillet 2023 |

## §2 Cryo-ET segmentation — labelling features inside tomograms

### §2.1 Membrane segmentation

| Tool | Modality | Approach | When to use | Availability | Citation |
|---|---|---|---|---|---|
| Ais | cryo-ET | ML | When you want an integrated GUI-driven cryo-ET segmentation workflow with model training built in (rather than scripting). | Open | Last 2024 |
| MemBrain-seg | cryo-ET | ML | First-line membrane segmentation in cryo-ET, out-of-the-box on diverse data. | Open | Lamm 2024 |
| TomoSegMemTV | cryo-ET | Classical | When deterministic, parameter-tuned classical pipeline is preferred (no GPU, no training). | Open | Martinez-Sanchez 2014 |

### §2.2 Filaments, vesicles, and specific features

| Tool | Modality | Approach | When to use | Availability | Citation |
|---|---|---|---|---|---|
| CryoVesNet | cryo-ET | ML | Quantitative analysis of synaptic vesicle pools, vesicle-membrane interactions; baseline for any round membrane-bound organelle in cryo-ET. | Open | Khosrozadeh 2025 |
| TARDIS-EM | cryo-ET, EM, ssTEM, vEM, LM | ML | Best when the chapter needs to discuss automated segmentation of filaments (microtubules in particular) and membranes in cellular cryo-ET tomograms... | Open | Kiewisz 2024 |

## §3 Volume EM segmentation — labelling features inside vEM volumes

### §3.1 Organelle segmentation

| Tool | Modality | Approach | When to use | Availability | Citation |
|---|---|---|---|---|---|
| CDeep3M | CLEM, FIB-SEM, SBEM, SEM, ssTEM | ML | When local GPU infrastructure is unavailable and an AWS-deployable pipeline is needed. | Open | Haberl 2018 |
| CellMap / OpenOrganelle | FIB-SEM, vEM | ML | Whole-cell vEM organelle segmentation; first-choice baseline before re-training; benchmark for new vEM segmentation methods via the CellMap Challenge. | Open | Heinrich 2021 |
| MitoNet / Empanada | array tomo, FIB-SEM, SBEM, SEM, ssTEM | ML | First-line mitochondria segmentation in vEM; out-of-the-box on diverse FIB-SEM/SBEM data. | Open | Conrad 2023 |
| PlantSeg | CLEM, FIB-SEM, SEM | ML | Tissue-level cell segmentation with thin boundaries; applicable to some FIB-SEM tissue data after retraining. | Open | Wolny 2020 |

### §3.2 Connectomics — neurons and synapses (not covered in chapter body)

| Tool | Modality | Approach | When to use | Availability | Citation |
|---|---|---|---|---|---|
| Ariadne / 3dEMtrace | FIB-SEM, SBEM, ssTEM | ML | Outsourced large-scale connectomics segmentation/proofreading when no in-house pipeline available. | Vendor | citation unverified |
| Flood-Filling Networks (FFN) | FIB-SEM, SBEM, ssTEM | ML | Highest-accuracy neuron segmentation at scale (used in Drosophila FAFB, hemibrain, MICrONS). | Open | Januszewski 2018 |
| Local Shape Descriptors (LSDs) | FIB-SEM, SBEM, ssTEM | ML | Production connectomics where FFN compute is prohibitive; benchmark accuracy ~ FFN at 100x less compute. | Open | Sheridan 2023 |
| PyTorch Connectomics (PyTC) | FIB-SEM, SBEM, ssTEM | ML | When you want a customisable, well-documented PyTorch connectomics framework supporting various tasks (synapse, mitochondria, neuron). | Open | Lin 2021 |
| Synaptic partner detection (Buhmann et al.) | ssTEM, vEM | ML | Connectomics pipelines requiring directed synaptic edges in fly/insect-scale datasets; baseline for synapse extraction in any pre-segmented neuron... | Open | Buhmann 2021 |
| Mutex Watershed | cryo-ET, FIB-SEM, SBEM, ssTEM | Classical | When you have learned affinities (LSD pipeline) and want a deterministic, threshold-free partitioning. | Open | Wolf 2018 |

## §4 General-purpose segmentation tools (use across modalities)

### §4.1 Foundation architectures and pretrained backbones

| Tool | Modality | Approach | When to use | Availability | Citation |
|---|---|---|---|---|---|
| 3D U-Net | cryo-ET, FIB-SEM, SBEM, ssTEM | ML | Reference 3D architecture; underlies almost every vEM and cryo-ET segmentation tool. | Open | Çiçek 2016 |
| Cellpose | CLEM, FIB-SEM, SBEM, ssTEM | ML | First-line for cell-like segmentation across LM and many EM contexts; CLEM workflows for LM upstream. | Open | Stringer 2021 |
| Cellpose-SAM | CLEM, FIB-SEM, SBEM, ssTEM | ML | When you want a SAM-grade foundation backbone for cell segmentation with Cellpose's flow-based instance recovery. | Open | Pachitariu 2025 |
| DeepEMhancer | SPA, STA | ML | Borderline placement: post-reconstruction map enhancement. Included here because it is a frequent companion to segmentation tasks (improves downstr... | Open | Sanchez-Garcia 2021 |
| DINOv2 | cryo-ET, FIB-SEM, SBEM, SEM, SPA, ssTEM | ML | As a frozen backbone for downstream EM tasks (linear probes, kNN). Increasingly used as feature extractor in cryo-EM pipelines (research-stage). | Open | Oquab 2023 |
| Ilastik | CLEM, cryo-ET, FIB-SEM, SBEM, SEM, ssTEM | ML | First-line for small-data interactive segmentation; common in vEM pre-deep-learning era; still useful as fast prototype tool. | Open | Berg 2019 |
| MicroSAM | CLEM, FIB-SEM, SBEM, SEM, ssTEM | ML | Interactive annotation acceleration on novel data with little/no training; volumetric segmentation via SAM 2 backbone. | Open | Archit 2025 |
| nnU-Net | cryo-ET, FIB-SEM, SBEM, SEM, ssTEM | ML | Strong baseline whenever you have labelled vEM data; the canonical 'just use nnU-Net' choice. | Open | Isensee 2021 |
| SAM | CLEM, FIB-SEM, iFLM, SBEM, SEM, ssTEM | ML | Zero/few-shot interactive segmentation backbone for many EM tools (MicroSAM, Cellpose-SAM, CryoSegNet). | Open | Kirillov 2023 |
| SAM 2 | CLEM, cryo-ET, FIB-SEM, SBEM, SEM, ssTEM | ML | Volumetric EM segmentation by treating z-slices as video frames; integrated by MicroSAM 3D mode. | Open | Ravi 2024 |
| Stardist | CLEM, FIB-SEM, SEM | ML | Convex/quasi-convex nuclei or cells; widely used in LM and applicable to LM side of CLEM. | Open | Schmidt 2018 |

### §4.2 Commercial platforms

| Tool | Modality | Approach | When to use | Availability | Citation |
|---|---|---|---|---|---|
| Amira |    | Hybrid | Standard choice in many vEM and biomedical-imaging labs for interactive segmentation, quantitative 3D analysis, and publication-quality visualizati... | Vendor | vendor; no peer-reviewed paper |

## §5 CLEM registration

### §5.1 Landmark-based and manual deformable

| Tool | Modality | Approach | When to use | Availability | Citation |
|---|---|---|---|---|---|
| BigWarp | CLEM, LM, vEM | Classical | Manual or semi-automated CLEM/vEM registration at TB scale, especially for non-rigid alignment of FM to vEM volumes; common stepping stone before M... | Open | Bogovic 2016 |
| ec-CLEM | CLEM | Classical | Default CLEM registration baseline (landmark-based) in Icy; appropriate for 2D and 3D, room-temperature and cryo-CLEM, where shared fiducials or re... | Open | Paul-Gilloteaux 2017 |

### §5.2 Deep-learning / segmentation-driven

| Tool | Modality | Approach | When to use | Availability | Citation |
|---|---|---|---|---|---|
| CLEM-Reg | CLEM, vEM | Hybrid | Volume CLEM where landmark beads are unavailable or sparse; especially useful when mitochondria, ER, or nuclei can be segmented in both modalities. | Open | Krentzel 2025 |

### §5.3 Acquisition-time correlation and target relocation

| Tool | Modality | Approach | When to use | Availability | Citation |
|---|---|---|---|---|---|
| DeepCLEM | CLEM, cryo-CLEM | ML | Automated 2D CLEM registration when chromatin stain is the fiducial; avoids manual fiducial picking. | Open | Seifert 2020 |
| CLEMSite | CLEM, FIB-SEM | Hybrid | Room-temperature volume CLEM screens where many cells must be re-found in FIB-SEM without operator intervention; useful when adapting CLEM to mediu... | Open | Serra Lleti 2023 |
| 3DCT | cryo-CLEM, iFLM | Classical | Standard correlation tool for cryo-FIB site-specific milling guided by FLM z-stacks; widely used with SerialFIB and within METEOR workflows. | Open | Arnold 2016 |
| CorRelator | cryo-CLEM | Classical | Live correlative acquisition on non-integrated systems (standalone FLM + TEM) where 3DCT is insufficient for stage-driven retargeting. | Open | Yang 2021 |

## §6 Preprocessing for segmentation — denoising and missing-wedge correction

### §6.1 Denoising of cryo-ET tomograms

| Tool | Modality | Approach | When to use | Availability | Citation |
|---|---|---|---|---|---|
| cryo-CARE | cryo-ET, SPA | ML | Cryo-ET tomogram visualization and downstream segmentation; SPA micrograph denoising for visualization (not for downstream refinement, which would... | Open | Buchholz 2019 |
| DenoisET | cryo-ET | ML | Live cryo-ET acquisition at facilities running AreTomoLive; alternative to cryoCARE-tomo with simpler integration. | Open | Peck 2025 |
| JANNI | SPA | ML | Cryo-EM micrograph denoising for visualization and as input to crYOLO when raw SNR is low. | Open | Wagner 2020 |
| Noise2Noise | cryo-ET, SPA | ML | Reference for the training paradigm; not used directly in cryo-EM but cited as the methodological foundation of cryoCARE, Topaz-Denoise, JANNI, and... | Open | Lehtinen 2018 |
| Noise2Self | cryo-ET, FIB-SEM, SPA | ML | Methodological reference; occasionally used in vEM denoising pipelines and single-cell imaging. | Open | Batson 2019 |
| Noise2Void | cryo-ET, FIB-SEM, SBEM, SPA | ML | When paired noisy realizations are unavailable, e.g. legacy datasets without even/odd splits or single-tilt vEM stacks. | Open | Krull 2019 |
| REST | cryo-ET | ML | When the user has a well-averaged structure for the target macromolecule and wants to inspect per-particle states without explicit STA. | Open | Zhang 2023 |
| Topaz-Denoise | cryo-ET, SPA | ML | Drop-in pretrained denoising for visualization, particle picking aids, and downstream segmentation; particularly useful when paired even/odd realiz... | Open | Bepler 2020 |

### §6.2 Missing-wedge correction

| Tool | Modality | Approach | When to use | Availability | Citation |
|---|---|---|---|---|---|
| DeepDeWedge | cryo-ET | ML | Cryo-ET tomograms with extreme missing-wedge artifacts where IsoNet under-performs; particularly for thick in-situ samples. | Open | Wiedemann 2024 |
| IsoNet | cryo-ET | ML | Cryo-ET visualization and segmentation when missing-wedge artifacts dominate; particularly useful before MemBrain-seg or DeePiCt. | Open | Liu 2022 |
| MWR (Missing Wedge Restoration) | cryo-ET | ML | Cited as an early baseline; largely superseded by IsoNet and DeepDeWedge for practical use. | Open | Ding 2019 |

## §7 Training data and infrastructure

### §7.1 Pretraining datasets, archives, and shared infrastructure

| Tool | Modality | Approach | When to use | Availability | Citation |
|---|---|---|---|---|---|
| CEM500K | FIB-SEM, SBEM, SEM, ssTEM | ML | When fine-tuning a vEM segmentation network with limited domain labels; canonical EM-domain pretraining. | Open | Conrad 2021 |
| BioImage Model Zoo | all | Infra | Anywhere a pretrained vEM / cryo-EM segmentation or denoising model needs to be shared or consumed across heterogeneous user-facing tools; reproduc... | Open | Ouyang 2022 |
| CryoET Data Portal | cryo-ET | Infra | Any 2024-2026 cryo-ET ML project that needs training data, benchmark splits, or community baselines; reference resource for chapter discussion of d... | Open | Ermel 2024 |
| EMDB | SPA, cryo-ET, all | Infra | Whenever a published cryo-EM structure or tomogram needs to be located, re-analysed, or used to validate a method. For segmentation work specifical... | Open | Lawson 2024 |
| EMPIAR | SPA, cryo-ET, FIB-SEM, SBEM, ssTEM, vEM, all | Infra | Whenever ML training, benchmarking, or method validation needs publicly available raw EM data with provenance. The primary substrate for any EM-dom... | Open | Iudin 2016 |
| ZeroCostDL4Mic | all | Infra | Lab-scale training of segmentation/denoising networks when no GPU cluster is available; first stop for users adopting DL in vEM/CLEM. | Open | von Chamier 2021 |

