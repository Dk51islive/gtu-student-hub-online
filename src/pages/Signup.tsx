
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});

  const departmentOptions = [
    "Computer Engineering",
    "Information Technology",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electronics & Communication",
    "Chemical Engineering",
    "Automobile Engineering",
  ];

  const yearOptions = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!name.trim()) errors.name = "Name is required";
    if (!email.trim()) errors.email = "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = "Please enter a valid email";
    if (!password) errors.password = "Password is required";
    if (password.length < 6) errors.password = "Password must be at least 6 characters";
    if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match";
    if (!department) errors.department = "Please select a department";
    if (!enrollmentNumber.trim()) errors.enrollmentNumber = "Enrollment number is required";
    if (!yearOfStudy) errors.yearOfStudy = "Please select your year of study";
    if (!termsAccepted) errors.terms = "You must accept the terms of service";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Form validation failed",
        description: "Please check the form for errors",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsLoading(true);
      
      // Register user with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            department,
            enrollment_number: enrollmentNumber,
            year_of_study: yearOfStudy,
          }
        }
      });

      if (error) {
        console.error("Signup error:", error);
        throw error;
      }

      console.log("Signup successful:", data);
      
      toast({
        title: "Account created successfully",
        description: "You can now log in with your credentials",
      });
      
      // Redirect to login page after successful signup
      navigate("/login");
    } catch (error: any) {
      console.error("Error during signup:", error);
      
      // Provide more specific error messages based on Supabase error codes
      let errorMessage = "Something went wrong. Please try again.";
      
      if (error.message) {
        if (error.message.includes("User already registered")) {
          errorMessage = "This email is already registered. Please use another email or try to login.";
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Signup failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center">
            <span className="text-gtu-blue font-bold text-3xl">GTU</span>
            <span className="text-gtu-orange font-bold text-3xl">Hub</span>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <Link
              to="/login"
              className="font-medium text-gtu-blue hover:text-gtu-blue/80"
            >
              sign in to existing account
            </Link>
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Join the GTU community</CardTitle>
            <CardDescription>
              Fill in your details to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={formErrors.name ? "border-red-500" : ""}
                />
                {formErrors.name && <p className="text-sm text-red-500">{formErrors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={formErrors.email ? "border-red-500" : ""}
                />
                {formErrors.email && <p className="text-sm text-red-500">{formErrors.email}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="enrollment">Enrollment Number</Label>
                  <Input
                    id="enrollment"
                    type="text"
                    placeholder="Enter enrollment no."
                    value={enrollmentNumber}
                    onChange={(e) => setEnrollmentNumber(e.target.value)}
                    className={formErrors.enrollmentNumber ? "border-red-500" : ""}
                  />
                  {formErrors.enrollmentNumber && <p className="text-sm text-red-500">{formErrors.enrollmentNumber}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year of Study</Label>
                  <Select 
                    value={yearOfStudy} 
                    onValueChange={setYearOfStudy}
                  >
                    <SelectTrigger 
                      id="year"
                      className={formErrors.yearOfStudy ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {yearOptions.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formErrors.yearOfStudy && <p className="text-sm text-red-500">{formErrors.yearOfStudy}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select 
                  value={department} 
                  onValueChange={setDepartment}
                >
                  <SelectTrigger 
                    id="department"
                    className={formErrors.department ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departmentOptions.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formErrors.department && <p className="text-sm text-red-500">{formErrors.department}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className={formErrors.password ? "border-red-500" : ""}
                />
                {formErrors.password && <p className="text-sm text-red-500">{formErrors.password}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className={formErrors.confirmPassword ? "border-red-500" : ""}
                />
                {formErrors.confirmPassword && <p className="text-sm text-red-500">{formErrors.confirmPassword}</p>}
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(!!checked)}
                  className={formErrors.terms ? "border-red-500" : ""}
                />
                <Label htmlFor="terms" className={`text-sm ${formErrors.terms ? "text-red-500" : ""}`}>
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="text-gtu-blue hover:text-gtu-blue/80"
                  >
                    terms of service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-gtu-blue hover:text-gtu-blue/80"
                  >
                    privacy policy
                  </Link>
                </Label>
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-6">
            <div className="text-sm text-center text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-gtu-blue hover:text-gtu-blue/80"
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
        <div className="text-center mt-4">
          <Link to="/" className="text-sm text-gtu-gray-500 hover:text-gtu-gray-700">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
