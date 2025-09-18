import { Button } from "@/components/ui/button";
import { Plane, Quote } from "lucide-react";
import { useLocation } from "wouter";
import heroBackground from "@assets/generated_images/Tropical_beach_hero_background_6df6d6fc.png";

export default function Hero() {
  const [, setLocation] = useLocation();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleExploreServices = () => {
    // Navigate to services section or scroll to it
    const servicesElement = document.querySelector("#services");
    if (servicesElement) {
      servicesElement.scrollIntoView({ behavior: "smooth" });
    } else {
      // If not on home page, navigate to home then scroll
      setLocation("/#services");
    }
  };

  const handleGetQuote = () => {
    // Navigate to contact page
    setLocation("/contact");
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />

      {/* Dark Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Discover Your Next Adventure
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-medium">
            Your Trusted Travel Partner for Unforgettable Journeys
          </p>
          <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
            Experience seamless travel planning with our expert team, tailored to your dream destinations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={handleExploreServices}
              className="bg-primary/90 backdrop-blur-sm hover:bg-primary text-white border border-primary-border"
              data-testid="button-explore-services"
            >
              <Plane className="mr-2 h-5 w-5" />
              Explore Services
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={handleGetQuote}
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
              data-testid="button-hero-quote"
            >
              <Quote className="mr-2 h-5 w-5" />
              Get a Quote
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
}