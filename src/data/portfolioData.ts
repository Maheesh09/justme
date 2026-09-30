// Everything on the site comes from this file.
// Rule of thumb: if it is not on the CV, in a README, or in an article, it does not go here.

export type ProjectStatus = 'Live' | 'Completed' | 'In progress';

export interface Project {
  id: string;
  title: string;
  status: ProjectStatus;
  year: string;
  kind: string; // "Solo project" or "Team of 4"
  tagline: string;
  /** Put the file in public/images/projects/ and write the path here. Leave empty to show a clean placeholder. */
  cover?: string;
  stats: { value: string; label: string }[];
  problem: string;
  built: string;
  details: string[];
  lessons?: string[];
  stack: string[];
  links: { label: string; url: string }[];
  gallery: { src: string; caption: string }[];
  next: string;
}

export interface Achievement {
  id: string;
  date: string;
  title: string;
  org: string;
  result: 'Winner' | 'First runner up' | 'Second runner up' | 'Top 10' | 'Merged' | 'Member';
  category: 'Competitions' | 'Open source' | 'Community';
  description: string;
  /** Put the photo in public/images/achievements/ and write the path here. */
  image?: string;
  link?: { label: string; url: string };
}

export interface Article {
  id: string;
  title: string;
  date: string;
  readTime?: string;
  summary: string;
  cover?: string;
  url: string;
}

export const PROFILE = {
  name: 'Maheesha Pramuditha',
  firstName: 'Maheesha',
  handle: 'maheesh.me',
  headline: "Hi, I'm Maheesha.",
  bio: 'Third-year Computer Science student at SLIIT. I mostly build backend systems: APIs, event-driven services and the security that keeps them safe.',
  now: "Right now I'm building ArchGuard, a tool that checks architecture rules on every pull request.",
  university: 'Computer Science at SLIIT',
  location: 'Kelaniya, Sri Lanka',
  status: 'Open to internships',
  avatar: '/images/profile.jpg',
  email: 'pramudithamaheesha@gmail.com',
  github: 'https://github.com/Maheesh09',
  githubUser: 'Maheesh09',
  linkedin: 'https://www.linkedin.com/in/maheeshapramuditha',
  medium: 'https://medium.com/@pramudithamaheesha',
  /** Drop your latest CV here: public/cv/MAHEESHA_PRAMUDITHA_GENERAL_CV.pdf */
  cvUrl: '/cv/MAHEESHA_PRAMUDITHA_General_CV.pdf',
};

