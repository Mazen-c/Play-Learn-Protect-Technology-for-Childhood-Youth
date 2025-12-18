import { useState, useEffect, useCallback } from "react";
import { useParams, useLocation } from "wouter";
import { Header } from "@/components/Header";
import { QuestionCard } from "@/components/QuestionCard";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { SessionTimer } from "@/components/SessionTimer";
import { PointsDisplay } from "@/components/PointsDisplay";
import { FeedbackAnimation } from "@/components/FeedbackAnimation";
import { CompletionCelebration } from "@/components/CompletionCelebration";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { motion, AnimatePresence } from "framer-motion";
import type { ModuleWithQuestions, Question, ModuleCompletionSummary, DifficultyLevel } from "@shared/schema";

interface AnswerResult {
  isCorrect: boolean;
  pointsEarned: number;
  explanation?: string;
  newDifficulty?: DifficultyLevel;
}

export default function ModuleActivity() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [lastExplanation, setLastExplanation] = useState<string | undefined>();
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentDifficulty, setCurrentDifficulty] = useState<DifficultyLevel>("easy");
  const [isAnswering, setIsAnswering] = useState(false);

  const { data: module, isLoading } = useQuery<ModuleWithQuestions>({
    queryKey: ["/api/modules", id],
  });

  const answerMutation = useMutation({
    mutationFn: async (data: { questionId: string; answer: string; timeTaken: number }) => {
      const res = await apiRequest("POST", `/api/modules/${id}/answer`, data);
      return res.json() as Promise<AnswerResult>;
    },
    onSuccess: (result) => {
      setLastAnswerCorrect(result.isCorrect);
      setLastExplanation(result.explanation);
      setShowFeedback(true);

      if (result.isCorrect) {
        setCorrectAnswers((prev) => prev + 1);
        setEarnedPoints((prev) => prev + result.pointsEarned);
      }

      if (result.newDifficulty) {
        setCurrentDifficulty(result.newDifficulty);
      }
    },
    onSettled: () => {
      setIsAnswering(false);
    },
  });

  const completeMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", `/api/modules/${id}/complete`, {
        correctAnswers,
        totalQuestions: questions.length,
        pointsEarned: earnedPoints,
        timeSpent,
        difficulty: currentDifficulty,
      });
      return res.json() as Promise<ModuleCompletionSummary>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user/stats"] });
      queryClient.invalidateQueries({ queryKey: ["/api/user/progress"] });
    },
  });

  const questions: Question[] = module?.questions || [];
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    setQuestionStartTime(Date.now());
  }, [currentQuestionIndex]);

  const handleAnswer = useCallback(
    (answer: string) => {
      if (isAnswering || !currentQuestion) return;
      setIsAnswering(true);

      const timeTaken = Math.round((Date.now() - questionStartTime) / 1000);

      answerMutation.mutate({
        questionId: currentQuestion.id,
        answer,
        timeTaken,
      });
    },
    [currentQuestion, questionStartTime, answerMutation, isAnswering]
  );

  const handleFeedbackComplete = useCallback(() => {
    setShowFeedback(false);
    setLastAnswerCorrect(null);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      completeMutation.mutate();
    }
  }, [currentQuestionIndex, questions.length, completeMutation]);

  const handlePlayAgain = useCallback(() => {
    setCurrentQuestionIndex(0);
    setEarnedPoints(0);
    setCorrectAnswers(0);
    setTimeSpent(0);
    setIsCompleted(false);
    setCurrentDifficulty("easy");
  }, []);

  const handleTimeUpdate = useCallback((seconds: number) => {
    setTimeSpent(seconds);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header showBack backHref="/" />
        <main className="container px-4 py-8 max-w-4xl mx-auto">
          <Skeleton className="h-6 w-48 mb-4" />
          <Skeleton className="h-4 w-full mb-8" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </main>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Module not found</h2>
          <p className="text-muted-foreground mb-4">
            The module you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  if (isCompleted && completeMutation.data) {
    return (
      <CompletionCelebration
        summary={completeMutation.data}
        categoryId={module.categoryId}
        onPlayAgain={handlePlayAgain}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        showBack
        backHref={`/category/${module.categoryId}`}
        title={module.title}
        showPoints={false}
      />

      <main className="container px-4 py-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6"
        >
          <ProgressIndicator
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            className="flex-1 w-full md:w-auto"
          />

          <div className="flex items-center gap-3">
            <SessionTimer isRunning={!showFeedback && !isCompleted} onTimeUpdate={handleTimeUpdate} />
            <PointsDisplay points={earnedPoints} />
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {currentQuestion && (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <QuestionCard
                question={currentQuestion}
                onAnswer={handleAnswer}
                disabled={isAnswering || showFeedback}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {!currentQuestion && questions.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <h3 className="text-xl font-semibold text-foreground mb-2">No questions available</h3>
            <p className="text-muted-foreground">This module doesn't have any questions yet.</p>
          </motion.div>
        )}
      </main>

      <AnimatePresence>
        {showFeedback && (
          <FeedbackAnimation
            isCorrect={lastAnswerCorrect}
            explanation={lastExplanation}
            onComplete={handleFeedbackComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
