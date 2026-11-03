import {
  BadgeCheck,
  BarChart3,
  Building2,
  ClipboardCheck,
  Clock,
  Cog,
  Eye,
  Factory,
  Gem,
  Layers,
  ListOrdered,
  Mail,
  MapPin,
  Network,
  Phone,
  ShieldCheck,
  Users,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { Headline, IconBadge, Illustrative, Lockup, PageFrame, Photo, Ribbon, type PageProps } from '../components/Page';
import { company, contact, glance, intro, toc } from '../data/content';

export function CoverPage({ number }: PageProps) {
  return (
    <PageFrame number={number} chrome={false} bg="bg-qd-purple-ink">
      {/* texture for the lower panel */}
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'repeating-linear-gradient(135deg, #fff 0 1px, transparent 1px 16px)' }} />
      {/* photograph with a chevron lower edge */}
      <div className="absolute inset-x-0 top-0 h-[640px]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%)' }}>
        <Photo name="refinery" alt="Refinery at dusk" position="50% 60%" className="h-full w-full" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(28,8,56,0.15), rgba(28,8,56,0) 40%, rgba(28,8,56,0.45))' }} />
      </div>
      {/* chevron bands */}
      <svg className="absolute inset-x-0 top-0" width={794} height={740} aria-hidden>
        <polygon points="0,512 397,640 794,512 794,540 397,668 0,540" fill="#CC3433" />
        <polygon points="0,548 397,676 794,548 794,556 397,684 0,556" fill="#fff" opacity="0.9" />
        <polygon points="0,564 397,692 794,564 794,600 397,728 0,600" fill="#330065" />
      </svg>
      <Illustrative light className="absolute right-[40px] top-[470px]" />

      {/* logo plate */}
      <svg className="absolute left-0 top-0" width={510} height={130} aria-hidden>
        <polygon points="0,0 470,0 420,118 0,118" fill="#fff" />
        <polygon points="478,0 500,0 450,118 428,118" fill="#CC3433" />
      </svg>
      <Lockup className="absolute left-[36px] top-[30px] origin-left scale-[1.12]" />

      {/* identity */}
      <div className="absolute inset-x-0 top-[760px] flex flex-col items-center text-center text-white">
        <div className="display-cond font-display text-[78px] font-extrabold uppercase leading-[0.86]">Quantum Dynamics</div>
        <div className="mt-2 font-display text-[22px] font-bold uppercase tracking-[0.6em] text-qd-red">Limited</div>
        <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.42em] text-white/80">{company.tagline}</div>
        <div
          className="mt-8 rounded-full border-2 border-white/90 bg-qd-red px-12 py-[10px] font-display text-[26px] font-extrabold uppercase tracking-[0.06em]"
          style={{ boxShadow: '5px 5px 0 rgba(0,0,0,0.3)', fontStretch: '90%' }}
        >
          Company Profile
        </div>
        <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">PEC Registration No. Mech/53430</div>
      </div>

      {/* contact strip */}
      <div className="absolute inset-x-0 bottom-0 h-[68px] bg-paper">
        <div className="absolute inset-x-0 top-0 h-[5px] bg-qd-red" />
        <div className="flex h-full items-center justify-center gap-7 pt-[5px] text-[12px] text-ink">
          <span className="flex items-center gap-2">
            <Phone size={15} className="text-qd-red" /> {contact.people[0].tel}
          </span>
          <span className="flex items-center gap-2">
            <Mail size={15} className="text-qd-red" /> info@qdl.com.pk
          </span>
          <span className="flex items-center gap-2">
            <MapPin size={15} className="text-qd-red" /> Shakir Kot, Airport Road, Sadiqabad
          </span>
        </div>
      </div>
    </PageFrame>
  );
}

const TOC_ICONS: LucideIcon[] = [Building2, BarChart3, Wrench, Cog, Factory, Network, Gem, Eye, ShieldCheck, ClipboardCheck, Layers, MapPin, BadgeCheck];

export function ContentsPage({ number, onNavigate }: PageProps & { onNavigate?: (page: number) => void }) {
  return (
    <PageFrame number={number} section="Contents">
      <div className="flex items-end justify-between">
        <div>
          <Ribbon icon={ListOrdered}>Contents</Ribbon>
          <Headline className="mt-5" size={34}>
            Inside this profile
          </Headline>
        </div>
        <p className="w-[250px] pb-1 text-[11px] text-ink-2">{intro.position}</p>
      </div>
      <ol className="mt-5">
        {toc.map((t, i) => {
          // Plain rows when not interactive (thumbnails, print) to avoid nested buttons.
          const Row = onNavigate ? 'button' : 'div';
          return (
            <li key={t.page}>
              <Row
                {...(onNavigate ? { type: 'button' as const, onClick: () => onNavigate(t.page) } : {})}
                className="group flex w-full items-center gap-4 py-[8px] text-left"
              >
                <IconBadge icon={TOC_ICONS[i]} tone={i % 2 ? 'red' : 'purple'} size={34} />
                <span className="font-display text-[17px] font-bold text-ink transition-colors group-hover:text-qd-red" style={{ fontStretch: '92%' }}>
                  {t.title}
                </span>
                <span className="mx-1 h-0 flex-1 border-b-2 border-dotted border-ink/20" />
                <span className="flex h-[26px] min-w-[40px] items-center justify-center bg-qd-purple px-2 font-mono text-[12px] font-medium text-white">
                  {String(t.page).padStart(2, '0')}
                </span>
              </Row>
            </li>
          );
        })}
      </ol>
      <div className="mt-auto flex items-stretch gap-4">
        <Photo name="tower-cranes" alt="Tower cranes" position="50% 50%" className="h-[92px] w-[220px] shrink-0" label />
        <div className="flex flex-1 flex-col justify-center border-l-[4px] border-qd-red bg-mist px-4">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-qd-red">About this publication</div>
          <p className="mt-1 text-[10.5px] leading-[1.5] text-ink-2">
            Photographs are licensed stock imagery used for illustration and do not depict QD projects. Technical drawings are schematic.
          </p>
        </div>
      </div>
    </PageFrame>
  );
}

