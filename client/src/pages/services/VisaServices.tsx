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
  FileText, 
  CheckSquare, 
  Calendar, 
  MessageCircle, 
  Search, 
  Clock,
  CheckCircle,
  Award
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Complete document preparation and review",
    description: "We ensure all documents meet embassy requirements"
  },
  {
    icon: CheckSquare,
    title: "Application form completion assistance",
    description: "Expert help with filling out complex visa forms"
  },
  {
    icon: Calendar,
    title: "Embassy appointment scheduling",
    description: "We handle appointment booking at embassies"
  },
  {
    icon: MessageCircle,
    title: "Interview preparation and coaching",
    description: "Practice sessions and tips for visa interviews"
  },
  {
    icon: Search,
    title: "Follow-up and status tracking",
    description: "Regular updates on your application progress"
  },
  {
    icon: Clock,
    title: "Urgent/express processing options",
    description: "Fast-track services for urgent travel needs"
  }
];

interface VisaApplicationForm {
  fullName: string;
  email: string;
  phone: string;
  nationality: string;
  destination: string;
  visaType: string;
  travelDate: string;
  duration: string;
  purpose: string;
  previousVisa: string;
  additionalInfo: string;
}

export default function VisaServices() {
  const [applicationData, setApplicationData] = useState<VisaApplicationForm>({
    fullName: "",
    email: "",
    phone: "",
    nationality: "",
    destination: "",
    visaType: "",
    travelDate: "",
    duration: "",
    purpose: "",
    previousVisa: "",
    additionalInfo: ""
  });

  const handleInputChange = (field: keyof VisaApplicationForm, value: string) => {
    setApplicationData(prev => ({ ...prev, [field]: value }));
    console.log(`Updated ${field}:`, value);
  };

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Visa application submitted:", applicationData);
    alert("Thank you! Our visa experts will contact you within 24 hours to begin the application process.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <FileText className="h-8 w-8 text-primary" />
              <Badge variant="outline">High Success Rate</Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Visa Application Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Navigate the complex world of visa applications with our expert assistance. 
              We have a high success rate and deep knowledge of requirements for different countries.
            </p>
          </div>
        </div>
      </section>

      {/* Success Rate Banner */}
      <section className="py-8 bg-primary/5 border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">What We Offer</h2>
            <p className="text-lg text-muted-foreground">Comprehensive visa application support services</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="text-center h-full" data-testid={`visa-feature-${index}`}>
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

      {/* Application Form Section */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Start Visa Process</CardTitle>
              <p className="text-muted-foreground">Fill out this form and our experts will guide you through the entire process</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleApplicationSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name (as in passport)</Label>
                    <Input
                      id="fullName"
                      placeholder="Your full name"
                      value={applicationData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      data-testid="input-fullname"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="nationality">Nationality</Label>
                    <Select value={applicationData.nationality} onValueChange={(value) => handleInputChange("nationality", value)}>
                      <SelectTrigger data-testid="select-nationality">
                        <SelectValue placeholder="Select nationality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Nigerian">Nigerian</SelectItem>
                        <SelectItem value="Ghanaian">Ghanaian</SelectItem>
                        <SelectItem value="Kenyan">Kenyan</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={applicationData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      data-testid="input-email"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+234..."
                      value={applicationData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      data-testid="input-phone"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination Country</Label>
                    <Select value={applicationData.destination} onValueChange={(value) => handleInputChange("destination", value)}>
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
                        <SelectItem value="Other">Other Country</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="visaType">Visa Type</Label>
                    <Select value={applicationData.visaType} onValueChange={(value) => handleInputChange("visaType", value)}>
                      <SelectTrigger data-testid="select-visa-type">
                        <SelectValue placeholder="Select visa type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tourist">Tourist/Visitor</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                        <SelectItem value="Student">Student</SelectItem>
                        <SelectItem value="Work">Work/Employment</SelectItem>
                        <SelectItem value="Transit">Transit</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="travelDate">Intended Travel Date</Label>
                    <Input
                      id="travelDate"
                      type="date"
                      value={applicationData.travelDate}
                      onChange={(e) => handleInputChange("travelDate", e.target.value)}
                      data-testid="input-travel-date"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration of Stay</Label>
                    <Select value={applicationData.duration} onValueChange={(value) => handleInputChange("duration", value)}>
                      <SelectTrigger data-testid="select-duration">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2 weeks">1-2 weeks</SelectItem>
                        <SelectItem value="1 month">1 month</SelectItem>
                        <SelectItem value="3 months">3 months</SelectItem>
                        <SelectItem value="6 months">6 months</SelectItem>
                        <SelectItem value="1 year+">1 year or more</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="purpose">Purpose of Travel</Label>
                    <Textarea
                      id="purpose"
                      placeholder="Brief description of your travel purpose"
                      value={applicationData.purpose}
                      onChange={(e) => handleInputChange("purpose", e.target.value)}
                      data-testid="textarea-purpose"
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="previousVisa">Previous Visa History</Label>
                    <Select value={applicationData.previousVisa} onValueChange={(value) => handleInputChange("previousVisa", value)}>
                      <SelectTrigger data-testid="select-previous-visa">
                        <SelectValue placeholder="Have you applied before?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="No">First time applicant</SelectItem>
                        <SelectItem value="Yes-Approved">Previous visa approved</SelectItem>
                        <SelectItem value="Yes-Denied">Previous visa denied</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Additional Information</Label>
                  <Textarea
                    id="additionalInfo"
                    placeholder="Any other relevant information about your application"
                    value={applicationData.additionalInfo}
                    onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                    data-testid="textarea-additional-info"
                    rows={3}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" data-testid="button-start-visa-process">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Start Visa Process
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
                  <h3 className="text-xl font-semibold text-foreground mb-2">Varies by Country and Visa Type</h3>
                  <p className="text-muted-foreground">
                    Our service fees depend on the destination country and type of visa. 
                    We provide transparent pricing with no hidden charges after consultation.
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