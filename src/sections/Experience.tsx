import { motion } from "framer-motion";
import { Shell, SectionHeader } from "@/components/Layout";
import { site } from "@/config/site";

export function Experience() {
  if (!site.experience.length) return null;

  return (
    <section id="experience">
      <SectionHeader title="Experience" />
      <Shell>
        {site.experience.map((job, i) => (
          <motion.div
            key={job.company}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className={`px-6 py-6 transition-colors duration-200 hover:bg-[var(--hover)] sm:px-8 ${
              i > 0 ? "border-t border-[var(--line)]" : ""
            }`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-base font-semibold text-[var(--fg)]">
                {job.role} <span className="text-[var(--soft)]">·</span>{" "}
                <span className="text-[var(--muted)]">{job.company}</span>
              </h3>
              <span className="font-mono text-xs text-[var(--muted)]">{job.period}</span>
            </div>
            <p className="mt-1 font-mono text-xs text-[var(--muted)]">{job.location}</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--muted)] marker:text-[var(--soft)]">
              <li>{job.blurb}</li>
              {job.highlights.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </motion.div>
        ))}
      </Shell>
    </section>
  );
}
