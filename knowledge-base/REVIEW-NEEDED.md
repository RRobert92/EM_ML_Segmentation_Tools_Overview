# Items needing attention before publication

*Generated 2026-05-18 from the knowledge base.*

This document lists catalog entries that need a final review pass before the chapter goes to typesetting. None of these block writing — they're items where a small follow-up (re-check a citation, swap in a published version when one appears, decide how to handle vendor software in citations) is worth doing once the chapter draft is mostly stable.

## Preprints to refresh before publication

These tools were cited at preprint stage. Some may have peer-reviewed versions by the time the chapter is published — re-check each shortly before submission.

- **AreTomo3** — Peck, A. 2025, *bioRxiv (preprint)*. DOI: 10.1101/2025.03.11.642690
- **AreTomoLive** — Peck, A. 2025, *bioRxiv (preprint)*. DOI: 10.1101/2025.03.11.642690
- **DenoisET** — Peck, A. 2025, *bioRxiv (companion to AreTomoLive)*. DOI: n/a
- **Cellpose-SAM** — Pachitariu, M. 2025, *bioRxiv (preprint)*. DOI: 10.1101/2025.04.28.651001
- **MemBrain-seg** — Lamm, L. 2024, *bioRxiv (preprint)*. DOI: 10.1101/2024.01.05.574336
- **PyTorch Connectomics (PyTC)** — Lin, Z. 2021, *arXiv preprint arXiv:2112.05754*. DOI: n/a
- **TARDIS-EM** — Kiewisz, R. 2024, *bioRxiv (preprint, v2)*. DOI: 10.1101/2024.12.19.629196
- **EMReady 2** — He, J. 2025, *bioRxiv (preprint)*. DOI: 10.1101/2025.09.03.674102
- **BioImage Model Zoo** — Ouyang, W. 2022, *bioRxiv (preprint)*. DOI: 10.1101/2022.06.07.495102
- **CryoET Data Portal (CZII)** — Ermel, U. 2024, *bioRxiv (preprint)*. DOI: 10.1101/2024.11.04.621686

## Vendor tools (no peer-reviewed paper)

These are widely used but vendor-only software. Decide whether to cite via the vendor website, omit from the formal reference list, or note alongside their academic equivalents.

- **Arctis iFLM** — Integrated widefield FLM module inside the Thermo Fisher Arctis Cryo-PFIB chamber; provide
- **EPU / Smart EPU** — Thermo Fisher's commercial SPA acquisition suite; recent 'Smart EPU' versions add AI-assis
- **Latitude S** — Gatan's automated SPA acquisition software, tightly integrated with K3/K2 cameras and BioC
- **METEOR** — Integrated fluorescence light microscope retrofit inside a cryo-FIB/SEM chamber that allow
- **Tomo5** — Thermo Fisher's commercial cryo-ET acquisition software; supports multigrid sessions, beam
- **Smart EPU AI features (Thermo Fisher)** — Vendor-internal AI hole picking, ice-thickness classification, and on-the-fly CTF-based re
- **Amira** — Commercial GUI-driven platform for 3D/4D biological image analysis. Combines classical seg
- **Ariadne / 3dEMtrace** — Commercial / service-based ML segmentation of vEM datasets (neurons, glia, synapses, mitoc

## Cross-stage tools (marked canonical)

These appear in multiple stage catalogs. The non-canonical entries point to the canonical stage via the `canonical_stage` field.

- **cryoSPARC Live** — appears in `processing` (cross-listed from `acquisition`)
- **MicAssess** — appears in `processing` (cross-listed from `acquisition`)
- **Miffi** — appears in `processing` (cross-listed from `acquisition`)
- **Warp** — appears in `processing` (cross-listed from `acquisition`)
- **CASSPER** — appears in `segmentation` (cross-listed from `acquisition`)
- **SerialFIB** — appears in `segmentation` (cross-listed from `acquisition`)
- **SPACEtomo** — appears in `segmentation` (cross-listed from `acquisition`)
- **TomoSegMemTV** — appears in `segmentation` (cross-listed from `processing`)
- **AreTomo** — appears in `data_analysis` (cross-listed from `processing`)
- **DeepDeWedge** — appears in `data_analysis` (cross-listed from `processing`)
- **DeepEMhancer** — appears in `data_analysis` (cross-listed from `segmentation`)
- **IsoNet** — appears in `data_analysis` (cross-listed from `processing`)
- **novaCTF** — appears in `data_analysis` (cross-listed from `processing`)
- **Warp** — appears in `data_analysis` (cross-listed from `acquisition`)

---

## Suggested follow-up workflow

1. Six weeks before submission: rerun citation searches on each item in the *Preprints to refresh* list. Update `tools-all.json` and per-stage JSONs with peer-reviewed citations where available.
2. When writing the chapter: cite peer-reviewed entries; for vendor tools, either footnote them or cite the vendor docs URL. The catalog field `source_type` makes this easy to filter.