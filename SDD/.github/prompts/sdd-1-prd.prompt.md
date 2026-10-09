---
description: "SDD phase 1: generate the PRD for a feature from a short description"
agent: "Business Analyst"
argument-hint: "Feature name and short description of the problem"
---
Run SDD phase 1 in SDD mode for the feature described in the user input.

Inputs:

- Feature name and problem description provided by the user.

Output:

- `features/<feature-name>/1-PRD.md` following [1-PRD.md](../../templates/1-PRD.md), with Status `Draft`.
- The list of open questions that block approval.
