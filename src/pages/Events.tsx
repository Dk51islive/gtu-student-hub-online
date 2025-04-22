import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import EventCard from "@/components/ui/card-event";
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
import { PlusCircle, Search } from "lucide-react";
import EventSubmissionForm from "@/components/forms/EventSubmissionForm";
import { useToast } from "@/hooks/use-toast";

const eventsData = [
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
  {
    id: "3",
    title: "Guest Lecture: Future of AI",
    date: "May 25, 2023",
    time: "11:00 AM - 1:00 PM",
    location: "Virtual Event (Zoom)",
    description: "Distinguished lecture by industry experts on artificial intelligence and its impact on future technologies.",
    category: "Lecture",
    attendees: 80,
    maxAttendees: 200,
  },
  {
    id: "4",
    title: "Hackathon: Solve for GTU",
    date: "June 5-6, 2023",
    time: "9:00 AM - 9:00 PM",
    location: "Innovation Center, GTU",
    description: "48-hour hackathon to develop innovative solutions for campus problems. Prizes worth ₹50,000.",
    category: "Competition",
    attendees: 75,
    maxAttendees: 100,
    thumbnailUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "5",
    title: "Career Fair 2023",
    date: "June 15, 2023",
    time: "10:00 AM - 4:00 PM",
    location: "GTU Convention Center",
    description: "Annual career fair with leading companies offering internships and full-time positions to GTU students.",
    category: "Career",
    attendees: 300,
    maxAttendees: 500,
  },
  {
    id: "6",
    title: "Workshop on Machine Learning",
    date: "June 22, 2023",
    time: "2:00 PM - 5:00 PM",
    location: "Computer Lab 4, IT Building",
    description: "Hands-on workshop on implementing machine learning algorithms using Python and TensorFlow.",
    category: "Workshop",
    attendees: 40,
    maxAttendees: 40,
    isRegistered: true,
  },
];

const categoryOptions = [
  "All Categories",
  "Workshop",
  "Lecture",
  "Festival",
  "Competition",
  "Career",
  "Cultural",
];

const Events = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [eventView, setEventView] = useState("all");
  const [isSubmitFormOpen, setIsSubmitFormOpen] = useState(false);

  const filteredEvents = eventsData.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        event.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "All Categories" || event.category === selectedCategory;
    
    const matchesView = eventView === "all" || 
                      (eventView === "registered" && event.isRegistered) ||
                      (eventView === "available" && !event.isRegistered && event.attendees < (event.maxAttendees || Infinity));
    
    return matchesSearch && matchesCategory && matchesView;
  });

  const handleSubmitEvent = () => {
    const isLoggedIn = localStorage.getItem("user") !== null;
    
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "You need to be logged in to submit events.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitFormOpen(true);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="relative bg-gradient 
          to-gtu-blue/10 from-gtu-orange/10 rounded-2xl p-8 mb-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-gtu-gray-800 mb-4">
              Campus Events
            </h1>
            <p className="text-gtu-gray-600 text-lg">
              Discover workshops, seminars, competitions, and other exciting events happening at GTU.
              Join us to learn, connect, and grow together.
            </p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <div className="md:col-span-5">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gtu-gray-400" />
                <Input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="md:col-span-3">
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
            <div className="md:col-span-4 flex justify-end">
              <Button className="w-full md:w-auto" size="lg" onClick={handleSubmitEvent}>
                <PlusCircle className="mr-2 h-5 w-5" />
                Submit Event
              </Button>
            </div>
          </div>

          <div className="mt-6">
            <Tabs value={eventView} onValueChange={setEventView} className="w-full">
              <TabsList className="w-full max-w-md mx-auto grid grid-cols-3">
                <TabsTrigger value="all">All Events</TabsTrigger>
                <TabsTrigger value="registered">Registered</TabsTrigger>
                <TabsTrigger value="available">Available</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredEvents.map((event) => (
              <div key={event.id} className="transform transition-all duration-300 hover:scale-105">
                <EventCard {...event} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-gtu-gray-700 mb-2">
              No events found
            </h3>
            <p className="text-gtu-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        )}

        <EventSubmissionForm 
          isOpen={isSubmitFormOpen}
          onClose={() => setIsSubmitFormOpen(false)}
        />
      </div>
    </MainLayout>
  );
};

export default Events;
