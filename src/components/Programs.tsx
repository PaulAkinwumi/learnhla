import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const programs = [
  {
    badge: 'PCC',
    audience: 'Clinical Professionals',
    duration: '4 Weeks | Hybrid',
    title: 'Patient-Centered Care',
    slug: 'patient-centered-care',
    image:
      'https://images.pexels.com/photos/39192368/pexels-photo-39192368.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Doctor holding a tablet in a modern clinic',
  },
  {
    badge: 'HFM',
    audience: 'Finance Professionals',
    duration: '3 Weeks | Hybrid',
    title: 'Healthcare Financial Management',
    slug: 'healthcare-financial-management',
    image:
      'https://images.pexels.com/photos/6801639/pexels-photo-6801639.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Financial data analysis dashboard',
  },
  {
    badge: 'HBGP',
    audience: 'Senior Executives',
    duration: '2 Weeks | Hybrid',
    title: 'Health Board Governance Programme',
    slug: 'health-board-governance-programme',
    image:
      'https://images.pexels.com/photos/7433847/pexels-photo-7433847.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Board meeting of healthcare policy makers',
  },
  {
    badge: 'HELP',
    audience: 'Senior Executives',
    duration: '4 Weeks | Hybrid',
    title: 'Healthcare Executive Leadership Programme',
    slug: 'healthcare-executive-leadership-programme',
    image:
      'https://images.pexels.com/photos/5452233/pexels-photo-5452233.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Senior healthcare executive reviewing strategic documents',
  },
  {
    badge: 'SSLD',
    audience: 'Middle & Senior Professionals',
    duration: '3 Weeks | Online',
    title: 'Self-Mastery Skills and Leadership Development',
    slug: 'self-mastery-skills-and-leadership-development',
    image:
      'https://images.pexels.com/photos/5407212/pexels-photo-5407212.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Healthcare professional examining an X-ray on a tablet',
  },
  {
    badge: 'DWS',
    audience: 'Professionals',
    duration: '2 Weeks | Online',
    title: 'Dealing With Stress',
    slug: 'dealing-with-stress',
    image:
      'https://images.pexels.com/photos/11198232/pexels-photo-11198232.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Hospital vital signs monitor with medical readings',
  },
  {
    badge: 'EMW',
    audience: 'Professionals',
    duration: '2 Weeks | Online',
    title: 'Effectively Managing Workload under Hectic Conditions',
    slug: 'effectively-managing-workload-under-hectic-conditions',
    image:
      'https://images.pexels.com/photos/8413323/pexels-photo-8413323.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Medical professional reviewing a scan',
  },
  {
    badge: 'LEAP',
    audience: 'Senior Executives',
    duration: '8 Weeks | Online',
    title: 'Leadership Enhancement and Accountability for the Public Sector',
    slug: 'leadership-enhancement-and-accountability-for-the-public-sector',
    image:
      'https://images.pexels.com/photos/6949931/pexels-photo-6949931.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Healthcare leadership seminar in Africa',
  },
];

export default function Programs() {
  return (
    <section id="programs" className="w-full px-margin-mobile md:px-margin-desktop py-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h2 className="font-headline-md text-headline-md text-on-background mb-4">Our Programs</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
            Rigorous academic curricula designed specifically for the complex challenges of African health systems.
          </p>
        </div>
        <Link
          className="hidden md:flex items-center gap-2 font-label-bold text-label-bold text-primary whitespace-nowrap"
          to="/courses"
        >
          View All Programs <ArrowUpRight size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {programs.map((p) => (
          <Link
            key={p.badge}
            to={`/courses/${p.slug}`}
            className="bg-surface-container-lowest border border-surface-container-highest rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 group flex flex-col h-full cursor-pointer"
          >
            <div className="h-48 relative overflow-hidden">
              <img
                src={p.image}
                alt={p.alt}
                className="bg-cover bg-center w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-primary text-white font-label-bold text-label-bold px-2 py-1 rounded">
                {p.badge}
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="font-label-bold text-label-bold text-primary bg-primary/10 px-2 py-1 rounded">
                  {p.audience}
                </span>
                <span className="font-label-bold text-label-bold text-outline">•</span>
                <span className="font-label-bold text-label-bold text-outline">{p.duration}</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-background mb-4 flex-grow">
                {p.title}
              </h3>
              <div className="flex items-center justify-between pt-4 border-t border-surface-container-highest mt-auto">
                <span className="font-label-bold text-label-bold text-primary">View Syllabus &amp; Apply</span>
                <ArrowRight size={18} className="text-primary group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
