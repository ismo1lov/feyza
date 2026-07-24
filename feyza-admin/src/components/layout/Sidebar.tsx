import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
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
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { to: "/", label: "Bosh sahifa", icon: LayoutDashboard },
  { to: "/services", label: "Xizmatlar", icon: Sparkles },
  { to: "/about", label: "Bizning tarix", icon: BookOpen },
  { to: "/gallery", label: "Galereya", icon: Image },
  { to: "/faq", label: "FAQ", icon: HelpCircle },
  { to: "/certificates", label: "Sertifikatlar", icon: Award },
  { to: "/reviews", label: "Mijozlar fikri", icon: Star },
  { to: "/contact", label: "Kontakt", icon: Phone },
  { to: "/booking", label: "Aloqa", icon: Send },
  { to: "/settings", label: "Sozlamalar", icon: Settings },
];

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="w-72 fixed inset-y-0 left-0 bg-white border-r border-border flex flex-col z-30">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full overflow-hidden border border-primary/20 flex items-center justify-center bg-background shrink-0">
            <img src="/favicon.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <h1 className="font-body font-bold text-lg leading-tight text-gradient">Admin Panel</h1>
            <p className="text-xs text-gradient/70 font-medium">Feyza Aura</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
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
          onClick={() => { if (window.confirm("Chiqishni tasdiqlaysizmi?")) logout(); }}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all w-full"
        >
          <LogOut className="w-4 h-4" />
          Chiqish
        </button>
      </div>
    </aside>
  );
}
