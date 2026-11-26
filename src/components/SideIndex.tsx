import { useEffect, useState } from "react";

const INDEX_ITEMS = [
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "research", label: "Research" },
  { id: "leadership", label: "Leadership" },
  { id: "achievements", label: "Achievements" },
  { id: "education", label: "Education" },
  { id: "github", label: "GitHub" },
];

export function SideIndex() {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      for (const item of INDEX_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const { top, bottom } = el.getBoundingClientRect();
          if (top <= 200 && bottom > 200) {
            setActiveSection(item.id);
            return;
          }
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside className="fixed top-[26vh] left-[calc(50%+410px)] pointer-events-auto hidden xl:flex flex-col gap-3.5 z-30">
      <h3 className="font-mono text-[10px] font-bold tracking-[0.2em] text-[var(--soft)] uppercase mb-1">
        INDEX
      </h3>
      {INDEX_ITEMS.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <a
            key={item.id}
            href={`/#${item.id}`}
            className={`group flex items-center gap-2.5 font-mono text-[12px] font-medium tracking-[0.05em] transition-all duration-300 ${isActive
                ? "text-[var(--fg)] font-semibold"
                : "text-[var(--soft)] hover:text-[var(--muted)]"
              }`}
          >
            <span
              className={`h-[1px] bg-current transition-all duration-300 ${isActive ? "w-4" : "w-0 group-hover:w-2"
                }`}
            />
            {item.label}
          </a>
        );
      })}
    </aside>
  );
}
