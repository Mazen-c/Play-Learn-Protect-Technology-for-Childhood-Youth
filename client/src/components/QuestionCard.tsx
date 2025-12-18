import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
const MotionDiv = motion.div as any;
import type { Question, QuestionType } from "@shared/schema";

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string) => void;
  disabled?: boolean;
}

export function QuestionCard({ question, onAnswer, disabled = false }: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [textAnswer, setTextAnswer] = useState("");

  const handleSubmit = (answer: string) => {
    if (disabled) return;
    setSelectedAnswer(answer);
    onAnswer(answer);
  };

  const renderQuestionContent = () => {
    switch (question.type as QuestionType) {
      case "multiple_choice":
        return renderMultipleChoice();
      case "true_false":
        return renderTrueFalse();
      case "fill_blank":
        return renderFillBlank();
      default:
        return renderMultipleChoice();
    }
  };

  const renderMultipleChoice = () => {
    const options = (question.options as string[]) || [];
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option, index) => (
          <MotionDiv
            key={index}
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
          >
            <Button
              variant={selectedAnswer === option ? "default" : "outline"}
              className={`w-full min-h-16 text-lg font-medium whitespace-normal text-left justify-start px-6 ${selectedAnswer === option ? "ring-2 ring-primary" : ""
                }`}
              onClick={() => handleSubmit(option)}
              disabled={disabled}
              data-testid={`button-option-${index}`}
            >
              <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold mr-3 shrink-0">
                {String.fromCharCode(65 + index)}
              </span>
              {option}
            </Button>
          </MotionDiv>
        ))}
      </div>
    );
  };

  const renderTrueFalse = () => {
    return (
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {["True", "False"].map((option) => (
          <MotionDiv
            key={option}
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            className="flex-1 max-w-xs"
          >
            <Button
              variant={selectedAnswer === option ? "default" : "outline"}
              className={`w-full min-h-20 text-xl font-bold ${option === "True"
                  ? "border-green-400 dark:border-green-600"
                  : "border-red-400 dark:border-red-600"
                } ${selectedAnswer === option ? "ring-2 ring-primary" : ""}`}
              onClick={() => handleSubmit(option)}
              disabled={disabled}
              data-testid={`button-${option.toLowerCase()}`}
            >
              {option}
            </Button>
          </MotionDiv>
        ))}
      </div>
    );
  };

  const renderFillBlank = () => {
    return (
      <div className="space-y-4 max-w-md mx-auto">
        <Input
          value={textAnswer}
          onChange={(e) => setTextAnswer(e.target.value)}
          placeholder="Type your answer here..."
          className="text-xl h-14 text-center"
          disabled={disabled}
          onKeyDown={(e) => {
            if (e.key === "Enter" && textAnswer.trim()) {
              handleSubmit(textAnswer.trim());
            }
          }}
          data-testid="input-answer"
        />
        <Button
          onClick={() => handleSubmit(textAnswer.trim())}
          disabled={disabled || !textAnswer.trim()}
          className="w-full h-14 text-lg"
          data-testid="button-submit-answer"
        >
          Submit Answer
        </Button>
      </div>
    );
  };

  return (
    <Card className="p-6 md:p-8" data-testid={`card-question-${question.id}`}>
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground uppercase tracking-wide">
            {question.type === "true_false"
              ? "True or False"
              : question.type === "fill_blank"
                ? "Fill in the Blank"
                : "Choose the correct answer"}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-relaxed">
            {question.questionText}
          </h2>
        </div>

        <div className="pt-4">{renderQuestionContent()}</div>
      </div>
    </Card>
  );
}
