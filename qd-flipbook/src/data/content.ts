// All copy in this file is derived from "QD PROFILE - updated.docx".
// Grammar, spelling and punctuation were corrected without changing meaning;
// duplicated paragraphs and duplicated table rows were removed.
// Items marked `confirm` are listed in CONFIRMATION.md for company sign-off.

export const company = {
  brand: 'Quantum Dynamics Limited',
  legalName: 'Quantum Dynamics Limited',
  short: 'QD',
  tagline: 'Engineering the Future',
};

export const intro = {
  ambition:
    'Quantum Dynamics aims to become a world-class construction company — with its brand as the forerunner, management as the foundation, people at the core, innovation as the driving force, robust systems as the guarantee, information as the breakthrough and culture as the guide.',
  blessing:
    'With the blessings of Almighty Allah, QD is moving swiftly towards a splendid future through intelligence, courage and honesty.',
  established:
    'Since its establishment, the company has grown successfully and remains driven by excellence across the oil, chemical and petrochemical, power, cement, fertilizer and infrastructure sectors.',
  founders:
    'Even before QD was established, its founders had been involved in equipment installation, fabrication, and the erection of piping networks, tanks and steel structures for two decades.',
  position:
    'QD is a construction company with a distinct position in the market and very good relations with its clients.',
};

export const glance = {
  team:
    "QD's team of executives and engineers is highly qualified, energetic and richly experienced in the construction industry. QD also has a team of more than 400 workers and technicians who have undergone specialised training in design, planning, fabrication, erection, insulation, sandblasting and painting.",
  timely:
    'Timely completion of every ongoing project always receives our highest priority. QD’s activities have also been extended to diversified, large-scale projects of national significance — especially cement, fibre, chemical, oil refinery and power generation plants — backed by complete technical know-how.',
  quality:
    'The company is well equipped with modern tools and equipment, and takes special pride in its latest quality control facilities, which monitor, record and maintain the highest quality standards to the entire satisfaction of our valued clients. Emphasis on quality at every stage of design, planning and installation is the hallmark of our organisation, and has earned our team an enviable reputation in both the public and private sectors.',
  owners:
    'QD enjoys good relations and cooperation with project owners, the result of excellent coordination in every aspect — from civil works and equipment configuration to realising the best return on project investment.',
  stats: [
    { value: '2', unit: 'decades', label: "Founders' experience in installation, fabrication and erection" },
    { value: '400+', unit: '', label: 'Trained workers and technicians' },
    { value: '3', unit: 'zeros', label: 'Zero injury · Zero accident · Zero life loss' },
    { value: '5', unit: 'sectors', label: 'Oil & gas to food industries' },
  ],
};

export const capabilities = {
  lede:
    "QD's main business is general contracting for mechanical and civil works, and equipment manufacturing. The company has successful experience in building construction, equipment installation and erection, fabrication and welding.",
  groups: [
    {
      title: 'General Contracting',
      items: ['Mechanical works', 'Civil works', 'Building construction'],
    },
    {
      title: 'Manufacturing',
      items: [
        'Equipment manufacturing',
        'Local manufacturing of large equipment',
        'On-site manufacturing',
        'Manufacturing and installation of construction materials',
      ],
    },
    {
      title: 'Installation & Erection',
      items: [
        'Equipment installation and erection',
        'Steel structures',
        'Piping networks and tanks',
        'Trackless cranes',
      ],
    },
    {
      title: 'Pipelines',
      items: ['Cross-country pipelines'],
    },
  ],
  trades: ['Design', 'Planning', 'Fabrication', 'Welding', 'Erection', 'Insulation', 'Sandblasting', 'Painting'],
  commissioning: [
    'Hydro-testing',
    'Pre-commissioning',
    'Commissioning',
    'Shutdowns',
    'Dismantling',
    'Insulation',
  ],
};

