import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary-100 text-primary-800",
        secondary: "bg-secondary-100 text-secondary-800",
        destructive: "bg-destructive/10 text-destructive",
        outline: "border border-input bg-background text-foreground",
        beginner: "bg-green-100 text-green-800",
        intermediate: "bg-yellow-100 text-yellow-800",
        advanced: "bg-red-100 text-red-800",
        software: "bg-blue-100 text-blue-800",
        electronics: "bg-purple-100 text-purple-800",
        data: "bg-indigo-100 text-indigo-800",
        materials: "bg-orange-100 text-orange-800",
        civil: "bg-teal-100 text-teal-800",
        robotics: "bg-gray-100 text-gray-800",
        active: "bg-green-100 text-green-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
