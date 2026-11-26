export type Project = {
  title: string;
  blurb: string;
  story?: string;
  caseStudy?: {
    title: string;
    screenshot: { src: string; alt: string; caption: string; width: number; height: number };
    steps: { label: string; detail: string }[];
    sources: { label: string; href: string }[];
    publication?: { title: string; href: string; citation: string; doi: string };
  };
  stack: string[];
  year?: string;
  links: { live?: string; source?: string };
  featured?: boolean;
  status?: string;
  image?: string;
  imageAlt?: string;
  categories?: string[];
};

export type Job = {
  company: string;
  role: string;
  period: string;
  location: string;
  blurb: string;
  highlights: string[];
  url?: string;
};

export type Post = {
  title: string;
  summary: string;
  date: string;
  url: string;
  readingTime?: string;
};

const skillGroups = {
  Languages: ["Python", "Java", "SQL", "TypeScript", "JavaScript"],
  Frontend: ["React.js", "Next.js", "Tailwind CSS"],
  Backend: ["FastAPI", "Node.js", "REST APIs"],
  Database: ["PostgreSQL", "MySQL", "MongoDB"],
  Frameworks: ["NumPy", "Pandas", "Scikit-learn", "TensorFlow", "PyTorch", "XGBoost", "LangChain"],
  Platforms: ["Linux", "Web", "Windows", "Arduino", "AWS", "IBM Cloud"],
  Tools: ["AWS EC2", "AWS S3", "AWS Lambda", "AWS IAM", "Amazon Bedrock", "Amazon SageMaker", "Git", "GitHub", "Docker"],
  "Soft Skills": ["Leadership", "Event Management", "Writing", "Public Speaking", "Time Management"],
};