export const technical = {
  lede:
    'QD engineers have extensive experience in equipment installation, fabrication, erection, sandblasting and painting across many projects.',
  specs: [
    { item: 'Crude oil storage tanks', detail: 'Floating-roof type, 62 m diameter', figure: '06', unit: 'Nos.' },
    { item: 'Gas turbine', detail: 'Installation', figure: '175', unit: 'MW' },
    { item: 'Pre-heater steel structure', detail: '263 ft height', figure: '750', unit: 'ton' },
    { item: 'Storage shed', detail: '135 m long × 52 m wide', figure: '135×52', unit: 'm' },
    { item: 'Boiler (H.T. boiler)', detail: '70 ton, 40 TPD', figure: '70', unit: 'ton', confirm: true },
    { item: 'Cooling water storage tanks', detail: 'Fabrication and erection', figure: '08', unit: 'Nos.' },
  ],
  systems: [
    'MS storage tanks',
    'Oil storage tanks',
    'Pipe rack structures',
    'Process piping',
    'Nitrogen plant piping',
    'Utility piping',
    'Pumps',
    'Chillers',
    'Cooling towers',
    'Air handling units',
    'Wastewater treatment plant',
    'Turbines',
    'Diesel power generators',
    'Generators',
    'Fire-fighting systems',
    'Steel rib / arch structures',
  ],
};

export type Sector = { name: string; image: string; refs: string[] };

export const sectors: Sector[] = [
  {
    name: 'Oil & Gas',
    image: 'refinery',
    refs: ['Attock Oil Refinery', 'Pak-Arab Refinery', 'Zamzama Gas Field', 'Mazari Oil Field', 'Khaur Oil & Gas Battery'],
  },
  {
    name: 'Chemical & Petrochemical',
    image: 'industrial-port',
    refs: ['ICI Soda Ash Works', 'ICI Polyester Plant', 'Dewan Salman Acrylic Plant', '44 KTPA Polyester Staple Fibre'],
  },
  {
    name: 'Power & Cement',
    image: 'power-lines',
    refs: ['Thermal Power Station, Muzaffargarh', 'Doosan Power Plant, Daharki', 'D.G. Cement', 'Fauji Cement'],
  },
  {
    name: 'Fertilizer & Infrastructure',
    image: 'earthworks',
    refs: ['FFCL Mukhtar Garh', 'FFBL Port Qasim', 'Engro Daharki', 'Defence Housing Scheme Phase-2'],
  },
  {
    name: 'Food Industries',
    image: 'process-piping',
    refs: [],
  },
];

export const org = {
  top: 'CEO',
  gm: 'General Manager',
  staff: ['Advisor', 'QHSE Manager'],
  departments: [
    'Maintenance Manager',
    'Operations Manager',
    'Workshop Superintendent',
    'Project Manager',
    'Head of IT & Stores',
    'Finance & Admin Manager',
    'Commercial & Business Development Manager',
  ],
  // In the source chart, Project Engineer connects beneath Workshop Superintendent.
  under: { parent: 'Workshop Superintendent', role: 'Project Engineer' },
};

export const coreValues = [
  'Trust',
  'Honesty',
  'Integrity',
  'Courage',
  'Respect and dignity',
  'Prosperity for stakeholders, including employees',
];

export const values = [
  {
    title: 'Professionalism, Ethics and Integrity',
    body:
      'We believe in professional, honest and ethical behaviour in all our activities, and that following the course of highest integrity will establish and maintain the highest professional and personal standards.',
  },
  {
    title: 'Commitment and Teamwork',
    body:
      'We honour the commitments made to our internal and external clients and strive to work effectively as a team. We believe that teams with an appropriate diversity of skills and approaches can achieve a level of synergy that individuals alone cannot.',
  },
  {
    title: 'Candid and Open Environment',
    body:
      'We encourage an environment where all communication is candid and courteous, and provides adequate information — enabling us to do our jobs more effectively and contributing to the quality of our decision-making.',
  },
];

export const statements = [
  {
    label: 'Vision',
    text: 'To become a world-class engineering, manufacturing and construction company, operating nationally.',
  },
  {
    label: 'Mission',
    text:
      'To provide our customers with quality, cost-effective and reliable solutions as an EPC contractor at home, and as a manufacturer of plant and equipment in the region.',
  },
  {
    label: 'Purpose',
    text:
      'To bring prosperity and well-being to our stakeholders and to society at large by adding value through engineering, technology and management.',
  },
];

export const projectManagement =
  'The QD team has a track record of successfully managing projects within the defined scope, budget, quality and safety parameters. Over the years, the management team has evolved and implemented various project management and control systems, enabling a sharp focus on cost and schedule control.';

