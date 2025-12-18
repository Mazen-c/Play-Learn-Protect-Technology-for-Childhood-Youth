import React, { createContext, useContext, useState, useCallback } from "react";

export interface Notification {
  id: string;
  type: "achievement" | "badge" | "competition" | "award";
  title: string;
  message: string;
}

interface GameState {
  points: number;
  achievements: string[];
  badges: string[];
  leaderboardPosition: number;
  classLeaderboardPosition: number;
  currentNotification: Notification | null;
  addPoints: (points: number) => void;
  addAchievement: (achievement: string) => void;
  addBadge: (badge: string) => void;
  showNotification: (notification: Notification) => void;
  clearNotification: () => void;
}

const GameContext = createContext<GameState | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [points, setPoints] = useState(120);
  const [achievements, setAchievements] = useState<string[]>(["Math Beginner"]);
  const [badges, setBadges] = useState<string[]>(["Starter Badge"]);
  const [leaderboardPosition] = useState(6);
  const [classLeaderboardPosition] = useState(3);
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);

  const addPoints = useCallback((value: number) => {
    setPoints(prev => prev + value);
    if (value >= 50) {
      showNotification({
        id: Date.now().toString(),
        type: "award",
        title: "Points Earned!",
        message: `You earned ${value} points! Keep up the great work!`,
      });
    }
  }, []);

  const addAchievement = useCallback((achievement: string) => {
    setAchievements(prev => {
      if (prev.includes(achievement)) return prev;
      return [...prev, achievement];
    });
    showNotification({
      id: Date.now().toString(),
      type: "achievement",
      title: "Achievement Unlocked!",
      message: `Congratulations! You unlocked: ${achievement}`,
    });
  }, []);

  const addBadge = useCallback((badge: string) => {
    setBadges(prev => {
      if (prev.includes(badge)) return prev;
      return [...prev, badge];
    });
    showNotification({
      id: Date.now().toString(),
      type: "badge",
      title: "New Badge Earned!",
      message: `You earned the ${badge} badge!`,
    });
  }, []);

  const showNotification = useCallback((notification: Notification) => {
    setCurrentNotification(notification);
  }, []);

  const clearNotification = useCallback(() => {
    setCurrentNotification(null);
  }, []);

  return (
    <GameContext.Provider
      value={{
        points,
        achievements,
        badges,
        leaderboardPosition,
        classLeaderboardPosition,
        currentNotification,
        addPoints,
        addAchievement,
        addBadge,
        showNotification,
        clearNotification,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within GameProvider");
  return context;
};
