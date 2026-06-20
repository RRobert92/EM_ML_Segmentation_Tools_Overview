# Contributing to the EM Segmentation Tools Catalog

Thank you for considering a contribution. This catalog is community-maintained and benefits from corrections, additions, and updates.

## Catalog scope

This catalog covers tools whose primary function is one of the following:

- **Picking** (locating macromolecules in 2D micrographs or 3D tomograms)
- **Segmentation** (membranes, organelles, cells, filaments, vesicles, neurons, synapses)
- **CLEM registration** (aligning LM features to EM features)
- **Preprocessing immediately adjacent to segmentation** (denoising, missing-wedge correction)
- **Training data, model zoos, and shared infrastructure** that enable the above

**Out of scope:** tools whose primary function is tilt-series alignment, tomographic reconstruction, motion correction, CTF estimation, refinement, or model building. The exceptions are tools that bundle one of these functions with a picker or segmenter (Warp is in scope because of BoxNet; IMOD/eTomo and AreTomo are out of scope because they are tilt-series alignment tools without an ML picking/segmentation component).

If you think a tool should be in scope and isn't, open an issue rather than a PR — we'll discuss case by case.

## What contributions we accept

- **New tools** that fit the scope above.
- **Corrections** to existing entries: wrong author, wrong year, wrong venue, broken DOI, outdated when-to-use guidance.
- **Annotations**: limitations the original entry missed, new use cases, deprecation notes.
- **Schema improvements**: new fields that would help downstream consumers (with discussion in an issue first).

## What we do not accept

- Tools without an associated peer-reviewed publication, preprint, or canonical software release. (Tools with no documentation are not useful in a tools catalog.)
- Promotional submissions. Each entry should describe the tool factually, including its limitations.
- Tools that have been abandoned for more than three years with no successor, unless they remain in active use.

## How to add a tool

### Option A — the form (recommended, no git required)

