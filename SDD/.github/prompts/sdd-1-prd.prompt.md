---
description: "SDD phase 1: generate the PRD for a feature from a short description"
agent: "agent"
argument-hint: "Feature name and short description of the problem"
---
Generate the PRD artifact (phase 1 of Spec Driven Development) for the feature described in the user input.

Inputs:

- Feature name and problem description provided by the user.

Rules:

- Use [1-PRD.md](../../templates/1-PRD.md) as the exact structure. Do not add, remove, or reorder sections.
- Replace every `{PLACEHOLDER}` with real content. No placeholder may remain.
- Define WHAT and WHY only. Do not include technical solutions, architecture, or implementation details.
- Every functional requirement must have a unique ID (FR-xx) and a MoSCoW priority.
- Every user story must have testable acceptance criteria in Given/When/Then format.
- Declare explicit Out of Scope items to prevent scope creep.
- If information is missing, ask the user before inventing requirements. Record unresolved items as `OPEN QUESTION`.

Output:

- Save as `features/<feature-name>/1-PRD.md` using kebab-case for the folder name.
- Set Status to `Draft` and today's date.
- Finish by listing the open questions that block approval.
