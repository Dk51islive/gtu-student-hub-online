
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MessageSquare, ThumbsUp, CornerUpLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Dummy forum post data and replies
const getDummyForumPost = (id: string) => {
  const post = forumPostsData.find(post => post.id === id);
  return post || null;
}

const forumPostsData = [
  {
    id: "1",
    title: "Tips for preparing for GATE examination?",
    content: "I'm planning to appear for GATE next year and looking for effective preparation strategies. Any advice from those who have cleared it? I'm specifically interested in know how many hours I should dedicate daily, which reference books are the best for different subjects, and how to manage time between college work and GATE preparation.",
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
    content: "I'm confused about which electives to pick for the upcoming semester. Would appreciate recommendations based on job prospects. There are many options like Advanced Algorithms, Machine Learning, Cloud Computing, Data Mining, and IoT. I'm more inclined towards AI/ML but also want to keep my options open for cloud jobs.",
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
    content: "I'm working on a project related to AI for healthcare applications and looking for 1-2 team members with Python/ML experience. We'll be developing a model to predict early signs of certain diseases from medical imaging. Experience with TensorFlow or PyTorch would be great!",
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
    content: "Campus placements are starting soon, and I'm nervous. Can seniors share their experience and tips for technical and HR interviews? I'm applying for software developer roles and want to know what topics I should focus on, what kind of projects recruiters look for, and how to handle stress during interviews.",
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
    content: "I want to enhance my coding skills. Which programming languages are most in-demand in the industry right now? I'm currently comfortable with Java and basic Python, but wondering if I should invest time in JavaScript frameworks, Go, Rust, or something else entirely.",
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
    content: "How has your experience been with the newly implemented grading system? Do you think it's fair and transparent? I've noticed some inconsistencies in how projects are evaluated across different departments. Would love to hear others' thoughts on this.",
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

// Dummy replies data
const dummyReplies = [
  {
    id: "r1",
    postId: "1",
    author: {
      id: "user5",
      name: "Neha Gupta",
      avatarUrl: "https://i.pravatar.cc/150?img=5"
    },
    content: "I cleared GATE last year. My advice is to focus on the basics first, then move on to solving previous years' papers. I studied around 6 hours daily for 8 months. The standard textbooks like 'Made Easy' publications really helped.",
    createdAt: "1 day ago",
    likes: 12,
  },
  {
    id: "r2",
    postId: "1",
    author: {
      id: "user6",
      name: "Ravi Sharma",
      avatarUrl: "https://i.pravatar.cc/150?img=6"
    },
    content: "Online resources like NPTEL lectures are really good. Also, join a test series to get the exam feel. Time management is crucial during preparation - I used to allocate specific subjects to specific days of the week.",
    createdAt: "1 day ago",
    likes: 8,
  },
  {
    id: "r3",
    postId: "1",
    author: {
      id: "user3",
      name: "Amit Patel",
      avatarUrl: "https://i.pravatar.cc/150?img=3"
    },
    content: "Focus on your weak areas more. Personally, I struggled with Network Theory but giving it extra attention helped me score well. Don't neglect general aptitude section either, it's easy to score in.",
    createdAt: "2 days ago",
    likes: 5,
  },
];

const ForumPostView = () => {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [replies, setReplies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    // Simulate loading the post data
    setTimeout(() => {
      if (id) {
        const postData = getDummyForumPost(id);
        setPost(postData);
        
        // Get dummy replies for this post
        const postReplies = dummyReplies.filter(reply => reply.postId === id);
        setReplies(postReplies);
        
        setIsLoading(false);
      }
    }, 500);
  }, [id]);

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyText.trim()) {
      // In a real app, this would save to a database
      const newReply = {
        id: `r${Date.now()}`,
        postId: id as string,
        author: {
          id: "currentUser",
          name: "Current User",
          avatarUrl: "https://i.pravatar.cc/150?img=8"
        },
        content: replyText,
        createdAt: "Just now",
        likes: 0,
      };
      
      setReplies([newReply, ...replies]);
      setReplyText("");
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!post) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Discussion Not Found</h2>
          <p className="mb-6">The discussion you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/forum">Back to Forum</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/forum" className="flex items-center text-gtu-blue hover:underline mb-4">
            <CornerUpLeft className="mr-2 h-4 w-4" />
            Back to Forum
          </Link>
          
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Link to={`/profile/${post.author.id}`}>
                  <Avatar>
                    <AvatarImage src={post.author.avatarUrl} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link to={`/profile/${post.author.id}`} className="font-medium hover:text-gtu-blue">
                    {post.author.name}
                  </Link>
                  <div className="text-sm text-gray-500">{post.createdAt}</div>
                </div>
              </div>
              
              <div className="mb-4 flex flex-wrap gap-2">
                <Badge variant="outline">{post.category}</Badge>
                {post.solved && (
                  <Badge className="bg-green-500 hover:bg-green-600">Solved</Badge>
                )}
                {post.tags.map((tag: string) => (
                  <Link
                    key={tag}
                    to={`/forum/tag/${tag}`}
                    className="inline-block rounded-full bg-gtu-gray-100 px-2 py-0.5 text-xs text-gtu-gray-600 hover:bg-gtu-blue/10 hover:text-gtu-blue"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
              
              <h1 className="text-2xl font-bold mb-3">{post.title}</h1>
              <p className="text-gray-700 whitespace-pre-line mb-4">{post.content}</p>
              
              <div className="flex items-center gap-6">
                <button className="flex items-center text-gray-500 hover:text-gtu-blue">
                  <ThumbsUp className="h-5 w-5 mr-1" />
                  <span>{post.likes}</span>
                </button>
                <div className="flex items-center text-gray-500">
                  <MessageSquare className="h-5 w-5 mr-1" />
                  <span>{post.replies} replies</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Post a Reply</h2>
            <form onSubmit={handleSubmitReply}>
              <div className="mb-3">
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gtu-blue focus:border-transparent resize-y min-h-[120px]"
                  placeholder="Share your thoughts or answer..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                ></textarea>
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={!replyText.trim()}>
                  Submit Reply
                </Button>
              </div>
            </form>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-4">Replies ({replies.length})</h2>
            {replies.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No replies yet. Be the first to reply!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {replies.map((reply) => (
                  <Card key={reply.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={reply.author.avatarUrl} />
                          <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <Link to={`/profile/${reply.author.id}`} className="font-medium hover:text-gtu-blue">
                              {reply.author.name}
                            </Link>
                            <span className="text-xs text-gray-500">{reply.createdAt}</span>
                          </div>
                          <p className="text-gray-700">{reply.content}</p>
                          <div className="mt-2 flex items-center">
                            <button className="flex items-center text-gray-500 hover:text-gtu-blue text-sm">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              <span>{reply.likes}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ForumPostView;
