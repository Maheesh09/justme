export interface Project {
  id: string;
  svcCode: string;
  status: 'Live' | 'Shipped' | 'Deployed' | 'In Progress';
  title: string;
  tagline: string;
  category: string;
  year: string;
  tags: string[];
  image: string;
  serviceId: string;
  runId: string;
  overview: string;
  metrics: {
    accuracy: { value: string; label: string; sub: string; note: string };
    economics: { value: string; label: string; badge: string; model: string; note: string };
    ownership: { value: string; label: string; note: string };
  };
  cards: {
    problem: { title: string; text: string; highlight: string; metric: string };
    solution: { title: string; text: string; highlight: string; metric: string };
    security: { title: string; text: string; highlight: string; metric: string };
    stack: { title: string; tags: string[]; highlight: string; metric: string };
  };
  keyTakeaways: string[];
  gallery: {
    label: string;
    title: string;
    desc: string;
    image: string;
  }[];
  githubUrl: string;
  demoUrl?: string;
  nextProjectId: string;
}

export interface Achievement {
  id: string;
  date: string;
  evtId: string;
  title: string;
  organization: string;
  description: string;
  impact: string;
  category: 'COMPETITION' | 'OPEN_SOURCE' | 'COMMUNITY';
  badgeType: 'WINNER' | '1ST RUNNER UP' | '2ND RUNNER UP' | 'TOP 10' | 'OPEN SOURCE' | 'COMMUNITY';
  statusBadge: 'Verified Award' | 'Podium Finish' | 'Finalist' | 'Top Ranked' | 'Merged PRs' | 'Core Dev';
  tags: string[];
  teamInfo: string;
  image: string;
}

export function getAchievementBadgeStyle(badgeType: Achievement['badgeType']): string {
  switch (badgeType) {
    case 'WINNER':
      return 'bg-[#8b5cf6]/20 text-[#c084fc] border border-[#8b5cf6]/40 font-semibold';
    case '1ST RUNNER UP':
    case '2ND RUNNER UP':
      return 'bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30 font-medium';
    case 'TOP 10':
      return 'bg-[#34d399]/15 text-[#34d399] border border-[#34d399]/30 font-medium';
    case 'OPEN SOURCE':
      return 'bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30 font-medium';
    case 'COMMUNITY':
      return 'bg-[#818cf8]/15 text-[#818cf8] border border-[#818cf8]/30 font-medium';
    default:
      return 'bg-white/[0.05] text-[#a1a1b2] border border-white/[0.08]';
  }
}

export interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  content: {
    sectionTitle?: string;
    paragraphs: string[];
  }[];
}

