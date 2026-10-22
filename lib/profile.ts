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
  title: "AI Engineer & Forward Deployed Engineer",
  tagline:
    "AI engineer shipping production LLM systems — Microsoft Fabric data agents, source-cited RAG over thousands of documents, and agent skills that automate real back-office work — evaluated honestly and trusted by the people who use them.",
  location: "College Park, MD",
  email: "skameersohail148@gmail.com",
  phone: "+1 (813) 817-1935",
  links: {
    linkedin: "https://www.linkedin.com/in/ameer-shaik-9a6309202/",
    github: "https://github.com/Sohail-5678",
    portfolio: "https://ameer-shaik.vercel.app",
    resume: "/resume.pdf",
  },
  status: "Looking for full-time positions. Available from May 2027",

  about: [
    "I'm an AI engineer and M.S. Data Science student at the University of Maryland, College Park. As an AI Intern at Oldcastle BuildingEnvelope I shipped three production LLM systems that people at the company now use every week.",
    "The headline one is CRL 360 — a Microsoft Fabric Data Agent living inside Microsoft Teams that lets customer service reps ask backlog, order, and delivery questions in plain English across 9 tables of 5M+ rows each. Bridging Snowflake to OneLake meant it ran on existing licensing and replaced a proposed Snowflake Cortex build estimated at $250K+/year for 300 users, at no additional licensing cost.",
    "The other two: a source-cited RAG chatbot on Microsoft Copilot Studio spanning 4,000+ technical documents and 188K+ product SKUs — 95%+ accuracy on 600+ evaluation questions — and an Agent Skill that automates Accounts Payable invoice coding and use tax self-assessment for 15+ weekly vendors, saving roughly 6 hours a week.",
    "Before that I spent a year as a Junior Data Scientist at Proceedit on model evaluation, feature analysis, and ETL for trading signals. What I care about most is the seam between a model that scores well and a system people actually trust — evaluation sets, cited sources, human-in-the-loop review, and metrics that stay honest.",
  ],

  highlights: [
    { value: "3", label: "Production LLM systems" },
    { value: "$250K+", label: "Annual cost avoided" },
    { value: "97%+", label: "Agent answer accuracy" },
    { value: "4,000+", label: "Documents indexed" },
  ],

  experience: [
    {
      role: "AI Intern",
      company: "Oldcastle BuildingEnvelope (OBE)",
      type: "Internship",
      location: "Dallas, TX",
      start: "Jun 2026",
      end: "Aug 2026",
      bullets: [
        "Built the CRL 360 agent as a Microsoft Fabric Data Agent in Microsoft Teams, letting customer service reps ask backlog, order, and delivery questions in plain English over 9 tables of 5M+ rows each; bridged Snowflake to OneLake so the agent ran on existing licensing, replacing a proposed Snowflake Cortex Agent (estimated $250K+/year for 300 users) at no additional licensing cost.",
        "Validated the agent on 170+ real customer service questions through manual review by senior data engineers and LLM-based evaluation, reaching 97%+ answer accuracy before rollout and removing manual report pulls for complex, multi-table questions.",
        "Designed and deployed a Retrieval-Augmented Generation (RAG) chatbot on Microsoft Copilot Studio in Microsoft Teams over 4,000+ technical documents and 188K+ product SKUs; built the ingestion pipeline (OCR, SKU-to-document metadata crosswalk, semantic retrieval) so every answer cites its source, scoring 95%+ accuracy on 600+ evaluation questions and cutting lookup time from minutes to seconds.",
        "Automated weekly invoice coding and use tax self-assessment for the Accounts Payable team by encoding vendor-specific allocation rules into an Agent Skill deployed on Claude and Microsoft Copilot; analysts attach invoices and get an upload-ready Excel workbook with per-vendor sheets for review, live for 15+ weekly and 5 monthly vendors, saving about 6 hours/week plus 5+ hours per month-end cycle.",
      ],
      stack: [
        "Microsoft Fabric",
        "OneLake",
        "Snowflake",
        "Copilot Studio",
        "Claude Agent Skills",
        "RAG",
        "Text-to-SQL",
        "LLM Evaluation",
        "Python",
        "SQL",
      ],
    },
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
        "Automated a daily data preparation workflow with a Python ETL pipeline (PostgreSQL, Google Sheets API); cut runtime from 60 minutes to 3 minutes per sync (92% reduction) and freed 8+ analyst hours per week.",
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
      slug: "hivemind",
      name: "HiveMind",
      tagline: "Multiplayer AI agents your whole team can steer live",
      description:
        "One AI agent session that a whole team shares in real time. Everyone watches the same answer stream in, and anyone can redirect the agent mid-sentence, pause it, hand it off, or fork it into a new room. It works across laptops and phones with no backend of its own.",
      bullets: [
        "Built a shared agent workspace where every teammate sees the same answer stream in, and anyone can redirect the agent mid-sentence, pause and resume it, stop it, or fork the whole session into a new room with its full history.",
        "Wrote the agent runtime so a redirect never fights a human. The interrupted run keeps what it wrote and starts the follow-up itself, a pause or stop clicked a moment later always wins, and a message sent while the agent is busy gets answered right after instead of being dropped.",
        "Made rooms work across devices without running a server. Every update is encrypted in the browser with AES-GCM, using a key derived from the room code, and sent through four public MQTT relays at once, one of them on port 443 so it still connects on locked-down Wi-Fi.",
        "Kept live demos from breaking. Answers stream from a free hosted model, Groq or a local Ollama model, with first-token deadlines, handling for the free tier’s 30 second queue, and an honest fallback, all covered by a 34-check end-to-end suite that drives three clients at once.",
      ],
      stats: [
        { value: "34", label: "E2E checks" },
        { value: "4", label: "Encrypted relays" },
        { value: "5", label: "Live controls" },
      ],
      stack: ["React", "Node.js", "WebSockets", "MQTT", "Web Crypto", "SQLite", "Vercel Edge", "Groq", "Ollama"],
      liveUrl: "https://hivemind-agents.vercel.app/",
      emoji: "🐝",
      accent: "blue",
    },
    {
      slug: "agentforge",
      name: "AgentForge",
      tagline: "Evals, red teaming & prompt optimization for AI agents",
      description:
        "A quality lab for AI agents. It runs ReturnPilot and DataPilot through hundreds of test cases, attacks them with prompt-injection tricks, rewrites their prompts to make them better, and only lets a new version go live when the statistics and a human both say yes.",
      bullets: [
        "Built an eval harness that grades what an agent actually did, not just what it said. It checks which tools were called and in what order, what changed (did the refund go through, did the SQL return the right rows), and whether a hard safety rule was broken, across 247 test cases.",
        "Added an LLM-as-judge that has to earn its vote. Its scores only count once it agrees with human labels at a Cohen’s kappa of 0.6 or higher on 50+ items, so a noisy judge can never sink or save a release.",
        "Wrote 87 attack seeds mapped to the OWASP Top 10 for LLM apps, including injections hidden inside order notes and database rows, plus 13 ways to disguise them, from base64 to look-alike letters to fake system headers. Every blocked attack is traced back to the guardrail that stopped it.",
        "Built a GEPA-style prompt optimizer behind a promotion gate. A new prompt ships only if it wins on test cases it never trained on (McNemar p < 0.05), is no easier to attack, and a human approves the diff. It runs at $0 on Next.js, Neon Postgres and GitHub Actions with 340+ automated tests.",
      ],
      stats: [
        { value: "247", label: "Test cases" },
        { value: "87", label: "Attack seeds" },
        { value: "340+", label: "Automated tests" },
      ],
      stack: ["Python", "Next.js", "GitHub Actions", "TypeScript", "PostgreSQL", "Docker", "Gemini", "Groq"],
      liveUrl: "https://agentforge-eval.vercel.app/",
      repoUrl: "https://github.com/Sohail-5678/AgentForge",
      emoji: "⚒️",
      accent: "amber",
    },
    {
      slug: "returnpilot",
      name: "ReturnPilot",
      tagline: "AI support agent with human approval for refunds",
      description:
        "A customer support agent for an online store that handles order lookups, returns and refunds end to end. The model suggests what to do, a rules engine decides, and anything risky waits for a human to approve.",
      bullets: [
        "Built the agent as a 15-node LangGraph state machine with 9 tools, 6 of them served over MCP (Model Context Protocol), so the safety-critical path lives in code instead of being left to the model.",
        "Added human approval for refunds using LangGraph interrupts and a Postgres checkpointer. A conversation can pause for up to 24 hours, survive a server restart, and pick up exactly where it left off once a reviewer approves, edits or rejects the refund.",
        "Layered four guardrails: input checks, Llama Prompt Guard 2, a pure Python policy engine with 17 rules and 100% test coverage, and an output check that verifies every dollar amount and date against real tool results. It also strips out instructions attackers hide inside order notes.",
        "Added hybrid RAG over 8 policy documents (pgvector plus Postgres full-text search, merged with Reciprocal Rank Fusion), long-term customer memory, and automatic Gemini to Groq fallback with quota tracking. It’s hosted for $0 and tested with 30 eval scenarios and 124 backend tests.",
      ],
      stats: [
        { value: "15", label: "Graph nodes" },
        { value: "30/30", label: "Eval scenarios" },
        { value: "17", label: "Policy rules" },
      ],
      stack: ["LangGraph", "MCP", "FastAPI", "Next.js", "PostgreSQL", "pgvector", "Celery", "Gemini", "Groq"],
      liveUrl: "https://returnpilot-ai.vercel.app/",
      repoUrl: "https://github.com/Sohail-5678/returnpilot",
      emoji: "📦",
      accent: "pink",
    },
    {
      slug: "datapilot",
      name: "DataPilot",
      tagline: "Multi-agent data analyst that answers in SQL",
      description:
        "Ask a business question in plain English and a team of agents plans it, writes the SQL, checks the answer and explains it with a chart. Every number in the reply is checked against the actual data before you ever see it.",
      bullets: [
        "Built a 15-node LangGraph pipeline (planner, schema linker, parallel SQL candidates, verifier, analyst, chart and narrator) that answers questions over 5 SQL databases and streams its progress live.",
        "Made the SQL more reliable with self-consistency. Parallel candidate queries vote by comparing their actual result rows, an LLM verifier breaks ties, and a failed query gets up to 2 automatic repairs.",
        "Kept it read-only three separate ways: an sqlglot guard tested on 156 fixtures, a locked-down SQLite connection, and read-only database files. Any Python the model writes runs only in the user’s browser through Pyodide, so the server never executes model code.",
        "Built a benchmark on a 150-question BIRD Mini-Dev subset with frozen train, validation and test splits and bootstrap confidence intervals, and let people upload their own CSV, Excel or SQLite files as private, read-only datasets.",
      ],
      stats: [
        { value: "5", label: "Databases" },
        { value: "156", label: "Guard tests" },
        { value: "485", label: "Backend tests" },
      ],
      stack: ["LangGraph", "sqlglot", "Pyodide", "Python", "FastAPI", "Next.js", "Gemini", "Groq"],
      liveUrl: "https://datapilot-analyst.vercel.app/",
      repoUrl: "https://github.com/Sohail-5678/Datapilot-Multi-Agent-Data-Analyst",
      emoji: "🧭",
      accent: "cyan",
    },
    {
      slug: "ragnarok",
      name: "Ragnarok",
      tagline: "Multimodal RAG over PDFs, audio & video",
      description:
        "Ask questions across PDFs, audio and video at the same time and get answers that cite the exact page or timestamp they came from. It indexes all three into one hybrid search store and works with four different LLM providers.",
      bullets: [
        "Built a RAG pipeline that reads PDFs, audio and video. Audio is transcribed with Whisper, video frames are pulled with OpenCV and described by a vision model, and everything lands in one ChromaDB index with rich metadata, across 10K+ chunks.",
        "Combined dense vector search with BM25 keyword search using Reciprocal Rank Fusion, then re-ranked the results with a cross-encoder (ms-marco-MiniLM), which cut the irrelevant context reaching the model by about 60%.",
        "Routed answers to any of 4 LLM providers (Groq, OpenAI, Gemini and Claude) with a system prompt that forces a citation to the exact page or timestamp, so every claim can be checked.",
        "Shipped it as a Streamlit app with caching, async batch embedding, and retrieval settings people can tune from the sidebar.",
      ],
      stats: [
        { value: "10K+", label: "Indexed chunks" },
        { value: "4", label: "Modalities" },
        { value: "~60%", label: "Less noise" },
      ],
      stack: ["Python", "Streamlit", "LangChain", "ChromaDB", "OpenCV", "Whisper", "Sentence-Transformers", "BM25"],
      liveUrl: "https://ragnarok-ai.streamlit.app/",
      emoji: "🧿",
      accent: "violet",
    },
    {
      slug: "automl-ify",
      name: "AutoML-ify",
      tagline: "No-code AutoML for non-technical users",
      description:
        "A no-code AutoML web app that lets non-technical people train, tune and compare machine learning models without writing any code. It supports 5+ algorithms and datasets up to 100K rows.",
      bullets: [
        "Built a no-code AutoML app where people upload a dataset, pick a target and get a tuned model back, with 5+ algorithms and automatic hyperparameter search through GridSearchCV.",
        "Wrote a data pipeline that accepts several file formats, validates and cleans them automatically, and handles datasets up to 100K rows with live progress updates.",
        "Designed an evaluation dashboard with clear charts so analysts can compare models without touching code, which cut model development time for business analysts by about 80%.",
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
        "Ask a database a question in plain English and get the SQL and the answer back. It feeds the live schema into every prompt and checks each query before it runs, so it never hands back broken SQL across 50+ tested patterns.",
      bullets: [
        "Built a text-to-SQL engine that lets people query a database in plain English, reaching 90%+ semantic accuracy across 50+ tested query patterns.",
        "Injected the live database schema into each prompt and validated every generated query before running it, so the output was valid SQL 100% of the time.",
        "Ran it on Llama 3.3 through the Groq API behind a Streamlit UI, answering in under 2 seconds on a 100K-row demo dataset.",
      ],
      stats: [
        { value: "90%+", label: "Accuracy" },
        { value: "100%", label: "Valid SQL" },
        { value: "<2s", label: "Latency" },
      ],
      stack: ["Python", "LangChain", "Groq API", "Llama 3.3", "SQLite", "Streamlit"],
      liveUrl: "https://ameer-sohail-dynamic-sql-assistant.streamlit.app/",
      emoji: "🗄️",
      accent: "blue",
    },
    {
      slug: "diabetes",
      name: "Diabetes Prediction",
      tagline: "Interpretable risk model on 150K+ CDC BRFSS records",
      description:
        "A diabetes risk model built on 21 health indicators, with SHAP explanations so a clinician can see why a patient was flagged instead of just getting a score.",
      bullets: [
        "Trained XGBoost, Random Forest and Gradient Boosting classifiers on 150K+ patient records from the CDC BRFSS survey, reaching 95.9% recall and 0.9935 ROC-AUC.",
        "Engineered 18 features from domain knowledge, including interaction terms like BMI times age, polynomial features and composite health scores, which raised recall by 12% and cut down on missed cases.",
        "Used SHAP to explain the model’s decisions, showing general health, BMI and age as the strongest risk factors with measured importance scores.",
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
        "An experimentation project on 162K MovieLens users and 25M ratings that answers one product question properly: does a more varied mix of genres make people rate movies higher? It combines classic hypothesis tests, propensity score matching and Bayesian A/B testing.",
      bullets: [
        "Turned a vague product question into a real test plan on 162K users and 25M ratings, using a suite of 6 tests including Welch’s t-test, Mann-Whitney, chi-square, ANOVA and bootstrap confidence intervals.",
        "Ran sample-size simulations showing 8,200 users per group were needed for 80% power on heavy-tailed rating data.",
        "Estimated the causal effect with propensity score matching on 3 confounders: more genre variety raised ratings by 0.12 stars (95% CI 0.06 to 0.18).",
        "Confirmed it with a Bayesian A/B test (98.3% probability that B beats A) and wrote it up as a clear product recommendation memo.",
      ],
      stats: [
        { value: "162K", label: "Users" },
        { value: "25M", label: "Ratings" },
        { value: "98.3%", label: "P(B>A)" },
      ],
      stack: ["Python", "SciPy", "Statsmodels", "PSM", "Bayesian A/B"],
      emoji: "📊",
      accent: "cyan",
    },
    {
      slug: "sparkflow",
      name: "SparkFlow",
      tagline: "Scalable ETL & feature-store pipeline",
      description:
        "A PySpark and Airflow pipeline that turns millions of raw clickstream events and transactions into clean, model-ready features in under 3 minutes, with data quality checks built in.",
      bullets: [
        "Built a 4-stage PySpark pipeline that processes 2M+ clickstream events and 500K+ transactions in under 3 minutes.",
        "Sessionized user activity with SQL window functions and built 35 aggregated features that feed a feature store.",
        "Scheduled the whole flow as an Airflow DAG with data quality checks for null rates, freshness and drift, plus SLA alerts when something slips.",
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
      title: "LLM Agents & Applications",
      icon: "sparkles",
      items: [
        "Microsoft Fabric Data Agent",
        "Microsoft Copilot Studio",
        "Claude Agent Skills",
        "LangChain",
        "LangGraph",
        "MCP (Model Context Protocol)",
        "RAG pipelines",
        "Text-to-SQL",
        "Prompt engineering",
        "Tool use",
        "Human-in-the-loop workflows",
        "LLM evaluation (LLM-as-judge, test sets)",
        "Red teaming & prompt-injection defense",
        "Source-cited answers",
      ],
    },
    {
      title: "LLM APIs & Retrieval",
      icon: "brain",
      items: [
        "OpenAI / GPT",
        "Anthropic Claude",
        "Gemini",
        "Groq",
        "ChromaDB",
        "pgvector",
        "Sentence-Transformers",
        "Hybrid retrieval (dense + BM25)",
        "Reciprocal Rank Fusion",
        "Cross-encoder re-ranking",
        "OCR document ingestion",
        "Metadata crosswalks",
      ],
    },
    {
      title: "Programming & Querying",
      icon: "code",
      items: [
        "Python (pandas, NumPy, scikit-learn)",
        "SQL (joins, window functions, CTEs)",
        "Java",
        "Bash",
        "Git",
        "Agile development",
        "PostgreSQL",
        "MySQL",
        "SQLite",
      ],
    },
    {
      title: "Data Platforms & Cloud",
      icon: "cloud",
      items: [
        "Microsoft Fabric",
        "OneLake",
        "Snowflake",
        "Microsoft Teams integration",
        "ETL pipelines",
        "PySpark",
        "Apache Airflow",
        "Schema validation",
        "Data quality checks",
        "AWS",
        "GCP",
        "Azure",
      ],
    },
    {
      title: "Machine Learning & Analytics",
      icon: "chart",
      items: [
        "PyTorch",
        "TensorFlow",
        "XGBoost",
        "Random Forest",
        "Gradient Boosting",
        "Classification",
        "Forecasting",
        "Feature engineering",
        "Hyperparameter tuning",
        "SHAP",
        "A/B testing",
        "Power BI (DAX, Power Query)",
        "Streamlit",
      ],
    },
  ] satisfies SkillGroup[],

  education: [
    {
      degree: "M.S. in Data Science",
      school: "University of Maryland, College Park",
      location: "College Park, MD, USA",
      start: "Aug 2025",
      end: "May 2027",
      notes: "Expected graduation May 2027. Focus areas: LLM systems, machine learning, NLP.",
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
  lines.push(`Portfolio: ${profile.links.portfolio}`);
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
    // Links are part of the corpus so the concierge can hand a recruiter the
    // live demo or the public source instead of saying it doesn't know.
    lines.push(`Live demo: ${p.liveUrl ?? "no public demo for this one"}`);
    lines.push(
      `Public source code: ${p.repoUrl ?? "no source link is shared for this project"}`,
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
