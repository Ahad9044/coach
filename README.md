Sensei: AI-Powered Career Coach
Sensei is a full-stack SaaS platform designed to streamline professional career development. It leverages Generative AI to provide personalized job market insights, interview preparation, and automated document generation.

🚀 Key Features
AI-Driven Resume Builder: Generates ATS-optimized, markdown-based resumes with AI-assisted content improvement and one-click PDF export functionality.
Smart Interview Prep: Conducts AI-powered mock interviews with dynamic questioning based on user-provided skills, followed by performance analytics using Recharts.
Weekly Industry Insights: Implements a automated cron-job architecture using Inngest to keep users updated on salary trends and in-demand skills.
Cover Letter Generator: Context-aware generation of tailored cover letters based on specific job descriptions and user profiles.
🛠 Tech Stack
Frontend: React 19, Next.js 15, Tailwind CSS, Shadcn UI.
Backend & DB: Prisma ORM, NeonDB (PostgreSQL), Clerk Authentication.
AI & Logic: Gemini API (Generative AI), Inngest (Background Jobs).
Tools: React Hook Form & Zod (form validation), html2pdf (document export).
💡 Engineering Highlights
Background Jobs: Architected a robust weekly cron job using Inngest to fetch and cache industry data, ensuring high performance and data availability without manual intervention.
AI Integration: Successfully integrated Gemini API with structured JSON prompting to ensure consistent and parseable data for frontend rendering.
Data Validation: Utilized Zod for comprehensive schema validation, ensuring data integrity across complex onboarding and resume creation flows.
📂 Project Setup
Clone the repository.
Install dependencies: npm install.
Configure your .env file with Clerk, Gemini, and NeonDB credentials.
Run the development server: npm run dev.
