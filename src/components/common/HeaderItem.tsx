"use client";

import {
  motion,
  useMotionValue,
  AnimatePresence,
  MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import useHeaderItemSize from "../../hooks/useHeaderItemSize";

interface HeaderItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  mouseX: MotionValue<number>;
  baseItemSize: number;
  magnification: number;
  distance: number;
  spring: { mass: number; stiffness: number; damping: number };
  badgeCount?: number;
}

export default function HeaderItem({
  icon,
  label,
  onClick,
  mouseX,
  baseItemSize,
  magnification,
  distance,
  spring,
  badgeCount,
}: HeaderItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);
  const size = useHeaderItemSize(
    mouseX,
    baseItemSize,
    magnification,
    distance,
    ref as React.RefObject<HTMLDivElement>,
    spring
  );
  const [showLabel, setShowLabel] = useState(false);

  useEffect(() => {
    const unsubscribe = isHovered.on("change", (value) =>
      setShowLabel(value === 1)
    );
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className="relative inline-flex items-center justify-center rounded-full 
      bg-[#44444410] border border-gray-700 shadow-lg cursor-pointer shadow-[#0606065b] "
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      <div className="flex items-center justify-center">{icon}</div>
      {badgeCount !== undefined && badgeCount > 0 && (
        <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
          {badgeCount > 99 ? "99+" : badgeCount}
        </span>
      )}
      <AnimatePresence>
        {showLabel && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -10 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-6 left-1/2 w-fit whitespace-pre rounded-md 
            border border-gray-700 px-2 py-0.5 text-xs text-neutral-400"
            style={{ x: "-50%" }}
            role="tooltip"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
