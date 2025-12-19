import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "./Context/AuthContext";
import { useTheme } from "./Context/ThemeContext";

const Navbar: React.FC = () => {
  const { i18n, t } = useTranslation();
  const auth = useAuth();
  const { isDark, toggleDarkMode } = useTheme();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
  };

  const isEducator = auth.user && ((auth.user.role as string) === "educator" || (auth.user.role as string) === "teacher");
  const isParent = auth.user?.role === "parent";
  const isChild = auth.user?.role === "child";

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ gap: 1 }}>
        <Button color="inherit" component={Link} to="/">
          {t("home") as string}
        </Button>
        {isChild && (
          <>
            <Button color="inherit" component={Link} to="/game">
              {t("game") as string}
            </Button>
            <Button color="inherit" component={Link} to="/creative-studio">
              Creative Studio
            </Button>
            <Button color="inherit" component={Link} to="/child/assignments">
              Assignments
            </Button>
            <Button color="inherit" component={Link} to="/child/challenges">
              Challenges
            </Button>
          </>
        )}
        {isParent && (
          <Button color="inherit" component={Link} to="/parent/classes">
            Classes
          </Button>
        )}
        {isEducator && (
          <>
            <Button color="inherit" component={Link} to="/teacher/classes">
              Classes
            </Button>
            <Button color="inherit" component={Link} to="/teacher/assignments">
              Assignments
            </Button>
            <Button color="inherit" component={Link} to="/teacher/challenges">
              Challenges
            </Button>
          </>
        )}
        {isParent && (
          <Button color="inherit" component={Link} to="/parent/manage-children">
            My Children
          </Button>
        )}
        {isChild && (
          <Button color="inherit" onClick={() => auth.switchToParent()} sx={{ ml: "auto" }}>
            Back to Parent View
          </Button>
        )}
        <Button color="inherit" onClick={toggleDarkMode} sx={{ marginLeft: isChild ? undefined : "auto" }} title={isDark ? "Light mode" : "Dark mode"}>
          {isDark ? "☀️" : "🌙"}
        </Button>
        <Button color="inherit" onClick={toggleLanguage}>
          {i18n.language === "en" ? "AR" : "EN"}
        </Button>
        <Button color="inherit" onClick={() => auth.logout()} sx={{ ml: 1 }}>
          {t("logout") as string}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
