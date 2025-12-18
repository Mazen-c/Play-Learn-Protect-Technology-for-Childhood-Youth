import { pgTable, text, varchar, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Category types
export type CategoryType = "math" | "science" | "language" | "coding";
export type AgeGroup = "3-5" | "6-8" | "9-12";
export type DifficultyLevel = "easy" | "medium" | "hard";
export type QuestionType = "multiple_choice" | "true_false" | "fill_blank" | "matching";

// Users table
export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name"),
  avatarUrl: text("avatar_url"),
  ageGroup: text("age_group").$type<AgeGroup>(),
  totalPoints: integer("total_points").default(0),
});

// Categories table
export const categories = pgTable("categories", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").$type<CategoryType>().notNull(),
  description: text("description"),
  iconName: text("icon_name").notNull(),
  colorClass: text("color_class").notNull(),
  moduleCount: integer("module_count").default(0),
});

// Modules table
export const modules = pgTable("modules", {
  id: varchar("id").primaryKey(),
  categoryId: varchar("category_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  ageGroup: text("age_group").$type<AgeGroup>().notNull(),
  difficulty: text("difficulty").$type<DifficultyLevel>().default("easy"),
  estimatedMinutes: integer("estimated_minutes").default(10),
  totalQuestions: integer("total_questions").default(5),
  pointsReward: integer("points_reward").default(100),
  order: integer("order").default(0),
});

// Questions table
export const questions = pgTable("questions", {
  id: varchar("id").primaryKey(),
  moduleId: varchar("module_id").notNull(),
  type: text("type").$type<QuestionType>().notNull(),
  questionText: text("question_text").notNull(),
  options: jsonb("options").$type<string[]>(),
  correctAnswer: text("correct_answer").notNull(),
  explanation: text("explanation"),
  points: integer("points").default(20),
  difficulty: text("difficulty").$type<DifficultyLevel>().default("easy"),
  order: integer("order").default(0),
});

// User Progress table
export const userProgress = pgTable("user_progress", {
  id: varchar("id").primaryKey(),
  odulused: varchar("user_id").notNull(),
  moduleId: varchar("module_id").notNull(),
  questionsCompleted: integer("questions_completed").default(0),
  correctAnswers: integer("correct_answers").default(0),
  consecutiveCorrect: integer("consecutive_correct").default(0),
  pointsEarned: integer("points_earned").default(0),
  isCompleted: boolean("is_completed").default(false),
  currentDifficulty: text("current_difficulty").$type<DifficultyLevel>().default("easy"),
  timeSpentSeconds: integer("time_spent_seconds").default(0),
});

// Session tracking
export const sessions = pgTable("sessions", {
  id: varchar("id").primaryKey(),
  odulused: varchar("user_id").notNull(),
  moduleId: varchar("module_id").notNull(),
  startedAt: text("started_at").notNull(),
  endedAt: text("ended_at"),
  questionsAnswered: integer("questions_answered").default(0),
  correctAnswers: integer("correct_answers").default(0),
  pointsEarned: integer("points_earned").default(0),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertCategorySchema = createInsertSchema(categories).omit({ id: true });
export const insertModuleSchema = createInsertSchema(modules).omit({ id: true });
export const insertQuestionSchema = createInsertSchema(questions).omit({ id: true });
export const insertUserProgressSchema = createInsertSchema(userProgress).omit({ id: true });
export const insertSessionSchema = createInsertSchema(sessions).omit({ id: true });

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

export type InsertModule = z.infer<typeof insertModuleSchema>;
export type Module = typeof modules.$inferSelect;

export type InsertQuestion = z.infer<typeof insertQuestionSchema>;
export type Question = typeof questions.$inferSelect;

export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
export type UserProgress = typeof userProgress.$inferSelect;

export type InsertSession = z.infer<typeof insertSessionSchema>;
export type Session = typeof sessions.$inferSelect;

// API Response types
export interface CategoryWithModules extends Category {
  modules: Module[];
}

export interface ModuleWithQuestions extends Module {
  questions: Question[];
  category?: Category;
}

export interface ActivityResult {
  questionId: string;
  isCorrect: boolean;
  pointsEarned: number;
  timeTaken: number;
}

export interface ModuleCompletionSummary {
  moduleId: string;
  moduleTitle: string;
  totalQuestions: number;
  correctAnswers: number;
  totalPoints: number;
  timeSpent: number;
  difficultyAchieved: DifficultyLevel;
  nextModuleId?: string;
}

// Answer submission schema
export const answerSubmissionSchema = z.object({
  questionId: z.string(),
  answer: z.string(),
  timeTaken: z.number(),
});

export type AnswerSubmission = z.infer<typeof answerSubmissionSchema>;
