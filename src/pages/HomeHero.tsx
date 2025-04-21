
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HomeHero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
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
  );
};

export default HomeHero;
