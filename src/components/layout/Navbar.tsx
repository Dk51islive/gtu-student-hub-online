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
import { useAuth } from '@/context/AuthContext';
import { supabase } from "@/integrations/supabase/client";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<{ full_name?: string } | null>(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;
      const { data, error } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .maybeSingle(); // ✅ Returns null if not found, no error

      if (error) {
        console.error("Error fetching user profile:", error.message);
        return;
      }

      setUserProfile(data);
    };

    fetchProfile();
  }, [user]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login"); // 👈 redirect to login page after logout
    } catch (err) {
      console.error("Logout failed:", err);
    }
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
              {["Home", "Resources", "Events", "Community", "Forum"].map((label) => (
                <Link
                  key={label}
                  to={`/${label.toLowerCase()}`}
                  className="px-3 py-2 text-gtu-gray-600 hover:text-gtu-blue font-medium"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gtu-gray-600 hover:text-gtu-blue p-1 rounded-full">
              <Search size={20} />
            </button>
            {user ? (
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
                    <DropdownMenuItem><Link to="/profile">Profile</Link></DropdownMenuItem>
                    {/* <DropdownMenuItem><Link to="/dashboard">Dashboard</Link></DropdownMenuItem> */}
                    {/* <DropdownMenuItem><Link to="/settings">Settings</Link></DropdownMenuItem> */}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" asChild><Link to="/login">Login</Link></Button>
                <Button asChild><Link to="/signup">Sign Up</Link></Button>
              </div>
            )}
          </div>
          <div className="flex md:hidden items-center">
            <button onClick={toggleMenu} className="text-gray-700 hover:text-gtu-blue focus:outline-none">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="p-4 space-y-3 bg-white border-t">
            {["Home", "Resources", "Events", "Community", "Forum"].map((label) => (
              <Link
                key={label}
                to={`/${label.toLowerCase()}`}
                className="block px-3 py-2 text-gtu-gray-700 hover:bg-gtu-gray-100 rounded-md"
              >
                {label}
              </Link>
            ))}
            <div className="pt-4 border-t">
              {user ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>{getInitials(userProfile?.full_name)}</AvatarFallback>
                    </Avatar>
                    <span className="text-gtu-gray-700 font-medium">{userProfile?.full_name || "User"}</span>
                  </div>
                  <Button variant="outline" onClick={handleLogout}>Logout</Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" asChild className="w-full"><Link to="/login">Login</Link></Button>
                  <Button asChild className="w-full"><Link to="/signup">Sign Up</Link></Button>
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
