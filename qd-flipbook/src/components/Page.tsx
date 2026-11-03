import type { LucideIcon } from 'lucide-react';
import { useId, type ReactNode } from 'react';
import { LogoMark } from './Logo';

export type PageProps = { number: number };

/** QD lockup used in the page header band and on the covers. */
export function Lockup({ className = '', light = false }: { className?: string; light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoMark variant={light ? 'white' : 'color'} className="h-[50px] w-auto shrink-0" />
      <div className="leading-none">
        <div className={`font-display text-[19px] font-extrabold uppercase tracking-[0.01em] ${light ? 'text-white' : 'text-qd-purple'}`} style={{ fontStretch: '92%' }}>
          Quantum Dynamics
        </div>
        <div className="mt-[3px] font-display text-[11px] font-bold uppercase tracking-[0.42em] text-qd-red">Limited</div>
        <div className={`mt-[5px] font-mono text-[7.5px] uppercase tracking-[0.24em] ${light ? 'text-white/70' : 'text-ink-3'}`}>Engineering the Future</div>
      </div>
    </div>
  );
}

/** Branded header band repeated on every inner page. */
function HeaderBand({ section }: { section?: string }) {
  // Unique per page: a shared id would resolve to the copy in the hidden print view and render nothing.
  const id = useId().replace(/:/g, '');
  return (
    <div className="absolute inset-x-0 top-0 z-20 h-[112px]">
      <svg className="absolute inset-0" width={794} height={112} aria-hidden>
        <defs>
          <linearGradient id={`${id}-red`} x1="0" x2="1">
            <stop offset="0" stopColor="#B82A2E" />
            <stop offset="1" stopColor="#D63C3A" />
          </linearGradient>
          <linearGradient id={`${id}-shadow`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#000" stopOpacity="0.18" />
            <stop offset="1" stopColor="#000" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width={794} height={112} fill="#fff" />
        <polygon points="352,90 794,90 794,98 348,98" fill={`url(#${id}-shadow)`} />
        <polygon points="412,0 794,0 794,90 374,90" fill={`url(#${id}-red)`} />
        <polygon points="382,0 406,0 368,90 344,90" fill="#330065" />
        <polygon points="440,0 458,0 498,90 480,90" fill="#330065" opacity="0.85" />
        <polygon points="466,0 472,0 512,90 506,90" fill="#fff" opacity="0.35" />
        <line x1={0} y1={111.5} x2={352} y2={111.5} stroke="#DCDAD5" />
      </svg>
      <Lockup className="absolute left-[34px] top-[22px]" />
      {section && (
        <div className="absolute right-[40px] top-[36px] flex items-center gap-2 text-white">
          <span className="h-[2px] w-[18px] bg-white/70" />
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.22em]">{section}</span>
        </div>
      )}
    </div>
  );
}

/** Footer band with the folio. Even numbers are left-hand pages. */
function FooterBand({ number }: { number: number }) {
  const left = number % 2 === 0;
  return (
    <div className="absolute inset-x-0 bottom-0 z-20 h-[44px]">
      <svg className="absolute inset-0" width={794} height={44} aria-hidden>
        <rect y={10} width={794} height={34} fill="#1C0838" />
        <polygon points="0,10 794,10 794,14 0,14" fill="#330065" />
        <polygon points="150,10 330,10 312,44 132,44" fill="#CC3433" />
        <polygon points="338,10 350,10 332,44 320,44" fill="#CC3433" opacity="0.6" />
        <polygon points="470,10 650,10 632,44 452,44" fill="#330065" />
        <polygon points="658,10 668,10 650,44 640,44" fill="#CC3433" opacity="0.6" />
      </svg>
      <div className={`absolute bottom-[8px] flex h-[34px] w-[64px] items-center justify-center bg-paper ${left ? 'left-[34px]' : 'right-[34px]'}`}>
        <span className="display-cond font-display text-[22px] font-bold leading-none text-qd-purple">{String(number).padStart(2, '0')}</span>
      </div>
      <span className={`absolute bottom-[19px] font-mono text-[9px] uppercase tracking-[0.3em] text-white/80 ${left ? 'right-[40px]' : 'left-[40px]'}`}>
        Engineering the Future
      </span>
    </div>
  );
}

