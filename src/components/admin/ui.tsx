import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Bold, Eraser, FileText, Heading2, Heading3, Image as ImageIcon, Italic, Link2, List, ListOrdered, Pilcrow, Plus, Search, Trash2, Underline, X, Youtube } from 'lucide-react';
import { isSupabaseConfigured, SETUP_MESSAGE } from '@/lib/supabase';
import { youtubeId, youtubeThumb } from '@/lib/api';

export const inputCls =
  'w-full px-3 py-2.5 border border-outline-variant rounded-lg bg-surface-container-lowest focus:border-secondary focus:ring-1 focus:ring-secondary font-body-md text-sm text-on-background outline-none transition-colors placeholder:text-outline';

export const labelCls = 'block font-label-bold text-label-bold text-on-surface mb-1.5 uppercase tracking-wider';

export const btnPrimary =
  'inline-flex items-center justify-center gap-2 px-5 py-2.5 font-label-bold text-label-bold uppercase tracking-wider text-on-primary bg-secondary rounded hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed';

export const btnSecondary =
  'inline-flex items-center justify-center gap-2 px-5 py-2.5 font-label-bold text-label-bold uppercase tracking-wider text-on-background border border-outline-variant rounded hover:bg-surface-container-low transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

export function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div>
        <h1 className="font-headline-md text-headline-md text-on-background">{title}</h1>
        {subtitle && <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function MetricCard({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="font-label-bold text-label-bold text-outline uppercase tracking-wider">{label}</span>
        {icon && <span className="text-secondary">{icon}</span>}
      </div>
      <p className="font-headline-md text-headline-md text-on-background">{value}</p>
      {hint && <p className="font-body-sm text-body-sm text-on-surface-variant">{hint}</p>}
    </div>
  );
}

export function MetricsGrid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{children}</div>;
}

export function Modal({
  title,
  onClose,
  children,
  wide,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[80] flex items-start sm:items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="fixed inset-0 bg-on-surface/60 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div
        className={`relative w-full ${wide ? 'max-w-3xl' : 'max-w-xl'} bg-surface-container-lowest rounded-xl border border-outline-variant shadow-[0_-20px_60px_rgba(25,28,30,0.35)] animate-drawer-in my-6`}
      >
        <div className="h-1.5 w-full bg-secondary rounded-t-xl" />
        <div className="flex items-center justify-between px-6 md:px-8 pt-5 pb-4 border-b border-outline-variant">
          <h2 className="font-headline-sm text-headline-sm text-on-background">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="w-9 h-9 rounded-full bg-surface-container hover:bg-secondary hover:text-on-primary flex items-center justify-center text-on-surface transition-colors duration-200"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-6 md:px-8 py-6">{children}</div>
      </div>
    </div>
  );
}

export function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className={labelCls}>
        {label} {required && <span className="text-secondary">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-outline mt-1">{hint}</p>}
    </div>
  );
}

export function TagInput({
  value,
  onChange,
  placeholder = 'Type a category and press Enter',
}: {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = useState('');

  const add = (raw: string) => {
    const tag = raw.replace(/^#/, '').trim();
    if (!tag) return;
    if (value.some((t) => t.toLowerCase() === tag.toLowerCase())) {
      setDraft('');
      return;
    }
    onChange([...value, tag]);
    setDraft('');
  };

  return (
    <div className="border border-outline-variant rounded-lg bg-surface-container-lowest p-2 flex flex-wrap gap-2 focus-within:border-secondary focus-within:ring-1 focus-within:ring-secondary transition-colors">
      {value.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1.5 bg-secondary/10 text-secondary px-2.5 py-1 rounded font-label-bold text-label-bold uppercase tracking-wider"
        >
          #{tag}
          <button
            type="button"
            aria-label={`Remove ${tag}`}
            onClick={() => onChange(value.filter((t) => t !== tag))}
            className="hover:text-on-surface"
          >
            <X size={12} />
          </button>
        </span>
      ))}
      <input
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            add(draft);
          } else if (e.key === 'Backspace' && !draft && value.length > 0) {
            onChange(value.slice(0, -1));
          }
        }}
        onBlur={() => add(draft)}
        placeholder={value.length === 0 ? placeholder : 'Add another…'}
        className="flex-grow min-w-[10rem] bg-transparent px-1 py-1 font-body-md text-sm outline-none placeholder:text-outline"
      />
    </div>
  );
}

