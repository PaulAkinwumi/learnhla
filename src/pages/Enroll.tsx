import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import { getCourseBySlug } from '@/data/courses';
import { countries } from '@/data/countries';
import { createEnrollment } from '@/lib/api';
import { errorMessage } from '@/lib/supabase';

const educationLevels = [
  'Doctorate / PhD',
  'Medical Fellowship / Professional Board Certification',
  'Master’s Degree',
  'Bachelor’s Degree',
  'Diploma / Higher National Diploma (HND) / Associate Degree',
  'High School / Secondary School',
  'Other',
];

const states = [
  'Abia State',
  'Adamawa State',
  'Akwa Ibom State',
  'Anambra State',
  'Bauchi State',
  'Bayelsa State',
  'Benue State',
  'Borno State',
  'Cross River State',
  'Delta State',
  'Ebonyi State',
  'Edo State',
  'Ekiti State',
  'Enugu State',
  'Federal Capital Territory (Abuja)',
  'Gombe State',
  'Imo State',
  'Jigawa State',
  'Kaduna State',
  'Kano State',
  'Katsina State',
  'Kebbi State',
  'Kogi State',
  'Kwara State',
  'Lagos State',
  'Nasarawa State',
  'Niger State',
  'Ogun State',
  'Ondo State',
  'Osun State',
  'Oyo State',
  'Plateau State',
  'Rivers State',
  'Sokoto State',
  'Taraba State',
  'Yobe State',
  'Zamfara State',
];

const referralSources = [
  'HLA Website',
  'LinkedIn',
  'WhatsApp',
  'Email Newsletter',
  'Word of Mouth',
  'Facebook',
  'Instagram',
  'Other Channel',
];

function Fieldset({ legend, children }: { legend: string; children: ReactNode }) {
  return (
    <fieldset className="hla-fieldset shadow-[0px_4px_20px_rgba(11,37,69,0.05)]">
      <legend className="hla-legend">{legend}</legend>
      {children}
    </fieldset>
  );
}