type FrameProps = {
  number: number;
  section?: string;
  bg?: string;
  chrome?: boolean;
  /** Full-bleed artwork placed behind the content box. */
  bleed?: ReactNode;
  /** Classes for the content box (flow layout between the header and footer bands). */
  body?: string;
  children: ReactNode;
};

/** A4 page canvas (794 × 1123 px) with header band, footer band and a flow-layout content box. */
export function PageFrame({ number, section, bg = 'bg-paper', chrome = true, bleed, body = '', children }: FrameProps) {
  return (
    <div className={`qd-page ${bg}`} data-page={number}>
      {bleed}
      {chrome ? (
        <>
          <HeaderBand section={section} />
          <div className={`page-body absolute bottom-[64px] left-[48px] right-[48px] top-[136px] z-10 flex flex-col overflow-hidden ${body}`}>{children}</div>
          <FooterBand number={number} />
        </>
      ) : (
        children
      )}
    </div>
  );
}

// `relative` would override a caller's `absolute` (later in Tailwind's output), so only add it when needed.
const isPositioned = (cls: string) => cls.split(/\s+/).some((c) => c === 'absolute' || c === 'fixed');

type PhotoProps = {
  name: string;
  className?: string;
  position?: string;
  alt: string;
  tint?: 'none' | 'purple' | 'dark' | 'mono';
  label?: boolean;
};

/** Stock photograph. Every photo in this publication is illustrative, not QD project documentation. */
export function Photo({ name, className = '', position = 'center', alt, tint = 'none', label = false }: PhotoProps) {
  return (
    <div className={`${isPositioned(className) ? '' : 'relative'} overflow-hidden bg-ink ${className}`}>
      <img
        src={`./images/${name}.jpg`}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: position, filter: tint === 'mono' ? 'grayscale(1) contrast(1.05)' : undefined }}
        draggable={false}
      />
      {tint === 'purple' && (
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(28,8,56,0.2), rgba(28,8,56,0.75))' }} />
      )}
      {tint === 'dark' && <div className="absolute inset-0 bg-black/35" />}
      {label && <Illustrative light className="absolute bottom-[6px] right-[8px]" />}
    </div>
  );
}

/** Small marker set on/near photographs so stock imagery is never read as QD project documentation. */
export function Illustrative({ className = '', light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={`font-mono text-[6.5px] uppercase tracking-[0.18em] ${light ? 'text-white/75' : 'text-ink-3'} ${className}`}>
      Illustrative image
    </span>
  );
}

/** Capsule section label with an offset shadow. */
export function Ribbon({ icon: Icon, children, dark = false, className = '' }: { icon?: LucideIcon; children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-3 self-start rounded-full border-[2.5px] border-qd-red px-6 py-[7px] ${dark ? 'bg-qd-purple-ink text-white' : 'bg-paper text-qd-purple'} ${className}`}
      style={{ boxShadow: `4px 4px 0 ${dark ? 'rgba(255,255,255,0.18)' : 'rgba(51,0,101,0.22)'}` }}
    >
      <span className="font-display text-[21px] font-extrabold leading-none" style={{ fontStretch: '90%' }}>
        {children}
      </span>
      {Icon && <Icon size={22} strokeWidth={2.4} className="text-qd-red" />}
    </div>
  );
}

/** Big uppercase page headline. */
export function Headline({ children, dark = false, className = '', size = 36 }: { children: ReactNode; dark?: boolean; className?: string; size?: number }) {
  return (
    <h2
      className={`balance font-display font-extrabold uppercase leading-[0.98] ${dark ? 'text-white' : 'text-qd-purple'} ${className}`}
      style={{ fontSize: size, fontStretch: '86%' }}
    >
      {children}
    </h2>
  );
}

/** Icon in a filled circle. */
export function IconBadge({ icon: Icon, tone = 'purple', size = 44 }: { icon: LucideIcon; tone?: 'purple' | 'red' | 'white' | 'ink'; size?: number }) {
  const styles = {
    purple: 'bg-qd-purple text-white',
    red: 'bg-qd-red text-white',
    white: 'bg-paper text-qd-purple',
    ink: 'bg-ink text-white',
  }[tone];
  return (
    <span className={`inline-flex shrink-0 items-center justify-center rounded-full ${styles}`} style={{ width: size, height: size }}>
      <Icon size={size * 0.5} strokeWidth={2} />
    </span>
  );
}
