import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const Navbar: React.FC = () => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Button color="inherit">{t("home") as string}
        </Button>
        <Button color="inherit">{t("game") as string}
        </Button>
        <Button color="inherit" onClick={toggleLanguage}>
          {i18n.language === "en" ? "AR" : "EN"}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
