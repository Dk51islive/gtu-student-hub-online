
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import ResourceCard from "@/components/ui/card-resource";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for resources
const resourcesData = [
  {
    id: "1",
    title: "Computer Networks Notes - Unit 1",
    type: "pdf" as const,
    subject: "Computer Networks",
    description: "Comprehensive notes on Computer Networks Unit 1 including OSI model, TCP/IP protocols, and networking basics.",
    uploadedBy: "Prof. Sharma",
    uploadDate: "3 days ago",
    likes: 45,
    downloads: 120,
  },
  {
    id: "2",
    title: "Data Structures Tutorial - Arrays and Linked Lists",
    type: "video" as const,
    subject: "Data Structures",
    description: "Video tutorial explaining arrays, linked lists, and their operations with practical examples.",
    uploadedBy: "Dr. Patel",
    uploadDate: "1 week ago",
    likes: 78,
    downloads: 200,
  },
  {
    id: "3",
    title: "Machine Learning Algorithms Explained",
    type: "article" as const,
    subject: "AI & ML",
    description: "Detailed explanation of common machine learning algorithms with implementation examples in Python.",
    uploadedBy: "Tech Club",
    uploadDate: "2 weeks ago",
    likes: 120,
    downloads: 320,
  },
  {
    id: "4",
    title: "Database Management Systems - SQL Basics",
    type: "pdf" as const,
    subject: "DBMS",
    description: "Introduction to SQL queries, database design principles, and normalization techniques.",
    uploadedBy: "Prof. Desai",
    uploadDate: "1 month ago",
    likes: 95,
    downloads: 250,
  },
  {
    id: "5",
    title: "Web Development with React.js",
    type: "video" as const,
    subject: "Web Development",
    description: "Tutorial series on building modern web applications using React.js and related technologies.",
    uploadedBy: "Coding Club",
    uploadDate: "2 months ago",
    likes: 150,
    downloads: 400,
  },
  {
    id: "6",
    title: "Operating Systems - Process Management",
    type: "pdf" as const,
    subject: "Operating Systems",
    description: "Detailed notes on process management, scheduling algorithms, and deadlock handling in operating systems.",
    uploadedBy: "Prof. Kumar",
    uploadDate: "3 months ago",
    likes: 85,
    downloads: 180,
  },
];

const subjectOptions = [
  "All Subjects",
  "Computer Networks",
  "Data Structures",
  "AI & ML",
  "DBMS",
  "Web Development",
  "Operating Systems",
];

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [selectedType, setSelectedType] = useState("all");

  // Filter resources based on search, subject, and type
  const filteredResources = resourcesData.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSubject = selectedSubject === "All Subjects" || resource.subject === selectedSubject;
    
    const matchesType = selectedType === "all" || resource.type === selectedType;
    
    return matchesSearch && matchesSubject && matchesType;
  });

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gtu-gray-800">Study Resources</h1>
          <p className="text-gtu-gray-600 mt-2">
            Browse and download study materials, notes, video tutorials, and more to ace your exams.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1 md:col-span-3">
              <Input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjectOptions.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Tabs value={selectedType} onValueChange={setSelectedType} className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1">All Types</TabsTrigger>
                  <TabsTrigger value="pdf" className="flex-1">PDFs</TabsTrigger>
                  <TabsTrigger value="video" className="flex-1">Videos</TabsTrigger>
                  <TabsTrigger value="article" className="flex-1">Articles</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="md:text-right">
              <Button>
                Upload Resource
              </Button>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} {...resource} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gtu-gray-700 mb-2">No resources found</h3>
            <p className="text-gtu-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Resources;
