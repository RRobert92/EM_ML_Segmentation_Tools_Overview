#!/usr/bin/env python3
"""Validate data/tools.json structure. Exit non-zero on any problem.
Run locally or in CI:  python3 scripts/validate_tools.py"""
import json, sys, pathlib

DATA = pathlib.Path(__file__).resolve().parent.parent / "data" / "tools.json"

REQUIRED = ["name", "categories", "tasks", "modalities", "type", "approach",
            "when_to_use", "limitations", "citation", "availability"]
# `repo` is required except for closed/commercial vendor tools that have none.
ALLOWED_TYPE = {"ml", "classical", "hybrid", "infrastructure"}
ALLOWED_AVAIL = {"Open", "Vendor", "Commercial", "Academic-only"}
ALLOWED_MODS = {"spa", "cryo-et", "sta", "fib-sem", "sbem", "sertem", "vem", "sem",
                "array-tomo", "clem", "cryo-clem", "ilm", "lm", "em", "all microscopy"}
ALLOWED_CATS = {"Particle picking", "Cryo-ET segmentation", "Volume EM segmentation",
                "CLEM registration", "Preprocessing", "Post-processing", "General-purpose",
                "Training data & infrastructure"}

def main():
    doc = json.loads(DATA.read_text(encoding="utf-8"))
    tools = doc.get("tools", [])
    errors = []

    if doc.get("tool_count") != len(tools):
        errors.append(f"tool_count ({doc.get('tool_count')}) != number of tools ({len(tools)})")

    seen = {}
    for i, t in enumerate(tools):
        nm = t.get("name", f"<index {i}>")
        for k in REQUIRED:
            if not t.get(k):
                errors.append(f"{nm}: missing required field '{k}'")
        if nm.lower() in seen:
            errors.append(f"duplicate tool name: '{nm}'")
        seen[nm.lower()] = True

        if isinstance(t.get("categories"), list):
            for c in t["categories"]:
                if c not in ALLOWED_CATS:
                    errors.append(f"{nm}: unknown category '{c}'")
            if t.get("category") and t["categories"] and t["category"] != t["categories"][0]:
                errors.append(f"{nm}: category '{t['category']}' != categories[0] '{t['categories'][0]}'")
        else:
            errors.append(f"{nm}: 'categories' must be a non-empty list")

        if not (isinstance(t.get("tasks"), list) and t["tasks"]):
            errors.append(f"{nm}: 'tasks' must be a non-empty list")

        if not t.get("repo") and t.get("availability") != "Vendor":
            errors.append(f"{nm}: missing 'repo' (required for non-vendor tools)")

        if t.get("type") not in ALLOWED_TYPE:
            errors.append(f"{nm}: invalid type '{t.get('type')}'")
        if t.get("availability") not in ALLOWED_AVAIL:
            errors.append(f"{nm}: invalid availability '{t.get('availability')}'")
        for m in t.get("modalities", []):
            if m not in ALLOWED_MODS:
                errors.append(f"{nm}: unknown modality '{m}'")

    if errors:
        print(f"✗ validation FAILED with {len(errors)} problem(s):")
        for e in errors[:50]:
            print("  - " + e)
        sys.exit(1)
    print(f"✓ tools.json valid: {len(tools)} tools, all required fields present, no duplicates.")

if __name__ == "__main__":
    main()
