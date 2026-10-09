# ADR-001: Email Verification Token Strategy

| Field | Value |
|-------|-------|
| Status | Accepted |
| Author | John Smith |
| Date | 2026-09-03 |
| Related | TechSpec section 5 and 6 (BR-03, BR-05), FR-02, FR-05 |

Status values: `Proposed`, `Accepted`, `Deprecated`, `Superseded by ADR-xxx`.

## Context

Email verification requires a token sent to the user that proves mailbox ownership. BR-03 demands expiry and single use; BR-05 demands that a resend invalidates all previous tokens. The token travels through email, an untrusted channel, so leakage of stored values must not allow account activation.

## Decision

We will generate a 256-bit random token, send the raw value by email, and persist only its SHA-256 hash with a 24-hour expiry. Verification hashes the received token, looks it up, activates the account, and deletes the record. Resend deletes all tokens for the user before issuing a new one.

## Alternatives Considered

| Alternative | Pros | Cons | Reason Rejected |
|-------------|------|------|-----------------|
| Random token stored hashed | Revocable, single use enforceable, database leak does not expose usable tokens | Requires storage and lookup | Chosen |
| Signed JWT | Stateless, no storage | Cannot be revoked before expiry, breaks BR-05; secret rotation invalidates all pending tokens | Not revocable |
| 6-digit numeric code | Easy to type | Brute-forceable without aggressive rate limiting | Weak entropy |

## Consequences

### Positive

- Single use and revocation are trivial: delete the row.
- A database leak does not expose usable tokens.

### Negative

- One additional table and one indexed lookup per verification.
- Expired rows require periodic cleanup.

## Compliance

Integration tests assert: token cannot be reused, expired token is rejected, resend invalidates previous tokens, and only the hash is persisted.
