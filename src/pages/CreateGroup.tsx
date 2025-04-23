import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { CornerUpLeft, UserPlus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const CreateGroup = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    visibility: "public"
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Group Created!",
        description: `"${formData.name}" has been successfully created.`,
      });
      navigate("/community");
    }, 1500);
  };
  
  const categories = [
    "Academic",
    "Technical",
    "Cultural",
    "Sports",
    "Career",
    "Alumni",
    "Other"
  ];
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <Link to="/community" className="inline-flex items-center text-gtu-blue hover:underline mb-6">
          <CornerUpLeft className="mr-2 h-4 w-4" />
          Back to Community
        </Link>
        
        <Card className="bg-white rounded-xl shadow-md max-w-3xl mx-auto">
          <div className="p-6 md:p-8">
            <div className="flex items-center mb-6">
              <UserPlus className="h-6 w-6 text-gtu-blue mr-2" />
              <h1 className="text-2xl md:text-3xl font-bold">Create New Student Group</h1>
            </div>
            
            <p className="text-gtu-gray-600 mb-8">
              Fill out the form below to create a new student group. Once created, you'll be able to invite members,
              share resources, and organize events.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="name">Group Name</Label>
                <Input 
                  id="name" 
                  name="name"
                  placeholder="Enter group name" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="description">Group Description</Label>
                <Textarea 
                  id="description" 
                  name="description"
                  placeholder="Describe what your group is about" 
                  className="min-h-[120px]"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => handleSelectChange("category", value)}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category.toLowerCase()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="visibility">Group Visibility</Label>
                  <Select 
                    value={formData.visibility} 
                    onValueChange={(value) => handleSelectChange("visibility", value)}
                  >
                    <SelectTrigger id="visibility">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public (Anyone can join)</SelectItem>
                      <SelectItem value="private">Private (Requires approval)</SelectItem>
                      <SelectItem value="invite">Invite-Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="pt-4">
                <h3 className="text-lg font-medium mb-2">Additional Options</h3>
                <div className="bg-gray-50 p-4 rounded-md space-y-4">
                  <div className="space-y-3">
                    <Label htmlFor="cover">Cover Image (Optional)</Label>
                    <Input 
                      id="cover" 
                      type="file" 
                      accept="image/*"
                    />
                    <p className="text-xs text-gtu-gray-500">
                      Recommended size: 1200x400px, max 2MB
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="tags">Tags (Optional)</Label>
                    <Input 
                      id="tags" 
                      placeholder="Enter tags separated by commas" 
                    />
                    <p className="text-xs text-gtu-gray-500">
                      Example: technology, programming, web development
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting || !formData.name || !formData.description} 
                  className="w-full sm:w-auto"
                >
                  {isSubmitting ? "Creating Group..." : "Create Group"}
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
    </MainLayout>
  );
};

export default CreateGroup;
