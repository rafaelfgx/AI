---
description: "SDD phase 6: final code review, retrospective, and sign-off"
agent: "agent"
argument-hint: "Feature folder name (e.g., user-registration)"
---
Run the final Review (phase 6 of Spec Driven Development) for the feature indicated in the user input.

Inputs:

- All previous artifacts in `features/<feature-name>/`, with QA Status `Approved`.
- The complete diff of the implemented code.

Rules:

- Use [6-REVIEW.md](../../templates/6-REVIEW.md) as the exact structure. Do not add, remove, or reorder sections.
- If QA is not `Approved`, stop and inform the user.
- Review the code against every checklist item: design, code quality, security, and testing. Check items only after verifying them in the actual code.
- Record every finding with severity and file. Blocker and Major findings must be resolved before sign-off.
- Verify the delivery: every PRD requirement is delivered, deferred, or explicitly dropped with justification.
- Verify that all ADRs referenced in the TechSpec are `Accepted` and the code complies with them.
- Fill the retrospective with concrete, actionable items — no generic statements.

Output:

- Save as `features/<feature-name>/6-REVIEW.md`.
- Set the feature status: `Done` or `Returned` with the list of blocking findings.
