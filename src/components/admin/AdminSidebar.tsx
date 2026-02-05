import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  FolderKanban,
  Briefcase,
  Zap,
  Wrench,
  MessageSquareQuote,
  Menu,
  X,
  Settings,
  Link,
  Code,
  Globe,
  Boxes,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/site-settings', icon: Settings, label: 'Site Settings' },
  { to: '/admin/tech-stack', icon: Code, label: 'Tech Stack' },
  { to: '/admin/projects', icon: FolderKanban, label: 'Projects' },
  { to: '/admin/experiences', icon: Briefcase, label: 'Experiences' },
  { to: '/admin/skills', icon: Zap, label: 'Skills' },
  { to: '/admin/tools', icon: Wrench, label: 'Tools' },
  { to: '/admin/languages', icon: Globe, label: 'Languages' },
  { to: '/admin/contact-links', icon: Link, label: 'Contact Links' },
  { to: '/admin/services', icon: Boxes, label: 'Services' },
  { to: '/admin/testimonials', icon: MessageSquareQuote, label: 'Testimonials' },
];

const AdminSidebar = () => {
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text">
          Admin Panel
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => setIsMobileOpen(false)}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )
            }
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-border shadow-md md:hidden"
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-40 transition-transform duration-300 md:translate-x-0',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SidebarContent />
      </aside>

      {/* Spacer for desktop */}
      <div className="hidden md:block w-64 flex-shrink-0" />
    </>
  );
};

export default AdminSidebar;
