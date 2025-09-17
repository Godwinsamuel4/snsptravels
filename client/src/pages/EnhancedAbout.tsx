import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  CheckCircle, 
  Users, 
  Target, 
  Award, 
  Heart,
  Lightbulb,
  Zap,
  UserCheck,
  Globe,
  Shield,
  Clock,
  TrendingUp,
  DollarSign,
  HeadphonesIcon
} from "lucide-react";
import ceoImage from "@assets/generated_images/Professional_CEO_headshot_portrait_989b0458.png";
import officeImage from "@assets/generated_images/Modern_office_interior_setting_852e7d49.png";

const coreValues = [
  {
    icon: Heart,
    title: "Integrity",
    description: "We believe in honest, transparent dealings with all our clients"
  },
  {
    icon: Award,
    title: "Excellence", 
    description: "We strive for perfection in every service we provide"
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We continuously improve our services using the latest technology"
  },
  {
    icon: UserCheck,
    title: "Customer-Centric",
    description: "Your satisfaction is our top priority"
  }
];

const whyChooseFeatures = [
  {
    icon: Clock,
    title: "7+ Years Experience",
    description: "Established in 2018, we have successfully served thousands of satisfied customers with our reliable travel services."
  },
  {
    icon: Users,
    title: "Trusted Partners",
    description: "We work with leading airlines, hotels, and service providers worldwide to ensure you get the best deals and services."
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Our dedicated customer support team is available round the clock to assist you with any travel-related queries or emergencies."
  },
  {
    icon: Shield,
    title: "Secure Bookings",
    description: "All transactions are processed securely, and we maintain strict confidentiality of your personal and travel information."
  },
  {
    icon: DollarSign,
    title: "Competitive Pricing",
    description: "We offer the most competitive rates in the market without compromising on service quality or reliability."
  },
  {
    icon: Target,
    title: "Personalized Service",
    description: "Every client receives personalized attention and customized travel solutions tailored to their specific needs and preferences."
  }
];

const companyStats = [
  { number: "5000+", label: "Happy Clients", icon: Users },
  { number: "50+", label: "Countries Served", icon: Globe },
  { number: "98%", label: "Success Rate", icon: TrendingUp },
  { number: "24/7", label: "Customer Support", icon: Clock }
];

export default function EnhancedAbout() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge variant="outline">Since 2018</Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            About SN.SP Limited
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your trusted partner in creating unforgettable travel experiences since 2018
          </p>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {companyStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="text-center" data-testid={`stat-${index}`}>
                  <CardContent className="pt-6">
                    <IconComponent className="h-8 w-8 text-primary mx-auto mb-3" />
                    <div className="text-3xl font-bold text-foreground mb-1">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Founded in 2018, SN.SP (Snow Spring) Limited has grown from a small travel 
                  consultancy to one of Ibadan's most trusted travel agencies.
                </p>
                <p>
                  We began with a simple mission: to make travel accessible, affordable, and 
                  stress-free for everyone. Our founders, seasoned travel professionals with 
                  over a decade of combined experience, recognized the need for personalized 
                  travel services that truly understand the unique needs of Nigerian travelers.
                </p>
                <p>
                  Today, we've successfully helped thousands of clients achieve their travel 
                  dreams, from business trips to family vacations, study abroad programs to 
                  visa applications. Our commitment to excellence and personalized service has 
                  made us the preferred travel partner for individuals and businesses across Nigeria.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <img
                src={officeImage}
                alt="SN.SP Modern Office Interior"
                className="rounded-lg shadow-lg w-full"
                data-testid="img-office-interior"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* Mission */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-6 w-6 text-primary" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To provide exceptional travel services that exceed our clients' expectations, 
                  making every journey memorable and hassle-free through our expertise, 
                  dedication, and personalized approach.
                </p>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-6 w-6 text-primary" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To become the leading travel agency in Nigeria, recognized for our innovative 
                  solutions, exceptional customer service, and commitment to making the world 
                  more accessible to all travelers.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Core Values */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="text-center h-full" data-testid={`value-${index}`}>
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground">Experienced professionals dedicated to your travel success</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* CEO Section */}
            <div className="text-center lg:text-left">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <img
                    src={ceoImage}
                    alt="Oluwaseun Abioye, Founder & CEO"
                    className="w-48 h-48 rounded-full object-cover shadow-lg mx-auto"
                    data-testid="img-ceo-profile"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Oluwaseun Abioye</h3>
                  <p className="text-lg text-primary mb-4">Founder & CEO</p>
                  <p className="text-muted-foreground mb-6">
                    With over 10 years in the travel industry, Seun leads our team with passion 
                    for creating exceptional travel experiences. His extensive experience in travel 
                    management and deep understanding of customer needs ensures that every client 
                    receives world-class service.
                  </p>
                  <p className="text-muted-foreground">
                    Under his visionary leadership, SN.SP Limited has grown from a concept to a 
                    trusted name in the Nigerian travel industry, committed to excellence and innovation.
                  </p>
                </div>
              </div>
            </div>

            {/* Team Overview */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-6 w-6 text-primary" />
                    Our Professional Team
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Our experienced consultants are trained in visa requirements, flight bookings, 
                    and destination expertise to serve you better. Each team member brings 
                    specialized knowledge and passion for travel to ensure your journey is perfect.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">Certified travel consultants</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">Visa application specialists</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">Destination experts</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">24/7 customer support team</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose SN.SP Limited</h2>
            <p className="text-lg text-muted-foreground">What sets us apart in the travel industry</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="text-center h-full hover-elevate" data-testid={`feature-${index}`}>
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let our experienced team help you plan your perfect trip. Contact us today 
            for personalized travel solutions.
          </p>
          <Button size="lg" onClick={scrollToContact} data-testid="button-get-in-touch">
            Get in Touch
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}