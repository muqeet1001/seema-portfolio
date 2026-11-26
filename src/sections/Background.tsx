import { SectionHeader, Shell } from "@/components/Layout";
import { site } from "@/config/site";

export function Background() {
  return (
    <>
      <section id="research">
        <SectionHeader title="Research" />
        <Shell className="px-6 py-5 sm:px-8">
          <p className="font-mono text-xs text-[var(--muted)]">{site.research.status}</p>
          <h3 className="mt-1 text-base font-semibold text-[var(--fg)]">{site.research.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{site.research.blurb}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {site.research.stack.map((technology) => (
              <li key={technology} className="rounded-md border border-[var(--line)] bg-[var(--chip)] px-2 py-1 font-mono text-xs text-[var(--muted)]">
                {technology}
              </li>
            ))}
          </ul>
        </Shell>
      </section>

      <section id="leadership">
        <SectionHeader title="Leadership" />
        <Shell className="divide-y divide-[var(--line)]">
          {site.leadership.map((position) => (
            <article key={position.organization} className="px-6 py-5 sm:px-8">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-base font-semibold text-[var(--fg)]">{position.organization}</h3>
                <span className="font-mono text-xs text-[var(--muted)]">{position.period}</span>
              </div>
              <p className="mt-1 text-sm font-medium text-[var(--fg)]">{position.role}</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{position.blurb}</p>
            </article>
          ))}
        </Shell>
      </section>

      <section id="achievements">
        <SectionHeader title="Achievements" />
        <Shell className="px-6 py-6 sm:px-8">
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--muted)] marker:text-[var(--soft)]">
            {site.achievements.map((achievement) => <li key={achievement}>{achievement}</li>)}
          </ul>
        </Shell>
      </section>

      <section id="education">
        <SectionHeader title="Education" />
        <Shell className="divide-y divide-[var(--line)]">
          {site.education.map((school) => (
            <article key={school.institution} className="px-6 py-5 sm:px-8">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-base font-semibold text-[var(--fg)]">{school.institution}</h3>
                <span className="font-mono text-xs text-[var(--muted)]">{school.period}</span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                {school.qualification} · {school.result}
              </p>
            </article>
          ))}
        </Shell>
      </section>
    </>
  );
}
