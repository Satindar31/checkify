import { cn } from "@/lib/utils";

/**
 * @param children Wrap your content with this component.
 * @returns * 100vh Height
 * * 100vw Width
 * 
 * @example
 * ```tsx
 * <Container>
 *  <h1>Hello world</h1>
 * </Container>
 * ```
 */
export default function Container({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={cn(`h-screen w-screen p-4 ${className}`)}>{children}</div>;
}
