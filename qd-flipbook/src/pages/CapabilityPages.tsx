import {
  BatteryCharging,
  CalendarRange,
  ClipboardList,
  Cog,
  Columns3,
  Construction,
  Droplets,
  Factory,
  Fan,
  FireExtinguisher,
  Flame,
  Fuel,
  Gauge,
  Hammer,
  HardHat,
  Landmark,
  Layers,
  Lightbulb,
  Network,
  PaintRoller,
  PenTool,
  Route,
  Server,
  Settings,
  ShieldCheck,
  Snowflake,
  Spline,
  TowerControl,
  TrendingUp,
  UserRound,
  Warehouse,
  Waypoints,
  Wind,
  Workflow,
  Wrench,
  Zap,
  Atom,
  Cylinder,
  type LucideIcon,
} from 'lucide-react';
import { TankElevation, TowerElevation } from '../components/Blueprints';
import { LogoMark } from '../components/Logo';
import { Headline, IconBadge, Illustrative, PageFrame, Photo, Ribbon, type PageProps } from '../components/Page';
import { capabilities, org, sectors, technical } from '../data/content';

const GROUP_ICONS: LucideIcon[] = [HardHat, Factory, Construction, Route];
const GROUP_TONES = ['bg-qd-purple', 'bg-qd-red', 'bg-ink', 'bg-qd-purple-ink'];
const TRADE_ICONS: Record<string, LucideIcon> = {
  Design: PenTool,
  Planning: CalendarRange,
  Fabrication: Factory,
  Welding: Flame,
  Erection: Construction,
  Insulation: Layers,
  Sandblasting: Wind,
  Painting: PaintRoller,
};

