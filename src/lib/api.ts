import { errorMessage, isSupabaseConfigured, SETUP_MESSAGE, supabase } from '@/lib/supabase';

const UPLOAD_BUCKET = 'admin-uploads';

export type Enrollment = {
  id: string;
  created_at: string;
  course_slug: string;
  course_title: string;
  first_name: string;
  surname: string;
  other_name: string | null;
  dob: string | null;
  gender: string;
  phone: string;
  email: string;
  country: string;
  state_region: string;
  education_level: string;
  organization: string;
  job_title: string;
  responsibilities: string;
  key_challenges: string;
  goals: string;
  referral_source: string;
  certified: boolean;
};

export type Webinar = {
  id: string;
  created_at: string;
  category: string;
  title: string;
  speakers: string;
  youtube_url: string;
};

export type Publication = {
  id: string;
  created_at: string;
  categories: string[];
  title: string;
  description: string;
  pub_date: string;
  file_url: string | null;
};

export type Insight = {
  id: string;
  created_at: string;
  categories: string[];
  title: string;
  excerpt: string;
  author: string;
  content: string;
};

export type GalleryImage = {
  id: string;
  created_at: string;
  title: string;
  image_url: string;
  date_label: string;
};

export type VideoArchive = {
  id: string;
  created_at: string;
  title: string;
  youtube_url: string;
};

export type AlumniStory = {
  id: string;
  created_at: string;
  name: string;
  image_url: string;
  designation: string;
  story: string;
};

export type NewsPost = {
  id: string;
  created_at: string;
  title: string;
  image_url: string;
  date_label: string;
  excerpt: string;
  content: string;
};

export type Inquiry = {
  id: string;
  created_at: string;
  inquiry_type: string;
  full_name: string;
  organization: string | null;
  email: string;
  subject: string | null;
  message: string;
};

export type PublicationDownload = {
  id: string;
  created_at: string;
  publication_title: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  organisation: string;
  job_title: string;
  consent_updates: boolean;
};

export type AdminTable =
  | 'enrollments'
  | 'webinars'
  | 'publications'
  | 'insights'
  | 'gallery_images'
  | 'video_archives'
  | 'alumni_stories'
  | 'news_posts'
  | 'inquiries'
  | 'publication_downloads';

function requireClient() {
  if (!isSupabaseConfigured || !supabase) throw new Error(SETUP_MESSAGE);
  return supabase;
}

export async function listRows<T>(table: AdminTable): Promise<T[]> {
  const client = requireClient();
  const { data, error } = await client
    .from(table)
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as T[];
}

export async function countRows(table: AdminTable): Promise<number> {
  const client = requireClient();
  const { count, error } = await client.from(table).select('id', { count: 'exact', head: true });
  if (error) throw error;
  return count ?? 0;
}

export async function insertRow<T>(table: AdminTable, row: Record<string, unknown>): Promise<T> {
  const client = requireClient();
  const { data, error } = await client.from(table).insert(row).select().single();
  if (error) throw error;
  return data as T;
}

export async function updateRow<T>(table: AdminTable, id: string, patch: Record<string, unknown>): Promise<T> {
  const client = requireClient();
  const { data, error } = await client.from(table).update(patch).eq('id', id).select().single();
  if (error) throw error;
  return data as T;
}

export async function deleteRow(table: AdminTable, id: string): Promise<void> {
  const client = requireClient();
  const { error } = await client.from(table).delete().eq('id', id);
  if (error) throw error;
}

export async function createEnrollment(
  row: Omit<Enrollment, 'id' | 'created_at'>,
): Promise<Enrollment> {
  return insertRow<Enrollment>('enrollments', row as Record<string, unknown>);
}

export async function createInquiry(
  row: Omit<Inquiry, 'id' | 'created_at'>,
): Promise<Inquiry> {
  return insertRow<Inquiry>('inquiries', row as Record<string, unknown>);
}

export async function createPublicationDownload(
  row: Omit<PublicationDownload, 'id' | 'created_at'>,
): Promise<PublicationDownload> {
  return insertRow<PublicationDownload>('publication_downloads', row as Record<string, unknown>);
}

// ---------- YouTube helpers ----------

export function youtubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([\w-]{11})/,
    /(?:youtu\.be\/)([\w-]{11})/,
    /(?:youtube\.com\/embed\/)([\w-]{11})/,
    /(?:youtube\.com\/shorts\/)([\w-]{11})/,
    /(?:youtube\.com\/live\/)([\w-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  if (/^[\w-]{11}$/.test(url.trim())) return url.trim();
  return null;
}

export function youtubeThumb(url: string): string {
  const id = youtubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '';
}

export function youtubeWatchUrl(url: string): string {
  const id = youtubeId(url);
  return id ? `https://www.youtube.com/watch?v=${id}` : url;
}

// ---------- Image upload ----------

function storagePath(folder: string, file: File, extension: string): string {
  return `${folder}/${Date.now()}-${file.name
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .toLowerCase()}.${extension}`;
}

async function optimizeImage(file: File, maxWidth = 1600, quality = 0.82): Promise<Blob> {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxWidth / bitmap.width);
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const ctx = canvas.getContext('2d');
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/jpeg', quality),
    );
    return blob ?? file;
  } catch {
    return file;
  }
}

export async function uploadImage(file: File, folder: string): Promise<string> {
  const client = requireClient();
  const blob = await optimizeImage(file);
  const extension = blob.type === 'image/png' ? 'png' : 'jpg';
  const path = storagePath(folder, file, extension);
  const { error } = await client.storage.from(UPLOAD_BUCKET).upload(path, blob, {
    contentType: blob.type || 'image/jpeg',
    upsert: false,
  });
  if (error) throw new Error(`Image upload failed: ${errorMessage(error)}`);
  const { data } = client.storage.from(UPLOAD_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function uploadDocument(file: File, folder: string, maxMb = 20): Promise<string> {
  const client = requireClient();
  if (file.size > maxMb * 1024 * 1024) {
    throw new Error(`Document must be ${maxMb}MB or smaller (selected file is ${(file.size / (1024 * 1024)).toFixed(1)}MB).`);
  }
  const extension = file.name.includes('.') ? file.name.split('.').pop()!.toLowerCase() : 'file';
  const path = storagePath(folder, file, extension);
  const { error } = await client.storage.from(UPLOAD_BUCKET).upload(path, file, {
    contentType: file.type || 'application/octet-stream',
    upsert: false,
  });
  if (error) throw new Error(`Document upload failed: ${errorMessage(error)}`);
  const { data } = client.storage.from(UPLOAD_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

// ---------- CSV export ----------

export function toCsv(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return '';
  const headers = Object.keys(rows[0]);
  const escape = (value: unknown) => {
    const str = value == null ? '' : String(value);
    return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
  };
  const lines = [headers.join(',')];
  for (const row of rows) {
    lines.push(headers.map((h) => escape(row[h])).join(','));
  }
  return lines.join('\n');
}

export function downloadCsv(filename: string, csv: string) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

// ---------- File download ----------

export function fileDownloadName(title: string, url: string): string {
  const extension = url.split('?')[0].match(/\.[A-Za-z0-9]{2,5}$/)?.[0] ?? '.pdf';
  const slug =
    title
      .trim()
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .toLowerCase() || 'publication';
  return `${slug}${extension}`;
}

/** Starts a download immediately: fetches the file as a blob so the browser
 * saves it, falling back to a plain anchor click when fetching is blocked. */
export async function triggerFileDownload(url: string, filename: string): Promise<void> {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 10_000);
  } catch {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}
