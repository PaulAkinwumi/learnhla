import { useEffect, useMemo, useState } from 'react';
import { Search, Download, ChevronLeft, ChevronRight, Bell, FileText } from 'lucide-react';
import { listRows, type Publication as PublicationRecord } from '@/lib/api';
import { isSupabaseConfigured } from '@/lib/supabase';
import PublicationDownloadForm from '@/components/PublicationDownloadForm';

type PublicationCard = {
  id: string | number;
  tags: string[];
  title: string;
  description: string;
  date: string;
  size: string;
  image: string | null;
  alt: string;
  fileUrl: string | null;
};

const staticPublications: PublicationCard[] = [
  {
    id: 1,
    tags: ['PublicHealth', 'Financing'],
    title: 'Sustainable Financing for NCDs in Sub-Saharan Africa',
    description:
      'An analysis of current funding models and proposed frameworks for sustainable non-communicable disease management.',
    date: 'Oct 2024',
    size: 'PDF • 1.2MB',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDYDJs4gD88jIyoACojMBtd14cayMg6_KOC9sie4zJKzZgclY91dHEJqFs2uhCrCq-D1OyZtwEQucfL8AaWn6Jj9ktdTLGV5s0Bwniv4qIpVrJcunDtFocFE62vS26X9mx8fDoW5vlV5aUYxm7kfBAgPoFFj9U83D2-nUnia75k1G5tdBp9vO_OrdCs4xm-0kleesW6WnunhoGurGOlj74XmaMGzIaaJltY0hxpxnYdMTgV7v4MVEaZfQ',
    alt: 'A professional document cover depicting sustainable financing in healthcare.',
    fileUrl: null,
  },
  {
    id: 2,
    tags: ['Governance', 'Policy'],
    title: 'Strengthening Institutional Frameworks Post-Pandemic',
    description:
      'Policy recommendations for building resilient health sector governance structures based on recent crisis responses.',
    date: 'Sep 2024',
    size: 'PDF • 2.4MB',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCh__6B-D1BYadj9BAuTgYpgmjXu48zwf8DF4WrRTKu-8stfDSA5_AubdE8X-D2CTVNIoGk8L6VQrUTA4pdZhvXvQjH3EW_18nRi3k32BBWbvc7J1EGBmbdF7o1UAsiqtxBDtbGSm9yITzLzrRL-6bE9cyHssc8GYyNgyl56DlTxTVnvL0RGum1xEqJG1l9sh37yB2sTPmOfSCJzskIdfLbEXsLI4U1C1Srk3udqMMwWHT7G29m_sy5gw',
    alt: 'A minimalist document cover focusing on healthcare governance.',
    fileUrl: null,
  },
  {
    id: 3,
    tags: ['DigitalHealth', 'Innovation'],
    title: 'Digital Transformation in Primary Care Settings',
    description:
      'A case study review of successful digital health implementations in rural primary care facilities across East Africa.',
    date: 'Aug 2024',
    size: 'PDF • 3.1MB',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuACtnLMs5NQtjlPqOmDndyPVZAtXd8Sj0XOCKnO3_dkKStlDjPILxzHYIdsUDE54NzTk8HD1HlxqQCak6GagbOhgmm8rQx-wdgihKpZyMrdkEnK2oPjCNMqrgJDLO4ZLXFKCs52nk2Cx1b_Syrzx38pSKonkyNvTvJhUd_EBN8BHRJYXalFqycwNCiP7nWI_4V8HtPEc91gdI2KQq8y81h6Wzm6sWrawSFOFA0yWBJDAkMhiry3xsM4ag',
    alt: 'A data-driven report cover focused on digital health integration.',
    fileUrl: null,
  },
];

const featuredPublication = {
  tag: 'Flagship Report 2024',
  title: 'The State of Healthcare Leadership in Sub-Saharan Africa',
  description:
    'Our comprehensive annual analysis of leadership capacity, institutional resilience, and policy frameworks shaping the future of health systems across the continent.',
  size: 'PDF (4.5 MB)',
  image:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDfbNHwwI5VOnh3rfa_kq9etB7nIg-MmEE6EWYo1hMh83aL_qnN2U8Ob11DJlmqsLrkID_ZJPK7Vt7FOfseiKi470xiVaxV0GJ8RKTQA32WunDfYKIGNGRSzrvGYq7w5BevgwhCcBIC2ct9J3HkpMVmSBUepscxDm1-MfDbpsCqBl8YincwPrGaYXFN-gl91z7P2NF2QgmfGjWQoaah3gHkVlXwqt75AGXRvR2lpv0LaTuU_tffbL9SzQ',
  alt: 'A professional cover image for a healthcare report with abstract geometric shapes in deep executive blue and clinical teal.',
  fileUrl: null as string | null,
};

