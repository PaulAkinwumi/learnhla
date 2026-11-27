import { useMemo, useState, type ReactNode } from 'react';
import { BadgeCheck, Download, Eye, GraduationCap, Globe2, Search, Users } from 'lucide-react';
import { useTable } from '@/lib/useTable';
import { type Enrollment, downloadCsv, toCsv } from '@/lib/api';
import {
  EmptyState,
  ErrorBanner,
  LoadingRows,
  MetricCard,
  MetricsGrid,
  Modal,
  SectionHeader,
  SetupBanner,
  inputCls,
} from '@/components/admin/ui';
import { formatDate, formatDateTime, initialsOf } from '@/lib/format';

const genderLabel = (value: string) =>
  value === 'male' ? 'Male' : value === 'female' ? 'Female' : value === 'prefer_not_to_say' ? 'Prefer not to say' : value || '—';

function Detail({ label, value, wide }: { label: string; value?: string | null; wide?: boolean }) {
  return (
    <div className={wide ? 'sm:col-span-2' : ''}>
      <p className="font-label-bold text-label-bold text-outline uppercase tracking-wider">{label}</p>
      <p className="mt-1 font-body-md text-body-md text-on-background whitespace-pre-wrap break-words">
        {value && value.trim() ? value : '—'}
      </p>
    </div>
  );
}

function DetailGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-outline-variant pt-5 first:border-t-0 first:pt-0">
      <h3 className="font-label-bold text-label-bold text-secondary uppercase tracking-wider mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">{children}</div>
    </section>
  );
}

