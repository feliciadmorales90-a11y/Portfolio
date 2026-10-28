import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="relative z-10 py-8 px-6 border-t border-card-border/50">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted">© {new Date().getFullYear()} Felicia Morales</p>
        <div className="flex items-center gap-6">
          <a href={`mailto:${site.email}`} className="text-sm text-muted hover:text-accent transition-colors">
            Email
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-accent transition-colors">
            LinkedIn
          </a>
          <a href={site.resume} target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-accent transition-colors">
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
}
