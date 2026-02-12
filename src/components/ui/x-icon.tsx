import { cn } from "@/lib/utils";

type Props = React.SVGProps<SVGSVGElement>;

export function XIcon({ className, ...props }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={cn("size-4", className)}
      {...props}
    >
      <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.3l-4.93-6.88L5.95 22H2.8l7.25-8.3L.8 2h6.46l4.46 6.25L18.9 2zm-1.1 18h1.72L6.08 3.92H4.23L17.8 20z" />
    </svg>
  );
}