export const safety = {
  zeros: ['Zero Injury', 'Zero Accident', 'Zero Life Loss'],
  ppe:
    'QD ensures the proper use of personal protective equipment (PPE) so that the risks encountered in construction are minimised.',
};

export const lifecycle = [
  'Design',
  'Planning',
  'Fabrication',
  'Erection',
  'Insulation',
  'Sandblasting & Painting',
  'Hydro-testing',
  'Pre-commissioning & Commissioning',
];

export type Project = { client?: string; title: string; location: string };

// "Experience of Key Personnel" table. Repeated rows in the source are listed once.
export const experienceFertilizerPower: Project[] = [
  { client: 'FFCL', title: 'Scaffolding — annual 3-year project', location: 'Mukhtar Garh, Sadiqabad' },
  { client: 'FFCL', title: 'Annual sandblasting', location: 'Mukhtar Garh, Sadiqabad' },
  { client: 'FFCL', title: 'Purlin sheets project', location: 'Mukhtar Garh, Sadiqabad' },
  { client: 'FFCL', title: 'Annual Scaffolding-19 project', location: 'Mukhtar Garh, Sadiqabad' },
  { client: 'FFCL', title: 'TA-19 scaffolding project', location: 'Mukhtar Garh, Sadiqabad' },
  { client: 'FFCL', title: 'NP plant agitators — TA-19 project', location: 'Mukhtar Garh, Sadiqabad' },
  { client: 'FFCL', title: 'TA-19 modification jobs', location: 'Mukhtar Garh, Sadiqabad' },
  { client: 'FFCL', title: 'TA-19 NG drainage facility', location: 'Mukhtar Garh, Sadiqabad' },
  { client: 'FFCL', title: 'Execution of O&U TA-19 MOCs', location: 'Mukhtar Garh, Sadiqabad' },
  { client: 'FFCL', title: 'MTM cyclones — TA-19 job', location: 'Mukhtar Garh, Sadiqabad' },
  { client: 'FFCL', title: 'Suction ducts — TA-19 job', location: 'Mukhtar Garh, Sadiqabad' },
  { client: 'FFCL', title: 'Knock-out drum project', location: 'Mukhtar Garh, Sadiqabad' },
  { client: 'FFCL', title: 'LCO₂ plant', location: 'Mukhtar Garh, Sadiqabad' },
  { client: 'FFBL', title: 'Scaffolding annual project', location: 'Port Qasim, Karachi' },
  { client: 'FPCDL', title: 'Doosan Power Plant', location: 'Daharki' },
  { title: 'Engro', location: 'Daharki' },
];

export const experienceGroups: { sector: string; projects: Project[] }[] = [
  {
    sector: 'Oil & Gas',
    projects: [
      { title: 'Attock Oil Refinery', location: 'Rawalpindi' },
      { title: 'Pak-Arab Refinery project', location: 'Pakistan' },
      { client: 'BHP', title: 'Zamzama Gas Field', location: 'Dadu' },
      { client: 'OMV', title: 'Kadanwari', location: 'Pakistan' },
      { client: 'OMV', title: 'OMV Pakistan', location: 'Pakistan' },
      { title: 'Mazari Oil Field Upgrade Project', location: 'Matli' },
      { client: 'POL', title: 'Khaur Oil & Gas Battery, Pakistan Oilfields Ltd.', location: 'Pakistan' },
    ],
  },
  {
    sector: 'Chemical, Polyester & Fibre',
    projects: [
      { client: 'ICI', title: 'ICI Pakistan', location: 'Pakistan' },
      { client: 'ICI', title: 'ICI Polyester Plant', location: 'Sheikhupura' },
      { client: 'ICI', title: 'ICI Soda Ash Works', location: 'Khewra' },
      { title: '44 KTPA Polyester Staple Fibre Project', location: 'Pakistan' },
      { title: 'Dewan Salman Acrylic Plant', location: 'Hattar' },
      { title: 'Dewan Salman Polyester', location: 'Hattar' },
      { title: 'Dewan Salman Polyester Plant No. 1', location: 'Hattar' },
      { title: 'Dewan Salman Polyester Unit No. 2', location: 'Hattar' },
    ],
  },
  {
    sector: 'Power & Cement',
    projects: [
      { title: 'Thermal Power Station, Units 05 & 06', location: 'Muzaffargarh' },
      { title: 'Chakwal Cement Project', location: 'Chakwal' },
      { title: 'D.G. Cement', location: 'Chakwal' },
      { title: 'Fauji Cement Plant', location: 'Fateh Jang' },
    ],
  },
  {
    sector: 'Infrastructure & Industrial',
    projects: [
      { title: 'Defence Housing Scheme Phase-2', location: 'Pakistan' },
      { title: 'Frontier Works Organization', location: 'Pakistan' },
      { title: 'National Development Complex', location: 'Pakistan' },
      { title: 'Heavy Mechanical Complex', location: 'Taxila' },
      { title: 'Shashi Pipe Factory', location: 'Karachi' },
      { title: 'PAP Plant', location: 'Near Fateh Jang' },
      { title: 'Paste Plant', location: 'Islamabad' },
      { title: 'Berini', location: '—' },
    ],
  },
];

