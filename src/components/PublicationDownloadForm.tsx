import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { AlertCircle, CheckCircle2, Download, FileText, X } from 'lucide-react';
import { countries } from '@/data/countries';
import { createPublicationDownload, fileDownloadName, triggerFileDownload } from '@/lib/api';
import { errorMessage } from '@/lib/supabase';

function Fieldset({ legend, children }: { legend: string; children: ReactNode }) {
  return (
    <fieldset className="hla-fieldset shadow-[0px_4px_20px_rgba(11,37,69,0.05)]">
      <legend className="hla-legend">{legend}</legend>
      {children}
    </fieldset>
  );
}

type Props = {
  publicationTitle: string;
  fileUrl: string | null;
  onClose: () => void;
};

export default function PublicationDownloadForm({ publicationTitle, fileUrl, onClose }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const downloadStarted = useRef(false);

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const value = (key: string) => {
      const raw = data.get(key);
      return typeof raw === 'string' ? raw.trim() : '';
    };

    setSubmitting(true);
    setSubmitError(null);

    if (fileUrl && !downloadStarted.current) {
      downloadStarted.current = true;
      void triggerFileDownload(fileUrl, fileDownloadName(publicationTitle, fileUrl));
    }

    try {
      await createPublicationDownload({
        publication_title: publicationTitle,
        first_name: value('first_name'),
        last_name: value('last_name'),
        email: value('email'),
        phone: value('phone_number'),
        country: value('country'),
        organisation: value('organisation_name'),
        job_title: value('job_title'),
        consent_updates: data.get('consent_updates') === 'yes',
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        fileUrl
          ? `Your download has started, but your details could not be saved: ${errorMessage(err)} Please try submitting again.`
          : `${errorMessage(err)} Your answers are still on this page — please try submitting again.`,
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-start sm:items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="fixed inset-0 bg-on-surface/60 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative w-full max-w-3xl bg-surface-container-lowest rounded-xl border border-outline-variant shadow-[0_-20px_60px_rgba(25,28,30,0.35)] animate-drawer-in my-6">
        <div className="h-1.5 w-full bg-secondary rounded-t-xl" />
        <div className="flex items-center justify-between px-6 md:px-8 pt-5 pb-4 border-b border-outline-variant">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-background">Download publication</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              Please complete the form below to access the file.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="w-9 h-9 rounded-full bg-surface-container hover:bg-secondary hover:text-on-primary flex items-center justify-center text-on-surface transition-colors duration-200 shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 md:px-8 py-6">
          {submitted ? (
            <div className="py-6 text-center">
              <span className="w-16 h-16 rounded-full bg-secondary/10 text-secondary flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </span>
              <h3 className="mt-6 font-headline-md text-headline-md text-on-background">
                {fileUrl ? 'Your download has started' : 'Request received'}
              </h3>
              <p className="mt-3 font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto">
                {fileUrl ? (
                  <>
                    Thank you, <span className="font-semibold text-on-background">{publicationTitle}</span> is
                    downloading to your device. Your details have been recorded with the Healthcare Leadership Academy.
                  </>
                ) : (
                  <>
                    Thank you, <span className="font-semibold text-on-background">{publicationTitle}</span> has been
                    requested and your details have been recorded. The file for this publication is not attached yet —
                    please check back shortly.
                  </>
                )}
              </p>
              <div className="mt-8">
                <button
                  type="button"
                  onClick={onClose}
                  className="font-label-bold text-label-bold bg-secondary text-on-primary px-6 py-3.5 rounded uppercase tracking-wider hover:opacity-90 transition-opacity duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="flex items-start gap-3 bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3">
                <FileText size={18} className="text-secondary shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="font-label-bold text-label-bold text-outline uppercase tracking-wider text-[11px]">
                    Publication
                  </p>
                  <p className="font-body-md text-body-md text-on-background break-words">{publicationTitle}</p>
                </div>
              </div>

              {submitError && (
                <p className="inline-flex items-start gap-2 w-full border border-red-300 bg-red-50 text-red-800 rounded-lg px-4 py-3 font-body-sm text-body-sm">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  {submitError}
                </p>
              )}

              <Fieldset legend="Personal Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="hla-label" htmlFor="download-first-name">
                      First Name <span className="text-secondary">*</span>
                    </label>
                    <input
                      className="hla-input w-full px-3 py-2"
                      id="download-first-name"
                      name="first_name"
                      placeholder="Enter First Name"
                      type="text"
                      required
                    />
                  </div>
                  <div>
                    <label className="hla-label" htmlFor="download-last-name">
                      Last Name <span className="text-secondary">*</span>
                    </label>
                    <input
                      className="hla-input w-full px-3 py-2"
                      id="download-last-name"
                      name="last_name"
                      placeholder="Enter Last Name"
                      type="text"
                      required
                    />
                  </div>
                  <div>
                    <label className="hla-label" htmlFor="download-email">
                      Email <span className="text-secondary">*</span>
                    </label>
                    <input
                      className="hla-input w-full px-3 py-2"
                      id="download-email"
                      name="email"
                      placeholder="Enter Email"
                      type="email"
                      required
                    />
                  </div>
                  <div>
                    <label className="hla-label" htmlFor="download-phone">
                      Phone Number <span className="text-secondary">*</span>
                    </label>
                    <input
                      className="hla-input w-full px-3 py-2"
                      id="download-phone"
                      name="phone_number"
                      placeholder="e.g. +234 801 234 5678"
                      type="tel"
                      required
                    />
                  </div>
                </div>
              </Fieldset>

              <Fieldset legend="Professional Information">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                  <div>
                    <label className="hla-label" htmlFor="download-country">
                      Country <span className="text-secondary">*</span>
                    </label>
                    <select
                      className="hla-input hla-select w-full px-3 py-2"
                      id="download-country"
                      name="country"
                      defaultValue=""
                      required
                    >
                      <option disabled value="">
                        -- Select Country --
                      </option>
                      {countries.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="hla-label" htmlFor="download-organisation">
                      Organisation Name <span className="text-secondary">*</span>
                    </label>
                    <input
                      className="hla-input w-full px-3 py-2"
                      id="download-organisation"
                      name="organisation_name"
                      placeholder="e.g. Lagos University Teaching Hospital"
                      type="text"
                      required
                    />
                  </div>
                  <div>
                    <label className="hla-label" htmlFor="download-job-title">
                      Job Title <span className="text-secondary">*</span>
                    </label>
                    <input
                      className="hla-input w-full px-3 py-2"
                      id="download-job-title"
                      name="job_title"
                      placeholder="e.g. Chief Medical Director"
                      type="text"
                      required
                    />
                  </div>
                </div>
              </Fieldset>

              <Fieldset legend="Consent">
                <div className="space-y-4 pt-1">
                  <p className="font-body-md text-body-md text-on-surface">
                    Do you consent to receiving updates from the Healthcare Leadership Academy on courses, webinars,
                    latest reports and other activities? <span className="text-secondary">*</span>
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-lg">
                    <label className="flex items-center p-2.5 border border-outline-variant rounded cursor-pointer hover:bg-surface-container-low transition-colors">
                      <input
                        className="h-4 w-4 text-secondary focus:ring-secondary border-outline-variant"
                        name="consent_updates"
                        type="radio"
                        value="yes"
                        required
                      />
                      <span className="ml-2.5 text-xs font-semibold text-on-surface">Yes, I consent</span>
                    </label>
                    <label className="flex items-center p-2.5 border border-outline-variant rounded cursor-pointer hover:bg-surface-container-low transition-colors">
                      <input
                        className="h-4 w-4 text-secondary focus:ring-secondary border-outline-variant"
                        name="consent_updates"
                        type="radio"
                        value="no"
                        required
                      />
                      <span className="ml-2.5 text-xs font-semibold text-on-surface">No, I do not</span>
                    </label>
                  </div>
                </div>
              </Fieldset>

              <div className="pt-2 pb-4 flex flex-col items-center gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center px-7 py-3 text-sm font-bold tracking-wide text-on-primary bg-secondary hover:opacity-90 active:opacity-80 rounded transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Download size={16} className="mr-2" />
                  <span>{submitting ? 'Preparing download…' : 'Submit & download publication'}</span>
                </button>
                <p className="font-body-sm text-body-sm text-outline text-center">
                  Your details are recorded with the Healthcare Leadership Academy when you submit this form.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