export default function EnrollPage() {
  const { slug } = useParams<{ slug: string }>();
  const course = getCourseBySlug(slug);
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!course) return;
    const prev = document.title;
    document.title = `${course.title} – Program Enrollment Form | HLA Africa`;
    return () => {
      document.title = prev;
    };
  }, [course]);

  if (!course) {
    return (
      <div className="flex-grow pt-[120px] pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full flex flex-col items-center gap-8 text-center">
        <ShieldCheck size={48} className="text-secondary" />
        <h1 className="font-headline-md text-headline-md text-on-background">This course could not be found.</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          It may have been moved or is no longer open for enrollment.
        </p>
        <Link
          to="/courses"
          className="font-label-bold text-label-bold bg-secondary text-on-primary px-8 py-3.5 rounded uppercase tracking-wider hover:opacity-90 transition-opacity duration-200"
        >
          Back to all courses
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const value = (key: string) => {
      const raw = data.get(key);
      return typeof raw === 'string' ? raw.trim() : '';
    };
    const phone = value('phone_number');

    setSubmitting(true);
    setSubmitError(null);
    try {
      await createEnrollment({
        course_slug: course.slug,
        course_title: course.title,
        first_name: value('first_name'),
        surname: value('surname'),
        other_name: value('other_name') || null,
        dob: value('dob') || null,
        gender: value('gender'),
        phone: phone ? (phone.startsWith('+') ? phone : `+234 ${phone}`) : '',
        email: value('email'),
        country: value('country'),
        state_region: value('state'),
        education_level: value('education_level'),
        organization: value('organization_name'),
        job_title: value('job_title'),
        responsibilities: value('current_responsibilities'),
        key_challenges: value('key_challenges'),
        goals: value('goals_objectives'),
        referral_source: value('referral_source'),
        certified: data.get('declaration') === 'on',
      });
      setSubmitted(true);
      window.scrollTo(0, 0);
    } catch (err) {
      setSubmitError(
        `${errorMessage(err)} Your answers are still on this page — please try submitting again.`,
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-grow pt-[120px] pb-24 px-margin-mobile md:px-margin-desktop w-full">
      <div className="max-w-5xl mx-auto">
        {/* Page Title */}
        <section className="mb-8">
          <Link
            to={`/courses/${course.slug}`}
            className="inline-flex items-center gap-2 font-label-bold text-label-bold text-secondary uppercase tracking-wider hover:opacity-80 transition-opacity duration-200 mb-6"
          >
            <ArrowLeft size={14} /> Back to course
          </Link>
          <h1 className="mt-4 font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-background uppercase">
            Program Enrollment Form
          </h1>
          <p className="font-body-md text-body-md font-medium text-on-surface-variant mt-1">{course.title}</p>
        </section>

        {submitted ? (
          /* ===== Confirmation ===== */
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-10 md:p-14 text-center">
            <span className="w-16 h-16 rounded-full bg-secondary/10 text-secondary flex items-center justify-center mx-auto">
              <CheckCircle2 size={32} />
            </span>
            <h2 className="mt-6 font-headline-md text-headline-md text-on-background">Enrollment received</h2>
            <p className="mt-3 font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto">
              Thank you for applying to <span className="font-semibold text-on-background">{course.title}</span>. Our
              admissions team will review your submission and respond to the email address you provided within a few
              working days.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to={`/courses/${course.slug}`}
                className="font-label-bold text-label-bold bg-secondary text-on-primary px-6 py-3.5 rounded uppercase tracking-wider hover:opacity-90 transition-opacity duration-200"
              >
                Return to course
              </Link>
              <Link
                to="/courses"
                className="font-label-bold text-label-bold text-on-background border border-outline-variant px-6 py-3.5 rounded uppercase tracking-wider hover:bg-surface-container-low transition-colors duration-200"
              >
                Browse more courses
              </Link>
            </div>
          </div>
        ) : (
          <form className="space-y-8" id="enrollment-form" onSubmit={handleSubmit}>
            {/* ===== Section 1: Personal Information ===== */}
            <Fieldset legend="Personal Information">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                <div>
                  <label className="hla-label" htmlFor="first-name">
                    First Name <span className="text-secondary">*</span>
                  </label>
                  <input
                    className="hla-input w-full px-3 py-2"
                    id="first-name"
                    name="first_name"
                    placeholder="Enter First Name"
                    type="text"
                    required
                  />
                </div>
                <div>
                  <label className="hla-label" htmlFor="surname">
                    Surname <span className="text-secondary">*</span>
                  </label>
                  <input
                    className="hla-input w-full px-3 py-2"
                    id="surname"
                    name="surname"
                    placeholder="Enter Surname"
                    type="text"
                    required
                  />
                </div>
                <div>
                  <label className="hla-label" htmlFor="other-name">
                    Other Name <span className="text-xs font-normal text-outline italic">(optional)</span>
                  </label>
                  <input
                    className="hla-input w-full px-3 py-2"
                    id="other-name"
                    name="other_name"
                    placeholder="Enter Other Name"
                    type="text"
                  />
                </div>
                <div>
                  <label className="hla-label" htmlFor="dob">
                    Date Of Birth <span className="text-secondary">*</span>
                  </label>
                  <input className="hla-input w-full px-3 py-2" id="dob" name="dob" type="date" required />
                </div>
                <div>
                  <label className="hla-label" htmlFor="gender">
                    Gender <span className="text-secondary">*</span>
                  </label>
                  <select className="hla-input hla-select w-full px-3 py-2" id="gender" name="gender" defaultValue="" required>
                    <option disabled value="">
                      -- Select Gender --
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="prefer_not_to_say">Prefer not to say</option>
                  </select>
                </div>
                <div>
                  <label className="hla-label" htmlFor="phone-number">
                    Phone Number <span className="text-secondary">*</span>
                  </label>
                  <div className="flex">
                    <div className="inline-flex items-center px-2.5 border border-r-0 border-[#CFD5DE] bg-gray-50 rounded-l text-xs font-semibold text-gray-700 gap-1.5 select-none">
                      <span className="inline-block w-4 h-3 bg-emerald-600 rounded-[1px] relative overflow-hidden flex-shrink-0">
                        <span className="absolute inset-y-0 left-1.5 right-1.5 bg-white" />
                      </span>
                      <span>+234</span>
                    </div>
                    <input
                      className="hla-input w-full px-3 py-2 rounded-l-none border-l-0"
                      id="phone-number"
                      name="phone_number"
                      placeholder="Phone number"
                      type="tel"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="hla-label" htmlFor="email">
                    Email <span className="text-secondary">*</span>
                  </label>
                  <input
                    className="hla-input w-full px-3 py-2"
                    id="email"
                    name="email"
                    placeholder="Enter Email"
                    type="email"
                    required
                  />
                </div>
                <div>
                  <label className="hla-label" htmlFor="country">
                    Country of Residence <span className="text-secondary">*</span>
                  </label>
                  <select
                    className="hla-input hla-select w-full px-3 py-2"
                    id="country"
                    name="country"
                    defaultValue="NIGERIA"
                    required
                  >
                    {countries.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="hla-label" htmlFor="state">
                    State / Region <span className="text-secondary">*</span>
                  </label>
                  <select className="hla-input hla-select w-full px-3 py-2" id="state" name="state" defaultValue="" required>
                    <option disabled value="">
                      -- Select State / Region --
                    </option>
                    {states.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                    <option value="Other">Other Region / International</option>
                  </select>
                </div>
              </div>
            </Fieldset>

            {/* ===== Section 2: Professional Information ===== */}
            <Fieldset legend="Professional Information">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 mb-6">
                <div>
                  <label className="hla-label" htmlFor="education-level">
                    Highest Education Level <span className="text-secondary">*</span>
                  </label>
                  <select
                    className="hla-input hla-select w-full px-3 py-2"
                    id="education-level"
                    name="education_level"
                    defaultValue=""
                    required
                  >
                    <option disabled value="">
                      -- Select Highest Level --
                    </option>
                    {educationLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="hla-label" htmlFor="organization-name">
                    Facility / Organization Name <span className="text-secondary">*</span>
                  </label>
                  <input
                    className="hla-input w-full px-3 py-2"
                    id="organization-name"
                    name="organization_name"
                    placeholder="e.g. Lagos University Teaching Hospital"
                    type="text"
                    required
                  />
                </div>
                <div>
                  <label className="hla-label" htmlFor="job-title">
                    Job Title / Current Role <span className="text-secondary">*</span>
                  </label>
                  <input
                    className="hla-input w-full px-3 py-2"
                    id="job-title"
                    name="job_title"
                    placeholder="e.g. Chief Medical Director, Head of Ops"
                    type="text"
                    required
                  />
                </div>
              </div>

              <div className="space-y-5 border-t border-outline-variant pt-5">
                <div>
                  <label className="hla-label" htmlFor="current-responsibilities">
                    Describe your current responsibilities <span className="text-secondary">*</span>
                  </label>
                  <textarea
                    className="hla-input w-full p-3 resize-y"
                    id="current-responsibilities"
                    name="current_responsibilities"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="hla-label" htmlFor="key-challenges">
                    What are 2 key challenges you face in handling your current responsibilities?{' '}
                    <span className="text-secondary">*</span>
                  </label>
                  <textarea
                    className="hla-input w-full p-3 resize-y"
                    id="key-challenges"
                    name="key_challenges"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="hla-label" htmlFor="goals-objectives">
                    What are your goals and objectives for attending this programme?{' '}
                    <span className="text-secondary">*</span>
                  </label>
                  <p className="text-xs text-outline mb-2">
                    What specifically are you or your organization hoping to achieve from this training?
                  </p>
                  <textarea
                    className="hla-input w-full p-3 resize-y"
                    id="goals-objectives"
                    name="goals_objectives"
                    rows={4}
                    required
                  />
                </div>
              </div>
            </Fieldset>

            {/* ===== Section 3: Referral & Certification ===== */}
            <Fieldset legend="Referral & Certification">
              <div className="space-y-6 pt-1">
                <div>
                  <label className="hla-label mb-2.5">
                    How did you learn about this programme? <span className="text-secondary">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {referralSources.map((source, i) => (
                      <label
                        key={source}
                        className="flex items-center p-2.5 border border-outline-variant rounded cursor-pointer hover:bg-surface-container-low transition-colors"
                      >
                        <input
                          className="h-4 w-4 text-secondary focus:ring-secondary border-outline-variant"
                          name="referral_source"
                          type="radio"
                          value={source}
                          required={i === 0}
                        />
                        <span className="ml-2.5 text-xs font-semibold text-on-surface">{source}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="border-t border-outline-variant pt-5">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        className="h-4 w-4 text-secondary focus:ring-secondary border-outline-variant rounded cursor-pointer"
                        id="certification-declaration"
                        name="declaration"
                        type="checkbox"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        className="font-medium text-on-surface cursor-pointer select-none leading-relaxed"
                        htmlFor="certification-declaration"
                      >
                        I certify that the information provided is authentic and accurate and my registration may be
                        voided if the information provided is not so.
                      </label>
                      <p className="text-xs text-outline mt-0.5">
                        By submitting, you agree to HLA Africa’s{' '}
                        <Link to="/privacy" className="text-secondary font-semibold underline hover:opacity-80">
                          Privacy Policy
                        </Link>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Fieldset>

            {/* ===== Action Buttons ===== */}
            <div className="pt-4 pb-8 flex flex-col items-center gap-4">
              {submitError && (
                <p className="inline-flex items-start gap-2 max-w-xl border border-red-300 bg-red-50 text-red-800 rounded-lg px-4 py-3 font-body-sm text-body-sm text-center sm:text-left">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  {submitError}
                </p>
              )}
              <div className="flex items-center justify-center gap-3.5">
                <button
                  type="button"
                  onClick={() => navigate(`/courses/${course.slug}`)}
                  className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-on-primary bg-on-surface hover:opacity-90 active:opacity-80 rounded transition-opacity shadow-sm focus:outline-none focus:ring-2 focus:ring-on-surface focus:ring-offset-2"
                >
                  <ArrowLeft size={16} className="mr-1.5" />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center px-7 py-2.5 text-sm font-bold tracking-wide text-on-primary bg-secondary hover:opacity-90 active:opacity-80 rounded transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span>{submitting ? 'Submitting…' : 'Complete Enrollment'}</span>
                  <ArrowRight size={16} className="ml-2" />
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