const RTE_BUTTON =
  'p-2 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-background transition-colors';

export function RichTextEditor({
  value,
  onChange,
  minHeight = 220,
}: {
  value: string;
  onChange: (html: string) => void;
  minHeight?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState({ bold: false, italic: false, underline: false });

  useEffect(() => {
    const el = ref.current;
    if (el && el.innerHTML !== (value || '')) el.innerHTML = value || '';
    // Only sync initial content; later edits come from the DOM.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const syncState = () => {
    try {
      setActive({
        bold: document.queryCommandState('bold'),
        italic: document.queryCommandState('italic'),
        underline: document.queryCommandState('underline'),
      });
    } catch {
      /* queryCommandState unsupported */
    }
  };

  const emit = () => {
    if (ref.current) onChange(ref.current.innerHTML);
  };

  const exec = (command: string, arg?: string) => {
    ref.current?.focus();
    document.execCommand(command, false, arg);
    emit();
    syncState();
  };

  const insertLink = () => {
    const url = window.prompt('Link URL');
    if (url) exec('createLink', url);
  };

  return (
    <div className="border border-outline-variant rounded-lg bg-surface-container-lowest overflow-hidden focus-within:border-secondary focus-within:ring-1 focus-within:ring-secondary transition-colors">
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-outline-variant bg-surface-container-low">
        <button type="button" title="Bold" className={`${RTE_BUTTON} ${active.bold ? 'text-secondary bg-secondary/10' : ''}`} onMouseDown={(e) => e.preventDefault()} onClick={() => exec('bold')}>
          <Bold size={16} />
        </button>
        <button type="button" title="Italic" className={`${RTE_BUTTON} ${active.italic ? 'text-secondary bg-secondary/10' : ''}`} onMouseDown={(e) => e.preventDefault()} onClick={() => exec('italic')}>
          <Italic size={16} />
        </button>
        <button type="button" title="Underline" className={`${RTE_BUTTON} ${active.underline ? 'text-secondary bg-secondary/10' : ''}`} onMouseDown={(e) => e.preventDefault()} onClick={() => exec('underline')}>
          <Underline size={16} />
        </button>
        <span className="w-px h-5 bg-outline-variant mx-1" />
        <button type="button" title="Heading" className={RTE_BUTTON} onMouseDown={(e) => e.preventDefault()} onClick={() => exec('formatBlock', '<h2>')}>
          <Heading2 size={16} />
        </button>
        <button type="button" title="Subheading" className={RTE_BUTTON} onMouseDown={(e) => e.preventDefault()} onClick={() => exec('formatBlock', '<h3>')}>
          <Heading3 size={16} />
        </button>
        <button type="button" title="Paragraph" className={RTE_BUTTON} onMouseDown={(e) => e.preventDefault()} onClick={() => exec('formatBlock', '<p>')}>
          <Pilcrow size={16} />
        </button>
        <span className="w-px h-5 bg-outline-variant mx-1" />
        <button type="button" title="Bulleted list" className={RTE_BUTTON} onMouseDown={(e) => e.preventDefault()} onClick={() => exec('insertUnorderedList')}>
          <List size={16} />
        </button>
        <button type="button" title="Numbered list" className={RTE_BUTTON} onMouseDown={(e) => e.preventDefault()} onClick={() => exec('insertOrderedList')}>
          <ListOrdered size={16} />
        </button>
        <button type="button" title="Link" className={RTE_BUTTON} onMouseDown={(e) => e.preventDefault()} onClick={insertLink}>
          <Link2 size={16} />
        </button>
        <span className="w-px h-5 bg-outline-variant mx-1" />
        <button
          type="button"
          title="Clear formatting"
          className={RTE_BUTTON}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            exec('removeFormat');
            exec('formatBlock', '<p>');
          }}
        >
          <Eraser size={16} />
        </button>
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        data-placeholder="Write your content…"
        onInput={emit}
        onKeyUp={syncState}
        onMouseUp={syncState}
        className="rte-editor px-4 py-3 outline-none font-body-md text-body-md text-on-background"
        style={{ minHeight }}
      />
    </div>
  );
}

