import { forwardRef, memo, useImperativeHandle, useMemo, useRef, type ReactNode } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { PAGES } from '../pages';

export const PAGE_W = 794;
export const PAGE_H = 1123;

type SheetProps = { scale: number; side: 'left' | 'right' | 'single'; hard?: boolean; children: ReactNode };

const Sheet = forwardRef<HTMLDivElement, SheetProps>(({ scale, side, hard, children }, ref) => (
  <div ref={ref} className={`page-sheet ${side === 'single' ? '' : `--${side}`}`} data-density={hard ? 'hard' : 'soft'}>
    <div style={{ width: PAGE_W, height: PAGE_H, transform: `scale(${scale})`, transformOrigin: 'top left' }}>{children}</div>
    {side !== 'single' && !hard && <div className="gutter-shade" />}
  </div>
));
Sheet.displayName = 'Sheet';

export type FlipbookHandle = { next: () => void; prev: () => void; go: (index: number) => void };

type Props = {
  width: number;
  spread: boolean;
  startPage: number;
  onFlip: (index: number) => void;
  onNavigate: (pageNumber: number) => void;
};

/**
 * Remount (via `key` in the parent) whenever width or spread changes:
 * page-flip does not support resizing a fixed-size book in place.
 */
export const Flipbook = memo(
  forwardRef<FlipbookHandle, Props>(function Flipbook({ width, spread, startPage, onFlip, onNavigate }, ref) {
    const book = useRef<any>(null);
    const height = Math.round(width * (PAGE_H / PAGE_W));
    const scale = width / PAGE_W;

    useImperativeHandle(ref, () => ({
      next: () => book.current?.pageFlip()?.flipNext(),
      prev: () => book.current?.pageFlip()?.flipPrev(),
      go: (i: number) => book.current?.pageFlip()?.flip(i),
    }));

    const sheets = useMemo(
      () =>
        PAGES.map((p, i) => {
          const last = i === PAGES.length - 1;
          const side = !spread ? 'single' : i % 2 === 1 ? 'left' : 'right';
          return (
            <Sheet key={i} scale={scale} side={side} hard={i === 0 || last}>
              {p.render({ number: i + 1, onNavigate })}
            </Sheet>
          );
        }),
      [scale, spread, onNavigate],
    );

    return (
      <HTMLFlipBook
        ref={book}
        className="qd-book"
        style={{}}
        width={width}
        height={height}
        size="fixed"
        minWidth={120}
        maxWidth={4000}
        minHeight={170}
        maxHeight={6000}
        startPage={startPage}
        drawShadow
        maxShadowOpacity={0.45}
        flippingTime={900}
        usePortrait={!spread}
        startZIndex={0}
        autoSize
        showCover
        mobileScrollSupport={false}
        clickEventForward
        useMouseEvents
        swipeDistance={30}
        showPageCorners
        disableFlipByClick
        onFlip={(e: { data: number }) => onFlip(e.data)}
      >
        {sheets}
      </HTMLFlipBook>
    );
  }),
);
