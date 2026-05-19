# Installing these skills

Four skills live in this folder:

- `scientific-writer/` — dual-audience scientific prose for the MCB chapter style
- `scientific-researcher/` — literature/software search and citation verification
- `aiml-expert/` — AI/ML expertise for scientific imaging
- `em-expert/` — full EM landscape (SPA, cryo-ET, CLEM, vEM, SEM/FIB-SEM/SBEM, iLM workflows)

## Install to your user skills directory

Paste this into Terminal to make them available across all your Claude sessions, not only this project:

```bash
mkdir -p ~/.claude/skills && cp -R "/Users/robertkiewisz/Documents/Claude/Projects/Book chapter for Cryo-EM AI/ML tools landscape overview/skills/scientific-writer" "/Users/robertkiewisz/Documents/Claude/Projects/Book chapter for Cryo-EM AI/ML tools landscape overview/skills/scientific-researcher" "/Users/robertkiewisz/Documents/Claude/Projects/Book chapter for Cryo-EM AI/ML tools landscape overview/skills/aiml-expert" "/Users/robertkiewisz/Documents/Claude/Projects/Book chapter for Cryo-EM AI/ML tools landscape overview/skills/em-expert" ~/.claude/skills/
```

After running, the skills will show up in any Claude session under the names above. The project folder copies can stay where they are — feel free to edit them and re-run the copy command to update.

## Why they live here first

The `~/.claude/skills/` directory is write-protected from inside Cowork sessions, so the skills had to be drafted into the project workspace. The one-line copy above is the manual install step.

## Iterating on a skill

Edit the `SKILL.md` file directly — the frontmatter `name` and `description` control when the skill triggers; the body is the actual instructions Claude reads when the skill fires. After edits, re-run the copy command (or just edit the copies in `~/.claude/skills/` directly).
