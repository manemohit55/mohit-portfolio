export const resumeDownloadUrl =
  "/files/Mohit_Mane_UIUX.pdf";

export const profile = {
  name: "Mohit Mane",
  role: "Lead UI/UX Designer",
  experience: "6.3+ Years Experience",
  availability: "Immediate Joiner",
  location: "Pune, Maharashtra, India",
  email: "mane.mohit55@gmail.com",
  phone: "+91 82081 50855",
  linkedin: "https://www.linkedin.com/in/mohit-mane/",
  legacyPortfolio: "https://mohit-mane.jimdosite.com/",
};

export const impactMetrics = [
  {
    label: "Customer Satisfaction Lift",
    value: 68,
    prefix: "+",
    suffix: "%",
    description:
      "Achieved on a flagship SaaS redesign at CodeBlaze through UX modernization and tighter collaboration loops.",
  },
  {
    label: "Booking Conversion Lift",
    value: 18,
    prefix: "+",
    suffix: "%",
    description:
      "Delivered for Sterling Resorts by restructuring package architecture and booking flow logic.",
  },
  {
    label: "User Journey Improvement",
    value: 60,
    prefix: "+",
    suffix: "%",
    description:
      "Delivered across four D2C brands by restructuring journeys and conversion-oriented flow architecture.",
  },
  {
    label: "Checkout Journey Speed",
    value: 36,
    prefix: "+",
    suffix: "% faster",
    description:
      "Reduced path-to-checkout time through navigation simplification and task-priority interaction design.",
  },
];

export const featuredProjects = [
  {
    id: "sterling-resorts",
    name: "Sterling Resorts",
    category: "Travel Booking + Enterprise Dashboard",
    problemSnippet:
      "Booking decision flow was fragmented and high-friction across package discovery and checkout.",
    outcomeSnippet:
      "Redesigned journey and package structure, improving conversion and booking confidence.",
    impact: "+18% booking conversion",
    tools: ["Figma", "Auto Layout", "Responsive Grids", "UX Workshops"],
  },
  {
    id: "trade-engine-online",
    name: "Trade Engine Online",
    category: "Ship Management SaaS",
    problemSnippet:
      "Legacy workflows were inconsistent across devices and hard to operate under time pressure.",
    outcomeSnippet:
      "Unified interaction patterns and scalable design system improved clarity and delivery quality.",
    impact: "Client Satisfaction Award 2024",
    tools: ["Figma", "Design System", "QA", "Stakeholder Reviews"],
    link: "https://www.navig8group.com/",
  },
  {
    id: "brantford",
    name: "Brantford",
    category: "Co-working / Real Estate",
    problemSnippet:
      "Users lacked clear comparison and decision support while exploring workspace options.",
    outcomeSnippet:
      "Restructured listings and detail flows improved decision speed and experience consistency.",
    impact: "Improved interaction quality and decision confidence",
    tools: ["Figma", "FigJam", "Azure DevOps", "Confluence"],
    link:
      "https://www.figma.com/design/qr5JCnvYxgSvVcBXXjSbIo/Co-working-office-Space--Brantford?node-id=0-1",
  },
  {
    id: "sorrentina",
    name: "Sorrentina",
    category: "D2C Brand + Design System",
    problemSnippet:
      "Brand storytelling and ecommerce usability were disconnected across digital touchpoints.",
    outcomeSnippet:
      "Built coherent brand-led design system and improved conversion-oriented purchase journey.",
    impact: "+17% customer retention",
    tools: ["Figma", "Brand Strategy", "Component System"],
    link:
      "https://www.figma.com/design/V7BWKwRo88yuTfHO2PyENZ/Soul-Chef-Web-App?node-id=0-1",
  },
  {
    id: "health-track-sg",
    name: "Health Track SG / Connected Life",
    category: "Healthcare Mobile Platform",
    problemSnippet:
      "Data-dense health views reduced readability and accessibility for critical user groups.",
    outcomeSnippet:
      "Reframed data and journeys for higher clarity, especially for elderly users.",
    impact: "Higher clarity in clinical decision journeys",
    tools: ["Figma", "R&D", "Data Visualization", "Accessibility"],
  },
  {
    id: "tax-buddi",
    name: "Tax Buddi",
    category: "Fintech Mobile App",
    problemSnippet:
      "Tax filing journey involved trust-sensitive steps with confusion in document and status handling.",
    outcomeSnippet:
      "Designed guided onboarding and tracking flow to reduce friction in financial decision points.",
    impact: "Reduced process friction in high-trust flow",
    tools: ["Figma", "Flow Optimization", "Prototyping"],
  },
];

