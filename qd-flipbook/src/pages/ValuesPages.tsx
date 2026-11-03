import {
  BadgeCheck,
  CalendarRange,
  Compass,
  Construction,
  Droplets,
  Eye,
  Factory,
  Flame,
  Gem,
  Handshake,
  HardHat,
  HeartHandshake,
  Layers,
  PaintRoller,
  PenTool,
  Power,
  Scale,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { useId } from 'react';
import { Headline, IconBadge, Illustrative, PageFrame, Photo, Ribbon, type PageProps } from '../components/Page';
import { coreValues, glance, lifecycle, projectManagement, safety, statements, values } from '../data/content';

const VALUE_ICONS: LucideIcon[] = [Handshake, Scale, ShieldCheck, Flame, HeartHandshake, TrendingUp];
const PRACTICE_ICONS: LucideIcon[] = [BadgeCheck, Users, Eye];

export function CoreValuesPage({ number }: PageProps) {
  return (
    <PageFrame
      number={number}
      section="Core Values"
      bg="bg-qd-purple-ink"
      bleed={<div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'repeating-linear-gradient(135deg, #fff 0 1px, transparent 1px 16px)' }} />}
    >
      <Ribbon icon={Gem} dark>
        Core Values
      </Ribbon>
      <Headline className="mt-4" size={30} dark>
        What we stand for
      </Headline>

      <div className="mt-5 grid grid-cols-3 gap-3">
        {coreValues.map((v, i) => (
          <div key={v} className="flex flex-col items-center rounded-xl border border-white/15 bg-white/[0.06] px-3 py-4 text-center">
            <span className="flex h-[58px] w-[58px] items-center justify-center rounded-full border-[3px] border-qd-red bg-paper text-qd-purple">
              {(() => {
                const Icon = VALUE_ICONS[i];
                return <Icon size={28} strokeWidth={1.9} />;
              })()}
            </span>
            <span className="mt-1 font-mono text-[9px] text-qd-red">{String(i + 1).padStart(2, '0')}</span>
            <span className="mt-0.5 font-display text-[17px] font-bold leading-tight text-white">{v}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-3">
        <span className="font-display text-[14px] font-extrabold uppercase text-white">Our values in practice</span>
        <span className="h-px flex-1 bg-white/20" />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {values.map((v, i) => (
          <div key={v.title} className="rounded-xl bg-paper p-4">
            <div className="flex items-center gap-2">
              <IconBadge icon={PRACTICE_ICONS[i]} tone="red" size={30} />
              <h3 className="font-display text-[13px] font-bold leading-tight text-qd-purple">{v.title}</h3>
            </div>
            <p className="mt-2 text-[10.5px] leading-[1.55] text-ink-2">{v.body}</p>
          </div>
        ))}
      </div>
      <Photo name="rebar-columns" alt="Workers fixing reinforcement on a construction site" position="50% 40%" className="mt-4 min-h-[130px] flex-1 rounded-xl" tint="purple" label />
    </PageFrame>
  );
}

const STATEMENT_ICONS: LucideIcon[] = [Eye, Target, Compass];

export function VisionPage({ number }: PageProps) {
  const [vision, ...rest] = statements;
  return (
    <PageFrame
      number={number}
      section="Vision, Mission & Purpose"
      bleed={
        <>
          <div className="absolute inset-x-0 top-[112px] h-[470px] bg-qd-purple" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 78%, 0 100%)' }}>
            <Photo name="cranes-bw" alt="Tower cranes over a structure under construction" tint="mono" position="50% 35%" className="absolute right-0 top-0 h-full w-[300px] opacity-40" />
            <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'repeating-linear-gradient(135deg, #fff 0 1px, transparent 1px 16px)' }} />
          </div>
          <svg className="absolute inset-x-0 top-[112px]" width={794} height={480} aria-hidden>
            <polygon points="0,470 794,366 794,378 0,482" fill="#CC3433" />
          </svg>
          <Illustrative light className="absolute right-[40px] top-[126px]" />
        </>
      }
    >
      <div className="h-[330px] text-white">
        <Ribbon icon={STATEMENT_ICONS[0]} dark>
          Our {vision.label}
        </Ribbon>
        <p className="mt-6 w-[420px] font-serif text-[27px] leading-[1.35]">{vision.text}</p>
      </div>
      <div className="mt-[130px] flex flex-1 flex-col justify-evenly">
        {rest.map((s, i) => (
          <div key={s.label} className="grid grid-cols-[230px_1fr] items-start gap-6 border-t border-rule pt-6 first:border-t-0 first:pt-0">
            <Ribbon icon={STATEMENT_ICONS[i + 1]}>Our {s.label}</Ribbon>
            <p className="font-serif text-[21px] leading-[1.42] text-ink">{s.text}</p>
          </div>
        ))}
      </div>
    </PageFrame>
  );
}

const STEP_ICONS: LucideIcon[] = [PenTool, CalendarRange, Factory, Construction, Layers, PaintRoller, Droplets, Power];

