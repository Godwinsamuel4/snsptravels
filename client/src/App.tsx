import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Blog from "@/pages/Blog";
import Tours from "@/pages/Tours";
import EnhancedAbout from "@/pages/EnhancedAbout";
import EnhancedContact from "@/pages/EnhancedContact";
import FlightServices from "@/pages/services/FlightServices";
import HotelServices from "@/pages/services/HotelServices";
import VisaServices from "@/pages/services/VisaServices";
import StudyAbroad from "@/pages/services/StudyAbroad";
import HolidayPackages from "@/pages/services/HolidayPackages";
import TravelAdvisory from "@/pages/services/TravelAdvisory";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import BookingManagement from "@/pages/admin/BookingManagement";
import BlogManagement from "@/pages/admin/BlogManagement";
import InquiryManagement from "@/pages/admin/InquiryManagement";
import TourManagement from "@/pages/admin/TourManagement";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      {/* Main Pages */}
      <Route path="/" component={Home} />
      <Route path="/blog" component={Blog} />
      <Route path="/tours" component={Tours} />
      <Route path="/about" component={EnhancedAbout} />
      <Route path="/contact" component={EnhancedContact} />

      {/* Service Pages */}
      <Route path="/services/flights" component={FlightServices} />
      <Route path="/services/hotels" component={HotelServices} />
      <Route path="/services/visa" component={VisaServices} />
      <Route path="/services/study-abroad" component={StudyAbroad} />
      <Route path="/services/holidays" component={HolidayPackages} />
      <Route path="/services/advisory" component={TravelAdvisory} />

      {/* Admin Routes */}
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/bookings" component={BookingManagement} />
      <Route path="/admin/blog" component={BlogManagement} />
      <Route path="/admin/inquiries" component={InquiryManagement} />
      <Route path="/admin/tours" component={TourManagement} />

      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;