export const PROJECTS: Record<string, Project> = {
  synkron: {
    id: 'synkron',
    title: 'Synkron',
    status: 'Live',
    year: '2026',
    kind: 'Solo project',
    tagline: 'A GitHub App that keeps your documentation in sync with your code.',
    cover: '/images/projects/synkron.png',
    stats: [
      { value: '84%', label: 'accuracy across 106 test runs' },
      { value: '$0.0017', label: 'cost per run' },
    ],
    problem:
      'Docs fall behind the code. Someone renames an endpoint, nobody updates the README, and the next developer reads something that is no longer true.',
    built:
      'Synkron is a GitHub App. When you push a commit, a multi-agent pipeline reads what changed and opens a pull request with the updated documentation, ready for you to review.',
    details: [
      'Event-driven pipeline, so each commit is handled on its own without blocking anything else.',
      'Uses GitHub App authentication with short-lived installation tokens. No long-lived credentials are kept anywhere.',
      'A dashboard where you sign in with GitHub, install the app on your repos, watch pipeline runs and open the pull requests Synkron created.',
    ],
    stack: ['React', 'TanStack Start', 'FastAPI', 'MongoDB', 'Google Cloud Run', 'Vercel'],
    links: [{ label: 'View on GitHub', url: 'https://github.com/Maheesh09/Synkron' }],
    gallery: [],
    next: 'sellora',
  },

  sellora: {
    id: 'sellora',
    title: 'Sellora',
    status: 'Completed',
    year: '2026',
    kind: 'Team of 4',
    tagline: 'A multi-tenant sales platform for FMCG distributors, secured with WSO2 Identity Server and API Manager.',
    cover: '/images/projects/sellora.png',
    stats: [
      { value: '7', label: 'microservices' },
      { value: '2', label: 'WSO2 products integrated' },
    ],
    problem:
      'FMCG distributors have provinces, agencies, territories and sales reps who drive from shop to shop taking orders. Many companies share one platform, so each company must only ever see its own data.',
    built:
      'We built seven ASP.NET Core microservices that talk over Kafka. Every request is checked twice: once at the WSO2 API Manager gateway and again inside each service.',
    details: [
      'Users log in through WSO2 Identity Server using the Authorization Code flow with PKCE. The browser keeps the token in memory only.',
      'The company a user belongs to always comes from their token, never from the request. A global query filter adds it to every database query.',
      'Company admins can add staff from inside the app. The Organization service creates their logins through the SCIM2 API, so nobody has to open the Identity Server console.',
      'My main part was the order and payment core, with real-time agency sync and an audit log that protects records from being changed.',
    ],
    lessons: [
      'Decode a real token before writing backend code. Most of our early bugs were visible in the token itself.',
      'On Identity Server 7, check the role audience first whenever the roles claim comes back empty.',
      'Keep validating tokens inside every service, even behind a gateway. Our services had public URLs that could skip it.',
    ],
    stack: ['ASP.NET Core', 'Kafka', 'PostgreSQL', 'Azure App Service', 'WSO2 Identity Server', 'WSO2 API Manager', 'React'],
    links: [
      {
        label: 'Read the write-up',
        url: 'https://medium.com/@pramudithamaheesha/what-wso2-identity-server-and-api-manager-taught-us-while-building-a-multi-tenant-saas-3a4530ccf601',
      },
    ],
    gallery: [],
    next: 'incidentiq',
  },

  incidentiq: {
    id: 'incidentiq',
    title: 'IncidentIQ',
    status: 'Live',
    year: '2026',
    kind: 'Solo project',
    tagline: 'Finds the likely root cause of a production incident, with the log lines and commits to back it up.',
    cover: '/images/projects/IncidentIQ.png',
    stats: [
      { value: '5', label: 'agents working as a graph' },
      { value: 'Under 2 min', label: 'typical time to a report' },
    ],
    problem:
      'When something breaks in production, someone has to read the logs, check what shipped recently and work out which change caused it. Usually at a bad time, under pressure.',
    built:
      'Five agents run as a graph. Triage sets the time window, then log analysis and deploy correlation run in parallel. A synthesis agent ranks the hypotheses and a report agent sends the result.',
    details: [
      'Plain code runs before the model. Logs are parsed first, and only the extracted signals reach the LLM, never thousands of raw lines.',
      'Every hypothesis comes with a confidence score and links to a real log line or commit.',
      'If there are no logs for the incident window, it says so instead of guessing.',
      'Deployed on Google Cloud Run through GitHub Actions, with secrets in Secret Manager and alerts to Slack and PagerDuty.',
    ],
    stack: ['FastAPI', 'LangGraph', 'PostgreSQL', 'Gemini', 'Google Cloud Run', 'GitHub Actions'],
    links: [
      { label: 'View on GitHub', url: 'https://github.com/Maheesh09/IncidentIQ' },
      { label: 'API docs', url: 'https://incidentiq-384221529062.us-central1.run.app/docs' },
    ],
    gallery: [],
    next: 'archguard',
  },

  archguard: {
    id: 'archguard',
    title: 'ArchGuard',
    status: 'In progress',
    year: '2026',
    kind: 'Solo project',
    tagline: 'Checks that code respects its architecture layers and reports problems on pull requests.',
    cover: '/images/projects/ArchGuard.png',
    stats: [],
    problem:
      "Architecture rules usually live in someone's head. Over time a controller starts calling the database directly, and nobody notices until the code is hard to change.",
    built:
      'A REST API queues analysis jobs through RabbitMQ. Background workers clone the repository, pull out syntax trees through a Python sidecar and save any layer violations to PostgreSQL.',
    details: [
      "Working on cycle detection in the dependency graph using Tarjan's algorithm.",
      'Layer rules will be written in a simple YAML file per repository.',
      'Signed GitHub webhooks will post the architecture report straight onto the pull request.',
    ],
    stack: ['Java', 'Spring Boot', 'RabbitMQ', 'PostgreSQL', 'Python', 'Docker'],
    links: [{ label: 'View on GitHub', url: 'https://github.com/Maheesh09/ArchGuard' }],
    gallery: [],
    next: 'synkron',
  },
};

