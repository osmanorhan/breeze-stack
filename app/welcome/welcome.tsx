// app/welcome/welcome.tsx
import { Card, CardContent } from "~/components/ui/card";

const techStack = [
  {
    name: "React Router v7",
    description: "Modern routing with file-based routes",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
      </svg>
    ),
  },
  {
    name: "Prisma ORM",
    description: "Next-generation database toolkit",
    icon: (
      <svg viewBox="0 0 90 90" fill="none" className="w-12 h-12">
        <path
          d="M77.539 69.629L47.706 89.68c-.56.373-1.332.066-1.332-.604V.925c0-.67.772-.977 1.332-.604l29.833 20.05c.856.571.856 1.814 0 2.385L50.394 41.814c-.593.396-.593 1.292 0 1.688l27.145 19.058c.856.571.856 1.814 0 2.385v4.684z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: "Better Auth",
    description: "Simple and secure authentication",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0110 0v4"/>
      </svg>
    ),
  },
  {
    name: "Turso",
    description: "Distributed SQLite for the edge",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V8h2v4zm4 4h-2v-2h2v2zm0-4h-2V8h2v4z"/>
      </svg>
    ),
  },
  {
    name: "shadcn/ui",
    description: "High-quality React components",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 8.5L12 15L22 8.5L12 2Z"/>
        <path d="M2 15.5L12 22L22 15.5" stroke="currentColor" fill="none" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    description: "Utility-first CSS framework",
    icon: (
      <svg viewBox="0 0 24 24" className="w-12 h-12">
        <path
          fill="currentColor"
          d="M12 6C9.33 6 7.67 7.33 7 10C8 8.67 9.17 8.17 10.5 8.5C11.26 8.69 11.81 9.24 12.41 9.85C13.39 10.85 14.5 12 17 12C19.67 12 21.33 10.67 22 8C21 9.33 19.83 9.83 18.5 9.5C17.74 9.31 17.19 8.76 16.59 8.15C15.61 7.15 14.5 6 12 6M7 12C4.33 12 2.67 13.33 2 16C3 14.67 4.17 14.17 5.5 14.5C6.26 14.69 6.81 15.24 7.41 15.85C8.39 16.85 9.5 18 12 18C14.67 18 16.33 16.67 17 14C16 15.33 14.83 15.83 13.5 15.5C12.74 15.31 12.19 14.76 11.59 14.15C10.61 13.15 9.5 12 7 12Z"
        />
      </svg>
    ),
  },
  {
    name: "Conform",
    description: "Form management made easy",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 6L9 17L4 12"/>
      </svg>
    ),
  },
  {
    name: "Zod",
    description: "TypeScript-first schema validation",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
        <path d="M2 17L12 22L22 17"/>
        <path d="M2 12L12 17L22 12"/>
      </svg>
    ),
  },
];

export function Welcome() {
  return (
    <main className="min-h-screen px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Welcome to Breeze Stack 🌪️</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A modern, full-stack web application boilerplate built with speed and developer experience in mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {techStack.map((tech) => (
            <Card key={tech.name} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 text-primary">
                    {tech.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{tech.name}</h3>
                    <p className="text-sm text-muted-foreground">{tech.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Get Started</h2>
          <div className="max-w-xl mx-auto space-y-2 text-muted-foreground">
            <p>
              Check out the documentation in README.md for setup instructions.
            </p>
            <p>
              Built with modern tools for the best development experience.
            </p>
          </div>
          <div className="flex justify-center space-x-4 mt-6">
            <a
              href="https://github.com/osmanorhan/breeze-stack"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M12 2A10 10 0 002 12a10 10 0 006.8 9.5c.5 0 .7-.2.7-.5v-1.7C6.7 20 6.1 18 6.1 18c-.4-1.2-1-1.5-1-1.5-1-.6 0-.6 0-.6 1 0 1.5 1 1.5 1 .9 1.6 2.3 1.1 2.8.9 0-.7.3-1.1.6-1.4-2.2-.2-4.6-1.1-4.6-4.9 0-1.1.4-2 1-2.7 0-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 015 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.3 4.7-4.6 4.9.3.3.6.9.6 1.8V21c0 .3.2.5.7.5 4-1.3 6.8-5 6.8-9.5A10 10 0 0012 2z"/>
              </svg>
              <span>GitHub</span>
            </a>
            <a
              href="/auth/login"
              className="inline-flex items-center space-x-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/80 transition-colors"
            >
              <span>Dashboard Demo</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}