type DownloadTarget = { title: string; fileUrl: string | null };

export default function PublicationsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [dbRows, setDbRows] = useState<PublicationRecord[]>([]);
  const [downloadTarget, setDownloadTarget] = useState<DownloadTarget | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let cancelled = false;
    listRows<PublicationRecord>('publications')
      .then((rows) => {
        if (!cancelled) setDbRows(rows);
      })
      .catch(() => {
        /* keep the built-in library when the query fails */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const library = useMemo<PublicationCard[]>(
    () =>
      dbRows.map((row) => ({
        id: row.id,
        tags: row.categories,
        title: row.title,
        description: row.description,
        date: row.pub_date || 'Undated',
        size: 'PDF',
        image: null,
        alt: row.title,
        fileUrl: row.file_url,
      })),
    [dbRows],
  );

  const publications = library.length > 0 ? library : staticPublications;

  const featured = useMemo(() => {
    const row = dbRows[0];
    if (!row) return featuredPublication;
    return {
      tag: row.categories[0] ?? 'Latest Publication',
      title: row.title,
      description: row.description,
      size: 'PDF',
      image: null as string | null,
      alt: row.title,
      fileUrl: row.file_url,
    };
  }, [dbRows]);

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(publications.flatMap((pub) => pub.tags)))],
    [publications],
  );

  useEffect(() => {
    if (!categories.includes(activeCategory)) setActiveCategory('All');
  }, [categories, activeCategory]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return publications.filter((pub) => {
      const matchesCategory = activeCategory === 'All' || pub.tags.includes(activeCategory);
      const matchesQuery =
        !q || `${pub.title} ${pub.description} ${pub.tags.join(' ')}`.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [publications, activeCategory, search]);

  return (
    <div className="flex-grow flex flex-col">
      {/* Hero Section */}
      <section className="w-full px-margin-mobile md:px-margin-desktop py-[80px] md:py-[120px] bg-surface flex flex-col items-center text-center">
        <div className="flex flex-col items-center">
          <span className="font-label-bold text-label-bold text-secondary uppercase tracking-wider mb-4">Library</span>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mb-6 max-w-4xl text-balance">
            Research, Publications &amp; Policy Briefs
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl text-balance">
            Access our library of evidence-based research, policy recommendations, and strategic insights driving
            healthcare transformation across Africa.
          </p>
        </div>
      </section>

      {/* Filter/Search Bar */}
      <section className="w-full px-margin-mobile md:px-margin-desktop -mt-8 relative z-10">
        <div>
          <div className="bg-surface-container-lowest/95 backdrop-blur-md border border-outline-variant rounded-xl shadow-sm p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1 w-full relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search publications, topics, or authors..."
                className="w-full pl-12 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary font-body-md text-primary transition-colors"
              />
            </div>
            <div className="flex overflow-x-auto w-full md:w-auto gap-2 pb-2 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full font-label-bold text-label-bold whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-low text-on-surface-variant border border-outline-variant'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Publication */}
      <section className="w-full px-margin-mobile md:px-margin-desktop py-[80px]">
        <div>
          <div className="bg-primary-container rounded-xl overflow-hidden shadow-lg flex flex-col md:flex-row">
            <div className="md:w-1/2 relative min-h-[300px]">
              {featured.image ? (
                <img
                  src={featured.image}
                  alt={featured.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-secondary/10 text-secondary">
                  <FileText size={44} />
                  <span className="font-label-bold text-label-bold uppercase tracking-wider">Publication</span>
                </div>
              )}
            </div>
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-primary-container text-on-primary-container">
              <span className="inline-block px-3 py-1 bg-surface-tint/20 text-on-primary rounded-full font-label-bold text-label-bold w-max mb-6">
                {featured.tag}
              </span>
              <h2 className="font-headline-md text-headline-md text-on-primary font-bold mb-4">
                {featured.title}
              </h2>
              <p className="font-body-md text-body-md text-on-primary mb-8">
                {featured.description}
              </p>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setDownloadTarget({ title: featured.title, fileUrl: featured.fileUrl })}
                  className="flex items-center space-x-2 bg-primary text-on-primary px-6 py-3 rounded-lg font-label-bold text-label-bold hover:opacity-90 transition-opacity"
                >
                  <Download size={20} />
                  <span>Download Report</span>
                </button>
                <span className="font-body-sm text-body-sm text-on-primary">{featured.size}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Document Library Grid */}
      <section className="w-full px-margin-mobile md:px-margin-desktop py-[40px] pb-[120px]">
        <div>
          <div className="flex justify-between items-end mb-8">
            <h3 className="font-headline-sm text-headline-sm text-on-background">Recent Publications</h3>
            <div className="flex items-center space-x-2">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Sort by:</span>
              <select className="bg-surface-container-low border-none font-label-bold text-label-bold text-primary rounded focus:ring-0 cursor-pointer">
                <option>Newest First</option>
                <option>Oldest First</option>
                <option>Most Downloaded</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {visible.length === 0 ? (
              <div className="col-span-full border border-dashed border-outline-variant rounded-lg py-14 px-6 text-center bg-surface-container-lowest">
                <p className="font-headline-sm text-headline-sm text-on-background">No publications found</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                  Try another search term or category.
                </p>
              </div>
            ) : (
              visible.map((pub) => (
                <article
                  key={pub.id}
                  className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden flex flex-col hover:shadow-[0px_4px_20px_rgba(11,37,69,0.05)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="aspect-[4/3] bg-surface-variant relative">
                    {pub.image ? (
                      <img src={pub.image} alt={pub.alt} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-outline">
                        <FileText size={30} />
                        <span className="font-label-bold text-label-bold uppercase tracking-wider">PDF</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center space-x-2 mb-3">
                      {pub.tags.map((tag, i) => (
                        <span key={tag} className="flex items-center gap-2">
                          {i > 0 && <span className="font-label-bold text-label-bold text-outline-variant">•</span>}
                          <span className="font-label-bold text-label-bold text-secondary">#{tag}</span>
                        </span>
                      ))}
                    </div>
                    <h4 className="font-headline-sm text-headline-sm text-on-background mb-3 leading-tight line-clamp-2">
                      {pub.title}
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-6 line-clamp-3 flex-grow">
                      {pub.description}
                    </p>
                    <div className="pt-4 border-t border-surface-variant flex items-center justify-between mt-auto">
                      <div className="flex flex-col">
                        <span className="font-label-bold text-label-bold text-outline">{pub.date}</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">{pub.size}</span>
                      </div>
                      <button
                        aria-label={`Download ${pub.title}`}
                        onClick={() => setDownloadTarget({ title: pub.title, fileUrl: pub.fileUrl })}
                        className="text-primary p-2 rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors"
                      >
                        <Download size={20} />
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center items-center gap-2">
            <button className="p-2 border border-outline-variant rounded hover:bg-surface-variant text-on-surface-variant transition-colors disabled:opacity-50">
              <ChevronLeft size={20} />
            </button>
            <button className="w-10 h-10 border border-primary bg-primary/10 text-primary font-label-bold text-label-bold rounded flex items-center justify-center">
              1
            </button>
            <button className="w-10 h-10 border border-outline-variant hover:bg-surface-variant text-on-surface-variant font-label-bold text-label-bold rounded flex items-center justify-center transition-colors">
              2
            </button>
            <button className="w-10 h-10 border border-outline-variant hover:bg-surface-variant text-on-surface-variant font-label-bold text-label-bold rounded flex items-center justify-center transition-colors">
              3
            </button>
            <span className="text-outline-variant px-2">...</span>
            <button className="w-10 h-10 border border-outline-variant hover:bg-surface-variant text-on-surface-variant font-label-bold text-label-bold rounded flex items-center justify-center transition-colors">
              8
            </button>
            <button className="p-2 border border-outline-variant rounded hover:bg-surface-variant text-on-surface-variant transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Stay Updated / Lead Capture */}
      <section className="w-full bg-surface-container-low border-t border-outline-variant py-[80px] px-margin-mobile md:px-margin-desktop">
        <div className="max-w-3xl mx-auto text-center">
          <Bell size={48} className="text-display-lg text-secondary mx-auto mb-4" fill="currentColor" />
          <h3 className="font-headline-md text-headline-md text-on-background mb-4">Stay Updated</h3>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8">
            Subscribe to receive alerts when new policy briefs, research papers, or annual reports are published to our
            library.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="Enter your professional email address"
              className="flex-1 px-4 py-3 border border-outline-variant rounded-lg bg-surface-container-lowest focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary font-body-md"
            />
            <button
              type="submit"
              className="bg-primary text-on-primary px-8 py-3 rounded-lg font-label-bold text-label-bold hover:bg-primary-container transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          <p className="font-body-sm text-body-sm text-outline mt-4">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </section>

      {downloadTarget && (
        <PublicationDownloadForm
          publicationTitle={downloadTarget.title}
          fileUrl={downloadTarget.fileUrl}
          onClose={() => setDownloadTarget(null)}
        />
      )}
    </div>
  );
}
