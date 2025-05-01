import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

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
  const [isSuccess, setIsSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/");
    });
  }, [navigate]);

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
    const errors: { [key: string]: string } = {};
    if (!name.trim()) errors.name = "Name is required";
    if (!email.trim()) errors.email = "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = "Enter a valid email";
    if (!password) errors.password = "Password is required";
    if (password.length < 6)
      errors.password = "Password must be at least 6 characters";
    if (password !== confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    if (!department) errors.department = "Department is required";
    if (!enrollmentNumber.trim())
      errors.enrollmentNumber = "Enrollment number is required";
    if (!yearOfStudy) errors.yearOfStudy = "Year of study is required";
    if (!termsAccepted) errors.terms = "You must accept the terms";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({
        title: "Validation failed",
        description: "Please correct the errors in the form.",
        variant: "destructive",
      });
      return;
    }
  
    try {
      setIsLoading(true);
  
      const redirectUrl = `${window.location.origin}/login`;
      const { data: signupData, error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: name,
            enrollment_number: enrollmentNumber,
            department,
            year_of_study: yearOfStudy,
          },
        },
      });
  
      if (signupError) throw signupError;
  
      // ✅ Get user id from response
      const userId = signupData.user?.id;
      if (!userId) throw new Error("User ID not returned from signup");
  
      // ✅ Insert additional profile data
      const { error: insertError } = await supabase.from("profiles").insert({
        id: userId, // assuming "id" is the primary key that matches auth.users
        full_name: name,
        email,
        department,
        enrollment_number: enrollmentNumber,
        year_of_study: yearOfStudy,
      });
  
      if (insertError) throw insertError;
  
      setIsSuccess(true);
      toast({
        title: "Signup successful",
        description: "Check your email to verify your account",
      });
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Email Sent</CardTitle>
            <CardDescription>
              We’ve sent a verification email to <strong>{email}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Please check your inbox and verify your email to log in.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter className="justify-center border-t pt-4">
            <Link to="/login" className="text-sm text-blue-600 hover:underline">
              Back to Login
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-extrabold text-center text-black">
        <span className="text-blue-600">GTU</span>
        <span className="text-orange-500">Hub</span>
      </h1>
      <h2 className="text-xl font-semibold mt-2">Create your account</h2>
      <p className="text-sm text-muted-foreground mt-1">
        Or{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          sign in to existing account
        </Link>
      </p>

      <Card className="w-full max-w-md mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Join the GTU community</CardTitle>
          <CardDescription>
            Fill in your details to create your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" />
              {formErrors.name && <p className="text-sm text-red-500">{formErrors.name}</p>}
            </div>

            <div>
              <Label>Email</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
              {formErrors.email && <p className="text-sm text-red-500">{formErrors.email}</p>}
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Label>Enrollment Number</Label>
                <Input value={enrollmentNumber} onChange={(e) => setEnrollmentNumber(e.target.value)} placeholder="Enter enrollment no." />
                {formErrors.enrollmentNumber && <p className="text-sm text-red-500">{formErrors.enrollmentNumber}</p>}
              </div>
              <div className="flex-1">
                <Label>Year of Study</Label>
                <Select onValueChange={setYearOfStudy}>
                  <SelectTrigger>
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

            <div>
              <Label>Department</Label>
              <Select onValueChange={setDepartment}>
                <SelectTrigger>
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

            <div>
              <Label>Password</Label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" />
              {formErrors.password && <p className="text-sm text-red-500">{formErrors.password}</p>}
            </div>

            <div>
              <Label>Confirm Password</Label>
              <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your password" />
              {formErrors.confirmPassword && <p className="text-sm text-red-500">{formErrors.confirmPassword}</p>}
            </div>

            <div className="flex items-start gap-2">
              <Checkbox checked={termsAccepted} onCheckedChange={(val) => setTermsAccepted(!!val)} />
              <p className="text-sm">
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:underline">terms of service</a> and{" "}
                <a href="#" className="text-blue-600 hover:underline">privacy policy</a>
              </p>
            </div>
            {formErrors.terms && <p className="text-sm text-red-500">{formErrors.terms}</p>}
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Account"}
            </Button>
            <p className="text-sm text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">Sign in</Link>
            </p>
            <Link to="/" className="text-sm text-gray-500 hover:underline text-center">
              ← Back to Home
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
