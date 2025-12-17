import React, { useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";

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
