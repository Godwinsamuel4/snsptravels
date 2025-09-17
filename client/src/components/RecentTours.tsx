
import { useLocation } from "wouter";
import { useState, useEffect } from "react";

const recentTours = [
  {
    id: 1,
    title: "Canada",
    image: "/attached_assets/IMG-20250916-WA0022_1758093892791.jpg",
    caption: "Explore the stunning landscapes and vibrant cities of Canada"
  },
  {
    id: 2,
    title: "Jordan & Israel", 
    image: "/attached_assets/IMG-20250916-WA0023_1758093892792.jpg",
    caption: "Discover ancient history and religious sites in the Holy Land"
  },
  {
    id: 3,
    title: "Mauritius",
    image: "/attached_assets/IMG-20250916-WA0027_1758093892795.jpg",
    caption: "Relax on pristine beaches and enjoy tropical paradise"
  },
  {
    id: 4,
    title: "Egypt",
    image: "/attached_assets/IMG-20250916-WA0024_1758093892793.jpg",
    caption: "Experience the wonders of ancient pyramids and pharaohs"
  },
  {
    id: 5,
    title: "Italy",
    image: "/attached_assets/IMG-20250916-WA0025_1758093892793.jpg",
    caption: "Immerse yourself in art, culture, and culinary delights"
  },
  {
    id: 6,
    title: "Nigeria",
    image: "/attached_assets/IMG-20250916-WA0026_1758093892794.jpg",
    caption: "Discover the rich culture and natural beauty of Nigeria"
  }
];

export default function RecentTours() {
  const [, setLocation] = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(recentTours.length / 3));
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  const getVisibleTours = () => {
    const toursPerSlide = 3;
    const startIndex = currentIndex * toursPerSlide;
    return recentTours.slice(startIndex, startIndex + toursPerSlide);
  };

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Recent Tours
          </h2>
        </div>

        <div 
          className="relative overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {Array.from({ length: Math.ceil(recentTours.length / 3) }).map((_, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {recentTours
                    .slice(slideIndex * 3, slideIndex * 3 + 3)
                    .map((tour) => (
                      <div key={tour.id} className="group cursor-pointer" data-testid={`tour-${tour.id}`}>
                        <div className="relative overflow-hidden rounded-lg aspect-square">
                          <img 
                            src={tour.image} 
                            alt={tour.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const fallback = document.createElement('div');
                              fallback.className = 'w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center';
                              fallback.innerHTML = `<div class="text-center"><svg viewBox="0 0 24 24" fill="currentColor" class="h-12 w-12 text-primary mx-auto mb-2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg><p class="text-primary font-medium">${tour.title}</p></div>`;
                              target.parentNode?.appendChild(fallback);
                            }}
                          />
                          {/* Caption Overlay */}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                            <h3 className="text-white font-semibold text-lg mb-1">{tour.title}</h3>
                            <p className="text-white/90 text-sm">{tour.caption}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(recentTours.length / 3) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? "bg-primary" : "bg-muted"
              }`}
              data-testid={`button-tour-dot-${index}`}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            onClick={() => setLocation("/tours")}
            data-testid="button-view-all-tours"
          >
            View All Tours
          </button>
        </div>
      </div>
    </section>
  );
}
