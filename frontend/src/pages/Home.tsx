import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FlightBookingForm from "@/components/FlightBookingForm";
import RecentTours from "@/components/RecentTours";
import Services from "@/components/Services";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Partners from "@/components/Partners";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Flight Booking Form Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FlightBookingForm />
        </div>
      </section>
      
      {/* Recent Tours Section */}
      <RecentTours />
      
      {/* Services Section */}
      <Services />
      
      {/* About Section */}
      <About />
      
      {/* Testimonials Section */}
      <Testimonials />
      
      {/* Partners Section */}
      <Partners />
      
      {/* Contact Section */}
      <Contact />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}