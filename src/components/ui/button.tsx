import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva } from "class-variance-authority"
import type { VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 border border-transparent bg-clip-padding font-medium focus-visible:ring-1 aria-invalid:ring-1 [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 [&_svg[data-icon='inline-end']]:transition-transform motion-safe:hover:[&_svg[data-icon='inline-end']]:translate-x-0.5 motion-reduce:transform-none",
  {
    variants: {
      variant: {
        default:
          "border-primary/25 bg-primary text-primary-foreground shadow-md shadow-primary/25 hover:border-primary-foreground/25 hover:shadow-lg hover:shadow-primary/40 hover:brightness-[1.04]",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 aria-expanded:bg-muted aria-expanded:text-foreground",
        outlinePrimary:
          "border-primary/20 bg-background text-primary shadow-none hover:bg-primary/10 hover:border-primary/30 dark:border-primary/25 dark:bg-input/30 dark:hover:bg-primary/10",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 aria-expanded:bg-muted aria-expanded:text-foreground",
        destructive:
          "bg-destructive/10 hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/20 text-destructive focus-visible:border-destructive/40 dark:hover:bg-destructive/30",
        destructiveOutline:
          "border-destructive/35 bg-background text-destructive shadow-none hover:bg-destructive/10 hover:border-destructive/55 hover:text-destructive dark:border-destructive/40 dark:bg-input/30",
        link: "border-transparent bg-transparent text-primary shadow-none underline-offset-4 hover:underline",
        signInBar:
          "border-transparent bg-foreground text-background shadow-none hover:opacity-90",
        signInBarInverted:
          "border-border bg-background text-foreground shadow-none hover:opacity-90",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 text-xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 px-2.5 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 text-sm has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        xl: "h-10 gap-1.5 px-3 text-sm has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        "2xl":
          "h-11 gap-2 px-4 text-sm has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        "3xl":
          "h-14 min-h-14 gap-2 px-5 text-sm has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        icon: "size-8 text-xs",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7",
        "icon-lg": "size-9",
        "icon-xl": "size-10 p-0 [&_svg:not([class*='size-'])]:size-4",
      },
      shape: {
        pill: "rounded-full",
        square: "rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "lg",
      shape: "pill",
    },
  },
)

function Button({
  className,
  variant = "default",
  size = "lg",
  shape = "pill",
  loading = false,
  disabled,
  children,
  ...props
}: ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean
  }) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, shape, className }))}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && (
        <svg
          viewBox="0 0 24 24"
          className="size-4 animate-spin"
          data-icon="inline-start"
          aria-hidden
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            opacity="0.25"
          />
          <path
            d="M22 12a10 10 0 0 0-10-10"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      )}
      {children}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
