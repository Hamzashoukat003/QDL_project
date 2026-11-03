import { useEffect, useRef, useState } from 'react';
import { IMAGE_NAMES } from '../pages';
import { LogoMark } from './Logo';

/** Preloads fonts and photography so pages never flip in half-rendered. */
export function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    let done = 0;
    const total = IMAGE_NAMES.length + 1;
    const tick = () => setProgress(++done / total);
    const images = IMAGE_NAMES.map(
      (n) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = img.onerror = () => {
            tick();
            resolve();
          };
          img.src = `./images/${n}.jpg`;
        }),
    );
    const fonts = document.fonts.ready.then(tick);
    const minimum = new Promise((r) => setTimeout(r, 1100));
    let cancelled = false;
    Promise.all([...images, fonts, minimum]).then(() => {
      if (cancelled) return;
      setLeaving(true);
      setTimeout(() => doneRef.current(), 450);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      className={`absolute inset-0 z-[60] flex flex-col items-center justify-center bg-[#120f17] transition-opacity duration-500 ${leaving ? 'opacity-0' : 'opacity-100'}`}
      role="status"
      aria-label="Loading publication"
    >
      <div className="rounded-sm bg-white px-6 py-5">
        <LogoMark className="h-[64px] w-auto" />
      </div>
      <div className="mt-8 font-display text-[15px] font-semibold tracking-wide text-white">Quantum Dynamics Limited</div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">Engineering the Future</div>
      <div className="mt-8 h-[2px] w-[220px] overflow-hidden bg-white/10">
        <div className="h-full bg-qd-red transition-[width] duration-300 ease-out" style={{ width: `${Math.round(progress * 100)}%` }} />
      </div>
      <div className="mt-3 font-mono text-[10px] text-white/40">Preparing company profile · {Math.round(progress * 100)}%</div>
    </div>
  );
}
