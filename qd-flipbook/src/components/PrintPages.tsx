import { Fragment } from 'react';
import { PAGES } from '../pages';

/** Every page in sequence at true A4 size. Hidden on screen; used by print and the PDF exporter. */
export function PrintPages() {
  return (
    <div className="print-root">
      {PAGES.map((p, i) => (
        <Fragment key={i}>{p.render({ number: i + 1 })}</Fragment>
      ))}
    </div>
  );
}
