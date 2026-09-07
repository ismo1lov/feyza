import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "@admin/contexts/AuthContext";

export default function AdminLayout() {
  return (
    <div className="admin-root">
      <AuthProvider>
        <Toaster position="top-center" richColors />
        <Outlet />
      </AuthProvider>
    </div>
  );
}