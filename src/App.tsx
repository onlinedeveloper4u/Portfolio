import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import DynamicMeta from "@/components/DynamicMeta";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Admin pages
import Login from "./pages/admin/Login";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ProjectsManager from "./pages/admin/ProjectsManager";
import ExperiencesManager from "./pages/admin/ExperiencesManager";
import SkillsManager from "./pages/admin/SkillsManager";
import ServicesManager from "./pages/admin/ServicesManager";
import TestimonialsManager from "./pages/admin/TestimonialsManager";
import SiteSettingsManager from "./pages/admin/SiteSettingsManager";
import ContactLinksManager from "./pages/admin/ContactLinksManager";
import TechStackManager from "./pages/admin/TechStackManager";
import ToolsManager from "./pages/admin/ToolsManager";
import LanguagesManager from "./pages/admin/LanguagesManager";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <AuthProvider>
        <TooltipProvider>
          <DynamicMeta />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />

              {/* Admin routes */}
              <Route path="/admin/login" element={<Login />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="projects" element={<ProjectsManager />} />
                <Route path="experiences" element={<ExperiencesManager />} />
                <Route path="skills" element={<SkillsManager />} />
                <Route path="services" element={<ServicesManager />} />
                <Route path="testimonials" element={<TestimonialsManager />} />
                <Route path="site-settings" element={<SiteSettingsManager />} />
                <Route path="contact-links" element={<ContactLinksManager />} />
                <Route path="tech-stack" element={<TechStackManager />} />
                <Route path="tools" element={<ToolsManager />} />
                <Route path="languages" element={<LanguagesManager />} />
              </Route>

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
