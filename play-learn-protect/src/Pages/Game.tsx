import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useAlerts } from "../Components/Alerts/AlertsContext";

interface Question {
  question: string;
  options: string[];
  answer: number;
}

const questions: Question[] = [
  {
    question: "What is 5 + 3?",
    options: ["6", "7", "8", "9"],
    answer: 2
  },
  {
    question: "What is 10 - 4?",
    options: ["5", "6", "7", "8"],
    answer: 1
  }
];

const Game: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const { triggerAlert } = useAlerts();
  const breakTimer = useRef<number | null>(null);

  const handleAnswer = (index: number) => {
    if (index === questions[current].answer) {
      setScore(score + 10); // gamified points
    }

    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
    } else {
      setShowResult(true);
    }
  };

  useEffect(() => {
    const tipKey = "plp_game_minor_alert_shown";
    if (!sessionStorage.getItem(tipKey)) {
      triggerAlert({
        severity: "minor",
        title: "Quick Reminder",
        message: "If a link pops up, ask an adult before clicking.",
      });
      sessionStorage.setItem(tipKey, "1");
    }

    // Optional: gentle break reminder after 10 minutes
    breakTimer.current = window.setTimeout(() => {
      triggerAlert({
        severity: "serious",
        title: "Time for a quick break",
        message: "Stand up, stretch, and rest your eyes for a minute.",
      });
    }, 10 * 60 * 1000);

    return () => {
      if (breakTimer.current) {
        window.clearTimeout(breakTimer.current);
        breakTimer.current = null;
      }
    };
  }, [triggerAlert]);

  return (
    <Box p={3} display="flex" justifyContent="center">
      <Paper elevation={4} style={{ padding: 24, maxWidth: 500 }}>
        {!showResult ? (
          <>
            <Typography variant="h5" gutterBottom>
              {questions[current].question}
            </Typography>

            {questions[current].options.map((option, index) => (
              <Button
                key={index}
                variant="contained"
                fullWidth
                size="large"
                style={{ marginBottom: 10 }}
                onClick={() => handleAnswer(index)}
              >
                {option}
              </Button>
            ))}
          </>
        ) : (
          <>
            <Typography variant="h4">Game Complete!</Typography>
            <Typography variant="h6">Score: {score}</Typography>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default Game;
