
import React, { createContext, useContext, useState } from 'react';
import { Resource, ResourceType } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

type ResourceContextType = {
  resources: Resource[];
  isLoading: boolean;
  getResourcesByType: (type?: ResourceType) => Resource[];
  getResourcesBySubject: (subject: string) => Resource[];
  downloadResource: (id: string) => Promise<void>;
  likeResource: (id: string) => void;
  searchResources: (query: string) => Resource[];
};

const ResourceContext = createContext<ResourceContextType | undefined>(undefined);

export const useResources = () => {
  const context = useContext(ResourceContext);
  if (context === undefined) {
    throw new Error('useResources must be used within a ResourceProvider');
  }
  return context;
};

// Mock data
const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Computer Networks Notes - Unit 1',
    description: 'Comprehensive notes on Computer Networks Unit 1 including OSI model, TCP/IP protocols, and networking basics.',
    type: 'PDF',
    url: '/resources/computer-networks.pdf',
    uploadedBy: {
      id: 'prof1',
      name: 'Prof. Sharma',
      email: 'sharma@gtu.edu',
      isVerified: true
    },
    subject: 'Computer Networks',
    uploadDate: '3 days ago',
    likes: 45,
    downloads: 120
  },
  {
    id: '2',
    title: 'Data Structures Tutorial - Arrays and Linked Lists',
    description: 'Video tutorial explaining arrays, linked lists, and their operations with practical examples.',
    type: 'Video',
    url: '/resources/data-structures.mp4',
    uploadedBy: {
      id: 'prof2',
      name: 'Dr. Patel',
      email: 'patel@gtu.edu',
      isVerified: true
    },
    subject: 'Data Structures',
    uploadDate: '1 week ago',
    likes: 78,
    downloads: 200
  },
  {
    id: '3',
    title: 'Machine Learning Algorithms Explained',
    description: 'Detailed explanation of common machine learning algorithms with implementation examples in Python.',
    type: 'Article',
    url: '/resources/ml-algorithms.html',
    uploadedBy: {
      id: 'club1',
      name: 'Tech Club',
      email: 'techclub@gtu.edu',
      isVerified: true
    },
    subject: 'AI & ML',
    uploadDate: '2 weeks ago',
    likes: 120,
    downloads: 320
  }
];

export const ResourceProvider = ({ children }: { children: React.ReactNode }) => {
  const [resources, setResources] = useState<Resource[]>(mockResources);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const getResourcesByType = (type?: ResourceType) => {
    if (!type) return resources;
    return resources.filter(resource => resource.type === type);
  };

  const getResourcesBySubject = (subject: string) => {
    return resources.filter(resource => resource.subject === subject);
  };

  const downloadResource = async (id: string) => {
    try {
      setIsLoading(true);
      
      const resource = resources.find(r => r.id === id);
      if (!resource) throw new Error("Resource not found");
  
      // Start browser download
      const link = document.createElement('a');
      link.href = resource.url;
      link.download = resource.title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      // Optionally update download count
      setResources(prev =>
        prev.map(r =>
          r.id === id ? { ...r, downloads: r.downloads + 1 } : r
        )
      );
  
      toast({
        title: 'Download started',
        description: `Downloading ${resource.title}...`,
      });
    } catch (error) {
      toast({
        title: 'Download failed',
        description: 'There was an error downloading the resource.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const likeResource = (id: string) => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please log in to like resources.',
        variant: 'destructive',
      });
      return;
    }

    setResources(prev =>
      prev.map(resource =>
        resource.id === id
          ? { ...resource, likes: resource.likes + 1 }
          : resource
      )
    );
  };

  const searchResources = (query: string) => {
    if (!query) return resources;
    
    const lowerQuery = query.toLowerCase();
    return resources.filter(
      resource =>
        resource.title.toLowerCase().includes(lowerQuery) ||
        resource.description.toLowerCase().includes(lowerQuery) ||
        resource.subject.toLowerCase().includes(lowerQuery)
    );
  };

  const value = {
    resources,
    isLoading,
    getResourcesByType,
    getResourcesBySubject,
    downloadResource,
    likeResource,
    searchResources,
  };

  return (
    <ResourceContext.Provider value={value}>
      {children}
    </ResourceContext.Provider>
  );
};