export const PORTFOLIO_PROJECTS: Record<string, Project> = {
  synkron: {
    id: 'synkron',
    svcCode: 'PRJ-01',
    status: 'Live',
    title: 'Synkron',
    category: 'Developer Tooling & Multi-Agent AI',
    year: '2026',
    tagline: 'An event-driven multi-agent system that keeps technical documentation perpetually synchronized with your codebase.',
    tags: ['React', 'FastAPI', 'MongoDB', 'LangChain', 'Docker', 'GitHub Webhooks'],
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1WHuGf9DRh7_iYpDVvJFeCnLeJB321YWGxSUMzbqYTPnSKaB8AVlL99VbLmdfJG-_2Png11f6-ynzODgylrbleAGipHd7mo2EzLtBIhHy03lQMAtSzWOujYoUsGEqBjkkMMniaR0HDGwPS0wnMETIzxoY5jCTKqfQOsGZ1bEMtP5r0Y7Vcez9k0e3BA_OxYtcXVnq1epxrnJQsRi-ZWGiMf2ytjK6gvM7RNk4lBZNk9MgKoKd-gT7uT85U',
    serviceId: 'synkron-agent-v1.4',
    runId: 'PR-8912',
    overview: 'In fast-moving codebases, documentation inevitably drifts. Developers refactor APIs, change database schemas, and modify business rules without updating the corresponding wiki pages. Synkron hooks directly into GitHub commit events, parses AST deltas, and automatically drafts comprehensive documentation PRs for review.',
    metrics: {
      accuracy: {
        value: '84%',
        label: 'AST extraction accuracy',
        sub: '+3.2% vs baseline',
        note: 'Evaluated across 106 real pull requests',
      },
      economics: {
        value: '$0.0017',
        label: 'per analyzed commit',
        badge: 'Token Optimized',
        model: 'GPT-4o-mini + Local AST parser',
        note: '94% of parsing performed locally without LLM calls',
      },
      ownership: {
        value: 'Sole Architect',
        label: 'Full Lifecycle',
        note: 'Designed backend, agent graphs & webhook pipelines',
      },
    },
    cards: {
      problem: {
        title: 'The Challenge',
        text: 'API documentation and architecture whitepapers drift within weeks of release. Onboarding developers spend hours troubleshooting endpoints that behaved differently from obsolete docs.',
        highlight: 'Zero manual doc maintenance burden',
        metric: 'Average drift reduced from 42 days to 0',
      },
      solution: {
        title: 'Architecture & Agent Pipeline',
        text: 'Built an event-driven worker pool in FastAPI that parses Git diffs using Python AST trees. When structural changes are detected, a specialized LangChain agent generates markdown updates and stages a clean pull request.',
        highlight: 'Continuous feedback loop',
        metric: 'Sub-60s end-to-end PR generation',
      },
      security: {
        title: 'Security & Secret Isolation',
        text: 'Integrated GitHub App authentication with temporary installation access tokens (1-hour TTL). No persistent repository credentials or OAuth secrets are stored in memory or databases.',
        highlight: 'Ephemeral credentials only',
        metric: 'Zero stored private keys',
      },
      stack: {
        title: 'Technology Selection',
        tags: ['React', 'FastAPI', 'MongoDB', 'GitHub Webhooks', 'Docker', 'LangChain'],
        highlight: 'Containerized rootless runtime',
        metric: 'AsyncIO non-blocking event loop',
      },
    },
    keyTakeaways: [
      'AST-guided diff parsing reduces LLM prompt tokens by 88% compared to naive whole-file prompting.',
      'Developers are 4x more likely to accept an automated doc PR if diff highlights are isolated to modified signatures rather than entire files.',
      'GitHub Webhook idempotency requires Redis or memory deduping to handle retry spikes safely.',
    ],
    gallery: [
      {
        label: 'Dashboard Console',
        title: 'Overview & Sync Health',
        desc: 'Agent health, repository sync status, and latency telemetry.',
        image: 'https://lh3.googleusercontent.com/aida/AEtjO1WHuGf9DRh7_iYpDVvJFeCnLeJB321YWGxSUMzbqYTPnSKaB8AVlL99VbLmdfJG-_2Png11f6-ynzODgylrbleAGipHd7mo2EzLtBIhHy03lQMAtSzWOujYoUsGEqBjkkMMniaR0HDGwPS0wnMETIzxoY5jCTKqfQOsGZ1bEMtP5r0Y7Vcez9k0e3BA_OxYtcXVnq1epxrnJQsRi-ZWGiMf2ytjK6gvM7RNk4lBZNk9MgKoKd-gT7uT85U',
      },
      {
        label: 'Syntax Parser',
        title: 'AST Diff Engine',
        desc: 'Real-time abstract syntax tree analysis detecting breaking signature changes.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPVaiqOQ9TUQK3StLIHpRvhoyTRRw7Bvtp8HoM8VrATbfUuHch8JGD5nogbzbBS50fLXuNUbfPGbJEcZreQTFnfmgVh2URE714t0PtxK3ef2ntBi-lzEVM0NYZKkuLt8rgLZkqsdFuTB35sM7LoJMxrGfMiB6kpxWTc8H_mY6mY0be6W79Qd78epJrWdv8P71XvTIYG75aXd5JJV470USuFIN6AHh6hEhmp-GhqEvqn0-1x9mLTX9y0g',
      },
      {
        label: 'Topology Map',
        title: 'Event Pipeline Visualizer',
        desc: 'Webhook ingestion queue, worker pool distribution, and output stages.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOrASrpj6zy2SvN_EhaJ0mAbLAei9J_ZYF_0XACNCzHdemDBO2AgeiVkO_NPtyg21NQDdIrCUvn20fEUIRAHAFYDApyGya9dKbZreXejPmy8FTAnhdIvSwbvbXfSZal535YLYcYCBK0ohYU4MFpFbUjZA1Z9wJ7MyUu3gahpg2N6nER-WMsmUh3pNxUjHvV3kXD6ExIRe898ZQHnkfyjNyhY9GQ719xPzdoJy6BItvS6wBIRhH2jTZ6w',
      },
    ],
    githubUrl: 'https://github.com/pramudithamaheesha/synkron',
    demoUrl: 'https://synkron.maheesh.me',
    nextProjectId: 'sellora',
  },
  sellora: {
    id: 'sellora',
    svcCode: 'PRJ-02',
    status: 'Shipped',
    title: 'Sellora',
    category: 'Enterprise SaaS & Identity Architecture',
    year: '2025',
    tagline: 'A multi-tenant e-commerce platform architected with strict row-level isolation, WSO2 Identity Server, and API Manager.',
    tags: ['ASP.NET Core', 'Azure', 'WSO2 IS', 'WSO2 APIM', 'PostgreSQL', 'Docker'],
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1UEQAwi2JS8_9slfH7TnSDfOGSAzSWPhk-26PVPl_ouDzCqIjpHLysQKFq7KR0zauR5NiaGxIA-u_T5H4McHQ-gHf0BJ-ZliOCSs1boT4Nx6g0cHTGJGnjEjIInWK7WwpeYRDVQ4Wu5yXfU3IL7sPT8GOMMsLrdk6mxuJao8u6XjhuD8UOhYwFN3Sy1gEUtgemJ3SoUk2h56UMrW1SRnTjrxpxwsLibgLFR3H4yGGq_Bqg97PWu7sJOPiw',
    serviceId: 'sellora-core-v2.1',
    runId: 'TENANT-PROD',
    overview: 'Sellora is an enterprise-grade multi-tenant platform designed to handle isolated brand storefronts under a shared infrastructure footprint. The primary focus was creating bulletproof tenancy boundaries, low-latency OAuth 2.0 authorization caching, and tiered API throttling using WSO2 products.',
    metrics: {
      accuracy: {
        value: '99.98%',
        label: 'Auth verification reliability',
        sub: '< 3.8ms latency',
        note: 'Benchmarked across 50,000 synthetic auth challenges',
      },
      economics: {
        value: '$0.0003',
        label: 'per auth handshake',
        badge: 'Enterprise Grade',
        model: 'In-memory JWKS cache + WSO2 IS',
        note: 'Eliminated remote token introspect network calls',
      },
      ownership: {
        value: 'Lead Architect',
        label: 'Identity & Backend',
        note: 'Designed multi-tenant data tier & API gateway policies',
      },
    },
    cards: {
      problem: {
        title: 'Cross-Tenant Isolation',
        text: 'In shared SaaS databases, a single missed WHERE clause can leak customer data across competitors. We needed systematic, compiler-enforced data partitioning that developers could not accidentally bypass.',
        highlight: 'Strict Schema & Row Isolation',
        metric: 'Zero cross-tenant data leakage',
      },
      solution: {
        title: 'Federated Gateway & Claims',
        text: 'Integrated WSO2 API Manager as the reverse proxy gateway. JWT tokens carry encrypted tenant claims that are verified at the gateway and injected into EF Core global query filters automatically.',
        highlight: 'Decentralized JWT validation',
        metric: '4x faster throughput than introspect calls',
      },
      security: {
        title: 'Granular Role-Based Access',
        text: 'Configured WSO2 Identity Server to manage federated single sign-on (SSO), multi-factor authentication (MFA), and fine-grained OAuth scopes across vendor and administrator roles.',
        highlight: 'Full OIDC compliance',
        metric: '900s token lifespan with sliding refresh',
      },
      stack: {
        title: 'Production Infrastructure',
        tags: ['ASP.NET Core', 'Azure Container Apps', 'WSO2 IS', 'PostgreSQL', 'Docker'],
        highlight: '.NET 8 AOT compiled services',
        metric: 'Hosted on Azure with PostgreSQL pooling',
      },
    },
    keyTakeaways: [
      'Asymmetric JWT verification with local JWKS public-key caching delivers sub-millisecond auth latency.',
      'Entity Framework global query filters prevent tenant data leaks at the ORM layer, even if junior engineers omit tenant filters in queries.',
      'WSO2 APIM throttling policies successfully protect shared database pools from noisy tenant query spikes.',
    ],
    gallery: [
      {
        label: 'Management Console',
        title: 'Tenant Management & Sales Analytics',
        desc: 'Aggregated revenue performance, subscription tiers, and tenant provisioning.',
        image: 'https://lh3.googleusercontent.com/aida/AEtjO1UEQAwi2JS8_9slfH7TnSDfOGSAzSWPhk-26PVPl_ouDzCqIjpHLysQKFq7KR0zauR5NiaGxIA-u_T5H4McHQ-gHf0BJ-ZliOCSs1boT4Nx6g0cHTGJGnjEjIInWK7WwpeYRDVQ4Wu5yXfU3IL7sPT8GOMMsLrdk6mxuJao8u6XjhuD8UOhYwFN3Sy1gEUtgemJ3SoUk2h56UMrW1SRnTjrxpxwsLibgLFR3H4yGGq_Bqg97PWu7sJOPiw',
      },
      {
        label: 'Auth Federation',
        title: 'WSO2 Identity Provider Mapper',
        desc: 'OIDC claims routing, user store federation, and token exchange architecture.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8J1VWSEGHwZ86NbvbS4fkQFvlq--ntc5iZuxMBFQ2heDcfuLa4XQUN3ezaMOow_Sm7PLboslmBJF-68QOM9jeTytyVVFSbfhvlzBT7q4wm2K8LIq4_HyVF53hTSKkDbE4bIrNxFeJTrWKJjC4njf7DJqJOHQY0f7X-dWwK7eN4bxRAK_xA_2sKNr_GKW79pDlsQ577e_BY8i62jJNyXl2-WPBVZkwAMJ7dDMCcfFNr7C2pTmhuIm9OQ',
      },
    ],
    githubUrl: 'https://github.com/pramudithamaheesha/sellora',
    demoUrl: 'https://sellora.maheesh.me',
    nextProjectId: 'incidentiq',
  },
  incidentiq: {
    id: 'incidentiq',
    svcCode: 'PRJ-03',
    status: 'Deployed',
    title: 'IncidentIQ',
    category: 'Distributed Systems & Anomaly Diagnosis',
    year: '2025',
    tagline: 'Multi-agent incident diagnosis platform that correlates distributed logs and traces to detect probable root causes.',
    tags: ['FastAPI', 'LangGraph', 'PostgreSQL', 'OpenTelemetry', 'Vector DB', 'Prometheus'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWTKgI81kYEh7D0YB9NA4J9OR4fumku785Yz2vOplM4y0GLoFWTFFj7ErasSf_kMDC9i5kDVOg6DoeEzvS0yjGnTc7299Ac2O-1FTSLxeXx1C_o9fbkk0d2q8s81z2LQZx1_Hl0hsvPLOAK07S2D0uLqlz-R9jWA3wfRwrG0YcUeaNfUUSJdh7ROC2MuNrWPWE0EdHehQDO3xeyYXeuIHIwzvYYRxh6PvgvNCHCwZobDE9ZswvjLI-hA',
    serviceId: 'incidentiq-diag-v1.0',
    runId: 'RCA-7721',
    overview: 'When complex distributed microservices suffer an outage, on-call engineers receive alerts from 12 services simultaneously. IncidentIQ correlates OpenTelemetry trace spans, groups anomalous log clusters, and guides an agentic state machine to pinpoint the true causal defect.',
    metrics: {
      accuracy: {
        value: '91.4%',
        label: 'Top-3 root cause accuracy',
        sub: '+14% vs naive RAG',
        note: 'Tested across 400 real-world microservice fault injections',
      },
      economics: {
        value: '$0.012',
        label: 'per incident diagnosis',
        badge: 'Cost Efficient',
        model: 'LangGraph graph + vector search',
        note: 'Only anomaly windows are forwarded to LLM reasoning nodes',
      },
      ownership: {
        value: 'Creator',
        label: 'Systems & ML',
        note: 'Built telemetry ingestion and LangGraph state logic',
      },
    },
    cards: {
      problem: {
        title: 'Alert Storms & High MTTR',
        text: 'During downstream database connection pool exhaustion, cascading HTTP 504 timeouts trigger hundreds of red alerts, obscuring the primary failure point.',
        highlight: 'Automated signal-from-noise extraction',
        metric: '74% reduction in mean time to identify',
      },
      solution: {
        title: 'LangGraph Diagnostic DAG',
        text: 'Constructed an acyclic state graph: (1) Telemetry Ingest -> (2) Trace Topo Correlation -> (3) Anomaly Clustering -> (4) Hypothesis Validation -> (5) Remediation Draft.',
        highlight: 'Structured multi-agent reasoning',
        metric: '5-node state machine with backtrack support',
      },
      security: {
        title: 'Strict PII & Secret Scrubbing',
        text: 'Before logs enter vector embeddings or LLM prompts, regex and entropy filters strip JWT tokens, database passwords, emails, and IP addresses.',
        highlight: 'Zero private data egress',
        metric: '100% regex sanitizer pass rate',
      },
      stack: {
        title: 'Engine Architecture',
        tags: ['FastAPI', 'LangGraph', 'PostgreSQL', 'OpenTelemetry', 'Vector DB', 'Prometheus'],
        highlight: 'Native async streaming responses',
        metric: 'Low-latency trace processing in Python',
      },
    },
    keyTakeaways: [
      'Correlating trace parent-child trees before looking at log strings is essential to eliminate false root cause assumptions.',
      'Vector similarity search alone fails at log diagnostics because similar error messages often stem from completely disparate architectural bugs.',
      'Structured output schemas prevent agent hallucinations during critical on-call triage scenarios.',
    ],
    gallery: [
      {
        label: 'Root Cause Visualizer',
        title: 'Incident Dependency Tree',
        desc: 'Topology tree tracing p99 latency spikes and failing thread pools.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWTKgI81kYEh7D0YB9NA4J9OR4fumku785Yz2vOplM4y0GLoFWTFFj7ErasSf_kMDC9i5kDVOg6DoeEzvS0yjGnTc7299Ac2O-1FTSLxeXx1C_o9fbkk0d2q8s81z2LQZx1_Hl0hsvPLOAK07S2D0uLqlz-R9jWA3wfRwrG0YcUeaNfUUSJdh7ROC2MuNrWPWE0EdHehQDO3xeyYXeuIHIwzvYYRxh6PvgvNCHCwZobDE9ZswvjLI-hA',
      },
    ],
    githubUrl: 'https://github.com/pramudithamaheesha/incidentiq',
    demoUrl: 'https://incidentiq.maheesh.me',
    nextProjectId: 'archguard',
  },
  archguard: {
    id: 'archguard',
    svcCode: 'PRJ-04',
    status: 'In Progress',
    title: 'ArchGuard',
    category: 'Static Analysis & Compiler Tooling',
    year: '2026',
    tagline: 'An automated architectural linter for Java and Spring Boot that catches layer and hexagonal boundary violations on pull requests.',
    tags: ['Java', 'Spring Boot', 'ArchUnit', 'ASM Bytecode', 'GitHub Actions', 'PostgreSQL'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASKNzeOZySw-f6lqjk8cOE8vvMy5EFVtEA8uUyME388W9t88Saim0ooDOBbNDIFObhNdJOc0rIJnPuQM5W7Vv81yrL7Wc_l3lKJ25o_F6qrijrSbnyFjWCZ2RmC18QIh6CUDRpJa-CJA3l7PsAkLMEwUblUnVRMRPFAVWIYY5r-Ha06YvFKmCq_m8ZGFLxqofgA4uGFa3yW3KZNPI0bDevxa65eiMTrRmoLvwTxtxAytBxPMRFZkL6EQ',
    serviceId: 'archguard-linter-v0.9',
    runId: 'LINT-3019',
    overview: 'As enterprise codebases grow, well-intentioned architectural boundaries erode. Controllers begin importing database entities directly, and domain layers become dependent on UI adapters. ArchGuard analyzes compiled JVM bytecode during CI to fail PRs that breach clean hexagonal rules.',
    metrics: {
      accuracy: {
        value: '100%',
        label: 'Deterministic rule verification',
        sub: '0 false positives',
        note: 'Tested on 24 open-source Spring Boot repositories',
      },
      economics: {
        value: '$0.00',
        label: 'Zero external cloud cost',
        badge: 'Local CI Runner',
        model: 'JVM Bytecode inspection in GitHub Action',
        note: 'Runs in < 4.2 seconds inside standard CI',
      },
      ownership: {
        value: 'Author',
        label: 'Independent Research',
        note: 'Developing custom rule DSL and Maven plugin',
      },
    },
    cards: {
      problem: {
        title: 'Architectural Erosion in Teams',
        text: 'Code reviews often miss illegal package imports. Over months, clean Onion and Hexagonal architectures degenerate into tightly coupled monoliths that cannot be refactored.',
        highlight: 'Continuous boundary enforcement',
        metric: 'Zero architecture drift over time',
      },
      solution: {
        title: 'Bytecode-Level Verification',
        text: 'Inspects compiled class files and dependency graphs using ASM bytecode visitors. Evaluates package imports against declared architectural contracts.',
        highlight: 'Compile-time enforcement',
        metric: 'Detects circular package dependencies instantly',
      },
      security: {
        title: 'Hermetic Execution',
        text: 'ArchGuard operates strictly on local class files inside the CI runner container. No source code or proprietary intellectual property ever leaves your infrastructure.',
        highlight: 'Complete privacy by design',
        metric: 'Zero external network calls required',
      },
      stack: {
        title: 'Tooling Stack',
        tags: ['Java 21', 'Spring Boot', 'ArchUnit', 'ASM Bytecode', 'GitHub Actions'],
        highlight: 'Lightweight Maven/Gradle plugin',
        metric: 'Under 50MB memory footprint',
      },
    },
    keyTakeaways: [
      'Bytecode inspection is 12x faster than source code AST parsing for static architecture rule checking.',
      'Enforcing architecture rules in CI prevents technical debt from compounding silently across multiple sprints.',
      'Clear, actionable error messages with visual dependency arrows reduce developer frustration during failed checks.',
    ],
    gallery: [
      {
        label: 'Rule Inspector',
        title: 'Hexagonal Violation Report',
        desc: 'Visual trace pinpointing illegal direct access from Controller to Persistence layer.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASKNzeOZySw-f6lqjk8cOE8vvMy5EFVtEA8uUyME388W9t88Saim0ooDOBbNDIFObhNdJOc0rIJnPuQM5W7Vv81yrL7Wc_l3lKJ25o_F6qrijrSbnyFjWCZ2RmC18QIh6CUDRpJa-CJA3l7PsAkLMEwUblUnVRMRPFAVWIYY5r-Ha06YvFKmCq_m8ZGFLxqofgA4uGFa3yW3KZNPI0bDevxa65eiMTrRmoLvwTxtxAytBxPMRFZkL6EQ',
      },
    ],
    githubUrl: 'https://github.com/pramudithamaheesha/archguard',
    demoUrl: 'https://archguard.maheesh.me',
    nextProjectId: 'synkron',
  },
};

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: 'evt-01',
    date: 'July 2025',
    evtId: 'SLIIT-SF-2025',
    title: 'SciFest 2025',
    organization: 'Sri Lanka Institute of Information Technology (SLIIT)',
    description: 'Developed an intelligent road sign recognition and alert system for low-visibility conditions using edge computer vision.',
    impact: 'Awarded 1st Place (Winner) among 40+ university innovation teams. Built a real-time YOLOv8 pipeline running on embedded hardware.',
    category: 'COMPETITION',
    badgeType: 'WINNER',
    statusBadge: 'Verified Award',
    tags: ['PyTorch', 'OpenCV', 'YOLOv8', 'Edge AI'],
    teamInfo: 'Team of 3 · Lead ML & Pipeline Engineer',
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1XI-rv7-PfJtGbXTACyQ40PSRAflMCUkFLIYMzobYskZIpFJGNClsC2JaP3_bQrKVSUEugtg-WgNXzSyctD6TS-0du4eXshyFgilzgQPhrNGRKLnoYmrfLCIEBt72wxePoCPihJxsJ8IshsAC9nQqoW4ifGWktu-sHd6dg0iO3dbDuApuYKqzFp5aPvbIGyLT38yHd0eQlS-PinAoLQEIWo0q8ULwyuXsjHOIY97ycJ1thgoFZ95QQirOXL',
  },
  {
    id: 'evt-02',
    date: 'September 2025',
    evtId: 'IC-AIESEC-25',
    title: 'IntelliCon 2025',
    organization: 'AIESEC in SLIIT',
    description: 'Engineered an AI grading platform that accurately parses handwritten mathematics and code exam papers, producing step-by-step scoring rubric feedback.',
    impact: 'Placed 1st Runner Up. Designed the asynchronous FastAPI backend and streaming LLM rubric evaluator with Next.js frontend.',
    category: 'COMPETITION',
    badgeType: '1ST RUNNER UP',
    statusBadge: 'Podium Finish',
    tags: ['Next.js', 'Claude API', 'FastAPI', 'OCR'],
    teamInfo: 'Team of 4 · Full-Stack & API Architect',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJ06xi8PLcalgtf2LpxQTUE0lIQJq07n80KRNJmli8-CI22zv0rRir-GjHdjCA-Ybnsw-tqhxQqX_B1N19pJipEOlh5gKcs-CAmdB_1deuPxWICL4kOL0bu04ST3E6mA2XHC7_QOFdVtr7IcKEE3hE5Ma4nGORD5TJYG8rRSzU2khE4TJt4LQrRYQugEu7517lqzcmrc0jOUYXMAw4i4jTFfSP9HEKyYPZylOWe0gvcgiC7OjR0Aceeg',
  },
  {
    id: 'evt-03',
    date: 'October 2025',
    evtId: 'MH-MSFT-25',
    title: 'MiniHackathon 2025',
    organization: 'Microsoft Club of SLIIT',
    description: 'Built GlobalNest, an end-to-end community support network connecting newly arrived students and migrants with verified regional mentors.',
    impact: 'Secured 2nd Runner Up. Designed the relational PostgreSQL schema, authentication flows, and real-time chat service.',
    category: 'COMPETITION',
    badgeType: '2ND RUNNER UP',
    statusBadge: 'Podium Finish',
    tags: ['React', 'PostgreSQL', 'Node.js', 'WebSockets'],
    teamInfo: 'Team of 3 · Backend Developer',
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1XI-rv7-PfJtGbXTACyQ40PSRAflMCUkFLIYMzobYskZIpFJGNClsC2JaP3_bQrKVSUEugtg-WgNXzSyctD6TS-0du4eXshyFgilzgQPhrNGRKLnoYmrfLCIEBt72wxePoCPihJxsJ8IshsAC9nQqoW4ifGWktu-sHd6dg0iO3dbDuApuYKqzFp5aPvbIGyLT38yHd0eQlS-PinAoLQEIWo0q8ULwyuXsjHOIY97ycJ1thgoFZ95QQirOXL',
  },
  {
    id: 'evt-04',
    date: 'September 2026',
    evtId: 'CF-IOT-26',
    title: 'InnovIoT, CodeFest 2026',
    organization: 'Faculty of Computing, SLIIT',
    description: 'Built a non-invasive ambient sensing framework using ESP32 CSI (Channel State Information) to detect human movement and occupancy through walls.',
    impact: 'Ranked in the Top 10 National Finalists. Wrote C++ firmware and WebSocket streaming pipeline for real-time signal spectrograms.',
    category: 'COMPETITION',
    badgeType: 'TOP 10',
    statusBadge: 'Finalist',
    tags: ['ESP32', 'C++', 'WebSocket', 'Signal Processing'],
    teamInfo: 'Team of 4 · Systems & Firmware Lead',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJ06xi8PLcalgtf2LpxQTUE0lIQJq07n80KRNJmli8-CI22zv0rRir-GjHdjCA-Ybnsw-tqhxQqX_B1N19pJipEOlh5gKcs-CAmdB_1deuPxWICL4kOL0bu04ST3E6mA2XHC7_QOFdVtr7IcKEE3hE5Ma4nGORD5TJYG8rRSzU2khE4TJt4LQrRYQugEu7517lqzcmrc0jOUYXMAw4i4jTFfSP9HEKyYPZylOWe0gvcgiC7OjR0Aceeg',
  },
  {
    id: 'evt-05',
    date: 'August 2026',
    evtId: 'ALGO-2026',
    title: 'Mini Algothon 2026',
    organization: 'SLIIT Computing Community',
    description: 'Fast-paced algorithmic problem-solving competition testing dynamic programming, graph traversal, and advanced data structures under strict time and memory limits.',
    impact: 'Ranked Top 10 out of 50+ competitive programming teams. Solved complex network flow and segment tree challenges in modern C++.',
    category: 'COMPETITION',
    badgeType: 'TOP 10',
    statusBadge: 'Top Ranked',
    tags: ['C++', 'Data Structures', 'Graph Algorithms', 'Dynamic Programming'],
    teamInfo: 'Team of 2 · Competitive Programmer',
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1XI-rv7-PfJtGbXTACyQ40PSRAflMCUkFLIYMzobYskZIpFJGNClsC2JaP3_bQrKVSUEugtg-WgNXzSyctD6TS-0du4eXshyFgilzgQPhrNGRKLnoYmrfLCIEBt72wxePoCPihJxsJ8IshsAC9nQqoW4ifGWktu-sHd6dg0iO3dbDuApuYKqzFp5aPvbIGyLT38yHd0eQlS-PinAoLQEIWo0q8ULwyuXsjHOIY97ycJ1thgoFZ95QQirOXL',
  },
  {
    id: 'evt-06',
    date: 'September 2026',
    evtId: 'WSO2-CONTRIB',
    title: 'WSO2 Open Source Contributions',
    organization: 'WSO2 Open Source Projects',
    description: 'Active contributions to WSO2 Identity Server and Micro Integrator repositories, resolving community issues and refining deployment guides.',
    impact: '4 pull requests merged into upstream production codebases and developer documentation, focusing on token introspect optimization and Carbon runtime guides.',
    category: 'OPEN_SOURCE',
    badgeType: 'OPEN SOURCE',
    statusBadge: 'Merged PRs',
    tags: ['Java', 'Carbon Platform', 'GitHub Actions', 'Documentation'],
    teamInfo: 'Independent Open-Source Contributor',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3_AwNQSEjpTdYa88upj9YPytZB7GpoEhBs27s5Mja3je_a37Pmbzq8BnxUGJoK7Wv37Ryg7z65YpgCUY0hsP6VbQiJsHEKoXun0Ut_qkw6CJ1qZ_j7L13V4th1ovJI0tkiAtE4YcMSjORz1ywn_WzwADVwV9Ow5CyuYIC5ngi0JoX3HWccVR53kYpiW_T2wWhZd8wo7t_opjYn3jdfnf7eEttOqpycqSvIoHBznb_jrsU3dotkvZjfg',
  },
  {
    id: 'evt-07',
    date: 'February 2026',
    evtId: 'MOZ-CLUB-26',
    title: 'Mozilla Campus Club of SLIIT',
    organization: 'Mozilla Community',
    description: 'Served on the core technical development committee, mentoring junior undergraduates in Linux tooling, Go concurrency, and open-source practices.',
    impact: 'Co-organized and led hands-on technical labs during CodeNight 2026, reaching over 200 student developers with practical systems programming exercises.',
    category: 'COMMUNITY',
    badgeType: 'COMMUNITY',
    statusBadge: 'Core Dev',
    tags: ['Go', 'Linux Systems', 'Mentorship', 'Workshops'],
    teamInfo: 'Technical Team Lead',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3_AwNQSEjpTdYa88upj9YPytZB7GpoEhBs27s5Mja3je_a37Pmbzq8BnxUGJoK7Wv37Ryg7z65YpgCUY0hsP6VbQiJsHEKoXun0Ut_qkw6CJ1qZ_j7L13V4th1ovJI0tkiAtE4YcMSjORz1ywn_WzwADVwV9Ow5CyuYIC5ngi0JoX3HWccVR53kYpiW_T2wWhZd8wo7t_opjYn3jdfnf7eEttOqpycqSvIoHBznb_jrsU3dotkvZjfg',
  },
];

