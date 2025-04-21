
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ForumPostCard from "@/components/ui/card-forum-post";

const trendingDiscussions = [
  {
    id: "1",
    title: "Tips for preparing for GATE examination?",
    content: "I'm planning to appear for GATE next year and looking for effective preparation strategies. Any advice from those who have cleared it?",
    author: {
      id: "user1",
      name: "Rahul Kumar",
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
    },
    category: "Academics",
    createdAt: "1 day ago",
    likes: 18,
    replies: 22,
    solved: true,
    tags: ["Electives", "ComputerEngineering", "Curriculum"],
  },
];

const HomeTrendingDiscussions = () => (
  <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gtu-gray-800">Trending Discussions</h2>
        <Link to="/forum" className="text-gtu-blue hover:underline font-medium">
          View All Discussions
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {trendingDiscussions.map((post) => (
          <ForumPostCard key={post.id} {...post} />
        ))}
      </div>
      <div className="text-center mt-8">
        <Button asChild>
          <Link to="/forum/new">Start a Discussion</Link>
        </Button>
      </div>
    </div>
  </section>
);

export default HomeTrendingDiscussions;
