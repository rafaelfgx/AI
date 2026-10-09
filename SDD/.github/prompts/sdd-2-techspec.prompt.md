---
description: "SDD phase 2: generate the TechSpec from an approved PRD"
agent: "Software Architect"
argument-hint: "Feature folder name (e.g., user-registration)"
---
Run SDD phase 2 in SDD mode for the feature folder indicated in the user input.

Inputs:

- `features/<feature-name>/1-PRD.md` approved according to the agent gate.
- The current codebase, analyzed before proposing the design.

Output:

- `features/<feature-name>/2-TECHSPEC.md` following [2-TECHSPEC.md](../../templates/2-TECHSPEC.md), with Status `Draft`.
- ADRs in `features/<feature-name>/adrs/` following [ADR.md](../../templates/ADR.md) when a decision has long-term impact.
- The list of open questions that block approval.
