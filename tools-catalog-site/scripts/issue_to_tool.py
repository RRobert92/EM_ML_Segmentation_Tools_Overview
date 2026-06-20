#!/usr/bin/env python3
"""
Convert a GitHub Issue-Form submission (the "Add a new tool" template) into a
tools.json catalog entry.

Usage:
    # dry run: print the JSON entry parsed from an issue body
    python3 scripts/issue_to_tool.py --body issue_body.txt

    # apply: insert the entry into data/tools.json
    python3 scripts/issue_to_tool.py --body issue_body.txt --apply --issue 123

The issue body can also be supplied on stdin. Designed to be run by a GitHub
Action once a maintainer labels the issue `approved`, but is fully testable
offline.
"""
import argparse, json, re, sys, pathlib

DATA = pathlib.Path(__file__).resolve().parent.parent / "data" / "tools.json"

# Issue-form field LABEL -> internal key
LABEL_MAP = {
    "Tool name": "name",
    "Aliases / other names": "aliases",
    "Category (stage in the pipeline)": "categories",
    "Task(s)": "tasks",
    "Modalities": "modalities",
    "Approach": "type",
    "Approach (what it does, technically)": "approach",
    "Architecture (if ML)": "architecture",
    "Training paradigm": "training_paradigm",
    "Training data": "training_data",
    "When to use": "when_to_use",
    "Limitations / failure modes": "limitations",
    "Compute": "compute",
    "Repository / homepage URL": "repo",
    "Availability": "availability",
    "Source type": "source_type",
    "Citation — first author": "citation_first_author",
    "Citation — year": "citation_year",
    "Citation — venue": "citation_venue",
    "Citation — DOI": "citation_doi",
    "Citation — URL": "citation_url",
    "Author disclosure": "_disclosure",
}

MODALITY_CODE = {
    "SPA": "spa", "cryo-ET": "cryo-et", "STA": "sta", "FIB-SEM": "fib-sem",
    "SBEM": "sbem", "ssTEM": "sstem", "vEM": "vem", "SEM": "sem",
    "array tomography": "array-tomo", "CLEM": "clem", "cryo-CLEM": "cryo-clem",
    "iFLM": "ilm", "LM": "lm", "EM (general)": "em", "all microscopy": "all microscopy",
}

MULTI = {"aliases", "categories", "tasks", "modalities"}
NO_RESPONSE = {"_no response_", "_none_", "n/a", ""}


def parse_issue_body(text):
    """Split a GitHub issue-form body (### Label\\n\\nvalue) into {key: value}."""
    sections = re.split(r"(?m)^###[ \t]+", text)
    fields = {}
    for sec in sections:
        if not sec.strip():
            continue
        line, _, rest = sec.partition("\n")
        label = line.strip()
        key = LABEL_MAP.get(label)
        if not key:
            continue
        value = rest.strip()
        if value.strip().lower() in NO_RESPONSE:
            value = ""
        if key in MULTI:
            fields[key] = [v.strip() for v in value.split(",") if v.strip()] if value else []
        else:
            fields[key] = value
    return fields


def build_entry(f, issue_number=None):
    missing = [k for k in ("name", "categories", "tasks", "modalities", "type",
                           "approach", "when_to_use", "limitations", "repo",
                           "citation_first_author", "citation_year") if not f.get(k)]
    if missing:
        raise ValueError("Missing required field(s): " + ", ".join(missing))

    name = f["name"].strip()
    cats = f["categories"]
    tasks = f["tasks"]
    mods = [MODALITY_CODE.get(m, m.lower()) for m in f["modalities"]]
    first_author = f["citation_first_author"].strip()
    surname = re.split(r"[ ,]", first_author, 1)[0].strip()
    year = str(f["citation_year"]).strip()
    paradigm = (f.get("training_paradigm") or "").strip()
    pretrained = "yes" if paradigm in ("foundation / pretrained",) else ""

    note = "Submitted via community issue"
    if issue_number:
        note += f" #{issue_number}"
    note += "; pending maintainer verification of citation and tags."

    return {
        "name": name,
        "raw_name": name,
        "aliases": f.get("aliases", []),
        "category": cats[0],
        "categories": cats,
        "task": ", ".join(tasks),
        "tasks": tasks,
        "modalities": mods,
        "type": f["type"].strip(),
        "approach": f.get("approach", "").strip(),
        "architecture": f.get("architecture", "").strip(),
        "training_paradigm": paradigm,
        "training_data": f.get("training_data", "").strip(),
        "when_to_use": f.get("when_to_use", "").strip(),
        "limitations": f.get("limitations", "").strip(),
        "compute": f.get("compute", "").strip(),
        "citation": {
            "first_author": first_author,
            "surname": surname,
            "year": year,
            "venue": f.get("citation_venue", "").strip(),
            "doi": f.get("citation_doi", "").strip(),
            "url": f.get("citation_url", "").strip(),
            "short": f"{surname} {year}".strip(),
        },
        "repo": f.get("repo", "").strip(),
        "availability": f.get("availability", "").strip() or "Open",
        "source_type": f.get("source_type", "").strip() or "software-only",
        "pretrained_weights": pretrained,
        "verification_notes": note,
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--body", help="path to a file with the issue body (default: stdin)")
    ap.add_argument("--apply", action="store_true", help="insert into data/tools.json")
    ap.add_argument("--issue", help="issue number (for the verification note)")
    args = ap.parse_args()

    text = pathlib.Path(args.body).read_text(encoding="utf-8") if args.body else sys.stdin.read()
    text = text.replace("\r\n", "\n").replace("\r", "\n")  # normalise GitHub line endings
    fields = parse_issue_body(text)
    entry = build_entry(fields, args.issue)

    if args.apply:
        doc = json.loads(DATA.read_text(encoding="utf-8"))
        names = {t["name"].lower() for t in doc["tools"]}
        if entry["name"].lower() in names:
            print(f"::error::A tool named '{entry['name']}' already exists.", file=sys.stderr)
            sys.exit(2)
        doc["tools"].append(entry)
        doc["tool_count"] = len(doc["tools"])
        DATA.write_text(json.dumps(doc, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        print(f"Added '{entry['name']}'. Catalog now has {doc['tool_count']} tools.")
    else:
        print(json.dumps(entry, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
