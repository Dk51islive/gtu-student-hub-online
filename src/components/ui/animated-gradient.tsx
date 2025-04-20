
import { cn } from "@/lib/utils";

interface AnimatedGradientProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedGradient({ children, className }: AnimatedGradientProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl p-[1px] transition-all hover:scale-[1.01]",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gtu-blue via-gtu-orange to-gtu-blue animate-gradient" />
      <div className="relative h-full w-full rounded-xl bg-white/90 backdrop-blur-3xl">
        {children}
      </div>
    </div>
  );
}
