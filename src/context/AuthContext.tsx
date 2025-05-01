// src/context/AuthContext.tsx

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
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
    const initSession = async () => {
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
    };

    initSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const sessionUser = session?.user || null;
      setUser(sessionUser);
      setSession(session);
      setIsAuthenticated(!!sessionUser);
    });

    return () => subscription.unsubscribe();
  }, [toast]);

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
    setIsAuthenticated(true);

    // Check if profile exists
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
