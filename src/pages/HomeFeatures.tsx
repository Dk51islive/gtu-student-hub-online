
import { BookOpen, Calendar, MessageSquare, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

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

const HomeFeatures = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => { setIsVisible(true); }, []);

  return (
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
  );
};

export default HomeFeatures;
