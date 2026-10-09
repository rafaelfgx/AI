# PRD: User Registration

| Field | Value |
|-------|-------|
| Status | Approved |
| Author | Jane Doe |
| Date | 2026-09-01 |
| Version | 1.0 |

## 1. Problem

New customers cannot create their own accounts. Every account is created manually by the support team, which takes up to 2 business days, generates ticket backlog, and causes drop-off of interested users before activation.

## 2. Objective

Allow visitors to create a verified account by themselves in under 2 minutes, eliminating manual account creation by support.

## 3. Scope

### In Scope

- Self-service registration with name, email, and password
- Email verification before account activation
- Duplicate email prevention
- Password policy enforcement
- Resend verification email

### Out of Scope

- Social login (Google, GitHub)
- Multi-factor authentication
- Password recovery
- Profile management after registration

## 4. Users and Personas

| Persona | Description | Need |
|---------|-------------|------|
| Visitor | Potential customer without an account | Create an account quickly without human interaction |
| Support Analyst | Handles onboarding tickets | Stop creating accounts manually |

## 5. Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-01 | The system must allow a visitor to register with name, email, and password | Must |
| FR-02 | The system must require email verification before activating the account | Must |
| FR-03 | The system must reject registration with an email that is already in use | Must |
| FR-04 | The system must enforce the password policy at registration | Must |
| FR-05 | The system must allow the user to request a new verification email | Should |

## 6. Non-Functional Requirements

| ID | Category | Requirement |
|----|----------|-------------|
| NFR-01 | Performance | Registration endpoint responds under 300 ms at P95 |
| NFR-02 | Security | Passwords hashed with bcrypt; all traffic over TLS; rate limiting on public endpoints |
| NFR-03 | Availability | 99.9% uptime for registration endpoints |
| NFR-04 | Observability | Structured logs, registration metrics, and alert on verification failure spike |

## 7. User Stories

| ID | Story | Acceptance Criteria |
|----|-------|---------------------|
| US-01 | As a visitor, I want to register with my email so that I can access the product | Given a valid name, email, and password, when I submit the registration, then my account is created as pending and I receive a verification email |
| US-02 | As a visitor, I want to verify my email so that my account is activated | Given a pending account, when I use a valid verification token, then my account becomes active |
| US-03 | As a visitor, I want to request a new verification email so that I can complete registration if the first email is lost | Given a pending account, when I request a resend, then a new verification email is sent and previous tokens are invalidated |

## 8. Success Metrics

| Metric | Current | Target | How To Measure |
|--------|---------|--------|----------------|
| Onboarding time | Up to 2 business days | Under 2 minutes | Time between registration and activation |
| Accounts verified within 24h | N/A | Above 80% | Registration metrics dashboard |
| Manual account creation tickets | ~120/month | 0 | Support ticket system |

## 9. Constraints and Assumptions

- Constraint: must use the company's existing SMTP provider for email delivery.
- Constraint: personal data handling must comply with LGPD/GDPR.
- Assumption: the SMTP provider delivers email within 1 minute; if false, the verification flow target is invalidated.

## 10. Dependencies

- SMTP provider credentials for the production environment (Infrastructure team).

## 11. Open Questions

| # | Question | Owner | Resolution |
|---|----------|-------|------------|
| 1 | How long should the verification token remain valid? | Jane Doe | Resolved: 24 hours, single use |

## 12. Approval

| Role | Name | Decision | Date |
|------|------|----------|------|
| Product | Jane Doe | Approved | 2026-09-02 |
| Engineering | John Smith | Approved | 2026-09-02 |
