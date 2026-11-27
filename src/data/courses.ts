export type CourseStatus = 'enrolling' | 'selfpaced';
export type DurationIcon = 'clock' | 'laptop' | 'school' | 'map';

export type CurriculumModule = {
  weeks: string;
  title: string;
  points: string[];
};

export type FacultyMember = {
  name: string;
  role: string;
  headshot: string;
  alt: string;
  bio: string[];
};

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
};

export type Outcome = {
  value: string;
  label: string;
};

export type Course = {
  id: number;
  slug: string;
  category: string;
  categoryValue: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  listingDuration: string;
  durationIcon: DurationIcon;
  format: string;
  listingFormat: string;
  imageBadge: string;
  formatValue: 'online' | 'hybrid' | 'inperson';
  status: CourseStatus;
  statusLabel: string;
  image: string;
  alt: string;
  cta: string;
  nextCohort: string;
  language: string;
  tuition: string;
  seatsLeft: number;
  curriculumHeading: string;
  facultyHeading: string;
  finalEyebrow: string;
  finalTitle: string;
  finalBody: string;
  audience: { title: string; involves: string; points: string[] }[];
  competencies: { title: string; points: string[] }[];
  modules: CurriculumModule[];
  capstone?: { title: string; body: string };
  faculty: FacultyMember[];
  testimonials: Testimonial[];
  outcomes: Outcome[];
  investment: { individual: string[]; institutional: string[] };
  faqs: { q: string; a: string }[];
};

const mamsallah: FacultyMember = {
  name: 'Dr. Mamsallah Faal-Omisore',
  role: 'Primary Care Physician & Clinical Educator',
  headshot: '/falcuty/Mamsallah-280x280.jpg',
  alt: 'Professional headshot of Dr. Mamsallah Faal-Omisore',
  bio: [
    'Mamsallah is a primary care physician with additional qualifications in global health policy, infectious diseases and maternal and child health, and extensive experience in medical education and primary care research.',
    'She delivers medical education and training for health professionals at all levels of the healthcare value chain and advises governments and NGOs on health policy as a strategic consultant.',
  ],
};

const chinonyerem: FacultyMember = {
  name: 'Dr. Chinonyerem Egekwu',
  role: 'Healthcare Quality Improvement Expert & Program Manager, HSDF',
  headshot: '/falcuty/chinonyerem.jpg',
  alt: 'Professional headshot of Dr. Chinonyerem Egekwu',
  bio: [
    'Dr. Chinonyerem is a Healthcare Quality Improvement expert, Public Health technical advisor and a Manager (programs) with Health Strategy and Delivery Foundation (HSDF) in Nigeria. She has deep experience supporting national and sub-national governments to design and lead interventions that optimize service delivery, improve quality of care, patient satisfaction, and data for decision-making across the public and private health sectors.',
    'She is a fellow and member of the International Society for Quality in Healthcare (ISQua), a member of the national NCD Technical Working Group in Nigeria, and holds a Master of Science degree in Global Health and Development from University College London and an MBBS from the University of Nigeria.',
  ],
};

const cheluchi: FacultyMember = {
  name: 'Dr. Cheluchi Onyemelukwe',
  role: 'Lead Consultant, Health Ethics & Law Consulting',
  headshot: '/falcuty/Dr Cheluchi-p-500.jpeg',
  alt: 'Professional headshot of Dr. Cheluchi Onyemelukwe',
  bio: [
    'Dr. Cheluchi Onyemelukwe is a health law, ethics and policy expert and Lead Consultant at Health Ethics and Law Consulting, which provides legal and policy advisory on the life sciences, health, gender and development matters.',
    'She has advised on health insurance legislation, drafting of the National Health Act guidelines and Nigeria’s National Health Policy (2016), and sits on the National Committee on Health Research Ethics.',
  ],
};

const ifeoma: FacultyMember = {
  name: 'Mrs. Ifeoma Arowolo',
  role: 'Senior Associate, Health Ethics & Law Consulting (HELC)',
  headshot: '/falcuty/Ifeoma.png',
  alt: 'Professional headshot of Mrs. Ifeoma Arowolo',
  bio: [
    'Mrs. Ifeoma is a Senior Associate at Health Ethics and Law Consulting (HELC) with over 10 years of experience offering legal expertise to clients in the healthcare and social sectors — hospitals, laboratories, digital health businesses, and international development organizations.',
    'She has facilitated capacity building and strengthening sessions for hospitals, laboratories, governments and health facilities, and has been instrumental in the establishment and operationalization of innovative e-Health solutions transforming healthcare provision in Nigeria.',
  ],
};

const kelechi: FacultyMember = {
  name: 'Mrs. Kelechi Ahamba',
  role: 'Finance Manager, Health Strategy and Delivery Foundation',
  headshot: '/falcuty/Kelechi -p-500.jpg',
  alt: 'Professional headshot of Kelechi Ahamba',
  bio: [
    'Kelechi Ahamba is a thoroughly trained, business minded Chartered Accountant with over 12 years of experience spanning Audit, Management consulting, Financial accounting and reporting, Inventory/Stock management, Grants management and reporting, Payroll management, Statutory compliance and Accounting systems implementation and administration.',
    'Currently, she is a Finance Manager at Health Strategy and Delivery Foundation (HSDF) where she is responsible for General ledger work, Fund accounting and reporting, Donor accounts reconciliations and consolidations, Tax and statutory Compliance and liaising with external auditors.',
  ],
};

const isaac: FacultyMember = {
  name: 'Mr. Isaac Awua-Boateng',
  role: 'Chartered Accountant & Governance Practitioner',
  headshot: '/falcuty/Mr Isaac.png',
  alt: 'Professional headshot of Mr. Isaac Awua-Boateng',
  bio: [
    'Isaac Awua-Boateng, a Chartered Accountant with an EMBA in Project Management and a Bachelor of Commerce, offers two decades of expertise in Corporate Governance, Compliance, Conformance, and Performance.',
    'As Country Engagement Manager for Ghana with Health Strategy & Delivery Foundation, he develops learning agendas and facilitates knowledge exchange. He brings a unique blend of financial and governance experience to the Healthcare Leadership Academy faculty.',
  ],
};

const ebes: FacultyMember = {
  name: 'Dr. Ebes Esho',
  role: 'Managing Consultant, Bezalel Frontiers',
  headshot: '/falcuty/Dr Ebes.png',
  alt: 'Professional headshot of Dr. Ebes Esho',
  bio: [
    'Dr. Ebes Esho is the managing consultant at Bezalel Frontiers and the founder of Student Founders and Entrepreneurial Platform, a company limited by guarantee that promotes and advances business and entrepreneurship amongst students.',
    'She worked in Nigeria’s banking industry with United Bank for Africa Plc and Zenith Bank Plc for close to a decade before joining the academia. She holds a doctorate degree in Management, with specialisation in business strategy, from Lagos Business School, Pan-Atlantic University, Nigeria.',
  ],
};

const delbar: FacultyMember = {
  name: 'Dr. Delbar Niroushak',
  role: 'Clinical Psychologist, MCC & Leadership Coach',
  headshot: '/falcuty/Dr Delbarr-500.jpg',
  alt: 'Professional headshot of Dr. Delbar Niroushak',
  bio: [
    'Dr. Delbar Niroushak holds a PhD in Clinical Psychology and is Co-founder of Seamaticx and Coaching for Change Enterprise. As an MCC (Master Certified Coach) in Leadership and Business Coaching and an Agile Enterprise Coach, she brings deep expertise in high-stakes team decision making and communication.',
  ],
};

const yewande: FacultyMember = {
  name: 'Dr. Yewande Ogundeji',
  role: 'Health Economist & Health Systems Specialist',
  headshot: '/Dr Yewande.jpeg',
  alt: 'Professional headshot of Dr. Yewande Ogundeji',
  bio: [
    'Dr. Yewande Ogundeji (PhD) is a health economist, health systems specialist, and international development leader with about 15 years of experience advancing public health and economic development in Africa through program leadership, implementation, academic research, and teaching.',
    'She holds a PhD in Health Services Research from the University of York and completed her postdoctoral training at the University of Calgary, Canada.',
  ],
};

