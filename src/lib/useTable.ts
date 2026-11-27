import { useCallback, useEffect, useState } from 'react';
import { errorMessage } from '@/lib/supabase';
import { countRows, listRows, type AdminTable } from '@/lib/api';

export function useTable<T>(table: AdminTable) {
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setRows(await listRows<T>(table));
    } catch (err) {
      setError(errorMessage(err));
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [table]);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { rows, loading, error, reload };
}

const COUNT_TABLES: AdminTable[] = [
  'enrollments',
  'webinars',
  'publications',
  'insights',
  'gallery_images',
  'video_archives',
  'alumni_stories',
  'news_posts',
  'inquiries',
  'publication_downloads',
];

export type Counts = Record<AdminTable, number>;

export function useCounts() {
  const [counts, setCounts] = useState<Counts | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setError(null);
    try {
      const values = await Promise.all(COUNT_TABLES.map((t) => countRows(t)));
      const next = {} as Counts;
      COUNT_TABLES.forEach((t, i) => {
        next[t] = values[i];
      });
      setCounts(next);
    } catch (err) {
      setError(errorMessage(err));
      setCounts(null);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { counts, error, reload };
}
