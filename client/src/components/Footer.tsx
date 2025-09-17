import { Button } from "@/components/ui/button";
import logoImage from "@assets/Snowy-Spring-logo_1757438803888_1758027378266.png";
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin } from "lucide-react";

const footerLinks = {
  quickLinks: [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ],
  services: [
    { name: "Flight Booking", href: "#services" },
    { name: "Hotel Booking", href: "#services" },
    { name: "Visa Application", href: "#services" },
    { name: "Study Abroad", href: "#services" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
];

export default function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSocialClick = (platform: string) => {
    console.log(`${platform} social link clicked`);
    // Todo: remove mock functionality - add real social media links
  };

  return (
    <footer className="bg-muted/50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <img src={logoImage} alt="SN.SP Limited" className="h-10 w-10" />
              <span className="text-xl font-bold text-foreground">SN.SP Limited</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Your trusted travel agency for visa, flight and hotel services with a highly 
              trained and experienced team fully committed to your travel needs.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <span className="text-sm font-medium text-foreground">Follow Us</span>
            </div>
            <div className="flex space-x-3 mt-2">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                const getIconColor = (name: string) => {
                  switch(name.toLowerCase()) {
                    case 'facebook': return 'text-blue-600 hover:text-blue-700';
                    case 'twitter': return 'text-sky-500 hover:text-sky-600';
                    case 'instagram': return 'text-pink-600 hover:text-pink-700';
                    case 'linkedin': return 'text-blue-700 hover:text-blue-800';
                    default: return 'text-muted-foreground hover:text-primary';
                  }
                };
                return (
                  <Button
                    key={social.name}
                    variant="ghost"
                    size="icon"
                    onClick={() => handleSocialClick(social.name)}
                    data-testid={`button-social-${social.name.toLowerCase()}`}
                    className={`hover:bg-muted/50 transition-all duration-200 ${getIconColor(social.name)}`}
                  >
                    <IconComponent className="h-5 w-5" />
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <nav className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="block text-muted-foreground hover:text-primary transition-colors text-left"
                  data-testid={`link-footer-${link.name.toLowerCase().replace(" ", "-")}`}
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <nav className="space-y-3">
              {footerLinks.services.map((service) => (
                <button
                  key={service.name}
                  onClick={() => scrollToSection(service.href)}
                  className="block text-muted-foreground hover:text-primary transition-colors text-left"
                  data-testid={`link-service-${service.name.toLowerCase().replace(" ", "-")}`}
                >
                  {service.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  Suite 15, Damin Plaza, Ring Road, Ibadan
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="text-muted-foreground text-sm">
                  <div>+234 703 261 5370</div>
                  <div>+234 901 593 2925</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground text-sm">info@snsp.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © 2025 SN.SP (Snow Spring) Limited. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <button 
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={() => console.log("Privacy Policy clicked")}
                data-testid="link-privacy-policy"
              >
                Privacy Policy
              </button>
              <button 
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={() => console.log("Terms of Service clicked")}
                data-testid="link-terms"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}