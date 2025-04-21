
import { Link } from "react-router-dom";
import EventCard from "@/components/ui/card-event";

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

const HomeUpcomingEvents = () => (
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
);

export default HomeUpcomingEvents;
