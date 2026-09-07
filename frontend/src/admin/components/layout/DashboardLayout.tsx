import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(30,50%,98%)] to-[hsl(340,40%,96%)]">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="sticky top-0 z-20 lg:hidden bg-white/80 backdrop-blur-md border-b border-border flex items-center gap-3 px-4 py-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-xl hover:bg-accent text-muted-foreground"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/20">
            <img src="/favicon.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-body font-bold text-gradient">Admin Panel</span>
        </div>
      </div>

      <main className="ml-0 lg:ml-72 p-4 md:p-6 lg:p-8 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
