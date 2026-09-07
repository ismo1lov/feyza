import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import AdminLayout from "./admin/AdminRoutes.tsx";
import DashboardLayout from "./admin/components/layout/DashboardLayout.tsx";
import ProtectedRoute from "./admin/components/layout/ProtectedRoute.tsx";
import Login from "./admin/pages/Login.tsx";
import Dashboard from "./admin/pages/Dashboard.tsx";
import Services from "./admin/pages/Services.tsx";
import About from "./admin/pages/About.tsx";
import Gallery from "./admin/pages/Gallery.tsx";
import FAQ from "./admin/pages/FAQ.tsx";
import Certificates from "./admin/pages/Certificates.tsx";
import Reviews from "./admin/pages/Reviews.tsx";
import Booking from "./admin/pages/Booking.tsx";
import Contact from "./admin/pages/Contact.tsx";
import Settings from "./admin/pages/Settings.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="login" element={<Login />} />
              <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
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
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;