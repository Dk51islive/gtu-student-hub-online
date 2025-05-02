
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ResourceProvider } from "@/context/ResourceContext";
import { StrictMode, useEffect } from "react";
import Index from "./pages/Index";
import Resources from "./pages/Resources";
import Profile from "./pages/Profile";
import Events from "./pages/Events";
import Community from "./pages/Community";
import Forum from "./pages/Forum";
import Home from "./pages/Home";
import ForumNew from "./pages/ForumNew";
import ForumPostView from "./pages/ForumPostView";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import FAQ from "./pages/support/FAQ";
import ContactUs from "./pages/support/ContactUs";
import HelpCenter from "./pages/support/HelpCenter";
import Feedback from "./pages/support/Feedback";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfService from "./pages/legal/TermsOfService";
import CookiePolicy from "./pages/legal/CookiePolicy";
import ViewResource from "./pages/ViewResource";
import RegisterEvent from "./pages/RegisterEvent";
import JoinGroup from "./pages/JoinGroup";
import CreateGroup from "./pages/CreateGroup";

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}

const App = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Main content routes */}
              <Route path="/" element={<Index />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/home" element={<Home />} />
              <Route path="/resources/:id" element={<ViewResource />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id/register" element={<RegisterEvent />} />
              <Route path="/community" element={<Community />} />
              <Route path="/community/groups/:id/join" element={<JoinGroup />} />
              <Route path="/community/groups/new" element={<CreateGroup />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/forum/new" element={<ForumNew />} />
              <Route path="/forum/post/:id" element={<ForumPostView />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Support Pages */}
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/help" element={<HelpCenter />} />
              <Route path="/feedback" element={<Feedback />} />
              
              {/* Legal Pages */}
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/cookies" element={<CookiePolicy />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </StrictMode>
  );
};

export default App;
