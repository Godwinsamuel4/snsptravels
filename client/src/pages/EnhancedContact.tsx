import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Send,
  MessageCircle,
  PhoneCall,
  HelpCircle,
  Plane,
  FileText,
  Hotel,
  GraduationCap
} from "lucide-react";

interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const serviceOptions = [
  { icon: Plane, title: "Flight Bookings", description: "Need help with flight reservations, cancellations, or changes?" },
  { icon: FileText, title: "Visa Applications", description: "Expert assistance with visa applications and documentation." },
  { icon: Hotel, title: "Hotel Reservations", description: "Find and book the perfect accommodation for your trip." },
  { icon: GraduationCap, title: "Study Abroad", description: "Complete guidance for studying abroad applications." }
];

const faqs = [
  {
    question: "What are your office hours?",
    answer: "Our office is open Monday through Friday from 9:00 AM to 5:00 PM. We're also available by appointment on Saturdays. For urgent matters outside office hours, you can reach us via WhatsApp or email."
  },
  {
    question: "How can I track my visa application?",
    answer: "Once we submit your visa application, we'll provide you with a tracking reference number. You can contact us anytime for updates, and we'll proactively inform you of any progress or additional requirements from the embassy."
  },
  {
    question: "Do you offer emergency travel assistance?",
    answer: "Yes! We provide 24/7 emergency assistance for our clients who are traveling. You can reach our emergency hotline for urgent flight changes, lost documents, or any travel emergencies."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept bank transfers, card payments, and cash payments at our office. For online transactions, we use secure payment gateways. Payment plans are available for larger travel packages."
  }
];

export default function EnhancedContact() {
  const [formData, setFormData] = useState<ContactForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    console.log(`Updated ${field}:`, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    alert("Thank you for your message! We'll get back to you within 24 hours.");
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };

  const handleServiceClick = (service: string) => {
    console.log(`${service} service clicked`);
    alert(`You'll be connected with our ${service} specialist. Feature coming soon!`);
  };

  const handleQuickContact = (method: string) => {
    console.log(`${method} contact clicked`);
    if (method === "WhatsApp") {
      alert("WhatsApp integration coming soon!");
    } else if (method === "Call") {
      alert("Calling +234 703 261 5370");
    } else {
      alert("Email client opening...");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Contact SN.SP Limited
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get in touch with our travel experts for personalized assistance
          </p>
        </div>
      </section>

      {/* Office Information */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="text-center">
              <CardContent className="pt-6">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Our Office</h3>
                <p className="text-sm text-muted-foreground">
                  Suite 15, Damin Plaza<br />
                  Ring Road, Ibadan<br />
                  Oyo State, Nigeria
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Phone Numbers</h3>
                <p className="text-sm text-muted-foreground">
                  +234 703 261 5370<br />
                  +234 901 593 2925
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Email Address</h3>
                <p className="text-sm text-muted-foreground">
                  info@snsp.com.ng<br />
                  support@snsp.com.ng
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Clock className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Business Hours</h3>
                <p className="text-sm text-muted-foreground">
                  Monday - Friday<br />
                  9:00 AM - 5:00 PM<br />
                  Saturday: By Appointment
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Contact Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">General Inquiry</CardTitle>
                <p className="text-muted-foreground">Send us a message and we'll respond within 24 hours</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        data-testid="input-first-name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        data-testid="input-last-name"
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
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        data-testid="input-contact-email"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="+234 XXX XXX XXXX"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        data-testid="input-contact-phone"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                      <SelectTrigger data-testid="select-contact-subject">
                        <SelectValue placeholder="Select Subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="booking">Booking Assistance</SelectItem>
                        <SelectItem value="visa">Visa Application</SelectItem>
                        <SelectItem value="complaint">Complaint</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help you..."
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      rows={5}
                      data-testid="textarea-contact-message"
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" data-testid="button-send-message">
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Quick Contact Options */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Contact Options</CardTitle>
                  <p className="text-muted-foreground">Get immediate assistance through our preferred channels</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start h-auto p-4"
                    onClick={() => handleQuickContact("WhatsApp")}
                    data-testid="button-whatsapp"
                  >
                    <MessageCircle className="mr-3 h-5 w-5 text-green-600" />
                    <div className="text-left">
                      <div className="font-medium">WhatsApp</div>
                      <div className="text-sm text-muted-foreground">Chat with us instantly</div>
                    </div>
                  </Button>

                  <Button 
                    variant="outline" 
                    className="w-full justify-start h-auto p-4"
                    onClick={() => handleQuickContact("Call")}
                    data-testid="button-call-now"
                  >
                    <PhoneCall className="mr-3 h-5 w-5 text-blue-600" />
                    <div className="text-left">
                      <div className="font-medium">Call Now</div>
                      <div className="text-sm text-muted-foreground">Speak with our experts</div>
                    </div>
                  </Button>

                  <Button 
                    variant="outline" 
                    className="w-full justify-start h-auto p-4"
                    onClick={() => handleQuickContact("Email")}
                    data-testid="button-email-us"
                  >
                    <Mail className="mr-3 h-5 w-5 text-purple-600" />
                    <div className="text-left">
                      <div className="font-medium">Email Us</div>
                      <div className="text-sm text-muted-foreground">Send detailed inquiry</div>
                    </div>
                  </Button>
                </CardContent>
              </Card>

              {/* Office Hours */}
              <Card>
                <CardHeader>
                  <CardTitle>Office Hours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="font-medium">By Appointment</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Service-Specific Assistance */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Service-Specific Assistance</h2>
            <p className="text-lg text-muted-foreground">Get specialized help for your travel needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceOptions.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="text-center hover-elevate cursor-pointer" data-testid={`service-${index}`}>
                  <CardContent className="pt-6">
                    <IconComponent className="h-8 w-8 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleServiceClick(service.title)}
                      data-testid={`button-${service.title.toLowerCase().replace(" ", "-")}`}
                    >
                      Get Help
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Location & Directions */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Find Our Office</h2>
              <Card>
                <CardHeader>
                  <CardTitle>SN.SP Limited Office</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Address</h4>
                    <p className="text-muted-foreground">Suite 15, Damin Plaza, Ring Road, Ibadan</p>
                    <p className="text-muted-foreground">Oyo State, Nigeria</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Directions</h4>
                    <p className="text-muted-foreground text-sm">
                      Located opposite Grandex Mall on Ring Road, our office is easily accessible 
                      by public transportation and private vehicles. Parking is available on-site.
                    </p>
                  </div>
                  <Button variant="outline" data-testid="button-get-directions">
                    <MapPin className="mr-2 h-4 w-4" />
                    Get Directions
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="h-64 lg:h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
                <p className="text-muted-foreground">Interactive Map Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">Quick answers to common questions</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} data-testid={`faq-${index}`}>
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    {faq.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground pl-8">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer />
    </div>
  );
}