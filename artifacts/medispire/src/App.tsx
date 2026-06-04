import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
import Services from "@/pages/Services";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Resources from "@/pages/Resources";
import Contact from "@/pages/Contact";
import ContactUs from "@/pages/ContactUs";
import BookAppointment from "@/pages/BookAppointment";
import Impressum from "@/pages/Impressum";
import Datenschutz from "@/pages/Datenschutz";
import Terms from "@/pages/Terms";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about-us" component={AboutUs} />
        <Route path="/why-germany" component={WhyGermany} />
        <Route path="/for-doctors" component={ForDoctors} />
        <Route path="/for-dentists" component={ForDentists} />
        <Route path="/for-nurses" component={ForNurses} />
        <Route path="/services" component={Services} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/resources" component={Resources} />
        <Route path="/contact" component={Contact} />
        <Route path="/contact-us" component={ContactUs} />
        <Route path="/book-appointment" component={BookAppointment} />
        <Route path="/impressum" component={Impressum} />
        <Route path="/datenschutz" component={Datenschutz} />
        <Route path="/terms" component={Terms} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
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
  );
}

export default App;
