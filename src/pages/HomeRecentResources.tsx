
import { Link } from "react-router-dom";
import ResourceCard from "@/components/ui/card-resource";

const recentResources = [
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
];

const HomeRecentResources = () => (
  <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gtu-gray-800 hover:text-gtu-blue transition-colors">
          Recent Study Resources
        </h2>
        <Link 
          to="/resources" 
          className="text-gtu-blue hover:text-gtu-blue/80 font-medium group flex items-center"
        >
          View All Resources
          <span className="ml-1 transform transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentResources.map((resource, index) => (
          <div
            key={resource.id}
            className="transform transition-all duration-500 hover:scale-[1.02]"
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <ResourceCard {...resource} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HomeRecentResources;
