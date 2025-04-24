
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate("/");
      }
    };
    
    checkSession();
  }, [navigate]);

  // Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          toast({
            title: "Welcome back!",
            description: "You have been successfully logged in.",
          });
          navigate("/");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!email.trim()) errors.email = "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = "Please enter a valid email";
    if (!password) errors.password = "Password is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error);
        
        // Provide more specific error messages based on common authentication issues
        let errorMessage = "Invalid email or password. Please try again.";
        
        if (error.message) {
          if (error.message.includes("Invalid login credentials")) {
            errorMessage = "Invalid email or password. Please try again.";
          } else if (error.message.includes("Email not confirmed")) {
            errorMessage = "Please confirm your email before logging in.";
            
            // Offer to resend confirmation email
            toast({
              title: "Email not verified",
              description: (
                <div className="space-y-2">
                  <p>Please verify your email before logging in.</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={async () => {
                      try {
                        const redirectUrl = window.location.origin + "/login";
                        const { error } = await supabase.auth.resend({
                          type: 'signup',
                          email,
                          options: {
                            emailRedirectTo: redirectUrl,
                          }
                        });
                        
                        if (error) throw error;
                        
                        toast({
                          title: "Verification email sent",
                          description: "Please check your inbox to verify your email"
                        });
                      } catch (err: any) {
                        toast({
                          title: "Failed to send email",
                          description: err.message,
                          variant: "destructive"
                        });
                      }
                    }}
                  >
                    Resend verification email
                  </Button>
                </div>
              ),
            });
          } else {
            errorMessage = error.message;
          }
        }
        
        toast({
          title: "Login failed",
          description: errorMessage,
          variant: "destructive"
        });
        
        return;
      }

      // Note: We don't need to navigate here as the onAuthStateChange handles this
      console.log("Login successful:", data);
      
    } catch (error: any) {
      console.error("Error during login:", error);
      
      toast({
        title: "Login failed",
        description: "An unexpected error occurred. Please try again later.",
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
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <Link
              to="/signup"
              className="font-medium text-gtu-blue hover:text-gtu-blue/80"
            >
              create a new account
            </Link>
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={formErrors.email ? "border-red-500" : ""}
                  disabled={isLoading}
                />
                {formErrors.email && <p className="text-sm text-red-500">{formErrors.email}</p>}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-gtu-blue hover:text-gtu-blue/80"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={formErrors.password ? "border-red-500" : ""}
                  disabled={isLoading}
                />
                {formErrors.password && <p className="text-sm text-red-500">{formErrors.password}</p>}
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember-me"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(!!checked)}
                  disabled={isLoading}
                />
                <Label htmlFor="remember-me" className="text-sm">
                  Remember me
                </Label>
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-6">
            <div className="text-sm text-center text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-gtu-blue hover:text-gtu-blue/80"
              >
                Sign up
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

export default Login;
