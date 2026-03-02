import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Crisis from "./pages/Crisis";
import Solution from "./pages/Solution";
import CityImpact from "./pages/CityImpact";
import RequestDemo from "./pages/RequestDemo";
// import JoinUs from "./pages/JoinUs";
import Feedback from "./pages/Feedback"; // updated import
import Implementation from "./pages/Implementation";
import Blog from "./pages/Blog";
import FAQ from "./pages/FAQ";
// import GovtDefence from "./pages/GovtDefence";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/crisis" element={<Crisis />} />
            <Route path="/solution" element={<Solution />} />
            <Route path="/city-impact" element={<CityImpact />} />
            <Route path="/request-demo" element={<RequestDemo />} />
            <Route path="/feedback" element={<Feedback />} /> {/* updated route */}
            <Route path="/implementation" element={<Implementation />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/faq" element={<FAQ />} />
            {/* <Route path="/govt-defence" element={<GovtDefence />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;