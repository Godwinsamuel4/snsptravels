import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "wouter";
import logoImage from "@assets/Snowy-Spring-logo_1757438803888_1758027378266.png";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const menuItems = [
    { name: "Home", href: "/" },
    {
      name: "Services", 
      href: "/services",
      submenu: [
        { name: "Flight Services", href: "/services/flights" },
        { name: "Hotel Bookings", href: "/services/hotels" },
        { name: "Visa Applications", href: "/services/visa" },
        { name: "Study Abroad", href: "/services/study-abroad" },
        { name: "Holiday Packages", href: "/services/holidays" },
        { name: "Travel Advisory", href: "/services/advisory" }
      ]
    },
    { name: "Tours", href: "/tours" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  const scrollToContact = () => {
    // For home page, scroll to contact section
    if (location === "/") {
      const element = document.querySelector("#contact");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // For other pages, navigate to contact page
      window.location.href = "/contact";
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity" data-testid="logo-link">
            <img src={logoImage} alt="SN.SP Limited" className="h-10 w-10" />
            <span className="text-xl font-bold text-foreground">SN.SP Limited</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              item.submenu ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger asChild>
                    <button 
                      className={`flex items-center gap-1 transition-colors ${
                        isActive(item.href) ? 'text-primary' : 'text-foreground hover:text-primary'
                      }`}
                      data-testid={`nav-${item.name.toLowerCase()}`}
                    >
                      {item.name}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {item.submenu.map((subItem) => (
                      <DropdownMenuItem key={subItem.name} asChild>
                        <Link href={subItem.href} className="cursor-pointer" data-testid={`nav-${subItem.name.toLowerCase().replace(" ", "-")}`}>
                          {subItem.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`transition-colors ${
                    isActive(item.href) ? 'text-primary' : 'text-foreground hover:text-primary'
                  }`}
                  data-testid={`nav-${item.name.toLowerCase()}`}
                >
                  {item.name}
                </Link>
              )
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button asChild data-testid="button-get-quote">
              <Link href="/contact">Get a Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                item.submenu ? (
                  <div key={item.name} className="space-y-2">
                    <div className="font-medium text-foreground px-2">{item.name}</div>
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-accent ${
                          isActive(subItem.href) ? 'text-primary' : ''
                        }`}
                        data-testid={`mobile-nav-${subItem.name.toLowerCase().replace(" ", "-")}`}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-accent ${
                      isActive(item.href) ? 'text-primary' : ''
                    }`}
                    data-testid={`mobile-nav-${item.name.toLowerCase()}`}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              <Button asChild className="self-start" data-testid="button-mobile-quote">
                <Link href="/contact" onClick={() => setIsMenuOpen(false)}>Get a Quote</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}