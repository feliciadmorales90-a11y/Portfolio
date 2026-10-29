import type { ReactNode } from "react";

/**
 * Fades content up with a CSS animation. It needs no JavaScript or scroll observer,
 * so content can never be left hidden if a script or observer fails (as on some phones).
 */
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`reveal ${className ?? ""}`} style={delay ? { animationDelay: `${delay}s` } : undefined}>
      {children}
    </div>
  );
}
