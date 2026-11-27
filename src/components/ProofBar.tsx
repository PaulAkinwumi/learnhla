const partners = [
  '/partners/cambridge uni.jpeg',
  '/partners/deliveryasso.png',
  '/partners/Duke-University-Logo.png',
  '/partners/EPIC-ADRAP-PART.jpg',
  '/partners/habiba consulting.jpeg',
  '/partners/hfn.png',
  '/partners/IHI.webp',
  '/partners/lagosbs.jpeg',
  '/partners/mDoclogo.jpeg',
  '/partners/Nimsa.jpeg',
  '/partners/PSHAN-Logo.png',
  '/partners/USAID-Identity-2048x613.png',
];

export default function ProofBar() {
  return (
    <section className="w-full bg-surface-container-lowest border-y border-outline-variant py-8 overflow-hidden relative flex items-center">
      <div className="w-full px-margin-mobile md:px-margin-desktop flex items-center">
        <span className="font-label-bold text-label-bold text-outline uppercase tracking-widest mr-12 whitespace-nowrap hidden md:block">
          Trusted Partners
        </span>
        <div className="overflow-hidden mask-image-gradient flex-1">
          <div className="partner-scroll-track items-center gap-14 py-4">
            {[...partners, ...partners].map((partner, i) => (
              <img
                key={`${partner}-${i}`}
                src={partner}
                alt={`Partner logo ${(i % partners.length) + 1}`}
                className="h-10 md:h-12 w-auto object-contain"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
