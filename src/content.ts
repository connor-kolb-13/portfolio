// All site copy lives here so it can be edited without touching layout.
// Client names are never used; work is described by industry and outcome.

export type VisualKind = 'agents' | 'pipeline' | 'studio' | 'storefront' | 'club' | 'resident'

export type CaseStudy = {
  slug: string
  index: string
  title: string
  short: string
  sector: string
  context: string
  role: string
  timeline: string
  status?: string
  tags?: string[]
  outcome: string
  problem: string[]
  built: { title: string; body: string }[]
  changed: string[]
  stack: string[]
  visual: VisualKind
}

export const profile = {
  name: 'Connor Kolb',
  short: 'CK',
  role: 'Data and AI engineer',
  location: 'West Palm Beach, FL',
  email: 'connor@phasezerolabsllc.com',
  linkedin: '',
  github: 'https://github.com/connor-kolb-13',
  studio: { name: 'Phase Zero Labs', url: 'https://phasezerolabsllc.com' },
}

export const hero = {
  kicker: 'Data and AI engineer · Founder, Phase Zero Labs',
  headline: ['I build practical AI', 'that changes how', 'businesses', 'actually run.'],
  emphasis: 'actually run.',
  lede:
    'By day I engineer data platforms, automation and AI agents for companies at Capital Data. On my own time I run Phase Zero Labs, a small studio that builds software for local operators, and I do pro bono work for the communities I belong to.',
}

export const capabilities = [
  'AI agents and assistants',
  'Workflow automation',
  'Data platforms',
  'Reporting and BI',
  'Web and mobile apps',
  'Infrastructure automation',
  'Hands-on AI training',
  'Documentation that sticks',
]

export const stats = [
  { value: 688, suffix: '', label: 'pull requests merged in my first year at Capital Data' },
  { value: 2, suffix: '', label: 'pro bono community builds under way right now' },
  { value: 130, suffix: '', label: 'members on the club platform I run pro bono' },
]

