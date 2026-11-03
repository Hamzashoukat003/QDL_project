import type { ReactNode } from 'react';
import {
  capabilities,
  company,
  contact,
  coreValues,
  experienceFertilizerPower,
  experienceGroups,
  footprint,
  glance,
  intro,
  lifecycle,
  org,
  organisations,
  projectManagement,
  registration,
  safety,
  sectors,
  statements,
  technical,
  toc,
  values,
  type Project,
} from '../data/content';
import { TankElevation } from './Blueprints';
import { LogoMark } from './Logo';

/**
 * Reflowed, mobile-first version of the publication. Same copy as the
 * flipbook (content.ts), set at reading size instead of scaled-down A4.
 * Section ids match the printed page numbers so the contents panel works in both views.
 */

const tocIndex = (page: number) => String(toc.findIndex((t) => t.page === page) + 1).padStart(2, '0');

function Section({ page, eyebrow, title, children, tone = 'light' }: { page: number; eyebrow: string; title: string; children: ReactNode; tone?: 'light' | 'mist' | 'dark' }) {
  const bg = tone === 'dark' ? 'bg-qd-purple-ink text-white' : tone === 'mist' ? 'bg-mist text-ink' : 'bg-paper text-ink';
  return (
    <section id={`s-${page}`} className={`scroll-mt-4 ${bg}`}>
      <div className="mx-auto max-w-[760px] px-5 py-12 sm:px-8 sm:py-16">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em]">
          <span className="text-qd-red">{tocIndex(page)}</span>
          <span className={tone === 'dark' ? 'text-white/60' : 'text-ink-3'}>{eyebrow}</span>
        </div>
        <h2 className="mt-3 font-display text-[32px] font-bold leading-[1.05] tracking-[-0.01em] sm:text-[40px]" style={{ fontStretch: '88%' }}>
          {title}
        </h2>
        <div className="mt-3 h-[3px] w-10 bg-qd-red" />
        <div className="mt-7">{children}</div>
      </div>
    </section>
  );
}

function Figure({ name, alt, className = 'aspect-[16/10]' }: { name: string; alt: string; className?: string }) {
  return (
    <figure className="my-7">
      <img src={`./images/${name}.jpg`} alt={alt} loading="lazy" className={`w-full object-cover ${className}`} />
      <figcaption className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-3">Illustrative image</figcaption>
    </figure>
  );
}

const P = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <p className={`text-[17px] leading-[1.65] text-ink-2 ${className}`}>{children}</p>
);
const Lede = ({ children }: { children: ReactNode }) => <p className="font-serif text-[20px] leading-[1.5] text-ink">{children}</p>;
const H3 = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <h3 className={`mt-8 font-display text-[20px] font-bold leading-tight ${className}`}>{children}</h3>
);

