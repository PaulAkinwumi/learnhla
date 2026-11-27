import { useState } from 'react';
import { Play, ChevronDown, MonitorPlay } from 'lucide-react';

const categories = ['Latest', 'Leadership', 'Governance', 'Clinical Excellence', 'Public Health Policy'] as const;

type Webinar = {
  id: number;
  category: string;
  title: string;
  speakers: string;
  image: string;
  alt: string;
  url: string;
};

const webinars: Webinar[] = [
  {
    id: 1,
    category: 'Governance',
    title: 'Strengthening Health System Resilience Post-Pandemic',
    speakers: 'Dr. Olayinka & Prof. Richards',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDT_YUb8v8DHv9bgGYcLUY5oCGxXufToityMXiq3OVnJRmxryc7ibVnkn6lX1J4JZ5ghUB8drkAX3Bzggouwhd6in1VhxqLiKA2wD5NwUiPNUytvxEJW4jaMyHPLDH19Ms7MFsrphx2Z5ijlOEbEEBTEJJuEOVrhI_V6oTb8qhUQxkQfnWv6bPWST88jf-uhle_PC7CDBHh5PWiWQbRkc4jN4jvuLpjh2nPLgOgF74pEZflrhskViHteg',
    alt: 'A professional panel of three African healthcare experts in a modern clinical boardroom setting.',
    url: '#',
  },
  {
    id: 2,
    category: 'Leadership',
    title: 'Strategic Resource Allocation in Regional Hospitals',
    speakers: 'Dr. Amina Yusuf',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCgoT3svJO4BWVqgvshKO5UTspwS9Qo-mnY4mstJvoGTi4vRyl_nDii6xPEgAC5rHoSeWFbZUcS3uFjYlXIYekVT6QVQIONCyBKJcsyP_5yGzQWDLyKvYrIvaD0tLRibeOYnPjmeHBd-1HQYbkRl-yBwu3B9kq6-1p2Dp3U6RctzO9c2Dr0EdIpyKMZTdoBrZ90b_Q4oX02T9VJ6YWDf-rmiqBxCL4tBlMpZHaHup-aWrnfn6anU3qCag',
    alt: 'A female African doctor giving a presentation in front of a digital screen showing data charts.',
    url: '#',
  },
  {
    id: 3,
    category: 'Public Health Policy',
    title: 'Navigating Regulatory Frameworks for Telemedicine',
    speakers: 'Prof. N. K. Mensah',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCrbDUIetq6NIsVOM--Nx3HrzTTTgjrWUBGaODduE52-CO2ixppvNf0HK6en2xPw-wOqmjTlIqcDtCESCRGnms18PZWODWyLP3TdcYU3mJey1hs8uf0nzDjFoEzm1MwmOdbcAua_rvLuUbmDRFPFPM-WViIPzovasGL3HK1m04Q07tmD2SSA-WNRdxozDwrOzFInNTuXFAvSvl951Kn2LOV5asaUzB15rqr7JJyq-69EdlRj12UaHLfOw',
    alt: 'Abstract visualization of public health data networks over a map of Africa with glowing teal nodes.',
    url: '#',
  },
  {
    id: 4,
    category: 'Clinical Excellence',
    title: 'Implementing Quality Assurance Protocols',
    speakers: 'Dr. S. Okonkwo',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBCxI87HJs1MrGz5-2M7WuTzx3vW-kyPSLWI6mfrkmGzJrg3M_3DiapIXDTUvvUlkxLefR7e04t3F7f7pPw4KV11tX6QhWnjCubkjM24juwvrT0aJiEHoSHdZ_SNNdEuhsvYnvRPp_Dx1-ymBXqAOr2oFeOWvj55AQ5-oy5iQNwnEbYsxlAwT4KBxs5KyJzkDy7Frzs4WylCgb6uty5-BVj9E9bRQQYSdRwboOEC3o79Knzezb_5OCSFQ',
    alt: 'A modern hospital hallway with a healthcare executive and a clinician walking together.',
    url: '#',
  },
];

export default function WebinarsPage() {
  const [activeCategory, setActiveCategory] = useState('Latest');

  return (
    <div className="flex-grow pt-[120px] pb-24 px-margin-mobile md:px-margin-desktop w-full flex flex-col gap-12">
      {/* Hero Section */}
      <section className="flex flex-col gap-4 max-w-3xl">
        <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-background">
          Expert Perspectives on African Health Systems
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Join thought leaders, clinicians, and policymakers in our ongoing webinar series dedicated to advancing
          healthcare excellence across the continent.
        </p>
      </section>

      {/* Category Tabs */}
      <section className="border-b border-outline-variant overflow-x-auto whitespace-nowrap pb-2">
        <div className="flex gap-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-label-bold text-label-bold pb-2 px-1 transition-colors ${
                activeCategory === cat
                  ? 'text-secondary border-b-2 border-secondary'
                  : 'text-on-surface-variant'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Webinar Card Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {webinars.map((webinar) => (
          <article
            key={webinar.id}
            className="video-card bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300 group cursor-pointer"
          >
            {/* Thumbnail */}
            <div className="relative w-full aspect-video overflow-hidden bg-surface-container">
              <img
                src={webinar.image}
                alt={webinar.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors duration-300" />
              <div className="play-button-overlay absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-on-primary rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:bg-secondary">
                <Play size={24} fill="currentColor" />
              </div>
              <div className="absolute bottom-3 right-3 bg-primary/80 backdrop-blur-sm text-on-primary font-label-bold text-[10px] py-1 px-2 rounded flex items-center gap-1">
                <MonitorPlay size={14} />
                Watch on YouTube
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 flex flex-col gap-3 flex-grow">
              <span className="font-label-bold text-label-bold text-secondary">#{webinar.category}</span>
              <h3 className="font-headline-sm text-headline-sm text-on-background">
                {webinar.title}
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-auto">{webinar.speakers}</p>
            </div>
          </article>
        ))}
      </section>

      {/* Load More */}
      <div className="flex justify-center mt-8">
        <button className="border border-outline font-label-bold text-label-bold text-primary py-3 px-8 rounded hover:bg-surface-container transition-colors duration-200 flex items-center gap-2">
          Load More Webinars
          <ChevronDown size={16} />
        </button>
      </div>
    </div>
  );
}
