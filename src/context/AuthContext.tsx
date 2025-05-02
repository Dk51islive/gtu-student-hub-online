import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  session: Session | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    handleInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const sessionUser = session?.user || null;
      setUser(sessionUser);
      setSession(session);
      setIsAuthenticated(!!sessionUser);
    });

    return () => subscription.unsubscribe();
  }, []);

  const ensureUserProfileExists = async (sessionUser: User) => {
    const { data: existingProfile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", sessionUser.id)
      .single();

    if (profileError && profileError.code !== "PGRST116") {
      toast({
        title: "Profile Load Failed",
        description: profileError.message,
        variant: "destructive",
      });
      throw profileError;
    }

    if (!existingProfile) {
      const { error: insertError } = await supabase.from("profiles").insert([
        {
          id: sessionUser.id,
          email: sessionUser.email,
          full_name: sessionUser.user_metadata?.full_name || "",
          enrollment_number: sessionUser.user_metadata?.enrollment_number || "",
          department: sessionUser.user_metadata?.department || "",
          year_of_study: sessionUser.user_metadata?.year_of_study || "",
        },
      ]);

      if (insertError) {
        toast({
          title: "Profile Creation Failed",
          description: insertError.message,
          variant: "destructive",
        });
        throw insertError;
      }
    }
  };

  const handleInitialSession = async () => {
    const url = new URL(window.location.href);

    // ✅ 1. Handle email confirmation links with #access_token
    if (window.location.hash.includes("access_token")) {
      const hash = new URLSearchParams(window.location.hash.slice(1));
      const access_token = hash.get("access_token");
      const refresh_token = hash.get("refresh_token");

      if (access_token && refresh_token) {
        const { data, error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });

        if (error) {
          toast({
            title: "Session Restore Failed",
            description: error.message,
            variant: "destructive",
          });
          return;
        }

        const sessionUser = data.session?.user ?? null;
        setUser(sessionUser);
        setSession(data.session);
        setIsAuthenticated(!!sessionUser);

        if (sessionUser) await ensureUserProfileExists(sessionUser);

        // Remove tokens from URL
        window.history.replaceState({}, document.title, window.location.pathname);
        return;
      }
    }

    // ✅ 2. Handle OAuth/magic link redirect with ?code=...
    const code = url.searchParams.get("code");
    if (code) {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        toast({
          title: "Session Exchange Failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      const sessionUser = data.user;
      setUser(sessionUser);
      setSession(data.session);
      setIsAuthenticated(true);

      if (sessionUser) await ensureUserProfileExists(sessionUser);

      window.history.replaceState({}, document.title, window.location.pathname);
      return;
    }

    // ✅ 3. Normal page load
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      toast({
        title: "Session Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    const sessionUser = data.session?.user || null;
    setUser(sessionUser);
    setSession(data.session);
    setIsAuthenticated(!!sessionUser);

    if (sessionUser) await ensureUserProfileExists(sessionUser);
  };

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }

    const sessionUser = data.user;
    setUser(sessionUser);
    setSession(data.session);
    setIsAuthenticated(true);

    if (sessionUser) await ensureUserProfileExists(sessionUser);
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Logout Failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }

    setUser(null);
    setSession(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