export const ARTICLES_DATA: Article[] = [
  {
    id: 'wso2-saas',
    title: 'What WSO2 Identity Server and API Manager Taught Us While Building a Multi-Tenant SaaS',
    category: 'System Architecture',
    readTime: '13 min read',
    date: 'August 2026',
    excerpt: 'Hard-won lessons on multi-tenancy isolation, token validation bottlenecks, and preventing noisy neighbor degradation in enterprise deployments.',
    content: [
      {
        sectionTitle: 'The Reality of Enterprise Multi-Tenancy',
        paragraphs: [
          'When pitch decks discuss multi-tenancy, they usually describe a simple column named tenant_id in a PostgreSQL table. In the enterprise software landscape, that assumption unravels almost immediately.',
          'Enterprise customers mandate verifiable tenant isolation, customized single sign-on (SSO) with their own Azure AD or Okta identity providers, and guaranteed rate limits that shield their operations from noisy neighbors.',
          'While building Sellora, we opted to build on top of WSO2 Identity Server 7.0 and WSO2 API Manager rather than hand-rolling authentication microservices. Here are the core architectural challenges and production solutions we uncovered.',
        ],
      },
      {
        sectionTitle: '1. Eliminating the 28ms Remote Token Validation Tax',
        paragraphs: [
          'Initially, every microservice verified incoming bearer tokens by making an HTTP POST call to the WSO2 token introspection endpoint. With a service graph of 5 microservices per checkout operation, that added over 100ms of pure auth network overhead.',
          'The solution was moving to asymmetric JWT signing with local public certificate caching. Services fetch the JWKS key set once on startup and refresh it every 6 hours with a background goroutine. Signature verification now happens entirely in-memory in under 0.8ms, dropping our auth overhead to near zero.',
        ],
      },
      {
        sectionTitle: '2. Enforcing Isolation at the ORM Layer',
        paragraphs: [
          'Relying on developers to remember WHERE tenant_id = @id on every LINQ or SQL query is a recipe for catastrophic data leakage. Instead, we injected tenant claims from the verified JWT into Entity Framework Core Global Query Filters.',
          'Every database query automatically appends the cryptographic tenant boundary before reaching the PostgreSQL driver. Even if an engineer writes db.Orders.ToList(), the ORM enforces the boundary under the hood.',
        ],
      },
    ],
  },
  {
    id: 'go-api-gateway',
    title: 'What I Learned Building an AI-Powered API Gateway in Go',
    category: 'Concurrency & Systems',
    readTime: '9 min read',
    date: 'September 2026',
    excerpt: 'Benchmarking request throughput, dynamic streaming LLM reverse proxies, and zero-allocation token egress counters in Go.',
    content: [
      {
        sectionTitle: 'Why Standard Gateways Struggle with Generative AI',
        paragraphs: [
          'Traditional API gateways are optimized for requests that complete in under 50 milliseconds. Large Language Models invert this paradigm: a single inference request opens an HTTP Server-Sent Events (SSE) stream that stays active for 10 to 60 seconds while tokens stream back chunk by chunk.',
          'Standard reverse proxies quickly exhaust their thread pools or block buffers when hundreds of users establish concurrent streaming sessions. We built a purpose-specific proxy in Go to take advantage of its lightweight goroutine runtime.',
        ],
      },
      {
        sectionTitle: 'Goroutines and Zero-Allocation Streaming',
        paragraphs: [
          'Go effortlessly handled 10,000 concurrent streaming connections using under 300MB of resident RAM. By implementing a custom io.Writer wrapper around http.ResponseWriter, we intercepted raw byte streams to count token delimiters on-the-fly with zero heap allocations.',
          'When upstream providers hit rate limits (HTTP 429), our gateway automatically shifts pending streams to a fallback replica within 4 milliseconds without terminating the client connection.',
        ],
      },
    ],
  },
];