export function ImageUpload({
  file,
  onChange,
  hint,
  src,
}: {
  file: File | null;
  onChange: (file: File | null) => void;
  hint?: string;
  src?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const preview = useMemo(
    () => (file ? URL.createObjectURL(file) : src ?? ''),
    [file, src],
  );

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith('blob:')) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="flex items-start gap-4">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="w-32 h-24 rounded-lg border border-dashed border-outline-variant bg-surface-container-low hover:border-secondary flex flex-col items-center justify-center gap-1 text-on-surface-variant hover:text-secondary transition-colors overflow-hidden shrink-0"
      >
        {preview ? (
          <img src={preview} alt="Upload preview" className="w-full h-full object-cover" />
        ) : (
          <>
            <ImageIcon size={20} />
            <span className="font-label-bold text-[10px] uppercase tracking-wider">Upload</span>
          </>
        )}
      </button>
      <div className="text-xs text-outline pt-1">
        {file ? <p className="text-on-surface font-semibold">{file.name}</p> : src ? <p className="text-on-surface font-semibold">Current image</p> : <p>No image selected</p>}
        {hint && <p className="mt-1">{hint}</p>}
        <div className="flex gap-3 mt-2">
          <button type="button" className="text-secondary font-semibold hover:underline" onClick={() => inputRef.current?.click()}>
            {file || src ? 'Change' : 'Choose file'}
          </button>
          {(file || src) && (
            <button type="button" className="text-secondary font-semibold hover:underline" onClick={() => onChange(null)}>
              Remove
            </button>
          )}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          onChange(e.target.files?.[0] ?? null);
          e.target.value = '';
        }}
      />
    </div>
  );
}

export function FileUpload({
  file,
  onChange,
  hint,
  src,
  accept,
  maxMb = 20,
}: {
  file: File | null;
  onChange: (file: File | null) => void;
  hint?: string;
  src?: string;
  accept?: string;
  maxMb?: number;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const sizeLabel = file ? `(${(file.size / (1024 * 1024)).toFixed(1)}MB)` : '';

  return (
    <div className="flex items-start gap-4">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="w-32 h-24 rounded-lg border border-dashed border-outline-variant bg-surface-container-low hover:border-secondary flex flex-col items-center justify-center gap-1 text-on-surface-variant hover:text-secondary transition-colors overflow-hidden shrink-0"
      >
        <FileText size={22} />
        <span className="font-label-bold text-[10px] uppercase tracking-wider">Upload</span>
      </button>
      <div className="text-xs text-outline pt-1 min-w-0">
        {file ? (
          <p className="text-on-surface font-semibold break-all">{file.name} {sizeLabel}</p>
        ) : src ? (
          <p className="text-on-surface font-semibold break-all">Current document attached</p>
        ) : (
          <p>No document selected</p>
        )}
        {hint && <p className="mt-1">{hint}</p>}
        <p className="mt-1">Maximum file size: {maxMb}MB.</p>
        <div className="flex gap-3 mt-2">
          <button type="button" className="text-secondary font-semibold hover:underline" onClick={() => inputRef.current?.click()}>
            {file || src ? 'Change' : 'Choose file'}
          </button>
          {(file || src) && (
            <button type="button" className="text-secondary font-semibold hover:underline" onClick={() => onChange(null)}>
              Remove
            </button>
          )}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept ?? '.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.odt'}
        className="hidden"
        onChange={(e) => {
          const next = e.target.files?.[0] ?? null;
          if (next && next.size > maxMb * 1024 * 1024) {
            alert(`Please choose a document of ${maxMb}MB or smaller.`);
            e.target.value = '';
            return;
          }
          onChange(next);
          e.target.value = '';
        }}
      />
    </div>
  );
}

export function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <div className="border border-dashed border-outline-variant rounded-xl py-14 px-6 text-center bg-surface-container-lowest">
      <p className="font-headline-sm text-headline-sm text-on-background">{title}</p>
      <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 max-w-md mx-auto">{message}</p>
    </div>
  );
}

