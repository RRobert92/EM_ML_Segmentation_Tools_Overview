# EM Tools Landscape — Knowledge Base Overview

*Generated: 2026-05-18. Total tools cataloged: **216**.*

This is the human-readable index over the structured tool catalog assembled for the *Correlative Light and Electron Microscopy VI* book chapter on AI/ML tools across the EM pipeline. Each tool has a full structured entry in the corresponding stage JSON. This document is a tour of what's in the catalog; consult the JSON for the per-tool fields (architecture, training paradigm, training data, citation, repo, when-to-use, limitations, etc.).

## Files

| File | Contents |
|---|---|
| `tools-acquisition.json` | 1. Acquisition tools (37 entries) |
| `tools-processing.json` | 2. Processing tools (44 entries) |
| `tools-segmentation.json` | 3. Segmentation tools (63 entries) |
| `tools-analysis.json` | 4. Data analysis tools (69 entries) |
| `tools-cross-stage.json` | 5. Cross-stage infrastructure tools (3 entries) |
| `tools-all.json` | All entries, flat, easy to query |
| `REVIEW-NEEDED.md` | Preprints to refresh, vendor entries, weak citations |

## Top-level breakdown

**By stage:**

- 1. Acquisition: **37** tools
- 2. Processing: **44** tools
- 3. Segmentation: **63** tools
- 4. Data analysis: **69** tools
- 5. Cross-stage infrastructure: **3** tools

**By type:**

- classical: **99**
- ml: **98**
- hybrid: **16**
- infrastructure: **3**

**By modality** (a tool can support more than one):

- spa: 118
- cryo-et: 102
- sstem: 31
- fib-sem: 30
- sbem: 26
- sta: 20
- clem: 16
- sem: 15
- cryo-clem: 10
- array-tomo: 10
- cryo-fib: 8
- ilm: 7
- vem: 5
- lm: 2
- all microscopy: 2
- cross-cutting: 1

**By source quality:**

- peer-reviewed: 184
- preprint: 10
- peer-reviewed-conference: 9
- vendor: 8
- open-source: 4
- docs-only: 1

---

## Stage-by-stage tour

Each entry below shows: tool name, type tag, canonical citation, and one-line when-to-use. The JSON entries carry the full schema.

## 1. Acquisition

### automated-collection (10 tools)

- **ATUM** *[classical]* — Hayworth 2014, *Frontiers in Neural Circuits*. Volume EM workflows that prefer post-hoc multibeam SEM (MultiSEM) imaging of arrays rather than in-vacuo de...
- **EPU / Smart EPU** *[hybrid]* — vendor (no peer-reviewed paper). Default SPA acquisition on Thermo Fisher Krios/Glacios/Talos Arctica scopes; Smart EPU is the vendor answer...
- **GridTape** *[classical]* — Phelps 2021, *Cell*. Large-volume connectomics requiring thousands of serial sections (Drosophila VNC, mouse cortex blocks); the...
- **JADAS** *[classical]* — Zhang 2009, *Journal of Structural Biology*. JEOL CRYO ARM and JEM-3200FSC platforms when SerialEM JEOL plugin is not used.
- **Latitude S** *[classical]* — vendor (no peer-reviewed paper). Facilities running Gatan detector ecosystems that prefer vendor automation; works with Thermo Fisher, JEOL,...
- **Leginon** *[classical]* — Suloway 2005, *Journal of Structural Biology*. SPA acquisition in shared facilities needing per-session traceability and multi-user database support; cano...
- **MultiSEM** *[classical]* — Eberle 2015, *Journal of Microscopy*. Petabyte-scale connectomics acquisitions (H01 human cortex, MICrONS, FlyEM); only practical option for cubi...
- **SerialEM** *[classical]* — Mastronarde 2005, *Journal of Structural Biology*. Default open-source automation for SPA and cryo-ET on most TEM platforms; foundation for many downstream sc...
- **SerialFIB** *[classical]* — Klumpe 2021, *eLife*. Automated lamella preparation on Thermo Fisher Aquilos/Arctis when vendor AutoTEM/AutoSlicer is unavailable...
- **Tomo5** *[classical]* — vendor (no peer-reviewed paper). Default Thermo Fisher cryo-ET acquisition where vendor support and Tomo Live are required.

### on-the-fly-qa (9 tools)

- **Appion** *[classical]* — Lander 2009, *Journal of Structural Biology*. Facilities running Leginon that want a longstanding traceable processing log alongside acquisition; partial...
- **CryoFLARE** *[classical]* — Schenk 2020, *Journal of Chemical Information and Modeling*. Facilities that want a free, plug-and-play live monitor compatible with arbitrary motion/CTF/picker backends.
- **cryoSPARC Live** *[hybrid]* — Punjani 2017, *Nature Methods*. Real-time SPA monitoring during long Krios/Glacios sessions to catch drift, ice, contamination early; now b...
- **Focus** *[classical]* — Biyani 2017, *Journal of Structural Biology*. On-the-fly pre-processing in facilities that prefer an open-source non-cryoSPARC stack; historically used a...
- **MicAssess** *[ML]* — Li 2020, *Structure*. Live or post-hoc rejection of unusable micrographs to improve downstream 2D/3D throughput; classical altern...
- **Miffi** *[ML]* — Xu 2024, *Journal of Structural Biology*. Improved live/post-hoc micrograph filtering when MicAssess-style binary classification is insufficient; int...
- **Tomo Live** *[classical]* — Comet 2024, *Acta Crystallographica D*. Live triage during cryo-ET sessions on Thermo Fisher scopes running Tomo5; reduces wasted screen time on po...
- **TranSPHIRE** *[hybrid]* — Stabrin 2020, *Nature Communications*. Single-workstation on-the-fly pipeline for SPA when SPHIRE/crYOLO are preferred; useful when no GPU farm is...
- **Warp** *[hybrid]* — Tegunov 2019, *Nature Methods*. Live preprocessing during SPA/cryo-ET acquisition; pairs with M for tilt-series-level refinement downstream.

### target-selection (4 tools)