function ProjectList({ projects, start }: { projects: Project[]; start: number }) {
  return (
    <ol className="border-t border-ink/80">
      {projects.map((p, i) => (
        <li key={p.title + i} className="flex gap-3 border-b border-rule py-3">
          <span className="w-6 shrink-0 pt-[3px] font-mono text-[11px] text-ink-3">{String(start + i).padStart(2, '0')}</span>
          <div className="min-w-0">
            <div className="text-[16px] font-medium leading-snug text-ink">
              {p.client && <span className="mr-2 font-mono text-[12px] font-medium text-qd-red">{p.client}</span>}
              {p.title}
            </div>
            {p.location !== '—' && <div className="mt-0.5 text-[14px] text-ink-3">{p.location}</div>}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function ReadView() {
  let n = experienceFertilizerPower.length;
  return (
    <article className="bg-paper text-ink">
      {/* hero */}
      <header className="relative overflow-hidden bg-qd-purple-ink text-white">
        <img src="./images/refinery.jpg" alt="Refinery at dusk" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(28,8,56,0.75), rgba(28,8,56,0.35) 50%, rgba(28,8,56,0.92))' }} />
        <div className="relative mx-auto max-w-[760px] px-5 pb-10 pt-14 sm:px-8 sm:pt-20">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/75">Company Profile</div>
          <h1 className="display-cond mt-4 font-display text-[64px] font-extrabold uppercase leading-[0.86] sm:text-[88px]">
            Engineering
            <br />
            the Future<span className="text-qd-red">.</span>
          </h1>
          <div className="mt-10 flex items-end justify-between gap-4">
            <div>
              <div className="font-display text-[22px] font-bold">{company.brand}</div>
              <div className="mt-1 text-[14px] text-white/75">General contractors for mechanical &amp; civil works, equipment manufacturing and installation.</div>
            </div>
            <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.15em] text-white/55">Illustrative image</span>
          </div>
        </div>
      </header>

      <Section page={3} eyebrow="Executive Information" title="Built on two decades of hands-on experience">
        <Lede>{intro.ambition}</Lede>
        <p className="mt-6 border-l-[3px] border-qd-red pl-4 text-[16px] italic leading-[1.6] text-ink-2">{intro.blessing}</p>
        <Figure name="scaffold-crew" alt="Engineers in safety gear climbing a structure" />
        <div className="space-y-4">
          <P>{intro.established}</P>
          <P>{intro.founders}</P>
          <P>{intro.position}</P>
          <P>{glance.owners}</P>
        </div>
      </Section>

      <Section page={4} eyebrow="Who we are" title="People, quality and timely delivery" tone="mist">
        <div className="grid grid-cols-2 border-t border-ink/80">
          {glance.stats.map((s, i) => (
            <div key={s.label} className={`border-b border-rule py-4 ${i % 2 ? 'border-l pl-4' : 'pr-4'}`}>
              <div className="flex items-baseline gap-1.5">
                <span className="display-cond font-display text-[52px] font-bold leading-none text-qd-purple">{s.value}</span>
                {s.unit && <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-qd-red">{s.unit}</span>}
              </div>
              <div className="mt-1.5 text-[14px] leading-snug text-ink-2">{s.label}</div>
            </div>
          ))}
        </div>
        <H3>Our team</H3>
        <P className="mt-2">{glance.team}</P>
        <H3>Projects of national significance</H3>
        <P className="mt-2">{glance.timely}</P>
        <H3>Quality at every stage</H3>
        <P className="mt-2">{glance.quality}</P>
      </Section>

      <Section page={5} eyebrow="What we do" title="Engineering, construction & manufacturing">
        <Lede>{capabilities.lede}</Lede>
        <Figure name="welding" alt="Welding sparks in a fabrication workshop" />
        {capabilities.groups.map((g, i) => (
          <div key={g.title} className="flex gap-4 border-t border-ink/80 py-4">
            <span className="display-cond w-9 shrink-0 font-display text-[28px] font-bold leading-none text-qd-red">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <div className="font-display text-[19px] font-bold">{g.title}</div>
              <ul className="mt-1.5 space-y-1 text-[16px] text-ink-2">
                {g.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        <div className="flex gap-4 border-y border-ink/80 py-4">
          <span className="display-cond w-9 shrink-0 font-display text-[28px] font-bold leading-none text-qd-red">05</span>
          <div>
            <div className="font-display text-[19px] font-bold">Testing &amp; Commissioning</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {capabilities.commissioning.map((c) => (
                <span key={c} className="border border-rule px-2 py-0.5 font-mono text-[12px] uppercase tracking-[0.06em] text-ink-2">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
        <H3>Specialised trades</H3>
        <P className="mt-2">Over 400 workers and technicians trained in {capabilities.trades.slice(0, -1).join(', ').toLowerCase()} and {capabilities.trades[capabilities.trades.length - 1].toLowerCase()}.</P>
      </Section>

      <Section page={6} eyebrow="Equipment, piping, tanks & structures" title="Technical expertise at scale" tone="mist">
        <P>{technical.lede}</P>
        <div className="blueprint-grid my-7 bg-paper p-3">
          <TankElevation className="w-full" />
        </div>
        <div className="grid grid-cols-2 border-t border-ink/80">
          {technical.specs.map((s, i) => (
            <div key={s.item} className={`border-b border-rule py-4 ${i % 2 ? 'border-l pl-4' : 'pr-4'}`}>
              <div className="flex items-baseline gap-1">
                <span className="display-cond font-display text-[40px] font-bold leading-none text-qd-purple">{s.figure}</span>
                <span className="font-mono text-[11px] uppercase text-qd-red">{s.unit}</span>
              </div>
              <div className="mt-2 font-display text-[16px] font-bold leading-tight">{s.item}</div>
              <div className="mt-0.5 text-[14px] text-ink-3">{s.detail}</div>
            </div>
          ))}
        </div>
        <H3>Systems fabricated, erected &amp; installed</H3>
        <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1.5 text-[16px] text-ink-2 sm:grid-cols-2">
          {technical.systems.map((s) => (
            <li key={s} className="flex gap-2">
              <span className="text-qd-red">—</span>
              {s}
            </li>
          ))}
        </ul>
      </Section>

      <Section page={7} eyebrow="Markets we serve" title="Five business sectors">
        <div className="space-y-6">
          {sectors.map((s, i) => (
            <div key={s.name} className="grid grid-cols-[96px_1fr] gap-4 sm:grid-cols-[150px_1fr]">
              <img src={`./images/${s.image}.jpg`} alt={s.name} loading="lazy" className="aspect-square w-full object-cover" />
              <div className="border-t-[3px] border-qd-purple pt-2">
                <span className="font-mono text-[11px] text-qd-red">{String(i + 1).padStart(2, '0')}</span>
                <div className="font-display text-[19px] font-bold leading-tight">{s.name}</div>
                {s.refs.length > 0 ? (
                  <ul className="mt-1.5 space-y-0.5 text-[15px] text-ink-2">
                    {s.refs.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-1.5 text-[15px] text-ink-2">Listed among QD's five business sectors.</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-3">Sector images are illustrative</p>
      </Section>

      <Section page={8} eyebrow="How we are organised" title="Organization structure" tone="mist">
        <P>
          QD is led by its Chief Executive Officer, with a General Manager directing operations, maintenance, workshop, projects, IT &amp; stores, finance and
          commercial functions — supported by an Advisor and a dedicated QHSE Manager.
        </P>
        <div className="mt-7 flex flex-col items-center">
          <div className="w-full max-w-[260px] bg-qd-red py-3 text-center font-display text-[17px] font-semibold text-white">{org.top}</div>
          <div className="h-5 w-px bg-ink" />
          <div className="w-full max-w-[260px] bg-qd-purple py-3 text-center font-display text-[16px] font-semibold text-white">{org.gm}</div>
          <div className="h-5 w-px bg-ink" />
          <div className="grid w-full max-w-[420px] grid-cols-2 gap-3">
            {org.staff.map((s) => (
              <div key={s} className="border border-qd-purple/20 bg-qd-purple-soft py-2.5 text-center font-display text-[15px] font-semibold text-qd-purple">
                {s}
              </div>
            ))}
          </div>
          <div className="h-5 w-px bg-ink" />
          <ul className="w-full max-w-[420px] border-t border-ink">
            {org.departments.map((d) => (
              <li key={d} className="border-b border-rule bg-paper px-4 py-3">
                <div className="font-display text-[16px] font-semibold">{d}</div>
                {d === org.under.parent && (
                  <div className="mt-1.5 flex items-center gap-2 pl-3 text-[15px] text-qd-purple">
                    <span className="h-px w-4 bg-qd-purple" />
                    {org.under.role}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section page={9} eyebrow="What we stand for" title="Our core values" tone="dark">
        <ol className="grid grid-cols-1 border-t border-white/25 sm:grid-cols-2">
          {coreValues.map((v, i) => (
            <li key={v} className="flex gap-3 border-b border-white/25 py-4">
              <span className="pt-2 font-mono text-[11px] text-qd-red">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-display text-[24px] font-bold leading-tight">{v}</span>
            </li>
          ))}
        </ol>
        <div className="mt-10 space-y-7">
          {values.map((v) => (
            <div key={v.title} className="border-t-[3px] border-qd-red pt-3">
              <div className="font-display text-[19px] font-bold">{v.title}</div>
              <p className="mt-2 text-[16px] leading-[1.65] text-white/80">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section page={10} eyebrow="Direction" title="Vision, mission & purpose">
        {statements.map((s, i) => (
          <div key={s.label} className={`py-6 ${i ? 'border-t border-rule' : ''}`}>
            <div className="display-cond font-display text-[38px] font-extrabold uppercase leading-none text-qd-purple">{s.label}</div>
            <p className="mt-3 font-serif text-[21px] leading-[1.45] text-ink">{s.text}</p>
          </div>
        ))}
      </Section>

      <Section page={11} eyebrow="Delivery" title="Project management & QHSE" tone="mist">
        <Lede>{projectManagement}</Lede>
        <H3>Execution capabilities — from design to commissioning</H3>
        <ol className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {lifecycle.map((step, i) => (
            <li key={step} className="flex items-center gap-3 bg-paper px-3 py-2.5">
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center font-mono text-[12px] text-white ${i === lifecycle.length - 1 ? 'bg-qd-red' : 'bg-qd-purple'}`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-[16px] font-medium">{step}</span>
            </li>
          ))}
        </ol>
        <H3>Safety philosophy: the three zeros</H3>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {safety.zeros.map((z) => (
            <div key={z} className="flex flex-col items-center bg-paper py-4">
              <span className="display-cond font-display text-[52px] font-extrabold leading-none text-qd-purple">0</span>
              <span className="mt-1 text-center font-display text-[14px] font-bold leading-tight">{z.replace('Zero ', '')}</span>
            </div>
          ))}
        </div>
        <P className="mt-4">{safety.ppe}</P>
        <Figure name="hard-hat" alt="Red safety helmet on site" />
        <H3 className="!mt-0">Quality control</H3>
        <P className="mt-2">
          Quality control facilities monitor, record and maintain quality standards at every stage of design, planning and installation, while management and
          control systems keep a sharp focus on cost and schedule.
        </P>
      </Section>

      <Section page={12} eyebrow="Track record" title="Experience of key personnel">
        <P>Scaffolding, sandblasting, modification and plant projects for fertilizer and power producers, from the experience record of QD's key personnel.</P>
        <H3 className="mb-3">Fertilizer &amp; Power</H3>
        <ProjectList projects={experienceFertilizerPower} start={1} />
        <p className="mt-4 text-[13px] text-ink-3">Project names and locations as recorded in the company's experience list. Entries repeated in the source list are shown once.</p>
      </Section>

      <Section page={13} eyebrow="Track record, continued" title="Experience by sector" tone="mist">
        {experienceGroups.map((g) => {
          const start = n + 1;
          n += g.projects.length;
          return (
            <div key={g.sector} className="mb-8 last:mb-0">
              <H3 className="!mt-0 mb-3">{g.sector}</H3>
              <ProjectList projects={g.projects} start={start} />
            </div>
          );
        })}
      </Section>

      <Section page={14} eyebrow="Experience across Pakistan" title="Organisations & footprint">
        <P>Organisations and facilities named in the experience record of QD's key personnel, and the locations where that work was carried out.</P>
        <div className="mt-6 grid grid-cols-2 border-l border-t border-ink/15 sm:grid-cols-3">
          {organisations.map((o) => (
            <div key={o} className="flex min-h-[60px] items-center justify-center border-b border-r border-ink/15 px-2 py-2 text-center font-display text-[15px] font-semibold leading-tight">
              {o}
            </div>
          ))}
        </div>
        <H3>Project locations</H3>
        <div className="mt-3">
          {footprint.map((f) => (
            <div key={f.region} className="border-t border-ink/15 py-3">
              <div className="font-display text-[16px] font-bold text-qd-purple">{f.region}</div>
              <div className="mt-1 text-[15px] text-ink-2">{f.places.join(' · ')}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section page={15} eyebrow="General information" title="Credentials & leadership" tone="mist">
        <dl className="border-t-2 border-ink">
          {registration.map((r, i) => (
            <div key={r.label} className="border-b border-rule py-3">
              <dt className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-3">{r.label}</dt>
              <dd className={`mt-1 text-ink ${i === 0 ? 'text-[18px] font-semibold' : 'font-mono text-[18px] font-medium'}`}>{r.value}</dd>
            </div>
          ))}
          <div className="border-b border-rule py-3">
            <dt className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-3">Main Office</dt>
            <dd className="mt-1 text-[17px] font-semibold">{contact.address.join(' ')}</dd>
          </div>
        </dl>
        <H3 className="mb-4">Leadership</H3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {contact.people.map((p, i) => (
            <div key={p.name} className={`p-5 ${i === 0 ? 'bg-qd-purple text-white' : 'bg-paper'}`}>
              <div className={`font-mono text-[11px] uppercase tracking-[0.15em] ${i === 0 ? 'text-white/65' : 'text-ink-3'}`}>{p.role}</div>
              <div className="mt-2 font-display text-[26px] font-bold leading-none">{p.name}</div>
              <div className={`mt-4 space-y-1 font-mono text-[14px] ${i === 0 ? 'text-white/90' : 'text-ink-2'}`}>
                <a className="block underline-offset-2 hover:underline" href={`tel:${p.tel.replace(/-/g, '')}`}>
                  Tel. {p.tel}
                </a>
                <a className="block break-all underline-offset-2 hover:underline" href={`mailto:${p.email}`}>
                  {p.email}
                </a>
              </div>
            </div>
          ))}
        </div>
        <H3>Contact</H3>
        <ul className="mt-3 border-t border-ink/15">
          {contact.phones.map((ph) => (
            <li key={ph.label} className="flex justify-between gap-3 border-b border-ink/15 py-2.5 text-[16px]">
              <span className="text-ink-2">{ph.label}</span>
              <a className="font-mono text-ink underline-offset-2 hover:underline" href={`tel:${ph.tel.replace(/-/g, '')}`}>
                {ph.tel}
              </a>
            </li>
          ))}
        </ul>
        <ul className="mt-4 space-y-1.5 font-mono text-[15px]">
          {contact.emails.map((e) => (
            <li key={e}>
              <a className="break-all text-ink underline-offset-2 hover:underline" href={`mailto:${e}`}>
                {e}
              </a>
            </li>
          ))}
        </ul>
        <a className="mt-5 inline-block font-display text-[22px] font-bold text-qd-purple underline-offset-4 hover:underline" href={`https://${contact.website}`} target="_blank" rel="noreferrer">
          {contact.website}
        </a>
      </Section>

      <footer className="bg-qd-purple-ink text-white">
        <div className="mx-auto flex max-w-[760px] flex-col items-start gap-6 px-5 py-12 sm:px-8">
          <div className="bg-white px-4 py-3">
            <LogoMark className="h-14 w-auto" />
          </div>
          <div className="display-cond font-display text-[44px] font-extrabold uppercase leading-[0.9]">
            Engineering the Future<span className="text-qd-red">.</span>
          </div>
          <p className="text-[12px] leading-relaxed text-white/55">
            Photographs are licensed stock imagery used for illustration and do not depict QD projects. Technical drawings are schematic.
          </p>
        </div>
      </footer>
    </article>
  );
}
