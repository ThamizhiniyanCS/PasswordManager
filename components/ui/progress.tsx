"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";
import clsx from "clsx";

const ProgressIndicator = ProgressPrimitive.Indicator;

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={clsx(
        "h-full w-full flex-1 transition-all",
        { "bg-red-500": value === 20 },
        { "bg-orange-500": value === 40 },
        { "bg-yellow-500": value === 60 },
        { "bg-lime-500": value === 80 },
        { "bg-green-500": value === 100 }
      )}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress, ProgressIndicator };
