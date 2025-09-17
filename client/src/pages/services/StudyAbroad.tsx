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
  GraduationCap, 
  School, 
  DollarSign, 
  FileText, 
  Home, 
  Compass,
  CheckCircle,
  BookOpen
} from "lucide-react";

const features = [
  {
    icon: School,
    title: "University selection and application guidance",
    description: "Expert advice on choosing the right institution for your goals"
  },
  {
    icon: DollarSign,
    title: "Scholarship search and application assistance",
    description: "Help finding and applying for funding opportunities"
  },
  {
    icon: FileText,
    title: "Student visa processing and documentation",
    description: "Complete support for visa requirements and applications"
  },
  {
    icon: Home,
    title: "Accommodation arrangement assistance",
    description: "Help finding suitable housing near your chosen university"
  },
  {
    icon: Compass,
    title: "Pre-departure orientation sessions",
    description: "Preparation for life and study in your destination country"
  },
  {
    icon: BookOpen,
    title: "Ongoing support throughout your studies",
    description: "Continued guidance and assistance during your academic journey"
  }
];

interface StudyAbroadForm {
  fullName: string;
  email: string;
  phone: string;
  age: string;
  currentEducation: string;
  fieldOfStudy: string;
  preferredCountry: string;
  studyLevel: string;
  startDate: string;
  englishTest: string;
  budget: string;
  scholarshipInterest: string;
  additionalInfo: string;
}