export const allProjects = [
  {
    id: "sterling-resorts",
    title: "Sterling Resorts",
    role: "Lead UI/UX Designer",
    company: "Omni-Bridge Solutions",
    problem:
      "Booking journeys were fragmented across package discovery, eligibility understanding, and final checkout decisions.",
    constraints:
      "High conversion expectations, multi-device consistency, legacy content structure, and stakeholder alignment across business and operations.",
    uxProcess:
      "Research -> Wireframe -> Prototype -> Stakeholder Validation -> QA Handoff",
    approach:
      "Ran workshops with CXO and internal teams, mapped traveler pain points through ground observations, and redesigned flow architecture from package discovery to booking completion.",
    keyDecisions: [
      "Moved from offer-first to decision-first package structure",
      "Introduced progressive disclosure for pricing and inclusions",
      "Standardized booking states with reusable component logic",
    ],
    designSystemThinking:
      "Built reusable pricing, package, and decision modules with Auto Layout and variants to keep desktop/mobile parity while supporting rapid updates.",
    impactMetrics: [
      "+18% booking conversion",
      "40+ high-fidelity screens delivered",
      "Supports 50,000+ monthly users",
    ],
    outcomes: [
      "Reduced booking hesitation in final conversion step",
      "Improved consistency between desktop and mobile journey",
      "Enabled faster iterative releases through modular UI",
    ],
    tools: ["Figma", "FigJam", "Auto Layout", "Responsive Grid", "Design QA"],
  },
  {
    id: "trade-engine-online",
    title: "Trade Engine Online (Navig8)",
    role: "Senior UI/UX Designer",
    company: "CodeBlaze",
    problem:
      "Legacy ship-management workflows were inconsistent across devices, increasing cognitive load for operational users.",
    constraints:
      "Complex operational tasks, cross-platform parity requirements, and domain-specific workflows with low tolerance for UX errors.",
    uxProcess:
      "Research -> Wireframe -> Prototype -> Client Review -> QA/UAT",
    approach:
      "Re-architected core flows for vessel operations, introduced consistent interaction patterns, and validated critical journeys with stakeholders.",
    keyDecisions: [
      "Built role-specific navigation for operational contexts",
      "Prioritized task completion speed over visual density",
      "Defined responsive behavior rules for tablet-heavy usage",
    ],
    designSystemThinking:
      "Created a scalable component library to unify web and mobile behavior and reduce implementation drift during development.",
    impactMetrics: [
      "Recognized with Client Satisfaction Award 2024",
      "Improved consistency across desktop/tablet/mobile",
      "Reduced UI defects pre-handoff via QA checkpoints",
    ],
    outcomes: [
      "Higher operator confidence in high-stakes workflows",
      "Faster design-to-development cycle via reusable components",
      "Reduced visual inconsistency across modules",
    ],
    tools: ["Figma", "Design System", "Usability Testing", "QA/UAT"],
  },
  {
    id: "tax-buddi",
    title: "Tax Buddi",
    role: "Senior UI/UX Designer",
    company: "CodeBlaze",
    problem:
      "High-trust tax filing workflows were difficult for users to complete due to unclear status handling and weak guidance at key steps.",
    constraints:
      "Compliance-sensitive flows, low tolerance for user error, and requirement to maintain confidence through each document and verification state.",
    uxProcess:
      "Research -> Wireframe -> Prototype -> Usability Validation -> Iterative Delivery",
    approach:
      "Mapped user anxiety points in filing and document journeys, then redesigned onboarding, status communication, and guided task completion.",
    keyDecisions: [
      "Introduced step clarity and trust cues at each filing stage",
      "Designed guided document handling states with progress context",
      "Simplified error recovery paths for confidence and completion",
    ],
    designSystemThinking:
      "Built reusable onboarding, verification, and status components to keep fintech interactions consistent and implementation-ready.",
    impactMetrics: [
      "Reduced friction in trust-sensitive financial workflows",
      "Improved filing journey clarity and completion confidence",
      "Increased consistency across onboarding and tracking screens",
    ],
    outcomes: [
      "More predictable completion behavior in critical flows",
      "Better user understanding of tax process status",
      "Lower confusion in verification and tracking stages",
    ],
    tools: ["Figma", "Prototyping", "Flow Optimization", "UX Writing"],
  },
  {
    id: "health-track-sg",
    title: "Health Track SG / Connected Life",
    role: "Senior UI/UX Designer",
    company: "CodeBlaze",
    problem:
      "Complex medical data and edge-case-heavy journeys reduced accessibility and user confidence for healthcare users.",
    constraints:
      "Clinical complexity, accessibility needs for elderly users, and accuracy requirements for data-driven health decisions.",
    uxProcess:
      "Research -> Wireframe -> Prototype -> Accessibility Review -> Delivery",
    approach:
      "Conducted R&D and competitor analysis, then redesigned data visualization and micro-interactions for clearer interpretation.",
    keyDecisions: [
      "Simplified health views through layered information priority",
      "Introduced readability-focused typography and spacing patterns",
      "Handled edge cases explicitly in referral and status flows",
    ],
    designSystemThinking:
      "Standardized data widgets and health-status modules for cross-flow consistency and faster new feature rollout.",
    impactMetrics: [
      "Improved elderly-user readability and actionability",
      "Cleaner interpretation of health metrics",
      "More reliable multi-scenario flow handling",
    ],
    outcomes: [
      "Lower cognitive load in high-information screens",
      "Improved confidence in patient data interpretation",
      "Better consistency across connected healthcare modules",
    ],
    tools: ["Figma", "Data Visualization", "UX Research", "Accessibility"],
  },
  {
    id: "cisgenics",
    title: "Cisgenics Plantation Control Software",
    role: "Senior UI/UX Designer",
    company: "CodeBlaze",
    problem:
      "Sensor-heavy climate dashboards were difficult to act on quickly in operational contexts.",
    constraints:
      "Real-time data volatility, multiple monitoring states, and need for quick action at farm-operations level.",
    uxProcess:
      "Research -> Wireframe -> Prototype -> Validation with domain inputs",
    approach:
      "Designed real-time monitoring views with alert-driven states and action-centered visualization patterns.",
    keyDecisions: [
      "Prioritized alerts and thresholds over raw data tables",
      "Grouped controls by action urgency",
      "Built reusable widgets for data-source scalability",
    ],
    designSystemThinking:
      "Created modular dashboard components to support evolving data sources without redesigning the full interface.",
    impactMetrics: [
      "Faster interpretation of sensor insights",
      "Improved operational response confidence",
      "Scalable dashboard architecture for growth",
    ],
    outcomes: [
      "Better real-time monitoring behavior",
      "More actionable dashboard experiences",
      "Reusable data modules for future system growth",
    ],
    tools: ["Figma", "Dashboard UX", "Information Architecture"],
  },
  {
    id: "brantford",
    title: "Brantford (Co-working / Real Estate)",
    role: "Senior UI/UX Designer",
    company: "Teleglobal International",
    problem:
      "Users struggled to evaluate and compare property options quickly due to weak content hierarchy and decision support.",
    constraints:
      "Large property dataset, evolving business inventory, and requirement to maintain a premium brand tone while simplifying search.",
    uxProcess:
      "Research -> Wireframe -> Prototype -> Usability Validation -> Handoff",
    approach:
      "Combined user research and competitive analysis to redesign listing discovery and property-detail narratives with clearer decision pathways.",
    keyDecisions: [
      "Reordered property details to match user decision sequence",
      "Introduced trust and utility modules near primary actions",
      "Used progressive reveal to reduce information overload",
    ],
    designSystemThinking:
      "Built reusable modules for listing cards, detail sections, filters, and states to maintain scalability as inventory expanded.",
    impactMetrics: [
      "Better property decision confidence",
      "Higher interaction quality",
      "Improved maintainability via shared components",
    ],
    outcomes: [
      "Faster browse-to-decision journey",
      "More consistent property storytelling across listings",
      "Improved operational maintainability for future features",
    ],
    tools: ["Figma", "FigJam", "Confluence", "Azure DevOps"],
  },
  {
    id: "sorrentina",
    title: "Sorrentina",
    role: "Senior UX/UI Designer",
    company: "Think9 Consumers",
    problem:
      "Brand expression and ecommerce usability were disconnected, limiting storytelling and purchase confidence.",
    constraints:
      "Premium positioning expectations, diverse content-heavy product pages, and tight timelines for growth campaigns.",
    uxProcess:
      "Research -> Wireframe -> Prototype -> Conversion Iteration",
    approach:
      "Developed premium brand-aligned product pages with richer content hierarchy, motion cues, and a tighter browse-to-buy journey.",
    keyDecisions: [
      "Mapped product storytelling directly to conversion actions",
      "Built reusable templates for campaign and product launches",
      "Aligned visual hierarchy with trust and value communication",
    ],
    designSystemThinking:
      "Established brand components and templates that were reusable across campaigns and product surfaces.",
    impactMetrics: [
      "+17% customer retention",
      "Improved conversion in product exploration flow",
      "Faster campaign rollout via reusable templates",
    ],
    outcomes: [
      "More coherent brand presence across touchpoints",
      "Higher engagement on rich product storytelling pages",
      "Reduced production overhead for future design cycles",
    ],
    tools: ["Figma", "Brand Design", "Interaction Design", "Design Ops"],
  },
];

