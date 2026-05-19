# Contributing to the EM Segmentation Tools Catalog

Thank you for considering a contribution. This catalog is community-maintained and benefits from corrections, additions, and updates.

## What contributions we accept

- **New tools** that fit the catalog's scope: AI/ML or classical tools for segmentation (broadly construed: picking, dense segmentation, registration, denoising as preprocessing, training infrastructure) across single-particle cryo-EM, cryo-ET, volume EM, and CLEM.
- **Corrections** to existing entries: wrong author, wrong year, wrong venue, broken DOI, outdated when-to-use guidance.
- **Annotations**: limitations the original entry missed, new use cases, deprecation notes.
- **Schema improvements**: new fields that would help downstream consumers (with discussion in an issue first).

## What we do not accept

- Tools without an associated peer-reviewed publication, preprint, or canonical software release. (Tools with no documentation are not useful in a tools catalog.)
- Promotional submissions. Each entry should describe the tool factually, including its limitations.
- Tools that have been abandoned for more than three years with no successor, unless they remain in active use.

## How to add a tool

1. **Fork the repository** and create a branch.
2. **Edit `data/tools.json`**. Add a new object to the `tools` array. Follow the schema below.
3. **Validate locally** by opening `index.html` in a browser and confirming your tool appears.
4. **Open a pull request** describing:
   - The tool's primary task.
   - Why it belongs in the catalog (one or two sentences).
   - The primary citation (DOI preferred).

A reviewer will respond within two weeks. For tools you authored or co-authored, please disclose this in the PR.

## Schema for a tool entry

Each tool is an object in `data/tools.json` under the `tools` array. Required fields are marked with `*`.

```json
{
  "name": "ToolName *",
  "raw_name": "ToolName (full / canonical name)",
  "aliases": ["AliasOne", "AliasTwo"],
  "category": "Particle picking | Cryo-ET segmentation | Volume EM segmentation | General-purpose | CLEM registration | Preprocessing | Training data & infrastructure *",
  "task": "Free-text subtask label *",
  "modalities": ["spa", "cryo-et", "fib-sem", "sbem", "sstem", "vem", "clem", "cryo-clem", "cryo-fib", "array-tomo", "sem", "ilm", "lm", "sta"],
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
- **category and task**: the existing categories are the chapter's top-level grouping. If your tool doesn't fit, propose a new category in your PR.
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
