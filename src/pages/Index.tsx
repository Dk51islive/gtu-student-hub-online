import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Calendar, MessageSquare, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/MainLayout";
import ResourceCard from "@/components/ui/card-resource";
import EventCard from "@/components/ui/card-event";
import ForumPostCard from "@/components/ui/card-forum-post";

// Mock data for presentation purposes
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

const upcomingEvents = [
  {
    id: "1",
    title: "Tech Fest 2023",
    date: "May 15, 2023",
    time: "10:00 AM - 5:00 PM",
    location: "GTU Main Campus, Auditorium",
    description: "Annual technology festival showcasing student projects, workshops, and competitions.",
    category: "Festival",
    attendees: 120,
    maxAttendees: 200,
    thumbnailUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "2",
    title: "Workshop on Web Development",
    date: "May 20, 2023",
    time: "2:00 PM - 5:00 PM",
    location: "Computer Science Building, Room 302",
    description: "Hands-on workshop on modern web development techniques using React and Node.js.",
    category: "Workshop",
    attendees: 45,
    maxAttendees: 50,
  },
];

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

const features = [
  {
    icon: <BookOpen className="h-10 w-10 text-gtu-blue" />,
    title: "Study Resources",
    description: "Access a vast library of study materials, notes, previous year papers, and video tutorials.",
    link: "/resources",
  },
  {
    icon: <Calendar className="h-10 w-10 text-gtu-orange" />,
    title: "Events & Workshops",
    description: "Stay updated with campus events, workshops, seminars, and tech fests happening at GTU.",
    link: "/events",
  },
  {
    icon: <Users className="h-10 w-10 text-gtu-blue" />,
    title: "Student Community",
    description: "Connect with fellow students, form study groups, and collaborate on projects and assignments.",
    link: "/community",
  },
  {
    icon: <MessageSquare className="h-10 w-10 text-gtu-orange" />,
    title: "Discussion Forum",
    description: "Ask questions, share knowledge, and participate in academic discussions with peers and faculty.",
    link: "/forum",
  },
];

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <MainLayout>
      {/* Enhanced Hero Section with Animation */}
      <section className="bg-gradient-to-r from-gtu-blue to-blue-700 text-white overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                Welcome to GTU Student Hub
              </h1>
              <p className="text-lg md:text-xl mb-8 text-blue-100 leading-relaxed">
                Your one-stop platform for academic resources, community engagement, 
                and campus updates. Connect, learn, and excel together!
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  asChild 
                  className="bg-white text-gtu-blue hover:bg-blue-50 transform transition hover:scale-105"
                >
                  <Link to="/resources">Explore Resources</Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  asChild 
                  className="border-white text-white hover:bg-white/10 transform transition hover:scale-105"
                >
                  <Link to="/signup">Join Community</Link>
                </Button>
              </div>
            </div>
            <div className={`hidden md:block transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                alt="Students studying together"
                className="rounded-lg shadow-2xl max-w-md w-full hover:shadow-blue-500/20 transition-shadow duration-300 transform hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 transform transition-all duration-700 hover:scale-[1.01]">
            <h2 className="text-3xl font-bold text-gtu-gray-800 mb-4">
              What We Offer
            </h2>
            <p className="text-lg text-gtu-gray-600 max-w-2xl mx-auto">
              Discover all the tools and resources we provide to help you succeed in your academic journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:border-gtu-blue/20 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 transform transition-all duration-300 hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gtu-gray-600 mb-4">{feature.description}</p>
                <Link 
                  to={feature.link} 
                  className="text-gtu-blue hover:text-gtu-blue/80 font-medium inline-flex items-center group"
                >
                  Explore
                  <svg 
                    className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Recent Resources Section */}
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

      {/* Upcoming Events Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gtu-gray-800">Upcoming Events</h2>
            <Link to="/events" className="text-gtu-blue hover:underline font-medium">
              View All Events
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Discussions Section */}
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

      {/* Enhanced Call to Action */}
      <section className="py-16 bg-gtu-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-blue-800/50"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-4 transform transition-all duration-700 hover:scale-105">
            Join the GTU Student Community
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Connect with fellow students, access exclusive resources, and stay updated with campus happenings.
          </p>
          <Button 
            size="lg" 
            asChild 
            className="bg-white text-gtu-blue hover:bg-blue-50 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <Link to="/signup">Create an Account</Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
