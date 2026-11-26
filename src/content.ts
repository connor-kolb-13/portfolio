// All site copy lives here so it can be edited without touching layout.
// Client names are never used; work is described by industry and outcome.

export type NodeKind = 'person' | 'agent' | 'store' | 'service' | 'code' | 'doc' | 'device' | 'external' | 'shield'
export type Side = 'l' | 'r' | 't' | 'b'

export type DiagramNode = {
  id: string
  label: string
  sub?: string
  kind: NodeKind
  x: number
  y: number
  w: number
  h: number
  highlight?: boolean
}

export type DiagramEdge = {
  from: string
  to: string
  fromSide: Side
  toSide: Side
  fromOffset?: number
  toOffset?: number
  via?: { x: number; y: number }[]
  step?: number
  badgeAt?: number
  style?: 'solid' | 'dashed' | 'muted'
  both?: boolean
}

export type DiagramSpec = {
  title: string
  caption: string
  alt: string
  width: number
  height: number
  zones?: { label: string; x: number; y: number; w: number; h: number; tone?: 'accent' }[]
  nodes: DiagramNode[]
  edges: DiagramEdge[]
  steps: string[]
}

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
  /** One line for the work list. */
  outcome: string
  /** The lede on the case page: situation, what I did, what changed. */
  summary: string
  results: { value: string; label: string }[]
  myPart?: string[]
  problem: string[]
  constraints: { title: string; body: string }[]
  builtLabel?: string
  built: { title: string; body: string; decision?: string }[]
  changedLabel?: string
  changed: string[]
  lesson?: string
  stack: string[]
  diagram?: DiagramSpec
}

export const profile = {
  name: 'Connor Kolb',
  short: 'CK',
  role: 'Data and AI engineer',
  location: 'West Palm Beach, FL',
  email: 'connor@phasezerolabsllc.com',
  linkedin: 'https://www.linkedin.com/in/connor-kolb-16b581155/',
  github: 'https://github.com/connor-kolb-13',
  studio: { name: 'PhaseZero Labs', url: 'https://phasezerolabsllc.com' },
}

export const hero = {
  kicker: 'Data and AI engineer · Founder, PhaseZero Labs',
  headline: ['I build practical AI', 'that changes how', 'businesses', 'actually run.'],
  emphasis: 'actually run.',
  lede:
    'By day I engineer data platforms, automation and AI agents for companies at Capital Data. On my own time I run PhaseZero Labs, a small studio that builds software for local operators, and I do pro bono work for the communities I belong to.',
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
  { value: 93, suffix: '', label: 'tools my studio’s AI assistant can use, every action behind a gate I control' },
  { value: 130, suffix: '', label: 'members in the student club I led and still build for, pro bono' },
]

