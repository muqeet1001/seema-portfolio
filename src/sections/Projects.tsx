import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Shell, SectionHeader } from "@/components/Layout";
import { site } from "@/config/site";
import { ProjectCard } from "./ProjectCard";
import { Search, X } from "lucide-react";

const categories = ["All", ...new Set(site.projects.flatMap((project) => project.categories ?? []))];

export function Projects({ isSearchable = false }: { isSearchable?: boolean }) {
  const [homeTab, setHomeTab] = useState("All");
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = isSearchable ? searchParams.get("search") ?? "" : "";
  const projectTab = isSearchable ? searchParams.get("category") ?? "All" : homeTab;
  const query = searchQuery.trim().toLowerCase();

  function updateFilter(name: string, value: string) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(name, value);
    else next.delete(name);
    setSearchParams(next, { replace: true });
  }

  const displayedProjects = site.projects.filter((project) =>
    (projectTab === "All" || project.categories?.includes(projectTab)) &&
    [project.title, project.blurb, ...project.stack].some((value) => value.toLowerCase().includes(query))
  );

  const categoryTabs = (
    <div className="flex gap-1 rounded-lg border border-[var(--line)] bg-[var(--chip)] p-0.5" role="group" aria-label="Filter projects by category">
      {categories.map((tab) => (
        <button
          key={tab}
          type="button"
          aria-pressed={projectTab === tab}
          onClick={() => isSearchable ? updateFilter("category", tab === "All" ? "" : tab) : setHomeTab(tab)}
          className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
            projectTab === tab
              ? "bg-[var(--fg)] text-[var(--bg)] shadow-sm"
              : "text-[var(--muted)] hover:text-[var(--fg)]"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );

  return (
    <div id="projects">
      <SectionHeader
        title="Projects"
        aside={isSearchable ? undefined : categoryTabs}
      />
      <Shell className="px-6 py-6 sm:px-8">
        {/* Search Bar Dashboard (when isSearchable is true) */}
        {isSearchable && (
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[var(--line)] pb-5">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--soft)]" />
              <input
                type="text"
                aria-label="Search projects and technologies"
                placeholder="Search projects, technologies..."
                value={searchQuery}
                onChange={(e) => updateFilter("search", e.target.value)}
                className="w-full rounded-lg border border-[var(--line)] bg-[var(--chip)] py-2 pl-9 pr-4 text-[12.5px] text-[var(--fg)] placeholder-[var(--soft)] outline-none transition-all focus:border-[var(--soft)]"
              />
              {searchQuery && (
                <button
                  type="button"
                  aria-label="Clear project search"
                  onClick={() => updateFilter("search", "")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--soft)] hover:text-[var(--fg)] cursor-pointer"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            {categoryTabs}
          </div>
        )}

        <div className="grid gap-4 has-[[aria-expanded=true]]:items-start sm:grid-cols-2">
          <AnimatePresence>
            {displayedProjects.map((p) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {displayedProjects.length === 0 && (
          <div className="py-12 text-center text-[var(--muted)] text-[13.5px] font-mono">
            No projects match your current filter.
          </div>
        )}
      </Shell>
    </div>
  );
}
