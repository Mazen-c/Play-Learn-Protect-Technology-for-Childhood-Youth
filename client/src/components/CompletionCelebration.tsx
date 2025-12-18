import { motion } from "framer-motion";
const MotionDiv = motion.div as any;
import { Trophy, Star, Clock, Target, ArrowRight, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import type { ModuleCompletionSummary, DifficultyLevel } from "@shared/schema";

interface CompletionCelebrationProps {
  summary: ModuleCompletionSummary;
  categoryId: string;
  onPlayAgain?: () => void;
}

const difficultyLabels: Record<DifficultyLevel, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

const confettiColors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8"];

function ConfettiPiece({ delay, color }: { delay: number; color: string }) {
  const randomX = Math.random() * 100;
  const randomRotation = Math.random() * 360;

  return (
    <MotionDiv
      className="absolute w-3 h-3 rounded-sm"
      style={{ backgroundColor: color, left: `${randomX}%` }}
      initial={{ y: -20, opacity: 1, rotate: 0 }}
      animate={{
        y: "100vh",
        opacity: 0,
        rotate: randomRotation + 360,
      }}
      transition={{
        duration: 3,
        delay: delay,
        ease: "easeIn",
      }}
    />
  );
}

export function CompletionCelebration({
  summary,
  categoryId,
  onPlayAgain,
}: CompletionCelebrationProps) {
  const accuracy = summary.totalQuestions > 0
    ? Math.round((summary.correctAnswers / summary.totalQuestions) * 100)
    : 0;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getPerformanceMessage = () => {
    if (accuracy >= 90) return "Outstanding!";
    if (accuracy >= 70) return "Great job!";
    if (accuracy >= 50) return "Good effort!";
    return "Keep practicing!";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <ConfettiPiece
            key={i}
            delay={i * 0.05}
            color={confettiColors[i % confettiColors.length]}
          />
        ))}
      </div>

      <MotionDiv
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 }}
        className="w-full max-w-lg mx-4"
        data-testid="completion-celebration"
      >
        <Card className="p-8 text-center space-y-6 border-2 border-primary/30 shadow-2xl">
          <MotionDiv
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, -10, 10, 0] }}
            transition={{ delay: 0.4, type: "spring", stiffness: 400 }}
            className="relative mx-auto w-32 h-32"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full blur-xl opacity-50" />
            <div className="relative w-full h-full bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
              <Trophy className="w-16 h-16 text-white" />
            </div>
            <MotionDiv
              className="absolute -top-2 -right-2"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 15, -15, 0],
              }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
              <Star className="w-10 h-10 text-yellow-400 fill-yellow-400" />
            </MotionDiv>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-2"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Module Complete!
            </h1>
            <p className="text-2xl font-semibold text-primary">{getPerformanceMessage()}</p>
            <p className="text-muted-foreground">{summary.moduleTitle}</p>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center"
          >
            <div className="flex items-center gap-2 px-6 py-3 bg-amber-100 dark:bg-amber-900/30 rounded-full">
              <Star className="w-8 h-8 text-amber-500 fill-amber-500" />
              <span className="text-4xl font-bold text-amber-700 dark:text-amber-300">
                {summary.totalPoints}
              </span>
              <span className="text-lg text-amber-600 dark:text-amber-400">points</span>
            </div>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-3 gap-4"
          >
            <div className="p-4 bg-muted rounded-xl">
              <Target className="w-6 h-6 mx-auto text-primary mb-2" />
              <p className="text-2xl font-bold text-foreground">
                {summary.correctAnswers}/{summary.totalQuestions}
              </p>
              <p className="text-xs text-muted-foreground">Correct</p>
            </div>

            <div className="p-4 bg-muted rounded-xl">
              <Clock className="w-6 h-6 mx-auto text-primary mb-2" />
              <p className="text-2xl font-bold text-foreground">{formatTime(summary.timeSpent)}</p>
              <p className="text-xs text-muted-foreground">Time</p>
            </div>

            <div className="p-4 bg-muted rounded-xl">
              <div className="w-6 h-6 mx-auto mb-2 flex items-center justify-center">
                <Badge variant="secondary" className="text-xs">
                  {difficultyLabels[summary.difficultyAchieved]}
                </Badge>
              </div>
              <p className="text-2xl font-bold text-foreground">{accuracy}%</p>
              <p className="text-xs text-muted-foreground">Accuracy</p>
            </div>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="space-y-3 pt-4"
          >
            {summary.nextModuleId && (
              <Link href={`/module/${summary.nextModuleId}`}>
                <Button className="w-full gap-2 h-14 text-lg" data-testid="button-next-module">
                  Next Module
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            )}

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 gap-2"
                onClick={onPlayAgain}
                data-testid="button-play-again"
              >
                <RotateCcw className="w-4 h-4" />
                Play Again
              </Button>

              <Link href={`/category/${categoryId}`} className="flex-1">
                <Button variant="outline" className="w-full gap-2" data-testid="button-back-to-modules">
                  <Home className="w-4 h-4" />
                  Back to Modules
                </Button>
              </Link>
            </div>
          </MotionDiv>
        </Card>
      </MotionDiv>
    </div>
  );
}
