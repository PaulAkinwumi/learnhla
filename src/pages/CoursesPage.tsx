import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Laptop, School, MapPin, ArrowRight, Search } from 'lucide-react';
import { courses, type DurationIcon } from '@/data/courses';

const levelOptions = [
  { value: 'all', label: 'All Levels' },
  { value: 'frontline', label: 'Frontline Clinicians' },
  { value: 'finance', label: 'Finance Professionals' },
  { value: 'board', label: 'Board and Senior Executives' },
  { value: 'exec', label: 'Management and Senior Executives' },
  { value: 'mid', label: 'Middle and Senior Professionals' },
  { value: 'professionals', label: 'Professionals' },
];

const deliveryOptions = [
  { value: 'all', label: 'All Formats' },
  { value: 'hybrid', label: 'Blended Online' },
  { value: 'online', label: 'Self-Paced Online' },
];

function DurationIcon({ type }: { type: DurationIcon }) {
  switch (type) {
    case 'laptop':
      return <Laptop size={18} className="text-outline" />;
    case 'school':
      return <School size={18} className="text-outline" />;
    case 'map':
      return <MapPin size={18} className="text-outline" />;
    default:
      return <Clock size={18} className="text-outline" />;
  }
}

export default function CoursesPage() {
  const [level, setLevel] = useState('all');
  const [delivery, setDelivery] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchesLevel = level === 'all' || c.categoryValue === level;
      const matchesDelivery = delivery === 'all' || c.formatValue === delivery;
      const matchesSearch =
        search === '' ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase());
      return matchesLevel && matchesDelivery && matchesSearch;
    });
  }, [level, delivery, search]);

  return (
    <div className="flex-grow pt-[120px] pb-24 px-margin-mobile md:px-margin-desktop w-full flex flex-col gap-[80px]">
      {/* Page Header */}
      <section className="max-w-3xl">
        <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-background mb-6">
          World-Class Healthcare Leadership Education
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Elevate your practice and institutional impact with our rigorous, continent-focused curriculum designed for
          the modern African healthcare leader.
        </p>
      </section>

      {/* Sticky Filter Bar */}
      <section className="sticky top-[80px] z-40 bg-background/95 backdrop-blur-md py-4 border-b border-surface-variant -mx-margin-mobile md:-mx-margin-desktop px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-4 items-center w-full md:w-auto">
            <span className="font-label-bold text-label-bold text-outline uppercase tracking-wider">Level:</span>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="bg-surface border border-outline-variant text-on-surface rounded py-2 px-4 focus:ring-secondary focus:border-secondary font-body-sm text-body-sm outline-none"
            >
              {levelOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <span className="font-label-bold text-label-bold text-outline uppercase tracking-wider ml-0 md:ml-4">
              Delivery:
            </span>
            <select
              value={delivery}
              onChange={(e) => setDelivery(e.target.value)}
              className="bg-surface border border-outline-variant text-on-surface rounded py-2 px-4 focus:ring-secondary focus:border-secondary font-body-sm text-body-sm outline-none"
            >
              {deliveryOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-auto relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses..."
              className="w-full md:w-64 bg-surface border border-outline-variant text-on-surface rounded py-2 pl-10 pr-4 focus:ring-secondary focus:border-secondary font-body-sm text-body-sm outline-none"
            />
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {filtered.map((course) => (
          <Link
            key={course.id}
            to={`/courses/${course.slug}`}
            className="block bg-surface-container-lowest border border-surface-variant rounded overflow-hidden hover:shadow-[0px_4px_20px_rgba(11,37,69,0.05)] transition-all duration-300 group flex flex-col h-full cursor-pointer"
          >
            <div className="relative aspect-video w-full overflow-hidden">
              <img
                src={course.image}
                alt={course.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {course.status === 'selfpaced' && (
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
              )}
              <div
                className={`absolute top-4 right-4 font-label-bold text-label-bold px-3 py-1 rounded uppercase tracking-wide ${
                  course.status === 'enrolling'
                    ? 'bg-secondary text-on-secondary'
                    : 'bg-surface-variant text-on-surface'
                }`}
              >
                {course.statusLabel}
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <span className="font-label-bold text-label-bold text-secondary uppercase tracking-wider mb-2">
                {course.category}
              </span>
              <h3 className="font-headline-sm text-headline-sm text-on-background mb-3 leading-tight">
                {course.title}
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-6 line-clamp-3">
                {course.description}
              </p>
              <div className="mt-auto border-t border-surface-variant pt-4 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
                  <DurationIcon type={course.durationIcon} />
                  <span>{course.listingDuration}</span>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
                  <DurationIcon type={course.formatValue === 'online' ? 'laptop' : course.formatValue === 'hybrid' ? 'school' : 'map'} />
                  <span>{course.listingFormat}</span>
                </div>
              </div>
              <div className="mt-6 flex justify-end items-center">
                <span className="font-label-bold text-label-bold text-secondary flex items-center gap-1 group-hover:gap-2 transition-all">
                  {course.cta} <ArrowRight size={16} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            No courses match your filters. Try adjusting your search.
          </p>
        </div>
      )}
    </div>
  );
}