- **3DCT** *[classical]* — Arnold 2016, *Biophysical Journal*. Standard correlation tool for cryo-FIB site-specific milling guided by FLM z-stacks; widely used with Seria...
- **CorRelator** *[classical]* — Yang 2021, *Journal of Structural Biology*. Live correlative acquisition on non-integrated systems (standalone FLM + TEM) where 3DCT is insufficient fo...
- **DeepCLEM** *[ML]* — Seifert 2020, *F1000Research*. Automated 2D CLEM registration when chromatin stain is the fiducial; avoids manual fiducial picking.
- **Ptolemy** *[ML]* — Kim 2023, *IUCrJ*. Drop-in target selector for Leginon (via Smart Leginon) or standalone evaluation of grid-square/hole qualit...

### fluorescence-guided-milling (4 tools)

- **Arctis iFLM** *[classical]* — Berger 2023, *Nature Communications*. Plasma FIB milling of large (e.g., tissue) cryo-samples with in-situ FLM guidance; current top-end commerci...
- **ENZEL** *[classical]* — Boltje 2022, *eLife*. Custom-built integrated cryo-CLEM workflow; design reference for facilities exploring in-chamber FLM beyond...
- **METEOR** *[classical]* — Smeets 2022, *Microscopy and Microanalysis*. Routine fluorescence-guided lamella milling without sample transfer; reduces contamination versus shuttle w...
- **PIE-scope** *[classical]* — Gorelick 2019, *eLife*. Reference academic implementation of in-chamber cryo-FLM for FIB; design papers basis for current commercia...

### beam-image-shift (2 tools)

- **BISECT** *[classical]* — Bouvette 2021, *Nature Communications*. Acquisition recipe for higher-throughput cryo-ET aiming at sub-nanometer-resolution structures; pre-dates P...
- **PACE-tomo** *[classical]* — Eisenstein 2023, *Nature Methods*. High-throughput cryo-ET on lamellae or thin specimens to multiply effective targets per stage move; default...

### screening (2 tools)

- **CASSPER** *[ML]* — George 2021, *Communications Biology*. Screening grids for ice vs carbon contamination; producing particle masks for downstream picking with reduc...
- **SmartScope** *[ML]* — Bouvette 2022, *eLife*. Automated multi-grid screening and collection on Thermo Fisher Krios/Glacios driven by SerialEM; first publ...

### smart-acquisition (2 tools)

