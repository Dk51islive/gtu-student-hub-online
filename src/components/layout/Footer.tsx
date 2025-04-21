
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center">
              <span className="text-gtu-blue font-bold text-xl">GTU</span>
              <span className="text-gtu-orange font-bold text-xl">Hub</span>
            </Link>
            <p className="mt-4 text-sm text-gtu-gray-500">
              The ultimate platform for GTU students to connect, learn, and excel together.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gtu-gray-400 hover:text-gtu-blue">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gtu-gray-400 hover:text-gtu-blue">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gtu-gray-400 hover:text-gtu-blue">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gtu-gray-400 hover:text-gtu-blue">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gtu-gray-600 tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-gtu-gray-500 hover:text-gtu-blue text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gtu-gray-500 hover:text-gtu-blue text-sm">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gtu-gray-500 hover:text-gtu-blue text-sm">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gtu-gray-500 hover:text-gtu-blue text-sm">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/forum" className="text-gtu-gray-500 hover:text-gtu-blue text-sm">
                  Forum
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gtu-gray-600 tracking-wider uppercase">
              Support
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/faq" className="text-gtu-gray-500 hover:text-gtu-blue text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gtu-gray-500 hover:text-gtu-blue text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gtu-gray-500 hover:text-gtu-blue text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/feedback" className="text-gtu-gray-500 hover:text-gtu-blue text-sm">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gtu-gray-600 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/privacy" className="text-gtu-gray-500 hover:text-gtu-blue text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gtu-gray-500 hover:text-gtu-blue text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gtu-gray-500 hover:text-gtu-blue text-sm">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gtu-gray-400">
            &copy; {new Date().getFullYear()} GTUinsta. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

