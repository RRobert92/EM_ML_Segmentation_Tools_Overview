# EM Segmentation Tools — Open Catalog

An open, community-maintained catalog of AI/ML and classical tools for **segmentation across electron microscopy**: single-particle analysis (SPA), cryo-electron tomography (cryo-ET), volume EM (FIB-SEM, SBEM, serTEM, array tomography), and correlative light–electron microscopy (CLEM).

**Live site:** [https://USERNAME.github.io/em-segmentation-tools/](https://USERNAME.github.io/em-segmentation-tools/) *(update with your GitHub user/org once published)*

**Companion to:** Kiewisz, R. (2026). *Segmentation in Electron Microscopy: A Tools Overview*. In *Correlative Light and Electron Microscopy VI*, Methods in Cell Biology. Elsevier.

---

## What this is

A searchable catalog of 84 actively maintained tools (and growing), each annotated with the segmentation task it addresses, the imaging modalities it supports, its computational approach (ML / classical / hybrid), when it is the appropriate choice, its availability, and its primary citation.

The catalog is intended as:

1. **A first-stop reference for working scientists** — search or filter for the task you need, get a shortlist of tools and one-line guidance for each.
2. **An open community resource** — anyone can submit a new tool or correct an existing entry via a structured web form (no git required) or a pull request.
3. **A data substrate** — the underlying `tools.json` is structured and CC-BY-4.0 licensed, free to use for surveys, training-data preparation, benchmark assembly, or downstream tooling.

## How to use

### As a working scientist

Open the live site, filter by category (e.g., "Cryo-ET segmentation → Membrane") or search by keyword. Click any row for full details — citation, repository link, training paradigm, limitations.

### As a data consumer

The catalog is in `data/tools.json`. Each entry has the schema described in [CONTRIBUTING.md](CONTRIBUTING.md). The file is regenerated from per-stage source JSONs in the [parent knowledge-base directory](../knowledge-base/).

```bash
# Example: list all open-source ML tools for cryo-ET segmentation
# (categories/tasks are arrays — use `index` so multi-domain tools are included)
jq '.tools[] | select((.categories | index("Cryo-ET segmentation")) and .type == "ml" and .availability == "Open") | .name' data/tools.json
```

### As a contributor

See [CONTRIBUTING.md](CONTRIBUTING.md). Easiest path: click **➕ Add a new tool** on the site (or use the [issue forms](https://github.com/RRobert92/EM_ML_Segmentation_Tools_Overview/issues/new/choose)) — fill in the fields and a maintainer's approval auto-generates the PR. Git users can still edit `data/tools.json` and open a PR directly.

## Repository layout

The site lives inside a subdirectory of the wider book-chapter repository. The GitHub Actions workflows are at the *repository root* and target the site subdirectory; everything below this point is relative to the repository root:

```
em-segmentation-tools/                  ← repository root
├── .github/workflows/
│   ├── deploy.yml                      # Deploys tools-catalog-site/ to GitHub Pages
│   └── validate.yml                    # Validates JSON/JS/HTML on every PR
├── tools-catalog-site/                 ← THIS DIRECTORY (the deployed site)
│   ├── index.html
│   ├── assets/
│   │   ├── style.css
│   │   └── script.js
│   ├── data/
│   │   └── tools.json                  # Single consolidated catalog (CC-BY-4.0)
│   ├── CONTRIBUTING.md                 # How to submit new tools or corrections
│   ├── CHANGELOG.md                    # Release notes
│   ├── LICENSE                         # MIT for code, CC-BY-4.0 for data
│   ├── serve-locally.sh                # Preview script (./serve-locally.sh)
│   └── README.md                       # This file
└── (chapter materials and other repo content)
```

If you ever want the site as a standalone repository, copy the contents of `tools-catalog-site/` to a new repo root and move the workflows from `../.github/workflows/` into `./.github/workflows/`, removing the `tools-catalog-site/` prefix in the workflow file paths.

## Deployment

The site is deployed via GitHub Actions (`.github/workflows/deploy.yml`, at the repository root). On every push to `main` that touches `tools-catalog-site/` (or the deploy workflow itself), the workflow:

1. Validates `tools-catalog-site/data/tools.json` (declared `tool_count` matches the array length; fail-fast if broken).
2. Packages the `tools-catalog-site/` subdirectory as a Pages artifact — chapter drafts, knowledge-base sources, and figures elsewhere in the repo are not part of the published site.
3. Deploys to GitHub Pages via the official `actions/deploy-pages` action.

To enable the workflow on a fresh repository:

- **Settings → Pages → Source: GitHub Actions** (not "Deploy from a branch").
- Push to `main` (or trigger manually from the **Actions** tab → *Deploy to GitHub Pages* → *Run workflow*).
- The first successful run gives you the live URL (also shown in the *Environments* sidebar as `github-pages`).

A second workflow (`.github/workflows/validate.yml`) runs on every PR that touches `tools-catalog-site/data/tools.json`, the site code, or the workflows themselves. It checks the JSON schema (required fields per tool, no duplicate names, allowed values for `type` and `availability`), parses the JS, and parses the HTML. PRs that fail validation are blocked until the contributor fixes them, which keeps the catalog clean without requiring manual review of every typo.

## How the catalog was assembled

The catalog began as the bibliographic substrate for the companion book chapter. Tools were identified through a structured literature scan of the cryo-EM and vEM segmentation literature (2018–2026), augmented by community recommendations and verified citations. Per-tool annotations were drafted using a combination of source-paper reading and practitioner consultation.

Editorial bias: tool selection skews toward (a) open-source academic tools, (b) tools with peer-reviewed citations, and (c) tools that are actively maintained. Commercial and vendor tools are included when they are widely used, but the catalog does not aim to be exhaustive across paid software.

## Versioning

The catalog uses semantic versioning (MAJOR.MINOR.PATCH):

- **MAJOR**: schema changes that break existing consumers
- **MINOR**: new tools added; new fields added without breaking existing ones
- **PATCH**: corrections, citation refreshes, link updates

Current version: **1.0.0** (2026-05-19).

## Citing this resource

If you use this catalog in published work, please cite both the chapter and the resource:

```
Kiewisz, R. (2026). Segmentation in Electron Microscopy: A Tools Overview.
In Correlative Light and Electron Microscopy VI, Methods in Cell Biology. Elsevier.

EM Segmentation Tools Open Catalog (2026). v1.0.0.
https://USERNAME.github.io/em-segmentation-tools/
```

## License

- **Code** (HTML, CSS, JavaScript): [MIT](LICENSE)
- **Data** (the contents of `data/tools.json`): [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/)

Attribution to the catalog and the companion chapter is requested for both.

## Contact

Issues and pull requests welcome on GitHub. For substantive corrections or additions of tools you authored, please reference the relevant publication in your PR description.
