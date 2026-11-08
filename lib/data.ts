// ─────────────────────────────────────────────────────────────
//  EDIT EVERYTHING ABOUT YOU HERE — all sections read from this file
// ─────────────────────────────────────────────────────────────

export const profile = {
  firstName: "PARTH",
  lastName: "DESHMUKH",
  role: "Data Engineer",
  tagline: "I engineer data that flows — and worlds that move.",
  location: "Pune, India",
  email: "parthdeshmukh4042@gamail.com", // TODO: replace
  resumeUrl: "",                   // TODO: link to your resume PDF in /public
  socials: [
    { label: "GitHub", href: "https://github.com/Parth4042" },      // TODO
    { label: "LinkedIn", href: "www.linkedin.com/in/parth-deshmukh-01727b346" },  // TODO
    { label: "ArtStation", href: "https://artstation.com/" }, // TODO
  ],
};

export const about = {
  intro:
    "By day I build lakehouse pipelines that move millions of records from raw chaos to trusted gold. By night I sculpt polygons, write shaders and animate light. I'm a data engineer growing into AI and ML — obsessed with systems that are both reliable and beautiful.",
  pillars: [
    { k: "01", title: "Data Engineering", text: "Databricks, PySpark, Delta Lake, Unity Catalog, CDC and medallion architectures." },
    { k: "02", title: "AI / ML", text: "Python ML workflows, scikit-learn, regression, LLM-powered apps and agents." },
    { k: "03", title: "3D & Motion", text: "Three.js, GLSL shaders, 3D modelling and cinematic web animation." },
  ],
};

export const marqueeWords = [
  "DATABRICKS", "PYSPARK", "PYTHON", "AGENTIC AI", "AIRFLOW", "SQL",
  "MACHINE LEARNING", "ASTRONOMER AIRFLOW", "AWS", "INFORMATICA", "CICD", "HARNESS", "Three.js"
];

export const skillGroups = [
  { title: "Data Platform", items: ["Databricks", "PySpark", "Delta Lake", "Unity Catalog", "Auto Loader", "Delta CDF"] },
  { title: "Orchestration & ETL", items: ["Airflow", "Informatica PowerCenter", "IDMC", "CDC", "AWS Glue", "EMR"] },
  { title: "Databases", items: ["SQL Server", "PostgreSQL", "MySQL", "Redshift", "Athena", "S3"] },
  { title: "AI / ML", items: ["Python", "scikit-learn", "Pandas", "NumPy", "LLMs", "Streamlit"] },
  { title: "Creative Dev", items: ["Three.js", "R3F", "GLSL", "GSAP", "Blender", "Next.js"] },
];

// Tags displayed on the rotating 3D skill sphere
export const sphereSkills = [
  "Databricks", "PySpark", "Delta", "Unity Catalog", "Airflow", "SQL", "Python",
  "AWS", "Glue", "EMR", "Redshift", "Kafka", "CDC", "Power BI", "Informatica",
  "sklearn", "Pandas", "LLMs", "Three.js", "GLSL", "GSAP", "Numpy", "Next.js", "Git",
];

export const pipelineStages = [
  { name: "SOURCE", title: "Ingest everything", text: "Databases, files, APIs and streams land through Auto Loader and pre-SQL driven extracts." },
  { name: "BRONZE", title: "Raw, but safe", text: "Immutable raw Delta tables with schema evolution, lineage and full replayability." },
  { name: "SILVER", title: "Clean & conform", text: "Dedup, validate, CDC merge with Change Data Feed — one trusted version of the truth." },
  { name: "GOLD", title: "Business ready", text: "Modelled aggregates and marts governed by Unity Catalog, reconciled and tested." },
  { name: "SERVE", title: "Insight & AI", text: "Power BI dashboards, downstream MySQL/SQL Server targets and ML feature pipelines." },
];

export const projects = [
  {
    title: "CellSight – Breast Cancer Diagnosis and Metastasis Risk Prediction",
    category: "Data Engineering",
    year: "2025",
    description: "CellSight is an AI-powered healthcare solution that analyzes breast cancer histopathology images to detect and classify tumors as benign or malignant, segment cancer-affected regions, and predict the risk of metastasis using deep learning and machine learning techniques.",
    tags: ["Deep Learning", "Machine Learning", "QuPath", "Python" ],
    link: "The project source code is protected under copyright and maintained in a private repository; therefore, a public code link is unavailable.",
  },
  {
    title: "Healthcare Medallion Pipeline",
    category: "Data Engineering",
    year: "2026",
    description: "Source → landing → silver → gold healthcare lakehouse on Unity Catalog with Auto Loader, reconciliation tests and notification notebooks.",
    tags: ["Unity Catalog", "Auto Loader", "Delta Lake"],
    link: "#",
  },
  {
    title: "Informatica → PySpark Analyzer",
    category: "Modernization",
    year: "2026",
    description: "Python analyzer that parses PowerCenter XML exports, extracts transformations, pre/post SQL and maps them to PySpark logic.",
    tags: ["Python", "XML", "Informatica", "PySpark"],
    link: "#",
  },
  {
    title: "AI Interview Platform",
    category: "AI / LLM",
    year: "2026",
    description: "Automates the interviewer-plus-LLM loop: generates questions, evaluates answers and produces structured candidate reports.",
    tags: ["LLMs", "Python", "Streamlit"],
    link: "#",
  },
  {
    title: "IntelliSettle AI",
    category: "Hackathon · BFSI",
    year: "2026",
    description: "AI-assisted trade settlement matching concept for capital markets — detecting breaks and explaining mismatches.",
    tags: ["AI", "Capital Markets", "Matching"],
    link: "#",
  },
  {
    title: "Cinematic 3D Portfolio",
    category: "Creative Dev",
    year: "2026",
    description: "This site. Three.js scenes, custom GLSL, scroll-driven camera rigs and Lenis smooth scrolling in Next.js.",
    tags: ["Three.js", "R3F", "GSAP", "GLSL"],
    link: "#",
  },
];

export const experience = [
  {
    period: "Present",
    role: "Data Engineer",
    org: "CDM Modernization — Capital Group (client)",
    points: [
      "Modernizing legacy Informatica ETL into PySpark on Databricks.",
      "Designing CDC flows with Delta Change Data Feed into relational targets.",
    ],
  },
  {
    period: "2026",
    role: "Builder",
    org: "BFS AI Hackathon",
    points: [
      "Designed AI concepts for revenue leakage, settlement matching and regulatory intelligence.",
    ],
  },
];

export const lab = {
  title: "Next Evolution",
  text: "The journey doesn't stop at what I know. I'm constantly pushing my boundaries, exploring intelligent systems, advanced AI, high-performance computing and immersive digital experiences.",
  tools: [
    "Advanced AI",
    "Machine Learning",
    "System Architecture",
    "Game Technology",
    "Emerging Tech"
  ],
};
