var SITE_DATA = {
  owner: {
    name: "Adhiem Nabil Maulana",
    tagline: "Crafting visual worlds where\nideas breathe and brands come alive.",
    location: "Makassar, Indonesia",
    timezone: "Asia/Makassar",
    avatar: "AN",
    bio: [
      "I'm a Creative Studio designer obsessed with the space between strategy and aesthetics. Every pixel I place carries intention. Every layout I build tells a story before a single word is read.",
      "With years of experience across branding, UI/UX, and digital storytelling, I bring the relentless work ethic of a craftsman and the instinct of a creative director — turning your vision into something people remember.",
    ],
    social: {
      email: "adhiemkeren999@gmail.com",
      linkedin: "https://linkedin.com/in/adhiemkeren",
      discord: "https://discord.gg/creativestudio",
      instagram: "https://instagram.com/aria.novera",
    },
  },
 
  intro: {
    eyebrow: "FoliOpus Premium",
  },
 
  nav: {
    links: [
      { label: "About",      href: "#about"        },
      { label: "Project",    href: "#project"      },
      { label: "Experience", href: "#experience"   },
      { label: "Contact",    href: "#contact"      },
    ],
    mobileLinks: [
      { label: "About",      href: "#about"        },
      { label: "Project",    href: "#project"      },
      { label: "Experience", href: "#experience"   },
      { label: "Contact",    href: "#contact"      },
    ],
  },
 
  sections: {
    about: {
      label:   "01 — How I Think",
      heading: ["Design is not", "decoration —", "it is decision."],
      headingItalicIndex: 1,
    },
    project: {
      label:    "02 — Selected Work",
      title:    ["Technical", "Work."],
      titleItalicIndex: 1,
    },
    experience: {
      label:    "03 — What I Build",
      title:    ["The craft", "behind the result."],
      titleItalicIndex: 1,
      titleItalicWord: "result.",
    },
    tools: {
      label:    "04 — The Tools I Use",
      title:    ["Behind", "the delivery."],
      titleItalicIndex: 1,
      titleItalicWord: "delivery.",
    },
    capabilities: {
      label:    "05 — Capabilities",
      title:    ["What I can", "structure, build,", "and ship."],
      titleItalicIndex: 2,
      titleItalicWord: "ship.",
    },
    contact: {
      label:      "06 — Contact",
      bigText:    ["Let's build", "something", "beautiful."],
      bigItalicIndex: 2,
      sub:        "You've seen the work. You know the craft.\nNow let's turn your next idea into something extraordinary.",
    },
  },
 
  footer: {
    cols: {
      sitemap: {
        title: "Sitemap",
        links: [
          { label: "About",      href: "#about"      },
          { label: "Project",    href: "#project"    },
          { label: "Experience", href: "#experience" },
          { label: "Contact",    href: "#contact"    },
        ],
      },
      social: {
        title: "Social",
        links: [
          { label: "Email ↗",     href: "mailto:adhiemkeren999@gmail.com", external: false },
          { label: "LinkedIn ↗",  href: "https://linkedin.com",            external: true  },
          { label: "Discord ↗",   href: "https://discord.gg/creativestudio", external: true },
          { label: "Instagram ↗", href: "https://instagram.com/aria.novera", external: true },
        ],
      },
      studio: {
        title:    "Studio",
        line1:    "FoliOpus Premium",
        line2:    "Creative Studio Portfolio",
      },
    },
  },
 
  achievements: {
    title: "Achievements & Recognition",
    subtitle: "Track Record",
    stats: [
      { num: "120+", label: "Projects Done"    },
      { num: "98%",  label: "Client Satisfied" },
      { num: "4yr",  label: "Experience"       },
    ],
    body: [
      "🏆 Winner — Asia Creative Design Awards 2023 (UI/UX Category)",
      "🌟 Featured in 'Top 50 Rising Designers' by DesignMag Indonesia",
      "🎓 Certified Google UX Designer & Adobe Creative Expert",
      "📦 Delivered 120+ projects across 15 countries without missing a single deadline",
      "💼 Trusted by startups, Fortune 500 agencies, and solo founders alike",
      "🚀 Average client retention rate: 87% — they always come back",
    ],
    badges: ["UI/UX", "Branding", "Motion", "Illustration", "Strategy", "Consulting"],
    btnText: "View Achievements ↗",
  },
 
  projects: [
    {
      id: "p1",
      tag: "Brand Identity",
      name: "Lumina Coffee Co.",
      desc: "Full visual identity system for an artisanal coffee brand entering international markets — from logo to packaging to digital touchpoints.",
      gradient: "linear-gradient(135deg, #7FFFD4 0%, #0ABFBC 100%)",
      emoji: "☕",
      ctaText: "View Case Study →",
      dialog: {
        title: "Lumina Coffee Co.",
        subtitle: "Brand Identity · 2024",
        body: [
          "Lumina needed more than a logo. They needed a language — one that spoke warmth, precision, and craft simultaneously. We built a visual ecosystem that lives across 40+ touchpoints.",
          "Starting from a monochromatic color study, we evolved the palette into a rich amber-and-cream signature that photographs beautifully on any surface.",
          "Deliverables included: full brand guidelines (68 pages), packaging design (6 SKUs), social media template kit (24 templates), and a responsive landing page.",
        ],
        badges: ["Logo Design", "Packaging", "Guidelines", "Web", "Typography"],
        stats: [
          { num: "68", label: "Pages of Guidelines" },
          { num: "6",  label: "Packaging SKUs"      },
          { num: "3",  label: "Months of Work"      },
        ],
      },
    },
    {
      id: "p2",
      tag: "UI/UX Design",
      name: "Vaultify Finance App",
      desc: "End-to-end UX design for a fintech app targeting Gen-Z investors. Designed from research to high-fidelity prototype with full design system.",
      gradient: "linear-gradient(135deg, #43B29D 0%, #0D2B27 100%)",
      emoji: "💳",
      ctaText: "View Case Study →",
      dialog: {
        title: "Vaultify Finance",
        subtitle: "UI/UX · Mobile App · 2024",
        body: [
          "Fintech design is brutal — you're designing for trust, speed, and clarity all at once, with users who will abandon the app if a single flow feels off.",
          "We ran 28 user interviews, 3 rounds of usability testing, and iterated through 12 major design versions before reaching a product that converted at 34% above industry average.",
          "The final design system contains 210+ components, covers 6 platforms, and is handed off with developer-ready Figma specs.",
        ],
        badges: ["Research", "Wireframes", "Prototyping", "Design System", "Handoff"],
        stats: [
          { num: "28",   label: "User Interviews" },
          { num: "210",  label: "Components"      },
          { num: "+34%", label: "Conversion Lift" },
        ],
      },
    },
    {
      id: "p3",
      tag: "Motion & Web",
      name: "Nexus Studio Reel",
      desc: "Animated brand motion reel and interactive web showcase for a creative production house. Full end-to-end creative direction.",
      gradient: "linear-gradient(135deg, #C8EDE7 0%, #7FFFD4 100%)",
      emoji: "🎬",
      ctaText: "View Case Study →",
      dialog: {
        title: "Nexus Studio Reel",
        subtitle: "Motion Design · Web · 2023",
        body: [
          "When Nexus Studio needed to attract high-budget clients, they needed a digital presence that matched the quality of their production work. Still frames weren't going to cut it.",
          "We directed and animated a 90-second brand reel that's been played over 2.1 million times. The interactive website rebuilt their entire client funnel from scratch.",
          "The project won a Webby Honoree mention and was featured in Awwwards' Site of the Day.",
        ],
        badges: ["Motion Design", "3D", "Web Dev", "Creative Direction", "Storyboard"],
        stats: [
          { num: "2.1M", label: "Reel Views"    },
          { num: "90s",  label: "Brand Film"    },
          { num: "1",    label: "Webby Honoree" },
        ],
      },
    },
    {
      id: "p4",
      tag: "Design System",
      name: "Orbit Design System",
      desc: "Built a scalable, accessible design system for a SaaS platform serving 200,000+ enterprise users across 8 product teams.",
      gradient: "linear-gradient(135deg, #0ABFBC 0%, #43B29D 100%)",
      emoji: "🔮",
      ctaText: "View Case Study →",
      dialog: {
        title: "Orbit Design System",
        subtitle: "Design System · SaaS · 2023",
        body: [
          "Orbit wasn't just a component library — it was a shared design language for 8 product teams who previously shipped inconsistent UIs that confused users and slowed engineers.",
          "Over 6 months, we audited 4,200 existing UI states, rationalized them into 186 components, and built documentation so thorough that onboarding time for new designers dropped by 60%.",
          "The system now governs every pixel in a product used daily by 200,000+ enterprise professionals.",
        ],
        badges: ["Figma", "Tokens", "Accessibility", "Documentation", "Components"],
        stats: [
          { num: "186",  label: "Components"   },
          { num: "200K", label: "Active Users"  },
          { num: "-60%", label: "Onboard Time" },
        ],
      },
    },
  ],
 
  buildItems: [
    {
      title: "Brand Identity Systems",
      desc: "From logo mark to motion guidelines, I build brand systems that are both timeless and trend-aware. Every element is intentional — nothing is decoration. I've built identity systems for startups, scale-ups, and cultural institutions.",
    },
    {
      title: "UI/UX Design & Prototyping",
      desc: "Research-first design: I conduct user interviews, synthesize findings into design decisions, and prototype with precision. My handoffs are so thorough developers finish implementation 40% faster.",
    },
    {
      title: "Motion Design & Animation",
      desc: "Motion is memory. I design animations that reinforce brand character — not just decoration, but communication. From micro-interactions to full brand films, I make things move with purpose.",
    },
    {
      title: "Digital Illustration & Art Direction",
      desc: "Custom illustration is the ultimate brand differentiator. I create bespoke illustration styles, icon sets, and editorial artwork that make your brand unmistakably yours.",
    },
    {
      title: "Creative Strategy & Consulting",
      desc: "Sometimes you don't need more pixels — you need clearer thinking. I offer creative strategy sessions for teams stuck on positioning, visual direction, or product storytelling.",
    },
    {
      title: "Web Design & Interactive Experiences",
      desc: "I design websites that work as hard as they look beautiful. From landing pages to full marketing sites, I balance conversion goals with aesthetic excellence.",
    },
  ],
 
  tools: {
    left: {
      title: "Design & Visual",
      items: [
        { icon: "🎨", name: "Figma",             type: "Primary Tool"    },
        { icon: "✨", name: "Adobe Illustrator",  type: "Vector"          },
        { icon: "📸", name: "Adobe Photoshop",    type: "Raster"          },
        { icon: "🎬", name: "After Effects",       type: "Motion"          },
        { icon: "🖼️", name: "Framer",             type: "Web Prototyping" },
        { icon: "🎭", name: "Spline",              type: "3D Design"       },
      ],
    },
    right: {
      title: "Workflow & Strategy",
      items: [
        { icon: "📋", name: "Notion",  type: "Documentation" },
        { icon: "🔄", name: "Linear",  type: "Project Mgmt"  },
        { icon: "💬", name: "Slack",   type: "Communication" },
        { icon: "🧠", name: "Miro",    type: "Ideation"      },
        { icon: "🎯", name: "Maze",    type: "User Testing"  },
        { icon: "📊", name: "Hotjar",  type: "Analytics"     },
      ],
    },
  },
 
  capabilities: [
    {
      icon: "🧠",
      title: "Design Thinking",
      desc: "I approach every brief as a problem to solve — not a canvas to fill. Deep empathy for the end user, obsessive attention to business goals.",
    },
    {
      icon: "⚡",
      title: "Fast & Precise Delivery",
      desc: "Deadlines are non-negotiable. I've never missed one. My process is refined to produce maximum quality in minimum time without cutting corners.",
    },
    {
      icon: "🌐",
      title: "Cross-Platform Expertise",
      desc: "Web, mobile, tablet, print, motion — I design once and think across every context from day one. No reinterpretation tax.",
    },
    {
      icon: "🎯",
      title: "Conversion-Aware Design",
      desc: "Beautiful is non-negotiable, but beautiful and ineffective is a failure. I design with conversion metrics in mind without sacrificing aesthetics.",
    },
    {
      icon: "🤝",
      title: "Collaborative by Nature",
      desc: "I integrate seamlessly into product teams, agencies, or solo founder setups. No ego, just craft. Your success is the scorecard.",
    },
    {
      icon: "🔬",
      title: "Research & Validation",
      desc: "I don't guess — I test. From guerrilla usability sessions to structured A/B frameworks, my decisions are backed by evidence, not assumption.",
    },
  ],
};