export function IntroPage({ number }: PageProps) {
  return (
    <PageFrame
      number={number}
      section="Company Introduction"
      body="!top-[500px]"
      bleed={
        <>
          <div className="absolute inset-x-0 top-[112px] h-[380px]" style={{ clipPath: 'ellipse(85% 100% at 30% 0%)' }}>
            <Photo name="scaffold-crew" alt="Engineers in safety gear climbing a structure" position="50% 30%" className="h-full w-full" />
          </div>
          <svg className="absolute inset-x-0 top-[162px]" width={794} height={350} aria-hidden>
            <path d="M0 300 C 260 345, 560 300, 794 120" fill="none" stroke="#CC3433" strokeWidth={7} />
            <path d="M0 318 C 280 360, 580 312, 794 150" fill="none" stroke="#330065" strokeWidth={4} />
            <path d="M0 330 C 300 372, 600 322, 794 172" fill="none" stroke="#330065" strokeWidth={1.5} opacity="0.5" />
          </svg>
          <Illustrative light className="absolute left-[40px] top-[130px]" />
        </>
      }
    >
      <Ribbon icon={Building2}>Company Introduction</Ribbon>
      <Headline className="mt-4" size={32}>
        Built on two decades of hands-on experience
      </Headline>
      <div className="mt-5 grid grid-cols-[1.05fr_1fr] gap-7">
        <div>
          <p className="font-serif text-[16px] leading-[1.5] text-ink">{intro.ambition}</p>
          <p className="mt-4 border-l-[3px] border-qd-red pl-3 text-[11px] italic text-ink-2">{intro.blessing}</p>
        </div>
        <div className="space-y-[9px] text-[11.5px] text-ink-2">
          <p>{intro.established}</p>
          <p>{intro.founders}</p>
          <p>{glance.owners}</p>
        </div>
      </div>
      <div className="mt-auto flex flex-wrap gap-2">
        {['Oil & Gas', 'Chemical & Petrochemical', 'Power', 'Cement', 'Fertilizer', 'Infrastructure'].map((s) => (
          <span key={s} className="rounded-full bg-qd-purple px-3 py-[5px] font-mono text-[9.5px] uppercase tracking-[0.12em] text-white">
            {s}
          </span>
        ))}
      </div>
    </PageFrame>
  );
}

const STAT_ICONS: LucideIcon[] = [Clock, Users, ShieldCheck, Layers];

export function GlancePage({ number }: PageProps) {
  return (
    <PageFrame number={number} section="QD at a Glance" bg="bg-mist">
      <Ribbon icon={BarChart3}>QD at a Glance</Ribbon>
      <Headline className="mt-4" size={32}>
        People, quality and timely delivery
      </Headline>
      <div className="mt-5 grid grid-cols-4 gap-3">
        {glance.stats.map((s, i) => (
          <div key={s.label} className="relative overflow-hidden rounded-lg bg-paper p-4 shadow-[0_2px_0_rgba(51,0,101,0.12)]">
            <div className={`absolute inset-x-0 top-0 h-[4px] ${i % 2 ? 'bg-qd-red' : 'bg-qd-purple'}`} />
            <IconBadge icon={STAT_ICONS[i]} tone={i % 2 ? 'red' : 'purple'} size={36} />
            <div className="mt-2 flex items-baseline gap-1">
              <span className="display-cond font-display text-[48px] font-extrabold leading-none text-qd-purple">{s.value}</span>
              {s.unit && <span className="font-mono text-[9.5px] uppercase text-qd-red">{s.unit}</span>}
            </div>
            <div className="mt-1 text-[10.5px] leading-[1.4] text-ink-2">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-7">
        <div className="space-y-3">
          <TextBlock icon={Users} title="Our team" text={glance.team} />
          <TextBlock icon={Building2} title="Projects of national significance" text={glance.timely} />
        </div>
        <TextBlock icon={BadgeCheck} title="Quality at every stage" text={glance.quality} />
      </div>
      <div className="mt-auto grid grid-cols-[1.25fr_1fr] gap-4">
        <Photo name="site-team" alt="Construction team on site" position="50% 60%" className="h-[250px] rounded-lg" label />
        <div className="flex flex-col justify-between rounded-lg bg-qd-purple p-5 text-white">
          <span className="font-serif text-[56px] leading-[0.6] text-qd-red">“</span>
          <p className="font-serif text-[16px] italic leading-[1.38]">Timely completion of every ongoing project always receives our highest priority.</p>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/60">Quantum Dynamics</span>
        </div>
      </div>
    </PageFrame>
  );
}

function TextBlock({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Icon size={18} className="text-qd-red" strokeWidth={2.4} />
        <h3 className="font-display text-[15px] font-bold text-ink">{title}</h3>
      </div>
      <p className="mt-1.5 text-[11.5px] text-ink-2">{text}</p>
    </div>
  );
}
