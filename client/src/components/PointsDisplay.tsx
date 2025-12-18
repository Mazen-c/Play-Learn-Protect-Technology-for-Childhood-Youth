import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface PointsDisplayProps {
  points: number;
  className?: string;
  showAnimation?: boolean;
}

export function PointsDisplay({ points, className = "", showAnimation = true }: PointsDisplayProps) {
  const [displayedPoints, setDisplayedPoints] = useState(points);
  const [isAnimating, setIsAnimating] = useState(false);
  const [pointsDiff, setPointsDiff] = useState(0);
  const prevPointsRef = useRef(points);

  const MotionDiv = motion.div as any;

  useEffect(() => {
    if (points !== displayedPoints && showAnimation && points > displayedPoints) {
      const diff = points - prevPointsRef.current;
      setPointsDiff(diff);
      setIsAnimating(true);

      const steps = 20;
      const increment = (points - displayedPoints) / steps;
      let current = displayedPoints;
      let step = 0;

      const interval = setInterval(() => {
        step++;
        current += increment;
        setDisplayedPoints(Math.round(current));

        if (step >= steps) {
          clearInterval(interval);
          setDisplayedPoints(points);
          prevPointsRef.current = points;
          setTimeout(() => setIsAnimating(false), 200);
        }
      }, 30);

      return () => clearInterval(interval);
    } else {
      setDisplayedPoints(points);
      prevPointsRef.current = points;
    }
  }, [points, displayedPoints, showAnimation]);

  return (
    <MotionDiv
      className={`flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-full ${className}`}
      animate={isAnimating ? { scale: [1, 1.1, 1] } : {}}
      transition={{ duration: 0.3 }}
      data-testid="points-display"
    >
      <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
      <span className="text-xl font-bold tabular-nums text-amber-700 dark:text-amber-300" data-testid="text-points-value">
        {displayedPoints}
      </span>
      <AnimatePresence>
        {isAnimating && pointsDiff > 0 && (
          <MotionDiv
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="inline-block text-sm font-bold text-green-600 dark:text-green-400"
            data-testid="text-points-increment"
          >
            +{pointsDiff}
          </MotionDiv>
        )}
      </AnimatePresence>
    </MotionDiv>
  );
}
