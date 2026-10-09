# QA: {FEATURE_NAME}

| Field | Value |
|-------|-------|
| Status | Draft |
| Author | {AUTHOR} |
| Date | {DATE} |
| PRD | [1-PRD.md](./1-PRD.md) |
| TechSpec | [2-TECHSPEC.md](./2-TECHSPEC.md) |

## 1. Functional Validation

Validate every functional requirement and acceptance criterion from the PRD. Every FR and US must appear; mark `N/A` with a reason only when it cannot be verified at this stage.

| ID | Requirement | Test | Result | Evidence |
|----|-------------|------|--------|----------|
| FR-01 | {requirement} | {how it was tested} | Pass / Fail | {log, screenshot, test name} |
| US-01 | {acceptance criteria} | {how it was tested} | Pass / Fail | {evidence} |

## 2. Non-Functional Validation

Every NFR from the PRD must appear; mark `N/A` with a reason only when it cannot be verified at this stage.

| ID | Requirement | Test | Result | Evidence |
|----|-------------|------|--------|----------|
| NFR-01 | {performance target} | {load test} | Pass / Fail | {metrics} |
| NFR-02 | {security requirement} | {security check} | Pass / Fail | {report} |
| NFR-03 | {availability target} | {health check, deployment verification} | Pass / Fail | {evidence} |
| NFR-04 | {observability requirement} | {inspection of logs, metrics, alerts} | Pass / Fail | {evidence} |

## 3. Edge Cases

| # | Scenario | Expected Behavior | Result |
|---|----------|-------------------|--------|
| 1 | {invalid input} | {rejected with clear error} | Pass / Fail |
| 2 | {empty state} | {graceful handling} | Pass / Fail |
| 3 | {concurrency / race condition} | {consistent outcome} | Pass / Fail |
| 4 | {failure of external dependency} | {resilient behavior} | Pass / Fail |

## 4. Regression

| Area | Test | Result |
|------|------|--------|
| {Existing feature affected} | {test executed} | Pass / Fail |

## 5. Automated Test Summary

| Level | Total | Passed | Failed | Coverage |
|-------|-------|--------|--------|----------|
| Unit | | | | |
| Integration | | | | |
| End To End | | | | |

## 6. Defects

| # | Severity | Description | Task Created | Status |
|---|----------|-------------|--------------|--------|
| 1 | {Critical/Major/Minor} | {description} | {T-xx or issue link} | Open |

## 7. Verdict

- [ ] All functional requirements pass
- [ ] All non-functional requirements pass
- [ ] No open critical or major defects
- [ ] Regression clean

Result: `Approved` / `Rejected — return to Execute`
