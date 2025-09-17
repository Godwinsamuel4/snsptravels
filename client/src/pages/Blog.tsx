import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Search, 
  Calendar, 
  User, 
  ArrowRight, 
  Mail,
  Plane,
  Hotel,
  FileText,
  GraduationCap,
  MapPin,
  Shield
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  featured: boolean;
  categoryIcon: React.ElementType;
  categoryColor: string;
  image: string;
  imageAlt: string;
}

// Todo: remove mock functionality - replace with real blog posts
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Top 10 Must-Visit Destinations in 2025",
    excerpt: "Discover the most breathtaking destinations that should be on every traveler's bucket list this year. From pristine beaches to bustling cities, these locations offer unforgettable experiences.",
    category: "Travel Tips",
    date: "January 15, 2025",
    author: "Travel Team",
    readTime: "5 min read",
    featured: true,
    categoryIcon: MapPin,
    categoryColor: "bg-blue-100 text-blue-700",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop&crop=entropy&cs=tinysrgb",
    imageAlt: "Beautiful tropical destination with crystal clear waters"
  },
  {
    id: "2",
    title: "How to Find the Best Flight Deals",
    excerpt: "Learn insider tips and tricks to save money on your next flight booking. Our experts share proven strategies used by savvy travelers.",
    category: "Flight Tips",
    date: "January 10, 2025",
    author: "SN.SP Team",
    readTime: "4 min read",
    featured: false,
    categoryIcon: Plane,
    categoryColor: "bg-green-100 text-green-700",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&fit=crop&crop=entropy&cs=tinysrgb",
    imageAlt: "Airplane flying above clouds"
  },
  {
    id: "3",
    title: "Ultimate Guide to Hotel Bookings",
    excerpt: "Discover how to book the perfect hotel for your stay. From luxury resorts to budget-friendly options, find your ideal accommodation.",
    category: "Hotels",
    date: "January 8, 2025",
    author: "Hotel Expert",
    readTime: "6 min read",
    featured: false,
    categoryIcon: Hotel,
    categoryColor: "bg-purple-100 text-purple-700",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop&crop=entropy&cs=tinysrgb",
    imageAlt: "Luxury hotel lobby interior"
  },
  {
    id: "4",
    title: "Complete Study Abroad Guide",
    excerpt: "Everything you need to know about studying abroad. From visa applications to choosing the right university and country.",
    category: "Education",
    date: "January 5, 2025",
    author: "Education Team",
    readTime: "8 min read",
    featured: false,
    categoryIcon: GraduationCap,
    categoryColor: "bg-yellow-100 text-yellow-700",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop&crop=entropy&cs=tinysrgb",
    imageAlt: "University campus with students"
  },
  {
    id: "5",
    title: "Visa Application Made Simple",
    excerpt: "Navigate the visa application process with confidence. Our step-by-step guide ensures a smooth and successful application.",
    category: "Visa Guide",
    date: "January 3, 2025",
    author: "Visa Expert",
    readTime: "7 min read",
    featured: false,
    categoryIcon: FileText,
    categoryColor: "bg-red-100 text-red-700",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop&crop=entropy&cs=tinysrgb",
    imageAlt: "Passport and visa documents"
  },
  {
    id: "6",
    title: "Why Travel Insurance is Essential",
    excerpt: "Protect your investment and travel with peace of mind. Learn about different types of travel insurance and what coverage you need.",
    category: "Travel Safety",
    date: "December 30, 2024",
    author: "Safety Team",
    readTime: "5 min read",
    featured: false,
    categoryIcon: Shield,
    categoryColor: "bg-orange-100 text-orange-700",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop&crop=entropy&cs=tinysrgb",
    imageAlt: "Travel insurance and safety concept"
  }
];

