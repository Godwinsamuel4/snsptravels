import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Hotel, 
  Shield, 
  RefreshCw, 
  TrendingUp, 
  Car, 
  Percent,
  CheckCircle,
  Star
} from "lucide-react";

const features = [
  {
    icon: Hotel,
    title: "Wide selection from budget to luxury hotels",
    description: "Access to thousands of properties worldwide"
  },
  {
    icon: Shield,
    title: "Best rate guarantee and price matching",
    description: "We ensure you get the lowest available rates"
  },
  {
    icon: RefreshCw,
    title: "Free cancellation on most bookings",
    description: "Flexible cancellation policies for peace of mind"
  },
  {
    icon: TrendingUp,
    title: "Room upgrades and special amenities",
    description: "Exclusive perks and upgrades for our clients"
  },
  {
    icon: Car,
    title: "Airport transfer arrangements",
    description: "Seamless transportation from airport to hotel"
  },
  {
    icon: Percent,
    title: "Extended stay discounts",
    description: "Special rates for longer stays"
  }
];

interface HotelBookingForm {
  fullName: string;
  email: string;
  phone: string;
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  rooms: string;
  hotelType: string;
  budget: string;
}

export default function HotelServices() {
  const [bookingData, setBookingData] = useState<HotelBookingForm>({
    fullName: "",
    email: "",
    phone: "",
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    rooms: "1",
    hotelType: "Standard",
    budget: "mid-range"
  });

  const handleInputChange = (field: keyof HotelBookingForm, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
    console.log(`Updated ${field}:`, value);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Hotel booking submitted:", bookingData);
    alert("Thank you! We'll send you the best hotel options within 24 hours.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Hotel className="h-8 w-8 text-primary" />
              <Badge variant="outline">Hotel Reservations</Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Hotel Booking Service
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find and book the perfect accommodation for your stay. From budget-friendly options 
              to luxury resorts, we have partnerships with hotels worldwide to ensure you get the best rates.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">What We Offer</h2>
            <p className="text-lg text-muted-foreground">Comprehensive hotel booking services for every traveler</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="text-center h-full" data-testid={`hotel-feature-${index}`}>
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
              <CardTitle className="text-2xl">Book Hotel Now</CardTitle>
              <p className="text-muted-foreground">Tell us your preferences and we'll find the perfect accommodation</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination</Label>
                    <Input
                      id="destination"
                      placeholder="City or hotel name"
                      value={bookingData.destination}
                      onChange={(e) => handleInputChange("destination", e.target.value)}
                      data-testid="input-destination"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="hotelType">Hotel Category</Label>
                    <Select value={bookingData.hotelType} onValueChange={(value) => handleInputChange("hotelType", value)}>
                      <SelectTrigger data-testid="select-hotel-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Budget">Budget (1-2 Star)</SelectItem>
                        <SelectItem value="Standard">Standard (3 Star)</SelectItem>
                        <SelectItem value="Deluxe">Deluxe (4 Star)</SelectItem>
                        <SelectItem value="Luxury">Luxury (5 Star)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="checkIn">Check-in Date</Label>
                    <Input
                      id="checkIn"
                      type="date"
                      value={bookingData.checkIn}
                      onChange={(e) => handleInputChange("checkIn", e.target.value)}
                      data-testid="input-checkin"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="checkOut">Check-out Date</Label>
                    <Input
                      id="checkOut"
                      type="date"
                      value={bookingData.checkOut}
                      onChange={(e) => handleInputChange("checkOut", e.target.value)}
                      data-testid="input-checkout"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rooms">Rooms</Label>
                    <Select value={bookingData.rooms} onValueChange={(value) => handleInputChange("rooms", value)}>
                      <SelectTrigger data-testid="select-rooms">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Room</SelectItem>
                        <SelectItem value="2">2 Rooms</SelectItem>
                        <SelectItem value="3">3 Rooms</SelectItem>
                        <SelectItem value="4+">4+ Rooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="guests">Guests</Label>
                    <Select value={bookingData.guests} onValueChange={(value) => handleInputChange("guests", value)}>
                      <SelectTrigger data-testid="select-guests">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Guest</SelectItem>
                        <SelectItem value="2">2 Guests</SelectItem>
                        <SelectItem value="3">3 Guests</SelectItem>
                        <SelectItem value="4">4 Guests</SelectItem>
                        <SelectItem value="5+">5+ Guests</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget Range</Label>
                    <Select value={bookingData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                      <SelectTrigger data-testid="select-budget">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="budget">Budget (Under $50/night)</SelectItem>
                        <SelectItem value="mid-range">Mid-range ($50-150/night)</SelectItem>
                        <SelectItem value="luxury">Luxury ($150+/night)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      placeholder="Your full name"
                      value={bookingData.fullName}
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
                      value={bookingData.email}
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
                      value={bookingData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      data-testid="input-phone"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full" data-testid="button-book-hotel">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Book Hotel Now
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">Service Fee</h2>
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Badge variant="secondary" className="mb-4">Affordable</Badge>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Based on Hotel Category</h3>
                  <p className="text-muted-foreground">
                    Our service fees vary based on hotel category and duration of stay. 
                    We provide transparent pricing with no hidden charges.
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