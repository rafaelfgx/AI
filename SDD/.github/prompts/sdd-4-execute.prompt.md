---
description: "SDD phase 4: execute the approved plan task by task, logging progress"
agent: "agent"
argument-hint: "Feature folder name and optionally a task ID to start from"
---
Execute the Plan (phase 4 of Spec Driven Development) for the feature indicated in the user input.

Inputs:

- `features/<feature-name>/3-PLAN.md` with Status `Approved`.
- `features/<feature-name>/4-EXECUTE.md` as the execution log. Create it from [4-EXECUTE.md](../../templates/4-EXECUTE.md) if it does not exist, with one Task Log row per plan task.

Rules:

- If the Plan is missing or not `Approved`, stop and inform the user.
- Execute tasks strictly in plan order. One task at a time.
- For each task: mark `In Progress` in the Task Log, implement, verify the definition of done, run the tests, then mark `Done` and fill the Execution Notes.
- Do not start the next task before the current one is `Done`.
- Suggest one commit per task using the format `{type}: {task-id} {short description}`.
- If a task reveals a flaw in the Plan, TechSpec, or PRD: stop, report it, update the earlier artifact after user approval, record it in Spec Changes, then resume.
- If blocked, record the blocker in the Blockers table and inform the user.
- Never implement anything outside the plan. Unplanned work requires a plan change first.

Output:

- Updated code, tests, and `features/<feature-name>/4-EXECUTE.md` after every task.
- When all tasks are `Done`, complete the Completion Checklist and declare the feature ready for QA.
