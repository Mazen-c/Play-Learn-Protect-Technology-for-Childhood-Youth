import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, Star, Play, CheckCircle2, Lock } from "lucide-react";
import { Link } from "wouter";
import type { Module, DifficultyLevel } from "@shared/schema";
import { motion } from "framer-motion";

interface ModuleCardProps {
  module: Module;
  progress?: number;
  isCompleted?: boolean;
  isLocked?: boolean;
}

const difficultyColors: Record<DifficultyLevel, string> = {
  easy: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  hard: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
};

const difficultyLabels: Record<DifficultyLevel, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

export function ModuleCard({
  module,
  progress = 0,
  isCompleted = false,
  isLocked = false,
}: ModuleCardProps) {
  const difficulty = module.difficulty || "easy";

  return (
    <motion.div
      whileHover={{ scale: isLocked ? 1 : 1.02 }}
      whileTap={{ scale: isLocked ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Card
        className={`relative p-5 ${
          isLocked ? "opacity-60" : ""
        } ${isCompleted ? "border-green-400 dark:border-green-600 border-2" : ""}`}
        data-testid={`card-module-${module.id}`}
      >
        {isCompleted && (
          <div className="absolute -top-2 -right-2">
            <div className="bg-green-500 rounded-full p-1 shadow-md">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
          </div>
        )}

        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-lg z-10">
            <Lock className="w-8 h-8 text-muted-foreground" />
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-lg font-semibold text-foreground line-clamp-2 flex-1">
              {module.title}
            </h4>
            <Badge className={`text-xs shrink-0 ${difficultyColors[difficulty]}`}>
              {difficultyLabels[difficulty]}
            </Badge>
          </div>

          {module.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">{module.description}</p>
          )}

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{module.estimatedMinutes} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-500" />
              <span>{module.pointsReward} pts</span>
            </div>
          </div>

          {progress > 0 && !isCompleted && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          <Link href={`/module/${module.id}`} data-testid={`link-module-${module.id}`}>
            <Button
              className="w-full gap-2"
              disabled={isLocked}
              variant={isCompleted ? "secondary" : "default"}
              data-testid={`button-start-module-${module.id}`}
            >
              <Play className="w-4 h-4" />
              {isCompleted ? "Play Again" : progress > 0 ? "Continue" : "Start"}
            </Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}
