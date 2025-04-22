import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Book, Calendar, Medal, Laptop, Coffee } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for student groups
const studentGroupsData = [
  {
    id: "1",
    name: "Coding Club",
    description: "A community of coding enthusiasts who share knowledge, conduct workshops, and participate in competitions.",
    members: 120,
    category: "Technical",
    tags: ["Programming", "Hackathons", "Development"],
    image: "https://images.unsplash.com/photo-1552308995-2baac1ad5490?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "2",
    name: "AI Research Group",
    description: "Students exploring artificial intelligence, machine learning, and data science through projects and research.",
    members: 85,
    category: "Technical",
    tags: ["AI", "Machine Learning", "Data Science"],
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "3",
    name: "Literary Society",
    description: "For literature lovers to discuss books, poetry, and creative writing. We organize literary events and competitions.",
    members: 60,
    category: "Cultural",
    tags: ["Literature", "Poetry", "Creative Writing"],
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "4",
    name: "Photography Club",
    description: "Exploring the art of photography through workshops, photo walks, and exhibitions.",
    members: 75,
    category: "Cultural",
    tags: ["Photography", "Visual Arts", "Exhibitions"],
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "5",
    name: "Sports Club",
    description: "For sports enthusiasts to connect, practice, and participate in various sports competitions.",
    members: 150,
    category: "Sports",
    tags: ["Cricket", "Football", "Athletics"],
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "6",
    name: "Entrepreneurship Cell",
    description: "Fostering entrepreneurial spirit through mentorship, workshops, and startup competitions.",
    members: 95,
    category: "Professional",
    tags: ["Startups", "Business", "Innovation"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
  },
];

// Mock data for student ambassadors
const studentAmbassadorsData = [
  {
    id: "1",
    name: "Vikram Singh",
    role: "Technical Ambassador",
    department: "Computer Engineering",
    year: "4th Year",
    bio: "Passionate about open source and web development. Organizing coding competitions and workshops.",
    avatarUrl: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: "2",
    name: "Ananya Sharma",
    role: "Cultural Ambassador",
    department: "Electronics & Communication",
    year: "3rd Year",
    bio: "Arts enthusiast organizing cultural events and performances. Also leads the college drama team.",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: "3",
    name: "Rohan Patel",
    role: "Sports Ambassador",
    department: "Mechanical Engineering",
    year: "4th Year",
    bio: "State-level football player who manages sports events and tournaments for GTU.",
    avatarUrl: "https://i.pravatar.cc/150?img=13",
  },
  {
    id: "4",
    name: "Priya Desai",
    role: "Academic Ambassador",
    department: "Information Technology",
    year: "3rd Year",
    bio: "Dean's list student who coordinates study groups and academic support initiatives.",
    avatarUrl: "https://i.pravatar.cc/150?img=14",
  },
];

// Mock data for study groups
const studyGroupsData = [
  {
    id: "1",
    subject: "Advanced Algorithms",
    schedule: "Tuesdays & Thursdays, 4-6 PM",
    location: "Computer Lab 3",
    members: 12,
    maxMembers: 15,
    leader: "Dr. Patel & Ankit Sharma",
  },
  {
    id: "2",
    subject: "Machine Learning Fundamentals",
    schedule: "Mondays & Wednesdays, 5-7 PM",
    location: "AI Lab",
    members: 15,
    maxMembers: 15,
    leader: "Prof. Gupta & Neha Verma",
  },
  {
    id: "3",
    subject: "Web Development with MERN Stack",
    schedule: "Saturdays, 10 AM-1 PM",
    location: "Innovation Center",
    members: 10,
    maxMembers: 20,
    leader: "Rohan Mehta (Alumni)",
  },
  {
    id: "4",
    subject: "Competitive Programming",
    schedule: "Fridays, 4-7 PM",
    location: "Online (Discord)",
    members: 25,
    maxMembers: 30,
    leader: "Coding Club Team",
  },
];

const categoryOptions = [
  "All Categories",
  "Technical",
  "Cultural",
  "Sports",
  "Professional",
  "Academic",
];

const Community = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [activeTab, setActiveTab] = useState("groups");

  // Filter student groups
  const filteredGroups = studentGroupsData.filter((group) => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        group.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All Categories" || group.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Filter student ambassadors (basic search only)
  const filteredAmbassadors = studentAmbassadorsData.filter((ambassador) => {
    return ambassador.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           ambassador.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
           ambassador.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
           ambassador.bio.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Filter study groups (basic search only)
  const filteredStudyGroups = studyGroupsData.filter((group) => {
    return group.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
           group.leader.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Render student group card
  const renderStudentGroupCard = (group) => (
    <Card key={group.id} className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-40 w-full">
        {group.image ? (
          <img
            src={group.image}
            alt={group.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-r from-gtu-blue/10 to-gtu-orange/10 flex items-center justify-center">
            <Users className="h-16 w-16 text-gtu-gray-300" />
          </div>
        )}
        <Badge className="absolute top-2 right-2" variant="secondary">
          {group.category}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">{group.name}</h3>
        <p className="text-gtu-gray-600 text-sm mb-4 line-clamp-2">{group.description}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {group.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-gtu-gray-100 px-2 py-0.5 rounded-full text-xs text-gtu-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center text-sm text-gtu-gray-500">
          <Users className="h-4 w-4 mr-1" />
          <span>{group.members} members</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" className="w-full" asChild>
          <Link to={`/community/groups/${group.id}/join`}>Join Group</Link>
        </Button>
      </CardFooter>
    </Card>
  );

  // Render student ambassador card
  const renderAmbassadorCard = (ambassador) => (
    <Card key={ambassador.id} className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-6 text-center">
        <Avatar className="w-20 h-20 mx-auto mb-4">
          <AvatarImage src={ambassador.avatarUrl} />
          <AvatarFallback>{ambassador.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h3 className="text-lg font-semibold">{ambassador.name}</h3>
        <Badge className="mt-2 mb-2">{ambassador.role}</Badge>
        <p className="text-sm text-gtu-gray-500 mb-2">
          {ambassador.department}, {ambassador.year}
        </p>
        <p className="text-sm text-gtu-gray-600 mb-4">{ambassador.bio}</p>
        <Button variant="outline" size="sm">
          Contact
        </Button>
      </CardContent>
    </Card>
  );

  // Render study group card
  const renderStudyGroupCard = (group) => (
    <Card key={group.id} className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-3">{group.subject}</h3>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gtu-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-gtu-gray-400" />
            <span>{group.schedule}</span>
          </div>
          <div className="flex items-center text-sm text-gtu-gray-600">
            <Book className="h-4 w-4 mr-2 text-gtu-gray-400" />
            <span>{group.location}</span>
          </div>
          <div className="flex items-center text-sm text-gtu-gray-600">
            <Medal className="h-4 w-4 mr-2 text-gtu-gray-400" />
            <span>Led by: {group.leader}</span>
          </div>
          <div className="flex items-center text-sm text-gtu-gray-600">
            <Users className="h-4 w-4 mr-2 text-gtu-gray-400" />
            <span>{group.members}/{group.maxMembers} members</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          variant={group.members >= group.maxMembers ? "outline" : "default"}
          className="w-full"
          disabled={group.members >= group.maxMembers}
        >
          {group.members >= group.maxMembers ? "Group Full" : "Join Group"}
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gtu-gray-800">Student Community</h1>
          <p className="text-gtu-gray-600 mt-2">
            Connect with fellow students, join groups, and participate in campus activities.
          </p>
        </div>

        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full mb-8"
        >
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="groups" className="flex items-center">
              <Users className="mr-2 h-4 w-4" /> Student Groups
            </TabsTrigger>
            <TabsTrigger value="ambassadors" className="flex items-center">
              <Medal className="mr-2 h-4 w-4" /> Student Ambassadors
            </TabsTrigger>
            <TabsTrigger value="study" className="flex items-center">
              <Book className="mr-2 h-4 w-4" /> Study Groups
            </TabsTrigger>
          </TabsList>

          <div className="bg-white shadow-sm rounded-lg p-6 my-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
              {activeTab === "groups" && (
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-gtu-blue focus:ring-gtu-blue"
                >
                  {categoryOptions.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              )}
              <div className="md:col-span-2 md:text-right mt-4 md:mt-0">
                <Button asChild>
                  <Link to="/community/groups/new">
                    {activeTab === "groups" ? "Create New Group" : 
                    activeTab === "study" ? "Start Study Group" : 
                    "Apply for Ambassador Program"}
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <TabsContent value="groups" className="border-none p-0">
            {filteredGroups.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGroups.map(renderStudentGroupCard)}
              </div>
            ) : (
              <div className="text-center py-16">
                <Users className="h-16 w-16 text-gtu-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gtu-gray-700 mb-2">No student groups found</h3>
                <p className="text-gtu-gray-500">Try adjusting your search or create a new group</p>
                <Button asChild className="mt-4">
                  <Link to="/community/groups/new">
                    Create New Group
                  </Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="ambassadors" className="border-none p-0">
            {filteredAmbassadors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredAmbassadors.map(renderAmbassadorCard)}
              </div>
            ) : (
              <div className="text-center py-16">
                <Medal className="h-16 w-16 text-gtu-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gtu-gray-700 mb-2">No ambassadors found</h3>
                <p className="text-gtu-gray-500">Try adjusting your search criteria</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="study" className="border-none p-0">
            {filteredStudyGroups.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStudyGroups.map(renderStudyGroupCard)}
              </div>
            ) : (
              <div className="text-center py-16">
                <Book className="h-16 w-16 text-gtu-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gtu-gray-700 mb-2">No study groups found</h3>
                <p className="text-gtu-gray-500">Try adjusting your search or start a new study group</p>
                <Button asChild className="mt-4">
                  <Link to="/community/groups/new">
                    Start Study Group
                  </Link>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <section className="mt-12 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gtu-gray-800 mb-6">Get Involved in Campus Life</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-gtu-blue/10 p-4 rounded-full mb-4">
                <Laptop className="h-12 w-12 text-gtu-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Technical Activities</h3>
              <p className="text-gtu-gray-600">
                Join hackathons, coding contests, workshops, and technical clubs to enhance your skills.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-gtu-orange/10 p-4 rounded-full mb-4">
                <Coffee className="h-12 w-12 text-gtu-orange" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Social Events</h3>
              <p className="text-gtu-gray-600">
                Participate in cultural festivals, social gatherings, and campus celebrations.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <Users className="h-12 w-12 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Leadership Opportunities</h3>
              <p className="text-gtu-gray-600">
                Develop leadership skills by organizing events, leading clubs, or becoming a student ambassador.
              </p>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Community;