export const PROJECT_ORDER = ['synkron', 'sellora', 'incidentiq', 'archguard'];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'wso2',
    date: '2026',
    title: 'WSO2 open source',
    org: 'WSO2',
    result: 'Merged',
    category: 'Open source',
    description:
      'Four merged pull requests across product-is, docs-is and docs-mi. Fixed a wrong test path in the Identity Server contributor guide and inaccurate steps in the Micro Integrator and Identity Server docs.',
    image: '/images/achievements/wso2.png',
    link: {
      label: 'See the pull requests',
      url: 'https://github.com/pulls?q=is%3Apr+author%3AMaheesh09+org%3Awso2+is%3Amerged',
    },
  },
  {
    id: 'innoviot',
    date: 'Sep 2026',
    title: 'InnovIoT, CodeFest 2026',
    org: 'SLIIT',
    result: 'Top 10',
    category: 'Competitions',
    description: 'Built an ESP32 WiFi sensing system that detects presence, motion and stillness through walls.',
    image: '/images/achievements/innoviot.png',
  },
  {
    id: 'mozilla',
    date: 'Aug 2026',
    title: 'Mozilla Campus Club of SLIIT',
    org: 'Development team',
    result: 'Member',
    category: 'Community',
    description:
      "Helped run the CodeNight 2026 Linux and Go sessions, and built admin endpoints for the club's Certify backend with FastAPI and Supabase.",
    image: '/images/achievements/mozilla.jpeg',
  },
  {
    id: 'algothon',
    date: '2026',
    title: 'Mini Algothon 2026',
    org: 'SLIIT',
    result: 'Top 10',
    category: 'Competitions',
    description: 'Placed in the top 10 of 50+ teams in a timed algorithms and data structures contest.',
    image: '/images/achievements/minialgothon26.jpeg',
  },
  {
    id: 'minihackathon',
    date: 'Oct 2025',
    title: 'MiniHackathon 2025',
    org: 'MS Club of SLIIT',
    result: 'Second runner up',
    category: 'Competitions',
    description: 'Built GlobalNest, a platform that connects migrants with verified local mentors and a personal plan for settling in.',
    image: '/images/achievements/MiniHackathon25 1.jpg',
  },
  {
    id: 'intellicon',
    date: 'Sep 2025',
    title: 'IntelliCon 2025',
    org: 'AIESEC in SLIIT',
    result: 'First runner up',
    category: 'Competitions',
    description: 'Built an AI grading platform that marks handwritten answer scripts against a marking scheme and gives useful feedback.',
    image: '/images/achievements/Intellicon2.jpeg',
  },
  {
    id: 'scifest',
    date: 'Jul 2025',
    title: 'SciFest 2025',
    org: 'Faculty of Humanities and Sciences, SLIIT',
    result: 'Winner',
    category: 'Competitions',
    description: 'Built a road sign detection and alert system using machine learning and computer vision.',
    image: '/images/achievements/Scifest.jpeg',
  },
];

export const ARTICLES: Article[] = [
  {
    id: 'wso2-saas',
    title: 'What WSO2 Identity Server and API Manager Taught Us While Building a Multi-Tenant SaaS',
    date: 'Sep 2026',
    readTime: '13 min read',
    summary: 'Seven .NET microservices, two WSO2 products, four students and every 401 we hit along the way.',
    cover: 'https://miro.medium.com/v2/resize:fit:1200/1*AC3kfuDhhbgHUx_hyb_Hpg.png',
    url: 'https://medium.com/@pramudithamaheesha/what-wso2-identity-server-and-api-manager-taught-us-while-building-a-multi-tenant-saas-3a4530ccf601',
  },
  {
    id: 'peas',
    title: 'Before the Code: Using the PEAS Framework to Design an Autonomous Warehouse Robot',
    date: 'Aug 2026',
    summary: 'Planning an intelligent agent properly before writing any code.',
    cover: 'https://miro.medium.com/v2/resize:fit:1358/format:webp/1*B7tdwuCBOHmTnzCjHvAm1A.png',
    url: 'https://medium.com/@pramudithamaheesha/before-the-code-using-the-peas-framework-to-design-an-autonomous-warehouse-robot-30a49d1b8e1a',
  },
  {
    id: 'go-gateway',
    title: 'What I Learned Building an AI-Powered API Gateway in Go',
    date: 'Jun 2026',
    summary: 'An API gateway with an AI layer watching the traffic, and what building it taught me.',
    cover: 'https://miro.medium.com/v2/resize:fit:1358/format:webp/1*zZqKy1Xl3hU5Ej-nALX-4w.png',
    url: 'https://medium.com/@pramudithamaheesha/what-i-learned-building-an-ai-powered-api-gateway-in-go-9a7e6fc0ece7',
  },
  {
    id: 'vibe-coding',
    title: 'Vibe Coding: Innovation Hack or Developer Trap?',
    date: 'Mar 2026',
    summary: 'Some people ship apps in 20 minutes. Others clean up AI-generated code at 2 AM. Which side is right?',
    cover: 'https://miro.medium.com/v2/resize:fit:1358/format:webp/1*45pLIkWEFZuS5zB9jIbgWg.png',
    url: 'https://medium.com/@pramudithamaheesha/vibe-coding-innovation-hack-or-developer-trap-9754bdadccea',
  },
];

// Numbers shown in the stat row. Each one can be counted from the lists above or the CV.
export const STATS = {
  mergedPRs: 4,
  placements: ACHIEVEMENTS.filter((a) => a.category === 'Competitions').length,
  projects: PROJECT_ORDER.length,
  articles: ARTICLES.length,
};
