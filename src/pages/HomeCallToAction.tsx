
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HomeCallToAction = () => (
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
);

export default HomeCallToAction;
