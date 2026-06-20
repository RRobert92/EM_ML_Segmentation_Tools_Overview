#!/usr/bin/env python3
"""
One-time data migration: add multi-valued `categories` and `tasks` to every tool
so multi-domain tools (e.g. TARDIS) are discoverable under every category/task
they actually serve, and so a Task filter can be built from a controlled vocabulary.

Keeps the singular `category` / `task` fields (used for table display and
back-compat); `category` becomes the primary (categories[0]) and `task` becomes a
human-readable join of `tasks`.

Run from the tools-catalog-site directory:
    python3 scripts/retag_tools.py
"""
import json, datetime, sys, pathlib

DATA = pathlib.Path("data/tools.json")

# --- controlled task vocabulary: existing free-text task string -> [controlled tasks] ---
TASK_MAP = {
    "SPA picking":                        ["SPA particle picking"],
    "Cryo-ET picking":                    ["Cryo-ET particle localization"],
    "Foundation architectures":           ["Foundation / general segmentation"],
    "Denoising":                          ["Denoising"],
    "Pretraining datasets":               ["Datasets & infrastructure"],
    "Connectomics":                       ["Connectomics / neuron tracing"],
    "Acquisition-time correlation":       ["CLEM correlation"],
    "Organelles":                         ["Organelle segmentation"],
    "Membrane":                           ["Membrane segmentation"],
    "Commercial platforms":               ["Commercial platform"],
    "Missing-wedge correction":           ["Missing-wedge correction"],
    "Landmark / deformable":              ["CLEM registration"],
    "Filaments, vesicles, features":      ["Filament segmentation", "Membrane segmentation"],
    "Deep-learning / segmentation-driven":["CLEM registration"],
}

# --- per-tool task overrides (judgment cases) ---
TASK_OVERRIDES = {
    "TARDIS-EM":  ["Filament segmentation", "Membrane segmentation"],
    "CryoVesNet": ["Membrane segmentation", "Organelle segmentation"],
    "CLEM-Reg":   ["CLEM registration", "Membrane segmentation"],
}

# --- per-tool category additions (tools that genuinely span stages) ---
CATEGORY_OVERRIDES = {
    # TARDIS does filament/membrane segmentation in BOTH cellular cryo-ET and
    # 2D/volume EM (its own modalities list cryo-et, em, ssTEM, vEM, LM).
    "TARDIS-EM": ["Cryo-ET segmentation", "Volume EM segmentation"],
}

# --- modality corrections (chapter review comment #60) ---
MODALITY_FIXES = {
    # Mutex Watershed is a vEM/connectomics graph-partitioning method; cryo-ET
    # was an over-broad tag. Drop it.
    "Mutex Watershed": ["fib-sem", "sbem", "sstem"],
}

def main():
    doc = json.loads(DATA.read_text(encoding="utf-8"))
    changed = []
    for t in doc["tools"]:
        name = t["name"]
        before = (t.get("category"), t.get("task"), tuple(t.get("modalities", [])))

        # modality fix
        if name in MODALITY_FIXES:
            t["modalities"] = MODALITY_FIXES[name]

        # tasks
        if name in TASK_OVERRIDES:
            tasks = TASK_OVERRIDES[name]
        else:
            tasks = TASK_MAP.get(t.get("task"), [t.get("task")] if t.get("task") else [])
        # categories
        cats = CATEGORY_OVERRIDES.get(name, [t.get("category")] if t.get("category") else [])

        # rebuild dict with categories/tasks placed right after category/task
        new = {}
        for k, v in t.items():
            new[k] = v
            if k == "category":
                new["categories"] = cats
            if k == "task":
                new["tasks"] = tasks
        # keep singular fields coherent for display/back-compat
        new["category"] = cats[0] if cats else new.get("category", "")
        new["task"] = ", ".join(tasks)
        t.clear(); t.update(new)

        after = (t.get("category"), t.get("task"), tuple(t.get("modalities", [])))
        if len(cats) > 1 or len(tasks) > 1 or before != after:
            changed.append((name, cats, tasks, list(t.get("modalities", []))))

    doc["version"] = "1.1.0"
    doc["generated"] = datetime.date.today().isoformat()
    DATA.write_text(json.dumps(doc, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    print(f"Re-tagged {len(doc['tools'])} tools. {len(changed)} had multi-value or corrected fields:\n")
    for name, cats, tasks, mods in changed:
        flag = "  <-- multi" if (len(cats) > 1 or len(tasks) > 1) else ""
        print(f"  {name:24} cats={cats} tasks={tasks}{flag}")

    # controlled vocab summary
    all_tasks = {}
    for t in doc["tools"]:
        for tk in t["tasks"]:
            all_tasks[tk] = all_tasks.get(tk, 0) + 1
    print("\nControlled task vocabulary (count):")
    for k, n in sorted(all_tasks.items(), key=lambda x: -x[1]):
        print(f"  {n:2d}  {k}")

if __name__ == "__main__":
    main()