export const cases: CaseStudy[] = [
  {
    slug: 'ai-agent-toolkit',
    index: '01',
    title: 'An AI agent toolkit for client delivery',
    short: 'AI agent toolkit',
    sector: 'Data and AI consulting',
    context: 'Capital Data',
    role: 'Designer and lead engineer',
    timeline: '2025 to present',
    tags: ['AI agents', 'Automation'],
    outcome: 'Turned repeat delivery work into agent skills the whole team can reuse.',
    problem: [
      'Every engagement started the same way: engineers rebuilt the same discovery notes, environment checks and documentation by hand before any real work began.',
      'The knowledge lived in individual heads and old folders, so each new project paid the same setup cost again.',
    ],
    built: [
      {
        title: 'An agent runtime for delivery work',
        body: 'Built on the Claude Agent SDK and the Model Context Protocol, so agents can work through delivery tasks alongside the engineer who owns them.',
      },
      {
        title: 'A shared skills marketplace',
        body: 'Reusable agent skills that any engineer can install, so a good workflow written once becomes a team habit instead of a personal trick.',
      },
      {
        title: 'Small tools that remove toil',
        body: 'A data loading utility and an environment snapshot tool that take repetitive manual steps off engineers’ plates.',
      },
    ],
    changed: [
      'Setup work that used to be redone on every project is now a repeatable, reviewable step.',
      'Engineers share what works through skills, not tribal knowledge.',
    ],
    stack: ['Claude Agent SDK', 'MCP', 'Python', 'TypeScript', 'Git'],
    visual: 'agents',
  },
  {
    slug: 'bank-data-platform',
    index: '02',
    title: 'A data platform built inside a bank',
    short: 'Bank data platform',
    sector: 'Financial services',
    context: 'Capital Data, for a regional bank',
    role: 'Engineer, design through handover',
    timeline: '2025',
    tags: ['Data platform', 'Security'],
    outcome: 'Designed, built and ran a data hub on the bank’s own locked-down infrastructure.',
    problem: [
      'The bank needed its data in one governed place, but nothing could leave its environment, and every service had to respect strict identity and backup controls.',
    ],
    built: [
      {
        title: 'A design the customer signed off on',
        body: 'Mapped sources, access rules and recovery needs into an architecture the bank’s own team reviewed and approved before a line of code shipped.',
      },
      {
        title: 'A platform on their terms',
        body: 'Built and operated the hub entirely on the bank’s own platform, working within Kerberos authentication and enterprise backup permissions instead of around them.',
      },
      {
        title: 'Automation for the boring parts',
        body: 'Infrastructure changes run from code through a reusable Ansible collection, so rebuilds are predictable and reviewable.',
      },
    ],
    changed: [
      'The bank got a single governed home for its data without loosening a single control.',
      'Changes ship through reviewed code rather than one-off console work.',
    ],
    stack: ['Ansible', 'Kerberos', 'Enterprise backup', 'Python', 'SQL'],
    visual: 'pipeline',
  },
  {
    slug: 'nexus',
    index: '03',
    title: 'Nexus: an AI team that runs a studio',
    short: 'Nexus',
    sector: 'Small business operations',
    context: 'Phase Zero Labs',
    role: 'Founder and architect',
    timeline: '2026 to present',
    tags: ['AI agents', 'Operations'],
    outcome: 'A one-person studio that plans, builds and reviews like a small team.',
    problem: [
      'A small studio cannot afford a project manager, a reviewer and an operations lead, yet clients still expect that level of care.',
    ],
    built: [
      {
        title: 'Specialist agents with clear lanes',
        body: 'Planning, building, review and operations each have an agent with its own responsibilities, tools and limits.',
      },
      {
        title: 'Decisions written down',
        body: 'Every design call lands in a decision log and architecture records, so the reasoning survives longer than any one conversation.',
      },
      {
        title: 'A human at every gate',
        body: 'Agents propose and prepare; nothing merges, deploys or reaches a client without my approval.',
      },
    ],
    changed: [
      'Client work moves forward between my working hours, and review happens before anything ships.',
      'The same system becomes the playbook I can teach other small businesses.',
    ],
    stack: ['Claude Code', 'GitHub', 'Supabase', 'Railway', 'TypeScript'],
    visual: 'studio',
  },
  {
    slug: 'bakery-storefront',
    index: '04',
    title: 'From Facebook orders to a real storefront',
    short: 'Bakery storefront',
    sector: 'Local food business',
    context: 'Client project',
    role: 'Developer and client lead',
    timeline: '2023',
    tags: ['Small business', 'Web'],
    outcome: 'Moved a home bakery off comment-thread orders and onto its own site.',
    problem: [
      'A growing bakery took every order through Facebook messages and comments. Orders got lost, customers could not see what was available, and the owner spent evenings on admin.',
    ],
    built: [
      {
        title: 'A mobile-first catalog',
        body: 'Products, prices and availability in one place customers could browse from their phones.',
      },
      {
        title: 'Order and feedback flows',
        body: 'Simple ordering, sign-in and a feedback form, backed by a database the owner could manage without help.',
      },
      {
        title: 'Weekly sessions with the owner',
        body: 'We met every week, shipped in short sprints and changed course based on what the owner actually needed.',
      },
    ],
    changed: [
      'Orders arrive in one place instead of scattered across messages.',
      'The owner runs the catalog without a developer in the loop.',
    ],
    stack: ['JavaScript', 'Firebase', 'HTML and CSS', 'Scrum'],
    visual: 'storefront',
  },
  {
    slug: 'fishing-team-platform',
    index: '05',
    title: 'A members platform for a 130-person club',
    short: 'Fishing team platform',
    sector: 'Community organization',
    context: 'Wisconsin Fishing Team',
    role: 'Former president, volunteer builder',
    timeline: '2021 to present',
    status: 'Pro bono · In progress',
    tags: ['Community', 'Pro bono'],
    outcome: 'Gave a student-run club the tools of a real organization, for free.',
    problem: [
      'Officers changed every year, and so did the spreadsheets. Gear reservations, apparel orders and sponsor info lived in group chats and personal inboxes.',
    ],
    built: [
      {
        title: 'A public site that recruits',
        body: 'Officer bios, the tournament schedule, a gallery, a contact form and an apparel shop with online checkout.',
      },
      {
        title: 'Member tools',
        body: 'Secure sign-in, rod and boat reservations and sponsor access, with admin screens so officers update content themselves.',
      },
      {
        title: 'What comes next',
        body: 'Member and officer portals on a shared design system, built to a standard other clubs could adopt.',
      },
    ],
    changed: [
      'New officers inherit a working system instead of a pile of logins.',
      'The club runs its shop and reservations without anyone paying for software.',
    ],
    stack: ['JavaScript', 'Firebase', 'Square', 'Design system'],
    visual: 'club',
  },
  {
    slug: 'condo-resident-app',
    index: '06',
    title: 'A resident app for a South Florida condo',
    short: 'Condo resident app',
    sector: 'Community association',
    context: 'My condo community, West Palm Beach area',
    role: 'Resident, volunteer designer and builder',
    timeline: '2026 to present',
    status: 'Pro bono · In design',
    tags: ['Community', 'Pro bono', 'Local'],
    outcome: 'Designing one place for neighbors to get news, requests and building info.',
    problem: [
      'Board updates, maintenance requests and building information were spread across email, paper and phone calls, so many residents missed what mattered.',
    ],
    built: [
      {
        title: 'Resident-first design',
        body: 'Announcements, maintenance requests, amenity info and documents in a phone app residents of any age can use.',
      },
      {
        title: 'A demo the board can react to',
        body: 'Clickable screens and a walkthrough video shared with the board, revised from their feedback.',
      },
      {
        title: 'Built to be handed over',
        body: 'Planned so volunteers on the board can run it after launch without a developer.',
      },
    ],
    changed: [
      'The board has a concrete, low-cost option on the table instead of another vendor quote.',
      'It is the kind of local, hands-on help I want to bring to more South Florida organizations.',
    ],
    stack: ['React', 'TypeScript', 'Supabase', 'Mobile-first design'],
    visual: 'resident',
  },
]

