---
description: "SDD phase 4: execute the approved plan task by task, logging progress"
agent: "Developer"
argument-hint: "Feature folder name and optionally a task ID to start from"
---
Run SDD phase 4 (execution) in SDD mode for the feature folder indicated in the user input, starting from the given task ID when provided.

Inputs:

- `features/<feature-name>/3-PLAN.md` approved according to the agent gate.
- `features/<feature-name>/4-EXECUTE.md` as the execution log. Create it from [4-EXECUTE.md](../../templates/4-EXECUTE.md) if it does not exist, with one Task Log row per plan task.

Output:

- Updated code, tests, and `features/<feature-name>/4-EXECUTE.md` after every task.
- When all tasks are `Done` and the Completion Checklist is verified, Status `Done` and the feature declared ready for QA.
