import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Shield, 
  AlertTriangle, 
  Globe, 
  CreditCard, 
  Phone, 
  Info,
  CheckCircle,
  Clock
} from "lucide-react";

const advisoryFeatures = [
  {
    icon: AlertTriangle,
    title: "Real-time travel alerts and updates",
    description: "Latest information on travel restrictions and safety conditions"
  },
  {
    icon: Shield,
    title: "Health and vaccination requirements",
    description: "Up-to-date medical requirements and health advisories"
  },
  {
    icon: Info,
    title: "Safety and security briefings",
    description: "Current security situation and safety recommendations"
  },
  {
    icon: Globe,
    title: "Cultural and etiquette guidance",
    description: "Important cultural information and local customs"
  },
  {
    icon: CreditCard,
    title: "Currency and payment information",
    description: "Local currency, exchange rates, and payment methods"
  },
  {
    icon: Phone,
    title: "Emergency contact information",
    description: "Essential contacts for emergencies and assistance"
  }
];

interface AdvisoryRequest {
  destination: string;
  travelDate: string;
  duration: string;
  email: string;
  travelPurpose: string;
}

// Todo: remove mock functionality - replace with real travel advisory data
const travelAlerts = [
  {
    country: "United Kingdom",
    level: "Low Risk",
    alert: "Standard travel precautions advised",
    color: "text-green-600",
    icon: CheckCircle
  },
  {
    country: "United States",
    level: "Moderate Risk",
    alert: "Enhanced security measures at airports",
    color: "text-yellow-600",
    icon: AlertTriangle
  },
  {
    country: "France",
    level: "Low Risk",
    alert: "Normal travel conditions",
    color: "text-green-600",
    icon: CheckCircle
  }
];

export default function TravelAdvisory() {
  const [advisoryData, setAdvisoryData] = useState<AdvisoryRequest>({
    destination: "",
    travelDate: "",
    duration: "",
    email: "",
    travelPurpose: ""
  });

  const handleInputChange = (field: keyof AdvisoryRequest, value: string) => {
    setAdvisoryData(prev => ({ ...prev, [field]: value }));
    console.log(`Updated ${field}:`, value);
  };

  const handleAdvisorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Travel advisory request submitted:", advisoryData);
    alert("Thank you! We'll send you a comprehensive travel advisory report within 24 hours.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="h-8 w-8 text-primary" />
              <Badge variant="outline">Stay Informed</Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Travel Advisory Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay informed with the latest travel updates, safety information, and destination insights. 
              Our travel advisory services keep you updated on travel restrictions, health requirements, 
              and safety guidelines.
            </p>
          </div>
        </div>
      </section>

      {/* Current Travel Alerts */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Current Travel Alerts</h2>
            <p className="text-lg text-muted-foreground">Latest updates for popular destinations</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {travelAlerts.map((alert, index) => {
              const IconComponent = alert.icon;
              return (
                <Alert key={index} className="border-l-4 border-l-primary" data-testid={`alert-${index}`}>
                  <IconComponent className={`h-4 w-4 ${alert.color}`} />
                  <AlertTitle className="flex items-center gap-2">
                    {alert.country}
                    <Badge variant={alert.level === "Low Risk" ? "secondary" : "destructive"} className="text-xs">
                      {alert.level}
                    </Badge>
                  </AlertTitle>
                  <AlertDescription className="mt-2">
                    {alert.alert}
                  </AlertDescription>
                  <div className="mt-3">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Updated today
                    </p>
                  </div>
                </Alert>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">What We Provide</h2>
            <p className="text-lg text-muted-foreground">Comprehensive travel information and advisory services</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advisoryFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="text-center h-full" data-testid={`advisory-feature-${index}`}>
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

      {/* Advisory Request Form */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Get Advisory</CardTitle>
              <p className="text-muted-foreground">Request customized travel advisory for your destination</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdvisorySubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination Country</Label>
                    <Select value={advisoryData.destination} onValueChange={(value) => handleInputChange("destination", value)}>
                      <SelectTrigger data-testid="select-destination">
                        <SelectValue placeholder="Select destination" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USA">United States</SelectItem>
                        <SelectItem value="UK">United Kingdom</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="Germany">Germany</SelectItem>
                        <SelectItem value="France">France</SelectItem>
                        <SelectItem value="Dubai">Dubai (UAE)</SelectItem>
                        <SelectItem value="Japan">Japan</SelectItem>
                        <SelectItem value="Australia">Australia</SelectItem>
                        <SelectItem value="Other">Other Country</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="travelPurpose">Purpose of Travel</Label>
                    <Select value={advisoryData.travelPurpose} onValueChange={(value) => handleInputChange("travelPurpose", value)}>
                      <SelectTrigger data-testid="select-purpose">
                        <SelectValue placeholder="Select purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tourism">Tourism/Leisure</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                        <SelectItem value="Study">Study/Education</SelectItem>
                        <SelectItem value="Medical">Medical Treatment</SelectItem>
                        <SelectItem value="Family">Family Visit</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="travelDate">Travel Date</Label>
                    <Input
                      id="travelDate"
                      type="date"
                      value={advisoryData.travelDate}
                      onChange={(e) => handleInputChange("travelDate", e.target.value)}
                      data-testid="input-travel-date"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration of Stay</Label>
                    <Select value={advisoryData.duration} onValueChange={(value) => handleInputChange("duration", value)}>
                      <SelectTrigger data-testid="select-duration">
                        <SelectValue placeholder="How long?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-7 days">1-7 days</SelectItem>
                        <SelectItem value="1-2 weeks">1-2 weeks</SelectItem>
                        <SelectItem value="3-4 weeks">3-4 weeks</SelectItem>
                        <SelectItem value="1-3 months">1-3 months</SelectItem>
                        <SelectItem value="3+ months">3+ months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={advisoryData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    data-testid="input-email"
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" data-testid="button-get-advisory">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Get Advisory
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Information Categories */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Advisory Categories</h2>
            <p className="text-lg text-muted-foreground">Comprehensive information coverage</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center" data-testid="category-security">
              <CardContent className="pt-6">
                <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Security</h3>
                <p className="text-sm text-muted-foreground">Current security levels and safety recommendations</p>
              </CardContent>
            </Card>
            
            <Card className="text-center" data-testid="category-health">
              <CardContent className="pt-6">
                <div className="text-primary text-2xl mx-auto mb-3">🏥</div>
                <h3 className="font-semibold text-foreground mb-2">Health</h3>
                <p className="text-sm text-muted-foreground">Vaccination requirements and health advisories</p>
              </CardContent>
            </Card>
            
            <Card className="text-center" data-testid="category-entry">
              <CardContent className="pt-6">
                <div className="text-primary text-2xl mx-auto mb-3">🛂</div>
                <h3 className="font-semibold text-foreground mb-2">Entry Requirements</h3>
                <p className="text-sm text-muted-foreground">Visa requirements and entry restrictions</p>
              </CardContent>
            </Card>
            
            <Card className="text-center" data-testid="category-local">
              <CardContent className="pt-6">
                <Globe className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Local Info</h3>
                <p className="text-sm text-muted-foreground">Cultural customs and practical information</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Notice */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <Badge variant="outline" className="mb-4">Complimentary Service</Badge>
              <h2 className="text-2xl font-bold text-foreground mb-4">Free for All Clients</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Travel advisory services are provided complimentary for all our clients. 
                Stay informed and travel safely with our expert guidance.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}