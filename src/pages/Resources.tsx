import { ChevronLeft, ChevronRight, ArrowRight, ExternalLink, PlayCircle } from 'lucide-react';

const galleryItems = [
  {
    date: 'OCT 15, 2023',
    title: 'Executive Leadership Seminar Series',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCcUnnXwCub__5ccPYE9r5abZ9vRXQn-MgChLY-jAhVbjcoh4-GXJpqlCJiCHYGqb4eLPb5sRSbEDvgRQqWExZsNk7nj6aNvfAKsgeFyOx_5iO_9V9NeN3GPnbidvoRuHaDQ4cXxTh9-YVKZ4d78SJI2Sla1lSa6w3NPsRCiIN3KRbgNJ-FbMR5eRLHVnWKT9xDph8DNq-LgjoZ1CLBZiS9b3bIo7_ES6Tvo7NsIMaNGJH38bCTLCUyBg',
    alt: 'Healthcare executives in a modern seminar room focused on a presentation.',
  },
  {
    date: 'SEP 22, 2023',
    title: 'Strategic Policy Workshop',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDkkO5BzRcbTQVCeS-2K1gue3UPs1h7r5AoLLVbCemQFkOXYmAhq5tB864RjdubHWg9xxGvJg41LySYM_n_gMXrzijN-haOb9FN_IRlfOw0kVW09-lR5w6MOpWblrN1ZinYLkDvjP-b-fjgCD-73w7kpyBK1WERzSpVfwqrTw1pVhl6sqwLu5DLkCSpqN6V3tTEPCq5Sh-czXcz8r0-cr_K2IyLWfUB_a8HMRuq4h6Klri4IhLGNzVy8Q',
    alt: 'Healthcare leaders engaging in a collaborative workshop exercise.',
  },
  {
    date: 'AUG 05, 2023',
    title: 'Annual Clinical Governance Summit',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBHTXqBVOIy4lHP9glWKxn6zCzwSpMg738ATWOmWW3G7DkG3BywfledX_zNFex6OVtcHcJ78DaoLVGYTMufuikZ2s9m9uz7Du60bkdwua0Th5e0pkbN-EaWd-8wstX2uTbYliG8iK78TyXoAKZPKjMQ3kmQtR2ku3Savq-G8YIh1ed20jq5_51aTXjEiSjsjgDNlMHI-2x_f2yAUPoiEeK10Wc6wdQusmf6tnsdLPxf3M7h937S2BauHA',
    alt: 'A presenter at a podium addressing an audience of medical professionals.',
  },
  {
    date: 'JUL 18, 2023',
    title: 'Mentorship & Development Sessions',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBSNALvzE_kFl69VJMwfQGCdRnmTFVOkAIdF3yOKkB1DaqDMSeNBpp81aMGCsZTCVu570S0x8umUxShZ9OnrjJir1y7uGt7ZPriXckcxrLRNDZGlU7mYrRPokIEgBa56Z7kB3Ol8ytI8eV6wH-FNO0mKJl8We5ddvRu4Bjop_y7Tkx1Z00ZMGfPEWgTbSiDjOQzvNUIs8vjL4TZ5y_oTrzODPIoYJKadVdS2D2PBouqMcGoyDpU90ME1Q',
    alt: 'Two healthcare executives engaged in a one-on-one discussion in a modern office.',
  },
  {
    date: 'JUN 30, 2023',
    title: 'Global Health Initiatives Keynote',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCZ1sR5ZQ9ktWS4vfZn0B7QbsVjOp7FTWzGMP6DYRUWFhO6Dlj2o37gwqYsQ_0BpynPTrFvpq5ilV8FXxHqjuDKglD2SEvnGya_WE1eZdq04nPpnh2NWHC_Mu19to1KJWcjEYU1nQX2-pmYPs2kBwgjBCEzI470W9dpMgJqjou_POeraWKKcDEGTi0GKg4INAi2lanz3b05QMzQhHarbq-2R5ov285FRrgAtAooZqCpMy75wIyFo3Te4w',
    alt: 'A large lecture hall filled with healthcare professionals listening to a keynote.',
  },
  {
    date: 'MAY 12, 2023',
    title: 'Data-Driven Decision Making Module',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBTgKYSEorRSS8eqBeAfSPIpe1MyGIwnAJ-a26WTjPyZqlPhyVMDEpKhMNCB0TI30JuDEtRQzySl0XFQbMtAfeHNR1NX5w4pg9RnJUMMsR1GBKvxdVUptANyFbpAzRQjO7Li4fGZ8SNeufVxau4TUCbH_BuNsz9ZdOhp0pWZ2SvTwBjbbTvtArgTZWKEC4Awja8EABBzCeDAxUWfbr_8NoELUgboD-mOZritSlGarBd0vONAirrrKtEQA',
    alt: 'Close-up of hands writing notes on a pad during a training session.',
  },
];

