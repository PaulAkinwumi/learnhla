import { useMemo, useState } from 'react';
import { Building2, CalendarDays, Download, Eye, Layers, MessagesSquare, Search } from 'lucide-react';
import { useTable } from '@/lib/useTable';
import { type Inquiry, deleteRow, downloadCsv, toCsv } from '@/lib/api';
import {
  ConfirmDialog,
  DeleteButton,
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
import { formatDateTime, initialsOf } from '@/lib/format';

const inquiryTypeLabel: Record<string, string> = {
  partnerships: 'Institutional Partnerships',
  admissions: 'Course Admissions',
  media: 'Media & Press',
  general: 'General Inquiries',
};

function Detail({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <p className="font-label-bold text-label-bold text-outline uppercase tracking-wider">{label}</p>
      <p className="mt-1 font-body-md text-body-md text-on-background whitespace-pre-wrap break-words">
        {value && value.trim() ? value : '—'}
      </p>
    </div>
  );
}

export default function AdminInquiries() {
  const { rows, loading, error, reload } = useTable<Inquiry>('inquiries');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [toDelete, setToDelete] = useState<Inquiry | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) =>
      [row.full_name, row.organization, row.email, row.subject, row.message, inquiryTypeLabel[row.inquiry_type]]
        .filter(Boolean)
        .some((value) => (value as string).toLowerCase().includes(q)),
    );
  }, [rows, query]);

  const metrics = useMemo(() => {
    const now = new Date();
    const thisMonth = rows.filter((row) => {
      const d = new Date(row.created_at);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;
    const types = new Set(rows.map((row) => inquiryTypeLabel[row.inquiry_type] ?? row.inquiry_type));
    const organizations = new Set(rows.map((row) => row.organization).filter(Boolean));
    return { thisMonth, types: types.size, organizations: organizations.size };
  }, [rows]);

  const exportCsv = () => {
    const data = filtered.map((row) => ({
      submitted: formatDateTime(row.created_at),
      inquiry_type: inquiryTypeLabel[row.inquiry_type] ?? row.inquiry_type,
      full_name: row.full_name,
      organization: row.organization ?? '',
      email: row.email,
      subject: row.subject ?? '',
      message: row.message,
    }));
    downloadCsv(`inquiries-${new Date().toISOString().slice(0, 10)}.csv`, toCsv(data));
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await deleteRow('inquiries', toDelete.id);
      setToDelete(null);
      await reload();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : String(err));
      setToDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Inquiries"
        subtitle="Contact us form submissions from the public site."
        action={
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-outline-variant rounded-lg font-label-bold text-label-bold uppercase tracking-wider text-on-background hover:bg-surface-container-low transition-colors disabled:opacity-50"
            onClick={exportCsv}
            disabled={rows.length === 0}
          >
            <Download size={16} />
            Export CSV
          </button>
        }
      />
      <SetupBanner />
      {error && <ErrorBanner message={error} />}
      {actionError && <ErrorBanner message={actionError} />}

      <MetricsGrid>
        <MetricCard label="Total inquiries" value={rows.length} icon={<MessagesSquare size={18} />} hint="Contact form submissions" />
        <MetricCard label="Added this month" value={metrics.thisMonth} icon={<CalendarDays size={18} />} hint="Received in the current month" />
        <MetricCard label="Inquiry types" value={metrics.types} icon={<Layers size={18} />} hint="Distinct subject areas" />
        <MetricCard label="Organizations" value={metrics.organizations} icon={<Building2 size={18} />} hint="Distinct institutions" />
      </MetricsGrid>

      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, email, subject or message…"
          className={`${inputCls} pl-9`}
        />
      </div>

      {loading ? (
        <LoadingRows label="Loading inquiries…" />
      ) : rows.length === 0 ? (
        <EmptyState
          title="No inquiries yet"
          message="Submissions from the contact us form on the public site will appear here."
        />
      ) : filtered.length === 0 ? (
        <EmptyState title="No matching inquiries" message="No inquiry matches your search. Try a different name, email or subject." />
      ) : (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl divide-y divide-outline-variant overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 bg-surface-container-low border-b border-outline-variant font-label-bold text-label-bold text-outline uppercase tracking-wider">
            <span className="col-span-4">From</span>
            <span className="col-span-3">Inquiry type</span>
            <span className="col-span-3">Subject</span>
            <span className="col-span-2 text-right">Received</span>
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
                  {initialsOf(row.full_name)}
                </span>
                <span className="min-w-0">
                  <span className="block font-body-md text-body-sm font-semibold text-on-background truncate">
                    {row.full_name}
                  </span>
                  <span className="block font-body-sm text-body-sm text-on-surface-variant truncate">
                    {row.email}
                  </span>
                </span>
              </span>
              <span className="md:col-span-3 font-body-sm text-body-sm text-on-surface-variant truncate">
                {inquiryTypeLabel[row.inquiry_type] ?? row.inquiry_type}
              </span>
              <span className="md:col-span-3 font-body-sm text-body-sm text-on-background truncate">
                {row.subject || '—'}
              </span>
              <span className="md:col-span-2 flex items-center justify-between md:justify-end gap-3 font-body-sm text-body-sm text-outline">
                <span>{formatDateTime(row.created_at)}</span>
                <Eye size={16} className="text-outline group-hover:text-secondary transition-colors shrink-0" />
              </span>
            </button>
          ))}
        </div>
      )}

      {selected && (
        <Modal title={selected.subject || 'Inquiry details'} onClose={() => setSelected(null)}>
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded font-label-bold text-label-bold uppercase tracking-wider bg-secondary/10 text-secondary">
                {inquiryTypeLabel[selected.inquiry_type] ?? selected.inquiry_type}
              </span>
              <span className="font-body-sm text-body-sm text-outline">{formatDateTime(selected.created_at)}</span>
            </div>
            <Detail label="Full name" value={selected.full_name} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Detail label="Organization / Institution" value={selected.organization} />
              <Detail label="Professional email" value={selected.email} />
            </div>
            <Detail label="Message" value={selected.message} />
            <div className="flex items-center justify-between border-t border-outline-variant pt-4">
              <button
                type="button"
                className="font-label-bold text-label-bold text-secondary uppercase tracking-wider hover:opacity-80"
                onClick={() => window.location.assign(`mailto:${selected.email}`)}
              >
                Reply by email
              </button>
              <DeleteButton label={`Delete inquiry from ${selected.full_name}`} onClick={() => { setSelected(null); setToDelete(selected); }} />
            </div>
          </div>
        </Modal>
      )}

      {toDelete && (
        <ConfirmDialog
          title="Delete inquiry"
          message={`The inquiry from “${toDelete.full_name}” will be permanently removed.`}
          onConfirm={confirmDelete}
          onClose={() => setToDelete(null)}
          busy={deleting}
        />
      )}
    </div>
  );
}