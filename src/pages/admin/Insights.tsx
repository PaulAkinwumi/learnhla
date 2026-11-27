import { useMemo, useState, type FormEvent } from 'react';
import { CalendarDays, Layers, Lightbulb, Plus, UserRound } from 'lucide-react';
import { useTable } from '@/lib/useTable';
import { deleteRow, insertRow, updateRow, type Insight } from '@/lib/api';
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
  RichTextEditor,
  SearchInput,
  SectionHeader,
  SetupBanner,
  SubmitBar,
  TagInput,
  inputCls,
} from '@/components/admin/ui';
import { formatDateTime, readTimeMinutes } from '@/lib/format';

type FormState = {
  id: string | null;
  categories: string[];
  title: string;
  excerpt: string;
  author: string;
  content: string;
};

const emptyForm: FormState = { id: null, categories: [], title: '', excerpt: '', author: '', content: '' };

export default function AdminInsights() {
  const { rows, loading, error, reload } = useTable<Insight>('insights');
  const [query, setQuery] = useState('');
  const [form, setForm] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<Insight | null>(null);
  const [deleting, setDeleting] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (row) =>
        row.title.toLowerCase().includes(q) ||
        row.author.toLowerCase().includes(q) ||
        row.excerpt.toLowerCase().includes(q) ||
        row.categories.some((c) => c.toLowerCase().includes(q)),
    );
  }, [rows, query]);

  const metrics = useMemo(() => {
    const now = new Date();
    const thisMonth = rows.filter((row) => {
      const d = new Date(row.created_at);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;
    const authors = new Set(rows.map((row) => row.author).filter(Boolean));
    const categories = new Set(rows.flatMap((row) => row.categories));
    return { thisMonth, authors: authors.size, categories: categories.size };
  }, [rows]);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setFormError(null);
    const payload = {
      categories: form.categories,
      title: form.title.trim(),
      excerpt: form.excerpt.trim(),
      author: form.author.trim(),
      content: form.content,
    };
    try {
      if (form.id) {
        await updateRow<Insight>('insights', form.id, payload);
      } else {
        await insertRow<Insight>('insights', payload);
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
      await deleteRow('insights', toDelete.id);
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
        title="Insights"
        subtitle="Publish thought-leadership articles and opinion posts."
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
            New insight
          </button>
        }
      />
      <SetupBanner />
      {error && <ErrorBanner message={error} />}
      {formError && !form && <ErrorBanner message={formError} />}

      <MetricsGrid>
        <MetricCard label="Total insights" value={rows.length} icon={<Lightbulb size={18} />} hint="Published articles" />
        <MetricCard label="Added this month" value={metrics.thisMonth} icon={<CalendarDays size={18} />} hint="Created in the current month" />
        <MetricCard label="Authors" value={metrics.authors} icon={<UserRound size={18} />} hint="Distinct contributors" />
        <MetricCard label="Categories" value={metrics.categories} icon={<Layers size={18} />} hint="Distinct topics" />
      </MetricsGrid>

      <SearchInput value={query} onChange={setQuery} placeholder="Search title, author, excerpt or category…" />

      {loading ? (
        <LoadingRows label="Loading insights…" />
      ) : rows.length === 0 ? (
        <EmptyState
          title="No insights published yet"
          message="Publish your first insight article and it will appear on the public Insights page."
        />
      ) : filtered.length === 0 ? (
        <EmptyState title="No matching insights" message="No insight matches your search. Try another title, author or category." />
      ) : (
        <div className="space-y-3">
          {filtered.map((row) => (
            <article key={row.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
              <div className="flex flex-wrap items-center gap-2">
                {row.categories.map((tag) => (
                  <span key={tag} className="font-label-bold text-label-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded uppercase tracking-wider">
                    #{tag}
                  </span>
                ))}
                <span className="ml-auto font-body-sm text-body-sm text-outline">{formatDateTime(row.created_at)}</span>
              </div>
              <h3 className="mt-3 font-headline-sm text-headline-sm text-on-background">{row.title}</h3>
              <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant line-clamp-2">{row.excerpt}</p>
              <div className="mt-4 flex items-center justify-between border-t border-outline-variant pt-3">
                <div className="flex items-center gap-3 min-w-0">
                  <p className="font-body-sm text-body-sm font-semibold text-on-background">{row.author || 'Unknown author'}</p>
                  <span className="font-body-sm text-body-sm text-outline">{readTimeMinutes(row.content)} min read</span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    className="p-2 rounded text-outline hover:text-secondary hover:bg-secondary/10 transition-colors"
                    onClick={() => {
                      setForm({ id: row.id, categories: row.categories, title: row.title, excerpt: row.excerpt, author: row.author, content: row.content });
                      setFormError(null);
                    }}
                  >
                    Edit
                  </button>
                  <DeleteButton label={`Delete ${row.title}`} onClick={() => setToDelete(row)} />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {form && (
        <Modal title={form.id ? 'Edit insight' : 'Publish insight'} onClose={() => setForm(null)} wide>
          <form onSubmit={submit} className="space-y-5">
            {formError && <ErrorBanner message={formError} />}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Categories" required hint="Add each category, then press Enter">
                <TagInput value={form.categories} onChange={(categories) => setForm({ ...form, categories })} />
              </Field>
              <Field label="Author name" required>
                <input
                  type="text"
                  required
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  placeholder="Dr. Amina Diallo"
                  className={inputCls}
                />
              </Field>
            </div>
            <Field label="Title" required>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="The Future of Digital Health in Sub-Saharan Africa"
                className={inputCls}
              />
            </Field>
            <Field label="Excerpt" required>
              <textarea
                required
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                rows={3}
                placeholder="Exploring the rapid acceleration of digital health technologies and their impact on healthcare delivery across the continent."
                className={`${inputCls} resize-y`}
              />
            </Field>
            <Field label="Content" required hint="Use the toolbar to format headings, lists and links.">
              <RichTextEditor value={form.content} onChange={(content) => setForm({ ...form, content })} minHeight={260} />
            </Field>
            <SubmitBar submitting={saving} submitLabel={form.id ? 'Save changes' : 'Publish insight'} onClose={() => setForm(null)} />
          </form>
        </Modal>
      )}

      {toDelete && (
        <ConfirmDialog
          title="Delete insight"
          message={`“${toDelete.title}” will be permanently removed from the admin panel and the public site.`}
          onConfirm={confirmDelete}
          onClose={() => setToDelete(null)}
          busy={deleting}
        />
      )}
    </div>
  );
}