import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Courses', to: '/courses' },
  { label: 'Services', to: '/services' },
  { label: 'Webinars', to: '/webinars' },
  { label: 'Publications', to: '/publications' },
  { label: 'Insights', to: '/insights' },
  { label: 'Resources', to: '/resources' },
  { label: 'About Us', to: '/about' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20 bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline-variant">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center">
          <img src="/alogo500.png" alt="HLA Africa" className="h-12 w-auto" />
        </Link>
        <ul className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? 'text-secondary font-bold border-b-2 border-secondary pb-1 font-body-md text-body-md transition-colors duration-200'
                    : 'text-on-surface-variant font-body-md text-body-md'
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-4">
        <button className="hidden md:block font-label-bold text-label-bold text-primary px-4 py-2 border border-outline-variant rounded hover:bg-surface-container-low transition-colors duration-200">
          Enterprise Inquiries
        </button>
        <Link
          to="/courses"
          className="font-label-bold text-label-bold bg-primary text-on-primary px-6 py-2 rounded"
        >
          Explore Courses
        </Link>
        <button
          className="md:hidden text-primary"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="absolute top-20 left-0 w-full bg-surface-container-lowest border-b border-outline-variant md:hidden">
          <ul className="flex flex-col px-margin-mobile py-4 gap-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? 'block text-secondary font-bold font-body-md text-body-md'
                      : 'block text-on-surface-variant font-body-md text-body-md'
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li>
              <button className="font-label-bold text-label-bold text-primary px-4 py-2 border border-outline-variant rounded w-full">
                Enterprise Inquiries
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
