
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Book, Calendar, Users } from "lucide-react";

const Dashboard = () => {
  const studyResources = [
    { name: "Computer Networks Notes - Unit 1", type: "PDF" },
    { name: "Data Structures Tutorial", type: "Video" },
    { name: "Machine Learning Algorithms", type: "Article" }
  ];

  const events = [
    { name: "Technical Workshop", date: "2025-05-01", type: "Workshop" },
    { name: "Coding Competition", date: "2025-05-15", type: "Competition" }
  ];

  const communities = [
    { name: "Programming Club", members: 45 },
    { name: "Robotics Society", members: 32 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Welcome to GTUHub</h1>
        <Button>Upload Resource</Button>
      </div>

      <div className="relative">
        <Input
          type="search"
          placeholder="Search resources..."
          className="w-full bg-white"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xl font-medium">Study Resources</CardTitle>
            <Book className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              {studyResources.map((resource) => (
                <div key={resource.name} className="flex items-center justify-between">
                  <span className="font-medium">{resource.name}</span>
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {resource.type}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xl font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.name} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{event.name}</p>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </div>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                    {event.type}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xl font-medium">Communities</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              {communities.map((community) => (
                <div key={community.name} className="flex items-center justify-between">
                  <span className="font-medium">{community.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {community.members} members
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Copyright Protection</CardTitle>
          <CardDescription>
            All downloaded resources are watermarked with your enrollment number and phone number for copyright protection. 
            Do not share the downloaded materials to protect your personal information.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Dashboard;
