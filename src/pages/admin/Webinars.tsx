import { useMemo, useState, type FormEvent } from 'react';
import { CalendarDays, Layers, MonitorPlay, Play, Plus, UserRound } from 'lucide-react';
import { useTable } from '@/lib/useTable';
import { deleteRow, insertRow, updateRow, youtubeThumb, type Webinar } from '@/lib/api';
import {
  ConfirmDialog,
  DeleteButton,
  EmptyState,
  ErrorBanner,
  Field,
  LoadingRows,
  MetricCard,
  MetricsGrid,
  Modal,
  SearchInput,
  SectionHeader,
  SetupBanner,
  SubmitBar,
  TagInput,
  YouTubeField,
  inputCls,
} from '@/components/admin/ui';
import { formatDateTime, stripHash } from '@/lib/format';

type FormState = {
  id: string | null;
  category: string;
  title: string;
  speakers: string[];
  youtube_url: string;
};

const emptyForm: FormState = { id: null, category: '', title: '', speakers: [], youtube_url: '' };

export default function AdminWebinars() {
  const { rows, loading, error, reload } = useTable<Webinar>('webinars');
  const [query, setQuery] = useState('');
  const [form, setForm] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<Webinar | null>(null);
  const [deleting, setDeleting] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) =>
      [row.title, row.category, row.speakers].some((value) => value.toLowerCase().includes(q)),
    );
  }, [rows, query]);

  const metrics = useMemo(() => {
    const now = new Date();
    const thisMonth = rows.filter((row) => {
      const d = new Date(row.created_at);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;
    const categories = new Set(rows.map((row) => stripHash(row.category)).filter(Boolean));
    const speakers = new Set(
      rows.flatMap((row) => row.speakers.split(/,|&/).map((s) => s.trim()).filter(Boolean)),
    );
    return { thisMonth, categories: categories.size, speakers: speakers.size };
  }, [rows]);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setFormError(null);
    const payload = {
      category: stripHash(form.category),
      title: form.title.trim(),
      speakers: form.speakers.join(', '),
      youtube_url: form.youtube_url.trim(),
    };
    try {
      if (form.id) {
        await updateRow<Webinar>('webinars', form.id, payload);
      } else {
        await insertRow<Webinar>('webinars', payload);
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
      await deleteRow('webinars', toDelete.id);
      setToDelete(null);
      await reload();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : String(err));
      setToDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Webinar"
        subtitle="Publish webinar sessions already posted on YouTube."
        action={
          <button
            type="button"
            className="inline-flex items-center gap-2 px-5 py-2.5 font-label-bold text-label-bold uppercase tracking-wider text-on-primary bg-secondary rounded hover:opacity-90 transition-opacity"
            onClick={() => {
              setForm({ ...emptyForm });
              setFormError(null);
            }}
          >
            <Plus size={16} />
            New webinar
          </button>
        }
      />
      <SetupBanner />
      {error && <ErrorBanner message={error} />}
      {formError && !form && <ErrorBanner message={formError} />}

      <MetricsGrid>
        <MetricCard label="Total webinars" value={rows.length} icon={<MonitorPlay size={18} />} hint="Published sessions" />
        <MetricCard label="This month" value={metrics.thisMonth} icon={<CalendarDays size={18} />} hint="Added in the current month" />
        <MetricCard label="Categories" value={metrics.categories} icon={<Layers size={18} />} hint="Distinct topic categories" />
        <MetricCard label="Speakers" value={metrics.speakers} icon={<UserRound size={18} />} hint="Unique speakers featured" />
      </MetricsGrid>

      <SearchInput value={query} onChange={setQuery} placeholder="Search title, category or speaker…" />

      {loading ? (
        <LoadingRows label="Loading webinars…" />
      ) : rows.length === 0 ? (
        <EmptyState
          title="No webinars published yet"
          message="Publish your first webinar and it will appear on the public Webinars page with its YouTube thumbnail."
        />
      ) : filtered.length === 0 ? (
        <EmptyState title="No matching webinars" message="No webinar matches your search. Try another title, category or speaker." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
          {filtered.map((row) => (
            <article key={row.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col">
              <div className="relative w-full aspect-video bg-surface-container">
                {youtubeThumb(row.youtube_url) ? (
                  <img src={youtubeThumb(row.youtube_url)} alt={row.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-outline">
                    <Play size={28} />
                  </div>
                )}
                <span className="absolute bottom-2 left-2 bg-on-surface/80 text-on-primary font-label-bold text-[10px] uppercase tracking-wider px-2 py-1 rounded">
                  #{stripHash(row.category)}
                </span>
              </div>
              <div className="p-5 flex flex-col gap-2 flex-grow">
                <h3 className="font-headline-sm text-headline-sm text-on-background">{row.title}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{row.speakers}</p>
                <div className="mt-auto pt-3 flex items-center justify-between border-t border-outline-variant">
                  <span className="font-body-sm text-body-sm text-outline">{formatDateTime(row.created_at)}</span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      className="p-2 rounded text-outline hover:text-secondary hover:bg-secondary/10 transition-colors"
                      onClick={() => {
                        setForm({
                          id: row.id,
                          category: row.category,
                          title: row.title,
                          speakers: row.speakers.split(',').map((s) => s.trim()).filter(Boolean),
                          youtube_url: row.youtube_url,
                        });
                        setFormError(null);
                      }}
                    >
                      Edit
                    </button>
                    <DeleteButton label={`Delete ${row.title}`} onClick={() => setToDelete(row)} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {form && (
        <Modal title={form.id ? 'Edit webinar' : 'Publish webinar'} onClose={() => setForm(null)} wide>
          <form onSubmit={submit} className="space-y-5">
            {formError && <ErrorBanner message={formError} />}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Category" required hint="e.g. Governance">
                <input
                  type="text"
                  required
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="#Governance"
                  className={inputCls}
                />
              </Field>
              <Field label="Speakers" required hint="Add each speaker, then press Enter">
                <TagInput
                  value={form.speakers}
                  onChange={(speakers) => setForm({ ...form, speakers })}
                  placeholder="Dr. Olayinka"
                />
              </Field>
            </div>
            <Field label="Title" required>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Strengthening Health System Resilience Post-Pandemic"
                className={inputCls}
              />
            </Field>
            <YouTubeField
              value={form.youtube_url}
              onChange={(youtube_url) => setForm({ ...form, youtube_url })}
              required
            />
            <SubmitBar submitting={saving} submitLabel={form.id ? 'Save changes' : 'Publish webinar'} onClose={() => setForm(null)} />
          </form>
        </Modal>
      )}

      {toDelete && (
        <ConfirmDialog
          title="Delete webinar"
          message={`“${toDelete.title}” will be permanently removed from the admin panel and the public site.`}
          onConfirm={confirmDelete}
          onClose={() => setToDelete(null)}
          busy={deleting}
        />
      )}
    </div>
  );
}
