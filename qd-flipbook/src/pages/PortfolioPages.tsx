import {
  Award,
  BadgeCheck,
  Building2,
  ClipboardCheck,
  FileText,
  FlaskConical,
  Fuel,
  Globe,
  Landmark,
  Layers,
  Mail,
  MapPin,
  Phone,
  Receipt,
  UserRound,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { LogoMark } from '../components/Logo';
import { Headline, IconBadge, Illustrative, Lockup, PageFrame, Photo, Ribbon, type PageProps } from '../components/Page';
import { company, contact, experienceFertilizerPower, experienceGroups, footprint, organisations, registration } from '../data/content';

export function ExperienceOnePage({ number }: PageProps) {
  return (
    <PageFrame number={number} section="Experience of Key Personnel">
      <div className="grid grid-cols-[1fr_250px] gap-6">
        <div>
          <Ribbon icon={ClipboardCheck}>Experience of Key Personnel</Ribbon>
          <Headline className="mt-4" size={30}>
            Fertilizer &amp; power
          </Headline>
          <p className="mt-2 text-[11px] text-ink-2">
            Scaffolding, sandblasting, modification and plant projects for fertilizer and power producers, from the experience record of QD's key personnel.
          </p>
        </div>
        <Photo name="rebar-aerial" alt="Aerial view of workers on a construction deck" position="50% 45%" className="h-[150px] rounded-xl" label />
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-rule">
        <div className="grid grid-cols-[34px_64px_1fr_170px] gap-2 bg-qd-purple px-3 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white">
          <span>No.</span>
          <span>Client</span>
          <span>Project</span>
          <span className="text-right">Location</span>
        </div>
        {experienceFertilizerPower.map((p, i) => (
          <div key={p.title + i} className={`grid grid-cols-[34px_64px_1fr_170px] items-center gap-2 px-3 py-[10.5px] ${i % 2 ? 'bg-mist' : 'bg-paper'}`}>
            <span className="font-mono text-[9.5px] text-ink-3">{String(i + 1).padStart(2, '0')}</span>
            <span>
              {p.client && <span className="rounded-full bg-qd-red px-2 py-[2px] font-mono text-[8.5px] font-medium text-white">{p.client}</span>}
            </span>
            <span className="text-[11.5px] font-medium text-ink">{p.title}</span>
            <span className="flex items-center justify-end gap-1 text-right text-[10px] text-ink-3">
              <MapPin size={11} className="text-qd-red" />
              {p.location}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-auto text-[9.5px] text-ink-3">Project names and locations as recorded in the company's experience list. Entries repeated in the source list are shown once.</p>
    </PageFrame>
  );
}

const GROUP_ICONS: Record<string, LucideIcon> = {
  'Oil & Gas': Fuel,
  'Chemical, Polyester & Fibre': FlaskConical,
  'Power & Cement': Zap,
  'Infrastructure & Industrial': Building2,
};

export function ExperienceTwoPage({ number }: PageProps) {
  let n = experienceFertilizerPower.length;
  const total = n + experienceGroups.reduce((a, g) => a + g.projects.length, 0);
  return (
    <PageFrame number={number} section="Experience by Sector">
      <div className="flex items-end justify-between">
        <div>
          <Ribbon icon={Layers}>Experience by Sector</Ribbon>
          <Headline className="mt-4" size={30}>
            Track record, continued
          </Headline>
        </div>
        <div className="flex items-baseline gap-1.5 pb-1">
          <span className="display-cond font-display text-[44px] font-extrabold leading-none text-qd-red">{total}</span>
          <span className="font-mono text-[9.5px] uppercase tracking-[0.15em] text-ink-3">entries</span>
        </div>
      </div>
      <div className="mt-4 grid flex-1 auto-rows-fr grid-cols-2 gap-3">
        {experienceGroups.map((g, gi) => {
          const Icon = GROUP_ICONS[g.sector];
          return (
            <div key={g.sector} className="overflow-hidden rounded-xl border border-rule">
              <div className={`flex items-center gap-2 px-3 py-2 text-white ${gi % 3 === 0 ? 'bg-qd-purple' : gi === 1 ? 'bg-qd-red' : 'bg-ink'}`}>
                <Icon size={17} />
                <h3 className="font-display text-[13.5px] font-bold">{g.sector}</h3>
              </div>
              <ol className="px-3 py-1">
                {g.projects.map((p) => {
                  n += 1;
                  return (
                    <li key={p.title} className="grid grid-cols-[22px_1fr_auto] items-baseline gap-2 border-b border-rule py-[5px] last:border-b-0">
                      <span className="font-mono text-[8.5px] text-ink-3">{String(n).padStart(2, '0')}</span>
                      <span className="text-[10.5px] font-medium leading-snug text-ink">
                        {p.client && <span className="mr-1.5 font-mono text-[9px] font-medium text-qd-red">{p.client}</span>}
                        {p.title}
                      </span>
                      <span className="text-right text-[9px] text-ink-3">{p.location}</span>
                    </li>
                  );
                })}
              </ol>
            </div>
          );
        })}
      </div>
      <div className="relative mt-4 h-[150px] shrink-0 overflow-hidden rounded-xl">
        <Photo name="machinery" alt="Heavy industrial machinery" position="50% 45%" className="h-full w-full" tint="dark" label />
        <p className="absolute inset-y-0 left-6 flex w-[420px] items-center font-serif text-[16px] italic leading-[1.4] text-white">
          Projects of national significance — cement, fibre, chemical, oil refinery and power generation plants.
        </p>
      </div>
    </PageFrame>
  );
}

export function FootprintPage({ number }: PageProps) {
  return (
    <PageFrame number={number} section="Organisations & Footprint" bg="bg-mist">
      <Ribbon icon={MapPin}>Organisations &amp; Footprint</Ribbon>
      <div className="mt-4 flex items-end justify-between gap-6">
        <Headline size={30}>Experience across Pakistan</Headline>
        <p className="w-[300px] shrink-0 text-[11px] text-ink-2">
          Organisations and facilities named in the experience record of QD's key personnel, and the locations where that work was carried out.
        </p>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2">
        {organisations.map((o) => (
          <div key={o} className="flex h-[64px] items-center gap-2 rounded-lg border border-ink/10 bg-paper px-3">
            <Building2 size={16} className="shrink-0 text-qd-red" />
            <span className="font-display text-[12.5px] font-semibold leading-tight text-ink" style={{ fontStretch: '92%' }}>
              {o}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-auto grid h-[300px] grid-cols-[1fr_230px] gap-4">
        <div className="grid auto-rows-fr grid-cols-2 gap-2">
          {footprint.map((f, i) => (
            <div key={f.region} className="rounded-xl bg-paper p-3">
              <div className="flex items-center gap-2">
                <IconBadge icon={MapPin} tone={i % 2 ? 'red' : 'purple'} size={28} />
                <span className="font-display text-[12.5px] font-bold leading-tight text-qd-purple">{f.region}</span>
              </div>
              <p className="mt-2 text-[10.5px] leading-[1.5] text-ink-2">{f.places.join(' · ')}</p>
            </div>
          ))}
        </div>
        <Photo name="drawings" alt="Engineer reviewing construction drawings" position="45% 50%" className="rounded-xl" label />
      </div>
    </PageFrame>
  );
}

const REG_ICONS: LucideIcon[] = [Building2, Award, FileText, Receipt, Landmark, Receipt];

export function CredentialsPage({ number }: PageProps) {
  return (
    <PageFrame number={number} section="Credentials & Leadership">
      <Ribbon icon={BadgeCheck}>Credentials &amp; Leadership</Ribbon>
      <Headline className="mt-4" size={30}>
        General information
      </Headline>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {registration.map((r, i) => (
          <div key={r.label} className="flex items-center gap-3 rounded-lg border border-rule p-3">
            <IconBadge icon={REG_ICONS[i]} tone={i % 2 ? 'red' : 'purple'} size={36} />
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-3">{r.label}</div>
              <div className={`mt-0.5 text-ink ${i === 0 ? 'font-display text-[15px] font-bold' : 'font-mono text-[16px] font-medium'}`}>{r.value}</div>
            </div>
          </div>
        ))}
        <div className="col-span-2 flex items-center gap-3 rounded-lg bg-qd-purple-soft/60 p-3">
          <IconBadge icon={MapPin} tone="purple" size={36} />
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-3">Main Office</div>
            <div className="mt-0.5 font-display text-[15px] font-bold text-ink">{contact.address.join(' ')}</div>
          </div>
        </div>
      </div>

      <div className="mt-5 grid flex-1 grid-cols-2 gap-3">
        {contact.people.map((p, i) => (
          <div key={p.name} className={`relative flex flex-col justify-between overflow-hidden rounded-xl p-5 ${i === 0 ? 'bg-qd-purple text-white' : 'bg-mist text-ink'}`}>
            <div className="flex items-center gap-3">
              <span className={`flex h-[52px] w-[52px] items-center justify-center rounded-full border-[3px] border-qd-red ${i === 0 ? 'bg-white/10' : 'bg-paper'}`}>
                <UserRound size={26} className={i === 0 ? 'text-white' : 'text-qd-purple'} />
              </span>
              <div>
                <div className={`font-mono text-[9px] uppercase tracking-[0.16em] ${i === 0 ? 'text-white/65' : 'text-ink-3'}`}>{p.role}</div>
                <div className="font-display text-[24px] font-bold leading-tight" style={{ fontStretch: '90%' }}>
                  {p.name}
                </div>
              </div>
            </div>
            <div className={`mt-4 space-y-1.5 border-t pt-3 text-[11px] ${i === 0 ? 'border-white/20 text-white/90' : 'border-ink/10 text-ink-2'}`}>
              <div className="flex items-center gap-2 font-mono">
                <Phone size={13} className="text-qd-red" /> {p.tel}
              </div>
              <div className="flex items-center gap-2 font-mono">
                <Mail size={13} className="text-qd-red" /> {p.email}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 rounded-xl bg-qd-purple-ink p-4 text-white">
        <div>
          <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-white/60">
            <Phone size={13} className="text-qd-red" /> Telephone
          </div>
          <ul className="mt-2 space-y-1 text-[10.5px]">
            {contact.phones.map((ph) => (
              <li key={ph.label} className="flex justify-between gap-2">
                <span className="text-white/70">{ph.label}</span>
                <span className="font-mono">{ph.tel}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-white/60">
            <Mail size={13} className="text-qd-red" /> Email
          </div>
          <ul className="mt-2 space-y-1 font-mono text-[9.5px]">
            {contact.emails.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-white/60">
            <Globe size={13} className="text-qd-red" /> Website
          </div>
          <div className="mt-2 font-display text-[17px] font-bold">{contact.website}</div>
        </div>
      </div>
    </PageFrame>
  );
}

export function BackCoverPage({ number }: PageProps) {
  const rows: [LucideIcon, string][] = [
    [MapPin, contact.address.join(' ')],
    [Phone, `CEO ${contact.people[0].tel}  ·  Director ${contact.people[1].tel}`],
    [Mail, 'info@qdl.com.pk'],
    [Globe, contact.website],
  ];
  return (
    <PageFrame number={number} chrome={false} bg="bg-qd-purple-ink">
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'repeating-linear-gradient(135deg, #fff 0 1px, transparent 1px 16px)' }} />
      <div className="absolute inset-x-0 top-0 h-[560px]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 78%, 50% 100%, 0 78%)' }}>
        <Photo name="crane-sky" alt="Tower crane against the sky" position="60% 40%" className="h-full w-full" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(28,8,56,0.2), rgba(28,8,56,0.55))' }} />
      </div>
      <svg className="absolute inset-x-0 top-0" width={794} height={660} aria-hidden>
        <polygon points="0,437 397,560 794,437 794,465 397,588 0,465" fill="#CC3433" />
        <polygon points="0,473 397,596 794,473 794,481 397,604 0,481" fill="#fff" opacity="0.9" />
        <polygon points="0,489 397,612 794,489 794,525 397,648 0,525" fill="#330065" />
      </svg>
      <Illustrative light className="absolute right-[40px] top-[40px]" />
      <div className="absolute left-[56px] top-[150px] text-white">
        <div className="display-cond font-display text-[86px] font-extrabold uppercase leading-[0.86]">
          Engineering
          <br />
          the Future<span className="text-qd-red">.</span>
        </div>
      </div>

      <div className="absolute inset-x-0 top-[690px] flex flex-col items-center">
        <div className="rounded-xl bg-paper px-8 py-5" style={{ boxShadow: '6px 6px 0 rgba(0,0,0,0.25)' }}>
          <Lockup />
        </div>
        <ul className="mt-8 space-y-3">
          {rows.map(([Icon, text]) => (
            <li key={text} className="flex items-center gap-3 text-[13px] text-white/90">
              <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-qd-red">
                <Icon size={15} className="text-white" />
              </span>
              {text}
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[52px] bg-paper">
        <div className="absolute inset-x-0 top-0 h-[5px] bg-qd-red" />
        <div className="flex h-full items-center justify-between px-10 pt-[5px] font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-2">
          <span className="flex items-center gap-2">
            <LogoMark className="h-[18px] w-auto" />
            {company.brand}
          </span>
          <span>PEC Registration No. Mech/53430</span>
        </div>
      </div>
    </PageFrame>
  );
}
