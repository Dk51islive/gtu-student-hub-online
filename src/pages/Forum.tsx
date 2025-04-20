
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import ForumPostCard from "@/components/ui/card-forum-post";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for forum posts
const forumPostsData = [
  {
    id: "1",
    title: "Tips for preparing for GATE examination?",
    content: "I'm planning to appear for GATE next year and looking for effective preparation strategies. Any advice from those who have cleared it?",
    author: {
      id: "user1",
      name: "Rahul Kumar",
      avatarUrl: "https://i.pravatar.cc/150?img=1"
    },
    category: "Examinations",
    createdAt: "2 days ago",
    likes: 24,
    replies: 15,
    tags: ["GATE", "Preparation", "Engineering"],
  },
  {
    id: "2",
    title: "Which electives should I choose for the 7th semester of Computer Engineering?",
    content: "I'm confused about which electives to pick for the upcoming semester. Would appreciate recommendations based on job prospects.",
    author: {
      id: "user2",
      name: "Priya Shah",
      avatarUrl: "https://i.pravatar.cc/150?img=2"
    },
    category: "Academics",
    createdAt: "1 day ago",
    likes: 18,
    replies: 22,
    solved: true,
    tags: ["Electives", "ComputerEngineering", "Curriculum"],
  },
  {
    id: "3",
    title: "Looking for project partners for final year project in AI",
    content: "I'm working on a project related to AI for healthcare applications and looking for 1-2 team members with Python/ML experience.",
    author: {
      id: "user3",
      name: "Amit Patel",
      avatarUrl: "https://i.pravatar.cc/150?img=3"
    },
    category: "Projects",
    createdAt: "3 days ago",
    likes: 10,
    replies: 8,
    tags: ["AI", "FinalYearProject", "TeamFormation"],
  },
  {
    id: "4",
    title: "How to prepare for campus placements starting next month?",
    content: "Campus placements are starting soon, and I'm nervous. Can seniors share their experience and tips for technical and HR interviews?",
    author: {
      id: "user4",
      name: "Deepak Verma",
      avatarUrl: "https://i.pravatar.cc/150?img=4"
    },
    category: "Placements",
    createdAt: "4 days ago",
    likes: 45,
    replies: 30,
    tags: ["Placements", "Interviews", "JobPreparation"],
  },
  {
    id: "5",
    title: "Best programming languages to learn in 2023 for better job prospects",
    content: "I want to enhance my coding skills. Which programming languages are most in-demand in the industry right now?",
    author: {
      id: "user5",
      name: "Neha Gupta",
      avatarUrl: "https://i.pravatar.cc/150?img=5"
    },
    category: "Career",
    createdAt: "5 days ago",
    likes: 32,
    replies: 25,
    tags: ["Programming", "CareerAdvice", "Skills"],
  },
  {
    id: "6",
    title: "Experiences with GTU's new grading system?",
    content: "How has your experience been with the newly implemented grading system? Do you think it's fair and transparent?",
    author: {
      id: "user6",
      name: "Ravi Sharma",
      avatarUrl: "https://i.pravatar.cc/150?img=6"
    },
    category: "Academics",
    createdAt: "1 week ago",
    likes: 27,
    replies: 40,
    solved: true,
    tags: ["GradingSystem", "GTU", "AcademicPolicy"],
  },
];

const categoryOptions = [
  "All Categories",
  "Academics",
  "Examinations",
  "Placements",
  "Projects",
  "Career",
  "Campus Life",
];

const sortOptions = [
  { value: "recent", label: "Most Recent" },
  { value: "popular", label: "Most Popular" },
  { value: "replied", label: "Most Replied" },
];

const Forum = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [postFilter, setPostFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  // Filter posts based on search, category, and filter
  const filteredPosts = forumPostsData.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All Categories" || post.category === selectedCategory;
    
    const matchesFilter = postFilter === "all" || 
                      (postFilter === "solved" && post.solved) ||
                      (postFilter === "unsolved" && !post.solved);
    
    return matchesSearch && matchesCategory && matchesFilter;
  });

  // Sort posts based on sortBy
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === "recent") {
      // Simple sort by createdAt (this is a mock, in real app would use timestamps)
      return 0; // No sorting in mock data
    } else if (sortBy === "popular") {
      return b.likes - a.likes;
    } else if (sortBy === "replied") {
      return b.replies - a.replies;
    }
    return 0;
  });

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gtu-gray-800">Discussion Forum</h1>
          <p className="text-gtu-gray-600 mt-2">
            Join conversations, ask questions, and share knowledge with other GTU students.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1 md:col-span-3">
              <Input
                type="text"
                placeholder="Search discussions or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <div className="w-1/2">
                <Tabs value={postFilter} onValueChange={setPostFilter} className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                    <TabsTrigger value="solved" className="flex-1">Solved</TabsTrigger>
                    <TabsTrigger value="unsolved" className="flex-1">Unsolved</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="w-1/2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="md:text-right">
              <Button>
                Start New Discussion
              </Button>
            </div>
          </div>
        </div>

        {/* Forum Posts List */}
        {sortedPosts.length > 0 ? (
          <div className="space-y-4">
            {sortedPosts.map((post) => (
              <ForumPostCard key={post.id} {...post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gtu-gray-700 mb-2">No discussions found</h3>
            <p className="text-gtu-gray-500">Try adjusting your search or filters</p>
            <Button className="mt-4">
              Start a New Discussion
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Forum;
