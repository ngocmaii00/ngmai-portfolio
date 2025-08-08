import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

interface TypeWriterProps {
  lines: string[];
  typingSpeed?: number; // milliseconds per character
  delayBetweenLines?: number; // milliseconds between lines
  className?: string;
  textClassName?: string;
  cursorClassName?: string;
}

export const TypeWriter: React.FC<TypeWriterProps> = ({
  lines,
  typingSpeed = 40,
  delayBetweenLines = 500,
  className,
  textClassName,
  cursorClassName,
}) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    if (currentLineIndex >= lines.length) return;

    const fullLine = lines[currentLineIndex];

    if (currentText.length < fullLine.length) {
      const timeout = setTimeout(() => {
        setCurrentText(fullLine.slice(0, currentText.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else {
      const delay = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentText("");
      }, delayBetweenLines);
      return () => clearTimeout(delay);
    }
  }, [currentText, currentLineIndex, lines, typingSpeed, delayBetweenLines]);

  return (
    <div className={cn("flex flex-col space-y-2", className)}>
      {lines.slice(0, currentLineIndex).map((line, i) => (
        <p key={i} className={`text-white ${textClassName}`}>
          {line}
        </p>
      ))}
      {currentLineIndex < lines.length && (
        <p className={`text-white ${textClassName}`}>
          {currentText}
          <motion.span
            className={cursorClassName || "inline-block w-[2px] h-[1em] bg-white ml-1"}
            animate={{ opacity: [0, 1] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </p>
      )}
    </div>
  );
};
