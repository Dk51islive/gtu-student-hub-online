import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  UserCircleIcon,
  AcademicCapIcon,
  IdentificationIcon,
  InboxIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

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
        .maybeSingle();

      if (error) {
        console.error("Error loading profile:", error.message);
      } else {
        setProfile(data);
      }

      setLoading(false);
    };

    getProfile();
  }, [navigate]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg text-gray-600">Loading profile...</div>
      </div>
    );

  if (!profile)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg text-red-500">No profile data found.</div>
      </div>
    );

  return (
    <div className="max-w-xl mx-auto mt-12 px-4">
      {/* Back Button beside card */}
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium shadow hover:bg-orange-500 transition"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-orange-500 p-6 text-white flex items-center space-x-4">
          <UserCircleIcon className="h-16 w-16 text-white" />
          <div>
            <h1 className="text-2xl font-bold">{profile.full_name}</h1>
            <p className="text-sm text-white/90">{profile.email}</p>
          </div>
        </div>

        {/* Details */}
        <div className="p-6 space-y-5 text-gray-700">
          <ProfileItem
            icon={<IdentificationIcon className="h-5 w-5 text-blue-600" />}
            label="Enrollment Number"
            value={profile.enrollment_number}
          />
          <ProfileItem
            icon={<InboxIcon className="h-5 w-5 text-orange-500" />}
            label="Department"
            value={profile.department}
          />
          <ProfileItem
            icon={<AcademicCapIcon className="h-5 w-5 text-blue-500" />}
            label="Year of Study"
            value={profile.year_of_study || "Not set"}
          />
        </div>
      </div>
    </div>
  );
}

function ProfileItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start space-x-3">
      <div className="mt-1">{icon}</div>
      <div>
        <div className="text-sm text-gray-500">{label}</div>
        <div className="font-medium text-gray-800">{value}</div>
      </div>
    </div>
  );
}
