"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  showCursor?: boolean;
}

export function Typewriter({ 
  text, 
  className, 
  speed = 50, 
  delay = 0,
  showCursor = true 
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [showingCursor, setShowingCursor] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  useEffect(() => {
    if (!showCursor) return;
    
    const interval = setInterval(() => {
      setShowingCursor(prev => !prev);
    }, 530);

    return () => clearInterval(interval);
  }, [showCursor]);

  return (
    <span className={cn("font-mono", className)}>
      {displayText}
      {showCursor && (
        <span 
          className={cn(
            "inline-block w-2 h-4 bg-primary ml-0.5 align-middle",
            !showingCursor && "opacity-0"
          )}
        />
      )}
    </span>
  );
}
