import { cn } from "@/lib/utils"

export function Typography({ variant = "body", children, className }) {
  const baseStyles = "text-dark-slate dark:text-off-white"
  const styles = {
    h1: "font-serif text-h1 font-bold",
    h2: "font-serif text-h2 font-semibold",
    h3: "font-sans text-h3 font-semibold",
    body: "font-sans text-body",
    small: "font-sans text-small",
  }

  // Map variant to valid HTML element
  let ElementType
  if (variant === "h1") ElementType = "h1"
  else if (variant === "h2") ElementType = "h2"
  else if (variant === "h3") ElementType = "h3"
  else if (variant === "body" || variant === "small") ElementType = "p"
  else ElementType = "div" // Fallback to div for any unexpected values

  return <ElementType className={cn(baseStyles, styles[variant] || styles.body, className)}>{children}</ElementType>
}