const videos = [
  {
    title: 'Navigating Healthcare Crises: Lessons from the Field',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBlaSEjsTdDHzE-wLUMo7KcGvpKs_XuWXgGTtrrsvGKBKhUnMkiFVJn6L3SU4www5kRJ09LIphf0Ofm3CmQEGMvZIL4MCfHkumk2kn4bactYGgZsdgF274Zvr5EVlJ-nZAp5UJOEZM4_cLE9FG5DNa1BbsnaVJ9MN8qXtPd9zkD0laQgA0BZYYthiiCP5Cv5ZAkA5XlOEa8SWPx7-aOSB45aQlOnGGUzJsnNB7Z7I48HTrY_k4q_Wax6g',
    alt: 'Panel discussion with three healthcare leaders on stage.',
  },
  {
    title: 'Innovative Financing Models for Rural Clinics',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDz2vTyd_UweX9NIDTn7RPmjIjFDqfzF7AHYhU8wBJNiRHfC60WrE4filzcWHBnQe4qz8HxWrF_uw96Zov9PcMT0UrPejf8RKto3hJ7EUSGLDQZ6vRDUFiTSDUSbahVwCNXI9xAQqRkXFdyq52sRdpW8Php6CRGsj3ztdaNxgL0HX55YUkPMH2IOimlfgFbwWaT4aG0AzEq9ZEHwUPtvecutz3lig69ncw4sh0gnTM7JAu3s51ZaOXilw',
    alt: 'Presentation slide about healthcare financing with a speaker.',
  },
  {
    title: 'Policy Integration: A Conversation with Dr. Ayo',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBT2CBVk8pYRJKOAZzf9vZJmU9cyY_xO1yXE0eldmFluuyAkX_nEJgSV799HLkasHXq1szLlETwx7rGuPowA3D6tqwmb-X42HWieoU9sn-k1eQeMxhcGDq51Xk5Ihx4CUhVY1rnyc6NTzj0edG-UOrmrIMW6lKd5Re1N905IYlC38IJxYYBDXDKxsHQxsYNxsTpcE-6ZRayaCXcykgm7UXvcmF-TS3FgKtbS-lK8Zov84cc1KmgF-KyAg',
    alt: 'Interview setting with a prominent healthcare policymaker.',
  },
];

const alumni = [
  {
    name: 'Dr. Sarah Mensah',
    role: 'Chief Medical Officer, Regional Health Authority',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB0J0NGqLZKXTDG-5hP6BkVgB2gSx58DIsFRMhmUrFcnb0P3rm0VOH8JGmM4F8sfWxYppLn9fUjejIpIGFNTkgYyyK-dpo0e_gjX3Jyj_Jz_gIDdfI-QriW1kNkxdFTl4Ql08D-TRZLdIOTLtW30lUk9__IBSUPIxO_FAwucys67RlQ2OU6dRVSKMvNwNwlKlu07QIdLHhugCqA9-4idod6aforCxF_PRd-EqlMVMOzR7wXov2OTqO4cQ',
    alt: 'Professional headshot of Dr. Sarah Mensah.',
  },
  {
    name: 'David Osei',
    role: 'Director of Operations, National Hospital',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDmz9F85p5pb1gH0-XNBL-QtAba1fvcuRG6gartlHcpN2k0690eoW0QiWl9tQ0nO4trdjJ8N6MKG3Qoq5i609JxsTHxSiNdNBQ_zDjG54Lm2I3Px1ZUhNOzWxrZcp3CopyHx9U8wsNPl-4XK3ZCx5QBm1V6yNJ85Fu-nhEVith9E1HiqSK79gZIVsRmPfOBiAtHyD4MBANSeYQqA9SSfObbFei4HUDNFnZMU8QkdPIz5GpAkNjv5e85EA',
    alt: 'Professional headshot of David Osei.',
  },
  {
    name: 'Dr. Amina Diallo',
    role: 'Head of Public Health Initiatives, Ministry of Health',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDdKFZy8dUhtlDMe2NiEbS2LXb2NFxM_1Y_4SWPVMwpj2X9Fl42Mexk1QE1OzeZmvf3WERGnMH4GLoO31f-JMt9DcQso2BSvSvV8NEzoVhOBytXOyIr0pyuWto9MGaONojR5cVncgwxE3f-Teszyx9U5D9NlIirn1m5CaV9oyHLVeN2-etF-tWM0SZvTOrN3hQSeBpNZWx91lDqAnU-fzwMLCpXDCz9zFWPCIg5p8stEeg9_R3QGMW6fQ',
    alt: 'Professional headshot of Dr. Amina Diallo.',
  },
];

