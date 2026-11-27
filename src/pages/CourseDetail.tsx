import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  BarChart2,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  Clock,
  GraduationCap,
  Laptop,
  Lock,
  Mail,
  PlayCircle,
  Quote,
  ShieldCheck,
  Sparkles,
  MapPin,
  Globe,
  School,
  Users,
  X,
} from 'lucide-react';
import { getCourseBySlug, type Course, type FacultyMember } from '@/data/courses';

const partnerLogos = [
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

function FormatIcon({ format }: { format: Course['formatValue'] }) {
  if (format === 'online') return <Laptop size={20} />;
  if (format === 'hybrid') return <School size={20} />;
  return <MapPin size={20} />;
}

function Modal({
  title,
  eyebrow,
  onClose,
  children,
}: {
  title: string;
  eyebrow: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
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
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-margin-mobile md:px-0" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-on-surface/60 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-surface-container-lowest rounded-xl border border-outline-variant shadow-[0_-20px_60px_rgba(25,28,30,0.35)] animate-drawer-in max-h-[85vh] overflow-y-auto">
        <div className="h-1.5 w-full bg-secondary flex-shrink-0 rounded-t-xl" />
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-surface-container hover:bg-secondary hover:text-on-primary flex items-center justify-center text-on-surface transition-colors duration-200"
        >
          <X size={20} />
        </button>
        <div className="px-8 md:px-12 py-10 pt-14">
          <p className="font-label-bold text-label-bold text-secondary uppercase tracking-[0.12em]">{eyebrow}</p>
          <h2 className="mt-2 font-headline-md text-headline-md text-on-background">{title}</h2>
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

function FacultyDrawer({ person, onClose }: { person: FacultyMember | null; onClose: () => void }) {
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
                  src={person.headshot}
                  alt={person.alt}
                  className="w-full aspect-square object-cover rounded-xl border border-outline-variant shadow-[0_16px_40px_-8px_rgba(25,28,30,0.35)]"
                />
              </div>
              <div className="md:col-span-7 lg:col-span-8">
                <h2 className="font-headline-md text-headline-md font-bold text-on-background">{person.name}</h2>
                <p className="mt-2 font-label-bold text-label-bold text-secondary uppercase tracking-[0.12em]">{person.role}</p>
                <div className="mt-6 h-0.5 w-16 bg-secondary" />
                <h3 className="mt-8 mb-5 font-label-bold text-label-bold text-outline uppercase tracking-[0.12em]">Biography</h3>
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

function Accordion({ items }: { items: { header: string; tag: string; body: string[] }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.header}
            className={`border rounded-xl overflow-hidden transition-colors duration-300 ${
              isOpen ? 'border-secondary/40 bg-surface-container-lowest shadow-[0px_4px_20px_rgba(11,37,69,0.05)]' : 'border-outline-variant bg-surface-container-lowest'
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 px-6 md:px-8 py-6 text-left"
            >
              <span className="flex items-center gap-4">
                <span className="hidden sm:inline font-label-bold text-label-bold text-secondary uppercase tracking-wider w-24 shrink-0">
                  {item.tag}
                </span>
                <span className="font-headline-sm text-headline-sm text-on-background">{item.header}</span>
              </span>
              <ChevronDown
                size={22}
                className={`shrink-0 text-secondary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {isOpen && (
              <div className="px-6 md:px-8 pb-8">
                <ul className="flex flex-col gap-3 mt-2 border-t border-outline-variant pt-6">
                  {item.body.map((point) => (
                    <li key={point} className="flex items-start gap-3 font-body-md text-body-md text-on-surface-variant">
                      <Check size={18} className="mt-0.5 text-secondary shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function CourseDetail() {
  const { slug } = useParams<{ slug: string }>();
  const course = getCourseBySlug(slug);

  const [openModule, setOpenModule] = useState<number | null>(0);
  const [showSponsorship, setShowSponsorship] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!course) {
    return (
      <div className="flex-grow pt-[120px] pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full flex flex-col items-center gap-8 text-center">
        <ShieldCheck size={48} className="text-secondary" />
        <h1 className="font-headline-md text-headline-md text-on-background">This course could not be found.</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">It may have been moved or is no longer open for enrollment.</p>
        <Link
          to="/courses"
          className="font-label-bold text-label-bold bg-secondary text-on-primary px-8 py-3.5 rounded uppercase tracking-wider hover:opacity-90 transition-opacity duration-200"
        >
          Back to all courses
        </Link>
      </div>
    );
  }

  const numericTuition = parseFloat(course.tuition.replace(/[^0-9]/g, ''));
  const institutionalTuition = Number.isFinite(numericTuition)
    ? `₦${Math.round((numericTuition * 0.85) / 100) * 100}`
    : 'Request a quote';

  return (
    <div className="flex-grow pt-[120px] pb-24 px-margin-mobile md:px-margin-desktop w-full flex flex-col gap-y-20 md:gap-y-[120px]">
      {/* ===== Hero ===== */}
      <div className="flex items-center justify-center gap-3 bg-secondary text-on-primary px-margin-mobile py-3 rounded-lg font-body-sm text-body-sm text-center">
        <Sparkles size={16} className="shrink-0" />
        <span>
          Ends soon! Enroll now to enjoy a discount of 10% immediately. Apply to join the next cohort.
        </span>
      </div>

      <section className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-7">
          <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-background mb-6">
            {course.title}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-10">{course.description}</p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { icon: <Clock size={20} />, label: 'Duration', value: course.duration },
              { icon: <FormatIcon format={course.formatValue} />, label: 'Delivery', value: course.format },
              { icon: <CalendarDays size={20} />, label: 'Next Cohort', value: course.nextCohort },
              { icon: <Globe size={20} />, label: 'Language', value: course.language },
            ].map((item) => (
              <div key={item.label} className="bg-surface-container-low border border-outline-variant rounded-xl p-4">
                <span className="text-secondary">{item.icon}</span>
                <p className="mt-3 font-label-bold text-label-bold text-outline uppercase tracking-wider">{item.label}</p>
                <p className="mt-1 font-body-sm text-body-sm text-on-background font-semibold leading-snug">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to={`/courses/${course.slug}/enroll`}
              className="font-label-bold text-label-bold bg-secondary text-on-primary px-8 py-4 rounded inline-flex items-center gap-2 uppercase tracking-wider hover:opacity-90 transition-opacity duration-200"
            >
              Enroll Now <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-3 font-body-sm text-body-sm text-on-surface-variant">
            <div className="flex -space-x-2">
              {['/falcuty/chinonyerem.jpg', '/falcuty/Ifeoma.png', '/falcuty/Dr Delbarr-500.jpg'].map((src) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  className="w-9 h-9 rounded-full object-cover border-2 border-surface-container-lowest"
                />
              ))}
            </div>
            <span>
              Taught by <span className="font-semibold text-on-background">{course.faculty.length} senior faculty</span>.
            </span>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative rounded-2xl overflow-hidden border border-outline-variant shadow-[0_24px_60px_-16px_rgba(25,28,30,0.4)]">
            <img src={course.image} alt={course.alt} className="w-full object-cover aspect-[4/3]" />
            <div className="absolute inset-0 bg-gradient-to-t from-on-surface/50 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 font-label-bold text-label-bold text-on-primary bg-on-surface/40 backdrop-blur-sm px-3 py-1.5 rounded uppercase tracking-wider">
              {course.imageBadge}
            </span>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3">
              <p className="font-headline-sm text-headline-sm text-secondary font-bold">{course.seatsLeft > 0 ? course.seatsLeft : 'Open'}</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{course.seatsLeft > 0 ? 'seats left in this cohort' : 'rolling enrollment'}</p>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3">
              <p className="font-headline-sm text-headline-sm text-secondary font-bold">{course.tuition}</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Individual tuition</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Institutional trust bar ===== */}
      <section className="text-center">
        <p className="font-label-bold text-label-bold text-outline uppercase tracking-[0.1em] mb-10">
          World-Class Collaborations
        </p>
        <div className="overflow-hidden mask-image-gradient">
          <div className="partner-scroll-track items-center gap-14 py-4">
            {[...partnerLogos, ...partnerLogos].map((logo, i) => (
              <img
                key={`${logo}-${i}`}
                src={logo}
                alt={`Partner logo ${(i % partnerLogos.length) + 1}`}
                className="h-12 md:h-16 w-auto object-contain"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Who Should Attend ===== */}
      <section id="audience">
        <header className="max-w-3xl mb-12">
          <p className="font-label-bold text-label-bold text-secondary uppercase tracking-[0.12em] mb-3">Who should attend</p>
          <h2 className="font-headline-md text-headline-md text-on-background">Built for the leaders running Africa's health systems</h2>
        </header>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {course.audience.map((a, i) => (
            <div key={a.title} className="flex flex-col bg-surface-container-lowest border border-outline-variant rounded-xl p-8 hover:shadow-[0px_4px_20px_rgba(11,37,69,0.05)] transition-shadow duration-300">
              <span className="font-headline-sm text-headline-sm text-secondary font-bold">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-4 font-headline-sm text-headline-sm text-on-background">{a.title}</h3>
              <p className="mt-2 font-body-sm text-body-sm text-on-surface-variant">{a.involves}</p>
              <ul className="mt-6 flex flex-col gap-3 border-t border-outline-variant pt-6">
                {a.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 font-body-sm text-body-sm text-on-surface-variant">
                    <Check size={16} className="mt-0.5 text-secondary shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ===== What you will master ===== */}
      <section id="master">
        <header className="max-w-3xl mb-12">
          <p className="font-label-bold text-label-bold text-secondary uppercase tracking-[0.12em] mb-3">What you will master</p>
          <h2 className="font-headline-md text-headline-md text-on-background">Competencies you can apply in your first week back</h2>
        </header>
        <div className="grid md:grid-cols-2 gap-6">
          {course.competencies.map((c) => (
            <div key={c.title} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-11 h-11 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                  <Award size={22} />
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-background">{c.title}</h3>
              </div>
              <ul className="flex flex-col gap-3">
                {c.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 font-body-md text-body-md text-on-surface-variant">
                    <Check size={18} className="mt-0.5 text-secondary shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Curriculum ===== */}
      <section id="curriculum">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-8">
            <header className="max-w-3xl mb-12">
              <p className="font-label-bold text-label-bold text-secondary uppercase tracking-[0.12em] mb-3">Curriculum</p>
              <h2 className="font-headline-md text-headline-md text-on-background">{course.curriculumHeading}</h2>
            </header>
            <div className="flex flex-col gap-4">
              {course.modules.map((m, i) => {
                const isOpen = openModule === i;
                return (
                  <div
                    key={m.weeks}
                    className={`border rounded-xl overflow-hidden transition-colors duration-300 ${
                      isOpen ? 'border-secondary/40 bg-surface-container-lowest shadow-[0px_4px_20px_rgba(11,37,69,0.05)]' : 'border-outline-variant bg-surface-container-lowest'
                    }`}
                  >
                    <button
                      onClick={() => setOpenModule(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-4 px-6 md:px-8 py-6 text-left"
                    >
                      <span className="flex items-center gap-4">
                        <span className="hidden sm:inline font-label-bold text-label-bold text-secondary uppercase tracking-wider w-24 shrink-0">
                          {m.weeks}
                        </span>
                        <span className="font-headline-sm text-headline-sm text-on-background">{m.title}</span>
                      </span>
                      <ChevronDown
                        size={22}
                        className={`shrink-0 text-secondary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 md:px-8 pb-8">
                        <ul className="flex flex-col gap-3 mt-2 border-t border-outline-variant pt-6">
                          {m.points.map((p) => (
                            <li key={p} className="flex items-start gap-3 font-body-md text-body-md text-on-surface-variant">
                              <Check size={18} className="mt-0.5 text-secondary shrink-0" />
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {course.capstone && (
            <div className="lg:col-span-4 lg:sticky lg:top-[110px]">
              <div className="bg-primary-container text-on-primary rounded-2xl p-8 md:p-10 shadow-[0_24px_60px_-16px_rgba(25,28,30,0.5)]">
                <span className="w-12 h-12 rounded-xl bg-on-primary/10 flex items-center justify-center mb-6">
                  <GraduationCap size={26} />
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-primary font-bold leading-snug">{course.capstone.title}</h3>
                <p className="mt-4 font-body-md text-body-md text-on-primary/85">{course.capstone.body}</p>
                <Link
                  to={`/courses/${course.slug}/enroll`}
                  className="mt-8 w-full inline-flex items-center justify-center font-label-bold text-label-bold bg-on-primary text-secondary px-6 py-3.5 rounded uppercase tracking-wider hover:opacity-90 transition-opacity duration-200"
                >
                  Register Now
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===== Executive Faculty ===== */}
      <section id="faculty">
        <header className="max-w-3xl mb-12">
          <p className="font-label-bold text-label-bold text-secondary uppercase tracking-[0.12em] mb-3">Executive faculty</p>
          <h2 className="font-headline-md text-headline-md text-on-background">{course.facultyHeading}</h2>
        </header>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {course.faculty.map((f) => (
            <button
              key={f.name}
              onClick={() => setSelectedFaculty(f)}
              className="text-left group bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden hover:shadow-[0px_4px_20px_rgba(11,37,69,0.08)] transition-all duration-300"
            >
              <div className="overflow-hidden">
                <img src={f.headshot} alt={f.alt} className="w-full aspect-[4/3] object-cover object-top group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <h3 className="font-headline-sm text-headline-sm text-on-background">{f.name}</h3>
                <p className="mt-1.5 font-body-sm text-body-sm text-secondary font-medium leading-snug">{f.role}</p>
                <span className="mt-3 inline-flex items-center gap-2 font-label-bold text-label-bold text-on-background uppercase tracking-wider group-hover:text-secondary transition-colors duration-200">
                  Read biography <ArrowRight size={14} />
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section id="testimonials">
        <header className="max-w-3xl mb-12">
          <p className="font-label-bold text-label-bold text-secondary uppercase tracking-[0.12em] mb-3">What alumni say</p>
          <h2 className="font-headline-md text-headline-md text-on-background">Outcomes, not just attendance</h2>
        </header>
        <div className="grid md:grid-cols-2 gap-6">
          {course.testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`rounded-xl p-8 md:p-10 border ${
                i % 2 === 0
                  ? 'bg-primary-container text-on-primary border-transparent'
                  : 'bg-surface-container-lowest border-outline-variant'
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <Quote size={28} className={i % 2 === 0 ? 'text-on-primary/60' : 'text-secondary/40'} />
                <span className={`w-10 h-10 rounded-full flex items-center justify-center ${i % 2 === 0 ? 'bg-on-primary/10' : 'bg-secondary/10'}`}>
                  <PlayCircle size={20} className={i % 2 === 0 ? 'text-on-primary' : 'text-secondary'} />
                </span>
              </div>
              <p className={`font-body-lg text-body-lg leading-relaxed ${i % 2 === 0 ? 'text-on-primary' : 'text-on-surface-variant'}`}>
                “{t.quote}”
              </p>
              <div className="mt-8 flex items-center gap-4">
                <span
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-label-bold text-label-bold ${
                    i % 2 === 0 ? 'bg-on-primary/15 text-on-primary' : 'bg-secondary/10 text-secondary'
                  }`}
                >
                  {t.name.charAt(0)}
                </span>
                <div>
                  <p className={`font-label-bold text-label-bold uppercase tracking-wider ${i % 2 === 0 ? 'text-on-primary' : 'text-on-background'}`}>
                    {t.name}
                  </p>
                  <p className={`font-body-sm text-body-sm ${i % 2 === 0 ? 'text-on-primary/70' : 'text-on-surface-variant'}`}>{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {course.outcomes.map((outcome) => (
            <div key={outcome.label} className="bg-surface-container-low border border-outline-variant rounded-xl p-8 text-center">
              <p className="font-display-lg-mobile text-display-lg-mobile md:text-display-lg text-secondary font-bold">{outcome.value}</p>
              <p className="mt-2 font-body-md text-body-md text-on-surface-variant">{outcome.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Investment ===== */}
      <section id="investment">
        <header className="max-w-3xl mb-12">
          <p className="font-label-bold text-label-bold text-secondary uppercase tracking-[0.12em] mb-3">Investment</p>
          <h2 className="font-headline-md text-headline-md text-on-background">A decision your institution will feel for years</h2>
        </header>
        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-6 bg-surface-container-lowest border border-outline-variant rounded-2xl p-8 md:p-10 flex flex-col">
            <div className="flex items-center gap-3">
              <Users size={22} className="text-secondary" />
              <h3 className="font-headline-sm text-headline-sm text-on-background">Individual Track</h3>
            </div>
            <p className="mt-6 font-display-lg-mobile text-display-lg-mobile md:text-display-lg text-on-background">
              {course.tuition}
              <span className="font-body-sm text-body-sm text-on-surface-variant"> / candidate</span>
            </p>
            <ul className="mt-8 flex flex-col gap-3 flex-grow">
              {course.investment.individual.map((point) => (
                <li key={point} className="flex items-start gap-3 font-body-md text-body-md text-on-surface-variant">
                  <Check size={18} className="mt-0.5 text-secondary shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
            <Link
              to={`/courses/${course.slug}/enroll`}
              className="mt-10 font-label-bold text-label-bold bg-secondary text-on-primary px-6 py-4 rounded inline-flex items-center justify-center gap-2 uppercase tracking-wider hover:opacity-90 transition-opacity duration-200"
            >
              Apply as an individual <ArrowRight size={16} />
            </Link>
          </div>

          <div className="lg:col-span-6 bg-primary-container text-on-primary rounded-2xl p-8 md:p-10 flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Building2 size={22} className="text-on-primary" />
                <h3 className="font-headline-sm text-headline-sm text-on-primary">Institutional Track</h3>
              </div>
              <span className="font-label-bold text-label-bold bg-on-primary/15 text-on-primary px-3 py-1 rounded uppercase tracking-wider">
                2+ seats
              </span>
            </div>
            <p className="mt-6 font-display-lg-mobile text-display-lg-mobile md:text-display-lg text-on-primary">
              {institutionalTuition}
              <span className="font-body-sm text-body-sm text-on-primary/75"> / seat</span>
            </p>
            <ul className="mt-8 flex flex-col gap-3 flex-grow">
              {course.investment.institutional.map((point) => (
                <li key={point} className="flex items-start gap-3 font-body-md text-body-md text-on-primary/90">
                  <Check size={18} className="mt-0.5 text-on-primary shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowSponsorship(true)}
              className="mt-10 font-label-bold text-label-bold bg-on-primary text-primary px-6 py-4 rounded uppercase tracking-wider hover:opacity-90 transition-opacity duration-200"
            >
              Request a Group Quote
            </button>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq">
        <header className="mb-12">
          <p className="font-label-bold text-label-bold text-secondary uppercase tracking-[0.12em] mb-3">Frequently asked</p>
          <h2 className="font-headline-md text-headline-md text-on-background">Questions participants ask us</h2>
        </header>
        <Accordion
          items={course.faqs.map((f) => ({
            header: f.q,
            tag: 'FAQ',
            body: [f.a],
          }))}
        />
      </section>

      {/* ===== Final conversion banner ===== */}
      <section className="bg-[#121214] text-on-primary rounded-2xl overflow-hidden relative">
        <div className="absolute inset-0 bg-secondary/20" />
        <div className="relative px-8 md:px-16 py-14 md:py-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <div className="max-w-2xl">
            <p className="font-label-bold text-label-bold text-on-primary/70 uppercase tracking-[0.12em] mb-3">
              {course.finalEyebrow}
            </p>
            <h2 className="font-headline-md text-headline-md text-on-primary">{course.finalTitle}</h2>
            <p className="mt-4 font-body-lg text-body-lg text-on-primary/80">{course.finalBody}</p>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <Link
              to={`/courses/${course.slug}/enroll`}
              className="font-label-bold text-label-bold bg-on-primary text-primary px-8 py-4 rounded uppercase tracking-wider hover:opacity-90 transition-opacity duration-200"
            >
              Enroll Now <ArrowRight size={16} className="inline" />
            </Link>
            <a
              href="mailto:info@hlaafrica.org"
              className="font-label-bold text-label-bold text-on-primary border border-on-primary/40 px-8 py-4 rounded uppercase tracking-wider hover:bg-on-primary/10 transition-colors duration-200 inline-flex items-center"
            >
              Syllabus
            </a>
          </div>
        </div>
      </section>

      {/* ===== Modals & drawer ===== */}
      {showSponsorship && (
        <Modal title="Institutional sponsorship" eyebrow={course.title} onClose={() => setShowSponsorship(false)}>
          <div className="flex flex-col gap-6">
            <p className="font-body-md text-body-md text-on-surface-variant">
              Sponsoring a team is the fastest way to build a critical mass of leadership capability inside your institution.
              Your sponsorship expert will tailor a package around your goals.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: <Users size={20} />, label: 'Team tiers', detail: '2, 5 or 10 seats' },
                { icon: <BarChart2 size={20} />, label: 'Reporting', detail: 'HR & board dashboards' },
                { icon: <Lock size={20} />, label: 'Flexible terms', detail: 'Invoices & payment plans' },
              ].map((item) => (
                <div key={item.label} className="border border-outline-variant rounded-xl p-5 text-center">
                  <span className="text-secondary mx-auto">{item.icon}</span>
                  <p className="mt-3 font-label-bold text-label-bold text-on-background uppercase tracking-wider">{item.label}</p>
                  <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <Link
                to="/contact"
                onClick={() => setShowSponsorship(false)}
                className="font-label-bold text-label-bold bg-secondary text-on-primary px-6 py-3.5 rounded uppercase tracking-wider hover:opacity-90 transition-opacity duration-200"
              >
                Talk to a sponsorship expert
              </Link>
              <span className="font-body-sm text-body-sm text-on-surface-variant inline-flex items-center gap-2">
                <Mail size={16} /> admissions@hla.africa
              </span>
            </div>
          </div>
        </Modal>
      )}

      <FacultyDrawer person={selectedFaculty} onClose={() => setSelectedFaculty(null)} />
    </div>
  );
}