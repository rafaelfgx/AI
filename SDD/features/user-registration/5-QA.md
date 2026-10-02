# QA: User Registration

| Field | Value |
|-------|-------|
| Status | Approved |
| Author | Carol White |
| Date | 2026-09-14 |
| PRD | [1-PRD.md](./1-PRD.md) |
| TechSpec | [2-TECHSPEC.md](./2-TECHSPEC.md) |

## 1. Functional Validation

Validate every functional requirement and acceptance criterion from the PRD.

| ID | Requirement | Test | Result | Evidence |
|----|-------------|------|--------|----------|
| FR-01 | Register with name, email, password | `RegistrationFlowTest.registersPendingAccount` | Pass | 201 with PendingVerification status |
| FR-02 | Email verification activates account | `RegistrationFlowTest.verifiesAndActivatesAccount` | Pass | Status Active after valid token |
| FR-03 | Duplicate email rejected | `RegisterUserServiceTest.rejectsDuplicateEmail` | Pass | 409 returned, case-insensitive match |
| FR-04 | Password policy enforced | `PasswordPolicyTest` (6 cases) | Pass | 400 with policy violation details |
| FR-05 | Resend verification email | `RegistrationFlowTest.resendInvalidatesPreviousTokens` | Pass | Old token rejected after resend |
| US-01 | Valid registration creates pending account and sends email | `RegistrationFlowTest.registersPendingAccount` | Pass | Email captured by SMTP stub |
| US-02 | Valid token activates account | `RegistrationFlowTest.verifiesAndActivatesAccount` | Pass | 200 with Active status |
| US-03 | Resend invalidates previous tokens | `RegistrationFlowTest.resendInvalidatesPreviousTokens` | Pass | 404 on old token |

## 2. Non-Functional Validation

| ID | Requirement | Test | Result | Evidence |
|----|-------------|------|--------|----------|
| NFR-01 | P95 under 300 ms | Load test 50 rpm for 10 min | Pass | P95 = 184 ms |
| NFR-02 | bcrypt, TLS, rate limiting | `RateLimitingFilterTest`, config inspection, hash inspection | Pass | bcrypt cost 12, 429 on 6th request |
| NFR-04 | Logs, metrics, alerts | Manual inspection in staging | Pass | Counters and alert rule visible in dashboard |

## 3. Edge Cases

| # | Scenario | Expected Behavior | Result |
|---|----------|-------------------|--------|
| 1 | Malformed email or empty name | 400 with field-level errors | Pass |
| 2 | Verification with unknown token | 404 without revealing existence | Pass |
| 3 | Two concurrent registrations with the same email | One succeeds, the other gets 409 via unique index | Pass |
| 4 | SMTP provider down during registration | Account persisted, email retried, registration still 201 | Pass |
| 5 | Expired token (25h) | 404, account remains pending | Pass |
| 6 | Token reused after activation | 404, single use enforced | Pass |

## 4. Regression

| Area | Test | Result |
|------|------|--------|
| Login with existing accounts | Full auth suite | Pass |
| Rate limiting on existing public endpoints | `RateLimitingFilterTest` | Pass |

## 5. Automated Test Summary

| Level | Total | Passed | Failed | Coverage |
|-------|-------|--------|--------|----------|
| Unit | 47 | 47 | 0 | 96% |
| Integration | 21 | 21 | 0 | n/a |
| End To End | 3 | 3 | 0 | n/a |

## 6. Defects

| # | Severity | Description | Task Created | Status |
|---|----------|-------------|--------------|--------|
| 1 | Minor | Verification error message exposed internal exception type | Fixed in `fix: T-05 sanitize verification error response` | Closed |

## 7. Verdict

- [x] All functional requirements pass
- [x] All non-functional requirements pass
- [x] No open critical or major defects
- [x] Regression clean

Result: `Approved`
