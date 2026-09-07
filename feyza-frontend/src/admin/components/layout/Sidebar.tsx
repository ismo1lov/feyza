import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@admin/lib/utils";
import {
  LayoutDashboard,
  Sparkles,
  BookOpen,
  Image,
  HelpCircle,
  Award,
  Star,
  Send,
  Phone,
  Settings,
  LogOut,
  X,
  LogOut as LogOutIcon,
} from "lucide-react";
import { useAuth } from "@admin/contexts/AuthContext";

const navItems = [
  { to: "/admin", label: "Bosh sahifa", icon: LayoutDashboard },
  { to: "/admin/services", label: "Xizmatlar", icon: Sparkles },
  { to: "/admin/about", label: "Bizning tarix", icon: BookOpen },
  { to: "/admin/gallery", label: "Galereya", icon: Image },
  { to: "/admin/faq", label: "FAQ", icon: HelpCircle },
  { to: "/admin/certificates", label: "Sertifikatlar", icon: Award },
  { to: "/admin/reviews", label: "Mijozlar fikri", icon: Star },
  { to: "/admin/contact", label: "Kontakt", icon: Phone },
  { to: "/admin/booking", label: "Aloqa", icon: Send },
  { to: "/admin/settings", label: "Sozlamalar", icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { logout } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);
  const [siteName, setSiteName] = useState("Feyza Aura");

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => { if (data.site_name) setSiteName(data.site_name); })
      .catch(() => {});
  }, []);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "w-72 fixed inset-y-0 left-0 bg-white border-r border-border flex flex-col z-50 transition-transform duration-300",
          "lg:translate-x-0 lg:z-30",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden border border-primary/20 flex items-center justify-center bg-background shrink-0">
              <img src="/favicon.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <h1 className="font-body font-bold text-lg leading-tight text-gradient">Admin Panel</h1>
              <p className="text-xs text-gradient/70 font-medium">{siteName}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-accent text-muted-foreground lg:hidden">
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <button
            onClick={() => setShowConfirm(true)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all w-full"
          >
            <LogOut className="w-4 h-4" />
            Chiqish
          </button>
        </div>
      </aside>

      {showConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowConfirm(false)} />
          <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-pink-200/50">
              <LogOutIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-body font-bold text-foreground mb-2">Chiqish</h3>
            <p className="text-muted-foreground text-sm mb-8">Chiqishni tasdiqlaysizmi?</p>
            <div className="flex gap-3">
              <button
                onClick={() => { setShowConfirm(false); logout(); }}
                className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-400 to-rose-400 text-white font-medium hover:from-pink-500 hover:to-rose-500 transition-all shadow-lg shadow-pink-200/50"
              >
                Ha
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-6 py-3 rounded-xl bg-muted text-muted-foreground font-medium hover:bg-accent transition-all"
              >
                Yo'q
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
