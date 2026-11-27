import { useState, type FormEvent } from 'react';
import { ArrowRight, Building2, CheckCircle2, Phone } from 'lucide-react';
import { createInquiry } from '@/lib/api';
import { errorMessage } from '@/lib/supabase';

const inquiryTypes = [
  { value: 'partnerships', label: 'Institutional Partnerships' },
  { value: 'admissions', label: 'Course Admissions' },
  { value: 'media', label: 'Media & Press' },
  { value: 'general', label: 'General Inquiries' },
];

export default function ContactPage() {
  const [inquiryType, setInquiryType] = useState('partnerships');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const value = (key: string) => {
      const raw = data.get(key);
      return typeof raw === 'string' ? raw.trim() : '';
    };

    setSubmitting(true);
    setSubmitError(null);
    try {
      await createInquiry({
        inquiry_type: value('inquiry_type'),
        full_name: value('name'),
        organization: value('organization') || null,
        email: value('email'),
        subject: value('subject') || null,
        message: value('message'),
      });
      form.reset();
      setSubmitted(true);
      window.scrollTo(0, 0);
    } catch (err) {
      setSubmitError(
        `${errorMessage(err)} Your message is still on this page — please try submitting again.`,
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="pt-24 md:pt-32 pb-20 px-margin-mobile md:px-margin-desktop">
      {/* Hero Section */}
      <section className="mb-20 text-center md:text-left grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
        <div>
          <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary mb-6">
            Get in Touch
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Facilitating global collaboration in healthcare leadership. Connect with our institutional hubs across Africa
            to advance clinical excellence and strategic partnerships.
          </p>
        </div>
        <div className="hidden md:block relative h-64 w-full rounded-lg overflow-hidden border border-outline-variant">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTpm_-YX9GLGRiafxGkTRRcK4UI92yipISJzL15dkXIjwolA-lwRW_oUdTMKtTnhdwP6N07hX8hERkLiS7_57SEw6PgokPtUfnS3TgCjHqNZL7bVH015P3p3g3BE3qpaoBgfV2Jpq69bUFB3ScPP5AQaxgpBEflv4r0dV28AC0rBoIKOGGJOAeovPpfVElQG2zmVO04AK0Kwbs_8lWfPpTNTdT-Jj5-dUubNVYCTvHCavTi14pjoPiyg"
            alt="A modern medical administration office in Africa"
            className="object-cover w-full h-full"
          />
        </div>
      </section>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Inquiry Form */}
        <div className="lg:col-span-8">
          <div className="bg-surface-container-lowest/95 backdrop-blur-md border border-outline-variant rounded-xl p-8 md:p-12 shadow-sm h-full">
            <h2 className="font-headline-md text-headline-md text-primary mb-8 border-b border-outline-variant pb-4">
              Inquiry Routing
            </h2>
            {submitted && (
              <div className="mb-8 flex items-start gap-3 border border-emerald-300 bg-emerald-50 text-emerald-900 rounded-lg px-4 py-3">
                <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                <p className="font-body-sm text-body-sm">
                  Your inquiry has been received. Our team will respond to the email you provided within a few working
                  days.
                </p>
              </div>
            )}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Inquiry Type Selector */}
              <div>
                <label className="block font-label-bold text-label-bold text-primary mb-2 uppercase tracking-wide">
                  Inquiry Type
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {inquiryTypes.map((type) => (
                    <label
                      key={type.value}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors group ${
                        inquiryType === type.value
                          ? 'border-secondary bg-surface-container-lowest'
                          : 'border-outline-variant hover:border-secondary bg-surface-container-lowest'
                      }`}
                    >
                      <input
                        type="radio"
                        name="inquiry_type"
                        value={type.value}
                        checked={inquiryType === type.value}
                        onChange={(e) => setInquiryType(e.target.value)}
                        className="text-secondary focus:ring-secondary mr-3 accent-secondary"
                      />
                      <span className="font-body-md text-body-md text-on-surface">
                        {type.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                <div>
                  <label className="block font-label-bold text-label-bold text-primary mb-2" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Dr. Jane Doe"
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded px-4 py-3 font-body-md text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-label-bold text-label-bold text-primary mb-2" htmlFor="organization">
                    Organization / Institution
                  </label>
                  <input
                    id="organization"
                    name="organization"
                    type="text"
                    placeholder="General Hospital"
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded px-4 py-3 font-body-md text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block font-label-bold text-label-bold text-primary mb-2" htmlFor="email">
                  Professional Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="director@institution.org"
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded px-4 py-3 font-body-md text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>

              <div>
                <label className="block font-label-bold text-label-bold text-primary mb-2" htmlFor="subject">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="Partnership Proposal for Q3"
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded px-4 py-3 font-body-md text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>

              <div>
                <label className="block font-label-bold text-label-bold text-primary mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Detail your inquiry here..."
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded px-4 py-3 font-body-md text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                />
              </div>

              <div className="pt-4">
                {submitError && (
                  <p className="mb-4 inline-flex items-start gap-2 max-w-xl border border-red-300 bg-red-50 text-red-800 rounded-lg px-4 py-3 font-body-sm text-body-sm">
                    {submitError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center font-label-bold text-label-bold text-on-primary bg-primary px-8 py-4 rounded hover:bg-primary-container transition-colors w-full md:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Submitting…' : 'Submit Inquiry'}
                  <ArrowRight size={18} className="ml-2" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Side Section: Hubs & Global Reach */}
        <div className="lg:col-span-4 flex flex-col gap-gutter">
          {/* Our Hubs */}
          <div className="bg-surface-container rounded-xl p-8 border border-outline-variant flex-grow">
            <h3 className="font-headline-sm text-headline-sm text-primary mb-6 flex items-center">
              <Building2 size={24} className="mr-2" />
              Our Hubs
            </h3>
            <div className="space-y-6">
              <div className="border-l-4 border-secondary pl-4">
                <h4 className="font-label-bold text-label-bold text-secondary uppercase mb-1">Headquarters</h4>
                <p className="font-body-md text-body-md text-on-surface font-semibold">Lagos, Nigeria</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  12 Healthcare Avenue,
                  <br />
                  Victoria Island, Lagos
                </p>
                <a
                  href="mailto:hq@hlaafrica.org"
                  className="font-body-sm text-body-sm text-secondary mt-2 inline-block"
                >
                  hq@hlaafrica.org
                </a>
              </div>
              <div className="border-l-4 border-surface-tint pl-4">
                <h4 className="font-label-bold text-label-bold text-surface-tint uppercase mb-1">Regional Office</h4>
                <p className="font-body-md text-body-md text-on-surface font-semibold">Nairobi, Kenya</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  45 Clinical Heights,
                  <br />
                  Westlands, Nairobi
                </p>
                <a
                  href="mailto:ea@hlaafrica.org"
                  className="font-body-sm text-body-sm text-surface-tint mt-2 inline-block"
                >
                  ea@hlaafrica.org
                </a>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-outline-variant">
              <p className="font-label-bold text-label-bold text-on-surface-variant mb-2 uppercase">General Support</p>
              <p className="font-body-md text-body-md text-primary font-semibold flex items-center">
                <Phone size={18} className="mr-2" />
                +234 (0) 1 234 5678
              </p>
            </div>
          </div>

          {/* Global Reach Visual */}
          <div className="bg-primary rounded-xl p-6 relative overflow-hidden h-64 flex flex-col justify-end">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle at center, #e6e8ea 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />
            <div className="absolute top-4 right-4 bg-secondary text-on-secondary font-label-bold text-label-bold px-3 py-1 rounded-full z-10">
              Pan-African Network
            </div>
            <div className="relative z-10">
              <h4 className="font-headline-sm text-headline-sm text-on-primary mb-2">Continental Impact</h4>
              <p className="font-body-sm text-body-sm text-primary-fixed-dim">
                Connecting healthcare leaders across 15+ African nations to foster clinical excellence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
