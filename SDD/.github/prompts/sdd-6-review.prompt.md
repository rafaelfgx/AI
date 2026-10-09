---
description: "SDD phase 6: final code review, retrospective, and sign-off"
agent: "Reviewer"
argument-hint: "Feature folder name (e.g., user-registration)"
---
Run SDD phase 6 in SDD mode for the feature folder indicated in the user input.

Inputs:

- All previous artifacts in `features/<feature-name>/`, with QA approved according to the agent gate.
- The complete diff of the implemented code.

Output:

- `features/<feature-name>/6-REVIEW.md` following [6-REVIEW.md](../../templates/6-REVIEW.md), with the Reviewer decision and the feature status filled.
