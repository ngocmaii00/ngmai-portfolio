import {
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";

function useHeaderItemSize(
  mouseX: MotionValue<number>,
  baseItemSize: number,
  magnification: number,
  distance: number,
  ref: React.RefObject<HTMLDivElement>,
  spring: { mass: number; stiffness: number; damping: number }
) {
  const mouseDistance = useTransform(mouseX, (val) => {
    if (typeof val !== "number" || isNaN(val)) return 0;
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize,
    };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );

  return useSpring(targetSize, spring);
}

export default useHeaderItemSize