export const experienceTimeline = [
  {
    company: "Omni-Bridge Solutions",
    role: "Lead UI/UX Designer",
    duration: "Sep 2025 - Present",
    summary:
      "Leading end-to-end UI/UX for enterprise and travel platforms, including Sterling Resorts booking experiences.",
    achievements: [
      "Improved booking conversion by 18% through flow + package architecture redesign",
      "Designed 40+ high-fidelity screens across booking, analytics, onboarding",
      "Built scalable design system reducing repetitive effort by up to 40%",
      "Collaborated at CXO level to align design direction with business strategy",
    ],
  },
  {
    company: "CodeBlaze",
    role: "Senior UI/UX Designer",
    duration: "Mar 2024 - Aug 2025",
    summary:
      "Drove product design for SaaS, healthcare, fintech, and ship-management experiences.",
    achievements: [
      "Increased customer satisfaction by 68% on flagship SaaS UX revamp",
      "Delivered systems for Health Track SG, NHOST, Tax Buddi, and Engine",
      "Awarded Client Satisfaction Award 2024",
      "Owned strategy-to-delivery execution with QA/UAT collaboration",
    ],
  },
  {
    company: "Teleglobal International",
    role: "Senior UI/UX Designer",
    duration: "Sep 2023 - Mar 2024",
    summary:
      "Designed co-working and real-estate journeys with strong usability and responsive execution.",
    achievements: [
      "Conducted research and competitive analysis to identify UX opportunities",
      "Designed cleaner listing and property detail experience for Brantford",
      "Built reusable component libraries for faster delivery",
      "Improved interaction flow clarity through minimalist IA decisions",
    ],
  },
  {
    company: "Think9 Consumers",
    role: "Senior UX/UI Designer",
    duration: "Sep 2022 - Sep 2023",
    summary:
      "Led D2C brand experience design across ecommerce funnels and brand storytelling flows.",
    achievements: [
      "Improved user journey flow by 60% across four D2C brands",
      "Reduced path-to-checkout time by 36%",
      "Enhanced retention and engagement using MoEngage-backed insights",
    ],
  },
  {
    company: "Mirats Insights",
    role: "UX/UI Designer",
    duration: "May 2021 - Sep 2022",
    summary:
      "Built market-research dashboard experiences and systemized cross-product interface consistency.",
    achievements: [
      "Streamlined dashboards and raised conversion by 40%",
      "Created design system improving design-dev collaboration",
      "Reduced cognitive load with improved information architecture",
    ],
  },
  {
    company: "Fraydio",
    role: "UX/UI Designer",
    duration: "Feb 2020 - Apr 2021",
    summary:
      "Designed user-friendly experiences for content-led digital products.",
    achievements: [
      "Created interactive prototypes for early feedback and alignment",
      "Balanced usability, accessibility, and business priorities",
      "Improved cross-device navigation clarity",
    ],
  },
];

