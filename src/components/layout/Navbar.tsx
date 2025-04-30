import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Menu, MessageSquare, Search, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<{ full_name?: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const checkAuthState = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
      
      if (session?.user) {
        try {
          // Get user profile data
          const { data, error } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', session.user.id)
            .single();
            
          if (error) throw error;
          setUserProfile(data);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };
    
    checkAuthState();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setIsLoggedIn(!!session);
        
        if (session?.user) {
          try {
            // Get user profile data
            const { data, error } = await supabase
              .from('profiles')
              .select('full_name')
              .eq('id', session.user.id)
              .maybeSingle();
              
            if (error) throw error;
            setUserProfile(data);
          } catch (error) {
            console.error("Error fetching profile:", error);
            setUserProfile(null);
          }
        } else {
          setUserProfile(null);
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    console.log("Attempting to log out...");
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      console.log("No active session found.");
      toast({
        title: "Logout failed",
        description: "You are not logged in.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Logout error:", error);
        throw error;
      }
      
      toast({
        title: "Logged out successfully",
        description: "You have been signed out of your account",
      });
      
      navigate('/');
    } catch (error: any) {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: error.message || "Something went wrong",
        variant: "destructive"
      });
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-gtu-blue font-bold text-xl">GTU</span>
              <span className="text-gtu-orange font-bold text-xl">Hub</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-6">
              <Link to="/" className="px-3 py-2 text-gtu-gray-600 hover:text-gtu-blue font-medium">
                Home
              </Link>
              <Link to="/resources" className="px-3 py-2 text-gtu-gray-600 hover:text-gtu-blue font-medium">
                Resources
              </Link>
              <Link to="/events" className="px-3 py-2 text-gtu-gray-600 hover:text-gtu-blue font-medium">
                Events
              </Link>
              <Link to="/community" className="px-3 py-2 text-gtu-gray-600 hover:text-gtu-blue font-medium">
                Community
              </Link>
              <Link to="/forum" className="px-3 py-2 text-gtu-gray-600 hover:text-gtu-blue font-medium">
                Forum
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gtu-gray-600 hover:text-gtu-blue p-1 rounded-full">
              <Search size={20} />
            </button>
            {isLoggedIn ? (
              <>
                <button className="text-gtu-gray-600 hover:text-gtu-blue p-1 rounded-full relative">
                  <Bell size={20} />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="text-gtu-gray-600 hover:text-gtu-blue p-1 rounded-full">
                  <MessageSquare size={20} />
                </button>
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none">
                    <Avatar>
                      <AvatarFallback>{getInitials(userProfile?.full_name)}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/profile" className="w-full">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/dashboard" className="w-full">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/settings" className="w-full">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-gtu-blue focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="p-4 space-y-3 bg-white border-t">
            <Link to="/" className="block px-3 py-2 text-gtu-gray-700 hover:bg-gtu-gray-100 rounded-md">
              Home
            </Link>
            <Link to="/resources" className="block px-3 py-2 text-gtu-gray-700 hover:bg-gtu-gray-100 rounded-md">
              Resources
            </Link>
            <Link to="/events" className="block px-3 py-2 text-gtu-gray-700 hover:bg-gtu-gray-100 rounded-md">
              Events
            </Link>
            <Link to="/community" className="block px-3 py-2 text-gtu-gray-700 hover:bg-gtu-gray-100 rounded-md">
              Community
            </Link>
            <Link to="/forum" className="block px-3 py-2 text-gtu-gray-700 hover:bg-gtu-gray-100 rounded-md">
              Forum
            </Link>
            <div className="pt-4 border-t">
              {isLoggedIn ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>{getInitials(userProfile?.full_name)}</AvatarFallback>
                    </Avatar>
                    <span className="text-gtu-gray-700 font-medium">{userProfile?.full_name || "User "}</span>
                  </div>
                  <Button variant="outline" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
