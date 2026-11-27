import { useState } from 'react';
import {
  ArrowRight,
  GraduationCap,
  Network,
  Handshake,
  BarChart3,
  CheckCircle,
  Send,
} from 'lucide-react';

const modules = [
  {
    icon: GraduationCap,
    title: 'Capacity Development',
    desc: 'Customized training programs designed to upskill healthcare workforces at scale. We develop curricula tailored to specific institutional needs, focusing on leadership, operational efficiency, and clinical management.',
    span: 'md:col-span-7',
  },
  {
    icon: Network,
    title: 'Programme Management',
    desc: 'End-to-end management of complex health interventions and policy rollouts. Ensuring timely delivery, budget adherence, and stakeholder alignment.',
    span: 'md:col-span-5',
  },
  {
    icon: Handshake,
    title: 'Strategic Advisory & Consulting',
    desc: 'Expert guidance for health system strengthening, organizational design, and operational efficiency improvements for public and private healthcare entities.',
    span: 'md:col-span-5',
  },
  {
    icon: BarChart3,
    title: 'Research, Monitoring & Evaluation',
    desc: 'Rigorous evaluation frameworks and data-driven insights to measure impact, optimize ongoing programs, and guide future health policy decisions.',
    span: 'md:col-span-7',
  },
];

const benefits = [
  'Initial Consultation (Complimentary)',
  'Needs Assessment Proposal',
  'Custom Curriculum Design',
];

export default function ServicesPage() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    orgType: '',
    budget: '',
    scope: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  return (
    <div className="w-full flex-grow pt-32 pb-24 px-margin-mobile md:px-margin-desktop">
      {/* Hero Section */}
      <section className="mb-24 grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
        <div className="md:col-span-7 space-y-6">
          <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-background">
            Institutional Services &amp; Advisory
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Strengthening healthcare systems through tailored advisory, research, and capacity development across the
            African continent. We bridge the gap between academic rigor and practical healthcare delivery.
          </p>
          <div className="pt-4 flex flex-wrap gap-4">
            <a
              href="#intake-form"
              className="bg-primary text-on-primary font-label-bold text-label-bold px-8 py-3 rounded inline-flex items-center gap-2"
            >
              Request a Consultation
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
        <div className="md:col-span-5 mt-10 md:mt-0 relative">
          <div className="w-full h-80 rounded-lg overflow-hidden border border-outline-variant relative">
            <img
              src="https://images.pexels.com/photos/7433847/pexels-photo-7433847.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              alt="Healthcare executives in a strategic boardroom meeting"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="mb-32">
        <div className="flex items-center gap-4 mb-10 border-b border-outline-variant pb-4 flex-wrap">
          <span className="font-label-bold text-label-bold text-secondary uppercase tracking-widest">
            Our Expertise
          </span>
          <h2 className="font-headline-md text-headline-md text-on-background">Core Advisory Modules</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {modules.map((m) => (
            <div
              key={m.title}
              className={`${m.span} bg-surface rounded border border-outline-variant p-8 hover:shadow-lg transition-shadow duration-300 group cursor-pointer relative overflow-hidden`}
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-transparent group-hover:bg-secondary transition-colors duration-300" />
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-surface-container-high rounded text-secondary">
                  <m.icon size={28} />
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-background mb-2">{m.title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">{m.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Intake Form */}
      <section
        className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm relative"
        id="intake-form"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-secondary" />
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-10 lg:p-16 bg-surface-container-low flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-outline-variant">
            <h2 className="font-headline-md text-headline-md text-on-background mb-4">
              Need a tailored training program for your ministry, hospital, or NGO?
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-8">
              Our advisory team is ready to collaborate. Provide some initial details about your organizational needs,
              and a senior consultant will reach out to discuss a bespoke solution.
            </p>
            <ul className="space-y-4">
              {benefits.map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-3 font-body-sm text-body-sm text-on-surface-variant"
                >
                  <CheckCircle size={20} className="text-secondary" /> {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-10 lg:p-16">
            <form className="space-y-6">
              <div className="flex items-center mb-8 space-x-2">
                <div className="h-2 flex-1 bg-secondary rounded-full" />
                <div className="h-2 flex-1 bg-surface-container-highest rounded-full" />
                <div className="h-2 flex-1 bg-surface-container-highest rounded-full" />
              </div>
              <div>
                <label className="block font-label-bold text-label-bold text-primary mb-2" htmlFor="fullName">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Dr. Jane Doe"
                  value={form.fullName}
                  onChange={handleChange}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors font-body-md text-on-surface"
                />
              </div>
              <div>
                <label className="block font-label-bold text-label-bold text-primary mb-2" htmlFor="email">
                  Professional Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="jane.doe@institution.org"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors font-body-md text-on-surface"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-label-bold text-label-bold text-primary mb-2" htmlFor="orgType">
                    Organization Type
                  </label>
                  <select
                    id="orgType"
                    value={form.orgType}
                    onChange={handleChange}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors font-body-md text-on-surface"
                  >
                    <option value="" disabled>
                      Select Type
                    </option>
                    <option value="ministry">Government Ministry</option>
                    <option value="hospital">Hospital/Clinic Network</option>
                    <option value="ngo">NGO / Non-Profit</option>
                    <option value="academic">Academic Institution</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label-bold text-label-bold text-primary mb-2" htmlFor="budget">
                    Estimated Budget Range
                  </label>
                  <select
                    id="budget"
                    value={form.budget}
                    onChange={handleChange}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors font-body-md text-on-surface"
                  >
                    <option value="" disabled>
                      Select Range
                    </option>
                    <option value="tier1">Under $50,000</option>
                    <option value="tier2">$50,000 - $150,000</option>
                    <option value="tier3">$150,000 - $500,000</option>
                    <option value="tier4">$500,000+</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-label-bold text-label-bold text-primary mb-2" htmlFor="scope">
                  Brief Scope of Need
                </label>
                <textarea
                  id="scope"
                  rows={4}
                  placeholder="Describe the challenges you are facing or the specific training required..."
                  value={form.scope}
                  onChange={handleChange}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors font-body-md text-on-surface resize-none"
                />
              </div>
              <button
                type="button"
                className="w-full bg-primary text-on-primary hover:bg-primary-container font-label-bold text-label-bold px-6 py-4 rounded transition-colors duration-200 mt-4 flex items-center justify-center gap-2"
              >
                Submit Inquiry Request
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