export function LoadingRows({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="border border-outline-variant rounded-xl py-12 text-center bg-surface-container-lowest">
      <p className="font-body-sm text-body-sm text-on-surface-variant animate-pulse">{label}</p>
    </div>
  );
}

export function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="border border-red-300 bg-red-50 text-red-800 rounded-lg px-4 py-3 font-body-sm text-body-sm">
      {message}
    </div>
  );
}

export function SetupBanner() {
  if (isSupabaseConfigured) return null;
  return (
    <div className="border border-amber-300 bg-amber-50 text-amber-900 rounded-lg px-4 py-3 font-body-sm text-body-sm">
      <span className="font-semibold">Setup required.</span> {SETUP_MESSAGE}
    </div>
  );
}

export function SubmitBar({
  submitting,
  submitLabel,
  onClose,
}: {
  submitting: boolean;
  submitLabel: string;
  onClose?: () => void;
}) {
  return (
    <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant mt-6">
      {onClose && (
        <button type="button" className={btnSecondary} onClick={onClose} disabled={submitting}>
          Cancel
        </button>
      )}
      <button type="submit" className={btnPrimary} disabled={submitting}>
        {!submitting && <Plus size={16} />}
        {submitting ? 'Saving…' : submitLabel}
      </button>
    </div>
  );
}

export function DeleteButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="p-2 rounded text-outline hover:text-secondary hover:bg-secondary/10 transition-colors"
    >
      <Trash2 size={16} />
    </button>
  );
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Search…',
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative w-full max-w-md">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${inputCls} pl-9`}
      />
    </div>
  );
}

export function YouTubeField({
  value,
  onChange,
  label = 'YouTube link',
  required,
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  required?: boolean;
}) {
  const thumb = youtubeThumb(value);
  const valid = Boolean(youtubeId(value));

  return (
    <Field label={label} required={required} hint="Paste a YouTube URL — the video thumbnail is used as the cover on the public site.">
      <div className="flex items-start gap-4">
        <div className="w-40 shrink-0 rounded-lg overflow-hidden border border-outline-variant bg-surface-container aspect-video">
          {thumb ? (
            <img src={thumb} alt="Video thumbnail preview" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-1 text-outline">
              <Youtube size={20} />
              <span className="font-label-bold text-[10px] uppercase tracking-wider">Preview</span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <input
            type="url"
            value={value}
            required={required}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=…"
            className={inputCls}
          />
          {value.trim() !== '' && !valid && (
            <p className="text-xs text-red-700 mt-1">That does not look like a YouTube link yet.</p>
          )}
        </div>
      </div>
    </Field>
  );
}

export function ConfirmDialog({
  title,
  message,
  confirmLabel = 'Delete',
  onConfirm,
  onClose,
  busy,
}: {
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
  busy?: boolean;
}) {
  return (
    <Modal title={title} onClose={onClose}>
      <p className="font-body-md text-body-md text-on-surface-variant">{message}</p>
      <div className="flex items-center justify-end gap-3 pt-5 mt-5 border-t border-outline-variant">
        <button type="button" className={btnSecondary} onClick={onClose} disabled={busy}>
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={busy}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 font-label-bold text-label-bold uppercase tracking-wider text-on-primary bg-secondary rounded hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <Trash2 size={16} />
          {busy ? 'Deleting…' : confirmLabel}
        </button>
      </div>
    </Modal>
  );
}

export function Tabs({
  tabs,
  active,
  onChange,
}: {
  tabs: { key: string; label: string; count?: number }[];
  active: string;
  onChange: (key: string) => void;
}) {
  return (
    <div className="border-b border-outline-variant overflow-x-auto no-scrollbar">
      <div className="flex gap-6 min-w-max">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={`flex items-center gap-2 font-label-bold text-label-bold uppercase tracking-wider pb-2.5 px-1 border-b-2 transition-colors ${
              active === tab.key
                ? 'text-secondary border-secondary'
                : 'text-on-surface-variant border-transparent hover:text-on-background'
            }`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] ${
                  active === tab.key ? 'bg-secondary/10 text-secondary' : 'bg-surface-container text-on-surface-variant'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
