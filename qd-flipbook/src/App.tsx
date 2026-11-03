import {
  AlignLeft,
  BookOpen,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Download,
  Home,
  LayoutGrid,
  Maximize,
  Minimize,
  Pause,
  Play,
  Printer,
  Search,
  Share2,
  SkipBack,
  SkipForward,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Flipbook, PAGE_H, PAGE_W, type FlipbookHandle } from './components/Flipbook';
import { Loader } from './components/Loader';
import { LogoMark } from './components/Logo';
import { PrintPages } from './components/PrintPages';
import { ReadView } from './components/ReadView';
import { toc } from './data/content';
import { PAGES } from './pages';

const ZOOMS = [1, 1.5, 2, 2.5, 3];
const PDF_URL = './QD-Company-Profile.pdf';
const TOTAL = PAGES.length;
const TOOLBAR_H = 50;
const AUTOPLAY_MS = 3500;

type Panel = 'none' | 'toc' | 'thumbs';

function useViewport() {
  const [vp, setVp] = useState({ w: window.innerWidth, h: window.innerHeight });
  useEffect(() => {
    let t = 0;
    const on = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => setVp({ w: window.innerWidth, h: window.innerHeight }), 120);
    };
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return vp;
}

/** Text of every page, read from the hidden print view, for the search box. */
function usePageText(ready: boolean) {
  const [texts, setTexts] = useState<string[]>([]);
  useEffect(() => {
    if (!ready) return;
    const pages = [...document.querySelectorAll('.print-root .qd-page')];
    setTexts(
      pages.map((p) => {
        const parts: string[] = [];
        const walker = document.createTreeWalker(p, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
          const t = walker.currentNode.textContent?.trim();
          if (t) parts.push(t);
        }
        return parts.join(' ');
      }),
    );
  }, [ready]);
  return texts;
}

function ToolButton({ label, onClick, disabled, active, children, className = '' }: { label: string; onClick: () => void; disabled?: boolean; active?: boolean; children: ReactNode; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`tool-btn ${active ? 'bg-white/15 text-white' : ''} ${className}`}
    >
      {children}
    </button>
  );
}

