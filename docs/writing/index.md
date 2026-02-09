---
title: Writing | Raghuramreddy Thummalapalli
description: Articles on platform engineering and secure delivery
---

<div class="section-hero">

# Writing

Articles and guides on platform reliability, secure delivery, cloud modernization, and operating models.

</div>

<div class="divider"></div>

<section class="reveal">

<div class="section-title">Recent Articles</div>

### Building a Secure Software Supply Chain

Published: 2025  
*Best practices for SBOM, provenance tracking, and compliance-driven organizations*

Software supply chain attacks have moved from edge case to existential risk. This guide covers:
- Why SBOM (Software Bill of Materials) matters for compliance and security
- Implementing SLSA levels 1-3 in your CI/CD pipeline
- Provenance attestation with in-toto and Tekton
- Practical examples: scanning, signing, and verifying artifacts
- Operating a software attestation platform at scale

**Read on:**  [Medium](https://medium.com/@raghuramreddy) | [Dev.to](https://dev.to/raghuramreddy)

---

### Kubernetes Upgrade Patterns at Scale

Published: 2024  
*Blue-green strategies, drain automation, and validation checkpoints for production clusters*

Kubernetes upgrades are notoriously complex and risky. This article explores:
- Blue-green cluster patterns (recommended for zero-downtime upgrades)
- In-place node upgrades with workload drain coordination
- Custom health checks and canary rollouts
- Common pitfalls: storage migration, etcd backups, addon compatibility
- Tools: kubeadm, karpenter, kyverno for automation

**Read on:**  [Medium](https://medium.com/@raghuramreddy) | [Dev.to](https://dev.to/raghuramreddy)

---

### Platform Teams: From Infrastructure to Product

Published: 2024  
*Operating models, funding, and North Star metrics for building internal developer platforms*

Internal Developer Platforms (IDPs) succeed when treated as products, not plumbing. This guide covers:
- ConwayÒs Law: why team structure shapes platform architecture
- Funding models: center of excellence vs. chargeback vs. tax
- North Star metrics: developer experience, deployment frequency, lead time
- Building the right features: golden paths vs. escape hatches
- Scaling operations: runbooks, observability, and on-call discipline

**Read on:**  [Medium](https://medium.com/@raghuramreddy) | [Dev.to](https://dev.to/raghuramreddy)

---

### Multi-Cloud Strategy: Avoiding Lock-in Without Losing Focus

Published: 2023  
*Practical approaches to multi-cloud deployment and cost optimization*

Multi-cloud is not binary (cloud-native or bust). This explores:
- Multi-cloud vs. multi-region trade-offs
- Core abstractions: compute, storage, networking, observability
- Terraform-based infrastructure parity patterns
- When to build for portability vs. when to embrace platform specifics
- Real costs: operational overhead, tool sprawl, team complexity

**Read on:**  [Medium](https://medium.com/@raghuramreddy)

---

### The IaC Maturity Model

Published: 2023  
*Levels 1-4: from scripts to policy-as-code to GitOps*

Infrastructure-as-Code is a spectrum. This model outlines:
- **Level 1 (Scripts):** Bash, PowerShell, ad-hoc automation
- **Level 2 (Declarative):** Terraform, CloudFormation, consistent definitions
- **Level 3 (Policy):** Sentinel, OPA, guardrails and compliance
- **Level 4 (GitOps):** ArgoCD, Flux, single source of truth
- Avoiding common anti-patterns at each level

**Read on:**  [Medium](https://medium.com/@raghuramreddy)

</section>

<div class="divider"></div>

<section class="reveal">

<div class="section-title">Talks & Speaking</div>

<ul class="clean-list">
  <li><strong>KubeCon NA 2024</strong> — <span class=\"muted\">Kubernetes Upgrade Patterns: Lessons from 50+ Clusters</span></li>
  <li><strong>Cloud Native Nordics 2024</strong> — <span class=\"muted\">Building Platform Teams That Scale</span></li>
  <li><strong>Container Days 2023</strong> — <span class=\"muted\">Security-First Kubernetes Deployments</span></li>
</ul>

</section>

<div class="divider"></div>

<section class="reveal">

<div class="section-title">Subscribe</div>

<div class="lead\">
I publish one in-depth article per month on platform engineering, reliability, and secure delivery. No spam. Cancel anytime.
</div>

<form style="margin-top: 1.5rem; display: flex; gap: 0.5rem; max-width: 420px;\">
  <input type="email\" placeholder=\"your@email.com\" required style=\"flex: 1; padding: 0.65rem 0.95rem; border-radius: 8px; border: 1px solid var(--rrr-card-border); background: var(--rrr-card-bg); font-family: inherit;\"/>
  <button type=\"submit\" style=\"padding: 0.65rem 1.4rem; border-radius: 8px; border: none; background: rgba(var(--rrr-accent), 0.2); cursor: pointer; font-weight: 600; transition: all 200ms ease;\">Subscribe</button>
</form>

<div class=\"footnote\">
No emails will actually be sent from this demo form. Connect on LinkedIn or GitHub for updates.
</div>

</section>

<div class="divider"></div>

<section class="reveal">

<div class="section-title">Quick Links</div>

<div class="pinned-links">
  <a class="plink" href="/">← Back to home</a>
  <a class="plink" href="/work">View work →</a>
</div>

</section>
