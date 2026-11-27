import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  ClipboardList,
  FileText,
  FolderOpen,
  Lightbulb,
  MessagesSquare,
  MonitorPlay,
} from 'lucide-react';
import { useCounts, useTable } from '@/lib/useTable';
import type { Enrollment } from '@/lib/api';
import {
  EmptyState,
  ErrorBanner,
  LoadingRows,
  MetricCard,
  MetricsGrid,
  SectionHeader,
  SetupBanner,
} from '@/components/admin/ui';
import { formatDateTime } from '@/lib/format';

const sections = [
  {
    to: '/admin/enrollment',
    label: 'Enrollment',
    icon: ClipboardList,
    description: 'Participant registrations and program form submissions.',
    key: 'enrollments' as const,
  },
  {
    to: '/admin/webinars',
    label: 'Webinar',
    icon: MonitorPlay,
    description: 'Publish webinar sessions with YouTube covers.',
    key: 'webinars' as const,
  },
  {
    to: '/admin/publications',
    label: 'Publications',
    icon: FileText,
    description: 'Policy briefs, research papers and reports.',
    key: 'publications' as const,
  },
  {
    to: '/admin/insights',
    label: 'Insights',
    icon: Lightbulb,
    description: 'Thought-leadership articles and opinion posts.',
    key: 'insights' as const,
  },
  {
    to: '/admin/inquiries',
    label: 'Inquiries',
    icon: MessagesSquare,
    description: 'Contact us form submissions from the public site.',
    key: 'inquiries' as const,
  },
];

export default function AdminDashboard() {
  const { counts, error: countsError } = useCounts();
  const { rows: enrollments, loading, error } = useTable<Enrollment>('enrollments');

  const resourcesTotal = counts
    ? counts.gallery_images + counts.video_archives + counts.alumni_stories + counts.news_posts
    : null;

  const value = (n: number | null) => (n == null ? 0 : n);

  return (
    <div className="space-y-8">
      <SectionHeader title="Dashboard" subtitle="Welcome back! Here's an overview of HLA Academy's activity." />
      <SetupBanner />
      {countsError && <ErrorBanner message={countsError} />}

      <MetricsGrid>
        <MetricCard
          label="Enrollments"
          value={value(counts?.enrollments ?? null)}
          icon={<ClipboardList size={18} />}
          hint="Program form submissions"
        />
        <MetricCard
          label="Webinars"
          value={value(counts?.webinars ?? null)}
          icon={<MonitorPlay size={18} />}
          hint="Published sessions"
        />
        <MetricCard
          label="Publications"
          value={value(counts?.publications ?? null)}
          icon={<FileText size={18} />}
          hint="Documents in the library"
        />
        <MetricCard
          label="Insights"
          value={value(counts?.insights ?? null)}
          icon={<Lightbulb size={18} />}
          hint="Published articles"
        />
        <MetricCard
          label="Resources"
          value={value(resourcesTotal)}
          icon={<FolderOpen size={18} />}
          hint="Images, videos, alumni & news"
        />
        <MetricCard
          label="Inquiries"
          value={value(counts?.inquiries ?? null)}
          icon={<MessagesSquare size={18} />}
          hint="Contact form submissions"
        />
        <MetricCard
          label="Total content"
          value={
            counts
              ? resourcesTotal! + counts.enrollments + counts.webinars + counts.publications + counts.insights + counts.inquiries
              : 0
          }
          icon={<BarChart3 size={18} />}
          hint="Everything in the platform"
        />
      </MetricsGrid>

      {/* Quick nav */}
      <section>
        <h2 className="font-label-bold text-label-bold text-outline uppercase tracking-wider mb-4">
          Quick navigation
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {sections.map((section) => (
            <Link
              key={section.to}
              to={section.to}
              className="group bg-surface-container-lowest border border-outline-variant rounded-xl p-5 hover:border-secondary/40 hover:shadow-[0px_4px_20px_rgba(11,37,69,0.06)] transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
                  <section.icon size={20} />
                </span>
                <span className="font-headline-sm text-headline-sm text-on-background">
                  {value(counts?.[section.key] ?? null)}
                </span>
              </div>
              <h3 className="mt-4 font-headline-sm text-headline-sm text-on-background">{section.label}</h3>
              <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">{section.description}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 font-label-bold text-label-bold text-secondary uppercase tracking-wider">
                Open <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
          <Link
            to="/admin/resources"
            className="group bg-surface-container-lowest border border-outline-variant rounded-xl p-5 hover:border-secondary/40 hover:shadow-[0px_4px_20px_rgba(11,37,69,0.06)] transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
                <FolderOpen size={20} />
              </span>
              <span className="font-headline-sm text-headline-sm text-on-background">{value(resourcesTotal)}</span>
            </div>
            <h3 className="mt-4 font-headline-sm text-headline-sm text-on-background">Resources</h3>
            <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
              Image album, video archives, alumni stories and news.
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 font-label-bold text-label-bold text-secondary uppercase tracking-wider">
              Open <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </section>

      {/* Recent enrollments */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-label-bold text-label-bold text-outline uppercase tracking-wider">
            Recent enrollments
          </h2>
          <Link
            to="/admin/enrollment"
            className="font-label-bold text-label-bold text-secondary uppercase tracking-wider hover:opacity-80"
          >
            View all
          </Link>
        </div>
        {loading ? (
          <LoadingRows label="Loading enrollments…" />
        ) : error ? (
          <ErrorBanner message={error} />
        ) : enrollments.length === 0 ? (
          <EmptyState
            title="No enrollments yet"
            message="Submissions from the program enrollment form will appear here."
          />
        ) : (
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl divide-y divide-outline-variant">
            {enrollments.slice(0, 5).map((e) => (
              <div key={e.id} className="flex items-center justify-between gap-4 px-5 py-3.5">
                <div className="min-w-0">
                  <p className="font-body-md text-body-sm text-on-background font-semibold truncate">
                    {e.first_name} {e.surname}
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                    {e.course_title} · {e.email}
                  </p>
                </div>
                <span className="font-body-sm text-body-sm text-outline whitespace-nowrap">
                  {formatDateTime(e.created_at)}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
