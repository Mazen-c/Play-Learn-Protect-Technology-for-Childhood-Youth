import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { answerSubmissionSchema, type DifficultyLevel, type ModuleCompletionSummary } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  const defaultUserId = "default-user";

  app.get("/api/categories", async (_req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const category = await storage.getCategoryWithModules(id);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      console.error("Error fetching category:", error);
      res.status(500).json({ error: "Failed to fetch category" });
    }
  });

  app.get("/api/modules", async (_req, res) => {
    try {
      const modules = await storage.getModules();
      res.json(modules);
    } catch (error) {
      console.error("Error fetching modules:", error);
      res.status(500).json({ error: "Failed to fetch modules" });
    }
  });

  app.get("/api/modules/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const module = await storage.getModuleWithQuestions(id);
      if (!module) {
        return res.status(404).json({ error: "Module not found" });
      }
      res.json(module);
    } catch (error) {
      console.error("Error fetching module:", error);
      res.status(500).json({ error: "Failed to fetch module" });
    }
  });

  app.post("/api/modules/:id/answer", async (req, res) => {
    try {
      const { id: moduleId } = req.params;
      const parseResult = answerSubmissionSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({ error: "Invalid request body" });
      }

      const { questionId, answer, timeTaken } = parseResult.data;
      const question = await storage.getQuestionById(questionId);
      
      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      }

      const normalizedAnswer = answer.toLowerCase().trim();
      const normalizedCorrect = question.correctAnswer.toLowerCase().trim();
      const isCorrect = normalizedAnswer === normalizedCorrect;

      let pointsEarned = 0;
      if (isCorrect) {
        pointsEarned = question.points || 10;
        if (timeTaken < 10) {
          pointsEarned = Math.round(pointsEarned * 1.2);
        } else if (timeTaken > 60) {
          pointsEarned = Math.round(pointsEarned * 0.8);
        }
      }

      const progress = await storage.getModuleProgress(defaultUserId, moduleId);
      const currentCorrect = progress?.correctAnswers || 0;
      const currentConsecutive = progress?.consecutiveCorrect || 0;
      const newConsecutive = isCorrect ? currentConsecutive + 1 : 0;

      let newDifficulty: DifficultyLevel = progress?.currentDifficulty || "easy";
      if (newConsecutive >= 3 && newDifficulty === "easy") {
        newDifficulty = "medium";
      } else if (newConsecutive >= 5 && newDifficulty === "medium") {
        newDifficulty = "hard";
      } else if (!isCorrect && newDifficulty !== "easy") {
        newDifficulty = newDifficulty === "hard" ? "medium" : "easy";
      }

      await storage.updateModuleProgress(defaultUserId, moduleId, {
        questionsCompleted: (progress?.questionsCompleted || 0) + 1,
        correctAnswers: isCorrect ? currentCorrect + 1 : currentCorrect,
        consecutiveCorrect: newConsecutive,
        pointsEarned: (progress?.pointsEarned || 0) + pointsEarned,
        currentDifficulty: newDifficulty,
        timeSpentSeconds: (progress?.timeSpentSeconds || 0) + timeTaken,
      });

      res.json({
        isCorrect,
        pointsEarned,
        explanation: isCorrect ? undefined : question.explanation,
        newDifficulty,
      });
    } catch (error) {
      console.error("Error submitting answer:", error);
      res.status(500).json({ error: "Failed to submit answer" });
    }
  });

  app.post("/api/modules/:id/complete", async (req, res) => {
    try {
      const { id: moduleId } = req.params;

      const module = await storage.getModuleById(moduleId);
      if (!module) {
        return res.status(404).json({ error: "Module not found" });
      }

      const progress = await storage.getModuleProgress(defaultUserId, moduleId);
      
      const storedCorrectAnswers = progress?.correctAnswers || 0;
      const storedPointsEarned = progress?.pointsEarned || 0;
      const storedTimeSpent = progress?.timeSpentSeconds || 0;
      const storedDifficulty = progress?.currentDifficulty || "easy";
      const totalQuestions = module.totalQuestions || 5;

      await storage.updateModuleProgress(defaultUserId, moduleId, {
        isCompleted: true,
      });

      await storage.updateUserPoints(defaultUserId, storedPointsEarned);

      const nextModule = await storage.getNextModule(moduleId);

      const summary: ModuleCompletionSummary = {
        moduleId,
        moduleTitle: module.title,
        totalQuestions,
        correctAnswers: storedCorrectAnswers,
        totalPoints: storedPointsEarned,
        timeSpent: storedTimeSpent,
        difficultyAchieved: storedDifficulty,
        nextModuleId: nextModule?.id,
      };

      res.json(summary);
    } catch (error) {
      console.error("Error completing module:", error);
      res.status(500).json({ error: "Failed to complete module" });
    }
  });

  app.get("/api/user/stats", async (_req, res) => {
    try {
      const stats = await storage.getUserStats(defaultUserId);
      res.json(stats);
    } catch (error) {
      console.error("Error fetching user stats:", error);
      res.status(500).json({ error: "Failed to fetch user stats" });
    }
  });

  app.get("/api/user/progress", async (_req, res) => {
    try {
      const progress = await storage.getUserProgress(defaultUserId);
      res.json(progress);
    } catch (error) {
      console.error("Error fetching user progress:", error);
      res.status(500).json({ error: "Failed to fetch user progress" });
    }
  });

  return httpServer;
}