- **Smart Leginon** *[hybrid]* — Cheng 2023, *IUCrJ*. Overnight unattended multi-grid screening on Krios/Glacios within an NYSBC-style Leginon setup; reduces ope...
- **SPACEtomo** *[ML]* — Eisenstein 2024, *Nature Methods*. Unattended cryo-ET sessions on FIB-milled lamellae where biological feature targeting (mitochondria, vesicl...

### cryo-FIB lamella milling automation (1 tool)

- **AutoLamella** *[hybrid]* — Cleeve 2023, *Journal of Structural Biology*. Open-source automated cryo-FIB milling at facility scale; preferred where vendor automation (AutoTEM/Strato...

### CLEM target relocation and FIB-SEM automation (1 tool)

- **CLEMSite** *[hybrid]* — Serra Lleti 2023, *Journal of Cell Biology*. Room-temperature volume CLEM screens where many cells must be re-found in FIB-SEM without operator interven...

### tilt-scheme (1 tool)

- **Hagen dose-symmetric tilt scheme** *[classical]* — Hagen 2017, *Journal of Structural Biology*. Default tilt-scheme for high-resolution sub-tomogram averaging; benchmark studies (Turonova et al. 2020) co...

### tilt-series management and preprocessing wrapper (1 tool)

- **TOMOMAN** *[classical]* — Khavnekar 2024, *IUCrJ*. Cryo-ET facility-scale preprocessing managing many concurrent tilt-series and moving them between heterogen...


## 2. Processing

### motion-correction (10 tools)

- **alignframes (IMOD)** *[classical]* — Mastronarde 2017, *Journal of Structural Biology (companion to the etomo auto-alignment paper)*. When the rest of the pipeline lives in IMOD/Etomo (especially classical fiducial-based tomography); enables...
- **AlignParts_LMBFGS** *[classical]* — Rubinstein 2015, *Journal of Structural Biology*. Historic per-particle motion correction; conceptually superseded by RELION's Bayesian polishing and cryoSPA...
- **Bayesian polishing (RELION)** *[classical]* — Zivanov 2019, *IUCrJ*. Final post-MotionCor refinement step before high-resolution 3D refinement in RELION; essential for sub-3 A ...
- **cryoSPARC patch motion correction** *[classical]* — Punjani 2017, *Nature Methods (the foundational cryoSPARC algorithms paper)*. Within a cryoSPARC-only pipeline where running external tools is undesirable; closely matched performance t...
- **M** *[classical]* — Tegunov 2021, *Nature Methods*. When pushing tilt-series STA toward sub-4 A or aligning per-frame motion across a multi-particle population...
- **MotionCor2** *[classical]* — Zheng 2017, *Nature Methods*. Default GPU motion correction for SPA and tilt-series movie frames; integrated by virtually all SPA pipelin...
- **MotionCor3** *[classical]* — Zheng 2017, *Nature Methods (canonical MotionCor2 paper; MotionCor3 is the same lineage)*. Drop-in replacement for MotionCor2 on modern direct-detector data, especially Falcon 4i EER movies and tilt...
- **RELION MotionCor (own implementation)** *[classical]* — Zivanov 2019, *IUCrJ (Bayesian polishing paper, which describes RELION's motion-correction stack)*. Inside RELION when an external MotionCor binary is unavailable; gives users a fully integrated, scriptable ...
- **Unblur** *[classical]* — Grant 2015, *eLife*. CPU-only motion correction within cisTEM and Frealign workflows; canonical reference for exposure-weighted ...
- **Warp** *[hybrid]* — Tegunov 2019, *Nature Methods*. Live and offline preprocessing for both SPA and cryo-ET; widely used when joint optimization of motion and ...

### denoising (9 tools)

- **cryo-CARE** *[ML]* — Buchholz 2019, *IEEE ISBI 2019*. Cryo-ET tomogram visualization and downstream segmentation; SPA micrograph denoising for visualization (not...
- **DenoisET** *[ML]* — Peck, A. 2025, *bioRxiv (companion to AreTomoLive)*. Live cryo-ET acquisition at facilities running AreTomoLive; alternative to cryoCARE-tomo with simpler integ...
- **JANNI** *[ML]* — Wagner 2020, *Communications Biology (described alongside SPHIRE-crYOLO updates)*. Cryo-EM micrograph denoising for visualization and as input to crYOLO when raw SNR is low.
- **Noise2Noise** *[ML]* — Lehtinen 2018, *Proc. 35th ICML (PMLR 80)*. Reference for the training paradigm; not used directly in cryo-EM but cited as the methodological foundatio...
- **Noise2Self** *[ML]* — Batson 2019, *Proc. 36th ICML (PMLR 97)*. Methodological reference; occasionally used in vEM denoising pipelines and single-cell imaging.
- **Noise2Void** *[ML]* — Krull 2019, *CVPR*. When paired noisy realizations are unavailable, e.g. legacy datasets without even/odd splits or single-tilt...
- **REST** *[ML]* — Zhang 2023, *Nature Communications*. When the user has a well-averaged structure for the target macromolecule and wants to inspect per-particle ...
- **TomoSegMemTV** *[classical]* — Martinez-Sanchez 2014, *Journal of Structural Biology*. Classical baseline before MemBrain-seg; useful on tomograms with structured but noisy membranes; pairs with...
- **Topaz-Denoise** *[ML]* — Bepler 2020, *Nature Communications*. Drop-in pretrained denoising for visualization, particle picking aids, and downstream segmentation; particu...

### normalization (5 tools)

- **cryoSPARC Live** *[classical]* — Punjani 2017, *Nature Methods (cryoSPARC); Live feature documented in cryoSPARC guide and unpublished talks*. Live SPA session monitoring at facilities running cryoSPARC; preferred over Warp Live for cryoSPARC-centric...
- **EER (Electron-Event Representation)** *[classical]* — Guo 2020, *IUCrJ*. Acquisition output of all Falcon 4/4i sessions in 2024-2026; processed by MotionCor3, Warp, RELION 5, and c...
- **MicAssess** *[ML]* — Li 2020, *IUCrJ (high-throughput cryo-EM enabled by user-free preprocessing routines)*. Automated micrograph curation at the start of an SPA pipeline; especially useful at high-throughput facilit...
- **Miffi** *[ML]* — Liao 2024, *Journal of Structural Biology*. Improved replacement for MicAssess where Fourier-domain artifacts (ice rings, drift) are common.
- **Smart EPU AI features (Thermo Fisher)** *[ML]* — vendor (no peer-reviewed paper). Thermo Fisher Krios/Glacios facilities using EPU as the acquisition front-end and wanting automated quality...

### ctf-estimation (5 tools)

- **CTFFIND4** *[classical]* — Rohou 2015, *Journal of Structural Biology*. Default open-source CTF estimator for SPA and tilt-series; reliable, fast, well-validated; the workhorse fo...
- **CTFFIND5** *[classical]* — Elferich 2024, *eLife*. Cryo-FIB lamella micrographs, tilted SPA collections, thick in-situ samples; whenever CTFFIND4 underperform...
- **Gctf** *[classical]* — Zhang 2016, *Journal of Structural Biology*. Faster than CTFFIND4 on GPUs (10-50x); historically common for per-particle defocus refinement.
- **novaCTF** *[classical]* — Turonova 2017, *Journal of Structural Biology*. Pre-STA tomogram reconstruction when 3D-CTF correction is required for sub-4 A subtomogram averages; standa...
- **Patch CTF (cryoSPARC)** *[classical]* — Punjani 2017, *Nature Methods*. When cryoSPARC is the primary processing suite; avoids tool-juggling.

### section-alignment (4 tools)

- **AlignTK** *[classical]* — Wetzel 2016, *Methods (book chapter / lab documentation)*. Where existing lab pipelines depend on AlignTK; otherwise SOFIMA is preferred for new volumes.
- **Fiji Linear Stack Alignment with SIFT** *[classical]* — Lowe 2004, *International Journal of Computer Vision (foundational SIFT paper)*. First-pass rough alignment of small vEM stacks; pedagogical default in Fiji; rarely sufficient as final ali...
- **SOFIMA** *[hybrid]* — Janelia / Google 2024, *Zenodo (software release; no dedicated journal paper as of 2026-05-18)*. Connectomics-scale serial-section EM alignment and FIB-SEM volume registration where TrakEM2/AlignTK do not...
- **TrakEM2** *[classical]* — Cardona 2012, *PLoS ONE*. Classical reference for ssTEM/array-tomography montage and alignment; pre-connectomics workhorse and still ...

### wedge-correction (2 tools)

- **DeepDeWedge** *[ML]* — Wiedemann 2024, *Nature Communications*. Cryo-ET tomograms with extreme missing-wedge artifacts where IsoNet under-performs; particularly for thick ...
- **IsoNet** *[ML]* — Liu 2022, *Nature Communications*. Cryo-ET visualization and segmentation when missing-wedge artifacts dominate; particularly useful before Me...

### tilt-series alignment and tomogram reconstruction (1 tool)

- **AreTomo** *[classical]* — Zheng 2022, *Journal of Structural Biology: X*. Default fiducial-less alignment for cellular cryo-ET and lamellae where IMOD's marker-based workflow is imp...

### end-to-end cryo-ET preprocessing and reconstruction (1 tool)

- **AreTomo3** *[classical]* — Peck, A. 2025, *bioRxiv (preprint)*. On-the-fly cryo-ET pipelines at the microscope; recommended for high-throughput tomography and as a feed to...

### real-time cryo-ET reconstruction with denoising (1 tool)

- **AreTomoLive** *[hybrid]* — Peck, A. 2025, *bioRxiv (preprint)*. Microscope-side live tomography: judging tilt-series quality, on-the-fly selection for STA, sessions where ...

### foundation model / generative prior for density maps (1 tool)

- **CryoFM** *[ML]* — Yu 2025, *ICLR (International Conference on Learning Representations)*. Plug-and-play prior for low-SNR/incomplete cryo-EM maps; alternative to bespoke task-specific networks; pri...

### synthetic-data generation (generative prior) (1 tool)

- **CryoGEM** *[ML]* — Zhang 2024, *NeurIPS (Advances in Neural Information Processing Systems)*. Augmenting picker/pose-estimator training when annotated micrographs are scarce; pretraining foundation mod...

### end-to-end cryo-ET image processing pipeline (1 tool)

- **RELION 5 tomography** *[hybrid]* — Burt 2024, *FEBS Open Bio*. End-to-end cryo-ET in a single open-source package; preferred when wanting tight integration of Blush regul...

### preferred-orientation and anisotropy correction (1 tool)

- **spIsoNet** *[ML]* — Liu 2024, *Nature Methods*. Datasets with strong preferred orientation (membrane proteins on air-water interface) or missing-wedge domi...

### dose-weighting (1 tool)

- **Summovie** *[classical]* — Grant 2015, *eLife*. Drop-in dose weighting step when motion correction was performed by another tool that did not apply the fil...

### preprocessing and tomogram reconstruction (1 tool)

- **Warp 2 / WarpTools** *[hybrid]* — Tegunov 2019, *Nature Methods*. Default Linux preprocessing for cryo-ET and SPA pipelines integrating with M, RELION-5 and cryoSPARC; prefe...


## 3. Segmentation

### spa-picking (18 tools)

- **APPLE-picker** *[classical]* — Heimowitz, Ayelet 2018, *Journal of Structural Biology*. When you want a no-training picker with predictable behavior; baseline for SPA picking comparison.
- **CASSPER** *[ML]* — George, Blesson 2021, *Communications Biology*. When ice/contamination masking is itself useful (downstream quality filtering).
- **Cryo-EMMAE** *[ML]* — Cuevas-Saavedra, Hector 2025, *Cell Reports Methods*. When you have novel specimens with no labels; reported to converge with as few as 5 micrographs.
- **crYOLO (SPHIRE-crYOLO)** *[ML]* — Wagner, Thorsten 2019, *Communications Biology*. First-line SPA picker on commodity GPU; general model means no training in many cases. Filament picking sup...
- **CryoSegNet** *[ML]* — Gyawali, Rajan 2024, *Briefings in Bioinformatics*. When seeking SAM-augmented picking; reported 7% / 14% resolution improvement over Topaz / crYOLO on Cheng-l...
- **CryoTransformer** *[ML]* — Dhakal, Ashwin 2024, *Bioinformatics*. When a transformer-class model with large pretraining (CryoPPP) is desired; reported FSC improvements over ...
- **DeepCryoPicker** *[ML]* — Al-Azzawi, Adil 2020, *BMC Bioinformatics*. Historical entry; minimally maintained.
- **DeepPicker** *[ML]* — Wang, Feng 2016, *Journal of Structural Biology*. Historical baseline; rarely first choice today.
- **DRPnet** *[ML]* — Nguyen, Nguyen Phuoc 2021, *BMC Bioinformatics*. Heatmap-based picking when regression-style outputs are preferred.
- **EMAN2 NN-picker (e2boxer NN)** *[ML]* — Bell, James M. 2018, *Journal of Structural Biology*. If already in EMAN2 workflow and want interactive training.
- **EPicker** *[ML]* — Zhang, Xinyu 2022, *Nature Communications*. When picking diverse object types (particles, vesicles, fibers) with a single accumulating model.
- **Gautomatch** *[classical]* — citation unverified. When templates available and GPU CC desired; long the default first-pass picker before crYOLO/Topaz era.
- **PIXER** *[ML]* — Zhang, Jianquan 2019, *BMC Bioinformatics*. Historical baseline showing semantic-segmentation framing predates CASSPER.
- **REPIC** *[ML]* — Cameron, Christopher J. F. 2024, *Communications Biology*. When you have run multiple pickers and want a principled consensus rather than majority vote.
- **Template matching (RELION/cryoSPARC built-ins)** *[classical]* — Scheres, Sjors H. W. 2015, *Journal of Structural Biology*. Required when a high-quality 2D average is available; still the default for some workflows in RELION/cryoSP...
- **Topaz** *[ML]* — Bepler, Tristan 2019, *Nature Methods*. When you have sparse labels and want a picker that explicitly handles partial annotation noise; small/non-g...
- **UPicker** *[ML]* — Wang, Chi 2024, *Briefings in Bioinformatics*. When labelled data is scarce and large pools of unlabelled micrographs exist.
- **Warp / BoxNet** *[ML]* — Tegunov, Dimitry 2019, *Nature Methods*. Real-time on-the-fly picking integrated with motion correction and CTF; in the cryo-ET version, BoxNet vari...

### foundation-segmentation (12 tools)

- **3D U-Net (Cicek)** *[ML]* — Çiçek, Özgün 2016, *MICCAI*. Reference 3D architecture; underlies almost every vEM and cryo-ET segmentation tool.
- **Cellpose / Cellpose 2 / Cellpose 3** *[ML]* — Stringer, Carsen 2021, *Nature Methods*. First-line for cell-like segmentation across LM and many EM contexts; CLEM workflows for LM upstream.
- **Cellpose-SAM** *[ML]* — Pachitariu, M. 2025, *bioRxiv (preprint)*. When you want a SAM-grade foundation backbone for cell segmentation with Cellpose's flow-based instance rec...
- **CEM500K** *[ML]* — Conrad, Ryan 2021, *eLife*. When fine-tuning a vEM segmentation network with limited domain labels; canonical EM-domain pretraining.
- **DeepEMhancer** *[ML]* — Sanchez-Garcia, Ruben 2021, *Communications Biology*. Borderline placement: post-reconstruction map enhancement. Included here because it is a frequent companion...
- **DINOv2** *[ML]* — Oquab, Maxime 2023, *Transactions on Machine Learning Research (TMLR) / arXiv 2304.07193*. As a frozen backbone for downstream EM tasks (linear probes, kNN). Increasingly used as feature extractor i...
- **Ilastik** *[ML]* — Berg, Stuart 2019, *Nature Methods*. First-line for small-data interactive segmentation; common in vEM pre-deep-learning era; still useful as fa...
- **MicroSAM (μSAM)** *[ML]* — Archit, Anwai 2025, *Nature Methods*. Interactive annotation acceleration on novel data with little/no training; volumetric segmentation via SAM ...
- **nnU-Net** *[ML]* — Isensee, Fabian 2021, *Nature Methods*. Strong baseline whenever you have labelled vEM data; the canonical 'just use nnU-Net' choice.
- **SAM (Segment Anything Model)** *[ML]* — Kirillov, Alexander 2023, *ICCV (Proc. IEEE/CVF)*. Zero/few-shot interactive segmentation backbone for many EM tools (MicroSAM, Cellpose-SAM, CryoSegNet).
- **SAM 2** *[ML]* — Ravi, Nikhila 2024, *ICLR (arXiv 2408.00714)*. Volumetric EM segmentation by treating z-slices as video frames; integrated by MicroSAM 3D mode.
- **Stardist** *[ML]* — Schmidt, Uwe 2018, *MICCAI*. Convex/quasi-convex nuclei or cells; widely used in LM and applicable to LM side of CLEM.

### et-picking (10 tools)

- **DeepETPicker** *[ML]* — Liu, Guole 2024, *Nature Communications*. Faster alternative to DeepFinder with reduced labelling burden; reported best overall accuracy on simulated...
- **DeepFinder** *[ML]* — Moebel, Emmanuel 2021, *Nature Methods*. Multi-class macromolecule localisation in cellular cryo-ET when retraining on labelled tomograms is feasible.
- **DeePiCt** *[ML]* — de Teresa-Trueba, Irene 2023, *Nature Methods*. When you need both organelle context (membranes, nuclei, mitochondria) and particle picks in one pipeline.
- **Dynamo template matching** *[classical]* — Castano-Diez, Daniel 2012, *Journal of Structural Biology*. Within Dynamo workflows for subtomogram averaging; especially with strong geometric priors (vesicle, filame...
- **EMAN2 tomogram CNN segmentation** *[ML]* — Chen, Muyuan 2017, *Nature Methods*. Quick interactive segmentation of features in EMAN2; baseline for in-tomogram ML.
- **emClarity template matching** *[classical]* — Himes, Benjamin A. 2018, *Nature Methods*. When in the emClarity STA workflow; particularly strong on high-resolution targets like ribosomes.
- **MemBrain-pick** *[ML]* — Lamm, Lorenz 2022, *Computer Methods and Programs in Biomedicine*. Specifically for membrane-embedded proteins where orientation along the membrane is needed.
- **PickYOLO** *[ML]* — Genthe, Erik 2023, *Journal of Structural Biology*. When throughput matters; reported 0.24-3.75 s/tomogram inference.
- **PyTOM-Match-Pick** *[classical]* — Chaillet, Marten L. 2023, *International Journal of Molecular Sciences*. When a high-quality template is available (e.g., ribosome) and classical TM with explicit angular sampling ...
- **TomoTwin** *[ML]* — Rice, Gavin 2023, *Nature Methods*. When you want class-agnostic picking without retraining per particle, or to discover unknown macromolecules...

### connectomics (5 tools)

- **Ariadne / 3dEMtrace** *[ML]* — vendor (no peer-reviewed paper). Outsourced large-scale connectomics segmentation/proofreading when no in-house pipeline available.
- **Flood-Filling Networks (FFN)** *[ML]* — Januszewski, Michał 2018, *Nature Methods*. Highest-accuracy neuron segmentation at scale (used in Drosophila FAFB, hemibrain, MICrONS).
- **Local Shape Descriptors (LSDs)** *[ML]* — Sheridan, Arlo 2023, *Nature Methods*. Production connectomics where FFN compute is prohibitive; benchmark accuracy ~ FFN at 100x less compute.
- **Mutex Watershed** *[classical]* — Wolf, Steffen 2018, *ECCV*. When you have learned affinities (LSD pipeline) and want a deterministic, threshold-free partitioning.
- **PyTorch Connectomics (PyTC)** *[ML]* — Lin, Z. 2021, *arXiv preprint arXiv:2112.05754*. When you want a customisable, well-documented PyTorch connectomics framework supporting various tasks (syna...

### membrane-segmentation (3 tools)

- **Ais** *[ML]* — Last, Mart G. F. 2024, *eLife*. When you want an integrated GUI-driven cryo-ET segmentation workflow with model training built in (rather t...
- **MemBrain-seg** *[ML]* — Lamm, L. 2024, *bioRxiv (preprint)*. First-line membrane segmentation in cryo-ET, out-of-the-box on diverse data.
- **TomoSegMemTV** *[classical]* — Martinez-Sanchez, Antonio 2014, *Journal of Structural Biology*. When deterministic, parameter-tuned classical pipeline is preferred (no GPU, no training).

### organelle-segmentation (3 tools)

- **CDeep3M** *[ML]* — Haberl, Matthias G. 2018, *Nature Methods*. When local GPU infrastructure is unavailable and an AWS-deployable pipeline is needed.
- **MitoNet (Empanada)** *[ML]* — Conrad, Ryan 2023, *Cell Systems*. First-line mitochondria segmentation in vEM; out-of-the-box on diverse FIB-SEM/SBEM data.
- **PlantSeg** *[ML]* — Wolny, Adrian 2020, *eLife*. Tissue-level cell segmentation with thin boundaries; applicable to some FIB-SEM tissue data after retraining.

### lamella-detection (2 tools)

- **SerialFIB** *[classical]* — Klumpe, Sven 2021, *eLife*. Automated cryo-FIB lamella milling, especially when integrating CLEM signal for targeting.
- **SPACEtomo** *[ML]* — Eisenstein, Fabian 2024, *Nature Methods*. When fully automated, lamella-aware tilt-series collection on yeast lamellae is the goal.

### vendor-platform-segmentation (1 tool)

- **Amira** *[hybrid]* — vendor (no peer-reviewed paper). Standard choice in many vEM and biomedical-imaging labs for interactive segmentation, quantitative 3D analy...

### manual landmark-based deformable registration (1 tool)

- **BigWarp** *[classical]* — Bogovic 2016, *ISBI 2016 (IEEE)*. Manual or semi-automated CLEM/vEM registration at TB scale, especially for non-rigid alignment of FM to vEM...

### multi-class organelle segmentation in vEM (1 tool)

- **CellMap / OpenOrganelle whole-cell organelle segmentation models** *[ML]* — Heinrich 2021, *Nature*. Whole-cell vEM organelle segmentation; first-choice baseline before re-training; benchmark for new vEM segm...

### cross-modality registration (LM/FM to vEM) (1 tool)

- **CLEM-Reg** *[hybrid]* — Krentzel 2025, *Nature Methods*. Volume CLEM where landmark beads are unavailable or sparse; especially useful when mitochondria, ER, or nuc...

### particle picking and semantic segmentation in tomograms (1 tool)

- **CryoSAM** *[ML]* — Zhao 2024, *MICCAI (LNCS 15010)*. Cryo-ET segmentation tasks with very few labels; rapid exploratory annotation in napari/ChimeraX.

### synaptic vesicle segmentation in cryo-ET (1 tool)

- **CryoVesNet** *[ML]* — Khosrozadeh 2025, *Journal of Cell Biology*. Quantitative analysis of synaptic vesicle pools, vesicle-membrane interactions; baseline for any round memb...

### multidimensional CLEM registration (1 tool)

- **ec-CLEM** *[classical]* — Paul-Gilloteaux 2017, *Nature Methods*. Default CLEM registration baseline (landmark-based) in Icy; appropriate for 2D and 3D, room-temperature and...

### template-free membrane-bound complex picking (1 tool)

- **PySeg** *[classical]* — Martinez-Sanchez 2020, *Nature Methods*. Workhorse for template-free picking of membrane-embedded/anchored complexes (ribosomes-on-ER, viral spikes,...

### synapse and synaptic-partner detection in connectomics (1 tool)

- **Synaptic partner detection (Buhmann et al.)** *[ML]* — Buhmann 2021, *Nature Methods*. Connectomics pipelines requiring directed synaptic edges in fly/insect-scale datasets; baseline for synapse...

### filament-membrane-segmentation (1 tool)

- **TARDIS-EM** *[ML]* — Kiewisz, R. 2024, *bioRxiv (preprint, v2)*. Best when the chapter needs to discuss automated segmentation of filaments (microtubules in particular) and...


## 4. Data analysis

### heterogeneity (11 tools)

- **3DFlex** *[ML]* — Punjani 2023, *Nature Methods*. When the heterogeneity is continuous, topology-preserving flexibility of a single complex; complement to 3D...
- **cryoDRGN** *[ML]* — Zhong 2021, *Nature Methods*. When discrete or continuous compositional/conformational heterogeneity is suspected and the user wants to r...
- **CryoDRGN-AI** *[ML]* — Levy 2025, *Nature Methods*. Ab initio with heavy heterogeneity, dynamic complexes that confuse classical ab initio; also cryo-ET partic...
- **cryoSPARC 3DVA** *[classical]* — Punjani 2021, *Journal of Structural Biology*. Quick, interpretable view of dominant heterogeneity modes; standard first heterogeneity step in cryoSPARC w...
- **cryoSTAR** *[ML]* — Li 2024, *Nature Methods*. When a high-quality initial atomic model exists and the user wants to recover continuous conformations with...
- **DynaMight** *[ML]* — Schwab 2024, *Nature Methods*. When the user wants per-particle motion fields and an improved consensus refinement within the RELION ecosy...
- **e2gmm** *[ML]* — Chen 2021, *Nature Methods*. When working in EMAN2 and the user wants a sparse Gaussian-model representation of heterogeneity; also usef...
- **ManifoldEM** *[classical]* — Dashti 2014, *PNAS*. When the user wants explicit free-energy interpretation of conformational variability; useful complement to...
- **Multi-body refinement (RELION)** *[classical]* — Nakane 2018, *eLife*. When the user can identify discrete rigid bodies and the motion is dominated by inter-body movement (e.g., ...
- **OPUS-DSD** *[ML]* — Luo 2023, *Nature Methods*. When the user wants explicit disentanglement of compositional and conformational variability; particularly ...
- **RECOVAR** *[ML]* — Gilles 2025, *PNAS*. When the user wants a statistically interpretable linear-subspace view of heterogeneity that scales to many...

### validation (9 tools)

- **3DFSC** *[classical]* — Tan 2017, *Nature Methods*. Whenever orientation bias is suspected; mandatory metric for publication if sphericity is low.
- **blocres** *[classical]* — Heymann 2018, *Protein Science*. When ResMap/MonoRes need a methodologically distinct local-resolution second opinion; box-size choice affec...
- **cryoEF** *[classical]* — Naydenova 2017, *Nature Communications*. Early-stage diagnostic: triage whether anisotropy in the final map is fixable by collecting more tilted data.
- **DAQ-score** *[ML]* — Terashi 2022, *Nature Methods*. Identify mis-modeled residues, especially at intermediate resolution (2.5-5 A) where Q-score is less inform...
- **EMRinger** *[classical]* — Barad 2015, *Nature Methods*. Required validation metric for any cryo-EM publication; useful for tracking refinement progress.
- **MapQ / Q-score** *[classical]* — Pintilie 2020, *Nature Methods*. Standard map-model validation metric for cryo-EM at near-atomic resolution; complementary to EMRinger.
- **MonoRes** *[classical]* — Vilas 2018, *Structure*. Modern, parameter-free local resolution; integrates with LocalDeBlur for resolution-guided sharpening.
- **ResMap** *[classical]* — Kucukelbir 2014, *Nature Methods*. Standard local-resolution report on a finalized map; widely cited in cryo-EM papers.
- **TEMPy / TEMPy2** *[classical]* — Cragnolini 2021, *Acta Crystallographica D*. Map-model validation when alternatives (Q-score, EMRinger) need triangulation; useful for fitting flexible ...

### sta (8 tools)

- **Dynamo** *[classical]* — Castano-Diez 2012, *Journal of Structural Biology*. When the target has known geometric constraints (helical, lattice, membrane-bound) and the user benefits fr...
- **emClarity** *[classical]* — Himes 2018, *Nature Methods*. When pushing the highest possible STA resolution from a tomographic dataset with abundant identical particl...
- **M (multi-particle refinement)** *[classical]* — Tegunov 2021, *Nature Methods*. After initial STA in RELION or Warp; when pushing toward sub-4 Angstrom resolution from cryo-ET data of abu...
- **nextPYP** *[classical]* — Liu 2023, *Nature Methods*. Cluster-scale in-situ cryo-ET projects with hundreds of tilt series and hundreds of thousands of particles;...
- **PEET** *[classical]* — Nicastro 2006, *Science*. Quick, scriptable STA inside IMOD pipelines, especially for axoneme/flagella geometry studies where it was ...
- **PyTOM / PyTOM-Match-Pick** *[classical]* — Hrabe 2012, *Journal of Structural Biology*. Template-driven particle localization where the target structure is roughly known; PyTOM-Match-Pick recomme...
- **STOPGAP** *[classical]* — Wan 2024, *Acta Crystallographica D*. Mature STA option that integrates cleanly with Warp/RELION pipelines, especially for cellular tomography wi...
- **TomoBEAR** *[classical]* — Balyschew 2023, *Nature Communications*. Reproducible cryo-ET pipelines with mixed-package backends; teaching and consortium projects.

### spa-refinement (7 tools)

- **cisTEM** *[classical]* — Grant 2018, *eLife*. When users want a GUI-driven open-source SPA pipeline with strong reproducibility guarantees; cisTEM 2 intr...
- **cryoSPARC** *[classical]* — Punjani 2017, *Nature Methods*. Production SPA refinement when speed, NU-refine, and 3DFlex are needed; common partner with RELION for cros...
- **EMAN2 (refinement + tomography)** *[hybrid]* — Tang 2007, *Journal of Structural Biology*. When the user wants a single-package open-source SPA + ET workflow and access to e2gmm / e2spt heterogeneit...
- **Frealign** *[classical]* — Grigorieff 2016, *Methods in Enzymology*. Legacy or reproducibility studies; mostly subsumed by cisTEM today.
- **Non-uniform refinement (NU-refine)** *[classical]* — Punjani 2020, *Nature Methods*. When a flexible/disordered region degrades FSC of the rigid core; standard step in many cryoSPARC pipelines.
- **RELION (1 to 5)** *[classical]* — Kimanius 2021, *Biochemical Journal*. Default open-source SPA refinement engine and a free alternative to cryoSPARC; RELION 5 is the choice when ...
- **Scipion** *[classical]* — de la Rosa-Trevin 2016, *Journal of Structural Biology*. When cross-tool comparison and provenance tracking matter (consortium-scale projects, training, reproducibi...

### model-building-ai (6 tools)

- **CryoREAD** *[ML]* — Wang 2023, *Nature Methods*. RNA/DNA structures in cryo-EM maps where ModelAngelo's nucleic-acid handling is insufficient; complementary...
- **DeepMainmast** *[ML]* — Terashi 2024, *Nature Methods*. When AF2 priors are available and the user wants integrated model-building + assembly for homomultimers.
- **DeepTracer** *[ML]* — Pfab 2021, *PNAS*. Web-server-based de novo model building when local install is undesirable; useful baseline relative to Mode...
- **DiffModeler** *[ML]* — Wang 2024, *Nature Methods*. Low-resolution cryo-EM (5-10 A) of large multimers where standard model builders fail; relies on accurate A...
- **EMBuild** *[ML]* — He 2022, *Nature Communications*. Intermediate-resolution maps of large multi-chain complexes where de novo CNN tracers (ModelAngelo, DeepTra...
- **ModelAngelo** *[ML]* — Jamali 2024, *Nature*. First-pass de novo model building from high-resolution cryo-EM maps; especially valuable for large complexe...

### sharpening (6 tools)

- **DeepEMhancer** *[ML]* — Sanchez-Garcia 2021, *Communications Biology*. When a single-pass post-processed map for visualization, model-building, or display is needed and the user ...
- **EMReady** *[ML]* — He 2023, *Nature Communications*. Intermediate-resolution maps (3-6 A) where the user wants stronger model-build-ready density; often coupled...
- **LocalDeBlur** *[classical]* — Ramirez-Aportela 2020, *Bioinformatics*. Model-independent local sharpening; particularly useful when no good atomic model is yet built and broad lo...
- **LocScale** *[classical]* — Jakobi 2017, *eLife*. When a high-quality model exists and the user wants physically motivated, parameter-light sharpening; widel...
- **Phenix auto_sharpen / density modification** *[classical]* — Terwilliger 2018, *Acta Crystallographica D*. When a parameter-light sharpening is needed inside a Phenix refinement pipeline; resolve_cryo_em useful at ...
- **SIDESPLITTER** *[classical]* — Ramlaul 2020, *Journal of Structural Biology*. When a refinement shows clear local over-fitting (post-process FSC drops on masking); useful for flexible p...

### visualization (5 tools)

- **ChimeraX** *[classical]* — Pettersen 2021, *Protein Science*. Default cryo-EM visualization platform; gateway to ISOLDE, ArtiaX (cryo-ET), and many ML plugins.
- **MoBIE** *[classical]* — Pape 2023, *Nature Methods*. Sharing large vEM/CLEM data with collaborators or readers; integrating segmentation outputs with raw modali...
- **Neuroglancer** *[classical]* — citation unverified. Default viewer for very large connectomics volumes (MICrONS, FlyEM, H01); essential for vEM analysis at scale.
- **VAST (Volume Annotation and Segmentation Tool)** *[classical]* — Berger 2018, *Frontiers in Neural Circuits*. Manual ground-truth annotation for vEM ML training; Lichtman lab's reference annotation tool.
- **webKnossos** *[classical]* — Boergens 2017, *Nature Methods*. Multi-user vEM annotation projects; teaching and proofreading at scale; cloud-deployed analyses.

### model-building-classical (4 tools)

- **Coot** *[classical]* — Emsley 2010, *Acta Crystallographica D*. Standard manual model-building and editing step in cryo-EM workflows; required after any automated builder.
- **ISOLDE** *[classical]* — Croll 2018, *Acta Crystallographica D*. When rebuilding into low-resolution density (4+ A) where pure gradient-based refinement gets stuck; particu...
- **Phenix real_space_refine** *[classical]* — Afonine 2018, *Acta Crystallographica D*. Default real-space refinement step after manual editing in Coot; required for PDB deposition.
- **Servalcat** *[classical]* — Yamashita 2021, *Acta Crystallographica D*. When difference-map analysis (e.g., ligands, conformational changes) is needed during refinement; cleaner h...

### missing-wedge (3 tools)

- **DeepDeWedge** *[ML]* — Wiedemann 2024, *Nature Communications*. When IsoNet's iterative scheme is impractical and the user wants a simpler self-supervised baseline that is...
- **IsoNet** *[ML]* — Liu 2022, *Nature Communications*. For visualization, segmentation, and template matching where missing-wedge artifacts dominate interpretatio...
- **MWR (Missing Wedge Restoration)** *[ML]* — Ding 2019, *Communications Biology*. Cited as an early baseline; largely superseded by IsoNet and DeepDeWedge for practical use.

### tilt-alignment (2 tools)

- **AreTomo** *[classical]* — Zheng, S. 2022, *Journal of Structural Biology: X*. Default choice for fiducial-less cryo-ET, lamellae, and high-throughput pipelines where IMOD's manual fiduc...
- **IMOD (etomo)** *[classical]* — Kremer 1996, *Journal of Structural Biology*. Workhorse fiducial-based tilt-series alignment and tomogram reconstruction; the default when high-quality f...

### tomogram-reconstruction (2 tools)

- **novaCTF** *[classical]* — Turonova 2017, *Journal of Structural Biology*. When a CTF-corrected tomogram is needed for STA or visualization beyond ~20 Angstrom resolution; standard p...
- **Warp** *[hybrid]* — Tegunov 2019, *Nature Methods*. Single-package solution for SPA and cryo-ET preprocessing through reconstruction; pair with M for STA at to...

### structure prediction prior for map interpretation (1 tool)

- **AlphaFold 3** *[ML]* — Abramson 2024, *Nature*. Generating starting models for cryo-EM map interpretation, ligand placement, multi-chain assemblies; a foun...

### data-driven regularization in refinement (1 tool)

- **Blush regularization (RELION 5)** *[ML]* — Kimanius 2024, *Nature Methods*. Small (<200 kDa) particles, low-SNR datasets, in-cell SPA from lamellae; routine in RELION-5 refinement runs.

### differentiable atomic model fitting (1 tool)

- **DiffFit** *[ML]* — Luo 2025, *IEEE Transactions on Visualization and Computer Graphics (IEEE VIS 2024)*. Composite model building of large mesoscale assemblies; alternative to ChimeraX's classical fitmap for mult...

### map sharpening / local-quality-aware deep learning (1 tool)

- **EMReady 2** *[ML]* — He, J. 2025, *bioRxiv (preprint)*. When EMReady, DeepEMhancer or LocScale plateau, especially for nucleic-acid containing maps and intermediat...

### heterogeneity (real-space) (1 tool)

- **HetSIREN** *[ML]* — Herreros 2025, *Nature Communications*. Real-space heterogeneity preserving high-frequency features; useful when Fourier-domain encoders smooth out...

### heterogeneity from subtomograms (1 tool)

- **tomoDRGN** *[ML]* — Powell 2024, *Nature Methods*. Continuous and compositional heterogeneity analysis specifically for cryo-ET subtomograms; complements cryo...


## 5. Cross-stage infrastructure

## Notes and caveats

- Citations were verified by the researcher pass and reviewed by experts. Items where verification was not possible are flagged in the `verification_notes` field of each JSON entry. Notable examples include Gautomatch (widely used but no canonical paper), several vendor-only tools (Smart EPU, Latitude S, Tomo 5), and a handful of 2025 preprints that may have peer-reviewed versions by chapter publication.
- Some tools span multiple pipeline stages (e.g., Warp / M operate from raw movies through reconstruction). Each such tool is recorded in its canonical stage with a `canonical_stage` marker in the others; cross-references are preserved.
- ML vs. classical assignment reflects the dominant computational approach. Some tools blend both (e.g., RELION 5 with Blush regularisation, AreTomoLive with built-in denoising). These carry `type: hybrid`.
- The catalog excludes purely visualisation tools (ChimeraX standalone, IMOD's 3dmod viewer in isolation) unless they participate in analysis (model building, validation). Visualisation-only entries appear where they are downstream of analysis tools.
- Foundation models adapted to EM (SAM, MicroSAM, Cellpose-SAM, CryoSAM, CryoFM, DINOv2 backbones) appear in segmentation when they are used directly for that task; cross-cutting infrastructure (CZII CryoET Data Portal, BioImage Model Zoo, ZeroCostDL4Mic) is in the cross-stage bucket.

## How to use this catalog when writing the chapter

1. **For the stage walk-throughs**, work from the per-stage JSON. Group by subtask, lead with the problem (why the step is hard), then introduce the tools by approach (classical vs. ML, supervised vs. self-supervised, etc.) rather than alphabetically.
2. **For Figure 1** (pipeline + time costs + AI/ML components), the `stage` × `type` distribution gives you the relative ML penetration per stage: segmentation is the most ML-dominated, acquisition the least.
3. **For Figure 3** (landscape radar / heatmap), the modality × stage matrix has obvious gaps — CLEM and integrated workflows are sparsely populated relative to SPA/cryo-ET. That's both a finding and a candidate visual.
4. **For the outlook**, the unresolved verification items, the cross-stage infrastructure entries (CZII data portal, BioImage Model Zoo), and the diffusion / foundation-model frontier are the natural seeds.

## Source materials

Research artefacts preserved in `<outputs>/kb-research/`:

- `plan-em.json` / `plan-em.md` — EM expert's search plan
- `plan-aiml.json` / `plan-aiml.md` — AI/ML expert's complementary plan
- `stage-*.json` / `stage-*.md` — raw researcher output before consolidation
- `gaps.json` / `gaps.md` — combined expert review (62 gaps identified)
- `gap-fill.json` / `gap-fill.md` — gap-fill researcher's additions and corrections