const news = [
  {
    date: 'SEP 17, 2023',
    title: 'World Patient Safety Day 2023',
    description:
      'Highlighting the critical importance of patient safety in healthcare systems across Africa through collaborative leadership and clinical excellence.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCcUnnXwCub__5ccPYE9r5abZ9vRXQn-MgChLY-jAhVbjcoh4-GXJpqlCJiCHYGqb4eLPb5sRSbEDvgRQqWExZsNk7nj6aNvfAKsgeFyOx_5iO_9V9NeN3GPnbidvoRuHaDQ4cXxTh9-YVKZ4d78SJI2Sla1lSa6w3NPsRCiIN3KRbgNJ-FbMR5eRLHVnWKT9xDph8DNq-LgjoZ1CLBZiS9b3bIo7_ES6Tvo7NsIMaNGJH38bCTLCUyBg',
    alt: 'Healthcare professionals gathered for World Patient Safety Day.',
  },
  {
    date: 'AUG 22, 2023',
    title: 'New Leadership Cohort Announced',
    description:
      'Welcoming our newest group of executive leaders who are set to transform healthcare delivery through our intensive training programs.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDkkO5BzRcbTQVCeS-2K1gue3UPs1h7r5AoLLVbCemQFkOXYmAhq5tB864RjdubHWg9xxGvJg41LySYM_n_gMXrzijN-haOb9FN_IRlfOw0kVW09-lR5w6MOpWblrN1ZinYLkDvjP-b-fjgCD-73w7kpyBK1WERzSpVfwqrTw1pVhl6sqwLu5DLkCSpqN6V3tTEPCq5Sh-czXcz8r0-cr_K2IyLWfUB_a8HMRuq4h6Klri4IhLGNzVy8Q',
    alt: 'New cohort of healthcare leaders during orientation.',
  },
  {
    date: 'JUL 10, 2023',
    title: 'Healthcare Policy Update',
    description:
      'An analysis of recent policy shifts and their implications for regional health authorities and clinical governance frameworks.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBTgKYSEorRSS8eqBeAfSPIpe1MyGIwnAJ-a26WTjPyZqlPhyVMDEpKhMNCB0TI30JuDEtRQzySl0XFQbMtAfeHNR1NX5w4pg9RnJUMMsR1GBKvxdVUptANyFbpAzRQjO7Li4fGZ8SNeufVxau4TUCbH_BuNsz9ZdOhp0pWZ2SvTwBjbbTvtArgTZWKEC4Awja8EABBzCeDAxUWfbr_8NoELUgboD-mOZritSlGarBd0vONAirrrKtEQA',
    alt: 'Policy document and stethoscope on a desk.',
  },
];