export const cases: CaseStudy[] = [
  {
    slug: 'ai-agent-toolkit',
    index: '01',
    title: 'Putting AI agents to work on client delivery',
    short: 'AI agent toolkit',
    sector: 'Data and AI consulting',
    context: 'Capital Data, internal tooling',
    role: 'Designer and lead engineer',
    timeline: '2025 to present',
    outcome: 'Turned the groundwork engineers repeated on every engagement into agent skills the whole team reuses.',
    summary:
      'Consulting engineers rebuilt the same discovery notes, environment checks and documentation at the start of every engagement. I built an agent toolkit on the Claude Agent SDK and the Model Context Protocol, with a shared library of skills, so that groundwork is written once, reviewed like code and reused by everyone.',
    results: [
      { value: '688', label: 'pull requests merged in my first year, across client and internal work' },
      { value: 'Firm-wide', label: 'my documentation deck became the template the firm uses' },
    ],
    myPart: [
      'Architecture of the agent runtime',
      'The skills library and how skills get reviewed',
      'Utilities for data loading and environment snapshots',
      'The documentation standard',
    ],
    problem: [
      'Every engagement started with the same groundwork, done by hand.',
      'Engineers rebuilt discovery notes, environment checks and documentation for each new client. What one engineer learned stayed in their head or an old folder, so the next project paid the same setup cost again.',
    ],
    constraints: [
      { title: 'Every client is different', body: 'Each engagement runs on its own mix of cloud, data platform and tools, so anything built for one stack had to adapt to the next.' },
      { title: 'Client data stays put', body: 'Agents could only work through access the engineer already had, inside the client’s own environment.' },
      { title: 'Engineers stay accountable', body: 'Work goes out under an engineer’s name, so nothing an agent drafts ships without a person reviewing it.' },
      { title: 'Adoption, not a demo', body: 'A tool one person uses is a personal trick. It had to be simple enough for the whole team to pick up.' },
    ],
    built: [
      {
        title: 'An agent runtime for delivery work',
        body: 'Built on the Claude Agent SDK, with tools exposed through the Model Context Protocol, so an agent can work through a delivery task alongside the engineer who owns it.',
        decision: 'MCP keeps tool access separate from the agent, so supporting a new client stack means adding a connector, not rewriting the agent.',
      },
      {
        title: 'A shared skills library',
        body: 'Reusable, versioned skills any engineer can install. A workflow written once becomes a team habit, and improvements arrive through review like any other code.',
        decision: 'Small, single-purpose skills are easier to review, trust and reuse than one agent that tries to do everything.',
      },
      {
        title: 'Utilities that remove toil',
        body: 'A data loading utility and an environment snapshot tool that turn repetitive manual steps into a single command.',
      },
      {
        title: 'A documentation standard',
        body: 'A documentation deck that started on my engagements and became the template the firm uses.',
      },
    ],
    changed: [
      'Groundwork that was redone on every engagement is now a reusable, reviewed step.',
      'What one engineer figures out reaches the whole team as a skill, not tribal knowledge.',
      'Client documentation follows one firm standard instead of each engineer’s own format.',
    ],
    lesson:
      'The hard part of agents at work isn’t the model. It’s deciding what an agent may touch, keeping its output reviewable, and packaging good habits so a team actually adopts them. That’s the same work I want to do with small businesses.',
    stack: ['Claude Agent SDK', 'Model Context Protocol', 'Python', 'TypeScript', 'Git'],
    diagram: {
      title: 'How a delivery task runs through the toolkit',
      caption: 'Engineer in the loop at both ends',
      alt: 'An engineer starts a task with a skill. The delivery agent loads the skill, reaches client tools only through MCP connectors, and returns a draft that the engineer reviews.',
      width: 1080,
      height: 420,
      zones: [
        { label: 'Agent toolkit', x: 280, y: 18, w: 520, h: 250, tone: 'accent' },
        { label: 'Client environment', x: 836, y: 52, w: 226, h: 318 },
      ],
      nodes: [
        { id: 'eng', label: 'Engineer', sub: 'owns the task', kind: 'person', x: 30, y: 168, w: 200, h: 64 },
        { id: 'skills', label: 'Skills library', sub: 'versioned, reviewed', kind: 'code', x: 300, y: 54, w: 240, h: 64 },
        { id: 'agent', label: 'Delivery agent', sub: 'Claude Agent SDK', kind: 'agent', x: 300, y: 168, w: 240, h: 64, highlight: true },
        { id: 'mcp', label: 'MCP connectors', sub: 'one per tool', kind: 'service', x: 590, y: 168, w: 190, h: 64 },
        { id: 'repo', label: 'Repositories', sub: 'existing access', kind: 'code', x: 852, y: 92, w: 194, h: 58 },
        { id: 'data', label: 'Data platform', sub: 'existing access', kind: 'store', x: 852, y: 171, w: 194, h: 58 },
        { id: 'docs', label: 'Docs and tickets', sub: 'existing access', kind: 'doc', x: 852, y: 250, w: 194, h: 58 },
        { id: 'review', label: 'Draft for review', sub: 'change or document', kind: 'doc', x: 300, y: 318, w: 240, h: 64 },
      ],
      edges: [
        { from: 'eng', to: 'agent', fromSide: 'r', toSide: 'l', step: 1 },
        { from: 'skills', to: 'agent', fromSide: 'b', toSide: 't', step: 2 },
        { from: 'agent', to: 'mcp', fromSide: 'r', toSide: 'l', step: 3 },
        { from: 'mcp', to: 'repo', fromSide: 'r', toSide: 'l', style: 'muted' },
        { from: 'mcp', to: 'data', fromSide: 'r', toSide: 'l', step: 4 },
        { from: 'mcp', to: 'docs', fromSide: 'r', toSide: 'l', style: 'muted' },
        { from: 'agent', to: 'review', fromSide: 'b', toSide: 't', step: 5 },
        { from: 'review', to: 'eng', fromSide: 'l', toSide: 'b', step: 6 },
      ],
      steps: [
        'The engineer picks a skill and starts a task.',
        'The agent loads that skill’s reviewed instructions.',
        'It reaches tools only through MCP connectors.',
        'Connectors use access the engineer already has in the client environment.',
        'The work comes back as a draft, never a finished change.',
        'The engineer reviews, edits and ships it.',
      ],
    },
  },
  {
    slug: 'bank-data-platform',
    index: '02',
    title: 'A governed data hub, built inside a bank’s walls',
    short: 'Bank data platform',
    sector: 'Financial services',
    context: 'Capital Data, for a regional bank',
    role: 'Data engineer, design to production',
    timeline: '2025',
    outcome: 'Designed, built and ran a data hub entirely on a regional bank’s own locked-down infrastructure.',
    summary:
      'A regional bank wanted its data in one governed place, but nothing could leave its network and every service had to pass its identity and backup controls. I designed the hub, got the bank’s sign-off, then built and ran it on the bank’s own platform through its first production run, with every infrastructure change made from code.',
    results: [],
    myPart: [
      'The architecture the bank approved',
      'Build and operation on the bank’s platform',
      'Fixing Kerberos and backup permissions',
      'The Ansible collection behind every change',
    ],
    problem: [
      'The bank needed its data in one governed place, without any of it leaving the bank.',
      'A new platform had to live inside the bank’s own environment, under the same identity, access and backup rules as everything else it runs.',
    ],
    constraints: [
      { title: 'Nothing leaves the network', body: 'The hub had to run on the bank’s own infrastructure, with no managed cloud service to lean on.' },
      { title: 'Enterprise identity', body: 'Services authenticate through Kerberos, so the platform had to work with the bank’s identity setup, not around it.' },
      { title: 'Backups are non-negotiable', body: 'The bank’s enterprise backup system had to protect the hub, which meant getting service permissions exactly right.' },
      { title: 'Change control', body: 'In a bank, a change made by hand on a server is a change nobody can review or repeat.' },
    ],
    built: [
      {
        title: 'A design the bank signed off on',
        body: 'Mapped sources, access rules and recovery needs into an architecture the bank’s own team reviewed and approved before anything was built.',
        decision: 'In a regulated environment, approval up front is cheaper than rework later, and it gave the bank’s team ownership of the design.',
      },
      {
        title: 'A hub on the bank’s own platform',
        body: 'Built and ran the hub on the bank’s infrastructure through its first production run, and fixed the Kerberos and backup permissions that stood in the way.',
      },
      {
        title: 'Every change from code',
        body: 'Wrote a reusable Ansible collection, so servers are configured from reviewed code and can be rebuilt the same way every time.',
        decision: 'Automation turns a risky manual change into something the bank can read, approve and repeat.',
      },
    ],
    changed: [
      'The bank has one governed home for its data, inside its own walls.',
      'Identity and backup controls cover the new platform like everything else the bank runs.',
      'Infrastructure changes ship as reviewed code instead of one-off console work.',
    ],
    lesson:
      'Working inside a customer’s environment means their rules are the design constraints. Learning those rules early, and writing them into the design they sign, is what kept this project moving.',
    stack: ['Ansible', 'Kerberos', 'Enterprise backup', 'Python', 'SQL'],
    diagram: {
      title: 'The hub and the controls around it',
      caption: 'Everything runs inside the bank’s network',
      alt: 'Inside the bank network, source systems load into the data hub, which teams use for reporting. Kerberos authenticates services, enterprise backup protects the hub and an Ansible collection configures the servers.',
      width: 1060,
      height: 420,
      zones: [
        { label: 'Bank network', x: 14, y: 14, w: 1032, h: 392, tone: 'accent' },
        { label: 'Data hub', x: 330, y: 76, w: 380, h: 284 },
      ],
      nodes: [
        { id: 'src', label: 'Source systems', sub: 'inside the bank', kind: 'store', x: 44, y: 108, w: 230, h: 64 },
        { id: 'ansible', label: 'Ansible collection', sub: 'every change from git', kind: 'code', x: 44, y: 288, w: 230, h: 64 },
        { id: 'ingest', label: 'Load jobs', sub: 'scheduled', kind: 'service', x: 352, y: 108, w: 336, h: 64 },
        { id: 'hub', label: 'Governed data store', sub: 'one home for the data', kind: 'store', x: 352, y: 252, w: 336, h: 72, highlight: true },
        { id: 'krb', label: 'Kerberos', sub: 'identity for every service', kind: 'shield', x: 762, y: 92, w: 256, h: 62 },
        { id: 'backup', label: 'Enterprise backup', sub: 'protects the hub', kind: 'shield', x: 762, y: 196, w: 256, h: 62 },
        { id: 'bi', label: 'Reporting', sub: 'one trusted copy', kind: 'service', x: 762, y: 300, w: 256, h: 62 },
      ],
      edges: [
        { from: 'src', to: 'ingest', fromSide: 'r', toSide: 'l', step: 1 },
        { from: 'ingest', to: 'hub', fromSide: 'b', toSide: 't', step: 2 },
        { from: 'hub', to: 'bi', fromSide: 'r', toSide: 'l', fromOffset: 18, step: 3 },
        { from: 'krb', to: 'ingest', fromSide: 'l', toSide: 'r', style: 'dashed', step: 4 },
        { from: 'hub', to: 'backup', fromSide: 'r', toSide: 'l', fromOffset: -18, style: 'dashed', step: 5 },
        { from: 'ansible', to: 'hub', fromSide: 'r', toSide: 'l', step: 6 },
      ],
      steps: [
        'Source systems load into the hub on a schedule, without leaving the network.',
        'Loads land in one governed store.',
        'Teams report from that single, trusted copy.',
        'Every service authenticates through the bank’s Kerberos setup.',
        'The bank’s enterprise backup system protects the hub.',
        'Servers are configured from a reviewed Ansible collection, never by hand.',
      ],
    },
  },
  {
    slug: 'nexus',
    index: '03',
    title: 'Nexus: an AI chief of staff with a gate on every action',
    short: 'Nexus',
    sector: 'Small business operations',
    context: 'PhaseZero Labs, my own studio',
    role: 'Founder, architect and sole engineer',
    timeline: '2026 to present',
    outcome: 'An AI chief of staff and an agent build team that run a one-person studio, inside limits the owner sets.',
    summary:
      'A one-person studio still has to sell, deliver, schedule and bill like a firm. I built Nexus, the studio’s own platform, with an AI chief of staff that works across email, calendar, documents and the books. One gate decides which actions it may take alone and which wait for me, and software work runs through a loop where one AI model builds and another checks.',
    results: [
      { value: '93', label: 'tools the assistant can use across email, calendar, documents, CRM and finance' },
      { value: '6', label: 'kinds of action on a trust dial, from internal edits to moving money' },
      { value: '68', label: 'tickets run through the build-and-verify loop so far' },
    ],
    myPart: [
      'Product, architecture and all of the code',
      'The trust dial and the action gate',
      'The agent build loop and its rules',
      '16 architecture decision records',
    ],
    problem: [
      'Clients expect a firm. The studio is one person.',
      'Proposals, scheduling, email, invoices and the build work itself all compete for the same hours. Off-the-shelf assistants either do too little to matter or act with no limits, and no business owner can risk that with clients and money.',
    ],
    constraints: [
      { title: 'Clients and money are on the line', body: 'An assistant that can send email or move money needs limits the owner can see and set, not a promise to be careful.' },
      { title: 'One person reviews everything', body: 'Review time is the scarcest resource, so the system has to decide what truly needs me and hold the rest in one place.' },
      { title: 'Agents get things wrong', body: 'The first version proved it: 320 of its 349 scheduled jobs were failing. Every result needs a check that doesn’t come from the model that did the work.' },
      { title: 'Small-business costs', body: 'Loading all 93 tools on every call costs about 28,000 tokens, so the assistant carries its core tools and looks up the rest.' },
    ],
    built: [
      {
        title: 'One assistant with real tools',
        body: 'An AI chief of staff I reach by text, Slack or voice, with tools for email, calendar, documents, CRM, scheduling and finance, connected to Gmail, Google Calendar, QuickBooks, Notion and Slack.',
        decision: 'One assistant to talk to keeps it simple for the owner. More agents get added only when a measurement shows they help.',
      },
      {
        title: 'A trust dial and one action gate',
        body: 'Every action passes a single gate. Internal, reversible changes run on their own. Email, documents and invites wait for review until I dial them to automatic. Signatures always wait, and anything that moves money is locked behind a second sign-in.',
        decision: 'The gate fails closed: an action it doesn’t recognize waits for review instead of running. The owner, not the model, decides how much autonomy each kind of action earns.',
      },
      {
        title: 'A build loop where models check each other',
        body: 'Software work moves from an inbox to a written ticket, to a worker on its own branch, to a verifier from the other model family. Claude builds and Codex checks, or the reverse. A pass merges; a fail becomes a correction ticket. Deploys stay manual.',
        decision: 'A model grading its own work shares its own blind spots. A second model family catches what the first one misses.',
      },
      {
        title: 'Decisions on the record',
        body: '16 architecture decision records and a log of 44 numbered decisions keep the reasoning longer than any single conversation.',
      },
    ],
    changed: [
      'Studio admin and client work keep moving between my working hours, inside limits I set.',
      'Nothing reaches a client, a calendar or a bank account without passing the gate.',
      'The same build loop now ships my pro bono work, including the fishing club platform.',
      'It doubles as a playbook for other small businesses: start with one assistant, gate every action, earn autonomy.',
    ],
    lesson:
      'The first version named 29 agent roles and only about three ever got real code. Rebuilding around one assistant, one gate and growth I can measure taught me more about putting AI to work in a business than anything that worked the first time.',
    stack: ['Claude Agent SDK', 'Codex', 'TypeScript', 'Python', 'Supabase', 'Railway', 'Lovable'],
    diagram: {
      title: 'How the assistant decides what it may do alone',
      caption: 'Reads are free; every action goes through the gate',
      alt: 'The owner asks Phase, the AI chief of staff. Every action passes one gate. Internal changes run on their own, outside sends and signatures wait on the owner’s desk, and approved actions go out through the owner’s connected tools.',
      width: 1080,
      height: 440,
      zones: [
        { label: 'Nexus', x: 270, y: 14, w: 554, h: 412, tone: 'accent' },
        { label: 'Your tools', x: 850, y: 52, w: 214, h: 344 },
      ],
      nodes: [
        { id: 'ck', label: 'Owner', sub: 'text, Slack or voice', kind: 'person', x: 30, y: 170, w: 210, h: 64 },
        { id: 'records', label: 'Studio records', sub: 'CRM, docs, schedule', kind: 'store', x: 292, y: 56, w: 250, h: 64 },
        { id: 'phase', label: 'Phase', sub: 'AI chief of staff', kind: 'agent', x: 292, y: 170, w: 250, h: 64, highlight: true },
        { id: 'gate', label: 'Action gate', sub: 'trust dial, fails closed', kind: 'shield', x: 594, y: 170, w: 212, h: 64 },
        { id: 'desk', label: 'Desk', sub: 'waits for approval', kind: 'doc', x: 594, y: 330, w: 212, h: 64 },
        { id: 'gmail', label: 'Gmail', kind: 'external', x: 866, y: 88, w: 182, h: 56 },
        { id: 'cal', label: 'Google Calendar', kind: 'external', x: 866, y: 164, w: 182, h: 56 },
        { id: 'qb', label: 'QuickBooks', kind: 'external', x: 866, y: 240, w: 182, h: 56 },
        { id: 'notion', label: 'Notion', kind: 'external', x: 866, y: 316, w: 182, h: 56 },
      ],
      edges: [
        { from: 'ck', to: 'phase', fromSide: 'r', toSide: 'l', step: 1 },
        { from: 'phase', to: 'gate', fromSide: 'r', toSide: 'l', step: 2 },
        { from: 'gate', to: 'records', fromSide: 't', toSide: 'r', step: 3 },
        { from: 'gate', to: 'desk', fromSide: 'b', toSide: 't', step: 4 },
        { from: 'desk', to: 'ck', fromSide: 'l', toSide: 'b', via: [{ x: 135, y: 362 }], step: 5 },
        { from: 'gate', to: 'gmail', fromSide: 'r', toSide: 'l', style: 'muted' },
        { from: 'gate', to: 'cal', fromSide: 'r', toSide: 'l', step: 6 },
        { from: 'gate', to: 'qb', fromSide: 'r', toSide: 'l', style: 'muted' },
        { from: 'gate', to: 'notion', fromSide: 'r', toSide: 'l', style: 'muted' },
      ],
      steps: [
        'The owner asks in plain words, by text, Slack or voice.',
        'Phase plans the work. Reading is free; every action goes to the gate.',
        'Internal, reversible changes run on their own.',
        'Email, documents, invites and signatures wait on the desk. So does any action the gate doesn’t recognize.',
        'The owner approves. Anything that moves money also needs a second sign-in.',
        'Approved actions go out through the owner’s own connected tools.',
      ],
    },
  },
  {
    slug: 'bakery-storefront',
    index: '04',
    title: 'Taking a home bakery’s orders off Facebook',
    short: 'Bakery storefront',
    sector: 'Local food business',
    context: 'University team project for a real home bakery',
    role: 'Developer on a five-person Scrum team',
    timeline: 'Spring 2023',
    outcome: 'A five-person team build that moved a real home bakery’s orders out of Facebook comments and onto its own site.',
    summary:
      'A home bakery took every order through Facebook messages and comments, and orders got lost. As one of five developers on a university Scrum team, I helped build a storefront and an admin dashboard over three sprints, so customers order in one place and the owner runs the shop without a developer.',
    results: [
      { value: '3', label: 'sprints from clickable prototype to a working shop' },
      { value: '8', label: 'user stories, from the gallery to order tracking' },
      { value: '7', label: 'parts of the business the owner manages from one dashboard' },
    ],
    myPart: [
      'Site structure, conventions and the homepage',
      'Admin access and user management',
      'Order submission and admin order management',
      'Styling across the site',
    ],
    problem: [
      'Every order arrived as a Facebook comment or message.',
      'Orders got lost, customers couldn’t see what was available, and the owner had no single list of what to bake and for whom.',
    ],
    constraints: [
      { title: 'A non-technical owner', body: 'Products, the gallery and the availability calendar all had to be editable without touching code.' },
      { title: 'Three short sprints', body: 'Five students, one semester, with real stand-ups, burndown charts and sprint reviews.' },
      { title: 'Requirements by proxy', body: 'The owner was a teammate’s sister, so feedback came through that teammate at each sprint review.' },
      { title: 'Orders are money', body: 'A lost or duplicated order is a lost sale or a wasted bake, so every order needed an owner and a status.' },
    ],
    built: [
      {
        title: 'A shop customers can browse',
        body: 'Products, a gallery and an availability calendar on a mobile-first site, so customers see what they can order before they ask.',
      },
      {
        title: 'Ordering in one place',
        body: 'Sign-in, a cart and order submission, with every order saved to the database and tracked from new through completed.',
      },
      {
        title: 'An admin dashboard for the owner',
        body: 'One dashboard for the shop, gallery, about page, availability, contact responses, users and orders, hidden from anyone without the admin role.',
        decision: 'The owner, not a developer, should be the one adding holiday boxes for a busy weekend.',
      },
      {
        title: 'Tested end to end',
        body: 'A Puppeteer test walks the site the way a customer would, so a change can’t quietly break ordering.',
      },
    ],
    changed: [
      'Orders arrive in one place with a status, instead of scattered across comments and messages.',
      'The owner updates products, the gallery and availability without a developer.',
      'It was my first full client cycle: prototype, sprints, feedback and a working product.',
    ],
    lesson:
      'The version of the job that matters most is the simplest one: get the orders out of the comments. I see the same problem in almost every small business I talk to.',
    stack: ['JavaScript', 'Firebase Auth', 'Firestore', 'Firebase Hosting', 'Puppeteer', 'Scrum'],
    diagram: {
      title: 'One shop, one dashboard, one source of truth',
      caption: 'Runs entirely on Firebase',
      alt: 'Customers browse the storefront and sign in through Firebase Auth to place orders, which save to Firestore. The owner signs in to an admin dashboard that checks the admin role and edits the same data.',
      width: 1060,
      height: 420,
      zones: [{ label: 'Firebase', x: 262, y: 14, w: 784, h: 392, tone: 'accent' }],
      nodes: [
        { id: 'customer', label: 'Customer', sub: 'phone or laptop', kind: 'device', x: 30, y: 80, w: 200, h: 64 },
        { id: 'owner', label: 'Owner', sub: 'admin account', kind: 'person', x: 30, y: 290, w: 200, h: 64 },
        { id: 'shop', label: 'Storefront', sub: 'products, gallery, cart', kind: 'service', x: 290, y: 80, w: 250, h: 64 },
        { id: 'admin', label: 'Admin dashboard', sub: 'admins only', kind: 'service', x: 290, y: 290, w: 250, h: 64 },
        { id: 'auth', label: 'Firebase Auth', sub: 'sign-in and roles', kind: 'shield', x: 596, y: 185, w: 210, h: 64 },
        { id: 'db', label: 'Firestore', sub: 'five collections', kind: 'store', x: 846, y: 60, w: 180, h: 300, highlight: true },
      ],
      edges: [
        { from: 'customer', to: 'shop', fromSide: 'r', toSide: 'l', step: 1 },
        { from: 'shop', to: 'auth', fromSide: 'r', toSide: 't', fromOffset: 12, step: 2 },
        { from: 'shop', to: 'db', fromSide: 'r', toSide: 'l', fromOffset: -14, toOffset: -112, step: 3, badgeAt: 0.75 },
        { from: 'owner', to: 'admin', fromSide: 'r', toSide: 'l', step: 4 },
        { from: 'admin', to: 'auth', fromSide: 'r', toSide: 'b', fromOffset: 12, step: 5 },
        { from: 'admin', to: 'db', fromSide: 'r', toSide: 'l', fromOffset: -14, toOffset: 98, step: 6, badgeAt: 0.75 },
      ],
      steps: [
        'Customers browse products, the gallery and availability.',
        'They sign in, so every order belongs to someone.',
        'Orders save to Firestore with a status, from cart to completed.',
        'The owner signs in with an admin account.',
        'The dashboard checks the admin role before it opens.',
        'The owner edits the shop, gallery, availability and orders in one place.',
      ],
    },
  },
  {
    slug: 'fishing-team-platform',
    index: '05',
    title: 'Giving a student club the software of a real organization',
    short: 'Fishing team platform',
    sector: 'Community organization',
    context: 'Wisconsin Fishing Team, UW–Madison',
    role: 'Former president, volunteer engineer',
    timeline: '2021 to present',
    status: 'Pro bono · Live',
    outcome: 'Rebuilt the club I used to lead on a modern stack: signups, an officer roster, a member area and a real shop, all pro bono.',
    summary:
      'In a student club the officers change every year, and so do the spreadsheets, logins and group chats. Years after leading it, I rebuilt the club’s platform pro bono. It’s live now, with season signups, an officer roster, a members-only area and a shop that takes payments without card data ever touching the site.',
    results: [
      { value: 'Live', label: 'signups, roster, member area and shop all in production' },
      { value: '7 of 7', label: 'database tables locked down with row-level security' },
      { value: '61', label: 'components in the club’s own design system' },
    ],
    myPart: ['Product, design and all of the code', 'Signup and roster flows', 'The Square shop integration', 'The design system'],
    problem: [
      'Every year a new set of officers inherited a pile of logins.',
      'Signups, the roster, apparel orders and member information lived in spreadsheets, group chats and personal inboxes, so every handover lost something and new members slipped through.',
    ],
    constraints: [
      { title: 'Volunteers run it', body: 'Officers change every year and aren’t engineers, so the roster, settings and exports have to work without training.' },
      { title: 'Student data', body: 'Signups hold personal details, so access is locked down table by table, with abuse limits and an audit record.' },
      { title: 'No card data on the site', body: 'A club can’t take on payment compliance, so checkout happens on Square’s own hosted page.' },
      { title: 'Honest scope', body: 'Gear checkout, outings and group chat show as labeled placeholders until each has its own rules, instead of shipping half-built.' },
    ],
    built: [
      {
        title: 'Season signups that hold up',
        body: 'A join flow with duplicate protection, rate limits and an audit record, plus a welcome email for every new member.',
      },
      {
        title: 'An officer roster',
        body: 'Officers on an email allowlist manage member status and club settings, and export the roster to CSV.',
        decision: 'An allowlist is simple enough for volunteers to keep current and strict enough to keep student data private.',
      },
      {
        title: 'A members-only area',
        body: 'Verified members with an active signup this season get club resources, including the 46-slide kickoff deck.',
      },
      {
        title: 'A real shop',
        body: 'The club’s Square catalog and inventory power a cart, with checkout on Square’s hosted page, flat-rate shipping or free pickup, and a signed webhook that keeps the catalog current.',
        decision: 'Letting Square host checkout keeps card numbers off the site entirely.',
      },
    ],
    changed: [
      'New officers inherit a working system instead of a pile of logins.',
      'Signups, the roster and the shop live in one place the club controls.',
      'Members have one home for club resources, behind their own sign-in.',
    ],
    lesson:
      'Next come gear checkout, outings and group chat, each built once its rules are settled. The longer goal is a club operating system other student organizations can adopt.',
    stack: ['Next.js', 'React', 'Supabase', 'Square', 'Resend', 'Vercel'],
    diagram: {
      title: 'Who sees what, and where the data lives',
      caption: 'Access decided per table, per season',
      alt: 'Students join through a form that writes to Supabase. Members see resources while their signup is active, and allowlisted officers manage the roster. Supabase sends welcome emails through Resend, and the shop checks out on Square.',
      width: 1080,
      height: 420,
      zones: [
        { label: 'Club platform', x: 270, y: 14, w: 550, h: 392, tone: 'accent' },
        { label: 'Outside services', x: 836, y: 14, w: 230, h: 392 },
      ],
      nodes: [
        { id: 'student', label: 'Student', sub: 'shops and joins', kind: 'person', x: 30, y: 86, w: 210, h: 56 },
        { id: 'member', label: 'Member', sub: 'active this season', kind: 'person', x: 30, y: 228, w: 210, h: 56 },
        { id: 'officer', label: 'Officer', sub: 'email allowlist', kind: 'person', x: 30, y: 328, w: 210, h: 56 },
        { id: 'shop', label: 'Shop', sub: 'catalog and cart', kind: 'service', x: 296, y: 44, w: 236, h: 56 },
        { id: 'join', label: 'Join flow', sub: 'limits and audit', kind: 'service', x: 296, y: 128, w: 236, h: 56 },
        { id: 'area', label: 'Member area', sub: 'resources, kickoff deck', kind: 'doc', x: 296, y: 228, w: 236, h: 56 },
        { id: 'roster', label: 'Officer roster', sub: 'status, settings, CSV', kind: 'service', x: 296, y: 328, w: 236, h: 56 },
        { id: 'db', label: 'Supabase', sub: 'Postgres, Auth, RLS', kind: 'store', x: 594, y: 128, w: 204, h: 256, highlight: true },
        { id: 'square', label: 'Square', sub: 'hosted checkout', kind: 'external', x: 852, y: 44, w: 198, h: 56 },
        { id: 'resend', label: 'Resend', sub: 'welcome emails', kind: 'external', x: 852, y: 228, w: 198, h: 56 },
      ],
      edges: [
        { from: 'student', to: 'shop', fromSide: 'r', toSide: 'l', fromOffset: -14, style: 'muted' },
        { from: 'student', to: 'join', fromSide: 'r', toSide: 'l', fromOffset: 14, step: 1 },
        { from: 'join', to: 'db', fromSide: 'r', toSide: 'l', toOffset: -100, step: 2 },
        { from: 'member', to: 'area', fromSide: 'r', toSide: 'l', step: 3 },
        { from: 'area', to: 'db', fromSide: 'r', toSide: 'l', style: 'muted' },
        { from: 'officer', to: 'roster', fromSide: 'r', toSide: 'l', step: 4 },
        { from: 'roster', to: 'db', fromSide: 'r', toSide: 'l', toOffset: 100, style: 'muted' },
        { from: 'db', to: 'resend', fromSide: 'r', toSide: 'l', style: 'dashed', step: 5 },
        { from: 'shop', to: 'square', fromSide: 'r', toSide: 'l', both: true, step: 6, badgeAt: 0.62 },
      ],
      steps: [
        'Students join for the season through one form, with duplicate checks and rate limits.',
        'Each signup lands in Postgres with an audit record. Every table has row-level security.',
        'Members see club resources only while their season signup is active.',
        'Officers on the allowlist manage the roster and export it to CSV.',
        'New members get a welcome email through Resend.',
        'The shop reads Square’s catalog and checks out on Square’s own page; a signed webhook keeps it current.',
      ],
    },
  },
  {
    slug: 'condo-resident-app',
    index: '06',
    title: 'A resident app for my South Florida condo',
    short: 'Condo resident app',
    sector: 'Community association',
    context: 'My condo community, West Palm Beach area',
    role: 'Resident, volunteer designer and builder',
    timeline: '2026 to present',
    status: 'Pro bono · In design',
    outcome: 'Designing one place for neighbors to get building news, make requests and find what they need.',
    summary:
      'In my own building, board updates, maintenance requests and building information arrive by email, on paper and by phone, so residents miss what matters. I’m designing a simple phone app, pro bono, that puts it all in one place for residents of any age, and that the board’s volunteers can run without a developer.',
    results: [],
    myPart: ['Talking with residents and the board', 'Product design', 'The build and the handover'],
    problem: [
      'Residents miss what matters because it reaches them three different ways.',
      'Board news goes out by email, notices go up on paper, and maintenance starts with a phone call. Nobody has one place to check.',
    ],
    constraints: [
      { title: 'Residents of every age', body: 'It has to work for someone who rarely uses apps: large type, few steps, nothing to learn.' },
      { title: 'Volunteers run it', body: 'Board members change and aren’t technical, so posting news or closing a request has to take seconds.' },
    ],
    builtLabel: 'What I’m designing',
    built: [
      { title: 'News in one place', body: 'Board announcements and notices on residents’ phones, instead of split across email and paper.' },
      { title: 'Requests with a status', body: 'Maintenance requests residents can submit and follow, so nobody has to call twice.' },
      { title: 'Building information', body: 'Amenity details and building documents that are easy to find on a phone.' },
    ],
    changedLabel: 'Why it matters',
    changed: [
      'The board gets a low-cost option of its own instead of another vendor quote.',
      'It’s the kind of local, hands-on help I want to bring to more South Florida organizations.',
    ],
    lesson: 'Finish the design with residents and the board, then build it with the same build-and-verify loop as my other projects and hand it to the board to run.',
    stack: ['Mobile-first design', 'React', 'TypeScript', 'Supabase'],
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
    org: 'PhaseZero Labs',
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
    { label: 'Pro bono builds', detail: 'A live platform for my old club and a resident app for my condo, both unpaid.' },
  ],
}
