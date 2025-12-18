import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar: React.FC = () => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ gap: 1 }}>
        <Button color="inherit" component={Link} to="/">
          {t("home") as string}
        </Button>
        <Button color="inherit" component={Link} to="/game">
          {t("game") as string}
        </Button>
        <Button color="inherit" component={Link} to="/teacher/dashboard">
          Teacher
        </Button>
        <Button color="inherit" component={Link} to="/teacher/classes">
          Classes
        </Button>
        <Button color="inherit" component={Link} to="/teacher/assignments">
          Assignments
        </Button>
        <Button color="inherit" component={Link} to="/teacher/challenges">
          Challenges
        </Button>
        <Button color="inherit" onClick={toggleLanguage} sx={{ marginLeft: "auto" }}>
          {i18n.language === "en" ? "AR" : "EN"}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
