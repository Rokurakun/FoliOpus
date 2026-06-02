// PERINGATAN: Jangan hapus tanda kutip ("") atau koma (,). Rusak satu karakter, web akan error.

const SITE_DATA = {
 
  meta: {
    title: 'FoliOpus Pro',
  },
 
  nav: {
    ctaText: "Let's Talk",
    links: [
      { label: 'About',  href: '#about',  sectionId: 'about'  },
      { label: 'Logs',   href: '#logs',   sectionId: 'logs'   },
      { label: 'Work',   href: '#work',   sectionId: 'work'   },
      { label: 'Stats',  href: '#stats',  sectionId: 'stats'  },
      { label: 'Skill',  href: '#skill',  sectionId: 'skill'  },
    ],
  },
 
  about: {
    tagLine:      'Product Manager · Digital Marketer',
    availability: 'Available for projects',
    firstName:    'Muhammad Devin',
    lastName:     'Yuwono',
    role:         'Growth Strategist & Product Leader',
    meta: [
      '📍 Jakarta, Indonesia',
      '5+ yrs experience',
      '12 products shipped',
    ],
    ctaPrimary:   { text: 'View Work',    href: '#work' },
    ctaSecondary: { text: 'Read Logs →',  href: '#logs' },
  },
 
  logs: {
    section: { num: '02', title: 'Logs', sub: 'Career milestones & field notes' },
    entries: [
      {
        featured: true,
        year: '2025', tagText: 'Product', tagClass: '',
        headline: 'Led B2B SaaS redesign, reducing churn by 34%',
        body: 'Spearheaded a full product experience overhaul across 3 core modules. Coordinated cross-functional squads of 11 engineers, 2 designers, and stakeholders across regions.',
      },
      {
        year: '2024', tagText: 'Growth', tagClass: 'dm',
        headline: 'Scaled paid acquisition from Rp 80M to Rp 420M/month',
        body: 'Built and optimized multi-channel performance funnels across Meta, Google, and TikTok Ads. Achieved 340% ROAS improvement within 6 months.',
      },
      {
        year: '2024', tagText: 'Award', tagClass: 'award',
        headline: 'Best Digital Campaign — Marketing Summit Indonesia',
        body: 'Recognized for the "Zero to Launch" growth campaign that acquired 28,000 users in 90 days pre-launch with zero paid budget.',
      },
      {
        year: '2023', tagText: 'Product', tagClass: '',
        headline: 'Shipped AI-powered analytics dashboard to 15,000 users',
        body: 'Owned roadmap, discovery, and GTM for a new analytics feature. Feature became the top requested capability in user NPS surveys.',
      },
      {
        year: '2022', tagText: 'Growth', tagClass: 'dm',
        headline: 'SEO overhaul: 0 to 180K monthly organic sessions',
        body: 'Designed and executed a 12-month content and technical SEO strategy. Grew domain authority from DA 14 to DA 51 without any link-buying.',
      },
    ],
  },
 
  work: {
    section: { num: '03', title: 'Work', sub: 'Selected projects & campaigns' },
    cards: [
      {
        wide: true, imgClass: 'work-img--1', label: 'Product', year: '2025',
        title: 'NestOps — B2B Project Management SaaS',
        desc: 'Full product lifecycle ownership from discovery to launch. Defined OKRs, led design sprints, and shipped 3 major feature sets serving 8,000+ teams.',
        tags: ['Roadmapping', 'Agile', 'User Research', 'GTM'],
      },
      {
        imgClass: 'work-img--2', label: 'Growth', year: '2024',
        title: 'Viralo Brand Launch Campaign',
        desc: '0→1 brand awareness campaign for a consumer fintech app. 2.4M impressions, 28K signups in 90 days.',
        tags: ['Meta Ads', 'Content Strategy', 'Analytics'],
      },
      {
        imgClass: 'work-img--3', label: 'SEO', year: '2023',
        title: 'Organic Growth Engine — TechCorp',
        desc: 'Built a full SEO content machine. 180K monthly sessions, 51 DA, zero link buying—pure topical authority.',
        tags: ['SEO', 'Content', 'Technical Audit'],
      },
      {
        imgClass: 'work-img--4', label: 'Analytics', year: '2023',
        title: 'AI Dashboard — Analytics Feature',
        desc: 'Owned discovery-to-launch for a predictive analytics module. Top-rated feature in quarterly NPS survey.',
        tags: ['Discovery', 'Wireframing', 'Data'],
      },
    ],
  },
 
  stats: {
    section: { num: '04', title: 'Stats', sub: 'Numbers that tell the story' },
    items: [
      { large: true, target: 340, suffix: '%', label: 'Average ROAS improvement across paid campaigns' },
      {              target: 12,  suffix: '',  label: 'Products shipped end-to-end'                   },
      {              target: 180, suffix: 'K', label: 'Monthly organic sessions at peak'              },
      {              target: 28,  suffix: 'K', label: 'Users acquired in 90-day launch sprint'        },
      {              target: 5,   suffix: '+', label: 'Years in product & growth'                     },
      {              target: 34,  suffix: '%', label: 'Churn reduction on flagship product'           },
    ],
    brandsLabel: 'Worked with',
    brands: ['NestOps', 'TechCorp', 'Viralo', 'Growthly', 'Launchpad.id'],
  },
 
  skill: {
    section: { num: '05', title: 'Skill', sub: 'The full toolkit' },
    groups: [
      {
        title: 'Product Management',
        items: [
          { name: 'Product Roadmapping',       pct: 95 },
          { name: 'User Research & Discovery', pct: 90 },
          { name: 'Agile / Scrum',             pct: 92 },
          { name: 'Wireframing & Prototyping', pct: 82 },
          { name: 'OKR / KPI Framework',       pct: 88 },
          { name: 'GTM Strategy',              pct: 86 },
        ],
      },
      {
        title: 'Digital Marketing',
        items: [
          { name: 'Performance Marketing',            pct: 93 },
          { name: 'SEO & Content Strategy',           pct: 89 },
          { name: 'Analytics & Data (GA4, Mixpanel)', pct: 88 },
          { name: 'Paid Social (Meta, TikTok)',        pct: 91 },
          { name: 'Email & CRM',                      pct: 80 },
          { name: 'Brand Strategy',                   pct: 84 },
        ],
      },
    ],
    tools: {
      title: 'Tools & Stack',
      tags: [
        'Figma', 'Notion', 'Jira', 'Amplitude',
        'Google Analytics 4', 'Mixpanel', 'Meta Ads Manager',
        'Ahrefs', 'HubSpot', 'Hotjar',
        'Miro', 'Linear', 'Slack', 'Looker Studio',
      ],
    },
  },
 
  contact: {
    eyebrow: "Let's Talk",
    title:   'Ready to build something great?',
    sub:     'Reach out for collaborations, consulting, or just a good conversation about product and growth.',
    links: [
      { icon: '✉',  href: 'mailto:hello@alexandra.com',        label: 'hello@alexandra.com',              external: false },
      { icon: 'in', href: 'https://linkedin.com',              label: 'linkedin.com/in/alexandra-reinholt', external: true  },
      { icon: '✆',  href: 'https://wa.me/6281234567890',       label: '+62 812-3456-7890',                 external: true  },
    ],
    footer: 'Jakarta, Indonesia · Open to remote & hybrid',
  },

  buy: {

    nav: {
      text: 'Buy — Rp 299.000',
    },

    section: {
      num:          '06 — Own It',
      headline:     ['Your story,', 'professionally', 'told.'],
      price:        'Rp 299.000',
      priceNote:    'One-time payment · Lifetime ownership',
      ctaText:      'Get This Portfolio',
      featuresLabel: "What's included",
      features: [
        'Full source code (HTML + CSS + JS)',
        'Edit konten via JS — tanpa sentuh HTML/CSS',
        '5 section dengan animasi halus',
        'Scroll-snap full-page navigation',
        'Contact modal dengan link kustom',
        'Stats counter & skill bar animated',
        'Fully responsive — mobile & desktop',
        'Panduan setup & kustomisasi',
      ],
    },

  },
};