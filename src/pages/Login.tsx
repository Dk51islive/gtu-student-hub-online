import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  // ✅ Handle email verification link (hash-based access_token)
  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1));
    const access_token = hash.get("access_token");
    const refresh_token = hash.get("refresh_token");

    if (access_token && refresh_token) {
      setVerifying(true);
      supabase.auth
        .setSession({ access_token, refresh_token })
        .then(({ error }) => {
          if (error) {
            toast({
              title: "Verification Failed",
              description: error.message,
              variant: "destructive",
            });
          } else {
            toast({
              title: "Email Verified",
              description: "Your email has been successfully verified.",
            });
            navigate("/", { replace: true });
          }
        })
        .finally(() => {
          setVerifying(false);
          window.history.replaceState({}, document.title, window.location.pathname);
        });
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!email.trim()) errors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = "Enter a valid email";
    if (!password) errors.password = "Password is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      await login(email, password);
      toast({ title: "Login successful", description: "Welcome back!" });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error?.message || "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-4xl font-bold mb-2 text-center">
        <span className="text-blue-600">GTU</span>
        <span className="text-orange-500">Hub</span>
      </div>

      <h2 className="text-2xl font-semibold text-center text-black">
        {verifying ? "Verifying email..." : "Sign in to your account"}
      </h2>
      <p className="text-center text-sm text-gray-600 mb-6">
        Or{" "}
        <Link to="/signup" className="text-blue-600 font-medium hover:underline">
          create a new account
        </Link>
      </p>

      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg mb-1 text-black">Welcome back</CardTitle>
            <p className="text-sm text-gray-500">Enter your credentials to access your account</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading || verifying}
                  className={formErrors.email ? "border-red-500" : ""}
                />
                {formErrors.email && <p className="text-sm text-red-500">{formErrors.email}</p>}
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading || verifying}
                  className={formErrors.password ? "border-red-500" : ""}
                />
                {formErrors.password && <p className="text-sm text-red-500">{formErrors.password}</p>}
              </div>

              <div className="flex items-center space-x-2 mb-4">
                <input type="checkbox" id="remember" className="h-4 w-4" />
                <label htmlFor="remember" className="text-sm text-gray-700">Remember me</label>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading || verifying}>
                {isLoading ? "Signing in..." : verifying ? "Verifying..." : "Sign in"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-sm text-center justify-center">
            <span>Don't have an account?</span>
            <Link to="/signup" className="ml-1 text-blue-600 font-medium hover:underline">
              Sign up
            </Link>
          </CardFooter>
        </Card>

        <div className="text-center mt-4 text-sm">
          <Link to="/" className="text-gray-500 hover:underline">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
