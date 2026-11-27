import { useState } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import AdminProfile from '@/components/admin/AdminProfile';
import {
  ClipboardList,
  ExternalLink,
  FileText,
  FolderOpen,
  LayoutDashboard,
  Lightbulb,
  Menu,
  MessagesSquare,
  MonitorPlay,
  X,
} from 'lucide-react';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/enrollment', label: 'Enrollment', icon: ClipboardList },
  { to: '/admin/webinars', label: 'Webinar', icon: MonitorPlay },
  { to: '/admin/publications', label: 'Publications', icon: FileText },
  { to: '/admin/insights', label: 'Insights', icon: Lightbulb },
  { to: '/admin/resources', label: 'Resources', icon: FolderOpen },
  { to: '/admin/inquiries', label: 'Inquiries', icon: MessagesSquare },
];

function Brand({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link to="/admin" onClick={onNavigate} className="flex items-center gap-2.5">
      <img src="/alogo500.png" alt="HLA Africa" className="h-10 w-auto shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="text-sm font-extrabold tracking-tight text-on-background">HLA AFRICA</span>
        <span className="text-[10px] font-semibold text-secondary tracking-widest uppercase mt-0.5">
          Admin Panel
        </span>
      </span>
    </Link>
  );
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <ul className="flex flex-col gap-1">
      {navItems.map((item) => (
        <li key={item.to}>
          <NavLink
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-body-sm transition-colors ${
                isActive
                  ? 'bg-secondary/10 text-secondary font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-background'
              }`
            }
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background font-body-md antialiased">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 w-64 flex-col bg-surface-container-lowest border-r border-outline-variant z-40">
        <div className="px-5 h-20 flex items-center border-b border-outline-variant">
          <Brand />
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <NavLinks />
        </nav>
        <div className="px-3 py-4 border-t border-outline-variant space-y-1">
          <AdminProfile />
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-body-sm text-on-surface-variant hover:bg-surface-container-low hover:text-on-background transition-colors"
          >
            <ExternalLink size={18} />
            View public site
          </Link>
        </div>
      </aside>

      {/* Mobile header */}
      <header className="md:hidden sticky top-0 z-50 h-16 bg-surface-container-lowest border-b border-outline-variant flex items-center justify-between px-4">
        <Brand />
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="w-10 h-10 rounded-lg border border-outline-variant flex items-center justify-center text-on-background"
        >
          <Menu size={20} />
        </button>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-on-surface/60 backdrop-blur-sm animate-fade-in" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-surface-container-lowest border-r border-outline-variant animate-drawer-in flex flex-col">
            <div className="px-5 h-16 flex items-center justify-between border-b border-outline-variant">
              <Brand onNavigate={() => setMobileOpen(false)} />
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="w-9 h-9 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-5">
              <NavLinks onNavigate={() => setMobileOpen(false)} />
            </nav>
            <div className="px-3 py-4 border-t border-outline-variant space-y-1">
              <AdminProfile />
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-body-sm text-on-surface-variant hover:bg-surface-container-low"
              >
                <ExternalLink size={18} />
                View public site
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="md:ml-64">
        <main className="p-5 md:p-10 max-w-7xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
