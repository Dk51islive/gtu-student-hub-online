
import PageTemplate from "@/components/layout/PageTemplate";
import { Info, BookOpen, FileText, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";

const HelpCenter = () => {
  const categories = [
    {
      title: "Getting Started",
      description: "New to GTUinsta? Learn the basics and get started.",
      icon: <BookOpen className="h-6 w-6" />,
      links: [
        { title: "Creating Your Account", path: "/help/account-creation" },
        { title: "Setting Up Your Profile", path: "/help/profile-setup" },
        { title: "Navigating the Platform", path: "/help/navigation" },
        { title: "Finding Resources", path: "/help/finding-resources" },
      ]
    },
    {
      title: "Using Resources",
      description: "Learn how to access, download, and contribute study materials.",
      icon: <FileText className="h-6 w-6" />,
      links: [
        { title: "Downloading Study Materials", path: "/help/downloading" },
        { title: "Uploading Your Content", path: "/help/uploading" },
        { title: "Resource Ratings & Reviews", path: "/help/ratings" },
        { title: "Bookmark & Collections", path: "/help/bookmarks" },
      ]
    },
    {
      title: "Community & Networking",
      description: "Connect with peers, join groups, and participate in discussions.",
      icon: <Link2 className="h-6 w-6" />,
      links: [
        { title: "Joining Study Groups", path: "/help/study-groups" },
        { title: "Forum Participation", path: "/help/forum" },
        { title: "Messaging Other Users", path: "/help/messaging" },
        { title: "Creating Events", path: "/help/events" },
      ]
    }
  ];

  return (
    <PageTemplate 
      title="Help Center" 
      subtitle="Find comprehensive guides and answers to help you use GTUinsta effectively"
      icon={<Info />}
    >
      <div className="mb-8 text-center">
        <h2 className="text-xl font-semibold mb-2">How can we help you today?</h2>
        <p className="text-gtu-gray-600">Browse through our help categories or search for specific topics</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {categories.map((category, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{category.title}</CardTitle>
                <div className="text-gtu-blue">{category.icon}</div>
              </div>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {category.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.path} 
                      className="text-gtu-blue hover:underline flex items-center"
                    >
                      <span className="mr-2">•</span>
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="bg-gtu-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Can't find what you're looking for?</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <Button asChild variant="outline">
            <Link to="/faq">Visit our FAQ</Link>
          </Button>
          <Button asChild>
            <Link to="/contact">Contact Support Team</Link>
          </Button>
        </div>
      </div>
    </PageTemplate>
  );
};

export default HelpCenter;