export const MAHEESHA_PROFILE = {
  name: 'Maheesha',
  handle: 'maheesh.me',
  role: 'Backend Systems Engineer',
  headline: "Hi, I'm Maheesha.",
  bio: 'I build backend systems that are secure, reliable, and easy to scale. Focused on distributed architectures, multi-tenant security, and developer infrastructure.',
  education: 'BSc (Hons) in Computer Science, SLIIT',
  educationShort: 'Computer Science @ SLIIT',
  location: 'Colombo, Sri Lanka',
  timezone: 'UTC+5:30',
  status: 'Open to 2026 Internships',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpLS_9axFjbgK376plAovBrB2riu1YCRrtzgshkvTTG4HMkEJM7udUy-XfMoXx54RpSSpbVu24c5miGXNtyXkkMq7VRyVV38b3REIlx665MWXEbHFyiJQP-44w0k2D8oGI1GOPeDuNaUXgiSmVwL9ykdN6w5_rfWbdWn3j7dobzvxwUMEpw3qNOOiIDwh1vW-nOBz2tNsPGkzH_DERpWkA8kwFOgyKlrncA55LALNyyVZ4_qQOQBDMdA',
  email: 'pramudithamaheesha@gmail.com',
  github: 'https://github.com/pramudithamaheesha',
  linkedin: 'https://linkedin.com/in/pramudithamaheesha',
  medium: 'https://medium.com/@pramudithamaheesha',
  contributions: 842,
  contributionsDelta: '+18% vs last year',
  stats: {
    mergedPRs: { count: 4, label: 'Merged Pull Requests', sub: 'WSO2 code repositories' },
    competitions: { count: 5, label: 'Competition Podiums', sub: 'National hackathons & algos' },
    projectsBuilt: { count: 4, label: 'Engineered Systems', sub: 'Distributed & developer tools' },
    articles: { count: 2, label: 'Technical Writeups', sub: 'Architecture & concurrency' },
  },
  now: {
    focus: 'Building ArchGuard (Java bytecode linter) & reading Designing Data-Intensive Applications (DDIA).',
    availability: 'Looking for a Software Engineering Internship (Backend / Distributed Systems) in 2026.',
  },
};
