import { Link } from 'react-router-dom';

const footerGroups = [
  {
    heading: 'Organization',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Services', to: '/services' },
      { label: 'Careers', to: '/careers' },
    ],
  },
  {
    heading: 'Programs',
    links: [
      { label: 'Courses', to: '/courses' },
      { label: 'Admissions', to: '/admissions' },
    ],
  },
  {
    heading: 'Learn',
    links: [
      { label: 'Resources', to: '/resources' },
      { label: 'Webinars', to: '/webinars' },
      { label: 'Publications', to: '/publications' },
      { label: 'Insights', to: '/insights' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Contact Us', to: '/contact' },
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms of Service', to: '/terms' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="charcoal-scheme w-full py-16 px-margin-mobile md:px-margin-desktop grid grid-cols-12 gap-gutter bg-primary border-t border-primary-container mt-auto">
      <div className="col-span-12 md:col-span-4 mb-8 md:mb-0 flex flex-col justify-between">
        <div>
          <img src="/alogo500.png" alt="HLA Africa" className="h-14 w-auto mb-4" />
          <p className="font-body-sm text-body-sm text-on-primary opacity-80 max-w-sm">
            Empowering healthcare leaders across Africa through rigorous education and strategic capacity building.
          </p>
        </div>
        <div className="font-body-sm text-body-sm text-on-primary opacity-60 mt-8">
          © 2024 HLA Africa. All rights reserved.
        </div>
      </div>
      <div className="col-span-12 md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        {footerGroups.map((group) => (
          <div key={group.heading} className="flex flex-col space-y-4">
            <h4 className="font-label-bold text-label-bold text-on-primary opacity-50 uppercase tracking-wider mb-2">
              {group.heading}
            </h4>
            {group.links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="font-body-sm text-body-sm text-primary-fixed opacity-80 focus:outline-none focus:ring-2 focus:ring-secondary rounded"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
}
