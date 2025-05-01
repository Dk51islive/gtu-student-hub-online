import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  id: string;
  full_name: string;
  email: string;
  department: string;
  enrollment_number: string;
  year_of_study: string;
}

export default function Profile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        navigate("/login");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle(); // ✅ Safely return null if none or many

      if (error) {
        console.error("Error loading profile:", error.message);
      } else {
        setProfile(data);
      }

      setLoading(false);
    };

    getProfile();
  }, [navigate]);

  if (loading) return <div className="p-4">Loading profile...</div>;
  if (!profile) return <div className="p-4">No profile data found.</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow bg-white">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <div><strong>Full Name:</strong> {profile.full_name}</div>
      <div><strong>Email:</strong> {profile.email}</div>
      <div><strong>Enrollment Number:</strong> {profile.enrollment_number}</div>
      <div><strong>Department:</strong> {profile.department}</div>
      <div><strong>Year Of Study:</strong> {profile.year_of_study || "Not set"}</div>
    </div>
  );
}
