export interface Experience {
  company: string;
  role: string;
  location?: string;
  start: string;
  end: string;
  bullets: string[];
  stack?: string[];
}

export interface Project {
  name: string;
  timeframe?: string;
  description: string;
  highlights?: string[];
  stack?: string[];
  url?: string;
}

export interface Education {
  school: string;
  degree: string;
  grad: string;
  location?: string;
  gpa?: string;
}

export interface Resume {
  experience: Experience[];
  projects: Project[];
  education: Education[];
  certifications?: string[];
  skills: {
    languages: string[];
    frameworks: string[];
    tools: string[];
  };
  links?: {
    linkedin: string;
    github: string;
    email?: string;
  };
}

// Resume data from Prithvi Saran Sathyasaran's actual resume
export const resumeData: Resume = {
  experience: [
    {
      company: "Cloud Jovy",
      role: "Mobile App Development Intern - Fall",
      location: "San Diego, CA (Remote)",
      start: "Oct 2025",
      end: "Present",
      bullets: [
        "Built a cross-platform Flutter app for 500+ users, streamlining communication, event management, and training resources",
        "Architected a scalable front-end using Riverpod, improving app responsiveness and reducing UI rebuild times by 35% across iOS and Android",
        "Integrated a Firebase backend for authentication, real-time notifications, and data sync, ensuring 99.9% uptime and multi-role access",
        "Implemented Stripe payment workflows for event registrations and achieved 100% transaction success rate in testing",
        "Developed dynamic video lesson and event modules, enabling coaches to assign targeted sessions and increasing engagement by 40%",
        "Collaborated in Agile sprints with design, conducting code reviews and optimizations that reduced feature delivery time by 25%",
      ],
      stack: ["Flutter", "Riverpod", "Firebase", "Stripe", "iOS", "Android"],
    },
    {
      company: "Prommuni",
      role: "Mobile App Development Intern - Summer",
      location: "Germantown, MD",
      start: "May 2025",
      end: "Aug 2025",
      bullets: [
        "Built a cross-platform roommate-finder app in Flutter using MVVM + GetX to ensure scalability, maintainability, and clean state management",
        "Implemented Firebase authentication, session storage, and real-time chat, ensuring secure, low-latency communication for 500+ test users",
        "Integrated Mapbox SDK with geolocation, pins, and radius search, improving roommate matching accuracy by 40% during pilot rollout",
        "Optimized API calls, caching, and rendering pipelines, reducing map load time by 30% and boosting app responsiveness",
        "Automated deployments with GitHub Actions CI/CD, cutting build errors by 25% and accelerating release cycles",
      ],
      stack: ["Flutter", "MVVM", "GetX", "Firebase", "Mapbox", "GitHub Actions"],
    },
    {
      company: "Limitless 360",
      role: "Junior App Developer",
      location: "Coimbatore, India",
      start: "Nov 2022",
      end: "Jul 2024",
      bullets: [
        "Designed and delivered 12+ production mobile applications using Flutter, Firebase, and REST APIs, reaching a combined 10K+ active users",
        "Implemented reusable UI components and modular APIs, reducing code duplication by 30% and standardizing development practices",
        "Improved system responsiveness and database sync speeds by 40% through query optimization and caching strategies",
        "Partnered with cross-functional teams in Agile sprints, accelerating feature delivery by 15% across multiple apps",
        "Deployed apps on Google Play and App Store, ensuring compliance with store guidelines and smooth rollout processes",
      ],
      stack: ["Flutter", "Firebase", "REST API", "Google Play", "App Store"],
    },
    {
      company: "TechCiti Technologies",
      role: "Software Engineer Intern",
      location: "Bangalore, India",
      start: "Jun 2022",
      end: "Aug 2022",
      bullets: [
        "Developed and deployed RESTful APIs with Django, ensuring clean, modular, and scalable backend design for client applications",
        "Assisted in database schema optimization, reducing query latency by 20% in production workloads",
        "Wrote detailed API documentation to support frontend integration and reduce developer onboarding time",
        "Deployed backend improvements into production environments, enhancing stability and reducing bug reports by 15%",
      ],
      stack: ["Django", "Python", "REST API", "PostgreSQL"],
    },
  ],
  projects: [
    {
      name: "AuraTranslate",
      timeframe: "Oct 2025 – Present",
      description: "iOS native app with ML packages for live translation through images with fluid UI",
      highlights: [
        "Building an iOS native application using Swift and Core ML for real-time image-based translation",
        "Implementing computer vision and natural language processing for instant visual translation",
        "Designing fluid, iOS-native UI following Apple Human Interface Guidelines",
        "Integrating camera functionality with ML models for seamless translation experience",
      ],
      stack: ["Swift", "SwiftUI", "Core ML", "Vision Framework", "NLP"],
      url: "https://github.com/prithvisaran3",
    },
    {
      name: "Adaptive Fine-Tuning of LLMs for Historical Event Narration Using LoRA",
      timeframe: "Sep 2025 – Present",
      description: "Fine-tuning LLMs using LoRA for generating engaging historical narratives with creative alternatives",
      highlights: [
        "Implementing LoRA (Low-Rank Adaptation) to adapt pre-trained LLM (Mistral-7B) for historical storytelling",
        "Fine-tuning on custom dataset of historical events from Wikipedia for narrative generation",
        "Enabling model to narrate events with creative 'what-if' alternatives and underrepresented perspectives",
        "Building interactive system for generating engaging historical narratives",
      ],
      stack: ["Python", "PyTorch", "LoRA", "Mistral-7B", "HuggingFace", "NLP"],
      url: "https://github.com/prithvisaran3",
    },
    {
      name: "Amazon Retail Sales Forecasting",
      timeframe: "Jan 2025 – Apr 2025",
      description: "Machine learning model to forecast Amazon retail sales with granular SKU-level insights",
      highlights: [
        "Led the development of a machine learning model using Python and XGBoost to forecast Amazon retail sales",
        "Engineered a predictive solution that provided granular SKU-level insights, achieving a Mean Absolute Error (MAE) of 119",
        "Developed and implemented robust data pipelines for data preprocessing and feature engineering",
        "Presented findings, demonstrating the model's value in optimizing logistics and inventory",
      ],
      stack: ["Python", "XGBoost", "Pandas", "NumPy", "Machine Learning"],
    },
    {
      name: "Pawfect - Pet Dating iOS Mobile App",
      timeframe: "Sep 2024 - Nov 2024",
      description: "Full-featured social iOS app with matchmaking algorithm and real-time chat for pet owners",
      highlights: [
        "Architected and built a full-featured social iOS app using Swift, including a unique matchmaking algorithm and real-time chat",
        "Integrated robust backend services from Firebase and Supabase for secure user authentication and data management",
        "Optimized critical user flows by applying Apple-native design patterns, resulting in a 25% reduction in message delivery latency",
        "Leveraged the Google Maps API to implement interactive geolocation services, enabling local connections between users",
      ],
      stack: ["Swift", "SwiftUI", "Firebase", "Supabase", "Google Maps API"],
      url: "https://github.com/prithvisaran3/Pawfect",
    },
    {
      name: "Prommuni - Roommate Finder Mobile App",
      timeframe: "Jan 2024 – Aug 2024",
      description: "Cross-platform roommate finder app with real-time chat and smooth liquid UI for iOS and Android",
      highlights: [
        "Built a roommate-finder mobile app using Flutter with MVC architecture and GetX for state management",
        "Integrated Supabase for backend, implementing real-time chat features through cloud functions",
        "Designed smooth and liquid UI that works seamlessly across both iOS and Android platforms",
        "Implemented geolocation services and radius-based search for enhanced roommate matching",
      ],
      stack: ["Flutter", "GetX", "Supabase", "MVC", "Cloud Functions", "Mapbox"],
      url: "https://github.com/prithvisaran3/Prommuni",
    },
    {
      name: "Oxford Psych Courses - LMS Mobile App",
      timeframe: "Sep 2023 - Nov 2023",
      description: "Full-stack Learning Management System for Oxford University psychology courses",
      highlights: [
        "Managed both Android and iOS platforms with comprehensive UI/UX design",
        "Integrated backend APIs and employed dynamic animations for enhanced user engagement",
        "Assumed complete project ownership, crafting seamless API integrations",
        "Optimized database queries and improved content loading speeds by 40%",
      ],
      stack: ["Flutter", "REST API", "MVC", "Cloud Storage", "Animations"],
    },
    {
      name: "ExSpends - Expense Tracking Flutter App",
      timeframe: "Aug 2023 – Oct 2023",
      description: "Appealing expense-tracking app with integrated REST API features",
      highlights: [
        "Designed an expense-tracking app with Flutter for frontend and Laravel PHP for backend",
        "Utilized GetX for state management and MySQL for database management",
        "Incorporated smooth animations using RIVE for enhanced user experience",
        "Integrated REST API features for seamless data synchronization",
      ],
      stack: ["Flutter", "GetX", "Laravel", "PHP", "MySQL", "RIVE", "REST API"],
      url: "https://github.com/prithvisaran3/ExSpends",
    },
    {
      name: "WooCommerce Flutter - E-commerce Mobile App",
      timeframe: "2023",
      description: "Flutter mobile app bridging WordPress and Flutter with unique UI using MVVM architecture",
      highlights: [
        "Developed a WooCommerce app with a unique UI creating a bridge between WordPress and Flutter",
        "Integrated WooCommerce REST API for seamless e-commerce functionality",
        "Implemented MVVM architecture for clean, maintainable code structure",
        "Used Firebase for additional functionalities and real-time features",
      ],
      stack: ["Flutter", "MVVM", "WooCommerce API", "WordPress", "Firebase"],
      url: "https://github.com/prithvisaran3",
    },
    {
      name: "Indexing Contents of Documents Using a Hybrid LDA Model",
      timeframe: "Dec 2021",
      description: "API using unsupervised topic modeling algorithm for document analysis and similarity ranking",
      highlights: [
        "Designed an API using Python that analyzes documents using LDA (Latent Dirichlet Allocation)",
        "Implemented unsupervised topic modeling algorithm for document understanding",
        "Returns most related documents to an unknown document, ranked by similarity",
        "Built scalable solution for document indexing and retrieval",
      ],
      stack: ["Python", "LDA", "NLP", "Machine Learning", "API Development"],
    },
    {
      name: "Archiving and Management Software for a Law Firm",
      timeframe: "Jun 2021",
      description: "Access-controlled archive management system using the Waterfall model",
      highlights: [
        "Created an access-controlled archive management system ensuring reliability",
        "Developed using the Waterfall model for systematic project development",
        "Built website using HTML, CSS, JavaScript, and PHP",
        "Implemented secure user authentication and document management features",
      ],
      stack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    },
  ],
  education: [
    {
      school: "The George Washington University",
      degree: "M.S. in Computer Science",
      grad: "May 2026",
      location: "Washington, DC",
    },
    {
      school: "Vellore Institute of Technology",
      degree: "B.Tech in Computer Science and Engineering",
      grad: "May 2023",
      location: "Vellore, India",
    },
  ],
  certifications: [
    "AWS Certified Cloud Practitioner, AWS (2024) - Credential ID: aadfbdeb8502401093e75642731e8ac3",
    "Project Management Virtual Experience, Accenture (Feb 2023) - Completed Accenture Virtual Experience program, gaining practical insights into project management methodologies, proposal preparation, and leadership skills - Credential ID: 38RQbeARDZz7CGPaP",
    "Decentralized Applications - Authorized by the University at Buffalo, Coursera (Mar 2022)",
    "Algorithmic Thinking (Part 2) - Authorized by Rice University, Coursera (Jun 2020) - Credential URL: https://coursera.org/verify/AEDBEYTVQFUC",
  ],
  skills: {
    languages: ["Python", "Dart", "Swift", "Java", "JavaScript", "TypeScript", "C/C++", "HTML/CSS", "SQL", "PHP", "Kotlin"],
    frameworks: [
      "Flutter",
      "SwiftUI",
      "Django",
      "Laravel",
      "Node.js",
      "React",
      "Next.js",
      "Scikit-learn",
      "NumPy",
      "Pandas",
      "OpenCV",
      "PyTorch",
      "Core ML",
      "GetX",
      "Riverpod",
      "MVVM",
      "MVC",
    ],
    tools: [
      "Firebase",
      "Supabase",
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "AWS",
      "Git",
      "GitHub Actions",
      "Docker",
      "Android Studio",
      "Xcode",
      "RESTful APIs",
      "WooCommerce",
      "WordPress",
      "Mapbox",
      "Google Maps API",
      "Stripe",
      "CI/CD",
      "RIVE",
      "HuggingFace",
      "LoRA",
      "Vision Framework",
    ],
  },
  links: {
    linkedin: "https://www.linkedin.com/in/prithvisaransathyasaran/",
    github: "https://github.com/prithvisaran3",
    email: "prithvisarans@gwu.edu",
  },
};

