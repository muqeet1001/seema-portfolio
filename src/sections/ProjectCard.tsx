import { useId, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Project } from "@/config/site";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/icons";

export function ProjectCard({ project }: { project: Project }) {
  const [showDetails, setShowDetails] = useState(false);
  const detailsId = useId();
  const study = project.caseStudy;

  return (
    <article className="flex h-full flex-col rounded-xl border border-[var(--line)] bg-[var(--card)] p-5 shadow-sm transition-colors hover:border-[var(--soft)]">
      {project.image && (
        <div className="-mx-5 -mt-5 mb-4 overflow-hidden rounded-t-[11px] border-b border-[var(--line)] bg-[var(--chip)]">
          <img
            src={project.image}
            alt={project.imageAlt ?? ""}
            width={1120}
            height={560}
            loading="lazy"
            decoding="async"
            className="aspect-[2/1] w-full object-cover"
          />
        </div>
      )}
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-serif text-2xl text-[var(--fg)]">{project.title}</h3>
        {project.year && <span className="font-mono text-xs text-[var(--soft)]">{project.year}</span>}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{project.blurb}</p>

      {(project.story || study) && (
        <div className="mt-3">
          <button
            type="button"
            aria-expanded={showDetails}
            aria-controls={detailsId}
            aria-label={`${showDetails ? "Hide" : "Read"} ${project.title} ${study ? "case study" : "details"}`}
            onClick={() => setShowDetails(!showDetails)}
            className="inline-flex min-h-9 items-center gap-1.5 rounded font-mono text-xs font-semibold text-[var(--fg)] underline decoration-[var(--line)] underline-offset-4 hover:decoration-current"
          >
            {showDetails ? "Hide details" : study ? "Read case study" : "Project details"}
            {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          <div id={detailsId}>
            <AnimatePresence initial={false}>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-3 border-t border-[var(--line)] pt-4">
                    {study && (
                      <h4 className="font-serif text-xl leading-tight text-[var(--fg)]">{study.title}</h4>
                    )}
                    {project.story && (
                      <p className="text-sm leading-relaxed text-[var(--muted)]">{project.story}</p>
                    )}
                    {study && (
                      <>
                        <figure>
                          <img
                            src={study.screenshot.src}
                            alt={study.screenshot.alt}
                            width={study.screenshot.width}
                            height={study.screenshot.height}
                            decoding="async"
                            className="block h-auto w-full rounded-lg border border-[var(--line)]"
                          />
                          <figcaption className="mt-1.5 text-xs leading-relaxed text-[var(--muted)]">
                            {study.screenshot.caption}
                          </figcaption>
                        </figure>
                        <dl className="divide-y divide-[var(--line)]">
                          {study.steps.map((step) => (
                            <div key={step.label} className="py-2.5">
                              <dt className="text-sm font-semibold text-[var(--fg)]">{step.label}</dt>
                              <dd className="mt-0.5 text-sm leading-relaxed text-[var(--muted)]">{step.detail}</dd>
                            </div>
                          ))}
                        </dl>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                          {study.sources.map((source) => (
                            <a
                              key={source.href}
                              href={source.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline underline-offset-4 hover:text-[var(--fg)]"
                            >
                              {source.label}
                            </a>
                          ))}
                        </div>
                        {study.publication && (
                          <div className="space-y-1.5 border-t border-[var(--line)] pt-3">
                            <h5 className="text-sm font-semibold text-[var(--fg)]">Related publication</h5>
                            <a
                              href={study.publication.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block text-sm leading-relaxed text-[var(--fg)] underline underline-offset-4"
                            >
                              {study.publication.title} <ExternalLink size={13} aria-hidden="true" className="inline" />
                            </a>
                            <p className="text-xs leading-relaxed text-[var(--muted)]">{study.publication.citation}</p>
                            <p className="break-words font-mono text-xs text-[var(--muted)]">DOI {study.publication.doi}</p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      <div className="mt-auto pt-5">
        <ul aria-label="Technologies" className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded border border-[var(--line)] bg-[var(--chip)] px-2 py-0.5 font-mono text-xs text-[var(--muted)]"
            >
              {tech}
            </li>
          ))}
        </ul>
        {project.links.source && (
          <div className="mt-4 border-t border-[var(--line)] pt-3">
            <a
              href={project.links.source}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              className="inline-flex items-center gap-2 rounded text-sm font-medium text-[var(--fg)] hover:underline"
            >
              <GitHubIcon className="size-4" /> View on GitHub
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
