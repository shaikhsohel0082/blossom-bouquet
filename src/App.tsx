import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BouquetProvider } from "@/context/BouquetContext";
import Index from "./pages/Index";
import BuilderPage from "./pages/BuilderPage";
import SharePage from "./pages/SharePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <BouquetProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/builder" element={<BuilderPage />} />
            <Route path="/bouquet/:id" element={<SharePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BouquetProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
