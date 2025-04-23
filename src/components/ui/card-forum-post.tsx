
import { Link } from "react-router-dom";
import { MessageSquare, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export interface ForumPostCardProps {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  category: string;
  createdAt: string;
  likes: number;
  replies: number;
  solved?: boolean;
  tags?: string[];
}

const ForumPostCard = ({
  id,
  title,
  content,
  author,
  category,
  createdAt,
  likes,
  replies,
  solved = false,
  tags = [],
}: ForumPostCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Link to={`/profile/${author.id}`} className="flex-shrink-0">
            <Avatar>
              <AvatarImage src={author.avatarUrl} />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline">{category}</Badge>
                {solved && (
                  <Badge className="bg-green-500 hover:bg-green-600">Solved</Badge>
                )}
              </div>
              <span className="text-xs text-gtu-gray-400">{createdAt}</span>
            </div>
            <h3 className="mt-1 font-semibold text-lg line-clamp-2">
              <Link to={`/forum/post/${id}`} className="hover:text-gtu-blue transition-colors">
                {title}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-gtu-gray-500 line-clamp-2">{content}</p>
            
            {tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/forum/tag/${tag}`}
                    className="inline-block rounded-full bg-gtu-gray-100 px-2 py-0.5 text-xs text-gtu-gray-600 hover:bg-gtu-blue/10 hover:text-gtu-blue"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
            
            <div className="mt-3 flex items-center text-xs text-gtu-gray-500">
              <Link to={`/profile/${author.id}`} className="font-medium text-gtu-gray-600 hover:text-gtu-blue">
                {author.name}
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/10 p-3 flex justify-between flex-wrap gap-2">
        <div className="flex space-x-4">
          <div className="flex items-center text-sm text-gtu-gray-500">
            <ThumbsUp className="mr-1 h-4 w-4" />
            <span>{likes}</span>
          </div>
          <div className="flex items-center text-sm text-gtu-gray-500">
            <MessageSquare className="mr-1 h-4 w-4" />
            <span>{replies} {replies === 1 ? 'reply' : 'replies'}</span>
          </div>
        </div>
        <Link
          to={`/forum/post/${id}`}
          className="text-sm text-gtu-blue hover:underline"
        >
          View Discussion
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ForumPostCard;
