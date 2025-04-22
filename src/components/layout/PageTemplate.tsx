
import { ReactNode } from "react";
import MainLayout from "./MainLayout";
import { cn } from "@/lib/utils";
import { AnimatedGradient } from "@/components/ui/animated-gradient";

interface PageTemplateProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

const PageTemplate = ({ title, subtitle, icon, children, className }: PageTemplateProps) => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <AnimatedGradient className="mb-8 p-8">
          <div className="flex items-center space-x-4">
            {icon && <div className="h-8 w-8 text-gtu-blue">{icon}</div>}
            <div>
              <h1 className="text-3xl font-bold text-gtu-gray-800">{title}</h1>
              {subtitle && <p className="text-gtu-gray-600 mt-2">{subtitle}</p>}
            </div>
          </div>
        </AnimatedGradient>
        
        <div className={cn("bg-white shadow-lg rounded-xl p-6 mb-8", className)}>
          {children}
        </div>
      </div>
    </MainLayout>
  );
};

export default PageTemplate;
