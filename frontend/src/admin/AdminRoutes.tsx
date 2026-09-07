import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "@admin/contexts/AuthContext";
import DashboardLayout from "@admin/components/layout/DashboardLayout";
import ProtectedRoute from "@admin/components/layout/ProtectedRoute";
import Login from "@admin/pages/Login";
import Dashboard from "@admin/pages/Dashboard";
import Services from "@admin/pages/Services";
import About from "@admin/pages/About";
import Gallery from "@admin/pages/Gallery";
import FAQ from "@admin/pages/FAQ";
import Certificates from "@admin/pages/Certificates";
import Reviews from "@admin/pages/Reviews";
import Booking from "@admin/pages/Booking";
import Contact from "@admin/pages/Contact";
import Settings from "@admin/pages/Settings";

export default function AdminRoutes() {
  return (
    <div className="admin-root">
      <AuthProvider>
        <Toaster position="top-center" richColors />
        <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="services" element={<Services />} />
            <Route path="about" element={<About />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="booking" element={<Booking />} />
            <Route path="contact" element={<Contact />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}