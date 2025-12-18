import { motion, AnimatePresence } from "framer-motion";
const MotionDiv = motion.div as any;
const MotionH2 = motion.h2 as any;
const MotionP = motion.p as any;
import { CheckCircle2, XCircle, Sparkles } from "lucide-react";

interface FeedbackAnimationProps {
  isCorrect: boolean | null;
  message?: string;
  explanation?: string;
  onComplete?: () => void;
}

export function FeedbackAnimation({
  isCorrect,
  message,
  explanation,
  onComplete,
}: FeedbackAnimationProps) {
  if (isCorrect === null) return null;

  const defaultMessage = isCorrect ? "Great job!" : "Try again!";
  const displayMessage = message || defaultMessage;

  return (
    <AnimatePresence>
      <MotionDiv
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
        className="fixed inset-0 flex items-center justify-center z-50 bg-background/80 backdrop-blur-sm"
        onClick={onComplete}
        data-testid="feedback-animation"
        role="button"
        tabIndex={0}
        onKeyDown={(e: any) => e.key === "Enter" && onComplete?.()}
      >
        <MotionDiv
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className={`relative p-8 rounded-3xl shadow-2xl max-w-md mx-4 text-center ${isCorrect
            ? "bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700"
            : "bg-gradient-to-br from-red-500 to-rose-600 dark:from-red-600 dark:to-rose-700"
            }`}
          data-testid={`feedback-result-${isCorrect ? "correct" : "incorrect"}`}
        >
          {isCorrect && (
            <MotionDiv
              className="absolute -top-4 -right-4"
              animate={{
                rotate: [0, 15, -15, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 0.5, repeat: 2 }}
            >
              <Sparkles className="w-12 h-12 text-yellow-300" />
            </MotionDiv>
          )}

          <MotionDiv
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 400 }}
          >
            {isCorrect ? (
              <CheckCircle2 className="w-20 h-20 mx-auto text-white mb-4" />
            ) : (
              <MotionDiv
                animate={{ x: [-5, 5, -5, 5, 0] }}
                transition={{ duration: 0.4 }}
              >
                <XCircle className="w-20 h-20 mx-auto text-white mb-4" />
              </MotionDiv>
            )}
          </MotionDiv>

          <MotionH2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-white mb-2"
          >
            {displayMessage}
          </MotionH2>

          {explanation && !isCorrect && (
            <MotionP
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white/90 text-lg mt-4"
            >
              {explanation}
            </MotionP>
          )}

          <MotionP
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/70 text-sm mt-4"
          >
            Tap anywhere to continue
          </MotionP>
        </MotionDiv>
      </MotionDiv>
    </AnimatePresence>
  );
}
