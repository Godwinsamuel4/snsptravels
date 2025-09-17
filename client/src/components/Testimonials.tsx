import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  company: string;
  testimonial: string;
  rating: number;
  avatar: string;
  image: string;
}

// Todo: remove mock functionality - replace with real testimonials
const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Temitayo Awosanys",
    company: "GleadsMedia",
    testimonial: "SN.SP exceeded my expectations! Their team was incredibly professional and took care of every detail. My family vacation was unforgettable, and I couldn't be happier with their service.",
    rating: 5,
    avatar: "TA",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "2",
    name: "Mr Seun",
    company: "Business Traveler",
    testimonial: "I had a fantastic experience with SN.SP. They provided excellent customer service and found me the best deals for my business trip. Their attention to detail made all the difference.",
    rating: 5,
    avatar: "MS",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "3",
    name: "Mr Alonge",
    company: "Satisfied Client",
    testimonial: "I referred a friend to SN.SP, they handled his documentation perfectly and my friend got his UK visitors visa. A genuine brand that knows visa requirements so well.",
    rating: 5,
    avatar: "MA",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    console.log("Next testimonial clicked");
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    console.log("Previous testimonial clicked");
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Trusted by hundreds of satisfied travelers
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="relative overflow-hidden shadow-lg">
            <CardContent className="p-6 md:p-8">
              {/* Quote Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Quote className="h-5 w-5 text-primary" />
                </div>
              </div>

              {/* Author Image */}
              <div className="flex justify-center mb-6">
                <Avatar className="w-20 h-20 border-4 border-primary/20">
                  <AvatarImage 
                    src={currentTestimonial.image} 
                    alt={currentTestimonial.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-primary text-white text-lg font-semibold">
                    {currentTestimonial.avatar}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-base md:text-lg text-center text-foreground mb-6 leading-relaxed max-w-2xl mx-auto">
                "{currentTestimonial.testimonial}"
              </blockquote>

              {/* Rating */}
              <div className="flex justify-center mb-4">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Author Info */}
              <div className="text-center">
                <h4 className="text-lg font-semibold text-foreground" data-testid={`text-testimonial-name-${currentTestimonial.id}`}>
                  {currentTestimonial.name}
                </h4>
                <p className="text-sm text-muted-foreground">{currentTestimonial.company}</p>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              disabled={testimonials.length <= 1}
              data-testid="button-testimonial-prev"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    console.log(`Testimonial dot ${index} clicked`);
                  }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-muted"
                  }`}
                  data-testid={`button-testimonial-dot-${index}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              disabled={testimonials.length <= 1}
              data-testid="button-testimonial-next"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}