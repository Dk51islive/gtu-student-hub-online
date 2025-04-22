
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";

const JoinGroup = () => {
  const { id } = useParams();

  // In a real app, fetch group details using this id
  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto py-12 space-y-8">
        <h1 className="text-3xl font-bold mb-2">Join Student Group</h1>
        <div className="text-gray-700 mb-8">
          Joining group with ID: <span className="font-semibold">{id}</span>
        </div>
        {/* Placeholder form */}
        <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center">
          <form className="space-y-6 w-full max-w-md">
            <div className="text-gray-500 mb-4">Join group form goes here.</div>
            <Button type="submit" className="w-full">Join Group</Button>
          </form>
          <Button asChild className="mt-6" variant="outline">
            <Link to="/community">Back to Community</Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default JoinGroup;
