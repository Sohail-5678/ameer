// =============================================================================
// PROFILE — single source of truth.
// The UI components AND the AI assistant's RAG context are both built from this
// file. Update once, and everything (visible portfolio + AI answers) stays in
// sync. This is the anti-hallucination contract.
// =============================================================================

export type Experience = {
  role: string;
  company: string;
  type: string; // "Full-time", "Internship", etc.
  location: string;
  start: string;
  end: string;
  bullets: string[];
  stack: string[];
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  bullets: string[];
  stats: { value: string; label: string }[];
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  emoji: string;
  accent: "violet" | "cyan" | "pink" | "lime" | "amber" | "blue";
};

export type Education = {
  degree: string;
  school: string;
  location: string;
  start: string;
  end: string;
  notes?: string;
};

export type SkillGroup = {
  title: string;
  icon: string;
  items: string[];
};

export const profile = {
  name: "Ameer Sohail Shaik",
  shortName: "Ameer",
  title: "Machine Learning Engineer & Data Scientist",
  tagline:
    "Data scientist & ML/AI engineer shipping production systems — from rigorous experimentation and forecasting to multimodal RAG and GenAI pipelines — that turn complex data into measurable business impact.",
  location: "College Park, MD",
  email: "skameersohail148@gmail.com",
  phone: "+1 (813) 817-1935",
  links: {
    linkedin: "https://www.linkedin.com/in/ameer-sohail-shaik-9a6309202/",
    github: "https://github.com/Sohail-5678",
    portfolio: "https://ameer-shaik.vercel.app",
    resume: "/resume.pdf",
  },
  status: "Open to Summer 2026 Data Science / ML / AI internship opportunities",

  about: [
    "I'm a Data Science graduate student at the University of Maryland, College Park, with a Computer Science background and hands-on experience shipping production ML systems.",
    "My work has spanned stock-direction forecasting across 200+ tickers, multimodal Retrieval-Augmented Generation pipelines, automated A/B testing & causal inference at MovieLens scale, and large-scale Spark feature stores.",
    "I sit at the intersection of research and engineering — taking models from a Jupyter notebook to a deployed API with monitoring, caching, and CI/CD.",
  ],

  highlights: [
    { value: "1+", label: "Years experience" },
    { value: "6", label: "Featured projects" },
    { value: "200+", label: "Tickers modeled" },
    { value: "25M", label: "Ratings analyzed" },
  ],

  experience: [
    {
      role: "Junior Data Scientist",
      company: "Proceedit",
      type: "Full-time · Remote",
      location: "Remote",
      start: "Aug 2024",
      end: "Aug 2025",
      bullets: [
        "Designed an offline evaluation framework in Python that compared 10 ML model architectures on directional accuracy, Sharpe ratio, and max drawdown; gradient-boosted models matched deep learning precision (65%) at 12× lower inference cost, blocking an over-engineered LSTM from production.",
        "Ran feature importance analysis on 8 candidate signals across 200+ tickers; lagged sector-ETF returns came out as the strongest predictor and shifted the trading signals team off an ARIMA baseline onto supervised learning.",
        "Automated a daily data preparation workflow with a Python ETL pipeline (PostgreSQL, Google Sheets API); cut runtime from 60 minutes to 3 minutes per sync (95% reduction) and freed 8+ analyst hours per week.",
        "Wrote production SQL (joins, window functions, CTEs) to reconcile OHLCV data across 4 source tables; added schema validation checks that eliminated recurring data quality errors in downstream reporting.",
      ],
      stack: ["Python", "XGBoost", "PostgreSQL", "Pandas", "Scikit-learn", "SQL", "ETL"],
    },
    {
      role: "Data Science Intern",
      company: "SBP Consulting Pvt Ltd",
      type: "Internship",
      location: "Hyderabad, India",
      start: "Jan 2024",
      end: "May 2024",
      bullets: [
        "Analyzed 12 client accounts' SAP S/4HANA records and identified recency-weighted purchase frequency and seasonal spend ratios as top revenue predictors; engineered these into an XGBoost model achieving 87% accuracy (MAPE 13%), with results directly shaping quarterly C-suite planning recommendations.",
        "Designed 5 interactive Power BI dashboards mapping sales trends, churn-risk segments, and 7+ KPIs to executive questions; replaced a 2-day manual Excel reporting cycle with a 4-hour automated refresh, enabling stakeholder self-service and cutting ad-hoc data requests by ~60%.",
        "Reduced data-preparation time by 45% by building Python scripts (pandas, NumPy) consolidating 4 SAP modules into analysis-ready formats via standardized cleaning logic (null imputation, duplicate detection, schema validation), eliminating recurring quality errors across 3 downstream pipelines.",
      ],
      stack: ["Scikit-learn", "XGBoost", "SQL", "SAP S/4HANA", "Power BI", "Pandas"],
    },
  ] satisfies Experience[],

  projects: [
    {
      slug: "ragnarok",
      name: "Ragnarok",
      tagline: "Multimodal RAG over PDFs, audio & video",
      description:
        "Production-grade RAG pipeline that ingests PDFs, audio (Whisper), and video (OpenCV + vision-model captions), unifies them in a hybrid ChromaDB store, and answers questions with citation-enforced LLM responses across 4 providers.",
      bullets: [
        "Engineered a multimodal RAG pipeline processing PDFs, audio (Whisper transcription), and video (OpenCV frame extraction + vision-model descriptions), indexing 4 content modalities into a unified ChromaDB vector store with rich metadata for sub-second hybrid retrieval across 10K+ chunks.",
        "Implemented an ensemble retrieval system combining dense cosine search with BM25 sparse ranking via Reciprocal Rank Fusion, then cross-encoder re-ranking (ms-marco-MiniLM), reducing irrelevant context passed to generation by ~60%.",
        "Built a model-agnostic generation layer routing queries to 4 LLM providers (Groq, OpenAI, Gemini, Claude) with a citation-enforcing system prompt, deployed behind a glassmorphism Streamlit UI with production caching, async batch embedding, and configurable retrieval params.",
      ],
      stats: [
        { value: "10K+", label: "Indexed chunks" },
        { value: "4", label: "Modalities" },
        { value: "~60%", label: "Less noise" },
      ],
      stack: [
        "Python",
        "Streamlit",
        "LangChain",
        "ChromaDB",
        "OpenCV",
        "Whisper",
        "Sentence-Transformers",
        "BM25",
      ],
      liveUrl: "https://ragnarok-ai.streamlit.app/",
      emoji: "🧿",
      accent: "violet",
    },
    {
      slug: "automl-ify",
      name: "AutoML-ify",
      tagline: "No-code AutoML for non-technical users",
      description:
        "End-to-end AutoML web app letting non-technical users train, tune, and evaluate ML models without writing a line of code — supporting 5+ algorithms and datasets up to 100K rows.",
      bullets: [
        "Built an end-to-end AutoML web app supporting 5+ algorithms with automated hyperparameter tuning via GridSearchCV, enabling non-technical users to build ML models without coding.",
        "Engineered a scalable data pipeline supporting multiple file formats with automated validation and preprocessing on datasets up to 100K rows with real-time progress tracking.",
        "Implemented a comprehensive model-evaluation dashboard with rich visualizations, cutting model-development time for business analysts by ~80%.",
      ],
      stats: [
        { value: "5+", label: "Algorithms" },
        { value: "100K", label: "Max rows" },
        { value: "80%", label: "Time saved" },
      ],
      stack: ["Python", "Streamlit", "Scikit-learn", "GridSearchCV"],
      liveUrl: "https://ameer-sohail-automl-ify.streamlit.app/",
      emoji: "🤖",
      accent: "lime",
    },
    {
      slug: "sql-assistant",
      name: "Dynamic SQL Assistant",
      tagline: "Text-to-SQL with 90%+ semantic accuracy",
      description:
        "Natural-language-to-SQL engine with dynamic schema injection, prompt orchestration, and SQL validation — guaranteeing syntactic correctness across 50+ tested query patterns.",
      bullets: [
        "Built a Text-to-SQL engine enabling natural-language database queries with 90%+ semantic accuracy across 50+ tested patterns.",
        "Architected prompt orchestration with dynamic schema injection and SQL validation to guarantee syntactic correctness (100% valid SQL output).",
        "Deployed behind a Streamlit UI with sub-2-second processing for a 100K-row demo dataset.",
      ],
      stats: [
        { value: "90%+", label: "Accuracy" },
        { value: "100%", label: "Valid SQL" },
        { value: "<2s", label: "Latency" },
      ],
      stack: ["Python", "LangChain", "Groq API", "Llama 3.3", "SQLite", "Streamlit"],
      liveUrl: "https://ameer-sohail-dynamic-sql-assistant.streamlit.app/",
      emoji: "�",
      accent: "blue",
    },
    {
      slug: "diabetes",
      name: "Diabetes Prediction",
      tagline: "Interpretable risk model on 150K+ CDC BRFSS records",
      description:
        "Binary classification system predicting diabetes risk from 21 health indicators using ensemble methods, with SHAP-based interpretability for clinical decision-making transparency.",
      bullets: [
        "Developed a binary classifier on 150K+ patient records from the CDC BRFSS dataset using XGBoost, Random Forest, and Gradient Boosting — achieving 95.9% recall and 0.9935 ROC-AUC.",
        "Engineered 18 predictive features via domain-driven feature engineering: interaction terms (BMI×Age), polynomial features, and composite health scores — improving recall by 12% and minimizing false negatives.",
        "Implemented SHAP for model interpretability, identifying GenHlth, BMI, and Age as top risk factors with quantified feature-importance scores.",
      ],
      stats: [
        { value: "95.9%", label: "Recall" },
        { value: "0.9935", label: "ROC-AUC" },
        { value: "150K+", label: "Records" },
      ],
      stack: ["Python", "XGBoost", "Random Forest", "Gradient Boosting", "SHAP", "Pandas"],
      liveUrl: "https://sohail-umd.github.io/",
      emoji: "🩺",
      accent: "pink",
    },
    {
      slug: "streamtest",
      name: "StreamTest",
      tagline: "A/B testing & causal inference on streaming data",
      description:
        "End-to-end experimentation platform on 162K MovieLens users (25M ratings) running a 6-test hypothesis suite plus propensity-score matching and Bayesian A/B to translate the question 'Does genre diversification improve user satisfaction?' into a clear product recommendation.",
      bullets: [
        "Operationalized a product question on 162K users / 25M ratings with a 6-test suite (Welch's t, Mann-Whitney, chi-square, ANOVA, bootstrap CIs); designed sample-size simulations showing 8,200 users/group needed at 80% power on heavy-tailed data.",
        "Estimated the causal effect of genre diversity on ratings (+0.12 stars, 95% CI [0.06, 0.18]) via propensity score matching controlling for 3 confounders.",
        "Validated with Bayesian A/B testing (98.3% P(B>A)) and translated findings into a clear product recommendation memo.",
      ],
      stats: [
        { value: "162K", label: "Users" },
        { value: "25M", label: "Ratings" },
        { value: "98.3%", label: "P(B>A)" },
      ],
      stack: [
        "Python",
        "SciPy",
        "Statsmodels",
        "PSM",
        "Bayesian A/B",
      ],
      emoji: "📊",
      accent: "cyan",
    },
    {
      slug: "sparkflow",
      name: "SparkFlow",
      tagline: "Scalable ETL & feature-store pipeline",
      description:
        "PySpark + Airflow pipeline processing millions of clickstream events and transactions in under 3 minutes, with sessionization, 35 aggregated features, and orchestrated data-quality checks.",
      bullets: [
        "Processed 2M+ clickstream events and 500K+ transactions through a 4-stage PySpark pipeline in under 3 minutes.",
        "Wrote sessionization via SQL window functions and built 35 aggregated features fed into a feature store.",
        "Orchestrated data-quality checks (null rates, freshness, drift detection) via an Airflow DAG with SLA alerting.",
      ],
      stats: [
        { value: "2M+", label: "Events" },
        { value: "35", label: "Features" },
        { value: "<3min", label: "Pipeline" },
      ],
      stack: ["PySpark", "SQL", "Apache Airflow", "ETL", "Feature Store"],
      emoji: "⚡",
      accent: "amber",
    },
  ] satisfies Project[],

  skills: [
    {
      title: "Languages & Databases",
      icon: "code",
      items: ["Python", "SQL", "Java", "PostgreSQL", "MySQL", "SQLite", "MongoDB"],
    },
    {
      title: "Data Science & ML",
      icon: "brain",
      items: [
        "Pandas",
        "NumPy",
        "Scikit-learn",
        "TensorFlow",
        "XGBoost",
        "LSTM",
        "Feature Engineering",
        "EDA",
        "ETL",
      ],
    },
    {
      title: "NLP & GenAI",
      icon: "sparkles",
      items: ["LangChain", "Llama", "RAG", "ChromaDB", "Sentence-Transformers", "Whisper"],
    },
    {
      title: "Tools & Deployment",
      icon: "rocket",
      items: ["Flask", "GraphQL", "Git", "CI/CD", "Docker", "Airflow", "Spark", "Streamlit"],
    },
    {
      title: "Visualization & BI",
      icon: "chart",
      items: ["Tableau", "Power BI", "Matplotlib", "Plotly", "Seaborn"],
    },
    {
      title: "Cloud Platforms",
      icon: "cloud",
      items: ["AWS S3", "AWS Redshift", "AWS Lambda", "AWS QuickSight"],
    },
  ] satisfies SkillGroup[],

  education: [
    {
      degree: "M.S. in Data Science",
      school: "University of Maryland, College Park",
      location: "College Park, MD, USA",
      start: "2025",
      end: "Present",
      notes: "Focus areas: Machine Learning, NLP, GenAI.",
    },
    {
      degree: "B.Tech in Computer Science & Engineering",
      school: "Vellore Institute of Technology",
      location: "Andhra Pradesh, India",
      start: "2020",
      end: "2024",
    },
  ] satisfies Education[],
};

