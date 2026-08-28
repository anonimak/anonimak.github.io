// Central profile / identity data — shared by every theme so content
// stays identical no matter which design style is rendered.
export const profile = {
  name: "Jonatan Teofilus",
  initials: "JT",
  role: "Full-Stack Developer",
  location: "Jakarta, ID",
  availability: "Available for work",
  headline: {
    prefix: "Building",
    highlight: "products",
    suffix: "that ship.",
  },
  tagline:
    "Full-stack engineer crafting clean systems and modern web experiences — from architecture to deployment.",
  motto: "Clean systems · Product delivery · Modern web",
  stack: "JS · PHP · Vue",
  focus: "Web · DevOps",
  heroStats: [
    { value: "8+", label: "Years exp." },
    { value: "10+", label: "Projects" },
    { value: "∞", label: "Coffee cups" },
  ],
  experienceStats: [
    { value: "8+", label: "years total" },
    { value: "3", label: "companies" },
    { value: "2", label: "degrees" },
  ],
  contactHeadline: {
    prefix: "Let's build",
    highlight: "something great.",
  },
  contactBody:
    "Open to new opportunities, collaborations, and interesting conversations. Whether it's a project proposal or just a hello — reach out.",
  nav: [
    { href: "#hero", label: "Home" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#portfolio", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ],
  socials: [
    {
      href: "https://github.com/anonimak",
      icon: "entypo-social:github",
      label: "GitHub",
    },
    {
      href: "https://www.linkedin.com/in/jonatanteofilus5ba43a182",
      icon: "entypo-social:linkedin",
      label: "LinkedIn",
    },
    {
      href: "https://instagram.com/jonatan_teofilus",
      icon: "entypo-social:instagram",
      label: "Instagram",
    },
  ],
};

// Experience & education timeline
export const experiences = [
  {
    id: "marugame",
    period: "2025 — Present",
    company: "Marugame Udon Indonesia",
    type: "work",
    tags: ["Laravel", "Livewire", "Power BI", "DevOps"],
    description:
      "Analyzed business processes and translated them into scalable web applications utilizing the TALL stack. Managed the end-to-end deployment lifecycle and code versioning via GitLab. Architected seamless integrations across multiple internal systems and developed comprehensive data analytics solutions—including sales tracking and reporting dashboards—using both custom in-house tools and Microsoft Power BI.",
  },
  {
    id: "nusa-mandiri",
    period: "2025 — 2026",
    company: "Nusa Mandiri University",
    type: "edu",
    tags: ["S1", "Information System"],
    description:
      "Bachelor's Degree (S1) in Information Systems, completed part-time alongside full-time work — building on prior IT foundations with deeper coursework in software engineering, database design, systems analysis, and business process management.",
    // Overlaps with the "marugame" entry — rendered as a small attached
    // branch card next to that node instead of its own timeline slot.
    concurrentWith: "marugame",
  },
  {
    id: "sinarmas",
    period: "2020 — 2025",
    company: "Sinarmas Hana Finance",
    type: "work",
    tags: ["Vue", "PHP", "DevOps"],
    description:
      "Developed and maintained scalable software systems, integrated new technologies, led HRIS, e-Approval, and e-Auction projects, collaborated with stakeholders, participated in agile processes, implemented version control, optimized databases, and coordinated deployments.",
  },
  {
    id: "sysware",
    period: "2017 — 2020",
    company: "PT Sysware Indonesia",
    type: "work",
    tags: ["PHP", "JavaScript", "Swift"],
    description:
      "Specialized in backend development with PHP frameworks, frontend with JavaScript, and mobile development with Swift, delivering custom software solutions tailored to business needs.",
  },
  {
    id: "polinela",
    period: "2013 — 2016",
    company: "State Polytechnic of Lampung",
    type: "edu",
    tags: ["D3", "Information Management"],
    description:
      "Associate's Degree in Information Management, focusing on programming, database management, system analysis, and IT project management.",
  },
];

// Groups `experiences` into main timeline nodes, each carrying a
// `concurrents` array of entries whose `concurrentWith` points at it (e.g.
// a degree studied part-time alongside a job). Entries with no match for
// their `concurrentWith` id are kept as their own primary node, so a typo
// or removed id never silently drops a timeline entry.
export function groupExperiences(items) {
  const byId = new Map(items.map((item) => [item.id, item]));
  const primaries = items.filter(
    (item) => !item.concurrentWith || !byId.has(item.concurrentWith),
  );
  return primaries.map((item) => ({
    ...item,
    concurrents: items.filter((other) => other.concurrentWith === item.id),
  }));
}

// Professional Projects
export const professionalProjects = [
  {
    title: "Dashboard Panel (OPIS)",
    company: "PT. Sinarmas Hana Finance",
    role: "Full-Stack Developer",
    contributions: [
      "Developed a seamless user session system, allowing access to sub-applications without reauthentication.",
      "Ensured secure and efficient authentication flows to enhance user experience.",
    ],
    link: "https://apps.shf.co.id/",
    image: "/images/projects/opis.png",
  },
  {
    title: "HRIS (Human Resource Information System)",
    company: "PT. Sinarmas Hana Finance",
    role: "Full-Stack Developer",
    contributions: [
      "Designed and enhanced modules for overtime, leave, attendance, warning letters, and business trips.",
      "Currently developing payroll integration to automate salary calculations and payments.",
      "Improved user interface for better employee self-service interactions.",
    ],
    link: "https://hris.shf.co.id/",
    image: "/images/projects/hris.png",
  },
  {
    title: "E-Memo (E-Approval System)",
    company: "PT. Sinarmas Hana Finance",
    role: "Full-Stack Developer",
    contributions: [
      "Built an approval workflow system to streamline internal document processing.",
      "Implemented role-based access control (RBAC) to ensure secure approvals.",
      "Enhanced operational efficiency by automating document routing and notifications.",
    ],
    link: "https://memo.shf.co.id/",
    image: "/images/projects/memo.png",
  },
  {
    title: "E-Auction (Online Vehicle Auction System)",
    company: "PT. Sinarmas Hana Finance",
    role: "Full-Stack Developer",
    contributions: [
      "Developed an online vehicle auction platform with real-time bidding features.",
      "Implemented auction scheduling and bid tracking.",
      "Optimized database queries to improve system responsiveness during high traffic.",
    ],
    link: "https://lelang.shf.co.id/",
    image: "/images/projects/lelang.png",
  },
  {
    title: "E-Regulation",
    company: "PT. Sinarmas Hana Finance",
    role: "Full-Stack Developer (Advisory)",
    contributions: [
      "Provided input on workflow design and technology selection.",
      "Assisted in defining system architecture and implementation approach.",
    ],
    link: "https://ereg.shf.co.id/",
    image: "/images/projects/ereg.png",
  },
];

// Side Projects & Freelance Work
export const sideProjects = [
  {
    title: "Psychological Test Applications",
    clients: ["Pemprov Kalbar", "PT Bina Sarana Sukses"],
    role: "Frontend Developer",
    contributions: [
      "Developed the UI/UX using Vue.js for multiple psychological test applications.",
      "Implemented dynamic forms and real-time result processing.",
    ],
    link: [
      { name: "Pemprov Kalbar", url: "https://talentakalbar.com/" },
      { name: "BSS", url: "https://psikotes.binasaranasukses.co.id/" },
    ],
    image: "/images/projects/talentakalbar.png",
  },
  {
    title: "Point of Sale Applications",
    clients: ["TB Abadi Lestari"],
    role: "Frontend Developer",
    contributions: [
      "Developed an intuitive and responsive POS interface using Vue.js.",
      "Integrated real-time transaction processing for seamless sales operations.",
      "Enhanced user experience with optimized UI/UX design.",
    ],
    link: "https://tbabadilestari.com/",
    image: "/images/projects/tbabadilestari.png",
  },
  {
    title: "Media Registration Information System (SIPMAS)",
    clients: ["Pemerintah Kab. Tanggamus"],
    role: "System Planner & Developer",
    contributions: [
      "Led the planning and development lifecycle (SDLC) for the application.",
      "Designed system flow and architecture for efficient media registration and verification.",
      "Developed a structured database to manage media organization data securely.",
    ],
    link: "https://media-tanggamus.sahabatrekrutmen.id/",
    image: "/images/projects/mediatanggamus.png",
  },
  {
    title: "LaporMas (Public Complaint System)",
    clients: ["Bogor Social Service Office"],
    role: "Backend & Mobile Developer",
    contributions: [
      "Developed the backend services for both users and volunteers.",
      "Built the mobile application (React Native) for volunteer role management under the Social Service Office.",
    ],
    link: "",
    image: "/images/projects/mediatanggamus.png",
  },
  {
    title: "Website & Landing Pages",
    clients: ["PT Wahana Mitrakarya Nusantara", "PT Aneka Material Persada"],
    role: "Full Stack Developer",
    contributions: [
      "Developed static websites and landing pages using Nuxt.js with SSG for optimal performance.",
      "Integrated Strapi CMS for easy content management and updates.",
      "Ensured SEO optimization and mobile responsiveness.",
    ],
    link: [
      { name: "Aneka MP", url: "https://aneka-mp.com/" },
      { name: "PTWMN", url: "https://ptwmn.com/" },
    ],
    image: "/images/projects/amp.png",
  },
];

export const skills = [
  { name: "PHP", icon: "cib:php" },
  { name: "JavaScript", icon: "cib:javascript" },
  { name: "Vue.js", icon: "cib:vue-js" },
  { name: "Nuxt.js", icon: "cib:nuxt-js" },
  { name: "React Native", icon: "cib:react" },
  { name: "Swift", icon: "cib:swift" },
  { name: "Laravel", icon: "cib:laravel" },
  { name: "CodeIgniter", icon: "cib:codeigniter" },
  { name: "Strapi", icon: "cib:strapi" },
  { name: "MySQL/MariaDB", icon: "cib:mysql" },
  { name: "Docker", icon: "cib:docker" },
  { name: "Git", icon: "cib:git" },
  { name: "CI/CD", icon: "cib:jenkins" }, // Using Jenkins as a representation for CI/CD
  { name: "Agile", icon: "cib:trello" }, // Using Trello as a representation for Agile
  { name: "JIRA", icon: "cib:jira" },
];