export const skillClusters = [
  {
    title: "Product Strategy",
    detail:
      "Translates business goals and user behavior into roadmap-friendly design direction with measurable outcomes.",
    tags: ["Stakeholder Alignment", "CXO Collaboration", "Outcome Metrics"],
  },
  {
    title: "Design Systems",
    detail:
      "Builds scalable component ecosystems and documentation that improve consistency, speed, and handoff quality.",
    tags: ["Auto Layout", "Variants", "Design Tokens", "Handoff"],
  },
  {
    title: "UX Research",
    detail:
      "Combines user interviews, journey mapping, and competitive analysis to reduce uncertainty before visual execution.",
    tags: ["Research Synthesis", "Journey Mapping", "Usability"],
  },
  {
    title: "Interaction Design",
    detail:
      "Designs behavior-rich interfaces with micro-interactions and motion cues that improve clarity and confidence.",
    tags: ["Prototyping", "Micro-interactions", "Motion"],
  },
  {
    title: "Accessibility (WCAG)",
    detail:
      "Applies accessibility-first patterns for typography, contrast, and interaction states across enterprise workflows.",
    tags: ["Inclusive Design", "Readable UI", "Keyboard Flows"],
  },
  {
    title: "Toolchain",
    detail:
      "Figma, FigJam, Framer, Spline, Adobe Suite, Confluence, Azure DevOps, and low-code collaboration in PowerApps ecosystems.",
    tags: ["Figma", "Framer", "PowerApps", "Azure DevOps"],
  },
];

