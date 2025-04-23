
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CornerUpLeft, Download, ThumbsUp, Share2, Bookmark } from "lucide-react";

const ViewResource = () => {
  const { id } = useParams();

  // Sample resource data for demonstration (in a real app, this would be fetched from backend)
  const resource = {
    id: id,
    title: "Computer Networks Notes - Unit 1",
    type: "pdf",
    subject: "Computer Networks",
    description: "Comprehensive notes on Computer Networks Unit 1 including OSI model, TCP/IP protocols, and networking basics. These notes cover everything you need to know for your exams and practical understanding of network fundamentals.",
    uploadedBy: "Prof. Sharma",
    uploadDate: "April 15, 2023",
    likes: 45,
    downloads: 120,
    tags: ["Networks", "OSI Model", "TCP/IP"]
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <Link to="/resources" className="inline-flex items-center text-gtu-blue hover:underline mb-6">
          <CornerUpLeft className="mr-2 h-4 w-4" />
          Back to Resources
        </Link>
        
        <Card className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 md:p-6 lg:p-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{resource.title}</h1>
                <div className="flex items-center text-gtu-gray-500 text-sm mb-3">
                  <span>Uploaded by {resource.uploadedBy} • {resource.uploadDate}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {resource.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="inline-block bg-gtu-gray-100 rounded-full px-3 py-1 text-xs text-gtu-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button size="sm" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </Button>
                <Button size="sm" variant="outline" className="flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{resource.likes}</span>
                </Button>
                <Button size="sm" variant="outline" className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </Button>
                <Button size="sm" variant="outline" className="flex items-center gap-2">
                  <Bookmark className="h-4 w-4" />
                  <span>Save</span>
                </Button>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6 mb-6">
              <h2 className="font-semibold text-lg mb-2">Description</h2>
              <p className="text-gtu-gray-700">{resource.description}</p>
            </div>
            
            <div className="bg-gray-50 border rounded-lg p-4 flex items-center justify-center aspect-[16/9] mb-6">
              <div className="w-full h-full bg-white shadow rounded flex items-center justify-center">
                {resource.type === "pdf" ? (
                  <div className="text-center">
                    <div className="text-5xl text-red-500 mb-2">PDF</div>
                    <p className="text-gtu-gray-600">PDF Viewer (Coming Soon)</p>
                    <Button className="mt-4">
                      <Download className="mr-2 h-4 w-4" />
                      Download to View
                    </Button>
                  </div>
                ) : (
                  <div className="text-center text-gtu-gray-500">
                    Resource Preview (Coming Soon)
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="text-sm text-gtu-gray-500">
                <strong>{resource.downloads}</strong> downloads • <strong>{resource.likes}</strong> likes
              </div>
              <Button asChild>
                <Link to="/resources">Back to Resources</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ViewResource;