export const site = {
  name: "Seema Sultana",
  firstName: "Seema",
  url: "https://seema-portfolio-eight.vercel.app/",
  quote: { text: "", author: "" },
  profileImages: ["/images/seema-profile.jpeg"],
  bannerImage: "/project-images/federated-iot.png",
  socialBannerImage: "/project-images/federated-iot.png",
  initials: "SS",
  role: "Computer Science Engineering Student · Full Stack, AI/ML & Data Engineering",
  location: "Bengaluru, India",
  timezone: "Asia/Kolkata",
  email: "sultanaseema385@gmail.com",
  greeting: "Hey, I'm Seema",
  tagline:
    "I study computer science engineering at Visvesvaraya Technological University and build full-stack applications and privacy-preserving machine learning systems.",
  about: [
    "I work across frontend interfaces, backend APIs, and machine learning models. I'm especially interested in federated learning, agentic AI, distributed systems, and cloud infrastructure.",
    "Through internships, hackathons, and academic research, I turn ideas into working applications and use data to answer practical questions.",
    "I contribute to open-source and student technical communities, including the AWS Student Builder Group and IEEE Computer Society Bangalore Chapter.",
  ],
  tldr: [
    "Co-lead of the AWS Student Builder Group",
    "IEEE CS Bangalore Chapter volunteer and website contributor",
    "Researching privacy-preserving federated learning for IoT",
    "First place at the ELECTROLYTHON National Level Hackathon",
  ],
  status: {
    available: true,
    availableText: "Available for roles",
    nowLearning: "",
    nowBuilding: "",
    nowListening: "",
  },
  socials: {
    github: "https://github.com/seemasultana7362",
    twitter: "",
    linkedin: "https://www.linkedin.com/in/seemasultana385",
    email: "mailto:sultanaseema385@gmail.com",
    phone: "tel:+91-8892872700",
    resume: "/seema-sultana-resume.pdf",
    discord: "",
    medium: "",
  },
  experience: [
    {
      company: "AWS Student Builder Group",
      role: "Co-Lead",
      period: "May 2026 – Present",
      location: "Bengaluru, India · On campus",
      blurb: "Built cloud-native solutions using AWS services including EC2, S3, Lambda, Bedrock, and SageMaker.",
      highlights: [
        "Advised peers on AWS implementation and cloud architecture.",
        "Led initiatives to help the engineering community adopt AWS tools.",
      ],
    },
    {
      company: "Embrizon Technologies",
      role: "Data Science Intern (AI)",
      period: "February 2026 – April 2026",
      location: "Remote",
      blurb: "Worked on predictive analytics pipelines from data collection through model deployment.",
      highlights: [
        "Built Python dashboards to communicate insights to stakeholders.",
        "Developed and deployed classification models for customer behavior analysis and business intelligence.",
      ],
    },
  ] as Job[],
  leadership: [
    {
      organization: "AWS Student Builder Group",
      role: "Vice President / Operations Lead",
      period: "July 2026 – Present",
      blurb: "Organized technical events and AWS workshops for students and developers.",
    },
    {
      organization: "IEEE Computer Society Bangalore Chapter",
      role: "Volunteer / Website Contributor",
      period: "January 2026 – Present",
      blurb: "Manages the chapter website and helps coordinate IEEE CS PRO 2026 and Girl Geek.",
    },
  ],
  research: {
    title: "Analysis of Privacy-Preserving Federated Learning Frameworks for IoT-Based Distributed Data Analytics",
    status: "Work in progress",
    blurb: "Studies how IoT devices can train machine learning models collaboratively while keeping their data private.",
    stack: ["Python", "PyTorch", "Flower", "Scikit-learn", "Pandas", "NumPy", "Opacus", "Secure Aggregation", "Adaptive Communication"],
  },
  achievements: [
    "1st place at the ELECTROLYTHON National Level Hackathon (September 2025).",
    "Top 6 finalist at the Gen-AI Hackathon (May 2026).",
    "Shortlisted for Google Build with AI in Bengaluru (June 2026).",
  ],
  education: [
    {
      institution: "Visvesvaraya Technological University",
      qualification: "B.E. in Computer Science & Engineering",
      result: "8.25 GPA",
      period: "September 2023 – Present",
    },
    {
      institution: "Presidency PU College",
      qualification: "Class 12 (State Board)",
      result: "92.5%",
      period: "2021",
    },
    {
      institution: "SVN English High School",
      qualification: "Class 10 (State Board)",
      result: "91.04%",
      period: "2019",
    },
  ],
  projects: [
    {
      title: "Mulberry Shades Nandi Hills — Full Stack Hotel Booking Website",
      image: "/project-images/mulberry-hotel.png",
      imageAlt: "Screenshot from the Mulberry Shades Nandi Hills resort website",
      blurb: "A responsive website showcasing the Mulberry Shades Nandi Hills resort and its offerings.",
      story: "Built the site with the MERN stack, connected the React frontend to a MongoDB-backed REST API, and deployed the application on Vercel.",
      stack: ["MongoDB", "Express.js", "React", "Node.js", "REST APIs", "Vercel"],
      links: { live: "https://mernstack-project-mulberry-hotel.vercel.app/#home" },
      categories: ["Web"],
    },
    {
      title: "Privacy-Preserving Federated Learning for IoT Intrusion Detection",
      image: "/project-images/federated-iot.png",
      imageAlt: "Federated IoT intrusion detection project illustration",
      blurb: "A federated learning pipeline that detects intrusions across IoT devices while protecting their data.",
      story: "Built the pipeline with PyTorch and Flower using the UNSW-NB15 dataset. Evaluated the effects of differential privacy, secure aggregation, and adaptive communication on accuracy, convergence, and network overhead.",
      stack: ["Python", "PyTorch", "Flower", "Scikit-learn", "Opacus", "Secure Aggregation"],
      links: { source: "https://github.com/seemasultana7362/Federated-IoT" },
      categories: ["AI & Data"],
    },
    {
      title: "Customer Churn Prediction using Explainable Machine Learning",
      image: "/project-images/customer-churn.png",
      imageAlt: "Screenshot of the customer churn analytics project",
      blurb: "A machine learning pipeline that predicts customer churn and explains which factors drive the predictions.",
      story: "Prepared the data, engineered features, and used SHAP to explain model predictions. Presented the results in a Streamlit dashboard to help teams evaluate retention strategies.",
      stack: ["Python", "Pandas", "NumPy", "Scikit-learn", "XGBoost", "SHAP", "Matplotlib", "Seaborn", "Streamlit"],
      links: { source: "https://github.com/seemasultana7362/Customer-Churn-Prediction-project" },
      categories: ["AI & Data"],
    },
    {
      title: "DOC-CHAT-AI — Citation-First Document Question Answering",
      image: "/project-images/doc-chat-ai.png",
      imageAlt: "Screenshot of the DOC-CHAT-AI document question-answering project",
      blurb: "A tool for asking questions about complex PDFs and tracing answers to the source page, row, and column.",
      story: "Uses Docling and PyMuPDF to extract document content, Sentence Transformers and FAISS for semantic retrieval, and ColPali for visual search when needed. A pandas engine computes answers from structured operations generated by the language model.",
      stack: ["Python", "FastAPI", "Docling", "PyMuPDF", "ColPali", "Sentence Transformers", "FAISS", "Pandas", "Streamlit"],
      links: { source: "https://github.com/seemasultana7362/doc-chat-ai" },
      categories: ["AI & Data"],
    },
  ] as Project[],
  skills: Object.values(skillGroups).flat(),
  skillGroups,
  writing: [] as Post[],
  github: { username: "seemasultana7362", contributionsLastYear: "" },
  footerNote: "Built with React and TypeScript",
} as const;

export type Site = typeof site;
