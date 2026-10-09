---
description: "SDD phase 5: validate the implementation against PRD and TechSpec"
agent: "QA"
argument-hint: "Feature folder name (e.g., user-registration)"
---
Run SDD phase 5 in SDD mode for the feature folder indicated in the user input.

Inputs:

- `features/<feature-name>/1-PRD.md`, `2-TECHSPEC.md`, and `4-EXECUTE.md` complete according to the agent gate.
- The implemented code and its test suites.

Output:

- `features/<feature-name>/5-QA.md` following [5-QA.md](../../templates/5-QA.md), with the Verdict filled.
