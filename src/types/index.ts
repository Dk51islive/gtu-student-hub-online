
export type User = {
    id: string;
    name: string;
    email: string;
    enrollmentNumber?: string;
    yearOfStudy?: string;
    department?: string;
    isAdmin?: boolean;
    isVerified?: boolean;
  };
  
  export type ResourceType = 'PDF' | 'Video' | 'Article';
  
  export type Resource = {
    id: string;
    title: string;
    description: string;
    type: ResourceType;
    url: string;
    uploadedBy: User;
    subject: string;
    uploadDate: string;
    likes: number;
    downloads: number;
  };
  
  export type Event = {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    type: 'Festival' | 'Workshop' | 'Seminar' | 'Competition';
    capacity: number;
    attendees: number;
  };
  
  export type Discussion = {
    id: string;
    title: string;
    content: string;
    author: User;
    category: string;
    tags: string[];
    createdAt: string;
    likes: number;
    replies: number;
    isSolved?: boolean;
  };
  