export function QhsePage({ number }: PageProps) {
  const arrowId = `${useId().replace(/:/g, '')}-arrow`;
  const W = 698;
  const H = 400;
  const cx = W / 2;
  const cy = H / 2;
  const rx = 268;
  const ry = 140;
  const pts = lifecycle.map((_, i) => {
    const a = (-90 + i * 45) * (Math.PI / 180);
    return { x: cx + Math.cos(a) * rx, y: cy + Math.sin(a) * ry };
  });
  return (
    <PageFrame number={number} section="Project Management & QHSE">
      <Ribbon icon={ShieldCheck}>Project Management &amp; QHSE</Ribbon>
      <div className="mt-4 grid grid-cols-[1fr_1.15fr] items-end gap-6">
        <Headline size={30}>Scope, budget, quality &amp; safety</Headline>
        <p className="text-[11px] text-ink-2">{projectManagement}</p>
      </div>

      <div className="relative mt-3 shrink-0" style={{ width: W, height: H }}>
        <svg className="absolute inset-0" width={W} height={H} aria-hidden>
          <defs>
            <marker id={arrowId} viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" fill="#330065" />
            </marker>
          </defs>
          <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="#330065" strokeOpacity="0.18" strokeWidth={14} />
          {pts.map((p, i) => {
            const q = pts[(i + 1) % pts.length];
            if (i === pts.length - 1) return null;
            const mx = (p.x + q.x) / 2;
            const my = (p.y + q.y) / 2;
            return <line key={i} x1={mx - (q.x - p.x) * 0.08} y1={my - (q.y - p.y) * 0.08} x2={mx + (q.x - p.x) * 0.08} y2={my + (q.y - p.y) * 0.08} stroke="#330065" strokeWidth={2.5} markerEnd={`url(#${arrowId})`} />;
          })}
        </svg>
        <div className="absolute flex h-[150px] w-[220px] flex-col items-center justify-center rounded-[50%] bg-qd-purple text-center text-white" style={{ left: cx - 110, top: cy - 75 }}>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/70">Execution</span>
          <span className="mt-1 font-display text-[17px] font-extrabold uppercase leading-tight">
            From design
            <br />
            to commissioning
          </span>
        </div>
        {lifecycle.map((step, i) => {
          const Icon = STEP_ICONS[i];
          return (
            <div key={step} className="absolute flex w-[120px] flex-col items-center text-center" style={{ left: pts[i].x - 60, top: pts[i].y - 30 }}>
              <span
                className={`flex h-[60px] w-[60px] items-center justify-center rounded-full border-[3px] border-paper ${i === lifecycle.length - 1 ? 'bg-qd-red' : 'bg-qd-purple'} text-white`}
                style={{ boxShadow: '0 0 0 2px #330065' }}
              >
                <Icon size={26} strokeWidth={1.9} />
              </span>
              <span className="mt-1 rounded bg-paper/90 px-1 font-display text-[11px] font-bold leading-tight text-ink">
                <span className="mr-1 font-mono text-[9px] text-qd-red">{String(i + 1).padStart(2, '0')}</span>
                {step}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 grid grid-cols-[200px_1fr] items-center gap-5 rounded-xl bg-mist p-4">
        <div>
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-qd-red">Safety philosophy</div>
          <div className="display-cond mt-1 font-display text-[40px] font-extrabold uppercase leading-[0.9] text-ink">The Three Zeros</div>
          <p className="mt-2 text-[10px] leading-[1.5] text-ink-2">{safety.ppe}</p>
        </div>
        <div className="flex justify-around">
          {safety.zeros.map((z) => (
            <div key={z} className="flex flex-col items-center">
              <div className="relative flex h-[96px] w-[96px] items-center justify-center rounded-full border-[4px] border-qd-purple bg-paper">
                <span className="display-cond font-display text-[58px] font-extrabold leading-none text-qd-purple">0</span>
                <span className="absolute -right-1 top-1 flex h-[26px] w-[26px] items-center justify-center rounded-full bg-qd-red text-white">
                  <HardHat size={14} />
                </span>
              </div>
              <span className="mt-2 font-display text-[14px] font-bold text-ink">{z}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto grid grid-cols-[230px_1fr] gap-4">
        <Photo name="hard-hat" alt="Red safety helmet on site" position="50% 50%" className="h-[120px] rounded-xl" label />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="flex items-center gap-2 font-display text-[13.5px] font-bold text-ink">
              <BadgeCheck size={16} className="text-qd-red" /> Quality control
            </h3>
            <p className="mt-1 text-[10px] leading-[1.5] text-ink-2">
              Quality control facilities monitor, record and maintain quality standards at every stage of design, planning and installation.
            </p>
          </div>
          <div>
            <h3 className="flex items-center gap-2 font-display text-[13.5px] font-bold text-ink">
              <Handshake size={16} className="text-qd-red" /> Owner coordination
            </h3>
            <p className="mt-1 text-[10px] leading-[1.5] text-ink-2">{glance.owners}</p>
          </div>
        </div>
      </div>
    </PageFrame>
  );
}
