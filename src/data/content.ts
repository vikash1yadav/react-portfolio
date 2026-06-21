// Centralized Portfolio Content for Vikas Kumar
// Edit this file to update your personal details, experience, skills, and projects.

export interface StatItem {
  value: string;
  numberValue: number; // for count-up animations
  suffix?: string;
  label: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  projects?: {
    name: string;
    description: string;
    achievements: string[];
  }[];
  achievements?: string[]; // fallback or general achievements
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ProjectItem {
  title: string;
  description: string;
  longDescription?: string;
  techTags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export const personalInfo = {
  name: "Vikas Kumar",
  title: "Senior Full Stack Developer",
  subtitle: "MERN / PERN | Microservices",
  email: "vy24754@gmail.com",
  phone: "+91 9304047599",
  location: "Hyderabad, India",
  linkedin: "https://www.linkedin.com/in/vikas-kumar-vy24754", // Paste actual URL here
  github: "https://github.com/vikash1yadav", // Paste actual URL here
  resumeUrl: "/Vikas_Kumar_Resume_Updated.pdf", // Placed in public/ directory
  valueProp: "Senior Software Engineer with 4.10+ years of experience building scalable full-stack applications and Node.js microservices. Specialist in database migrations, high-throughput message queues, and Next.js optimization.",
  bioParagraphs: [
    "I am a Senior Full Stack Developer specializing in architectural migrations, backend microservices, and performance-tuned frontends. Throughout my career, I have successfully designed, built, and shipped complex applications across fintech, e-commerce, and public sectors (PSU).",
    "My key expertise lies in decomposing legacy monoliths into scalable microservices architectures (directing migrations with 22+ regional databases), designing robust job/notification processing queues (using BullMQ, Redis, RabbitMQ), and engineering high-conversion frontend systems utilizing Next.js, React, and Tailwind CSS."
  ]
};

export const stats: StatItem[] = [
  { value: "4.10+", numberValue: 4.10, suffix: "+", label: "Years Experience" },
  { value: "22+", numberValue: 22, suffix: "+", label: "Regional Databases Migrated" },
  { value: "70%", numberValue: 70, suffix: "%", label: "E-Commerce Sales Growth" },
  { value: "5+", numberValue: 5, suffix: "+", label: "Engineers Mentored/Led" }
];

export const experience: ExperienceItem[] = [
  {
    company: "KeyPoint Technologies India Pvt. Ltd.",
    role: "Senior Node.js Developer (Lead Backend Architect)",
    period: "Nov 2025 – Present",
    location: "Hyderabad, India",
    projects: [
      {
        name: "GailGas PNG",
        description: "Migration of a large-scale legacy .NET monolith to a Node.js microservices architecture.",
        achievements: [
          "Architected and led the end-to-end migration of a large-scale monolith spanning 22 regional databases and a shared common database, directing a team of 5+ developers.",
          "Designed a BullMQ/Redis job processing and notification infrastructure with FCM push delivery and retry/backoff queue strategies.",
          "Directed schema migrations and performance optimization (composite/filtered indexing, query tuning, SQL Agent automation) across all 22 regional databases.",
          "Owned migration of core business domains including billing/invoicing, payment processing (cheque/POS), authentication, role management, and customer notification systems."
        ]
      },
      {
        name: "Green Credit Portal",
        description: "Backend design and development of the Green Credit Portal using Node.js microservices.",
        achievements: [
          "Led backend design and development of the Green Credit Portal using Node.js microservices, improving system scalability by 40%."
        ]
      }
    ]
  },
  {
    company: "Thermopharm Pvt Ltd",
    role: "Senior Software Development Engineer",
    period: "June 2025 – Oct 2025",
    location: "Hyderabad, India",
    projects: [
      {
        name: "HVAC Attendance & Workforce Management",
        description: "Workforce tracking and analytics application with AI integrations.",
        achievements: [
          "Architected full-stack workforce management application leveraging Next.js for the frontend and Node.js for web and mobile applications.",
          "Spearheaded an AI-powered selfie-based attendance and leave management system, streamlining work-hour calculations and employee tracking.",
          "Added task management and sites/project tracking to improve team productivity, and integrated push notifications and file/log storage."
        ]
      }
    ]
  },
  {
    company: "Anjani Creations",
    role: "Software Development Engineer",
    period: "Oct 2024 – June 2025",
    location: "Hyderabad, India",
    projects: [
      {
        name: "Microfinance Management Software (Finmintra & NGO Management)",
        description: "Full-stack loan and EMI administration platform.",
        achievements: [
          "Engineered a comprehensive full-stack platform for efficient management of customer loans and EMIs, enhancing financial workflows.",
          "Integrated APIs for direct EMI collection from customer bank accounts, optimizing and automating payment processes.",
          "Streamlined database operations, enhancing transaction logging efficiency and automating EMI debit notifications via SMS and email."
        ]
      }
    ]
  },
  {
    company: "Raysteeds Infotech Pvt Ltd.",
    role: "Software Development Engineer (MERN / PERN Stack)",
    period: "Nov 2021 – Sept 2024",
    location: "Dehradun, India",
    projects: [
      {
        name: "IRCLASS Maritime Audit & Compliance Suite",
        description: "A suite of digital portals (RO-Audit, DGS-Audit, IFCR, IRNAVGATH, E-Plan, BDN) built for the Indian Register of Shipping and Directorate General of Shipping.",
        achievements: [
          "Developed and launched 8+ live maritime inspection, compliance, and audit web applications serving government and port authorities.",
          "Engineered a secure digital signature suite specifically designed for PDF verification, streamlining plan approval times by 35%.",
          "Architected RESTful APIs using Node.js and Express, integrated with highly interactive React.js frontends featuring React Context for complex state management.",
          "Implemented background Cron services for inventory tracking, bunker delivery note reporting, and automated ballast water audit workflows."
        ]
      },
      {
        name: "TopTen Electronics E-Commerce Platform",
        description: "A high-traffic electronics retail web application managing a catalog of 50k+ items.",
        achievements: [
          "Boosted organic sales by 70% and achieved $100K+ monthly revenue by implementing Next.js SEO optimizations and improving Core Web Vitals.",
          "Built a CronJob-driven transactional messaging service in Node.js to handle order status updates and promotional campaigns.",
          "Integrated social login and registration options to lower checkout drop-off rates by 15%."
        ]
      },
      {
        name: "Real-time Mobile & Consumer Apps (Yall & Woof)",
        description: "Geo-location and community platforms built with the PERN stack.",
        achievements: [
          "Developed high-throughput geographical query APIs in Sequelize/PostgreSQL to find nearby users within dynamic radiuses.",
          "Implemented low-latency direct and group messaging using Socket.io and Firebase Realtime Database.",
          "Integrated Razorpay payment processing and configured Firebase Cloud Messaging (FCM) for push notifications."
        ]
      }
    ]
  },
  {
    company: "Raysteeds Infotech Pvt Ltd.",
    role: "Software Engineer Intern",
    period: "June 2021 – Oct 2021",
    location: "Dehradun, India",
    achievements: [
      "Assisted in full-stack development of React.js interfaces and Node.js backend integrations.",
      "Configured AWS S3 buckets for media asset storage and integrated AWS SES for transactional email templates.",
      "Leveraged MongoDB, Material UI, and Semantic UI to speed up page building cycles by 25%."
    ]
  }
];

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    skills: ["TypeScript", "JavaScript", "C++", "Java", "SQL", "HTML5/CSS3"]
  },
  {
    category: "Backend Development",
    skills: ["Node.js", "NestJS", "Express.js", "Microservices", "RESTful APIs", "GraphQL APIs", "Sequelize ORM", "Drizzle ORM"]
  },
  {
    category: "Frontend Development",
    skills: ["React.js", "Next.js (App Router)", "Redux Toolkit", "Tailwind CSS", "Shadcn UI", "Material UI", "Knockout.js"]
  },
  {
    category: "Databases & Caching",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "MSSQL", "Oracle", "Redis"]
  },
  {
    category: "Tools & DevOps",
    skills: ["Git / GitHub", "Docker", "AWS (S3/EC2/SES)", "BullMQ", "RabbitMQ", "CI/CD (Jenkins)", "Linux / Bash"]
  }
];

