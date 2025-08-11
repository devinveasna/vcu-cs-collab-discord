# VCU CS Discord Collaboration Platform – Design Document

**Author:** Devin Veasna  
**Role:** Computer Science Student Advisory Board Member  
**Date:** YYYY-MM-DD  
**Version:** 1.0  

---

## 1. Overview
This project aims to create a university-wide Discord community for Computer Science students to collaborate, share resources, and engage in academic and career discussions.  
A custom Discord bot will be developed to facilitate structured Q&A, study group coordination, and AI-assisted features that respect academic integrity.

---

## 2. Goals & Objectives
- Foster a collaborative environment for CS students at VCU.
- Provide structured channels for class help, job search, and project collaboration.
- Implement bot features that automate thread creation, tagging, and resource linking.
- Integrate AI responsibly for question summarization, FAQ search, and career support.
- Maintain compliance with academic integrity and university policies.

---

## 3. Stakeholders
| Stakeholder | Role | Interest |
|-------------|------|----------|
| CS Students | End users | Academic help, career networking |
| Faculty & TAs | Advisors/moderators | Ensure integrity, provide guidance |
| CS Advisory Board | Oversight | Ensure alignment with department goals |
| Bot Maintainers | Developers | Maintain and improve the bot features |

---

## 4. Requirements

### 4.1 Functional Requirements
- Role-based channels for courses, career topics, and social discussions.
- `/ask` command for structured help requests.
- `/studygroup` command for temporary voice/text rooms.
- AI-assisted FAQ search with hints-only guardrails.
- Moderation tools for reporting and handling inappropriate content.

### 4.2 Non-Functional Requirements
- Bot uptime ≥ 99%.
- AI API costs ≤ $X/month.
- Scalable to 1,000+ members.
- Response latency ≤ 2s for common commands.

---

## 5. Architecture Overview
- **Bot Framework:** TypeScript + discord.js
- **AI Integration:** OpenAI API (text-processing) + pgvector for semantic search
- **Database:** PostgreSQL (course data, threads, resources)
- **Hosting:** Docker container on Render/Fly.io
- **CI/CD:** GitLab CI with lint → test → build → deploy
- **Monitoring:** DataDog logs and metrics

*(Insert diagram here)*

---

## 6. Risks, Constraints, and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| AI misuse for cheating | High | Hints-only prompts, no full solutions, academic integrity reminders before posting |
| High moderation demand | Medium | Appoint multiple mods, use auto-thread cleanup, keyword alerts |
| API cost overrun | Medium | Rate limiting, caching AI results, budget alerts |
| Leadership turnover | High | Document setup, handover plan, shared repo access |
| Privacy concerns | High | No storage of PII, opt-out command, clear privacy notice |
| Scalability limits | Medium | Sharding bot instances, using Discord gateway intents efficiently |

---

## 7. Governance & Community Policy
- **Code of Conduct:** Zero tolerance for harassment, hate speech, or academic dishonesty.
- **Academic Integrity:** No direct assignment answers; encourage explanation of concepts.
- **Moderation:** Flagging system, escalation to faculty if needed.
- **Privacy:** Bot stores only minimal metadata for analytics; all data retention <90 days.

### 7.1 Student Verification

**Goal:** Ensure only current VCU Computer Science students (plus approved alumni/faculty) can access the server.

**Current Method: VCU Email Verification (One-Time Code)**
1. On join, users can only see `#welcome` and `#verify`.
2. User runs `/verify email <netid>@vcu.edu`.
3. Bot emails a one-time code to the `@vcu.edu` address.
4. User submits `/verify code <code>`.
5. Bot assigns the `Verified Student` role.

**Alternative / Access Exceptions**
- Alumni: manual approval → `Alumni` role.
- Faculty/TAs: manual approval → `Faculty/TA` role.

**Risks & Mitigations**
| Risk | Mitigation |
|------|------------|
| Shared/invalid emails | Restrict to `@vcu.edu`, rate-limit attempts, log verification events |
| Lost access / email change | Allow re-verification; mods can reset verification |
| Privacy concerns | Store only minimal metadata (user ID, timestamp), expire logs ≤ 90 days |

**Future Option: Duo-Backed SSO Verification**
If VCU IT approves registering this project as an SSO client, verification can occur via the university login (which enforces Duo), then the bot assigns roles based on a verified callback. Until approved, the project uses email-based verification.

---

## 8. Implementation Plan
| Phase | Timeline | Deliverables |
|-------|----------|--------------|
| Planning & Approval | Week 1 | Finalized server design, risk doc approval |
| MVP Bot | Weeks 2–4 | `/ask`, `/studygroup`, role assignments |
| AI Features | Weeks 5–7 | FAQ search, summarization |
| Feedback Sprint | Weeks 8–9 | Survey students, adjust features |
| Launch | Week 10 | Public release & onboarding event |

---

## 9. Maintenance & Handover
- **Docs:** All setup/config stored in `/docs` in repo.
- **Successor Plan:** Train 2–3 future board members in bot/server admin.
- **API Keys:** Stored in secure vault; rotate every semester.
- **Monitoring:** Weekly review of metrics and flagged content.

---

## 10. Appendices
- **A:** Channel Layout Map
- **B:** AI Prompt Templates
- **C:** Privacy & Data Handling Policy
