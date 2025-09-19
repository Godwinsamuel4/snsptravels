
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, Calendar, Users, MapPin } from "lucide-react";
import { useEffect } from "react";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  from: string;
  to: string;
  departureDate: string;
  returnDate: string;
  passengers: string;
  class: string;
  specialRequests: string;
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
const defaultAirports: Airport[] = [];

interface AirportSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  icon: React.ReactNode;
  testId: string;
}

function AirportSearchInput({ value, onChange, placeholder, label, icon, testId }: AirportSearchInputProps) {
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

  // Sync searchTerm with value prop for proper display
  useEffect(() => {
    if (value && airports.length > 0) {
      const selectedAirport = airports.find(airport => airport.IATA === value);
      if (selectedAirport) {
        const displayValue = `${selectedAirport.IATA} - ${selectedAirport["Airport name"]}, ${selectedAirport.City}, ${selectedAirport.Country}`;
        setSearchTerm(displayValue);
      }
    } else if (!value) {
      setSearchTerm("");
    }
  }, [value, airports]);

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
      <Label htmlFor={testId} className="flex items-center gap-2">
        {icon}
        {label}
      </Label>
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

export default function FlightBookingForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
    passengers: "1",
    class: "Economy",
    specialRequests: "",
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    console.log(`Updated ${field}:`, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/flight-booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Thank you for your booking request! We've received your details and will contact you within 24 hours with personalized flight options. You'll also receive a confirmation email shortly.");
        
        // Reset form
        const resetFormData = {
          fullName: "",
          email: "",
          phone: "",
          from: "",
          to: "",
          departureDate: "",
          returnDate: "",
          passengers: "1",
          class: "Economy",
          specialRequests: "",
        };
        setFormData(resetFormData);
      } else {
        throw new Error('Failed to submit booking request');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert("Sorry, there was an error submitting your request. Please try again or contact us directly.");
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center gap-2 text-xl">
          <Plane className="h-5 w-5 text-primary" />
          Book Your Flight
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Fill out your details and we'll get back to you within 24 hours
        </p>
      </CardHeader>

      <CardContent className="pt-2">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
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
                value={formData.email}
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
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                data-testid="input-phone"
                required
              />
            </div>
          </div>

          {/* Airport Search Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AirportSearchInput
              value={formData.from}
              onChange={(value) => handleInputChange("from", value)}
              placeholder="Search departure airport..."
              label="From"
              icon={<Plane className="h-4 w-4" />}
              testId="input-from"
            />

            <AirportSearchInput
              value={formData.to}
              onChange={(value) => handleInputChange("to", value)}
              placeholder="Search destination airport..."
              label="To"
              icon={<Plane className="h-4 w-4" />}
              testId="input-to"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="departureDate" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Departure Date
              </Label>
              <Input
                id="departureDate"
                type="date"
                value={formData.departureDate}
                onChange={(e) => handleInputChange("departureDate", e.target.value)}
                data-testid="input-departure-date"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="returnDate" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Return Date
              </Label>
              <Input
                id="returnDate"
                type="date"
                value={formData.returnDate}
                onChange={(e) => handleInputChange("returnDate", e.target.value)}
                data-testid="input-return-date"
              />
            </div>
          </div>

          {/* Passengers and Class */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="passengers" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Passengers
              </Label>
              <Select value={formData.passengers} onValueChange={(value) => handleInputChange("passengers", value)}>
                <SelectTrigger data-testid="select-passengers">
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

            <div className="space-y-2">
              <Label htmlFor="class">Class</Label>
              <Select value={formData.class} onValueChange={(value) => handleInputChange("class", value)}>
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
          </div>

          {/* Special Requests */}
          <div className="space-y-2">
            <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
            <Textarea
              id="specialRequests"
              placeholder="Dietary requirements, accessibility needs, etc."
              value={formData.specialRequests}
              onChange={(e) => handleInputChange("specialRequests", e.target.value)}
              data-testid="textarea-special-requests"
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" size="lg" className="w-full" data-testid="button-search-flights">
            Search Flights
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            We'll contact you within 24 hours with personalized flight options
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