export default function App() {
  const vp = useViewport();
  const [ready, setReady] = useState(false);
  const [page, setPage] = useState(0);
  const [zoomIdx, setZoomIdx] = useState(0);
  const [panel, setPanel] = useState<Panel>('none');
  const [fullscreen, setFullscreen] = useState(false);
  const [pdfAvailable, setPdfAvailable] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [pageInput, setPageInput] = useState<string | null>(null);
  const [toast, setToast] = useState('');
  // Phones and very short screens open in the reflowed reading view; the flipbook stays one tap away.
  const [mode, setMode] = useState<'book' | 'read'>(() => (window.innerWidth < 640 || window.innerHeight < 500 ? 'read' : 'book'));
  const modeRef = useRef(mode);
  modeRef.current = mode;
  const readScroll = useRef<HTMLElement>(null);
  const book = useRef<FlipbookHandle>(null);
  const pageRef = useRef(0);
  pageRef.current = page;
  const texts = usePageText(ready);

  const zoom = ZOOMS[zoomIdx];
  const compact = vp.w < 760;
  const tabs = vp.w >= 980;

  // Fit an A4 page (or spread) between the toolbar and the bottom edge, then apply zoom.
  const layout = useMemo(() => {
    const sidePad = tabs ? 76 : 10;
    const availW = vp.w - sidePad * 2;
    const availH = vp.h - TOOLBAR_H - (compact ? 16 : 28);
    const ratio = PAGE_H / PAGE_W;
    // Short screens (phones held sideways): one page at full width, scrolled vertically.
    const short = vp.h < 500;
    const single = Math.min(availW, availH / ratio);
    const double = Math.min(availW / 2, availH / ratio);
    const spread = !short && vp.w >= 700 && double >= single * 0.82;
    const base = Math.floor(short ? Math.min(availW, 640) : spread ? double : single);
    return { spread, short, width: Math.floor(base * zoom) };
  }, [vp, zoom, compact, tabs]);

  useEffect(() => {
    fetch(PDF_URL, { method: 'HEAD' })
      .then((r) => setPdfAvailable(r.ok && (r.headers.get('content-type') ?? '').includes('pdf')))
      .catch(() => setPdfAvailable(false));
  }, []);

  useEffect(() => {
    const on = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', on);
    return () => document.removeEventListener('fullscreenchange', on);
  }, []);

  const flash = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(''), 2200);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen?.();
    else document.documentElement.requestFullscreen?.().catch(() => {});
  }, []);

  const go = useCallback((index: number) => {
    book.current?.go(Math.max(0, Math.min(TOTAL - 1, index)));
  }, []);

  const navigateToFolio = useCallback(
    (folio: number) => {
      if (modeRef.current === 'read') {
        const el = document.getElementById(`s-${folio}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        else readScroll.current?.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      go(folio - 1);
    },
    [go],
  );

  const print = useCallback(() => window.print(), []);
  const download = useCallback(() => {
    if (!pdfAvailable) return print();
    const a = document.createElement('a');
    a.href = PDF_URL;
    a.download = 'QD-Company-Profile.pdf';
    a.click();
  }, [pdfAvailable, print]);

  const share = useCallback(async () => {
    const url = window.location.href.split('?')[0];
    try {
      if (navigator.share) await navigator.share({ title: 'Quantum Dynamics Limited — Company Profile', url });
      else {
        await navigator.clipboard.writeText(url);
        flash('Link copied to clipboard');
      }
    } catch {
      /* user cancelled */
    }
  }, [flash]);

  // Auto flip: advance every few seconds, stop at the back cover.
  useEffect(() => {
    if (!autoplay || mode !== 'book') return;
    if (page >= TOTAL - 1) {
      setAutoplay(false);
      return;
    }
    const t = window.setTimeout(() => book.current?.next(), AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [autoplay, page, mode]);

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.metaKey || e.ctrlKey || e.altKey) return;
      if (modeRef.current === 'read' && !['t', 'T', 'Escape'].includes(e.key)) return;
      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          book.current?.next();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          book.current?.prev();
          break;
        case 'Home':
          go(0);
          break;
        case 'End':
          go(TOTAL - 1);
          break;
        case '+':
        case '=':
          setZoomIdx((z) => Math.min(ZOOMS.length - 1, z + 1));
          break;
        case '-':
          setZoomIdx((z) => Math.max(0, z - 1));
          break;
        case '0':
          setZoomIdx(0);
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        case 't':
        case 'T':
          setPanel((p) => (p === 'toc' ? 'none' : 'toc'));
          break;
        case 'Escape':
          setPanel('none');
          setSearchOpen(false);
          break;
      }
    };
    window.addEventListener('keydown', on);
    return () => window.removeEventListener('keydown', on);
  }, [go, toggleFullscreen]);

  // Which pages are visible, for the page box.
  const label = useMemo(() => {
    if (!layout.spread || page === 0 || page === TOTAL - 1) return `${page + 1}`;
    const left = page % 2 === 1 ? page : page - 1;
    return `${left + 1}-${Math.min(left + 2, TOTAL)}`;
  }, [page, layout.spread]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return texts
      .map((t, i) => {
        const at = t.toLowerCase().indexOf(q);
        if (at < 0) return null;
        const start = Math.max(0, at - 40);
        return { page: i, snippet: `${start ? '…' : ''}${t.slice(start, at + q.length + 60)}…` };
      })
      .filter((r): r is { page: number; snippet: string } => r !== null);
  }, [query, texts]);

  const shift = layout.spread ? (page === 0 ? -layout.width / 2 : page === TOTAL - 1 ? layout.width / 2 : 0) : 0;
  const bookW = layout.spread ? layout.width * 2 : layout.width;
  const bookH = Math.round(layout.width * (PAGE_H / PAGE_W));
  const zoomed = zoom > 1 || layout.short;
  const thumbW = 92;
  const book_ = mode === 'book';

  const submitPage = () => {
    const n = parseInt(pageInput ?? '', 10);
    if (!Number.isNaN(n)) go(n - 1);
    setPageInput(null);
  };

  const searchBox = (
    <div className="relative">
      <div className="flex h-8 items-center rounded bg-white/90 pl-2.5 pr-1.5 text-ink">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSearchOpen(true);
          }}
          onFocus={() => setSearchOpen(true)}
          placeholder="Search"
          aria-label="Search the profile"
          className="w-full min-w-0 bg-transparent text-[13px] outline-none placeholder:text-ink-3 lg:w-[150px]"
        />
        <Search size={15} className="shrink-0 text-ink-2" />
      </div>
      {searchOpen && query.trim().length >= 2 && (
        <div className="scroll-thin absolute right-0 top-10 z-50 max-h-[60vh] w-[340px] max-w-[90vw] overflow-y-auto rounded-md bg-[#232227] p-1.5 shadow-2xl">
          {results.length === 0 ? (
            <div className="px-3 py-2.5 text-[13px] text-white/60">No matches for “{query}”.</div>
          ) : (
            results.map((r) => (
              <button
                type="button"
                key={r.page}
                onClick={() => {
                  setSearchOpen(false);
                  if (modeRef.current === 'read') setMode('book');
                  window.setTimeout(() => go(r.page), modeRef.current === 'read' ? 400 : 0);
                }}
                className="block w-full rounded px-3 py-2 text-left hover:bg-white/10"
              >
                <div className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-qd-red">
                  Page {r.page + 1} · {PAGES[r.page].title}
                </div>
                <div className="mt-0.5 line-clamp-2 text-[12.5px] leading-snug text-white/80">{r.snippet}</div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="app-screen fixed inset-0 flex select-none flex-col bg-[#4a4a4d]">
        {/* toolbar */}
        <header className="relative z-40 mx-auto w-full max-w-[1280px] shrink-0 px-0 lg:px-3">
          <div className="flex items-center gap-1 bg-[#1c1b1f] px-2 shadow-lg lg:rounded-b-md" style={{ height: TOOLBAR_H }}>
            <div className="flex min-w-0 items-center gap-2 pr-2">
              <span className="flex h-8 items-center rounded bg-white px-1.5">
                <LogoMark className="h-[20px] w-auto" />
              </span>
              <span className="hidden truncate font-display text-[13px] font-semibold text-white xl:inline">Quantum Dynamics Limited</span>
            </div>

            <div className="flex flex-1 items-center justify-center gap-0.5">
              {book_ && (
                <>
                  <ToolButton label="Home (cover)" onClick={() => go(0)} className="hidden md:inline-flex">
                    <Home size={18} />
                  </ToolButton>
                  <ToolButton label={zoomIdx ? 'Zoom out (−)' : 'Zoom in (+)'} onClick={() => setZoomIdx((z) => (z ? 0 : 1))} active={zoomIdx > 0} className="hidden md:inline-flex">
                    {zoomIdx ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
                  </ToolButton>
                  <ToolButton label="Thumbnails" onClick={() => setPanel((p) => (p === 'thumbs' ? 'none' : 'thumbs'))} active={panel === 'thumbs'} className="hidden sm:inline-flex">
                    <LayoutGrid size={18} />
                  </ToolButton>
                </>
              )}
              <ToolButton label="Table of contents (T)" onClick={() => setPanel((p) => (p === 'toc' ? 'none' : 'toc'))} active={panel === 'toc'}>
                <Bookmark size={18} />
              </ToolButton>
              {book_ && (
                <>
                  <ToolButton label="First page" onClick={() => go(0)} disabled={page === 0} className="hidden md:inline-flex">
                    <SkipBack size={17} />
                  </ToolButton>
                  <ToolButton label="Previous page (←)" onClick={() => book.current?.prev()} disabled={page === 0}>
                    <ChevronLeft size={20} />
                  </ToolButton>
                  <input
                    value={pageInput ?? `${label}/${TOTAL}`}
                    onFocus={(e) => {
                      setPageInput('');
                      e.target.select();
                    }}
                    onChange={(e) => setPageInput(e.target.value.replace(/[^0-9]/g, ''))}
                    onBlur={submitPage}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
                    }}
                    inputMode="numeric"
                    aria-label="Page number — type a page and press Enter"
                    className="mx-1 h-[30px] w-[72px] rounded bg-white text-center font-mono text-[12.5px] text-ink outline-none focus:ring-2 focus:ring-qd-red"
                  />
                  <ToolButton label="Next page (→)" onClick={() => book.current?.next()} disabled={page >= TOTAL - 1}>
                    <ChevronRight size={20} />
                  </ToolButton>
                  <ToolButton label="Last page" onClick={() => go(TOTAL - 1)} disabled={page >= TOTAL - 1} className="hidden md:inline-flex">
                    <SkipForward size={17} />
                  </ToolButton>
                  <ToolButton label={autoplay ? 'Stop auto flip' : 'Auto flip'} onClick={() => setAutoplay((a) => !a)} active={autoplay} className="hidden md:inline-flex">
                    {autoplay ? <Pause size={18} /> : <Play size={18} />}
                  </ToolButton>
                </>
              )}
              <ToolButton label="Share" onClick={share} className="hidden sm:inline-flex">
                <Share2 size={18} />
              </ToolButton>
              <ToolButton label="Print" onClick={print} className="hidden md:inline-flex">
                <Printer size={18} />
              </ToolButton>
              <ToolButton label={pdfAvailable ? 'Download PDF' : 'Save as PDF'} onClick={download}>
                <Download size={18} />
              </ToolButton>
              <ToolButton label="Full screen (F)" onClick={toggleFullscreen} className="hidden sm:inline-flex">
                {fullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
              </ToolButton>
            </div>

            <div className="flex items-center gap-1.5 pl-1">
              <div className="hidden lg:block">{searchBox}</div>
              <div className="flex rounded-md border border-white/15 p-0.5" role="group" aria-label="View mode">
                {(['book', 'read'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    aria-pressed={mode === m}
                    aria-label={m === 'book' ? 'Flipbook view' : 'Reading view'}
                    title={m === 'book' ? 'Flipbook view' : 'Reading view: larger text'}
                    className={`inline-flex h-7 items-center gap-1.5 rounded px-2 text-[12.5px] transition ${mode === m ? 'bg-white text-ink' : 'text-white/75 hover:text-white'}`}
                  >
                    {m === 'book' ? <BookOpen size={15} /> : <AlignLeft size={15} />}
                    <span className="hidden xl:inline">{m === 'book' ? 'Book' : 'Read'}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* stage */}
        {mode === 'read' ? (
          <main ref={readScroll} className="scroll-thin relative mt-2 flex-1 select-text overflow-y-auto">
            <ReadView />
          </main>
        ) : (
          <main className={`relative flex-1 ${zoomed ? 'scroll-thin overflow-auto' : 'overflow-hidden'}`} onClick={() => setSearchOpen(false)}>
            <div className={`flex min-h-full min-w-full items-center justify-center ${zoomed ? 'p-6' : ''}`} style={{ width: zoomed ? bookW + 48 : undefined }}>
              <div className="book-shell relative" style={{ width: bookW, height: bookH, transform: `translateX(${shift}px)` }}>
                {ready && (
                  <Flipbook
                    key={`${layout.width}-${layout.spread}`}
                    ref={book}
                    width={layout.width}
                    spread={layout.spread}
                    startPage={pageRef.current}
                    onFlip={setPage}
                    onNavigate={navigateToFolio}
                  />
                )}
                {/* side tabs attached to the book edges */}
                {tabs && !zoomed && (
                  <>
                    <div
                      className={`absolute top-1/2 flex w-[50px] -translate-y-1/2 flex-col overflow-hidden rounded-l-md bg-[#1c1b1f] shadow-xl transition-opacity ${page === 0 ? 'pointer-events-none opacity-0' : ''}`}
                      style={{ left: (page === 0 ? layout.width : 0) - 50, height: Math.min(320, bookH * 0.42) }}
                    >
                      <button type="button" onClick={() => go(0)} aria-label="First page" className="flex h-[62px] items-center justify-center border-b border-white/15 text-white/80 hover:bg-white/10 hover:text-white">
                        <SkipBack size={18} />
                      </button>
                      <button type="button" onClick={() => book.current?.prev()} aria-label="Previous page" className="flex flex-1 items-center justify-center text-white/80 hover:bg-white/10 hover:text-white">
                        <ChevronLeft size={26} />
                      </button>
                    </div>
                    <div
                      className={`absolute top-1/2 flex w-[50px] -translate-y-1/2 flex-col overflow-hidden rounded-r-md bg-[#1c1b1f] shadow-xl transition-opacity ${page >= TOTAL - 1 ? 'pointer-events-none opacity-0' : ''}`}
                      style={{ left: bookW, height: Math.min(320, bookH * 0.42) }}
                    >
                      <button type="button" onClick={() => go(TOTAL - 1)} aria-label="Last page" className="flex h-[62px] items-center justify-center border-b border-white/15 text-white/80 hover:bg-white/10 hover:text-white">
                        <SkipForward size={18} />
                      </button>
                      <button type="button" onClick={() => book.current?.next()} aria-label="Next page" className="flex flex-1 items-center justify-center text-white/80 hover:bg-white/10 hover:text-white">
                        <ChevronRight size={26} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
            {zoomed && !layout.short && (
              <button type="button" onClick={() => setZoomIdx(0)} className="fixed bottom-5 left-1/2 z-30 -translate-x-1/2 rounded-full bg-[#1c1b1f] px-4 py-2 text-[12.5px] text-white shadow-xl">
                {Math.round(zoom * 100)}% · tap to fit page
              </button>
            )}
          </main>
        )}

        {/* thumbnail strip */}
        <div
          className={`absolute inset-x-0 bottom-0 z-40 bg-[#1c1b1f]/95 shadow-2xl backdrop-blur transition-transform duration-300 ${panel === 'thumbs' && book_ ? 'translate-y-0' : 'pointer-events-none translate-y-full'}`}
          aria-hidden={panel !== 'thumbs'}
        >
          <div className="flex items-center justify-between px-4 pt-2.5 text-white/70">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em]">Thumbnails</span>
            <button type="button" className="tool-btn" onClick={() => setPanel('none')} aria-label="Close thumbnails">
              <X size={18} />
            </button>
          </div>
          {panel === 'thumbs' && (
            <div className="scroll-thin flex gap-3 overflow-x-auto px-4 pb-4 pt-1">
              {PAGES.map((p, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => go(i)}
                  className={`shrink-0 text-left ${i === page || (layout.spread && page % 2 === 1 && i === page + 1) ? 'ring-2 ring-qd-red' : 'opacity-80 hover:opacity-100'}`}
                  aria-label={`Go to page ${i + 1}: ${p.title}`}
                >
                  <div className="relative overflow-hidden bg-white" style={{ width: thumbW, height: thumbW * (PAGE_H / PAGE_W) }}>
                    <div className="pointer-events-none absolute left-0 top-0 origin-top-left" style={{ transform: `scale(${thumbW / PAGE_W})`, width: PAGE_W, height: PAGE_H }}>
                      {p.render({ number: i + 1 })}
                    </div>
                  </div>
                  <div className="mt-1 text-center font-mono text-[10px] text-white/60">{i + 1}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* table of contents panel */}
        <div
          className={`absolute inset-0 z-40 bg-black/40 transition-opacity duration-300 ${panel === 'toc' ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
          onClick={() => setPanel('none')}
          aria-hidden={panel !== 'toc'}
        />
        <aside
          className={`scroll-thin absolute bottom-0 left-0 top-0 z-50 flex w-full max-w-[380px] flex-col overflow-y-auto bg-[#1c1b1f] shadow-2xl transition-transform duration-300 ${panel === 'toc' ? 'translate-x-0' : '-translate-x-full'}`}
          aria-label="Table of contents"
          aria-hidden={panel !== 'toc'}
        >
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#1c1b1f] px-5 py-4">
            <div className="flex items-center gap-2">
              <Bookmark size={18} className="text-qd-red" />
              <div className="font-display text-[18px] font-bold text-white">Table of Contents</div>
            </div>
            <button type="button" className="tool-btn" onClick={() => setPanel('none')} aria-label="Close contents">
              <X size={20} />
            </button>
          </div>
          <div className="px-5 pt-4 lg:hidden">{searchBox}</div>
          <ol className="px-3 py-3">
            {[{ title: 'Cover', page: 1 }, { title: 'Contents', page: 2 }, ...toc, { title: 'Back Cover', page: TOTAL }].map((t) => (
              <li key={t.page}>
                <button
                  type="button"
                  onClick={() => {
                    navigateToFolio(t.page);
                    setPanel('none');
                  }}
                  className={`group flex w-full items-center gap-3 rounded px-2 py-2.5 text-left hover:bg-white/10 ${book_ && (t.page - 1 === page || (layout.spread && page % 2 === 1 && t.page - 1 === page + 1)) ? 'bg-white/10' : ''}`}
                >
                  <span className="h-[7px] w-[7px] shrink-0 bg-qd-red" />
                  <span className="flex-1 text-[14px] text-white/85 group-hover:text-white">{t.title}</span>
                  <span className="font-mono text-[11px] text-white/45">{t.page}</span>
                </button>
              </li>
            ))}
          </ol>
          <div className="mt-auto grid grid-cols-2 gap-2 border-t border-white/10 p-4 sm:hidden">
            <button type="button" onClick={share} className="flex items-center justify-center gap-2 rounded bg-white/10 py-2.5 text-[13px] text-white">
              <Share2 size={16} /> Share
            </button>
            <button type="button" onClick={download} className="flex items-center justify-center gap-2 rounded bg-qd-red py-2.5 text-[13px] text-white">
              <Download size={16} /> PDF
            </button>
          </div>
        </aside>

        {toast && <div className="absolute bottom-6 left-1/2 z-[70] -translate-x-1/2 rounded-full bg-white px-4 py-2 text-[13px] text-ink shadow-xl">{toast}</div>}
        {!ready && <Loader onDone={() => setReady(true)} />}
      </div>
      <PrintPages />
    </>
  );
}
