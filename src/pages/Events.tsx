
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

// Mock data for events
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [eventView, setEventView] = useState("all");

  // Filter events based on search, category, and view
  const filteredEvents = eventsData.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        event.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "All Categories" || event.category === selectedCategory;
    
    const matchesView = eventView === "all" || 
                      (eventView === "registered" && event.isRegistered) ||
                      (eventView === "available" && !event.isRegistered && event.attendees < (event.maxAttendees || Infinity));
    
    return matchesSearch && matchesCategory && matchesView;
  });

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gtu-gray-800">Campus Events</h1>
          <p className="text-gtu-gray-600 mt-2">
            Discover workshops, seminars, competitions, and other events happening at GTU.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1 md:col-span-3">
              <Input
                type="text"
                placeholder="Search events..."
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
            <div>
              <Tabs value={eventView} onValueChange={setEventView} className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1">All Events</TabsTrigger>
                  <TabsTrigger value="registered" className="flex-1">Registered</TabsTrigger>
                  <TabsTrigger value="available" className="flex-1">Available</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="md:text-right">
              <Button>
                Submit Event
              </Button>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gtu-gray-700 mb-2">No events found</h3>
            <p className="text-gtu-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Events;