export const projects: ProjectItem[] = [
  {
    title: "JS Playground",
    description: "A full-stack, monorepo JavaScript code playground featuring an embedded Monaco editor, browser-based sandboxed code execution, DSA problems, and custom npm package loading.",
    longDescription: "Built with a pnpm monorepo structure. Utilizes OpenAPI-driven contracts, strict Zod schema validation, Drizzle ORM, and automatically generated React Query frontend hooks. Backed by PostgreSQL.",
    techTags: ["React.js", "Vite", "Node.js", "PostgreSQL", "Drizzle ORM", "Monaco Editor", "pnpm"],
    githubUrl: "https://github.com/vikas-kumar-vy24754/js-playground",
    featured: true
  },
  {
    title: "GailGas PNG Billing & Notification System",
    description: "Successfully led the architectural migration of a legacy .NET monolith to a Node.js microservices framework supporting 22 regional database engines.",
    longDescription: "Designed high-performance message processing structures using BullMQ and Redis for FCM pushes and SMS alerts. Optimized complex regional SQL databases with composite indexing, query tuning, and automated database jobs.",
    techTags: ["Node.js", "Microservices", "MSSQL", "Sequelize ORM", "Redis", "BullMQ", "RabbitMQ"],
    featured: true
  },
  {
    title: "AI-Powered HVAC Workforce System",
    description: "A workforce tracking and management application using Next.js and Node.js featuring facial recognition and geofenced attendance calculations.",
    longDescription: "Integrated an AI-powered selfie verification for employee check-ins. Streamlined work hours, automated leave balance audits, and built robust background notifications and logging scripts.",
    techTags: ["Next.js", "React.js", "Node.js", "AI Verification", "PostgreSQL", "WebSockets"],
    featured: true
  },
  {
    title: "Top Ten Electronics E-Commerce Portal",
    description: "A high-traffic e-commerce portal with over 50,000 products, engineered with Next.js SEO strategies to yield 70% growth in organic sales.",
    longDescription: "Optimized Core Web Vitals, server-side rendering, dynamic site mapping, and responsive image loading. Reached average monthly revenue targets of $100k+ with smooth user paths.",
    techTags: ["Next.js", "React.js", "Node.js", "Redux", "Tailwind CSS", "SEO Optimization"],
    featured: true
  },
  {
    title: "Microfinance Loan Ledger Platform",
    description: "A full-stack financial workflow engine automating EMI disbursements and account debit collections for microfinance and non-governmental bodies.",
    longDescription: "Built secure API connections to initiate direct bank debits, integrated multi-channel SMS/Email reminders, and developed a complete transaction logging and double-entry accounting ledger.",
    techTags: ["React.js", "Node.js", "Express.js", "MongoDB", "Bank APIs", "EMI Automation"],
    featured: false
  },
  {
    title: "Realtime Communication Suite",
    description: "Collaborative chat room system supporting direct messaging, group rooms, voice/video calls, and file attachments.",
    longDescription: "Leveraged WebSockets/Socket.io for low-latency messaging, WebRTC for peer-to-peer media streams, and AWS S3 bucket uploads for documents and images.",
    techTags: ["React.js", "Node.js", "WebRTC", "Socket.io", "AWS S3", "Express.js"],
    featured: false
  }
];
