---
description: "SDD phase 5: validate the implementation against PRD and TechSpec"
agent: "agent"
argument-hint: "Feature folder name (e.g., user-registration)"
---
Run QA (phase 5 of Spec Driven Development) for the feature indicated in the user input.

Inputs:

- `features/<feature-name>/1-PRD.md`, `2-TECHSPEC.md`, and `4-EXECUTE.md` with all tasks `Done`.
- The implemented code and its test suites.

Rules:

- Use [5-QA.md](../../templates/5-QA.md) as the exact structure. Do not add, remove, or reorder sections.
- If Execute is not complete, stop and inform the user.
- Validate every FR, US acceptance criterion, and NFR from the PRD. Record concrete evidence for each: test name, command output, or measurement.
- Run the full automated test suite and record the summary numbers.
- Actively probe edge cases: invalid input, empty state, concurrency, and external dependency failure.
- Check regression on existing behavior affected by the change.
- Register every failure in the Defects table with severity. Do not fix defects in this phase; fixing happens back in Execute.
- Do not mark anything `Pass` without evidence.

Output:

- Save as `features/<feature-name>/5-QA.md`.
- Fill the Verdict: `Approved` or `Rejected — return to Execute` with the list of defects.
