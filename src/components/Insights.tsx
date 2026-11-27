import { Play, FileText, FileBarChart, FileSpreadsheet, Download, ArrowUpRight } from 'lucide-react';

const briefs = [
  {
    icon: FileText,
    title: 'The Power of Collaboration',
    type: 'Policy Brief • 1.2 MB',
  },
  {
    icon: FileBarChart,
    title: 'Understanding and Leveraging Health Financing for Systems Strengthening.',
    type: 'Working Paper • 3.4 MB',
  },
  {
    icon: FileSpreadsheet,
    title: 'Leveraging Technology for Optimizing Business Performance in Healthcare',
    type: 'Case Study • 2.1 MB',
  },
];

export default function Insights() {
  return (
    <section
      id="insights"
      className="w-full px-margin-mobile md:px-margin-desktop py-24 bg-background"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h2 className="font-headline-md text-headline-md text-on-background mb-4">Resources &amp; Insights</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
            Latest research, policy briefs, and expert discussions shaping the future of African healthcare.
          </p>
        </div>
        <a
          className="hidden md:flex items-center gap-2 font-label-bold text-label-bold text-primary whitespace-nowrap"
          href="#"
        >
          View All Resources <ArrowUpRight size={16} />
        </a>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl border border-surface-container-highest overflow-hidden shadow-sm flex flex-col sm:flex-row group cursor-pointer">
          <div className="sm:w-2/5 relative">
            <img
              src="https://images.pexels.com/photos/8369683/pexels-photo-8369683.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              alt="Professional webinar presentation"
              className="bg-cover bg-center w-full h-full min-h-[200px] object-cover"
            />
            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <Play size={56} className="text-white bg-black/40 rounded-full p-2 backdrop-blur-sm" fill="white" />
            </div>
            <div className="absolute top-4 left-4 bg-primary text-white font-label-bold text-label-bold px-2 py-1 rounded text-xs">
              Featured Webinar
            </div>
          </div>
          <div className="p-8 sm:w-3/5 flex flex-col justify-center">
            <span className="font-label-bold text-label-bold text-outline mb-2">Recorded August 30, 2025</span>
            <h3 className="font-headline-sm text-headline-sm text-on-background mb-4">
              The Role of Effective Board Governance in Building a Stronger Healthcare System | WEBINAR SERIES
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-6 line-clamp-2">
              The webinar emphasised how crucial effective board governance is in driving healthcare sustainability
              and quality…
            </p>
            <span className="font-label-bold text-label-bold text-primary flex items-center gap-1 mt-auto">
              Watch Recording <ArrowUpRight size={14} />
            </span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl border border-surface-container-highest p-6 shadow-sm flex flex-col">
          <h4 className="font-headline-sm text-headline-sm text-on-background mb-6 border-b border-surface-container-highest pb-4">
            Latest Policy Briefs
          </h4>
          <div className="space-y-6 flex-grow">
            {briefs.map((b) => (
              <div key={b.title} className="group flex gap-4 cursor-pointer">
                <div className="flex-shrink-0 mt-1">
                  <b.icon className="text-primary" size={22} />
                </div>
                <div>
                  <h5 className="font-label-bold text-label-bold text-on-background leading-tight mb-1">
                    {b.title}
                  </h5>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-xs mb-2">{b.type}</p>
                  <span className="font-label-bold text-label-bold text-primary text-xs flex items-center gap-1">
                    Download <Download size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