export function CapabilitiesPage({ number }: PageProps) {
  return (
    <PageFrame number={number} section="Our Capabilities">
      <div className="grid grid-cols-[1fr_250px] gap-6">
        <div>
          <Ribbon icon={Wrench}>Our Capabilities</Ribbon>
          <Headline className="mt-4" size={30}>
            Engineering, construction &amp; manufacturing
          </Headline>
          <p className="mt-3 text-[11.5px] text-ink-2">{capabilities.lede}</p>
        </div>
        <Photo name="welding" alt="Welding sparks in a fabrication workshop" position="40% 50%" className="h-[205px] rounded-lg" label />
      </div>

      <div className="mt-5 grid flex-1 auto-rows-fr grid-cols-2 gap-3">
        {capabilities.groups.map((g, i) => (
          <div key={g.title} className={`relative overflow-hidden rounded-xl p-4 text-white ${GROUP_TONES[i]}`}>
            <span className="display-cond absolute right-3 top-1 font-display text-[54px] font-extrabold leading-none text-white/10">{String(i + 1).padStart(2, '0')}</span>
            <div className="flex items-center gap-3">
              <IconBadge icon={GROUP_ICONS[i]} tone="white" size={40} />
              <h3 className="font-display text-[17px] font-bold leading-tight">{g.title}</h3>
            </div>
            <ul className="mt-3 space-y-[3px] pl-[52px] text-[11px] text-white/85">
              {g.items.map((it) => (
                <li key={it} className="flex gap-2">
                  <span className="mt-[6px] h-[5px] w-[5px] shrink-0 rounded-full bg-qd-red" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-4 rounded-xl border-2 border-qd-purple/15 bg-qd-purple-soft/60 px-4 py-3">
        <IconBadge icon={Gauge} tone="red" size={40} />
        <div>
          <h3 className="font-display text-[15px] font-bold text-qd-purple">Testing &amp; Commissioning</h3>
          <div className="mt-1.5 flex flex-wrap gap-[6px]">
            {capabilities.commissioning.map((c) => (
              <span key={c} className="rounded-full bg-paper px-[9px] py-[2px] font-mono text-[9px] uppercase tracking-[0.08em] text-ink-2">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-2 flex items-center gap-3">
          <span className="font-display text-[14px] font-extrabold uppercase text-qd-purple">Specialised trades</span>
          <span className="h-px flex-1 bg-rule" />
          <span className="text-[10px] text-ink-3">400+ trained workers &amp; technicians</span>
        </div>
        <div className="grid grid-cols-8 gap-2">
          {capabilities.trades.map((t) => {
            const Icon = TRADE_ICONS[t];
            return (
              <div key={t} className="flex flex-col items-center gap-1.5 rounded-lg border border-rule bg-paper py-3">
                <Icon size={24} className="text-qd-red" strokeWidth={1.8} />
                <span className="text-[10px] font-semibold text-ink">{t}</span>
              </div>
            );
          })}
        </div>
      </div>
    </PageFrame>
  );
}

const SPEC_ICONS: LucideIcon[] = [Cylinder, Zap, TowerControl, Warehouse, Flame, Droplets];
const SYSTEM_ICONS: Record<string, LucideIcon> = {
  'MS storage tanks': Cylinder,
  'Oil storage tanks': Fuel,
  'Pipe rack structures': Columns3,
  'Process piping': Waypoints,
  'Nitrogen plant piping': Atom,
  'Utility piping': Workflow,
  Pumps: Gauge,
  Chillers: Snowflake,
  'Cooling towers': Wind,
  'Air handling units': Fan,
  'Wastewater treatment plant': Droplets,
  Turbines: Cog,
  'Diesel power generators': Zap,
  Generators: BatteryCharging,
  'Fire-fighting systems': FireExtinguisher,
  'Steel rib / arch structures': Spline,
};

export function TechnicalPage({ number }: PageProps) {
  return (
    <PageFrame number={number} section="Technical Expertise">
      <div className="flex items-end justify-between gap-6">
        <div>
          <Ribbon icon={Cog}>Technical Expertise</Ribbon>
          <Headline className="mt-4" size={30}>
            Equipment, piping, tanks &amp; structures
          </Headline>
        </div>
        <p className="w-[240px] shrink-0 text-[11px] text-ink-2">{technical.lede}</p>
      </div>

      <div className="blueprint-grid relative mt-4 flex h-[270px] items-end gap-4 overflow-hidden rounded-xl border border-qd-purple/15 bg-qd-purple-soft/40 px-4 pb-2">
        <TankElevation className="w-[480px]" />
        <TowerElevation className="h-[256px] w-auto" />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {technical.specs.map((s, i) => (
          <div key={s.item} className="flex gap-3 rounded-lg border border-rule p-3">
            <IconBadge icon={SPEC_ICONS[i]} tone={i % 2 ? 'red' : 'purple'} size={38} />
            <div className="min-w-0">
              <div className="flex items-baseline gap-1">
                <span className="display-cond font-display text-[34px] font-extrabold leading-none text-qd-purple">{s.figure}</span>
                <span className="font-mono text-[9px] uppercase text-qd-red">{s.unit}</span>
              </div>
              <div className="mt-1 font-display text-[12.5px] font-bold leading-tight text-ink">{s.item}</div>
              <div className="text-[10px] text-ink-3">{s.detail}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto">
        <div className="mb-2 flex items-center gap-3">
          <span className="font-display text-[14px] font-extrabold uppercase text-qd-purple">Systems fabricated, erected &amp; installed</span>
          <span className="h-px flex-1 bg-rule" />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {technical.systems.map((s) => {
            const Icon = SYSTEM_ICONS[s];
            return (
              <div key={s} className="flex items-center gap-2 rounded-md bg-mist px-2 py-[10px]">
                <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-qd-purple/25 bg-paper text-qd-purple">
                  <Icon size={16} strokeWidth={1.9} />
                </span>
                <span className="text-[10px] font-medium leading-tight text-ink">{s}</span>
              </div>
            );
          })}
        </div>
      </div>
    </PageFrame>
  );
}

export function SectorsPage({ number }: PageProps) {
  // Five photo badges on an ellipse around the QD mark.
  const W = 698;
  const H = 500;
  const cx = W / 2;
  const cy = H / 2;
  const r = 66;
  const pts = sectors.map((_, i) => {
    const a = (-90 + i * 72) * (Math.PI / 180);
    return { x: cx + Math.cos(a) * 262, y: cy + Math.sin(a) * 176 };
  });
  return (
    <PageFrame number={number} section="Business Sectors">
      <div className="flex items-end justify-between gap-6">
        <div>
          <Ribbon icon={Factory}>Business Sectors</Ribbon>
          <Headline className="mt-4" size={30}>
            Five sectors we serve
          </Headline>
        </div>
        <p className="w-[250px] shrink-0 text-[11px] text-ink-2">
          Experience spanning oil refineries, gas fields, chemical and fibre plants, power generation, cement, fertilizer and infrastructure.
        </p>
      </div>

      <div className="relative mt-3 shrink-0" style={{ width: W, height: H }}>
        <svg className="absolute inset-0" width={W} height={H} aria-hidden>
          <ellipse cx={cx} cy={cy} rx={262} ry={176} fill="none" stroke="#330065" strokeOpacity="0.25" strokeWidth={2} strokeDasharray="6 6" />
          <ellipse cx={cx} cy={cy} rx={150} ry={100} fill="none" stroke="#CC3433" strokeOpacity="0.35" strokeWidth={1.5} />
          {pts.map((p, i) => (
            <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#330065" strokeOpacity="0.18" strokeWidth={1.5} />
          ))}
        </svg>
        <div
          className="absolute flex h-[132px] w-[132px] flex-col items-center justify-center rounded-full border-[5px] border-qd-red bg-paper"
          style={{ left: cx - 66, top: cy - 66, boxShadow: '0 6px 18px rgba(51,0,101,0.18)' }}
        >
          <LogoMark className="w-[78px]" />
          <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.18em] text-ink-3">5 sectors</span>
        </div>
        {sectors.map((s, i) => (
          <div key={s.name} className="absolute flex flex-col items-center" style={{ left: pts[i].x - r, top: pts[i].y - r, width: r * 2 }}>
            <div className="relative h-[132px] w-[132px] overflow-hidden rounded-full border-[4px] border-paper" style={{ boxShadow: '0 0 0 3px #330065, 0 6px 16px rgba(0,0,0,0.2)' }}>
              <Photo name={s.image} alt={s.name} className="h-full w-full" position="50% 55%" />
              <span className="absolute left-1/2 top-[6px] flex h-[22px] w-[22px] -translate-x-1/2 items-center justify-center rounded-full bg-qd-red font-mono text-[9px] font-medium text-white">
                {i + 1}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto grid grid-cols-5 gap-2">
        {sectors.map((s, i) => (
          <div key={s.name} className={`rounded-lg p-3 ${i % 2 ? 'bg-qd-red' : 'bg-qd-purple'} text-white`}>
            <div className="font-mono text-[9px] text-white/70">{String(i + 1).padStart(2, '0')}</div>
            <div className="mt-0.5 font-display text-[13px] font-bold leading-tight">{s.name}</div>
            <ul className="mt-2 space-y-[3px] text-[9.5px] leading-snug text-white/85">
              {s.refs.length ? s.refs.map((ref) => <li key={ref}>{ref}</li>) : <li>Listed among QD's five business sectors.</li>}
            </ul>
          </div>
        ))}
      </div>
      <Illustrative className="mt-1.5 self-end" />
    </PageFrame>
  );
}

const DEPT_ICONS: Record<string, LucideIcon> = {
  'Maintenance Manager': Wrench,
  'Operations Manager': Settings,
  'Workshop Superintendent': Hammer,
  'Project Manager': ClipboardList,
  'Head of IT & Stores': Server,
  'Finance & Admin Manager': Landmark,
  'Commercial & Business Development Manager': TrendingUp,
};

function OrgBox({ label, icon: Icon, tone }: { label: string; icon: LucideIcon; tone: 'red' | 'purple' | 'soft' | 'line' }) {
  const styles = {
    red: 'bg-qd-red text-white',
    purple: 'bg-qd-purple text-white',
    soft: 'bg-qd-purple-soft text-qd-purple border border-qd-purple/25',
    line: 'bg-paper text-ink border-2 border-qd-purple/70',
  }[tone];
  return (
    <div className={`flex h-full w-full flex-col items-center justify-center gap-1.5 rounded-lg px-1.5 text-center ${styles}`}>
      <Icon size={tone === 'line' ? 18 : 20} strokeWidth={2} className={tone === 'line' ? 'text-qd-red' : ''} />
      <span className="font-display text-[11px] font-bold leading-[1.15]">{label}</span>
    </div>
  );
}

export function OrganizationPage({ number }: PageProps) {
  const W = 698;
  const n = org.departments.length;
  const colW = W / n;
  const underIdx = org.departments.indexOf(org.under.parent);
  return (
    <PageFrame number={number} section="Organization Structure">
      <Ribbon icon={Network}>Organization Structure</Ribbon>
      <div className="mt-4 flex items-end justify-between gap-6">
        <Headline size={30}>How we are organised</Headline>
        <p className="w-[330px] shrink-0 text-[11px] text-ink-2">
          QD is led by its Chief Executive Officer, with a General Manager directing operations, maintenance, workshop, projects, IT &amp; stores, finance and
          commercial functions — supported by an Advisor and a dedicated QHSE Manager.
        </p>
      </div>

      <div className="relative mx-auto mt-6 shrink-0" style={{ width: W, height: 620 }}>
        <svg className="absolute inset-0" width={W} height={620} aria-hidden>
          <g stroke="#330065" strokeWidth={2} fill="none" strokeLinecap="round">
            <line x1={W / 2} y1={70} x2={W / 2} y2={372} />
            <line x1={170} y1={258} x2={W - 170} y2={258} />
            <line x1={colW / 2} y1={372} x2={W - colW / 2} y2={372} />
            {org.departments.map((_, i) => (
              <line key={i} x1={colW * i + colW / 2} y1={372} x2={colW * i + colW / 2} y2={398} />
            ))}
            <line x1={colW * underIdx + colW / 2} y1={522} x2={colW * underIdx + colW / 2} y2={552} />
          </g>
          <circle cx={W / 2} cy={372} r={5} fill="#CC3433" />
        </svg>
        <div className="absolute" style={{ left: W / 2 - 85, top: 0, width: 170, height: 70 }}>
          <OrgBox label={org.top} icon={UserRound} tone="red" />
        </div>
        <div className="absolute" style={{ left: W / 2 - 95, top: 132, width: 190, height: 70 }}>
          <OrgBox label={org.gm} icon={UserRound} tone="purple" />
        </div>
        <div className="absolute" style={{ left: 30, top: 228, width: 140, height: 60 }}>
          <OrgBox label={org.staff[0]} icon={Lightbulb} tone="soft" />
        </div>
        <div className="absolute" style={{ left: W - 170, top: 228, width: 140, height: 60 }}>
          <OrgBox label={org.staff[1]} icon={ShieldCheck} tone="soft" />
        </div>
        {org.departments.map((d, i) => (
          <div key={d} className="absolute" style={{ left: colW * i + 3, top: 398, width: colW - 6, height: 124 }}>
            <OrgBox label={d} icon={DEPT_ICONS[d]} tone="line" />
          </div>
        ))}
        <div className="absolute" style={{ left: colW * underIdx + 3, top: 552, width: colW - 6, height: 64 }}>
          <OrgBox label={org.under.role} icon={HardHat} tone="soft" />
        </div>
      </div>

      <div className="mt-auto grid grid-cols-3 gap-3">
        {(
          [
            [UserRound, 'Leadership', 'CEO and General Manager set direction and oversee every function.'],
            [ShieldCheck, 'Advisory & QHSE', 'An Advisor and a QHSE Manager report directly to the General Manager.'],
            [Layers, 'Departments', 'Seven functional heads cover operations, delivery and support.'],
          ] as [LucideIcon, string, string][]
        ).map(([Icon, h, b]) => (
          <div key={h} className="flex gap-3 rounded-lg bg-mist p-3">
            <Icon size={20} className="shrink-0 text-qd-red" />
            <div>
              <div className="font-display text-[13px] font-bold text-ink">{h}</div>
              <p className="mt-0.5 text-[10.5px] text-ink-2">{b}</p>
            </div>
          </div>
        ))}
      </div>
    </PageFrame>
  );
}
