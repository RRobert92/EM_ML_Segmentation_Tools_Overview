#!/usr/bin/env python3
"""
Regenerate Figure 1 and Figure 3 for the chapter from the CURRENT catalog
(tools-catalog-site/data/tools.json). Re-run any time the catalog grows.

Figure 1 — tools by task x computational approach (stacked bar).
Figure 3 — tools by imaging modality x task (heatmap).

Scope: the whole catalog EXCEPT the "Training data & infrastructure" category
(datasets / model zoos / archives), i.e. denoising, missing-wedge, picking,
segmentation, general-purpose, CLEM registration and post-processing tools.

Method: each tool counted once, in its CANONICAL task column (first task listed).
Figure 3: a multi-modality tool is counted in every modality row it carries,
but still only in its one canonical task column.
"""
import json, collections, os
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

HERE = os.path.dirname(os.path.abspath(__file__))
tools = json.load(open(os.path.join(HERE, "tools-catalog-site", "data", "tools.json")))["tools"]

EXCLUDE_CATS = {"Training data & infrastructure"}      # datasets / archives / model zoos
def cat(t):  return t.get("category") or (t.get("categories") or [None])[0]
def tasks(t):
    a = t.get("tasks")
    if a: return a
    s = t.get("task") or ""
    return [x.strip() for x in s.split(",")] if s else []
seg = [t for t in tools if cat(t) not in EXCLUDE_CATS]

# canonical task (first listed) -> display column, in left-to-right pipeline order
COLS = ["Denoising", "Missing-wedge", "SPA picking", "Cryo-ET picking",
        "Membrane", "Filament", "Organelle", "Connectomics",
        "General", "CLEM registration", "Post-processing"]
def col(t):
    j = (tasks(t)[0] if tasks(t) else "").lower()
    if "denois" in j: return "Denoising"
    if "missing-wedge" in j or "missing wedge" in j: return "Missing-wedge"
    if "post-processing" in j or "sharpening" in j: return "Post-processing"
    if "spa particle picking" in j: return "SPA picking"
    if "cryo-et particle" in j or "localization" in j: return "Cryo-ET picking"
    if "foundation" in j or "general segmentation" in j or "commercial platform" in j: return "General"
    if "connectomics" in j or "neuron" in j: return "Connectomics"
    if "clem" in j: return "CLEM registration"
    if "membrane" in j: return "Membrane"
    if "organelle" in j: return "Organelle"
    if "filament" in j: return "Filament"
    return None

C_CLASSICAL, C_ML, C_HYBRID = "#aec6d8", "#1f5f7e", "#9ec86a"
plt.rcParams.update({"font.size": 12, "font.family": "DejaVu Sans", "axes.edgecolor": "#888"})

# ============================ FIGURE 1 ============================
f1 = collections.defaultdict(collections.Counter)
unmapped = []
for t in seg:
    c = col(t)
    if c: f1[c][t.get("type")] += 1
    else: unmapped.append((t["name"], tasks(t)))
classical = [f1[c]["classical"] for c in COLS]
ml        = [f1[c]["ml"]        for c in COLS]
hybrid    = [f1[c]["hybrid"]    for c in COLS]
totals    = [classical[i]+ml[i]+hybrid[i] for i in range(len(COLS))]

fig, ax = plt.subplots(figsize=(13, 5.6))
x = np.arange(len(COLS))
ax.bar(x, classical, 0.62, label="Classical", color=C_CLASSICAL)
ax.bar(x, ml, 0.62, bottom=classical, label="ML", color=C_ML)
ax.bar(x, hybrid, 0.62, bottom=[classical[i]+ml[i] for i in range(len(COLS))], label="Hybrid", color=C_HYBRID)
for i, tot in enumerate(totals):
    if tot: ax.text(i, tot+0.25, str(tot), ha="center", va="bottom", fontsize=11.5, fontweight="bold", color="#333")
ax.set_xticks(x); ax.set_xticklabels(COLS, rotation=28, ha="right")
ax.set_ylabel("Number of tools"); ax.set_xlabel("Pipeline task")
# ax.set_title("Figure 1 — Distribution of tools across EM image-analysis tasks and computational approaches", fontsize=13, pad=12)
ax.set_ylim(0, max(totals)+2); ax.legend(frameon=False, loc="upper right")
ax.yaxis.grid(True, linestyle="--", alpha=0.45); ax.set_axisbelow(True)
for s in ("top", "right"): ax.spines[s].set_visible(False)
fig.tight_layout()
fig.savefig(os.path.join(HERE, "figure-1-tools-by-task-and-approach.png"), dpi=180); plt.close(fig)

# ============================ FIGURE 3 ============================
ROWS = [("spa","SPA"),("cryo-et","cryo-ET"),("fib-sem","FIB-SEM"),("sbem","SBEM"),
        ("sertem","serTEM"),("vem","vEM"),("clem","CLEM"),("cryo-clem","cryo-CLEM")]
M = np.zeros((len(ROWS), len(COLS)), dtype=int)
for t in seg:
    c = col(t)
    if not c: continue
    ci = COLS.index(c)
    for m in (t.get("modalities") or []):
        for ri,(key,_) in enumerate(ROWS):
            if m == key: M[ri, ci] += 1

fig, ax = plt.subplots(figsize=(13, 6.2))
im = ax.imshow(M, cmap="magma", aspect="auto", vmin=0)
ax.set_xticks(np.arange(len(COLS))); ax.set_xticklabels(COLS, rotation=28, ha="right")
ax.set_yticks(np.arange(len(ROWS))); ax.set_yticklabels([d for _,d in ROWS])
ax.set_xlabel("Pipeline task"); ax.set_ylabel("Modality")
# ax.set_title("Figure 3 — Tools by imaging modality and task", fontsize=13, pad=12)
vmax = M.max() or 1
for i in range(len(ROWS)):
    for j in range(len(COLS)):
        v = M[i, j]
        if v: ax.text(j, i, str(v), ha="center", va="center", fontsize=10.5, fontweight="bold",
                      color=("black" if v/vmax > 0.6 else "white"))
ax.set_xticks(np.arange(-.5, len(COLS), 1), minor=True)
ax.set_yticks(np.arange(-.5, len(ROWS), 1), minor=True)
ax.grid(which="minor", color="#cccccc", linewidth=0.7); ax.tick_params(which="minor", length=0)
cb = fig.colorbar(im, ax=ax, fraction=0.046, pad=0.02); cb.set_label("Tool count")
fig.tight_layout()
fig.savefig(os.path.join(HERE, "figure-3-modality-task-heatmap.png"), dpi=180); plt.close(fig)

print("Scope tools:", len(seg), "| Fig1 sum:", sum(totals))
print("Fig1 by column:", dict(zip(COLS, totals)))
print("Type totals:", {"classical":sum(classical),"ml":sum(ml),"hybrid":sum(hybrid)})
print("UNMAPPED (in scope, no column):", unmapped if unmapped else "none")
