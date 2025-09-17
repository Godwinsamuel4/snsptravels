import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Plane, 
  Clock, 
  Shield, 
  Users, 
  Calendar, 
  CreditCard, 
  CheckCircle,
  ArrowRight,
  MapPin 
} from "lucide-react";
// Temporarily disable CSV import to fix syntax error
// import airportsData from "@assets/airports_1758095295993.csv";

const features = [
  {
    icon: Plane,
    title: "Domestic and international flight bookings",
    description: "Access to all major airlines worldwide"
  },
  {
    icon: Shield,
    title: "Best price guarantee and fare comparison",
    description: "We ensure you get the most competitive rates"
  },
  {
    icon: Calendar,
    title: "Flexible booking options and date changes",
    description: "Easy modifications when plans change"
  },
  {
    icon: Users,
    title: "Group bookings with special discounts",
    description: "Special rates for corporate and family groups"
  },
  {
    icon: Clock,
    title: "24/7 support for flight emergencies",
    description: "Round-the-clock assistance when you need it"
  },
  {
    icon: CreditCard,
    title: "Seat selection and meal preferences",
    description: "Personalize your flying experience"
  }
];

interface BookingForm {
  fullName: string;
  email: string;
  phone: string;
  from: string;
  to: string;
  departureDate: string;
  returnDate: string;
  passengers: string;
  travelClass: string;
  tripType: string;
}

interface Airport {
  IATA: string;
  ICAO: string;
  "Airport name": string;
  Country: string;
  City: string;
}

// Parse CSV data into airport objects
const parseAirportsCSV = (csvText: string): Airport[] => {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',').map(h => h.replace(/"/g, ''));
  
  return lines.slice(1).map(line => {
    if (!line.trim()) return null;
    
    const values: string[] = [];
    let inQuotes = false;
    let currentValue = '';
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(currentValue);
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    values.push(currentValue);
    
    const airport: any = {};
    headers.forEach((header, index) => {
      airport[header] = values[index] || '';
    });
    
    return airport as Airport;
  }).filter(Boolean) as Airport[];
};

// Default airports will be loaded dynamically
const defaultAirports: any[] = [];

interface AirportSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  testId: string;
}

