import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BookingProvider } from "@/components/BookingContext";
import { Layout } from "@/components/Layout";

import Home from "@/pages/Home";
import AboutUs from "@/pages/AboutUs";
import WhyGermany from "@/pages/WhyGermany";
import ForDoctors from "@/pages/ForDoctors";
import ForDentists from "@/pages/ForDentists";
import ForNurses from "@/pages/ForNurses";
import ForAlliedHealth from "@/pages/ForAlliedHealth";
import EligibilityChecker from "@/pages/EligibilityChecker";
import CostEstimator from "@/pages/CostEstimator";
import Services from "@/pages/Services";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Resources from "@/pages/Resources";
import ContactUs from "@/pages/ContactUs";
import BookAppointment from "@/pages/BookAppointment";
import Impressum from "@/pages/Impressum";
import Datenschutz from "@/pages/Datenschutz";
import Terms from "@/pages/Terms";
import SalaryCalculator from "@/pages/SalaryCalculator";
import DocumentChecklist from "@/pages/DocumentChecklist";
import StateComparison from "@/pages/StateComparison";
import LanguageTimeline from "@/pages/LanguageTimeline";
import ReadinessChecklist from "@/pages/ReadinessChecklist";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about-us" component={AboutUs} />
        <Route path="/why-germany" component={WhyGermany} />
        <Route path="/for-doctors" component={ForDoctors} />
        <Route path="/for-dentists" component={ForDentists} />
        <Route path="/for-nurses" component={ForNurses} />
        <Route path="/for-allied-health" component={ForAlliedHealth} />
        <Route path="/eligibility-checker" component={EligibilityChecker} />
        <Route path="/cost-estimator" component={CostEstimator} />
        <Route path="/services" component={Services} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/resources" component={Resources} />
        <Route path="/contact" component={ContactUs} />
        <Route path="/contact-us" component={ContactUs} />
        <Route path="/book-appointment" component={BookAppointment} />
        <Route path="/impressum" component={Impressum} />
        <Route path="/datenschutz" component={Datenschutz} />
        <Route path="/terms" component={Terms} />
        <Route path="/tools/salary-calculator" component={SalaryCalculator} />
        <Route path="/tools/document-checklist" component={DocumentChecklist} />
        <Route path="/tools/state-compare" component={StateComparison} />
        <Route path="/tools/language-timeline" component={LanguageTimeline} />
        <Route path="/tools/readiness-checklist" component={ReadinessChecklist} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <BookingProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
          </BookingProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
