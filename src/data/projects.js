export const projects = [
  {
    name: 'Northstar VSS',
    slug: 'northstar-vss',
    type: 'Production SaaS',
    role: 'Founder / Software Engineer',
    year: '2026',
    summary:
      'A fleet routing and daily operations platform for school bus operations, covering route planning, assignments, driver packets, and customer workspaces.',
    impact:
      'Built and sold to a school-bus company, then shaped around real dispatch workflows where operators need reliable daily coordination more than decorative software.',
    image: '/northstar-landing-hero.webp',
    logo: '/northstar-mark.png',
    websiteUrl: 'https://nsvss.com/',
    githubUrl: null,
    tags: [
      'TypeScript',
      'Fastify',
      'PostgreSQL',
      'PostGIS',
      'AWS Cognito',
      'Leaflet',
      'Docker',
    ],
    highlights: [
      'Designed a private, customer-facing operations workspace without exposing tenant data or source code.',
      'Modeled route packages, assignments, recurring operations, roster data, and live dispatch endpoints.',
      'Used Cognito, validation, and role-aware flows to keep authentication and dispatcher/customer access explicit.',
    ],
    caseStudy: {
      headline: 'Turning daily bus operations into a focused workspace',
      challenge:
        'Transportation teams were juggling route planning, assignment coordination, and driver packet cleanup across disconnected tools. The hard part was not drawing a route. It was making the next school day legible to dispatch, drivers, and operations staff.',
      constraints:
        'This is production customer software, so the portfolio needs to talk about architecture and outcomes without leaking code, customer data, or implementation secrets.',
      solution:
        'I built the platform around a TypeScript/Fastify API, a PostgreSQL/PostGIS-ready data model, Cognito-backed authentication, and a dispatcher console using Leaflet for route-oriented workflows. The product separates public marketing, customer workspace lookup, and authenticated operational tools.',
      outcome:
        'The work moved beyond a demo: it became a sold production application and a strong example of taking a real operational pain point from discovery to deployment.',
    },
  },
  {
    name: 'Big-Log Viewer',
    slug: 'big-log-viewer',
    type: 'Desktop utility',
    role: 'Software Engineer',
    year: '2026',
    summary:
      'A local desktop-style viewer for multi-gigabyte HTML log files that would crash or hang normal browsers.',
    impact:
      'Unblocked IT professionals who needed to inspect 3 GB HTML logs quickly without asking them to change their whole workflow.',
    image: '/biglog-icon.png',
    websiteUrl: null,
    githubUrl: 'https://github.com/tm-LBenson/big-log-viewer',
    tags: ['Go', 'React', 'Vite', 'react-virtuoso', 'PowerShell', 'Bash'],
    highlights: [
      'Paged huge log files on demand instead of loading the entire document into browser memory.',
      'Embedded the Vite-built frontend in the Go binary so the tool could run locally at localhost.',
      'Solved unsigned distribution pragmatically with install scripts for an IT audience that already had developer tools.',
    ],
    caseStudy: {
      headline: 'Opening the log file that the browser could not survive',
      challenge:
        'A company had 3 GB HTML log files that standard browsers could not open reliably. The users did not need a generic log platform. They needed a focused way to inspect the exact artifact they already had.',
      constraints:
        'The tool had to stay memory-safe, run locally, support Windows and macOS users, and distribute without a polished code-signed installer.',
      solution:
        'I paired a Go command with an embedded React/Vite frontend. The backend indexes and serves log windows on demand, while the UI gives users infinite scrolling, search, and raw/rendered views without pulling the whole file into memory.',
      outcome:
        'The distribution constraint became a product decision: because the audience was made of IT professionals, install scripts were clearer and faster than pretending the project had enterprise installer infrastructure.',
    },
  },
  {
    name: 'nvimwiz',
    slug: 'nvimwiz',
    type: 'Developer tool',
    role: 'Software Engineer',
    year: '2026',
    summary:
      'A TUI wizard that installs Neovim and writes a modular, profile-driven configuration for people who want power without days of setup.',
    impact:
      'Turns Neovim onboarding from a blank-page configuration problem into a guided path with safe defaults and user-owned overrides.',
    image: '/nvimwiz-preview.png',
    websiteUrl: null,
    githubUrl: 'https://github.com/tm-LBenson/nvimwiz',
    tags: ['Go', 'Lua', 'TUI', 'Neovim', 'CLI tooling'],
    highlights: [
      'Stores user choices in a profile JSON and generates config from a catalog of features and choices.',
      'Installs binaries user-locally and avoids overwriting user-owned override files.',
      'Separates managed and integrated modes so users can adopt the wizard without surrendering their config.',
    ],
    caseStudy: {
      headline: 'Making Neovim feel approachable without hiding how it works',
      challenge:
        'A lot of developers are interested in Neovim, then bounce off the configuration cliff. The goal was to reduce setup friction while still respecting the fact that Neovim users want control.',
      constraints:
        'The tool needed to generate real configuration, stay understandable, avoid destructive writes, and leave room for users to keep customizing after the wizard finished.',
      solution:
        'I built a Go-based TUI around a catalog-driven architecture. Presets map to feature choices, the generated Lua stays modular, and user overrides live in a file the wizard will not replace.',
      outcome:
        'The project shows the kind of product thinking I like in developer tools: make the first run friendly, then make the second and third run predictable.',
    },
  },
  {
    name: 'Enterprise Identity Labs',
    slug: 'enterprise-identity-labs',
    type: 'Infrastructure and support engineering',
    role: 'Enterprise Engineer',
    year: '2025-present',
    summary:
      'Hyper-V, Linux, Active Directory, Azure tenant, and RapidIdentity lab work used to reproduce escalations and validate identity automation behavior.',
    impact:
      'Supports enterprise customers by turning ambiguous IAM, SSO, provisioning, directory sync, and automation issues into reproducible technical findings.',
    image: '/hyperv-lab.png',
    websiteUrl: null,
    githubUrl: null,
    tags: [
      'RapidIdentity',
      'IAM',
      'SSO',
      'Provisioning',
      'Hyper-V',
      'Linux',
      'Azure AD',
    ],
    highlights: [
      'Maintains local VM labs for AD, database, Linux, and joined Windows scenarios.',
      'Writes automations and scripts in RapidIdentity-specific tooling for enterprise identity workflows.',
      'Uses log analysis, reproduction, and configuration review to communicate root cause to customers, TAMs, Product, and Engineering.',
    ],
    caseStudy: {
      headline: 'Reproducing identity problems before recommending fixes',
      challenge:
        'Enterprise identity issues rarely arrive as neat bug reports. They show up as sync failures, SSO edge cases, provisioning surprises, or automation behavior that only makes sense in a customer-shaped environment.',
      constraints:
        'Customer data has to remain protected, and troubleshooting has to be precise enough for stakeholders who may include support, TAMs, product managers, engineers, and customer admins.',
      solution:
        'I use Hyper-V labs with Linux boxes, AD-style environments, Azure tenants, and product automations to recreate conditions safely. From there I can test assumptions, inspect logs, and document a repeatable path to resolution.',
      outcome:
        'The lab work makes support engineering more concrete: fewer guesses, cleaner handoffs, and better confidence when an issue needs product or engineering attention.',
    },
  },
  {
    name: 'AWS Demo Infrastructure',
    slug: 'aws-demo-infrastructure',
    type: 'DevOps / AI learning platform',
    role: 'DevOps Contractor / Instructor',
    year: '2023-present',
    summary:
      'AWS infrastructure and deployment workflows for a learning demo environment with static assets, EC2 services, reverse proxying, and AI-enabled workflows.',
    impact:
      'Improved release consistency for demo applications while supporting students learning full-stack development, debugging, APIs, Git, and deployment fundamentals.',
    image: '/aws-demo-infrastructure.png',
    websiteUrl: null,
    githubUrl: null,
    tags: [
      'AWS EC2',
      'S3',
      'CloudFront',
      'Route 53',
      'CloudFormation',
      'Docker',
      'Nginx',
      'Bedrock',
    ],
    highlights: [
      'Designed deployment paths for application code on EC2 and static assets on CloudFront/S3.',
      'Configured DNS, IAM permissions, Docker services, Nginx reverse proxying, and SSL/TLS.',
      'Supported Amazon Bedrock agent/model tuning and AI-enabled learning workflows.',
    ],
    caseStudy: {
      headline: 'Making demo infrastructure boring in the best way',
      challenge:
        'A teaching/demo environment needs to change quickly, but it still needs the boring parts of production: DNS, certificates, repeatable deploys, and clear recovery paths.',
      constraints:
        'The work had to support active instruction, student projects, and AI demos without turning every deployment into a hand-built ceremony.',
      solution:
        'I built AWS infrastructure with EC2, S3, CloudFront, Route 53, IAM, CloudFormation, Docker, Nginx, and SSL/TLS, then tied those pieces into deployment workflows that were easier to repeat.',
      outcome:
        'The project connects my software background with operational judgment: build the app, understand the platform, and teach the path clearly enough that someone else can follow it.',
    },
  },
];

export const skills = [
  {
    group: 'Identity and support engineering',
    items: [
      'RapidIdentity',
      'IAM',
      'SSO',
      'Provisioning',
      'Directory sync',
      'Escalations',
      'Root-cause analysis',
      'Log analysis',
    ],
  },
  {
    group: 'Languages and application work',
    items: [
      'JavaScript',
      'TypeScript',
      'Go',
      'Python',
      'Java',
      'SQL',
      'React',
      'Fastify',
      'REST APIs',
    ],
  },
  {
    group: 'Cloud, infrastructure, and data',
    items: [
      'AWS',
      'Docker',
      'Nginx',
      'Linux',
      'Hyper-V',
      'PostgreSQL',
      'MongoDB',
      'DynamoDB',
      'CloudFormation',
    ],
  },
];