// -----------------------------------------------------------------------------
// RAG knowledge base — flat string the LLM uses as ground truth.
// Generated from the same `profile` object so UI and AI never drift.
// -----------------------------------------------------------------------------
export function buildKnowledgeBase(): string {
  const lines: string[] = [];

  lines.push(`# CANDIDATE: ${profile.name}`);
  lines.push(`Title: ${profile.title}`);
  lines.push(`Location: ${profile.location}`);
  lines.push(`Status: ${profile.status}`);
  lines.push(`Email: ${profile.email}`);
  lines.push(`Phone: ${profile.phone}`);
  lines.push(`LinkedIn: ${profile.links.linkedin}`);
  lines.push(`GitHub: ${profile.links.github}`);
  lines.push("");

  lines.push("## ABOUT");
  for (const p of profile.about) lines.push(`- ${p}`);
  lines.push("");

  lines.push("## EXPERIENCE");
  for (const e of profile.experience) {
    lines.push(`### ${e.role} — ${e.company} (${e.type})`);
    lines.push(`Dates: ${e.start} – ${e.end} | Location: ${e.location}`);
    lines.push(`Stack: ${e.stack.join(", ")}`);
    for (const b of e.bullets) lines.push(`- ${b}`);
    lines.push("");
  }

  lines.push("## PROJECTS");
  for (const p of profile.projects) {
    lines.push(`### ${p.name} — ${p.tagline}`);
    lines.push(`Description: ${p.description}`);
    lines.push(`Stack: ${p.stack.join(", ")}`);
    lines.push(
      `Quantitative results: ${p.stats.map((s) => `${s.value} ${s.label}`).join("; ")}`,
    );
    for (const b of p.bullets) lines.push(`- ${b}`);
    lines.push("");
  }

  lines.push("## SKILLS");
  for (const s of profile.skills) {
    lines.push(`- **${s.title}**: ${s.items.join(", ")}`);
  }
  lines.push("");

  lines.push("## EDUCATION");
  for (const e of profile.education) {
    lines.push(`- ${e.degree}, ${e.school} (${e.start} – ${e.end}), ${e.location}${e.notes ? ` — ${e.notes}` : ""}`);
  }

  return lines.join("\n");
}
