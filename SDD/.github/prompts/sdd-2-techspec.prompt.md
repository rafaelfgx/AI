---
description: "SDD phase 2: generate the TechSpec from an approved PRD"
agent: "agent"
argument-hint: "Feature folder name (e.g., user-registration)"
---
Generate the TechSpec artifact (phase 2 of Spec Driven Development) for the feature indicated in the user input.

Inputs:

- `features/<feature-name>/1-PRD.md` with Status `Approved`.
- The current codebase: analyze existing conventions, frameworks, and patterns before proposing the design.

Rules:

- Use [2-TECHSPEC.md](../../templates/2-TECHSPEC.md) as the exact structure. Do not add, remove, or reorder sections.
- Replace every `{PLACEHOLDER}` with real content. No placeholder may remain.
- If the PRD is missing or not `Approved`, stop and inform the user.
- Define HOW only. Every design decision must trace back to a PRD requirement.
- The Requirement Traceability table must cover every FR and NFR from the PRD. No requirement may be left unmapped.
- Document at least one rejected alternative with the reason.
- For decisions with long-term impact, create an ADR in `features/<feature-name>/adrs/` using [ADR.md](../../templates/ADR.md) and reference it from the Alternatives section.
- Follow the project architecture conventions. Do not introduce new dependencies unless strictly necessary.
- Record unresolved items as `OPEN QUESTION`.

Output:

- Save as `features/<feature-name>/2-TECHSPEC.md`.
- Set Status to `Draft` and today's date.
- Finish by listing the open questions that block approval.
