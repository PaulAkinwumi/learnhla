import { useEffect, useState } from 'react';
import { Rocket, Eye, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

type Person = {
  role: string;
  name: string;
  image: string;
  alt: string;
  bio: string[];
};

const faculty: Person[] = [
  {
    role: 'MBBS MSc MRCGP DRCOGDCH DTM&H',
    name: 'Dr. Mamsallah Faal-Omisore',
    image: '/falcuty/Mamsallah-280x280.jpg',
    alt: 'Professional headshot of Dr. Mamsallah Faal-Omisore',
    bio: [
      'Mamsallah is a primary care physician with additional qualifications in global health policy, infectious diseases and maternal and child health. She has extensive experience in medical education and primary care research; all of which have proven invaluable in giving insights to addressing health challenges individually and collectively.',
      'She is passionate about high quality health delivery despite the challenges of resource constraints and believes that initiative and innovation can make the difference.',
      'She currently works part-time in clinical practice in Lagos, Nigeria offering personalised high-quality care augmented by health literacy promotion activities ranging from public health talks to media appearances. In addition, she delivers medical education and training for health professionals at all levels of the healthcare value chain.',
      'She is also a clinical team member of Primary Care International – an NGO led by primary health physicians who collaborate with institutions and governments to support and strengthen health systems.',
      'From a strategic perspective, she works as a health policy advisor/consultant to government and NGOs in the sub-region.',
    ],
  },
  {
    role: 'MBBS',
    name: 'Dr. Chinonyerem Egekwu',
    image: '/falcuty/chinonyerem.jpg',
    alt: 'Professional headshot of Dr. Chinonyerem Egekwu',
    bio: [
      'Dr. Chinonyerem is a Healthcare Quality Improvement expert, Public Health technical advisor and a Manager (programs) with Health Strategy and Delivery Foundation (HSDF) in Nigeria. Chinonyerem has deep experience supporting national and sub-national governments to design and lead interventions that seek to optimize service delivery, improve quality of care, patient satisfaction, and data for decision-making in the public and private health sectors and across diverse health market archetypes in Nigeria. In addition, she supports country teams to improve the prevention and care for Non-Communicable Diseases (NCD) and COVID-19.',
      'Currently, she is a member of the national NCD Technical Working Group (TWG) in Nigeria and was a technical facilitator on the National Coordination for Pandemic Responses Collaborative on the Health Systems Accelerator program with countries across Africa and Asia enrolled on this platform.',
      'Chinonyerem is a fellow and member of the International Society for Quality in Healthcare (ISQua). She has a Master of Science degree in Global Health and Development from the University College London (UCL) and an MBBS degree from the University of Nigeria.',
    ],
  },
  {
    role: 'LLM, Law',
    name: 'Mrs. Ifeoma Arowolo',
    image: '/falcuty/Ifeoma.png',
    alt: 'Professional headshot of Mrs. Ifeoma Arowolo',
    bio: [
      'Mrs. Ifeoma is a Senior Associate at Health Ethics and Law Consulting (HELC) (www.healthlaw.com.ng). She has over 10 years of experience and a demonstrated history of offering exceptional legal expertise to clients in the health care and social sectors. She provides legal services to health care businesses across the health care value chain – hospitals, laboratories, digital health care businesses, clients in the international development space. Furthermore, she provides extensive support across a range of issues including, patient safety, data privacy and protection law, public health, mental health, child health, nutrition, migration, dispute resolution, health financing etc.',
      'She has facilitated capacity building and strengthening sessions for a range of clients, including hospitals, laboratories, governments and government staff, health facilities, schools, etc. She has been instrumental in the establishment and operationalization of innovative e-Health solutions that are set to transform healthcare provision in Nigeria.',
      'Ifeoma holds a law degree from Babcock University and a Master’s degree in Law from the University of Lagos.',
    ],
  },
  {
    role: 'PhD, Law',
    name: 'Dr. Cheluchi Onyemelukwe',
    image: '/falcuty/Dr Cheluchi-p-500.jpeg',
    alt: 'Professional headshot of Dr. Cheluchi Onyemelukwe',
    bio: [
      'Dr. Cheluchi Onyemelukwe is Lead Consultant at Health Ethics and Law Consulting, which provides cutting edge legal and policy advisory on the life sciences, health, gender, and other development matters.',
      'A health law, ethics and policy expert, she has advised on a wide range of legal and policy issues in health, social protection and inclusion, governance and development sectors, including guidelines under the National Health Act, health insurance legislation and guidelines.',
      'She was the lawyer member of the Core Working Group that drafted Nigeria’s new National Health Policy (2016). She provided technical advice and support for the development of Lagos State’s Youth Policy, 2016, an important document for the State with Nigeria’s largest youth population.',
      'Her work in the private sector includes dispute resolution, risk management and capacity development. She is a member of the National Committee on Health Research Ethics, the highest policymaking body on research ethics in Nigeria, which provides oversight of research ethics committees in various institutions in the country.',
      'She is also a member of the Technical Working Group on E-Health Legislation and Policy and other national committees.',
      'She holds a First Class Honours degree in Law from the University of Nigeria and doctorate degree in Law from Dalhousie University, Canada.',
    ],
  },
  {
    role: 'PHD CLINICAL PSYCHOLOGY, MCC',
    name: 'Dr. Delbar Niroushak',
    image: '/falcuty/Dr Delbarr-500.jpg',
    alt: 'Professional headshot of Dr. Delbar Niroushak',
    bio: [
      'Meet Dr. Delbar Niroushak, a remarkable individual with a diverse range of expertise. With a Ph.D. in Clinical Psychology, she has established herself as a trailblazer in the field. Dr. Niroushak is not only the Co-founder of Seamaticx, the System of Empowerment and Accountability Management Solution, but also a Co-Founder of Coaching for Change Enterprise.',
      'Her extensive experience is further complemented by her roles as an MCC (Master Certified Coach) in Leadership and Business Coaching, as well as an Agile Enterprise Coach. Driven by a passion for personal and professional development, Dr. Delbar Niroushak is committed to bringing positive change to individuals, organizations, and the world at large through her multifaceted expertise and unwavering dedication.',
    ],
  },
  {
    role: 'AAT, ACA, MBA',
    name: 'Mrs. Kelechi Ahamba',
    image: '/falcuty/Kelechi -p-500.jpg',
    alt: 'Professional headshot of Kelechi Ahamba',
    bio: [
      'Kelechi Ahamba is a thoroughly trained, business minded Chartered Accountant with over 12 years of experience spanning across Audit, Management consulting, Financial accounting and reporting, Inventory/Stock management, Grants management and reporting, Payroll management, Statutory compliance and Accounting systems implementation and administration.',
      'Currently, she is a Finance Manager at Health Strategy and Delivery Foundation (HSDF) where she is responsible for all General ledger work, Fund accounting and reporting, Donor accounts reconciliations and consolidations, Tax and statutory Compliance, Liaising with external auditors on audit procedures and finalisation of audited accounts, among other responsibilities.',
      'Prior to joining HSDF which is a Nonprofit organisation, Kelechi worked in the for-profit sector as an Accounting Officer where she acquired experience in Financial reporting, Project Costing and Billing, Compliance with tax regulations on VAT and WHT, Management of company’s investments in money and capital markets, and Bank reconciliations. She also worked on select strategic projects involving finance and accounting processes and procedure, and analysis of financial statements and performance for clients.',
      'Kelechi holds a Bachelor of Science Degree in Education/Accountancy from Imo State University Owerri, she is a member of the Association of Accounting Technicians West Africa (AATWA) and an ICAN qualified Chartered Accountant with various ICAN prizes. She also holds a Master of Business Administration (MBA) degree from Heriot-Watt University, Edinburgh Business School, UK.',
    ],
  },
  {
    role: 'PHD, MANAGEMENT',
    name: 'Dr. Ebes Esho',
    image: '/falcuty/Dr Ebes.png',
    alt: 'Professional headshot of Dr. Ebes Esho',
    bio: [
      'She is also the managing consultant at Bezalel Frontiers, and the founder of Student Founders and Entrepreneurial Platform, a company limited by guarantee that promotes and advances business and entrepreneurship amongst students. She was previously a lecturer at Covenant University, Nigeria, before proceeding for a resident postdoctoral research fellowship at the University of Johannesburg.',
      'Dr. Ebes worked in Nigeria’s banking industry with United Bank for Africa Plc (UBA) and Zenith Bank Plc for close to a decade before leaving to join the academia. She holds a bachelor degree with honours in accountancy from University of Nigeria, Nsukka, and an MBA, Mphil, and a doctorate degree in Management, with specialisation in business strategy, from Lagos Business School, Pan-Atlantic University, Nigeria.',
      'Dr. Ebes Esho is a recipient of fellowships and awards from the Academy of International Business Africa (AIB-Africa), the Academy of Management, United States, the Business History Conference, and the Global Business School Network (GBSN), a network of leading business schools across six continents.',
    ],
  },
  {
    role: 'EMBA',
    name: 'Mr. Isaac Awua-Boateng',
    image: '/falcuty/Mr Isaac.png',
    alt: 'Professional headshot of Mr. Isaac Awua-Boateng',
    bio: [
      'Isaac Awua-Boateng, a Chartered Accountant with an EMBA in Project Management and a Bachelor of Commerce, offers two decades of expertise in Corporate Governance, Compliance, Conformance, and Performance. With leadership roles in Banking, Finance and Program Management, Isaac has demonstrated strategic vision and financial acumen.',
      'As Country Engagement Manager for Ghana with the Health, Strategy & Delivery Foundation, he is involved in developing learning agendas and facilitating knowledge exchange.',
      'Isaac’s proficiency in project management and stakeholder engagement is evident in his various program management roles. His background in financial institutions highlights expertise in credit administration and business development.',
      'Focused on growth, efficiency, and talent development, Isaac is poised to guide future healthcare leaders through governance challenges and organizational performance improvement. He brings a unique blend of academic knowledge and practical experience to the Healthcare Leadership Academy faculty.',
    ],
  },
];

const leadership: Person[] = [
  {
    role: 'Chief Executive Officer',
    name: 'Dr. Kelechi Ohiri',
    image: '/Dr._Kelechi_Ohiri__CEO.jpg',
    alt: 'Professional headshot of Kelechi Ohiri',
    bio: [
      'Kelechi Ohiri is the Chief Executive of the Health Strategy and Delivery Foundation and Visiting Scientist at the Harvard School of Public Health. He was previously the Special Adviser to the Coordinating Minister of the Economy and Minister of Finance of Nigeria and also served as a Senior Adviser to two Ministers of Health in Nigeria.',
      'Prior to this, he was an Engagement Manager with the London Office of McKinsey and Company, where he served clients in Europe, the Middle East and Africa. Before McKinsey, Dr. Ohiri worked with the World Bank Group in Washington DC, having joined through the Young Professionals’ Programme. His focus was on Social Protection and strengthening health systems in Asia, the Middle East and Africa.',
      'Dr. Ohiri has written policy papers, peer-reviewed academic publications, co-authored books on health-systems and has served on expert advisory panels for the Institute of Medicine, the US Centers for Disease Control and Prevention, the World Bank and the World Health Organization. He is currently on the Board of the World Health Organization’s Alliance for Health Systems and Policy Research, served as Chair of a working group on Programmatic Sustainability for the Global Fund to Fight Against AIDS, TB and Malaria, and as Co-Chair for the Business Planning Team of the new Global Financing Facility for Maternal, Newborn and Child Health. He is also a 2013 Desmond Tutu Fellow of the African Leadership Institute.',
      'Dr. Ohiri earned a medical degree from the University of Lagos. He also holds a Master of Public Health degree and a Master of Science in Health Policy and Management, both from Harvard University. He was a Healthcare Management Fellow at Harvard and has worked as a primary care physician in various settings.',
    ],
  },
  {
    role: 'Board Member',
    name: 'Dr. Nneka Mobisson-Etuk',
    image: '/Nneka Mobisson-Etuk.jpeg',
    alt: 'Professional headshot of Nneka Mobisson-Etuk',
    bio: [
      'Nneka Mobisson-Etuk is an MD, MBA, MPH, a 2014 World Economic Forum Young Global Leader and Yale Associate World Fellow, and Co-Founder and CEO at mDoc.',
      'Prior to mDoc, she was Executive Director for the Africa Region at IHI, a leading global health organization focused on healthcare quality improvement, where, through her leadership, IHI dramatically expanded its efforts at building sustainable change in healthcare delivery systems in Africa, the results of which are directly impacting millions of lives in 13 priority countries.',
      'A pediatrician by training, Nneka was previously Vice President of Community Health and Population Health Management at the Connecticut Hospital Association, where she provided leadership to hospitals in the area of population health management, and devised statewide health initiatives to better address community health and reduce costs. At McKinsey & Company, she worked primarily in the area of strategy development for payers and providers, health care IT, and pharmaceutical companies. At The World Bank, she worked on investing in private health care in resource-poor countries and developing the health care strategy for Africa. She has also worked at Merck and Co., Center for Disease Control (CDC), and Society for Family Health (SFH).',
      'Nneka earned a bachelor’s in Mechanical Engineering from Massachusetts Institute of Technology (MIT), her Masters in Public Health (MPH) from Emory University Rollins School of Public Health, and her MD and MBA from Yale University and completed her Pediatrics residency at The Children’s Hospital of Philadelphia.',
      'She is a member of the African Leadership Network, and sits on several boards and committees.',
    ],
  },
  {
    role: 'Board Member',
    name: 'Dr. Muntaqa Umar-Sadiq',
    image: '/Muntaqa Umar-Sadiq main.jpg',
    alt: 'Professional headshot of Muntaqa Umar-Sadiq',
    bio: [
      'Muntaqa is Partner at Flint Atlantic Capital, an impact investments firm that aims to transform the healthcare landscape in Africa by leveraging deep insights to make high impact investments that unlock the market potential of the health sector across all stages of the value chain from early stage to growth stage companies.',
      'Muntaqa has over 11 years experience in the healthcare sector, including 5 years as the Chief Executive Officer and founding board member of the Private Sector Health Alliance of Nigeria - a platform that mobilizes private sector resources, partnerships and capabilities to improve health outcomes through innovation, market shaping engagements and impact investments.',
      'Prior to this role, Muntaqa was the Senior Technical Advisor to the former Honourable Minister of State for Health in Nigeria, Dr. Muhammad Ali Pate. In this position, he was responsible for leading a number of landmark healthcare reform programs. He commenced his career as a healthcare investment banker at Morgan Stanley in the U.K where he focused on the Healthcare & Pharmaceutical sector (Mergers & Acquisitions).',
      'Muntaqa is a graduate of the University of Cambridge, England, where he earned an M.Phil in Bioscience Enterprise. He holds an MBBS degree from Imperial College School of Medicine, London UK and an intercalated BSc degree in Management (with Finance) from the Tanaka Business School, London, UK.',
      'Muntaqa was honoured as a 2016 World Economic Forum Young Global Leader and as a 2017 Aspen Spotlight Scholar. He is an Eisenhower Fellow and is also a Chartered Alternatives Investment Analyst (CAIA).',
    ],
  },
  {
    role: 'Board Member',
    name: 'Dr. Orode Omolara Doherty',
    image: '/Orode Omolara Doherty.jpeg',
    alt: 'Professional headshot of Orode Omolara Doherty',
    bio: [
      'Dr. Orode Doherty is a US Board-Certified Pediatrician and Public Health Physician and Medical Director of Ingress Health Partners, where she works on expanding integrated comprehensive primary healthcare employing a continuity of care model incorporating technology and behavior change at community level. She is a co-Founder of the African Children’s Hospitals Foundation, established with the aim of significantly expanding access for sick and injured children in Africa to quality specialty care at designated dedicated Pediatric centers.',
      'She received Pediatric training at the Lagos University Teaching Hospital and the Children’s Hospital of Pittsburgh where she was an award-winning Pediatric resident and clinician. As pioneer Pediatrician in ICAP, Columbia University, she led teams that established over 100 maternal and newborn care clinics for mothers living with HIV in several states in Nigeria, creating curricula for training health providers and tools for supervision.',
      'Until recently she was Country Director for Africare Nigeria, where she provided thoughtful leadership around enhancing the capacity of women and their families to improving health and livelihoods through behavior change, education and enhanced access to resources and technology.',
      'She holds a Master’s in Public Health (Maternal & Child Health) from Harvard University’s School of Public Health. Her 27-year professional career has spanned clinical pediatrics, health and hospitals systems strengthening, community development, establishing livelihoods and the promotion of life skills in youth.',
      'She and her husband ‘Funso have three children. She is a Fellow of the American Academy of Pediatrics, Associate Fellow of the West African Postgraduate Medical College, Fellow of the African Leadership Initiative West Africa, and a member and moderator of the Aspen Global Leadership Network.',
    ],
  },
  {
    role: 'Director',
    name: 'Dr. Yewande Ogundeji',
    image: '/Dr Yewande.jpeg',
    alt: 'Professional headshot of Yewande Ogundeji',
    bio: [
      'Dr. Yewande Ogundeji (PhD) is a health economist, health systems specialist, and international development leader with about 15 years of experience advancing public health and economic development in Africa, Europe, and North America through program leadership, implementation, academic research, and teaching.',
      'Dr. Ogundeji leads multi-country teams to design, implement, and evaluate health financing reforms, provider payment models, and quality improvement initiatives in low and high income countries. She also provides advisory, technical assistance, and implementation support to country governments on several initiatives including health systems research, immunization financing, nutrition, and private sector engagement.',
      'She leads academic research across the domains of equitable access to care; improving patient and provider experience; advancing population health through precision public health; and value for money to support fiscal sustainability of health systems—in both local and international contexts.',
      'She has expertise in mixed methods research, evidence synthesis, and knowledge management and learning, and she sits on several technical working groups and scientific committees at the sub-national, national, and international levels, including the WHO PMNCH Economics and Financing expert group. She has authored publications in peer reviewed journals and taught across thematic areas such as financial management, costing, fiscal space analysis, health accounts, allocative efficiency, cost effectiveness analysis, political economy, and health insurance. She developed the first ever typology to categorize performance-based financing schemes in healthcare and a checklist for contributory health insurance design in Nigeria.',
      'Before joining HSDF, she was a researcher at the York Health Economics Consortium, where her research focused on improving equity and quality of care through value-based purchasing, efficiency, and evidence-based health financing policies. Dr. Ogundeji received her master’s degree in public health and Ph.D. in Health Services Research from the University of York, in the United Kingdom. She completed her postdoctoral training at the University of Calgary, Canada.',
    ],
  },
  {
    role: 'Programme Manager',
    name: 'Mr. Adedayo Benjamin Falokun',
    image: '/Falokun Adedayo Benjamin.jpeg',
    alt: 'Professional headshot of Adedayo Benjamin Falokun',
    bio: [
      'Adedayo is the programme manager at the Healthcare Leadership Academy (HLA).',
      'Prior to joining HLA, he worked at the Commercial Services Department of the US Consulate in Lagos, where he was responsible for market research, providing market intelligence across key sectors of Nigeria’s economy and identifying new opportunities for prospective US investors seeking to enter the Nigerian market.',
      'He has also worked in the financial sector as a Strategy and Value-Added Services (VAS) personnel, coordinating programs and partnership efforts for EdFin Microfinance Bank, an education-focused financial institution based in Lagos.',
      'Adedayo holds an MBA from Africa’s leading Business School, the Lagos Business School, Pan-African University, Lagos from where he was inducted into the Beta Gamma Sigma (BGS) Society, an exclusive global network of top MBAs and business professionals from leading AACSB-accredited business schools across the world. He also attended the IESEG School of Management, Paris as an international MBA fellow in 2022.',
      'He is a published author of two books and is very passionate about leadership and human capital development. He runs a leadership mentoring program for young adults through a platform known as Dayspring Resource Center in Lagos.',
    ],
  },
  {
    role: 'Technology Officer',
    name: 'Mr. Paul Akinwumi',
    image: '/Paul Akinwumi.jpeg',
    alt: 'Professional headshot of Paul Akinwumi',
    bio: [
      'Technology and digital-delivery specialist powering our online learning platforms.',
      'Leads the engineering behind our LMS, cohort analytics, and community tools.',
      'Prior experience building health-tech products used by thousands of clinicians.',
      'Focused on making world-class learning accessible from anywhere on the continent.',
    ],
  },
];

const partners = [
  '/partners/cambridge uni.jpeg',
  '/partners/deliveryasso.png',
  '/partners/Duke-University-Logo.png',
  '/partners/EPIC-ADRAP-PART.jpg',
  '/partners/habiba consulting.jpeg',
  '/partners/hfn.png',
  '/partners/IHI.webp',
  '/partners/lagosbs.jpeg',
  '/partners/mDoclogo.jpeg',
  '/partners/Nimsa.jpeg',
  '/partners/PSHAN-Logo.png',
  '/partners/USAID-Identity-2048x613.png',
];

const stats = [
  { value: '500+', label: 'Alumni Trained' },
  { value: '5+', label: 'Countries Reached' },
  { value: '10+', label: 'Partner Institutions' },
];

function BioDrawer({ person, onClose }: { person: Person | null; onClose: () => void }) {
  useEffect(() => {
    if (!person) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [person, onClose]);

  if (!person) return null;

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label={`${person.name} biography`}>
      <div className="absolute inset-0 bg-on-surface/60 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="absolute inset-x-0 top-8 bottom-8 md:top-[8vh] md:bottom-[8vh] flex flex-col overflow-hidden bg-surface border-y border-outline-variant shadow-[0_-20px_60px_rgba(25,28,30,0.35)] animate-drawer-in">
        <div className="h-1.5 w-full bg-secondary flex-shrink-0" />
        <div className="flex-1 overflow-y-auto">
          <button
            onClick={onClose}
            aria-label="Close biography"
            className="absolute top-6 right-margin-mobile md:right-margin-desktop w-10 h-10 rounded-full bg-surface-container hover:bg-secondary hover:text-on-primary flex items-center justify-center text-on-surface transition-colors duration-200"
          >
            <X size={20} />
          </button>
          <div className="px-margin-mobile md:px-margin-desktop py-10 md:py-14 pt-16">
            <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
              <div className="md:col-span-5 lg:col-span-4 md:sticky md:top-10">
                <img
                  src={person.image}
                  alt={person.alt}
                  className="w-full aspect-square object-cover rounded-xl border border-outline-variant shadow-[0_16px_40px_-8px_rgba(25,28,30,0.35)]"
                />
              </div>
              <div className="md:col-span-7 lg:col-span-8">
                <h2 className="font-headline-md text-headline-md font-bold text-on-background">{person.name}</h2>
                <p className="mt-2 font-label-bold text-label-bold text-secondary uppercase tracking-[0.12em]">
                  {person.role}
                </p>
                <div className="mt-6 h-0.5 w-16 bg-secondary" />
                <h3 className="mt-8 mb-5 font-label-bold text-label-bold text-outline uppercase tracking-[0.12em]">
                  Biography
                </h3>
                <div className="space-y-5 font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  {person.bio.map((point) => (
                    <p key={point}>{point}</p>
                  ))}
                </div>
                <div className="mt-10">
                  <button
                    onClick={onClose}
                    className="font-label-bold text-label-bold bg-secondary text-on-primary px-8 py-3.5 rounded uppercase tracking-wider hover:opacity-90 transition-opacity duration-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const [selected, setSelected] = useState<Person | null>(null);

  return (
    <div className="flex-grow flex flex-col gap-y-20 md:gap-y-[120px] pb-20 md:pb-[120px]">
      {/* Hero Section */}
      <section className="relative h-[819px] min-h-[600px] flex items-center justify-center pt-10">
        <div className="absolute inset-0 w-full h-full bg-primary-container overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCB2X40u9XuHtFKqSNaPmr31ZabLJe8jcZnUlvxlFIA0WpaSb83bPcN1gI-hOTMcsjt9Ehhq50Gx_3mOAmppE8dMcfoMu-D8NnBLZUivKJftL90QAwck_NUU1GCZfNzEVDVDzmB9sP_-XYWUbcDsfs7OUQAQfQrgUgUG5Ie6TyVnYccLp-TQdv7mx9a09NhpFFMUVb76wiDdbw86tdeD7yuuRS5wHwudH9pjzMls5dcZbXmU_n4TQCf-A')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/80 to-transparent" />
        </div>
        <div className="relative z-10 px-margin-mobile md:px-margin-desktop text-center text-on-primary">
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-6">
            Empowering the Leaders of Africa's Healthcare Future
          </h1>
          <p className="font-body-lg text-body-lg max-w-3xl mx-auto text-on-primary mb-10">
            Bridging the critical gap between clinical excellence and strategic leadership to build resilient,
            high-performing health systems across the continent.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="px-margin-mobile md:px-margin-desktop">
        <div className="grid md:grid-cols-12 gap-gutter items-center">
          <div className="md:col-span-5 mb-8 md:mb-0">
            <img
              src="/webimages/Training photo3.jpeg"
              alt="African healthcare professionals during a training session"
              className="w-full aspect-[4/5] object-cover rounded-xl shadow-sm border border-outline-variant"
            />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <h2 className="font-headline-md text-headline-md text-on-background mb-6">Our Foundation</h2>
            <div className="space-y-6 text-on-surface-variant font-body-lg text-body-lg">
              <p>
                As an institution, we are committed to empowering current and future generations of healthcare
                professionals with the requisite skills, tools, and capabilities to address context-specific health
                system challenges.
              </p>
              <p>
                Ultimately, our aim is to develop a cohort of healthcare leaders in both the public and private sector
                who will positively transform their respective organizations and communities to improve health outcomes
                and wellbeing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-surface-container-low py-20">
        <div className="px-margin-mobile md:px-margin-desktop">
          <div className="grid md:grid-cols-2 gap-gutter">
            <div className="bg-surface-container-lowest p-10 rounded-xl border border-outline-variant hover:shadow-[0px_4px_20px_rgba(11,37,69,0.05)] transition-shadow duration-300">
              <div className="mb-6 flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full text-secondary">
                <Rocket size={28} />
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-background mb-4">Our Mission</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                To deliver context-specific and innovative capacity development programmes that address identified skill
                gaps across the health system.
              </p>
            </div>
            <div className="bg-surface-container-lowest p-10 rounded-xl border border-outline-variant hover:shadow-[0px_4px_20px_rgba(11,37,69,0.05)] transition-shadow duration-300">
              <div className="mb-6 flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full text-secondary">
                <Eye size={28} />
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-background mb-4">Our Vision</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                To develop the next generation of healthcare leaders in Africa who excel in governance and the provision
                of quality services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* World-Class Faculty */}
      <section className="px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-16">
          <h2 className="font-headline-md text-headline-md text-on-background mb-4">World-Class Faculty</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Learn directly from international thought leaders and seasoned executives bridging academic rigor with
            real-world impact.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {faculty.map((member) => (
            <div key={member.name} className="group">
              <div className="aspect-square mb-4 overflow-hidden rounded-xl bg-surface-container">
                <img
                  src={member.image}
                  alt={member.alt}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <h3 className="font-label-bold text-label-bold text-secondary mb-1 uppercase tracking-wider">
                {member.role}
              </h3>
              <h4 className="font-headline-sm text-headline-sm text-on-background mb-2 text-xl">{member.name}</h4>
              <button
                onClick={() => setSelected(member)}
                className="font-label-bold text-label-bold text-secondary flex items-center gap-1 hover:gap-2 transition-all"
              >
                Read Bio <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Executive Leadership */}
      <section className="px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-16">
          <h2 className="font-headline-md text-headline-md text-on-background mb-4">Executive Leadership</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Guided by distinguished industry leaders with global experience shaping African health system governance.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {leadership.map((member) => (
            <div key={member.name} className="group">
              <div className="aspect-square mb-4 overflow-hidden rounded-xl bg-surface-container">
                <img
                  src={member.image}
                  alt={member.alt}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <h3 className="font-label-bold text-label-bold text-secondary mb-1 uppercase tracking-wider">
                {member.role}
              </h3>
              <h4 className="font-headline-sm text-headline-sm text-on-background mb-2 text-xl">{member.name}</h4>
              <button
                onClick={() => setSelected(member)}
                className="font-label-bold text-label-bold text-secondary flex items-center gap-1 hover:gap-2 transition-all"
              >
                Read Bio <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Global Partners */}
      <section className="bg-surface-bright py-20 border-y border-outline-variant">
        <div className="px-margin-mobile md:px-margin-desktop text-center">
          <h2 className="font-label-bold text-label-bold text-outline uppercase tracking-[0.1em] mb-10">
            World-Class Collaborations
          </h2>
          <div className="overflow-hidden mask-image-gradient">
            <div className="partner-scroll-track items-center gap-14 py-4">
              {[...partners, ...partners].map((partner, i) => (
                <img
                  key={`${partner}-${i}`}
                  src={partner}
                  alt={`Partner logo ${(i % partners.length) + 1}`}
                  className="h-12 md:h-16 w-auto object-contain"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact at a Glance */}
      <section className="px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-outline-variant">
          {stats.map((stat) => (
            <div key={stat.label} className="py-8 md:py-0">
              <div className="font-display-lg text-display-lg text-primary-container mb-2">{stat.value}</div>
              <div className="font-label-bold text-label-bold text-secondary uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-margin-mobile md:px-margin-desktop">
        <div className="charcoal-scheme bg-primary-container rounded-2xl p-12 md:p-20 text-center text-on-primary">
          <h2 className="font-headline-md text-headline-md mb-6">Advance Your Impact in Healthcare</h2>
          <p className="font-body-lg text-body-lg text-primary-fixed-dim mb-10 max-w-2xl mx-auto">
            Whether you are an individual practitioner seeking leadership skills or an institution looking to transform
            your management structure, we have a pathway for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/courses"
              className="bg-primary text-on-primary px-8 py-4 rounded font-label-bold text-label-bold"
            >
              Explore Courses
            </Link>
            <button className="bg-transparent border border-on-primary text-on-primary px-8 py-4 rounded font-label-bold text-label-bold hover:bg-on-primary/10 transition-colors duration-200">
              Careers at HLA
            </button>
          </div>
        </div>
      </section>

      {/* Bio Drawer */}
      <BioDrawer person={selected} onClose={() => setSelected(null)} />
    </div>
  );
}