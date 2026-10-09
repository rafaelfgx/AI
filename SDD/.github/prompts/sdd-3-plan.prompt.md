---
description: "SDD phase 3: generate the task plan from an approved TechSpec"
agent: "Developer"
argument-hint: "Feature folder name (e.g., user-registration)"
---
Run SDD phase 3 (planning) in SDD mode for the feature folder indicated in the user input.

Inputs:

- `features/<feature-name>/2-TECHSPEC.md` approved according to the agent gate.

Output:

- `features/<feature-name>/3-PLAN.md` following [3-PLAN.md](../../templates/3-PLAN.md), with Status `Draft`.
- A summary of the milestones and the task execution order. Stop and request plan approval; do not implement.