export const courses: Course[] = [
  {
    id: 1,
    slug: 'patient-centered-care',
    category: 'Frontline Clinicians',
    categoryValue: 'frontline',
    title: 'Patient-Centered Care (PCC)',
    subtitle: 'Advance your career and drive quality care across the healthcare ecosystem.',
    description:
      'Gain the Knowledge and develop the competencies required to advance your career, equip and position you as a frontline Change Agent driving quality care delivery in your facility and the entire Healthcare delivery ecosystem',
    duration: '4 Weeks',
    listingDuration: '4 Weeks',
    durationIcon: 'school',
    format: 'Blended Online',
    listingFormat: 'Blended Online',
    formatValue: 'hybrid',
    status: 'enrolling',
    statusLabel: 'Enrolling Now',
    image:
      'https://images.pexels.com/photos/39192368/pexels-photo-39192368.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageBadge: 'Blended Online',
    alt: 'Doctor holding a tablet in a modern clinic',
    cta: 'Apply Now',
    nextCohort: 'October 2026 Intake',
    language: 'English',
    tuition: '₦120,000',
    seatsLeft: 30,
    curriculumHeading: 'A 4-week intensive masterclass followed by a 12-week workplace capstone project',
    facultyHeading:
      'Learn from seasoned experts who combine global best practices with context-specific insight into African healthcare systems',
    finalEyebrow: 'LIMITED SEATS AVAILABLE PER COHORT',
    finalTitle: 'Ready to champion patient-centered excellence in your facility?',
    finalBody:
      'Applications are reviewed on a rolling basis. Reserve your seat, download the full syllabus, or speak with a program advisor today.',
    audience: [
      {
        title: 'Clinical & Departmental Leaders',
        involves:
          'Frontline Clinicians, Department Directors, and Clinical leads steering day-to-day operations.',
        points: [
          'Elevating patient-centered care and frontline service delivery standards',
          'Leading multi-disciplinary clinical teams under high operational demands',
          'Aligning departmental workflows with broader institutional goals',
        ],
      },
      {
        title: 'Executive Leadership & Governing Leaders',
        involves: 'Chief Medical Directors (CMDs), and Medical Directors.',
        points: [
          'Mitigating organizational risk while maintaining clinical excellence',
          'Steering high-level institutional strategy and regulatory compliance',
          'Fostering a culture of data-driven governance and long-term sustainability',
        ],
      },
      {
        title: 'Facility & Operations Administrators',
        involves: 'Hospital Administrators, Facility Managers, and Operations Directors.',
        points: [
          'Optimizing facility operations and daily administrative efficiency',
          'Balancing high-quality patient care with budget and resource constraints',
          'Streamlining cross-departmental communications and operational processes',
        ],
      },
    ],
    competencies: [
      {
        title: 'Culturally Intelligent & Standardized Communication',
        points: [
          'Implement standardized communication frameworks (clinician-to-clinician and clinician-to-patient) to eliminate care handoff errors and system vulnerabilities.',
          'Leverage cultural intelligence to navigate diverse patient expectations, mitigate implicit bias, and drive shared decision-making.',
          'Enforce rigorous, high-standard medical documentation practices that safeguard care continuity and data integrity across clinical teams.',
        ],
      },
      {
        title: 'LEAN Quality Improvement & Operational Growth',
        points: [
          'Deploy LEAN process optimization techniques to reduce wait times, eliminate workflow waste, and enhance overall patient satisfaction.',
          'Utilize diagnostic problem-solving tools and SMART goal frameworks to drive actionable, facility-wide quality improvement initiatives.',
          'Design and track simple, high-impact patient satisfaction metrics that turn client feedback into actionable business growth strategies.',
        ],
      },
      {
        title: 'Healthcare Law, Bioethics & Risk Governance',
        points: [
          'Establish robust clinical protocols for managing informed consent, adverse event reporting, and institutional risk disclosure.',
          'Navigate regulatory body frameworks and national health policies to ensure full legal compliance across all levels of facility operations.',
          'Resolve complex medical-legal and ethical dilemmas within resource-constrained environments to protect both patient dignity and organizational reputation.',
        ],
      },
    ],
    modules: [
      {
        weeks: 'Week 1',
        title: 'Effective Communication & Cultural Intelligence in Care Delivery',
        points: [
          'Cultural intelligence, implicit bias reduction, and patient expectation alignment',
          'Standardized communication frameworks for multi-disciplinary clinical teams',
          'High-integrity medical documentation protocols to prevent care handoff errors',
          'Eliminating systemic vulnerabilities that foster disrespect and institutional abuse',
        ],
      },
      {
        weeks: 'Week 2',
        title: 'Quality Improvement (QI) & LEAN Process Design for Business Growth',
        points: [
          'LEAN operational strategies to eliminate process waste and streamline patient throughput',
          'Workflow standardization to elevate care quality, safety standards, and clinical outcomes',
          'Diagnostic problem-solving toolkits and SMART goal setting for institutional change',
          'Designing low-friction patient satisfaction frameworks to measure and drive business growth',
        ],
      },
      {
        weeks: 'Week 3',
        title: 'Medical Law, Ethics & Risk Governance in Healthcare Business',
        points: [
          'Legal protocols for informed consent, adverse event disclosures, and medical-legal reporting',
          'Governance frameworks of healthcare regulatory bodies and health policy compliance',
          'Navigating multi-tier health system architectures to optimize patient navigation',
          'Applied bioethics, risk mitigation, and liability management in resource-constrained settings',
        ],
      },
    ],
    capstone: {
      title: 'Strategic Capstone Project & Implementation',
      body: 'Over the final weeks, you will design and implement a real-world 12-week improvement project, applying PCC frameworks to solve an operational challenge in your facility. The project is supervised with structured guidance and review from the instructor, and your project outcomes and measured impact will be presented at the end of the cohort.',
    },
    faculty: [mamsallah, chinonyerem, cheluchi, ifeoma],
    testimonials: [
      {
        quote:
          'These learnings have really given me a different perspective and approach to patient care thus helping me strive for patient centered care and improved patient’s experience at all times',
        name: 'Ms. Hope Uchenna Okerezi',
        title: 'Hospital Administrator, Paediatric Partners Hospital',
      },
    ],
    outcomes: [
      { value: '96%', label: 'applied learnings to their workplace within 90 days' },
      { value: '4.9/5', label: 'average participant rating across all cohorts' },
      { value: '20+', label: 'healthcare leaders trained across the continent' },
    ],
    investment: {
      individual: [
        'Full 4-week online curriculum',
        'Self-paced modules + live instructor-led Zoom sessions',
        'All learning materials and recorded weekend sessions',
        'Supervised 12-week capstone project implementation',
        'Certificate of Completion + 10 CME Points (for doctors)',
        'Access to the HLA Continuous Learning Community',
      ],
      institutional: [
        '15% discount rate for teams of two or more',
        'Full 4-week curriculum, live instructor-led Zoom sessions, and 12-week capstone project implementation',
        'Certificate of Completion + 10 CME Points (for doctors)',
        'Access to the HLA Continuous Learning Community',
        'Flexible payment plans and institutional invoicing',
      ],
    },
    faqs: [
      {
        q: 'How does the schedule fit around busy clinical shifts?',
        a: 'It is 100% online, combining self-paced modules with six 2-hour live Zoom sessions on Fridays and Saturdays. All live sessions are recorded so you never fall behind.',
      },
      {
        q: 'Is this program only for doctors and nurses?',
        a: 'No. While built for frontline clinicians and CMDs, it is equally designed for non-clinical leaders, including Hospital Administrators, Facility Managers, Operations Directors, and Board Members.',
      },
      {
        q: 'How does the 12-week capstone project work?',
        a: 'You will design and implement a real-world improvement project to solve an operational challenge in your own facility, backed by structured faculty guidance and a final impact presentation.',
      },
      {
        q: 'Do I get a certificate and CME points?',
        a: 'Yes. Every graduate receives a Certificate of Completion and access to the HLA Continuous Learning Community, plus 10 CME points for medical doctors.',
      },
      {
        q: 'Are there group discounts or flexible payment plans?',
        a: 'Yes. Organisations enrolling 2 or more staff under the Institutional Track save 15% and get access to institutional invoicing and flexible payment plans.',
      },
    ],
  },
  {
    id: 2,
    slug: 'healthcare-financial-management',
    category: 'Finance Professionals',
    categoryValue: 'finance',
    title: 'Healthcare Financial Management (HFM)',
    subtitle:
      'Strengthen your grasp of financial principles to enhance the financial performance of your Healthcare Organisation.',
    description:
      'Strengthen your grasp of financial principles to enhance the financial performance, cost-effectiveness, and long-term sustainability of your healthcare organization.',
    duration: '4 Weeks',
    listingDuration: '3 Weeks',
    durationIcon: 'laptop',
    format: 'Blended Online',
    listingFormat: 'Blended Online',
    formatValue: 'hybrid',
    status: 'enrolling',
    statusLabel: 'Enrolling Now',
    image:
      'https://images.pexels.com/photos/6801639/pexels-photo-6801639.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageBadge: 'Blended Online',
    alt: 'Financial data analysis dashboard',
    cta: 'Apply Now',
    nextCohort: 'October 2026 Intake',
    language: 'English',
    tuition: '₦100,000',
    seatsLeft: 40,
    curriculumHeading:
      'An online course combining forum discussions, quizzes, exercises, and multi-case healthcare studies',
    facultyHeading:
      'Learn from seasoned finance experts who combine global standards with deep operational insight into African healthcare systems.',
    finalEyebrow: 'LIMITED SEATS AVAILABLE PER COHORT',
    finalTitle: 'Ready to strengthen the financial performance of your organization?',
    finalBody:
      'Applications are reviewed on a rolling basis. Reserve your seat, request the full syllabus, or speak with a program advisor today.',
    audience: [
      {
        title: 'Executive Leadership & Governing Leaders',
        involves: 'Chief Medical Directors (CMDs), Medical Directors, and Hospital Board Members.',
        points: [
          'Aligning institutional clinical strategy with long-term financial goals',
          'Strengthening corporate governance, succession planning, and audit readiness',
          'Making confident, data-backed capital and investment decisions',
        ],
      },
      {
        title: 'Facility & Operations Administrators',
        involves: 'Hospital Administrators, Facility Managers, and Operations Directors.',
        points: [
          'Planning, managing, and controlling departmental and facility-wide financial resources',
          'Eliminating revenue leakages, accounting errors, and operational waste',
          'Improving cost-effectiveness in care delivery without compromising quality',
        ],
      },
      {
        title: 'Clinical & Departmental Leaders',
        involves:
          'Department Directors, Unit Heads, and Clinical Leads with supervisory responsibility.',
        points: [
          'Understanding budgeting essentials and departmental cost drivers',
          'Determining whether clinical units are utilizing available resources optimally',
          'Translating clinical service delivery into sustainable financial performance',
        ],
      },
    ],
    competencies: [
      {
        title: 'Financial Performance & Accounting Fundamentals',
        points: [
          'Grasp fundamental accounting concepts, general ledger mechanics, and reporting procedures tailored to healthcare settings.',
          'Analyze and benchmark key financial performance indicators (KPIs) that determine the financial health of your organization.',
          'Spot accounting discrepancies and strengthen internal controls—even as a non-finance healthcare professional.',
        ],
      },
      {
        title: 'Budgeting, Cost-Effectiveness & Resource Optimization',
        points: [
          'Build and manage realistic operational budgets that align financial resources with strategic healthcare priorities.',
          'Deploy practical cost-containment strategies to minimize losses, improve profit margins, and optimize resource allocation.',
          'Evaluate service-line profitability and operational efficiency across clinical and administrative units.',
        ],
      },
      {
        title: 'Strategic Finance, Governance & Compliance',
        points: [
          'Integrate corporate governance, statutory compliance, and succession planning into your organization’s financial architecture.',
          'Navigate multi-case healthcare financial scenarios through interactive simulations and peer problem-solving.',
          'Walk away with practical financial templates, checklists, and decision-making frameworks ready for immediate facility deployment.',
        ],
      },
    ],
    modules: [
      {
        weeks: 'Module 1',
        title: 'Fundamental Accounting Concepts & Budgeting Essentials',
        points: [
          'Why financial and budgetary skills are critical for non-finance healthcare leaders',
          'Core accounting procedures, financial statements, and audit fundamentals',
          'Identifying and preventing common accounting errors and revenue leakages',
        ],
      },
      {
        weeks: 'Module 2',
        title: 'Measuring Financial Performance in Healthcare',
        points: [
          'Fundamental financial performance indicators that reveal organizational health',
          'Analyzing and benchmarking your facility’s financial performance',
          'Evaluating resource utilization and identifying operational inefficiencies',
        ],
      },
      {
        weeks: 'Module 3',
        title: 'Managing & Allocating Financial Resources Effectively',
        points: [
          'Planning, managing, and controlling financial resources across departments',
          'Improving cost-effectiveness and profit margins in healthcare delivery',
          'Practical budgeting tools and templates for immediate workplace application',
        ],
      },
      {
        weeks: 'Module 4',
        title: 'Strategic Financial Management & Corporate Governance',
        points: [
          'Aligning institutional strategy with long-term financial sustainability',
          'Corporate governance, statutory compliance, and succession planning essentials',
          'Multi-case study synthesis and real-world healthcare financial problem-solving',
        ],
      },
    ],
    faculty: [kelechi],
    testimonials: [
      {
        quote:
          'In a year and a half since I attended the HFM workshop, my facility has recorded a 100% increase in facility treatments. Our profit margin has increased and we have taken intentional steps to minimize our losses. Secondly, I can now pick out accounting errors even as a non-finance healthcare professional.',
        name: 'Dr. Selma Yahaya-Pam',
        title: 'Medical Director, Nisa Reproductive Health Centre',
      },
      {
        quote:
          'I wish I had known the things I learnt at HFM 10 years ago. Things would have turned out much better for my facility.',
        name: 'Dr. Olajuwon Alabi',
        title: 'CMD, South Shore Women’s and Children’s Hospital',
      },
    ],
    outcomes: [
      { value: '100%', label: 'applied learnings to their workplace within 30 days' },
      { value: '4.9/5', label: 'average participant rating across cohorts' },
      { value: '30+', label: 'healthcare leaders trained across the continent' },
    ],
    investment: {
      individual: [
        'Full interactive online workshop curriculum',
        'Live instructor-led sessions, interactive exercises, and multi-case studies',
        'Ready-to-use financial templates, toolkits, and session recordings',
        'Certificate of Completion + CME Points (for medical doctors)',
        'Access to the HLA Continuous Learning Community',
      ],
      institutional: [
        '15% discount rate for teams of two or more',
        'Full interactive online course curriculum and multi-case study sessions',
        'Ready-to-use financial templates, toolkits, and session recordings',
        'Certificate of Completion + CME Points (for medical doctors)',
        'Access to the HLA Continuous Learning Community',
        'Flexible payment plans and institutional invoicing',
      ],
    },
    faqs: [
      {
        q: 'Do I need an accounting or finance background to take this course?',
        a: 'No. The workshop is specifically designed for non-finance healthcare leaders, including doctors, CMDs, and hospital administrators breaking down financial principles into clear, practical tools you can use immediately.',
      },
      {
        q: 'How is the workshop delivered for busy healthcare executives?',
        a: 'It is 100% online, combining interactive live sessions, forum discussions, quizzes, and real-world healthcare case studies designed to fit around demanding clinical and administrative schedules.',
      },
      {
        q: 'How will this course improve my facility’s financial performance?',
        a: 'You will learn how to track key financial indicators, spot accounting errors, improve cost-effectiveness, and allocate resources more efficiently to cut losses and grow profit margins.',
      },
      {
        q: 'Do I get a certificate and CME points?',
        a: 'Yes. Every graduate receives a Certificate of Completion and access to the HLA Continuous Learning Community, plus CME points for medical doctors.',
      },
      {
        q: 'Are there group discounts or flexible payment plans?',
        a: 'Yes. Organizations enrolling 2 or more staff under the Institutional Track save 15% and get access to institutional invoicing and flexible payment plans.',
      },
    ],
  },
  {
    id: 3,
    slug: 'health-board-governance-programme',
    category: 'Board and Senior Executives',
    categoryValue: 'board',
    title: 'Health Board Governance Programme (HBGP)',
    subtitle:
      'Gain the strategic skills to lead healthcare boards and drive organizational success.',
    description:
      'Enhance your ability to lead at the board level, strengthen institutional accountability, and drive sustainable organizational performance and health outcomes.',
    duration: '2 Weeks',
    listingDuration: '2 Weeks',
    durationIcon: 'school',
    format: 'Instructor-Led Lectures',
    listingFormat: 'Blended Online',
    formatValue: 'hybrid',
    status: 'enrolling',
    statusLabel: 'Enrolling Now',
    image:
      'https://images.pexels.com/photos/7433847/pexels-photo-7433847.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageBadge: 'Blended Online',
    alt: 'Board meeting of healthcare policy makers',
    cta: 'Apply Now',
    nextCohort: 'October Cohort',
    language: 'English',
    tuition: '₦200,000',
    seatsLeft: 40,
    curriculumHeading:
      'A 2-week intensive, instructor-led course delivered across six half-day sessions',
    facultyHeading:
      'Learn from seasoned governance practitioners, board chairs, and healthcare leaders who combine global governance standards with deep insight into African health and social sector institutions.',
    finalEyebrow: 'LIMITED SEATS AVAILABLE PER COHORT',
    finalTitle: 'Ready to elevate governance and accountability in your organization?',
    finalBody:
      'Applications are reviewed on a rolling basis. Reserve your seat, request the full syllabus, or speak with a program advisor today.',
    audience: [
      {
        title: 'Board Directors, Trustees & Advisory Members',
        involves:
          'Current and aspiring Executive & Non-Executive Directors, Board Trustees, and Advisory Board Members.',
        points: [
          'Mastering fiduciary, legal, financial, and strategic board responsibilities',
          'Strengthening board composition, structure, and committee effectiveness',
          'Managing conflicts of interest and evaluating overall board performance',
        ],
      },
      {
        title: 'Chief Executives & Managing Directors',
        involves: 'Chief Executive Officers (CEOs), Managing Directors (MDs), and Chief Medical Directors (CMDs).',
        points: [
          'Navigating the Board–CEO relationship and aligning executive execution with board strategy',
          'Establishing clear frameworks for CEO performance evaluation, compensation, and succession planning',
          'Bridging corporate governance with clinical governance across the organization',
        ],
      },
      {
        title: 'Healthcare Regulators & Sector Leaders',
        involves:
          'Healthcare Regulators, Policy Leaders, and Senior Executives across public and private health and social institutions.',
        points: [
          'Enforcing governance standards that build public trust and institutional accountability',
          'Embedding clinical and corporate governance pillars into health sector oversight',
          'Driving long-term institutional resilience and measurable health outcomes',
        ],
      },
    ],
    competencies: [
      {
        title: 'Corporate & Clinical Governance Alignment',
        points: [
          'Master the fundamental principles, pillars, and best practices of both corporate governance and clinical governance.',
          'Understand the critical linkages between corporate oversight and clinical quality to safeguard patient safety and organizational integrity.',
          'Build strong, accountable governance structures that earn the trust of patients, stakeholders, and regulators.',
        ],
      },
      {
        title: 'Board Structure, Fiduciary Duties & Practice',
        points: [
          'Define clear board purpose, optimal board composition, and high-performing boardroom practices.',
          'Execute your legal, financial, and general fiduciary responsibilities with confidence and regulatory compliance.',
          'Establish transparent protocols for identifying, disclosing, and managing conflicts of interest.',
        ],
      },
      {
        title: 'Executive Oversight, Succession & Board Evaluation',
        points: [
          'Navigate the Board–CEO dynamic effectively while maintaining clear boundaries between governance and daily operations.',
          'Design objective frameworks for CEO performance evaluation, executive compensation, and leadership succession planning.',
          'Conduct structured board effectiveness evaluations to continuously elevate boardroom impact.',
        ],
      },
    ],
    modules: [
      {
        weeks: 'Module 1',
        title: 'Foundations of Corporate & Clinical Governance',
        points: [
          'Definitions, objectives, and core pillars of corporate and clinical governance in healthcare',
          'Best-practice governance frameworks for public and private health and social sector institutions',
          'Linking corporate governance with clinical governance to drive superior health outcomes',
        ],
      },
      {
        weeks: 'Module 2',
        title: 'Board Architecture, Roles & Fiduciary Responsibilities',
        points: [
          'Defining board purpose, structure, diversity, and optimal board composition',
          'Legal, financial, and general duties of executive and non-executive directors and trustees',
          'High-impact boardroom practices, decision-making protocols, and institutional accountability',
        ],
      },
      {
        weeks: 'Module 3',
        title: 'Board-CEO Dynamics, Ethics & Board Effectiveness',
        points: [
          'Structuring a productive Board-CEO partnership, performance evaluation, and compensation',
          'Executive and board-level succession planning for long-term organizational continuity',
          'Conflict of interest management and formal evaluation of board effectiveness',
        ],
      },
    ],
    faculty: [ebes, kelechi, isaac],
    testimonials: [
      {
        quote:
          'The greatest asset any organisation can have is the human asset. Your followers have to believe in you, that you can take them to the promised land.',
        name: 'Dr. Lateef Temitayo Lawal',
        title: 'Permanent Secretary, Primary Health Care Board',
      },
    ],
    outcomes: [
      { value: '99%', label: 'applied learnings to their workplace within 90 days' },
      { value: '4.9/5', label: 'average participant rating across all cohorts' },
      { value: '20+', label: 'healthcare leaders trained across the continent' },
    ],
    investment: {
      individual: [
        'Full 2-week interactive instructor-led curriculum',
        'All governance toolkits, case studies, and session materials',
        'Certificate of Completion',
        'Access to the HLA Continuous Learning Community',
      ],
      institutional: [
        '15% discount rate for boards or leadership teams enrolling two or more members',
        'Full 2-week interactive instructor-led e-learning curriculum',
        'Certificate of Completion',
        'Access to the HLA Continuous Learning Community',
        'Flexible payment plans and institutional invoicing',
      ],
    },
    faqs: [
      {
        q: 'How is the 2-week schedule structured for busy executives and board members?',
        a: 'Sessions are delivered via live lectures on Mondays, Wednesdays, and Fridays for 2 weeks (4 hours per day), allowing senior leaders to participate without stepping away from their organizations full-time.',
      },
      {
        q: 'Do I need prior board experience to attend HBGP?',
        a: 'No. The program is designed for both sitting board members (Executive/Non-Executive Directors and Trustees) looking to sharpen their impact and aspiring directors or C-suite executives preparing for board appointments.',
      },
      {
        q: 'How does this differ from a general corporate governance course?',
        a: 'HBGP is built specifically for the health and social sectors - integrating clinical governance directly with corporate governance, fiduciary duties, and regulatory realities unique to healthcare institutions.',
      },
      {
        q: 'Can an entire hospital board or leadership team enroll together?',
        a: 'Yes. Many organisations enroll multiple directors and executives together under our Institutional Track (2+ seats) to align their governance practices while saving 15% with institutional invoicing.',
      },
      {
        q: 'What recognition do participants receive upon completion?',
        a: 'Graduates receive an official Certificate of Completion from the Healthcare Leadership Academy (HLA) and join the HLA Continuous Learning Community of healthcare leaders across the continent.',
      },
    ],
  },
  {
    id: 4,
    slug: 'healthcare-executive-leadership-programme',
    category: 'Management and Senior Executives',
    categoryValue: 'exec',
    title: 'Healthcare Executive Leadership Programme (HELP)',
    subtitle: 'Enhance your ability to lead and improve your organizations performance and outcomes.',
    description:
      'Enhance your ability to lead and improve your organizations performance and outcomes.',
    duration: '4 Weeks',
    listingDuration: '4 Weeks',
    durationIcon: 'school',
    format: 'Blended Online',
    listingFormat: 'Blended Online',
    formatValue: 'hybrid',
    status: 'enrolling',
    statusLabel: 'Enrolling Now',
    image:
      'https://images.pexels.com/photos/5452233/pexels-photo-5452233.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageBadge: 'Blended Online',
    alt: 'Senior healthcare executive reviewing strategic documents',
    cta: 'Apply Now',
    nextCohort: 'October 2026 Intake',
    language: 'English',
    tuition: 'Tuition on request',
    seatsLeft: 0,
    curriculumHeading:
      'A 4-week executive programme combining live faculty sessions with applied workplace projects',
    facultyHeading:
      'Learn from seasoned healthcare executives and leadership experts who combine global best practice with deep insight into African health systems.',
    finalEyebrow: 'LIMITED SEATS AVAILABLE PER COHORT',
    finalTitle: 'Ready to lead your organization to stronger performance and outcomes?',
    finalBody:
      'Applications are reviewed on a rolling basis. Reserve your seat, request the full syllabus, or speak with a program advisor today.',
    audience: [
      {
        title: 'Senior Executives & Management',
        involves: 'CEOs, CMDs, Managing Directors and senior management team members.',
        points: [
          'Translating institutional strategy into measurable performance',
          'Leading complex change across clinical and administrative teams',
          'Strengthening accountability and executive decision-making',
        ],
      },
      {
        title: 'Clinical & Departmental Leaders',
        involves: 'Department Directors, Unit Heads and Clinical Leads moving into executive roles.',
        points: [
          'Building executive presence and cross-functional influence',
          'Aligning departmental priorities with institutional strategy',
          'Leading high-performing, multi-disciplinary teams',
        ],
      },
      {
        title: 'Emerging Healthcare Leaders',
        involves: 'High-potential professionals preparing for executive responsibility.',
        points: [
          'Developing a personal leadership framework',
          'Strengthening stakeholder and people management skills',
          'Applying practical tools to real workplace challenges',
        ],
      },
    ],
    competencies: [
      {
        title: 'Strategic Leadership & Execution',
        points: [
          'Set direction and translate strategy into operational priorities',
          'Align teams and resources around measurable outcomes',
          'Lead through uncertainty and competing stakeholder demands',
        ],
      },
      {
        title: 'People & Stakeholder Leadership',
        points: [
          'Build and retain high-performing leadership teams',
          'Communicate persuasively with boards, staff and partners',
          'Create a culture of accountability and continuous improvement',
        ],
      },
      {
        title: 'Governance, Quality & Sustainability',
        points: [
          'Strengthen governance and clinical quality oversight',
          'Make sound financial and resource decisions',
          'Drive sustainable institutional performance',
        ],
      },
    ],
    modules: [
      {
        weeks: 'Week 1',
        title: 'Leading Self, Teams & Culture',
        points: [
          'Executive self-awareness and leadership style',
          'Building trust and psychological safety in teams',
          'Leading multi-disciplinary teams through change',
        ],
      },
      {
        weeks: 'Week 2',
        title: 'Strategy, Performance & Accountability',
        points: [
          'Strategic planning in resource-constrained settings',
          'Performance management and accountability frameworks',
          'Using data to steer decisions and improve outcomes',
        ],
      },
      {
        weeks: 'Week 3',
        title: 'Governance & Stakeholder Management',
        points: [
          'Board and executive relationship management',
          'Engaging regulators, partners and communities',
          'Managing risk and institutional reputation',
        ],
      },
      {
        weeks: 'Week 4',
        title: 'Leading Transformation',
        points: [
          'Designing and executing change initiatives',
          'Building leadership capability for the future',
          'Your personal leadership action plan',
        ],
      },
    ],
    capstone: {
      title: 'Executive Leadership Action Plan',
      body: 'Apply the programme frameworks to a live leadership challenge in your own institution and present a practical 90-day action plan for faculty feedback.',
    },
    faculty: [yewande, ebes],
    testimonials: [
      {
        quote:
          'The course gave me the operating framework I needed. Within three months of graduating, my team had redesigned our discharge pathways and cut average length of stay by two days.',
        name: 'Dr. Amina Bello',
        title: 'Medical Director, Lagos',
      },
    ],
    outcomes: [
      { value: '95%', label: 'applied learnings to their workplace within 90 days' },
      { value: '4.9/5', label: 'average participant rating across all cohorts' },
      { value: '20+', label: 'healthcare leaders trained across the continent' },
    ],
    investment: {
      individual: [
        'Full 4-week executive curriculum',
        'Live faculty sessions and recorded materials',
        'Applied leadership project with faculty guidance',
        'Certificate of Completion',
        'Access to the HLA Continuous Learning Community',
      ],
      institutional: [
        '15% discount rate for teams of two or more',
        'Full 4-week executive curriculum',
        'Live faculty sessions and recorded materials',
        'Certificate of Completion',
        'Access to the HLA Continuous Learning Community',
        'Flexible payment plans and institutional invoicing',
      ],
    },
    faqs: [
      {
        q: 'How much time do I need to commit each week?',
        a: 'Plan for four to six hours per week: live cohort sessions, self-paced coursework, and one group mentorship touchpoint. All live sessions are recorded.',
      },
      {
        q: 'Who is this programme designed for?',
        a: 'It is designed for senior executives, clinical and departmental leaders, and high-potential professionals preparing for executive responsibility.',
      },
      {
        q: 'Is the programme delivered online?',
        a: 'Yes. The programme combines self-paced modules with live instructor-led sessions in a blended online format.',
      },
      {
        q: 'Do I get a certificate?',
        a: 'Yes. Every graduate receives a Certificate of Completion and access to the HLA Continuous Learning Community.',
      },
      {
        q: 'Are there group discounts or flexible payment plans?',
        a: 'Yes. Organisations enrolling 2 or more staff under the Institutional Track save 15% and get access to institutional invoicing and flexible payment plans.',
      },
    ],
  },
  {
    id: 5,
    slug: 'self-mastery-skills-and-leadership-development',
    category: 'Middle and Senior Professionals',
    categoryValue: 'mid',
    title: 'Self-Mastery Skills and Leadership Development (SSLD)',
    subtitle: 'Enhance your leadership capabilities to make informed decisions and drive growth',
    description:
      'Embark on a transformative journey of self-discovery and leadership enhancement—leveraging the proven power of executive coaching to make bias-free decisions, elevate team engagement, and drive growth across your healthcare organization.',
    duration: '6 Weeks',
    listingDuration: '3 Weeks',
    durationIcon: 'laptop',
    format: 'Instructor-Led Lectures',
    listingFormat: 'Blended Online',
    formatValue: 'hybrid',
    status: 'enrolling',
    statusLabel: 'Enrolling Now',
    image:
      'https://images.pexels.com/photos/5407212/pexels-photo-5407212.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageBadge: 'Blended Online',
    alt: 'Healthcare professional examining an X-ray on a tablet',
    cta: 'Apply Now',
    nextCohort: 'October Cohort',
    language: 'English',
    tuition: '₦160,000',
    seatsLeft: 50,
    curriculumHeading: 'A 6-week instructor-led online leadership program',
    facultyHeading:
      'Learn from a Master Certified Coach who blends clinical psychology with 20 years of global executive and agile leadership experience.',
    finalEyebrow: 'LIMITED SEATS AVAILABLE PER COHORT',
    finalTitle: 'Ready to unlock your full leadership potential in healthcare?',
    finalBody:
      'Applications are reviewed on a rolling basis. Reserve your seat, request the full syllabus, or speak with a program advisor today.',
    audience: [
      {
        title: 'Clinical & Departmental Leaders',
        involves: 'Frontline Clinicians, Unit Heads, Department Directors, and Clinical Leads.',
        points: [
          'Managing emotions, inner conflict, and high-pressure clinical environments with composure',
          'Fostering psychological safety and inclusive team engagement across multi-disciplinary staff',
          'Maintaining sustainable work-life balance while leading demanding clinical services',
        ],
      },
      {
        title: 'Executive Leadership & Medical Directors',
        involves: 'Chief Medical Directors (CMDs), Medical Directors, and Senior Healthcare Executives.',
        points: [
          'Reducing blind spots and errors in high-stakes executive decision-making',
          'Modeling value-driven, bias-free leadership that inspires organizational trust',
          'Sustaining long-term personal and institutional leadership growth',
        ],
      },
      {
        title: 'Facility & Operations Managers',
        involves: 'Hospital Administrators, Practice Managers, and Operations Leads.',
        points: [
          'Strengthening interpersonal communication and value alignment across diverse teams',
          'Overcoming limiting beliefs to lead change initiatives with confidence',
          'Applying SMART leadership frameworks to boost staff accountability and performance',
        ],
      },
    ],
    competencies: [
      {
        title: 'Self-Mastery, Emotional Regulation & Mindset',
        points: [
          'Understand the core mechanics of self-mastery, self-motivation, and self-management in high-stakes healthcare leadership.',
          'Identify and overcome limiting beliefs while regulating emotions, stress, and negative thought patterns under pressure.',
          'Build grounded self-esteem and executive self-confidence to navigate inner conflict and workplace challenges effectively.',
        ],
      },
      {
        title: 'Inclusive & Value-Driven People Leadership',
        points: [
          'Gain deeper clarity on your personal leadership values in relation to colleagues, teams, and patients.',
          'Adopt an inclusive leadership style that elevates workplace morale, psychological safety, and staff engagement.',
          'Strengthen professional relationships and daily work-life balance without sacrificing leadership impact.',
        ],
      },
      {
        title: 'Bias-Free Decision-Making & Sustained Growth',
        points: [
          'Implement SMART leadership frameworks to sharpen focus, accountability, and team execution.',
          'Recognize and eliminate cognitive biases to reduce errors in executive decision-making.',
          'Establish actionable habits and personalized coaching strategies to sustain continuous leadership growth.',
        ],
      },
    ],
    modules: [
      {
        weeks: 'Module 1',
        title: 'Foundations of Self-Mastery & Value Alignment',
        points: [
          'Defining self-mastery and its strategic value in healthcare leadership',
          'Mastering self-motivation and self-management in demanding clinical environments',
          'Value management of self and others to build stronger workplace relationships',
        ],
      },
      {
        weeks: 'Module 2',
        title: 'Executive Confidence, Mindset & Emotional Resilience',
        points: [
          'Empowering leadership growth through authentic self-esteem and self-confidence',
          'Navigating inner conflict and managing emotions and negative thoughts at work',
          'Identifying limiting beliefs and practical frameworks to overcome them',
        ],
      },
      {
        weeks: 'Module 3',
        title: 'SMART & Inclusive Leadership in Practice',
        points: [
          'Becoming a SMART Leader: clarity, accountability, and sustainable work-life balance',
          'Deploying an inclusive leadership style to create a safe, engaging work environment',
          'Executing bias-free decisions and building long-term habits for sustained leadership growth',
        ],
      },
    ],
    capstone: {
      title: 'Personalized 1-on-1 Success Coaching Session',
      body: 'Alongside the six weekly 1.5-hour live group training sessions, every participant receives a dedicated 60-minute private coaching session with a personal success coach to translate course insights into a tailored leadership action plan.',
    },
    faculty: [delbar],
    testimonials: [
      {
        quote:
          'I felt the crunch and challenges in healthcare personally, me as a person, as a doctor I felt it. I do not want anybody to lack access to healthcare; I want to touch more lives. My vision is to have everyone in Africa have access to healthcare; till that happens I will not stop.',
        name: 'Dr. Benjamin Olowojebutu',
        title: 'Founder, Benjamin Olowojebutu Foundation (BOF)',
      },
    ],
    outcomes: [
      { value: '6', label: 'weeks of live coaching-led training (90 minutes/week)' },
      { value: '1-on-1', label: 'private 60-minute personal success coaching session included for every participant' },
      { value: '20+', label: 'years of Master Certified Coach (MCC) expertise guiding your leadership growth' },
    ],
    investment: {
      individual: [
        'Full 6-week live online training curriculum (1.5 hours per week)',
        'Private 60-minute 1-on-1 session with a personal success coach',
        'Certificate of Completion',
        'Access to the HLA Continuous Learning Community',
      ],
      institutional: [
        '15% discount rate for organizations enrolling two or more leaders',
        'Full 6-week live online training curriculum (1.5 hours per week)',
        'Private 60-minute 1-on-1 personal success coaching session for every participant',
        'Certificate of Completion',
        'Access to the HLA Continuous Learning Community',
        'Flexible payment plans and institutional invoicing',
      ],
    },
    faqs: [
      {
        q: 'How is the 6-week schedule structured for busy healthcare professionals?',
        a: 'Live training runs for just 1.5 hours once a week over 6 weeks, making it easy to fit around clinical shifts and administrative duties without disrupting your workweek.',
      },
      {
        q: 'What is included in the 1-on-1 personal coaching session?',
        a: 'Every participant receives a private 60-minute session with a personal success coach to work through individual leadership roadblocks, blind spots, and career or facility goals one-on-one.',
      },
      {
        q: 'How is SSLD different from traditional healthcare management courses?',
        a: 'Rather than focusing strictly on technical hospital operations, SSLD uses clinical psychology and Master Certified Coaching (MCC) methodologies to strengthen emotional intelligence, self-mastery, and bias-free executive decision-making.',
      },
      {
        q: 'Who is the ideal candidate for this course?',
        a: 'It is built for frontline clinicians stepping into supervisory roles, Department Heads, Hospital Administrators, and CMDs looking to lead teams with greater confidence, clarity, and psychological safety.',
      },
      {
        q: 'Are there group discounts or flexible payment options for hospitals?',
        a: 'Yes. Organizations enrolling 2 or more leaders under the Institutional Track save 15% (₦136,000 per seat instead of ₦160,000) and get access to institutional invoicing and flexible payment plans.',
      },
    ],
  },
  {
    id: 6,
    slug: 'dealing-with-stress',
    category: 'Professionals',
    categoryValue: 'professionals',
    title: 'Dealing With Stress (DWS)',
    subtitle: 'Learn principles and strategies that promote personal wellbeing and boost productivity in healthcare settings.',
    description:
      'Learn principles and strategies that promote personal wellbeing and boost productivity in healthcare settings.',
    duration: '2 Weeks',
    listingDuration: '2 Weeks',
    durationIcon: 'laptop',
    format: 'Self-Paced Online',
    listingFormat: 'Self-Paced Online',
    formatValue: 'online',
    status: 'enrolling',
    statusLabel: 'Enrolling Now',
    image:
      'https://images.pexels.com/photos/11198232/pexels-photo-11198232.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageBadge: 'Self-Paced Online',
    alt: 'Hospital vital signs monitor with medical readings',
    cta: 'Apply Now',
    nextCohort: 'Start Anytime',
    language: 'English',
    tuition: 'Tuition on request',
    seatsLeft: 0,
    curriculumHeading: 'A 2-week self-paced online programme',
    facultyHeading:
      'Learn from a Master Certified Coach who blends clinical psychology with 20 years of global executive and agile leadership experience.',
    finalEyebrow: 'LIMITED SEATS AVAILABLE PER COHORT',
    finalTitle: 'Ready to protect your wellbeing and sustain your performance?',
    finalBody:
      'Applications are reviewed on a rolling basis. Reserve your seat, request the full syllabus, or speak with a program advisor today.',
    audience: [
      {
        title: 'Clinical Professionals',
        involves: 'Clinicians and care teams working in high-pressure healthcare environments.',
        points: [
          'Recognising the signs and sources of workplace stress',
          'Protecting personal wellbeing while delivering quality care',
          'Building sustainable routines under demanding schedules',
        ],
      },
      {
        title: 'Departmental & Team Leaders',
        involves: 'Unit Heads, Department Directors and team leads responsible for staff wellbeing.',
        points: [
          'Supporting teams through pressure and change',
          'Creating psychologically safe working environments',
          'Modelling healthy stress-management practices',
        ],
      },
      {
        title: 'Healthcare Administrators',
        involves: 'Hospital Administrators, Managers and Operations Leads.',
        points: [
          'Balancing operational demands with personal resilience',
          'Preventing burnout across teams',
          'Improving productivity through wellbeing-focused practices',
        ],
      },
    ],
    competencies: [
      {
        title: 'Understanding Stress & Wellbeing',
        points: [
          'Identify the physical, emotional and behavioural signs of stress',
          'Understand how stress affects decision-making and performance',
          'Recognise personal triggers and early warning signs',
        ],
      },
      {
        title: 'Practical Stress-Management Strategies',
        points: [
          'Apply evidence-based techniques to manage pressure in real time',
          'Build daily habits that support recovery and resilience',
          'Use practical tools to reframe negative thought patterns',
        ],
      },
      {
        title: 'Sustaining Productivity & Wellbeing',
        points: [
          'Design a personal wellbeing plan for demanding work periods',
          'Protect focus and energy across clinical and administrative duties',
          'Sustain high performance without compromising health',
        ],
      },
    ],
    modules: [
      {
        weeks: 'Week 1',
        title: 'Understanding Stress in Healthcare',
        points: [
          'The science of stress and its impact on clinicians',
          'Recognising burnout and early warning signs',
          'Personal stress audit and triggers',
        ],
      },
      {
        weeks: 'Week 2',
        title: 'Strategies for Wellbeing & Productivity',
        points: [
          'Practical techniques for managing pressure',
          'Building resilience and sustainable routines',
          'Your personal wellbeing and productivity plan',
        ],
      },
    ],
    capstone: {
      title: 'Your Personal Wellbeing Plan',
      body: 'Translate the course into a practical personal plan for managing stress, protecting your wellbeing, and sustaining performance in your workplace.',
    },
    faculty: [delbar],
    testimonials: [
      {
        quote:
          'The practical tools helped me manage pressure more calmly and protect my energy without stepping back from the work I love.',
        name: 'Dr. Grace Mwangi',
        title: 'Program Lead, Nairobi',
      },
    ],
    outcomes: [
      { value: '95%', label: 'applied learnings to their workplace within 90 days' },
      { value: '4.8/5', label: 'average participant rating across cohorts' },
      { value: '20+', label: 'healthcare professionals trained across the continent' },
    ],
    investment: {
      individual: [
        'Full 2-week self-paced curriculum',
        'All learning materials and downloadable resources',
        'Certificate of Completion',
        'Access to the HLA Continuous Learning Community',
      ],
      institutional: [
        '15% discount rate for teams of two or more',
        'Full 2-week self-paced curriculum',
        'All learning materials and downloadable resources',
        'Certificate of Completion',
        'Access to the HLA Continuous Learning Community',
        'Flexible payment plans and institutional invoicing',
      ],
    },
    faqs: [
      {
        q: 'How long does the course take?',
        a: 'The course runs for 2 weeks and is fully self-paced, so you can complete it around your clinical and administrative schedule.',
      },
      {
        q: 'Is this course only for clinical staff?',
        a: 'No. It is designed for healthcare professionals and administrators across clinical and non-clinical roles.',
      },
      {
        q: 'Do I get a certificate?',
        a: 'Yes. Every graduate receives a Certificate of Completion and access to the HLA Continuous Learning Community.',
      },
      {
        q: 'Can my organisation enrol a team?',
        a: 'Yes. Organisations enrolling 2 or more staff under the Institutional Track save 15% and get access to institutional invoicing.',
      },
      {
        q: 'How is the course delivered?',
        a: 'It is delivered fully online and self-paced, with practical resources you can apply immediately in your workplace.',
      },
    ],
  },
  {
    id: 7,
    slug: 'effectively-managing-workload-under-hectic-conditions',
    category: 'Professionals',
    categoryValue: 'professionals',
    title: 'Effectively Managing Workload under Hectic Conditions (EMW)',
    subtitle: 'Master time management to boost productivity, wellbeing, and career satisfaction',
    description:
      'Master time management to boost productivity, wellbeing, and career satisfaction.',
    duration: '2 Weeks',
    listingDuration: '2 Weeks',
    durationIcon: 'laptop',
    format: 'Self-Paced Online',
    listingFormat: 'Self-Paced Online',
    formatValue: 'online',
    status: 'enrolling',
    statusLabel: 'Enrolling Now',
    image:
      'https://images.pexels.com/photos/8413323/pexels-photo-8413323.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageBadge: 'Self-Paced Online',
    alt: 'Medical professional reviewing a scan',
    cta: 'Apply Now',
    nextCohort: 'Start Anytime',
    language: 'English',
    tuition: 'Tuition on request',
    seatsLeft: 0,
    curriculumHeading: 'A 2-week self-paced online programme',
    facultyHeading:
      'Learn from a Master Certified Coach who blends clinical psychology with 20 years of global executive and agile leadership experience.',
    finalEyebrow: 'LIMITED SEATS AVAILABLE PER COHORT',
    finalTitle: 'Ready to take control of your workload and protect your time?',
    finalBody:
      'Applications are reviewed on a rolling basis. Reserve your seat, request the full syllabus, or speak with a program advisor today.',
    audience: [
      {
        title: 'Clinical Professionals',
        involves: 'Clinicians balancing heavy patient loads with administrative responsibilities.',
        points: [
          'Prioritising competing clinical and administrative demands',
          'Reducing time lost to inefficiency and interruptions',
          'Protecting focus during high-volume periods',
        ],
      },
      {
        title: 'Departmental & Team Leaders',
        involves: 'Unit Heads, Department Directors and team leads responsible for delivery.',
        points: [
          'Allocating workloads across teams fairly and effectively',
          'Improving team planning and coordination',
          'Reducing bottlenecks and avoidable delays',
        ],
      },
      {
        title: 'Healthcare Administrators',
        involves: 'Hospital Administrators, Managers and Operations Leads.',
        points: [
          'Managing complex schedules and competing priorities',
          'Building systems that make workload manageable',
          'Improving productivity and staff satisfaction',
        ],
      },
    ],
    competencies: [
      {
        title: 'Workload Analysis & Prioritisation',
        points: [
          'Map your workload and identify the biggest drains on time',
          'Distinguish urgent from important work',
          'Set realistic priorities under pressure',
        ],
      },
      {
        title: 'Time Management Systems',
        points: [
          'Build practical planning and scheduling routines',
          'Manage interruptions and protect focused work',
          'Delegate and coordinate more effectively',
        ],
      },
      {
        title: 'Sustaining Performance & Wellbeing',
        points: [
          'Balance workload demands with recovery and wellbeing',
          'Reduce avoidable stress caused by poor planning',
          'Sustain productivity over the long term',
        ],
      },
    ],
    modules: [
      {
        weeks: 'Week 1',
        title: 'Workload Mapping and Prioritisation',
        points: [
          'Understanding where your time goes',
          'Prioritisation frameworks for high-pressure environments',
          'Managing interruptions and competing demands',
        ],
      },
      {
        weeks: 'Week 2',
        title: 'Sustainable Time Management Systems',
        points: [
          'Planning routines that work in hectic conditions',
          'Delegation, coordination and team workload management',
          'Your personal workload optimisation plan',
        ],
      },
    ],
    capstone: {
      title: 'Your Workload Optimisation Plan',
      body: 'Build a practical plan to reorganise your workload, protect your time, and sustain productivity and wellbeing in your facility.',
    },
    faculty: [delbar],
    testimonials: [
      {
        quote:
          'I now have a practical system for managing competing demands. My days feel calmer and my team is clearer on priorities.',
        name: 'Temitope Adeyemi',
        title: 'Head of Quality, Accra',
      },
    ],
    outcomes: [
      { value: '95%', label: 'applied learnings to their workplace within 90 days' },
      { value: '4.8/5', label: 'average participant rating across cohorts' },
      { value: '20+', label: 'healthcare professionals trained across the continent' },
    ],
    investment: {
      individual: [
        'Full 2-week self-paced curriculum',
        'All learning materials and downloadable resources',
        'Certificate of Completion',
        'Access to the HLA Continuous Learning Community',
      ],
      institutional: [
        '15% discount rate for teams of two or more',
        'Full 2-week self-paced curriculum',
        'All learning materials and downloadable resources',
        'Certificate of Completion',
        'Access to the HLA Continuous Learning Community',
        'Flexible payment plans and institutional invoicing',
      ],
    },
    faqs: [
      {
        q: 'How long does the course take?',
        a: 'The course runs for 2 weeks and is fully self-paced, so you can complete it around your clinical and administrative schedule.',
      },
      {
        q: 'Is this course only for clinical staff?',
        a: 'No. It is designed for healthcare professionals and administrators across clinical and non-clinical roles.',
      },
      {
        q: 'Do I get a certificate?',
        a: 'Yes. Every graduate receives a Certificate of Completion and access to the HLA Continuous Learning Community.',
      },
      {
        q: 'Can my organisation enrol a team?',
        a: 'Yes. Organisations enrolling 2 or more staff under the Institutional Track save 15% and get access to institutional invoicing.',
      },
      {
        q: 'How is the course delivered?',
        a: 'It is delivered fully online and self-paced, with practical resources you can apply immediately in your workplace.',
      },
    ],
  },
  {
    id: 8,
    slug: 'leadership-enhancement-and-accountability-for-the-public-sector',
    category: 'Senior Executives',
    categoryValue: 'exec',
    title: 'Leadership Enhancement and Accountability for the Public Sector (LEAP)',
    subtitle: 'Strengthen your leadership and execution capacity to drive health system reforms',
    description: 'Strengthen your leadership and execution capacity to drive health system reforms',
    duration: '8 Weeks',
    listingDuration: '8 Weeks',
    durationIcon: 'laptop',
    format: 'Blended Online',
    listingFormat: 'Blended Online',
    formatValue: 'hybrid',
    status: 'enrolling',
    statusLabel: 'Enrolling Now',
    image:
      'https://images.pexels.com/photos/6949931/pexels-photo-6949931.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageBadge: 'Blended Online',
    alt: 'Healthcare leadership seminar in Africa',
    cta: 'Apply Now',
    nextCohort: 'October 2026 Intake',
    language: 'English',
    tuition: 'Tuition on request',
    seatsLeft: 0,
    curriculumHeading: 'An 8-week blended programme for public sector health leaders',
    facultyHeading:
      'Learn from seasoned governance practitioners and public sector leaders who combine global standards with deep insight into African health systems.',
    finalEyebrow: 'LIMITED SEATS AVAILABLE PER COHORT',
    finalTitle: 'Ready to strengthen leadership and accountability in the public sector?',
    finalBody:
      'Applications are reviewed on a rolling basis. Reserve your seat, request the full syllabus, or speak with a program advisor today.',
    audience: [
      {
        title: 'Senior Public Sector Executives',
        involves: 'Directors, Permanent Secretaries, Commissioners and senior ministry officials.',
        points: [
          'Driving reform across complex public health systems',
          'Strengthening accountability and execution discipline',
          'Leading multi-stakeholder reform agendas',
        ],
      },
      {
        title: 'Health System Leaders',
        involves: 'Agency heads, programme directors and health system managers.',
        points: [
          'Translating policy into measurable implementation',
          'Managing performance across teams and facilities',
          'Building coalitions for sustainable change',
        ],
      },
      {
        title: 'Governance & Regulatory Leaders',
        involves: 'Regulators, board members and oversight officials.',
        points: [
          'Strengthening governance and public trust',
          'Improving oversight and accountability mechanisms',
          'Aligning strategy with health system priorities',
        ],
      },
    ],
    competencies: [
      {
        title: 'Public Sector Leadership',
        points: [
          'Lead with clarity and purpose in complex political environments',
          'Build trust across ministries, agencies and partners',
          'Communicate a compelling reform vision',
        ],
      },
      {
        title: 'Accountability & Execution',
        points: [
          'Translate policy commitments into measurable delivery plans',
          'Build accountability systems that improve performance',
          'Use data to monitor progress and course-correct',
        ],
      },
      {
        title: 'Driving System Reform',
        points: [
          'Design and sequence reforms in resource-constrained settings',
          'Manage resistance and build stakeholder buy-in',
          'Sustain reform gains beyond individual leaders',
        ],
      },
    ],
    modules: [
      {
        weeks: 'Weeks 1–2',
        title: 'Leadership Foundations for the Public Sector',
        points: [
          'Leading in complex public systems',
          'Personal leadership and accountability',
          'Stakeholder mapping and political economy',
        ],
      },
      {
        weeks: 'Weeks 3–4',
        title: 'Accountability & Governance',
        points: [
          'Accountability frameworks and performance oversight',
          'Governance, ethics and public trust',
          'Managing risk and institutional reputation',
        ],
      },
      {
        weeks: 'Weeks 5–6',
        title: 'Driving Execution & Reform',
        points: [
          'From policy to implementation',
          'Managing change across facilities and teams',
          'Data, monitoring and course correction',
        ],
      },
      {
        weeks: 'Weeks 7–8',
        title: 'Capstone & Action Planning',
        points: [
          'Applied reform project',
          'Faculty review and peer feedback',
          'Personal 90-day action plan',
        ],
      },
    ],
    capstone: {
      title: 'Public Sector Reform Action Plan',
      body: 'Design a practical 90-day reform or accountability plan for your institution, pressure-tested with faculty and peers.',
    },
    faculty: [ebes, isaac],
    testimonials: [
      {
        quote:
          'The programme gave me practical frameworks for turning reform priorities into measurable actions and holding teams accountable.',
        name: 'Chief Emmanuel Okafor',
        title: 'Board Chair, Regional Health Group',
      },
    ],
    outcomes: [
      { value: '95%', label: 'applied learnings to their workplace within 90 days' },
      { value: '4.8/5', label: 'average participant rating across cohorts' },
      { value: '20+', label: 'public sector leaders trained across the continent' },
    ],
    investment: {
      individual: [
        'Full 8-week blended curriculum',
        'Live faculty sessions and practical toolkits',
        'Applied reform project with faculty guidance',
        'Certificate of Completion',
        'Access to the HLA Continuous Learning Community',
      ],
      institutional: [
        '15% discount rate for teams of two or more',
        'Full 8-week blended curriculum',
        'Live faculty sessions and practical toolkits',
        'Certificate of Completion',
        'Access to the HLA Continuous Learning Community',
        'Flexible payment plans and institutional invoicing',
      ],
    },
    faqs: [
      {
        q: 'Who is LEAP designed for?',
        a: 'It is designed for senior public sector executives, health system leaders, and governance or regulatory officials responsible for reform and delivery.',
      },
      {
        q: 'How is the 8-week programme delivered?',
        a: 'The programme is delivered in a blended online format, combining self-paced modules with live instructor-led sessions.',
      },
      {
        q: 'Will I work on a real reform challenge?',
        a: 'Yes. The capstone requires you to design a practical 90-day reform or accountability plan for your own institution.',
      },
      {
        q: 'Do I get a certificate?',
        a: 'Yes. Every graduate receives a Certificate of Completion and access to the HLA Continuous Learning Community.',
      },
      {
        q: 'Are there group discounts or flexible payment plans?',
        a: 'Yes. Organisations enrolling 2 or more staff under the Institutional Track save 15% and get access to institutional invoicing and flexible payment plans.',
      },
    ],
  },
];

export function getCourseBySlug(slug: string | undefined) {
  return courses.find((c) => c.slug === slug);
}
