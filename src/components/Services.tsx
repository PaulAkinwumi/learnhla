import { GraduationCap, Network, FileText, BarChart3 } from 'lucide-react';

const services = [
  {
    icon: GraduationCap,
    title: 'Capacity Development',
    desc: 'We design and deliver a menu of context-specific leadership, management and quality improvement programmes to all cadres and disciplines of health professionals',
  },
  {
    icon: Network,
    title: 'Programme Management',
    desc: 'We astutely manage relationships with, and the performance of, diverse stakeholder groups to deliver results on health projects',
  },
  {
    icon: FileText,
    title: 'Consulting',
    desc: 'HLA designs and delivers a myriad of leadership training solutions based on the unique needs of your organisation ranging from short courses to executive education programmes',
  },
  {
    icon: BarChart3,
    title: 'Research, Monitoring and Evaluation',
    desc: 'We conduct independent research across various domains including leadership and public health epidemiology, and support projects from inception and baseline needs assessments to impact evaluations',
  },
];

const stats = [
  { value: '1,000+', label: 'Healthcare Professionals Trained' },
  { value: '10', label: 'Countries Reached' },
  { value: '50+', label: 'Health Facilities Impacted' },
];

export default function Services() {
  return (
    <section id="services" className="charcoal-scheme bg-primary text-white py-24">
      <div className="w-full px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div>
            <h2 className="font-headline-md text-headline-md mb-4 text-white">Our Services</h2>
            <p className="font-body-md text-body-md text-surface-container-highest max-w-xl">
              Tailored advisory and implementation support for health systems, governments, and private sector organizations.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((s) => (
              <div
                key={s.title}
                className="bg-primary-container p-6 rounded border border-white/10 hover:border-secondary transition-colors cursor-pointer group"
              >
                <s.icon className="text-white mb-4" size={28} />
                <h3 className="font-headline-sm text-headline-sm text-white mb-2">
                  {s.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-primary-container">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-4 bg-primary-container rounded-xl p-8 border border-white/10 flex flex-col justify-center gap-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
          <div className="relative">
            <h4 className="font-label-bold text-label-bold text-white uppercase tracking-widest mb-2">
              Our Impact
            </h4>
            <p className="font-body-md text-body-md text-surface-container-highest">
              Measurable outcomes across the continent.
            </p>
          </div>
          <div className="space-y-8 relative">
            {stats.map((stat) => (
              <div key={stat.label} className="border-l-4 border-secondary pl-6">
                <div className="font-display-lg text-display-lg text-white mb-1">{stat.value}</div>
                <div className="font-label-bold text-label-bold text-white uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
