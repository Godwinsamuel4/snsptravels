import { useState, useEffect } from "react";

interface Partner {
  id: string;
  name: string;
  category: string;
  logo: string;
}

// Real partner logos with professional branding
const partners: Partner[] = [
  { id: "1", name: "Emirates Airlines", category: "Premium Airline Partner", logo: "https://logos-world.net/wp-content/uploads/2023/01/Emirates-Logo.png" },
  { id: "2", name: "Marriott Hotels", category: "Luxury Hotel Chain", logo: "https://logos-world.net/wp-content/uploads/2020/06/Marriott-Logo.png" },
  { id: "3", name: "Turkish Airlines", category: "International Airline", logo: "https://logos-world.net/wp-content/uploads/2023/01/Turkish-Airlines-Logo.png" },
  { id: "4", name: "Allianz Travel", category: "Insurance Partner", logo: "https://logos-world.net/wp-content/uploads/2020/11/Allianz-Logo.png" },
  { id: "5", name: "Booking.com", category: "Hotel Booking Platform", logo: "https://logos-world.net/wp-content/uploads/2021/08/Booking-Logo.png" },
  { id: "6", name: "VFS Global", category: "Visa Application Center", logo: "https://www.vfsglobal.com/content/dam/new-vfs-website/common/vfs-global-logo.png" },
];

export default function Partners() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-scroll functionality with smooth transitions
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(partners.length / 2));
    }, 2500);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
    console.log("Partners carousel paused");
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
    console.log("Partners carousel resumed");
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Trusted Partners
          </h2>
          <p className="text-lg text-muted-foreground">
            Working with leading airlines, hotels, and travel organizations worldwide
          </p>
        </div>

        <div 
          className="overflow-hidden relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Floating animation background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
            <div className="absolute top-32 right-20 w-12 h-12 bg-accent rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
            <div className="absolute bottom-20 left-1/3 w-16 h-16 bg-primary/50 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
          </div>
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {/* Create multiple sets for infinite scroll effect */}
            {[...Array(3)].map((_, setIndex) => (
              <div key={setIndex} className="flex min-w-full">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 w-full">
                  {partners.map((partner) => (
                    <div
                      key={`${setIndex}-${partner.id}`}
                      className="flex flex-col items-center justify-center p-4 bg-background rounded-lg hover-elevate min-h-[120px] shadow-sm border transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-primary/30 group"
                      data-testid={`partner-${partner.id}`}
                    >
                      <div className="w-16 h-12 mb-3 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
                        <img 
                          src={partner.logo} 
                          alt={partner.name}
                          className="max-w-full max-h-full object-contain filter transition-all duration-300 group-hover:brightness-110"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = document.createElement('div');
                            fallback.className = 'w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center';
                            fallback.innerHTML = `<span class="text-primary font-bold text-xs">${partner.name.substring(0, 2)}</span>`;
                            target.parentNode?.appendChild(fallback);
                          }}
                        />
                      </div>
                      <h4 className="font-semibold text-foreground text-center mb-1 text-xs">
                        {partner.name}
                      </h4>
                      <p className="text-xs text-muted-foreground text-center leading-tight">
                        {partner.category}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {[...Array(Math.ceil(partners.length / 3))].map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                console.log(`Partner carousel dot ${index} clicked`);
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-primary" : "bg-muted"
              }`}
              data-testid={`button-partner-dot-${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}