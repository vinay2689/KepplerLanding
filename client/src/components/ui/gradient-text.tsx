import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type GradientTextProps = {
  children: ReactNode;
  className?: string;
  variant?: "blue" | "purple";
};

export function GradientText({
  children,
  className,
  variant = "blue",
}: GradientTextProps) {
  return (
    <span
      className={cn(
        variant === "blue" ? "text-gradient-blue" : "text-gradient-purple",
        className
      )}
    >
      {children}
    </span>
  );
}
