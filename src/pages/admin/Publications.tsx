import { useMemo, useState, type FormEvent } from 'react';
import { CalendarDays, Download, FileText, Layers, Plus } from 'lucide-react';
import { useTable } from '@/lib/useTable';
import {
  deleteRow,
  downloadCsv,
  insertRow,
  toCsv,
  updateRow,
  uploadDocument,
  type Publication,
  type PublicationDownload,
} from '@/lib/api';
import {
  ConfirmDialog,
  DeleteButton,
  EmptyState,
  ErrorBanner,
  Field,
  FileUpload,
  LoadingRows,
  MetricCard,
  MetricsGrid,
  Modal,
  SearchInput,
  SectionHeader,
  SetupBanner,
  SubmitBar,
  Tabs,
  TagInput,
  inputCls,
} from '@/components/admin/ui';
import { formatDateTime, initialsOf } from '@/lib/format';

type FormState = {
  id: string | null;
  categories: string[];
  title: string;
  description: string;
  pub_date: string;
  fileUrl: string;
  file: File | null;
};

const emptyForm: FormState = { id: null, categories: [], title: '', description: '', pub_date: '', fileUrl: '', file: null };

type PublicationsTabKey = 'publications' | 'downloads';

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

function DownloadsTab({
  rows,
  loading,
  error,
}: {
  rows: PublicationDownload[];
  loading: boolean;
  error: string | null;
}) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<PublicationDownload | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) =>
      [
        row.first_name,
        row.last_name,
        row.email,
        row.phone,
        row.country,
        row.organisation,
        row.job_title,
        row.publication_title,
      ]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(q)),
    );
  }, [rows, query]);

  const exportCsv = () => {
    const data = filtered.map((row) => ({
      submitted: formatDateTime(row.created_at),
      publication: row.publication_title,
      first_name: row.first_name,
      last_name: row.last_name,
      email: row.email,
      phone: row.phone,
      country: row.country,
      organisation: row.organisation,
      job_title: row.job_title,
      consent_updates: row.consent_updates ? 'Yes' : 'No',
    }));
    downloadCsv(`publication-downloads-${new Date().toISOString().slice(0, 10)}.csv`, toCsv(data));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <SearchInput value={query} onChange={setQuery} placeholder="Search name, email, organisation or publication…" />
        <button
          type="button"
          onClick={exportCsv}
          disabled={rows.length === 0}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-outline-variant rounded-lg font-label-bold text-label-bold uppercase tracking-wider text-on-background hover:bg-surface-container-low transition-colors disabled:opacity-50"
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      {error ? (
        <ErrorBanner message={error} />
      ) : loading ? (
        <LoadingRows label="Loading download submissions…" />
      ) : rows.length === 0 ? (
        <EmptyState
          title="No downloads recorded yet"
          message="When visitors submit the download form on the public Publications page, their details will appear here."
        />
      ) : filtered.length === 0 ? (
        <EmptyState title="No matching submissions" message="No download submission matches your search." />
      ) : (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl divide-y divide-outline-variant overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 bg-surface-container-low border-b border-outline-variant font-label-bold text-label-bold text-outline uppercase tracking-wider">
            <span className="col-span-4">Downloaded by</span>
            <span className="col-span-4">Publication</span>
            <span className="col-span-2">Organisation</span>
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
                  {initialsOf(`${row.first_name} ${row.last_name}`)}
                </span>
                <span className="min-w-0">
                  <span className="block font-body-md text-body-sm font-semibold text-on-background truncate">
                    {row.first_name} {row.last_name}
                  </span>
                  <span className="block font-body-sm text-body-sm text-on-surface-variant truncate">{row.email}</span>
                </span>
              </span>
              <span className="md:col-span-4 font-body-sm text-body-sm text-on-background truncate self-center">
                {row.publication_title}
              </span>
              <span className="md:col-span-2 font-body-sm text-body-sm text-on-surface-variant truncate self-center">
                {row.organisation || '—'}
              </span>
              <span className="md:col-span-2 font-body-sm text-body-sm text-outline md:text-right self-center">
                {formatDateTime(row.created_at)}
              </span>
            </button>
          ))}
        </div>
      )}

      {selected && (
        <Modal title="Download submission" onClose={() => setSelected(null)}>
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded font-label-bold text-label-bold uppercase tracking-wider bg-secondary/10 text-secondary">
                {selected.publication_title}
              </span>
              <span className="font-body-sm text-body-sm text-outline">{formatDateTime(selected.created_at)}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Detail label="First name" value={selected.first_name} />
              <Detail label="Last name" value={selected.last_name} />
              <Detail label="Email" value={selected.email} />
              <Detail label="Phone number" value={selected.phone} />
              <Detail label="Country" value={selected.country} />
              <Detail label="Organisation name" value={selected.organisation} />
              <Detail label="Job title" value={selected.job_title} />
              <div>
                <p className="font-label-bold text-label-bold text-outline uppercase tracking-wider">
                  Consents to updates
                </p>
                <p
                  className={`mt-1 inline-flex items-center px-2.5 py-1 rounded font-label-bold text-label-bold uppercase tracking-wider ${
                    selected.consent_updates ? 'bg-secondary/10 text-secondary' : 'bg-surface-container text-outline'
                  }`}
                >
                  {selected.consent_updates ? 'Yes' : 'No'}
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default function AdminPublications() {
  const { rows, loading, error, reload } = useTable<Publication>('publications');
  const downloads = useTable<PublicationDownload>('publication_downloads');
  const [active, setActive] = useState<PublicationsTabKey>('publications');
  const [query, setQuery] = useState('');
  const [form, setForm] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<Publication | null>(null);
  const [deleting, setDeleting] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (row) =>
        row.title.toLowerCase().includes(q) ||
        row.description.toLowerCase().includes(q) ||
        row.categories.some((c) => c.toLowerCase().includes(q)),
    );
  }, [rows, query]);

  const metrics = useMemo(() => {
    const now = new Date();
    const thisMonth = rows.filter((row) => {
      const d = new Date(row.created_at);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;
    const categories = new Set(rows.flatMap((row) => row.categories));
    return { thisMonth, categories: categories.size };
  }, [rows]);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form) return;
    if (form.file && !form.fileUrl && form.file.size > 20 * 1024 * 1024) {
      setFormError('Document must be 20MB or smaller.');
      return;
    }
    setSaving(true);
    setFormError(null);
    try {
      const fileUrl = form.file ? await uploadDocument(form.file, 'publications', 20) : form.fileUrl;
      const payload = {
        categories: form.categories,
        title: form.title.trim(),
        description: form.description.trim(),
        pub_date: form.pub_date.trim(),
        file_url: fileUrl || null,
      };
      if (form.id) {
        await updateRow<Publication>('publications', form.id, payload);
      } else {
        await insertRow<Publication>('publications', payload);
      }
      setForm(null);
      await reload();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await deleteRow('publications', toDelete.id);
      setToDelete(null);
      await reload();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : String(err));
      setToDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  const tabDefs = [
    { key: 'publications', label: 'Publications', count: rows.length },
    { key: 'downloads', label: 'Download submissions', count: downloads.rows.length },
  ];

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Publications"
        subtitle="Publish research papers, policy briefs and reports to the resources library."
        action={
          active === 'publications' ? (
            <button
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2.5 font-label-bold text-label-bold uppercase tracking-wider text-on-primary bg-secondary rounded hover:opacity-90 transition-opacity"
              onClick={() => {
                setForm({ ...emptyForm });
                setFormError(null);
              }}
            >
              <Plus size={16} />
              New publication
            </button>
          ) : undefined
        }
      />
      <SetupBanner />
      {error && <ErrorBanner message={error} />}
      {formError && !form && <ErrorBanner message={formError} />}

      <MetricsGrid>
        <MetricCard label="Total publications" value={rows.length} icon={<FileText size={18} />} hint="Documents in the library" />
        <MetricCard label="Added this month" value={metrics.thisMonth} icon={<CalendarDays size={18} />} hint="Created in the current month" />
        <MetricCard label="Categories" value={metrics.categories} icon={<Layers size={18} />} hint="Distinct topics" />
        <MetricCard label="Downloads" value={downloads.rows.length} icon={<Download size={18} />} hint="Publication download form submissions" />
      </MetricsGrid>

      <Tabs tabs={tabDefs} active={active} onChange={(key) => setActive(key as PublicationsTabKey)} />

      <div className="pt-6 space-y-6">
        {active === 'downloads' ? (
          <DownloadsTab rows={downloads.rows} loading={downloads.loading} error={downloads.error} />
        ) : (
          <>
            <SearchInput value={query} onChange={setQuery} placeholder="Search title, description or category…" />

            {loading ? (
              <LoadingRows label="Loading publications…" />
            ) : rows.length === 0 ? (
              <EmptyState
                title="No publications published yet"
                message="Publish your first document and it will appear on the public Publications page."
              />
            ) : filtered.length === 0 ? (
              <EmptyState title="No matching publications" message="No publication matches your search. Try another title, description or category." />
            ) : (
              <div className="space-y-3">
                {filtered.map((row) => (
                  <div key={row.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-label-bold text-label-bold text-secondary uppercase tracking-wider">
                            {row.pub_date || 'Undated'}
                          </span>
                          {row.categories.map((tag) => (
                            <span key={tag} className="font-label-bold text-label-bold text-on-surface-variant bg-surface-container px-2 py-0.5 rounded uppercase tracking-wider">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <h3 className="mt-2 font-headline-sm text-headline-sm text-on-background">{row.title}</h3>
                        <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">{row.description}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          className="p-2 rounded text-outline hover:text-secondary hover:bg-secondary/10 transition-colors"
                          onClick={() => {
                            setForm({ id: row.id, categories: row.categories, title: row.title, description: row.description, pub_date: row.pub_date, fileUrl: row.file_url ?? '', file: null });
                            setFormError(null);
                          }}
                        >
                          Edit
                        </button>
                        <DeleteButton label={`Delete ${row.title}`} onClick={() => setToDelete(row)} />
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-outline-variant pt-3">
                      <span className="font-body-sm text-body-sm text-outline">{formatDateTime(row.created_at)}</span>
                      {row.file_url && (
                        <a
                          href={row.file_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 font-label-bold text-label-bold text-secondary uppercase tracking-wider hover:opacity-80"
                        >
                          <Download size={14} />
                          View document
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {form && (
        <Modal title={form.id ? 'Edit publication' : 'Publish publication'} onClose={() => setForm(null)} wide>
          <form onSubmit={submit} className="space-y-5">
            {formError && <ErrorBanner message={formError} />}
            <Field label="Categories" required hint="Add each category, then press Enter">
              <TagInput value={form.categories} onChange={(categories) => setForm({ ...form, categories })} />
            </Field>
            <Field label="Title" required>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Strengthening Institutional Frameworks Post-Pandemic"
                className={inputCls}
              />
            </Field>
            <Field label="Description" required>
              <textarea
                required
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                placeholder="Policy recommendations for building resilient health sector governance structures based on recent crisis responses."
                className={`${inputCls} resize-y`}
              />
            </Field>
            <Field label="Date" required hint="e.g. Sep 2024">
              <input
                type="text"
                required
                value={form.pub_date}
                onChange={(e) => setForm({ ...form, pub_date: e.target.value })}
                placeholder="Sep 2024"
                className={inputCls}
              />
            </Field>
            <Field label="Publication document" hint="PDF, Word or PowerPoint — up to 20MB. Not required.">
              <FileUpload
                file={form.file}
                onChange={(file) => setForm({ ...form, file })}
                src={form.fileUrl || undefined}
                maxMb={20}
              />
            </Field>
            <SubmitBar submitting={saving} submitLabel={form.id ? 'Save changes' : 'Publish publication'} onClose={() => setForm(null)} />
          </form>
        </Modal>
      )}

      {toDelete && (
        <ConfirmDialog
          title="Delete publication"
          message={`“${toDelete.title}” will be permanently removed from the admin panel and the public site.`}
          onConfirm={confirmDelete}
          onClose={() => setToDelete(null)}
          busy={deleting}
        />
      )}
    </div>
  );
}
