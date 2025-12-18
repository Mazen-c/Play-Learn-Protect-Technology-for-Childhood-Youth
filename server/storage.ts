import {
  type User,
  type InsertUser,
  type Category,
  type InsertCategory,
  type Module,
  type InsertModule,
  type Question,
  type InsertQuestion,
  type UserProgress,
  type InsertUserProgress,
  type Session,
  type InsertSession,
  type CategoryWithModules,
  type ModuleWithQuestions,
  type DifficultyLevel,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserPoints(userId: string, points: number): Promise<User | undefined>;
  getUserStats(userId: string): Promise<{ totalPoints: number }>;

  getCategories(): Promise<Category[]>;
  getCategoryById(id: string): Promise<Category | undefined>;
  getCategoryWithModules(id: string): Promise<CategoryWithModules | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  getModules(): Promise<Module[]>;
  getModuleById(id: string): Promise<Module | undefined>;
  getModulesByCategory(categoryId: string): Promise<Module[]>;
  getModuleWithQuestions(id: string): Promise<ModuleWithQuestions | undefined>;
  createModule(module: InsertModule): Promise<Module>;
  getNextModule(currentModuleId: string): Promise<Module | undefined>;

  getQuestionsByModule(moduleId: string): Promise<Question[]>;
  getQuestionById(id: string): Promise<Question | undefined>;
  createQuestion(question: InsertQuestion): Promise<Question>;

  getUserProgress(userId: string): Promise<Record<string, { progress: number; isCompleted: boolean }>>;
  getModuleProgress(userId: string, moduleId: string): Promise<UserProgress | undefined>;
  updateModuleProgress(userId: string, moduleId: string, data: Partial<UserProgress>): Promise<UserProgress>;

  createSession(session: InsertSession): Promise<Session>;
  endSession(sessionId: string, data: Partial<Session>): Promise<Session | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private categories: Map<string, Category>;
  private modules: Map<string, Module>;
  private questions: Map<string, Question>;
  private userProgress: Map<string, UserProgress>;
  private sessions: Map<string, Session>;
  private defaultUserId: string;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.modules = new Map();
    this.questions = new Map();
    this.userProgress = new Map();
    this.sessions = new Map();
    this.defaultUserId = "default-user";
    this.seedData();
  }

  private seedData() {
    const defaultUser: User = {
      id: this.defaultUserId,
      username: "learner",
      password: "password",
      displayName: "Young Learner",
      avatarUrl: null,
      ageGroup: "6-8",
      totalPoints: 0,
    };
    this.users.set(defaultUser.id, defaultUser);

    const categoriesData: Array<InsertCategory & { id: string }> = [
      {
        id: "cat-math",
        name: "Math",
        type: "math",
        description: "Discover numbers, shapes, and problem-solving!",
        iconName: "Calculator",
        colorClass: "blue",
        moduleCount: 4,
      },
      {
        id: "cat-science",
        name: "Science",
        type: "science",
        description: "Explore the wonders of nature and how things work!",
        iconName: "Beaker",
        colorClass: "green",
        moduleCount: 4,
      },
      {
        id: "cat-language",
        name: "Language",
        type: "language",
        description: "Learn letters, words, and storytelling!",
        iconName: "BookOpen",
        colorClass: "orange",
        moduleCount: 4,
      },
      {
        id: "cat-coding",
        name: "Coding",
        type: "coding",
        description: "Create and solve puzzles with code!",
        iconName: "Code",
        colorClass: "purple",
        moduleCount: 4,
      },
    ];

    categoriesData.forEach((cat) => {
      this.categories.set(cat.id, cat as Category);
    });

    const modulesData: Array<InsertModule & { id: string }> = [
      {
        id: "mod-math-1",
        categoryId: "cat-math",
        title: "Counting Fun",
        description: "Learn to count from 1 to 10 with fun activities!",
        ageGroup: "3-5",
        difficulty: "easy",
        estimatedMinutes: 5,
        totalQuestions: 5,
        pointsReward: 50,
        order: 1,
      },
      {
        id: "mod-math-2",
        categoryId: "cat-math",
        title: "Addition Adventures",
        description: "Add numbers together and solve puzzles!",
        ageGroup: "6-8",
        difficulty: "easy",
        estimatedMinutes: 8,
        totalQuestions: 5,
        pointsReward: 75,
        order: 2,
      },
      {
        id: "mod-math-3",
        categoryId: "cat-math",
        title: "Shape Explorer",
        description: "Discover circles, squares, triangles and more!",
        ageGroup: "3-5",
        difficulty: "easy",
        estimatedMinutes: 6,
        totalQuestions: 5,
        pointsReward: 60,
        order: 3,
      },
      {
        id: "mod-math-4",
        categoryId: "cat-math",
        title: "Multiplication Magic",
        description: "Master the times tables with fun challenges!",
        ageGroup: "9-12",
        difficulty: "medium",
        estimatedMinutes: 10,
        totalQuestions: 5,
        pointsReward: 100,
        order: 4,
      },
      {
        id: "mod-science-1",
        categoryId: "cat-science",
        title: "Animal Friends",
        description: "Learn about different animals and where they live!",
        ageGroup: "3-5",
        difficulty: "easy",
        estimatedMinutes: 5,
        totalQuestions: 5,
        pointsReward: 50,
        order: 1,
      },
      {
        id: "mod-science-2",
        categoryId: "cat-science",
        title: "Plants & Nature",
        description: "Discover how plants grow and thrive!",
        ageGroup: "6-8",
        difficulty: "easy",
        estimatedMinutes: 7,
        totalQuestions: 5,
        pointsReward: 70,
        order: 2,
      },
      {
        id: "mod-science-3",
        categoryId: "cat-science",
        title: "Weather Watch",
        description: "Explore rain, sun, wind and clouds!",
        ageGroup: "6-8",
        difficulty: "easy",
        estimatedMinutes: 6,
        totalQuestions: 5,
        pointsReward: 60,
        order: 3,
      },
      {
        id: "mod-science-4",
        categoryId: "cat-science",
        title: "The Solar System",
        description: "Journey through the planets and stars!",
        ageGroup: "9-12",
        difficulty: "medium",
        estimatedMinutes: 12,
        totalQuestions: 5,
        pointsReward: 120,
        order: 4,
      },
      {
        id: "mod-language-1",
        categoryId: "cat-language",
        title: "ABC Fun",
        description: "Learn the alphabet with pictures and sounds!",
        ageGroup: "3-5",
        difficulty: "easy",
        estimatedMinutes: 5,
        totalQuestions: 5,
        pointsReward: 50,
        order: 1,
      },
      {
        id: "mod-language-2",
        categoryId: "cat-language",
        title: "First Words",
        description: "Build your vocabulary with common words!",
        ageGroup: "3-5",
        difficulty: "easy",
        estimatedMinutes: 6,
        totalQuestions: 5,
        pointsReward: 55,
        order: 2,
      },
      {
        id: "mod-language-3",
        categoryId: "cat-language",
        title: "Reading Stories",
        description: "Practice reading with fun short stories!",
        ageGroup: "6-8",
        difficulty: "easy",
        estimatedMinutes: 10,
        totalQuestions: 5,
        pointsReward: 80,
        order: 3,
      },
      {
        id: "mod-language-4",
        categoryId: "cat-language",
        title: "Grammar Basics",
        description: "Learn nouns, verbs, and sentence building!",
        ageGroup: "9-12",
        difficulty: "medium",
        estimatedMinutes: 12,
        totalQuestions: 5,
        pointsReward: 100,
        order: 4,
      },
      {
        id: "mod-coding-1",
        categoryId: "cat-coding",
        title: "Pattern Puzzles",
        description: "Find and complete patterns to think like a coder!",
        ageGroup: "3-5",
        difficulty: "easy",
        estimatedMinutes: 5,
        totalQuestions: 5,
        pointsReward: 50,
        order: 1,
      },
      {
        id: "mod-coding-2",
        categoryId: "cat-coding",
        title: "Sequence Steps",
        description: "Put steps in the right order to solve problems!",
        ageGroup: "6-8",
        difficulty: "easy",
        estimatedMinutes: 8,
        totalQuestions: 5,
        pointsReward: 75,
        order: 2,
      },
      {
        id: "mod-coding-3",
        categoryId: "cat-coding",
        title: "Loop Learning",
        description: "Discover how loops repeat actions!",
        ageGroup: "6-8",
        difficulty: "medium",
        estimatedMinutes: 10,
        totalQuestions: 5,
        pointsReward: 90,
        order: 3,
      },
      {
        id: "mod-coding-4",
        categoryId: "cat-coding",
        title: "Logic Gates",
        description: "Learn about AND, OR, and NOT in computing!",
        ageGroup: "9-12",
        difficulty: "hard",
        estimatedMinutes: 15,
        totalQuestions: 5,
        pointsReward: 150,
        order: 4,
      },
    ];

    modulesData.forEach((mod) => {
      this.modules.set(mod.id, mod as Module);
    });

    const questionsData: Array<InsertQuestion & { id: string }> = [
      { id: "q-math-1-1", moduleId: "mod-math-1", type: "multiple_choice", questionText: "How many apples are there? (Picture: 3 apples)", options: ["2", "3", "4", "5"], correctAnswer: "3", explanation: "Count each apple: 1, 2, 3!", points: 10, difficulty: "easy", order: 1 },
      { id: "q-math-1-2", moduleId: "mod-math-1", type: "multiple_choice", questionText: "What number comes after 5?", options: ["4", "6", "7", "3"], correctAnswer: "6", explanation: "After 5 comes 6!", points: 10, difficulty: "easy", order: 2 },
      { id: "q-math-1-3", moduleId: "mod-math-1", type: "true_false", questionText: "Is 7 greater than 5?", options: null, correctAnswer: "True", explanation: "Yes, 7 is bigger than 5!", points: 10, difficulty: "easy", order: 3 },
      { id: "q-math-1-4", moduleId: "mod-math-1", type: "multiple_choice", questionText: "Count the stars: (Picture: 8 stars)", options: ["6", "7", "8", "9"], correctAnswer: "8", explanation: "There are 8 stars!", points: 10, difficulty: "easy", order: 4 },
      { id: "q-math-1-5", moduleId: "mod-math-1", type: "fill_blank", questionText: "What number comes before 10?", options: null, correctAnswer: "9", explanation: "9 comes right before 10!", points: 10, difficulty: "easy", order: 5 },

      { id: "q-math-2-1", moduleId: "mod-math-2", type: "multiple_choice", questionText: "What is 2 + 3?", options: ["4", "5", "6", "7"], correctAnswer: "5", explanation: "2 plus 3 equals 5!", points: 15, difficulty: "easy", order: 1 },
      { id: "q-math-2-2", moduleId: "mod-math-2", type: "multiple_choice", questionText: "What is 4 + 4?", options: ["6", "7", "8", "9"], correctAnswer: "8", explanation: "4 plus 4 equals 8!", points: 15, difficulty: "easy", order: 2 },
      { id: "q-math-2-3", moduleId: "mod-math-2", type: "fill_blank", questionText: "5 + 2 = ?", options: null, correctAnswer: "7", explanation: "5 plus 2 equals 7!", points: 15, difficulty: "easy", order: 3 },
      { id: "q-math-2-4", moduleId: "mod-math-2", type: "true_false", questionText: "Is 3 + 3 equal to 6?", options: null, correctAnswer: "True", explanation: "Yes, 3 + 3 = 6!", points: 15, difficulty: "easy", order: 4 },
      { id: "q-math-2-5", moduleId: "mod-math-2", type: "multiple_choice", questionText: "What is 1 + 9?", options: ["8", "9", "10", "11"], correctAnswer: "10", explanation: "1 plus 9 equals 10!", points: 15, difficulty: "easy", order: 5 },

      { id: "q-math-3-1", moduleId: "mod-math-3", type: "multiple_choice", questionText: "Which shape has 4 equal sides?", options: ["Circle", "Triangle", "Square", "Rectangle"], correctAnswer: "Square", explanation: "A square has 4 equal sides!", points: 12, difficulty: "easy", order: 1 },
      { id: "q-math-3-2", moduleId: "mod-math-3", type: "true_false", questionText: "A circle has no corners.", options: null, correctAnswer: "True", explanation: "Correct! Circles are round with no corners!", points: 12, difficulty: "easy", order: 2 },
      { id: "q-math-3-3", moduleId: "mod-math-3", type: "multiple_choice", questionText: "How many sides does a triangle have?", options: ["2", "3", "4", "5"], correctAnswer: "3", explanation: "A triangle has exactly 3 sides!", points: 12, difficulty: "easy", order: 3 },
      { id: "q-math-3-4", moduleId: "mod-math-3", type: "multiple_choice", questionText: "Which shape looks like a ball?", options: ["Square", "Triangle", "Circle", "Rectangle"], correctAnswer: "Circle", explanation: "A circle is round like a ball!", points: 12, difficulty: "easy", order: 4 },
      { id: "q-math-3-5", moduleId: "mod-math-3", type: "fill_blank", questionText: "A rectangle has ___ corners.", options: null, correctAnswer: "4", explanation: "Rectangles have 4 corners!", points: 12, difficulty: "easy", order: 5 },

      { id: "q-math-4-1", moduleId: "mod-math-4", type: "multiple_choice", questionText: "What is 6 x 7?", options: ["36", "42", "48", "54"], correctAnswer: "42", explanation: "6 times 7 equals 42!", points: 20, difficulty: "medium", order: 1 },
      { id: "q-math-4-2", moduleId: "mod-math-4", type: "fill_blank", questionText: "8 x 9 = ?", options: null, correctAnswer: "72", explanation: "8 times 9 equals 72!", points: 20, difficulty: "medium", order: 2 },
      { id: "q-math-4-3", moduleId: "mod-math-4", type: "multiple_choice", questionText: "What is 5 x 12?", options: ["50", "55", "60", "65"], correctAnswer: "60", explanation: "5 times 12 equals 60!", points: 20, difficulty: "medium", order: 3 },
      { id: "q-math-4-4", moduleId: "mod-math-4", type: "true_false", questionText: "Is 7 x 8 equal to 56?", options: null, correctAnswer: "True", explanation: "Yes, 7 x 8 = 56!", points: 20, difficulty: "medium", order: 4 },
      { id: "q-math-4-5", moduleId: "mod-math-4", type: "multiple_choice", questionText: "What is 11 x 11?", options: ["111", "121", "131", "141"], correctAnswer: "121", explanation: "11 times 11 equals 121!", points: 20, difficulty: "hard", order: 5 },

      { id: "q-sci-1-1", moduleId: "mod-science-1", type: "multiple_choice", questionText: "Which animal lives in water?", options: ["Cat", "Dog", "Fish", "Bird"], correctAnswer: "Fish", explanation: "Fish live and breathe in water!", points: 10, difficulty: "easy", order: 1 },
      { id: "q-sci-1-2", moduleId: "mod-science-1", type: "true_false", questionText: "Birds can fly.", options: null, correctAnswer: "True", explanation: "Most birds can fly using their wings!", points: 10, difficulty: "easy", order: 2 },
      { id: "q-sci-1-3", moduleId: "mod-science-1", type: "multiple_choice", questionText: "What do cows give us?", options: ["Eggs", "Milk", "Honey", "Wool"], correctAnswer: "Milk", explanation: "Cows provide us with milk!", points: 10, difficulty: "easy", order: 3 },
      { id: "q-sci-1-4", moduleId: "mod-science-1", type: "multiple_choice", questionText: "Which animal has a long trunk?", options: ["Lion", "Giraffe", "Elephant", "Zebra"], correctAnswer: "Elephant", explanation: "Elephants have long trunks!", points: 10, difficulty: "easy", order: 4 },
      { id: "q-sci-1-5", moduleId: "mod-science-1", type: "fill_blank", questionText: "A baby dog is called a ____.", options: null, correctAnswer: "puppy", explanation: "Baby dogs are called puppies!", points: 10, difficulty: "easy", order: 5 },

      { id: "q-sci-2-1", moduleId: "mod-science-2", type: "multiple_choice", questionText: "What do plants need to grow?", options: ["Only water", "Only sunlight", "Water, sunlight and air", "Only soil"], correctAnswer: "Water, sunlight and air", explanation: "Plants need water, sunlight, and air to grow!", points: 14, difficulty: "easy", order: 1 },
      { id: "q-sci-2-2", moduleId: "mod-science-2", type: "true_false", questionText: "Plants make their own food.", options: null, correctAnswer: "True", explanation: "Plants make food through photosynthesis!", points: 14, difficulty: "easy", order: 2 },
      { id: "q-sci-2-3", moduleId: "mod-science-2", type: "multiple_choice", questionText: "Which part of a plant takes in water?", options: ["Leaves", "Stem", "Roots", "Flower"], correctAnswer: "Roots", explanation: "Roots absorb water from the soil!", points: 14, difficulty: "easy", order: 3 },
      { id: "q-sci-2-4", moduleId: "mod-science-2", type: "fill_blank", questionText: "The green color in plants comes from ____.", options: null, correctAnswer: "chlorophyll", explanation: "Chlorophyll gives plants their green color!", points: 14, difficulty: "medium", order: 4 },
      { id: "q-sci-2-5", moduleId: "mod-science-2", type: "multiple_choice", questionText: "Where do seeds come from?", options: ["Roots", "Stems", "Flowers", "Leaves"], correctAnswer: "Flowers", explanation: "Seeds develop from flowers!", points: 14, difficulty: "easy", order: 5 },

      { id: "q-sci-3-1", moduleId: "mod-science-3", type: "multiple_choice", questionText: "What falls from clouds?", options: ["Snow only", "Rain only", "Both rain and snow", "Nothing"], correctAnswer: "Both rain and snow", explanation: "Rain and snow both fall from clouds!", points: 12, difficulty: "easy", order: 1 },
      { id: "q-sci-3-2", moduleId: "mod-science-3", type: "true_false", questionText: "The sun is a star.", options: null, correctAnswer: "True", explanation: "Yes, the sun is our closest star!", points: 12, difficulty: "easy", order: 2 },
      { id: "q-sci-3-3", moduleId: "mod-science-3", type: "multiple_choice", questionText: "What causes wind?", options: ["Trees moving", "Air moving", "Water flowing", "Sun shining"], correctAnswer: "Air moving", explanation: "Wind is moving air!", points: 12, difficulty: "easy", order: 3 },
      { id: "q-sci-3-4", moduleId: "mod-science-3", type: "fill_blank", questionText: "Clouds are made of tiny drops of ____.", options: null, correctAnswer: "water", explanation: "Clouds are made of tiny water droplets!", points: 12, difficulty: "easy", order: 4 },
      { id: "q-sci-3-5", moduleId: "mod-science-3", type: "multiple_choice", questionText: "What appears in the sky after rain?", options: ["Moon", "Stars", "Rainbow", "Clouds"], correctAnswer: "Rainbow", explanation: "Rainbows appear when sunlight shines through rain!", points: 12, difficulty: "easy", order: 5 },

      { id: "q-sci-4-1", moduleId: "mod-science-4", type: "multiple_choice", questionText: "Which planet is closest to the Sun?", options: ["Venus", "Earth", "Mercury", "Mars"], correctAnswer: "Mercury", explanation: "Mercury is the closest planet to the Sun!", points: 24, difficulty: "medium", order: 1 },
      { id: "q-sci-4-2", moduleId: "mod-science-4", type: "true_false", questionText: "Saturn has rings around it.", options: null, correctAnswer: "True", explanation: "Saturn is famous for its beautiful rings!", points: 24, difficulty: "easy", order: 2 },
      { id: "q-sci-4-3", moduleId: "mod-science-4", type: "multiple_choice", questionText: "How many planets are in our solar system?", options: ["7", "8", "9", "10"], correctAnswer: "8", explanation: "There are 8 planets in our solar system!", points: 24, difficulty: "medium", order: 3 },
      { id: "q-sci-4-4", moduleId: "mod-science-4", type: "fill_blank", questionText: "The largest planet is ____.", options: null, correctAnswer: "Jupiter", explanation: "Jupiter is the largest planet!", points: 24, difficulty: "medium", order: 4 },
      { id: "q-sci-4-5", moduleId: "mod-science-4", type: "multiple_choice", questionText: "What is Earth's natural satellite?", options: ["Sun", "Mars", "Moon", "Stars"], correctAnswer: "Moon", explanation: "The Moon orbits around Earth!", points: 24, difficulty: "easy", order: 5 },

      { id: "q-lang-1-1", moduleId: "mod-language-1", type: "multiple_choice", questionText: "Which letter comes first in the alphabet?", options: ["B", "A", "C", "D"], correctAnswer: "A", explanation: "A is the first letter of the alphabet!", points: 10, difficulty: "easy", order: 1 },
      { id: "q-lang-1-2", moduleId: "mod-language-1", type: "true_false", questionText: "The letter 'Z' is the last letter.", options: null, correctAnswer: "True", explanation: "Z is the 26th and last letter!", points: 10, difficulty: "easy", order: 2 },
      { id: "q-lang-1-3", moduleId: "mod-language-1", type: "multiple_choice", questionText: "What letter does 'Apple' start with?", options: ["B", "P", "A", "E"], correctAnswer: "A", explanation: "Apple starts with the letter A!", points: 10, difficulty: "easy", order: 3 },
      { id: "q-lang-1-4", moduleId: "mod-language-1", type: "fill_blank", questionText: "Cat starts with the letter ____.", options: null, correctAnswer: "C", explanation: "Cat starts with C!", points: 10, difficulty: "easy", order: 4 },
      { id: "q-lang-1-5", moduleId: "mod-language-1", type: "multiple_choice", questionText: "Which letter comes after M?", options: ["L", "N", "O", "K"], correctAnswer: "N", explanation: "N comes right after M!", points: 10, difficulty: "easy", order: 5 },

      { id: "q-lang-2-1", moduleId: "mod-language-2", type: "multiple_choice", questionText: "What do we use to see?", options: ["Ears", "Nose", "Eyes", "Mouth"], correctAnswer: "Eyes", explanation: "We use our eyes to see!", points: 11, difficulty: "easy", order: 1 },
      { id: "q-lang-2-2", moduleId: "mod-language-2", type: "true_false", questionText: "A book is something we read.", options: null, correctAnswer: "True", explanation: "Yes, we read books!", points: 11, difficulty: "easy", order: 2 },
      { id: "q-lang-2-3", moduleId: "mod-language-2", type: "multiple_choice", questionText: "Which word is an animal?", options: ["Table", "Chair", "Dog", "Book"], correctAnswer: "Dog", explanation: "A dog is an animal!", points: 11, difficulty: "easy", order: 3 },
      { id: "q-lang-2-4", moduleId: "mod-language-2", type: "fill_blank", questionText: "The opposite of big is ____.", options: null, correctAnswer: "small", explanation: "Small is the opposite of big!", points: 11, difficulty: "easy", order: 4 },
      { id: "q-lang-2-5", moduleId: "mod-language-2", type: "multiple_choice", questionText: "What color is the sky on a sunny day?", options: ["Red", "Green", "Blue", "Yellow"], correctAnswer: "Blue", explanation: "The sky is usually blue on sunny days!", points: 11, difficulty: "easy", order: 5 },

      { id: "q-lang-3-1", moduleId: "mod-language-3", type: "multiple_choice", questionText: "In 'The cat sat on the mat', what sat on the mat?", options: ["Dog", "Cat", "Bird", "Mouse"], correctAnswer: "Cat", explanation: "The cat sat on the mat!", points: 16, difficulty: "easy", order: 1 },
      { id: "q-lang-3-2", moduleId: "mod-language-3", type: "true_false", questionText: "'Happy' means feeling good.", options: null, correctAnswer: "True", explanation: "Happy means feeling joyful and good!", points: 16, difficulty: "easy", order: 2 },
      { id: "q-lang-3-3", moduleId: "mod-language-3", type: "fill_blank", questionText: "The sun rises in the ____ and sets in the west.", options: null, correctAnswer: "east", explanation: "The sun rises in the east!", points: 16, difficulty: "easy", order: 3 },
      { id: "q-lang-3-4", moduleId: "mod-language-3", type: "multiple_choice", questionText: "What is a group of lions called?", options: ["Pack", "Herd", "Pride", "Flock"], correctAnswer: "Pride", explanation: "A group of lions is called a pride!", points: 16, difficulty: "medium", order: 4 },
      { id: "q-lang-3-5", moduleId: "mod-language-3", type: "multiple_choice", questionText: "Which word rhymes with 'cat'?", options: ["Dog", "Hat", "Sun", "Run"], correctAnswer: "Hat", explanation: "Cat and hat both end with 'at'!", points: 16, difficulty: "easy", order: 5 },

      { id: "q-lang-4-1", moduleId: "mod-language-4", type: "multiple_choice", questionText: "Which word is a noun?", options: ["Run", "Happy", "Book", "Quickly"], correctAnswer: "Book", explanation: "A noun is a person, place, or thing. Book is a thing!", points: 20, difficulty: "medium", order: 1 },
      { id: "q-lang-4-2", moduleId: "mod-language-4", type: "true_false", questionText: "A verb is an action word.", options: null, correctAnswer: "True", explanation: "Verbs describe actions like run, jump, eat!", points: 20, difficulty: "easy", order: 2 },
      { id: "q-lang-4-3", moduleId: "mod-language-4", type: "multiple_choice", questionText: "Which is an adjective?", options: ["Jump", "Beautiful", "House", "Slowly"], correctAnswer: "Beautiful", explanation: "Adjectives describe nouns. Beautiful describes something!", points: 20, difficulty: "medium", order: 3 },
      { id: "q-lang-4-4", moduleId: "mod-language-4", type: "fill_blank", questionText: "The ____ is barking loudly. (Choose: dog or run)", options: null, correctAnswer: "dog", explanation: "Dog is the noun that can bark!", points: 20, difficulty: "easy", order: 4 },
      { id: "q-lang-4-5", moduleId: "mod-language-4", type: "multiple_choice", questionText: "What type of word is 'quickly'?", options: ["Noun", "Verb", "Adjective", "Adverb"], correctAnswer: "Adverb", explanation: "Adverbs describe how something is done!", points: 20, difficulty: "hard", order: 5 },

      { id: "q-code-1-1", moduleId: "mod-coding-1", type: "multiple_choice", questionText: "What comes next? 1, 2, 3, ___", options: ["3", "4", "5", "2"], correctAnswer: "4", explanation: "The pattern goes up by 1, so 4 comes next!", points: 10, difficulty: "easy", order: 1 },
      { id: "q-code-1-2", moduleId: "mod-coding-1", type: "multiple_choice", questionText: "Complete the pattern: Red, Blue, Red, Blue, ___", options: ["Green", "Yellow", "Red", "Blue"], correctAnswer: "Red", explanation: "The pattern alternates Red, Blue!", points: 10, difficulty: "easy", order: 2 },
      { id: "q-code-1-3", moduleId: "mod-coding-1", type: "true_false", questionText: "In the pattern A, B, A, B, the next letter is A.", options: null, correctAnswer: "True", explanation: "The pattern alternates A and B!", points: 10, difficulty: "easy", order: 3 },
      { id: "q-code-1-4", moduleId: "mod-coding-1", type: "fill_blank", questionText: "2, 4, 6, ___", options: null, correctAnswer: "8", explanation: "The pattern goes up by 2!", points: 10, difficulty: "easy", order: 4 },
      { id: "q-code-1-5", moduleId: "mod-coding-1", type: "multiple_choice", questionText: "What is the pattern? Circle, Square, Circle, Square...", options: ["Same shapes", "Alternating shapes", "Random", "Growing"], correctAnswer: "Alternating shapes", explanation: "The shapes take turns appearing!", points: 10, difficulty: "easy", order: 5 },

      { id: "q-code-2-1", moduleId: "mod-coding-2", type: "multiple_choice", questionText: "To make a sandwich, what comes first?", options: ["Add filling", "Get bread", "Eat it", "Cut it"], correctAnswer: "Get bread", explanation: "You need bread first before adding anything!", points: 15, difficulty: "easy", order: 1 },
      { id: "q-code-2-2", moduleId: "mod-coding-2", type: "true_false", questionText: "In a recipe, you should follow the steps in order.", options: null, correctAnswer: "True", explanation: "Steps must be followed in the right sequence!", points: 15, difficulty: "easy", order: 2 },
      { id: "q-code-2-3", moduleId: "mod-coding-2", type: "multiple_choice", questionText: "To brush teeth: 1. Get toothbrush, 2. Add toothpaste, 3. ___", options: ["Put brush away", "Brush teeth", "Rinse mouth", "Wake up"], correctAnswer: "Brush teeth", explanation: "After getting ready, you brush your teeth!", points: 15, difficulty: "easy", order: 3 },
      { id: "q-code-2-4", moduleId: "mod-coding-2", type: "fill_blank", questionText: "A set of instructions for a computer is called a ____.", options: null, correctAnswer: "program", explanation: "Programs are instructions for computers!", points: 15, difficulty: "medium", order: 4 },
      { id: "q-code-2-5", moduleId: "mod-coding-2", type: "multiple_choice", questionText: "What is an algorithm?", options: ["A type of food", "Step-by-step instructions", "A game", "A color"], correctAnswer: "Step-by-step instructions", explanation: "An algorithm is a set of ordered steps!", points: 15, difficulty: "easy", order: 5 },

      { id: "q-code-3-1", moduleId: "mod-coding-3", type: "multiple_choice", questionText: "If we repeat 'jump' 3 times, how many jumps?", options: ["1", "2", "3", "4"], correctAnswer: "3", explanation: "Repeating 3 times means 3 jumps!", points: 18, difficulty: "easy", order: 1 },
      { id: "q-code-3-2", moduleId: "mod-coding-3", type: "true_false", questionText: "A loop repeats instructions.", options: null, correctAnswer: "True", explanation: "Loops run the same code multiple times!", points: 18, difficulty: "easy", order: 2 },
      { id: "q-code-3-3", moduleId: "mod-coding-3", type: "multiple_choice", questionText: "What does 'repeat 5 times: clap' do?", options: ["Clap once", "Clap 5 times", "Clap 10 times", "Don't clap"], correctAnswer: "Clap 5 times", explanation: "It repeats the clap action 5 times!", points: 18, difficulty: "easy", order: 3 },
      { id: "q-code-3-4", moduleId: "mod-coding-3", type: "fill_blank", questionText: "A ____ repeats actions until told to stop.", options: null, correctAnswer: "loop", explanation: "Loops repeat until a condition is met!", points: 18, difficulty: "easy", order: 4 },
      { id: "q-code-3-5", moduleId: "mod-coding-3", type: "multiple_choice", questionText: "Why use loops in coding?", options: ["To make code longer", "To avoid repeating yourself", "To make errors", "To go slower"], correctAnswer: "To avoid repeating yourself", explanation: "Loops save time by not writing the same code!", points: 18, difficulty: "medium", order: 5 },

      { id: "q-code-4-1", moduleId: "mod-coding-4", type: "multiple_choice", questionText: "In logic, what does AND mean?", options: ["Either one", "Both must be true", "Neither", "Maybe"], correctAnswer: "Both must be true", explanation: "AND requires all conditions to be true!", points: 30, difficulty: "medium", order: 1 },
      { id: "q-code-4-2", moduleId: "mod-coding-4", type: "true_false", questionText: "In logic, OR is true if at least one input is true.", options: null, correctAnswer: "True", explanation: "OR only needs one true input!", points: 30, difficulty: "medium", order: 2 },
      { id: "q-code-4-3", moduleId: "mod-coding-4", type: "multiple_choice", questionText: "What does NOT do to true?", options: ["Keeps it true", "Makes it false", "Makes it maybe", "Nothing"], correctAnswer: "Makes it false", explanation: "NOT flips true to false and vice versa!", points: 30, difficulty: "medium", order: 3 },
      { id: "q-code-4-4", moduleId: "mod-coding-4", type: "fill_blank", questionText: "True AND False = ____", options: null, correctAnswer: "False", explanation: "AND needs both to be true!", points: 30, difficulty: "hard", order: 4 },
      { id: "q-code-4-5", moduleId: "mod-coding-4", type: "multiple_choice", questionText: "True OR False = ?", options: ["True", "False", "Maybe", "Error"], correctAnswer: "True", explanation: "OR is true if at least one is true!", points: 30, difficulty: "hard", order: 5 },
    ];

    questionsData.forEach((q) => {
      this.questions.set(q.id, q as Question);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((user) => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id, totalPoints: 0 } as User;
    this.users.set(id, user);
    return user;
  }

  async updateUserPoints(userId: string, points: number): Promise<User | undefined> {
    const user = this.users.get(userId);
    if (user) {
      user.totalPoints = (user.totalPoints || 0) + points;
      this.users.set(userId, user);
    }
    return user;
  }

  async getUserStats(userId: string): Promise<{ totalPoints: number }> {
    const user = await this.getUser(userId || this.defaultUserId);
    return { totalPoints: user?.totalPoints || 0 };
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryById(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async getCategoryWithModules(id: string): Promise<CategoryWithModules | undefined> {
    const category = this.categories.get(id);
    if (!category) return undefined;

    const modules = await this.getModulesByCategory(id);
    return { ...category, modules };
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const category: Category = { ...insertCategory, id } as Category;
    this.categories.set(id, category);
    return category;
  }

  async getModules(): Promise<Module[]> {
    return Array.from(this.modules.values());
  }

  async getModuleById(id: string): Promise<Module | undefined> {
    return this.modules.get(id);
  }

  async getModulesByCategory(categoryId: string): Promise<Module[]> {
    return Array.from(this.modules.values())
      .filter((m) => m.categoryId === categoryId)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  async getModuleWithQuestions(id: string): Promise<ModuleWithQuestions | undefined> {
    const module = this.modules.get(id);
    if (!module) return undefined;

    const questions = await this.getQuestionsByModule(id);
    const category = await this.getCategoryById(module.categoryId);
    return { ...module, questions, category };
  }

  async createModule(insertModule: InsertModule): Promise<Module> {
    const id = randomUUID();
    const module: Module = { ...insertModule, id } as Module;
    this.modules.set(id, module);
    return module;
  }

  async getNextModule(currentModuleId: string): Promise<Module | undefined> {
    const current = this.modules.get(currentModuleId);
    if (!current) return undefined;

    const categoryModules = await this.getModulesByCategory(current.categoryId);
    const currentIndex = categoryModules.findIndex((m) => m.id === currentModuleId);
    if (currentIndex >= 0 && currentIndex < categoryModules.length - 1) {
      return categoryModules[currentIndex + 1];
    }
    return undefined;
  }

  async getQuestionsByModule(moduleId: string): Promise<Question[]> {
    return Array.from(this.questions.values())
      .filter((q) => q.moduleId === moduleId)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  async getQuestionById(id: string): Promise<Question | undefined> {
    return this.questions.get(id);
  }

  async createQuestion(insertQuestion: InsertQuestion): Promise<Question> {
    const id = randomUUID();
    const question: Question = { ...insertQuestion, id } as Question;
    this.questions.set(id, question);
    return question;
  }

  async getUserProgress(userId: string): Promise<Record<string, { progress: number; isCompleted: boolean }>> {
    const result: Record<string, { progress: number; isCompleted: boolean }> = {};

    Array.from(this.userProgress.values())
      .filter((p) => p.odulused === (userId || this.defaultUserId))
      .forEach((p) => {
        const module = this.modules.get(p.moduleId);
        const totalQuestions = module?.totalQuestions || 5;
        const progress = Math.round(((p.questionsCompleted || 0) / totalQuestions) * 100);
        result[p.moduleId] = { progress, isCompleted: p.isCompleted || false };
      });

    return result;
  }

  async getModuleProgress(userId: string, moduleId: string): Promise<UserProgress | undefined> {
    const key = `${userId || this.defaultUserId}-${moduleId}`;
    return this.userProgress.get(key);
  }

  async updateModuleProgress(userId: string, moduleId: string, data: Partial<UserProgress>): Promise<UserProgress> {
    const key = `${userId || this.defaultUserId}-${moduleId}`;
    const existing = this.userProgress.get(key);

    if (existing) {
      const updated: UserProgress = {
        ...existing,
        questionsCompleted: data.questionsCompleted ?? existing.questionsCompleted,
        correctAnswers: data.correctAnswers ?? existing.correctAnswers,
        consecutiveCorrect: data.consecutiveCorrect ?? existing.consecutiveCorrect,
        pointsEarned: data.pointsEarned ?? existing.pointsEarned,
        isCompleted: data.isCompleted ?? existing.isCompleted,
        currentDifficulty: data.currentDifficulty ?? existing.currentDifficulty,
        timeSpentSeconds: data.timeSpentSeconds ?? existing.timeSpentSeconds,
      };
      this.userProgress.set(key, updated);
      return updated;
    }

    const newProgress: UserProgress = {
      id: randomUUID(),
      odulused: userId || this.defaultUserId,
      moduleId,
      questionsCompleted: data.questionsCompleted || 0,
      correctAnswers: data.correctAnswers || 0,
      consecutiveCorrect: data.consecutiveCorrect || 0,
      pointsEarned: data.pointsEarned || 0,
      isCompleted: data.isCompleted || false,
      currentDifficulty: data.currentDifficulty || "easy",
      timeSpentSeconds: data.timeSpentSeconds || 0,
    } as UserProgress;

    this.userProgress.set(key, newProgress);
    return newProgress;
  }

  async createSession(insertSession: InsertSession): Promise<Session> {
    const id = randomUUID();
    const session: Session = { ...insertSession, id } as Session;
    this.sessions.set(id, session);
    return session;
  }

  async endSession(sessionId: string, data: Partial<Session>): Promise<Session | undefined> {
    const session = this.sessions.get(sessionId);
    if (session) {
      const updated: Session = { ...session, ...data };
      this.sessions.set(sessionId, updated);
      return updated;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
