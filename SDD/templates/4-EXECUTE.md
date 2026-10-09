# Execute: {FEATURE_NAME}

| Field | Value |
|-------|-------|
| Status | Draft |
| Author | {AUTHOR} |
| Start Date | {DATE} |
| Plan | [3-PLAN.md](./3-PLAN.md) |

## 1. Execution Rules

- Execute tasks in the order defined by the plan.
- One task at a time. Complete and verify before starting the next.
- Suggest one commit message per task using: `{type}: {task-id} {short description}`. Create commits only when explicitly requested.
- If a task reveals a flaw in the plan or spec, stop, update the artifact, then resume.

## 2. Task Log

| Task | Status | Commit | Notes |
|------|--------|--------|-------|
| T-01 | Pending | | |
| T-02 | Pending | | |

Status values: `Pending`, `In Progress`, `Done`, `Blocked`.

Commit values: suggested message, commit hash when created, or `Not created (not requested)`.

## 3. Execution Notes

### T-01

- Started: {date}
- Finished: {date}
- Summary: {what was implemented}
- Verification: {tests run, results}
- Deviations from plan: {none or description}

## 4. Blockers

| # | Task | Blocker | Resolution | Status |
|---|------|---------|------------|--------|
| 1 | T-xx | {description} | {action taken} | Open |

## 5. Spec Changes During Execution

| # | Artifact | Change | Reason |
|---|----------|--------|--------|
| 1 | {PRD / TechSpec / Plan} | {what changed} | {why} |

## 6. Completion Checklist

- [ ] All tasks `Done`
- [ ] All tests passing
- [ ] No lint or build errors
- [ ] All spec changes reflected in earlier artifacts
- [ ] Ready for QA