export const organisations = [
  'FFCL',
  'FFBL',
  'FPCDL',
  'Doosan',
  'Engro',
  'BHP',
  'OMV Pakistan',
  'Pakistan Oilfields Ltd.',
  'Attock Oil Refinery',
  'Pak-Arab Refinery',
  'ICI Pakistan',
  'Dewan Salman',
  'D.G. Cement',
  'Fauji Cement',
  'Chakwal Cement',
  'Heavy Mechanical Complex',
  'Frontier Works Organization',
  'National Development Complex',
];

export const footprint = [
  { region: 'Punjab', places: ['Sadiqabad', 'Muzaffargarh', 'Sheikhupura', 'Khewra', 'Chakwal', 'Fateh Jang', 'Taxila', 'Rawalpindi'] },
  { region: 'Sindh', places: ['Karachi', 'Port Qasim', 'Daharki', 'Dadu', 'Matli'] },
  { region: 'Khyber Pakhtunkhwa', places: ['Hattar'] },
  { region: 'Islamabad Capital Territory', places: ['Islamabad'] },
];

export const registration = [
  { label: 'Company Name', value: 'Quantum Dynamics Limited' },
  { label: 'PEC Registration No.', value: 'Mech/53430' },
  { label: 'NTN No.', value: '3817212-7' },
  { label: 'PST No.', value: 'P3817212-7' },
  { label: 'Incorporation No.', value: '0077000' },
  { label: 'General Sales Tax No.', value: '32-77-8761-987-47' },
];

export const contact = {
  address: ['Shakir Kot, Airport Road,', 'Sadiqabad, Rahimyarkhan'],
  website: 'www.qdl.com.pk',
  emails: ['info@qdl.com.pk', 'kaiwandanish@gmail.com', 'shafiqaslamsas@gmail.com', 'aavais@outlook.com'],
  people: [
    { role: 'Chief Executive Officer', name: 'Kaiwan Danish', tel: '0300-8671833', email: 'kaiwandanish@gmail.com' },
    { role: 'Director', name: 'Shafiq Aslam', tel: '0300-6796379', email: 'shafiqaslamsas@gmail.com' },
  ],
  phones: [
    { label: 'CEO', tel: '0300-8671833' },
    { label: 'Director', tel: '0300-6796379' },
    { label: 'Head of (P&C)', tel: '0300-2980098' },
  ],
};

export const toc = [
  { title: 'Company Introduction', page: 3 },
  { title: 'QD at a Glance', page: 4 },
  { title: 'Our Capabilities', page: 5 },
  { title: 'Technical Expertise', page: 6 },
  { title: 'Business Sectors', page: 7 },
  { title: 'Organization Structure', page: 8 },
  { title: 'Core Values', page: 9 },
  { title: 'Vision, Mission & Purpose', page: 10 },
  { title: 'Project Management & QHSE', page: 11 },
  { title: 'Experience of Key Personnel', page: 12 },
  { title: 'Experience by Sector', page: 13 },
  { title: 'Organisations & Footprint', page: 14 },
  { title: 'Credentials & Leadership', page: 15 },
];