export default function AdminEnrollment() {
  const { rows, loading, error } = useTable<Enrollment>('enrollments');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Enrollment | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) =>
      [row.first_name, row.surname, row.other_name, row.email, row.course_title, row.country, row.organization, row.job_title]
        .filter(Boolean)
        .some((value) => (value as string).toLowerCase().includes(q)),
    );
  }, [rows, query]);

  const metrics = useMemo(() => {
    const certified = rows.filter((row) => row.certified).length;
    const programs = new Set(rows.map((row) => row.course_title)).size;
    const countries = new Set(rows.map((row) => row.country).filter(Boolean)).size;
    return { certified, programs, countries };
  }, [rows]);

  const exportCsv = () => {
    const data = filtered.map((row) => ({
      submitted: formatDateTime(row.created_at),
      program: row.course_title,
      first_name: row.first_name,
      surname: row.surname,
      other_name: row.other_name ?? '',
      dob: row.dob ?? '',
      gender: row.gender,
      phone: row.phone,
      email: row.email,
      country: row.country,
      state_region: row.state_region,
      education_level: row.education_level,
      organization: row.organization,
      job_title: row.job_title,
      responsibilities: row.responsibilities,
      key_challenges: row.key_challenges,
      goals: row.goals,
      referral_source: row.referral_source,
      certified: row.certified ? 'yes' : 'no',
    }));
    downloadCsv(`enrollments-${new Date().toISOString().slice(0, 10)}.csv`, toCsv(data));
  };

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Enrollment"
        subtitle="Participants enrolled for programs and their form submissions."
        action={
          <button type="button" className="inline-flex items-center gap-2 px-4 py-2.5 border border-outline-variant rounded-lg font-label-bold text-label-bold uppercase tracking-wider text-on-background hover:bg-surface-container-low transition-colors disabled:opacity-50" onClick={exportCsv} disabled={rows.length === 0}>
            <Download size={16} />
            Export CSV
          </button>
        }
      />
      <SetupBanner />
      {error && <ErrorBanner message={error} />}

      <MetricsGrid>
        <MetricCard label="Total submissions" value={rows.length} icon={<Users size={18} />} hint="Enrollment form responses" />
        <MetricCard label="Certified" value={metrics.certified} icon={<BadgeCheck size={18} />} hint="Confirmed the declaration" />
        <MetricCard label="Programs" value={metrics.programs} icon={<GraduationCap size={18} />} hint="Distinct programs applied to" />
        <MetricCard label="Countries" value={metrics.countries} icon={<Globe2 size={18} />} hint="Countries of residence" />
      </MetricsGrid>

      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, email, program or country…"
          className={`${inputCls} pl-9`}
        />
      </div>

      {loading ? (
        <LoadingRows label="Loading enrollments…" />
      ) : rows.length === 0 ? (
        <EmptyState
          title="No enrollments yet"
          message="Submissions from the program enrollment form will appear here as soon as participants register."
        />
      ) : filtered.length === 0 ? (
        <EmptyState title="No matching participants" message="No enrollment matches your search. Try a different name, email or program." />
      ) : (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl divide-y divide-outline-variant overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 bg-surface-container-low border-b border-outline-variant font-label-bold text-label-bold text-outline uppercase tracking-wider">
            <span className="col-span-4">Participant</span>
            <span className="col-span-4">Program</span>
            <span className="col-span-2">Country</span>
            <span className="col-span-2 text-right">Submitted</span>
          </div>
          {filtered.map((row) => (
            <button
              key={row.id}
              type="button"
              onClick={() => setSelected(row)}
              className="w-full text-left grid grid-cols-1 md:grid-cols-12 gap-1 md:gap-4 px-5 py-4 hover:bg-surface-container-low transition-colors group"
            >
              <span className="md:col-span-4 flex items-center gap-3 min-w-0">
                <span className="w-9 h-9 shrink-0 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-label-bold text-label-bold">
                  {initialsOf(`${row.first_name} ${row.surname}`)}
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-2">
                    <span className="font-body-md text-body-sm font-semibold text-on-background truncate">
                      {row.first_name} {row.surname}
                    </span>
                    {row.certified && <BadgeCheck size={14} className="text-secondary shrink-0" />}
                  </span>
                  <span className="block font-body-sm text-body-sm text-on-surface-variant truncate">{row.email}</span>
                </span>
              </span>
              <span className="md:col-span-4 font-body-sm text-body-sm text-on-surface-variant min-w-0">
                <span className="block truncate text-on-background">{row.course_title}</span>
                <span className="block truncate">{row.job_title || '—'}</span>
              </span>
              <span className="md:col-span-2 font-body-sm text-body-sm text-on-surface-variant">{row.country || '—'}</span>
              <span className="md:col-span-2 flex items-center justify-between md:justify-end gap-3 font-body-sm text-body-sm text-outline">
                <span>{formatDate(row.created_at)}</span>
                <Eye size={16} className="text-outline group-hover:text-secondary transition-colors" />
              </span>
            </button>
          ))}
        </div>
      )}

      {selected && (
        <Modal wide title={`${selected.first_name} ${selected.surname}`} onClose={() => setSelected(null)}>
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-body-sm text-body-sm text-on-surface-variant">
              <span>{selected.course_title}</span>
              <span>{formatDateTime(selected.created_at)}</span>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded font-label-bold text-label-bold uppercase tracking-wider ${selected.certified ? 'bg-secondary/10 text-secondary' : 'bg-surface-container text-on-surface-variant'}`}>
                <BadgeCheck size={13} />
                {selected.certified ? 'Certified' : 'Not certified'}
              </span>
            </div>

            <DetailGroup title="Personal information">
              <Detail label="First name" value={selected.first_name} />
              <Detail label="Surname" value={selected.surname} />
              <Detail label="Other name" value={selected.other_name} />
              <Detail label="Date of birth" value={selected.dob ? formatDate(selected.dob) : null} />
              <Detail label="Gender" value={genderLabel(selected.gender)} />
              <Detail label="Phone" value={selected.phone} />
              <Detail label="Email" value={selected.email} />
              <Detail label="Country of residence" value={selected.country} />
              <Detail label="State / Region" value={selected.state_region} />
            </DetailGroup>

            <DetailGroup title="Professional information">
              <Detail label="Highest education level" value={selected.education_level} />
              <Detail label="Facility / Organization" value={selected.organization} />
              <Detail label="Job title / Role" value={selected.job_title} />
              <Detail label="Current responsibilities" value={selected.responsibilities} wide />
              <Detail label="Key challenges" value={selected.key_challenges} wide />
              <Detail label="Goals & objectives" value={selected.goals} wide />
            </DetailGroup>

            <DetailGroup title="Referral & certification">
              <Detail label="How they heard about the program" value={selected.referral_source} />
              <Detail label="Program applied for" value={selected.course_title} />
            </DetailGroup>
          </div>
        </Modal>
      )}
    </div>
  );
}
