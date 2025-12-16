import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      points: "Points",
      achievements: "Achievements",
      leaderboard: "Leaderboard",
      home: "Home",
      game: "Game"
    }
  },
  ar: {
    translation: {
      points: "النقاط",
      achievements: "الإنجازات",
      leaderboard: "لوحة المتصدرين",
      home: "الرئيسية",
      game: "اللعبة"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
