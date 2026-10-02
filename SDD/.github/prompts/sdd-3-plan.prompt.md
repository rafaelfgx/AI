---
description: "SDD phase 3: generate the task plan from an approved TechSpec"
agent: "agent"
argument-hint: "Feature folder name (e.g., user-registration)"
---
Generate the Plan artifact (phase 3 of Spec Driven Development) for the feature indicated in the user input.

Inputs:

- `features/<feature-name>/2-TECHSPEC.md` with Status `Approved`.

Rules:

- Use [3-PLAN.md](../../templates/3-PLAN.md) as the exact structure. Do not add, remove, or reorder sections.
- Replace every `{PLACEHOLDER}` with real content. No placeholder may remain.
- If the TechSpec is missing or not `Approved`, stop and inform the user.
- Break the work into small, independently verifiable tasks. Each task must be completable and testable in isolation.
- Every task must have: unique ID (T-xx), traceability to FR/BR/NFR, list of files, dependencies, and a verifiable definition of done.
- Order tasks so every milestone delivers a working increment.
- The Coverage Check table must map every TechSpec component to at least one task. No task may exist without traceability.
- Prefer vertical slices over horizontal layers when slicing.

Output:

- Save as `features/<feature-name>/3-PLAN.md`.
- Set Status to `Draft` and today's date.
- Finish by summarizing the milestones and the task execution order.