export default function ResourcesPage() {
  return (
    <div className="flex-grow">
      {/* Page Header */}
      <header className="py-24 px-margin-mobile md:px-margin-desktop text-center">
        <h1 className="font-display-lg text-display-lg text-on-background mb-6">Resource Hub</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mx-auto">
          Access our comprehensive archive of training materials, impact stories, and organizational updates. Designed to
          support continued excellence in healthcare leadership.
        </p>
      </header>

      {/* Main Content */}
      <main className="px-margin-mobile md:px-margin-desktop space-y-32 pb-32">
        {/* Training Photo Gallery */}
        <section>
          <div className="flex justify-between items-end mb-12 border-b border-outline-variant pb-4">
            <h2 className="font-headline-md text-headline-md text-on-background">Training in Action</h2>
            <a
              href="#"
className="font-label-bold text-label-bold text-secondary flex items-center group"
            >
              View More Gallery
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {galleryItems.map((item) => (
              <div
                key={item.title}
                className="bg-surface-container-lowest rounded-lg border border-surface-variant overflow-hidden hover:shadow-[0px_4px_20px_rgba(11,37,69,0.05)] transition-shadow duration-300"
              >
                <img src={item.image} alt={item.alt} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <span className="font-label-bold text-label-bold text-secondary block mb-2">{item.date}</span>
                  <h3 className="font-headline-sm text-headline-sm text-on-background">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Training Video Library */}
        <section className="bg-surface-container-low -mx-margin-mobile px-margin-mobile md:-mx-margin-desktop md:px-margin-desktop py-24 border-y border-outline-variant">
          <div>
            <div className="flex justify-between items-end mb-12 border-b border-outline-variant pb-4">
              <h2 className="font-headline-md text-headline-md text-on-background">Video Archives</h2>
              <a
                href="#"
className="font-label-bold text-label-bold text-secondary flex items-center group"
              >
                Explore More Videos
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {videos.map((video) => (
                <div
                  key={video.title}
                  className="bg-surface-container-lowest rounded-lg border border-surface-variant overflow-hidden group cursor-pointer"
                >
                  <div className="relative h-48 bg-surface-variant">
                    <img src={video.image} alt={video.alt} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center group-hover:bg-primary/40 transition-colors">
                      <PlayCircle size={56} className="text-on-primary opacity-90" fill="currentColor" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-headline-sm text-headline-sm text-on-background mb-4 line-clamp-2">{video.title}</h3>
                    <span className="font-label-bold text-label-bold text-secondary flex items-center">
                      Watch on YouTube
                      <ExternalLink size={16} className="ml-1" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Alumni Impact Stories */}
        <section>
          <div className="flex justify-between items-end mb-12 border-b border-outline-variant pb-4">
            <h2 className="font-headline-md text-headline-md text-on-background">Alumni Impact Stories</h2>
            <div className="flex space-x-2">
              <button className="w-8 h-8 rounded border border-outline-variant flex items-center justify-center text-on-surface-variant">
                <ChevronLeft size={20} />
              </button>
              <button className="w-8 h-8 rounded border border-outline-variant flex items-center justify-center text-on-surface-variant">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {alumni.map((person) => (
              <div
                key={person.name}
                className="bg-surface-container-lowest p-8 rounded-lg border border-surface-variant flex flex-col items-center text-center hover:shadow-[0px_4px_20px_rgba(11,37,69,0.05)] transition-shadow duration-300 relative overflow-hidden"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-4 border-surface-container-low">
                  <img src={person.image} alt={person.alt} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-background mb-2">{person.name}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">{person.role}</p>
                <a
                  href="#"
                  className="mt-auto font-label-bold text-label-bold bg-primary text-on-primary border border-primary px-6 py-2 rounded w-full"
                >
                  Learn More
                </a>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a
              href="#"
              className="font-label-bold text-label-bold text-secondary underline"
            >
              View All Stories
            </a>
          </div>
        </section>
      </main>

      {/* Academy News & Announcements */}
      <section className="px-margin-mobile md:px-margin-desktop pb-32 space-y-12">
        <div className="flex justify-between items-end mb-12 border-b border-outline-variant pb-4">
          <h2 className="font-headline-md text-headline-md text-on-background">Academy News & Announcements</h2>
          <a
            href="#"
            className="font-label-bold text-label-bold text-secondary flex items-center group"
          >
            View All News
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {news.map((article) => (
            <div
              key={article.title}
              className="bg-surface-container-lowest rounded-lg border border-surface-variant overflow-hidden hover:shadow-[0px_4px_20px_rgba(11,37,69,0.05)] transition-shadow duration-300 flex flex-col"
            >
              <img src={article.image} alt={article.alt} className="w-full h-48 object-cover" />
              <div className="p-6 flex flex-col flex-grow">
                <span className="font-label-bold text-label-bold text-secondary block mb-2">{article.date}</span>
                <h3 className="font-headline-sm text-headline-sm text-on-background mb-4">{article.title}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-6 line-clamp-3">
                  {article.description}
                </p>
                <a
                  href="#"
                  className="mt-auto font-label-bold text-label-bold text-secondary flex items-center"
                >
                  Read Article
                  <ChevronRight size={16} className="ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
