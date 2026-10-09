# Review: {FEATURE_NAME}

| Field | Value |
|-------|-------|
| Status | Draft |
| Author | {AUTHOR} |
| Date | {DATE} |
| QA | [5-QA.md](./5-QA.md) |

## 1. Code Review Checklist

### Design

- [ ] Follows the approved TechSpec
- [ ] Single responsibility per class and method
- [ ] No unnecessary abstractions or over-engineering
- [ ] Established design patterns applied where justified
- [ ] Domain isolated from infrastructure concerns
- [ ] Every ADR referenced by the TechSpec is `Accepted` and honored by the code

### Code Quality

- [ ] Clear and consistent naming, no abbreviations
- [ ] Small and deterministic methods
- [ ] Fail-fast behavior enforced
- [ ] No dead code, no commented-out code
- [ ] Immutability applied by default

### Security

- [ ] Input validated at the boundary
- [ ] No secrets in code or configuration files
- [ ] Authorization enforced on every endpoint
- [ ] No internal models exposed in API responses

### Testing

- [ ] All scenarios covered, including edge cases
- [ ] Tests are deterministic and independent
- [ ] No hidden dependencies or static state

## 2. Findings

| # | Severity | File | Finding | Resolution |
|---|----------|------|---------|------------|
| 1 | {Blocker/Major/Minor} | {file} | {description} | {fixed / accepted / deferred} |

## 3. Delivery Summary

| Item | Result |
|------|--------|
| Requirements delivered | {X of Y} |
| Deferred to backlog | {list or none} |
| Known limitations | {list or none} |

## 4. Retrospective

### What Went Well

- {point}

### What To Improve

- {point}

### Action Items

| # | Action | Owner | Due |
|---|--------|-------|-----|
| 1 | {improvement action} | {owner} | {date} |

## 5. Sign-Off

| Role | Name | Decision | Date |
|------|------|----------|------|
| Reviewer | {Name} | Pending | |
| Tech Lead | {Name} | Pending | |
| Product | {Name} | Pending | |

Feature status: `Done` / `Pending` / `Returned`

Status values: `Returned` when changes are requested, `Pending` while any sign-off is missing, `Done` only when every sign-off is `Approved`.
