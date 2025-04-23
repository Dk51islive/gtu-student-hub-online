
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CornerUpLeft, Users, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const JoinGroup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreed, setAgreed] = useState(false);

  // Mock group data (in a real app, this would be fetched from backend)
  const group = {
    id,
    name: "Tech Innovators",
    description: "A group for technology enthusiasts and innovators to collaborate on cutting-edge projects.",
    members: 32,
    posts: 78,
    admin: "Prof. Sharma",
    created: "Jan 15, 2023",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Success!",
        description: `You've successfully joined "${group.name}"`,
      });
      navigate("/community");
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <Link to="/community" className="inline-flex items-center text-gtu-blue hover:underline mb-6">
          <CornerUpLeft className="mr-2 h-4 w-4" />
          Back to Community
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card className="bg-white rounded-xl shadow-md overflow-hidden h-full">
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={group.image} 
                  alt={group.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h2 className="text-xl font-bold mb-2">{group.name}</h2>
                <p className="text-gtu-gray-600 text-sm mb-4">{group.description}</p>
                
                <div className="space-y-2 text-sm text-gtu-gray-500">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{group.members} members</span>
                  </div>
                  <div>
                    <span className="font-medium">Admin:</span> {group.admin}
                  </div>
                  <div>
                    <span className="font-medium">Created:</span> {group.created}
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card className="bg-white rounded-xl shadow-md">
              <div className="p-5 md:p-8">
                <div className="flex items-center mb-6">
                  <CheckCircle className="h-5 w-5 text-gtu-blue mr-2" />
                  <h1 className="text-2xl font-bold">Join {group.name}</h1>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Enter your full name" 
                      required
                    />
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
                    <Label htmlFor="introduction">Introduction</Label>
                    <Textarea 
                      id="introduction" 
                      placeholder="Briefly introduce yourself to the group" 
                      className="min-h-[100px]"
                      required
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="reason">Why do you want to join this group?</Label>
                    <Textarea 
                      id="reason" 
                      placeholder="Explain why you're interested in joining" 
                      className="min-h-[100px]"
                      required
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
                      I agree to the group rules and code of conduct
                    </Label>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting || !agreed} 
                      className="w-full sm:w-auto"
                    >
                      {isSubmitting ? "Submitting..." : "Join Group"}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => navigate("/community")} 
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

export default JoinGroup;