export const education = [
  {
    level: "Postgraduate",
    program: "Visual Design and User Experience",
    institution: "IIT Hyderabad",
  },
  {
    level: "Master's",
    program: "Computer Science",
    institution: "MIT World Peace University",
    location: "Pune",
  },
  {
    level: "Bachelor's",
    program: "Computer Science",
    institution: "Sinhgad Institute of Technology & Science",
    location: "Pune",
  },
];

export const certifications = [
  {
    title: "Visual Design and User Experience",
    issuer: "IIT Hyderabad",
    year: "2023",
  },
  {
    title: "React.js Essential Training",
    issuer: "LinkedIn Learning",
    year: "2022",
  },
  {
    title: "User Experience Design Essentials",
    issuer: "Udemy",
    note: "Adobe XD UI UX Design",
    year: "2021",
  },
];

export const proofPoints = [
  {
    category: "Recognition",
    value: "2024",
    label: "Client Satisfaction Award",
    detail: "Recognized at CodeBlaze for delivery quality and client trust.",
  },
  {
    category: "Impact",
    value: "+68%",
    label: "Customer satisfaction lift",
    detail: "Delivered on a flagship SaaS redesign with measurable user confidence gains.",
  },
  {
    category: "Conversion",
    value: "+18%",
    label: "Booking conversion lift",
    detail: "Achieved for Sterling Resorts by improving decision clarity in the booking flow.",
  },
  {
    category: "Efficiency",
    value: "40%",
    label: "Less repetitive design effort",
    detail: "Reduced through reusable systems, consistent patterns, and tighter handoff quality.",
  },
];

export const domainExpertise = [
  "SaaS Platforms",
  "Travel & Booking",
  "Enterprise Dashboards",
  "E-learning / EdTech",
  "CRM Platforms",
  "Healthcare",
  "Fintech",
  "Real Estate",
  "D2C / Ecommerce",
  "Market Research",
];
