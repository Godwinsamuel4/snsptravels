
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const tours = [
  {
    id: 1,
    image: "/attached_assets/IMG-20250916-WA0022_1758093892791.jpg",
    title: "Canada",
    caption: "Explore the stunning landscapes and vibrant cities of Canada"
  },
  {
    id: 2,
    image: "/attached_assets/IMG-20250916-WA0023_1758093892792.jpg",
    title: "Jordan & Israel",
    caption: "Discover ancient history and religious sites in the Holy Land"
  },
  {
    id: 3,
    image: "/attached_assets/IMG-20250916-WA0024_1758093892793.jpg",
    title: "Egypt",
    caption: "Experience the wonders of ancient pyramids and pharaohs"
  },
  {
    id: 4,
    image: "/attached_assets/IMG-20250916-WA0025_1758093892793.jpg",
    title: "Italy",
    caption: "Immerse yourself in art, culture, and culinary delights"
  },
  {
    id: 5,
    image: "/attached_assets/IMG-20250916-WA0026_1758093892794.jpg",
    title: "Nigeria",
    caption: "Discover the rich culture and natural beauty of Nigeria"
  },
  {
    id: 6,
    image: "/attached_assets/IMG-20250916-WA0027_1758093892795.jpg",
    title: "Mauritius",
    caption: "Relax on pristine beaches and enjoy tropical paradise"
  },
  {
    id: 7,
    image: "/attached_assets/IMG-20250916-WA0028_1758093892795.jpg",
    title: "Tanzania",
    caption: "Safari adventures and Mount Kilimanjaro expeditions"
  },
  {
    id: 8,
    image: "/attached_assets/IMG-20250916-WA0029_1758093892796.jpg",
    title: "Turkey",
    caption: "Bridge between Europe and Asia with rich cultural heritage"
  },
  {
    id: 9,
    image: "/attached_assets/IMG-20250916-WA0030_1758093892796.jpg",
    title: "Ghana",
    caption: "Gateway to West Africa with vibrant culture and history"
  },
  {
    id: 10,
    image: "/attached_assets/IMG-20250916-WA0032_1758093892798.jpg",
    title: "Kenya",
    caption: "Home to incredible wildlife and the Great Migration"
  },
  {
    id: 11,
    image: "/attached_assets/IMG-20250916-WA0037_1758093892800.jpg",
    title: "South Africa",
    caption: "Rainbow Nation with diverse landscapes and wildlife"
  },
  {
    id: 12,
    image: "/attached_assets/IMG-20250916-WA0038_1758093892801.jpg",
    title: "United Kingdom",
    caption: "Discover historic castles, modern cities, and countryside"
  }
];

export default function Tours() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Our Tours
            </h1>
          </div>
        </div>
      </section>

      {/* Tours Gallery */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tours.map((tour) => (
              <div key={tour.id} className="group cursor-pointer">
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
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-white font-semibold text-lg mb-1">{tour.title}</h3>
                    <p className="text-white/90 text-sm">{tour.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