export default function StudyAbroad() {
  const [applicationData, setApplicationData] = useState<StudyAbroadForm>({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    currentEducation: "",
    fieldOfStudy: "",
    preferredCountry: "",
    studyLevel: "",
    startDate: "",
    englishTest: "",
    budget: "",
    scholarshipInterest: "",
    additionalInfo: ""
  });

  const handleInputChange = (field: keyof StudyAbroadForm, value: string) => {
    setApplicationData(prev => ({ ...prev, [field]: value }));
    console.log(`Updated ${field}:`, value);
  };

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Study abroad application submitted:", applicationData);
    alert("Thank you! Our education consultants will contact you within 24 hours to discuss your study abroad options.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <GraduationCap className="h-8 w-8 text-primary" />
              <Badge variant="outline">Transform Your Future</Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Study Abroad Programs
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transform your future with global educational opportunities. We provide comprehensive 
              support for students planning to study internationally, from application to arrival.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Banner */}
      <section className="py-8 bg-primary/5 border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Students Placed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">100+</div>
              <div className="text-sm text-muted-foreground">Universities</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">25+</div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground">Visa Success</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">What We Offer</h2>
            <p className="text-lg text-muted-foreground">Comprehensive support for your international education journey</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="text-center h-full" data-testid={`study-feature-${index}`}>
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
              <CardTitle className="text-2xl">Get Study Info</CardTitle>
              <p className="text-muted-foreground">Tell us about your academic goals and we'll guide you to the perfect program</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleApplicationSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
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
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Your age"
                      value={applicationData.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      data-testid="input-age"
                      required
                    />
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
                    <Label htmlFor="currentEducation">Current Education Level</Label>
                    <Select value={applicationData.currentEducation} onValueChange={(value) => handleInputChange("currentEducation", value)}>
                      <SelectTrigger data-testid="select-current-education">
                        <SelectValue placeholder="Select your current level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High School">High School/Secondary School</SelectItem>
                        <SelectItem value="Diploma">Diploma/Certificate</SelectItem>
                        <SelectItem value="Bachelors">Bachelor's Degree</SelectItem>
                        <SelectItem value="Masters">Master's Degree</SelectItem>
                        <SelectItem value="PhD">PhD/Doctorate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="studyLevel">Desired Study Level</Label>
                    <Select value={applicationData.studyLevel} onValueChange={(value) => handleInputChange("studyLevel", value)}>
                      <SelectTrigger data-testid="select-study-level">
                        <SelectValue placeholder="What do you want to study?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Foundation">Foundation/Pre-university</SelectItem>
                        <SelectItem value="Bachelors">Bachelor's Degree</SelectItem>
                        <SelectItem value="Masters">Master's Degree</SelectItem>
                        <SelectItem value="PhD">PhD/Doctorate</SelectItem>
                        <SelectItem value="Language">Language Course</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fieldOfStudy">Field of Study</Label>
                    <Select value={applicationData.fieldOfStudy} onValueChange={(value) => handleInputChange("fieldOfStudy", value)}>
                      <SelectTrigger data-testid="select-field-study">
                        <SelectValue placeholder="Choose your field" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Engineering">Engineering & Technology</SelectItem>
                        <SelectItem value="Business">Business & Management</SelectItem>
                        <SelectItem value="Medicine">Medicine & Health Sciences</SelectItem>
                        <SelectItem value="Arts">Arts & Humanities</SelectItem>
                        <SelectItem value="Science">Natural Sciences</SelectItem>
                        <SelectItem value="Computing">Computer Science & IT</SelectItem>
                        <SelectItem value="Law">Law & Legal Studies</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="preferredCountry">Preferred Country</Label>
                    <Select value={applicationData.preferredCountry} onValueChange={(value) => handleInputChange("preferredCountry", value)}>
                      <SelectTrigger data-testid="select-country">
                        <SelectValue placeholder="Where do you want to study?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USA">United States</SelectItem>
                        <SelectItem value="UK">United Kingdom</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="Australia">Australia</SelectItem>
                        <SelectItem value="Germany">Germany</SelectItem>
                        <SelectItem value="France">France</SelectItem>
                        <SelectItem value="Netherlands">Netherlands</SelectItem>
                        <SelectItem value="Other">Other/Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Preferred Start Date</Label>
                    <Select value={applicationData.startDate} onValueChange={(value) => handleInputChange("startDate", value)}>
                      <SelectTrigger data-testid="select-start-date">
                        <SelectValue placeholder="When do you want to start?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Fall 2025">Fall 2025</SelectItem>
                        <SelectItem value="Spring 2026">Spring 2026</SelectItem>
                        <SelectItem value="Fall 2026">Fall 2026</SelectItem>
                        <SelectItem value="Flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="englishTest">English Proficiency Test</Label>
                    <Select value={applicationData.englishTest} onValueChange={(value) => handleInputChange("englishTest", value)}>
                      <SelectTrigger data-testid="select-english-test">
                        <SelectValue placeholder="Have you taken any tests?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IELTS">IELTS Taken</SelectItem>
                        <SelectItem value="TOEFL">TOEFL Taken</SelectItem>
                        <SelectItem value="PTE">PTE Taken</SelectItem>
                        <SelectItem value="Planning">Planning to take</SelectItem>
                        <SelectItem value="None">Not taken yet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Annual Budget (USD)</Label>
                    <Select value={applicationData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                      <SelectTrigger data-testid="select-budget">
                        <SelectValue placeholder="Your budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10000">$10,000 - $20,000</SelectItem>
                        <SelectItem value="20000">$20,000 - $30,000</SelectItem>
                        <SelectItem value="30000">$30,000 - $50,000</SelectItem>
                        <SelectItem value="50000">$50,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="scholarshipInterest">Scholarship Interest</Label>
                    <Select value={applicationData.scholarshipInterest} onValueChange={(value) => handleInputChange("scholarshipInterest", value)}>
                      <SelectTrigger data-testid="select-scholarship">
                        <SelectValue placeholder="Need scholarship assistance?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes, I need scholarships</SelectItem>
                        <SelectItem value="Maybe">Maybe, show me options</SelectItem>
                        <SelectItem value="No">No, I can self-fund</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Additional Information</Label>
                  <Textarea
                    id="additionalInfo"
                    placeholder="Tell us about your academic goals, career aspirations, or any specific requirements"
                    value={applicationData.additionalInfo}
                    onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                    data-testid="textarea-additional-info"
                    rows={4}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" data-testid="button-get-study-info">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Get Study Info
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
                  <Badge variant="secondary" className="mb-4">Comprehensive Package</Badge>
                  <h3 className="text-xl font-semibold text-foreground mb-2">All-Inclusive Service</h3>
                  <p className="text-muted-foreground">
                    Our comprehensive package includes all services from university selection 
                    to visa processing. Get a detailed quote during consultation.
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