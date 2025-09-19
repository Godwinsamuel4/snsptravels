import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  MapPin, 
  Calendar, 
  Users, 
  Camera, 
  Shield, 
  Clock,
  CheckCircle,
  Star
} from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Customized itinerary planning",
    description: "Tailor-made travel plans based on your preferences and interests"
  },
  {
    icon: Star,
    title: "All-inclusive package options",
    description: "Everything included - flights, hotels, meals, and activities"
  },
  {
    icon: Users,
    title: "Local tour guide arrangements",
    description: "Experienced local guides for authentic cultural experiences"
  },
  {
    icon: Camera,
    title: "Activity and excursion bookings",
    description: "Pre-arranged activities and memorable experiences"
  },
  {
    icon: Shield,
    title: "Travel insurance recommendations",
    description: "Comprehensive coverage for peace of mind during your trip"
  },
  {
    icon: Clock,
    title: "24/7 travel support during your trip",
    description: "Round-the-clock assistance throughout your holiday"
  }
];

interface HolidayForm {
  fullName: string;
  email: string;
  phone: string;
  destination: string;
  packageType: string;
  travelers: string;
  budget: string;
  duration: string;
  startDate: string;
  accommodation: string;
  interests: string;
  specialRequests: string;
}

export default function HolidayPackages() {
  const [packageData, setPackageData] = useState<HolidayForm>({
    fullName: "",
    email: "",
    phone: "",
    destination: "",
    packageType: "",
    travelers: "2",
    budget: "",
    duration: "",
    startDate: "",
    accommodation: "",
    interests: "",
    specialRequests: ""
  });

  const handleInputChange = (field: keyof HolidayForm, value: string) => {
    setPackageData(prev => ({ ...prev, [field]: value }));
    console.log(`Updated ${field}:`, value);
  };

  const handlePackageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Holiday package inquiry submitted:", packageData);
    alert("Thank you! We'll create a customized holiday package proposal and send it to you within 48 hours.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="h-8 w-8 text-primary" />
              <Badge variant="outline">Unforgettable Experiences</Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Holiday Packages
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Create unforgettable memories with our customized holiday packages. Whether you're planning 
              a romantic getaway, family vacation, or adventure trip, we'll design the perfect itinerary.
            </p>
          </div>
        </div>
      </section>

      {/* Package Types */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Popular Package Types</h2>
            <p className="text-lg text-muted-foreground">Choose from our curated holiday experiences</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover-elevate" data-testid="package-romantic">
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">💕</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Romantic Getaways</h3>
                <p className="text-muted-foreground text-sm">Perfect for couples seeking intimate experiences</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover-elevate" data-testid="package-family">
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Family Vacations</h3>
                <p className="text-muted-foreground text-sm">Fun-filled trips for the whole family</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover-elevate" data-testid="package-adventure">
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">⛰️</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Adventure Tours</h3>
                <p className="text-muted-foreground text-sm">Thrilling experiences for adventure seekers</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover-elevate" data-testid="package-luxury">
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Luxury Escapes</h3>
                <p className="text-muted-foreground text-sm">Premium experiences with world-class service</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">What We Offer</h2>
            <p className="text-lg text-muted-foreground">Comprehensive holiday planning services</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="text-center h-full" data-testid={`holiday-feature-${index}`}>
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Plan Holiday</CardTitle>
              <p className="text-muted-foreground">Tell us about your dream vacation and we'll create the perfect package</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePackageSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      placeholder="Your full name"
                      value={packageData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      data-testid="input-fullname"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={packageData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      data-testid="input-email"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      placeholder="+234..."
                      value={packageData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      data-testid="input-phone"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="destination">Preferred Destination</Label>
                    <Select value={packageData.destination} onValueChange={(value) => handleInputChange("destination", value)}>
                      <SelectTrigger data-testid="select-destination">
                        <SelectValue placeholder="Where would you like to go?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Dubai">Dubai, UAE</SelectItem>
                        <SelectItem value="Paris">Paris, France</SelectItem>
                        <SelectItem value="London">London, UK</SelectItem>
                        <SelectItem value="New York">New York, USA</SelectItem>
                        <SelectItem value="Tokyo">Tokyo, Japan</SelectItem>
                        <SelectItem value="Maldives">Maldives</SelectItem>
                        <SelectItem value="Bali">Bali, Indonesia</SelectItem>
                        <SelectItem value="Egypt">Cairo, Egypt</SelectItem>
                        <SelectItem value="Other">Other Destination</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="packageType">Package Type</Label>
                    <Select value={packageData.packageType} onValueChange={(value) => handleInputChange("packageType", value)}>
                      <SelectTrigger data-testid="select-package-type">
                        <SelectValue placeholder="What type of holiday?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Romantic">Romantic Getaway</SelectItem>
                        <SelectItem value="Family">Family Vacation</SelectItem>
                        <SelectItem value="Adventure">Adventure Tour</SelectItem>
                        <SelectItem value="Luxury">Luxury Escape</SelectItem>
                        <SelectItem value="Cultural">Cultural Experience</SelectItem>
                        <SelectItem value="Beach">Beach Resort</SelectItem>
                        <SelectItem value="Business">Business + Leisure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="travelers">Number of Travelers</Label>
                    <Select value={packageData.travelers} onValueChange={(value) => handleInputChange("travelers", value)}>
                      <SelectTrigger data-testid="select-travelers">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Traveler</SelectItem>
                        <SelectItem value="2">2 Travelers</SelectItem>
                        <SelectItem value="3">3 Travelers</SelectItem>
                        <SelectItem value="4">4 Travelers</SelectItem>
                        <SelectItem value="5+">5+ Travelers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Select value={packageData.duration} onValueChange={(value) => handleInputChange("duration", value)}>
                      <SelectTrigger data-testid="select-duration">
                        <SelectValue placeholder="How long?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3-4 days">3-4 Days</SelectItem>
                        <SelectItem value="5-7 days">5-7 Days</SelectItem>
                        <SelectItem value="1-2 weeks">1-2 Weeks</SelectItem>
                        <SelectItem value="2+ weeks">2+ Weeks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Preferred Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={packageData.startDate}
                      onChange={(e) => handleInputChange("startDate", e.target.value)}
                      data-testid="input-start-date"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget Per Person (USD)</Label>
                    <Select value={packageData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                      <SelectTrigger data-testid="select-budget">
                        <SelectValue placeholder="Your budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1000">$1,000 - $2,500</SelectItem>
                        <SelectItem value="2500">$2,500 - $5,000</SelectItem>
                        <SelectItem value="5000">$5,000 - $10,000</SelectItem>
                        <SelectItem value="10000">$10,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="accommodation">Accommodation Preference</Label>
                    <Select value={packageData.accommodation} onValueChange={(value) => handleInputChange("accommodation", value)}>
                      <SelectTrigger data-testid="select-accommodation">
                        <SelectValue placeholder="Hotel preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3-star">3-Star Hotels</SelectItem>
                        <SelectItem value="4-star">4-Star Hotels</SelectItem>
                        <SelectItem value="5-star">5-Star Luxury</SelectItem>
                        <SelectItem value="resort">All-Inclusive Resorts</SelectItem>
                        <SelectItem value="boutique">Boutique Hotels</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interests">Interests & Activities</Label>
                  <Textarea
                    id="interests"
                    placeholder="What activities or experiences interest you? (e.g., museums, nightlife, shopping, adventure sports, local cuisine)"
                    value={packageData.interests}
                    onChange={(e) => handleInputChange("interests", e.target.value)}
                    data-testid="textarea-interests"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialRequests">Special Requests</Label>
                  <Textarea
                    id="specialRequests"
                    placeholder="Any special requirements, dietary restrictions, accessibility needs, or celebration occasions?"
                    value={packageData.specialRequests}
                    onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                    data-testid="textarea-special-requests"
                    rows={3}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" data-testid="button-plan-holiday">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Plan Holiday
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">Package Prices</h2>
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Badge variant="secondary" className="mb-4">Customized Pricing</Badge>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Based on Your Preferences</h3>
                  <p className="text-muted-foreground">
                    Our holiday packages are customized based on destination, duration, accommodation, 
                    and activities. Get a detailed quote tailored to your preferences.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}