1. On the website, click **➕ Add a new tool** (or open the [New tool form](https://github.com/RRobert92/EM_ML_Segmentation_Tools_Overview/issues/new?template=new-tool.yml)).
2. Fill in the structured fields — category, task(s), modalities, approach, citation, etc. A free GitHub account is the only requirement.
3. Submit. A maintainer reviews it; once approved, the entry is added to `data/tools.json` **automatically** via a pull request (see *Maintainer workflow* below). You don't touch any code.

To fix an existing entry, use **✏️ Suggest a correction** ([Correction form](https://github.com/RRobert92/EM_ML_Segmentation_Tools_Overview/issues/new?template=edit-tool.yml)).

### Option B — pull request (for git users)

1. **Fork the repository** and create a branch.
2. **Edit `data/tools.json`**. Add a new object to the `tools` array. Follow the schema below.
3. **Validate locally**: `node scripts/test-search.js` and open `index.html` to confirm your tool appears.
4. **Open a pull request** describing the tool's primary task, why it belongs, and the primary citation (DOI preferred).

A reviewer will respond within two weeks. For tools you authored or co-authored, please disclose this (the form has a checkbox; in a PR, say so in the description).

### Maintainer workflow

Submissions arrive as issues labelled `tool-submission`. A maintainer verifies the citation and tags, then adds the **`approved`** label. For new-tool issues this triggers `.github/workflows/tool-submission.yml`, which converts the issue into a catalog entry (`scripts/issue_to_tool.py`), runs the tests, and opens a PR. Nothing reaches the live site until a human merges that PR.

## Schema for a tool entry

Each tool is an object in `data/tools.json` under the `tools` array. Required fields are marked with `*`.

```json
{
  "name": "ToolName *",
  "raw_name": "ToolName (full / canonical name)",
  "aliases": ["AliasOne", "AliasTwo"],
  "categories": ["Particle picking | Cryo-ET segmentation | Volume EM segmentation | General-purpose | CLEM registration | Preprocessing | Training data & infrastructure *"],
  "tasks": ["SPA particle picking | Cryo-ET particle localization | Membrane segmentation | Filament segmentation | Organelle segmentation | Connectomics / neuron tracing | Foundation / general segmentation | Denoising | Missing-wedge correction | CLEM correlation | CLEM registration | Datasets & infrastructure | Commercial platform *"],
  "category": "(auto-derived: categories[0])",
  "task": "(auto-derived: tasks joined)",
  "modalities": ["spa", "cryo-et", "sta", "fib-sem", "sbem", "sstem", "vem", "sem", "array-tomo", "clem", "cryo-clem", "ilm", "lm", "em", "all microscopy"],
  "type": "ml | classical | hybrid | infrastructure *",
  "approach": "Two- to three-sentence description of the algorithm",
  "architecture": "Network architecture or algorithmic kernel",
  "training_paradigm": "supervised | self-supervised | semi-supervised | unsupervised | none",
  "training_data": "What was the model trained on?",
  "when_to_use": "One- to two-sentence guidance for the reader *",
  "limitations": "Honest assessment of where the tool fails or underperforms",
  "compute": "GPU / CPU / cluster requirements",
  "citation": {
    "first_author": "Surname, Firstname *",
    "year": 2024,
    "venue": "Journal name *",
    "doi": "10.xxxx/yyyy",
    "url": "https://..."
  },
  "repo": "https://github.com/...",
  "availability": "Open | Vendor | Commercial *",
  "source_type": "peer-reviewed | preprint | peer-reviewed-conference | vendor | open-source | docs-only",
  "pretrained_weights": "yes | no",
  "verification_notes": "Optional: notes on what was cross-checked when this entry was created or updated."
}
```

### Field guidance

- **name**: the short, common name the community uses. Used for sorting and display.
- **categories and tasks**: both are arrays and both are multi-valued — list *every* category and task a tool genuinely serves. A tool that segments filaments and membranes in both cryo-ET and volume EM (e.g. TARDIS) should carry both categories and both task tags, so it surfaces under each filter. The singular `category`/`task` fields are auto-derived for display and back-compat; you don't need to set them by hand. If your tool needs a category or task not in the controlled lists, propose it in your submission.
- **modalities**: use the lowercase canonical tags from the list above. If a tool supports several, list all.
- **type**: `ml` for any tool whose primary inference uses a learned model; `classical` for hand-engineered algorithms; `hybrid` for tools that combine both; `infrastructure` for datasets, model zoos, and training platforms.
- **when_to_use**: this is the most important field. Avoid promotional language. Write what a practitioner needs to know to decide whether to reach for this tool.
- **limitations**: be specific. "Less accurate than X on Y data" is more useful than "may have limitations".
- **citation**: prefer the peer-reviewed paper. If only a preprint exists, set `source_type: "preprint"` so consumers can filter.

## Style for `when_to_use` and `limitations`

The `when_to_use` field is what populates the table preview. Keep it under ~150 characters where possible. Style guidance:

- **Good**: "First-line picker for routine SPA on commodity GPUs; general pretrained model means no per-dataset training in most cases."
- **Less good**: "A revolutionary new approach to SPA particle picking that achieves state-of-the-art performance." (Promotional, uninformative.)
- **Good for limitations**: "Lower accuracy than DeepFinder on sparse-target tomograms; reduced labelling burden does not fully compensate at scale."
- **Less good for limitations**: "Some limitations apply." (Empty.)

## Updating an existing entry

For citation refreshes (preprints that have published), broken links, or wording corrections: open a PR with a clear title (e.g., "Refresh MemBrain-seg citation to Nat Methods 2026 version") and a one-line description.

## Version bumps

After a PR is merged, the catalog version is bumped:

- **PATCH**: corrections or single-tool additions.
- **MINOR**: batches of tools added, or a new field introduced.
- **MAJOR**: schema breaking changes.

Maintainers handle version bumps; contributors do not need to.

## Code of conduct

Be respectful. Disagreement about a tool's role is normal; framing it as a personal disagreement with the tool's authors is not. If a tool entry needs to flag a serious problem (security, scientific concern), please raise it as an issue with citations and let a maintainer respond before editing the catalog.

---

Thank you for contributing.
