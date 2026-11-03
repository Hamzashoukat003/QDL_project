import { MARK_GREY, MARK_PURPLE, MARK_RED, MARK_VIEWBOX } from './logoPaths';

type Props = {
  className?: string;
  variant?: 'color' | 'white' | 'ink';
  title?: string;
};

/** QD logo mark. `white` is for photographic or dark backgrounds. */
export function LogoMark({ className, variant = 'color', title = 'QD — Quantum Dynamics' }: Props) {
  const fills =
    variant === 'white'
      ? { red: '#fff', purple: '#fff', grey: 'rgba(255,255,255,0.6)' }
      : variant === 'ink'
        ? { red: '#1E1D22', purple: '#1E1D22', grey: '#9a99a0' }
        : { red: '#CC3433', purple: '#330065', grey: '#868686' };
  return (
    <svg viewBox={MARK_VIEWBOX} className={className} role="img" aria-label={title}>
      <path d={MARK_GREY} fill={fills.grey} fillRule="evenodd" />
      <path d={MARK_RED} fill={fills.red} fillRule="evenodd" />
      <path d={MARK_PURPLE} fill={fills.purple} fillRule="evenodd" />
    </svg>
  );
}