const categories = [
  { name: "All", count: blogPosts.length },
  { name: "Flight Tips", count: blogPosts.filter(post => post.category === "Flight Tips").length },
  { name: "Hotels", count: blogPosts.filter(post => post.category === "Hotels").length },
  { name: "Visa Guide", count: blogPosts.filter(post => post.category === "Visa Guide").length },
  { name: "Study Abroad", count: blogPosts.filter(post => post.category === "Education").length },
  { name: "Destinations", count: blogPosts.filter(post => post.category === "Travel Tips").length },
  { name: "Travel Safety", count: blogPosts.filter(post => post.category === "Travel Safety").length }
];

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [email, setEmail] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || 
                          post.category === selectedCategory ||
                          (selectedCategory === "Study Abroad" && post.category === "Education") ||
                          (selectedCategory === "Destinations" && post.category === "Travel Tips");
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    console.log("Search term:", e.target.value);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    console.log("Selected category:", category);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter subscription:", email);
    alert("Thank you for subscribing to our newsletter!");
    setEmail("");
  };

  const handleReadMore = (postId: string) => {
    console.log("Read more clicked for post:", postId);
    alert("This will navigate to the full article. Feature coming soon!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Travel Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover amazing destinations, travel tips, and inspiring stories from around the world
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10"
              data-testid="input-search"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Article */}
            {featuredPost && selectedCategory === "All" && !searchTerm && (
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="default">Featured</Badge>
                  <Badge variant="outline" className={featuredPost.categoryColor}>
                    {featuredPost.category}
                  </Badge>
                </div>
                
                <Card className="hover-elevate overflow-hidden" data-testid="featured-post">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <div className="h-64 md:h-full overflow-hidden">
                        <img 
                          src={featuredPost.image} 
                          alt={featuredPost.imageAlt}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = document.createElement('div');
                            fallback.className = 'h-64 md:h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center';
                            fallback.innerHTML = `<div class="h-16 w-16 text-primary">${featuredPost.categoryIcon}</div>`;
                            target.parentNode?.appendChild(fallback);
                          }}
                        />
                      </div>
                    </div>
                    <div className="md:w-2/3 p-6">
                      <h2 className="text-2xl font-bold text-foreground mb-3">
                        {featuredPost.title}
                      </h2>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {featuredPost.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {featuredPost.author}
                          </div>
                        </div>
                        <Button 
                          onClick={() => handleReadMore(featuredPost.id)}
                          data-testid="button-read-featured"
                        >
                          Read Full Article
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Regular Articles Grid */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {searchTerm ? `Search Results (${filteredPosts.length})` : 
                 selectedCategory === "All" ? "Latest Articles" : selectedCategory}
              </h2>
              
              {filteredPosts.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <p className="text-muted-foreground">No articles found matching your criteria.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {regularPosts.map((post) => {
                    const IconComponent = post.categoryIcon;
                    return (
                      <Card key={post.id} className="hover-elevate h-full overflow-hidden" data-testid={`post-${post.id}`}>
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={post.image} 
                            alt={post.imageAlt}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const fallback = document.createElement('div');
                              fallback.className = 'h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center';
                              const IconComponent = post.categoryIcon;
                              fallback.innerHTML = `<div class="h-12 w-12 text-primary"><svg viewBox="0 0 24 24" fill="currentColor">${IconComponent}</svg></div>`;
                              target.parentNode?.appendChild(fallback);
                            }}
                          />
                        </div>
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className={`${post.categoryColor} text-xs`}>
                              <IconComponent className="h-3 w-3 mr-1" />
                              {post.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{post.readTime}</span>
                          </div>
                          <CardTitle className="text-lg leading-tight">
                            {post.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col">
                          <p className="text-muted-foreground text-sm mb-4 flex-1">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {post.date}
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleReadMore(post.id)}
                              data-testid={`button-read-${post.id}`}
                            >
                              Read More
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.name}
                        onClick={() => handleCategoryFilter(category.name)}
                        className={`w-full flex items-center justify-between p-2 rounded-md text-left transition-colors ${
                          selectedCategory === category.name
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                        data-testid={`category-${category.name.toLowerCase().replace(" ", "-")}`}
                      >
                        <span className="text-sm">{category.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {category.count}
                        </Badge>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Newsletter</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Get the latest travel tips and destination guides delivered to your inbox.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                    <Input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      data-testid="input-newsletter-email"
                      required
                    />
                    <Button type="submit" className="w-full" size="sm" data-testid="button-subscribe">
                      <Mail className="mr-2 h-4 w-4" />
                      Subscribe
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Quick Contact */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <p className="font-medium">+234 703 261 5370</p>
                    <p className="text-muted-foreground">Call us anytime</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">info@snsp.com</p>
                    <p className="text-muted-foreground">Email us</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Suite 15, Damin Plaza</p>
                    <p className="text-muted-foreground">Ring Road, Ibadan</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let our travel experts help you plan your perfect trip. Get personalized 
            recommendations and exclusive deals.
          </p>
          <Button size="lg" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} data-testid="button-plan-trip">
            Plan Your Trip
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}