function AirportSearchInput({ value, onChange, placeholder, label, testId }: AirportSearchInputProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredAirports, setFilteredAirports] = useState<Airport[]>([]);
  const [airports, setAirports] = useState<Airport[]>(defaultAirports);

  // Load airports data on component mount
  useEffect(() => {
    const loadAirports = async () => {
      try {
        const response = await fetch('/attached_assets/airports_1758095295993.csv');
        const csvText = await response.text();
        const parsedAirports = parseAirportsCSV(csvText);
        setAirports(parsedAirports);
      } catch (error) {
        console.error('Failed to load airports data:', error);
        // Keep using empty array as fallback
      }
    };
    loadAirports();
  }, []);

  const handleInputChange = (inputValue: string) => {
    setSearchTerm(inputValue);
    
    if (inputValue.length === 0) {
      // Show all airports when input is empty
      setFilteredAirports(airports.slice(0, 10));
      setShowSuggestions(true);
    } else {
      // Filter airports based on input
      const filtered = airports.filter(airport => 
        airport.IATA.toLowerCase().includes(inputValue.toLowerCase()) ||
        airport["Airport name"].toLowerCase().includes(inputValue.toLowerCase()) ||
        airport.City.toLowerCase().includes(inputValue.toLowerCase()) ||
        airport.Country.toLowerCase().includes(inputValue.toLowerCase())
      ).slice(0, 10); // Limit to 10 suggestions
      
      setFilteredAirports(filtered);
      setShowSuggestions(true);
    }
  };

  const handleSuggestionSelect = (airport: Airport) => {
    const displayValue = `${airport.IATA} - ${airport["Airport name"]}, ${airport.City}, ${airport.Country}`;
    setSearchTerm(displayValue);
    onChange(airport.IATA);
    setShowSuggestions(false);
  };

  const handleInputFocus = () => {
    // Always show suggestions on focus
    if (searchTerm.length === 0) {
      setFilteredAirports(airports.slice(0, 10));
    } else {
      const filtered = airports.filter(airport => 
        airport.IATA.toLowerCase().includes(searchTerm.toLowerCase()) ||
        airport["Airport name"].toLowerCase().includes(searchTerm.toLowerCase()) ||
        airport.City.toLowerCase().includes(searchTerm.toLowerCase()) ||
        airport.Country.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 10);
      setFilteredAirports(filtered);
    }
    setShowSuggestions(true);
  };

  const handleInputBlur = (e: React.FocusEvent) => {
    // Check if the blur is because we're clicking on a suggestion
    if (e.relatedTarget && e.relatedTarget.closest('.suggestions-dropdown')) {
      return; // Don't hide suggestions if clicking on dropdown
    }
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => setShowSuggestions(false), 300);
  };

  return (
    <div className="space-y-2 relative">
      <Label htmlFor={testId}>{label}</Label>
      <Input
        id={testId}
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        data-testid={testId}
        required
        autoComplete="off"
      />
      
      {showSuggestions && filteredAirports.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto mt-1 suggestions-dropdown">
          {filteredAirports.map((airport, index) => (
            <div
              key={`${airport.IATA}-${index}`}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
              onMouseDown={(e) => e.preventDefault()} // Prevent blur from firing
              onClick={() => handleSuggestionSelect(airport)}
            >
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-primary">{airport.IATA}</span>
                    <span className="text-sm text-gray-500">({airport.ICAO})</span>
                  </div>
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {airport["Airport name"]}
                  </div>
                  <div className="text-xs text-gray-500">
                    {airport.City}, {airport.Country}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function FlightServices() {
  const [bookingData, setBookingData] = useState<BookingForm>({
    fullName: "",
    email: "",
    phone: "",
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
    passengers: "1",
    travelClass: "Economy",
    tripType: "roundtrip"
  });

  const handleInputChange = (field: keyof BookingForm, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
    console.log(`Updated ${field}:`, value);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Flight booking submitted:", bookingData);
    alert("Thank you! We'll send you the best flight options within 24 hours.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Plane className="h-8 w-8 text-primary" />
              <Badge variant="outline">Expert Team</Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Flight Booking Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience seamless flight booking with our comprehensive airline reservation services. 
              We work with major airlines worldwide to offer you the best deals and flexible options.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">What We Offer</h2>
            <p className="text-lg text-muted-foreground">Comprehensive flight booking services tailored to your needs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="text-center h-full" data-testid={`feature-card-${index}`}>
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
              <CardTitle className="text-2xl">Book Your Flight Now</CardTitle>
              <p className="text-muted-foreground">Fill out the form below and we'll get back to you with the best options</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tripType">Trip Type</Label>
                    <Select value={bookingData.tripType} onValueChange={(value) => handleInputChange("tripType", value)}>
                      <SelectTrigger data-testid="select-trip-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="roundtrip">Round Trip</SelectItem>
                        <SelectItem value="oneway">One Way</SelectItem>
                        <SelectItem value="multicity">Multi-city</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="passengers">Passengers</Label>
                    <Select value={bookingData.passengers} onValueChange={(value) => handleInputChange("passengers", value)}>
                      <SelectTrigger data-testid="select-passengers-count">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Passenger</SelectItem>
                        <SelectItem value="2">2 Passengers</SelectItem>
                        <SelectItem value="3">3 Passengers</SelectItem>
                        <SelectItem value="4">4 Passengers</SelectItem>
                        <SelectItem value="5+">5+ Passengers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AirportSearchInput
                    value={bookingData.from}
                    onChange={(value) => handleInputChange("from", value)}
                    placeholder="Search departure airport..."
                    label="From"
                    testId="input-departure"
                  />

                  <AirportSearchInput
                    value={bookingData.to}
                    onChange={(value) => handleInputChange("to", value)}
                    placeholder="Search destination airport..."
                    label="To"
                    testId="input-destination"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="departureDate">Departure Date</Label>
                    <Input
                      id="departureDate"
                      type="date"
                      value={bookingData.departureDate}
                      onChange={(e) => handleInputChange("departureDate", e.target.value)}
                      data-testid="input-departure-date"
                      required
                    />
                  </div>
                  
                  {bookingData.tripType === "roundtrip" && (
                    <div className="space-y-2">
                      <Label htmlFor="returnDate">Return Date</Label>
                      <Input
                        id="returnDate"
                        type="date"
                        value={bookingData.returnDate}
                        onChange={(e) => handleInputChange("returnDate", e.target.value)}
                        data-testid="input-return-date"
                      />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      placeholder="Your full name"
                      value={bookingData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      data-testid="input-full-name"
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

                <div className="space-y-2">
                  <Label htmlFor="travelClass">Travel Class</Label>
                  <Select value={bookingData.travelClass} onValueChange={(value) => handleInputChange("travelClass", value)}>
                    <SelectTrigger data-testid="select-class">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Economy">Economy</SelectItem>
                      <SelectItem value="Premium Economy">Premium Economy</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="First">First Class</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" size="lg" className="w-full" data-testid="button-book-flight">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Book Flight Now
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
                  <h3 className="text-xl font-semibold text-foreground mb-2">Transparent Pricing</h3>
                  <p className="text-muted-foreground">
                    Our service fees depend on destination and booking complexity. 
                    We provide upfront pricing with no hidden charges.
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