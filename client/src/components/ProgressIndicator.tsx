import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface ProgressIndicatorProps {
  currentQuestion: number;
  totalQuestions: number;
  className?: string;
}

export function ProgressIndicator({
  currentQuestion,
  totalQuestions,
  className = "",
}: ProgressIndicatorProps) {
  const progress = totalQuestions > 0 ? (currentQuestion / totalQuestions) * 100 : 0;

  return (
    <div className={`space-y-2 ${className}`} data-testid="progress-indicator">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-muted-foreground">
          Question {currentQuestion} of {totalQuestions}
        </span>
        <span className="text-sm font-bold text-foreground">{Math.round(progress)}%</span>
      </div>
      <div className="relative">
        <Progress value={progress} className="h-3" />
        <motion.div
          className="absolute top-0 left-0 h-full bg-primary/20 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