export const moreBuilds = [
  {
    title: 'Donna',
    kind: 'AI assistant',
    body: 'A voice and chat assistant that schedules, emails and remembers, with an iOS build in TestFlight.',
  },
  {
    title: 'Pick’em platform',
    kind: 'Sports app',
    body: 'Live scoreboards and tamper-proof pick handling for friend leagues, built to run many leagues at once.',
  },
  {
    title: 'Wedding website',
    kind: 'Client build',
    body: 'A guest site with RSVP tracking and an admin console the couple runs themselves.',
  },
  {
    title: 'Grudge',
    kind: 'In design',
    body: 'A crew versus crew group-chat game with swappable visual themes.',
  },
]

export const approach = [
  {
    title: 'Sit with the work',
    body: 'I start where the work happens: the inbox, the spreadsheet, the phone. The best AI project is usually the most annoying task nobody has time to fix.',
  },
  {
    title: 'Build the smallest thing that helps',
    body: 'A working tool this month beats a perfect platform next year. I ship something real, watch it get used and improve it from there.',
  },
  {
    title: 'Teach the team to own it',
    body: 'Every build ends with people who can run it, change it and explain it. Documentation and hands-on training are part of the job, not extras.',
  },
]

export const experience = [
  {
    org: 'Capital Data',
    role: 'Associate Data Engineer, Analytics and Automation Group',
    when: '2024 to present',
    body: 'Professional services delivery across data platforms, infrastructure automation, BI, web apps and AI agents, with 688 pull requests in my first year. My documentation deck became the firm standard. Started as an architecture intern and associate architect before moving into engineering.',
  },
  {
    org: 'Phase Zero Labs',
    role: 'Founder and President',
    when: 'Present',
    body: 'A West Palm Beach studio building full-stack web products and internal tools for small and mid-size operators.',
  },
  {
    org: 'MidWest Co-Packing',
    role: 'Information Technology Intern',
    when: '2023',
    body: 'Moved a small manufacturer onto a new ERP: migrated its data, wrote the process docs and trained the team to use it.',
  },
  {
    org: 'University of Wisconsin–Madison',
    role: 'BBA, Information Systems and Finance · Computer Science certificate',
    when: '2023',
    body: 'Led a 130-member club, supervised campus recreation programs and trained student staff along the way.',
  },
]

export const community = {
  quote:
    'The tools that big companies take for granted should reach the bakery, the club and the condo board too. That is the work I want to do more of, here in South Florida.',
  items: [
    { label: 'President, Wisconsin Fishing Team', detail: 'Ran a 130-member club, its budget and the fundraising for a team boat.' },
    { label: 'Student lead, campus recreation', detail: 'Recruited and trained 20 officials and ran tournaments for 200+ players.' },
    { label: 'Pro bono builds', detail: 'Club platform and condo resident app, both unpaid and in progress.' },
  ],
}
