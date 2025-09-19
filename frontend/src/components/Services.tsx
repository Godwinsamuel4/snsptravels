import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plane, Hotel, FileText, MapPin, GraduationCap, Shield } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const services: Service[] = [
  {
    id: "flight-booking",
    title: "Flight Booking",
    description: "Seamless flight booking for your global travel needs with competitive pricing and flexible options.",
    icon: Plane,
  },
  {
    id: "hotel-booking",
    title: "Hotel Booking",
    description: "Book top-rated hotels worldwide with our extensive network of trusted accommodation partners.",
    icon: Hotel,
  },
  {
    id: "visa-application",
    title: "Visa Application",
    description: "Expert visa application assistance for stress-free travel with high success rates.",
    icon: FileText,
  },
  {
    id: "holiday-packages",
    title: "Holiday Packages",
    description: "Customized holiday packages for unforgettable travel experiences tailored to your preferences.",
    icon: MapPin,
  },
  {
    id: "study-abroad",
    title: "Study Abroad",
    description: "Transform your future with global educational experiences and comprehensive support.",
    icon: GraduationCap,
  },
  {
    id: "travel-advisories",
    title: "Travel Advisories",
    description: "Get the latest updates on travel advisories and safety information for informed decisions.",
    icon: Shield,
  },
];

export default function Services() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive travel solutions tailored to your unique needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Card key={service.id} className="hover-elevate h-full" data-testid={`card-service-${service.id}`}>
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center mb-6">
                    {service.description}
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={scrollToContact}
                    data-testid={`button-learn-more-${service.id}`}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, Hotel, FileText, GraduationCap, MapPin, Shield } from "lucide-react";

const services = [
  {
    icon: Plane,
    title: "Flight Booking",
    description: "Domestic and international flight reservations with competitive rates",
    link: "/services/flights"
  },
  {
    icon: Hotel,
    title: "Hotel Reservations",
    description: "Wide selection from budget to luxury accommodations worldwide",
    link: "/services/hotels"
  },
  {
    icon: FileText,
    title: "Visa Applications",
    description: "Expert assistance with visa processing and documentation",
    link: "/services/visa"
  },
  {
    icon: GraduationCap,
    title: "Study Abroad",
    description: "Complete guidance for international education opportunities",
    link: "/services/study-abroad"
  },
  {
    icon: MapPin,
    title: "Holiday Packages",
    description: "Customized vacation packages for unforgettable experiences",
    link: "/services/holidays"
  },
  {
    icon: Shield,
    title: "Travel Advisory",
    description: "Latest travel updates and safety information",
    link: "/services/advisory"
  }
];

export default function Services() {
  return (
    <section id="services" className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive travel solutions tailored to meet all your travel needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="hover-elevate h-full">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center flex-1 flex flex-col">
                  <p className="text-muted-foreground mb-6 flex-1">{service.description}</p>
                  <Button asChild>
                    <a href={service.link}>Learn More</a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
