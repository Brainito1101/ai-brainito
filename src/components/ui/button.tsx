import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-accent via-orange-500 to-accent text-white border border-white/20 shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-accent/50 bg-white/10 text-accent hover:bg-accent hover:text-white hover:border-white/20",
        secondary: "bg-gradient-to-r from-accent via-orange-500 to-accent text-white border border-white/20 shadow-md shadow-accent/20 hover:shadow-lg",
        ghost: "hover:bg-accent/10 hover:text-accent",
        link: "text-accent underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-accent via-orange-500 to-accent text-white border border-white/20 shadow-medium hover:shadow-large hover:scale-105 active:scale-100",
        accent: "bg-gradient-to-r from-accent via-orange-500 to-accent text-white border border-white/20 shadow-accent-glow hover:shadow-large",
        hero: "bg-gradient-to-r from-accent via-orange-500 to-accent text-white border border-white/20 shadow-lg shadow-accent/40 hover:shadow-xl hover:shadow-accent/50 hover:scale-105 active:scale-100 font-bold",
        heroOutline: "border-2 border-accent/30 bg-white/10 text-foreground hover:border-accent hover:bg-accent/10 backdrop-blur-sm",
        headerCta: "bg-gradient-to-r from-accent via-orange-500 to-accent text-white border border-white/20 font-semibold shadow-md shadow-accent/30 hover:shadow-lg hover:scale-105 active:scale-100",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-lg rounded-xl",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
