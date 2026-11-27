import { useMemo, useState, type FormEvent } from 'react';
import {
  GraduationCap,
  Images,
  Newspaper,
  Plus,
  UserRound,
  Video,
} from 'lucide-react';
import { useTable } from '@/lib/useTable';
import {
  deleteRow,
  insertRow,
  updateRow,
  uploadImage,
  youtubeThumb,
  type AdminTable,
  type AlumniStory,
  type GalleryImage,
  type NewsPost,
  type VideoArchive,
} from '@/lib/api';
import {
  ConfirmDialog,
  DeleteButton,
  EmptyState,
  ErrorBanner,
  Field,
  ImageUpload,
  LoadingRows,
  MetricCard,
  MetricsGrid,
  Modal,
  RichTextEditor,
  SearchInput,
  SectionHeader,
  SetupBanner,
  SubmitBar,
  Tabs,
  YouTubeField,
  inputCls,
} from '@/components/admin/ui';
import { formatDateTime, readTimeMinutes } from '@/lib/format';

type BaseForm = { id: string | null };

type CrudOptions<Row extends { id: string }, Form extends BaseForm> = {
  table: AdminTable;
  empty: () => Form;
  toForm: (row: Row) => Form;
  toPayload: (form: Form) => Promise<Record<string, unknown>> | Record<string, unknown>;
  deleteName: (row: Row) => string;
};

