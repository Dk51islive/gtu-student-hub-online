
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CornerUpLeft, Calendar, MapPin, Clock, Users, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const RegisterEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreed, setAgreed] = useState(false);
  
  // Mock event data (in a real app, this would be fetched from backend)
  const event = {
    id,
    title: "Tech Fest 2023",
    date: "May 15, 2023",
    time: "10:00 AM - 5:00 PM",
    location: "GTU Main Campus, Auditorium",
    description: "Annual technology festival showcasing student projects, workshops, and competitions.",
    category: "Festival",
    attendees: 120,
    maxAttendees: 200,
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    organizer: "GTU Tech Club"
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Registration Successful!",
        description: `You've successfully registered for "${event.title}"`,
      });
      navigate("/events");
    }, 1500);
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <Link to="/events" className="inline-flex items-center text-gtu-blue hover:underline mb-6">
          <CornerUpLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card className="bg-white rounded-xl shadow-md overflow-hidden h-full">
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h2 className="text-xl font-bold mb-2">{event.title}</h2>
                <p className="text-gtu-gray-600 text-sm mb-4">{event.description}</p>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-start">
                    <Calendar className="h-4 w-4 mr-2 mt-0.5 text-gtu-gray-400" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-4 w-4 mr-2 mt-0.5 text-gtu-gray-400" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 mr-2 mt-0.5 text-gtu-gray-400" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-start">
                    <Users className="h-4 w-4 mr-2 mt-0.5 text-gtu-gray-400" />
                    <div>
                      <span className="font-medium">{event.attendees}</span> / {event.maxAttendees} registered
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-gtu-blue h-2 rounded-full" 
                          style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gtu-gray-500">
                    Organized by <span className="font-medium">{event.organizer}</span>
                  </p>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card className="bg-white rounded-xl shadow-md">
              <div className="p-5 md:p-8">
                <div className="flex items-center mb-6">
                  <CheckCircle className="h-5 w-5 text-gtu-blue mr-2" />
                  <h1 className="text-2xl font-bold">Register for {event.title}</h1>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        placeholder="Enter your first name" 
                        required
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        placeholder="Enter your last name" 
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email address" 
                      required
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      placeholder="Enter your phone number" 
                      required
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="institute">Institute/College</Label>
                    <Input 
                      id="institute" 
                      placeholder="Enter your institute name" 
                      required
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="specialRequest">Special Requests (Optional)</Label>
                    <Textarea 
                      id="specialRequest" 
                      placeholder="Any special requests or accommodations needed?" 
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="terms" 
                      checked={agreed} 
                      onCheckedChange={(checked) => setAgreed(checked as boolean)} 
                      required
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the event terms and conditions
                    </Label>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting || !agreed} 
                      className="w-full sm:w-auto"
                    >
                      {isSubmitting ? "Registering..." : "Register Now"}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => navigate("/events")} 
                      className="w-full sm:w-auto"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default RegisterEvent;
