import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Target, Award } from "lucide-react";
import ceoImage from "@assets/generated_images/Professional_CEO_headshot_portrait_989b0458.png";
import officeImage from "@assets/generated_images/Modern_office_interior_setting_852e7d49.png";

const features = [
  {
    icon: Users,
    title: "Experienced Team",
    description: "Seasoned travel professionals dedicated to crafting perfect travel experiences.",
  },
  {
    icon: Target,
    title: "Customized Solutions",
    description: "Personalized travel arrangements tailored to your specific needs and preferences.",
  },
  {
    icon: CheckCircle,
    title: "Exceptional Service",
    description: "Customer satisfaction is our top priority with 24/7 support and expert guidance.",
  },
  {
    icon: Award,
    title: "Competitive Pricing",
    description: "Excellent value for money with competitive pricing without compromising quality.",
  },
];

export default function About() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Company Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Who We Are
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Snowy Spring Global Travels and Tours (SSG Travels) is a privately owned travel management 
              company headquartered in Ibadan, Nigeria. The vision for SSG Travels was conceived in 2017 
              by our CEO, Oluwaseun Abioye—a seasoned travel professional with years of experience working 
              alongside global leaders in the travel industry.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Officially launched in May 2020, SSG Travels was founded with a commitment to delivering 
              quality, reliable, and customer-centered travel solutions. Our mission is to make every 
              journey seamless, memorable, and tailored to meet the unique needs of our clients.
            </p>
            <Button onClick={scrollToContact} data-testid="button-about-contact">
              Get Started Today
            </Button>
          </div>
          
          <div className="relative">
            <img
              src={officeImage}
              alt="SN.SP Office Interior"
              className="rounded-lg shadow-lg w-full"
              data-testid="img-office"
            />
          </div>
        </div>

        {/* CEO Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="lg:order-2">
            <div className="text-center">
              <img
                src={ceoImage}
                alt="Oluwaseun Abioye, CEO of SSG Travels"
                className="w-48 h-48 rounded-full mx-auto mb-6 object-cover shadow-lg"
                data-testid="img-ceo"
              />
              <h3 className="text-2xl font-bold text-foreground mb-2">Oluwaseun Abioye</h3>
              <p className="text-lg text-muted-foreground">CEO, SSG Travels</p>
            </div>
          </div>
          
          <div className="lg:order-1">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Leadership Excellence
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              Under the visionary leadership of Oluwaseun Abioye, SSG Travels has grown from a 
              concept to a trusted name in the Nigerian travel industry. With extensive experience 
              in travel management and a deep understanding of customer needs, our CEO ensures 
              that every client receives world-class service.
            </p>
            <p className="text-lg text-muted-foreground">
              Our commitment to excellence and innovation continues to drive us forward, making 
              us the preferred choice for travelers seeking reliable and professional travel services.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Why Choose SN.SP Limited
          </h3>
          <p className="text-lg text-muted-foreground">
            We Are The Best Travel Agency in Ibadan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="text-center h-full" data-testid={`card-feature-${index}`}>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h4>
                  <p className="text-muted-foreground">{feature.description}</p>
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
import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, Clock, Shield } from "lucide-react";

const highlights = [
  {
    icon: Users,
    title: "5000+",
    description: "Happy Clients"
  },
  {
    icon: Award,
    title: "98%",
    description: "Success Rate"
  },
  {
    icon: Clock,
    title: "7+",
    description: "Years Experience"
  },
  {
    icon: Shield,
    title: "24/7",
    description: "Customer Support"
  }
];

export default function About() {
  return (
    <section id="about" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">About SN.SP Limited</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Since 2018, SN.SP Limited has been your trusted travel partner in Ibadan, Nigeria. 
              We specialize in providing comprehensive travel services including flight bookings, 
              hotel reservations, visa applications, and study abroad consultancy.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Our experienced team is committed to making your travel dreams a reality with 
              personalized service, competitive rates, and 24/7 support throughout your journey.
            </p>
            <Button asChild size="lg">
              <a href="/about">Learn More About Us</a>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {highlights.map((highlight, index) => {
              const IconComponent = highlight.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <IconComponent className="h-8 w-8 text-primary mx-auto mb-3" />
                    <div className="text-2xl font-bold text-foreground mb-1">
                      {highlight.title}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {highlight.description}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
