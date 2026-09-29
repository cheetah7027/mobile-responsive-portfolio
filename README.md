Directory structure:
└── cheetah7027-ese-target/
    ├── README.md
    ├── index.html
    ├── package.json
    ├── supabase_schema.sql
    ├── vite.config.js
    ├── .env.example
    ├── .oxlintrc.json
    ├── public/
    │   └── .nojekyll
    ├── src/
    │   ├── App.css
    │   ├── App.jsx
    │   ├── index.css
    │   ├── main.jsx
    │   ├── components/
    │   │   ├── auth/
    │   │   │   ├── LoginScreen.jsx
    │   │   │   └── UserAuthModal.jsx
    │   │   ├── common/
    │   │   │   ├── Badge.jsx
    │   │   │   ├── Card.jsx
    │   │   │   ├── Icon.jsx
    │   │   │   ├── LogoIcon.jsx
    │   │   │   ├── ProgressBar.jsx
    │   │   │   └── StatCard.jsx
    │   │   ├── layout/
    │   │   │   ├── MobileNavbar.jsx
    │   │   │   ├── QuickAddModal.jsx
    │   │   │   └── Sidebar.jsx
    │   │   ├── onboarding/
    │   │   │   └── OnboardingWizard.jsx
    │   │   └── timer/
    │   │       └── PomodoroTimerModal.jsx
    │   ├── context/
    │   │   └── AppContext.jsx
    │   ├── data/
    │   │   └── initialData.js
    │   ├── lib/
    │   │   └── supabase.js
    │   └── pages/
    │       ├── Analytics.jsx
    │       ├── Chapters.jsx
    │       ├── Dashboard.jsx
    │       ├── MainsMode.jsx
    │       ├── MistakeLog.jsx
    │       ├── MockTests.jsx
    │       ├── Paper1Tracker.jsx
    │       ├── PYQTracker.jsx
    │       ├── RevisionEngine.jsx
    │       ├── Roadmap.jsx
    │       ├── Settings.jsx
    │       ├── SmartPlan.jsx
    │       ├── SubjectDetail.jsx
    │       ├── Subjects.jsx
    │       └── UserManagement.jsx
    └── .github/
        └── workflows/
            └── deploy.yml
