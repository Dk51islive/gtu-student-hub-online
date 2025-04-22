
import { useState } from "react";
import PageTemplate from "@/components/layout/PageTemplate";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

const Feedback = () => {
  const [feedbackType, setFeedbackType] = useState("suggestion");
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulating form submission
    setTimeout(() => {
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback! We value your input.",
      });
      setFeedbackText("");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <PageTemplate 
      title="Feedback" 
      subtitle="Share your thoughts and help us improve GTUinsta"
      icon={<MessageCircle />}
    >
      <div className="max-w-2xl mx-auto">
        <p className="mb-6 text-gtu-gray-600">
          Your feedback is valuable to us. Whether you have suggestions, found bugs, or want to share your experience, 
          we're eager to hear from you. Your insights help us make GTUinsta better for everyone.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Feedback Type</h3>
            <RadioGroup 
              value={feedbackType} 
              onValueChange={setFeedbackType} 
              className="flex flex-col space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="suggestion" id="suggestion" />
                <Label htmlFor="suggestion">Suggestion</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bug" id="bug" />
                <Label htmlFor="bug">Bug Report</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="content" id="content" />
                <Label htmlFor="content">Content Request</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="experience" id="experience" />
                <Label htmlFor="experience">User Experience</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <label htmlFor="feedback" className="block text-sm font-medium text-gtu-gray-600 mb-2">
              Your Feedback
            </label>
            <Textarea
              id="feedback"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Please provide detailed feedback to help us understand your experience or suggestion better"
              rows={6}
              required
              className="w-full"
            />
          </div>
          
          <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </form>
        
        <div className="mt-8 p-4 bg-gtu-blue/10 rounded-lg">
          <h4 className="font-medium mb-2">What happens next?</h4>
          <p className="text-sm text-gtu-gray-600">
            Our team reviews all feedback regularly. While we may not be able to respond to every submission individually, 
            we consider all input for future updates. Critical bugs and issues are prioritized for immediate attention.
          </p>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Feedback;
