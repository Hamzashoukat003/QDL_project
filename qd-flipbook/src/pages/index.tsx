import type { ReactElement } from 'react';
import { CapabilitiesPage, OrganizationPage, SectorsPage, TechnicalPage } from './CapabilityPages';
import { ContentsPage, CoverPage, GlancePage, IntroPage } from './OpeningPages';
import { BackCoverPage, CredentialsPage, ExperienceOnePage, ExperienceTwoPage, FootprintPage } from './PortfolioPages';
import { CoreValuesPage, QhsePage, VisionPage } from './ValuesPages';

export type PageDef = { title: string; render: (ctx: { number: number; onNavigate?: (page: number) => void }) => ReactElement };

/** Publication order. Page numbers (folios) are index + 1. */
export const PAGES: PageDef[] = [
  { title: 'Cover', render: (c) => <CoverPage number={c.number} /> },
  { title: 'Contents', render: (c) => <ContentsPage number={c.number} onNavigate={c.onNavigate} /> },
  { title: 'Company Introduction', render: (c) => <IntroPage number={c.number} /> },
  { title: 'QD at a Glance', render: (c) => <GlancePage number={c.number} /> },
  { title: 'Our Capabilities', render: (c) => <CapabilitiesPage number={c.number} /> },
  { title: 'Technical Expertise', render: (c) => <TechnicalPage number={c.number} /> },
  { title: 'Business Sectors', render: (c) => <SectorsPage number={c.number} /> },
  { title: 'Organization Structure', render: (c) => <OrganizationPage number={c.number} /> },
  { title: 'Core Values', render: (c) => <CoreValuesPage number={c.number} /> },
  { title: 'Vision, Mission & Purpose', render: (c) => <VisionPage number={c.number} /> },
  { title: 'Project Management & QHSE', render: (c) => <QhsePage number={c.number} /> },
  { title: 'Experience of Key Personnel', render: (c) => <ExperienceOnePage number={c.number} /> },
  { title: 'Experience by Sector', render: (c) => <ExperienceTwoPage number={c.number} /> },
  { title: 'Organisations & Footprint', render: (c) => <FootprintPage number={c.number} /> },
  { title: 'Credentials & Leadership', render: (c) => <CredentialsPage number={c.number} /> },
  { title: 'Back Cover', render: (c) => <BackCoverPage number={c.number} /> },
];

export const IMAGE_NAMES = [
  'refinery', 'scaffold-crew', 'site-team', 'welding', 'industrial-port', 'power-lines', 'earthworks',
  'process-piping', 'rebar-columns', 'cranes-bw', 'hard-hat', 'rebar-aerial', 'drawings', 'machinery', 'crane-sky', 'tower-cranes',
];
