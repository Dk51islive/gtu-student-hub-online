
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";

const ViewResource = () => {
  const { id } = useParams();

  // In a real app, fetch resource details using this id
  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto py-12 space-y-8">
        <h1 className="text-3xl font-bold mb-2">View Resource</h1>
        <div className="text-gray-700 mb-8">
          You are viewing study resource with ID: <span className="font-semibold">{id}</span>
        </div>
        {/* Placeholder content for viewing resource */}
        <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center">
          <div className="w-full bg-gray-100 aspect-video flex items-center justify-center text-2xl text-gray-400 rounded-md mb-6">
            Resource File Viewer (Coming Soon)
          </div>
          <Button asChild>
            <Link to="/resources">Back to Resources</Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default ViewResource;