function useContentCrud<Row extends { id: string }, Form extends BaseForm>(opts: CrudOptions<Row, Form>) {
  const { rows, loading, error, reload } = useTable<Row>(opts.table);
  const [form, setForm] = useState<Form | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<Row | null>(null);
  const [deleting, setDeleting] = useState(false);

  const openCreate = () => {
    setForm(opts.empty());
    setFormError(null);
  };

  const openEdit = (row: Row) => {
    setForm(opts.toForm(row));
    setFormError(null);
  };

  const close = () => setForm(null);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setFormError(null);
    try {
      const payload = await opts.toPayload(form);
      if (form.id) {
        await updateRow<Row>(opts.table, form.id, payload);
      } else {
        await insertRow<Row>(opts.table, payload);
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
      await deleteRow(opts.table, toDelete.id);
      setToDelete(null);
      await reload();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : String(err));
      setToDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  return {
    rows,
    loading,
    error,
    form,
    setForm,
    saving,
    formError,
    toDelete,
    deleting,
    openCreate,
    openEdit,
    close,
    submit,
    confirmDelete,
    requestDelete: setToDelete,
  };
}

function Toolbar({
  onCreate,
  createLabel,
  onSearch,
  search,
  placeholder,
}: {
  onCreate: () => void;
  createLabel: string;
  onSearch: (value: string) => void;
  search: string;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <SearchInput value={search} onChange={onSearch} placeholder={placeholder} />
      <button
        type="button"
        onClick={onCreate}
        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 font-label-bold text-label-bold uppercase tracking-wider text-on-primary bg-secondary rounded hover:opacity-90 transition-opacity"
      >
        <Plus size={16} />
        {createLabel}
      </button>
    </div>
  );
}

// ---------- Layer 1: Image Album ----------

type GalleryForm = BaseForm & { title: string; date_label: string; imageUrl: string; file: File | null };

const emptyGallery: GalleryForm = { id: null, title: '', date_label: '', imageUrl: '', file: null };

function GalleryTab() {
  const { rows, loading, form, setForm, saving, formError, toDelete, deleting, openCreate, openEdit, close, submit, confirmDelete, requestDelete } =
    useContentCrud<GalleryImage, GalleryForm>({
      table: 'gallery_images',
      empty: () => ({ ...emptyGallery }),
      toForm: (row) => ({ id: row.id, title: row.title, date_label: row.date_label, imageUrl: row.image_url, file: null }),
      toPayload: async (f) => ({
        title: f.title.trim(),
        date_label: f.date_label.trim(),
        image_url: f.file ? await uploadImage(f.file, 'gallery') : f.imageUrl,
      }),
      deleteName: (row) => row.title,
    });
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => `${row.title} ${row.date_label}`.toLowerCase().includes(q));
  }, [rows, query]);

  return (
    <div className="space-y-6">
      <Toolbar onCreate={openCreate} createLabel="Add image" onSearch={setQuery} search={query} placeholder="Search image title or date…" />
      {formError && !form && <ErrorBanner message={formError} />}
      {loading ? (
        <LoadingRows label="Loading images…" />
      ) : rows.length === 0 ? (
        <EmptyState title="No images yet" message="Publish images with a title and date to build the image album." />
      ) : filtered.length === 0 ? (
        <EmptyState title="No matching images" message="No image matches your search." />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((row) => (
            <div key={row.id} className="group bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
              <div className="aspect-[4/3] bg-surface-container overflow-hidden">
                {row.image_url ? (
                  <img src={row.image_url} alt={row.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-outline">
                    <Images size={24} />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-headline-sm text-headline-sm text-on-background leading-tight">{row.title}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-label-bold text-label-bold text-secondary uppercase tracking-wider">{row.date_label}</span>
                  <div className="flex items-center gap-1">
                    <button type="button" className="p-1.5 rounded text-outline hover:text-secondary hover:bg-secondary/10 transition-colors" onClick={() => openEdit(row)}>
                      Edit
                    </button>
                    <DeleteButton label={`Delete ${row.title}`} onClick={() => requestDelete(row)} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {form && (
        <Modal title={form.id ? 'Edit image' : 'Add image'} onClose={close}>
          <form onSubmit={submit} className="space-y-5">
            {formError && <ErrorBanner message={formError} />}
            <Field label="Cover image" required hint="Featured photo for the album entry.">
              <ImageUpload file={form.file} onChange={(file) => setForm({ ...form, file })} src={form.imageUrl} />
            </Field>
            <Field label="Title" required>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Executive Leadership Seminar Series"
                className={inputCls}
              />
            </Field>
            <Field label="Date" required hint="e.g. OCT 15, 2023">
              <input
                type="text"
                required
                value={form.date_label}
                onChange={(e) => setForm({ ...form, date_label: e.target.value })}
                placeholder="OCT 15, 2023"
                className={inputCls}
              />
            </Field>
            <SubmitBar submitting={saving} submitLabel={form.id ? 'Save changes' : 'Add image'} onClose={close} />
          </form>
        </Modal>
      )}

      {toDelete && (
        <ConfirmDialog
          title="Delete image"
          message={`“${toDelete.title}” will be permanently removed from the admin panel and the public site.`}
          onConfirm={confirmDelete}
          onClose={() => requestDelete(null)}
          busy={deleting}
        />
      )}
    </div>
  );
}

// ---------- Layer 2: Video Archives ----------

type VideoForm = BaseForm & { title: string; youtube_url: string };

const emptyVideo: VideoForm = { id: null, title: '', youtube_url: '' };

function VideosTab() {
  const { rows, loading, form, setForm, saving, formError, toDelete, deleting, openCreate, openEdit, close, submit, confirmDelete, requestDelete } =
    useContentCrud<VideoArchive, VideoForm>({
      table: 'video_archives',
      empty: () => ({ ...emptyVideo }),
      toForm: (row) => ({ id: row.id, title: row.title, youtube_url: row.youtube_url }),
      toPayload: (f) => ({ title: f.title.trim(), youtube_url: f.youtube_url.trim() }),
      deleteName: (row) => row.title,
    });
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => row.title.toLowerCase().includes(q));
  }, [rows, query]);

  return (
    <div className="space-y-6">
      <Toolbar onCreate={openCreate} createLabel="Add video" onSearch={setQuery} search={query} placeholder="Search video title…" />
      {formError && !form && <ErrorBanner message={formError} />}
      {loading ? (
        <LoadingRows label="Loading videos…" />
      ) : rows.length === 0 ? (
        <EmptyState title="No videos archived yet" message="Publish YouTube sessions and their thumbnails will appear here." />
      ) : filtered.length === 0 ? (
        <EmptyState title="No matching videos" message="No video matches your search." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
          {filtered.map((row) => (
            <article key={row.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col">
              <div className="relative w-full aspect-video bg-surface-container">
                {youtubeThumb(row.youtube_url) ? (
                  <img src={youtubeThumb(row.youtube_url)} alt={row.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-outline">
                    <Video size={28} />
                  </div>
                )}
              </div>
              <div className="p-5 flex flex-col gap-2 flex-grow">
                <h3 className="font-headline-sm text-headline-sm text-on-background">{row.title}</h3>
                <div className="mt-auto pt-3 flex items-center justify-between border-t border-outline-variant">
                  <span className="font-body-sm text-body-sm text-outline">{formatDateTime(row.created_at)}</span>
                  <div className="flex items-center gap-1">
                    <button type="button" className="p-2 rounded text-outline hover:text-secondary hover:bg-secondary/10 transition-colors" onClick={() => openEdit(row)}>
                      Edit
                    </button>
                    <DeleteButton label={`Delete ${row.title}`} onClick={() => requestDelete(row)} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {form && (
        <Modal title={form.id ? 'Edit video' : 'Add video archive'} onClose={close} wide>
          <form onSubmit={submit} className="space-y-5">
            {formError && <ErrorBanner message={formError} />}
            <Field label="Title" required>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Navigating Healthcare Crises: Lessons from the Field"
                className={inputCls}
              />
            </Field>
            <YouTubeField value={form.youtube_url} onChange={(youtube_url) => setForm({ ...form, youtube_url })} required />
            <SubmitBar submitting={saving} submitLabel={form.id ? 'Save changes' : 'Add video'} onClose={close} />
          </form>
        </Modal>
      )}

      {toDelete && (
        <ConfirmDialog
          title="Delete video"
          message={`“${toDelete.title}” will be permanently removed from the admin panel and the public site.`}
          onConfirm={confirmDelete}
          onClose={() => requestDelete(null)}
          busy={deleting}
        />
      )}
    </div>
  );
}

// ---------- Layer 3: Alumni Stories ----------

type AlumniForm = BaseForm & { name: string; designation: string; imageUrl: string; file: File | null; story: string };

const emptyAlumni: AlumniForm = { id: null, name: '', designation: '', imageUrl: '', file: null, story: '' };

function AlumniTab() {
  const { rows, loading, form, setForm, saving, formError, toDelete, deleting, openCreate, openEdit, close, submit, confirmDelete, requestDelete } =
    useContentCrud<AlumniStory, AlumniForm>({
      table: 'alumni_stories',
      empty: () => ({ ...emptyAlumni }),
      toForm: (row) => ({
        id: row.id,
        name: row.name,
        designation: row.designation,
        imageUrl: row.image_url,
        file: null,
        story: row.story,
      }),
      toPayload: async (f) => ({
        name: f.name.trim(),
        designation: f.designation.trim(),
        image_url: f.file ? await uploadImage(f.file, 'alumni') : f.imageUrl,
        story: f.story,
      }),
      deleteName: (row) => row.name,
    });
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => `${row.name} ${row.designation} ${row.story}`.toLowerCase().includes(q));
  }, [rows, query]);

  return (
    <div className="space-y-6">
      <Toolbar onCreate={openCreate} createLabel="Add story" onSearch={setQuery} search={query} placeholder="Search alumni name or designation…" />
      {formError && !form && <ErrorBanner message={formError} />}
      {loading ? (
        <LoadingRows label="Loading stories…" />
      ) : rows.length === 0 ? (
        <EmptyState title="No alumni stories yet" message="Publish alumni profiles and their journeys after the program." />
      ) : filtered.length === 0 ? (
        <EmptyState title="No matching stories" message="No alumni story matches your search." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
          {filtered.map((row) => (
            <article key={row.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                {row.image_url ? (
                  <img src={row.image_url} alt={row.name} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <span className="w-12 h-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
                    <UserRound size={20} />
                  </span>
                )}
                <div className="min-w-0">
                  <h3 className="font-headline-sm text-headline-sm text-on-background leading-tight">{row.name}</h3>
                  <p className="font-body-sm text-body-sm text-secondary mt-0.5">{row.designation}</p>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <button type="button" className="p-1.5 rounded text-outline hover:text-secondary hover:bg-secondary/10 transition-colors" onClick={() => openEdit(row)}>
                    Edit
                  </button>
                  <DeleteButton label={`Delete ${row.name}`} onClick={() => requestDelete(row)} />
                </div>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-3">
                {row.story.replace(/<[^>]*>/g, ' ').trim() || 'No story written yet.'}
              </p>
              <span className="mt-auto font-body-sm text-body-sm text-outline">{formatDateTime(row.created_at)}</span>
            </article>
          ))}
        </div>
      )}

      {form && (
        <Modal title={form.id ? 'Edit alumni story' : 'Add alumni story'} onClose={close} wide>
          <form onSubmit={submit} className="space-y-5">
            {formError && <ErrorBanner message={formError} />}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Alumni name" required>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Dr. Sarah Mensah"
                  className={inputCls}
                />
              </Field>
              <Field label="Designation & facility" required hint="e.g. Chief Medical Officer, Regional Health Authority">
                <input
                  type="text"
                  required
                  value={form.designation}
                  onChange={(e) => setForm({ ...form, designation: e.target.value })}
                  placeholder="Chief Medical Officer, Regional Health Authority"
                  className={inputCls}
                />
              </Field>
            </div>
            <Field label="Alumni photo" required>
              <ImageUpload file={form.file} onChange={(file) => setForm({ ...form, file })} src={form.imageUrl} />
            </Field>
            <Field label="Story" hint="Write the alumni story — use the toolbar to format.">
              <RichTextEditor value={form.story} onChange={(story) => setForm({ ...form, story })} minHeight={200} />
            </Field>
            <SubmitBar submitting={saving} submitLabel={form.id ? 'Save changes' : 'Add story'} onClose={close} />
          </form>
        </Modal>
      )}

      {toDelete && (
        <ConfirmDialog
          title="Delete alumni story"
          message={`“${toDelete.name}” will be permanently removed from the admin panel and the public site.`}
          onConfirm={confirmDelete}
          onClose={() => requestDelete(null)}
          busy={deleting}
        />
      )}
    </div>
  );
}

// ---------- Layer 4: News & Announcements ----------

type NewsForm = BaseForm & { title: string; date_label: string; excerpt: string; content: string; imageUrl: string; file: File | null };

const emptyNews: NewsForm = { id: null, title: '', date_label: '', excerpt: '', content: '', imageUrl: '', file: null };

function NewsTab() {
  const { rows, loading, form, setForm, saving, formError, toDelete, deleting, openCreate, openEdit, close, submit, confirmDelete, requestDelete } =
    useContentCrud<NewsPost, NewsForm>({
      table: 'news_posts',
      empty: () => ({ ...emptyNews }),
      toForm: (row) => ({
        id: row.id,
        title: row.title,
        date_label: row.date_label,
        excerpt: row.excerpt,
        content: row.content,
        imageUrl: row.image_url,
        file: null,
      }),
      toPayload: async (f) => ({
        title: f.title.trim(),
        date_label: f.date_label.trim(),
        excerpt: f.excerpt.trim(),
        content: f.content,
        image_url: f.file ? await uploadImage(f.file, 'news') : f.imageUrl,
      }),
      deleteName: (row) => row.title,
    });
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => `${row.title} ${row.excerpt}`.toLowerCase().includes(q));
  }, [rows, query]);

  return (
    <div className="space-y-6">
      <Toolbar onCreate={openCreate} createLabel="New post" onSearch={setQuery} search={query} placeholder="Search title or excerpt…" />
      {formError && !form && <ErrorBanner message={formError} />}
      {loading ? (
        <LoadingRows label="Loading posts…" />
      ) : rows.length === 0 ? (
        <EmptyState title="No announcements yet" message="Publish news and announcements with a featured image and article content." />
      ) : filtered.length === 0 ? (
        <EmptyState title="No matching posts" message="No announcement matches your search." />
      ) : (
        <div className="space-y-3">
          {filtered.map((row) => (
            <article key={row.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col sm:flex-row">
              <div className="sm:w-56 shrink-0 aspect-video sm:aspect-auto bg-surface-container">
                {row.image_url ? (
                  <img src={row.image_url} alt={row.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-outline">
                    <Newspaper size={22} />
                  </div>
                )}
              </div>
              <div className="p-5 flex flex-col gap-2 flex-grow min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-label-bold text-label-bold text-secondary uppercase tracking-wider">{row.date_label}</span>
                  <span className="font-body-sm text-body-sm text-outline">· {readTimeMinutes(row.content)} min read</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-background">{row.title}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">{row.excerpt}</p>
                <div className="mt-auto pt-2 flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-outline">{formatDateTime(row.created_at)}</span>
                  <div className="flex items-center gap-1">
                    <button type="button" className="p-2 rounded text-outline hover:text-secondary hover:bg-secondary/10 transition-colors" onClick={() => openEdit(row)}>
                      Edit
                    </button>
                    <DeleteButton label={`Delete ${row.title}`} onClick={() => requestDelete(row)} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {form && (
        <Modal title={form.id ? 'Edit announcement' : 'New announcement'} onClose={close} wide>
          <form onSubmit={submit} className="space-y-5">
            {formError && <ErrorBanner message={formError} />}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Title" required>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="World Patient Safety Day 2023"
                  className={inputCls}
                />
              </Field>
              <Field label="Date" required hint="e.g. SEP 17, 2023">
                <input
                  type="text"
                  required
                  value={form.date_label}
                  onChange={(e) => setForm({ ...form, date_label: e.target.value })}
                  placeholder="SEP 17, 2023"
                  className={inputCls}
                />
              </Field>
            </div>
            <Field label="Featured image" required>
              <ImageUpload file={form.file} onChange={(file) => setForm({ ...form, file })} src={form.imageUrl} />
            </Field>
            <Field label="Excerpt" required>
              <textarea
                required
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                rows={3}
                placeholder="Highlighting the critical importance of patient safety in healthcare systems across Africa."
                className={`${inputCls} resize-y`}
              />
            </Field>
            <Field label="Content" hint="Use the toolbar to format headings, lists and links.">
              <RichTextEditor value={form.content} onChange={(content) => setForm({ ...form, content })} minHeight={240} />
            </Field>
            <SubmitBar submitting={saving} submitLabel={form.id ? 'Save changes' : 'Publish post'} onClose={close} />
          </form>
        </Modal>
      )}

      {toDelete && (
        <ConfirmDialog
          title="Delete announcement"
          message={`“${toDelete.title}” will be permanently removed from the admin panel and the public site.`}
          onConfirm={confirmDelete}
          onClose={() => requestDelete(null)}
          busy={deleting}
        />
      )}
    </div>
  );
}

// ---------- Resources page ----------

type ResourceTabKey = 'gallery' | 'videos' | 'alumni' | 'news';

export default function AdminResources() {
  const [active, setActive] = useState<ResourceTabKey>('gallery');

  const gallery = useTable<GalleryImage>('gallery_images');
  const videos = useTable<VideoArchive>('video_archives');
  const alumni = useTable<AlumniStory>('alumni_stories');
  const news = useTable<NewsPost>('news_posts');

  const counts = {
    gallery: gallery.rows.length,
    videos: videos.rows.length,
    alumni: alumni.rows.length,
    news: news.rows.length,
  };
  const loading = gallery.loading || videos.loading || alumni.loading || news.loading;
  const error = gallery.error || videos.error || alumni.error || news.error;

  const tabDefs = [
    { key: 'gallery', label: 'Image Album', count: counts.gallery },
    { key: 'videos', label: 'Video Archives', count: counts.videos },
    { key: 'alumni', label: 'Alumni Stories', count: counts.alumni },
    { key: 'news', label: 'News & Announcements', count: counts.news },
  ];

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Resources"
        subtitle="Manage the image album, video archives, alumni stories and news & announcements."
      />
      <SetupBanner />
      {error && !loading && <ErrorBanner message={error} />}

      <MetricsGrid>
        <MetricCard label="Total images" value={counts.gallery} hint="In the image album" icon={<Images size={18} />} />
        <MetricCard label="Video archives" value={counts.videos} hint="Published sessions" icon={<Video size={18} />} />
        <MetricCard label="Alumni stories" value={counts.alumni} hint="Featured alumni" icon={<GraduationCap size={18} />} />
        <MetricCard label="News & announcements" value={counts.news} hint="Published posts" icon={<Newspaper size={18} />} />
      </MetricsGrid>

      <Tabs tabs={tabDefs} active={active} onChange={(key) => setActive(key as ResourceTabKey)} />

      <div className="pt-6">
        {active === 'gallery' && <GalleryTab />}
        {active === 'videos' && <VideosTab />}
        {active === 'alumni' && <AlumniTab />}
        {active === 'news' && <NewsTab />}
      </div>
    </div>
  );
}