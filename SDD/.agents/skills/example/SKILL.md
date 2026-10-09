---
name: example
description: 'Generic example skill demonstrating the SKILL.md structure. Use as a template when creating new skills: defines name, description, when to use, step-by-step procedure, and references to bundled resources.'
argument-hint: 'Describe the task to apply this skill to'
---

# Example Skill

## What It Does

Demonstrates the standard structure of a skill: frontmatter metadata, usage triggers, a step-by-step procedure, and references to bundled resources.

## When to Use

- Creating a new skill and needing a starting template
- Learning how skills are structured and discovered
- Validating the expected folder and file layout

## Procedure

1. Copy this folder and rename it to the new skill name
2. Update `name` in the frontmatter to match the folder name exactly
3. Write a keyword-rich `description` so the agent can discover the skill
4. Replace this body with the real workflow steps
5. Add bundled resources only if needed:
   - `scripts/` for executable code
   - `references/` for detailed documentation loaded on demand
   - `assets/` for templates and boilerplate

## Conventions

- Folder name and `name` field must match: lowercase, alphanumeric, hyphens
- Keep `SKILL.md` under 500 lines; move details to `references/`
- Use relative paths starting with `./` for all bundled resources
- Include trigger keywords in the description for automatic discovery
