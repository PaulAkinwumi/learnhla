export default function Hero() {
  return (
    <section className="w-full px-margin-mobile md:px-margin-desktop py-24 md:py-32 flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 space-y-8">
        <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-background">
          Cultivating Africa's Next Generation of Healthcare Leaders.
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          World-class executive education, research, and advisory services strengthening health systems across the continent.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button className="font-label-bold text-label-bold bg-primary text-on-primary px-8 py-4 rounded hover:bg-primary-container transition-colors duration-200 shadow-sm">
            Explore Programs
          </button>
          <button className="font-label-bold text-label-bold text-primary px-8 py-4 border border-primary rounded hover:bg-surface-container-lowest transition-colors duration-200">
            Request Consultation for Your Organization
          </button>
        </div>
      </div>
      <div className="flex-1 w-full h-[400px] md:h-[500px] relative rounded-xl overflow-hidden shadow-sm">
        <img
          src="https://images.pexels.com/photos/6949931/pexels-photo-6949931.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
          alt="Healthcare leadership seminar in Africa"
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8">
          <span className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded font-label-bold text-label-bold text-white mb-2 border border-white/30">
            LATEST COHORT
          </span>
          <p className="text-white font-headline-sm text-headline-sm">
            Healthcare Board Governance Programme 2026
          </p>
        </div>
      </div>
    </section>
  );
}
