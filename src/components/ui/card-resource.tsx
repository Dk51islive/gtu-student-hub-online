import { Link } from "react-router-dom";
import { BookOpen, FileText, Video } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { downloadWithWatermark } from "@/utils/watermarkPdf";
import { useToast } from "@/components/ui/use-toast";

export interface ResourceCardProps {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'article' | 'other';
  subject?: string;
  description: string;
  uploadedBy?: string;
  uploadDate?: string;
  likes?: number;
  downloads?: number;
  thumbnailUrl?: string;
  downloadUrl?: string;
}

const ResourceCard = ({
  id,
  title,
  type,
  subject,
  description,
  uploadedBy = "Admin",
  uploadDate = "2 days ago",
  likes = 0,
  downloads = 0,
  thumbnailUrl,
  downloadUrl,
}: ResourceCardProps) => {
  const { toast } = useToast();
  
  const getIcon = () => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />;
      case 'video':
        return <Video className="h-5 w-5 text-blue-500" />;
      case 'article':
      default:
        return <BookOpen className="h-5 w-5 text-green-500" />;
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'pdf':
        return 'PDF';
      case 'video':
        return 'Video';
      case 'article':
        return 'Article';
      default:
        return 'Resource';
    }
  };
  
  const handleDownload = async () => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("user") !== null;
    
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "You need to be logged in to download resources.",
        variant: "destructive",
      });
      return;
    }
    
    // Mock user data - in a real application this would come from authentication
    const userData = {
      enrollmentNo: "GTU12345",
      phoneNumber: "9876543210",
      name: "Student Name"
    };
    
    // Use the downloadUrl if provided, otherwise construct one based on id
    const url = downloadUrl || `/api/resources/${id}/download`;
    const fileName = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${type === 'pdf' ? 'pdf' : type === 'video' ? 'mp4' : 'txt'}`;
    
    await downloadWithWatermark(url, fileName, userData);
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative h-40 w-full bg-gtu-gray-100">
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-gtu-blue/10 to-gtu-orange/10">
              <div className="text-4xl text-gtu-gray-400">{getIcon()}</div>
            </div>
          )}
          <Badge className="absolute top-2 right-2" variant="secondary">
            {getTypeLabel()}
          </Badge>
          {subject && (
            <Badge className="absolute top-2 left-2" variant="outline">
              {subject}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg line-clamp-2">
            <Link to={`/resources/${id}`} className="hover:text-gtu-blue transition-colors">
              {title}
            </Link>
          </h3>
          <div className="mt-1 flex-shrink-0">{getIcon()}</div>
        </div>
        <p className="mt-2 text-sm text-gtu-gray-500 line-clamp-2">{description}</p>
        <div className="mt-3 flex items-center text-xs text-gtu-gray-400">
          <span>{uploadedBy}</span>
          <span className="mx-1">•</span>
          <span>{uploadDate}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex space-x-3 text-sm text-gtu-gray-500">
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {likes}
          </span>
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {downloads}
          </span>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link to={`/resources/${id}`}>View</Link>
          </Button>
          <Button size="sm" onClick={handleDownload}>
            Download
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ResourceCard;
