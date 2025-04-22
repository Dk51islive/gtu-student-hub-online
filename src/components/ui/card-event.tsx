
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export interface EventCardProps {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category?: string;
  attendees?: number;
  maxAttendees?: number;
  thumbnailUrl?: string;
  isRegistered?: boolean;
}

const EventCard = ({
  id,
  title,
  date,
  time,
  location,
  description,
  category,
  attendees = 0,
  maxAttendees,
  thumbnailUrl,
  isRegistered = false,
}: EventCardProps) => {
  const isFullyBooked = maxAttendees !== undefined && attendees >= maxAttendees;

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full bg-gtu-gray-100">
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-gtu-blue/10 to-gtu-orange/10">
              <CalendarDays className="h-16 w-16 text-gtu-gray-300" />
            </div>
          )}
          {category && (
            <Badge className="absolute top-3 left-3" variant="secondary">
              {category}
            </Badge>
          )}
          {isRegistered && (
            <Badge className="absolute top-3 right-3 bg-green-500 hover:bg-green-600">
              Registered
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg line-clamp-2">
          <Link to={`/events/${id}`} className="hover:text-gtu-blue transition-colors">
            {title}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-gtu-gray-500 line-clamp-2">{description}</p>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gtu-gray-600">
            <CalendarDays className="mr-2 h-4 w-4 text-gtu-gray-400" />
            <span>{date}</span>
          </div>
          <div className="flex items-center text-sm text-gtu-gray-600">
            <Clock className="mr-2 h-4 w-4 text-gtu-gray-400" />
            <span>{time}</span>
          </div>
          <div className="flex items-center text-sm text-gtu-gray-600">
            <MapPin className="mr-2 h-4 w-4 text-gtu-gray-400" />
            <span className="line-clamp-1">{location}</span>
          </div>
          {maxAttendees && (
            <div className="flex items-center text-sm text-gtu-gray-600">
              <Users className="mr-2 h-4 w-4 text-gtu-gray-400" />
              <span>
                {attendees} / {maxAttendees} attendees
              </span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {isRegistered ? (
          <Button variant="outline" className="w-full" asChild>
            <Link to={`/events/${id}`}>View Details</Link>
          </Button>
        ) : isFullyBooked ? (
          <Button variant="outline" className="w-full" disabled>
            Fully Booked
          </Button>
        ) : (
          <Button className="w-full" asChild>
            <Link to={`/events/${id}/register`}>Register Now</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default EventCard;
